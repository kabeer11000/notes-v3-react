<?php
if (isset($_GET['action']) && isset($_GET['username'])) {
    echo '
        <script>
        window.localStorage.setItem("user", JSON.stringify({username: "' . $_GET['username'] . '", firstname: "' . $_GET['firstname'] . '", lastname: "' . $_GET['lastname'] . '", user_id: "' . md5($_GET['username'] . $_GET['password']) . '", email: "' . $_GET['email'] . '"}));
        window.location.href = "/";
        </script>
    ';
}
