<?php
//detect form submission
//using isset helps to control "reload" errors if form not submitted yet
if (!empty($_POST['username']) && (!empty($_POST['password']))) {
    //STEP #1: Establish Username, Add Salt to md5 encrypted password
    $username = $_POST['username'];
    $salt     = "saltedhash";
    $password = md5($_POST['password'] . $salt); // run md5 on $salt + original password


    //STEP #2: Check for the hashed & salted password "secrets"
    //We'll learn how to validate against a database later...
    //EXTRA: Add Basic User Login Validation
    if ($username == "" && $password == md5("secrets" . $salt)) {
        header("Location: ../partials/home/html");
    } else {
        echo "Error!! Incorrect username or password (please try again):<br>";
        echo "<br>" . "Username: {$username}" . "<br>";
        echo "Password (--with a Dash of Salt): {$password}";
        echo "<br><br><a href='login.html'>" . "Go Back" . "</a> ";
    }
    //else if Form is submitted with empty fields, give details...
} else {
    echo "Error -No input. Please try again..." . "<a href='login.html'>", "Go Back" . "</a>";
    $username = "default user (no input)";
    $password = "default pass (no input)";
    echo "<br>" . "Username: {$username}" . "<br>";
    echo "Password: {$password}";
}
?>

<pre>
    <?php
print_r($_POST); //shows what the user typed info form using Super Global $_POST
?>
</pre>

