let mois = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
];
let ventes = [
    6500,
    5550,
    4200,
    4525,
    2500,
    1500,
    500,
    1000,
    1750,
    2300,
    3700,
    3500,
];



const svgns = "http://www.w3.org/2000/svg";
let viewPortMaxUnitX = 1000;
let viewPortMaxUnitY = 500;
let viewport = null;

function init_UI() {
    insertViewPort("graphContainer");
    grille();
    // WriteMonths();
    WriteMoney();
}

function insertViewPort(containerId) {
    viewport = document.createElementNS(svgns, "svg");
    viewport.setAttribute("id", "viewport");
    viewport.setAttribute("viewBox", "0 0 " + viewPortMaxUnitX + " " + viewPortMaxUnitY);
    document.getElementById(containerId).appendChild(viewport);
}

function grille(){
    viewport.appendChild(text({x:450,y:25}, "Ventes 2022"));
    let echelle = 7000;
    for(let i = 0; i < 8; i++){
        pos1 = { x: 200, y:i * 50 + 50 };
        pos2 = { x: 800, y:i * 50 + 50 };
        if(i != 7){
            for(let j = 1; j < 10; j++){
                posj1 = { x:pos1.x, y:pos1.y + j * 5};
                posj2 = { x:pos2.x, y:pos2.y + j * 5};
                viewport.appendChild( line( posj1,posj2, "Gainsboro",0.5 ) );
            }
        }
        
        
        viewport.appendChild(text({x:150,y:pos1.y}, `$ ${(echelle)}`));
        echelle -= 1000;
        viewport.appendChild(line(pos1,pos2, "gray", 1 ));
    }
}

function WriteMonths(){
    let i = 200;
    mois.forEach( m => {
        viewport.appendChild(text(FromBetter({x:i , y:70}),m, 50, 1.2));
        i+=50;
    });
}

function WriteMoney(){
    couleur = "green";
    for(let i = 0; i < ventes.length; i++){
        pos = {x:200 + (i * 51.7), y:(350 - ventes[i]/20) + 50};
        couleur = "green";
        if(pos.y >= 340){
            couleur = "red";
        }else if(pos.y >= 300){
            couleur = "orange"
        }
        viewport.appendChild(rect(pos,30,(ventes[i]/20),couleur));
    }
}



function line(pos1, pos2, stroke = "black", strokeWidth = 1) {
    let line = document.createElementNS(svgns, "line");
    line.setAttribute("x1", pos1.x);
    line.setAttribute("y1", pos1.y);
    line.setAttribute("x2", pos2.x);
    line.setAttribute("y2", pos2.y);
    line.setAttribute("stroke", stroke);
    line.setAttribute("stroke-width", strokeWidth);
    return line;
}

function rect(pos, width, height, fill = "white", stroke = "black", strokeWidth = 1) {
    let rect = document.createElementNS(svgns, "rect");
    rect.setAttribute("x", pos.x);
    rect.setAttribute("y", pos.y );
    rect.setAttribute("width", width);
    console.log(height);
    rect.setAttribute("height", height);
    rect.setAttribute("fill", fill);
    rect.setAttribute("stroke", stroke);
    rect.setAttribute("stroke-width", strokeWidth);
    return rect;
}

function text(pos, content, angle = 0, size = "1", fill = "black") {
    let text = document.createElementNS(svgns, "text");
    text.setAttribute("x", pos.x);
    text.setAttribute("y", pos.y);
    text.setAttribute("transform", `rotate(${angle},${pos.x},${pos.y})`);
    text.setAttribute("font-size", size + "em");
    text.setAttribute("fill", fill);
    text.innerHTML = content;
    return text;
}

init_UI();

