// Design a cash register drawer function checkCashRegister() 
// that accepts purchase price as the first argument (price), 
// payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

// cid is a 2D array listing available currency.

// The checkCashRegister() function should always return an object with a status key and a change key.

// Return {status: "INSUFFICIENT_FUNDS", change: []} 
// if cash-in-drawer is less than the change due, or if you cannot return the exact change.

// Return {status: "CLOSED", change: [...]} 
// with cash-in-drawer as the value for the key change if it is equal to the change due.

// Otherwise, return {status: "OPEN", change: [...]}, 
// with the change due in coins and bills, sorted in highest to lowest order, 
// as the value of the change key.

// Currency Unit	Amount
// Penny	$0.01 (PENNY)
// Nickel	$0.05 (NICKEL)
// Dime	$0.1 (DIME)
// Quarter	$0.25 (QUARTER)
// Dollar	$1 (ONE)
// Five Dollars	$5 (FIVE)
// Ten Dollars	$10 (TEN)
// Twenty Dollars	$20 (TWENTY)
// One-hundred Dollars	$100 (ONE HUNDRED)

/**
 * Object representing a Cash Register
 * @param {Array} cid 
 */
let CashRegister = function (cid) {
  let cashInDrawer = cid;
  let registerStatus = "OPEN";
  let moneyInsufficient = true;
  let changeToReturn = [];
  let moneyLeftInDrawer = 0;
  let originalDrawer = [];
  let changeDue = 0;

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

  //why is this a copy and not a new array?
  // let oldDrawer = cid.map(m => m);
  cid.map(function(m) {
    originalDrawer.push([m[0], m[1]]);
  });

  /**
   * @param {Number} due - The change due
   */
  this.setChangeDue = function(due) {
    changeDue = due;
  }

  /**
   * Process
   * @param {Array} money - Currency unit and amount in the register
   * e.g. ["PENNY", 1.01] or ["TWENTY", 60]
   * @return {Array} Currency unit and amount left in the register ["PENNY", 0.21]
   */
  this.processDrawer = function(money) {
    //update record of the amount left in the drawer 
    //(needed for cases where all the cash in drawer is used up)
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
  };

  /**
   * After processing the change due
   * return the current state of the cash register
   */
  this.getStatus = function() {
    let returnChange = [];
    if (moneyInsufficient) {
      registerStatus = "INSUFFICIENT_FUNDS";
    } else if (moneyLeftInDrawer == 0) {
      registerStatus = "CLOSED";
      returnChange = originalDrawer;
    } else if (changeToReturn.length > 0) {
      returnChange = changeToReturn;
    }
    
    return { status: registerStatus, change: returnChange };
  };
};

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
  let register = new CashRegister(cid);
  
  //Should provided cash be exact amount or less than the price of purchase
  if (cash <= price) {
    return register.getStatus();
  }

  //Given the cash given and the price of purchase
  //know the amount of change due:
  register.setChangeDue(cash - price);
  cid.reverse().map(register.processDrawer);

  return register.getStatus();
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);