import React, { useEffect, useState } from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import axios from "axios"

export const Profile = () => {
  const [input, setInput] = useState({})
  const token = localStorage.getItem('token');
  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    const headers={
      Authorization: `Bearer ${token}`
    }
    axios.get(`https://long-lime-hippo-cape.cyclic.app/profile`,{headers})
      .then((res) => {
        setInput(res.data)
        // console.log(res.data);
      })
      .catch((e) => {
        console.log(e)
      })
  }
//For making timeStamp
  const getCurrentTimestamp = () => {
    const timestamp = new Date().toLocaleString();
    return timestamp;
  };

 // console.log("input",input?.user?.name);

  return (
    <Box backgroundColor={'white'} width={'50%'} m={'auto'} mt={'20'} boxShadow={'5px 5px 5px 5px red '} p={'5'}>
       <Heading fontSize={'xl'} >Welcome, {input?.user?.name}</Heading>
      <Text>Email : {input?.user?.email}</Text> 
      <Text>Time Stamp : {getCurrentTimestamp()}</Text>
    </Box>
  )
}
