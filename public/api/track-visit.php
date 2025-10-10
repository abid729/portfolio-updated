<?php
/**
 * Visitor Tracking API
 * Automatically captures and stores visitor data
 * 
 * زائرین کی معلومات automatically capture اور save کرتا ہے
 */

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Database configuration
// SQLite database (no MySQL required - آسان ہے)
$dbFile = __DIR__ . '/visitors.db';

try {
    // Create database connection
    $db = new PDO('sqlite:' . $dbFile);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create table if not exists
    $db->exec("
        CREATE TABLE IF NOT EXISTS visitors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ip_address VARCHAR(45) NOT NULL,
            device_type VARCHAR(20),
            browser_name VARCHAR(50),
            browser_version VARCHAR(20),
            operating_system VARCHAR(50),
            country VARCHAR(100),
            city VARCHAR(100),
            region VARCHAR(100),
            page_url TEXT,
            referrer TEXT,
            visit_time DATETIME DEFAULT CURRENT_TIMESTAMP,
            user_agent TEXT,
            screen_resolution VARCHAR(20),
            language VARCHAR(10),
            timezone VARCHAR(50),
            session_id VARCHAR(100),
            INDEX idx_ip (ip_address),
            INDEX idx_visit_time (visit_time),
            INDEX idx_session (session_id)
        )
    ");
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error']);
    exit();
}

// Get JSON data from request
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Get visitor's IP address
$ipAddress = getVisitorIP();

