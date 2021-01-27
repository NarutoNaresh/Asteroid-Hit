let canvas = document.getElementById("can-1")
let ctx = canvas.getContext("2d")
let sxd=canvas.width/4,syd=canvas.height-100
let sxd2=canvas.width-100,syd2=canvas.height-100
let axd=Math.floor(canvas.width/9),ayd=Math.floor(canvas.height/9)
let gameDif=2, FPS=30,FrmRt=0
let x = canvas.width / 2
let y = canvas.height / 2
let UFO_strips=6, UFO_size=12
let segmentWidth = 360 / UFO_strips
let startAngle = 0, endAngle = segmentWidth
let segmentDepth = 12, score=0, clirno=0
let Glp=''
let Spaceships=[]
const socket =io()





let PName =prompt("your name ?")
clirno=document.getElementById('client-RoomID').innerText
socket.emit('NameandRno',[PName,clirno])

/* ---------------------- Display Respective  UFO color --------------------- */

var divele=document.getElementById('div-clr')
var divclr=document.getElementById('client-Clr')
if(divclr.innerText=="Red"){divele.innerText="Your UFO is "+divclr.innerText
divele.style.color="red";divele.style.fontSize="1.4rem";divele.style.paddingLeft="10rem" }
else if(divclr.innerText=="Green"){divele.innerText="Your UFO is "+divclr.innerText
divele.style.color="Green";divele.style.fontSize="1.4rem";divele.style.paddingLeft="10rem" }

/* --------------------------- Creating Spaceships -------------------------- */
for(var i=0;i<2;i++){
    var Spaceship= new Object()
    if(i%2==0){
        Spaceship.x=sxd,
        Spaceship.y=syd
    }
    else{
        Spaceship.x=sxd2,
        Spaceship.y=syd2
    }
    Spaceships.push(Spaceship)
}

/* ------------------------ Get asteroids from Server ----------------------- */

let Astroids=[]
socket.on('get-Ast',Ast=>{
    Astroids=Ast
    console.log('Ast:', Ast)
})

/* ----------------------- Get game start Confirmation ---------------------- */

socket.on('Strt',flag=>{
    if(flag)
    Glp =setInterval(gameLoop,FPS)
})

/* ------------------ Spaceship 1  movement in multiplayer ------------------ */

socket.on('mov-UFO1',key=>{
    // console.log(key)
    if (key=="ArrowUp"){
        Spaceships[0].y-=3
    }
    else if (key=="ArrowDown"){

        Spaceships[0].y+=3
    }
    else if (key=="ArrowLeft"){
        Spaceships[0].x-=3
    }
    else if (key=="ArrowRight"){
        Spaceships[0].x+=3
    }

})


/* ------------------ Spaceship -2 movement in multiplayer ------------------ */

socket.on('mov-UFO2',key=>{
    // console.log(key)
    if (key=="ArrowUp"){
        Spaceships[1].y-=3
    }
    else if (key=="ArrowDown"){

        Spaceships[1].y+=3
    }
    else if (key=="ArrowLeft"){
        Spaceships[1].x-=3
    }
    else if (key=="ArrowRight"){
        Spaceships[1].x+=3
    }

})

/* ------------------------------- Winner Info ------------------------------ */

socket.on('win',winner=>{
        alert(winner)
        alert(`${PName} Your Score is ${score}`)
        clearInterval(Glp)
})

/* ------------------------- Send key-press to the Server------------------------ */
document.addEventListener("keydown",e=>{
    socket.emit('key-press',[e.key,clirno,PName])
})

/* --------------------------- Disconnection Info --------------------------- */

socket.on('discon',data=>{
    console.log(data)
    alert(`${data} from the Game`)

})

/* ------------------------ Buttons for Mobile Screen ----------------------- */

var upbtn =document.getElementById('upbtn')
upbtn.addEventListener('click',()=>{ 
    socket.emit('key-press',['ArrowUP',clirno,PName])
})
var dnbtn =document.getElementById('dnbtn')
dnbtn.addEventListener('click',()=>{
    socket.emit('key-press',['ArrowDown',clirno,PName])
})
var ltbtn =document.getElementById('ltbtn')
ltbtn.addEventListener('click',()=>{
    socket.emit('key-press',['ArrowLeft',clirno,PName])
})
var rtbtn =document.getElementById('rtbtn')
rtbtn.addEventListener('click',()=>{
    socket.emit('key-press',['ArrowRight',clirno,PName])
})

/* ----------------------- Main Game Loop Starts Here ----------------------- */

