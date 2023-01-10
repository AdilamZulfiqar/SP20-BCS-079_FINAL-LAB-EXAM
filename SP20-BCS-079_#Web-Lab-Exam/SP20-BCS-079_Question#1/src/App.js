import { Button, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react'
import {useState} from 'react'
import axios from 'axios';

function App() {



  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');

const Submit=()=>{
 fetch('https://dummyjson.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    
    username,
    password
    
  })
})
.then(res => res.json())
.then(res=>{localStorage.setItem('token',res.token)})
 

}

  return (
    <>

<Container sx={{display:'flex',justifyContent:'center',marginTop:'20px'}} >
<Typography> Welcome to Login Page. </Typography>
  
</Container>

<Box sx={{height:'500px',justifyContent:'center',alignItems:'center',display:'flex'}} >

<Box sx={{height:'200px',width:'250px',border:1}}>

<Box mt={2} sx={{display:'flex',justifyContent:'center'}}>
  <TextField
   variant='standard'
   
   value={username}
   placeholder='Name'
   onChange={(e)=>setUsername(e.target.value)}
   sx={{width:'75%'}}
  />

</Box>

<Box mt={2} sx={{display:'flex',justifyContent:'center'}}>
  <TextField
  type='password'
   variant='standard'
   value={password}
   placeholder='Password'
   onChange={(e)=>setPassword(e.target.value)}
   sx={{width:'75%'}}

  />

</Box>

<Box mt={3} sx={{display:'flex',justifyContent:'center'}}>
  <Button disabled={!username || !password? true:false}  variant='contained' color='primary' sx={{width:'75%'}}
  onClick={Submit}
  > Login </Button>
</Box>

</Box>
  
</Box>
    
    </>
  );
}

export default App;
