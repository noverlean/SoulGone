document.getElementById('like').addEventListener('click', Like);
document.getElementById('cross').addEventListener('click', Cross);

var choicerIsAvailable = true;

function Like()
{
    MakeChoice(true);
}

function Cross()
{
    MakeChoice(false);
}

function MakeChoice(choice)
{
    if (!choicerIsAvailable)
        return;

    choicerIsAvailable = false;

    document.getElementById('profileCardFiller').style.removeProperty('animation');
    document.getElementById('profileCardFiller').style.animation = "fillCardForLikeOut 2s cubic-bezier(.53,.03,.29,.91)";
    
    setTimeout(()=>
    {
        let profileCard = document.getElementById('profileCard');
        console.log(profileCard.children.length);

        let len = profileCard.children.length;
        for (let i = 0; i < len; i++)
        {
            if (profileCard.children[0].id != "profileCardFiller")
            {
                profileCard.children[0].remove();
            }
        }

        document.getElementById('profileCard').style.removeProperty('animation');
        if (choice)
    {
        document.getElementById('profileCard').style.animation = "cardOutLikeAnimation 1s cubic-bezier(.53,.03,.29,.91)";
    }
    else
    {
        document.getElementById('profileCard').style.animation = "cardOutCrossAnimation 1s cubic-bezier(.53,.03,.29,.91)";
    }
        document.getElementById('profileCard').id = "OLD_CARD";
        document.getElementById('profileCardFiller').id = "OLD_FILLER";

        ShowNextCard(content, choice);
    }, 1000);

    setTimeout(()=>
    {
        document.getElementById('OLD_CARD').remove();
        choicerIsAvailable = true;
    }, 2000);
}

ShowNextCard(content);
function ShowNextCard(json, choice)
{
    document.getElementById('like').insertAdjacentHTML(
        'beforebegin',
        `<div class="profileCard" id="profileCard"></div>`
    );
    document.getElementById('profileCard').style.removeProperty('animation');
    if (choice)
    {
        document.getElementById('profileCard').style.animation = "cardInLikeAnimation 1s cubic-bezier(.53,.03,.29,.91)";
    }
    else
    {
        document.getElementById('profileCard').style.animation = "cardInCrossAnimation 1s cubic-bezier(.53,.03,.29,.91)";
    }
    
    setTimeout(ParseAndFillCard(json), 1000);
}

function ParseAndFillCard(json)
{
    document.getElementById('profileCard').insertAdjacentHTML(
        'afterbegin',
        `<div class="avatar" id="avatar"></div>
            <div class="name" id="name"></div>
            <div class="subProfileData" id="subProfileData">
                <div class="age" id="age"></div>
                <div class="distance" id="distance"></div>
            </div>
            <div class="status" id="status"></div>
            <div class="description" id="description"></div>
            <div class="images" id="images"></div>
            <div class="media" id="media"></div>
            <div class="profileCardFiller" id="profileCardFiller">
        </div>`
    );
    document.getElementById('profileCardFiller').style.removeProperty('animation');
    document.getElementById('profileCardFiller').style.animation = "fillCardForLikeIn 1s cubic-bezier(.53,.03,.29,.91)";

    FillContent(json);
}

