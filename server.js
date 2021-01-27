const path = require('path')
const http =require('http')
const express =require('express')
const socketio =require('socket.io')
const cors = require('cors')
const app =express()
const server = http.createServer(app)
const io =socketio(server)
const body = require('body-parser')

app.use(body.json())
app.use(cors())
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,'public')))

var game={}
var Pcounter=0

const users={}
const players=[]

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/create',(req,res)=>{
    var romID=req.query.roomId
    // console.log(romID)
    // const game={}
    game[romID]={"Players":[]}

    // console.log("click-btn workded",game)
})

app.get('/single',(req,res)=>{
    res.render('singlegame')
})

app.get('/join',(req,res)=>{
    var cliromid=req.query.roomId
    var plyrlen=game[cliromid].Players.length
    if(plyrlen<2){
        if(plyrlen==0){
            res.render('gamepage',{rmid:req.query.roomId,cliclr:"Red"})
        }
        else if(plyrlen==1){
            res.render('gamepage',{rmid:req.query.roomId,cliclr:"Green"})
        }
    }
    else{
        res.render('index')
    }
})



function genAst(){
    var Astroids=[]
    var astClr={
        1:"green",2:"blue",3:"brown",4:"orange",5:"yellow",6:"grey"
    }
    function getRan(min,max){
        min=Math.ceil(min)
        max=Math.floor(max)
        return Math.floor(Math.random()*(max-min)+min)
    }
    //Creating Astroid objects
    for(var i=0;i<10;i++){
        var ast= new Object();
        ast.x=getRan(-44,361)
        ast.y=getRan(-30,(436)/2)
        ast.xv=getRan(2,8)/(Math.random()<0.5 ? 10:-10),
        ast.yv=getRan(2,8)/(Math.random()<0.5 ? 10:-10),
        // ast.xv=0.2,
        // ast.yv=0.2,
        ast.clr=astClr[getRan(1,7)]
        Astroids.push(ast)
    }
    return Astroids
}

io.on('connection',socket=>{
    // console.log("some one entered")
    Pcounter+=1
    
    // roomNo=Math.round(Pcounter/2)
    socket.on('NameandRno',data=>{

        var cliname=data[0]
        var cliromid=data[1]
        socket.join(cliromid)
        game[socket.id]=[cliromid,cliname]
        game[cliromid].Players.push(cliname)
        // console.log('game-Obj:', game)

        if(game[cliromid].Players.length==2){
            io.sockets.to(cliromid).emit('Strt',1)
            io.sockets.to(cliromid).emit('get-Ast',genAst())
        }

    })


    socket.on('win-dec',d=>{
        var winner=''
        var users=game[d[1]].Players
        if(d[2]=="green"){
            winner=users[0]
        }
        else if (d[2]=="red"){
            winner=users[1]
        }
        // socket.emit('win',`${winner} is the winner`)
        // socket.broadcast.emit('win',`${winner} is the winner`)
        io.sockets.to(d[1]).emit('win',`${winner} is the winner`)
    })

    socket.on('key-press',data=>{

        var GUsers=game[data[1]].Players

        if(GUsers[0]==data[2]){
            // socket.emit('mov-UFO1',data)
            // socket.broadcast.emit('mov-UFO1',data)
            io.sockets.to(data[1]).emit('mov-UFO1',data[0])
        }
        if(GUsers[1]==data[2]){
            // socket.emit('mov-UFO2',data)
            // socket.broadcast.emit('mov-UFO2',data)
            io.sockets.to(data[1]).emit('mov-UFO2',data[0])
        }
        
    })

    socket.on('disconnect',()=>{
        var drmid=game[socket.id][0]
        var dcid=game[socket.id][1]
        io.sockets.to(drmid).emit('discon',`${dcid} disconnected`)
    // console.log(game[socket.id][0])
    })

})



const PORT =process.env.PORT || 3333
server.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)})