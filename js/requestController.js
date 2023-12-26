async function SendRequest(type, url, data = null, token = '', showBloker = true)
{    
    if (showBloker)
        Blocker.Show();
    let result;

    await $.ajax
    ({
        type: type,
        data: JSON.stringify(data),
        url: url,
        async: true,
        headers: { 
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        success:function(serverData)
        {
            console.log(serverData);
            if (showBloker)
                Blocker.Close();

            result = serverData;
        },
        error: function(e)
        {
            if (showBloker)
                Blocker.Close();

            try{
                if (e.responseJSON.status == 401 && location.pathname != "/register.html")
                {
                    alert("Кажется ваша сессия истекла, вам следует авторизоваться заново!");
                    location.href = "register.html";
                }

                if (e.responseJSON.status == 403)
                {
                    ShowMessage("Кажется у вас нет прав на это действие! Попросите помощи админа или перезагрузитесь...", true);
                }
                else
                {
                    ShowMessage(`${e.responseJSON.status}: ${e.responseJSON.message}`, true);
                }
            }
            catch (err) 
            {
                ShowMessage(`Что-то пошло не так... Попробуйте позже)`, true);
            }      
            
            return null;
        }
    });

    return result;
}

function UploadChangedProfile(RAWprofile)
{    
    let token = Token.Get();

    if (token == null)
    {
        alert("Кажется ваша сессия истекла, вам следует авторизоваться заново!");
        location.href = "register.html";
    }

    let tagString = "";
    for (let i = 0; i < RAWprofile.tags.length; i++)
    {
        tagString += RAWprofile.tags[i].short_name + (RAWprofile.tags[i].value - 1);
    }

    let profile =
    {
        avatar_url: RAWprofile.avatar,
        name: RAWprofile.name,
        age: RAWprofile.age,
        description: RAWprofile.description,
        photo1: RAWprofile.images.length >= 1 ? RAWprofile.images[0] : "",
        photo2: RAWprofile.images.length >= 2 ? RAWprofile.images[1] : "",
        photo3: RAWprofile.images.length >= 3 ? RAWprofile.images[2] : "",
        photo4: RAWprofile.images.length >= 4 ? RAWprofile.images[3] : "",
        tags: tagString,
        instagram_url: RAWprofile.instagram,
        telegram_url: RAWprofile.telegram,
        vk_url: RAWprofile.vk,
        twitter_url: RAWprofile.twitter,
        color: RAWprofile.color
    }

    $.ajax
    ({
        type: "POST",
        data: JSON.stringify(profile),
        url: "http://localhost:8090/demo/me/profile/save",
        headers: { 
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        success:function(serverData)
        {
            console.log(serverData);

            result = serverData;
            profileWasChanged = true;
        },
        error: function(e)
        {
            try{
                if (e.responseJSON.status == 401 && location.pathname != "/register.html")
                {
                    alert("Кажется ваша сессия истекла, вам следует авторизоваться заново!");
                    location.href = "register.html";
                }

                ShowMessage(`${e.responseJSON.status}: ${e.responseJSON.message}`, true);
            }
            catch (err) 
            {
                ShowMessage(`Что-то пошло не так... Попробуйте позже)`, true);
            }      
        }
    });
}