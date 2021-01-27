let canvas = document.getElementById("can-1")
let ctx = canvas.getContext("2d")
let sxd = canvas.width / 4, syd = canvas.height - 100
let sxd2 = canvas.width - 100, syd2 = canvas.height - 100
let axd = Math.floor(canvas.width / 9), ayd = Math.floor(canvas.height / 9)
let gameDif = 2, FPS = 30, FrmRt = 0
let x = canvas.width / 2
let y = canvas.height / 2
let UFO_strips = 6, UFO_size = 12, score=0
// one segment represents an hour so divide degrees by UFO_strips
let segmentWidth = 360 / UFO_strips;
// begin at 0 and end at one segment width
let startAngle = 0;
let endAngle = segmentWidth;
// how thick you want a segment
let segmentDepth = 12;
let Spaceships = [], arrInfo = []
const user =prompt("Your name ?")



/* --------------------------- Creating Spaceships -------------------------- */

var Spaceship = new Object()
Spaceship.x = sxd,
Spaceship.y = syd
Spaceships.push(Spaceship)

/* ----------------------------- Create astroids ---------------------------- */

var Astroids = [];
var astClr = {
    1: "green", 2: "blue", 3: "brown", 4: "orange", 5: "yellow", 6: "grey"
}

/* ------------------- Get Random Positons with range(-,+) ------------------ */

