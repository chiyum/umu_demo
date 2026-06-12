/**
 * daheng-night（a16 大亨夜空樂園）共用資料 + inline SVG 場景產生器
 *
 * 來源設計稿：大亨_AWD_版型D_紫色手遊_單檔版.html（AWD 完整響應式，JS 驅動）
 *   - daheng_d_app.js：CATS / GAMES / promo slides / winners 名單 / canvas 星空
 *   - daheng_d_scenes.js：D_SCENES 各遊戲卡 inline SVG 場景產生器 + 促銷 deco SVG + D_ICONS
 *
 * 為什麼集中一處：desktop / mobile 兩版忠實拆自同一份單檔原稿，共用同一批
 * 遊戲卡 / 分類 / 促銷 / 中獎 / nav / footer 資料與 SVG 字串，抽出後避免兩個 SFC 各寫一遍。
 *
 * 為什麼遊戲卡 / 裝飾全是 inline SVG 字串（無 PNG）：
 *   原稿就以純 SVG 形狀（圓 / 圓角矩形 / 多邊形 / 文字）組出每張遊戲卡場景與促銷裝飾，
 *   沒有任何點陣圖。這裡把產生器 TS 化為純函式回傳 SVG 字串，Vue 端用 v-html 注入
 *  （demo 內建靜態內容、無使用者輸入、無 XSS 風險）。
 *
 * 動畫差異說明：原稿用 gsap 對 SVG 子元素做微動畫（球彈跳 / 轉輪 / 魚游 / 轉盤旋轉…），
 *   本 repo 未安裝 gsap，改在 SFC 用 CSS keyframes 近似（class 名沿用原稿 .ball / .reel /
 *   .wheelG / .fishy1 等，方便 CSS 對位）。優先確保靜態視覺 1:1。
 */

/* ============================================================
 * SVG 基礎工具（對齊 daheng_d_scenes.js 的 wrap / lg / coin / star4）
 * ============================================================ */

/** 包成完整 svg（slice 鋪滿卡片，與原稿一致） */
function wrap(inner: string, vb: string): string {
  return `<svg viewBox="${vb}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

/** 縱向線性漸層 def（可旋轉） */
function lg(id: string, c1: string, c2: string, rot = 0): string {
  return (
    `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1" gradientTransform="rotate(${rot} .5 .5)">` +
    `<stop offset="0" stop-color="${c1}"></stop><stop offset="1" stop-color="${c2}"></stop></linearGradient>`
  );
}

/** 金幣（$ 圓幣，可帶 class 供動畫對位） */
function coin(cx: number, cy: number, r: number, cls = ""): string {
  return (
    `<g class="${cls}">` +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f2c233" stroke="#a06c00" stroke-width="${r * 0.12}"></circle>` +
    `<circle cx="${cx - r * 0.3}" cy="${cy - r * 0.35}" r="${r * 0.28}" fill="#fff3c0" opacity=".8"></circle>` +
    `<text x="${cx}" y="${cy + r * 0.42}" text-anchor="middle" font-size="${r * 1.15}" font-weight="800" fill="#8a5300">$</text>` +
    `</g>`
  );
}

/** 四芒星（閃爍裝飾，可帶 class 供動畫對位） */
function star4(
  cx: number,
  cy: number,
  s: number,
  cls = "",
  fill = "#fff"
): string {
  return (
    `<g class="${cls}" transform="translate(${cx} ${cy})">` +
    `<rect x="${-s * 0.1}" y="${-s}" width="${s * 0.2}" height="${s * 2}" rx="${s * 0.1}" fill="${fill}"></rect>` +
    `<rect x="${-s}" y="${-s * 0.1}" width="${s * 2}" height="${s * 0.2}" rx="${s * 0.1}" fill="${fill}"></rect>` +
    `</g>`
  );
}

/* ============================================================
 * 遊戲卡 inline SVG 場景產生器（對齊 daheng_d_scenes.js 的 SCENES）
 * 每個函式收 prefix（避免同頁多卡 gradient id 衝突）+ tall（featured 大卡用直式）
 * ============================================================ */

