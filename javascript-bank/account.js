/* exported Account */
function Account(number, holder) {
  this.number = number;
  this.holder = holder;
  this.transactions = new Array();
}

Account.prototype.deposit = function (amount) {
  if (amount > 0 && Number.isInteger(amount)) {
    var deposit = new Transaction('deposit', amount);
    this.transactions.push(deposit);
    return true;
  } else {
    return false;
  }
}

Account.prototype.withdraw = function (amount) {
  if (amount > 0 && Number.isInteger(amount)) {
    var withdrawal = new Transaction('withdrawal', amount);
    this.transactions.push(withdrawal);
    return true;
  } else {
    return false;
  }
}

Account.prototype.getBalance = function () {
  var depositSum = 0;
  var withdrawalSum = 0;

  for (let i = 0; i < this.transactions.length; i++) {
    if (this.transactions[i].type === 'deposit') {
      depositSum += this.transactions[i].amount;
    } else if (this.transactions[i].type === 'withdrawal') {
      withdrawalSum += this.transactions[i].amount;
    }
  }
  return depositSum - withdrawalSum;
}
