import { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowLeft, Lock, Star, Trophy, Heart, BookOpen, Coffee, Flame, Droplets, Timer, ChevronRight, Check, X } from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// SECTION 1: TEA DATA
// ═══════════════════════════════════════════════════════════

const TEA_DATA = [
  {
    id: 1, name: 'Dragon Well (Longjing)', chinese: '龙井', category: 'Green',
    region: 'Hangzhou, Zhejiang', temp: 80, steepTime: '60-90s', gramsper100ml: 3,
    flavorNotes: ['chestnut', 'sweet', 'vegetal'],
    funFact: 'Dragon Well is pan-fired by hand in a wok, and master tea makers can judge the temperature by touching the side of the wok with their bare hands.'
  },
  {
    id: 2, name: 'Bi Luo Chun', chinese: '碧螺春', category: 'Green',
    region: 'Suzhou, Jiangsu', temp: 75, steepTime: '45-60s', gramsper100ml: 3,
    flavorNotes: ['fruity', 'floral', 'fresh'],
    funFact: 'Bi Luo Chun is grown among fruit trees, which gives the tea its distinctive fruity aroma. It takes over 80,000 hand-picked buds to make just one kilogram.'
  },
  {
    id: 3, name: 'Tie Guan Yin', chinese: '铁观音', category: 'Oolong',
    region: 'Anxi, Fujian', temp: 95, steepTime: '30-45s', gramsper100ml: 7,
    flavorNotes: ['orchid', 'creamy', 'toasty'],
    funFact: 'Named after the Iron Goddess of Mercy (Guanyin), legend says a poor farmer found a withered tea plant behind her temple and nursed it back to health.'
  },
  {
    id: 4, name: 'Da Hong Pao', chinese: '大红袍', category: 'Oolong',
    region: 'Wuyi Mountains, Fujian', temp: 95, steepTime: '30-45s', gramsper100ml: 7,
    flavorNotes: ['mineral', 'roasted', 'caramel'],
    funFact: 'The original Da Hong Pao mother trees are over 350 years old. In 2005, 20 grams sold for approximately $28,000, making it the most expensive tea in the world.'
  },
  {
    id: 5, name: 'Dong Ding Oolong', chinese: '冻顶乌龙', category: 'Oolong',
    region: 'Lugu, Nantou, Taiwan', temp: 90, steepTime: '45-60s', gramsper100ml: 6,
    flavorNotes: ['buttery', 'floral', 'honey'],
    funFact: 'Dong Ding means "Frozen Summit" — the original tea plants were brought from Wuyi Mountains to Taiwan in the 1800s by a scholar who passed his imperial exams.'
  },
  {
    id: 6, name: 'Keemun (Qimen)', chinese: '祁门红茶', category: 'Black',
    region: 'Qimen, Anhui', temp: 90, steepTime: '60-90s', gramsper100ml: 4,
    flavorNotes: ['cocoa', 'wine', 'smoky'],
    funFact: 'Keemun was once a staple of English Breakfast blends. Queen Elizabeth II reportedly enjoyed Keemun tea as part of her daily routine.'
  },
  {
    id: 7, name: 'Lapsang Souchong', chinese: '正山小种', category: 'Black',
    region: 'Wuyi Mountains, Fujian', temp: 95, steepTime: '60-90s', gramsper100ml: 4,
    flavorNotes: ['pine smoke', 'longan', 'bold'],
    funFact: 'Considered the first black tea ever produced. Legend says soldiers camped in a tea factory during the Ming Dynasty, delaying processing. Workers dried leaves over pine fires to save them.'
  },
  {
    id: 8, name: 'Dian Hong', chinese: '滇红', category: 'Black',
    region: 'Yunnan', temp: 90, steepTime: '60-90s', gramsper100ml: 4,
    flavorNotes: ['malty', 'pepper', 'sweet potato'],
    funFact: 'Dian Hong is made from large-leaf Yunnan tea trees, some of which are over 1,000 years old. The golden buds create a naturally sweet, smooth cup.'
  },
  {
    id: 9, name: 'Silver Needle', chinese: '白毫银针', category: 'White',
    region: 'Fuding, Fujian', temp: 80, steepTime: '90-120s', gramsper100ml: 4,
    flavorNotes: ['melon', 'hay', 'delicate'],
    funFact: 'Silver Needle is made only from unopened buds covered in fine white hairs. It can only be harvested during a few days in early spring under strict weather conditions.'
  },
  {
    id: 10, name: 'White Peony', chinese: '白牡丹', category: 'White',
    region: 'Fuding, Fujian', temp: 85, steepTime: '60-90s', gramsper100ml: 4,
    flavorNotes: ['peony', 'nutty', 'fresh'],
    funFact: 'White Peony uses one bud and two leaves, giving it more body than Silver Needle. Like fine wine, high-quality white tea improves with age.'
  },
  {
    id: 11, name: 'Sheng Pu-erh (Raw)', chinese: '生普洱', category: 'Pu-erh',
    region: 'Yunnan', temp: 95, steepTime: '15-30s', gramsper100ml: 7,
    flavorNotes: ['astringent', 'floral', 'evolving'],
    funFact: 'Sheng Pu-erh is a living tea that ages and ferments over decades. Some cakes from the 1950s sell for over $100,000. The flavor transforms completely over time.'
  },
  {
    id: 12, name: 'Shu Pu-erh (Ripe)', chinese: '熟普洱', category: 'Pu-erh',
    region: 'Yunnan', temp: 100, steepTime: '15-30s', gramsper100ml: 7,
    flavorNotes: ['earthy', 'chocolate', 'smooth'],
    funFact: 'Shu Pu-erh was invented in 1973 using a technique called "wet piling" to accelerate fermentation, simulating decades of aging in just 45-60 days.'
  },
  {
    id: 13, name: 'Jun Shan Yin Zhen', chinese: '君山银针', category: 'Yellow',
    region: 'Junshan Island, Hunan', temp: 80, steepTime: '60-90s', gramsper100ml: 3,
    flavorNotes: ['mellow', 'sweet corn', 'smooth'],
    funFact: 'Yellow tea undergoes a unique "sealed yellowing" step where damp leaves are wrapped in cloth. Jun Shan Yin Zhen was tribute tea for Chinese emperors.'
  },
  {
    id: 14, name: 'Jasmine Pearl', chinese: '茉莉龙珠', category: 'Scented',
    region: 'Fuzhou, Fujian', temp: 85, steepTime: '60-90s', gramsper100ml: 4,
    flavorNotes: ['jasmine', 'sweet', 'round'],
    funFact: 'Each pearl is hand-rolled from two leaves and a bud, then scented with fresh jasmine flowers up to seven times. The flowers are removed after each scenting.'
  },
  {
    id: 15, name: 'Osmanthus Oolong', chinese: '桂花乌龙', category: 'Scented',
    region: 'Fujian / Taiwan', temp: 90, steepTime: '45-60s', gramsper100ml: 5,
    flavorNotes: ['osmanthus', 'peach', 'honeyed'],
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

const E = null; // transparent
const EMMA_SPRITE = [
  [E,E,E,E,E,'#D4C5A9','#D4C5A9','#D4C5A9','#D4C5A9','#D4C5A9','#D4C5A9',E,E,E,E,E],
  [E,E,E,E,'#D4C5A9','#D4C5A9','#D4C5A9','#D4C5A9','#D4C5A9','#D4C5A9','#D4C5A9','#D4C5A9',E,E,E,E],
  [E,E,E,'#D4C5A9','#D4C5A9','#D4C5A9','#D4C5A9','#D4C5A9','#D4C5A9','#D4C5A9','#D4C5A9','#D4C5A9','#D4C5A9',E,E,E],
  [E,E,E,'#1A1A1A','#1A1A1A','#1A1A1A','#1A1A1A','#1A1A1A','#1A1A1A','#1A1A1A','#1A1A1A','#1A1A1A','#1A1A1A',E,E,E],
  [E,E,'#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A',E,E],
  [E,'#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A','#6B3A2A',E],
  [E,'#6B3A2A','#6B3A2A','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#6B3A2A','#6B3A2A',E],
  [E,'#6B3A2A','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#6B3A2A',E],
  [E,E,'#F4C99B','#F4C99B','#FFFFFF','#1A1A1A','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#1A1A1A','#FFFFFF','#F4C99B','#F4C99B',E,E],
  [E,E,'#F4C99B','#F4C99B','#1A1A1A','#1A1A1A','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#1A1A1A','#1A1A1A','#F4C99B','#F4C99B',E,E],
  [E,E,'#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B',E,E],
  [E,E,'#F4C99B','#F4C99B','#F4C99B','#F4C99B','#E88B8B','#E88B8B','#E88B8B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B',E,E],
  [E,E,E,'#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B','#F4C99B',E,E,E],
  [E,E,E,E,'#1B2A4A','#1B2A4A','#2E8B57','#2E8B57','#2E8B57','#1B2A4A','#1B2A4A','#1B2A4A',E,E,E,E],
  [E,E,E,'#1B2A4A','#1B2A4A','#2E8B57','#2E8B57','#2E8B57','#2E8B57','#2E8B57','#1B2A4A','#1B2A4A','#1B2A4A',E,E,E],
  [E,E,'#1B2A4A','#1B2A4A','#1B2A4A','#2E8B57','#2E8B57','#DAA520','#2E8B57','#2E8B57','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A',E,E],
  [E,E,'#1B2A4A','#1B2A4A','#1B2A4A','#2E8B57','#2E8B57','#2E8B57','#2E8B57','#2E8B57','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A',E,E],
  [E,E,'#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A',E,E],
  [E,E,'#F4C99B','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#F4C99B',E,E],
  [E,E,'#F4C99B','#F4C99B','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#F4C99B','#F4C99B',E,E],
  [E,E,E,E,'#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A','#1B2A4A',E,E,E,E],
  [E,E,E,E,'#1B2A4A','#1B2A4A','#1B2A4A',E,E,'#1B2A4A','#1B2A4A','#1B2A4A',E,E,E,E],
  [E,E,E,E,'#3E2723','#3E2723','#3E2723',E,E,'#3E2723','#3E2723','#3E2723',E,E,E,E],
  [E,E,E,'#3E2723','#3E2723','#3E2723','#3E2723',E,E,'#3E2723','#3E2723','#3E2723','#3E2723',E,E,E],
];

const TEA_PET_SPRITE = [
  [E,E,E,'#4CAF50','#4CAF50',E,E,'#4CAF50','#4CAF50',E],
  [E,E,'#4CAF50','#4CAF50','#4CAF50','#4CAF50','#4CAF50','#4CAF50','#4CAF50','#4CAF50'],
  [E,'#4CAF50','#FFFFFF','#1A1A1A','#4CAF50','#4CAF50','#4CAF50','#FFFFFF','#1A1A1A','#4CAF50'],
  [E,'#4CAF50','#4CAF50','#4CAF50','#4CAF50','#4CAF50','#4CAF50','#4CAF50','#4CAF50','#4CAF50'],
  ['#388E3C','#4CAF50','#4CAF50','#4CAF50','#4CAF50','#4CAF50','#4CAF50','#4CAF50','#4CAF50','#388E3C'],
  ['#388E3C','#4CAF50','#4CAF50','#E88B8B','#4CAF50','#4CAF50','#E88B8B','#4CAF50','#4CAF50','#388E3C'],
  [E,'#388E3C','#4CAF50','#4CAF50','#4CAF50','#4CAF50','#4CAF50','#4CAF50','#388E3C',E],
  [E,E,'#388E3C','#388E3C','#388E3C','#388E3C','#388E3C','#388E3C',E,E],
  [E,'#2E7D32',E,'#388E3C','#388E3C','#388E3C','#388E3C',E,'#2E7D32',E],
  [E,'#2E7D32',E,E,E,E,E,E,'#2E7D32',E],
];

const TEA_CUP_SPRITE = [
  [E,E,'#FFF8DC','#FFF8DC','#FFF8DC','#FFF8DC',E,E],
  [E,'#8D6E63','#DAA520','#DAA520','#DAA520','#DAA520','#8D6E63',E],
  [E,'#8D6E63','#FFF8DC','#FFF8DC','#FFF8DC','#FFF8DC','#8D6E63','#8D6E63'],
  [E,'#8D6E63','#FFF8DC','#FFF8DC','#FFF8DC','#FFF8DC','#8D6E63','#8D6E63'],
  [E,'#8D6E63','#FFF8DC','#FFF8DC','#FFF8DC','#FFF8DC','#8D6E63',E],
  [E,E,'#8D6E63','#8D6E63','#8D6E63','#8D6E63',E,E],
  [E,E,E,'#8D6E63','#8D6E63',E,E,E],
  [E,E,'#8D6E63','#8D6E63','#8D6E63','#8D6E63',E,E],
];

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

function SteamAnimation() {
  return (
    <div className="relative" style={{ width: 20, height: 30 }}>
      <div className="absolute bottom-0 left-1 w-1 h-3 bg-gray-300 rounded-full animate-steam opacity-70" />
      <div className="absolute bottom-0 left-2.5 w-1 h-3 bg-gray-300 rounded-full animate-steam-delay opacity-70" />
      <div className="absolute bottom-0 left-1.5 w-1 h-3 bg-gray-300 rounded-full animate-steam-delay2 opacity-70" />
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
            <SteamAnimation />
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
          <PixelButton locked className="w-full">
            Brewing Simulator — Coming Soon
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

function generateQuestions(count = 10) {
  const questions = [];
  const types = ['category', 'temperature', 'region'];

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
    } else {
      const wrongTeas = TEA_DATA.filter(t => t.id !== tea.id).sort(() => Math.random() - 0.5).slice(0, 3);
      const choices = [...wrongTeas.map(t => t.name), tea.name].sort(() => Math.random() - 0.5);
      questions.push({
        type, tea,
        prompt: `Which tea comes from ${tea.region}?`,
        choices,
        correctIndex: choices.indexOf(tea.name),
        explanation: `${tea.name} (${tea.chinese}) comes from ${tea.region}. It's known for its ${tea.flavorNotes.join(', ')} flavor notes.`,
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
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [emmaMsg, setEmmaMsg] = useState("Let's test your tea knowledge! Pick the correct answer.");
  const [petBounce, setPetBounce] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [prevLevel, setPrevLevel] = useState(() => getLevel(0));

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
                      <span className={`font-pixel text-[7px] px-1.5 py-0.5 rounded ${CATEGORY_COLORS[tea.category]}`}>
                        {tea.category}
                      </span>
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
// SECTION 7: MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════

export default function App() {
  const [screen, setScreen] = useState('title');
  const [discoveredTeas, setDiscoveredTeas] = useState([]);

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
    default:
      return <TitleScreen onNavigate={handleNavigate} />;
  }
}
