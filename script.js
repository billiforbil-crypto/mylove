/* ============================================================
   Шырайлым, если ты открыла код — привет, моё солнышко ☀️
   Здесь всё, что я не всегда успеваю сказать вслух:
   ты самая лучшая, самая лучезарная и самая любимая.
   Шырайкам алтыным менин. Твой Абоська 💕
   ============================================================ */

/* ------------------------------------------------------------
   САМОЕ ГЛАВНОЕ
   Абзал, здесь все твои слова: записки, письмо и подпись.
   ------------------------------------------------------------ */

const CONFIG = {
    // Шырайлым, здесь мои слова для тебя.
    herName: 'Шырайлым',
    petName: 'Солнышкам',
    signature: 'твой Абоська 💕',

    // Абзал, это пять записок в сердечках — пиши их своими словами.
    notes: [
        'Ты — моё самое уютное место. Даже этот закат рядом с тобой стал бы ещё теплее.',
        'Я люблю твой смех. Он звучит у меня в голове даже в самые тихие дни.',
        'Спасибо, что ты рядом. С тобой даже обычная пятница превращается в маленькое приключение.',
        'Ты раскрашиваешь мой мир. Серьёзно: до тебя он был серым пикселем.',
        'Осталось последнее сердечко… Подойди к дереву. Там я скажу тебе самое главное.',
    ],

    // Абзал, здесь финальное письмо. Каждая строка — новый абзац.
    letter: [
        'Если ты это читаешь — значит, ты собрала все сердечки в этом городке. Но у меня их гораздо больше, и все они твои.',
        'Я люблю тебя. Не за что-то, а просто потому, что ты — это ты. За твой смех, за твои глаза, за то, как ты берёшь меня за руку, за каждое «доброе утро» и за каждый вечер рядом.',
        'Спасибо, что ты есть. Я хочу, чтобы у нас было ещё много-много закатов, дорог, глупых шуток и самых обычных счастливых дней.',
        'Ты — моё самое любимое приключение. И я выбираю тебя каждый день.',
    ],

    // Абзал, это сообщение от котика. Гифку выбираешь ты:
    // положи файл рядом с index.html и напиши его имя сюда, например 'cat.gif'.
    // Если оставить пустым — будет только текст, без картинки.
    catNote: 'Шырайкам, этот котик выбрал тебя так же, как и я — раз и навсегда. Он мурчит, потому что рядом ты. Погладь его и знай: я всегда рядом, чтобы согревать тебя. Самые уютные вечера — наши.',
    catGif: 'cat.gif',
};

/* ------------------------------------------------------------
   ТО, ЧТО ТЫ ВИДИШЬ НА ЭКРАНЕ
   Шырайлым, дальше — твой городок, твои сердечки и мои записки.
   ------------------------------------------------------------ */

const canvas = document.getElementById('world');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

const gameEl = document.getElementById('game');
const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');
const letterScreen = document.getElementById('letterScreen');
const letterCard = document.getElementById('letterCard');
const letterText = document.getElementById('letterText');
const letterSign = document.getElementById('letterSign');
const letterSkip = document.querySelector('.letter__skip');
const restartBtn = document.getElementById('restartBtn');
const heartRain = document.getElementById('heartRain');
const noteEl = document.getElementById('note');
const noteText = document.getElementById('noteText');
const noteTitle = document.getElementById('noteTitle');
const noteBtn = document.getElementById('noteBtn');
const catNoteEl = document.getElementById('catNote');
const catText = document.getElementById('catText');
const catSign = document.getElementById('catSign');
const catGif = document.getElementById('catGif');
const catGifWrap = document.getElementById('catGifWrap');
const catBtn = document.getElementById('catBtn');
const hint = document.getElementById('hint');
const pips = document.getElementById('pips');
const soundBtn = document.getElementById('soundBtn');
const actionBtn = document.getElementById('actionBtn');

// Шырайлым, твоё имя теперь живёт во всём этом мире ☀️
document.querySelectorAll('[data-her-name]').forEach((el) => {
    el.textContent = CONFIG.herName;
});
document.querySelectorAll('[data-pet-name]').forEach((el) => {
    el.textContent = CONFIG.petName;
});
document.getElementById('letterTo').textContent = `${CONFIG.herName} ☀️`;
letterSign.textContent = `— ${CONFIG.signature}`;
document.title = `${CONFIG.herName} ☀️ · мой мир — это ты`;

const pipEls = [];
CONFIG.notes.forEach(() => {
    const el = document.createElement('span');
    el.className = 'pip';
    pips.appendChild(el);
    pipEls.push(el);
});

const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

/* ------------------------------------------------------------
   МАЛЕНЬКИЕ ПИКСЕЛИ
   Собираю мир по кусочкам — как собираю счастье рядом с тобой.
   ------------------------------------------------------------ */

