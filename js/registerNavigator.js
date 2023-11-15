function MoveNextStep(stepNumber)
{
    ScrollToNext();
}

function ScrollToNext()
{
    const smoothLinks = document.querySelectorAll('[href^="#"]');
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');

            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };
}

function Done()
{
    alert("Done");
}