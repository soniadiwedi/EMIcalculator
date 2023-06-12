import React, { useState } from 'react'
import {Box, Button, FormControl, FormLabel, Input} from '@chakra-ui/react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom';
export const Login = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const toast = useToast()
  const navigate=useNavigate()
  const location=useLocation()
 

  const handleSubmit=()=>{
    let user={email:email,password:password}
    axios.post(`https://long-lime-hippo-cape.cyclic.app/auth/login`,user).then((res)=>{
      console.log(res.data.token)
      localStorage.setItem("token",res.data.token)
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      navigate(location.state)
      navigate('/profile')
    }).catch((e)=>console.log(e))
  }
  return (
    <Box backgroundColor={'white'} width={'50%'} m={'auto'} mt={'20'} boxShadow={'5px 5px 5px 5px red '}  p={'5'}>
      
<FormControl >
 
  <FormLabel>Email address</FormLabel>
  <Input type='email' value={email} name='email' onChange={(e)=>setEmail(e.target.value)}/>
  <FormLabel>Password</FormLabel>
  <Input type='password' value={password} name='password' onChange={(e)=>setPassword(e.target.value)}/>
 <Button mt={'10'} onClick={handleSubmit}>Submit</Button>
</FormControl>

    </Box>
  )
}
