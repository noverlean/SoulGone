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

    ShowNextCard(content);
}

async function SetSelfProfile(token)
{
    Blocker.Show();
    let data = await GetUserActivityData();
    Blocker.Close();
    let result = await SendRequest("POST", "http://localhost:8090/demo/me/profile/fetch", data, token);
    
    if (result != null)
    {
        selfProfileObj = result;
    }
    else
    {
        ShowMessage("Ошибка при попытке получить ващ профиль! Попробуйте перезагрузить страницу (F5 или Shift + F5) либо авторизуйтесь.");
    }

    console.log(selfProfileObj);

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