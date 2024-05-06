var button = document.querySelector('button');
var image = document.querySelector('.image');

// fonction pour afficher l'image

// button.onclick = function(){
//     alert('Vous avez cliqué sur le bouton');
// }

button.onclick = function(){
    
    image.innerHTML = `<img src="${data.message}">`
}