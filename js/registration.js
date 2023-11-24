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

                if (name.trim() != "" && email.trim() != "" && password.trim() != "")
                    RegisterUser(name, email, password);
                else
                    ShowMessage("Не все поля заполнены!")
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