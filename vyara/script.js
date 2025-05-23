
 
  const cat = document.getElementById("cat");

    const savedFur = localStorage.getItem("furColor");
    const savedEyes = localStorage.getItem("eyeColor");

    if (savedFur) {
      cat.style.setProperty('--furColor', savedFur);
      // Optional: darker shade for fur
      const shade = shadeColor(savedFur, -20); // e.g. 20% darker
      cat.style.setProperty('--furShadeColor', shade);
    }

    if (savedEyes) {
      document.getElementById("eye-left").style.setProperty('--eyeColor', savedEyes);
      document.getElementById("eye-right").style.setProperty('--eyeColor', savedEyes);
    }

    // Utility to generate a darker/lighter color from a hex code
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

      const RR = (R.toString(16).padStart(2, "0"));
      const GG = (G.toString(16).padStart(2, "0"));
      const BB = (B.toString(16).padStart(2, "0"));

      return "#" + RR + GG + BB;
    }
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
      'transform: rotate(15deg) translate(30px, 5px);',
        'transform: rotate(-15deg) translate(-30px, 1px);'
      ],
      Judgy: [
        'transform: rotate(10deg) translate(-30px, 15px);',
        'transform: rotate(-20deg) translate(30px, 6px);'
      ],
      Bored: [
      'transform: rotate(-1deg) translate(-30px, 10px);',
        'transform: rotate(-1deg) translate(30px, 6px);',
      ],
      Confused: [
        'transform: rotate(-1deg) translate(-30px, 10px);',
        'transform: rotate(-19deg) translate(30px, 6px);'
      ],
    };

    document.querySelectorAll('.emotion-button').forEach(button => {
      button.addEventListener('click', () => {
        const emotion = button.getAttribute('data-emotion');
        brows.innerHTML = '';
        browStyles[emotion].forEach(style => {
          const line = document.createElement('div');
          line.classList.add('brow-line');
          line.style.cssText = style;
          brows.appendChild(line);
        });
      });
    });
