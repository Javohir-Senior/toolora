import { ToolItem, AIServiceItem } from '../types';

export const TOOLS: ToolItem[] = [
  {
    id: 'image-compressor',
    name: {
      uz: 'Rasm Siqish (Image Compressor)',
      en: 'Image Compressor',
    },
    shortDesc: {
      uz: 'Rasm sifatini saqlagan holda fayl hajmini sezilarli darajada kichraytiring va optimallashtiring.',
      en: 'Reduce image file sizes significantly while maintaining sharp visual quality directly in browser.',
    },
    fullDesc: {
      uz: 'Toolora Rasm Siqish vositasi HTML5 Canvas texnologiyasidan foydalanib, JPG, PNG va WebP formatidagi suratlarni bevosita brauzeringizda siqadi. Hech qanday ma\'lumot serverga yuborilmaydi.',
      en: 'Toolora Image Compressor uses client-side HTML5 Canvas technology to optimize JPG, PNG, and WebP images instantly in your browser with zero server uploads.',
    },
    instructions: {
      uz: [
        'Rasmni yuklash maydoniga tashlang yoki faylni tanlang (25MB gacha).',
        'Siqish sifati slayderini o‘zingizga mos darajaga sozlang (tavsiya: 70-85%).',
        'Zarur bo‘lsa maksimal kenglikni belgilang va chiquvchi formatni tanlang.',
        'Natijani tekshirib, siqilgan faylni "Yuklab olish" tugmasi orqali saqlang.',
      ],
      en: [
        'Drag and drop your image into the drop zone or click to browse (up to 25MB).',
        'Adjust the quality slider to your desired balance (70-85% recommended).',
        'Optionally set a max width constraint or switch format (JPEG/WebP).',
        'Preview the compressed result and click "Download" to save.',
      ],
    },
    category: 'image',
    iconName: 'Image',
    tags: ['rasm', 'compress', 'siqish', 'photo', 'jpeg', 'png', 'webp', 'optimize', 'kichraytirish'],
    isExternal: false,
    route: '/tool/image-compressor',
    isPopular: true,
    status: 'active',
    badge: {
      uz: 'Ommabop',
      en: 'Popular',
    },
  },
  {
    id: 'qr-generator',
    name: {
      uz: 'QR Kod Yaratuvchi',
      en: 'QR Code Generator',
    },
    shortDesc: {
      uz: 'Istalgan matn, URL manzil yoki WiFi tarmog‘i uchun rangli va yuqori sifatli QR kod yarating.',
      en: 'Generate crisp, customizable QR codes with custom colors and error-correction levels.',
    },
    fullDesc: {
      uz: 'Tezkor va aniq QR kod generatori. Veb-saytlar, Telegram kanallari, WiFi ulanishlari yoki oddiy xabarlar uchun yuqori sifatli QR kodlar yarating va PNG formatida yuklab oling.',
      en: 'Fast, high-fidelity QR Code generator for web URLs, Telegram channels, WiFi connections, or text messages. Download crisp PNG images with customizable colors.',
    },
    instructions: {
      uz: [
        'Matn yoki veb-sayt havolasini kiriting.',
        'QR kod o‘lchamini (256px dan 512px gacha) va xatolikni tuzatish darajasini tanlang.',
        'Chiziqlar va orqa fon rangini o‘z xohishingizga ko‘ra moslang.',
        '"PNG sifatida yuklab olish" tugmasini bosing.',
      ],
      en: [
        'Enter your text, URL, or data into the input field.',
        'Configure the code size (256px to 512px) and error correction level.',
        'Customize pattern foreground and background colors if desired.',
        'Download the generated code as high-resolution PNG.',
      ],
    },
    category: 'productivity',
    iconName: 'QrCode',
    tags: ['qr', 'qrcode', 'kod', 'barcode', 'havola', 'url', 'wifi', 'share'],
    isExternal: false,
    route: '/tool/qr-generator',
    isPopular: true,
    status: 'active',
    badge: {
      uz: 'Tezkor',
      en: 'Fast',
    },
  },
  {
    id: 'text-formatter',
    name: {
      uz: 'Matn Formatlagich',
      en: 'Text Formatter',
    },
    shortDesc: {
      uz: 'Ortiqcha bo‘shliqlar, takroriy satrlarni tozalash, harflar registri va alifbo bo‘yicha tartiblash.',
      en: 'Clean extra spaces, eliminate duplicate lines, convert case, and sort text in one click.',
    },
    fullDesc: {
      uz: 'Matnlar bilan ishlovchi har qanday mutaxassis uchun ajralmas vosita. Matndagi ortiqcha probellarni tozalang, bir xil qatorlarni olib tashlang, URL uchun slug yarating yoki satrlarni alifbo bo‘yicha tartiblang.',
      en: 'Essential text processing suite. Remove duplicate lines, trim whitespace, normalize spaces, slugify strings, and sort items alphabetically with instant live preview.',
    },
    instructions: {
      uz: [
        'Formatlanishi kerak bo‘lgan matnni maydonga kiriting yoki nusxalab tashlang.',
        'Tegishli formatlash tugmasini bosing (bo‘shliqlar tozalash, registr o‘zgartirish va h.k.).',
        'Natijani "Nusxalash" tugmasi orqali oling.',
      ],
      en: [
        'Paste or type the text you want to format into the input area.',
        'Click the desired formatting action (Trim spaces, Dedup lines, Case conversions).',
        'Click "Copy" to immediately put the cleaned text onto your clipboard.',
      ],
    },
    category: 'text',
    iconName: 'FileText',
    tags: ['matn', 'text', 'format', 'lowercase', 'uppercase', 'clean', 'slug', 'trim', 'tartiblash'],
    isExternal: false,
    route: '/tool/text-formatter',
    isPopular: true,
    status: 'active',
  },
  {
    id: 'youtube-generator',
    name: {
      uz: 'YouTube Sarlavha va Tavsif Yaratuvchi',
      en: 'YouTube Title & Description Generator',
    },
    shortDesc: {
      uz: 'Videongiz uchun yuqori bosish (CTR) keltiruvchi sarlavhalar va tartibli tavsif andozalari.',
      en: 'Generate high-CTR title variations and structured description blueprints for YouTube videos.',
    },
    fullDesc: {
      uz: 'YouTube kontent mualliflari uchun maxsus tuzilgan vosita. Mavzuingizga mos keluvchi 7 xil sarlavha uslubi (How-to, qiziqish uyg‘otuvchi, ro‘yxat, boshlovchilar uchun) va vaqt belgilari (timestamps), xulosa va heshteglardan iborat to‘liq tavsif yaratadi.',
      en: 'Built specifically for video creators. Generates 7 proven title frameworks (How-To, Curiosity, Listicle, Deep-dive) alongside structured descriptions with timestamp blueprints and SEO hashtags.',
    },
    instructions: {
      uz: [
        'Video mavzusi yoki asosiy kalit so‘zni kiriting.',
        'Video turi (darslik, sharh, shorts), maqsadli auditoriya va ohangni tanlang.',
        '"Yaratish" tugmasini bosing va o‘zingizga ma\'qul bo‘lgan sarlavha va tavsifni nusxalab oling.',
      ],
      en: [
        'Enter your video topic or core search terms.',
        'Select video type, target audience, tone of voice, and output language.',
        'Click Generate, then copy title variations or customize the structured description.',
      ],
    },
    category: 'creator',
    iconName: 'Youtube',
    tags: ['youtube', 'video', 'creator', 'sarlavha', 'title', 'description', 'tavsif', 'seo', 'hashtags'],
    isExternal: false,
    route: '/tool/youtube-generator',
    isPopular: true,
    status: 'active',
    badge: {
      uz: 'Kreatorlar',
      en: 'Creators',
    },
  },
  {
    id: 'word-counter',
    name: {
      uz: 'So‘z Hisoblagich va Matn Tahlili',
      en: 'Word Counter & Text Analyzer',
    },
    shortDesc: {
      uz: 'So‘zlar, belgilar, jumlalar, xatboshilar va taxminiy o‘qish vaqtini real vaqtda hisoblang.',
      en: 'Real-time calculation of words, characters, sentences, paragraphs, and reading time pace.',
    },
    fullDesc: {
      uz: 'Maqolalar, insholar, postlar va ilmiy ishlar hajmini aniqlash uchun mukammal matn tahlilchisi. O‘qish va nutq vaqtini hisoblaydi, eng ko‘p takrorlangan kalit so‘zlarni ko‘rsatadi.',
      en: 'Comprehensive text metrics tool for writers, students, and editors. Counts words, characters with/without spaces, sentences, paragraphs, reading time (200 wpm), and keyword density.',
    },
    instructions: {
      uz: [
        'Matn maydoniga matnni yozing yoki namuna matn tugmasini bosing.',
        'Yuqori paneldagi hisoblagichlar avtomatik tarzda real vaqtda yangilanadi.',
        'Quyidagi kalit so‘zlar jadvalida eng ko‘p uchragan so‘zlarni ko‘rishingiz mumkin.',
      ],
      en: [
        'Type or paste your text into the editor, or use the Sample button.',
        'All statistics update automatically in real-time as you type.',
        'Inspect the keyword frequency breakdown and estimated reading time.',
      ],
    },
    category: 'text',
    iconName: 'Calculator',
    tags: ['hisoblagich', 'words', 'counter', 'so‘z', 'belgilar', 'matn', 'reading time', 'seo', 'stats'],
    isExternal: false,
    route: '/tool/word-counter',
    isPopular: true,
    status: 'active',
  },
  {
    id: 'json-formatter',
    name: {
      uz: 'JSON Formatlagich va Validator',
      en: 'JSON Formatter & Validator',
    },
    shortDesc: {
      uz: 'JSON ma\'lumotlarini chiroyli ko‘rinishga keltirish, sintaksis xatolarini tekshirish va siqish.',
      en: 'Beautify, validate syntax, format with custom indentation, or minify JSON data.',
    },
    fullDesc: {
      uz: 'Dasturchilar va API bilan ishlovchilar uchun qulay JSON vositasi. Buzilgan qavslar va xatoliklarni aniqlab, 2 yoki 4 bo‘shliq bilan formatlash yoki ixchamlashtirish (minify) imkonini beradi.',
      en: 'Developer-grade JSON validator and beautifier. Detects syntax errors with line indicators and formats JSON strings with 2-space, 4-space, or minified compactness.',
    },
    instructions: {
      uz: [
        'JSON matnini kiriting.',
        'Chiroyli qilish (2 yoki 4 bo‘shliq) yoki Siqish (Minify) tugmasini bosing.',
        'Agar sintaksisda xato bo‘lsa, ogohlantirish maydonida aniq ko‘rsatiladi.',
      ],
      en: [
        'Paste your raw JSON into the text editor.',
        'Click Beautify (2 spaces / 4 spaces) or Minify.',
        'Instantly view validation status and copy cleaned JSON.',
      ],
    },
    category: 'developer',
    iconName: 'Code',
    tags: ['json', 'format', 'developer', 'beautify', 'validate', 'api', 'code', 'dasturchi'],
    isExternal: false,
    route: '/tool/json-formatter',
    isPopular: false,
    status: 'active',
  },
  {
    id: 'password-generator',
    name: {
      uz: 'Xavfsiz Parol Yaratuvchi',
      en: 'Secure Password Generator',
    },
    shortDesc: {
      uz: 'Buzib bo‘lmas kuchli parollar, moslashuvchan uzunlik va maxsus belgilar bilan lahzada.',
      en: 'Generate cryptographically strong passwords with customizable length and character sets.',
    },
    fullDesc: {
      uz: 'Hisobingiz xavfsizligini oshirish uchun kriptografik tasodifiy algoritmlar yordamida parollar yaratish vositasi. Chalkash belgilarni istisno qilish va mustahkamlik ko‘rsatkichini o‘z ichiga oladi.',
      en: 'Generate high-entropy secure passwords using Web Crypto API. Includes length adjustments, symbol exclusions, and real-time entropy strength evaluation.',
    },
    instructions: {
      uz: [
        'Parol uzunligini tanlang (masalan, 16 yoki 20 belgi).',
        'Katta, kichik harflar, raqamlar va maxsus belgilar parametrlarini yoqing yoki o‘chiring.',
        '"Yangi parol yaratish" tugmasini bosing va bir bosishda nusxalab oling.',
      ],
      en: [
        'Choose your desired password length (12-32 characters recommended).',
        'Toggle uppercase, lowercase, numbers, and special symbols.',
        'Click Generate, review the strength meter, and copy to clipboard.',
      ],
    },
    category: 'productivity',
    iconName: 'ShieldCheck',
    tags: ['parol', 'password', 'security', 'xavfsizlik', 'generator', 'crypto', 'himoya'],
    isExternal: false,
    route: '/tool/password-generator',
    isPopular: false,
    status: 'active',
  },
];

