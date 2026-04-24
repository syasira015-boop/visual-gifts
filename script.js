
/* ---------- SENDER KEYBOARD  ---------- */
const keyboard = document.getElementById("keyboard");
const messageBox = document.getElementById("message");

if (keyboard) {
  const keys = [
    "q","w","e","r","t","y","u","i","o","p",
    "a","s","d","f","g","h","j","k","l",
    "z","x","c","v","b","n","m",
    "😊","😍","😂","❤️","💕","✨"
  ];

  keys.forEach(k => {
    const key = document.createElement("div");
    key.className = "key";
    key.innerText = k;

    key.onclick = () => {
      messageBox.value += k;
    };

    keyboard.appendChild(key);
  });

  /* SPACE BUTTON */
  const space = document.createElement("div");
  space.className = "key space";
  space.innerText = "SPACE";
  space.onclick = () => messageBox.value += " ";
  keyboard.appendChild(space);

  /* CUT / BACKSPACE BUTTON */
  const cut = document.createElement("div");
  cut.className = "key cut";
  cut.innerText = "CUT ⌫";
  cut.onclick = () => {
    messageBox.value = messageBox.value.slice(0, -1);
  };
  keyboard.appendChild(cut);
}
/* ---------- GENERATE LINK ---------- */
function generateLink() {
  const msg = messageBox.value;
  if (!msg) return alert("Write something first 💔");

  const base = "https://yourusername.github.io/visual-gift/receiver.html";

  const link = `${base}?msg=${encodeURIComponent(msg)}`;

  document.getElementById("linkBox").innerHTML =
    `💌 Send this link:<br>
    <a href="${link}" target="_blank">${link}</a>`;
}

/* ---------- RECEIVER MAGIC ---------- */
const magicBtn = document.getElementById("magicBtn");
const letterBox = document.getElementById("letterBox");

if (magicBtn) {

  let stage = 0;

  const texts = [
    "Click me 💫",
    "Nope try again 😏",
    "Almost there… 💕",
    "Last chance ✨",
    "Open your gift 🎁"
  ];

  const msg = decodeURIComponent(getMessageFromURL() || "");

  magicBtn.onclick = () => {

    stage++;

    magicBtn.style.position = "absolute";
    magicBtn.style.top = Math.random() * 70 + "%";
    magicBtn.style.left = Math.random() * 70 + "%";

    if (stage < texts.length) {
      magicBtn.innerText = texts[stage];
    }

    if (stage === texts.length) {
      magicBtn.style.display = "none";

      letterBox.innerText = msg || "💔 No message found";
      letterBox.classList.remove("hidden");

      startConfetti();
    }
  };
}
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

if (canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

let pieces = [];

function createConfetti() {
  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 120,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      tilt: Math.random() * 10 - 10
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach((p, i) => {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.r, p.r);

    p.y += 2 + p.d / 100;
    p.x += Math.sin(p.d / 10);

    if (p.y > canvas.height) {
      pieces[i].y = -10;
    }
  });

  requestAnimationFrame(drawConfetti);
}

function startConfetti() {
  createConfetti();
  drawConfetti();

  setTimeout(() => {
    pieces = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 4000);
}
function getMessageFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("msg");
}