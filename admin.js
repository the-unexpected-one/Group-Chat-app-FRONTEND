window.addEventListener("DOMContentLoaded",async()=>{
    try{
        const groupid=localStorage.getItem('groupid')
        const token=localStorage.getItem('token')
    const res=  await axios.get(`http://localhost:8000/makeadmin/${groupid}`,{headers: {'Authorization':token}})
    
        console.log(res)
        if(res.data=='YOU ARE NOT AN ADMIN'){
            alert('YOU ARE NOT AN ADMIN')
        }else{
            const addmembers = res.data.members
            showmembers(addmembers)
        }
       
    }
    
catch(err ){
    console.log(err)

}


})
function showmembers(addmembers){

    const groupmembers = document.getElementById("groupmembers")
    for(let i=0;i<addmembers.length;i++){

    const userid = addmembers[i].id
    const username = addmembers[i].name
    const list = document.createElement("li")
    list.setAttribute("style","list-style-type:none")
    const btn = document.createElement("button")
    btn.setAttribute("onclick",`makeadmin(${userid})`)
    btn.innerHTML = `${username}`
    list.appendChild(btn)
    groupmembers.appendChild(list)
    }
}


async function makeadmin(userid){
    const groupid = localStorage.getItem("groupid")

    console.log(userid,groupid)

    const obj = {
        groupid,
        userid
    }

    try{

    const res = await axios.post("http://localhost:8000/makeadmin",obj)

    console.log(res)
    }
    
    catch(err){

        console.log(err)
        
    }
    

    
}

