import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ArrowLeft, Lock, Star, Trophy, Heart, BookOpen, Coffee, Flame, Droplets, Timer, ChevronRight, Check, X } from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// SECTION 1: TEA DATA
// ═══════════════════════════════════════════════════════════

const TEA_DATA = [
  {
    id: 1, name: 'Dragon Well (Longjing)', chinese: '龙井', category: 'Green',
    region: 'Hangzhou, Zhejiang', temp: 80, steepTime: '60-90s', gramsper100ml: 3,
    flavorNotes: ['chestnut', 'sweet', 'vegetal'],
    processing: 'Pan-fired in a wok to halt oxidation',
    brewingVessel: 'Glass cup',
    funFact: 'Dragon Well is pan-fired by hand in a wok, and master tea makers can judge the temperature by touching the side of the wok with their bare hands.'
  },
  {
    id: 2, name: 'Bi Luo Chun', chinese: '碧螺春', category: 'Green',
    region: 'Suzhou, Jiangsu', temp: 75, steepTime: '45-60s', gramsper100ml: 3,
    flavorNotes: ['fruity', 'floral', 'fresh'],
    processing: 'Hand-rolled and pan-fired',
    brewingVessel: 'Glass cup',
    funFact: 'Bi Luo Chun is grown among fruit trees, which gives the tea its distinctive fruity aroma. It takes over 80,000 hand-picked buds to make just one kilogram.'
  },
  {
    id: 3, name: 'Tie Guan Yin', chinese: '铁观音', category: 'Oolong',
    region: 'Anxi, Fujian', temp: 95, steepTime: '30-45s', gramsper100ml: 7,
    flavorNotes: ['orchid', 'creamy', 'toasty'],
    processing: 'Partially oxidized, then rolled and roasted',
    brewingVessel: 'Gaiwan',
    funFact: 'Named after the Iron Goddess of Mercy (Guanyin), legend says a poor farmer found a withered tea plant behind her temple and nursed it back to health.'
  },
  {
    id: 4, name: 'Da Hong Pao', chinese: '大红袍', category: 'Oolong',
    region: 'Wuyi Mountains, Fujian', temp: 95, steepTime: '30-45s', gramsper100ml: 7,
    flavorNotes: ['mineral', 'roasted', 'caramel'],
    processing: 'Heavy roasting after partial oxidation',
    brewingVessel: 'Yixing teapot',
    funFact: 'The original Da Hong Pao mother trees are over 350 years old. In 2005, 20 grams sold for approximately $28,000, making it the most expensive tea in the world.'
  },
  {
    id: 5, name: 'Dong Ding Oolong', chinese: '冻顶乌龙', category: 'Oolong',
    region: 'Lugu, Nantou, Taiwan', temp: 90, steepTime: '45-60s', gramsper100ml: 6,
    flavorNotes: ['buttery', 'floral', 'honey'],
    processing: 'Medium oxidation with light roasting',
    brewingVessel: 'Gaiwan',
    funFact: 'Dong Ding means "Frozen Summit" — the original tea plants were brought from Wuyi Mountains to Taiwan in the 1800s by a scholar who passed his imperial exams.'
  },
  {
    id: 6, name: 'Keemun (Qimen)', chinese: '祁门红茶', category: 'Black',
    region: 'Qimen, Anhui', temp: 90, steepTime: '60-90s', gramsper100ml: 4,
    flavorNotes: ['cocoa', 'wine', 'smoky'],
    processing: 'Fully oxidized and slow-dried',
    brewingVessel: 'Gaiwan',
    funFact: 'Keemun was once a staple of English Breakfast blends. Queen Elizabeth II reportedly enjoyed Keemun tea as part of her daily routine.'
  },
  {
    id: 7, name: 'Lapsang Souchong', chinese: '正山小种', category: 'Black',
    region: 'Wuyi Mountains, Fujian', temp: 95, steepTime: '60-90s', gramsper100ml: 4,
    flavorNotes: ['pine smoke', 'longan', 'bold'],
    processing: 'Smoke-dried over pinewood fires',
    brewingVessel: 'Yixing teapot',
    funFact: 'Considered the first black tea ever produced. Legend says soldiers camped in a tea factory during the Ming Dynasty, delaying processing. Workers dried leaves over pine fires to save them.'
  },
  {
    id: 8, name: 'Dian Hong', chinese: '滇红', category: 'Black',
    region: 'Yunnan', temp: 90, steepTime: '60-90s', gramsper100ml: 4,
    flavorNotes: ['malty', 'pepper', 'sweet potato'],
    processing: 'Fully oxidized from large-leaf cultivar',
    brewingVessel: 'Gaiwan',
    funFact: 'Dian Hong is made from large-leaf Yunnan tea trees, some of which are over 1,000 years old. The golden buds create a naturally sweet, smooth cup.'
  },
  {
    id: 9, name: 'Silver Needle', chinese: '白毫银针', category: 'White',
    region: 'Fuding, Fujian', temp: 80, steepTime: '90-120s', gramsper100ml: 4,
    flavorNotes: ['melon', 'hay', 'delicate'],
    processing: 'Withered and sun-dried with minimal handling',
    brewingVessel: 'Glass cup',
    funFact: 'Silver Needle is made only from unopened buds covered in fine white hairs. It can only be harvested during a few days in early spring under strict weather conditions.'
  },
  {
    id: 10, name: 'White Peony', chinese: '白牡丹', category: 'White',
    region: 'Fuding, Fujian', temp: 85, steepTime: '60-90s', gramsper100ml: 4,
    flavorNotes: ['peony', 'nutty', 'fresh'],
    processing: 'Withered and air-dried naturally',
    brewingVessel: 'Gaiwan',
    funFact: 'White Peony uses one bud and two leaves, giving it more body than Silver Needle. Like fine wine, high-quality white tea improves with age.'
  },
  {
    id: 11, name: 'Sheng Pu-erh (Raw)', chinese: '生普洱', category: 'Pu-erh',
    region: 'Yunnan', temp: 95, steepTime: '15-30s', gramsper100ml: 7,
    flavorNotes: ['astringent', 'floral', 'evolving'],
    processing: 'Sun-dried and naturally aged over years',
    brewingVessel: 'Yixing teapot',
    funFact: 'Sheng Pu-erh is a living tea that ages and ferments over decades. Some cakes from the 1950s sell for over $100,000. The flavor transforms completely over time.'
  },
  {
    id: 12, name: 'Shu Pu-erh (Ripe)', chinese: '熟普洱', category: 'Pu-erh',
    region: 'Yunnan', temp: 100, steepTime: '15-30s', gramsper100ml: 7,
    flavorNotes: ['earthy', 'chocolate', 'smooth'],
    processing: 'Wet-piled (wo dui) for accelerated fermentation',
    brewingVessel: 'Yixing teapot',
    funFact: 'Shu Pu-erh was invented in 1973 using a technique called "wet piling" to accelerate fermentation, simulating decades of aging in just 45-60 days.'
  },
  {
    id: 13, name: 'Jun Shan Yin Zhen', chinese: '君山银针', category: 'Yellow',
    region: 'Junshan Island, Hunan', temp: 80, steepTime: '60-90s', gramsper100ml: 3,
    flavorNotes: ['mellow', 'sweet corn', 'smooth'],
    processing: 'Sealed yellowing (men huang) after pan-firing',
    brewingVessel: 'Glass cup',
    funFact: 'Yellow tea undergoes a unique "sealed yellowing" step where damp leaves are wrapped in cloth. Jun Shan Yin Zhen was tribute tea for Chinese emperors.'
  },
  {
    id: 14, name: 'Jasmine Pearl', chinese: '茉莉龙珠', category: 'Scented',
    region: 'Fuzhou, Fujian', temp: 85, steepTime: '60-90s', gramsper100ml: 4,
    flavorNotes: ['jasmine', 'sweet', 'round'],
    processing: 'Green tea base scented with fresh jasmine flowers',
    brewingVessel: 'Gaiwan',
    funFact: 'Each pearl is hand-rolled from two leaves and a bud, then scented with fresh jasmine flowers up to seven times. The flowers are removed after each scenting.'
  },
  {
    id: 15, name: 'Osmanthus Oolong', chinese: '桂花乌龙', category: 'Scented',
    region: 'Fujian / Taiwan', temp: 90, steepTime: '45-60s', gramsper100ml: 5,
    flavorNotes: ['osmanthus', 'peach', 'honeyed'],
    processing: 'Oolong base blended with osmanthus flowers',
    brewingVessel: 'Gaiwan',
    funFact: 'Osmanthus flowers bloom for only about two weeks in autumn. The tiny golden flowers are mixed with oolong tea to create this fragrant blend prized since the Tang Dynasty.'
  }
];

