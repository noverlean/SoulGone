let step = -1;

let stepDescription = 
[
    `
    🔥Проект SoulGone - масштабная система с посиковыми алгоритмами, созданная помогать близким интересами людям искать друг друга!😍
    `,
    `
    Для корректной обработки данных нам нужно знать некоторые ваши данные...😉 <br><br>Обычно это не занимает более пары минут!🥰
    `,
    `
    😎Осталось ввести код подтверджения, который был отправлен на вашу почту. <br><br>(Он может быть в Спаме 📌)
    `,
    `
    Почти все готово!!!❤️‍🔥 <br><br>Давай уже начнем это увлекательное путешествие?🌍
    `,
]
let caseId =
[
    `codeWindow`,
    `formStructor`,
    `email`,
    `enterPanel`
]
MoveNextStep(1);
function MoveNextStep(direction)
{
    let now = step;
    let next = step + direction;
    let directionString = '';

    switch (direction)
    {
        case 1:
            break;
        case 0:
            location.reload();
            return;
        default:
            console.log("Error value!!!");
    }

    for (let i = 1; i <= 4; i++)
    {
        document.getElementById(`wave${i}`).style.animation = `step${now}to${next}for${i} 1s ease-out ${directionString}`;
    }

    switch (next)
    {
        case 0:
            document.getElementById('btnNext').style.animation = `showButtons 1s ease-out`;
            document.getElementById('btnReload').style.animation = `showButtons 1s ease-out`;
            break;
        case 3:
            document.getElementById('stepDescription').style.animation = `closeDescription .5s ease-in`;
            document.getElementById('caseContainer').style.animation = `closeCase .5s ease-in`;
            document.getElementById('btnNext').style.animation = `closeButtons 1s ease-out`;
            document.getElementById('btnReload').style.animation = `closeButtons 1s ease-out`;
            break;
        default:
            document.getElementById('stepDescription').style.animation = `closeDescription .5s ease-in`;
            document.getElementById('caseContainer').style.animation = `closeCase .5s ease-in`;
    }
    

    setTimeout(() => {
        document.getElementById('stepDescription').innerHTML = stepDescription[next];

        for (let k = 0; k < 4; k++)
        {
            console.log(document.getElementById(caseId[k]));
            console.log((next == k ? 'block !important' : 'none !important'));
            console.log(caseId[k]);
            document.getElementById(caseId[k]).style.display = (next == k ? 'block' : 'none');
        }

        document.getElementById('stepDescription').style.animation = `showDescription .5s ease`;
        document.getElementById('caseContainer').style.animation = `showCase .5s ease`;
    }, 500);
    

    step += direction;
}

function Done()
{
    alert("Done");
}

document.querySelectorAll('input').forEach( el => {
    console.log(el)
    el.addEventListener('keydown', e => {
        console.log(e.keyCode);
        if(e.keyCode === 13) {
            let nextEl = el.nextElementSibling;
            console.log(nextEl)
            if(nextEl.nodeName === 'INPUT') {
                nextEl.focus();
            }else {
                alert('done');
            }
        }
    })
})