function getRan(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

/* ------------------------ Creating Astroid objects ------------------------ */

for (var i = 0; i < 10; i++) {
    var ast = new Object();
    ast.x = getRan(-44, 361)
    ast.y = getRan(-30, (436) / 2)
    // ast.x=-14
    // ast.y=435
    ast.xv = Math.random() * gameDif * (Math.random() < 0.3 ? 1 : -1),
        ast.yv = Math.random() * gameDif * (Math.random() < 0.3 ? 1 : -1),
        ast.clr = astClr[getRan(1, 7)]

    Astroids.push(ast)
}

/* -------------------------------- Game Loop ------------------------------- */

var Glp = setInterval(gameLoop, FPS)

/* ------------------------- Movement of the ship[0] ------------------------ */

document.addEventListener("keydown", e => {
        // console.log('single player')
        if (e.key == "ArrowUp") {
            Spaceships[0].y -= 3
        }
        else if (e.key == "ArrowDown") {
            Spaceships[0].y += 3
        }
        else if (e.key == "ArrowLeft") {
            Spaceships[0].x -= 3
        }
        else if (e.key == "ArrowRight") {
            Spaceships[0].x += 3
        }
})

/* ------------------- Movement buttons for mobile screen ------------------- */

var upbtn = document.getElementById('upbtn')
upbtn.addEventListener('click', () => {
    Spaceships[0].y -= 3
})
var dnbtn = document.getElementById('dnbtn')
dnbtn.addEventListener('click', () => {
    Spaceships[0].y += 3
})
var ltbtn = document.getElementById('ltbtn')
ltbtn.addEventListener('click', () => {
    Spaceships[0].x -= 3
})
var rtbtn = document.getElementById('rtbtn')
rtbtn.addEventListener('click', () => {
    Spaceships[0].x += 3
})

/* ------------------------------ Main GameLoop ----------------------------- */

function gameLoop() {
score +=1
    //BackgroundArea
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

/* ------------------------------ creating UFOs ----------------------------- */

    function CrtSpsh(Spx, Spy, c1s, c2s) {
        for (var i = 0; i < UFO_strips; i++) {
            ctx.beginPath();
            ctx.arc(Spx, Spy, UFO_size, (startAngle * Math.PI / 180), (endAngle * Math.PI / 180), false);
            ctx.lineWidth = segmentDepth;
            if (i % 2 == 0) {
                ctx.strokeStyle = c1s
            }
            else {
                ctx.strokeStyle = c2s
            }
            ctx.fill()
            ctx.stroke();
            // increase per segment        
            startAngle += segmentWidth;
            endAngle += segmentWidth;
        }

/* ------------------------- Spaceships[0] HitPoint ------------------------- */

        centsxd = (Spx) - 1
        centsyd = (Spy) - 1
        ctx.fillStyle = "Black"
        ctx.fillRect(centsxd, centsyd, 2, 2)

/* --------------------------- Edge Reset of ship --------------------------- */

        if (Spx < -10) {
            Spx = 370
        }
        else if (Spx > 370) {
            Spx = -10
        }
        else if (Spy < -10) {
            Spy = 460
        }
        else if (Spy > 460) {
            Spy = -10
        }

/* -------------------------- //Edge Reset of ship -------------------------- */

        if (Spaceships[0].x < -10) {
            Spaceships[0].x = 370
        }
        else if (Spaceships[0].x > 370) {
            Spaceships[0].x = -10
        }
        else if (Spaceships[0].y < -10) {
            Spaceships[0].y = 460
        }
        else if (Spaceships[0].y > 460) {
            Spaceships[0].y = -10
        }


    }
        CrtSpsh(Spaceships[0].x, Spaceships[0].y, 'red', 'blue')

/* ------------------------- Spaceships[0] HitPoint ------------------------- */

    centsxd=(Spaceships[0].x)-1
    centsyd=(Spaceships[0].y)-1
    ctx.fillStyle="Black"
    ctx.fillRect(centsxd,centsyd,2,2)

/* ----------------------- [ ]Astroids edge Positions ----------------------- */

    for (var i = 0; i < Astroids.length; i++) {

        Astroids[i].x += Astroids[i].xv
        Astroids[i].y += Astroids[i].yv
        if (Astroids[i].x > 361) {
            Astroids[i].x = -44
            Astroids[i].y = getRan(-30, 436)
        }
        else if (Astroids[i].x < -44) {
            Astroids[i].x = 361
            Astroids[i].y = getRan(-30, 436)
        }
        if (Astroids[i].y > 436) {
            Astroids[i].x = getRan(-44, 361)
            Astroids[i].y = -30
        }
        else if (Astroids[i].y < -30) {
            Astroids[i].x = getRan(-44, 361)
            Astroids[i].y = 436
        }

        ctx.strokeStyle = "black"
        ctx.beginPath();
        ctx.moveTo((120 / 6) + Astroids[i].x, (20 / 6) + Astroids[i].y);
        ctx.lineTo((120 / 6) + Astroids[i].x, (50 / 6) + Astroids[i].y);
        ctx.lineTo((150 / 6) + Astroids[i].x, (50 / 6) + Astroids[i].y);
        ctx.lineTo((150 / 6) + Astroids[i].x, (20 / 6) + Astroids[i].y);
        ctx.closePath();
        ctx.strokeStyle = Astroids[i].clr
        ctx.fill()
        ctx.stroke()


/* ---------------------------- Astriod HitPoint ---------------------------- */

        centaxd = Math.floor((((120 + 120 + 150 + 150) / 6) + (Astroids[i].x * 4)) / 4)
        centayd = Math.floor((((20 + 50 + 50 + 20) / 6) + (Astroids[i].y * 4)) / 4)
        ctx.fillStyle = "Black"
        ctx.fillRect(centaxd, centayd, 2, 2)

/* ------------------------------ Crash Handle ------------------------------ */

        var crashx = Math.abs(Math.abs(centaxd) - Math.abs(centsxd))
        var crashy = Math.abs(Math.abs(centayd) - Math.abs(centsyd))
        // console.log('Crash-loop:',crashx,crashy)

        if (crashx <= 25 && crashy <= 25) {
            console.log('Got Hit')
            console.log('Astroid->', Astroids[i])
            console.log('Crash-dis:', crashx, crashy)
            console.log('Asrtoid-Hitpoint', centaxd, centayd)
            console.log('Spaceship-Htpont', centsxd, centsyd)
            console.log('Shaceship-pos', Spaceships[0].x, Spaceships[0].y)
            console.log('Astroidss-pos', Astroids[i].x, Astroids[i].y)
            clearInterval(Glp)
            alert(`${user} you Loose...! Final Score is ${score}`)
        }
    }
    FrmRt += 1
}
