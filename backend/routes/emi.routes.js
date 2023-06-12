const express = require('express');
const emiRoutes = express.Router();

// CalculateEMI API
emiRoutes.post('/', (req, res) => {
  const { loanAmount, annualInterestRate, tenureInMonths } = req.body;

  // Validation - You can add additional validation logic as per your requirements
  if (!loanAmount || !annualInterestRate || !tenureInMonths) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  // Calculation logic
  const principal = parseFloat(loanAmount);
  const rateOfInterest = parseFloat(annualInterestRate) / 12 / 100;
  const tenure = parseInt(tenureInMonths)
  const emi = calculateEMI(principal, rateOfInterest, tenure);
  const interestPayable = (emi * tenure - principal).toFixed(2);
  const totalPayment = emi * tenure;

  // Return the result
  res.status(200).json({ emi, interestPayable, totalPayment });
});

// Function to calculate EMI
const calculateEMI = (principal, rateOfInterest, tenure) => {
  const emi =
    principal *
    rateOfInterest *
    Math.pow(1 + rateOfInterest, tenure) /
    (Math.pow(1 + rateOfInterest, tenure) - 1);
  return emi.toFixed(2);
};

module.exports = emiRoutes;