
<?php

session_start();

if (!isset($_SESSION['username'])) {
    header("location: index.php");
    exit();
}
?>

<html>
<head>
    <title>Admin Panel</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <h2>Welcome, <?php echo $_SESSION['username']; ?>!</h2>
    <a href="logout.php">Logout</a>
</body>
</html>
