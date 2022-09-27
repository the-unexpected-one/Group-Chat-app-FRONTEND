function storemessage(event){
    const messages=event.target.inputmessage.value;
    const token=localStorage.getItem('token')
    const obj={
message:messages

    }
    axios.post('http://localhost:8000/message',obj,{headers: {'Authorization':token}})
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}