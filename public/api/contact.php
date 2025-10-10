<?php
/**
 * Contact Form Handler
 * 
 * یہ PHP script contact form سے data لے کر email بھیجتا ہے
 * This PHP script handles contact form submissions and sends emails
 */

// Enable CORS for local development
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

// Get JSON data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate input
if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['subject']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit();
}

// Sanitize input
$name = htmlspecialchars(strip_tags(trim($data['name'])));
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars(strip_tags(trim($data['subject'])));
$message = htmlspecialchars(strip_tags(trim($data['message'])));

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

// Email configuration
// یہاں اپنا email address ڈالیں / Add your email address here
$to = "muhammad.abid@example.com"; // Change this to your email
$email_subject = "Portfolio Contact: " . $subject;

// Email body
$email_body = "
You have received a new message from your portfolio website.

Name: $name
Email: $email
Subject: $subject

Message:
$message

---
This email was sent from your portfolio contact form.
";

// Email headers
$headers = "From: noreply@yourwebsite.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
try {
    $mail_sent = mail($to, $email_subject, $email_body, $headers);
    
    if ($mail_sent) {
        // Log successful submission (optional)
        $log_entry = date('Y-m-d H:i:s') . " - Message from: $name ($email)\n";
        file_put_contents(__DIR__ . '/contact_log.txt', $log_entry, FILE_APPEND);
        
        http_response_code(200);
        echo json_encode([
            'success' => true, 
            'message' => 'Message sent successfully!'
        ]);
    } else {
        throw new Exception('Failed to send email');
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Failed to send message. Please try again later.'
    ]);
    
    // Log error (optional)
    error_log("Contact form error: " . $e->getMessage());
}
?>

