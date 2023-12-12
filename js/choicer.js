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

        ShowNextCard(JSON.parse(content), choice);
    }, 1000);

    setTimeout(()=>
    {
        document.getElementById('OLD_CARD').remove();
        choicerIsAvailable = true;
    }, 2000);
}

function ShowNextCard(profile, choice)
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
    
    setTimeout(ParseAndFillCard(profile), 1000);
}

function ParseAndFillCard(profile)
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

    FillContent(profile);
}

function FillContent(profile)
{
    [profile.age, profile.distance, profile.status] = GetPreficses(profile);

    document.getElementById('avatar').style.backgroundImage = "url('" + profile.avatar != null ? profile.avatar : "../resources/icons/loadImage.png" + "')";
    document.getElementById('name').innerHTML               = profile.name;
    document.getElementById('age').innerHTML                = profile.age;
    document.getElementById('distance').innerHTML           = profile.distance;
    document.getElementById('status').innerHTML             = profile.status;
    document.getElementById('description').innerHTML        = profile.description;

    document.getElementById('newBanner').style.backgroundImage = "url('" + profile.avatar + "')";
    ShowNewBanner(profile.avatar);

    LoadImages(profile);

    LoadMediaButtons(profile);

    AddTagsToContainer(profile);

    ColorizeByTag("accountOpenCloseFiller", profile.color);
    ColorizeByTag("main", profile.color);
    ColorizeByTag("profileCardFiller", LightenDarkenColor(profile.color, -40));
    ColorizeAllBordersByTag("tag", LightenDarkenColor(profile.color, -40));
    ColorizeByTag("addTag", LightenDarkenColor(profile.color, -40));
}

function GetPreficses(profile)
{
    let age;
    let isNotMe = profile.username != selfProfileObj.username;

    if (isNotMe)
    {
        if (profile.age % 10 >= 2 && profile.age % 10 <= 4)
            age = profile.age + " год";
        else if (profile.age % 10 == 1)
            age = profile.age + " года";
        else
            age = profile.age + " лет";
    }
    else
    {
        age = profile.age;
    }

    return [age, profile.distance, profile.status];
}

function GetPhotoClassName(images)
{
    let length = 0;
    for (let i = 0; i < 4; i++)
    {
        if (images[i] != "")
            length++;
    }

    switch(length)
    {
        case 1:
            return "onePhotosGrid";
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
    let previousProfileBtnFillerColor = document.getElementById(tag).style.backgroundColor;
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
    let previousProfileBtnFillerColor = tagArray[0].style.borderColor;
    
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

function LoadImages(profile)
{
    [
        document.getElementsByClassName('avatar')[0], 
        document.getElementsByClassName('avatar')[1], 
        document.getElementsByClassName('bunner')[0]
    ].forEach(element => {
        element.style.backgroundImage = "url(" + profile.avatar + ")";
    });
    
    try
    {
        document.getElementById('images').classList.remove('onePhotosGrid');
        document.getElementById('images').classList.remove('twoPhotosGrid');
        document.getElementById('images').classList.remove('threePhotosGrid');
        document.getElementById('images').classList.remove('fourPhotosGrid');
    }
    catch(e)
    {

    }
    document.getElementById('images').innerHTML = '';
    document.getElementById('images').classList.add(GetPhotoClassName(profile.images));

    let counter = 0;
    profile.images.forEach(img => {
        counter++;

        if (img != "")
        {
            document.getElementById('images').insertAdjacentHTML(
                `beforeend`,
                `<div class="photo photo${counter}" id="${img + counter}"></div>`
            );

            document.getElementById(img + counter).style.backgroundImage = `url(${img})`
        }
    });
}

function AddTagsToContainer(profile)
{
    let isMe = profile.username == selfProfileObj.username;
    let tagsSide = isMe ? "leftTags" : "rightTags";

    document.querySelectorAll('.intoTagContainer').forEach(element => element.remove());

    for (let i = 0; i < profile.tags.length; i++)
    {
        let clickEventString = '';
        if (isMe)
        {
            clickEventString = ` onclick="OpenInterestValueSetter('${profile.tags[i].short_name}', ${profile.tags[i].value})"`;
        }

        document.getElementById(tagsSide).insertAdjacentHTML(
            `afterbegin`,
            `<div class="tag intoTagContainer"${clickEventString}>${profile.tags[i].name} | ${profile.tags[i].value}</div>`
        );
    }
}

function LoadMediaButtons(profile)
{
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
}