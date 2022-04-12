import axios from "axios";

export const getBlock = () => {
  return axios.get("http://localhost:5000/transaction");
};

export const getBlockTotal = async () => {
  let a = (await getBlock()).data;
  let index = a.length;
  let totalTx = 0;
  let transactions = [];
  // 5.
  for (let i = 0; i < index; i++) {
    totalTx += a[i].transactions.length;
    let result = a[i].transactions.reduce(function (old, newd) {
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
  const findSecondMax = (a) => {
    let firstMax, secondMax;
    if (a[0] > a[1]) {
      firstMax = a[0];
      secondMax = a[1];
    } else {
      firstMax = a[1];
      secondMax = a[0];
    }
    for (let i = 2; i < a.length; i++) {
      if (a[i] >= firstMax) {
        secondMax = firstMax;
        firstMax = a[i];
      } else if (a[i] > secondMax) {
        secondMax = a[i];
      }
    }
    return secondMax.toFixed(2);
  };
  const calcAvgBlockTime = (a) => {
    let totalBlockTime = 0;
    let beforeBlockTime, afterBlockTime;
    if (a.length > 2) {
      for (let i = 0; i < a.length - 1; i++) {
        beforeBlockTime = a[i].timestamp;
        afterBlockTime = a[i + 1].timestamp;
        totalBlockTime += afterBlockTime - beforeBlockTime;
      }
      return totalBlockTime / (a.length - 1);
    }
  };
  return {
    totalTransactions: totalTx,
    secondMaxArr: findSecondMax(transactions),
    avgEth : sumWithInitial/totalTx,
    avgBlockTime: calcAvgBlockTime(a),
  };
};
