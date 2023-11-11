<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="POST">
        Enter your guessed numbers: <input type="text" name='favourite'>
        <input type="submit" name="submit" value="Check Now">
    </form>
    <p> 
        <?php
            if(isset($_POST['submit'])){
                $k = $_POST["favourite"];
                $k = intval($k);

                switch ($k) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 8:
                    case 9:
                    case 10:
                        echo 'Your guess is wrong';
                        break;
                    case 7:
                        echo 'Your guess is right';
                        break;
                    default:
                        echo 'Your number is not between 1 and 10';
                        break;
                }
            }
        ?>
    </p>
</body>
</html>
