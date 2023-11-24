<!DOCTYPE html>
<html>
<head>
    <title>Admin Panel Login</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <?php include("login.php"); ?>
    <form action="login.php" method="post">
        <h2>Login</h2>
        <label for="username">Username:</label>
        <input type="text" name="username" required>

        <label for="password">Password:</label>
        <input type="password" name="password" required>

        <input type="submit" value="Login">
    </form>
</body>
</html>