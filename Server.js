const express = require('express');
const app = express()
const PORT = 3000

const axios = require('axios');

app.get('/todos',(req,res) => {

    axios.get('https://jsonplaceholder.typicode.com/todos')
  .then(response => {
    let users = response.data.map(user => {
        delete user.userId;
        return user;
    });
    res.send(users);
  })
  .catch(error => {
    console.log(error);
  });  
});

app.get('/user/:id',async(req,res)=>{
    let id = req.params.id;
    await axios.get('https://jsonplaceholder.typicode.com/users/'+req.params.id)
  .then(async(response) => {
      let all = response.data;
      let u = await axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        let users = response.data.filter((user) =>{
            return user.userId == id;
        })
        return users;
      })
      .catch(error => {
        console.log(error);
      }); 
      all['todos'] = u;
      ['username','address','website','company'].forEach(e => delete all[e]);
      res.send(all);
  })
  .catch(error => {
    console.log(error);
  });
});

app.listen(PORT,() =>{
    console.log(`Server listening at port ${PORT}`);
});