/** 超級彈力球（featured）：彈跳球場景；tall 時用直式 viewBox 適配大卡 */
function sceneBounce(p: string, tall = false): string {
  const H = tall ? 430 : 230;
  const balls = tall
    ? [
        { x: 60, y: 110, r: 30, c1: "#ff9d7a", c2: "#e0492c" },
        { x: 140, y: 70, r: 18, c1: "#7ad0ff", c2: "#2670d8" },
        { x: 130, y: 200, r: 24, c1: "#ffe9a0", c2: "#e8a410" },
        { x: 52, y: 250, r: 14, c1: "#a0ffc8", c2: "#1da860" },
        { x: 100, y: 330, r: 22, c1: "#d8a0ff", c2: "#8a2fc9" },
        { x: 160, y: 300, r: 12, c1: "#ff9d7a", c2: "#e0492c" }
      ]
    : [
        { x: 55, y: 95, r: 26, c1: "#ff9d7a", c2: "#e0492c" },
        { x: 118, y: 80, r: 18, c1: "#7ad0ff", c2: "#2670d8" },
        { x: 158, y: 108, r: 13, c1: "#ffe9a0", c2: "#e8a410" },
        { x: 90, y: 120, r: 10, c1: "#a0ffc8", c2: "#1da860" }
      ];
  let s = `<defs>${lg(p + "bg", "#5b35b0", "#2a1364")}</defs>`;
  s += `<rect width="200" height="${H}" fill="url(#${p}bg)"></rect>`;
  s +=
    star4(30, 36, 7, "tw1") +
    star4(170, 30, 5, "tw2") +
    star4(146, 62, 4, "tw1");
  if (tall) {
    s +=
      star4(36, 180, 5, "tw2") +
      star4(168, 170, 6, "tw1") +
      star4(40, 320, 4, "tw1") +
      star4(172, 366, 5, "tw2");
  }
  s += `<ellipse cx="100" cy="${H - 34}" rx="86" ry="12" fill="rgba(0,0,0,.35)"></ellipse>`;
  balls.forEach((b, i) => {
    s +=
      `<g class="ball ball${i}">` +
      `<circle cx="${b.x}" cy="${b.y}" r="${b.r}" fill="${b.c2}"></circle>` +
      `<circle cx="${b.x}" cy="${b.y}" r="${b.r * 0.86}" fill="${b.c1}" opacity=".55"></circle>` +
      `<circle cx="${b.x - b.r * 0.32}" cy="${b.y - b.r * 0.38}" r="${b.r * 0.3}" fill="#fff" opacity=".75"></circle>` +
      `</g>`;
  });
  return wrap(s, `0 0 200 ${H}`);
}

/** 老虎機：三轉輪 */
function sceneSlot(p: string): string {
  const syms = ["7", "★", "◆", "$", "7", "★"];
  let s =
    `<defs>${lg(p + "bg", "#46248f", "#241055")}${lg(p + "mc", "#8a5cf0", "#5b35b0")}` +
    `<clipPath id="${p}cl"><rect x="38" y="64" width="124" height="58" rx="8"></rect></clipPath></defs>`;
  s += `<rect width="200" height="190" fill="url(#${p}bg)"></rect>`;
  s += star4(26, 30, 5, "tw1") + star4(176, 40, 6, "tw2");
  s += `<rect x="26" y="36" width="148" height="118" rx="16" fill="url(#${p}mc)" stroke="#c9aaff" stroke-width="3"></rect>`;
  s += `<rect x="38" y="64" width="124" height="58" rx="8" fill="#fff7e8" stroke="#a06c00" stroke-width="2.5"></rect>`;
  s += `<g clip-path="url(#${p}cl)">`;
  for (let r = 0; r < 3; r++) {
    const x = 59 + r * 41;
    s += `<g class="reel reel${r}">`;
    for (let k = 0; k < 6; k++) {
      const col = ["#e0492c", "#2670d8", "#1da860", "#e8a410"][k % 4];
      s += `<text x="${x}" y="${102 + k * 40}" text-anchor="middle" font-size="30" font-weight="800" fill="${col}">${syms[k]}</text>`;
    }
    s += `</g>`;
    if (r < 2)
      s += `<rect x="${x + 20}" y="64" width="2" height="58" fill="rgba(160,108,0,.25)"></rect>`;
  }
  s += `</g>`;
  s += `<rect x="62" y="42" width="76" height="13" rx="6.5" fill="#241055"></rect>`;
  s += `<text x="100" y="52.5" text-anchor="middle" font-size="9" font-weight="800" fill="#ffd54a" letter-spacing="2">777</text>`;
  s += `<circle class="lever" cx="183" cy="80" r="9" fill="#ff5e5e" stroke="#fff" stroke-width="2"></circle>`;
  s +=
    coin(56, 170, 13, "c-bob1") +
    coin(100, 176, 15, "c-bob2") +
    coin(144, 170, 13, "c-bob3");
  return wrap(s, "0 0 200 190");
}

