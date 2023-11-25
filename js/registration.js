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
            MoveNextStep(1); 
            console.log("email");
            break;
        default:
            MoveNextStep(1);
    }
}

function RegisterUser(name, email, password)
{
    let data = {
        "username": name.trim(), 
        "email": email.trim(), 
        "password": password.trim()
    };

    SendRequest("POST", "http://localhost:8090/demo/registration", data, "register");
}

function LogIn(email, password)
{
    let data = {
        "email": email.trim(), 
        "password": password.trim()
    };

    SendRequest("POST", "http://localhost:8090/demo/auth", data, "login");
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
  