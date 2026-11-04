  const portrait = document.getElementById("portrait");
const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let animationId = 0;
let bursting = false;

function sizeCanvas() {
  const r = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.max(1, Math.round(r.width * dpr));
  canvas.height = Math.max(1, Math.round(r.height * dpr));

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawPortrait();
}

function drawPortrait() {
  const r = canvas.getBoundingClientRect();

  if (!portrait.complete || !portrait.naturalWidth) return;

  ctx.clearRect(0, 0, r.width, r.height);

  const scale = Math.min(
    r.width / portrait.naturalWidth,
    r.height / portrait.naturalHeight
  );

  const w = portrait.naturalWidth * scale;
  const h = portrait.naturalHeight * scale;

  ctx.drawImage(
    portrait,
    (r.width - w) / 2,
    r.height - h,
    w,
    h
  );
}

function burst() {
  if (!portrait.naturalWidth || bursting) return;

  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const snap = ctx.getImageData(
    0, 0, canvas.width, canvas.height
  );

  const step = 7;
  particles = [];

  for (let y = 0; y < canvas.height; y += step * dpr) {
    for (let x = 0; x < canvas.width; x += step * dpr) {

      const idx = (y * canvas.width + x) * 4;
      const a = snap.data[idx + 3];

      if (a > 35) {
        const px = x / dpr;
        const py = y / dpr;

        particles.push({
          x: px,
          y: py,
          vx: (Math.random() - 0.5) * 13,
          vy: (Math.random() - 0.65) * 13,
          life: 45 + Math.random() * 55,
          size: step / dpr + Math.random() * 2,
          color: `rgba(
            ${snap.data[idx]},
            ${snap.data[idx + 1]},
            ${snap.data[idx + 2]},
            ${a / 255}
          )`
        });
      }
    }
  }

  ctx.clearRect(0, 0, rect.width, rect.height);

  bursting = true;
  cancelAnimationFrame(animationId);

  animate();
}

function animate() {
  const r = canvas.getBoundingClientRect();

  ctx.clearRect(0, 0, r.width, r.height);

  let alive = 0;

  for (const p of particles) {
    if (p.life <= 0) continue;

    alive++;

    p.x += p.vx;
    p.y += p.vy;

    p.vx *= 0.985;
    p.vy = p.vy * 0.985 + 0.035;

    p.life--;

    ctx.globalAlpha = Math.min(1, p.life / 28);
    ctx.fillStyle = p.color;

    ctx.fillRect(
      p.x,
      p.y,
      p.size,
      p.size
    );
  }

  ctx.globalAlpha = 1;

  if (alive) {
    animationId = requestAnimationFrame(animate);
  } else {
    bursting = false;
    particles = [];
    drawPortrait();
  }
}

// Efek sentuh dan klik foto
canvas.addEventListener("pointerdown", function(e) {
  e.preventDefault();
  burst();
});

// Foto siap dimuat
portrait.addEventListener("load", sizeCanvas);

window.addEventListener("resize", sizeCanvas);

if (portrait.complete) {
  sizeCanvas();
}

// Mengganti foto melalui galeri HP
const photoInput = document.getElementById("photoInput");

photoInput.addEventListener("change", function(e) {
  const file = e.target.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Pilih file gambar.");
    return;
  }

  const url = URL.createObjectURL(file);

  portrait.onload = function() {
    sizeCanvas();
    URL.revokeObjectURL(url);
  };

  portrait.src = url;
});

// Navigasi halaman
const links = document.querySelectorAll(".dock a");
const pages = document.querySelectorAll(".page");

links.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();

    const id = link.getAttribute("href").slice(1);

    pages.forEach(page => {
      page.classList.toggle("active", page.id === id);
    });

    links.forEach(a => {
      a.classList.toggle("selected", a === link);
    });

    history.replaceState(null, "", "#" + id);
  });
}); const portrait = document.getElementById("portrait");
const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let animationId = 0;
let bursting = false;

function sizeCanvas() {
  const r = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.max(1, Math.round(r.width * dpr));
  canvas.height = Math.max(1, Math.round(r.height * dpr));

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawPortrait();
}

function drawPortrait() {
  const r = canvas.getBoundingClientRect();

  if (!portrait.complete || !portrait.naturalWidth) return;

  ctx.clearRect(0, 0, r.width, r.height);

  const scale = Math.min(
    r.width / portrait.naturalWidth,
    r.height / portrait.naturalHeight
  );

  const w = portrait.naturalWidth * scale;
  const h = portrait.naturalHeight * scale;

  ctx.drawImage(
    portrait,
    (r.width - w) / 2,
    r.height - h,
    w,
    h
  );
}

function burst() {
  if (!portrait.naturalWidth || bursting) return;

  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const snap = ctx.getImageData(
    0, 0, canvas.width, canvas.height
  );

  const step = 7;
  particles = [];

  for (let y = 0; y < canvas.height; y += step * dpr) {
    for (let x = 0; x < canvas.width; x += step * dpr) {

      const idx = (y * canvas.width + x) * 4;
      const a = snap.data[idx + 3];

      if (a > 35) {
        const px = x / dpr;
        const py = y / dpr;

        particles.push({
          x: px,
          y: py,
          vx: (Math.random() - 0.5) * 13,
          vy: (Math.random() - 0.65) * 13,
          life: 45 + Math.random() * 55,
          size: step / dpr + Math.random() * 2,
          color: `rgba(
            ${snap.data[idx]},
            ${snap.data[idx + 1]},
            ${snap.data[idx + 2]},
            ${a / 255}
          )`
        });
      }
    }
  }

  ctx.clearRect(0, 0, rect.width, rect.height);

  bursting = true;
  cancelAnimationFrame(animationId);

  animate();
}

function animate() {
  const r = canvas.getBoundingClientRect();

  ctx.clearRect(0, 0, r.width, r.height);

  let alive = 0;

  for (const p of particles) {
    if (p.life <= 0) continue;

    alive++;

    p.x += p.vx;
    p.y += p.vy;

    p.vx *= 0.985;
    p.vy = p.vy * 0.985 + 0.035;

    p.life--;

    ctx.globalAlpha = Math.min(1, p.life / 28);
    ctx.fillStyle = p.color;

    ctx.fillRect(
      p.x,
      p.y,
      p.size,
      p.size
    );
  }

  ctx.globalAlpha = 1;

  if (alive) {
    animationId = requestAnimationFrame(animate);
  } else {
    bursting = false;
    particles = [];
    drawPortrait();
  }
}

// Efek sentuh dan klik foto
canvas.addEventListener("pointerdown", function(e) {
  e.preventDefault();
  burst();
});

// Foto siap dimuat
portrait.addEventListener("load", sizeCanvas);

window.addEventListener("resize", sizeCanvas);

if (portrait.complete) {
  sizeCanvas();
}

// Mengganti foto melalui galeri HP
const photoInput = document.getElementById("photoInput");

photoInput.addEventListener("change", function(e) {
  const file = e.target.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Pilih file gambar.");
    return;
  }

  const url = URL.createObjectURL(file);

  portrait.onload = function() {
    sizeCanvas();
    URL.revokeObjectURL(url);
  };

  portrait.src = url;
});

// Navigasi halaman
const links = document.querySelectorAll(".dock a");
const pages = document.querySelectorAll(".page");

links.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();

    const id = link.getAttribute("href").slice(1);

    pages.forEach(page => {
      page.classList.toggle("active", page.id === id);
    });

    links.forEach(a => {
      a.classList.toggle("selected", a === link);
    });

    history.replaceState(null, "", "#" + id);
  });
});
