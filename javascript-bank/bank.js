/* exported Bank */
function Bank() {
  this.nextAccountNumber = 1;
  this.accounts = new Array();
}

Bank.prototype.openAccount = function(holder, balance) {
  if (Number.isInteger(balance) && balance > 0) {
    var newAccount = new Account(this.nextAccountNumber, holder);
    newAccount.deposit(balance);
    this.accounts.push(newAccount);
    this.nextAccountNumber++;
    return newAccount.number;
  } else {
    return null;
  }
}

Bank.prototype.getAccount = function(number) {
  for (let i = 0; i < this.accounts.length; i++) {
    if (this.accounts[i].number === number) {
      return this.accounts[i];
    }
  }
  return null;
}

Bank.prototype.getTotalAssets = function() {
  var totalAssets = 0;
  for (let i = 0; i < this.accounts.length; i++) {
    totalAssets += this.accounts[i].getBalance();
  }
  return totalAssets;
}