function px(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function disc(cx, cy, r, color) {
    ctx.fillStyle = color;
    for (let dy = -r; dy <= r; dy++) {
        const half = Math.floor(Math.sqrt(r * r - dy * dy));
        ctx.fillRect(Math.round(cx - half), Math.round(cy + dy), half * 2 + 1, 1);
    }
}

function seeded(i) {
    const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
}

const HEART_PATTERN = [
    [1, 0], [2, 0], [4, 0], [5, 0],
    [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2],
    [1, 3], [2, 3], [3, 3], [4, 3],
    [2, 4], [3, 4],
];
function drawPixelHeart(x, y, s, color) {
    ctx.fillStyle = color;
    for (const [hx, hy] of HEART_PATTERN) {
        ctx.fillRect(Math.round(x + hx * s), Math.round(y + hy * s), Math.ceil(s), Math.ceil(s));
    }
}

/* ------------------------------------------------------------
   НАШ ГОРОДОК НА ЗАКАТЕ
   Пять сердечек спрятаны здесь специально для тебя.
   ------------------------------------------------------------ */

const HORIZON = 112;
const WALK = { minX: 14, maxX: 306, minY: 143, maxY: 172 };
const TREE = { x: 270, y: 158 };
const CAT = { x: 190, y: 166 };

const HEART_SPOTS = [
    { x: 44, y: 158 },
    { x: 108, y: 147 },
    { x: 166, y: 165 },
    { x: 232, y: 153 },
    { x: 290, y: 150 },
];

const HOUSES = [
    {
        x: 18, baseY: 139, w: 34, h: 22,
        wall: '#5b3864', shade: '#482b51', roof: '#2c1b3c',
        chimney: { x: 42, y: 99 },
    },
    {
        x: 62, baseY: 140, w: 26, h: 16,
        wall: '#4b305b', shade: '#3b254a', roof: '#33203f',
        chimney: null,
    },
    {
        x: 199, baseY: 140, w: 31, h: 19,
        wall: '#613a63', shade: '#4d2e52', roof: '#342040',
        chimney: { x: 213, y: 103 },
    },
];

const SMOKE_SPOTS = [
    { x: 45, y: 97 },
    { x: 216, y: 101 },
];

const CLOUDS = [
    { x: 18, y: 34, scale: 1.2, speed: 1.6, alpha: 0.32 },
    { x: 118, y: 20, scale: 0.9, speed: 1.1, alpha: 0.26 },
    { x: 218, y: 46, scale: 1.4, speed: 1.9, alpha: 0.24 },
];

const BIRDS = [
    { x: 58, y: 47, speed: 3.2, phase: 0 },
    { x: 76, y: 40, speed: 2.8, phase: 1.4 },
    { x: 48, y: 37, speed: 2.4, phase: 2.6 },
];

const STARS = Array.from({ length: 46 }, (_, i) => ({
    x: Math.floor(seeded(i) * W),
    y: 3 + Math.floor(seeded(i + 50) * 62),
    size: seeded(i + 100) > 0.8 ? 2 : 1,
    phase: seeded(i + 150) * Math.PI * 2,
    speed: 0.8 + seeded(i + 200) * 1.6,
}));

const TUFTS = Array.from({ length: 84 }, (_, i) => ({
    x: Math.floor(seeded(i + 300) * W),
    y: 144 + Math.floor(seeded(i + 600) * 34),
    h: 1 + Math.floor(seeded(i + 900) * 2),
    color: seeded(i + 1200) > 0.5 ? '#4d3a63' : '#5c4572',
}));

const FLOWERS = Array.from({ length: 18 }, (_, i) => ({
    x: 16 + Math.floor(seeded(i + 1500) * 288),
    y: 148 + Math.floor(seeded(i + 1800) * 28),
    color: seeded(i + 2100) > 0.5 ? '#ff9eb5' : '#ffd166',
}));

const FIREFLIES = Array.from({ length: 18 }, (_, i) => {
    const nearTree = i > 11;
    return {
        x: nearTree ? 238 + seeded(i + 400) * 62 : 22 + seeded(i + 400) * 268,
        y: nearTree ? 62 + seeded(i + 500) * 56 : 128 + seeded(i + 500) * 42,
        r: 4 + seeded(i + 600) * 6,
        speed: 0.5 + seeded(i + 700) * 1.2,
        phase: seeded(i + 800) * Math.PI * 2,
    };
});

const state = {
    started: false,
    noteOpen: false,
    catOpen: false,
    letterOpen: false,
    finished: false,
    nearTree: false,
    nearCat: false,
    heartsCollected: 0,
    time: 0,
    keys: { up: false, down: false, left: false, right: false },
    player: { x: 152, y: 166, dir: 1, moving: false, walk: 0 },
    hearts: [],
    particles: [],
    smoke: [],
    smokeTimer: 0,
    smokeIndex: 0,
    soundOn: true,
};

function makeHearts() {
    return HEART_SPOTS.map((spot, i) => ({
        ...spot,
        note: i,
        collected: false,
        phase: i * 1.3,
    }));
}
state.hearts = makeHearts();

/* ------------------------------------------------------------
   РИСУЮ ЗАКАТ ДЛЯ ТЕБЯ
   Каждый закат здесь — признание в любви.
   ------------------------------------------------------------ */

// нарисую тебе небо, звёзды и солнце — ты же моё солнце ☀️
function drawSky(t) {
    const sky = ctx.createLinearGradient(0, 0, 0, HORIZON + 10);
    sky.addColorStop(0, '#221740');
    sky.addColorStop(0.36, '#553263');
    sky.addColorStop(0.62, '#a34a72');
    sky.addColorStop(0.84, '#e37a72');
    sky.addColorStop(1, '#ffb178');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, HORIZON + 10);

    for (const s of STARS) {
        const a = (0.25 + 0.6 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase))) * (1 - s.y / 90);
        ctx.globalAlpha = Math.max(0, a);
        px(s.x, s.y, s.size, s.size, '#fff0d0');
    }
    ctx.globalAlpha = 1;

    const sunX = 176;
    const sunY = 96;
    const glow = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, 52);
    glow.addColorStop(0, 'rgba(255, 226, 160, 0.5)');
    glow.addColorStop(0.5, 'rgba(255, 180, 130, 0.16)');
    glow.addColorStop(1, 'rgba(255, 160, 120, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(sunX - 52, sunY - 52, 104, 104);

    disc(sunX, sunY, 16, '#ffe3a1');
    disc(sunX, sunY, 13, '#ffeab5');

    ctx.globalAlpha = 0.18;
    px(sunX - 16, sunY + 2, 32, 2, '#e37a72');
    px(sunX - 14, sunY + 7, 28, 2, '#e37a72');
    ctx.globalAlpha = 1;

    for (const c of CLOUDS) {
        const x = ((c.x + t * c.speed) % (W + 80)) - 40;
        drawCloud(x, c.y, c.scale, c.alpha);
    }

    for (const b of BIRDS) {
        const x = ((b.x + t * b.speed) % (W + 40)) - 20;
        const flap = Math.sin(t * 7 + b.phase) > 0 ? -1 : 0;
        const y = b.y + flap;
        px(x, y, 1, 1, '#3a2545');
        px(x + 1, y - 1, 1, 1, '#3a2545');
        px(x + 2, y, 1, 1, '#3a2545');
        px(x + 3, y - 1, 1, 1, '#3a2545');
        px(x + 4, y, 1, 1, '#3a2545');
    }
}

