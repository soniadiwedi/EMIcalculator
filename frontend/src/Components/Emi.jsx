
import { Box, Button, Flex, FormLabel, Heading, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import axios from "axios"
export const Emi = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [annualInterestRate, setAnnualInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEMI] = useState(0);
  const [interestPayable, setInterestPayable] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);



  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform EMI calculation based on the input values
    // Update emi, interestPayable, and totalPayment states
    const obj = {
      loanAmount: parseFloat(loanAmount),
      annualInterestRate: parseFloat(annualInterestRate),
      tenureInMonths: parseInt(tenure),
    };
      axios.post(`https://long-lime-hippo-cape.cyclic.app/emi/`,obj).then((res)=>{
        setEMI(res.data.emi);
        setInterestPayable(res.data.interestPayable);
        setTotalPayment(res.data.totalPayment);
        console.log(res.data);
      }).catch((e)=>{
        console.log(e);
      })
  };

  const data = [
    { name: 'EMI', value: emi },
    { name: 'Interest Payable', value: interestPayable },
    { name: 'Total Payment', value: totalPayment }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];


  return (
    <>
    <Box w={'50%'}  m={'auto'} marginTop={"5%"}  >
      <Flex>
      <Box gap={'20px'}>

<Heading fontSize={'xl'}>EMI Calculator</Heading>
<form onSubmit={handleSubmit}>
  <FormLabel>
    Loan Amount:
    <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
  </FormLabel>
  <FormLabel>
    Annual Interest Rate:
    <Input type="number" value={annualInterestRate} onChange={(e) => setAnnualInterestRate(e.target.value)} />
  </FormLabel>
  <FormLabel>
    Tenure (in months):
    <Input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} />
  </FormLabel>
  <Button type="submit">Calculate</Button>
</form>
  </Box>
<Box >
  <h3>EMI: {emi}</h3>
  <h3>Interest Payable: {interestPayable}</h3>
  <h3>Total Payment: {totalPayment}</h3>
<PieChart width={400} height={400} >
  <Pie
    data={data}
    dataKey="value"
    nameKey="name"
    cx="50%"
    cy="50%"
    outerRadius={100}
    fill="#8884d8"
    label
    >
    {data.map((entry, index) => (
      <Cell key={index} fill={COLORS[index % COLORS.length]} />
      ))}
  </Pie>
</PieChart>
  </Box>
      </Flex>
      
    </Box>
    </>
  )
}
