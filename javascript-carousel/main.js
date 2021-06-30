var $view = document.querySelector('.container');
var $viewNumber = $view.getAttribute('view');
var $imageSource = document.querySelector('img');
var $leftAngle = document.querySelector('.fa-chevron-left');
var $rightAngle = document.querySelector('.fa-chevron-right');
var $dot = document.querySelectorAll('.dot');
var timer = setInterval(autoRun, 3000);

var images = [
    {
      imageID: 1,
      source: "images/001.png"
    },
    {
      imageID: 2,
      source: "images/004.png"
    },
    {
      imageID: 3,
      source: "images/007.png"
    },
    {
      imageID: 4,
      source: "images/025.png"
    },
    {
      imageID: 5,
      source: "images/039.png"
    },
  ]

function switchImage() {
  $view.setAttribute('view', $viewNumber);

  for (let i = 0; i < images.length; i++) {
    if ($viewNumber === images[i].imageID) {
      $imageSource.setAttribute('src', images[i].source)
    }
  };

  for (let j = 0; j < $dot.length; j++) {
    if ($viewNumber.toString() === $dot[j].getAttribute('index')) {
      $dot[j].className = 'dot fas fa-circle';
    } else {
      $dot[j].className = 'dot far fa-circle';
    }
  }
}

function autoRun() {
  if ($viewNumber === images.length) {
    $viewNumber = 0;
  };
  $viewNumber++;
  switchImage();
}

$leftAngle.addEventListener('click', function(event) {
  $viewNumber--;
  if ($viewNumber < 1) {
    $viewNumber = images.length;
  };
  switchImage();
})

$rightAngle.addEventListener('click', function(event) {
  $viewNumber++;
  if ($viewNumber > images.length) {
    $viewNumber = 1;
  };
  switchImage();
})

$view.addEventListener('click', function(event) {
  if (event.target.getAttribute('index')) {
    var $dotIndex = event.target.getAttribute('index');
    $viewNumber = parseInt($dotIndex);
  };
  switchImage();
  clearInterval(timer);
  timer = setInterval(autoRun, 3000);
})
