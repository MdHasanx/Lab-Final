const handleLogin = () => {
    const userIdInput = document.getElementById("user-id");
    const passwordInput = document.getElementById("password");

    const userId = userIdInput.value;
    const password = passwordInput.value;

    const user = {
        userId: userId,
        password: password,
    };

    console.log(user);
};