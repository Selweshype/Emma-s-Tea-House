import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ArrowLeft, Lock, Star, Trophy, Heart, BookOpen, Coffee, Flame, Droplets, Timer, ChevronRight, Check, X } from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// SECTION 1: TEA DATA
// ═══════════════════════════════════════════════════════════

const TEA_DATA = [
  {
    id: 1, name: 'Dragon Well (Longjing)', chinese: '龙井', category: 'Green',
    region: 'Hangzhou, Zhejiang', temp: 80, steepTime: '5-10s', gramsper100ml: 3,
    flavorNotes: ['chestnut', 'sweet', 'vegetal'],
    processing: 'Pan-fired in a wok to halt oxidation',
    processing_nl: 'Gebakken in een wok om oxidatie te stoppen',
    brewingVessel: 'Glass cup',
    terroir: 'High altitude lake region with misty, humid climate and mineral-rich soil',
    terroir_nl: 'Hooggelegen meergebied met mistig, vochtig klimaat en mineraalrijke grond',
    oxidation: 'Unoxidized (0%)',
    funFact: 'Dragon Well is pan-fired by hand in a wok, and master tea makers can judge the temperature by touching the side of the wok with their bare hands.',
    funFact_nl: 'Dragon Well wordt met de hand gebakken in een wok, en meester-theemakers kunnen de temperatuur beoordelen door de zijkant van de wok met hun blote handen aan te raken.',
    flavorNotes_nl: ['kastanje', 'zoet', 'plantaardig'],
  },
  {
    id: 2, name: 'Bi Luo Chun', chinese: '碧螺春', category: 'Green',
    region: 'Suzhou, Jiangsu', temp: 75, steepTime: '5-10s', gramsper100ml: 3,
    flavorNotes: ['fruity', 'floral', 'fresh'],
    processing: 'Hand-rolled and pan-fired',
    processing_nl: 'Met de hand gerold en gebakken',
    brewingVessel: 'Glass cup',
    terroir: 'Grown among fruit orchards at low altitude, absorbing fruity aromas from surrounding trees',
    terroir_nl: 'Gekweekt tussen fruitboomgaarden op lage hoogte, absorbeert fruitige aroma\'s van omringende bomen',
    oxidation: 'Unoxidized (0%)',
    funFact: 'Bi Luo Chun is grown among fruit trees, which gives the tea its distinctive fruity aroma. It takes over 80,000 hand-picked buds to make just one kilogram.',
    funFact_nl: 'Bi Luo Chun groeit tussen fruitbomen, wat de thee zijn kenmerkende fruitige aroma geeft. Er zijn meer dan 80.000 met de hand geplukte knoppen nodig voor slechts één kilogram.',
    flavorNotes_nl: ['fruitig', 'bloemig', 'fris'],
  },
  {
    id: 3, name: 'Tie Guan Yin', chinese: '铁观音', category: 'Oolong',
    region: 'Anxi, Fujian', temp: 85, steepTime: '5-7s', gramsper100ml: 6,
    flavorNotes: ['orchid', 'creamy', 'toasty'],
    processing: 'Partially oxidized, then rolled and roasted',
    processing_nl: 'Gedeeltelijk geoxideerd, daarna gerold en geroosterd',
    brewingVessel: 'Gaiwan',
    terroir: 'Rocky, iron-rich soil in subtropical Anxi hills with cool, foggy springs',
    terroir_nl: 'Rotsachtige, ijzerrijke grond in subtropische Anxi heuvels met koele, mistige lentes',
    oxidation: 'Light-medium (25-40%)',
    funFact: 'Named after the Iron Goddess of Mercy (Guanyin), legend says a poor farmer found a withered tea plant behind her temple and nursed it back to health.',
    funFact_nl: 'Vernoemd naar de IJzeren Godin van Genade (Guanyin), volgens de legende vond een arme boer een verwelkte theeplant achter haar tempel en verzorgde deze weer tot leven.',
    flavorNotes_nl: ['orchidee', 'romig', 'geroosterd'],
  },
  {
    id: 4, name: 'Da Hong Pao', chinese: '大红袍', category: 'Oolong',
    region: 'Wuyi Mountains, Fujian', temp: 100, steepTime: '5-8s', gramsper100ml: 7,
    flavorNotes: ['mineral', 'roasted', 'caramel'],
    processing: 'Heavy roasting after partial oxidation',
    processing_nl: 'Zwaar geroosterd na gedeeltelijke oxidatie',
    brewingVessel: 'Yixing teapot',
    terroir: 'Mineral-rich rocky crevices (yan cha) in Wuyi cliffs with unique microclimate',
    terroir_nl: 'Mineraalrijke rotsachtige spleten (yan cha) in Wuyi kliffen met uniek microklimaat',
    oxidation: 'Heavy (60-70%)',
    funFact: 'The original Da Hong Pao mother trees are over 350 years old. In 2005, 20 grams sold for approximately $28,000, making it the most expensive tea in the world.',
    funFact_nl: 'De originele Da Hong Pao moederbomen zijn meer dan 350 jaar oud. In 2005 werd 20 gram verkocht voor ongeveer $28.000, waarmee het de duurste thee ter wereld werd.',
    flavorNotes_nl: ['mineraal', 'geroosterd', 'karamel'],
  },
  {
    id: 5, name: 'Dong Ding Oolong', chinese: '冻顶乌龙', category: 'Oolong',
    region: 'Lugu, Nantou, Taiwan', temp: 95, steepTime: '10-15s', gramsper100ml: 5,
    flavorNotes: ['buttery', 'floral', 'honey'],
    processing: 'Medium oxidation with light roasting',
    processing_nl: 'Gemiddelde oxidatie met lichte roostering',
    brewingVessel: 'Gaiwan',
    terroir: 'Mountain slopes at 700m altitude in Taiwan with frequent fog and moderate temperatures',
    terroir_nl: 'Berghellingen op 700m hoogte in Taiwan met frequente mist en gematigde temperaturen',
    oxidation: 'Medium (30-40%)',
    funFact: 'Dong Ding means "Frozen Summit" — the original tea plants were brought from Wuyi Mountains to Taiwan in the 1800s by a scholar who passed his imperial exams.',
    funFact_nl: 'Dong Ding betekent "Bevroren Top" — de originele theeplanten werden in de 19e eeuw vanuit de Wuyi bergen naar Taiwan gebracht door een geleerde die slaagde voor zijn keizerlijke examens.',
    flavorNotes_nl: ['boterig', 'bloemig', 'honing'],
  },
  {
    id: 6, name: 'Keemun (Qimen)', chinese: '祁门红茶', category: 'Black',
    region: 'Qimen, Anhui', temp: 90, steepTime: '6-8s', gramsper100ml: 4,
    flavorNotes: ['cocoa', 'wine', 'smoky'],
    processing: 'Fully oxidized and slow-dried',
    processing_nl: 'Volledig geoxideerd en langzaam gedroogd',
    brewingVessel: 'Gaiwan',
    terroir: 'Mountainous terrain with high humidity, moderate climate and rich red soil',
    terroir_nl: 'Bergachtig terrein met hoge luchtvochtigheid, gematigd klimaat en rijke rode grond',
    oxidation: 'Fully oxidized (100%)',
    funFact: 'Keemun was once a staple of English Breakfast blends. Queen Elizabeth II reportedly enjoyed Keemun tea as part of her daily routine.',
    funFact_nl: 'Keemun was ooit een vast onderdeel van English Breakfast melanges. Koningin Elizabeth II genoot naar verluidt van Keemun thee als onderdeel van haar dagelijkse routine.',
    flavorNotes_nl: ['cacao', 'wijn', 'rokerig'],
  },
  {
    id: 7, name: 'Lapsang Souchong', chinese: '正山小种', category: 'Black',
    region: 'Wuyi Mountains, Fujian', temp: 95, steepTime: '5-7s', gramsper100ml: 5,
    flavorNotes: ['pine smoke', 'longan', 'bold'],
    processing: 'Smoke-dried over pinewood fires',
    processing_nl: 'Rookgedroogd boven dennenhout vuren',
    brewingVessel: 'Yixing teapot',
    terroir: 'High mountain forests of Wuyi at 1000m+, cool and damp with pine tree canopy',
    terroir_nl: 'Hoge bergbossen van Wuyi op 1000m+, koel en vochtig met dennenboombedekking',
    oxidation: 'Fully oxidized (100%)',
    funFact: 'Considered the first black tea ever produced. Legend says soldiers camped in a tea factory during the Ming Dynasty, delaying processing. Workers dried leaves over pine fires to save them.',
    funFact_nl: 'Beschouwd als de eerste zwarte thee ooit geproduceerd. Volgens de legende kampeerden soldaten in een theefabriek tijdens de Ming-dynastie, waardoor de verwerking werd vertraagd. Arbeiders droogden de bladeren boven dennenvuren om ze te redden.',
    flavorNotes_nl: ['dennenrook', 'longan', 'krachtig'],
  },
  {
    id: 8, name: 'Dian Hong', chinese: '滇红', category: 'Black',
    region: 'Yunnan', temp: 90, steepTime: '6-10s', gramsper100ml: 5,
    flavorNotes: ['malty', 'pepper', 'sweet potato'],
    processing: 'Fully oxidized from large-leaf cultivar',
    processing_nl: 'Volledig geoxideerd van grootbladige cultivar',
    brewingVessel: 'Gaiwan',
    terroir: 'Ancient tea forests at high altitude in Yunnan with rich biodiversity and red laterite soil',
    terroir_nl: 'Oude theebossen op grote hoogte in Yunnan met rijke biodiversiteit en rode laterietgrond',
    oxidation: 'Fully oxidized (100%)',
    funFact: 'Dian Hong is made from large-leaf Yunnan tea trees, some of which are over 1,000 years old. The golden buds create a naturally sweet, smooth cup.',
    funFact_nl: 'Dian Hong wordt gemaakt van grootbladige Yunnan theebomen, waarvan sommige meer dan 1.000 jaar oud zijn. De gouden knoppen creëren een natuurlijk zoet, zacht kopje.',
    flavorNotes_nl: ['moutig', 'peper', 'zoete aardappel'],
  },
  {
    id: 9, name: 'Silver Needle', chinese: '白毫银针', category: 'White',
    region: 'Fuding, Fujian', temp: 80, steepTime: '10-15s', gramsper100ml: 5,
    flavorNotes: ['melon', 'hay', 'delicate'],
    processing: 'Withered and sun-dried with minimal handling',
    processing_nl: 'Verwelkt en zongedroogd met minimale behandeling',
    brewingVessel: 'Glass cup',
    terroir: 'Coastal Fuding hillsides with ocean breezes, mild winters and misty springs',
    terroir_nl: 'Kust Fuding hellingen met zeebries, milde winters en mistige lentes',
    oxidation: 'Minimal (5-10%)',
    funFact: 'Silver Needle is made only from unopened buds covered in fine white hairs. It can only be harvested during a few days in early spring under strict weather conditions.',
    funFact_nl: 'Silver Needle wordt alleen gemaakt van ongeopende knoppen bedekt met fijne witte haartjes. Het kan slechts enkele dagen in het vroege voorjaar worden geoogst onder strikte weersomstandigheden.',
    flavorNotes_nl: ['meloen', 'hooi', 'delicaat'],
  },
  {
    id: 10, name: 'White Peony', chinese: '白牡丹', category: 'White',
    region: 'Fuding, Fujian', temp: 80, steepTime: '6-8s', gramsper100ml: 5,
    flavorNotes: ['peony', 'nutty', 'fresh'],
    processing: 'Withered and air-dried naturally',
    processing_nl: 'Verwelkt en natuurlijk luchtgedroogd',
    brewingVessel: 'Gaiwan',
    terroir: 'Same Fuding terroir as Silver Needle, slightly lower altitude hillside gardens',
    terroir_nl: 'Zelfde Fuding terroir als Silver Needle, iets lagere hellingtuinen',
    oxidation: 'Minimal (5-10%)',
    funFact: 'White Peony uses one bud and two leaves, giving it more body than Silver Needle. Like fine wine, high-quality white tea improves with age.',
    funFact_nl: 'White Peony gebruikt één knop en twee bladeren, wat meer body geeft dan Silver Needle. Net als goede wijn verbetert witte thee van hoge kwaliteit met de jaren.',
    flavorNotes_nl: ['pioen', 'nootachtig', 'fris'],
  },
  {
    id: 11, name: 'Sheng Pu-erh (Raw)', chinese: '生普洱', category: 'Pu-erh',
    region: 'Yunnan', temp: 95, steepTime: '5-7s', gramsper100ml: 7,
    flavorNotes: ['astringent', 'floral', 'evolving'],
    processing: 'Sun-dried and naturally aged over years',
    processing_nl: 'Zongedroogd en natuurlijk verouderd over jaren',
    brewingVessel: 'Yixing teapot',
    terroir: 'Ancient forest trees at 1200-1800m in Yunnan with distinct wet and dry seasons',
    terroir_nl: 'Oude bosbomen op 1200-1800m in Yunnan met duidelijke natte en droge seizoenen',
    oxidation: 'Light then evolving (10-15% initially)',
    funFact: 'Sheng Pu-erh is a living tea that ages and ferments over decades. Some cakes from the 1950s sell for over $100,000. The flavor transforms completely over time.',
    funFact_nl: 'Sheng Pu-erh is een levende thee die decennialang veroudert en fermenteert. Sommige koeken uit de jaren 50 worden verkocht voor meer dan $100.000. De smaak verandert volledig in de loop van de tijd.',
    flavorNotes_nl: ['astringent', 'bloemig', 'evoluerend'],
  },
  {
    id: 12, name: 'Shu Pu-erh (Ripe)', chinese: '熟普洱', category: 'Pu-erh',
    region: 'Yunnan', temp: 100, steepTime: '5-7s', gramsper100ml: 7,
    flavorNotes: ['earthy', 'chocolate', 'smooth'],
    processing: 'Wet-piled (wo dui) for accelerated fermentation',
    processing_nl: 'Nat gestapeld (wo dui) voor versnelde fermentatie',
    brewingVessel: 'Yixing teapot',
    terroir: 'Same Yunnan old-growth terroir, but processing overrides terroir influence',
    terroir_nl: 'Zelfde Yunnan oud-groei terroir, maar verwerking overheerst terroir invloed',
    oxidation: 'Post-fermented (100%+)',
    funFact: 'Shu Pu-erh was invented in 1973 using a technique called "wet piling" to accelerate fermentation, simulating decades of aging in just 45-60 days.',
    funFact_nl: 'Shu Pu-erh werd uitgevonden in 1973 met een techniek genaamd "nat stapelen" om fermentatie te versnellen, waarmee decennia van veroudering worden gesimuleerd in slechts 45-60 dagen.',
    flavorNotes_nl: ['aards', 'chocolade', 'zacht'],
  },
  {
    id: 13, name: 'Jun Shan Yin Zhen', chinese: '君山银针', category: 'Yellow',
    region: 'Junshan Island, Hunan', temp: 80, steepTime: '8-12s', gramsper100ml: 4,
    flavorNotes: ['mellow', 'sweet corn', 'smooth'],
    processing: 'Sealed yellowing (men huang) after pan-firing',
    processing_nl: 'Verzegelde vergeling (men huang) na het bakken',
    brewingVessel: 'Glass cup',
    terroir: 'Small island in Dongting Lake with unique fog, moisture and fertile lake-bed soil',
    terroir_nl: 'Klein eiland in het Dongting Meer met unieke mist, vochtigheid en vruchtbare meerbodemgrond',
    oxidation: 'Lightly oxidized (10-15%)',
    funFact: 'Yellow tea undergoes a unique "sealed yellowing" step where damp leaves are wrapped in cloth. Jun Shan Yin Zhen was tribute tea for Chinese emperors.',
    funFact_nl: 'Gele thee ondergaat een unieke "verzegelde vergeling" stap waarbij vochtige bladeren in doek worden gewikkeld. Jun Shan Yin Zhen was schatplichtige thee voor Chinese keizers.',
    flavorNotes_nl: ['zacht', 'zoete maïs', 'glad'],
  },
  {
    id: 14, name: 'Jasmine Pearl', chinese: '茉莉龙珠', category: 'Scented',
    region: 'Fuzhou, Fujian', temp: 85, steepTime: '5-10s', gramsper100ml: 3,
    flavorNotes: ['jasmine', 'sweet', 'round'],
    processing: 'Green tea base scented with fresh jasmine flowers',
    processing_nl: 'Groene thee basis geparfumeerd met verse jasmijnbloemen',
    brewingVessel: 'Gaiwan',
    terroir: 'Base tea from Fujian highlands; jasmine from warm Fuzhou river valleys',
    terroir_nl: 'Basis thee uit Fujian hooglanden; jasmijn uit warme Fuzhou riviervalleien',
    oxidation: 'Unoxidized base (0%)',
    funFact: 'Each pearl is hand-rolled from two leaves and a bud, then scented with fresh jasmine flowers up to seven times. The flowers are removed after each scenting.',
    funFact_nl: 'Elke parel wordt met de hand gerold uit twee bladeren en een knop, daarna geparfumeerd met verse jasmijnbloemen tot zeven keer. De bloemen worden na elke parfumering verwijderd.',
    flavorNotes_nl: ['jasmijn', 'zoet', 'rond'],
  },
  {
    id: 15, name: 'Osmanthus Oolong', chinese: '桂花乌龙', category: 'Scented',
    region: 'Fujian / Taiwan', temp: 90, steepTime: '5-10s', gramsper100ml: 5,
    flavorNotes: ['osmanthus', 'peach', 'honeyed'],
    processing: 'Oolong base blended with osmanthus flowers',
    processing_nl: 'Oolong basis gemengd met osmanthus bloemen',
    brewingVessel: 'Gaiwan',
    terroir: 'Oolong base from Fujian/Taiwan mountains; osmanthus from warm southern gardens',
    terroir_nl: 'Oolong basis uit Fujian/Taiwan bergen; osmanthus uit warme zuidelijke tuinen',
    oxidation: 'Medium (30-40%)',
    funFact: 'Osmanthus flowers bloom for only about two weeks in autumn. The tiny golden flowers are mixed with oolong tea to create this fragrant blend prized since the Tang Dynasty.',
    funFact_nl: 'Osmanthus bloemen bloeien slechts ongeveer twee weken in de herfst. De kleine gouden bloemen worden gemengd met oolong thee om deze geurige blend te creëren, gewaardeerd sinds de Tang-dynastie.',
    flavorNotes_nl: ['osmanthus', 'perzik', 'honingachtig'],
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

const TEXTS = {
  en: {
    appTitle: "Emma's Tea House",
    appSubtitle: "~ 8-Bit Tea Academy ~",
    btnQuiz: "Tea Quiz",
    btnCollection: "Tea Collection",
    btnBrewing: "Brewing Simulator",
    btnAcademy: "Tea Academy",
    footerText: "Learn about 15 Chinese teas through quizzes & exploration",
    back: "Back",
    backToMenu: "Back to Menu",
    backToAcademy: "Back to Academy",
    backToCollection: "Back to Collection",
    next: "Next",
    continue: "Continue",
    nextQuestion: "Next Question",
    seeResults: "See Results",
    tryAgain: "Try Again",
    playAgain: "Play Again",
    quizTitle: "Tea Quiz",
    quizComplete: "Quiz Complete!",
    score: "Score",
    bestStreak: "Best Streak",
    totalCorrect: "Total Correct (all time)",
    rank: "Rank",
    level: "Level",
    normal: "Normal",
    expert: "Expert",
    expertModeOn: "Expert mode! Let's test your deep tea knowledge — terroir, oxidation, and more!",
    normalModeOn: "Normal mode — let's brush up on the tea basics!",
    quizStart: "Let's test your tea knowledge! Pick the correct answer.",
    nextQuestionMsg: "Next question! Think carefully...",
    letsGoAgain: "Let's go again! Ready?",
    question: "Question",
    collectionTitle: "Tea Collection",
    discovered: "discovered",
    teasDiscovered: "Teas Discovered",
    emptyCollection: "Your collection is empty! Head to the Tea Quiz to discover teas. Each correct answer unlocks a new tea!",
    answerQuizToDiscover: "Answer quiz to discover",
    region: "Region",
    temperature: "Temperature",
    steepTime: "Steep Time",
    leafAmount: "Leaf Amount",
    flavorNotes: "Flavor Notes",
    funFact: "Fun Fact",
    brewingTitle: "Brewing Simulator",
    chooseTea: "Choose a tea to begin your Gong Fu Cha journey!",
    selectTea: "Select a tea to brew:",
    step1Title: "Step 1: Heat the Water",
    step2Title: "Step 2: Warm the Gaiwan",
    step2Desc: "Pour hot water to warm the vessel, then discard.",
    pourAndSwirl: "Pour & Swirl",
    step3Title: "Step 3: Add Tea Leaves",
    step3Desc: "How many grams per 100ml?",
    step4Title: "Step 4: Rinse the Leaves (洗茶)",
    pourHotWater: "Pour Hot Water",
    rinsing: "Rinsing...",
    pourOverTeaPet: "Pour over Tea Pet",
    step5Title: "Step 5: First Infusion",
    pour: "POUR!",
    step6Title: "Step 6: Pour into Fairness Cup",
    pourTea: "Pour Tea",
    brewingResults: "Brewing Results",
    temperatureLabel: "Temperature:",
    leafAmountLabel: "Leaf amount:",
    steepTimeLabel: "Steep time:",
    stars: "Stars",
    brewAgain: "Brew Again",
    differentTea: "Different Tea",
    confirmTemperature: "Confirm Temperature",
    academyTitle: "Tea Academy",
    modules: "Modules",
    moduleComplete: "Module Complete!",
    almostThere: "Almost there!",
    correct: "correct",
    reviewLesson: "Review Lesson",
    tryQuizAgain: "Try Quiz Again",
    startQuiz: "Start Quiz",
    checkAnswer: "Check Answer",
    checkOrder: "Check Order",
    tapToReveal: "tap to reveal",
    tapToFlip: "tap to flip",
    swapHint: "Tap two items to swap their positions",
    completePrereqs: "Complete prerequisites first",
    academyWelcome: "Welcome to the Tea Academy! Let's start with the basics — tap a module to begin learning!",
    academyComplete: "You've completed all the modules! You're a true Tea Master!",
    academyProgress: "Great progress! Keep learning to prepare for the Tea Quiz!",
    quiz: "Quiz",
    perfectBrew: "A perfect brew! You could work at Moychay!",
    gettingThere: "Getting there! Practice makes a tea master.",
    keepTrying: "Don't worry, even the best tea masters had to start somewhere.",
    perfectTemp: "Perfect temperature for this tea!",
    tooHot: "That's too hot for this delicate tea — it'll scorch the leaves!",
    tooCold: "This tea needs hotter water to release its full flavor!",
    warmGaiwan: "We warm the gaiwan so the tea temperature stays consistent.",
    rightAmount: "Just the right amount — you have a good eye!",
    rinseMsg: "The first rinse wakes up the leaves — we'll pour this over the tea pet!",
    rinsePetMsg: "We pour the rinse water over the tea pet — it brings good luck and seasons the clay!",
    steepMsg: "Now pour the water and watch the leaves dance! Hit POUR when you think it's ready.",
    thinFlavor: "The leaves haven't opened yet — the flavor will be thin.",
    overSteeped: "Over-steeped! The tea will be more bitter than intended.",
    perfectTiming: "Perfect timing! The tea master emerges!",
    fairnessMsg: "The fairness cup ensures every guest gets the same taste.",
  },
  nl: {
    appTitle: "Emma's Theehuis",
    appSubtitle: "~ 8-Bit Thee Academie ~",
    btnQuiz: "Thee Quiz",
    btnCollection: "Thee Collectie",
    btnBrewing: "Zet Simulator",
    btnAcademy: "Thee Academie",
    footerText: "Leer over 15 Chinese theeën door quizzen & ontdekking",
    back: "Terug",
    backToMenu: "Terug naar Menu",
    backToAcademy: "Terug naar Academie",
    backToCollection: "Terug naar Collectie",
    next: "Volgende",
    continue: "Doorgaan",
    nextQuestion: "Volgende Vraag",
    seeResults: "Bekijk Resultaten",
    tryAgain: "Opnieuw Proberen",
    playAgain: "Opnieuw Spelen",
    quizTitle: "Thee Quiz",
    quizComplete: "Quiz Voltooid!",
    score: "Score",
    bestStreak: "Beste Reeks",
    totalCorrect: "Totaal Correct (alle tijd)",
    rank: "Rang",
    level: "Niveau",
    normal: "Normaal",
    expert: "Expert",
    expertModeOn: "Expert modus! Laten we je diepe theekennis testen — terroir, oxidatie en meer!",
    normalModeOn: "Normale modus — laten we de theebasis oefenen!",
    quizStart: "Laten we je theekennis testen! Kies het juiste antwoord.",
    nextQuestionMsg: "Volgende vraag! Denk goed na...",
    letsGoAgain: "Nog een keer! Klaar?",
    question: "Vraag",
    collectionTitle: "Thee Collectie",
    discovered: "ontdekt",
    teasDiscovered: "Theeën Ontdekt",
    emptyCollection: "Je collectie is leeg! Ga naar de Thee Quiz om theeën te ontdekken. Elk goed antwoord ontgrendelt een nieuwe thee!",
    answerQuizToDiscover: "Beantwoord quiz om te ontdekken",
    region: "Regio",
    temperature: "Temperatuur",
    steepTime: "Trektijd",
    leafAmount: "Hoeveelheid Blad",
    flavorNotes: "Smaaknotities",
    funFact: "Leuk Weetje",
    brewingTitle: "Zet Simulator",
    chooseTea: "Kies een thee om je Gong Fu Cha reis te beginnen!",
    selectTea: "Selecteer een thee om te zetten:",
    step1Title: "Stap 1: Verwarm het Water",
    step2Title: "Stap 2: Verwarm de Gaiwan",
    step2Desc: "Giet heet water om het vaatwerk te verwarmen, gooi daarna weg.",
    pourAndSwirl: "Giet & Draai",
    step3Title: "Stap 3: Voeg Theebladeren Toe",
    step3Desc: "Hoeveel gram per 100ml?",
    step4Title: "Stap 4: Spoel de Bladeren (洗茶)",
    pourHotWater: "Giet Heet Water",
    rinsing: "Spoelen...",
    pourOverTeaPet: "Giet over Thee Huisdier",
    step5Title: "Stap 5: Eerste Infusie",
    pour: "GIET!",
    step6Title: "Stap 6: Giet in Gelijkmatigheid Kopje",
    pourTea: "Giet Thee",
    brewingResults: "Zet Resultaten",
    temperatureLabel: "Temperatuur:",
    leafAmountLabel: "Hoeveelheid blad:",
    steepTimeLabel: "Trektijd:",
    stars: "Sterren",
    brewAgain: "Opnieuw Zetten",
    differentTea: "Andere Thee",
    confirmTemperature: "Bevestig Temperatuur",
    academyTitle: "Thee Academie",
    modules: "Modules",
    moduleComplete: "Module Voltooid!",
    almostThere: "Bijna!",
    correct: "correct",
    reviewLesson: "Les Herhalen",
    tryQuizAgain: "Quiz Opnieuw",
    startQuiz: "Start Quiz",
    checkAnswer: "Controleer Antwoord",
    checkOrder: "Controleer Volgorde",
    tapToReveal: "tik om te onthullen",
    tapToFlip: "tik om te draaien",
    swapHint: "Tik op twee items om ze te verwisselen",
    completePrereqs: "Voltooi eerst de vereisten",
    academyWelcome: "Welkom bij de Thee Academie! Laten we beginnen met de basis — tik op een module om te leren!",
    academyComplete: "Je hebt alle modules voltooid! Je bent een echte Thee Meester!",
    academyProgress: "Goede voortgang! Blijf leren om je voor te bereiden op de Thee Quiz!",
    quiz: "Quiz",
    perfectBrew: "Een perfecte zetting! Je zou bij Moychay kunnen werken!",
    gettingThere: "Het wordt beter! Oefening baart een theemeester.",
    keepTrying: "Geen zorgen, zelfs de beste theemeesters moesten ergens beginnen.",
    perfectTemp: "Perfecte temperatuur voor deze thee!",
    tooHot: "Dat is te heet voor deze delicate thee — het verschroeit de bladeren!",
    tooCold: "Deze thee heeft heter water nodig om de volle smaak vrij te geven!",
    warmGaiwan: "We verwarmen de gaiwan zodat de theetemperatuur gelijkmatig blijft.",
    rightAmount: "Precies de juiste hoeveelheid — je hebt een goed oog!",
    rinseMsg: "De eerste spoeling wekt de bladeren — we gieten dit over het theehuisdier!",
    rinsePetMsg: "We gieten het spoelwater over het theehuisdier — het brengt geluk en kruidt de klei!",
    steepMsg: "Giet nu het water en kijk hoe de bladeren dansen! Druk op GIET als je denkt dat het klaar is.",
    thinFlavor: "De bladeren zijn nog niet geopend — de smaak zal dun zijn.",
    overSteeped: "Te lang getrokken! De thee zal bitterder zijn dan bedoeld.",
    perfectTiming: "Perfecte timing! De theemeester verschijnt!",
    fairnessMsg: "Het gelijkmatigheidskopje zorgt ervoor dat elke gast dezelfde smaak krijgt.",
  }
};

const EMMA_MESSAGES = {
  en: {
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
  },
  nl: {
    welcome: [
      "Welkom in mijn theehuis! Ik ben Emma, en ik leer je alles over Chinese thee!",
      "Ni hao! Klaar om de wonderlijke wereld van Chinese thee te ontdekken?",
      "Kom binnen, kom binnen! Het water is heet en de thee is klaar!",
    ],
    correct: [
      "Uitstekend! Je kent je thee goed!",
      "Dat klopt! Je wordt een echte theefijnproever!",
      "Perfect antwoord! Je theekennis is indrukwekkend!",
      "Correct! De theegeesten zijn tevreden!",
    ],
    wrong: [
      "Niet helemaal, maar geen zorgen — elke theemeester begint ergens!",
      "Hmm, dat klopt niet. Laat me het uitleggen...",
      "Bijna! Maar laat me het juiste antwoord met je delen.",
      "Geen zorgen! Theekennis heeft tijd nodig om te trekken!",
    ],
    streak: [
      "Geweldige reeks! Je bent on fire — als een perfecte houtskoolbranding!",
      "Ongelooflijk! Zelfs het theehuisdier is onder de indruk!",
      "Wat een reeks! Je zou je eigen theehuis kunnen openen!",
    ],
    levelUp: {
      Apprentice: "Je hebt het Leerling niveau bereikt! Je leert de weg van de thee!",
      'Tea Guide': "Thee Gids! Je zou nu een theeceremonie kunnen leiden!",
      'Tea Master': "THEE MEESTER! Ik buig voor je ultieme theekennis!",
    },
  },
};

// ═══════════════════════════════════════════════════════════
// SECTION 1.5: TEA LEARNING MODULE DATA
// ═══════════════════════════════════════════════════════════

const LESSON_DATA = [
  {
    id: 'tea-families',
    title: 'Tea Families',
    title_nl: 'Thee Families',
    description: 'The 7 Chinese tea categories',
    description_nl: 'De 7 Chinese thee categorieën',
    requiredModules: [],
    steps: [
      {
        emmaText: "Welcome! Let me introduce you to the 7 families of Chinese tea. Tap each card to learn about them!",
        emmaText_nl: "Welkom! Laat me je voorstellen aan de 7 families van Chinese thee. Tik op elke kaart om meer te leren!",
        type: 'tapReveal',
        config: { cards: [
          { front: 'Green Tea', front_nl: 'Groene Thee', back: 'Unoxidized (0%). Fresh, vegetal flavors. Pan-fired or steamed to halt oxidation immediately.', back_nl: 'Niet geoxideerd (0%). Fris, plantaardige smaken. Gebakken of gestoomd om oxidatie onmiddellijk te stoppen.', category: 'Green' },
          { front: 'White Tea', front_nl: 'Witte Thee', back: 'Minimal processing (5-10% oxidation). Simply withered and sun-dried. Delicate and subtle.', back_nl: 'Minimale verwerking (5-10% oxidatie). Simpelweg verwelkt en zongedroogd. Delicaat en subtiel.', category: 'White' },
          { front: 'Yellow Tea', front_nl: 'Gele Thee', back: 'Lightly oxidized (10-15%). A rare tea with a unique "sealed yellowing" step that mellows the flavor.', back_nl: 'Licht geoxideerd (10-15%). Een zeldzame thee met een unieke "verzegelde vergeling" stap die de smaak verzacht.', category: 'Yellow' },
          { front: 'Oolong Tea', front_nl: 'Oolong Thee', back: 'Partially oxidized (25-70%). The widest range — from light and floral to dark and roasted.', back_nl: 'Gedeeltelijk geoxideerd (25-70%). Het breedste bereik — van licht en bloemig tot donker en geroosterd.', category: 'Oolong' },
          { front: 'Black Tea', front_nl: 'Zwarte Thee', back: 'Fully oxidized (100%). Bold, malty, and robust. Called "red tea" (hong cha) in Chinese.', back_nl: 'Volledig geoxideerd (100%). Krachtig, moutig en robuust. In het Chinees "rode thee" (hong cha) genoemd.', category: 'Black' },
          { front: 'Pu-erh Tea', front_nl: 'Pu-erh Thee', back: 'Aged or fermented. Can be raw (sheng) or ripe (shu). The only tea that improves with decades of aging.', back_nl: 'Verouderd of gefermenteerd. Kan rauw (sheng) of rijp (shu) zijn. De enige thee die verbetert met decennia van veroudering.', category: 'Pu-erh' },
          { front: 'Scented Tea', front_nl: 'Geparfumeerde Thee', back: 'A base tea (usually green or oolong) scented with fresh flowers like jasmine or osmanthus.', back_nl: 'Een basisthee (meestal groen of oolong) geparfumeerd met verse bloemen zoals jasmijn of osmanthus.', category: 'Scented' },
        ]}
      },
      {
        emmaText: "Oxidation is the key! It's what makes each tea family unique. Can you sort these from least to most oxidized?",
        emmaText_nl: "Oxidatie is de sleutel! Het is wat elke theefamilie uniek maakt. Kun je deze sorteren van minst tot meest geoxideerd?",
        type: 'sortExercise',
        config: {
          items: ['Green (0%)', 'White (5-10%)', 'Yellow (10-15%)', 'Oolong (25-70%)', 'Black (100%)', 'Pu-erh (varies)'],
          correctOrder: ['Green (0%)', 'White (5-10%)', 'Yellow (10-15%)', 'Oolong (25-70%)', 'Black (100%)', 'Pu-erh (varies)'],
        }
      },
      {
        emmaText: "Each family has signature flavors. Can you match the tea family to its hallmark taste?",
        emmaText_nl: "Elke familie heeft kenmerkende smaken. Kun je de theefamilie aan zijn kenmerkende smaak koppelen?",
        type: 'matchPairs',
        config: { pairs: [
          { left: 'Green', right: 'Vegetal & fresh', right_nl: 'Plantaardig & fris' },
          { left: 'Oolong', right: 'Floral & toasty', right_nl: 'Bloemig & geroosterd' },
          { left: 'Black', right: 'Malty & bold', right_nl: 'Moutig & krachtig' },
          { left: 'White', right: 'Delicate & sweet', right_nl: 'Delicaat & zoet' },
          { left: 'Pu-erh', right: 'Earthy & smooth', right_nl: 'Aards & zacht' },
        ]}
      },
      {
        emmaText: "Now let's see how leaves become each type of tea! Tap to reveal the processing method.",
        emmaText_nl: "Laten we nu zien hoe bladeren elk type thee worden! Tik om de verwerkingsmethode te onthullen.",
        type: 'tapReveal',
        config: { cards: [
          { front: 'Pan-fired in a wok', front_nl: 'Gebakken in een wok', back: 'This makes Green Tea! Heat stops oxidation immediately.', back_nl: 'Dit maakt Groene Thee! Hitte stopt oxidatie onmiddellijk.', category: 'Green' },
          { front: 'Withered and sun-dried', front_nl: 'Verwelkt en zongedroogd', back: 'This makes White Tea! Minimal handling preserves natural character.', back_nl: 'Dit maakt Witte Thee! Minimale behandeling behoudt het natuurlijke karakter.', category: 'White' },
          { front: 'Sealed yellowing (men huang)', front_nl: 'Verzegelde vergeling (men huang)', back: 'This makes Yellow Tea! Damp leaves wrapped in cloth create a unique mellow flavor.', back_nl: 'Dit maakt Gele Thee! Vochtige bladeren gewikkeld in doek creëren een unieke zachte smaak.', category: 'Yellow' },
          { front: 'Partial oxidation + roasting', front_nl: 'Gedeeltelijke oxidatie + roostering', back: 'This makes Oolong Tea! The master controls oxidation level for incredible variety.', back_nl: 'Dit maakt Oolong Thee! De meester controleert het oxidatieniveau voor ongelofelijke variatie.', category: 'Oolong' },
          { front: 'Full oxidation + slow drying', front_nl: 'Volledige oxidatie + langzaam drogen', back: 'This makes Black Tea! Complete oxidation creates bold, rich flavors.', back_nl: 'Dit maakt Zwarte Thee! Volledige oxidatie creëert krachtige, rijke smaken.', category: 'Black' },
          { front: 'Aged or wet-piled fermentation', front_nl: 'Verouderd of nat gestapelde fermentatie', back: 'This makes Pu-erh Tea! Time (or accelerated fermentation) transforms the leaf.', back_nl: 'Dit maakt Pu-erh Thee! Tijd (of versnelde fermentatie) transformeert het blad.', category: 'Pu-erh' },
        ]}
      },
      {
        emmaText: "Scented teas are special! They combine a base tea with fresh flowers. Let's test what you know!",
        emmaText_nl: "Geparfumeerde theeën zijn speciaal! Ze combineren een basisthee met verse bloemen. Laten we testen wat je weet!",
        type: 'fillInBlank',
        config: { questions: [
          { statement: 'Jasmine Pearl uses a ___ tea base', statement_nl: 'Jasmine Pearl gebruikt een ___ theebasis', choices: ['Black', 'Green', 'Oolong', 'White'], choices_nl: ['Zwart', 'Groen', 'Oolong', 'Wit'], correctIndex: 1, explanation: 'Jasmine Pearl is made with green tea leaves scented with fresh jasmine flowers!', explanation_nl: 'Jasmine Pearl wordt gemaakt met groene theebladeren geparfumeerd met verse jasmijnbloemen!' },
          { statement: 'Osmanthus Oolong combines osmanthus flowers with ___ tea', statement_nl: 'Osmanthus Oolong combineert osmanthus bloemen met ___ thee', choices: ['Green', 'Black', 'Oolong', 'White'], choices_nl: ['Groen', 'Zwart', 'Oolong', 'Wit'], correctIndex: 2, explanation: 'The name says it all — Osmanthus Oolong uses an oolong base!', explanation_nl: 'De naam zegt het al — Osmanthus Oolong gebruikt een oolong basis!' },
        ]}
      },
    ],
    quiz: [
      { prompt: 'What type of tea is Dragon Well (Longjing)?', prompt_nl: 'Wat voor soort thee is Dragon Well (Longjing)?', choices: ['Black', 'Green', 'Oolong', 'White'], choices_nl: ['Zwart', 'Groen', 'Oolong', 'Wit'], correctIndex: 1, explanation: 'Dragon Well is a pan-fired Green tea from Hangzhou, Zhejiang.', explanation_nl: 'Dragon Well is een gebakken Groene thee uit Hangzhou, Zhejiang.' },
      { prompt: 'Which tea family has the widest range of oxidation levels?', prompt_nl: 'Welke theefamilie heeft het breedste bereik aan oxidatieniveaus?', choices: ['Green', 'White', 'Oolong', 'Black'], choices_nl: ['Groen', 'Wit', 'Oolong', 'Zwart'], correctIndex: 2, explanation: 'Oolong ranges from 25-70% oxidation — light and floral to dark and roasted!', explanation_nl: 'Oolong varieert van 25-70% oxidatie — licht en bloemig tot donker en geroosterd!' },
      { prompt: 'What is the hallmark flavor of Pu-erh tea?', prompt_nl: 'Wat is de kenmerkende smaak van Pu-erh thee?', choices: ['Vegetal & fresh', 'Malty & bold', 'Earthy & smooth', 'Floral & toasty'], choices_nl: ['Plantaardig & fris', 'Moutig & krachtig', 'Aards & zacht', 'Bloemig & geroosterd'], correctIndex: 2, explanation: 'Pu-erh is known for its earthy, smooth character from aging or fermentation.', explanation_nl: 'Pu-erh staat bekend om zijn aardse, zachte karakter door veroudering of fermentatie.' },
      { prompt: 'Which processing step is unique to Yellow tea?', prompt_nl: 'Welke verwerkingsstap is uniek voor Gele thee?', choices: ['Pan-firing', 'Smoke-drying', 'Sealed yellowing', 'Wet-piling'], choices_nl: ['Bakken', 'Rookdrogen', 'Verzegelde vergeling', 'Nat stapelen'], correctIndex: 2, explanation: 'Men huang (sealed yellowing) is the step that makes yellow tea unique!', explanation_nl: 'Men huang (verzegelde vergeling) is de stap die gele thee uniek maakt!' },
    ]
  },
  {
    id: 'regions-terroir',
    title: 'Regions & Terroir',
    title_nl: 'Regio\'s & Terroir',
    description: 'Where teas grow and why it matters',
    description_nl: 'Waar theeën groeien en waarom het uitmaakt',
    requiredModules: ['tea-families'],
    steps: [
      {
        emmaText: "China is vast, and each region gives its tea a unique character! The soil, climate, and altitude all matter — we call this terroir. Let me show you the major tea regions!",
        emmaText_nl: "China is enorm, en elke regio geeft zijn thee een uniek karakter! De grond, het klimaat en de hoogte doen er allemaal toe — we noemen dit terroir. Laat me je de belangrijkste theeregio's laten zien!",
        type: 'narrative',
        config: {}
      },
      {
        emmaText: "Fujian province is a tea powerhouse! So many famous teas come from here. Tap each to learn more!",
        emmaText_nl: "De provincie Fujian is een thee krachtpatser! Zoveel beroemde theeën komen hiervandaan. Tik op elk om meer te leren!",
        type: 'tapReveal',
        config: { cards: [
          { front: `${TEA_DATA[2].name}`, back: `${TEA_DATA[2].region}. ${TEA_DATA[2].terroir}`, back_nl: `${TEA_DATA[2].region}. ${TEA_DATA[2].terroir_nl}`, category: 'Oolong' },
          { front: `${TEA_DATA[3].name}`, back: `${TEA_DATA[3].region}. ${TEA_DATA[3].terroir}`, back_nl: `${TEA_DATA[3].region}. ${TEA_DATA[3].terroir_nl}`, category: 'Oolong' },
          { front: `${TEA_DATA[8].name}`, back: `${TEA_DATA[8].region}. ${TEA_DATA[8].terroir}`, back_nl: `${TEA_DATA[8].region}. ${TEA_DATA[8].terroir_nl}`, category: 'White' },
          { front: `${TEA_DATA[6].name}`, back: `${TEA_DATA[6].region}. ${TEA_DATA[6].terroir}`, back_nl: `${TEA_DATA[6].region}. ${TEA_DATA[6].terroir_nl}`, category: 'Black' },
          { front: `${TEA_DATA[13].name}`, back: `${TEA_DATA[13].region}. ${TEA_DATA[13].terroir}`, back_nl: `${TEA_DATA[13].region}. ${TEA_DATA[13].terroir_nl}`, category: 'Scented' },
        ]}
      },
      {
        emmaText: "Yunnan is home to ancient tea trees — some over 1,000 years old! Its unique terroir produces very special teas.",
        emmaText_nl: "Yunnan is de thuisbasis van oude theebomen — sommige meer dan 1.000 jaar oud! Het unieke terroir produceert zeer bijzondere theeën.",
        type: 'tapReveal',
        config: { cards: [
          { front: `${TEA_DATA[7].name}`, back: `${TEA_DATA[7].region}. ${TEA_DATA[7].terroir}`, back_nl: `${TEA_DATA[7].region}. ${TEA_DATA[7].terroir_nl}`, category: 'Black' },
          { front: `${TEA_DATA[10].name}`, back: `${TEA_DATA[10].region}. ${TEA_DATA[10].terroir}`, back_nl: `${TEA_DATA[10].region}. ${TEA_DATA[10].terroir_nl}`, category: 'Pu-erh' },
          { front: `${TEA_DATA[11].name}`, back: `${TEA_DATA[11].region}. ${TEA_DATA[11].terroir}`, back_nl: `${TEA_DATA[11].region}. ${TEA_DATA[11].terroir_nl}`, category: 'Pu-erh' },
        ]}
      },
      {
        emmaText: "Terroir shapes flavor! Can you match the terroir description to the right tea?",
        emmaText_nl: "Terroir vormt smaak! Kun je de terroirbeschrijving aan de juiste thee koppelen?",
        type: 'matchPairs',
        config: { pairs: [
          { left: TEA_DATA[3].name, right: 'Rocky crevices in Wuyi cliffs', right_nl: 'Rotsachtige spleten in Wuyi kliffen' },
          { left: TEA_DATA[8].name, right: 'Coastal hillsides with ocean breezes', right_nl: 'Kust hellingen met zeebries' },
          { left: TEA_DATA[0].name, right: 'Misty lake region with mineral-rich soil', right_nl: 'Mistig meergebied met mineraalrijke grond' },
          { left: TEA_DATA[12].name, right: 'Island in Dongting Lake with fertile soil', right_nl: 'Eiland in Dongting Meer met vruchtbare grond' },
        ]}
      },
      {
        emmaText: "Now sort these teas by their home region! Fujian, Yunnan, or somewhere else?",
        emmaText_nl: "Sorteer nu deze theeën op hun thuisregio! Fujian, Yunnan, of ergens anders?",
        type: 'sortExercise',
        config: {
          items: [TEA_DATA[2].name, TEA_DATA[7].name, TEA_DATA[0].name, TEA_DATA[10].name, TEA_DATA[5].name, TEA_DATA[12].name],
          buckets: ['Fujian', 'Yunnan', 'Other'],
          buckets_nl: ['Fujian', 'Yunnan', 'Anders'],
          correctBuckets: { [TEA_DATA[2].name]: 'Fujian', [TEA_DATA[7].name]: 'Yunnan', [TEA_DATA[0].name]: 'Other', [TEA_DATA[10].name]: 'Yunnan', [TEA_DATA[5].name]: 'Other', [TEA_DATA[12].name]: 'Other' },
        }
      },
    ],
    quiz: [
      { prompt: `Where is ${TEA_DATA[3].name} from?`, prompt_nl: `Waar komt ${TEA_DATA[3].name} vandaan?`, choices: ['Yunnan', 'Wuyi Mountains, Fujian', 'Hangzhou, Zhejiang', 'Anxi, Fujian'], correctIndex: 1, explanation: `${TEA_DATA[3].name} comes from the Wuyi Mountains in Fujian province.`, explanation_nl: `${TEA_DATA[3].name} komt uit de Wuyi bergen in de provincie Fujian.` },
      { prompt: 'Which region is known for ancient tea trees over 1,000 years old?', prompt_nl: 'Welke regio staat bekend om oude theebomen van meer dan 1.000 jaar oud?', choices: ['Fujian', 'Zhejiang', 'Yunnan', 'Hunan'], correctIndex: 2, explanation: 'Yunnan is home to ancient tea forests with trees over a millennium old!', explanation_nl: 'Yunnan is de thuisbasis van oude theebossen met bomen van meer dan een millennium oud!' },
      { prompt: `What terroir feature defines ${TEA_DATA[3].name}?`, prompt_nl: `Welk terroirkenmerk definieert ${TEA_DATA[3].name}?`, choices: ['Coastal hillsides', 'Mineral-rich rocky crevices', 'Ancient forests', 'Lake island'], choices_nl: ['Kust hellingen', 'Mineraalrijke rotsachtige spleten', 'Oude bossen', 'Meer eiland'], correctIndex: 1, explanation: `${TEA_DATA[3].name} grows in mineral-rich rocky crevices (yan cha) in the Wuyi cliffs.`, explanation_nl: `${TEA_DATA[3].name} groeit in mineraalrijke rotsachtige spleten (yan cha) in de Wuyi kliffen.` },
      { prompt: `Which tea grows on a small island in Dongting Lake?`, prompt_nl: `Welke thee groeit op een klein eiland in het Dongting Meer?`, choices: [TEA_DATA[0].name, TEA_DATA[12].name, TEA_DATA[8].name, TEA_DATA[1].name], correctIndex: 1, explanation: `${TEA_DATA[12].name} grows on Junshan Island in Dongting Lake, Hunan.`, explanation_nl: `${TEA_DATA[12].name} groeit op het eiland Junshan in het Dongting Meer, Hunan.` },
    ]
  },
  {
    id: 'brewing-mastery',
    title: 'Brewing Mastery',
    title_nl: 'Zet Meesterschap',
    description: 'Temperature, leaf amount & vessels',
    description_nl: 'Temperatuur, hoeveelheid blad & vaatwerk',
    requiredModules: ['tea-families'],
    steps: [
      {
        emmaText: "Delicate teas need cooler water, while robust teas love the heat! Sort these teas from coolest to hottest brewing temperature.",
        emmaText_nl: "Delicate theeën hebben koeler water nodig, terwijl robuuste theeën van hitte houden! Sorteer deze theeën van koudst naar heetst zettemperatuur.",
        type: 'sortExercise',
        config: {
          items: [`${TEA_DATA[1].name} (${TEA_DATA[1].temp}°C)`, `${TEA_DATA[8].name} (${TEA_DATA[8].temp}°C)`, `${TEA_DATA[2].name} (${TEA_DATA[2].temp}°C)`, `${TEA_DATA[4].name} (${TEA_DATA[4].temp}°C)`, `${TEA_DATA[11].name} (${TEA_DATA[11].temp}°C)`],
          correctOrder: [`${TEA_DATA[1].name} (${TEA_DATA[1].temp}°C)`, `${TEA_DATA[8].name} (${TEA_DATA[8].temp}°C)`, `${TEA_DATA[2].name} (${TEA_DATA[2].temp}°C)`, `${TEA_DATA[4].name} (${TEA_DATA[4].temp}°C)`, `${TEA_DATA[11].name} (${TEA_DATA[11].temp}°C)`],
        }
      },
      {
        emmaText: "Different teas need different amounts of leaf. Match each tea to its ideal grams per 100ml!",
        emmaText_nl: "Verschillende theeën hebben verschillende hoeveelheden blad nodig. Koppel elke thee aan het ideale aantal gram per 100ml!",
        type: 'matchPairs',
        config: { pairs: [
          { left: TEA_DATA[0].name, right: `${TEA_DATA[0].gramsper100ml}g / 100ml` },
          { left: TEA_DATA[3].name, right: `${TEA_DATA[3].gramsper100ml}g / 100ml` },
          { left: TEA_DATA[8].name, right: `${TEA_DATA[8].gramsper100ml}g / 100ml` },
          { left: TEA_DATA[10].name, right: `${TEA_DATA[10].gramsper100ml}g / 100ml` },
        ]}
      },
      {
        emmaText: "There are three main brewing vessels in Chinese tea culture. Tap each to learn when and why to use it!",
        emmaText_nl: "Er zijn drie belangrijke zetvaatwerken in de Chinese theecultuur. Tik op elk om te leren wanneer en waarom je het gebruikt!",
        type: 'tapReveal',
        config: { cards: [
          { front: 'Glass Cup', front_nl: 'Glazen Kopje', back: 'Best for delicate green and yellow teas. Lets you watch the beautiful leaves unfurl and dance!', back_nl: 'Het beste voor delicate groene en gele theeën. Laat je de mooie bladeren zien ontvouwen en dansen!', category: 'Green' },
          { front: 'Gaiwan', back: 'The most versatile vessel! A lidded bowl perfect for oolongs, whites, and scented teas. Great for gong fu brewing.', back_nl: 'Het meest veelzijdige vaatwerk! Een kom met deksel, perfect voor oolongs, witte en geparfumeerde theeën. Geweldig voor gong fu zetten.', category: 'Oolong' },
          { front: 'Yixing Teapot', front_nl: 'Yixing Theepot', back: 'Unglazed clay that absorbs tea oils over time. Best for bold teas like Pu-erh and heavy oolongs. Each pot is dedicated to one type of tea!', back_nl: 'Ongeglazuurde klei die thee-oliën absorbeert in de loop van de tijd. Het beste voor krachtige theeën zoals Pu-erh en zware oolongs. Elke pot is gewijd aan één type thee!', category: 'Pu-erh' },
        ]}
      },
      {
        emmaText: "Now match each tea to its ideal brewing vessel!",
        emmaText_nl: "Koppel nu elke thee aan het ideale zetvaatwerk!",
        type: 'matchPairs',
        config: { pairs: [
          { left: TEA_DATA[0].name, right: TEA_DATA[0].brewingVessel },
          { left: TEA_DATA[2].name, right: TEA_DATA[2].brewingVessel },
          { left: TEA_DATA[3].name, right: TEA_DATA[3].brewingVessel },
          { left: TEA_DATA[10].name, right: TEA_DATA[10].brewingVessel },
        ]}
      },
      {
        emmaText: "In gong fu cha, steeps are quick — just a few seconds! Let's see if you know the times.",
        emmaText_nl: "Bij gong fu cha zijn de trektijden kort — slechts een paar seconden! Laten we zien of je de tijden kent.",
        type: 'fillInBlank',
        config: { questions: [
          { statement: `${TEA_DATA[8].name} first steep is about ___`, statement_nl: `${TEA_DATA[8].name} eerste trek is ongeveer ___`, choices: ['5-10s', '10-15s', '30-60s', '90-120s'], correctIndex: 1, explanation: `${TEA_DATA[8].name} needs ${TEA_DATA[8].steepTime} — the buds are delicate and need a gentle first steep!`, explanation_nl: `${TEA_DATA[8].name} heeft ${TEA_DATA[8].steepTime} nodig — de knoppen zijn delicaat en hebben een zachte eerste trek nodig!` },
          { statement: `${TEA_DATA[3].name} first steep is about ___`, statement_nl: `${TEA_DATA[3].name} eerste trek is ongeveer ___`, choices: ['5-8s', '20-30s', '45-60s', '90s+'], correctIndex: 0, explanation: `${TEA_DATA[3].name} steeps for just ${TEA_DATA[3].steepTime} in gong fu style — quick and intense!`, explanation_nl: `${TEA_DATA[3].name} trekt slechts ${TEA_DATA[3].steepTime} in gong fu stijl — snel en intens!` },
          { statement: `${TEA_DATA[0].name} first steep is about ___`, statement_nl: `${TEA_DATA[0].name} eerste trek is ongeveer ___`, choices: ['1-2s', '5-10s', '30-45s', '60-90s'], correctIndex: 1, explanation: `${TEA_DATA[0].name} steeps for ${TEA_DATA[0].steepTime} — green teas are brewed quickly at a lower temperature!`, explanation_nl: `${TEA_DATA[0].name} trekt ${TEA_DATA[0].steepTime} — groene theeën worden snel gezet bij een lagere temperatuur!` },
        ]}
      },
    ],
    quiz: [
      { prompt: `What temperature is best for ${TEA_DATA[1].name}?`, prompt_nl: `Welke temperatuur is het beste voor ${TEA_DATA[1].name}?`, choices: ['75°C', '85°C', '95°C', '100°C'], correctIndex: 0, explanation: `${TEA_DATA[1].name} is a delicate green tea brewed at ${TEA_DATA[1].temp}°C.`, explanation_nl: `${TEA_DATA[1].name} is een delicate groene thee die gezet wordt op ${TEA_DATA[1].temp}°C.` },
      { prompt: 'Which vessel is best for Pu-erh tea?', prompt_nl: 'Welk vaatwerk is het beste voor Pu-erh thee?', choices: ['Glass cup', 'Gaiwan', 'Yixing teapot', 'Metal pot'], choices_nl: ['Glazen kopje', 'Gaiwan', 'Yixing theepot', 'Metalen pot'], correctIndex: 2, explanation: 'Yixing clay absorbs tea oils over time, making it perfect for bold Pu-erh!', explanation_nl: 'Yixing klei absorbeert thee-oliën in de loop van de tijd, waardoor het perfect is voor krachtige Pu-erh!' },
      { prompt: `How many grams per 100ml for ${TEA_DATA[3].name}?`, prompt_nl: `Hoeveel gram per 100ml voor ${TEA_DATA[3].name}?`, choices: ['3g', '5g', '7g', '10g'], correctIndex: 2, explanation: `${TEA_DATA[3].name} uses ${TEA_DATA[3].gramsper100ml}g per 100ml — oolongs need a generous amount!`, explanation_nl: `${TEA_DATA[3].name} gebruikt ${TEA_DATA[3].gramsper100ml}g per 100ml — oolongs hebben een ruime hoeveelheid nodig!` },
      { prompt: 'Why use a glass cup for green tea?', prompt_nl: 'Waarom gebruik je een glazen kopje voor groene thee?', choices: ['It keeps tea hotter', 'You can watch the leaves dance', 'It adds flavor', 'It brews faster'], choices_nl: ['Het houdt thee warmer', 'Je kunt de bladeren zien dansen', 'Het voegt smaak toe', 'Het zet sneller'], correctIndex: 1, explanation: 'A glass cup lets you enjoy the beautiful sight of green tea leaves unfurling!', explanation_nl: 'Een glazen kopje laat je genieten van het mooie gezicht van groene theebladeren die zich ontvouwen!' },
    ]
  },
  {
    id: 'processing-craft',
    title: 'Processing & Craft',
    title_nl: 'Verwerking & Ambacht',
    description: 'How leaves become tea',
    description_nl: 'Hoe bladeren thee worden',
    requiredModules: ['regions-terroir', 'brewing-mastery'],
    steps: [
      {
        emmaText: "Every tea starts as the same green leaf from the Camellia sinensis plant. It's the processing that makes each tea unique! The key steps are: withering, rolling, oxidation, firing, and drying.",
        emmaText_nl: "Elke thee begint als hetzelfde groene blad van de Camellia sinensis plant. Het is de verwerking die elke thee uniek maakt! De belangrijkste stappen zijn: verwelken, rollen, oxidatie, verhitten en drogen.",
        type: 'narrative',
        config: {}
      },
      {
        emmaText: "Green tea is all about stopping oxidation quickly! But there are different ways to do it. Tap to compare!",
        emmaText_nl: "Bij groene thee draait alles om het snel stoppen van oxidatie! Maar er zijn verschillende manieren om dit te doen. Tik om te vergelijken!",
        type: 'tapReveal',
        config: { cards: [
          { front: `${TEA_DATA[0].name}`, back: `${TEA_DATA[0].processing}. This creates its signature flat, smooth leaves and chestnut flavor.`, back_nl: `${TEA_DATA[0].processing_nl}. Dit creëert de kenmerkende platte, gladde bladeren en kastanjesmaak.`, category: 'Green' },
          { front: `${TEA_DATA[1].name}`, back: `${TEA_DATA[1].processing}. The tiny spiral-shaped leaves have a fruity, floral character.`, back_nl: `${TEA_DATA[1].processing_nl}. De kleine spiraalvormige bladeren hebben een fruitig, bloemig karakter.`, category: 'Green' },
        ]}
      },
      {
        emmaText: "Oolong is the art of partial oxidation — the master decides exactly when to stop! Match each oolong to its oxidation and roast level.",
        emmaText_nl: "Oolong is de kunst van gedeeltelijke oxidatie — de meester beslist precies wanneer te stoppen! Koppel elke oolong aan het oxidatie- en roosterniveau.",
        type: 'matchPairs',
        config: { pairs: [
          { left: TEA_DATA[2].name, right: TEA_DATA[2].oxidation },
          { left: TEA_DATA[3].name, right: TEA_DATA[3].oxidation },
          { left: TEA_DATA[4].name, right: TEA_DATA[4].oxidation },
        ]}
      },
      {
        emmaText: "Pu-erh is alive! It transforms over time. There are two very different types. Tap to explore!",
        emmaText_nl: "Pu-erh leeft! Het transformeert in de loop van de tijd. Er zijn twee heel verschillende types. Tik om te ontdekken!",
        type: 'tapReveal',
        config: { cards: [
          { front: `${TEA_DATA[10].name}`, back: `${TEA_DATA[10].processing}. Starts astringent and floral, evolves over decades into something rich and complex. ${TEA_DATA[10].oxidation}.`, back_nl: `${TEA_DATA[10].processing_nl}. Begint astringent en bloemig, evolueert over decennia tot iets rijks en complex. ${TEA_DATA[10].oxidation}.`, category: 'Pu-erh' },
          { front: `${TEA_DATA[11].name}`, back: `${TEA_DATA[11].processing}. Invented in 1973 to simulate decades of aging in just 45-60 days! ${TEA_DATA[11].oxidation}.`, back_nl: `${TEA_DATA[11].processing_nl}. Uitgevonden in 1973 om decennia van veroudering te simuleren in slechts 45-60 dagen! ${TEA_DATA[11].oxidation}.`, category: 'Pu-erh' },
        ]}
      },
      {
        emmaText: "Yellow tea has a secret step that no other tea family uses!",
        emmaText_nl: "Gele thee heeft een geheime stap die geen andere theefamilie gebruikt!",
        type: 'fillInBlank',
        config: { questions: [
          { statement: "Yellow tea's unique processing step is called ___", statement_nl: "De unieke verwerkingsstap van gele thee heet ___", choices: ['Pan-firing', 'Sealed yellowing (men huang)', 'Wet-piling', 'Smoke-drying'], choices_nl: ['Bakken', 'Verzegelde vergeling (men huang)', 'Nat stapelen', 'Rookdrogen'], correctIndex: 1, explanation: 'Men huang (sealed yellowing) wraps damp leaves in cloth, creating a mellow, sweet flavor unique to yellow tea!', explanation_nl: 'Men huang (verzegelde vergeling) wikkelt vochtige bladeren in doek, waardoor een zachte, zoete smaak ontstaat die uniek is voor gele thee!' },
          { statement: `${TEA_DATA[6].name} gets its smoky flavor from ___`, statement_nl: `${TEA_DATA[6].name} krijgt zijn rokerige smaak van ___`, choices: ['Charcoal roasting', 'Sun exposure', 'Smoke-drying over pinewood fires', 'Adding spices'], choices_nl: ['Houtskool roosteren', 'Blootstelling aan de zon', 'Rookdrogen boven dennenhout vuren', 'Kruiden toevoegen'], correctIndex: 2, explanation: `${TEA_DATA[6].name} is smoke-dried over pinewood fires — it's how this legendary tea was born!`, explanation_nl: `${TEA_DATA[6].name} wordt rookgedroogd boven dennenhout vuren — zo werd deze legendarische thee geboren!` },
        ]}
      },
      {
        emmaText: "Can you identify which tea uses each processing method?",
        emmaText_nl: "Kun je identificeren welke thee elke verwerkingsmethode gebruikt?",
        type: 'matchPairs',
        config: { pairs: [
          { left: TEA_DATA[0].processing, right: TEA_DATA[0].name },
          { left: TEA_DATA[6].processing, right: TEA_DATA[6].name },
          { left: TEA_DATA[11].processing, right: TEA_DATA[11].name },
          { left: TEA_DATA[12].processing, right: TEA_DATA[12].name },
        ]}
      },
    ],
    quiz: [
      { prompt: `What is ${TEA_DATA[0].name}'s processing method?`, prompt_nl: `Wat is de verwerkingsmethode van ${TEA_DATA[0].name}?`, choices: ['Hand-rolled and pan-fired', 'Pan-fired in a wok to halt oxidation', 'Withered and sun-dried', 'Smoke-dried over pinewood fires'], choices_nl: ['Met de hand gerold en gebakken', 'Gebakken in een wok om oxidatie te stoppen', 'Verwelkt en zongedroogd', 'Rookgedroogd boven dennenhout vuren'], correctIndex: 1, explanation: `${TEA_DATA[0].name} is pan-fired in a wok by hand to immediately stop oxidation.`, explanation_nl: `${TEA_DATA[0].name} wordt met de hand gebakken in een wok om oxidatie onmiddellijk te stoppen.` },
      { prompt: `What is the oxidation level of ${TEA_DATA[3].name}?`, prompt_nl: `Wat is het oxidatieniveau van ${TEA_DATA[3].name}?`, choices: ['Unoxidized (0%)', 'Light-medium (25-40%)', 'Heavy (60-70%)', 'Fully oxidized (100%)'], correctIndex: 2, explanation: `${TEA_DATA[3].name} undergoes heavy oxidation at 60-70%, followed by roasting.`, explanation_nl: `${TEA_DATA[3].name} ondergaat zware oxidatie op 60-70%, gevolgd door roostering.` },
      { prompt: 'Which tea is made by wet-piling (wo dui) for accelerated fermentation?', prompt_nl: 'Welke thee wordt gemaakt door nat stapelen (wo dui) voor versnelde fermentatie?', choices: [TEA_DATA[10].name, TEA_DATA[11].name, TEA_DATA[3].name, TEA_DATA[12].name], correctIndex: 1, explanation: `${TEA_DATA[11].name} uses wet-piling to simulate decades of aging in just 45-60 days!`, explanation_nl: `${TEA_DATA[11].name} gebruikt nat stapelen om decennia van veroudering te simuleren in slechts 45-60 dagen!` },
      { prompt: 'What makes Lapsang Souchong unique among black teas?', prompt_nl: 'Wat maakt Lapsang Souchong uniek onder zwarte theeën?', choices: ['It uses ancient tree leaves', 'It is smoke-dried over pinewood fires', 'It undergoes sealed yellowing', 'It is partially oxidized'], choices_nl: ['Het gebruikt bladeren van oude bomen', 'Het wordt rookgedroogd boven dennenhout vuren', 'Het ondergaat verzegelde vergeling', 'Het is gedeeltelijk geoxideerd'], correctIndex: 1, explanation: 'Lapsang Souchong is the original smoked tea — dried over pinewood fires in the Wuyi Mountains.', explanation_nl: 'Lapsang Souchong is de originele gerookte thee — gedroogd boven dennenhout vuren in de Wuyi bergen.' },
      { prompt: `Which processing step does ${TEA_DATA[12].name} use that other teas do not?`, prompt_nl: `Welke verwerkingsstap gebruikt ${TEA_DATA[12].name} die andere theeën niet gebruiken?`, choices: ['Wet-piling', 'Smoke-drying', 'Sealed yellowing (men huang)', 'Pan-firing'], choices_nl: ['Nat stapelen', 'Rookdrogen', 'Verzegelde vergeling (men huang)', 'Bakken'], correctIndex: 2, explanation: 'As a Yellow tea, Jun Shan Yin Zhen uses the unique sealed yellowing step!', explanation_nl: 'Als gele thee gebruikt Jun Shan Yin Zhen de unieke verzegelde vergeling stap!' },
    ]
  },
  {
    id: 'tea-master',
    title: "Tea Master's Journey",
    title_nl: "Reis van de Theemeester",
    description: 'The ultimate tea challenge',
    description_nl: 'De ultieme thee uitdaging',
    requiredModules: ['tea-families', 'regions-terroir', 'brewing-mastery', 'processing-craft'],
    steps: [
      {
        emmaText: "You've come so far on your tea journey! You've mastered the families, regions, brewing, and processing. Now it's time for the Tea Master's challenge!",
        emmaText_nl: "Je bent zo ver gekomen op je theereis! Je hebt de families, regio's, het zetten en de verwerking onder de knie. Nu is het tijd voor de uitdaging van de Theemeester!",
        type: 'narrative',
        config: {}
      },
      {
        emmaText: "Terroir and processing work together. Can you match the terroir to the flavor it creates?",
        emmaText_nl: "Terroir en verwerking werken samen. Kun je het terroir koppelen aan de smaak die het creëert?",
        type: 'matchPairs',
        config: { pairs: [
          { left: 'Rocky Wuyi cliff crevices', left_nl: 'Rotsachtige Wuyi klifspleten', right: 'Mineral & roasted notes', right_nl: 'Mineraal & geroosterde tonen' },
          { left: 'Coastal Fuding hillsides', left_nl: 'Kust Fuding hellingen', right: 'Delicate melon & hay', right_nl: 'Delicate meloen & hooi' },
          { left: 'High-altitude Yunnan forests', left_nl: 'Hooggelegen Yunnan bossen', right: 'Malty & peppery depth', right_nl: 'Moutige & peperige diepte' },
          { left: 'Misty Hangzhou lake region', left_nl: 'Mistig Hangzhou meergebied', right: 'Chestnut & sweet vegetal', right_nl: 'Kastanje & zoet plantaardig' },
        ]}
      },
      {
        emmaText: "I'll give you a fun fact — can you guess which tea it describes? Tap to check!",
        emmaText_nl: "Ik geef je een leuk weetje — kun je raden welke thee het beschrijft? Tik om te controleren!",
        type: 'tapReveal',
        config: { cards: [
          { front: 'Over 80,000 hand-picked buds per kilogram', front_nl: 'Meer dan 80.000 met de hand geplukte knoppen per kilogram', back: `That's ${TEA_DATA[1].name}! Grown among fruit orchards in Suzhou.`, back_nl: `Dat is ${TEA_DATA[1].name}! Gekweekt tussen fruitboomgaarden in Suzhou.`, category: 'Green' },
          { front: 'Original mother trees are over 350 years old', front_nl: 'Originele moederbomen zijn meer dan 350 jaar oud', back: `That's ${TEA_DATA[3].name}! The most expensive tea in history.`, back_nl: `Dat is ${TEA_DATA[3].name}! De duurste thee in de geschiedenis.`, category: 'Oolong' },
          { front: 'Can only be harvested during a few days in early spring', front_nl: 'Kan alleen geoogst worden tijdens een paar dagen in het vroege voorjaar', back: `That's ${TEA_DATA[8].name}! Made only from unopened buds covered in white hairs.`, back_nl: `Dat is ${TEA_DATA[8].name}! Gemaakt van alleen ongeopende knoppen bedekt met witte haartjes.`, category: 'White' },
          { front: 'Was tribute tea for Chinese emperors', front_nl: 'Was schatplichtige thee voor Chinese keizers', back: `That's ${TEA_DATA[12].name}! A rare Yellow tea from Junshan Island.`, back_nl: `Dat is ${TEA_DATA[12].name}! Een zeldzame gele thee van het eiland Junshan.`, category: 'Yellow' },
          { front: 'Invented in 1973 using "wet piling" technique', front_nl: 'Uitgevonden in 1973 met "nat stapelen" techniek', back: `That's ${TEA_DATA[11].name}! Simulates decades of aging in 45-60 days.`, back_nl: `Dat is ${TEA_DATA[11].name}! Simuleert decennia van veroudering in 45-60 dagen.`, category: 'Pu-erh' },
        ]}
      },
      {
        emmaText: "The oxidation spectrum challenge! Arrange these teas from least to most oxidized using their exact percentages.",
        emmaText_nl: "De oxidatiespectrum uitdaging! Rangschik deze theeën van minst tot meest geoxideerd met hun exacte percentages.",
        type: 'sortExercise',
        config: {
          items: [`${TEA_DATA[0].name} - ${TEA_DATA[0].oxidation}`, `${TEA_DATA[8].name} - ${TEA_DATA[8].oxidation}`, `${TEA_DATA[2].name} - ${TEA_DATA[2].oxidation}`, `${TEA_DATA[3].name} - ${TEA_DATA[3].oxidation}`, `${TEA_DATA[5].name} - ${TEA_DATA[5].oxidation}`],
          correctOrder: [`${TEA_DATA[0].name} - ${TEA_DATA[0].oxidation}`, `${TEA_DATA[8].name} - ${TEA_DATA[8].oxidation}`, `${TEA_DATA[2].name} - ${TEA_DATA[2].oxidation}`, `${TEA_DATA[3].name} - ${TEA_DATA[3].oxidation}`, `${TEA_DATA[5].name} - ${TEA_DATA[5].oxidation}`],
        }
      },
      {
        emmaText: "The ultimate challenge! I'll give you clues — can you name the tea?",
        emmaText_nl: "De ultieme uitdaging! Ik geef je aanwijzingen — kun je de thee benoemen?",
        type: 'fillInBlank',
        config: { questions: [
          { statement: 'From Wuyi Mountains, Fujian. Smoke-dried over pinewood fires. Fully oxidized.', statement_nl: 'Uit de Wuyi bergen, Fujian. Rookgedroogd boven dennenhout vuren. Volledig geoxideerd.', choices: [TEA_DATA[5].name, TEA_DATA[6].name, TEA_DATA[3].name, TEA_DATA[7].name], correctIndex: 1, explanation: `${TEA_DATA[6].name} — the original smoked black tea from the Wuyi Mountains!`, explanation_nl: `${TEA_DATA[6].name} — de originele gerookte zwarte thee uit de Wuyi bergen!` },
          { statement: 'From Anxi, Fujian. Partially oxidized, then rolled and roasted. Named after a goddess.', statement_nl: 'Uit Anxi, Fujian. Gedeeltelijk geoxideerd, daarna gerold en geroosterd. Vernoemd naar een godin.', choices: [TEA_DATA[3].name, TEA_DATA[4].name, TEA_DATA[2].name, TEA_DATA[14].name], correctIndex: 2, explanation: `${TEA_DATA[2].name} — named after the Iron Goddess of Mercy (Guanyin)!`, explanation_nl: `${TEA_DATA[2].name} — vernoemd naar de IJzeren Godin van Genade (Guanyin)!` },
          { statement: 'From Yunnan. Sun-dried and naturally aged. Flavor evolves over decades.', statement_nl: 'Uit Yunnan. Zongedroogd en natuurlijk verouderd. Smaak evolueert over decennia.', choices: [TEA_DATA[7].name, TEA_DATA[11].name, TEA_DATA[10].name, TEA_DATA[4].name], correctIndex: 2, explanation: `${TEA_DATA[10].name} — a living tea that transforms over decades of natural aging!`, explanation_nl: `${TEA_DATA[10].name} — een levende thee die transformeert over decennia van natuurlijke veroudering!` },
        ]}
      },
    ],
    quiz: [
      { prompt: 'Which terroir produces mineral and roasted notes?', prompt_nl: 'Welk terroir produceert minerale en geroosterde tonen?', choices: ['Coastal Fuding hillsides', 'Rocky Wuyi cliff crevices', 'Ancient Yunnan forests', 'Misty Hangzhou lake region'], choices_nl: ['Kust Fuding hellingen', 'Rotsachtige Wuyi klifspleten', 'Oude Yunnan bossen', 'Mistig Hangzhou meergebied'], correctIndex: 1, explanation: 'The mineral-rich rocky crevices of Wuyi give teas like Da Hong Pao their distinctive mineral notes.', explanation_nl: 'De mineraalrijke rotsachtige spleten van Wuyi geven theeën zoals Da Hong Pao hun kenmerkende minerale tonen.' },
      { prompt: `What flavor does ${TEA_DATA[8].name}'s coastal terroir contribute?`, prompt_nl: `Welke smaak draagt het kustterroir van ${TEA_DATA[8].name} bij?`, choices: ['Smoky & bold', 'Malty & peppery', 'Melon & hay', 'Chestnut & sweet'], choices_nl: ['Rokerig & krachtig', 'Moutig & peperig', 'Meloen & hooi', 'Kastanje & zoet'], correctIndex: 2, explanation: `The ocean breezes and misty springs of Fuding give ${TEA_DATA[8].name} its delicate melon and hay notes.`, explanation_nl: `De zeebries en mistige lentes van Fuding geven ${TEA_DATA[8].name} zijn delicate meloen- en hooitonen.` },
      { prompt: 'Which tea was considered the most expensive, at $28,000 for 20 grams?', prompt_nl: 'Welke thee werd beschouwd als de duurste, voor $28.000 per 20 gram?', choices: [TEA_DATA[8].name, TEA_DATA[10].name, TEA_DATA[3].name, TEA_DATA[12].name], correctIndex: 2, explanation: `${TEA_DATA[3].name}'s original mother trees produced tea worth $28,000 for just 20 grams in 2005!`, explanation_nl: `De originele moederbomen van ${TEA_DATA[3].name} produceerden thee ter waarde van $28.000 voor slechts 20 gram in 2005!` },
      { prompt: `Arrange from least to most oxidized: White, Oolong, Green`, prompt_nl: `Rangschik van minst tot meest geoxideerd: Wit, Oolong, Groen`, choices: ['Green, White, Oolong', 'White, Green, Oolong', 'Green, Oolong, White', 'Oolong, White, Green'], choices_nl: ['Groen, Wit, Oolong', 'Wit, Groen, Oolong', 'Groen, Oolong, Wit', 'Oolong, Wit, Groen'], correctIndex: 0, explanation: 'Green (0%) has the least oxidation, followed by White (5-10%), then Oolong (25-70%).', explanation_nl: 'Groen (0%) heeft de minste oxidatie, gevolgd door Wit (5-10%), daarna Oolong (25-70%).' },
      { prompt: 'From Junshan Island, sealed yellowing process, tribute tea for emperors.', prompt_nl: 'Van het eiland Junshan, verzegelde vergeling proces, schatplichtige thee voor keizers.', choices: [TEA_DATA[8].name, TEA_DATA[0].name, TEA_DATA[12].name, TEA_DATA[1].name], correctIndex: 2, explanation: `${TEA_DATA[12].name} — a rare Yellow tea from a small island, once reserved for emperors!`, explanation_nl: `${TEA_DATA[12].name} — een zeldzame gele thee van een klein eiland, ooit gereserveerd voor keizers!` },
    ]
  },
];


// ═══════════════════════════════════════════════════════════
// SECTION 2: PIXEL ART SPRITES & COMPONENTS
// ═══════════════════════════════════════════════════════════

const _ = null; // transparent

// Emma — Tea Guide Outfit (16x28, red Chinese robe with gold trim, brown hair)
const H='#7B4B2A',Hd='#5C3A1F',SK='#FDDBB8',Sp='#F0B8A0',
      EY='#3B7A57',MO='#D4736A',R='#8B2500',Rd='#6B1C00',G='#DAA520',Bk='#1A1A1A';
const EMMA_SPRITE = [
  [_,_,_,_,_,H,H,H,H,H,H,_,_,_,_,_],
  [_,_,_,_,H,H,Hd,H,H,Hd,H,H,_,_,_,_],
  [_,_,_,H,H,Hd,H,Hd,H,H,Hd,H,H,_,_,_],
  [_,_,_,H,Hd,H,H,Hd,H,H,Hd,H,H,_,_,_],
  [_,_,_,H,H,Hd,H,H,H,Hd,H,H,H,_,_,_],
  [_,_,H,H,H,H,H,H,H,H,H,H,H,H,_,_],
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

function LangToggle({ lang, setLang }) {
  return (
    <button
      onClick={() => setLang(l => l === 'en' ? 'nl' : 'en')}
      className="font-pixel text-[8px] px-2 py-1 pixel-border cursor-pointer bg-white hover:bg-tea-cream transition-colors"
    >
      {lang === 'en' ? 'NL' : 'EN'}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════
// SECTION 3.5: TEA LEARNING INTERACTIVE COMPONENTS
// ═══════════════════════════════════════════════════════════

function TapRevealCards({ config, onComplete, onBounce, lang = 'en' }) {
  const [revealed, setRevealed] = useState({});
  const [seen, setSeen] = useState({});
  const allSeen = config.cards.every((_, i) => seen[i]);

  useEffect(() => { if (allSeen) onComplete(); }, [allSeen]);

  const handleTap = (i) => {
    if (!seen[i]) {
      setSeen(prev => ({ ...prev, [i]: true }));
      onBounce();
    }
    setRevealed(prev => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {config.cards.map((card, i) => (
        <div key={i} onClick={() => handleTap(i)}
          className={`pixel-border p-3 cursor-pointer transition-all ${revealed[i] ? 'bg-white' : 'bg-tea-cream hover:bg-tea-gold/20'} ${revealed[i] ? 'animate-flip' : ''}`}>
          {!revealed[i] ? (
            <div className="text-center">
              {card.category && <span className={`inline-block px-2 py-0.5 rounded text-[7px] font-pixel mb-1 ${CATEGORY_COLORS[card.category] || 'bg-gray-300'}`}>{card.category}</span>}
              <p className="font-pixel text-[9px] text-tea-ink">{lang === 'nl' && card.front_nl ? card.front_nl : card.front}</p>
              <p className="font-pixel text-[7px] text-gray-400 mt-1">{seen[i] ? TEXTS[lang]?.tapToFlip || 'tap to flip' : TEXTS[lang]?.tapToReveal || 'tap to reveal'}</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="font-pixel text-[7px] text-tea-wood leading-relaxed">{lang === 'nl' && card.back_nl ? card.back_nl : card.back}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SortExercise({ config, onComplete, onBounce, lang = 'en' }) {
  const [items, setItems] = useState(() => {
    if (config.buckets) return config.items.map(item => ({ name: item, bucket: null }));
    const shuffled = [...config.items];
    for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
    return shuffled;
  });
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(null);

  const handleSwap = (i) => {
    if (checked || config.buckets) return;
    if (selected === null) { setSelected(i); return; }
    if (selected === i) { setSelected(null); return; }
    setItems(prev => { const next = [...prev]; [next[selected], next[i]] = [next[i], next[selected]]; return next; });
    setSelected(null);
  };

  const handleBucketAssign = (itemIdx, bucket) => {
    setItems(prev => prev.map((item, i) => i === itemIdx ? { ...item, bucket } : item));
  };

  const handleCheck = () => {
    let isCorrect;
    if (config.buckets) {
      isCorrect = items.every(item => item.bucket === config.correctBuckets[item.name]);
    } else {
      isCorrect = items.every((item, i) => item === config.correctOrder[i]);
    }
    setChecked(true);
    setCorrect(isCorrect);
    if (isCorrect) { onBounce(); onComplete(); }
  };

  const handleRetry = () => { setChecked(false); setCorrect(null); setSelected(null); };

  if (config.buckets) {
    return (
      <div>
        <div className="flex flex-wrap gap-1 mb-3">
          {items.map((item, i) => (
            <div key={i} className="pixel-border p-2 bg-white">
              <p className="font-pixel text-[8px] text-tea-ink mb-1">{item.name}</p>
              <div className="flex gap-1">
                {config.buckets.map((bucket, bi) => (
                  <button key={bucket} onClick={() => handleBucketAssign(i, bucket)}
                    className={`font-pixel text-[7px] px-2 py-0.5 pixel-border cursor-pointer ${item.bucket === bucket ? 'bg-tea-jade text-white' : 'bg-gray-100'} ${checked && item.bucket === config.correctBuckets[item.name] ? 'bg-tea-jade text-white' : ''} ${checked && item.bucket && item.bucket !== config.correctBuckets[item.name] ? 'bg-red-300 animate-shake' : ''}`}>
                    {lang === 'nl' && config.buckets_nl ? config.buckets_nl[bi] : bucket}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {!checked && <PixelButton onClick={handleCheck} variant="primary" className="w-full">{TEXTS[lang]?.checkAnswer || 'Check Answer'}</PixelButton>}
        {checked && !correct && <PixelButton onClick={handleRetry} variant="secondary" className="w-full">{TEXTS[lang]?.tryAgain || 'Try Again'}</PixelButton>}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-1 mb-3">
        {items.map((item, i) => (
          <button key={i} onClick={() => handleSwap(i)}
            className={`pixel-border p-2 font-pixel text-[8px] text-left cursor-pointer transition-all ${selected === i ? 'bg-tea-gold text-white' : 'bg-white'} ${checked && correct ? 'bg-green-100' : ''} ${checked && !correct ? 'animate-shake' : ''}`}>
            <span className="text-gray-400 mr-2">{i + 1}.</span>{item}
          </button>
        ))}
      </div>
      <p className="font-pixel text-[7px] text-gray-400 text-center mb-2">{TEXTS[lang]?.swapHint || 'Tap two items to swap their positions'}</p>
      {!checked && <PixelButton onClick={handleCheck} variant="primary" className="w-full">{TEXTS[lang]?.checkOrder || 'Check Order'}</PixelButton>}
      {checked && !correct && <PixelButton onClick={handleRetry} variant="secondary" className="w-full">{TEXTS[lang]?.tryAgain || 'Try Again'}</PixelButton>}
    </div>
  );
}

function MatchPairs({ config, onComplete, onBounce, lang = 'en' }) {
  const [shuffledRight] = useState(() => {
    const arr = config.pairs.map(p => p.right);
    for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
    return arr;
  });
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matched, setMatched] = useState({});
  const [wrong, setWrong] = useState(null);

  const allMatched = Object.keys(matched).length === config.pairs.length;
  useEffect(() => { if (allMatched) onComplete(); }, [allMatched]);

  const handleRight = (rightVal) => {
    if (selectedLeft === null || matched[selectedLeft] || Object.values(matched).includes(rightVal)) return;
    const pair = config.pairs.find(p => p.left === selectedLeft);
    if (pair && pair.right === rightVal) {
      setMatched(prev => ({ ...prev, [selectedLeft]: rightVal }));
      onBounce();
      setSelectedLeft(null);
    } else {
      setWrong(rightVal);
      setTimeout(() => { setWrong(null); setSelectedLeft(null); }, 500);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-1">
        {config.pairs.map((pair, i) => (
          <button key={i} onClick={() => !matched[pair.left] && setSelectedLeft(pair.left)}
            className={`pixel-border p-2 font-pixel text-[8px] cursor-pointer transition-all ${matched[pair.left] ? 'bg-green-100 border-green-500' : selectedLeft === pair.left ? 'bg-tea-gold text-white' : 'bg-white hover:bg-tea-cream'}`}>
            {matched[pair.left] && <Check size={10} className="inline mr-1 text-green-600" />}
            {lang === 'nl' && pair.left_nl ? pair.left_nl : pair.left}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        {shuffledRight.map((right, i) => {
          const pair = config.pairs.find(p => p.right === right);
          return (
          <button key={i} onClick={() => handleRight(right)}
            className={`pixel-border p-2 font-pixel text-[8px] cursor-pointer transition-all ${Object.values(matched).includes(right) ? 'bg-green-100 border-green-500' : wrong === right ? 'bg-red-200 animate-shake' : 'bg-white hover:bg-tea-cream'}`}>
            {lang === 'nl' && pair?.right_nl ? pair.right_nl : right}
          </button>
          );
        })}
      </div>
    </div>
  );
}

function FillInBlank({ config, onComplete, onBounce, lang = 'en' }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answered, setAnswered] = useState(null);
  const q = config.questions[currentQ];
  const qStatement = lang === 'nl' && q.statement_nl ? q.statement_nl : q.statement;
  const qChoices = lang === 'nl' && q.choices_nl ? q.choices_nl : q.choices;
  const qExplanation = lang === 'nl' && q.explanation_nl ? q.explanation_nl : q.explanation;

  const handleChoice = (idx) => {
    if (answered !== null) return;
    setAnswered(idx);
    if (idx === q.correctIndex) onBounce();
  };

  const handleNext = () => {
    if (currentQ + 1 < config.questions.length) {
      setCurrentQ(prev => prev + 1);
      setAnswered(null);
    } else {
      onComplete();
    }
  };

  return (
    <div>
      <div className="pixel-border p-4 bg-white mb-3">
        <p className="font-pixel text-[9px] text-tea-ink leading-relaxed">
          {qStatement.replace('___', answered !== null ? qChoices[answered] : '______')}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {qChoices.map((choice, i) => (
          <button key={i} onClick={() => handleChoice(i)}
            className={`pixel-border p-2 font-pixel text-[8px] cursor-pointer transition-all ${answered === null ? 'bg-white hover:bg-tea-cream' : i === q.correctIndex ? 'bg-green-200' : answered === i ? 'bg-red-200' : 'bg-white opacity-50'}`}>
            {choice}
          </button>
        ))}
      </div>
      {answered !== null && (
        <div className="pixel-border-inset bg-tea-cream p-2 mb-2">
          <p className="font-pixel text-[7px] text-tea-wood">{qExplanation}</p>
        </div>
      )}
      {answered !== null && (
        <PixelButton onClick={handleNext} variant="primary" className="w-full">
          {currentQ + 1 < config.questions.length ? (TEXTS[lang]?.next || 'Next') : (TEXTS[lang]?.continue || 'Continue')}
        </PixelButton>
      )}
    </div>
  );
}

function LessonQuiz({ questions, onPass, onRetry, lang = 'en' }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);

  const q = questions[currentIdx];
  const passThreshold = Math.ceil(questions.length * 0.6);

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correctIndex) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelected(null);
    } else {
      setDone(true);
    }
  };

  if (done) {
    const passed = score >= passThreshold;
    return (
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <EmmaCharacter scale={2} bounce={passed} />
          <TeaPet scale={2} bounce={passed} />
        </div>
        <div className="pixel-border p-4 bg-white mb-3">
          {passed ? <Trophy size={24} className="mx-auto text-tea-gold mb-2" /> : <Heart size={24} className="mx-auto text-tea-red mb-2" />}
          <p className="font-pixel text-xs text-tea-ink mb-2">{passed ? (TEXTS[lang]?.moduleComplete || 'Module Complete!') : (TEXTS[lang]?.almostThere || 'Almost there!')}</p>
          <p className="font-pixel text-[9px] text-gray-500">{score} / {questions.length} {TEXTS[lang]?.correct || 'correct'}</p>
        </div>
        {passed ? (
          <PixelButton onClick={onPass} variant="primary" className="w-full">{TEXTS[lang]?.continue || 'Continue'}</PixelButton>
        ) : (
          <div className="flex flex-col gap-2">
            <PixelButton onClick={onRetry} variant="secondary" className="w-full">{TEXTS[lang]?.reviewLesson || 'Review Lesson'}</PixelButton>
            <PixelButton onClick={() => { setCurrentIdx(0); setScore(0); setSelected(null); setDone(false); }} variant="primary" className="w-full">{TEXTS[lang]?.tryQuizAgain || 'Try Quiz Again'}</PixelButton>
          </div>
        )}
      </div>
    );
  }

  const qPrompt = lang === 'nl' && q.prompt_nl ? q.prompt_nl : q.prompt;
  const qChoices = lang === 'nl' && q.choices_nl ? q.choices_nl : q.choices;
  const qExplanation = lang === 'nl' && q.explanation_nl ? q.explanation_nl : q.explanation;

  return (
    <div>
      <p className="font-pixel text-[8px] text-gray-400 text-center mb-2">{TEXTS[lang]?.quiz || 'Quiz'}: {currentIdx + 1} / {questions.length}</p>
      <div className="pixel-border p-3 bg-white mb-3">
        <p className="font-pixel text-[9px] text-tea-ink leading-relaxed">{qPrompt}</p>
      </div>
      <div className="grid grid-cols-1 gap-2 mb-3">
        {qChoices.map((choice, i) => (
          <button key={i} onClick={() => handleAnswer(i)}
            className={`pixel-border p-2 font-pixel text-[8px] text-left cursor-pointer transition-all ${selected === null ? 'bg-white hover:bg-tea-cream' : i === q.correctIndex ? 'bg-green-200' : selected === i ? 'bg-red-200' : 'bg-white opacity-50'}`}>
            {selected !== null && i === q.correctIndex && <Check size={10} className="inline mr-1 text-green-600" />}
            {selected !== null && selected === i && i !== q.correctIndex && <X size={10} className="inline mr-1 text-red-500" />}
            {choice}
          </button>
        ))}
      </div>
      {selected !== null && (
        <>
          <div className="pixel-border-inset bg-tea-cream p-2 mb-2">
            <p className="font-pixel text-[7px] text-tea-wood">{qExplanation}</p>
          </div>
          <PixelButton onClick={handleNext} variant="primary" className="w-full">
            {currentIdx + 1 < questions.length ? (TEXTS[lang]?.nextQuestion || 'Next Question') : (TEXTS[lang]?.seeResults || 'See Results')}
          </PixelButton>
        </>
      )}
    </div>
  );
}

function TeaLearning({ onBack, lang = 'en', setLang }) {
  const [activeModule, setActiveModule] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [inQuiz, setInQuiz] = useState(false);
  const [stepCompleted, setStepCompleted] = useState(false);
  const [petBounce, setPetBounce] = useState(false);
  const [completedModules, setCompletedModules] = useState(() => {
    const saved = loadSave();
    return Array.isArray(saved?.completedModules) ? saved.completedModules : [];
  });

  useEffect(() => { writeSave({ completedModules }); }, [completedModules]);

  const doBounce = useCallback(() => {
    setPetBounce(true);
    setTimeout(() => setPetBounce(false), 600);
  }, []);

  const isUnlocked = (mod) => mod.requiredModules.every(req => completedModules.includes(req));

  const handleModuleComplete = () => {
    const mod = LESSON_DATA.find(m => m.id === activeModule);
    if (mod && !completedModules.includes(mod.id)) {
      setCompletedModules(prev => [...prev, mod.id]);
    }
    setActiveModule(null);
    setCurrentStep(0);
    setInQuiz(false);
    setStepCompleted(false);
  };

  const handleRetry = () => {
    setCurrentStep(0);
    setInQuiz(false);
    setStepCompleted(false);
  };

  const t = useCallback((key) => TEXTS[lang]?.[key] || TEXTS.en[key] || key, [lang]);
  const tf = useCallback((obj, field) => lang === 'nl' && obj[field + '_nl'] ? obj[field + '_nl'] : obj[field], [lang]);

  if (!activeModule) {
    return (
      <div className="min-h-screen bg-tea-cream p-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button onClick={onBack} className="flex items-center gap-1 font-pixel text-[10px] text-tea-wood cursor-pointer hover:text-tea-red">
              <ArrowLeft size={14} /> {t('back')}
            </button>
            {setLang && <LangToggle lang={lang} setLang={setLang} />}
          </div>
          <h2 className="font-pixel text-sm text-tea-red text-center mb-2">{t('academyTitle')}</h2>
          <div className="flex items-center justify-center gap-3 mb-3">
            <EmmaCharacter scale={2} />
            <TeaPet scale={2} />
          </div>
          <SpeechBubble message={completedModules.length === 0 ? t('academyWelcome') : completedModules.length === LESSON_DATA.length ? t('academyComplete') : t('academyProgress')} />
          <ProgressBar current={completedModules.length} total={LESSON_DATA.length} label={t('modules')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {LESSON_DATA.map((mod) => {
              const unlocked = isUnlocked(mod);
              const completed = completedModules.includes(mod.id);
              return (
                <div key={mod.id} onClick={() => unlocked && setActiveModule(mod.id)}
                  className={`pixel-border p-4 transition-all ${!unlocked ? 'bg-gray-200 opacity-60' : completed ? 'bg-green-50 cursor-pointer hover:bg-green-100' : 'bg-white cursor-pointer hover:bg-tea-cream'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-pixel text-[10px] text-tea-ink">{tf(mod, 'title')}</p>
                    {completed ? <Check size={14} className="text-green-600" /> : !unlocked ? <Lock size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-tea-gold" />}
                  </div>
                  <p className="font-pixel text-[7px] text-gray-500">{tf(mod, 'description')}</p>
                  {!unlocked && <p className="font-pixel text-[6px] text-gray-400 mt-1">{t('completePrereqs')}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const mod = LESSON_DATA.find(m => m.id === activeModule);
  const totalSteps = mod.steps.length + 1;

  if (inQuiz) {
    return (
      <div className="min-h-screen bg-tea-cream p-4">
        <div className="max-w-lg mx-auto">
          <button onClick={() => { setActiveModule(null); setCurrentStep(0); setInQuiz(false); setStepCompleted(false); }}
            className="flex items-center gap-1 font-pixel text-[10px] text-tea-wood mb-4 cursor-pointer hover:text-tea-red">
            <ArrowLeft size={14} /> {t('backToAcademy')}
          </button>
          <h2 className="font-pixel text-xs text-tea-red text-center mb-1">{tf(mod, 'title')}</h2>
          <StepIndicator current={totalSteps - 1} total={totalSteps} />
          <LessonQuiz questions={mod.quiz} onPass={handleModuleComplete} onRetry={handleRetry} lang={lang} />
        </div>
      </div>
    );
  }

  const step = mod.steps[currentStep];

  const handleStepComplete = () => setStepCompleted(true);

  const handleNext = () => {
    if (currentStep + 1 < mod.steps.length) {
      setCurrentStep(prev => prev + 1);
      setStepCompleted(false);
    } else {
      setInQuiz(true);
      setStepCompleted(false);
    }
  };

  const renderInteractive = () => {
    const key = `${activeModule}-${currentStep}`;
    switch (step.type) {
      case 'tapReveal': return <TapRevealCards key={key} config={step.config} onComplete={handleStepComplete} onBounce={doBounce} lang={lang} />;
      case 'sortExercise': return <SortExercise key={key} config={step.config} onComplete={handleStepComplete} onBounce={doBounce} lang={lang} />;
      case 'matchPairs': return <MatchPairs key={key} config={step.config} onComplete={handleStepComplete} onBounce={doBounce} lang={lang} />;
      case 'fillInBlank': return <FillInBlank key={key} config={step.config} onComplete={handleStepComplete} onBounce={doBounce} lang={lang} />;
      case 'narrative': return null;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-tea-cream p-4">
      <div className="max-w-lg mx-auto">
        <button onClick={() => { setActiveModule(null); setCurrentStep(0); setStepCompleted(false); }}
          className="flex items-center gap-1 font-pixel text-[10px] text-tea-wood mb-4 cursor-pointer hover:text-tea-red">
          <ArrowLeft size={14} /> {t('backToAcademy')}
        </button>
        <h2 className="font-pixel text-xs text-tea-red text-center mb-1">{tf(mod, 'title')}</h2>
        <StepIndicator current={currentStep} total={totalSteps} />

        <div className="flex items-start gap-2 mb-4">
          <div className="flex-shrink-0">
            <EmmaCharacter scale={2} />
          </div>
          <SpeechBubbleInline text={tf(step, 'emmaText')} />
        </div>

        <div className="mb-4">
          {renderInteractive()}
        </div>

        <div className="flex items-center justify-between">
          <TeaPet scale={2} bounce={petBounce} />
          {(stepCompleted || step.type === 'narrative') && (
            <PixelButton onClick={handleNext} variant="primary">
              {currentStep + 1 < mod.steps.length ? t('next') : t('startQuiz')} <ChevronRight size={12} className="inline" />
            </PixelButton>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SECTION 4: TITLE SCREEN
// ═══════════════════════════════════════════════════════════

function TitleScreen({ onNavigate, lang = 'en', setLang }) {
  const t = useCallback((key) => TEXTS[lang]?.[key] || TEXTS.en[key] || key, [lang]);
  const msgs = EMMA_MESSAGES[lang] || EMMA_MESSAGES.en;
  const [welcomeMsg] = useState(
    () => msgs.welcome[Math.floor(Math.random() * msgs.welcome.length)]
  );

  return (
    <div className="min-h-screen bg-tea-cream flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-end mb-2">
          {setLang && <LangToggle lang={lang} setLang={setLang} />}
        </div>
        <h1 className="font-pixel text-lg sm:text-2xl text-tea-red mb-2 leading-relaxed">
          {t('appTitle')}
        </h1>
        <p className="font-pixel text-[10px] sm:text-xs text-tea-jade mb-8">
          {t('appSubtitle')}
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
            <span className="flex items-center justify-center gap-2"><BookOpen size={14} /> {t('btnQuiz')}</span>
          </PixelButton>
          <PixelButton onClick={() => onNavigate('collection')} variant="secondary" className="w-full">
            <span className="flex items-center justify-center gap-2"><Coffee size={14} /> {t('btnCollection')}</span>
          </PixelButton>
          <PixelButton onClick={() => onNavigate('brewing')} variant="primary" className="w-full">
            <span className="flex items-center justify-center gap-2"><Flame size={14} /> {t('btnBrewing')}</span>
          </PixelButton>
          <PixelButton onClick={() => onNavigate('learn')} variant="secondary" className="w-full">
            <span className="flex items-center justify-center gap-2"><Heart size={14} /> {t('btnAcademy')}</span>
          </PixelButton>
        </div>

        <p className="font-pixel text-[8px] text-gray-400 mt-8">
          {t('footerText')}
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

function generateQuestions(count = 10, expertMode = false) {
  const questions = [];
  const normalTypes = ['category', 'temperature', 'region', 'leafAmount', 'processing', 'vessel', 'flavorMatch'];
  const expertTypes = ['terroir', 'oxidation', 'processingDetail', 'terroirEffect'];
  const types = expertMode ? [...normalTypes, ...expertTypes] : normalTypes;

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
    } else if (type === 'terroir') {
      const wrongTerroirs = TEA_DATA.filter(t => t.id !== tea.id)
        .sort(() => Math.random() - 0.5).slice(0, 3).map(t => t.terroir);
      const choices = [...wrongTerroirs, tea.terroir].sort(() => Math.random() - 0.5);
      questions.push({
        type, tea,
        prompt: `What terroir defines ${tea.name}?`,
        choices,
        correctIndex: choices.indexOf(tea.terroir),
        explanation: `${tea.name} grows in: ${tea.terroir}. This terroir contributes to its ${tea.flavorNotes.join(', ')} character.`,
      });
    } else if (type === 'oxidation') {
      const allOx = [...new Set(TEA_DATA.map(t => t.oxidation))];
      const wrongOx = allOx.filter(o => o !== tea.oxidation).sort(() => Math.random() - 0.5).slice(0, 3);
      const choices = [...wrongOx, tea.oxidation].sort(() => Math.random() - 0.5);
      questions.push({
        type, tea,
        prompt: `What is the oxidation level of ${tea.name}?`,
        choices,
        correctIndex: choices.indexOf(tea.oxidation),
        explanation: `${tea.name} is ${tea.oxidation}. ${tea.category} teas are characterized by this level of oxidation.`,
      });
    } else if (type === 'processingDetail') {
      const wrongTeas = TEA_DATA.filter(t => t.id !== tea.id).sort(() => Math.random() - 0.5).slice(0, 3);
      const choices = [...wrongTeas.map(t => t.name), tea.name].sort(() => Math.random() - 0.5);
      questions.push({
        type, tea,
        prompt: `Which tea is made by: "${tea.processing}"?`,
        choices,
        correctIndex: choices.indexOf(tea.name),
        explanation: `${tea.name} is made by: ${tea.processing}. This ${tea.category} tea comes from ${tea.region}.`,
      });
    } else if (type === 'terroirEffect') {
      const correctFlavor = tea.flavorNotes[Math.floor(Math.random() * tea.flavorNotes.length)];
      const allFlavors = TEA_DATA.flatMap(t => t.flavorNotes).filter(f => !tea.flavorNotes.includes(f));
      const wrongFlavors = [...new Set(allFlavors)].sort(() => Math.random() - 0.5).slice(0, 3);
      const choices = [...wrongFlavors, correctFlavor].sort(() => Math.random() - 0.5);
      questions.push({
        type, tea,
        prompt: `Which flavor of ${tea.name} is shaped by its terroir in ${tea.region}?`,
        choices,
        correctIndex: choices.indexOf(correctFlavor),
        explanation: `${tea.terroir} — this terroir gives ${tea.name} its distinctive ${correctFlavor} character.`,
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

function TeaQuiz({ onBack, discoveredTeas, onDiscoverTea, lang = 'en', setLang }) {
  const t = useCallback((key) => TEXTS[lang]?.[key] || TEXTS.en[key] || key, [lang]);
  const msgs = EMMA_MESSAGES[lang] || EMMA_MESSAGES.en;
  const [expertMode, setExpertMode] = useState(() => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) return JSON.parse(saved).expertMode || false;
    } catch (e) { /* ignore */ }
    return false;
  });
  const [questions, setQuestions] = useState(() => generateQuestions(10, false));
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
  const [emmaMsg, setEmmaMsg] = useState(() => TEXTS[lang]?.quizStart || "Let's test your tea knowledge! Pick the correct answer.");
  const [petBounce, setPetBounce] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [prevLevel, setPrevLevel] = useState(() => getLevel(totalCorrect));

  useEffect(() => {
    writeSave({ totalCorrect });
  }, [totalCorrect]);

  useEffect(() => {
    writeSave({ expertMode });
  }, [expertMode]);

  // Initialize questions with saved expert mode
  useEffect(() => {
    setQuestions(generateQuestions(10, expertMode));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleToggleExpert = useCallback(() => {
    setExpertMode(prev => {
      const next = !prev;
      setQuestions(generateQuestions(10, next));
      setCurrentIndex(0);
      setScore(0);
      setStreak(0);
      setBestStreak(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setQuizDone(false);
      setEmmaMsg(next ? t('expertModeOn') : t('normalModeOn'));
      return next;
    });
  }, []);

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
      if (newLevel !== prevLevel && msgs.levelUp[newLevel]) {
        setEmmaMsg(msgs.levelUp[newLevel]);
        setPrevLevel(newLevel);
      } else if (newStreak >= 5) {
        setEmmaMsg(msgs.streak[Math.floor(Math.random() * msgs.streak.length)]);
      } else {
        setEmmaMsg(
          msgs.correct[Math.floor(Math.random() * msgs.correct.length)] +
          ' ' + question.explanation
        );
      }
    } else {
      setStreak(0);
      setEmmaMsg(
        msgs.wrong[Math.floor(Math.random() * msgs.wrong.length)] +
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
    setEmmaMsg(t('nextQuestionMsg'));
  };

  const handlePlayAgain = () => {
    setQuestions(generateQuestions(10, expertMode));
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizDone(false);
    setEmmaMsg(t('letsGoAgain'));
  };

  if (quizDone) {
    const level = getLevel(totalCorrect);
    return (
      <div className="min-h-screen bg-tea-cream p-4 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full">
          <PixelCard className="text-center">
            <Trophy className="mx-auto mb-3 text-tea-gold" size={32} />
            <h2 className="font-pixel text-sm text-tea-red mb-4">{t('quizComplete')}</h2>
            <div className="space-y-2 mb-4">
              <p className="font-pixel text-[10px]">{t('score')}: {score} / {questions.length}</p>
              <p className="font-pixel text-[10px]">{t('bestStreak')}: {bestStreak}</p>
              <p className="font-pixel text-[10px]">{t('totalCorrect')}: {totalCorrect}</p>
              <p className="font-pixel text-xs text-tea-jade mt-2">{t('rank')}: {level}</p>
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <EmmaCharacter scale={2} />
              <TeaPet bounce={true} scale={2} />
            </div>
            <div className="flex flex-col gap-2">
              <PixelButton onClick={handlePlayAgain} variant="primary" className="w-full">
                {t('playAgain')}
              </PixelButton>
              <PixelButton onClick={onBack} variant="secondary" className="w-full">
                <span className="flex items-center justify-center gap-2"><ArrowLeft size={14} /> {t('backToMenu')}</span>
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
            <ArrowLeft size={14} /> {t('back')}
          </button>
          <div className="flex items-center gap-3">
            {setLang && <LangToggle lang={lang} setLang={setLang} />}
            <span className="font-pixel text-[10px] text-tea-gold flex items-center gap-1">
              <Star size={12} /> {score}
            </span>
            <span className="font-pixel text-[10px] text-tea-red flex items-center gap-1">
              <Flame size={12} /> {streak}
            </span>
          </div>
        </div>

        <ProgressBar current={currentIndex + 1} total={questions.length} label={`${t('question')} ${currentIndex + 1}`} />

        <div className="mt-4 mb-2 flex justify-between items-center">
          <span className="font-pixel text-[8px] text-gray-500">{t('level')}: {getLevel(totalCorrect)}</span>
          <button
            onClick={handleToggleExpert}
            className={`font-pixel text-[8px] px-2 py-1 pixel-border cursor-pointer transition-colors ${
              expertMode ? 'bg-tea-red text-white' : 'bg-gray-200 text-tea-ink'
            }`}
          >
            {expertMode ? t('expert') : t('normal')}
          </button>
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
              {currentIndex + 1 >= questions.length ? t('seeResults') : t('nextQuestion')}
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

function TeaCollection({ onBack, discoveredTeas, lang = 'en', setLang }) {
  const t = useCallback((key) => TEXTS[lang]?.[key] || TEXTS.en[key] || key, [lang]);
  const tf = useCallback((obj, field) => lang === 'nl' && obj[field + '_nl'] ? obj[field + '_nl'] : obj[field], [lang]);
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
            <ArrowLeft size={14} /> {t('backToCollection')}
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
                <p className="font-pixel text-[8px] text-gray-500 flex items-center gap-1"><Droplets size={10} /> {t('region')}</p>
                <p className="font-pixel text-[9px] mt-1">{tea.region}</p>
              </div>
              <div className="pixel-border-inset bg-gray-50 p-2">
                <p className="font-pixel text-[8px] text-gray-500 flex items-center gap-1"><Flame size={10} /> {t('temperature')}</p>
                <p className="font-pixel text-[9px] mt-1">{tea.temp}°C</p>
              </div>
              <div className="pixel-border-inset bg-gray-50 p-2">
                <p className="font-pixel text-[8px] text-gray-500 flex items-center gap-1"><Timer size={10} /> {t('steepTime')}</p>
                <p className="font-pixel text-[9px] mt-1">{tea.steepTime}</p>
              </div>
              <div className="pixel-border-inset bg-gray-50 p-2">
                <p className="font-pixel text-[8px] text-gray-500 flex items-center gap-1"><Coffee size={10} /> {t('leafAmount')}</p>
                <p className="font-pixel text-[9px] mt-1">{tea.gramsper100ml}g / 100ml</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="font-pixel text-[8px] text-gray-500 mb-2">{t('flavorNotes')}</p>
              <div className="flex flex-wrap gap-1">
                {(lang === 'nl' && tea.flavorNotes_nl ? tea.flavorNotes_nl : tea.flavorNotes).map((note, i) => (
                  <span key={i} className="font-pixel text-[8px] bg-tea-gold text-tea-ink px-2 py-1 pixel-border-inset">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="pixel-border-inset bg-yellow-50 p-3">
              <p className="font-pixel text-[8px] text-tea-gold flex items-center gap-1 mb-1">
                <Star size={10} /> {t('funFact')}
              </p>
              <p className="font-pixel text-[8px] leading-relaxed text-tea-ink">{tf(tea, 'funFact')}</p>
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
            <ArrowLeft size={14} /> {t('back')}
          </button>
          <h2 className="font-pixel text-xs text-tea-red">{t('collectionTitle')}</h2>
          {setLang && <LangToggle lang={lang} setLang={setLang} />}
        </div>

        <ProgressBar
          current={discoveredTeas.length}
          total={TEA_DATA.length}
          label={`${discoveredTeas.length} / ${TEA_DATA.length} ${t('teasDiscovered')}`}
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
                    <p className="font-pixel text-[7px] text-gray-300 mt-1">{t('answerQuizToDiscover')}</p>
                  </div>
                )}
              </PixelCard>
            );
          })}
        </div>

        {discoveredTeas.length === 0 && (
          <SpeechBubble message={t('emptyCollection')} />
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

function BrewingSimulator({ onBack, lang = 'en', setLang }) {
  const t = useCallback((key) => TEXTS[lang]?.[key] || TEXTS.en[key] || key, [lang]);
  const [selectedTea, setSelectedTea] = useState(null);
  const [step, setStep] = useState(0);
  const [chosenTemp, setChosenTemp] = useState(85);
  const [chosenGrams, setChosenGrams] = useState(null);
  const [steepElapsed, setSteepElapsed] = useState(0);
  const [steepRunning, setSteepRunning] = useState(false);
  const [scores, setScores] = useState({ temp: false, grams: false, steep: false });
  const [emmaMsg, setEmmaMsg] = useState(() => TEXTS[lang]?.chooseTea || "Choose a tea to begin your Gong Fu Cha journey!");
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
      setEmmaMsg(t('perfectTemp'));
    } else if (chosenTemp > selectedTea.temp) {
      setEmmaMsg(t('tooHot'));
    } else {
      setEmmaMsg(t('tooCold'));
    }
    setStep(2);
  };

  const handleWarmGaiwan = () => {
    setEmmaMsg(t('warmGaiwan'));
    setTimeout(() => setStep(3), 800);
  };

  const handleSelectGrams = (g) => {
    setChosenGrams(g);
    const correct = g === selectedTea.gramsper100ml;
    setScores(prev => ({ ...prev, grams: correct }));
    if (correct) {
      setEmmaMsg(t('rightAmount'));
    } else {
      setEmmaMsg(`Hmm, ${selectedTea.name} works best with ${selectedTea.gramsper100ml}g per 100ml.`);
    }
    setStep(4);
  };

  const handleRinsePour = () => {
    setRinsePhase(1);
    setEmmaMsg(t('rinseMsg'));
    setTimeout(() => setRinsePhase(2), 1000);
  };

  const handleRinsePourPet = () => {
    setPetBounce(true);
    setTimeout(() => setPetBounce(false), 600);
    setEmmaMsg(t('rinsePetMsg'));
    setTimeout(() => {
      setStep(5);
      setSteepElapsed(0);
      setSteepRunning(true);
      setEmmaMsg(t('steepMsg'));
    }, 1200);
  };

  const handlePour = () => {
    setSteepRunning(false);
    const { min, max } = parseSteepTime(selectedTea.steepTime);
    const correct = steepElapsed >= (min - 5) && steepElapsed <= (max + 5);
    setScores(prev => ({ ...prev, steep: correct }));
    if (steepElapsed < min - 5) {
      setEmmaMsg(t('thinFlavor'));
    } else if (steepElapsed > max + 5) {
      setEmmaMsg(t('overSteeped'));
    } else {
      setEmmaMsg(t('perfectTiming'));
    }
    setStep(6);
  };

  const handlePourToPitcher = () => {
    setPourAnim(true);
    setEmmaMsg(t('fairnessMsg'));
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
    setEmmaMsg(t('chooseTea'));
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
      if (stars === 3) setEmmaMsg(t('perfectBrew'));
      else if (stars === 2) setEmmaMsg(t('gettingThere'));
      else setEmmaMsg(t('keepTrying'));
    }
  }, [step, stars]);

  // Active item for tray highlighting
  const activeItem = step === 1 ? 'kettle'
    : (step === 4 && rinsePhase === 2) ? 'pet'
    : step === 2 || step === 3 || step === 4 || step === 5 ? 'gaiwan'
    : step === 6 ? 'pitcher' : step === 7 ? 'cups' : null;

  return (
    <div className="min-h-screen bg-tea-cream p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="font-pixel text-xs text-tea-ink hover:text-tea-red flex items-center gap-1 cursor-pointer">
            <ArrowLeft size={14} /> {t('back')}
          </button>
          <h2 className="font-pixel text-sm text-tea-red flex-1 text-center">{t('brewingTitle')}</h2>
          {setLang && <LangToggle lang={lang} setLang={setLang} />}
        </div>

        {/* Step 0: Tea Selection */}
        {step === 0 && (
          <>
            <div className="flex items-start gap-3 mb-4">
              <EmmaCharacter scale={2} />
              <SpeechBubbleInline text={emmaMsg} />
            </div>
            <p className="font-pixel text-[10px] text-tea-ink mb-3 text-center">{t('selectTea')}</p>
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
              <span className="font-pixel text-[8px] text-tea-ink flex items-center gap-1"><Flame size={10} /> ???</span>
              <span className="font-pixel text-[8px] text-tea-ink flex items-center gap-1"><Timer size={10} /> ???</span>
              <span className="font-pixel text-[8px] text-tea-ink flex items-center gap-1"><Coffee size={10} /> ???</span>
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
                  <p className="font-pixel text-[10px] text-tea-ink mb-3 text-center">{t('step1Title')}</p>
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
                    {t('confirmTemperature')}
                  </PixelButton>
                </PixelCard>
              )}

              {/* Step 2: Warm Gaiwan */}
              {step === 2 && (
                <PixelCard>
                  <p className="font-pixel text-[10px] text-tea-ink mb-3 text-center">{t('step2Title')}</p>
                  <p className="font-pixel text-[8px] text-gray-500 mb-3 text-center">{t('step2Desc')}</p>
                  <PixelButton onClick={handleWarmGaiwan} variant="secondary" className="w-full">
                    {t('pourAndSwirl')}
                  </PixelButton>
                </PixelCard>
              )}

              {/* Step 3: Add Tea Leaves */}
              {step === 3 && (
                <PixelCard>
                  <p className="font-pixel text-[10px] text-tea-ink mb-3 text-center">{t('step3Title')}</p>
                  <p className="font-pixel text-[8px] text-gray-500 mb-3 text-center">{t('step3Desc')}</p>
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
                  <p className="font-pixel text-[10px] text-tea-ink mb-3 text-center">{t('step4Title')}</p>
                  {rinsePhase === 0 && (
                    <PixelButton onClick={handleRinsePour} variant="secondary" className="w-full">
                      {t('pourHotWater')}
                    </PixelButton>
                  )}
                  {rinsePhase === 1 && (
                    <p className="font-pixel text-[9px] text-tea-gold text-center animate-blink">{t('rinsing')}</p>
                  )}
                  {rinsePhase === 2 && (
                    <PixelButton onClick={handleRinsePourPet} variant="secondary" className="w-full">
                      {t('pourOverTeaPet')}
                    </PixelButton>
                  )}
                </PixelCard>
              )}

              {/* Step 5: Steep */}
              {step === 5 && (
                <PixelCard>
                  <p className="font-pixel text-[10px] text-tea-ink mb-2 text-center">{t('step5Title')}</p>
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
                    {t('pour')}
                  </button>
                </PixelCard>
              )}

              {/* Step 6: Pour to Pitcher */}
              {step === 6 && (
                <PixelCard>
                  <p className="font-pixel text-[10px] text-tea-ink mb-3 text-center">{t('step6Title')}</p>
                  {!pourAnim ? (
                    <PixelButton onClick={handlePourToPitcher} variant="secondary" className="w-full">
                      {t('pourTea')}
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
                  <p className="font-pixel text-sm text-tea-ink mb-4 text-center">{t('brewingResults')}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between font-pixel text-[9px]">
                      <span className="text-tea-ink">{t('temperatureLabel')}</span>
                      <span className={scores.temp ? 'text-green-600' : 'text-red-600'}>
                        {scores.temp ? <Check size={12} className="inline" /> : <X size={12} className="inline" />}
                        {' '}{chosenTemp}°C {!scores.temp && `→ ${selectedTea.temp}°C`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-pixel text-[9px]">
                      <span className="text-tea-ink">{t('leafAmountLabel')}</span>
                      <span className={scores.grams ? 'text-green-600' : 'text-red-600'}>
                        {scores.grams ? <Check size={12} className="inline" /> : <X size={12} className="inline" />}
                        {' '}{chosenGrams}g {!scores.grams && `→ ${selectedTea.gramsper100ml}g`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-pixel text-[9px]">
                      <span className="text-tea-ink">{t('steepTimeLabel')}</span>
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
                    <p className="font-pixel text-[9px] text-gray-500 mt-1">{stars}/3 {t('stars')}</p>
                  </div>

                  <div className="flex gap-3">
                    <PixelButton onClick={handleBrewAgain} variant="secondary" className="flex-1">
                      {t('brewAgain')}
                    </PixelButton>
                    <PixelButton onClick={handleTryDifferent} variant="primary" className="flex-1">
                      {t('differentTea')}
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
  const [lang, setLang] = useState(() => {
    const saved = loadSave();
    return saved?.lang || 'en';
  });
  const [discoveredTeas, setDiscoveredTeas] = useState(() => {
    const saved = loadSave();
    return Array.isArray(saved?.discoveredTeas) ? saved.discoveredTeas : [];
  });

  useEffect(() => {
    writeSave({ discoveredTeas });
  }, [discoveredTeas]);

  useEffect(() => {
    writeSave({ lang });
  }, [lang]);

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
          lang={lang}
          setLang={setLang}
        />
      );
    case 'collection':
      return (
        <TeaCollection
          onBack={handleBack}
          discoveredTeas={discoveredTeas}
          lang={lang}
          setLang={setLang}
        />
      );
    case 'brewing':
      return <BrewingSimulator onBack={handleBack} lang={lang} setLang={setLang} />;
    case 'learn':
      return <TeaLearning onBack={handleBack} lang={lang} setLang={setLang} />;
    default:
      return <TitleScreen onNavigate={handleNavigate} lang={lang} setLang={setLang} />;
  }
}
