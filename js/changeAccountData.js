document.getElementById('nameEditInput').addEventListener(          'change', () => {EditAccountInput('nameEditInput',          'name',         false)});
document.getElementById('ageEditInput').addEventListener(           'change', () => {EditAccountInput('ageEditInput',           'age',          false)});
document.getElementById('descriptionEditInput').addEventListener(   'change', () => {EditAccountInput('descriptionEditInput',   'description',  false)});

document.getElementById('addTag').addEventListener('click', () => {});

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

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.querySelectorAll('[id=avatar]').forEach(element => {
                element.style.backgroundImage = "url(" + e.target.result + ")";
            });
            document.getElementById('bunner').style.backgroundImage = "url(" + e.target.result + ")";
        };
        reader.readAsDataURL(input.files[0]);
    }
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
            break;
        case 'linkEditTelegram':
            telegramInputDone = validationResult;
            break;
        case 'linkEditVK':
            vkInputDone = validationResult;
            break;
        case 'linkEditTwitter':
            twitterInputDone = validationResult;
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