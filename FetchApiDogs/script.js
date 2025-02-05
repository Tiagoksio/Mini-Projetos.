const box = document.querySelector('.box');
const imgDog = document.querySelector('#img_dog');

function loadImage() {
    let url = "https://dog.ceo/api/breeds/image/random"
    fetch(url, {
        method: 'get'
    })
    .then(function (response) {
        response.json().then(function(data) {
            console.log('Resultado da Requisição: ' + data.message);
            imgDog.src = data.message;
        });
    })
    .catch(function(err) {
        console.error('O seguinte erro ocorreu durante a requisição: ' + err);
    });
}


function imgAnimation() {
    imgDog.classList.add('unboxingDog')    
}


box.addEventListener("click", () => loadImage())


document.querySelector('.container').onclick = e => {
    if (!e.target.classList.contains('box')) {
        location.reload()
    }
}