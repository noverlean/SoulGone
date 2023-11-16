let step = -1;

let stepDescription = 
[
    `
    Проект SoulGone - масштабная система, созданная помогать близким людям искать друг друга!
    `,
    `
    Для корректной обработки данных нам нужно знать некоторые ваши данные... Обычно это не занимает более пары минут!🥰
    `,
    ``,
    ``,
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

    if (next != 0)
    {
        document.getElementById('stepDescription').style.animation = `closeDescription .5s ease-in`;
        document.getElementById('caseContainer').style.animation = `closeCase .5s ease-in`;
    }
    

    setTimeout(() => {
        document.getElementById('stepDescription').innerHTML = stepDescription[next];

        document.getElementById('stepDescription').style.animation = `showDescription .5s ease`;
        document.getElementById('caseContainer').style.animation = `showCase .5s ease`;
    }, 500);
    

    step += direction;
}

function Done()
{
    alert("Done");
}