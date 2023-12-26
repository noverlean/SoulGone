let centerInnerMousePosition;
let outDistance = 200;
let openIndex = -1;
async function OpenShortProfile(index)
{
  if (openIndex == index)
    return;
  openIndex = index;
  centerInnerMousePosition = mousePosition;
  shortProfile = mutualObjs[index];
  document.getElementById('shortProfileSide').style.visibility = "visible";
  document.getElementById('shortProfileSide').style.top = `${mousePosition.y - 80}px`;
  document.getElementById('shortProfileSide').style.left = `${mousePosition.x + 10}px`;

  document.getElementById('shortProfileAvatar').style.backgroundImage = `url('${shortProfile.avatar != null ? shortProfile.avatar : '../resources/icons/loadImageCircul.png'}')`;
  document.getElementById('shortProfileName').innerHTML = shortProfile.name;
  document.getElementById('shortProfileAge').innerHTML = shortProfile.age;
  document.getElementById('shortProfileEmail').innerHTML = "email: " + shortProfile.email;

  document.getElementById('shortProfileSocieties').innerHTML = "";
  if (shortProfile.instagram != null && shortProfile.instagram != '')
    document.getElementById('shortProfileSocieties').insertAdjacentHTML(
      `afterbegin`,
      `<a href="" class="instagram"></a>`
    );
  if (shortProfile.telegram != null && shortProfile.telegram != '')
    document.getElementById('shortProfileSocieties').insertAdjacentHTML(
      `afterbegin`,
      `<a href="" class="telegram"></a>`
    );
  if (shortProfile.vk != null && shortProfile.vk != '')
    document.getElementById('shortProfileSocieties').insertAdjacentHTML(
      `afterbegin`,
      `<a href="" class="vk"></a>`
    );
  if (shortProfile.twitter != null && shortProfile.twitter != '')
    document.getElementById('shortProfileSocieties').insertAdjacentHTML(
      `afterbegin`,
      `<a href="" class="twitter"></a>`
    );

  setTimeout(()=>{
      CloseShortProfile();
      openIndex = -1;
  }, 5000);
}

function CloseShortProfile()
{
  document.getElementById('shortProfileSide').style.visibility = "hidden";
}