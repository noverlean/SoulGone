setInterval(() => {
    document.querySelectorAll(".fullShowerAbility").forEach(element => {
        element.addEventListener("click", () => ShowMutualUserShortProfile(element));
    });
    document.querySelector("#imageFullShower").addEventListener("click", CloseMutualUserShortProfile);   
}, 500);

function ShowMutualUserShortProfile(element)
{
    if (element.children.length != 0)
        return;
    document.getElementById("imageFullShower").style.visibility = "visible";
    let dataImg = element.style.backgroundImage;
    document.getElementById("fullShowerImg").src = element.style.backgroundImage.substring(5, dataImg.length - 2);
}

function CloseMutualUserShortProfile(event)
{
    document.getElementById("imageFullShower").style.visibility = "hidden";
}
