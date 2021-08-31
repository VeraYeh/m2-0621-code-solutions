const takeAChance = require('./take-a-chance');

const promiseObj = takeAChance('Vera');

promiseObj.then((value) => {
  console.log(value);
});

promiseObj.catch((error) => {
  console.log(error.message);
});