function drawCloud(x, y, s, alpha) {
    ctx.globalAlpha = alpha;
    const col = '#8a4a78';
    px(x, y + 3 * s, 24 * s, 4 * s, col);
    px(x + 4 * s, y, 14 * s, 5 * s, col);
    px(x + 13 * s, y + 2 * s, 13 * s, 4 * s, col);
    px(x - 3 * s, y + 4 * s, 8 * s, 3 * s, col);
    ctx.globalAlpha = 1;
}

// тропинка, по которой хочется идти только с тобой
function drawGround() {
    const g = ctx.createLinearGradient(0, HORIZON, 0, H);
    g.addColorStop(0, '#4b2e58');
    g.addColorStop(0.45, '#382344');
    g.addColorStop(1, '#1e122c');
    ctx.fillStyle = g;
    ctx.fillRect(0, HORIZON, W, H - HORIZON);

    for (let x = 0; x < W; x += 2) {
        const y = 149 + Math.round(Math.sin(x * 0.05) * 2.5 + Math.sin(x * 0.013 + 1) * 1.5);
        px(x, y, 2, 11, '#5d3a5b');
        px(x, y, 2, 1, '#7c4d6b');
    }

    for (let i = 0; i < 34; i++) {
        const x = Math.floor(seeded(i + 2400) * W);
        const y = 153 + Math.floor(seeded(i + 2700) * 6);
        px(x, y, 2, 1, '#4f3353');
    }
}

function drawHills() {
    ctx.fillStyle = '#7d4268';
    for (let x = 0; x < W; x += 2) {
        const y = 104 + Math.round(3 * Math.sin(x * 0.045) + 2 * Math.sin(x * 0.11 + 1.7));
        ctx.fillRect(x, y, 2, 116 - y);
    }
    ctx.fillStyle = '#4c2a54';
    for (let x = 0; x < W; x += 2) {
        const y = 111 + Math.round(2.5 * Math.sin(x * 0.07 + 2.2) + 1.5 * Math.sin(x * 0.021));
        ctx.fillRect(x, y, 2, 116 - y);
    }
}

// в каждом окошке — свет, как в моей жизни с тобой
function drawHouse(h) {
    const { x, baseY, w, h: height } = h;
    const topY = baseY - height;
    const roofH = Math.max(7, Math.round(w * 0.5));

    px(x - 2, baseY, w + 4, 2, '#241530');

    px(x, topY, w, height, h.wall);
    px(x, topY, 3, height, h.shade);
    px(x + w - 3, topY, 3, height, h.shade);

    const roofW = w + 4;
    for (let i = 0; i < roofH; i++) {
        const rowW = Math.max(2, Math.round((roofW * (i + 1)) / roofH));
        px(x - 2 + Math.round((roofW - rowW) / 2), topY - roofH + i, rowW, 1, h.roof);
    }

    if (h.chimney) {
        px(h.chimney.x, h.chimney.y, 5, 8, h.roof);
        px(h.chimney.x - 1, h.chimney.y, 7, 2, '#241530');
    }

    const winW = 6;
    const wy = topY + Math.max(4, Math.round(height * 0.24));
    drawWindow(x + Math.round(w * 0.16), wy, winW, 6);
    drawWindow(x + w - Math.round(w * 0.16) - winW, wy, winW, 6);

    const dx = x + Math.round(w / 2) - 3;
    px(dx, baseY - 9, 6, 9, '#241530');
    px(dx + 4, baseY - 5, 1, 1, '#ffd27d');
    px(dx - 1, baseY, 8, 2, '#2a1838');
}

function drawWindow(x, y, w, h) {
    ctx.globalAlpha = 0.22;
    px(x - 2, y - 2, w + 4, h + 4, '#ffcf7d');
    ctx.globalAlpha = 1;
    px(x, y, w, h, '#ffd98a');
    px(x + Math.floor(w / 2), y, 1, h, '#8a5238');
    px(x, y + Math.floor(h / 2), w, 1, '#8a5238');
}

