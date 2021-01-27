const Burl='https://asteroid-hit.herokuapp.com/'
const burl='http://localhost:3333/'
let uniq=''

singbtn=document.getElementById('btn')
rmbtn=document.getElementById('crm-btn')
cpybtn=document.getElementById('cpy-btn')

rmbtn.addEventListener('click',()=>{
    rid=GenRanId()
    inpfld=document.getElementById('demo')
    inpfld.value=rid
    console.log(rid)
    console.log(uniq)
    axios.get(uniq)
    rmbtn.style.display="none"
})

singbtn.addEventListener('click',()=>{
    // window.location.href=burl+'single'
    window.location.href=Burl+'single'
})

cpybtn.addEventListener('click',()=>{
    var copyText = document.getElementById('demo')
  copyText.select()
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy")
})

/* ------------------- Generate random string of length 8 ------------------- */
function GenRanId(){
    
    let DataPile="1234567890abcdefghijklmnopqrstuvwxyz"
    let uniqId=''
    let leng=5
    for(var i=0;i<leng;i++){
        k=Math.floor(Math.random()*DataPile.length)
        uniqId +=DataPile[k]
        // console.log(k)  join?game=""
    }
    // uniq=`http://localhost:3333/create?roomId=${uniqId}`
    // return `http://localhost:3333/join?roomId=${uniqId}`
    
    uniq=`https://asteroid-hit.herokuapp.com/create?roomId=${uniqId}`
    return `https://asteroid-hit.herokuapp.com/join?roomId=${uniqId}`
    }