const CATEGORY_COLORS = {
  Green: 'bg-cat-green text-white',
  Oolong: 'bg-cat-oolong text-white',
  Black: 'bg-cat-red text-white',
  White: 'bg-cat-white text-tea-ink',
  'Pu-erh': 'bg-cat-dark text-white',
  Yellow: 'bg-cat-yellow text-tea-ink',
  Scented: 'bg-purple-400 text-white',
};

const CATEGORIES = ['All', 'Green', 'Oolong', 'Black', 'White', 'Pu-erh', 'Yellow', 'Scented'];

const EMMA_MESSAGES = {
  welcome: [
    "Welcome to my tea house! I'm Emma, and I'll teach you about Chinese tea!",
    "Ni hao! Ready to explore the wonderful world of Chinese tea?",
    "Come in, come in! The water is hot and the tea is ready!",
  ],
  correct: [
    "Excellent! You really know your tea!",
    "That's right! You're becoming a true tea connoisseur!",
    "Perfect answer! Your tea knowledge is impressive!",
    "Correct! The tea spirits are pleased!",
  ],
  wrong: [
    "Not quite, but don't worry — every tea master starts somewhere!",
    "Hmm, that's not right. Let me explain...",
    "Close! But let me share the correct answer with you.",
    "No worries! Tea knowledge takes time to steep!",
  ],
  streak: [
    "Amazing streak! You're on fire — like a perfect charcoal roast!",
    "Incredible! Even the tea pet is impressed!",
    "What a streak! You could open your own tea house!",
  ],
  levelUp: {
    Apprentice: "You've reached Apprentice level! You're learning the way of tea!",
    'Tea Guide': "Tea Guide! You could lead a tea ceremony now!",
    'Tea Master': "TEA MASTER! I bow to your supreme tea knowledge!",
  },
};


// ═══════════════════════════════════════════════════════════
// SECTION 2: PIXEL ART SPRITES & COMPONENTS
// ═══════════════════════════════════════════════════════════

const _ = null; // transparent

// Emma — Tea Guide Outfit (16x28, red Chinese robe with gold trim, cream beanie)
const B='#D4C5A9',Bd='#B8AA8E',H='#7B4B2A',Hd='#5C3A1F',SK='#FDDBB8',Sp='#F0B8A0',
      EY='#3B7A57',MO='#D4736A',R='#8B2500',Rd='#6B1C00',G='#DAA520',Bk='#1A1A1A';
const EMMA_SPRITE = [
  [_,_,_,_,_,B,B,B,B,B,B,_,_,_,_,_],
  [_,_,_,_,B,Bd,B,B,B,Bd,B,B,_,_,_,_],
  [_,_,_,B,B,B,Bd,B,Bd,B,B,B,B,_,_,_],
  [_,_,_,B,Bd,B,B,Bd,B,B,Bd,B,B,_,_,_],
  [_,_,_,B,B,B,B,B,B,B,B,B,B,_,_,_],
  [_,_,H,H,B,B,B,B,B,B,B,B,H,H,_,_],
  [_,_,H,Hd,H,SK,SK,SK,SK,SK,SK,H,Hd,H,_,_],
  [_,H,H,H,SK,SK,SK,SK,SK,SK,SK,SK,H,H,H,_],
  [_,H,Hd,SK,SK,SK,SK,SK,SK,SK,SK,SK,SK,Hd,H,_],
  [_,H,H,SK,SK,EY,Bk,SK,SK,Bk,EY,SK,SK,H,H,_],
  [_,H,H,SK,SK,EY,EY,SK,SK,EY,EY,SK,SK,H,H,_],
  [_,H,Hd,SK,SK,SK,SK,SK,SK,SK,SK,SK,SK,Hd,H,_],
  [_,H,H,SK,Sp,SK,MO,SK,SK,MO,SK,Sp,SK,H,H,_],
  [_,_,H,SK,SK,SK,SK,MO,MO,SK,SK,SK,SK,H,_,_],
  [_,_,H,Hd,SK,SK,SK,SK,SK,SK,SK,SK,Hd,H,_,_],
  [_,_,G,G,R,R,SK,SK,SK,SK,R,R,G,G,_,_],
  [_,_,R,G,R,R,R,G,G,R,R,R,G,R,_,_],
  [_,R,R,R,R,R,G,R,R,G,R,R,R,R,R,_],
  [_,R,Rd,R,R,R,R,G,G,R,R,R,R,Rd,R,_],
  [_,R,R,R,Rd,R,R,R,R,R,R,Rd,R,R,R,_],
  [_,R,Rd,R,R,R,R,G,G,R,R,R,R,Rd,R,_],
  [R,R,R,R,Rd,R,R,R,R,R,R,Rd,R,R,R,R],
  [R,R,Rd,R,R,R,R,R,R,R,R,R,R,Rd,R,R],
  [R,R,R,Rd,R,R,G,R,R,G,R,R,Rd,R,R,R],
  [_,R,R,R,R,R,R,R,R,R,R,R,R,R,R,_],
  [_,_,R,R,SK,SK,R,R,R,R,SK,SK,R,R,_,_],
  [_,_,_,R,SK,SK,R,R,R,R,SK,SK,R,_,_,_],
  [_,_,_,_,SK,_,_,_,_,_,_,SK,_,_,_,_],
];

// Tea Pet — Lucky Frog (10x8)
const FG='#5B7A3A',FGd='#3E5C20',FGl='#7A9E50',FE='#DAA520';
const TEA_PET_SPRITE = [
  [_,_,Bk,FE,Bk,_,Bk,FE,Bk,_],
  [_,Bk,FG,Bk,FG,Bk,FG,Bk,FG,Bk],
  [Bk,FG,FGl,FG,FG,FG,FG,FG,FGl,Bk],
  [Bk,FG,FG,FG,FG,FG,FG,FG,FG,Bk],
  [Bk,FGd,FG,FG,Bk,Bk,FG,FG,FGd,Bk],
  [_,Bk,FGd,FG,FG,FG,FG,FGd,Bk,_],
  [_,_,Bk,FGd,FGd,FGd,FGd,Bk,_,_],
  [_,Bk,_,Bk,Bk,Bk,Bk,_,Bk,_],
];

// Tea Cup / Cha Bei (8x8)
const W='#F5F0E8',Wd='#D8D0C0',TL='#8B6914',BK='#3E2723';
const TEA_CUP_SPRITE = [
  [_,_,W,TL,TL,W,_,_],
  [_,W,TL,TL,TL,TL,W,_],
  [_,W,Wd,TL,TL,Wd,W,_],
  [_,W,W,Wd,Wd,W,W,_],
  [_,_,W,W,W,W,_,_],
  [_,_,_,Wd,Wd,_,_,_],
  [_,_,BK,W,W,BK,_,_],
  [_,_,_,BK,BK,_,_,_],
];

// Gaiwan (12x14) — tea liquid pixels use placeholder '__TEA__'
const T_ = '__TEA__';
const GAIWAN_SPRITE_TEMPLATE = [
  [_,_,_,_,_,G,G,_,_,_,_,_],
  [_,_,_,G,W,W,W,W,G,_,_,_],
  [_,_,G,W,W,Wd,W,W,W,G,_,_],
  [_,_,_,G,G,G,G,G,G,_,_,_],
  [_,_,W,W,T_,T_,T_,T_,W,W,_,_],
  [_,W,W,T_,T_,T_,T_,T_,T_,W,W,_],
  [_,W,Wd,T_,T_,T_,T_,T_,T_,Wd,W,_],
  [_,W,W,Wd,T_,T_,T_,T_,Wd,W,W,_],
  [_,_,W,W,Wd,T_,T_,Wd,W,W,_,_],
  [_,_,W,W,W,Wd,Wd,W,W,W,_,_],
  [_,_,_,W,W,W,W,W,W,_,_,_],
  [_,_,_,_,Wd,W,W,Wd,_,_,_,_],
  [_,_,BK,Wd,W,W,W,W,Wd,BK,_,_],
  [_,_,_,BK,BK,BK,BK,BK,BK,_,_,_],
];