// наше дерево, качели и сердечко с твоим именем
function drawTree(t) {
    const all = state.heartsCollected >= CONFIG.notes.length;

    px(265, 103, 9, 41, '#33203a');
    px(268, 103, 3, 41, '#412843');
    px(260, 141, 19, 3, '#2b1a34');
    px(252, 111, 15, 3, '#33203a');
    px(273, 107, 14, 3, '#33203a');

    disc(268, 92, 26, '#2c2145');
    disc(247, 84, 15, '#362750');
    disc(288, 83, 16, '#362750');
    disc(269, 74, 17, '#3b2b57');
    disc(279, 79, 9, '#4a3563');
    disc(251, 81, 6, '#45305f');

    ctx.globalAlpha = 0.5;
    disc(283, 70, 4, '#7a4560');
    disc(291, 80, 3, '#6b3f60');
    ctx.globalAlpha = 1;

    px(255, 112, 1, 18, '#c9a06a');
    px(266, 112, 1, 18, '#c9a06a');
    px(251, 130, 16, 2, '#8a5a4a');

    const pulse = all ? 0.7 + 0.3 * Math.sin(t * 3) : 0.55;
    ctx.globalAlpha = pulse;
    drawPixelHeart(269, 121, 1, all ? '#ff85a6' : '#7a4a63');
    ctx.globalAlpha = 1;

    if (all) {
        const glow = ctx.createRadialGradient(270, 92, 8, 270, 92, 62);
        glow.addColorStop(0, 'rgba(255, 133, 166, 0.24)');
        glow.addColorStop(1, 'rgba(255, 133, 166, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(206, 28, 128, 128);
        ctx.globalAlpha = pulse;
        drawPixelHeart(269, 121, 1, '#ff9eb5');
        ctx.globalAlpha = 1;
    }
}

function drawLamp() {
    const glow = ctx.createRadialGradient(121, 123, 2, 121, 123, 30);
    glow.addColorStop(0, 'rgba(255, 217, 138, 0.35)');
    glow.addColorStop(1, 'rgba(255, 217, 138, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(88, 90, 66, 66);

    px(120, 124, 2, 27, '#241531');
    px(118, 150, 6, 2, '#241531');
    px(114, 118, 14, 3, '#2b1a3a');
    px(116, 121, 10, 7, '#2b1a3a');
    px(118, 122, 6, 5, '#ffd98a');
    px(119, 123, 2, 2, '#fff3c4');
}

function drawBench() {
    px(146, 147, 32, 3, '#8a5a4a');
    px(148, 150, 28, 3, '#a06a52');
    px(148, 153, 2, 6, '#3a2233');
    px(174, 153, 2, 6, '#3a2233');
    px(146, 145, 1, 2, '#3a2233');
    px(177, 145, 1, 2, '#3a2233');
    px(149, 150, 10, 1, '#b97e61');
    px(146, 147, 12, 1, '#9a6752');
}

// кот сидит рядом и ждёт, когда ты его погладишь
function drawCat(t) {
    const cx = CAT.x;
    const groundY = CAT.y;
    const bob = Math.sin(t * 2.2) > 0 ? 0 : 1;
    const y = groundY + bob;
    const blink = t % 3.8 < 0.14;
    const wag = Math.round(Math.sin(t * 3));

    ctx.globalAlpha = 0.25;
    px(cx - 6, groundY, 12, 2, '#140b20');
    ctx.globalAlpha = 1;

    // пушистый хвостик
    px(cx + 4, y - 4, 2, 4, '#b56a35');
    px(cx + 6 + wag, y - 7, 2, 3, '#b56a35');
    px(cx + 7 + wag, y - 9, 1, 2, '#e0a05c');

    // тело и лапки
    px(cx - 4, y - 6, 8, 4, '#c97a42');
    px(cx - 5, y - 3, 10, 3, '#c97a42');
    px(cx - 5, y - 1, 10, 1, '#a35f30');
    px(cx - 2, y - 5, 4, 3, '#ffe3c2');
    px(cx - 4, y - 1, 2, 1, '#e0a05c');
    px(cx + 2, y - 1, 2, 1, '#e0a05c');
    px(cx - 4, y - 4, 1, 1, '#a35f30');
    px(cx + 3, y - 4, 1, 1, '#a35f30');
    px(cx - 4, y - 2, 1, 1, '#a35f30');
    px(cx + 3, y - 2, 1, 1, '#a35f30');

    // ушки
    px(cx - 4, y - 13, 2, 2, '#c97a42');
    px(cx + 2, y - 13, 2, 2, '#c97a42');
    px(cx - 3, y - 12, 1, 1, '#ff9eb5');
    px(cx + 2, y - 12, 1, 1, '#ff9eb5');

    // голова
    px(cx - 4, y - 11, 8, 6, '#c97a42');
    px(cx - 1, y - 11, 2, 1, '#a35f30');
    px(cx - 3, y - 10, 1, 1, '#a35f30');
    px(cx + 2, y - 10, 1, 1, '#a35f30');

    // мордочка и носик
    px(cx - 2, y - 7, 4, 2, '#ffe3c2');
    px(cx, y - 7, 1, 1, '#ff9eb5');

    // глазки (иногда моргают)
    if (blink) {
        px(cx - 2, y - 8, 1, 1, '#2a1838');
        px(cx + 1, y - 8, 1, 1, '#2a1838');
    } else {
        px(cx - 2, y - 9, 1, 2, '#2a1838');
        px(cx + 1, y - 9, 1, 2, '#2a1838');
    }

    // усики
    px(cx - 6, y - 8, 2, 1, '#e0a05c');
    px(cx + 4, y - 8, 2, 1, '#e0a05c');
}

function drawDecor() {
    for (const t of TUFTS) {
        px(t.x, t.y, 1, t.h, t.color);
        px(t.x + 1, t.y + 1, 1, Math.max(1, t.h - 1), t.color);
    }
    for (const f of FLOWERS) {
        px(f.x, f.y, 1, 2, '#4d3a63');
        px(f.x, f.y - 1, 1, 1, f.color);
        if ((f.x + f.y) % 2 === 0) px(f.x + 1, f.y - 1, 1, 1, '#ffe9cf');
    }
}

function drawSmoke() {
    for (const s of state.smoke) {
        ctx.globalAlpha = Math.min(1, s.life / s.max) * 0.5;
        px(s.x, s.y, s.size, s.size, '#b48aa0');
    }
    ctx.globalAlpha = 1;
}

// светлячки — маленькие «люблю», разбросанные по городку
function drawFireflies(t) {
    for (const f of FIREFLIES) {
        const fx = f.x + Math.sin(t * f.speed + f.phase) * f.r;
        const fy = f.y + Math.cos(t * f.speed * 0.7 + f.phase) * (f.r * 0.5);
        const a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 2 + f.phase));

        ctx.globalAlpha = a * 0.18;
        px(fx - 2, fy - 2, 5, 5, '#ffd98a');
        ctx.globalAlpha = a;
        px(fx, fy, 1, 1, '#fff1c9');
    }
    ctx.globalAlpha = 1;
}

