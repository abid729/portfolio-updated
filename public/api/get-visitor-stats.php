<?php
/**
 * Visitor Statistics API
 * Get visitor analytics and statistics
 * 
 * زائرین کے اعدادوشمار حاصل کریں
 */

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Simple authentication (optional - add password protection)
$authKey = $_GET['key'] ?? '';
$expectedKey = 'your_secret_key_here'; // Change this to a secure key

// Comment out the next 4 lines if you don't want authentication
// if ($authKey !== $expectedKey) {
//     http_response_code(401);
//     echo json_encode(['success' => false, 'message' => 'Unauthorized']);
//     exit();
// }

// Database connection
$dbFile = __DIR__ . '/visitors.db';

try {
    $db = new PDO('sqlite:' . $dbFile);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Total visitors
    $totalVisitors = $db->query("SELECT COUNT(*) FROM visitors")->fetchColumn();
    
    // Today's visitors
    $todayVisitors = $db->query("
        SELECT COUNT(*) FROM visitors 
        WHERE DATE(visit_time) = DATE('now')
    ")->fetchColumn();
    
    // This week's visitors
    $weekVisitors = $db->query("
        SELECT COUNT(*) FROM visitors 
        WHERE visit_time >= datetime('now', '-7 days')
    ")->fetchColumn();
    
    // This month's visitors
    $monthVisitors = $db->query("
        SELECT COUNT(*) FROM visitors 
        WHERE visit_time >= datetime('now', 'start of month')
    ")->fetchColumn();
    
    // Top countries
    $topCountries = $db->query("
        SELECT country, COUNT(*) as count 
        FROM visitors 
        WHERE country != 'Unknown'
        GROUP BY country 
        ORDER BY count DESC 
        LIMIT 10
    ")->fetchAll(PDO::FETCH_ASSOC);
    
    // Top cities
    $topCities = $db->query("
        SELECT city, country, COUNT(*) as count 
        FROM visitors 
        WHERE city != 'Unknown'
        GROUP BY city, country 
        ORDER BY count DESC 
        LIMIT 10
    ")->fetchAll(PDO::FETCH_ASSOC);
    
    // Device types
    $deviceTypes = $db->query("
        SELECT device_type, COUNT(*) as count 
        FROM visitors 
        GROUP BY device_type 
        ORDER BY count DESC
    ")->fetchAll(PDO::FETCH_ASSOC);
    
    // Top browsers
    $topBrowsers = $db->query("
        SELECT browser_name, COUNT(*) as count 
        FROM visitors 
        WHERE browser_name != 'Unknown'
        GROUP BY browser_name 
        ORDER BY count DESC 
        LIMIT 10
    ")->fetchAll(PDO::FETCH_ASSOC);
    
    // Top operating systems
    $topOS = $db->query("
        SELECT operating_system, COUNT(*) as count 
        FROM visitors 
        WHERE operating_system != 'Unknown'
        GROUP BY operating_system 
        ORDER BY count DESC 
        LIMIT 10
    ")->fetchAll(PDO::FETCH_ASSOC);
    
    // Recent visitors (last 50)
    $recentVisitors = $db->query("
        SELECT 
            ip_address,
            device_type,
            browser_name,
            operating_system,
            country,
            city,
            page_url,
            referrer,
            visit_time
        FROM visitors 
        ORDER BY visit_time DESC 
        LIMIT 50
    ")->fetchAll(PDO::FETCH_ASSOC);
    
    // Visits by hour (last 24 hours)
    $visitsByHour = $db->query("
        SELECT 
            strftime('%H', visit_time) as hour,
            COUNT(*) as count
        FROM visitors
        WHERE visit_time >= datetime('now', '-24 hours')
        GROUP BY hour
        ORDER BY hour
    ")->fetchAll(PDO::FETCH_ASSOC);
    
    // Visits by day (last 30 days)
    $visitsByDay = $db->query("
        SELECT 
            DATE(visit_time) as date,
            COUNT(*) as count
        FROM visitors
        WHERE visit_time >= datetime('now', '-30 days')
        GROUP BY date
        ORDER BY date
    ")->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'stats' => [
            'total' => $totalVisitors,
            'today' => $todayVisitors,
            'week' => $weekVisitors,
            'month' => $monthVisitors
        ],
        'topCountries' => $topCountries,
        'topCities' => $topCities,
        'deviceTypes' => $deviceTypes,
        'topBrowsers' => $topBrowsers,
        'topOS' => $topOS,
        'recentVisitors' => $recentVisitors,
        'visitsByHour' => $visitsByHour,
        'visitsByDay' => $visitsByDay
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error'
    ]);
}
?>

