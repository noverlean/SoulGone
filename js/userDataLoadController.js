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

    await Start();
    await SetSelfProfile(token);
    ProfileShowList.Fill();
    console.log("stop");

    ShowNextCard(JSON.parse(emptyContent));
}

async function SetSelfProfile(token)
{
    Blocker.Show();
    let data = await GetUserActivityData();
    Blocker.Close();
    let result = await SendRequest("POST", "http://localhost:8090/demo/me/profile/fetch", data, token);
    let tagCollection = await SendRequest("GET", "http://localhost:8090/demo/tags/fetch", null, token);
    let mutualLikesCollection = await SendRequest("GET", "http://localhost:8090/demo/profile/mutuals", null, token);
    FillMutualsProfilePanel(mutualLikesCollection);

    if (result != null)
    {
        selfProfileObj = ConvertProfileBackToFront(result);
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

function ConvertProfileBackToFront(profile)
{
    let result = 
    {
        username: profile.username,
        avatar: profile.avatar_url,
        name: profile.name,
        age: profile.age,
        distance: profile.distance,
        status: profile.last_session_string,
        description: profile.description,
        images: [],
        tags: profile.tags,
        instagram   : (profile.instagram_url  != null ? profile.instagram_url  : ""),
        telegram    : (profile.telegram_url   != null ? profile.telegram_url   : ""),
        vk          : (profile.vk_url         != null ? profile.vk_url         : ""),
        twitter     : (profile.twitter_url    != null ? profile.twitter_url    : ""),
        color       : profile.color != null ? profile.color : "#8a30e3",
    };

    result.images.push(profile.photo1 != null ? profile.photo1 : "");
    result.images.push(profile.photo2 != null ? profile.photo2 : "");
    result.images.push(profile.photo3 != null ? profile.photo3 : "");
    result.images.push(profile.photo4 != null ? profile.photo4 : ""); 

    return result;
}

mutualObjs = [];
function FillMutualsProfilePanel(mutuals)
{
    mutualObjs = [];
    let mutualsPanel = document.getElementById("mutualsPanel");
    for (let i = 0; i < mutuals.length; i++)
    {
        mutualObjs.push(mutuals[i]);
        mutualsPanel.insertAdjacentHTML(
            `afterbegin`,
            `
            <div class="mutualAvatar" id="mutualAvatar" onmouseover="OpenShortProfile(${i})"><img class="" src="${mutuals[i].avatar != null ? mutuals[i].avatar : '../resources/icons/loadImageCircul.png'}" alt=""></div>
            `
        );
    }
}