/** 魚機：游動的魚 + 泡泡 */
function sceneFish(p: string): string {
  function fishG(
    cls: string,
    scale: number,
    y: number,
    c1: string,
    c2: string,
    flip: boolean
  ): string {
    return (
      `<g class="${cls}" transform="translate(0 ${y})">` +
      `<g transform="scale(${flip ? -scale : scale} ${scale})" transform-origin="100 0">` +
      `<ellipse cx="100" cy="0" rx="34" ry="20" fill="${c1}"></ellipse>` +
      `<ellipse cx="100" cy="-4" rx="30" ry="13" fill="${c2}" opacity=".55"></ellipse>` +
      `<polygon points="130,0 152,-16 152,16" fill="${c1}"></polygon>` +
      `<polygon points="96,-16 110,-30 116,-14" fill="${c1}"></polygon>` +
      `<circle cx="80" cy="-4" r="4.5" fill="#fff"></circle>` +
      `<circle cx="79" cy="-4" r="2.2" fill="#1a0a3e"></circle>` +
      `</g></g>`
    );
  }
  let s = `<defs>${lg(p + "bg", "#1f5fb0", "#0c1e60")}</defs>`;
  s += `<rect width="200" height="190" fill="url(#${p}bg)"></rect>`;
  for (let i = 0; i < 6; i++) {
    s += `<circle class="bub bub${i}" cx="${20 + i * 32}" cy="${170 + (i % 3) * 12}" r="${3 + (i % 3) * 2}" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.5"></circle>`;
  }
  s += fishG("fishy1", 1, 70, "#ff8b4d", "#ffd2a0", false);
  s += fishG("fishy2", 0.55, 128, "#7ad0ff", "#d2efff", true);
  s += `<ellipse cx="100" cy="188" rx="100" ry="14" fill="rgba(0,0,0,.3)"></ellipse>`;
  s += `<ellipse cx="48" cy="184" rx="20" ry="6" fill="#2a8a5e"></ellipse>`;
  s += `<ellipse cx="150" cy="186" rx="26" ry="7" fill="#1f6e4a"></ellipse>`;
  return wrap(s, "0 0 200 190");
}

/** 棋牌：扇形撲克 + 籌碼 */
function scenePoker(p: string): string {
  function card(rot: number, suit: string, col: string): string {
    return (
      `<g class="cardx" transform="rotate(${rot} 100 150)">` +
      `<rect x="74" y="52" width="52" height="74" rx="8" fill="#fff" stroke="#c9b8e8" stroke-width="2"></rect>` +
      `<text x="84" y="74" font-size="16" font-weight="800" fill="${col}">${suit}</text>` +
      `<text x="100" y="100" text-anchor="middle" font-size="26" font-weight="800" fill="${col}">${suit}</text>` +
      `</g>`
    );
  }
  function chip(
    cx: number,
    cy: number,
    r: number,
    c: string,
    cls = ""
  ): string {
    return (
      `<g class="${cls}">` +
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}" stroke="#fff" stroke-width="2.5" stroke-dasharray="${r * 0.9} ${r * 0.55}"></circle>` +
      `<circle cx="${cx}" cy="${cy}" r="${r * 0.55}" fill="none" stroke="#fff" stroke-width="1.5" opacity=".7"></circle>` +
      `</g>`
    );
  }
  let s = `<defs>${lg(p + "bg", "#2f8a5e", "#0f3a26")}</defs>`;
  s += `<rect width="200" height="190" fill="url(#${p}bg)"></rect>`;
  s += star4(172, 32, 5, "tw1") + star4(28, 40, 4, "tw2");
  s +=
    card(-18, "♠", "#1a0a3e") +
    card(0, "♥", "#d8264a") +
    card(18, "♦", "#e8a410");
  s +=
    chip(48, 160, 15, "#d8264a", "chip1") +
    chip(80, 168, 13, "#2670d8", "chip2") +
    chip(152, 162, 16, "#e8a410", "chip3");
  return wrap(s, "0 0 200 190");
}

