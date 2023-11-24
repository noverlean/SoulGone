var Blocker = {
    Show: () =>
    {
        document.getElementById('blocker').style.animation = "showBlocker .3s linear forwards";
        document.getElementById('stealedSVG').style.animation = "showStealedSVG .3s linear forwards";
        document.getElementById('blocker').style.display = "flex";
    },
    Close: () =>
    {
        document.getElementById('blocker').style.animation = "closeBlocker .3s linear forwards";
        document.getElementById('stealedSVG').style.animation = "closeStealedSVG .3s linear forwards";
        document.getElementById('blocker').style.display = "flex";

        setTimeout(() => 
        {
            document.getElementById('blocker').style.display = "none";
        }, 300);
    }
}

document.getElementById('blocker').style.display = "none";