document.getElementById('nameEditInput').addEventListener(          'change', () => {EditAccountInput('nameEditInput',          'name',         false)});
document.getElementById('ageEditInput').addEventListener(           'change', () => {EditAccountInput('ageEditInput',           'age',          false)});
document.getElementById('descriptionEditInput').addEventListener(   'change', () => {EditAccountInput('descriptionEditInput',   'description',  false)});

let linkEditInstagramInput  = document.getElementById('linkEditInstagram');
let linkEditTelegramInput   = document.getElementById('linkEditTelegram');
let linkEditVKInput         = document.getElementById('linkEditVK');
let linkEditTwitterInput    = document.getElementById('linkEditTwitter');

linkEditInstagramInput.addEventListener('blur', () => {
    LinkAcceptance('linkEditInstagram');
    EditAccountInput('linkEditInstagram', 'instagramLink', true);
});
linkEditTelegramInput.addEventListener('blur', () => {
    LinkAcceptance('linkEditTelegram');
    EditAccountInput('linkEditTelegram', 'telegramLink', true);
});
linkEditVKInput.addEventListener('blur', () => {
    LinkAcceptance('linkEditVK');
    EditAccountInput('linkEditVK', 'vkLink', true);
});
linkEditTwitterInput.addEventListener('blur', () => {
    LinkAcceptance('linkEditTwitter');
    EditAccountInput('linkEditTwitter', 'twitterLink', true);
});

linkEditInstagramInput.addEventListener('change', () => {linkEditInstagramInput.blur()});
linkEditTelegramInput.addEventListener('change', () => {linkEditTelegramInput.blur()});
linkEditVKInput.addEventListener('change', () => {linkEditVKInput.blur()});
linkEditTwitterInput.addEventListener('change', () => {linkEditTwitterInput.blur()});

linkEditInstagramInput.addEventListener('focus',    () => ChangeInputColor(linkEditInstagramInput,  'changing'));
linkEditTelegramInput.addEventListener( 'focus',    () => ChangeInputColor(linkEditTelegramInput,   'changing'));
linkEditVKInput.addEventListener(       'focus',    () => ChangeInputColor(linkEditVKInput,         'changing'));
linkEditTwitterInput.addEventListener(  'focus',    () => ChangeInputColor(linkEditTwitterInput,    'changing'));

var profileWasChanged = false;

function ClearAllPhotos()
{
    for (let i = 0; i < 4; i++)
    {
        selfProfileObj.images[i] = "";
        document.getElementById("imageEditInput" + (i+1)).style.backgroundImage = `url('resources/icons/loadImage.png')`
    }
    LoadImages(selfProfileObj);
}

async function readAvatarURL(input) {
    if (input.files && input.files[0]) {
        resizeImageAndHandle(input.files[0], input.clientWidth, (value) => { selfProfileObj.avatar = value }, [
            document.getElementsByClassName('avatar')[0], 
            document.getElementsByClassName('avatar')[1], 
            document.getElementsByClassName('bunner')[0]
        ]);
    }
}

function readPhotoURL(input, id) {
    if (input.files && input.files[0]) {
        if (selfProfileObj.images.length < id)
        {
            selfProfileObj.images.push("");
        }

        let targetElements;
        let targetFieldLoader;
        if (selfProfileObj.images.length < id)
        {
            targetElements = [document.getElementById(`imageEditInput${selfProfileObj.images.length}`)];
            targetFieldLoader = (value) => { selfProfileObj.images[selfProfileObj.images.length-1] = value };
        }
        else
        {
            targetElements = [input];
            targetFieldLoader = (value) => { selfProfileObj.images[id-1] = value };
        }

        resizeImageAndHandle(input.files[0], 300, targetFieldLoader, targetElements, false);
    }
}

function loadBase64Image(imageStr, targetElements, isPhoto)
{
    const img = new Image();
    img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(this, 0, 0);

        const dataURL = canvas.toDataURL();
        targetElements.forEach(element => 
            element.style.backgroundImage = `url(${dataURL})`
        );
        if (isPhoto)
        {
            LoadImages(selfProfileObj);
        }
    };
    img.src = imageStr;
}

function resizeImageAndHandle(file, minSize, targetFieldLoader, targetElements, keepWidth = true) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function() {
            const canvas = document.createElement('canvas');
            if (keepWidth)
            {
                scaleFactor = minSize / img.width;
                canvas.width = minSize;
                canvas.height = img.height * scaleFactor;
            }
            else
            {
                scaleFactor = minSize / img.height;
                canvas.width = img.width * scaleFactor;
                canvas.height = minSize;
            }
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL();
            targetFieldLoader(dataURL);
            loadBase64Image(dataURL, targetElements, !keepWidth);
        };
    };
}

function ChangeProfileColor(input)
{
    selfProfileObj.color = input.value;

    ColorizeByTag("accountOpenCloseFiller", selfProfileObj.color);
    ColorizeByTag("main", selfProfileObj.color);
    ColorizeByTag("profileCardFiller", LightenDarkenColor(selfProfileObj.color, -40));
    ColorizeAllBordersByTag("tag", LightenDarkenColor(selfProfileObj.color, -40));
    ColorizeByTag("addTag", LightenDarkenColor(selfProfileObj.color, -40));
}