/** 賓果 / 消除：寶石陣 */
function sceneGems(p: string): string {
  function gem(
    cx: number,
    cy: number,
    sc: number,
    c1: string,
    c2: string,
    cls: string
  ): string {
    return (
      `<g class="${cls}" transform="translate(${cx} ${cy}) scale(${sc})">` +
      `<polygon points="0,-22 17,-8 11,18 -11,18 -17,-8" fill="${c1}" stroke="${c2}" stroke-width="2.5"></polygon>` +
      `<polygon points="0,-22 17,-8 0,-2 -17,-8" fill="#fff" opacity=".3"></polygon>` +
      `</g>`
    );
  }
  let s = `<defs>${lg(p + "bg", "#7a2f9e", "#33104e")}</defs>`;
  s += `<rect width="200" height="190" fill="url(#${p}bg)"></rect>`;
  s += gem(60, 78, 1.5, "#ff5e9d", "#ad1457", "gemx1");
  s += gem(132, 64, 1.05, "#7ad0ff", "#1f5fb0", "gemx2");
  s += gem(150, 130, 1.25, "#a0ffc8", "#1da860", "gemx3");
  s += gem(78, 142, 0.9, "#ffe9a0", "#c98a00", "gemx4");
  s +=
    star4(40, 40, 6, "spark1") +
    star4(165, 40, 4, "spark2") +
    star4(108, 108, 5, "spark3");
  return wrap(s, "0 0 200 190");
}

/** 幸運轉盤 */
function sceneWheel(p: string): string {
  const cols = [
    "#e0492c",
    "#ffd54a",
    "#2670d8",
    "#1da860",
    "#ff5e9d",
    "#7ad0ff",
    "#e8a410",
    "#8a5cf0"
  ];
  let s = `<defs>${lg(p + "bg", "#b0186e", "#4e0a33")}</defs>`;
  s += `<rect width="200" height="190" fill="url(#${p}bg)"></rect>`;
  s += star4(28, 34, 5, "tw1") + star4(174, 44, 6, "tw2");
  s += `<g class="wheelG" transform-origin="100 105">`;
  for (let i = 0; i < 8; i++) {
    const a0 = ((i * 45 - 90) * Math.PI) / 180;
    const a1 = (((i + 1) * 45 - 90) * Math.PI) / 180;
    const R = 62;
    const x0 = 100 + R * Math.cos(a0);
    const y0 = 105 + R * Math.sin(a0);
    const x1 = 100 + R * Math.cos(a1);
    const y1 = 105 + R * Math.sin(a1);
    s += `<path d="M100 105 L${x0.toFixed(1)} ${y0.toFixed(1)} A${R} ${R} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="${cols[i]}" stroke="#fff" stroke-width="2"></path>`;
  }
  s += `</g>`;
  s += `<circle cx="100" cy="105" r="70" fill="none" stroke="#ffd54a" stroke-width="5"></circle>`;
  for (let b = 0; b < 12; b++) {
    const ba = (b * 30 * Math.PI) / 180;
    s += `<circle class="wbulb" cx="${(100 + 70 * Math.cos(ba)).toFixed(1)}" cy="${(105 + 70 * Math.sin(ba)).toFixed(1)}" r="3.2" fill="#fff3c0"></circle>`;
  }
  s += `<circle cx="100" cy="105" r="13" fill="#fff" stroke="#a06c00" stroke-width="3"></circle>`;
  s += `<polygon points="100,22 92,40 108,40" fill="#fff" stroke="#a06c00" stroke-width="2"></polygon>`;
  return wrap(s, "0 0 200 190");
}

