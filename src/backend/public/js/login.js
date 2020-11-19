const getBtn = document.getElementById('username');
const postBtn = document.getElementById('password');


const sendData = () => {

    axios.get(`http://localhost:3000/api/user/login`, 
    { 
        username: this.state.username,
        password: this.state.password
    
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
   
};


postBtn.addEventListener('click', sendData);