function makeGaiwanSprite(teaColor) {
  return GAIWAN_SPRITE_TEMPLATE.map(row =>
    row.map(c => c === '__TEA__' ? teaColor : c)
  );
}

// Fairness Pitcher / Gong Dao Bei (10x12)
const PITCHER_SPRITE = [
  [_,_,_,W,TL,TL,W,_,_,_],
  [_,_,W,TL,TL,TL,TL,W,W,_],
  [_,W,W,TL,TL,TL,TL,W,_,_],
  [_,W,Wd,TL,TL,TL,TL,Wd,W,_],
  [_,W,W,Wd,TL,TL,Wd,W,W,_],
  [_,W,W,W,Wd,Wd,W,W,Wd,W],
  [_,_,W,W,W,W,W,W,Wd,W],
  [_,_,W,W,Wd,Wd,W,W,W,_],
  [_,_,_,W,W,W,W,_,_,_],
  [_,_,_,_,Wd,Wd,_,_,_,_],
  [_,_,_,BK,W,W,BK,_,_,_],
  [_,_,_,_,BK,BK,_,_,_,_],
];

// Kettle (14x14)
const MT='#4A4A4A',MTd='#2E2E2E',MTl='#6E6E6E',STM='#A0A0A0',RA='#8B2500';
const KETTLE_SPRITE = [
  [_,_,_,_,_,_,_,_,STM,_,_,_,_,_],
  [_,_,_,_,_,_,_,STM,_,STM,_,_,_,_],
  [_,_,_,_,_,_,_,_,STM,_,_,_,_,_],
  [_,_,_,_,Bk,Bk,Bk,Bk,Bk,_,_,_,_,_],
  [_,_,_,Bk,MTl,MT,MT,MT,MTl,Bk,_,_,_,_],
  [_,_,Bk,MT,MT,MTd,MT,MTd,MT,MT,Bk,_,_,_],
  [Bk,Bk,MT,MT,MTd,MT,MT,MT,MTd,MT,MT,Bk,_,_],
  [_,_,Bk,MT,MT,MT,RA,RA,MT,MT,MT,_,Bk,Bk],
  [_,_,Bk,MT,MTd,MT,MT,MT,MT,MTd,MT,Bk,_,_],
  [_,_,_,Bk,MT,MT,MTd,MTd,MT,MT,Bk,_,_,_],
  [_,_,_,_,Bk,MT,MT,MT,MT,Bk,_,_,_,_],
  [_,_,_,_,_,Bk,Bk,Bk,Bk,_,_,_,_,_],
  [_,_,_,_,Bk,MTl,MTl,MTl,MTl,Bk,_,_,_,_],
  [_,_,_,_,_,Bk,Bk,Bk,Bk,_,_,_,_,_],
];

// Category leaf icons (6x6 each)
function makeCategoryIcon(c1, c2) {
  return [
    [_,_,c1,c1,_,_],
    [_,c1,c2,c1,c1,_],
    [c1,c2,c2,c2,c1,_],
    [c1,c2,c2,c1,_,_],
    [_,c1,c1,_,_,_],
    [_,_,_,c1,_,_],
  ];
}

const CATEGORY_ICONS = {
  Green: makeCategoryIcon('#4CAF50','#81C784'),
  White: makeCategoryIcon('#E8E0D0','#FFF8F0'),
  Yellow: makeCategoryIcon('#FFD54F','#FFE082'),
  Oolong: makeCategoryIcon('#FF8F00','#FFB74D'),
  Black: makeCategoryIcon('#C62828','#EF5350'),
  'Pu-erh': makeCategoryIcon('#3E2723','#5D4037'),
  Scented: makeCategoryIcon('#9C27B0','#CE93D8'),
};

// Tea brew colors per category (for liquid in gaiwan during steeping)
const TEA_BREW_COLORS = {
  Green: '#A8C97F',
  White: '#E8DCC8',
  Yellow: '#D4A84B',
  Oolong: '#B87830',
  Black: '#8B3A2A',
  'Pu-erh': '#3E2218',
  Scented: '#A8C97F',
};

// PixelSprite renderer (box-shadow technique)
function PixelSprite({ data, scale = 3 }) {
  const shadows = [];
  data.forEach((row, y) => {
    row.forEach((color, x) => {
      if (color) {
        shadows.push(`${x * scale}px ${y * scale}px 0 ${Math.ceil(scale / 2) - 0.5}px ${color}`);
      }
    });
  });
  const w = data[0]?.length || 0;
  const h = data.length;
  return (
    <div
      style={{
        width: `${scale}px`,
        height: `${scale}px`,
        boxShadow: shadows.join(','),
        marginRight: `${w * scale}px`,
        marginBottom: `${h * scale}px`,
      }}
    />
  );
}

function EmmaCharacter({ bounce = false, scale = 3 }) {
  return (
    <div className={`inline-block ${bounce ? 'animate-bounce-pixel' : ''}`}>
      <PixelSprite data={EMMA_SPRITE} scale={scale} />
    </div>
  );
}

function TeaPet({ bounce = false, scale = 3 }) {
  return (
    <div className={`inline-block ${bounce ? 'animate-bounce-pixel' : ''}`}>
      <PixelSprite data={TEA_PET_SPRITE} scale={scale} />
    </div>
  );
}

function Steam() {
  return (
    <div style={{ display: 'flex', gap: 4, justifyContent: 'center', height: 24 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 4, height: 4,
          background: '#D8D0C0',
          borderRadius: '50%',
          animation: 'steamFloat 1.5s ease-in-out infinite',
          animationDelay: `${i * 0.3}s`,
        }} />
      ))}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════
// SECTION 3: UI PRIMITIVE COMPONENTS
// ═══════════════════════════════════════════════════════════

function PixelButton({ children, onClick, locked = false, variant = 'primary', className = '' }) {
  const base = 'font-pixel text-xs px-4 py-3 pixel-border transition-all active:translate-y-0.5 cursor-pointer';
  const variants = {
    primary: 'bg-tea-jade text-white hover:bg-green-700',
    secondary: 'bg-tea-gold text-tea-ink hover:bg-yellow-600',
    danger: 'bg-tea-red text-white hover:bg-red-800',
  };
  if (locked) {
    return (
      <button disabled className={`${base} bg-gray-400 text-gray-600 cursor-not-allowed opacity-60 ${className}`}>
        <span className="flex items-center gap-2 justify-center"><Lock size={14} /> {children}</span>
      </button>
    );
  }
  return (
    <button onClick={onClick} className={`${base} ${variants[variant] || variants.primary} ${className}`}>
      {children}
    </button>
  );
}

function SpeechBubble({ message }) {
  return (
    <div className="flex items-start gap-3 my-4">
      <div className="flex-shrink-0 mt-1">
        <PixelSprite data={EMMA_SPRITE} scale={2} />
      </div>
      <div className="pixel-border bg-white p-3 relative flex-1">
        <p className="font-pixel text-[10px] leading-relaxed text-tea-ink">{message}</p>
      </div>
    </div>
  );
}

function SpeechBubbleInline({ text }) {
  return (
    <div style={{
      background: '#FFF8DC', border: '3px solid #3E2723', borderRadius: 2,
      padding: '8px 12px', fontFamily: "'Press Start 2P', monospace",
      fontSize: 8, lineHeight: 1.6, color: '#3E2723', maxWidth: 220, position: 'relative',
    }}>
      {text}
      <div style={{
        position: 'absolute', bottom: -10, left: 20,
        width: 0, height: 0,
        borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
        borderTop: '10px solid #3E2723',
      }} />
    </div>
  );
}