function gameLoop(){
score+=1
    //Canvas BackgroundArea
    ctx.fillStyle="black"
    ctx.fillRect(0,0,canvas.width,canvas.height)

    function CrtSpsh(Spx,Spy,c1s,c2s){
        for(var i = 0; i < UFO_strips; i++){         
        ctx.beginPath()
        ctx.arc(Spx, Spy, UFO_size, (startAngle * Math.PI / 180), (endAngle * Math.PI / 180), false)
        ctx.lineWidth = segmentDepth
        if(i%2==0){
        ctx.strokeStyle = c1s
        }
        else{
        ctx.strokeStyle = c2s
        }
        ctx.fill()
        ctx.stroke()
        // increase per segment        
        startAngle += segmentWidth
        endAngle += segmentWidth
        }

/* --------------------------- Edge Reset of ship --------------------------- */

        if(Spaceships[0].x < -10){
            Spaceships[0].x=370
        }
        else if (Spaceships[0].x >370){
            Spaceships[0].x=-10
        }
        else if(Spaceships[0].y < -10){
            Spaceships[0].y=460
        }
        else if (Spaceships[0].y >460){
            Spaceships[0].y=-10
        }

/* -------------------------- Edge Reset of ship 2 -------------------------- */

        if(Spaceships[1].x < -10){
            Spaceships[1].x=370
        }
        else if (Spaceships[1].x >370){
            Spaceships[1].x=-10
        }
        else if(Spaceships[1].y < -10){
            Spaceships[1].y=460
        }
        else if (Spaceships[1].y >460){
            Spaceships[1].y=-10
        }
        

    }
    CrtSpsh(Spaceships[0].x,Spaceships[0].y,'red','blue')
    CrtSpsh(Spaceships[1].x,Spaceships[1].y,'green','orange')

/* ------------------------- Spaceships[0] HitPoint ------------------------- */

    centsxd=(Spaceships[0].x)-1
    centsyd=(Spaceships[0].y)-1
    ctx.fillStyle="Black"
    ctx.fillRect(centsxd,centsyd,2,2)

/* ------------------------- Spaceships[1] HitPoint ------------------------- */

    centsxd2=(Spaceships[1].x)-1
    centsyd2=(Spaceships[1].y)-1
    ctx.fillStyle="Black"
    ctx.fillRect(centsxd2,centsyd2,2,2)

/* ------------- Astroids movement and edge Position corrections ------------ */

    for(var i=0; i<Astroids.length;i++){
    
        Astroids[i].x+=Astroids[i].xv
        Astroids[i].y+=Astroids[i].yv        
        if (Astroids[i].x >361){
            Astroids[i].x=-44
        }
        else if (Astroids[i].x < -44){
            Astroids[i].x=361
        }
        if (Astroids[i].y >436){
            Astroids[i].y=-30
        }
        else if (Astroids[i].y < -30){
            Astroids[i].y=436
        }

    
    ctx.strokeStyle="black"
    ctx.beginPath()
    ctx.moveTo((120/6)+Astroids[i].x, (20/6)+Astroids[i].y)
    ctx.lineTo((120/6)+Astroids[i].x, (50/6)+Astroids[i].y)
    ctx.lineTo((150/6)+Astroids[i].x, (50/6)+Astroids[i].y)
    ctx.lineTo((150/6)+Astroids[i].x, (20/6)+Astroids[i].y)
    ctx.closePath()
    ctx.strokeStyle =Astroids[i].clr
    ctx.fill()
    ctx.stroke()


/* ---------------------------- Astriod HitPoint ---------------------------- */

    centaxd=Math.floor((((120+120+150+150)/6)+(Astroids[i].x*4))/4)
    centayd=Math.floor((((20+50+50+20)/6)+(Astroids[i].y*4))/4)
    ctx.fillStyle="Black"
    ctx.fillRect(centaxd,centayd,2,2)

/* ------------------------- Crash Handle of ship[0] ------------------------ */

    var crashx=Math.abs(Math.abs(centaxd)-Math.abs(centsxd))
    var crashy=Math.abs(Math.abs(centayd)-Math.abs(centsyd))

/* ------------------------- Crash Handle of ship[1] ------------------------ */

    var crashx2=Math.abs(Math.abs(centaxd)-Math.abs(centsxd2))
    var crashy2=Math.abs(Math.abs(centayd)-Math.abs(centsyd2))

    if (crashx<=25 && crashy<=25){
        console.log('Got Hit')
        console.log('Astroid->', Astroids[i])
        console.log('Crash-dis:',crashx,crashy)
        console.log('Asrtoid-Hitpoint',centaxd,centayd)
        console.log('Spaceship-Htpont', centsxd,centsyd)
        console.log('Shaceship-pos',Spaceships[0].x,Spaceships[0].y)
        console.log('Astroidss-pos',Astroids[i].x,Astroids[i].y)
        clearInterval(Glp)
        socket.emit('win-dec',[socket.id,clirno,"red"])
    }
     else if (crashx2<=25 && crashy2<=25){
        console.log('Got Hit on Sp-2')
        console.log('Astroid->', Astroids[i])
        console.log('Crash-dis:',crashx2,crashy2)
        console.log('Asrtoid-Hitpoint',centaxd,centayd)
        console.log('Spaceship-Htpont', centsxd2,centsyd2)
        console.log('Shaceship-pos',Spaceships[1].x,Spaceships[1].y)
        console.log('Astroidss-pos',Astroids[i].x,Astroids[i].y)
        clearInterval(Glp)
        socket.emit('win-dec',[socket.id,clirno,"green"])
    }
    }
    FrmRt+=1

}