// Check for duplicate entry (within last 2 hours)
$checkDuplicate = $db->prepare("
    SELECT id FROM visitors 
    WHERE ip_address = :ip 
    AND session_id = :session_id
    AND visit_time > datetime('now', '-2 hours')
    LIMIT 1
");

$sessionId = $data['sessionId'] ?? generateSessionId($ipAddress);

$checkDuplicate->execute([
    ':ip' => $ipAddress,
    ':session_id' => $sessionId
]);

if ($checkDuplicate->fetch()) {
    // Duplicate entry within 2 hours - don't save again
    echo json_encode([
        'success' => true, 
        'message' => 'Visit already recorded',
        'duplicate' => true
    ]);
    exit();
}

// Parse user agent for device, browser, and OS info
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
$deviceInfo = parseUserAgent($userAgent);

// Get geolocation data from IP
$geoData = getGeolocation($ipAddress);

// Prepare data for insertion
$visitData = [
    ':ip_address' => $ipAddress,
    ':device_type' => $deviceInfo['device_type'],
    ':browser_name' => $deviceInfo['browser_name'],
    ':browser_version' => $deviceInfo['browser_version'],
    ':operating_system' => $deviceInfo['operating_system'],
    ':country' => $geoData['country'] ?? 'Unknown',
    ':city' => $geoData['city'] ?? 'Unknown',
    ':region' => $geoData['region'] ?? 'Unknown',
    ':page_url' => $data['pageUrl'] ?? '',
    ':referrer' => $data['referrer'] ?? '',
    ':user_agent' => $userAgent,
    ':screen_resolution' => $data['screenResolution'] ?? '',
    ':language' => $data['language'] ?? '',
    ':timezone' => $data['timezone'] ?? '',
    ':session_id' => $sessionId
];

// Insert data into database
try {
    $stmt = $db->prepare("
        INSERT INTO visitors (
            ip_address, device_type, browser_name, browser_version,
            operating_system, country, city, region, page_url,
            referrer, user_agent, screen_resolution, language,
            timezone, session_id
        ) VALUES (
            :ip_address, :device_type, :browser_name, :browser_version,
            :operating_system, :country, :city, :region, :page_url,
            :referrer, :user_agent, :screen_resolution, :language,
            :timezone, :session_id
        )
    ");
    
    $stmt->execute($visitData);
    
    // Log to file (optional backup)
    $logEntry = date('Y-m-d H:i:s') . " | IP: $ipAddress | Device: {$deviceInfo['device_type']} | Location: {$geoData['city']}, {$geoData['country']}\n";
    file_put_contents(__DIR__ . '/visit_log.txt', $logEntry, FILE_APPEND);
    
    echo json_encode([
        'success' => true,
        'message' => 'Visit tracked successfully',
        'duplicate' => false,
        'data' => [
            'ip' => $ipAddress,
            'location' => $geoData['city'] . ', ' . $geoData['country'],
            'device' => $deviceInfo['device_type']
        ]
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to track visit'
    ]);
}

// ===============================================
// Helper Functions
// ===============================================

/**
 * Get visitor's real IP address
 */
function getVisitorIP() {
    $ipKeys = [
        'HTTP_CLIENT_IP',
        'HTTP_X_FORWARDED_FOR',
        'HTTP_X_FORWARDED',
        'HTTP_X_CLUSTER_CLIENT_IP',
        'HTTP_FORWARDED_FOR',
        'HTTP_FORWARDED',
        'REMOTE_ADDR'
    ];
    
    foreach ($ipKeys as $key) {
        if (array_key_exists($key, $_SERVER) === true) {
            foreach (explode(',', $_SERVER[$key]) as $ip) {
                $ip = trim($ip);
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false) {
                    return $ip;
                }
            }
        }
    }
    
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

/**
 * Parse user agent to extract device, browser, and OS info
 */
function parseUserAgent($userAgent) {
    $result = [
        'device_type' => 'Desktop',
        'browser_name' => 'Unknown',
        'browser_version' => '',
        'operating_system' => 'Unknown'
    ];
    
    // Detect device type
    if (preg_match('/mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i', $userAgent)) {
        if (preg_match('/ipad|tablet|kindle/i', $userAgent)) {
            $result['device_type'] = 'Tablet';
        } else {
            $result['device_type'] = 'Mobile';
        }
    }
    
    // Detect browser
    if (preg_match('/Chrome\/([0-9.]+)/i', $userAgent, $matches)) {
        $result['browser_name'] = 'Chrome';
        $result['browser_version'] = $matches[1];
    } elseif (preg_match('/Firefox\/([0-9.]+)/i', $userAgent, $matches)) {
        $result['browser_name'] = 'Firefox';
        $result['browser_version'] = $matches[1];
    } elseif (preg_match('/Safari\/([0-9.]+)/i', $userAgent, $matches) && !preg_match('/Chrome/i', $userAgent)) {
        $result['browser_name'] = 'Safari';
        $result['browser_version'] = $matches[1];
    } elseif (preg_match('/Edge\/([0-9.]+)/i', $userAgent, $matches)) {
        $result['browser_name'] = 'Edge';
        $result['browser_version'] = $matches[1];
    } elseif (preg_match('/MSIE ([0-9.]+)/i', $userAgent, $matches) || preg_match('/Trident.*rv:([0-9.]+)/i', $userAgent, $matches)) {
        $result['browser_name'] = 'Internet Explorer';
        $result['browser_version'] = $matches[1];
    }
    
    // Detect operating system
    if (preg_match('/Windows NT 10/i', $userAgent)) {
        $result['operating_system'] = 'Windows 10';
    } elseif (preg_match('/Windows NT 11/i', $userAgent)) {
        $result['operating_system'] = 'Windows 11';
    } elseif (preg_match('/Windows NT 6.3/i', $userAgent)) {
        $result['operating_system'] = 'Windows 8.1';
    } elseif (preg_match('/Windows NT 6.2/i', $userAgent)) {
        $result['operating_system'] = 'Windows 8';
    } elseif (preg_match('/Windows NT 6.1/i', $userAgent)) {
        $result['operating_system'] = 'Windows 7';
    } elseif (preg_match('/Windows/i', $userAgent)) {
        $result['operating_system'] = 'Windows';
    } elseif (preg_match('/Mac OS X ([0-9_]+)/i', $userAgent, $matches)) {
        $result['operating_system'] = 'Mac OS X ' . str_replace('_', '.', $matches[1]);
    } elseif (preg_match('/Mac/i', $userAgent)) {
        $result['operating_system'] = 'Mac OS';
    } elseif (preg_match('/Linux/i', $userAgent)) {
        $result['operating_system'] = 'Linux';
    } elseif (preg_match('/Android ([0-9.]+)/i', $userAgent, $matches)) {
        $result['operating_system'] = 'Android ' . $matches[1];
    } elseif (preg_match('/iPhone OS ([0-9_]+)/i', $userAgent, $matches)) {
        $result['operating_system'] = 'iOS ' . str_replace('_', '.', $matches[1]);
    } elseif (preg_match('/iPad.*OS ([0-9_]+)/i', $userAgent, $matches)) {
        $result['operating_system'] = 'iPadOS ' . str_replace('_', '.', $matches[1]);
    }
    
    return $result;
}

/**
 * Get geolocation data from IP address
 * Using free API: ip-api.com (no API key required)
 */
function getGeolocation($ip) {
    // Don't lookup local IPs
    if ($ip === '127.0.0.1' || $ip === '::1' || $ip === '0.0.0.0') {
        return [
            'country' => 'Localhost',
            'city' => 'Localhost',
            'region' => 'Localhost'
        ];
    }
    
    try {
        // Using ip-api.com (free, no API key needed)
        $url = "http://ip-api.com/json/{$ip}?fields=status,country,city,regionName";
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 3);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        if ($response) {
            $data = json_decode($response, true);
            if ($data && $data['status'] === 'success') {
                return [
                    'country' => $data['country'] ?? 'Unknown',
                    'city' => $data['city'] ?? 'Unknown',
                    'region' => $data['regionName'] ?? 'Unknown'
                ];
            }
        }
    } catch (Exception $e) {
        // Geolocation failed, return unknown
    }
    
    return [
        'country' => 'Unknown',
        'city' => 'Unknown',
        'region' => 'Unknown'
    ];
}

/**
 * Generate unique session ID
 */
function generateSessionId($ip) {
    return md5($ip . $_SERVER['HTTP_USER_AGENT'] . date('YmdH'));
}
?>

