window.addEventListener("DOMContentLoaded",()=>{
    console.log('123')
    setInterval(()=>{
    
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
    
    axios.get(`http://localhost:8000/message/${query}`)
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
            let info=res.data.messages
            if(info.length==0){
                alert('No chats found')
            }else{
                savetolocalstorage(info)
            }
           

        }
    })
    .catch(err=>{
        console.log(err)
    })

    },1000)
    // let abc=JSON.parse(localStorage.getItem('mymessages'))
    // let query;
    // if(!abc){
    //     query='abc'
    // }else{
    //     let local=abc.messageinfo
    //     let long=local.length
    //     query=local[long-1].msgid
    //     console.log(query)

    //     localmessageonscreeen(local)
    // }
    // axios.get(`http://localhost:8000/message/${query}`)
    // .then(res=>{
    //     console.log(res)
    //     let abc=JSON.parse(localStorage.getItem('mymessages'))
    //     if(abc){
    //         let local=abc.messageinfo
    //         const newmessages=res.data.messages
    //         if(newmessages.length!=0){
    //             let newarr=[]
    //             for(let i=0;i<newmessages.length;i++){
    //                 const obj={
    //                     msgid:newmessages[i].id,
    //                    name:newmessages[i].name,
    //                     message:newmessages[i].message
    //                 }
    //                 newarr.push(obj)
    //             }
    //             console.log(local);
    //             console.log(newarr);
    //             let finalarray=[...local,...newarr]
    //             console.log(finalarray)
    //             savetolocalstoragenew(finalarray)
    //         }
    //     }
    //     else if(!abc){
    //         let info=res.data.messages
    //         if(info.length==0){
    //             alert('No chats found')
    //         }else{
    //             savetolocalstorage(info)
    //         }
           

    //     }
    // })
    // .catch(err=>{
    //     console.log(err)
    // })
    // setInterval(()=>{
    //     axios.get("http://localhost:8000/message").then(response=>{
    //         const messageList=document.getElementById('messages');
    //         messageList.innerHTML=''
    //         console.log(messageList)
    //         const res=response.data;
    //         console.log(res.length)
            
    //         for(let i=0;i<res.length;i++){
    //             const name=res[i].name;
    //         const message=res[i].message;
            
    //             const list=document.createElement('li');
    //             list.innerHTML=`${name}-${message}`
    //             console.log(list);
            
    //             messageList.appendChild(list)
    //         }
    //         }).catch(err=>{
    //             console.log(err)
    //         })
    //         },1000)
            
    // })

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
    const arr=[]
    for(let i=0;i<info.length;i++){
        const obj={
            msgid:info[i].msgid,
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