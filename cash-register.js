function checkCashRegister(price, cash, cid) {
  let registerStatus = "OPEN";
  let returnChange = [];

  //for exact or not enough...
  if (cash <= price) {
    return { status: registerStatus, change: returnChange }
  }

  // console.log(price);
  // console.log(cash);
  let changeDue = cash - price;
  // console.log(changeDue);

  const CURRENCYUNIT = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.10,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };

  // console.log(cid);
  let moneyInsufficient = true;
  let changeToReturn = [];
  let moneyLeftInDrawer = 0;
  let oldDrawer = [];
  //why is this a copy and not a new array?
  // let oldDrawer = cid.map(m => m);
  cid.map(function(m) {
    oldDrawer.push([m[0], m[1]]);
  });

  cid.reverse().map(function(money) {
    // console.log(money);
    moneyLeftInDrawer += money[1];

    //if the currency value is higher, can't make exact change with it
    //skip
    if (CURRENCYUNIT[money[0]] > changeDue) {
      return money;
    }

    //if we have enough of this to make change, try to
    if (changeDue / CURRENCYUNIT[money[0]] > 1 && money[1] > 0) {
      let units = Math.floor(changeDue / CURRENCYUNIT[money[0]]);
      if (money[1] <= changeDue) {
        units = money[1] / CURRENCYUNIT[money[0]];
        changeDue = changeDue - money[1];
      } else {
        changeDue = changeDue % CURRENCYUNIT[money[0]];
      }

      if (CURRENCYUNIT[money[0]] < 1) {
        changeDue = changeDue.toPrecision(2);
      } else {
        changeDue = changeDue.toPrecision(4);
      }
      
      changeToReturn.push([money[0], units * CURRENCYUNIT[money[0]]]);
      moneyLeftInDrawer -= money[1];
      money[1] -= units * CURRENCYUNIT[money[0]];
    }

    if (changeDue == 0) {
      moneyInsufficient = false;
    }

    // console.log('passed logic');
    // console.log(money);
    // console.log(changeDue);
    // console.log(changeToReturn);
    
    return money;
  });

  // console.log(changeToReturn);
  // console.log(newDrawer);
  // console.log(moneyLeftInDrawer);
  if (moneyInsufficient) {
    registerStatus = "INSUFFICIENT_FUNDS";
  } else if (moneyLeftInDrawer == 0) {
    registerStatus = "CLOSED";
    returnChange = oldDrawer;
  } else if (changeToReturn.length > 0) {
    returnChange = changeToReturn;
  }
  
  let register = { status: registerStatus, change: returnChange };
  // console.log(register);
  return register;
}

// checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
// checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

// // should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.


checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

// should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}