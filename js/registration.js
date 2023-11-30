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
            let name, email, password;

            if (registerMode == "signup")
            {
                name = document.getElementById('signupName').value.trim();
                email = document.getElementById('signupEmail').value.trim();
                password = document.getElementById('signupPassword').value.trim();

                // if (name.trim() == "" || email.trim() == "" || password.trim() == "")
                // {
                //     ShowMessage("Имя пользователя должно содержать от 2 до 15 латинских либо кирилических символов");
                //     return;
                // }

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

                if (name.trim() == "" || email.trim() == "" || password.trim() == "")
                {
                    ShowMessage("Не все поля заполнены!");
                    return;
                }

                RegisterUser(name, email, password);
            }
            else if (registerMode == "login")
            {
                email = document.getElementById('loginEmail').value.trim();
                password = document.getElementById('loginPassword').value.trim();

                if (email.trim() != "" && password.trim() != "")
                    LogIn(email, password);
                else
                    ShowMessage("Не все поля заполнены!");
            }
            break;
        case 2:
            let code = getElementById('code1').value + getElementById('code2').value + getElementById('code3').value + getElementById('code4').value;
            let username = localStorage.getItem('usernameForCodeAcception');
            ConfirmCode(username, code.toLowerCase());
            break;
        default:
            MoveNextStep(1);
    }
}

async function RegisterUser(name, email, password)
{
    let data = {
        "username": name.trim(), 
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
        LogIn(result.username, document.getElementById('signupPassword').value.trim());
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
    }
}

function ShowMessage(message)
{
    document.getElementById('message').innerHTML = message;
    document.getElementById('messagePanel').style.display = 'flex';
}

function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isPasswordValid(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/;
    return passwordRegex.test(password);
}
  