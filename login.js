function login(event){
    event.preventDefault();
    console.log('123')
    const emailid=event.target.emailid.value;
    const password=event.target.password.value;
    const obj={
        emailid,
        password
    }
    axios.post("http://localhost:8000/login",obj)
    .then((res)=>{

        alert(res.data.message)
        const token=res.data.token;
        localStorage.setItem('token',token);
        location.replace('./chatapp.html')

        // location.replace('/addexpense.html')
        console.log(res)
    }).catch(err=>{

        console.log(err)

        if(err.response.status==401){

            alert(err.response.data.message)
        }
        else if(err.response.status==404){
            alert(err.response.data.message)
        }
        else{
            console.log(err)
        }
        
    })
}