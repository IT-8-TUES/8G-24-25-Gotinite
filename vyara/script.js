
 
 const cat = document.getElementById("cat");

// Зареждане на избрания цвят на козина
const savedFur = localStorage.getItem("furColor");
const savedEyes = localStorage.getItem("eyeColor");
const savedMood = localStorage.getItem("catMood"); // зареждане на настроение

if (savedFur) {
  cat.style.setProperty('--furColor', savedFur);
  const shade = shadeColor(savedFur, -20);
  cat.style.setProperty('--furShadeColor', shade);
}

if (savedEyes) {
  document.getElementById("eye-left").style.setProperty('--eyeColor', savedEyes);
  document.getElementById("eye-right").style.setProperty('--eyeColor', savedEyes);
}

// Цветов помощна функция
function shadeColor(color, percent) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);
  R = (R < 255) ? R : 255;
  G = (G < 255) ? G : 255;
  B = (B < 255) ? B : 255;

  return "#" + R.toString(16).padStart(2, "0") +
               G.toString(16).padStart(2, "0") +
               B.toString(16).padStart(2, "0");
}

// Дефиниция на стилове за вежди
const brows = document.getElementById('brows');
const browStyles = {
  Angry: [
    'transform: rotate(20deg) translate(-30px, 10px);',
    'transform: rotate(-20deg) translate(30px, 6px);'
  ],
  Happy: [
    'transform: rotate(-1deg) translate(-30px, 10px);',
    'transform: rotate(1deg) translate(30px, 6px);'
  ],
  Sad: [
    'transform: rotate(15deg) translate(40px, 5px);',
    'transform: rotate(-15deg) translate(-40px, 1px);'
  ],
  Judgy: [
    'transform: rotate(10deg) translate(-30px, 15px);',
    'transform: rotate(-20deg) translate(30px, 6px);'
  ],
  Bored: [
    'transform: rotate(-1deg) translate(-30px, 10px);',
    'transform: rotate(-1deg) translate(30px, 6px);'
  ],
  Confused: [
    'transform: rotate(-1deg) translate(-30px, 10px);',
    'transform: rotate(-19deg) translate(30px, 6px);'
  ]
};


document.querySelectorAll('.emotion-button').forEach(button => {
  button.addEventListener('click', () => {
    const emotion = button.getAttribute('data-emotion');

    // zapazvane v lS
    localStorage.setItem('catMood', emotion);

    
    generateBrows(emotion);
  });
});


if (savedMood) {
  generateBrows(savedMood);
}


function generateBrows(emotion) {
  brows.innerHTML = '';
  const styles = browStyles[emotion];
  if (!styles) return;

  styles.forEach(style => {
    const line = document.createElement('div');
    line.classList.add('brow-line');
    line.style.cssText = style;
    brows.appendChild(line);
  });
}
fetch("../navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar-container").innerHTML = data;
  });
  function toggleMenu() {
  document.getElementById("menuDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches('.menu-toggle')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}