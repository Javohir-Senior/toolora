/**
 * YouTube Title and Description Generator using deterministic heuristics and templates.
 * Supports Uzbek and English languages.
 */

export interface YouTubeGeneratorInput {
  topic: string;
  videoType: 'tutorial' | 'review' | 'listicle' | 'vlog' | 'deepdive' | 'shorts';
  audience: 'beginners' | 'intermediate' | 'experts' | 'general';
  tone: 'engaging' | 'educational' | 'curiosity' | 'casual';
  language: 'uz' | 'en';
}

export interface GeneratedYouTubeContent {
  titles: { title: string; style: string }[];
  description: string;
  hashtags: string[];
}

export function generateYouTubeContent(input: YouTubeGeneratorInput): GeneratedYouTubeContent {
  const cleanTopic = input.topic.trim();
  const lang = input.language;
  const currentYear = 2026;

  if (!cleanTopic) {
    return {
      titles: [],
      description: '',
      hashtags: [],
    };
  }

  // Uzbek templates
  if (lang === 'uz') {
    const titles = [
      {
        style: "Qo'llanma / How-To",
        title: `${cleanTopic} Bo'yicha To'liq Qo'llanma (${currentYear}) — Noldan Boshlab!`,
      },
      {
        style: "Qiziqish / Xatolar",
        title: `${cleanTopic} Bilan Shug'ullanayotganda Bu 5 Ta Xatoni Qilmang!`,
      },
      {
        style: "Ekspert / Chuqur Tahlil",
        title: `${cleanTopic}: Siz Bilmagan Eng Foydali Sirlar va Usullar`,
      },
      {
        style: "Raqamli / Ro'yxat",
        title: `${cleanTopic} Uchun Eng Yaxshi 7 Maslahat (Tezkor Natija)`,
      },
      {
        style: "Boshlang'ichlar Uchun",
        title: `10 Daqiqada ${cleanTopic} Asoslarini O'rganing | Boshlovchilar Uchun`,
      },
      {
        style: "Amaliy / Real Case",
        title: `Qanday Qilib ${cleanTopic} Orqali Yuqori Samaradorlikka Erishish Mumkin?`,
      },
      {
        style: "Shorts / Dinamik",
        title: `${cleanTopic} Haqida 60 Sekundda Bilishingiz Kerak Bo'lgan Muhim Qoida!`,
      },
    ];

    const hashtags = [
      `#${cleanTopic.replace(/\s+/g, '').toLowerCase()}`,
      '#foydalidars',
      '#uzbekistan',
      '#maslahat',
      '#onlinekurs',
      '#samaradorlik',
    ];

    const description = `🔥 Ushbu videoda biz ${cleanTopic} mavzusini to'liq ko'rib chiqamiz. Agar siz noldan boshlayotgan bo'lsangiz yoki o'z bilimingizni yangilamoqchi bo'lsangiz, ushbu video aynan siz uchun!

📌 Videoda ko'riladigan asosiy masalalar:
- ${cleanTopic} nima va nima uchun bugungi kunda juda muhim?
- Yangi boshlovchilar yo'l qo'yadigan eng keng tarqalgan xatolar
- Samaradorlikni oshirish uchun professional maslahatlar va amaliy qadamlar
- Tavsiya etiladigan manbalar va vositalar

⏱ Vaqt belgilari (Timestamps):
00:00 - Kirish va umumiy tushuncha
01:15 - ${cleanTopic} asoslari
04:30 - Eng ko'p uchraydigan xatolar va ularning yechimi
07:50 - Professional maslahatlar va amaliy misollar
11:20 - Xulosa va keyingi qadamlar

💡 Foydali havolalar va manbalar:
- Telegram kanalimiz: https://t.me/example
- Rasmiy veb-sayt: https://example.com

👍 Agar video sizga foydali bo'lgan bo'lsa, LAYK bosing va kanalimizga OBUNA bo'ling! Savollaringizni izohlarda qoldiring, barchasiga javob beramiz.

${hashtags.join(' ')}`;

    return { titles, description, hashtags };
  }

  // English templates
  const titles = [
    {
      style: "Ultimate Guide",
      title: `The Ultimate Guide to ${cleanTopic} in ${currentYear} (Step-by-Step)`,
    },
    {
      style: "Curiosity & Mistakes",
      title: `Stop Doing ${cleanTopic} Like This! (5 Huge Mistakes)`,
    },
    {
      style: "Fast Track / Time-Saver",
      title: `Master ${cleanTopic} in 15 Minutes — Beginner to Pro`,
    },
    {
      style: "Listicle / Secret Strategies",
      title: `7 Proven ${cleanTopic} Strategies That Actually Work`,
    },
    {
      style: "Deep Dive / Breakdown",
      title: `Why Nobody Talks About This ${cleanTopic} Trick`,
    },
    {
      style: "Beginner Friendly",
      title: `${cleanTopic} Explained Simply for Beginners (${currentYear})`,
    },
    {
      style: "Shorts / Viral",
      title: `This One ${cleanTopic} Rule Will Change Everything! #Shorts`,
    },
  ];

  const hashtags = [
    `#${cleanTopic.replace(/\s+/g, '').toLowerCase()}`,
    '#productivity',
    '#tutorial',
    '#guide',
    '#tipsandtricks',
    '#howto',
  ];

  const description = `🚀 In this video, we dive deep into ${cleanTopic}. Whether you're completely new or looking to take your skills to the next level, this guide breaks down everything you need to know.

📌 What You'll Learn:
• Understanding the fundamentals of ${cleanTopic}
• The most common pitfalls to avoid
• Practical, actionable frameworks you can implement today
• Pro tips for saving time and maximizing results

⏱ Timestamps:
00:00 - Introduction & Why ${cleanTopic} Matters
01:30 - The Fundamentals
04:45 - Key Pitfalls & How to Avoid Them
08:20 - Step-by-Step Walkthrough
12:10 - Final Takeaways & Resources

🔗 Helpful Links & Resources:
• Official Website / Community: https://example.com
• Join our newsletter: https://example.com/newsletter

🔔 Subscribe for more in-depth productivity guides and tutorials! Leave a comment below with your thoughts or questions.

${hashtags.join(' ')}`;

  return { titles, description, hashtags };
}