// пять сердечек — пять причин, почему я тебя люблю
function drawHearts(t) {
    for (const h of state.hearts) {
        if (h.collected) continue;

        const x = h.x;
        const y = h.y + Math.sin(t * 2.2 + h.phase) * 1.5;

        const glow = ctx.createRadialGradient(x + 3, y + 2, 1, x + 3, y + 2, 14);
        glow.addColorStop(0, 'rgba(255, 133, 166, 0.4)');
        glow.addColorStop(1, 'rgba(255, 133, 166, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(x - 12, y - 12, 30, 30);

        drawPixelHeart(x, y, 1, '#ff85a6');
        px(x + 1, y + 1, 1, 1, '#ffd9e2');

        ctx.globalAlpha = 0.5 + 0.5 * Math.sin(t * 3 + h.phase);
        px(x - 3, y - 3, 1, 1, '#ffe9cf');
        px(x + 7, y + 4, 1, 1, '#ffe9cf');
        ctx.globalAlpha = 1;
    }
}

// самая красивая девочка на свете — это ты, Шырайлым
function drawPlayer() {
    const p = state.player;
    const bob = p.moving ? Math.floor(p.walk * 7) % 2 : 0;
    const x = Math.round(p.x);
    const y = Math.round(p.y) + bob;

    ctx.globalAlpha = 0.28;
    px(x - 6, y - 1, 12, 2, '#140b20');
    ctx.globalAlpha = 1;

    ctx.save();
    ctx.translate(x, y);
    if (p.dir < 0) ctx.scale(-1, 1);

    const step = p.moving ? Math.floor(p.walk * 7) % 2 : 0;

    px(-3, -4, 2, 3, '#f4c6a8');
    px(1, -4 + step, 2, 3, '#f4c6a8');
    px(-4, -1, 3, 1, '#55304a');
    px(1, -1 + step, 3, 1, '#55304a');

    px(-4, -10, 8, 6, '#ff85a6');
    px(-4, -10, 2, 6, '#ffa5bd');
    px(2, -10, 2, 6, '#e5678d');
    px(-3, -11, 6, 1, '#fff0dc');

    px(-5, -9, 2, 4, '#ffd2b0');
    px(3, -9, 2, 4, '#ffd2b0');
    px(-5, -10, 2, 1, '#ff85a6');
    px(3, -10, 2, 1, '#ff85a6');

    px(-4, -17, 8, 8, '#3a2435');
    px(-3, -15, 6, 5, '#ffd6b8');
    px(-4, -17, 8, 2, '#3a2435');
    px(-4, -15, 1, 4, '#3a2435');
    px(3, -15, 1, 4, '#3a2435');

    px(-2, -13, 1, 1, '#32213a');
    px(1, -13, 1, 1, '#32213a');
    px(-3, -12, 1, 1, '#ff9eb0');
    px(2, -12, 1, 1, '#ff9eb0');

    px(2, -18, 4, 2, '#ffd166');
    px(3, -19, 2, 1, '#ffd166');

    ctx.restore();
}

function drawParticles() {
    for (const p of state.particles) {
        ctx.globalAlpha = Math.max(0, p.life / p.max);
        px(p.x, p.y, p.size, p.size, p.color);
    }
    ctx.globalAlpha = 1;
}

// подойди к дереву, там я скажу тебе самое главное
function drawTreePrompt(t) {
    if (state.heartsCollected < CONFIG.notes.length || state.finished) return;

    const pulse = 0.5 + 0.5 * Math.sin(t * 3.5);
    const y = 50 + Math.sin(t * 2) * 3;
    const glow = ctx.createRadialGradient(272, y + 6, 2, 272, y + 6, 24);
    glow.addColorStop(0, `rgba(255, 133, 166, ${0.3 + pulse * 0.25})`);
    glow.addColorStop(1, 'rgba(255, 133, 166, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(244, y - 18, 56, 56);

    drawPixelHeart(261, y, 2, '#ff85a6');
    px(265, y + 2, 2, 2, '#ffe9cf');
}

function drawCatPrompt(t) {
    if (!state.nearCat) return;

    const pulse = 0.5 + 0.5 * Math.sin(t * 3.5);
    const y = 143 + Math.sin(t * 2) * 2;
    const glow = ctx.createRadialGradient(CAT.x, y + 8, 2, CAT.x, y + 8, 20);
    glow.addColorStop(0, `rgba(255, 158, 181, ${0.28 + pulse * 0.22})`);
    glow.addColorStop(1, 'rgba(255, 158, 181, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(CAT.x - 22, y - 12, 44, 44);

    drawPixelHeart(CAT.x - 3, y, 1, '#ff9eb5');
}

function drawScene(t) {
    drawSky(t);
    drawGround();
    drawHills();

    for (const house of HOUSES) drawHouse(house);

    drawTree(t);
    drawLamp();
    drawBench();
    drawCat(t);
    drawDecor();
    drawSmoke();
    drawFireflies(t);
    drawHearts(t);
    drawPlayer();
    drawParticles();
    drawTreePrompt(t);
    drawCatPrompt(t);
}

/* ------------------------------------------------------------
   МЕЛОДИЯ О ТЕБЕ
   Маленькая мелодия, которую я слышу, когда думаю о тебе.
   ------------------------------------------------------------ */

let audioCtx = null;
let masterGain = null;
let musicTimer = null;
let musicStep = 0;

// музыка для тебя
function initAudio() {
    if (audioCtx) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    audioCtx = new Ctx();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.45;
    masterGain.connect(audioCtx.destination);
}

function tone(freq, duration, type = 'triangle', volume = 0.09, delay = 0) {
    if (!audioCtx || !state.soundOn) return;
    const start = audioCtx.currentTime + delay;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.linearRampToValueAtTime(volume, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(start);
    osc.stop(start + duration + 0.05);
}

const MELODY = [
    523.25, 659.25, 783.99, 659.25,
    587.33, 698.46, 880.00, 698.46,
    523.25, 659.25, 783.99, 1046.50,
    880.00, 783.99, 659.25, 0,
];
const BASS = [130.81, 110.00, 87.31, 98.00];

// мелодия, которую слышу, когда думаю о тебе
function musicTick() {
    if (!state.soundOn) return;
    const note = MELODY[musicStep % MELODY.length];
    if (note) tone(note, 0.55, 'triangle', 0.05);
    if (musicStep % 8 === 0) {
        tone(BASS[Math.floor(musicStep / 8) % BASS.length], 1.2, 'sine', 0.07);
    }
    musicStep += 1;
}

function startMusic() {
    if (musicTimer || !audioCtx || !state.soundOn) return;
    musicTick();
    musicTimer = setInterval(musicTick, 500);
}

function stopMusic() {
    clearInterval(musicTimer);
    musicTimer = null;
}

function sfxStart() {
    tone(523.25, 0.12, 'square', 0.1);
    tone(659.25, 0.12, 'square', 0.1, 0.1);
    tone(783.99, 0.22, 'square', 0.1, 0.2);
}

function sfxCollect() {
    tone(880.00, 0.08, 'square', 0.12);
    tone(1174.66, 0.16, 'square', 0.1, 0.07);
}

function sfxCat() {
    tone(659.25, 0.09, 'triangle', 0.09);
    tone(987.77, 0.16, 'triangle', 0.08, 0.09);
}

function sfxLetter() {
    [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, i) => {
        tone(freq, 0.4, 'triangle', 0.09, i * 0.12);
    });
}

soundBtn.addEventListener('click', () => {
    state.soundOn = !state.soundOn;
    soundBtn.classList.toggle('is-off', !state.soundOn);
    soundBtn.setAttribute('aria-pressed', String(state.soundOn));
    soundBtn.setAttribute('aria-label', state.soundOn ? 'Выключить звук' : 'Включить звук');

    if (state.soundOn) {
        initAudio();
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
        startMusic();
    } else {
        stopMusic();
    }
});

/* ------------------------------------------------------------
   СЕРДЕЧКИ И МОИ СЛОВА
   Каждое сердечко — это «люблю».
   ------------------------------------------------------------ */

// каждое собранное сердечко — моя маленькая победа
function updatePips() {
    pipEls.forEach((el, i) => {
        el.classList.toggle('is-filled', i < state.heartsCollected);
    });
}

function updateHint() {
    if (!state.started) return;
    const total = CONFIG.notes.length;

    if (state.nearCat) {
        hint.textContent = isTouch ? 'Нажми ♥ — погладь котика' : 'Нажми E — погладь котика 🐾';
    } else if (state.heartsCollected === 0) {
        hint.textContent = isTouch
            ? 'Иди по городку и собирай сердечки ♥'
            : 'Стрелки или WASD — идти · ищи сердечки';
    } else if (state.heartsCollected < total) {
        hint.textContent = `Сердечки: ${state.heartsCollected} / ${total}`;
    } else if (state.nearTree) {
        hint.textContent = isTouch ? 'Нажми ♥ — открой письмо' : 'Нажми E — открой письмо ♥';
    } else {
        hint.textContent = 'Все сердечки собраны! Подойди к дереву';
    }
}

function clearKeys() {
    state.keys.up = false;
    state.keys.down = false;
    state.keys.left = false;
    state.keys.right = false;
    document.querySelectorAll('.dpad__btn').forEach((b) => b.classList.remove('is-pressed'));
}

function spawnParticles(x, y, count) {
    const colors = ['#ff85a6', '#ffd166', '#fff0dc', '#ff9eb5'];
    for (let i = 0; i < count; i++) {
        const life = 0.7 + Math.random() * 0.6;
        state.particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 55,
            vy: -12 - Math.random() * 42,
            life,
            max: life,
            size: Math.random() < 0.3 ? 2 : 1,
            color: colors[Math.floor(Math.random() * colors.length)],
        });
    }
}

// ещё одно «люблю» нашло тебя
function collectHeart(heart) {
    heart.collected = true;
    state.heartsCollected += 1;
    state.noteOpen = true;
    clearKeys();
    spawnParticles(heart.x + 3, heart.y + 2, 18);
    updatePips();
    sfxCollect();

    setTimeout(() => {
        if (state.noteOpen) showNote(heart);
    }, 300);
}

function showNote(heart) {
    noteTitle.textContent = `сердечко ${state.heartsCollected} / ${CONFIG.notes.length}`;
    noteText.textContent = CONFIG.notes[heart.note] || '…';
    noteEl.classList.add('is-open');
    noteEl.setAttribute('aria-hidden', 'false');
    noteBtn.focus({ preventScroll: true });
}

// и ещё одно тёплое слово остаётся с тобой
function closeNote() {
    state.noteOpen = false;
    noteBtn.blur();
    noteEl.classList.remove('is-open');
    noteEl.setAttribute('aria-hidden', 'true');
    clearKeys();
    updateHint();
}

noteBtn.addEventListener('click', closeNote);

function openCatNote() {
    state.catOpen = true;
    clearKeys();
    catText.textContent = CONFIG.catNote;
    catSign.textContent = `— ${CONFIG.signature}`;

    if (CONFIG.catGif) {
        catGif.src = CONFIG.catGif;
        catGifWrap.hidden = false;
    } else {
        catGif.removeAttribute('src');
        catGifWrap.hidden = true;
    }

    catNoteEl.classList.add('is-open');
    catNoteEl.setAttribute('aria-hidden', 'false');
    catBtn.focus({ preventScroll: true });
    sfxCat();
}

function closeCatNote() {
    state.catOpen = false;
    catBtn.blur();
    catNoteEl.classList.remove('is-open');
    catNoteEl.setAttribute('aria-hidden', 'true');
    clearKeys();
    updateHint();
}

catBtn.addEventListener('click', closeCatNote);

catGif.addEventListener('error', () => {
    catGifWrap.hidden = true;
});

function checkHearts() {
    for (const heart of state.hearts) {
        if (heart.collected) continue;
        const dx = heart.x + 3 - state.player.x;
        const dy = heart.y + 2 - (state.player.y - 8);
        if (dx * dx + dy * dy < 14 * 14) {
            collectHeart(heart);
            return;
        }
    }
}

/* ------------------------------------------------------------
   ПИСЬМО ДЛЯ ШЫРАЙЛЫМ
   Самое главное я оставил на конец.
   ------------------------------------------------------------ */

const LETTER_FULL = CONFIG.letter.join('\n\n');
let typeTimer = null;

// пусть сердечки падают, как я в тебя
function spawnHeartRain() {
    if (heartRain.childElementCount > 0) return;
    const colors = ['#ff85a6', '#ffd166', '#ffb3c7', '#ffe9cf'];

    for (let i = 0; i < 34; i++) {
        const el = document.createElement('span');
        const size = 8 + Math.random() * 14;
        el.className = 'rain-heart';
        el.style.left = `${Math.random() * 100}%`;
        el.style.width = `${size}px`;
        el.style.height = `${size * 6 / 7}px`;
        el.style.color = colors[i % colors.length];
        el.style.animationDuration = `${5 + Math.random() * 6}s`;
        el.style.animationDelay = `${Math.random() * 5}s`;
        el.style.setProperty('--drift', `${-30 + Math.random() * 60}px`);
        el.style.setProperty('--spin', `${-40 + Math.random() * 80}deg`);
        heartRain.appendChild(el);
    }
}

// печатаю медленно, чтобы ты почувствовала каждое слово
function typeLetter() {
    clearInterval(typeTimer);
    letterCard.scrollTop = 0;
    letterText.textContent = '';
    letterSign.classList.remove('is-visible');
    restartBtn.hidden = true;
    letterSkip.classList.remove('is-hidden');

    let i = 0;
    typeTimer = setInterval(() => {
        i += 1;
        letterText.textContent = LETTER_FULL.slice(0, i);
        if (i >= LETTER_FULL.length) finishTyping();
    }, 24);
}

function finishTyping() {
    clearInterval(typeTimer);
    typeTimer = null;
    letterText.textContent = LETTER_FULL;
    letterSign.classList.add('is-visible');
    restartBtn.hidden = false;
    letterSkip.classList.add('is-hidden');
}

// самое главное письмо
function openLetter() {
    if (state.letterOpen) return;
    state.letterOpen = true;
    state.finished = true;
    clearKeys();

    gameEl.classList.add('is-final');
    letterScreen.classList.add('is-open');
    letterScreen.setAttribute('aria-hidden', 'false');

    spawnHeartRain();
    sfxLetter();
    typeLetter();
}

letterCard.addEventListener('click', (e) => {
    if (e.target.closest('button')) return;
    if (typeTimer) finishTyping();
});

restartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    resetGame();
});

