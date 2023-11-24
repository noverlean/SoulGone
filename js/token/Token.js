var Token = {
    Save: (token) =>
    {
        localStorage.setItem("token", token);
    },
    Exist: () =>
    {
        return localStorage.getItem("token") != null;
    },
    Get: () =>
    {
        return localStorage.getItem("token");
    }
}

window.onload = () => location.pathname != "/register.html" ? SendRequest("POST", "http://localhost:8090/demo/auth", { "token": Token.Get() }, "tokenCheck") : () => {};