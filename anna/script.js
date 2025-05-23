const quotes = [
  "Even the smallest cat is a masterpiece. – Leonardo da Vinci",
  "Cats leave paw prints on your heart.",
  "A purring cat is the definition of peace.",
  "Take a nap. Recharge. Like a cat would.",
  "Inhale... purr... exhale... relax..."
];

function newQuote() {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quote').innerText = q;
}

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function darkenColor(hex, percent) {
  let [r, g, b] = hexToRgb(hex);
  r = Math.floor(r * (1 - percent));
  g = Math.floor(g * (1 - percent));
  b = Math.floor(b * (1 - percent));
  return `rgb(${r}, ${g}, ${b})`;
}

function updatePreview() {
  const furInput = document.getElementById('fur');
  const eyeInput = document.getElementById('eyes');
  const cat = document.getElementById('cat');
  const eyeLeft = document.getElementById('eye-left');
  const eyeRight = document.getElementById('eye-right');

  const furColor = furInput.value;
  const eyeColor = eyeInput.value;
  const shadeColor = darkenColor(furColor, 0.25);

  cat.style.setProperty('--furColor', furColor);
  cat.style.setProperty('--furShadeColor', shadeColor);
  eyeLeft.style.setProperty('--eyeColor', eyeColor);
  eyeRight.style.setProperty('--eyeColor', eyeColor);
  eyeLeft.style.background = eyeColor;
  eyeRight.style.background = eyeColor;

  document.querySelectorAll('.ear').forEach(ear => {
    ear.style.setProperty('--furColor', furColor);
    ear.style.setProperty('--furShadeColor', shadeColor);
  });
}

function saveCat() {
  const furInput = document.getElementById('fur');
  const eyeInput = document.getElementById('eyes');
  localStorage.setItem('furColor', furInput.value);
  localStorage.setItem('eyeColor', eyeInput.value);
  window.location.href = 'nap.html';
}

function toggleMenu() {
  const menu = document.getElementById("nav-menu");
  menu.classList.toggle("hidden");
}

// -------- EYEBROW STYLES --------
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
    'transform: rotate(15deg) translate(30px, 5px);',
    'transform: rotate(-15deg) translate(-30px, 1px);'
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

function generateBrows(emotion) {
  const brows = document.getElementById('brows');
  if (!brows || !browStyles[emotion]) return;

  brows.innerHTML = '';
  const styles = browStyles[emotion];

  styles.forEach(style => {
    const line = document.createElement('div');
    line.classList.add('brow-line');
    line.style.cssText = style;
    brows.appendChild(line);
  });
}

// -------- PAGE LOAD --------
window.onload = () => {
  const fur = localStorage.getItem('furColor') || '#ffccaa';
  const eyes = localStorage.getItem('eyeColor') || '#00cc99';
  const mood = localStorage.getItem('catMood');
  const shade = darkenColor(fur, 0.25);

  const cat = document.getElementById('cat');
  const eyeLeft = document.getElementById('eye-left');
  const eyeRight = document.getElementById('eye-right');

  cat.style.setProperty('--furColor', fur);
  cat.style.setProperty('--furShadeColor', shade);
  eyeLeft.style.setProperty('--eyeColor', eyes);
  eyeRight.style.setProperty('--eyeColor', eyes);
  eyeLeft.style.background = eyes;
  eyeRight.style.background = eyes;

  document.querySelectorAll('.ear').forEach(ear => {
    ear.style.setProperty('--furColor', fur);
    ear.style.setProperty('--furShadeColor', shade);
  });

  const furInput = document.getElementById('fur');
  const eyeInput = document.getElementById('eyes');
  if (furInput && eyeInput) {
    furInput.value = fur;
    eyeInput.value = eyes;
    updatePreview();
    furInput.addEventListener('input', updatePreview);
    eyeInput.addEventListener('input', updatePreview);
  }

  // 👉 Apply brows on load
  if (mood) {
    generateBrows(mood);
  }
};