function resetGame() {
    clearInterval(typeTimer);
    typeTimer = null;
    restartBtn.blur();

    state.hearts = makeHearts();
    state.heartsCollected = 0;
    state.particles.length = 0;
    state.noteOpen = false;
    state.catOpen = false;
    state.letterOpen = false;
    state.finished = false;
    state.nearTree = false;
    state.nearCat = false;
    state.player = { x: 152, y: 166, dir: 1, moving: false, walk: 0 };
    clearKeys();

    gameEl.classList.remove('is-final');
    letterScreen.classList.remove('is-open');
    letterScreen.setAttribute('aria-hidden', 'true');
    noteEl.classList.remove('is-open');
    noteEl.setAttribute('aria-hidden', 'true');
    catNoteEl.classList.remove('is-open');
    catNoteEl.setAttribute('aria-hidden', 'true');
    heartRain.innerHTML = '';
    letterText.textContent = '';
    letterCard.scrollTop = 0;
    letterSign.classList.remove('is-visible');
    restartBtn.hidden = true;
    actionBtn.classList.remove('is-ready');

    updatePips();
    updateHint();
}

/* ------------------------------------------------------------
   КАК ХОДИТЬ ПО НАШЕМУ ГОРОДКУ
   Стрелки, WASD или кнопки на телефоне.
   ------------------------------------------------------------ */