/** 糖果派對：棒棒糖 */
function sceneCandy(p: string): string {
  function lolly(
    cx: number,
    cy: number,
    sc: number,
    hue: number,
    cls: string
  ): string {
    let s2 = `<g class="${cls}" transform="translate(${cx} ${cy}) scale(${sc})" transform-origin="${cx} ${cy}">`;
    s2 += `<rect x="-4" y="20" width="8" height="52" rx="4" fill="#fff" stroke="#e8d8c0" stroke-width="1.5"></rect>`;
    const cs = [`oklch(0.72 0.18 ${hue})`, "#fff", `oklch(0.82 0.13 ${hue})`];
    for (let r = 26, k = 0; r > 4; r -= 7, k++) {
      s2 += `<circle cx="0" cy="0" r="${r}" fill="${cs[k % 3]}"></circle>`;
    }
    s2 += `</g>`;
    return s2;
  }
  let s = `<defs>${lg(p + "bg", "#d84f8e", "#6e1245")}</defs>`;
  s += `<rect width="200" height="190" fill="url(#${p}bg)"></rect>`;
  s +=
    star4(34, 38, 6, "tw1") +
    star4(170, 32, 5, "tw2") +
    star4(150, 100, 4, "tw1");
  s += lolly(66, 84, 1.15, 25, "lolly1");
  s += lolly(140, 102, 0.85, 230, "lolly2");
  s += `<ellipse cx="100" cy="182" rx="92" ry="12" fill="rgba(0,0,0,.3)"></ellipse>`;
  return wrap(s, "0 0 200 190");
}

/** 場景產生器簽名（prefix 用於避免同頁多卡 gradient id 衝突，tall 給 featured 大卡） */
export type SceneFn = (prefix: string, tall?: boolean) => string;

/** scene key → 產生器（對齊原稿 window.D_SCENES） */
export const SCENES: Record<string, SceneFn> = {
  bounce: sceneBounce,
  slot: sceneSlot,
  fish: sceneFish,
  poker: scenePoker,
  gems: sceneGems,
  wheel: sceneWheel,
  candy: sceneCandy
};

/* ============================================================
 * 促銷裝飾 SVG（對齊原稿 decoCoins / decoGift / decoCal）
 * ============================================================ */

/** 金幣堆（slide 1 返水） */
function decoCoins(): string {
  let s = "";
  const pts = [
    [40, 30, 15],
    [80, 70, 11],
    [30, 105, 9],
    [70, 128, 13],
    [50, 60, 7]
  ];
  pts.forEach((pt, i) => {
    s += coin(pt[0], pt[1], pt[2], "dc dc" + i);
  });
  return wrap(s, "0 0 110 152");
}

/** 禮物盒（slide 2 首儲） */
function decoGift(): string {
  let s = `<g class="giftG" transform-origin="55 90">`;
  s += `<rect x="22" y="70" width="66" height="56" rx="8" fill="#ffd54a" stroke="#a06c00" stroke-width="3"></rect>`;
  s += `<rect x="22" y="58" width="66" height="20" rx="6" fill="#fff3c0" stroke="#a06c00" stroke-width="3"></rect>`;
  s += `<rect x="49" y="58" width="12" height="68" fill="#e0492c"></rect>`;
  s += `<circle cx="55" cy="56" r="9" fill="#e0492c" stroke="#a83018" stroke-width="2"></circle>`;
  s += `</g>`;
  s += star4(90, 40, 6, "tw1") + star4(20, 40, 4, "tw2");
  return wrap(s, "0 0 110 152");
}

/** 月曆（slide 3 簽到） */
function decoCal(): string {
  let s = `<g class="calG" transform-origin="55 92">`;
  s += `<rect x="20" y="58" width="70" height="64" rx="10" fill="#fff" stroke="#c9b8e8" stroke-width="3"></rect>`;
  s += `<rect x="20" y="58" width="70" height="20" rx="10" fill="#7ad0ff"></rect>`;
  s += `<rect x="20" y="70" width="70" height="8" fill="#7ad0ff"></rect>`;
  s += `<text x="55" y="108" text-anchor="middle" font-size="28" font-weight="800" fill="#2670d8">7</text>`;
  s += `</g>`;
  s += star4(92, 44, 5, "tw1");
  return wrap(s, "0 0 110 152");
}

