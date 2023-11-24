
<?php
include("admin.php");
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $result = mysqli_query($con, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $_SESSION['username'] = $username;
        header("location: admin_panel.php");
        exit();
    } else {
        echo "Invalid username or password";
    }
} else {
    header("location: index.php");
    exit();
}
?>
