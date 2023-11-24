function SendRequest(type, url, data, handlerContext)
{    
    Blocker.Show();

    $.ajax
    ({
        type: type,
        data: JSON.stringify(data),
        url: url,
        headers: { 
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
            'Content-Type': 'application/json'
        },
        success:function(serverData)
        {
            console.log(serverData);
            Blocker.Close();

            switch (handlerContext)
            {
                case "login":
                    MoveNextStep(1);
                    break;
                case "register":
                    if (email.trim() != "" && password.trim() != "")
                        LogIn(data.email.trim(), data.password.trim());
                    else
                        ShowMessage("Не все поля заполнены!");
                    break;
                case "tokenCheck":
                    Token.Save(serverData.token);
                    break;
                default:
                    console.log("No success handler!");
            }
        },
        error: function(e)
        {
            Blocker.Close();

            try{
                if (e.responseJSON.status == 401 && location.pathname != "/register.html")
                {
                    alert("Кажется ваша сессия истекла, вам следует авторизоваться заново!");
                    location.href = "../register.html";
                }

                ShowMessage(`${e.responseJSON.status}: ${e.responseJSON.message}`);
            }
            catch (err) 
            {
                ShowMessage(`Что-то пошло не так... Попробуйте позже)`);
            }            
        }
    });
}