export const AI_SERVICES: AIServiceItem[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT (OpenAI)',
    tagline: {
      uz: 'Dunyoning eng mashhur universal matn va muloqot AI yordamchisi',
      en: 'The industry-leading conversational assistant for writing, coding, and problem solving',
    },
    category: 'Matn & Yozish / Conversational',
    verifiedUrl: 'https://chatgpt.com',
    pricing: 'Freemium',
    description: {
      uz: 'Maqolalar yozish, g‘oyalar shakllantirish, dasturlash va tahliliy hisob-kitoblar uchun universal intellektual chat.',
      en: 'All-around conversational AI model for coding, content generation, ideation, and reasoning.',
    },
    tags: ['chatgpt', 'openai', 'text', 'writing', 'coding'],
    popular: true,
  },
  {
    id: 'claude',
    name: 'Claude (Anthropic)',
    tagline: {
      uz: 'Katta hajmdagi hujjatlar tahlili va yuqori sifatli dasturlash uchun AI',
      en: 'Advanced reasoning, long-context document analysis, and human-like natural prose',
    },
    category: 'Tahlil & Dasturlash / Reasoning',
    verifiedUrl: 'https://claude.ai',
    pricing: 'Freemium',
    description: {
      uz: 'Kitoblar, murakkab kod bazalari va uzoq matnlarni chuqur tushunuvchi xavfsiz sun\'iy intellekt modeli.',
      en: 'Engineered for exceptional safety, coding excellence, and high nuance in writing and reasoning.',
    },
    tags: ['claude', 'anthropic', 'reasoning', 'writing', 'code'],
    popular: true,
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    tagline: {
      uz: 'Aniq manbalar va internetdan yangi ma\'lumotlar beruvchi AI qidiruv tizimi',
      en: 'AI-powered conversational search engine with transparent web citations',
    },
    category: 'Qidiruv & Tadqiqot / Search',
    verifiedUrl: 'https://www.perplexity.ai',
    pricing: 'Freemium',
    description: {
      uz: 'An\'anaviy qidiruv tizimlarining o‘rnini bosuvchi, har bir javobiga ilmiy va ishonchli manbalarni havola qiluvchi tizim.',
      en: 'Combines direct search grounding with LLM summarization, delivering instant answers with credible sources.',
    },
    tags: ['search', 'research', 'perplexity', 'qidiruv'],
    popular: true,
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    tagline: {
      uz: 'Kuchli matematik va dasturlash qobiliyatiga ega ochiq arxitekturali model',
      en: 'High-performing reasoning and coding models known for extreme efficiency',
    },
    category: 'Dasturlash & Matematika / Reasoning',
    verifiedUrl: 'https://chat.deepseek.com',
    pricing: 'Free',
    description: {
      uz: 'Murakkab dasturlash vazifalari, mantiqiy masalalar va texnik hisob-kitoblarni tez hal qiluvchi model.',
      en: 'Open reasoning models optimized for deep code generation and technical algorithmic problem-solving.',
    },
    tags: ['deepseek', 'code', 'math', 'reasoning'],
    popular: true,
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    tagline: {
      uz: 'Fotorealistik va badiiy san\'at darajasidagi rasmlar yaratuvchi yetakchi AI',
      en: 'Industry-standard generative AI art and photorealistic imagery engine',
    },
    category: 'Rasm & San\'at / Image Generation',
    verifiedUrl: 'https://www.midjourney.com',
    pricing: 'Paid',
    description: {
      uz: 'Dizaynerlar, rassomlar va illyustratorlar uchun eng sifatli tasvirlar generatsiya qiluvchi tizim.',
      en: 'Produces breathtaking photorealistic and artistic renders from detailed natural language prompts.',
    },
    tags: ['art', 'image', 'design', 'midjourney', 'rasm'],
    popular: true,
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    tagline: {
      uz: 'Inson ovozidan farq qilmaydigan tabiiy ovozlashtirish va audio AI',
      en: 'State-of-the-art voice synthesis, multilingual dubbing, and AI speech',
    },
    category: 'Ovoz & Audio / Voice AI',
    verifiedUrl: 'https://elevenlabs.io',
    pricing: 'Freemium',
    description: {
      uz: 'Matnni jonli inson ovoziga aylantirish, ovoz klonlash va 30 dan ortiq tillarda audio kontent tayyorlash.',
      en: 'High-fidelity text-to-speech with emotional depth, voice cloning, and multilingual video dubbing.',
    },
    tags: ['audio', 'voice', 'speech', 'elevenlabs', 'ovoz'],
    popular: true,
  },
  {
    id: 'v0-dev',
    name: 'v0 by Vercel',
    tagline: {
      uz: 'Matnli tavsifdan tayyor React & Tailwind veb interfeyslar yaratuvchi AI',
      en: 'Generative UI system building clean React, Tailwind CSS, and shadcn components',
    },
    category: 'Frontend & UI / Generative UI',
    verifiedUrl: 'https://v0.dev',
    pricing: 'Freemium',
    description: {
      uz: 'Faqatgina tavsif yozish orqali toza va chiroyli React komponentlari kodini bir zumda qo‘lga kiritish.',
      en: 'Describe user interfaces and receive clean, copy-pasteable React, Tailwind, and accessible UI code.',
    },
    tags: ['frontend', 'react', 'ui', 'tailwind', 'v0'],
    popular: false,
  },
  {
    id: 'canva-magic',
    name: 'Canva Magic Studio',
    tagline: {
      uz: 'Ijtimoiy tarmoqlar, taqdimotlar va bannerlar uchun sun\'iy intellekt dizayn',
      en: 'Accessible visual design suite with integrated AI image, text, and layout tools',
    },
    category: 'Dizayn & Taqdimot / Design Suite',
    verifiedUrl: 'https://www.canva.com',
    pricing: 'Freemium',
    description: {
      uz: 'Grafik dizayn, Instagram postlar, YouTube muqovalari va slaydlar uchun sodda AI yordamchilari.',
      en: 'Intuitive graphic design workspace powered by AI background removal, layout remixing, and text generation.',
    },
    tags: ['canva', 'design', 'social', 'presentation'],
    popular: false,
  },
  {
    id: 'runway',
    name: 'RunwayML',
    tagline: {
      uz: 'Kinematografik video generatsiya va tahrirlash platformasi (Gen-2 / Gen-3)',
      en: 'Next-generation video generation, animation, and motion design platform',
    },
    category: 'Video & Motion / Video Generation',
    verifiedUrl: 'https://runwayml.com',
    pricing: 'Freemium',
    description: {
      uz: 'Matn yoki suratlardan video roliklar yaratish, harakatlarni boshqarish va video montaj.',
      en: 'Pioneering AI video tools allowing creators to turn text, images, or footage into cinematic video clips.',
    },
    tags: ['video', 'animation', 'runway', 'motion'],
    popular: false,
  },
];
