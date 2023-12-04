var registerMode = 'signup';

document.getElementById('signup').addEventListener('click', () => SetRegisterMode('signup'));
document.getElementById('login').addEventListener('click', () => SetRegisterMode('login'));

function SetRegisterMode(mode)
{
    registerMode = mode;
}

function NextBTNHandler()
{
    switch (step)
    {
        case 1:
            let username, email, password;

            if (registerMode == "signup")
            {
                username = document.getElementById('signupName').value.trim();
                email = document.getElementById('signupEmail').value.trim();
                password = document.getElementById('signupPassword').value.trim();

                if (!isEmailValid(email))
                {
                    ShowMessage("Ваш адрес электронной почты неверен!");
                    return;
                }

                if (!isPasswordValid(password))
                {
                    ShowMessage("Ваш пароль электронной почты неверен! Он должен содержать от 8 до 16 символов, минимум 1 цифру или 1 букву. Разрешен только латинский алфавит любого регистра");
                    return;
                }

                if (username.trim() == "" || email.trim() == "" || password.trim() == "")
                {
                    ShowMessage("Не все поля заполнены!");
                    return;
                }

                RegisterUser(username, email, password);
            }
            else if (registerMode == "login")
            {
                let username = document.getElementById('loginUsername').value.trim();
                let password = document.getElementById('loginPassword').value.trim();

                if (username.trim() != "" && password.trim() != "")
                    LogIn(username, password);
                else
                    ShowMessage("Не все поля заполнены!");
            }
            break;
        case 2:
            let code = document.getElementById('code1').value + document.getElementById('code2').value + document.getElementById('code3').value + document.getElementById('code4').value;
            let name = localStorage.getItem('usernameForCodeAcception');
            ConfirmCode(name, code.toLowerCase());
            break;
        default:
            MoveNextStep(1);
    }
}

async function RegisterUser(username, email, password)
{
    let data = {
        "username": username.trim(), 
        "email": email.trim(), 
        "password": password.trim()
    };

    let result = await SendRequest("POST", "http://localhost:8090/demo/registration/code/generate", data);
    if (result != null)
    {
        localStorage.setItem('usernameForCodeAcception', result);
        MoveNextStep(1);
    }
}

async function ConfirmCode(username, code)
{
    let data = {
        "username": username.trim(),
        "code": code.trim()
    };

    let result = await SendRequest("POST", "http://localhost:8090/demo/registration/code/confirm", data);
    if (result != null)
    {
        localStorage.setItem('username', result.username);
        MoveNextStep(1);
    }
}

async function LogIn(username, password)
{
    let data = {
        "username": username.trim(), 
        "password": password.trim()
    };

    let result = await SendRequest("POST", "http://localhost:8090/demo/auth", data);
    if (result != null)
    {
        Token.Save(result.token);
        location.href = "index.html";
    }
}

function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isPasswordValid(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/;
    return passwordRegex.test(password);
}
  