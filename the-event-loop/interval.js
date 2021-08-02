let count = 3;
const interval = setInterval(startCount, 1000)

function startCount() {
  if (count === 0) {
    clearInterval(interval);
    console.log('Blastoff!');
  } else {
    console.log(count);
  }
  count--;
}
