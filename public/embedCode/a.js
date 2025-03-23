// Ajouter dynamiquement du CSS dans la page
let style = document.createElement('style');
style.innerHTML = `
    /* Style pour la div qui contiendra le canvas p5.js */
    #sketch1 {
        width: 300px;
        height: 300px;
        border: 2px solid black;
        margin: 20px auto;
    }
`;
document.head.appendChild(style);  // Ajouter le CSS au <head> du document

// Créer dynamiquement une div avec l'ID "sketch1"
let div = document.createElement('div');
div.id = 'sketch1';
document.body.appendChild(div);  // Ajouter la div au body de la page

// Charger p5.js dynamiquement depuis un CDN
let script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js";
script.onload = function() {
    // Créer un sketch p5.js à l'intérieur de la div #sketch1
    new p5(function(p) {
        p.setup = function() {
            // Créer un canvas de 300x300 px et l'ajouter à la div #sketch1
            let canvas = p.createCanvas(300, 300);
            canvas.parent('#sketch1');  // Associer le canvas à la div #sketch1
        };

        p.draw = function() {
            p.background(200);
            p.fill(255, 0, 0);
            p.ellipse(p.width / 2, p.height / 2, 100, 100);
        };
    });
};
document.head.appendChild(script);  // Ajouter le script p5.js à la page
