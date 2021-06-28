var heading = document.querySelector('h1');
var timer = setInterval(countDown, 1000);

function countDown() {
  heading.textContent--;

  if (heading.textContent === '0') {
    heading.textContent = '~Earth Beeloooowww Us~';
    clearInterval(timer);
  }
}
