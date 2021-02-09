/**
 * Given price of purchase, cash paid and cash in drawer
 * Calculate the state of the cash register
 * 
 * @param {Number} price - Price of purchased goods
 * @param {Number} cash - Cash paid to make purchase
 * @param {Array} cid - 2D Array [['PENNY', 0.01], ...]
 * @return {Object} - The status and change due (if any) e.g. { status: "Open", change: ['PENNY', 0.01] }  
 */
function checkCashRegister(price, cash, cid) {
  let registerStatus = "OPEN";
  let returnChange = [];

  //Should provided cash be exact amount or less than the price of purchase
  //
  if (cash <= price) {
    return { status: registerStatus, change: returnChange }
  }

  //Given the cash given and the price of purchase
  //know the amount of change due:
  let changeDue = cash - price;

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
    //record the number left in the drawer (needed for cases where all the cash in drawer is used up)
    moneyLeftInDrawer += money[1];

    //if the currency value is higher, the register can't make exact change with it
    //skip
    if (CURRENCYUNIT[money[0]] > changeDue) {
      return money;
    }

    //for the currency unit under consideration: CURRENCYUNIT[money[0]]
    //if the change due is divisible by it 
    // (e.g. 11 dollars due, and currently considering 10 dollar bills)
    // If there is cash in the drawer of the specified unit:
    if (changeDue / CURRENCYUNIT[money[0]] > 1 && money[1] > 0) {
      let units = Math.floor(changeDue / CURRENCYUNIT[money[0]]);

      //If the register can not make exact change with the amount for the current unit
      if (money[1] <= changeDue) {
        units = money[1] / CURRENCYUNIT[money[0]];
        changeDue = changeDue - money[1];
      } else {
        changeDue = changeDue % CURRENCYUNIT[money[0]];
      }

      //Handle issues with rounding
      if (CURRENCYUNIT[money[0]] < 1) {
        changeDue = changeDue.toPrecision(2);
      } else {
        changeDue = changeDue.toPrecision(4);
      }
      
      //Update the amount of change to be given, the amount left in the register
      //and the amount left for the given currency unit in the drawer
      changeToReturn.push([money[0], units * CURRENCYUNIT[money[0]]]);
      moneyLeftInDrawer -= money[1];
      money[1] -= units * CURRENCYUNIT[money[0]];
    }

    //if no more change is due, then the amount in the drawer was
    //sufficient to make change
    if (changeDue == 0) {
      moneyInsufficient = false;
    }
    
    //Add the current currency unit amount to the drawer
    return money;
  });

  //After processing the cash -> change
  //Look at the state of the cash register
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

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);