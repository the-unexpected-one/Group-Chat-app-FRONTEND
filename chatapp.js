window.addEventListener("DOMContentLoaded",()=>{
    console.log('123')
    setInterval(()=>{
        const groupid=localStorage.getItem('groupid')
        const obj={
            groupid:groupid
        }
    
        let abc=JSON.parse(localStorage.getItem('mymessages'))
    let query;
    if(!abc){
        query='abc'
    }else{
        let local=abc.messageinfo
        let long=local.length
        query=local[long-1].msgid
        console.log(query)


        localmessageonscreeen(local)
    }
    
    axios.get(`http://localhost:8000/message/${query}`,{headers:{groupid:groupid}})
    .then(res=>{
        console.log(res)
        let abc=JSON.parse(localStorage.getItem('mymessages'))
        if(abc){
            let local=abc.messageinfo
            const newmessages=res.data.messages
            if(newmessages.length!=0){
                let newarr=[]
                for(let i=0;i<newmessages.length;i++){
                    const obj={
                        msgid:newmessages[i].id,
                       name:newmessages[i].name,
                        message:newmessages[i].message
                    }
                    newarr.push(obj)
                }
                console.log(local);
                console.log(newarr);
                let finalarray=[...local,...newarr]
                console.log(finalarray)
                savetolocalstoragenew(finalarray)
            }
        }
        else if(!abc){
            const messagelist=document.getElementById('messages')
            messagelist.innerHTML=''
            let info=res.data.messages
            if(info.length==0){
                // alert('No chats found')
                const listtag=document.createElement('li')
                listtag.innerHTML='No chats found'
                messagelist.appendChild(listtag)


            }else{
                savetolocalstorage(info)
            }
           

        }
    })
    .catch(err=>{
        console.log(err)
    })

const token=localStorage.getItem('token')
    axios.get('http://localhost:8000/groupname',{headers: {'Authorization':token}})
    .then(res=>{
        const response=res.data.groupname;
        const grouplist=document.getElementById('groups');
        grouplist.innerHTML=''

        for(let i=0;i<response.length;i++){
            const list=document.createElement('li')
            const groupname=document.createElement('button')
            groupname.setAttribute('onclick',`getgroupchats(${response[i].id})`)
            
            groupname.innerHTML=response[i].groupname;
            groupname.setAttribute('id',`${response[i].id}`)
            list.appendChild(groupname)
            grouplist.appendChild(list)
            
        }


    }).catch(err=>{
        console.log(err)
    })


    // axios.get('http://localhost:8000/groupname')
    // .then(res=>{
    //     console.log(res)
    // }).catch(err=>{
    //     console.log(err)
    // })


    },2000)
   


})

function getgroupchats(groupid){
    localStorage.setItem('groupid',`${groupid}`)
    console.log(groupid)
    const token=localStorage.getItem('token')
    axios.get(`http://localhost:8000/getgroupchats/${groupid}`,{headers: {'Authorization':token}})
    .then(res=>{
        if(res.data!=null){
            console.log(res)
            response=res.data;
            const messagelist=document.getElementById('messages')
            messagelist.innerHTML='';
            localStorage.removeItem('mymessages')
            for(let i=0;i<response.length;i++){
                printMessageOnScreen(response.name,response.message)
            }
        }
       
    }).catch(err=>{
        console.log(err)
    })

}

function storemessage(event){
    event.preventDefault()
    const messages=event.target.inputmessage.value;
    const groupid=localStorage.getItem('groupid')
    console.log(groupid)
    
    const token=localStorage.getItem('token')
    const obj={
message:messages,
groupid:groupid

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

function savetolocalstorage(info){
    const arr=[]
    for(let i=0;i<info.length;i++){
        const obj={
            msgid:info[i].id,
            name:info[i].name,
            message:info[i].message
        }
        arr.push(obj)
    }
    console.log(arr)
    let mymessages={
        messageinfo:arr
    }
    localStorage.setItem('mymessages',JSON.stringify(mymessages))

}

function localmessageonscreeen(local){
    const messagelist=document.getElementById('messages');
    if(messagelist!=null){
        messagelist.innerHTML=null
    }
        
    for(let i=0;i<local.length;i++){
      
        const usermessage=document.createElement('li')
        const name=local[i].name;
        const message=local[i].message
        usermessage.innerHTML=`${name}-${message}`
        messagelist.appendChild(usermessage)
        


    }
}

function savetolocalstoragenew(info){
    console.log(info)
    const arr=[]
    for(let i=0;i<info.length;i++){
        const obj={
            msgid:info[i].msgid,
            name:info[i].name,
            message:info[i].message,

        }
        arr.push(obj)
    }
    console.log(arr)
    let mymessages={
        messageinfo:arr
    }
    localStorage.setItem('mymessages',JSON.stringify(mymessages))


}