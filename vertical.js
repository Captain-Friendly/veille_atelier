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
let viewPortMaxUnitY = 1000;
let viewport = null;

function init_UI() {
    insertViewPort("graphContainer");
    grille();
    WriteMonths();
    WriteMoney();
}

function insertViewPort(containerId) {
    viewport = document.createElementNS(svgns, "svg");
    viewport.setAttribute("id", "viewport");
    viewport.setAttribute("viewBox", "0 0 " + viewPortMaxUnitX + " " + viewPortMaxUnitY);
    document.getElementById(containerId).appendChild(viewport);
}

function ToBet(pos){
    pos.y = (1000 - pos.y);
    return pos;
}


function grille(){
    viewport.appendChild(text(ToBet({x : 400, y : 950}), "Ventes 2022", 0, 2, `rgb(0,0,0)`)); // name

    for(let i = 1; i < 9; i++){
        pos1 = { x: 200, y:i * 100};
        pos2 = { x: 800, y:i * 100}
        
        for(let j = 0; j < 10; j++){
            ypos = (pos1.y + (j * 10));
            posj1 = { x:200, y: ypos }
            posj2 = { x:800, y: ypos }
            viewport.appendChild(line(ToBet (posj1),ToBet(posj2), "gray", 0.5));
        }
        viewport.appendChild(text(ToBet({x:150, y:pos1.y}), `$ ${(i * 1000) - 1000}`));
        viewport.appendChild(line(ToBet(pos1),ToBet(pos2), "gray", 1 ));
    }
}

function WriteMonths(){
    let i = 200;
    mois.forEach( m => {
        viewport.appendChild(text(ToBet({x:i , y:70}),m, 50, 1.2));
        i+=50;
    });
}

function WriteMoney(){
    let i = 215;
    couleur = "green";
    ventes.forEach(vente => {
        pos1 = ToBet({x:i, y:100});
        pos2 = ToBet({x:i, y:(vente / 10) + 100});
        if(pos2.y >= 800){
            couleur = "red"
        } else if(pos2.y >= 600){
            couleur = "orange"
        } else if(pos2.y >= 480){
            couleur = "yellow"
        }
        viewport.appendChild(line(pos1,pos2,couleur,35));
        viewport.appendChild(text({x:pos2.x - 15, y:pos2.y - 5},vente))
        i+=50;
        couleur = "green";
    });
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
    rect.setAttribute("y", pos.y);
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
