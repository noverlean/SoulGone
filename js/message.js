function ShowMessage(message, isBlocker = false)
{
    document.getElementById('message').innerHTML = message;
    document.getElementById('messagePanel').style.display = 'flex';
    if (isBlocker)
    {
        document.getElementById('messagePanel').removeEventListener('click', MessageCloseHAndler);
    }
    else
    {
        document.getElementById('messagePanel').addEventListener('click', MessageCloseHAndler); 
    }
}

function MessageCloseHAndler()
{
    document.getElementById('messagePanel').style.display = 'none'
}