function PixelCard({ children, onClick, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`pixel-border p-4 bg-white ${onClick ? 'cursor-pointer hover:bg-tea-cream transition-colors' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

function ProgressBar({ current, total, label }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      {label && <p className="font-pixel text-[10px] mb-1 text-tea-ink">{label}</p>}
      <div className="pixel-border-inset bg-gray-200 h-5 relative overflow-hidden">
        <div
          className="h-full bg-tea-jade transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
        <span className="absolute inset-0 flex items-center justify-center font-pixel text-[8px] text-tea-ink">
          {current} / {total}
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SECTION 4: TITLE SCREEN
// ═══════════════════════════════════════════════════════════

function TitleScreen({ onNavigate }) {
  const [welcomeMsg] = useState(
    () => EMMA_MESSAGES.welcome[Math.floor(Math.random() * EMMA_MESSAGES.welcome.length)]
  );

  return (
    <div className="min-h-screen bg-tea-cream flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="font-pixel text-lg sm:text-2xl text-tea-red mb-2 leading-relaxed">
          Emma&apos;s Tea House
        </h1>
        <p className="font-pixel text-[10px] sm:text-xs text-tea-jade mb-8">
          ~ 8-Bit Tea Academy ~
        </p>

        <div className="flex items-end justify-center gap-2 mb-4">
          <EmmaCharacter scale={3} />
          <div className="flex flex-col items-center">
            <Steam />
            <PixelSprite data={TEA_CUP_SPRITE} scale={3} />
          </div>
          <TeaPet scale={3} />
        </div>

        <SpeechBubble message={welcomeMsg} />

        <div className="flex flex-col gap-3 mt-6">
          <PixelButton onClick={() => onNavigate('quiz')} variant="primary" className="w-full">
            <span className="flex items-center justify-center gap-2"><BookOpen size={14} /> Tea Quiz</span>
          </PixelButton>
          <PixelButton onClick={() => onNavigate('collection')} variant="secondary" className="w-full">
            <span className="flex items-center justify-center gap-2"><Coffee size={14} /> Tea Collection</span>
          </PixelButton>
          <PixelButton onClick={() => onNavigate('brewing')} variant="primary" className="w-full">
            <span className="flex items-center justify-center gap-2"><Flame size={14} /> Brewing Simulator</span>
          </PixelButton>
        </div>

        <p className="font-pixel text-[8px] text-gray-400 mt-8">
          Learn about 15 Chinese teas through quizzes & exploration
        </p>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════
// SECTION 5: TEA QUIZ
// ═══════════════════════════════════════════════════════════

const SAVE_KEY = 'emmas-tea-house-save';

function loadSave() {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) { /* ignore */ }
  return null;
}

function writeSave(data) {
  try {
    const existing = loadSave() || {};
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...existing, ...data }));
  } catch (e) { /* ignore */ }
}

function generateQuestions(count = 10) {
  const questions = [];
  const types = ['category', 'temperature', 'region', 'steepTime', 'leafAmount', 'processing', 'vessel', 'flavorMatch'];

  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const tea = TEA_DATA[Math.floor(Math.random() * TEA_DATA.length)];

    if (type === 'category') {
      const allCats = [...new Set(TEA_DATA.map(t => t.category))];
      const wrongCats = allCats.filter(c => c !== tea.category);
      const shuffledWrong = wrongCats.sort(() => Math.random() - 0.5).slice(0, 3);
      const choices = [...shuffledWrong, tea.category].sort(() => Math.random() - 0.5);
      questions.push({
        type, tea,
        prompt: `What type of tea is ${tea.name}?`,
        choices,
        correctIndex: choices.indexOf(tea.category),
        explanation: `${tea.name} (${tea.chinese}) is a ${tea.category} tea from ${tea.region}.`,
      });
    } else if (type === 'temperature') {
      const offsets = [-15, -10, -5, 5, 10, 15].sort(() => Math.random() - 0.5).slice(0, 3);
      const wrongTemps = offsets.map(o => Math.max(65, Math.min(100, tea.temp + o)));
      const choices = [...wrongTemps, tea.temp]
        .map(t => `${t}°C`)
        .sort(() => Math.random() - 0.5);
      questions.push({
        type, tea,
        prompt: `What's the ideal brewing temperature for ${tea.name}?`,
        choices,
        correctIndex: choices.indexOf(`${tea.temp}°C`),
        explanation: `${tea.name} brews best at ${tea.temp}°C. ${tea.category} teas generally need ${tea.temp >= 95 ? 'hotter' : tea.temp >= 85 ? 'moderate' : 'cooler'} water.`,
      });
    } else if (type === 'region') {
      const wrongTeas = TEA_DATA.filter(t => t.id !== tea.id).sort(() => Math.random() - 0.5).slice(0, 3);
      const choices = [...wrongTeas.map(t => t.name), tea.name].sort(() => Math.random() - 0.5);
      questions.push({
        type, tea,
        prompt: `Which tea comes from ${tea.region}?`,
        choices,
        correctIndex: choices.indexOf(tea.name),
        explanation: `${tea.name} (${tea.chinese}) comes from ${tea.region}. It's known for its ${tea.flavorNotes.join(', ')} flavor notes.`,
      });
    } else if (type === 'steepTime') {
      const allTimes = [...new Set(TEA_DATA.map(t => t.steepTime))];
      const wrongTimes = allTimes.filter(t => t !== tea.steepTime).sort(() => Math.random() - 0.5).slice(0, 3);
      const choices = [...wrongTimes, tea.steepTime].sort(() => Math.random() - 0.5);
      questions.push({
        type, tea,
        prompt: `How long should you steep ${tea.name}?`,
        choices,
        correctIndex: choices.indexOf(tea.steepTime),
        explanation: `${tea.name} should be steeped for ${tea.steepTime}. ${tea.category} teas typically need ${tea.steepTime.startsWith('15') ? 'very short' : tea.steepTime.startsWith('90') ? 'longer' : 'moderate'} steeping times.`,
      });
    } else if (type === 'leafAmount') {
      const allGrams = [...new Set(TEA_DATA.map(t => t.gramsper100ml))];
      const wrongGrams = allGrams.filter(g => g !== tea.gramsper100ml).sort(() => Math.random() - 0.5).slice(0, 3);
      const choices = [...wrongGrams, tea.gramsper100ml]
        .map(g => `${g}g per 100ml`)
        .sort(() => Math.random() - 0.5);
      questions.push({
        type, tea,
        prompt: `How many grams per 100ml is recommended for ${tea.name}?`,
        choices,
        correctIndex: choices.indexOf(`${tea.gramsper100ml}g per 100ml`),
        explanation: `${tea.name} uses ${tea.gramsper100ml}g per 100ml. ${tea.gramsper100ml >= 7 ? 'Dense rolled teas like oolongs and pu-erh use more leaf.' : 'Delicate teas use less leaf to avoid bitterness.'}`,
      });
    } else if (type === 'processing') {
      const wrongProcessing = TEA_DATA.filter(t => t.processing !== tea.processing)
        .sort(() => Math.random() - 0.5).slice(0, 3).map(t => t.processing);
      const choices = [...wrongProcessing, tea.processing].sort(() => Math.random() - 0.5);
      questions.push({
        type, tea,
        prompt: `What processing method is used to make ${tea.name}?`,
        choices,
        correctIndex: choices.indexOf(tea.processing),
        explanation: `${tea.name} is made by: ${tea.processing}. This is characteristic of ${tea.category} teas.`,
      });
    } else if (type === 'vessel') {
      const vessels = ['Gaiwan', 'Yixing teapot', 'Glass cup'];
      const wrongVessels = vessels.filter(v => v !== tea.brewingVessel);
      const choices = [...wrongVessels, tea.brewingVessel].sort(() => Math.random() - 0.5);
      questions.push({
        type, tea,
        prompt: `What's the best vessel for brewing ${tea.name}?`,
        choices,
        correctIndex: choices.indexOf(tea.brewingVessel),
        explanation: `${tea.name} is best brewed in a ${tea.brewingVessel}. ${tea.brewingVessel === 'Glass cup' ? 'Glass lets you appreciate the leaf shape and color.' : tea.brewingVessel === 'Yixing teapot' ? 'Yixing clay absorbs flavor and enhances bold teas.' : 'The gaiwan is versatile and great for most teas.'}`,
      });
    } else if (type === 'flavorMatch') {
      const correctFlavor = tea.flavorNotes[Math.floor(Math.random() * tea.flavorNotes.length)];
      const allFlavors = TEA_DATA.flatMap(t => t.flavorNotes).filter(f => !tea.flavorNotes.includes(f));
      const wrongFlavors = [...new Set(allFlavors)].sort(() => Math.random() - 0.5).slice(0, 3);
      const choices = [...wrongFlavors, correctFlavor].sort(() => Math.random() - 0.5);
      questions.push({
        type, tea,
        prompt: `Which flavor note is associated with ${tea.name}?`,
        choices,
        correctIndex: choices.indexOf(correctFlavor),
        explanation: `${tea.name} is known for its ${tea.flavorNotes.join(', ')} flavor notes.`,
      });
    }
  }
  return questions;
}

