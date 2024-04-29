<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $description = $_POST["description"];

    $to = "annikasanthanam@gmail.com";
    $subject = "Contact Form Submission";
    $message = "Name: " . $name . "\n\nEmail: " . $email . "\n\nDescription: " . $description;

    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $message, $headers)) {
        echo "Thank you for contacting me! I will get back to you soon!";
    } else {
        echo "Sorry, there was an error sending your message. Please try again later.";
    }
}
?>
<!-- php.validate.executablePath -->