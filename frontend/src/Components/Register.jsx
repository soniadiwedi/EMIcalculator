import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast()
  const navigate=useNavigate()
  const handleSubmit = () => {
    const user = {
      name: name,
      email: email,
      password: password
    };

    axios.post('https://long-lime-hippo-cape.cyclic.app/auth/signup', user)
      .then((res) => {
        console.log(res.data);
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        navigate('./login')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box width={'50%'} m={'auto'} mt={'20'} boxShadow={'5px 5px 5px 5px orange '} p={'5'}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <FormLabel>Email address</FormLabel>
        <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormLabel>Password</FormLabel>
        <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button mt={'10'} onClick={handleSubmit}>Submit</Button>
      </FormControl>
    </Box>
  );
};