function FillContent(json)
{
    let profile = JSON.parse(json);

    [profile.age, profile.distance, profile.status] = GetPreficses(profile);
    console.log(profile.age);

    document.getElementById('avatar').style.backgroundImage = "url('" + profile.avatar + "')";
    document.getElementById('name').innerHTML               = profile.name;
    document.getElementById('age').innerHTML                = profile.age;
    document.getElementById('distance').innerHTML           = profile.distance;
    document.getElementById('status').innerHTML             = profile.status;
    document.getElementById('description').innerHTML        = profile.description;

    document.getElementById('newBanner').style.backgroundImage = "url('" + profile.avatar + "')";
    ShowNewBanner(profile.avatar);

    document.getElementById('images').classList.add(GetPhotoClassName(profile.images));

    let counter = 0;
    profile.images.forEach(element => {
        counter++;

        if (element != "")
        {
            document.getElementById('images').insertAdjacentHTML(
                `beforeend`,
                `<div class="photo photo` + counter + `" id="` + element + counter + `"></div>`
            );
        }

        document.getElementById(element + counter).style.backgroundImage = "url('" + element + "')";
    });

    let instagramState =    profile.instagram   != "" ? `Enabled` : `Disabled`;
    let twitterState =      profile.twitter     != "" ? `Enabled` : `Disabled`;
    let telegramState =     profile.telegram    != "" ? `Enabled` : `Disabled`;
    let vkState =           profile.vk          != "" ? `Enabled` : `Disabled`;    
    let instagramLink =     profile.instagram   != "" ? `href="` + profile.instagram + `"` : `#`;
    let twitterLink =       profile.twitter     != "" ? `href="` + profile.twitter + `"` : `#`;
    let telegramLink =      profile.telegram    != "" ? `href="` + profile.telegram + `"` : `#`;
    let vkLink =            profile.vk          != "" ? `href="` + profile.vk + `"` : `#`;  
    document.getElementById('media').innerHTML = "";
    document.getElementById('media').insertAdjacentHTML(
        `beforeend`,
        `<a ` + instagramLink + ` id="instagramLink" class="mediaButton instagram` + instagramState + `" target="_blank"></a>`
    );
    document.getElementById('media').insertAdjacentHTML(
        `beforeend`,
        `<a ` + telegramLink + ` id="telegramLink" class="mediaButton telegram` + telegramState + `" target="_blank"></a>`
    );
    document.getElementById('media').insertAdjacentHTML(
        `beforeend`,
        `<a ` + vkLink + `  id="vkLink" class="mediaButton vk` + vkState + `" target="_blank"></a>`
    );
    document.getElementById('media').insertAdjacentHTML(
        `beforeend`,
        `<a ` + twitterLink + ` id="twitterLink" class="mediaButton twitter` + twitterState + `" target="_blank"></a>`
    );

    ColorizeByTag("accountOpenCloseFiller", profile.color);
    ColorizeByTag("main", profile.color);
    ColorizeByTag("profileCardFiller", LightenDarkenColor(profile.color, -40));
    ColorizeAllBordersByTag("tag", LightenDarkenColor(profile.color, -40));
    ColorizeByTag("addTag", LightenDarkenColor(profile.color, -40));
}

function GetPreficses(profile)
{
    let age, distance, status;

    if (profile.age % 10 >= 2 && profile.age % 10 <= 4)
        age = profile.age + " год";
    else if (profile.age % 10 == 1)
        age = profile.age + " года";
    else
        age = profile.age + " лет";

    if (profile.distance > 10000)
        distance = "более 10 км";
    else if (profile.distance < 1000)
        distance = "менее 1 км";
    else
        distance = "около " + Math.round(profile.distance / 1000) + " км";

    status = profile.status ? "online" : "offline";

    return [age, distance, status];
}

function GetPhotoClassName(images)
{
    switch(images.length)
    {
        case 1:
            return "onePhotoGrid";
        case 2:
            return "twoPhotosGrid";
        case 3:
            return "threePhotosGrid";
        case 4:
            return "fourPhotosGrid";
    }
}

function ColorizeByTag(tag, color)
{
    let previousProfileBtnFillerColor = document.getElementById(tag).style.backgroundColor
    document.getElementById(tag).animate(
        [
            { backgroundColor: previousProfileBtnFillerColor },
            { backgroundColor: color },
        ],
        {
            duration: 500,
            iterations: 1,
        },
    );
    document.getElementById(tag).style.backgroundColor = color;
}

function ColorizeAllBordersByTag(tag, color)
{
    let tagArray = document.getElementsByClassName(tag);
    let previousProfileBtnFillerColor = tagArray[0].style.borderColor
    console.log(tagArray);
    for (let i = 0; i < tagArray.length; i++)
    {
        tagArray[i].animate(
            [
                { borderColor : previousProfileBtnFillerColor },
                { borderColor : color },
            ],
            {
                duration: 500,
                iterations: 1,
            },
        );
        tagArray[i].style.borderColor = color;
    }
    
}

function ShowNewBanner(image)
{
    document.getElementById("newBanner").animate(
        [
            { top: "700px" },
            { top: "0px" },
            { top: "0px" },
        ],
        {
            duration: 1000,
            iterations: 1,
        },
    );
    setTimeout(()=>document.getElementById('bunner').style.backgroundImage = "url('" + image + "')", 500);
}

function LightenDarkenColor(col, amt) {  
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    } 
    var num = parseInt(col,16); 
    var r = (num >> 16) + amt; 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0; 
    var b = ((num >> 8) & 0x00FF) + amt; 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0; 
    var g = (num & 0x0000FF) + amt; 
    if (g > 255) g = 255;
    else if (g < 0) g = 0; 
    let result = (g | (b << 8) | (r << 16)).toString(16);

    while (result.length != 6)
        result = "0" + result;

    return (usePound?"#":"") + result;  
}