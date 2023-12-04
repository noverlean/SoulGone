document.getElementById('accountOpenCloseButton').addEventListener('click', OpenAccount);

var state = false;

let instagramInputDone = true;
let telegramInputDone = true;
let vkInputDone = true;
let twitterInputDone = true;

function OpenAccount()
{
    if (!choicerIsAvailable)
        return;

    choicerIsAvailable = false;
    state = !state;

    if (state)
    {
        document.getElementById('accountOpenCloseFiller').style.animation = "showMyProfileBtn 1s cubic-bezier(.53,.03,.29,.91)";
        document.getElementById('accountOpenCloseFiller').style.height = '100%';

        document.getElementById('profileCard').style.animation = "showMyProfile2 1s cubic-bezier(.53,.03,.29,.91)";

        VerticalScaleAnimation("like", 1, 0);
        VerticalScaleAnimation("cross", 1, 0);
        VerticalScaleAnimation("rightTags", 1, 0);
        
        setTimeout(()=>{
            VerticalScaleAnimation("leftTags", 0, 1);
            VerticalScaleAnimation("avatarLoader", 0, 1);
            VerticalScaleAnimation("nameEdit", 0, 1);
            VerticalScaleAnimation("ageDescriptionEdit", 0, 1);
            VerticalScaleAnimation("imageEdit", 0, 1);
            VerticalScaleAnimation("linkEdit", 0, 1);
        }, 500);
    }
    else
    {        
        document.getElementById('accountOpenCloseFiller').style.animation = "showMyProfileBtnReversed 1s cubic-bezier(.53,.03,.29,.91)";
        document.getElementById('accountOpenCloseFiller').style.height = '0%';

        document.getElementById('profileCard').style.animation = "showMyProfile 1s cubic-bezier(.53,.03,.29,.91)";

        VerticalScaleAnimation("leftTags", 1, 0);
        VerticalScaleAnimation("avatarLoader", 1, 0);
        VerticalScaleAnimation("nameEdit", 1, 0);
        VerticalScaleAnimation("ageDescriptionEdit", 1, 0);
        VerticalScaleAnimation("imageEdit", 1, 0);
        VerticalScaleAnimation("linkEdit", 1, 0);

        setTimeout(()=>{
            VerticalScaleAnimation("like", 0, 1);
            VerticalScaleAnimation("cross", 0, 1);
            VerticalScaleAnimation("rightTags", 0, 1);
        }, 500);
    }
        
    setTimeout(()=>{
        if (state)
            FillContent(selfProfileObj);
        else            
            FillContent(content);
    }, 500);

    setTimeout(()=>{
        choicerIsAvailable = true;
    }, 1000);
}

function VerticalScaleAnimation(tag, startValue, endValue)
{
    document.getElementById(tag).animate(
        [
            { scale: startValue },
            { scale: endValue },
        ],
        {
            duration: 600,
            iterations: 1,
        },
    );

    if (endValue == 1)
    {
        document.getElementById(tag).style.display = "flex";
    }
    else
    {
        setTimeout(()=>{        
            document.getElementById(tag).style.display = "none";
        }, 500);
    }
    
    setTimeout(()=>{        
        document.getElementById(tag).style.scale = endValue;

        FillAccountEditorPanels(selfProfileObj);
    }, 500);
}

function FillAccountEditorPanels(profile)
{
    document.getElementById('nameEditInput').value = profile.name;
    document.getElementById('ageEditInput').value = profile.age;
    document.getElementById('descriptionEditInput').value = profile.description;

    for (let i = 0; i < 4; i++)
    {
        if (profile.images[i] != undefined)
        {
            document.getElementById('imageEditInput' + (i + 1)).style.backgroundImage = 'url(' + profile.images[i] +' )';
            document.getElementById('imageEditInput' + (i + 1)).style.backgroundSize = "cover";
        }
    }    

    document.getElementById('linkEditInstagram').value = profile.instagram;
    document.getElementById('linkEditTelegram').value = profile.telegram;
    document.getElementById('linkEditVK').value = profile.vk;
    document.getElementById('linkEditTwitter').value = profile.twitter;
}