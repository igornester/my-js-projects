let nominal = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100,
};

function checkCashRegister(price, cash, cid) {
  function moneyForCurrnetTransaction(inputSum, cid) {
    return cid.filter((value) => {
      // Return only cash with nomial lower then change, if cash of that nominal avalible in Cash-In-Drawer
      return value[1] !== 0 && nominal[value[0]] < inputSum;
    });
  }

  let inputSum = (cash - price).toFixed(2);
  let availableMoney = moneyForCurrnetTransaction(inputSum, cid); //Array of available money for current trunsaction
  let sum = 0; //Accumulated sum of change
  let arrayOfChange = [];
  let resultObject = {};

  for (let i = 1; i <= availableMoney.length && sum < inputSum; i++) {
    //Iterating avaliable money Array

    let currentCash = availableMoney[availableMoney.length - i][1]; //Cash of current nominal
    let currentNominal = availableMoney[availableMoney.length - i][0]; //Current nominal
    let currentSum = Math.min(
      //
      // Evaluate current sum of change as minimum of available cash and part of inputSum of current nominal
      Math.trunc((inputSum - sum).toFixed(2) / nominal[currentNominal]) *
        nominal[currentNominal],
      currentCash
    );

    if (currentSum) arrayOfChange.push([currentNominal, currentSum]); //Additing nominal and sum in result array
    sum += currentSum;
  }

  //Genereting output Object
  if (sum < inputSum) {
    resultObject.status = "INSUFFICIENT_FUNDS";
    resultObject.change = [];
  }
  if (sum.toFixed(2) == inputSum) {
    if (cid.reduce((acc, value) => acc + value[1], 0) == inputSum) {
      resultObject.status = "CLOSED";
      resultObject.change = cid;
    } else {
      resultObject.status = "OPEN";
      resultObject.change = arrayOfChange;
    }
  }

  return resultObject;
}

let result = checkCashRegister(19.5, 121.32, [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 2.2],
  ["QUARTER", 0],
  ["ONE", 101],
  ["FIVE", 25],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
]);
