const express = require('express'); 
const app = express(); 
const cors = require('cors'); 
 
const Web3 = require('web3'); 
 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors()); 
 
/* Get all transactions */ 
app.get('/transaction', async (req, res) => { 
  try { 
    let totalTransaction = []; 
    const PROVIDER = 'https://rinkeby.infura.io/v3/e5b97339938341618b45e7e0d7e7d225'; 
    const web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER)); 
    const BLOCK_NUMBER_FROM = 10441830; 
    const BLOCK_NUMBER_TO = 10441840; 
     
    for (let i = BLOCK_NUMBER_FROM; i <= BLOCK_NUMBER_TO; i++) { 
      const result = await web3.eth.getBlock(i, true); 
      totalTransaction.push(result); 
    } 
    res.json(totalTransaction); 
  } catch(err) { 
    throw err; 
  } 
}) 
 
app.listen(5000, () => { 
  console.log('Connected to http://localhost:5000'); 
})