/** deco kind → SVG（對齊原稿 promo slide 的 data-deco） */
export const DECOS: Record<string, () => string> = {
  coins: decoCoins,
  gift: decoGift,
  cal: decoCal
};

/* ============================================================
 * 分類小圖示（對齊原稿 window.D_ICONS）
 * ============================================================ */

export const ICONS: Record<string, string> = {
  all: '<svg viewBox="0 0 30 30"><rect x="4" y="12" width="22" height="14" rx="3" fill="#e6dbff"></rect><polygon points="15,3 27,13 3,13" fill="#e6dbff"></polygon><rect x="12" y="18" width="6" height="8" rx="1.5" fill="#46248f"></rect></svg>',
  poker:
    '<svg viewBox="0 0 30 30"><circle cx="10" cy="13" r="6" fill="#e6dbff"></circle><circle cx="20" cy="13" r="6" fill="#e6dbff"></circle><polygon points="15,6 24,18 6,18" fill="#e6dbff"></polygon><rect x="13" y="18" width="4" height="8" rx="1.5" fill="#e6dbff"></rect></svg>',
  slot: '<svg viewBox="0 0 30 30"><rect x="3" y="6" width="24" height="18" rx="4" fill="#e6dbff"></rect><rect x="6.5" y="10" width="5" height="10" rx="1.5" fill="#46248f"></rect><rect x="12.5" y="10" width="5" height="10" rx="1.5" fill="#46248f"></rect><rect x="18.5" y="10" width="5" height="10" rx="1.5" fill="#46248f"></rect></svg>',
  fish: '<svg viewBox="0 0 30 30"><ellipse cx="13" cy="15" rx="9" ry="6" fill="#e6dbff"></ellipse><polygon points="21,15 28,9 28,21" fill="#e6dbff"></polygon><circle cx="8.5" cy="13.5" r="1.6" fill="#46248f"></circle></svg>',
  bingo:
    '<svg viewBox="0 0 30 30"><circle cx="15" cy="15" r="11" fill="#e6dbff"></circle><circle cx="15" cy="15" r="6.5" fill="#46248f"></circle><text x="15" y="18.6" text-anchor="middle" font-size="9" font-weight="800" fill="#e6dbff">25</text></svg>'
};

/* ============================================================
 * 結構資料（對齊原稿 CATS / GAMES + HUD / promo / winners / footer）
 * ============================================================ */

/** 遊戲分類（對齊原稿 CATS 5 項，預設 all 全部） */
export interface GameCat {
  id: string;
  label: string;
}
export const CATS: GameCat[] = [
  { id: "all", label: "全部" },
  { id: "poker", label: "棋牌" },
  { id: "slot", label: "老虎機" },
  { id: "fish", label: "魚機" },
  { id: "bingo", label: "賓果" }
];

/** 遊戲卡（對齊原稿 GAMES 7 張，scene / 名稱 / 分類 / feat / badge 全對齊） */
export interface GameCard {
  scene: string;
  name: string;
  en: string;
  cat: string;
  feat?: boolean;
  badge?: "hot" | "new";
}
export const GAMES: GameCard[] = [
  {
    scene: "bounce",
    name: "超級彈力球",
    en: "SUPER BOUNCE",
    cat: "slot",
    feat: true,
    badge: "hot"
  },
  {
    scene: "gems",
    name: "寶石消除",
    en: "GEM CRUSH",
    cat: "bingo",
    badge: "hot"
  },
  { scene: "slot", name: "富貴 777", en: "RICH SLOTS", cat: "slot" },
  {
    scene: "fish",
    name: "深海漁場",
    en: "DEEP FISHING",
    cat: "fish",
    badge: "new"
  },
  { scene: "poker", name: "金牌德州", en: "GOLD HOLDEM", cat: "poker" },
  { scene: "wheel", name: "幸運轉盤", en: "LUCKY WHEEL", cat: "bingo" },
  { scene: "candy", name: "糖果派對", en: "CANDY PARTY", cat: "slot" }
];