function EditAccountInput(fromId, toId, isLink)
{
    let from = document.getElementById(fromId);
    let to = document.getElementById(toId);

    if (isLink)
    {
        // --------------------------------------------------------------
        // изменение состояния кнопки для кнопок медиа ссылок
        // для простоты масштабирования вычисления подключаемых и отключаемых классов 
        // происходит парсингом ранее подключенных классов
        //  || !ValidateURL(from.id, to.getAttribute('href'))
        if (from.value == "" || !ValidateURL(fromId, from.value))
        {
            to.removeAttribute('href');

            to.classList.forEach(element =>
            {
                if (element.lastIndexOf('E') != -1)
                {
                    to.classList.remove(element);
                    to.classList.add(element.substring(0, element.lastIndexOf('E')) + "Disabled");
                }
            });
        }
        else
        {
            to.setAttribute("href", from.value);

            to.classList.forEach(element =>
            {
                if (element.lastIndexOf('D') != -1)
                {
                    to.classList.remove(element);
                    to.classList.add(element.substring(0, element.lastIndexOf('D')) + "Enabled");
                }
            });
        }
        // ------------------------------------------------------------
    }        
    else
    {
        to.innerHTML = from.value;

        switch (toId)
        {
            case "name":
                selfProfileObj.name = from.value;
                break;
            case "age":
                selfProfileObj.age = from.value;
                break;
            case "description":
                selfProfileObj.description = from.value;
                break;
        }
    }
}

function AllLinksAreValid() 
{
    return instagramInputDone && telegramInputDone && vkInputDone && twitterInputDone;
}

function LinkAcceptance(id)
{
    let element = document.getElementById(id);
    let url = element.value;
    let validationResult = ValidateURL(id, url);

    if (validationResult)
    {
        ChangeInputColor(element, true);
    }
    else
    {
        ChangeInputColor(element, false);
    }

    switch (id)
    {
        case 'linkEditInstagram':
            instagramInputDone = validationResult;
            selfProfileObj.instagram = validationResult ? url : "";
            break;
        case 'linkEditTelegram':
            telegramInputDone = validationResult;
            selfProfileObj.telegram = validationResult ? url : "";
            break;
        case 'linkEditVK':
            vkInputDone = validationResult;
            selfProfileObj.vk = validationResult ? url : "";
            break;
        case 'linkEditTwitter':
            twitterInputDone = validationResult;
            selfProfileObj.twitter = validationResult ? url : "";
            break;
    }
}

function ValidateURL(id, url)
{
    let result = false;

    try
    {
        switch (id)
        {
            case 'linkEditInstagram':
                result = url.match('www.instagram.com/') !== null || url == "";
                break;
            case 'linkEditTelegram':
                result = url.match('t.me/') !== null || url == "";
                break;
            case 'linkEditVK':
                result = url.match('vk.com/') !== null || url == "";
                break;
            case 'linkEditTwitter':
                result = url.match('twitter.com/') !== null || url == "";
                break;
        }   
    }
    catch
    {

    }

    return result;
}

function ChangeInputColor(element, value)
{
    switch (value)
    {
        case true:
            element.style.backgroundColor = '#beffb8';
            break;
        case false:
            element.style.backgroundColor = '#ffb8b8';
            break;
        case 'changing':
            element.style.backgroundColor = 'white'
            break;
    }
}

var tagPanelVisibility = false;
function OpenTagPanel()
{
    document.getElementById('tagAddPanelBackground').style.visibility = tagPanelVisibility ? 'hidden' : 'visible';
    tagPanelVisibility = !tagPanelVisibility;
}

function SearchTag()
{
    let context = document.getElementById('tagSearchInput').value;

    if (context == "")
    {
        FillTagAddPanel();
        return;
    }

    document.getElementById('tagAddListContainer').innerHTML = "";

    for (let i = 0; i < tags.length; i++)
    {
        if (tags[i].category.toLowerCase().includes(context.toLowerCase()))
        {
            document.getElementById('tagAddListContainer').insertAdjacentHTML(
                `afterbegin`,
                `<div id="${tags[i].category}" class="tagAddListBlock"><p>${tags[i].category}</p></div>` +
                `<div class="tagAddListSlicer"></div>`
            );

            for (let k = 0; k < tags[i].tags.length; k++)
            {
                document.getElementById(tags[i].category).insertAdjacentHTML(
                    `beforeend`,
                    `<div class="tag" onclick="AddAndRemoveTagToMyTags('${tags[i].tags[k]}')">${tags[i].tags[k]}</div>`
                );
            }
        }

        for (let k = 0; k < tags[i].tags.length; k++)
        {
            if (tags[i].tags[k].toLowerCase().includes(context.toLowerCase()))
            {
                let myTagStyle = '';            

                if (IndexOfTag(tags[i].tags[k]) != -1)
                {
                    myTagStyle = `style="background-color: ${LightenDarkenColor(selfProfileObj.color, 50)} !important;"`;
                }

                document.getElementById('tagAddListContainer').insertAdjacentHTML(
                    `beforeend`,
                    `<div class="tag" ${myTagStyle} onclick="AddAndRemoveTagToMyTags('${tags[i].tagShortnames[k]}')">${tags[i].tags[k]}</div>`
                );
            }
        }
    } 
}

