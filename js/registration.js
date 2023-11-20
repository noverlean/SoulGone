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
        case 2:
            if (registerMode == "signup")
            {
                RegisterUser(
                    document.getElementById('signupName').value,
                    document.getElementById('signupEmail').value,
                    document.getElementById('signupPassword').value
                    );
            }
            else if (registerMode == "login")
            {
                LogIn(
                    document.getElementById('loginEmail').value,
                    document.getElementById('loginPassword').value
                );
            }
            break;
        case 3:
            console.log("email");
            break;
        default:
            console.log("Button have not handler!!!");
    }
}

function RegisterUser(name, email, password)
{

}

function LogIn(email, password)
{

}