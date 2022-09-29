function createnewgroup(event){
    event.preventDefault()
    const groupname=event.target.groupname.value;
    console.log(groupname)
    const token=localStorage.getItem('token')

    const obj={
        groupname:groupname
    }
    axios.post('http://localhost:8000/creategroup',obj,{headers: {'Authorization':token}})
    .then(res=>{
        
        localStorage.setItem('groupid',res.data.id);
        axios.get('http://localhost:8000/addmember')
        .then(response=>{
            console.log(response)
            const userList=document.getElementById('userlist');
            const list=response.data;
            console.log(list)
            for(let i=0;i<list.length;i++){
                const button=document.createElement('button');
                button.setAttribute('id',`${list[i].id}`)
                button.innerHTML=`${list[i].name}`;
                button.setAttribute('onclick',`add(${list[i].id},${res.data.id})`)
                userList.appendChild(button)
                
            }
            const startchattingbtn=document.getElementById('btn')
            const btn=document.createElement('button');
            btn.innerHTML="<a href='./chatapp.html'>Start Chatting</a>"
            startchattingbtn.appendChild(btn)


        }).catch(err=>{
            console.log(err)
        })

        // location.replace('./chatapp.html')
    }).catch(err=>{
        console.log(err)
    })
}


function add(userid,groupid){
    
    const obj={userid:userid,
    groupid:groupid}
    axios.post('http://localhost:8000/add',obj)
    .then(response=>{
        console.log(response)
    }).catch(err=>console.log(err))
}