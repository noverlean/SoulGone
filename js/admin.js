async function Start()
{
    let isAdminStart = await SendRequest("GET", "http://localhost:8090/demo/checkrole", null, Token.Get(), true);
    console.log(isAdminStart.body[0]);
    if (isAdminStart.body[0] == 2)
    {
        document.getElementById('adminPanelOpenBTN').style.visibility = "visible";
    }
}               

var usersForAdminPanel = [];
async function GetAllUsersForAdmin()
{
    let serverData = await SendRequest("GET", "http://localhost:8090/demo/admin/users", null, Token.Get(), false);

    document.getElementById('adminUsersPanel').innerHTML = "";
    usersForAdminPanel = serverData;
    for (let i = 0; i < serverData.length; i++)
    {
        document.getElementById('adminUsersPanel').insertAdjacentHTML(
            `afterbegin`,
            `<div class="adminUserRecord" ${serverData[i].available ? '' : 'style="background-color: #6d6d6d;"'} onclick="SelectUserByAdmin(${i})">
                <div class="adminUserRecordId" id="adminUserRecordId">${serverData[i].id}</div>
                <div style="width: 150px">${serverData[i].username}</div>
                <div style="width: 200px">${serverData[i].name}</div>
                <div style="width: 25px">${serverData[i].age}</div>
                <div style="width: 120px">${serverData[i].lastSessionTime}</div>
                <div class="${serverData[i].isAdmin ? 'adminUserRecordAdmin' : 'adminUserRecordUser'}"></div>
            </div>`
        );
    }
}

let currentUserIndex = -1;
function SelectUserByAdmin(index)
{
    currentUserIndex = index;
    document.getElementById('currentUserId').innerHTML = usersForAdminPanel[index].id;
    document.getElementById('currentUserUsername').innerHTML = usersForAdminPanel[index].username;
    document.getElementById('currentUserName').innerHTML = usersForAdminPanel[index].name;
    document.getElementById('currentUserAge').innerHTML = usersForAdminPanel[index].age;
    document.getElementById('currentUserEmail').innerHTML = usersForAdminPanel[index].email;
    document.getElementById('currentUserLastSessionTime').innerHTML = usersForAdminPanel[index].lastSessionTime;
    try{
        document.getElementById('currentUserIsAdmin').classList.remove('adminUserRecordUser');
        document.getElementById('currentUserIsAdmin').classList.remove('adminUserRecordAdmin');
    }
    catch(e)
    {

    }
    document.getElementById('currentUserIsAdmin').classList.add(usersForAdminPanel[index].isAdmin ? 'adminUserRecordAdmin' : 'adminUserRecordUser');
    
    try{
        document.getElementById('currentUserIsAvailable').classList.remove('adminUserRecordAvailable');
        document.getElementById('currentUserIsAvailable').classList.remove('adminUserRecordUnavailable');
    }
    catch(e)
    {

    }
    document.getElementById('currentUserIsAvailable').classList.add(!usersForAdminPanel[index].available ? 'adminUserRecordAvailable' : 'adminUserRecordUnavailable');
}

async function setUserAsAdmin()
{
    let result = await SendRequest("POST", `http://localhost:8090/demo/admin/setas${usersForAdminPanel[currentUserIndex].isAdmin ? "user" : "admin"}`, {"username":usersForAdminPanel[currentUserIndex].username}, Token.Get(), false);
    console.log(result);
    if (result == "ok")
    {
        usersForAdminPanel[currentUserIndex].isAdmin = !usersForAdminPanel[currentUserIndex].isAdmin;

        try{
            document.getElementById('currentUserIsAdmin').classList.remove('adminUserRecordUser');
            document.getElementById('currentUserIsAdmin').classList.remove('adminUserRecordAdmin');
        }
        catch(e)
        {
        }
        document.getElementById('currentUserIsAdmin').classList.add(usersForAdminPanel[currentUserIndex].isAdmin ? 'adminUserRecordAdmin' : 'adminUserRecordUser');

        GetAllUsersForAdmin();
    }
}

async function setUserAsAvailable()
{
    let result = await SendRequest("POST", `http://localhost:8090/demo/admin/setas${usersForAdminPanel[currentUserIndex].available ? "unavailable" : "available"}`, {"username":usersForAdminPanel[currentUserIndex].username}, Token.Get(), false);
    console.log(result);
    if (result == "ok")
    {
        usersForAdminPanel[currentUserIndex].available = !usersForAdminPanel[currentUserIndex].available;

        try{
            document.getElementById('currentUserIsAvailable').classList.remove('adminUserRecordAvailable');
            document.getElementById('currentUserIsAvailable').classList.remove('adminUserRecordUnavailable');
        }
        catch(e)
        {
        }
        document.getElementById('currentUserIsAvailable').classList.add(usersForAdminPanel[currentUserIndex].available ? 'adminUserRecordAvailable' : 'adminUserRecordUnavailable');

        GetAllUsersForAdmin();
    }
}

async function downloadUserProfile()
{
    let profile = await SendRequest("POST", "http://localhost:8090/demo/profile/download", {"username":usersForAdminPanel[currentUserIndex].username}, Token.Get(), false);
    console.log(profile);
    downloadFile(usersForAdminPanel[currentUserIndex].username, JSON.stringify(profile));
}

function downloadFile(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}