function FillTagAddPanel()
{
    document.getElementById('tagAddListContainer').innerHTML = "";

    for (let i = 0; i < tags.length; i++)
    {
        document.getElementById('tagAddListContainer').insertAdjacentHTML(
            `afterbegin`,
            `<div id="${tags[i].category}" class="tagAddListBlock"><p>${tags[i].category}</p></div>`
        );
        if (i != tags.length - 1)
            document.getElementById('tagAddListContainer').insertAdjacentHTML(
                `afterbegin`,
                `<div class="tagAddListSlicer"></div>`
            );

        for (let k = 0; k < tags[i].tagShortnames.length; k++)
        {
            let myTagStyle = '';            

            if (IndexOfTag(tags[i].tagShortnames[k]) != -1)
            {
                myTagStyle = `style="background-color: ${LightenDarkenColor(selfProfileObj.color, 50)} !important;"`;
            }

            document.getElementById(tags[i].category).insertAdjacentHTML(
                `beforeend`,
                `<div class="tag" ${myTagStyle} onclick="AddAndRemoveTagToMyTags('${tags[i].tagShortnames[k]}')">${tags[i].tags[k]}</div>`
            );
        }
    }    
}

function AddAndRemoveTagToMyTags(tagShortname)
{
    let index = IndexOfTag(tagShortname);

    if (index == -1)
    {
        selfProfileObj.tags.push({category:GetTagCategoryByShortname(tagShortname), name:GetTagNameByShortname(tagShortname), short_name:tagShortname, value:5});
        // selfProfileObj.tags.push([tagShortname, 5]);
    }
    else
    {
        selfProfileObj.tags.splice(index, 1);
    }

    FillTagAddPanel();
    AddTagsToContainer(selfProfileObj);
}

function IndexOfTag(tagShortname)
{
    let index = -1;

    for (let i = 0; i < selfProfileObj.tags.length; i++)
    {
        if (selfProfileObj.tags[i].short_name == tagShortname)
        {
            index = i;
            break;
        }
    }

    return index;
}

function OpenInterestValueSetter(tagShortname, existValue)
{
    document.body.insertAdjacentHTML(
        `beforeend`,
        `<div id="tagValueOverlayBackground" class="tagValueOverlayBackground" onclick="ClosetagValueOverlay()">
            <div id="tagValueOverlay" class="tagValueOverlay" onclick="event.stopPropagation()">
                <div id="tagValues10" class="tagValues" onclick="SetInterestValue('${tagShortname}', 10)">10</div>
                <div id="tagValues9" class="tagValues" onclick="SetInterestValue('${tagShortname}', 9)">9</div>
                <div id="tagValues8" class="tagValues" onclick="SetInterestValue('${tagShortname}', 8)">8</div>
                <div id="tagValues7" class="tagValues" onclick="SetInterestValue('${tagShortname}', 7)">7</div>
                <div id="tagValues6" class="tagValues" onclick="SetInterestValue('${tagShortname}', 6)">6</div>
                <div id="tagValues5" class="tagValues" onclick="SetInterestValue('${tagShortname}', 5)">5</div>
                <div id="tagValues4" class="tagValues" onclick="SetInterestValue('${tagShortname}', 4)">4</div>
                <div id="tagValues3" class="tagValues" onclick="SetInterestValue('${tagShortname}', 3)">3</div>
                <div id="tagValues2" class="tagValues" onclick="SetInterestValue('${tagShortname}', 2)">2</div>
                <div id="tagValues1" class="tagValues" onclick="SetInterestValue('${tagShortname}', 1)">1</div>
            </div>
        </div>`
    );

    document.getElementById("tagValues" + existValue).style.backgroundColor = LightenDarkenColor(selfProfileObj.color, 50);

    document.getElementById("tagValueOverlay").style.left = `${mousePosition.x + 20}px`;
    document.getElementById("tagValueOverlay").style.top = `${mousePosition.y - 45}px`;
}

function GetTagNameByShortname(tagShortname)
{
    let result;
    tags.forEach(category => {
        for (let i = 0; i < category.tagShortnames.length; i++)
        {
            if (category.tagShortnames[i] == tagShortname)
            {
                result = category.tags[i];
            }
        }
    });
    return result;
}

function GetTagCategoryByShortname(tagShortname)
{
    let result;
    tags.forEach(category => {
        for (let i = 0; i < category.tagShortnames.length; i++)
        {
            if (category.tagShortnames[i] == tagShortname)
            {
                result = category.category;
            }
        }
    });
    return result;
}

function ClosetagValueOverlay()
{
    document.getElementById('tagValueOverlayBackground').remove();
}

function SetInterestValue(tagShortname, endValue)
{
    selfProfileObj.tags[IndexOfTag(tagShortname)].value = endValue;

    AddTagsToContainer(selfProfileObj);
    ClosetagValueOverlay();
}