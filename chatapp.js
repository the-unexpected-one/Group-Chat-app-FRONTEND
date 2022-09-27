window.addEventListener("DOMContentLoaded",()=>{
    console.log('123')
axios.get("http://localhost:8000/message")
.then(response=>{
const messageList=document.getElementById('messages');
console.log(messageList)
const res=response.data;
console.log(res.length)

for(let i=0;i<res.length;i++){
    const name=res[i].name;
const message=res[i].message;

    const list=document.createElement('li');
    list.innerHTML=`${name}-${message}`
    console.log(list);

    messageList.appendChild(list)
}
}).catch(err=>{
    console.log(err)
})
})


function storemessage(event){
    event.preventDefault()
    const messages=event.target.inputmessage.value;
    const token=localStorage.getItem('token')
    const obj={
message:messages

    }
    axios.post('http://localhost:8000/message',obj,{headers: {'Authorization':token}})
    .then(res=>{
        printMessageOnScreen(res.data.name,res.data.message)
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}

function printMessageOnScreen(name,message){
    const messagelist=document.getElementById('messages')
    const list=document.createElement('li');
    list.innerHTML=`${name}-${message}`
    messagelist.appendChild(list)
}