/** HUD 頂欄餘額 pill（對齊原稿：金幣大 pill + Lv / 寶石 小 pill） */
export interface BalancePill {
  kind: "coin" | "lv" | "gem";
  icon: string;
  value: string;
}
export const BALANCES: BalancePill[] = [
  { kind: "coin", icon: "$", value: "11,900,000" },
  { kind: "lv", icon: "★", value: "Lv 3" },
  { kind: "gem", icon: "◆", value: "1,000" }
];

/** HUD 桌機 nav（對齊原稿 5 項，大廳為 active） */
export interface HudNavItem {
  label: string;
  active?: boolean;
}
export const HUD_NAV: HudNavItem[] = [
  { label: "大廳", active: true },
  { label: "訊息" },
  { label: "禮物" },
  { label: "獎勵" },
  { label: "VIP" }
];

/** Jackpot 燈板（對齊原稿 GRAND JACKPOT 區塊） */
export const JACKPOT = {
  label: "GRAND JACKPOT",
  /** 起始值（原稿 36,184,920，SFC 用 RAF tween 跳動） */
  value: 36184920,
  hint: "每 15 分鐘開出・全平台累積"
};

/** 促銷輪播 slide（對齊原稿 3 slide：返水 / 首儲 / 簽到，含 deco SVG kind） */
export interface PromoSlide {
  variant: "s1" | "s2" | "s3";
  kicker: string;
  title: string;
  desc: string;
  deco: string;
}
export const PROMOS: PromoSlide[] = [
  {
    variant: "s1",
    kicker: "DAILY CASHBACK",
    title: "每日返水 25%",
    desc: "週一至週五皆可領取・自動入帳",
    deco: "coins"
  },
  {
    variant: "s2",
    kicker: "NEW MEMBER",
    title: "首儲 1000 送 1000",
    desc: "新會員限定・100% 加碼",
    deco: "gift"
  },
  {
    variant: "s3",
    kicker: "CHECK-IN",
    title: "連續簽到 7 天",
    desc: "天天領金幣，第 7 天送 777 寶石",
    deco: "cal"
  }
];

/**
 * 即時中獎跑馬（原稿用隨機 mock 生成 6 條，這裡固定一組靜態結果）
 *
 * 為什麼不照原稿 setInterval 隨機重排：
 * - demo 頁追求穩定截圖 / 復刻一致性，隨機跳動對 sales demo 無加分且增加 race / 記憶體負擔
 * - 取原稿 NAMES / GN 字面量組一組合理結果（名字遮罩 + 遊戲名 + 金額），對齊原稿視覺
 */
export interface WinnerRow {
  name: string;
  game: string;
  amount: number;
}
export const WINNERS: WinnerRow[] = [
  { name: "黃**", game: "超級彈力球", amount: 312000 },
  { name: "陳**", game: "寶石消除", amount: 188000 },
  { name: "林**", game: "深海漁場", amount: 96000 },
  { name: "張**", game: "金牌德州", amount: 254000 },
  { name: "王**", game: "幸運轉盤", amount: 73000 },
  { name: "吳**", game: "富貴 777", amount: 145000 }
];

/** footer 連結（對齊原稿 5 項） */
export const FOOTER_LINKS: string[] = [
  "關於我們",
  "儲值說明",
  "常見問題",
  "責任遊戲",
  "隱私條款"
];

/** footer 免責聲明（對齊原稿） */
export const FOOTER_FINE = "本平台僅提供休閒娛樂，遊戲虛擬幣不可兌換現金。";

/** 手機底部 5 格 tab（對齊原稿 bottomnav，中間「獎金池」為凸出金球 CTA） */
export interface BottomTab {
  label: string;
  icon: string;
  jackpot?: boolean;
  active?: boolean;
}
export const BOTTOM_TABS: BottomTab[] = [
  { label: "訊息", icon: "✉" },
  { label: "禮物", icon: "🎁" },
  { label: "獎金池", icon: "$", jackpot: true, active: true },
  { label: "獎勵", icon: "🏆" },
  { label: "VIP", icon: "♛" }
];
