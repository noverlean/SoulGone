window.onload = Initialization();

async function Initialization()
{
    let token = Token.Get();
    console.log("start");

    if (token == null)
    {
        alert("Кажется ваша сессия истекла, вам следует авторизоваться заново!");
        location.href = "register.html";
    }

    await SetSelfProfile(token);
    console.log("stop");

    ShowNextCard(JSON.parse(content));
}

async function SetSelfProfile(token)
{
    Blocker.Show();
    let data = await GetUserActivityData();
    Blocker.Close();
    let result = await SendRequest("POST", "http://localhost:8090/demo/me/profile/fetch", data, token);
    let tagCollection = await SendRequest("POST", "http://localhost:8090/demo/tags/fetch", data, token);

    if (result != null)
    {
        selfProfileObj.username = result.username;
        selfProfileObj.avatar = result.avatar_url;
        selfProfileObj.name = result.name;
        selfProfileObj.age = result.age;
        selfProfileObj.distance = result.distance;
        selfProfileObj.status = result.last_session_string;
        selfProfileObj.description = result.description;

        selfProfileObj.images = [];
        result.photo1 != null ? selfProfileObj.images.push(result.photo1) : null;
        result.photo2 != null ? selfProfileObj.images.push(result.photo2) : null;
        result.photo3 != null ? selfProfileObj.images.push(result.photo3) : null;
        result.photo4 != null ? selfProfileObj.images.push(result.photo4) : null;    
        
        selfProfileObj.tags = result.tags;

        selfProfileObj.instagram    = result.instagram_url  != null ? result.instagram_url  : "";
        selfProfileObj.telegram     = result.telegram_url   != null ? result.telegram_url   : "";
        selfProfileObj.vk           = result.vk_url         != null ? result.vk_url         : "";
        selfProfileObj.twitter      = result.twitter_url    != null ? result.twitter_url    : "";
        selfProfileObj.color        = result.color;
    }
    else
    {
        ShowMessage("Ошибка при попытке получить ваш профиль! Попробуйте перезагрузить страницу (F5 или Shift + F5) либо авторизуйтесь.");
    }

    if (tagCollection != null)
    {
        tagCollection.forEach(tag => {
            let didFound = false;
            tags.forEach(category => {
                if (tag.category == category.category)
                {
                    didFound = true;

                    category.tags.push(tag.name);
                    category.tagShortnames.push(tag.short_name);
                }
            });

            if (!didFound)
            {
                tags.push({
                    category: tag.category,
                    tagShortnames: [
                        tag.short_name
                    ],
                    tags: [
                        tag.name
                    ]                    
                });
            }
        });
        console.log(tags);
        FillTagAddPanel()
    }
    else
    {
        ShowMessage("Ошибка при попытке получить список тэгов! Попробуйте перезагрузить страницу (F5 или Shift + F5) либо авторизуйтесь.");
    }
    // тут код для отправки запроса на получение таблиц индексов профилей пользователей для показа
}

async function GetUserActivityData()
{
    let position;

    await getLocation().then(p => {
        position = p.coords;
        console.log(`Широта: ${p.coords.latitude}, Долгота: ${p.coords.longitude}`);
        }).catch(error => {
        console.error(error);
    });
    
    let today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1).toString().padStart(2, '0')+'-'+today.getDate().toString().padStart(2, '0');
    console.log(date);

    return {
        position: `${position.latitude} ${position.longitude}`,
        lastSessionTime: date
    }
}

function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}