import { ethers } from "ethers";
import Web3 from "web3";
require("dotenv").config();

// export const getBlock = async () => {
//   let totalTransaction = [];
//   try {
//     const web3 = new Web3(
//       new Web3.providers.HttpProvider(process.env.REACT_APP_PROVIDER)
//     );
//     const BLOCK_NUMBER_FROM = process.env.REACT_APP_BLOCK_NUMBER_FROM;
//     const BLOCK_NUMBER_TO = process.env.REACT_APP_BLOCK_NUMBER_TO;

//     for (let i = BLOCK_NUMBER_FROM; i <= BLOCK_NUMBER_TO; i++) {
//       const result = await web3.eth.getBlock(i, true);
//       totalTransaction.push(result);
//     }
//   } catch (err) {
//     throw err;
//   }
//   return totalTransaction;
// };

export const getBlockEther = async () => {
  const arrBlock = [];
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_PROVIDER
    );
    const BLOCK_NUMBER_FROM = parseInt(process.env.REACT_APP_BLOCK_NUMBER_FROM);
    const BLOCK_NUMBER_TO = parseInt(process.env.REACT_APP_BLOCK_NUMBER_TO);
    for (let i = BLOCK_NUMBER_FROM; i <= BLOCK_NUMBER_TO; i++) {
      const blockTx = await provider.getBlockWithTransactions(i);
      arrBlock.push(blockTx);
    }
  } catch (err) {
    throw err;
  }
  return arrBlock;
};

export const getBlockTotal = async () => {
  // let a = await getBlock();
  let b = await getBlockEther();
  // let index = a.length;
  let index = b.length;
  let totalTx = 0;
  let transactions = [];
  let transaction = [];
  // 5.
  // for (let i = 0; i < index; i++) {
  //   totalTx += a[i].transactions.length;
  //   let result = a[i].transactions.reduce(function (old, newd) {
  //     return old + newd.value / 10 ** 18;
  //   }, 0);
  //   transactions.push(result);
  // }
  // 5.
  for (let i = 0; i < index; i++) {
    totalTx += b[i].transactions.length;
    let result = b[i].transactions.reduce(function (old, newd) {
      transaction.push(newd.value / 10 ** 18);
      return old + newd.value / 10 ** 18;
    }, 0);
    transactions.push(result);
  }
  //7.
  const sumWithInitial = transactions.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
  //8
  // const findSecondMax = (a) => {
  //   let firstMax, secondMax;
  //   if (a[0] > a[1]) {
  //     firstMax = a[0];
  //     secondMax = a[1];
  //   } else {
  //     firstMax = a[1];
  //     secondMax = a[0];
  //   }
  //   for (let i = 2; i < a.length; i++) {
  //     if (a[i] >= firstMax) {
  //       secondMax = firstMax;
  //       firstMax = a[i];
  //     } else if (a[i] > secondMax) {
  //       secondMax = a[i];
  //     }
  //   }
  //   return secondMax.toFixed(2);
  // };
  //8
  const findSecondMax = (b) => {
    let firstMax, secondMax;
    if (b[0] > b[1]) {
      firstMax = b[0];
      secondMax = b[1];
    } else {
      firstMax = b[1];
      secondMax = b[0];
    }
    for (let i = 2; i < b.length; i++) {
      if (b[i] >= firstMax) {
        secondMax = firstMax;
        firstMax = b[i];
      } else if (b[i] > secondMax) {
        secondMax = b[i];
      }
    }
    return secondMax.toFixed(2);
  };
  // 6
  // const calcAvgBlockTime = (a) => {
  //   let totalBlockTime = 0;
  //   let beforeBlockTime, afterBlockTime;
  //   if (a.length > 2) {
  //     for (let i = 0; i < a.length - 1; i++) {
  //       beforeBlockTime = a[i].timestamp;
  //       afterBlockTime = a[i + 1].timestamp;
  //       totalBlockTime += afterBlockTime - beforeBlockTime;
  //     }
  //     return totalBlockTime / (a.length - 1);
  //   }
  // };
  // 6
  const calcAvgBlockTime = (b) => {
    let totalBlockTime = 0;
    let beforeBlockTime, afterBlockTime;
    if (b.length > 2) {
      for (let i = 0; i < b.length - 1; i++) {
        beforeBlockTime = b[i].timestamp;
        afterBlockTime = b[i + 1].timestamp;
        totalBlockTime += afterBlockTime - beforeBlockTime;
      }
      return totalBlockTime / (b.length - 1);
    }
  };
  return {
    totalTransactions: totalTx,
    secondMaxArr: findSecondMax(transaction),
    avgEth: sumWithInitial / totalTx,
    avgBlockTime: calcAvgBlockTime(b),
  };
};