const KEY_MAP = {
    ArrowUp: 'up',
    KeyW: 'up',
    ArrowDown: 'down',
    KeyS: 'down',
    ArrowLeft: 'left',
    KeyA: 'left',
    ArrowRight: 'right',
    KeyD: 'right',
};

function tryAction() {
    if (!state.started || state.noteOpen || state.catOpen || state.letterOpen) return;
    if (state.nearCat) {
        openCatNote();
        return;
    }
    if (state.nearTree && state.heartsCollected >= CONFIG.notes.length) {
        openLetter();
    }
}

window.addEventListener('keydown', (e) => {
    const dir = KEY_MAP[e.code];
    if (dir) {
        state.keys[dir] = true;
        e.preventDefault();
    }

    if (e.code === 'KeyE' || e.code === 'Enter' || e.code === 'Space') {
        if (e.code === 'Space') e.preventDefault();
        if (!e.repeat) tryAction();
    }

    if (e.code === 'Escape') {
        if (state.noteOpen) closeNote();
        else if (state.catOpen) closeCatNote();
    }
});

window.addEventListener('keyup', (e) => {
    const dir = KEY_MAP[e.code];
    if (dir) {
        state.keys[dir] = false;
        e.preventDefault();
    }
});

window.addEventListener('blur', clearKeys);

