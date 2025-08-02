// 별 배경 설정
const starCanvas = document.getElementById('star-bg');
function resizeStarCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
}
resizeStarCanvas();
window.addEventListener('resize', resizeStarCanvas);
const c = starCanvas.getContext('2d');
let stars = [];
for (let i = 0; i < 140; i++) {
    stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.5 + 0.5,
        dx: Math.random() * 0.2 - 0.1,
    });
}
function drawStars() {
    c.clearRect(0, 0, starCanvas.width, starCanvas.height);
    for (let s of stars) {
        c.save();
        c.globalAlpha = s.alpha * (0.6 + 0.4 * Math.sin(Date.now() * 0.002 + s.x));
        c.beginPath();
        c.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        c.fillStyle = "#fff";
        c.shadowColor = "#fff9";
        c.shadowBlur = 6;
        c.fill();
        c.restore();
        s.x += s.dx;
        if (s.x < 0) s.x = window.innerWidth;
        if (s.x > window.innerWidth) s.x = 0;
    }
    requestAnimationFrame(drawStars);
}
drawStars();

// 파티클 폭죽 효과
const confettiCanvas = document.getElementById("confetti-canvas");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;
window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});
const ctx = confettiCanvas.getContext("2d");
let confettiParticles = [];

function popConfetti() {
    const colors = ["#fd3c97", "#ffe535", "#a1f473", "#72d4ff", "#ffbc30", "#ff867a", "#9583ff"];
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    for (let i = 0; i < 80; i++) {
        let angle = Math.random() * 2 * Math.PI;
        let speed = Math.random() * 5 + 4;
        confettiParticles.push({
            x: x,
            y: y,
            r: Math.random() * 7 + 5,
            color: colors[Math.floor(colors.length * Math.random())],
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            gravity: 0.21 + Math.random() * 0.1,
            alpha: 1
        });
    }
    animateConfetti();
}

function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach((p, i) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = "#fff8";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= 0.012;
        if (p.alpha <= 0 || p.y > window.innerHeight + 30) confettiParticles[i] = null;
    });
    confettiParticles = confettiParticles.filter(e => e);
    if (confettiParticles.length > 0) {
        requestAnimationFrame(animateConfetti);
    }
}

// 배경 음악 재생/일시정지
function playMusic() {
    const audio = document.getElementById('bday-audio');
    const btn = document.getElementById('audio-btn');
    if (audio.paused) {
        audio.play();
        btn.textContent = "멈추기 ⏸";
    } else {
        audio.pause();
        audio.currentTime = 0;
        btn.textContent = "배경음악 듣기♪";
    }
}

// 다음 생일까지 남은 일수 계산
function daysUntilNextBirthday(month, day) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 날짜 비교를 위해 시간 초기화

    let year = today.getFullYear();
    let nextBirthday = new Date(year, month - 1, day);

    if (nextBirthday < today) {
        nextBirthday = new Date(year + 1, month - 1, day);
    }

    const diffTime = nextBirthday - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

document.addEventListener("DOMContentLoaded", () => {
    const daysLeftElem = document.getElementById('daysLeft');
    const daysLeft = daysUntilNextBirthday(8, 1); // 8월 1일 생일 기준
    daysLeftElem.textContent = daysLeft;
});
