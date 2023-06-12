import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
   <Box>
    <Flex justifyContent={'center'} gap={'90px'} h={'100px'} color={'red'} textAlign={'center'} alignItems={'center'} fontWeight={'bold'} fontSize={'3xl'} fontStyle={'revert'}>
    <Link to='/'>Register</Link>
    <Link to='/login'>Login</Link>
    <Link to='/profile'>Profile</Link>
    <Link to='/emi'>EMI calculator</Link>
    </Flex>
    </Box> 
  )
}