document.querySelectorAll('.dpad__btn').forEach((btn) => {
    const dir = btn.dataset.key;

    const press = (e) => {
        e.preventDefault();
        state.keys[dir] = true;
        btn.classList.add('is-pressed');
    };
    const release = (e) => {
        e.preventDefault();
        state.keys[dir] = false;
        btn.classList.remove('is-pressed');
    };

    btn.addEventListener('pointerdown', press);
    btn.addEventListener('pointerup', release);
    btn.addEventListener('pointercancel', release);
    btn.addEventListener('pointerleave', release);
    btn.addEventListener('contextmenu', (e) => e.preventDefault());
});

actionBtn.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    tryAction();
});

/* ------------------------------------------------------------
   НАЧИНАЕМ НАШЕ МАЛЕНЬКОЕ ПРИКЛЮЧЕНИЕ
   Ты — моё самое любимое приключение.
   ------------------------------------------------------------ */

startBtn.addEventListener('click', () => {
    initAudio();
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();

    state.started = true;
    gameEl.classList.add('is-started');
    startBtn.blur();
    startScreen.classList.remove('is-open');
    startScreen.setAttribute('aria-hidden', 'true');

    sfxStart();
    startMusic();
    updateHint();
});

function update(dt) {
    const canMove = state.started && !state.noteOpen && !state.catOpen && !state.letterOpen;
    let dx = 0;
    let dy = 0;

    if (canMove) {
        dx = (state.keys.right ? 1 : 0) - (state.keys.left ? 1 : 0);
        dy = (state.keys.down ? 1 : 0) - (state.keys.up ? 1 : 0);
    }

    const p = state.player;
    if (dx || dy) {
        const len = Math.hypot(dx, dy);
        const speed = 46;
        p.x += (dx / len) * speed * dt;
        p.y += (dy / len) * speed * dt;
        p.x = Math.max(WALK.minX, Math.min(WALK.maxX, p.x));
        p.y = Math.max(WALK.minY, Math.min(WALK.maxY, p.y));
        if (dx !== 0) p.dir = dx < 0 ? -1 : 1;
        p.moving = true;
        p.walk += dt;
    } else {
        p.moving = false;
    }

    if (canMove) checkHearts();

    const all = state.heartsCollected >= CONFIG.notes.length;
    // у дерева тебя ждёт самое главное
const near = all && Math.hypot(p.x - TREE.x, p.y - TREE.y) < 28;
    if (near !== state.nearTree) {
        state.nearTree = near;
        updateHint();
    }

    const catNear = Math.hypot(p.x - CAT.x, p.y - CAT.y) < 26;
    if (catNear !== state.nearCat) {
        state.nearCat = catNear;
        updateHint();
    }

    actionBtn.classList.toggle('is-ready', all || state.nearCat);

    // дым из труб — уют, как дома
state.smokeTimer -= dt;
    if (state.smokeTimer <= 0) {
        state.smokeTimer = 0.6;
        const spot = SMOKE_SPOTS[state.smokeIndex % SMOKE_SPOTS.length];
        state.smokeIndex += 1;
        state.smoke.push({
            x: spot.x,
            y: spot.y,
            vx: 2 + Math.random() * 2,
            vy: -4 - Math.random() * 3,
            life: 3.2,
            max: 3.2,
            size: Math.random() < 0.5 ? 1 : 2,
        });
    }
    for (const s of state.smoke) {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.life -= dt;
    }
    for (let i = state.smoke.length - 1; i >= 0; i--) {
        if (state.smoke[i].life <= 0) state.smoke.splice(i, 1);
    }

    for (const part of state.particles) {
        part.x += part.vx * dt;
        part.y += part.vy * dt;
        part.vy += 70 * dt;
        part.vx *= 0.985;
        part.life -= dt;
    }
    for (let i = state.particles.length - 1; i >= 0; i--) {
        if (state.particles[i].life <= 0) state.particles.splice(i, 1);
    }
}

let lastTime = 0;
// наш мир живёт, пока ты рядом
function frame(now) {
    if (!lastTime) lastTime = now;
    let dt = (now - lastTime) / 1000;
    lastTime = now;
    if (dt > 0.05) dt = 0.05;

    state.time += dt;
    update(dt);
    drawScene(state.time);

    requestAnimationFrame(frame);
}

updatePips();
if (isTouch) hint.textContent = 'Иди по городку и собирай сердечки ♥';
requestAnimationFrame(frame);

/* ------------------------------------------------------------
   Шырайлым, ты дочитала до самого конца.
   Знай: ты самая лучшая, самая лучезарная и самая любимая.
   Шырайкам алтыным менин. Твой Абоська 💕
   ------------------------------------------------------------ */