function getLevel(score) {
  if (score >= 50) return 'Tea Master';
  if (score >= 25) return 'Tea Guide';
  if (score >= 10) return 'Apprentice';
  return 'Beginner';
}

function TeaQuiz({ onBack, discoveredTeas, onDiscoverTea }) {
  const [questions, setQuestions] = useState(() => generateQuestions(10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(() => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) return JSON.parse(saved).totalCorrect || 0;
    } catch (e) { /* ignore */ }
    return 0;
  });
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [emmaMsg, setEmmaMsg] = useState("Let's test your tea knowledge! Pick the correct answer.");
  const [petBounce, setPetBounce] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [prevLevel, setPrevLevel] = useState(() => getLevel(totalCorrect));

  useEffect(() => {
    writeSave({ totalCorrect });
  }, [totalCorrect]);

  const question = questions[currentIndex];

  const handleAnswer = useCallback((choiceIndex) => {
    if (showResult) return;
    setSelectedAnswer(choiceIndex);
    setShowResult(true);

    const isCorrect = choiceIndex === question.correctIndex;

    if (isCorrect) {
      const newScore = score + 1;
      const newStreak = streak + 1;
      const newTotal = totalCorrect + 1;
      setScore(newScore);
      setStreak(newStreak);
      setTotalCorrect(newTotal);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      // Discover tea
      if (!discoveredTeas.includes(question.tea.id)) {
        onDiscoverTea(question.tea.id);
      }

      // Pet bounce
      setPetBounce(true);
      setTimeout(() => setPetBounce(false), 400);

      // Level up check
      const newLevel = getLevel(newTotal);
      if (newLevel !== prevLevel && EMMA_MESSAGES.levelUp[newLevel]) {
        setEmmaMsg(EMMA_MESSAGES.levelUp[newLevel]);
        setPrevLevel(newLevel);
      } else if (newStreak >= 5) {
        setEmmaMsg(EMMA_MESSAGES.streak[Math.floor(Math.random() * EMMA_MESSAGES.streak.length)]);
      } else {
        setEmmaMsg(
          EMMA_MESSAGES.correct[Math.floor(Math.random() * EMMA_MESSAGES.correct.length)] +
          ' ' + question.explanation
        );
      }
    } else {
      setStreak(0);
      setEmmaMsg(
        EMMA_MESSAGES.wrong[Math.floor(Math.random() * EMMA_MESSAGES.wrong.length)] +
        ' ' + question.explanation
      );
    }
  }, [showResult, question, score, streak, totalCorrect, bestStreak, discoveredTeas, onDiscoverTea, prevLevel]);

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setQuizDone(true);
      return;
    }
    setCurrentIndex(currentIndex + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setEmmaMsg("Next question! Think carefully...");
  };

  const handlePlayAgain = () => {
    setQuestions(generateQuestions(10));
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizDone(false);
    setEmmaMsg("Let's go again! Ready?");
  };

  if (quizDone) {
    const level = getLevel(totalCorrect);
    return (
      <div className="min-h-screen bg-tea-cream p-4 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full">
          <PixelCard className="text-center">
            <Trophy className="mx-auto mb-3 text-tea-gold" size={32} />
            <h2 className="font-pixel text-sm text-tea-red mb-4">Quiz Complete!</h2>
            <div className="space-y-2 mb-4">
              <p className="font-pixel text-[10px]">Score: {score} / {questions.length}</p>
              <p className="font-pixel text-[10px]">Best Streak: {bestStreak}</p>
              <p className="font-pixel text-[10px]">Total Correct (all time): {totalCorrect}</p>
              <p className="font-pixel text-xs text-tea-jade mt-2">Rank: {level}</p>
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <EmmaCharacter scale={2} />
              <TeaPet bounce={true} scale={2} />
            </div>
            <div className="flex flex-col gap-2">
              <PixelButton onClick={handlePlayAgain} variant="primary" className="w-full">
                Play Again
              </PixelButton>
              <PixelButton onClick={onBack} variant="secondary" className="w-full">
                <span className="flex items-center justify-center gap-2"><ArrowLeft size={14} /> Back to Menu</span>
              </PixelButton>
            </div>
          </PixelCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tea-cream p-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="font-pixel text-[10px] text-tea-jade flex items-center gap-1 hover:text-green-700">
            <ArrowLeft size={14} /> Back
          </button>
          <div className="flex items-center gap-3">
            <span className="font-pixel text-[10px] text-tea-gold flex items-center gap-1">
              <Star size={12} /> {score}
            </span>
            <span className="font-pixel text-[10px] text-tea-red flex items-center gap-1">
              <Flame size={12} /> {streak}
            </span>
          </div>
        </div>

        <ProgressBar current={currentIndex + 1} total={questions.length} label={`Question ${currentIndex + 1}`} />

        <div className="mt-4 mb-2 flex justify-between items-center">
          <span className="font-pixel text-[8px] text-gray-500">Level: {getLevel(totalCorrect)}</span>
          <TeaPet bounce={petBounce} scale={2} />
        </div>

        <PixelCard className="mb-4">
          <p className="font-pixel text-[10px] sm:text-xs text-tea-ink leading-relaxed">{question.prompt}</p>
        </PixelCard>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {question.choices.map((choice, i) => {
            let btnClass = 'w-full text-left pixel-border font-pixel text-[10px] px-3 py-2.5 transition-all';
            if (showResult) {
              if (i === question.correctIndex) {
                btnClass += ' bg-green-200 border-green-600';
              } else if (i === selectedAnswer && i !== question.correctIndex) {
                btnClass += ' bg-red-200 border-red-600';
              } else {
                btnClass += ' bg-gray-100 opacity-50';
              }
            } else {
              btnClass += ' bg-white hover:bg-tea-cream cursor-pointer active:translate-y-0.5';
            }
            return (
              <button key={i} onClick={() => handleAnswer(i)} disabled={showResult} className={btnClass}>
                <span className="flex items-center gap-2">
                  {showResult && i === question.correctIndex && <Check size={12} className="text-green-600" />}
                  {showResult && i === selectedAnswer && i !== question.correctIndex && <X size={12} className="text-red-600" />}
                  {choice}
                </span>
              </button>
            );
          })}
        </div>

        <SpeechBubble message={emmaMsg} />

        {showResult && (
          <div className="mt-3 text-center">
            <PixelButton onClick={handleNext} variant="primary">
              {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question'}
              <ChevronRight size={14} className="inline ml-1" />
            </PixelButton>
          </div>
        )}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════
// SECTION 6: TEA COLLECTION / ENCYCLOPEDIA
// ═══════════════════════════════════════════════════════════

function TeaCollection({ onBack, discoveredTeas }) {
  const [filter, setFilter] = useState('All');
  const [selectedTea, setSelectedTea] = useState(null);

  const filteredTeas = filter === 'All'
    ? TEA_DATA
    : TEA_DATA.filter(t => t.category === filter);

  if (selectedTea) {
    const tea = selectedTea;
    const isDiscovered = discoveredTeas.includes(tea.id);
    if (!isDiscovered) {
      setSelectedTea(null);
      return null;
    }
    return (
      <div className="min-h-screen bg-tea-cream p-4">
        <div className="max-w-lg mx-auto">
          <button onClick={() => setSelectedTea(null)} className="font-pixel text-[10px] text-tea-jade flex items-center gap-1 hover:text-green-700 mb-4">
            <ArrowLeft size={14} /> Back to Collection
          </button>

          <PixelCard>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="font-pixel text-xs sm:text-sm text-tea-ink">{tea.name}</h2>
                <p className="font-pixel text-[10px] text-gray-500 mt-1">{tea.chinese}</p>
              </div>
              <span className={`font-pixel text-[8px] px-2 py-1 rounded ${CATEGORY_COLORS[tea.category]}`}>
                {tea.category}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="pixel-border-inset bg-gray-50 p-2">
                <p className="font-pixel text-[8px] text-gray-500 flex items-center gap-1"><Droplets size={10} /> Region</p>
                <p className="font-pixel text-[9px] mt-1">{tea.region}</p>
              </div>
              <div className="pixel-border-inset bg-gray-50 p-2">
                <p className="font-pixel text-[8px] text-gray-500 flex items-center gap-1"><Flame size={10} /> Temperature</p>
                <p className="font-pixel text-[9px] mt-1">{tea.temp}°C</p>
              </div>
              <div className="pixel-border-inset bg-gray-50 p-2">
                <p className="font-pixel text-[8px] text-gray-500 flex items-center gap-1"><Timer size={10} /> Steep Time</p>
                <p className="font-pixel text-[9px] mt-1">{tea.steepTime}</p>
              </div>
              <div className="pixel-border-inset bg-gray-50 p-2">
                <p className="font-pixel text-[8px] text-gray-500 flex items-center gap-1"><Coffee size={10} /> Leaf Amount</p>
                <p className="font-pixel text-[9px] mt-1">{tea.gramsper100ml}g / 100ml</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="font-pixel text-[8px] text-gray-500 mb-2">Flavor Notes</p>
              <div className="flex flex-wrap gap-1">
                {tea.flavorNotes.map((note, i) => (
                  <span key={i} className="font-pixel text-[8px] bg-tea-gold text-tea-ink px-2 py-1 pixel-border-inset">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="pixel-border-inset bg-yellow-50 p-3">
              <p className="font-pixel text-[8px] text-tea-gold flex items-center gap-1 mb-1">
                <Star size={10} /> Fun Fact
              </p>
              <p className="font-pixel text-[8px] leading-relaxed text-tea-ink">{tea.funFact}</p>
            </div>
          </PixelCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tea-cream p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="font-pixel text-[10px] text-tea-jade flex items-center gap-1 hover:text-green-700">
            <ArrowLeft size={14} /> Back
          </button>
          <h2 className="font-pixel text-xs text-tea-red">Tea Collection</h2>
        </div>

        <ProgressBar
          current={discoveredTeas.length}
          total={TEA_DATA.length}
          label={`${discoveredTeas.length} / ${TEA_DATA.length} Teas Discovered`}
        />

        <div className="flex flex-wrap gap-1 mt-4 mb-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-pixel text-[8px] px-2 py-1.5 pixel-border transition-all ${
                filter === cat ? 'bg-tea-jade text-white' : 'bg-white text-tea-ink hover:bg-tea-cream'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredTeas.map(tea => {
            const isDiscovered = discoveredTeas.includes(tea.id);
            return (
              <PixelCard
                key={tea.id}
                onClick={isDiscovered ? () => setSelectedTea(tea) : undefined}
                className={!isDiscovered ? 'opacity-60' : ''}
              >
                {isDiscovered ? (
                  <>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-pixel text-[9px] text-tea-ink">{tea.name}</p>
                        <p className="font-pixel text-[8px] text-gray-400 mt-0.5">{tea.chinese}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <PixelSprite data={CATEGORY_ICONS[tea.category] || CATEGORY_ICONS.Green} scale={2} />
                        <span className={`font-pixel text-[7px] px-1.5 py-0.5 rounded ${CATEGORY_COLORS[tea.category]}`}>
                          {tea.category}
                        </span>
                      </div>
                    </div>
                    <p className="font-pixel text-[7px] text-gray-500 mt-2">{tea.region}</p>
                    <div className="flex gap-1 mt-2">
                      {tea.flavorNotes.slice(0, 2).map((note, i) => (
                        <span key={i} className="font-pixel text-[7px] bg-gray-100 px-1 py-0.5 rounded">{note}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-2">
                    <Lock size={20} className="mx-auto text-gray-400 mb-1" />
                    <p className="font-pixel text-[8px] text-gray-400">???</p>
                    <p className="font-pixel text-[7px] text-gray-300 mt-1">Answer quiz to discover</p>
                  </div>
                )}
              </PixelCard>
            );
          })}
        </div>

        {discoveredTeas.length === 0 && (
          <SpeechBubble message="Your collection is empty! Head to the Tea Quiz to discover teas. Each correct answer unlocks a new tea!" />
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SECTION 7: BREWING SIMULATOR
// ═══════════════════════════════════════════════════════════

function parseSteepTime(steepStr) {
  const match = steepStr.match(/(\d+)-(\d+)/);
  return match ? { min: parseInt(match[1]), max: parseInt(match[2]) } : { min: 60, max: 90 };
}

function StepIndicator({ current, total = 8 }) {
  return (
    <div className="flex items-center justify-center gap-2 my-3">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          width: 10, height: 10, borderRadius: '50%',
          background: i < current ? '#2E8B57' : i === current ? '#DAA520' : '#D8D0C0',
          border: i === current ? '2px solid #3E2723' : '2px solid transparent',
          transition: 'all 0.3s',
        }} />
      ))}
    </div>
  );
}

function TeaTray({ activeItem, teaColor, steaming, petBounce }) {
  const defaultTeaColor = '#4A6741';
  const brewColor = teaColor || defaultTeaColor;

  const itemStyle = (name) => ({
    opacity: activeItem === name ? 1 : 0.5,
    transition: 'all 0.3s',
    display: 'inline-block',
    ...(activeItem === name ? { filter: 'drop-shadow(0 0 6px #DAA520)' } : {}),
  });

  return (
    <div style={{
      background: '#5C3A1F', border: '4px solid #3E2723', borderRadius: 4,
      padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 24 }}>
        <div style={itemStyle('kettle')} className="flex flex-col items-center">
          {steaming && <Steam />}
          <PixelSprite data={KETTLE_SPRITE} scale={2} />
        </div>
        <div style={itemStyle('gaiwan')} className="flex flex-col items-center">
          {steaming && <Steam />}
          <PixelSprite data={makeGaiwanSprite(brewColor)} scale={2} />
        </div>
        <div style={itemStyle('pitcher')} className="flex flex-col items-center">
          <PixelSprite data={PITCHER_SPRITE} scale={2} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 16, marginTop: 4 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={itemStyle('cups')} className="inline-block">
            <PixelSprite data={TEA_CUP_SPRITE} scale={2} />
          </div>
        ))}
        <div style={itemStyle('pet')} className={petBounce ? 'animate-pet-bounce' : ''}>
          <TeaPet scale={2} />
        </div>
      </div>
    </div>
  );
}

function BrewingSimulator({ onBack }) {
  const [selectedTea, setSelectedTea] = useState(null);
  const [step, setStep] = useState(0);
  const [chosenTemp, setChosenTemp] = useState(85);
  const [chosenGrams, setChosenGrams] = useState(null);
  const [steepElapsed, setSteepElapsed] = useState(0);
  const [steepRunning, setSteepRunning] = useState(false);
  const [scores, setScores] = useState({ temp: false, grams: false, steep: false });
  const [emmaMsg, setEmmaMsg] = useState("Choose a tea to begin your Gong Fu Cha journey!");
  const [petBounce, setPetBounce] = useState(false);
  const [rinsePhase, setRinsePhase] = useState(0);
  const [pourAnim, setPourAnim] = useState(false);
  const timerRef = useRef(null);

  // Steep timer
  useEffect(() => {
    if (steepRunning) {
      timerRef.current = setInterval(() => {
        setSteepElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [steepRunning]);

  const teaColor = selectedTea ? TEA_BREW_COLORS[selectedTea.category] || '#4A6741' : '#4A6741';

  // Generate leaf amount choices for step 3
  const gramsChoices = useMemo(() => {
    if (!selectedTea) return [];
    const correct = selectedTea.gramsper100ml;
    const allGrams = [3, 4, 5, 6, 7];
    const wrong = allGrams.filter(g => g !== correct).sort(() => Math.random() - 0.5).slice(0, 2);
    return [...wrong, correct].sort((a, b) => a - b);
  }, [selectedTea]);

  const handleSelectTea = (tea) => {
    setSelectedTea(tea);
    setStep(1);
    setChosenTemp(85);
    setChosenGrams(null);
    setSteepElapsed(0);
    setSteepRunning(false);
    setScores({ temp: false, grams: false, steep: false });
    setRinsePhase(0);
    setPourAnim(false);
    setEmmaMsg(`Great choice! ${tea.name} (${tea.chinese}) — a fine ${tea.category} tea from ${tea.region}. Let's brew it Gong Fu style!`);
  };

  const handleConfirmTemp = () => {
    const diff = Math.abs(chosenTemp - selectedTea.temp);
    const correct = diff <= 5;
    setScores(prev => ({ ...prev, temp: correct }));
    if (correct) {
      setEmmaMsg("Perfect temperature for this tea!");
    } else if (chosenTemp > selectedTea.temp) {
      setEmmaMsg("That's too hot for this delicate tea — it'll scorch the leaves!");
    } else {
      setEmmaMsg("This tea needs hotter water to release its full flavor!");
    }
    setStep(2);
  };

  const handleWarmGaiwan = () => {
    setEmmaMsg("We warm the gaiwan so the tea temperature stays consistent.");
    setTimeout(() => setStep(3), 800);
  };

  const handleSelectGrams = (g) => {
    setChosenGrams(g);
    const correct = g === selectedTea.gramsper100ml;
    setScores(prev => ({ ...prev, grams: correct }));
    if (correct) {
      setEmmaMsg("Just the right amount — you have a good eye!");
    } else {
      setEmmaMsg(`Hmm, ${selectedTea.name} works best with ${selectedTea.gramsper100ml}g per 100ml.`);
    }
    setStep(4);
  };

  const handleRinsePour = () => {
    setRinsePhase(1);
    setEmmaMsg("The first rinse wakes up the leaves and removes dust — we don't drink this one!");
    setTimeout(() => setRinsePhase(2), 1000);
  };

  const handleRinseDiscard = () => {
    setStep(5);
    setSteepElapsed(0);
    setSteepRunning(true);
    setEmmaMsg("Now pour the water and watch the leaves dance! Hit POUR when you think it's ready.");
  };

  const handlePour = () => {
    setSteepRunning(false);
    const { min, max } = parseSteepTime(selectedTea.steepTime);
    const correct = steepElapsed >= (min - 5) && steepElapsed <= (max + 5);
    setScores(prev => ({ ...prev, steep: correct }));
    if (steepElapsed < min - 5) {
      setEmmaMsg("The leaves haven't opened yet — the flavor will be thin.");
    } else if (steepElapsed > max + 5) {
      setEmmaMsg("Over-steeped! The tea will be more bitter than intended.");
    } else {
      setEmmaMsg("Perfect timing! The tea master emerges!");
    }
    setStep(6);
  };

  const handlePourToPitcher = () => {
    setPourAnim(true);
    setEmmaMsg("The fairness cup ensures every guest gets the same taste.");
    setTimeout(() => {
      setStep(7);
      setPourAnim(false);
    }, 1500);
  };

  const starCount = [scores.temp, scores.grams, scores.steep].filter(Boolean).length;
  const stars = starCount === 3 ? 3 : starCount === 2 ? 2 : 1;

  const handleBrewAgain = () => {
    setStep(1);
    setChosenTemp(85);
    setChosenGrams(null);
    setSteepElapsed(0);
    setSteepRunning(false);
    setScores({ temp: false, grams: false, steep: false });
    setRinsePhase(0);
    setPourAnim(false);
    setPetBounce(false);
    setEmmaMsg(`Let's brew ${selectedTea.name} again! This time with more precision.`);
  };

  const handleTryDifferent = () => {
    setSelectedTea(null);
    setStep(0);
    setChosenTemp(85);
    setChosenGrams(null);
    setSteepElapsed(0);
    setSteepRunning(false);
    setScores({ temp: false, grams: false, steep: false });
    setRinsePhase(0);
    setPourAnim(false);
    setPetBounce(false);
    setEmmaMsg("Choose a tea to begin your Gong Fu Cha journey!");
  };

  // Trigger pet bounce on results
  useEffect(() => {
    if (step === 7 && stars === 3) {
      setPetBounce(true);
      const t = setTimeout(() => setPetBounce(false), 600);
      return () => clearTimeout(t);
    }
  }, [step, stars]);

  // Set results message
  useEffect(() => {
    if (step === 7) {
      if (stars === 3) setEmmaMsg("A perfect brew! You could work at Moychay!");
      else if (stars === 2) setEmmaMsg("Getting there! Practice makes a tea master.");
      else setEmmaMsg("Don't worry, even the best tea masters had to start somewhere.");
    }
  }, [step, stars]);

  // Active item for tray highlighting
  const activeItem = step === 1 ? 'kettle' : step === 2 || step === 3 || step === 4 || step === 5 ? 'gaiwan'
    : step === 6 ? 'pitcher' : step === 7 ? 'cups' : null;

  return (
    <div className="min-h-screen bg-tea-cream p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="font-pixel text-xs text-tea-ink hover:text-tea-red flex items-center gap-1 cursor-pointer">
            <ArrowLeft size={14} /> Back
          </button>
          <h2 className="font-pixel text-sm text-tea-red flex-1 text-center">Brewing Simulator</h2>
        </div>

        {/* Step 0: Tea Selection */}
        {step === 0 && (
          <>
            <div className="flex items-start gap-3 mb-4">
              <EmmaCharacter scale={2} />
              <SpeechBubbleInline text={emmaMsg} />
            </div>
            <p className="font-pixel text-[10px] text-tea-ink mb-3 text-center">Select a tea to brew:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TEA_DATA.map(tea => (
                <PixelCard key={tea.id} onClick={() => handleSelectTea(tea)}>
                  <div className="flex items-center gap-2">
                    <PixelSprite data={CATEGORY_ICONS[tea.category] || CATEGORY_ICONS.Green} scale={2} />
                    <div>
                      <p className="font-pixel text-[9px] text-tea-ink">{tea.name}</p>
                      <p className="font-pixel text-[8px] text-gray-500">{tea.chinese} • {tea.category}</p>
                    </div>
                  </div>
                </PixelCard>
              ))}
            </div>
          </>
        )}

        {/* Steps 1-7: Active brewing */}
        {step >= 1 && selectedTea && (
          <>
            {/* Emma + bubble */}
            <div className="flex items-start gap-3 mb-3">
              <EmmaCharacter scale={2} />
              <SpeechBubbleInline text={emmaMsg} />
            </div>

            <StepIndicator current={step} total={8} />

            {/* Tea info bar */}
            <div className="pixel-border-inset bg-white p-2 mb-3 flex flex-wrap justify-center gap-3">
              <span className="font-pixel text-[8px] text-tea-ink flex items-center gap-1"><Flame size={10} /> {selectedTea.temp}°C</span>
              <span className="font-pixel text-[8px] text-tea-ink flex items-center gap-1"><Timer size={10} /> {selectedTea.steepTime}</span>
              <span className="font-pixel text-[8px] text-tea-ink flex items-center gap-1"><Coffee size={10} /> {selectedTea.gramsper100ml}g/100ml</span>
            </div>

            {/* Tea Tray */}
            <TeaTray
              activeItem={activeItem}
              teaColor={step >= 5 ? teaColor : '#4A6741'}
              steaming={step >= 1 && step <= 5}
              petBounce={petBounce}
            />

            {/* Step-specific controls */}
            <div className="mt-4">
              {/* Step 1: Temperature */}
              {step === 1 && (
                <PixelCard>
                  <p className="font-pixel text-[10px] text-tea-ink mb-3 text-center">Step 1: Heat the Water</p>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <button
                      onClick={() => setChosenTemp(prev => Math.max(70, prev - 5))}
                      className="font-pixel text-lg px-3 py-1 pixel-border bg-tea-cream cursor-pointer hover:bg-gray-200"
                    >−</button>
                    <span className="font-pixel text-xl text-tea-red" style={{ minWidth: 80, textAlign: 'center' }}>
                      {chosenTemp}°C
                    </span>
                    <button
                      onClick={() => setChosenTemp(prev => Math.min(100, prev + 5))}
                      className="font-pixel text-lg px-3 py-1 pixel-border bg-tea-cream cursor-pointer hover:bg-gray-200"
                    >+</button>
                  </div>
                  <PixelButton onClick={handleConfirmTemp} variant="primary" className="w-full">
                    Confirm Temperature
                  </PixelButton>
                </PixelCard>
              )}

              {/* Step 2: Warm Gaiwan */}
              {step === 2 && (
                <PixelCard>
                  <p className="font-pixel text-[10px] text-tea-ink mb-3 text-center">Step 2: Warm the Gaiwan</p>
                  <p className="font-pixel text-[8px] text-gray-500 mb-3 text-center">Pour hot water to warm the vessel, then discard.</p>
                  <PixelButton onClick={handleWarmGaiwan} variant="secondary" className="w-full">
                    Pour &amp; Swirl
                  </PixelButton>
                </PixelCard>
              )}

              {/* Step 3: Add Tea Leaves */}
              {step === 3 && (
                <PixelCard>
                  <p className="font-pixel text-[10px] text-tea-ink mb-3 text-center">Step 3: Add Tea Leaves</p>
                  <p className="font-pixel text-[8px] text-gray-500 mb-3 text-center">How many grams per 100ml?</p>
                  <div className="flex gap-3 justify-center">
                    {gramsChoices.map(g => (
                      <PixelButton key={g} onClick={() => handleSelectGrams(g)} variant="secondary" className="flex-1">
                        {g}g
                      </PixelButton>
                    ))}
                  </div>
                </PixelCard>
              )}

              {/* Step 4: Rinse Leaves */}
              {step === 4 && (
                <PixelCard>
                  <p className="font-pixel text-[10px] text-tea-ink mb-3 text-center">Step 4: Rinse the Leaves (洗茶)</p>
                  {rinsePhase === 0 && (
                    <PixelButton onClick={handleRinsePour} variant="secondary" className="w-full">
                      Pour Hot Water
                    </PixelButton>
                  )}
                  {rinsePhase === 1 && (
                    <p className="font-pixel text-[9px] text-tea-gold text-center animate-blink">Rinsing...</p>
                  )}
                  {rinsePhase === 2 && (
                    <PixelButton onClick={handleRinseDiscard} variant="secondary" className="w-full">
                      Discard Rinse Water
                    </PixelButton>
                  )}
                </PixelCard>
              )}

              {/* Step 5: Steep */}
              {step === 5 && (
                <PixelCard>
                  <p className="font-pixel text-[10px] text-tea-ink mb-2 text-center">Step 5: First Infusion</p>
                  <div className="flex items-center justify-center mb-3">
                    <span className="font-pixel text-3xl text-tea-red">{steepElapsed}s</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 pixel-border-inset mb-3 overflow-hidden">
                    <div
                      className="h-full transition-all duration-1000"
                      style={{
                        width: `${Math.min(100, (steepElapsed / (parseSteepTime(selectedTea.steepTime).max + 10)) * 100)}%`,
                        background: steepElapsed <= parseSteepTime(selectedTea.steepTime).max + 5 ? teaColor : '#C62828',
                      }}
                    />
                  </div>
                  <button
                    onClick={handlePour}
                    style={{ minHeight: 56 }}
                    className="w-full font-pixel text-sm px-4 py-4 pixel-border bg-tea-red text-white hover:bg-red-800 transition-all active:translate-y-0.5 cursor-pointer"
                  >
                    POUR!
                  </button>
                </PixelCard>
              )}

              {/* Step 6: Pour to Pitcher */}
              {step === 6 && (
                <PixelCard>
                  <p className="font-pixel text-[10px] text-tea-ink mb-3 text-center">Step 6: Pour into Fairness Cup</p>
                  {!pourAnim ? (
                    <PixelButton onClick={handlePourToPitcher} variant="secondary" className="w-full">
                      Pour Tea
                    </PixelButton>
                  ) : (
                    <div className="flex justify-center">
                      <div className="animate-pour" style={{ width: 8, background: teaColor, borderRadius: 2 }} />
                    </div>
                  )}
                </PixelCard>
              )}

              {/* Step 7: Results */}
              {step === 7 && (
                <PixelCard>
                  <p className="font-pixel text-sm text-tea-ink mb-4 text-center">Brewing Results</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between font-pixel text-[9px]">
                      <span className="text-tea-ink">Temperature:</span>
                      <span className={scores.temp ? 'text-green-600' : 'text-red-600'}>
                        {scores.temp ? <Check size={12} className="inline" /> : <X size={12} className="inline" />}
                        {' '}{chosenTemp}°C {!scores.temp && `→ ${selectedTea.temp}°C`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-pixel text-[9px]">
                      <span className="text-tea-ink">Leaf amount:</span>
                      <span className={scores.grams ? 'text-green-600' : 'text-red-600'}>
                        {scores.grams ? <Check size={12} className="inline" /> : <X size={12} className="inline" />}
                        {' '}{chosenGrams}g {!scores.grams && `→ ${selectedTea.gramsper100ml}g`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-pixel text-[9px]">
                      <span className="text-tea-ink">Steep time:</span>
                      <span className={scores.steep ? 'text-green-600' : 'text-red-600'}>
                        {scores.steep ? <Check size={12} className="inline" /> : <X size={12} className="inline" />}
                        {' '}{steepElapsed}s {!scores.steep && `→ ${selectedTea.steepTime}`}
                      </span>
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <span className="font-pixel text-lg">
                      {Array.from({ length: 3 }, (_, i) => (
                        <Star key={i} size={20} className="inline" fill={i < stars ? '#DAA520' : 'none'} color={i < stars ? '#DAA520' : '#D8D0C0'} />
                      ))}
                    </span>
                    <p className="font-pixel text-[9px] text-gray-500 mt-1">{stars}/3 Stars</p>
                  </div>

                  <div className="flex gap-3">
                    <PixelButton onClick={handleBrewAgain} variant="secondary" className="flex-1">
                      Brew Again
                    </PixelButton>
                    <PixelButton onClick={handleTryDifferent} variant="primary" className="flex-1">
                      Different Tea
                    </PixelButton>
                  </div>
                </PixelCard>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════
// SECTION 8: MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════

export default function App() {
  const [screen, setScreen] = useState('title');
  const [discoveredTeas, setDiscoveredTeas] = useState(() => {
    const saved = loadSave();
    return Array.isArray(saved?.discoveredTeas) ? saved.discoveredTeas : [];
  });

  useEffect(() => {
    writeSave({ discoveredTeas });
  }, [discoveredTeas]);

  const handleDiscoverTea = useCallback((teaId) => {
    setDiscoveredTeas(prev => prev.includes(teaId) ? prev : [...prev, teaId]);
  }, []);

  const handleNavigate = useCallback((s) => setScreen(s), []);
  const handleBack = useCallback(() => setScreen('title'), []);

  switch (screen) {
    case 'quiz':
      return (
        <TeaQuiz
          onBack={handleBack}
          discoveredTeas={discoveredTeas}
          onDiscoverTea={handleDiscoverTea}
        />
      );
    case 'collection':
      return (
        <TeaCollection
          onBack={handleBack}
          discoveredTeas={discoveredTeas}
        />
      );
    case 'brewing':
      return <BrewingSimulator onBack={handleBack} />;
    default:
      return <TitleScreen onNavigate={handleNavigate} />;
  }
}
