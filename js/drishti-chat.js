/**
 * DIVYA DRISHTI — "दृष्टि" (Drishti) AI Vedic Astrology Chatbot
 * Version: 2.0 (Dual Language, ChatGPT/Gemini Style Streaming, Astrology Guardrail, 5-Min Free Limit & Premium)
 * 
 * Features:
 * 1. Thoughtful ChatGPT / Gemini-style typing & streaming response (1.8s thinking + realistic typewriter).
 * 2. Strict Astrology Guardrail: Refuses any non-astrology / non-life guidance topic.
 * 3. Bilingual Intelligence: Native Hindi (हिन्दी) & International English (English) with live toggle.
 * 4. 5-Minute Free Consultation Limit with live countdown timer.
 * 5. Premium Subscription Paywall: ₹150/month or ₹1,500/year.
 * 6. Direct Escalation to Shastri Amit Kumar Sharma (+91 98297 43685) for Vedic Anushthan & Consultation.
 * 7. Live Kundli Synchronization.
 */

(function () {
  "use strict";

  if (window.DrishtiChat) return;

  const DRISHTI_AVATAR_SVG = `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <circle cx="18" cy="18" r="16" fill="url(#drishti-glow)" stroke="#F59E0B" stroke-width="1.5"/>
    <path d="M18 7L20.2 13.8H27.4L21.6 18L23.8 24.8L18 20.6L12.2 24.8L14.4 18L8.6 13.8H15.8L18 7Z" fill="#FFFBEB"/>
    <circle cx="18" cy="17" r="4.5" fill="#D97706"/>
    <circle cx="18" cy="17" r="2.2" fill="#FFFFFF"/>
    <defs>
      <radialGradient id="drishti-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(18 18) rotate(90) scale(16)">
        <stop stop-color="#DC2626"/>
        <stop offset="0.65" stop-color="#991B1B"/>
        <stop offset="1" stop-color="#450A0A"/>
      </radialGradient>
    </defs>
  </svg>`;

  const SHASTRI_PHONE = "+91 98297 43685";
  const SHASTRI_PHONE_CLEAN = "919829743685";
  const FREE_DURATION_SECONDS = 300; // 5 Minutes

  // ==========================================================================
  // ASTROLOGICAL KNOWLEDGE BASE & BILINGUAL DIALOG BRAIN
  // ==========================================================================
  const DrishtiBrain = {
    // Check if query is strictly related to Vedic astrology / personal life guidance
    isAstrologyRelated: function (query) {
      const q = query.toLowerCase().trim();

      // 1. Explicit Rejection Keywords (Coding, Politics, Science Homework, Sports, Movies, Cooking, etc.)
      const rejectionKeywords = [
        "python", "javascript", "java", "c++", "html", "css", "react", "node", "sql", "database",
        "api", "bug", "compile", "algorithm", "programming", "coding", "software", "script",
        "calculus", "derivative", "integral", "algebra", "velocity", "acceleration", "thermodynamics",
        "chemistry", "biology", "photosynthesis", "mitochondria", "physics homework",
        "election", "vote", "modi", "rahul gandhi", "bjp", "congress", "president", "prime minister",
        "parliament", "supreme court", "war in", "ukraine", "trump", "biden", "democracy",
        "cricket score", "ipl", "football", "messi", "ronaldo", "virat kohli", "dhoni", "box office",
        "bollywood", "hollywood", "actor", "actress", "lyrics of", "song download",
        "recipe", "how to cook", "ingredients of", "biryani", "pizza", "pasta", "cake recipe",
        "hack", "crack password", "cheat", "bitcoin mining"
      ];

      for (let i = 0; i < rejectionKeywords.length; i++) {
        if (q.includes(rejectionKeywords[i])) {
          return false;
        }
      }

      // 2. Astrology & Life Guidance Whitelist
      const astrologyKeywords = [
        "kundli", "कुंडली", "horoscope", "राशि", "rashi", "लग्न", "lagna", "नक्षत्र", "nakshatra",
        "ग्रह", "graha", "planet", "sun", "सूर्य", "moon", "चंद्र", "mars", "मंगल", "mercury", "बुध",
        "jupiter", "गुरु", "बृहस्पति", "venus", "शुक्र", "saturn", "शनि", "rahu", "राहु", "ketu", "केतु",
        "uranus", "हर्षल", "neptune", "नेपच्यून", "dasha", "दशा", "mahadasha", "महादशा", "antardasha",
        "gochar", "गोचर", "transit", "zodiac", "aries", "taurus", "gemini", "cancer", "leo", "virgo",
        "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
        "मेष", "वृष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या", "तुला", "वृश्चिक", "धनु", "मकर", "कुंभ", "कुम्भ", "मीन",
        "dosh", "दोष", "manglik", "मांगलिक", "kaal sarp", "कालसर्प", "sade sati", "साढ़ेसाती", "ढैय्या", "dhaiya",
        "gemstone", "रत्न", "stone", "pukhraj", "पुखराज", "moti", "मोती", "manik", "माणिक", "panna", "पन्ना", "heera", "हीरा",
        "neelam", "नीलम", "gomed", "गोमेद", "lahsunia", "लहसुनिया", "rudraksha", "रुद्राक्ष",
        "mantra", "मंत्र", "puja", "पूजा", "havan", "हवन", "anushthan", "अनुष्ठान", "baglamukhi", "बगलामुखी",
        "mahamrityunjaya", "महामृत्युंजय", "shiva", "शिव", "vishnu", "विष्णु", "lakshmi", "लक्ष्मी", "hanuman", "हनुमान",
        "vastu", "वास्तु", "muhurat", "मुहूर्त", "panchang", "पंचांग", "tithi", "तिथि", "amavasya", "अमावस्या", "purnima", "पूर्णिमा",
        // Life context
        "career", "करियर", "job", "नौकरी", "workload", "वर्कलोड", "kaam", "काम", "business", "व्यापार", "promotion", "तरक्की",
        "money", "धन", "paisa", "पैसा", "dhan", "invest", "निवेश", "share", "शेयर", "stock", "मार्केट", "gold", "सोना",
        "property", "प्रॉपर्टी", "जमीन", "मकान", "house", "plot", "loan", "कर्ज", "loss", "हानि", "labh", "लाभ", "gain",
        "love", "प्रेम", "marriage", "शादी", "vivah", "विवाह", "rishta", "रिश्ता", "partner", "पति", "पत्नी", "husband", "wife",
        "relationship", "संबंध", "breakup", "सगाई", "engagement", "family", "परिवार",
        "health", "स्वास्थ्य", "rog", "रोग", "bimari", "बीमारी", "tension", "तनाव", "stress", "depression", "उदास", "sad", "dar", "डर",
        "future", "भविष्य", "kismat", "किस्मत", "bhagya", "भाग्य", "faladesh", "फलादेश", "saransh", "सारांश", "upay", "उपाय", "remedy", "remedies",
        // Greetings & conversational pleasantries
        "hello", "hi", "namaste", "नमस्ते", "pranam", "प्रणाम", "radhe", "राधे", "ram", "राम", "krishna", "कृष्णा", "shree", "श्री",
        "thank", "धन्यवाद", "shukriya", "शुक्रिया", "who are you", "कौन हो", "kaun ho", "help", "मदद", "batao", "बताएं"
      ];

      for (let j = 0; j < astrologyKeywords.length; j++) {
        if (q.includes(astrologyKeywords[j])) {
          return true;
        }
      }

      // If short conversational query (< 4 words), be gentle
      if (q.split(/\s+/).length <= 2) {
        return true;
      }

      return false;
    },

    // Refusal response for out-of-scope topics
    getRefusal: function (lang) {
      if (lang === "en") {
        return `I sincerely apologize, dear! 🌸✨ I have been specifically designed **only for Vedic Astrology, Janam Kundli, planetary transits, and sacred life guidance (career, marriage, investments, and Vedic remedies)**. 🪐

I am not designed to assist with technical, political, general science, or other non-astrological subjects.

Please feel free to ask me anything about your **birth chart, stars, love life, career workload, auspicious investment timings, or daily remedies**—I will be delighted to guide you with utmost love and care! 💖🪔`;
      }

      return `क्षमा करें प्रिय जी! 🌸✨ मुझे केवल **वैदिक ज्योतिष, जन्म कुंडली, ग्रह-गोचर, और आपके जीवन के शुभ मार्गदर्शन (करियर, विवाह, धन व सरल उपाय)** के लिए ही बनाया गया है। 🪐

मैं अन्य तकनीकी, राजनीतिक, सामान्य विज्ञान या सांसारिक विषयों के लिए डिज़ाइन नहीं की गई हूँ। 

कृपया मुझसे अपने **जीवन, सितारों, भविष्य, लव लाइफ, करियर या दैनिक वैदिक उपायों** से संबंधित प्रश्न पूछें जी, मैं बहुत प्रेम और श्रद्धा से आपकी सहायता करूँगी! 💖🪔`;
    },

    // 1. GREETINGS
    getGreeting: function (lang) {
      if (lang === "en") {
        return `Namaste and warm greetings, dear friend! 🌸✨ I am your Vedic AI Astrologer companion, **Drishti**. Your stars carry beautiful blessings today. How may I lovingly guide you on your career, investments, love life, or Kundli remedies? 💖`;
      }
      return `नमस्ते प्रिय जी! 🌸✨ मैं आपकी वैदिक AI सहेली और मार्गदर्शक **"दृष्टि"** हूँ। आपके सितारे आज बहुत सुंदर संदेश दे रहे हैं। बताइए आज मैं आपके करियर, सही निवेश, लव लाइफ या कुंडली उपायों में क्या सहायता करूँ? 💖`;
    },

    // 2. INVESTMENT & WEALTH
    getInvestment: function (lang) {
      if (lang === "en") {
        return `Namaste dear friend! 💰✨ In Vedic Astrology, financial prosperity and investments are guided by the auspicious alignment of Jupiter, Mercury, and Venus:

🌟 **Golden Rules for Auspicious Investment**:
• **Jupiter's Blessing**: When Jupiter (Guru) transits or aspects your 2nd (wealth), 5th (speculation/intellect), 9th (fortune), or 11th (gains) house, investments yield lasting abundance. 📈
• **Sacred Nakshatras**: **Guru-Pushya**, **Ravi-Pushya**, **Rohini**, **Uttara Phalguni**, and **Shravana** nakshatras are considered supreme for financial growth.
• **Lunar Phase**: Always initiate investments during **Shukla Paksha (Waxing Moon)**.

💎 **Asset-Specific Timings**:
1. **Gold & Jewelry**: Buy on Thursdays or Sundays, ideally during **Abhijit Muhurat** (around 11:45 AM - 12:35 PM). ☀️
2. **Real Estate & Land**: Tuesdays or Saturdays under the favorable aspect of Mars (Bhumi Putra) and Saturn. 🏡
3. **Stock Market & Mutual Funds**: Wednesdays (Mercury governs commerce and trade). Ensure Rahu is favorable to avoid volatile losses. 📊

⚠️ **Cautions (Times to Avoid Risk)**:
• Avoid major financial transactions during daily **Rahu Kaal**.
• Refrain from high-risk speculation 3 days before and after Solar/Lunar Eclipses.
• Do not gamble or follow blind tips during Saturn's Sade Sati or retrograde Rahu transit.

🪔 **Sacred Remedies for Wealth**:
• Recite **'Om Shreem Hreem Kleem Mahalakshmyai Namah'** 11 times daily.
• Offer yellow fruits or chana dal to Lord Vishnu on Thursdays.
• Keep a clean silver coin in your wealth vault facing north. 💖✨`;
      }

      return `नमस्ते प्रिय जी! 💰✨ धन और निवेश के विषय में वैदिक ज्योतिष बहुत ही सुंदर और अचूक मार्गदर्शन देता है:

🌟 **शुभ निवेश का स्वर्णिम समय**:
• **गुरु की कृपा**: जब देवगुरु बृहस्पति आपकी कुंडली में 2रे (धन), 5वें (बुद्धि/लाभ), 9वें (भाग्य) या 11वें (आय) भाव में गोचर कर रहे हों, तब किया गया निवेश स्थायी समृद्धि देता है। 📈
• **शुभ नक्षत्र**: **गुरु-पुष्य योग**, **रवि-पुष्य**, **रोहिणी**, **उत्तरा फाल्गुनी**, और **श्रवण** नक्षत्र निवेश के लिए सर्वश्रेष्ठ माने गए हैं।
• **पक्ष का ध्यान**: हमेशा **शुक्ल पक्ष (बढ़ता चंद्रमा)** में नया निवेश शुरू करें।

💎 **क्षेत्र के अनुसार सही समय**:
1. **सोना (Gold) व आभूषण**: गुरुवार या रविवार को, विशेषकर अभिजीत मुहूर्त (दोपहर 11:45 से 12:35) में खरीदें। ☀️
2. **प्रॉपर्टी, जमीन व मकान**: मंगलवार या शनिवार को भूमिपुत्र मंगल और शनि देव की अनुकूलता देखकर बयाना दें। 🏡
3. **शेयर बाजार व म्यूचुअल फंड**: बुधवार को (बुध ग्रह व्यापार और शेयर के स्वामी हैं)। राहु की अनुकूलता होने पर टेक व ग्रोथ स्टॉक्स में लाभ मिलता है। 📊

⚠️ **सावधानियां (इन समय निवेश से बचें)**:
• प्रतिदिन के **राहु काल** में कोई नया खाता या बड़ा निवेश न करें।
• सूर्य या चंद्र ग्रहण के 3 दिन आगे-पीछे बड़े वित्तीय फैसले टालें।
• शनि की साढ़ेसाती या वक्री राहु के समय किसी के कहने पर बिना जांचे सट्टा या अति-जोखिम न लें।

🪔 **धन समृद्धि के सरल उपाय**:
• नित्य प्रातः **'ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः'** का 11 बार जप करें।
• गुरुवार को भगवान विष्णु को पीले फल या चने की दाल का भोग लगाएं।
• अपनी तिजोरी या लॉकर में उत्तर दिशा की ओर मुख करके एक चांदी का सिक्का रखें। 💖✨`;
    },

    // 3. CAREER & WORKLOAD
    getCareer: function (lang) {
      if (lang === "en") {
        return `Warm greetings dear! 💼🌟 I deeply understand your concerns regarding career, workplace workload, and stress:

⚖️ **The Astrological Cause of Workload & Stress**:
• Your chart's **10th house (Karma Bhava)** and **6th house (Service & Competition)** indicate career cycles. When Saturn (Shani Dev) or Rahu transit these houses, responsibilities and work pressure surge dramatically.
• Remember—Saturn tests you through hard work, but those who endure with patience receive permanent promotions, stature, and golden respect! 🏆

🌿 **Actionable Remedies for Success & Peace**:
1. **Daily Surya Arghya**: Offer water in a copper vessel with a pinch of kumkum to the Rising Sun while chanting 'Om Suryaya Namah'. This enhances authority and workplace charisma. ☀️
2. **Saturday Compassion**: On Saturday evenings, light a mustard oil lamp near a sacred Peepal tree and treat workplace support staff with respect and sweets. 🪔
3. **Workstation Vastu**: Align your work desk facing **North** or **East** for mental clarity and positive cosmic flow.
4. **Emotional Calming**: If dealing with stressful superiors, drink water from a silver cup or offer raw milk on Shiva Lingam on Mondays.

💖 Do not worry, dear! After every dip comes a massive rise. Your planetary alignments are forging you for long-term triumph! ✨💼`;
      }

      return `प्रणाम प्रिय जी! 💼🌟 कार्यक्षेत्र, नौकरी और कार्यभार (Workload) को लेकर आपकी चिंता को मैं भली-भांति समझ सकती हूँ:

⚖️ **वर्कलोड और तनाव का ज्योतिषीय कारण**:
• कुंडली का **10वां भाव (कर्म भाव)** और **6वां भाव (सेवा व संघर्ष)** जब शनि देव या राहु के प्रभाव में आता है, तो अचानक जिम्मेदारियां और काम का दबाव बहुत बढ़ जाता है।
• लेकिन याद रखें—शनि देव कठिन परिश्रम की परीक्षा लेते हैं, और जो इस परीक्षा में धैर्य रखता है, उसे बहुत बड़ी पदोन्नति और स्थायी मान-सम्मान मिलता है! 🏆

🌿 **वर्कलोड कम करने व तरक्की के अचूक उपाय**:
1. **नित्य सूर्य अर्घ्य**: प्रातः तांबे के लोटे में जल, चुटकी भर रोली (कुमकुम) और अक्षत डालकर सूर्य देव को 'ॐ सूर्याय नमः' कहकर अर्घ्य दें। इससे कार्यस्थल पर आपका प्रभाव व तेज बढ़ता है। ☀️
2. **शनिवार की सेवा**: शनिवार की शाम को पीपल के वृक्ष के पास सरसों के तेल का दीपक जलाएं और कार्यस्थल के चतुर्थ श्रेणी कर्मचारियों या सफाईकर्मियों को आदर दें व कुछ मीठा खिलाएं। 🪔
3. **कार्य डेस्क की दिशा**: अपने ऑफिस या दुकान में बैठते समय अपना मुख **उत्तर (North)** या **पूर्व (East)** दिशा की ओर रखें। इससे मानसिक स्पष्टता बनी रहती है।
4. **मानसिक शांति हेतु**: यदि बॉस या सहकर्मियों से तनाव हो, तो गले में चांदी की चेन पहनें या सोमवार को शिवलिंग पर कच्चा दूध अर्पित करें।

💖 घबराएं नहीं जी! हर उतार के बाद एक बहुत बड़ा चढ़ाव आता है। आपके सितारे आपको संघर्ष से निखारकर स्वर्णिम सफलता की ओर ले जा रहे हैं! ✨💼`;
    },

    // 4. LOVE & MARRIAGE
    getLoveMarriage: function (lang) {
      if (lang === "en") {
        return `Hello dear friend! ❤️🌸 Love and matrimonial bliss are the most sacred dimensions of life:

💖 **Cosmic Foundations of Love**:
• In Vedic astrology, the **5th house represents pure romance & affection**, while the **7th house governs marriage & partnership**.
• **Venus (Shukra)** rules romance and attraction, while **Jupiter (Guru)** bestows dignity, matrimonial longevity, and fortune.

💍 **When Do Marriage Yogas Form?**:
• When Jupiter transits or aspects your 7th house, or during favorable Venus Mahadasha/Antardasha, matrimonial proposals materialize swiftly.
• If facing delays or misunderstandings, observing Thursday fasts or offering turmeric to Lord Vishnu works wonders. 🌼

🕊️ **Simple Remedies for Harmony**:
1. **Lakshmi-Narayana Worship**: Offer white kheer or sweets to Goddess Lakshmi and Lord Vishnu on Fridays.
2. **Natural Fragrance**: Use natural sandalwood or rose fragrance (ittar) daily—it pleases Venus and enhances affection. 🌹
3. **Bedroom Harmony**: Place a serene picture of Radha-Krishna in the bedroom and keep the South-West corner fragrant and clutter-free.
4. **Sweet Speech**: Always speak with warmth and patience—when Mercury and Venus harmonize, every misunderstanding dissolves!

May your life be graced with eternal love, mutual understanding, and joy! 💖✨`;
      }

      return `नमस्ते प्यारे मित्र जी! ❤️🌸 प्रेम संबंध और वैवाहिक जीवन हृदय का सबसे कोमल और महत्वपूर्ण पहलू है:

💖 **सितारों का प्रेम संदेश**:
• आपकी कुंडली में **5वां भाव प्रेम और भावना** का होता है, और **7वां भाव विवाह व जीवनसाथी** का होता है।
• प्रेम और आकर्षण के अधिपति **शुक्र देव (Venus)** हैं और दांपत्य जीवन के धर्म व स्थायित्व के स्वामी **देवगुरु बृहस्पति** हैं।

💍 **विवाह योग कब बनते हैं?**:
• जब गुरु का गोचर 7वें भाव पर दृष्टि डाले, या शुक्र की अनुकूल महादशा/अंतर्दशा चल रही हो, तब विवाह के सुंदर और मनचाहे प्रस्ताव आते हैं।
• यदि रिश्ते बनने में देरी या रुकावट आ रही हो, तो गुरुवार का व्रत या हल्दी की गांठ का उपाय अत्यंत चमत्कारी फल देता है। 🌼

🕊️ **दांपत्य व प्रेम में मिठास के सरल उपाय**:
1. **लक्ष्मी-नारायण पूजन**: शुक्रवार के दिन माता लक्ष्मी और भगवान विष्णु को सफेद मिठाई या खीर का भोग लगाएं।
2. **सुगंध का प्रयोग**: प्रतिदिन हल्के चंदन या गुलाब के प्राकृतिक इत्र का प्रयोग करें—इससे शुक्र देव अत्यंत प्रसन्न होकर आकर्षण बढ़ाते हैं। 🌹
3. **कमरे में सामंजस्य**: शयनकक्ष में राधा-कृष्ण की बांसुरी बजाती हुई सुंदर तस्वीर लगाएं और दक्षिण-पश्चिम कोने को हमेशा स्वच्छ व सुगंधित रखें।
4. **संवाद का मंत्र**: वाणी में मिठास रखें जी! जब बुध और शुक्र संतुलित होते हैं, तो हर गलतफहमी दूर हो जाती है।

ईश्वर करे आपके जीवन में असीम प्रेम, समझ और खुशियां बरसें! 💖✨`;
    },

    // 5. FUTURE CHALLENGES
    getFutureChallenges: function (lang) {
      if (lang === "en") {
        return `Greetings dear! 🙏⚠️ Preparing for future obstacles is true wisdom. Vedic astrology is not meant to incite fear, but to offer cosmic headlights on winding roads:

🔮 **Planetary Cautions to Keep in Mind**:
1. **Saturn's Sade Sati / Retrograde Phase**:
   • Delays may occur in career or legal matters.
   • **Precaution**: Avoid shortcuts, legal risks, or hasty loan commitments. Never sign documents without thorough review.
2. **Rahu-Ketu Transit**:
   • Rahu creates sudden illusion, distraction, or unforeseen expenses.
   • **Precaution**: Never blindly trust new acquaintances with large funds. Steer strictly clear of gambling or quick-rich schemes. 🚫
3. **Health & Travel Safety**:
   • Drive mindfully, especially on Tuesday and Saturday nights.
   • Maintain sattvic nutrition and manage stress through pranayama.

🛡️ **The Ultimate Divine Shield (Kavach)**:
• **Mahamrityunjaya Mantra**: Chant **'Om Tryambakam Yajamahe Sugandhim Pushtivardhanam...'** at least 11 times daily. Lord Shiva's divine grace wards off the gravest perils! 🌿
• **Hanuman Chalisa**: Recite every Tuesday and Saturday for unshakeable courage.
• **Maa Baglamukhi Remembrance**: Pray to Maa Pitambara to subdue adversaries and dispel negative energies.

Stay confident, dear! Divine grace walks beside you, and no astrological challenge is greater than your inner soul strength! 🌸🪔`;
      }

      return `प्रणाम जी! 🙏⚠️ भविष्य में आने वाली परेशानियों के प्रति जागरूक होना बहुत समझदारी है। ज्योतिष डराने के लिए नहीं, बल्कि आने वाले मोड़ पर पहले से रोशनी दिखाने के लिए है:

🔮 **किन बातों का विशेष ध्यान रखें**:
1. **शनि की ढैय्या / साढ़ेसाती या वक्री प्रभाव**:
   • इस दौरान जीवन में कार्यों में थोड़ा विलंब हो सकता है।
   • **सावधानी**: किसी भी गैर-कानूनी कार्य, शॉर्टकट या आलस्य से बचें। कागजातों पर बिना पढ़े हस्ताक्षर न करें।
2. **राहु-केतु का गोचर**:
   • राहु भ्रम और अचानक अनचाहा खर्च पैदा करता है।
   • **सावधानी**: आंख मूंदकर किसी नए व्यक्ति पर भरोसा न करें। सट्टेबाजी या जुए से पूर्णतः दूर रहें। 🚫
3. **स्वास्थ्य व दुर्घटना से बचाव**:
   • वाहन हमेशा संयमित गति से चलाएं, विशेषकर मंगलवार और शनिवार की रात।
   • खानपान में सात्विकता रखें और अत्यधिक क्रोध या वाद-विवाद से बचें।

🛡️ **अमोघ सुरक्षा कवच (सभी संकटों से रक्षा हेतु)**:
• **महामृत्युंजय मंत्र**: प्रतिदिन कम से कम 11 बार **'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥'** का जप करें। यह मंत्र काल को भी टालने की शक्ति रखता है! 🌿
• **हनुमान चालीसा**: मंगलवार को हनुमान चालीसा का पाठ करें।
• **मां बगलामुखी का ध्यान**: शत्रुओं और नकारात्मक ऊर्जा को शांत करने के लिए मां पीताम्बरा का स्मरण करें।

सकारात्मक रहें जी! परमात्मा का हाथ सदैव आपके साथ है। कोई भी परेशानी आपकी आत्मशक्ति से बड़ी नहीं हो सकती! 🌸🪔`;
    },

    // 6. UPCOMING GAINS
    getUpcomingGains: function (lang) {
      if (lang === "en") {
        return `How wonderful, dear friend! 🌟🌈 Auspicious omens of prosperity and fortune are illuminating your chart:

☀️ **Upcoming Golden Opportunities**:
• **Benefic Jupiter Transit**: As Jupiter graces Kendra or Trikona houses, it manifests blessings equivalent to **Hamsa Yoga** and **Gajakesari Yoga**.
• **Career Growth & Promotion**: The hard work you invested previously is maturing. Avenues for new assignments, business expansion, and salary growth are unfolding. 💼💰
• **Auspicious Family Celebrations**: Strong yogas for property purchase, acquiring a new vehicle, or celebrating sacred family milestones. 🏡🚗
• **Knowledge & Success**: Exceptional timing for examinations, studies, and embarking on innovative ventures.

🪔 **To Amplify These Auspicious Energies**:
• Upon waking, gaze at your open palms and recite: *'Karagre Vasate Lakshmi, Karamadhye Saraswati...'*.
• Seek the blessings of your parents and elders.
• Donate books or stationary to underprivileged children.

Smile, dear! The universe is weaving a radiant chapter for you. 🌸💖`;
      }

      return `अरे वाह प्रिय जी! 🌟🌈 आपके जीवन में आने वाले लाभ और भाग्योदय के बहुत ही शुभ संकेत दिखाई दे रहे हैं:

☀️ **आने वाले स्वर्णिम अवसर**:
• **देवगुरु बृहस्पति का शुभ प्रभाव**: जब गुरु केंद्र या त्रिकोण में आते हैं, तो यह समय 'हंस योग' और 'गजकेसरी योग' जैसे फल देता है।
• **अचानक धन लाभ व पदोन्नति**: आपके पिछले कठिन परिश्रम का फल अब धीरे-धीरे पक रहा है। नौकरीपेशा लोगों के लिए नए प्रोजेक्ट और वेतन वृद्धि के द्वार खुलेंगे। 💼💰
• **पारिवारिक मांगलिक कार्य**: घर में किसी मांगलिक उत्सव, नए वाहन या संपत्ति खरीदने के प्रबल योग बनेंगे। 🏡🚗
• **विद्यार्थियों व नए काम के लिए**: ज्ञान, कौशल और परीक्षा में सफलता का उत्तम समय शुरू हो रहा है।

🪔 **इस शुभ समय को और अधिक बलवान बनाने के सूत्र**:
• नित्य सुबह उठकर अपनी दोनों हथेलियों के दर्शन करें और कहें—*'कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती। करमूले तु गोविन्दः प्रभाते करदर्शनम्॥'* 
• अपने माता-पिता और गुरुजनों का चरण स्पर्श करके आशीर्वाद लें।
• जरूरतमंद विद्यार्थियों को पुस्तकें या स्टेशनरी का दान करें।

मुस्कुराइए जी! ईश्वर ने आपके लिए बहुत सुंदर योजना बनाई है। 🌸💖`;
    },

    // 7. REMEDIES
    getRemedies: function (lang) {
      if (lang === "en") {
        return `Namaste dear! 🌿✨ Our ancient Vedic sages prescribed profound, sattvic daily remedies that require zero financial cost yet yield immense spiritual peace:

🌸 **5 Sacred Daily Zero-Cost Habits**:
1. **Sacred Cow Service (Gau Seva)**: Offer the very first freshly made chapati with a touch of jaggery or ghee to a sacred cow. It attracts blessings from all divine forces. 🐄
2. **Feeding Birds & Ants**: Keep grain and water on your terrace or balcony, and offer sweet flour to ants. This pacifies Rahu and Ketu doshas naturally. 🕊️
3. **Tulsi Deepam**: Light a pure ghee or sesame oil lamp near the sacred Tulsi plant at twilight. It shields the home from negative vibrations. 🪔
4. **Water Element Purification**: Never waste drinking water. Drinking water from a pure silver cup strengthens the Moon, calming restlessness and anxiety. 💧
5. **Lord Shiva Abhishek**: Offer a simple vessel of clean water and Bel leaves on Shiva Lingam while chanting **'Om Namah Shivaya'** 108 times with a peaceful heart. 🌿

If you need a specific remedy for Saturn, Rahu, or Manglik dosha, feel free to ask me, dear! 💖`;
      }

      return `नमस्ते जी! 🌿✨ हमारे ऋषियों ने बिना किसी भारी खर्च के बहुत ही सरल, सात्विक और चमत्कारी दैनिक उपाय बताए हैं:

🌸 **दैनिक जीवन के 5 अमृत उपाय (Zero Cost Daily Habits)**:
1. **गौ माता की सेवा**: भोजन बनाते समय पहली रोटी गाय माता के लिए थोड़ा गुड़ या घी लगाकर निकालें। इससे 33 कोटि देवी-देवताओं का आशीर्वाद मिलता है। 🐄
2. **पक्षियों व चींटियों को अन्न**: प्रतिदिन सुबह छत या बालकनी पर पक्षियों के लिए बाजरा/चावल और थोड़ा पानी रखें, और चींटियों को आटा-शक्कर डालें। इससे राहु-केतु का दोष शांत होता है। 🕊️
3. **तुलसी जी में दीपदान**: सायंकाल घर के तुलसी के पौधे के पास शुद्ध घी या तिल के तेल का दीपक प्रज्वलित करें। घर से नकारात्मकता दूर रहती है। 🪔
4. **जल तत्व की शुद्धि**: पीने का पानी कभी व्यर्थ न बहाएं। चांदी के पात्र में पानी पीना चंद्रमा को बलवान कर मानसिक शांति देता है। 💧
5. **शिवजी का अभिषेक**: शिवलिंग पर मात्र एक लोटा जल और तीन बेलपत्र प्रेम से अर्पित करें। ॐ नमः शिवाय का शांत मन से 108 बार जप करें। 🌿

यदि आप किसी विशेष ग्रह (जैसे शनि, राहु, मंगल) या किसी खास समस्या का उपाय चाहते हैं, तो मुझे बताएं—मैं विस्तार से बताऊँगी जी! 💖`;
    },

    // 8. KUNDLI INTEGRATION
    getKundliResponse: function (kundliData, lang) {
      if (!kundliData || !kundliData.ascendant) {
        if (lang === "en") {
          return `Dear friend! 🌸 I noticed that your Janam Kundli is not yet generated in this session.

Please enter your birth date, time, and city on our **Free Kundli Calculator** and generate your chart. Once generated, I will instantly read your exact Lagna, Moon sign, houses, and planetary yogas to give you 100% personalized predictions! 💖✨

In the meantime, you can ask me anything about **investments, career, love life, or Vedic remedies**! 🌺`;
        }

        return `प्रिय जी! 🌸 मैंने देखा कि अभी आपकी जन्म कुंडली स्क्रीन पर नहीं बनी है। 

आप हमारे **'मुफ्त लग्न कुंडली'** पेज पर अपना जन्म विवरण भरकर कुंडली बनाएं। उसके बाद मैं आपकी कुंडली का एक-एक भाव, लग्न, चंद्रमा और राजयोग देखकर आपको शत-प्रतिशत व्यक्तिगत फलादेश बताऊँगी जी! 💖✨

तब तक आप मुझसे किसी भी विषय जैसे—**निवेश, करियर, प्रेम या उपाय** पर सामान्य मार्गदर्शन ले सकते हैं! 🌺`;
      }

      const asc = kundliData.ascendant;
      const moon = kundliData.moonMetrics;
      const person = kundliData.person;

      if (lang === "en") {
        return `Wonderful ${person.name || "friend"}! 🌸✨ Your sacred Janam Kundli is right before me:

🌟 **Pillars of Your Horoscope**:
• **Ascendant (Lagna)**: **${asc.rashiNameEn || asc.rashiNameHi} (${asc.rashiNum})** — Lord: **${asc.lordHi}**
• **Ascendant Nakshatra**: **${asc.nakshatra} (Pada ${asc.pada})** • Ruler: **${asc.nakshatraLord}**
• **Moon Sign (Chandra Rashi)**: **${moon.rashiNameHi} (${moon.rashiNum})** — Governs your emotions & mind
• **Birth Nakshatra**: **${moon.nakshatra} (Pada ${moon.pada})** • Ruler: **${moon.nakshatraLord}**

💎 **Key Astrological Highlights**:
1. **${asc.rashiNameEn || asc.rashiNameHi} Ascendant**: Bestows high moral integrity, visionary thinking, leadership qualities, and natural advisory aptitude. ☀️
2. **Moon Placement**: Your Moon in ${moon.rashiNameHi} grants deep intuitive acumen, creative appreciation, and mental resilience. 🌙
3. **Favorable Factors**:
   • **Auspicious Days**: Thursdays & Mondays 🌼
   • **Lucky Colors**: Golden, Yellow, White & Cream 💛
   • **Lucky Numbers**: 3, 1, 9 🔢
   • **Recommended Gemstone**: Yellow Sapphire (Pukhraj) or Pearl (Moti) — (upon qualified consultation)

🔮 **My Loving Suggestion**:
Offer water to the rising Sun daily and meditate on your Ishta Devata. You possess immense spiritual and worldly potential! Feel free to ask me specific questions about your career, marriage, or remedies based on this chart! 💖🪔`;
      }

      return `अरे वाह ${person.name || "जातक"} जी! 🌸✨ आपकी संपूर्ण जन्म कुंडली मेरे सामने उपस्थित है:

🌟 **आपकी कुंडली के मुख्य आधार स्तंभ**:
• **लग्न (Ascendant)**: **${asc.rashiNameHi} (${asc.rashiNum})** — स्वामी: **${asc.lordHi}**
• **लग्न नक्षत्र**: **${asc.nakshatra} (चरण ${asc.pada})** • नक्षत्र स्वामी: **${asc.nakshatraLord}**
• **चंद्र राशि (Moon Sign)**: **${moon.rashiNameHi} (${moon.rashiNum})** — मन के स्वामी
• **जन्म नक्षत्र**: **${moon.nakshatra} (चरण ${moon.pada})** • नक्षत्र स्वामी: **${moon.nakshatraLord}**

💎 **आपकी कुंडली की सबसे बड़ी विशेषताएं**:
1. **${asc.rashiNameHi} लग्न का स्वरूप**: आप विचारवान, सत्यनिष्ठ, स्वाभिमानी और दूरदर्शी स्वभाव के धनी हैं। आपके अंदर लोगों को मार्गदर्शन देने की स्वाभाविक क्षमता है। ☀️
2. **चंद्रमा की स्थिति**: आपका चंद्रमा ${moon.rashiNameHi} राशि में स्थित है, जो आपको गहरी अंतर्दृष्टि, कल्पनाशीलता और मजबूत मानसिक संकल्प प्रदान करता है। 🌙
3. **शुभ तत्व**:
   • **शुभ वार**: गुरुवार एवं सोमवार 🌼
   • **शुभ रंग**: पीला, सफेद, क्रीम एवं सुनहरा 💛
   • **शुभ अंक**: 3, 1, 9 🔢
   • **अनुकूल रत्न**: पुखराज (Topaz) या मोती (Pearl) — (विद्वान ब्राह्मण के परामर्श उपरांत)

🔮 **आपके लिए मेरा विशेष स्नेह भरा सुझाव**:
नित्य प्रातः सूर्य देव को अर्घ्य दें और अपने ईष्ट देव का ध्यान करें। आपकी कुंडली में आगे बढ़ने की अपार संभावनाएं हैं! आप मुझसे अपने करियर, लव लाइफ, या आने वाले समय के बारे में भी इस कुंडली के अनुसार पूछ सकते हैं जी! 💖🪔`;
    },

    // 9. EMOTIONAL SUPPORT
    getEmotionalSupport: function (lang) {
      if (lang === "en") {
        return `Please listen to me with all your heart, dear friend... 🌸💖

You are never truly alone! Sometimes when life feels overwhelming and dark, remember that dawn is merely moments away. The planets and stars continually move—no sorrow, hurdle, or stress is permanent in this universe.

🌿 **Do this right now**:
1. Sip a glass of cool water and take 5 gentle, deep breaths.
2. Chant softly in your mind: **'Om Namah Shivaya'**. Lord Shiva will wrap your soul in serene calm.
3. Have faith—this difficult phase is already waning, and radiant happiness will bloom in your life very soon! ☀️✨

I am here as your loyal spiritual companion, always by your side. Share whatever rests upon your heart, dear. 🌸`;
      }

      return `मेरी बात ध्यान से सुनिए प्रिय जी... 🌸💖 

आप अकेले नहीं हैं! जीवन में कभी-कभी जब अंधकार बहुत गहरा लगता है, तो समझिए कि सूर्योदय का समय बहुत निकट है। ग्रह-नक्षत्र लगातार अपनी चाल बदलते हैं—कोई भी दुख या कठिनाई स्थायी नहीं होती।

🌿 **अभी तुरंत यह करें**:
1. एक गिलास ठंडा पानी पिएं और 5 बार गहरी सांस लें।
2. मन ही मन तीन बार कहें: **"ॐ नमः शिवाय"**। भगवान शिव आपके हृदय को असीम शांति देंगे।
3. विश्वास रखिए, यह दौर भी बहुत जल्द गुजर जाएगा और आपकी जिंदगी में फिर से खुशियों की रोशनी खिलेगी! ☀️✨

मैं आपकी सहेली बनकर हमेशा आपके साथ हूँ जी। जो भी मन में हो, मुझसे कहें। 🌸`;
    },

    // 10. THANK YOU
    getThankYou: function (lang) {
      if (lang === "en") {
        return `Thank you so very much, dear friend! 🌸✨ Seeing peace and a smile in your heart brings me true joy. May the Divine grace you and your family with boundless health, love, and prosperity. Whenever you need guidance, Drishti is always lovingly here for you! 💖🪔 Shubhamastu!`;
      }
      return `आपका बहुत-बहुत आभार प्रिय जी! 🌸✨ आपके चेहरे पर मुस्कान और मन में शांति देखकर मुझे हार्दिक प्रसन्नता हुई। ईश्वर की कृपा आप और आपके परिवार पर सदा बनी रहे। जब भी जीवन में कोई सवाल या दुविधा हो, दृष्टि हमेशा आपकी सेवा में उपस्थित रहेगी! 💖🪔 शुभमस्तु!`;
    },

    // 11. GENERAL ASTROLOGICAL GUIDANCE
    getGeneralGuidance: function (lang) {
      if (lang === "en") {
        return `Dear friend! 🌸✨ Your question is deeply appreciated. Vedic astrology encompasses every facet of existence—from **auspicious investment timings**, **career & workload**, and **love life harmony**, to **future cautions and divine remedies**.

💡 **You can lovingly ask me about**:
1. 💰 **Wealth & Investments**: "What is the best time for investments?"
2. 💼 **Career & Stress**: "How can I reduce workload stress and achieve promotion?"
3. ❤️ **Love & Marriage**: "What do my stars say about my marriage and relationship?"
4. ⚠️ **Future Cautions**: "What planetary challenges should I be cautious of?"
5. 🔮 **Kundli Reading**: "Summarize my birth chart and yogas?"

Please let me know which area you would like to explore, and I will gladly guide you with precision and warmth! 💖🪔`;
      }

      return `प्रिय जी! 🌸✨ आपका प्रश्न बहुत सुंदर है। वैदिक ज्योतिष के अनुसार हमारे जीवन का हर पहलू—चाहे वह **सही निवेश का समय**, **करियर व वर्कलोड**, **लव लाइफ व विवाह**, या **भविष्य की सावधानियां** हों—सभी ग्रहों और नक्षत्रों की गति से संचालित होते हैं।

💡 **आप मुझसे इनमें से किसी भी विषय पर पूछ सकते हैं**:
1. 💰 **निवेश व धन लाभ**: "सही निवेश का समय क्या है?"
2. 💼 **करियर व तनाव**: "वर्कलोड और नौकरी में तरक्की के उपाय बताएं?"
3. ❤️ **लव लाइफ व दांपत्य**: "मेरी लव लाइफ और शादी के योग कैसे हैं?"
4. ⚠️ **भविष्य की सावधानियां**: "आने वाली परेशानियों से कैसे बचें?"
5. 🔮 **कुंडली विश्लेषण**: "मेरी कुंडली का सार बताइए?"

आप जिस विषय पर अधिक विस्तार से जानना चाहते हैं, मुझे बताएं जी—मैं पूरी निष्ठा से आपका मार्गदर्शन करूँगी! 💖🪔`;
    },

    // Paywall Message when 5 minutes limit expires
    getPaywallMessage: function (lang) {
      if (lang === "en") {
        return `🌸 **Your 5-Minute Free Astrology Consultation Has Concluded** 🌸

Dear friend, your complimentary session with Drishti AI has reached its 5-minute limit. To continue receiving unlimited personal guidance, daily planetary transit insights, and accurate remedies, please subscribe to **Divya Drishti Premium**:

💎 **Premium Subscription Plans**:
• **Monthly Plan**: Just **₹150 / Month**
• **Yearly Plan**: Just **₹1,500 / Year** *(Best Value — 2 Months Free!)*

🕉️ **Personal Vedic Horoscope Analysis & Anushthan**:
For in-depth Kundli reading, Dosh Nivaran, or sacred Maa Baglamukhi / Mahamrityunjaya Anushthan, you can directly connect with our Chief Astrologer:

👑 **Shastri Amit Kumar Sharma**
📞 **Phone / Helpline**: [${SHASTRI_PHONE}](tel:${SHASTRI_PHONE_CLEAN})
💬 **WhatsApp Direct**: [${SHASTRI_PHONE}](https://wa.me/${SHASTRI_PHONE_CLEAN}?text=Pranam%20Shastri%20Ji%2C%20my%205-minute%20free%20Drishti%20AI%20session%20completed.%20I%20want%20to%20subscribe%20to%20Premium%20Plan%20or%20consult%20with%20you.)

*(For all further detailed information and customized remedies, please feel free to talk directly with Shastri Ji!) 💖🪔*`;
      }

      return `🌸 **आपका 5 मिनट का निःशुल्क ज्योतिष परामर्श समय पूर्ण हो चुका है** 🌸

प्रिय जी, दृष्टि AI के साथ आपका 5 मिनट का फ्री परामर्श सत्र समाप्त हो गया है। आगे निरंतर व्यक्तिगत मार्गदर्शन, दैनिक ग्रह गोचर विश्लेषण और सभी अचूक उपायों के लिए कृपया **दिव्य दृष्टि प्रीमियम (Divya Drishti Premium)** की सदस्यता लें:

💎 **प्रीमियम सब्सक्रिप्शन प्लान्स**:
• **मासिक प्लान (Monthly)**: मात्र **₹150 / महीना**
• **वार्षिक प्लान (Yearly)**: मात्र **₹1,500 / वर्ष** *(सर्वोत्तम बचत — 2 महीने बिल्कुल मुफ्त!)*

🕉️ **विशेष जन्म कुंडली विश्लेषण एवं व्यक्तिगत अनुष्ठान हेतु**:
यदि आप अपने जीवन की गंभीर समस्याओं, कालसर्प/मांगलिक दोष, या मां बगलामुखी / महामृत्युंजय अनुष्ठान हेतु विशेष परामर्श चाहते हैं, तो हमारे मुख्य ज्योतिषाचार्य से सीधे संपर्क करें:

👑 **शास्त्री अमित कुमार शर्मा**
📞 **फोन / कॉल करें**: [${SHASTRI_PHONE}](tel:${SHASTRI_PHONE_CLEAN})
💬 **WhatsApp परामर्श**: [${SHASTRI_PHONE}](https://wa.me/${SHASTRI_PHONE_CLEAN}?text=Pranam%20Shastri%20Ji%2C%20mera%205-minute%20free%20Drishti%20AI%20session%20pura%20ho%20gaya%20hai.%20Mujhe%20Premium%20Plan%20lena%20hai%20ya%20aapse%20baat%20karni%20hai.)

*(बाकी समस्त विस्तृत जानकारी एवं व्यक्तिगत समाधान के लिए आप सीधे शास्त्री जी से फोन या व्हाट्सएप पर बात कर सकते हैं जी!) 💖🪔*`;
    }
  };

  // ==========================================================================
  // DRISHTI CHAT CONTROLLER
  // ==========================================================================
  const DrishtiChat = {
    isOpen: false,
    messages: [],
    currentLang: "hi", // "hi" or "en"
    sessionStartTime: null,
    timerInterval: null,
    isExpired: false,
    isStreaming: false,

    init: function () {
      this.loadState();
      this.injectStyles();
      this.createChatWidget();
      this.attachEventListeners();
      this.loadHistory();
      this.initTimer();

      window.addEventListener("kundliGenerated", (e) => {
        if (e.detail) {
          try {
            sessionStorage.setItem("current_kundli_data", JSON.stringify(e.detail));
          } catch (err) {}
        }
      });
    },

    loadState: function () {
      try {
        const savedLang = localStorage.getItem("drishti_lang");
        if (savedLang === "en" || savedLang === "hi") {
          this.currentLang = savedLang;
        }

        const savedStart = sessionStorage.getItem("drishti_session_start");
        if (savedStart) {
          this.sessionStartTime = parseInt(savedStart, 10);
        }

        if (sessionStorage.getItem("drishti_expired") === "true") {
          this.isExpired = true;
        }
      } catch (e) {}
    },

    initTimer: function () {
      if (!this.sessionStartTime) return; // Starts on first user message

      if (this.timerInterval) clearInterval(this.timerInterval);
      this.updateTimerDisplay();

      this.timerInterval = setInterval(() => {
        this.updateTimerDisplay();
      }, 1000);
    },

    startSessionTimer: function () {
      if (!this.sessionStartTime) {
        this.sessionStartTime = Date.now();
        try {
          sessionStorage.setItem("drishti_session_start", this.sessionStartTime.toString());
        } catch (e) {}
        this.initTimer();
      }
    },

    getRemainingSeconds: function () {
      if (!this.sessionStartTime) return FREE_DURATION_SECONDS;
      const elapsed = Math.floor((Date.now() - this.sessionStartTime) / 1000);
      const rem = FREE_DURATION_SECONDS - elapsed;
      return rem > 0 ? rem : 0;
    },

    updateTimerDisplay: function () {
      const rem = this.getRemainingSeconds();
      const mins = Math.floor(rem / 60);
      const secs = rem % 60;
      const timeStr = `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;

      const timerEl = document.getElementById("drishti-timer-badge");
      if (timerEl) {
        if (rem > 0) {
          timerEl.innerHTML = this.currentLang === "en" 
            ? `⏱️ Free: <strong>${timeStr}</strong>` 
            : `⏱️ निःशुल्क: <strong>${timeStr}</strong>`;
          timerEl.className = rem <= 60 ? "drishti-timer-pill warning" : "drishti-timer-pill";
        } else {
          timerEl.innerHTML = this.currentLang === "en" ? `🔒 Session Expired` : `🔒 समय समाप्त`;
          timerEl.className = "drishti-timer-pill expired";
          this.handleExpiration();
        }
      }

      // Also update dedicated studio timer if present
      const studioTimer = document.getElementById("studioTimerBadge");
      if (studioTimer) {
        if (rem > 0) {
          studioTimer.innerHTML = this.currentLang === "en"
            ? `⏱️ Free Session: <strong>${timeStr}</strong>`
            : `⏱️ निःशुल्क समय: <strong>${timeStr}</strong>`;
          studioTimer.className = rem <= 60 ? "drishti-timer-pill warning" : "drishti-timer-pill";
        } else {
          studioTimer.innerHTML = this.currentLang === "en" ? `🔒 Session Expired` : `🔒 समय समाप्त`;
          studioTimer.className = "drishti-timer-pill expired";
        }
      }

      if (rem <= 0 && !this.isExpired) {
        this.handleExpiration();
      }
    },

    handleExpiration: function () {
      if (this.isExpired) return;
      this.isExpired = true;
      try {
        sessionStorage.setItem("drishti_expired", "true");
      } catch (e) {}

      if (this.timerInterval) clearInterval(this.timerInterval);

      // Add Paywall message
      const paywallText = DrishtiBrain.getPaywallMessage(this.currentLang);
      this.addBotMessage(paywallText, true);

      // Lock input
      this.lockInput();
    },

    lockInput: function () {
      const input = document.getElementById("drishti-input");
      const sendBtn = document.getElementById("drishti-send");
      if (input) {
        input.disabled = true;
        input.placeholder = this.currentLang === "en"
          ? "Free limit completed. Subscribe or call Shastri Ji (+91 9829743685)"
          : "निःशुल्क समय पूर्ण • प्रीमियम लें या शास्त्री जी को कॉल करें (9829743685)";
      }
      if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.style.opacity = "0.5";
      }

      // Also lock studio page input if active
      const studioInput = document.getElementById("studioMainInput");
      const studioSend = document.getElementById("studioSendBtn");
      if (studioInput) {
        studioInput.disabled = true;
        studioInput.placeholder = this.currentLang === "en"
          ? "Free limit completed. Subscribe to Premium or call Shastri Ji (+91 9829743685)"
          : "निःशुल्क समय पूर्ण • प्रीमियम लें या शास्त्री जी से बात करें (+91 98297 43685)";
      }
      if (studioSend) {
        studioSend.disabled = true;
        studioSend.style.opacity = "0.5";
      }
    },

    setLanguage: function (lang) {
      if (lang !== "hi" && lang !== "en") return;
      this.currentLang = lang;
      try {
        localStorage.setItem("drishti_lang", lang);
      } catch (e) {}

      // Update widget toggle buttons
      const btnHi = document.getElementById("drishti-lang-hi");
      const btnEn = document.getElementById("drishti-lang-en");
      if (btnHi && btnEn) {
        btnHi.classList.toggle("active", lang === "hi");
        btnEn.classList.toggle("active", lang === "en");
      }

      // Update studio buttons if present
      const studioHi = document.getElementById("studioLangHi");
      const studioEn = document.getElementById("studioLangEn");
      if (studioHi && studioEn) {
        studioHi.classList.toggle("active", lang === "hi");
        studioEn.classList.toggle("active", lang === "en");
      }

      // Update chips & placeholders
      this.updateLanguageUI();
    },

    updateLanguageUI: function () {
      const input = document.getElementById("drishti-input");
      if (input && !this.isExpired) {
        input.placeholder = this.currentLang === "en"
          ? "Ask Drishti about your stars, career, love, or remedies..."
          : "दृष्टि से अपने सितारे, भविष्य या उपाय पूछें...";
      }

      const chipsBar = document.getElementById("drishti-chips-bar");
      if (chipsBar) {
        if (this.currentLang === "en") {
          chipsBar.innerHTML = `
            <button class="drishti-chip" data-query="What is the best time for investment in stocks and gold?">💰 Investment Timing?</button>
            <button class="drishti-chip" data-query="How to overcome career workload and achieve promotion?">💼 Career & Workload?</button>
            <button class="drishti-chip" data-query="How is my love life and marriage prospects?">❤️ Love Life & Marriage?</button>
            <button class="drishti-chip" data-query="What future challenges and transits should I be cautious of?">⚠️ Future Cautions?</button>
            <button class="drishti-chip" data-query="Please summarize my Janam Kundli and yogas">🔮 My Kundli Summary?</button>
            <button class="drishti-chip" data-query="Give me 5 zero-cost powerful daily Vedic remedies">🌿 Daily Remedies?</button>
          `;
        } else {
          chipsBar.innerHTML = `
            <button class="drishti-chip" data-query="सही निवेश का समय क्या है?">💰 निवेश का समय?</button>
            <button class="drishti-chip" data-query="करियर में तरक्की और वर्कलोड के उपाय?">💼 करियर व वर्कलोड?</button>
            <button class="drishti-chip" data-query="मेरी लव लाइफ और शादी के योग कैसे हैं?">❤️ लव लाइफ व शादी?</button>
            <button class="drishti-chip" data-query="भविष्य में किन परेशानियों से सावधान रहें?">⚠️ आने वाली परेशानियां?</button>
            <button class="drishti-chip" data-query="मेरी कुंडली का सरल सार बताएं">🔮 मेरी कुंडली का सार?</button>
            <button class="drishti-chip" data-query="दैनिक जीवन के सरल और सटीक उपाय बताइए">🌿 दैनिक सरल उपाय?</button>
          `;
        }
      }

      this.updateTimerDisplay();
    },

    injectStyles: function () {
      if (document.getElementById("drishti-chat-styles")) return;
      const style = document.createElement("style");
      style.id = "drishti-chat-styles";
      style.textContent = `
        /* Launcher */
        .drishti-launcher {
          position: fixed;
          bottom: 105px;
          right: 30px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9F1239 0%, #D4AF37 100%);
          box-shadow: 0 8px 30px rgba(159, 18, 57, 0.4), 0 0 15px rgba(212, 175, 55, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 9998;
          border: 2px solid #FFFBEB;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .drishti-launcher:hover {
          transform: scale(1.1) translateY(-3px);
          box-shadow: 0 14px 40px rgba(159, 18, 57, 0.55), 0 0 25px rgba(212, 175, 55, 0.8);
        }
        .drishti-launcher-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid rgba(212, 175, 55, 0.7);
          animation: drishti-pulse-glow 2.2s infinite;
          pointer-events: none;
        }
        @keyframes drishti-pulse-glow {
          0% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        .drishti-launcher-tooltip {
          position: absolute;
          right: 74px;
          background: #0B192C;
          color: #FFFDF9;
          border: 1px solid rgba(212, 175, 55, 0.6);
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 700;
          white-space: nowrap;
          pointer-events: none;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
          opacity: 0;
          transform: translateX(12px);
          transition: all 0.3s ease;
        }
        .drishti-launcher:hover .drishti-launcher-tooltip {
          opacity: 1;
          transform: translateX(0);
        }

        /* Chat Window */
        .drishti-window {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 410px;
          max-width: calc(100vw - 28px);
          height: 620px;
          max-height: calc(100vh - 45px);
          background: #FAF7F2;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(11, 25, 44, 0.35), 0 0 0 1px rgba(212, 175, 55, 0.4);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 9999;
          transform: translateY(20px) scale(0.95);
          opacity: 0;
          pointer-events: none;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .drishti-window.active {
          transform: translateY(0) scale(1);
          opacity: 1;
          pointer-events: all;
        }

        /* Header */
        .drishti-header {
          background: linear-gradient(135deg, #0B192C 0%, #1E293B 100%);
          color: #FFFDF9;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #D4AF37;
        }
        .drishti-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .drishti-avatar-wrap {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #881337;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #D4AF37;
        }
        .drishti-title h3 {
          margin: 0;
          font-size: 0.98rem;
          font-weight: 800;
          color: #FFFBEB;
        }
        .drishti-title p {
          margin: 2px 0 0 0;
          font-size: 0.68rem;
          color: #94A3B8;
        }

        /* Language Switcher & Controls */
        .drishti-lang-toggle {
          display: inline-flex;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          padding: 2px;
          border: 1px solid rgba(212, 175, 55, 0.4);
        }
        .drishti-lang-btn {
          background: transparent;
          border: none;
          color: #CBD5E1;
          padding: 3px 8px;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .drishti-lang-btn.active {
          background: #D4AF37;
          color: #0B192C;
        }

        .drishti-header-actions {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .drishti-btn-icon {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #FFFDF9;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 0.82rem;
        }
        .drishti-btn-icon:hover {
          background: rgba(212, 175, 55, 0.3);
        }

        /* Timer Sub-Bar */
        .drishti-timer-bar {
          background: #0F172A;
          padding: 6px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        }
        .drishti-timer-pill {
          font-size: 0.72rem;
          font-weight: 700;
          color: #10B981;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .drishti-timer-pill.warning {
          color: #F59E0B;
          animation: drishti-pulse-warn 1s infinite;
        }
        .drishti-timer-pill.expired {
          color: #EF4444;
          font-weight: 800;
        }
        @keyframes drishti-pulse-warn {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .drishti-premium-badge {
          font-size: 0.68rem;
          font-weight: 800;
          background: linear-gradient(135deg, #9F1239 0%, #D4AF37 100%);
          color: #FFFFFF;
          padding: 2px 8px;
          border-radius: 999px;
          text-decoration: none;
        }

        /* Chips Bar */
        .drishti-chips-bar {
          background: #F1ECE4;
          padding: 8px 12px;
          display: flex;
          gap: 8px;
          overflow-x: auto;
          white-space: nowrap;
          border-bottom: 1px solid rgba(212, 175, 55, 0.25);
        }
        .drishti-chip {
          background: #FFFFFF;
          color: #0B192C;
          border: 1px solid rgba(212, 175, 55, 0.4);
          padding: 5px 12px;
          border-radius: 999px;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
        }
        .drishti-chip:hover {
          background: #9F1239;
          color: #FFFFFF;
        }

        /* Body & Messages */
        .drishti-body {
          flex: 1;
          padding: 14px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #FAF7F2;
        }
        .drishti-msg {
          display: flex;
          flex-direction: column;
          max-width: 90%;
        }
        .drishti-msg.bot { align-self: flex-start; }
        .drishti-msg.user { align-self: flex-end; }
        
        .drishti-bubble {
          padding: 12px 15px;
          border-radius: 16px;
          font-size: 0.88rem;
          line-height: 1.55;
          word-break: break-word;
        }
        .drishti-msg.bot .drishti-bubble {
          background: #FFFFFF;
          color: #1E293B;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-top-left-radius: 4px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
          white-space: pre-wrap;
        }
        .drishti-msg.user .drishti-bubble {
          background: linear-gradient(135deg, #0B192C 0%, #1E3A8A 100%);
          color: #FFFDF9;
          border-top-right-radius: 4px;
        }
        .drishti-time {
          font-size: 0.65rem;
          color: #94A3B8;
          margin-top: 3px;
        }
        .drishti-msg.user .drishti-time { text-align: right; }

        /* Streaming Cursor */
        .drishti-streaming-cursor {
          display: inline-block;
          width: 6px;
          height: 14px;
          background: #D4AF37;
          margin-left: 3px;
          animation: drishti-blink 0.8s infinite;
          vertical-align: middle;
        }
        @keyframes drishti-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* Paywall Message Styling */
        .drishti-paywall-card {
          background: #FFFBEB;
          border: 2px solid #D4AF37;
          border-radius: 16px;
          padding: 16px;
          margin: 8px 0;
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.2);
        }
        .drishti-plan-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin: 12px 0;
        }
        .drishti-plan-box {
          background: #FFFFFF;
          border: 1.5px solid #F59E0B;
          border-radius: 10px;
          padding: 10px;
          text-align: center;
        }
        .drishti-plan-box.featured {
          border-color: #9F1239;
          background: #FFF1F2;
        }
        .drishti-plan-box strong {
          display: block;
          font-size: 0.8rem;
          color: #0B192C;
        }
        .drishti-plan-box .price {
          font-size: 1.1rem;
          font-weight: 800;
          color: #9F1239;
          margin: 4px 0;
        }

        /* Footer */
        .drishti-footer {
          padding: 10px 12px;
          background: #FFFFFF;
          border-top: 1px solid rgba(212, 175, 55, 0.25);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .drishti-input-wrap {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .drishti-input {
          flex: 1;
          background: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          border-radius: 24px;
          padding: 9px 15px;
          font-size: 0.86rem;
          color: #0F172A;
          outline: none;
        }
        .drishti-input:focus {
          border-color: #D4AF37;
          background: #FFFFFF;
        }
        .drishti-send-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9F1239 0%, #D4AF37 100%);
          border: none;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .drishti-launcher {
            bottom: 95px;
            right: 20px;
            width: 54px;
            height: 54px;
          }
          .drishti-window {
            bottom: 10px;
            right: 10px;
            width: calc(100vw - 20px);
            height: calc(100vh - 20px);
            max-height: 560px;
          }
        }
      `;
      document.head.appendChild(style);
    },

    createChatWidget: function () {
      // 1. Launcher
      const launcher = document.createElement("div");
      launcher.id = "drishti-chat-launcher";
      launcher.className = "drishti-launcher";
      launcher.innerHTML = `
        <div class="drishti-launcher-pulse"></div>
        ${DRISHTI_AVATAR_SVG}
        <div class="drishti-launcher-tooltip">
          <span>🌸 दृष्टि से ज्योतिष पूछें (AI)</span>
        </div>
      `;
      document.body.appendChild(launcher);

      // 2. Window
      const win = document.createElement("div");
      win.id = "drishti-chat-window";
      win.className = "drishti-window";
      win.innerHTML = `
        <!-- Header -->
        <div class="drishti-header">
          <div class="drishti-header-left">
            <div class="drishti-avatar-wrap">${DRISHTI_AVATAR_SVG}</div>
            <div class="drishti-title">
              <h3>दृष्टि (Drishti) AI</h3>
              <p><span style="width:7px; height:7px; background:#10B981; border-radius:50%; display:inline-block;"></span> वैदिक ज्योतिष सहेली</p>
            </div>
          </div>
          <div class="drishti-header-actions">
            <div class="drishti-lang-toggle">
              <button id="drishti-lang-hi" class="drishti-lang-btn active">हिन्दी</button>
              <button id="drishti-lang-en" class="drishti-lang-btn">EN</button>
            </div>
            <button class="drishti-btn-icon" id="drishti-btn-clear" title="रीसेट / Reset">🔄</button>
            <button class="drishti-btn-icon" id="drishti-btn-close" title="बंद करें / Close">✕</button>
          </div>
        </div>

        <!-- Timer Bar -->
        <div class="drishti-timer-bar">
          <div id="drishti-timer-badge" class="drishti-timer-pill">
            ⏱️ निःशुल्क: <strong>05:00</strong>
          </div>
          <a href="https://wa.me/${SHASTRI_PHONE_CLEAN}?text=Pranam%20Shastri%20Ji%2C%20I%20want%20Drishti%20AI%20Premium%20Plan%20(Rs%20150/mo%20or%20Rs%201500/yr)." target="_blank" class="drishti-premium-badge">
            💎 प्रीमियम: ₹150/माह
          </a>
        </div>

        <!-- Suggestion Chips Bar -->
        <div class="drishti-chips-bar" id="drishti-chips-bar"></div>

        <!-- Message Body -->
        <div class="drishti-body" id="drishti-messages-body"></div>

        <!-- Footer -->
        <div class="drishti-footer">
          <div class="drishti-input-wrap">
            <input type="text" id="drishti-input" class="drishti-input" placeholder="दृष्टि से अपने सितारे, भविष्य या उपाय पूछें..." autocomplete="off">
            <button id="drishti-send" class="drishti-send-btn" title="Send">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.7rem;">
            <a href="tel:${SHASTRI_PHONE_CLEAN}" style="color:#0B192C; font-weight:700; text-decoration:none;">
              📞 शास्त्री जी: ${SHASTRI_PHONE}
            </a>
            <a href="drishti-ai.html" style="color:#9F1239; font-weight:700; text-decoration:none;">
              🌸 फुल स्टूडियो खोलें →
            </a>
          </div>
        </div>
      `;
      document.body.appendChild(win);

      this.updateLanguageUI();
    },

    attachEventListeners: function () {
      const launcher = document.getElementById("drishti-chat-launcher");
      const closeBtn = document.getElementById("drishti-btn-close");
      const clearBtn = document.getElementById("drishti-btn-clear");
      const sendBtn = document.getElementById("drishti-send");
      const input = document.getElementById("drishti-input");
      const chipsBar = document.getElementById("drishti-chips-bar");
      const btnHi = document.getElementById("drishti-lang-hi");
      const btnEn = document.getElementById("drishti-lang-en");

      launcher.addEventListener("click", () => this.toggleWindow());
      closeBtn.addEventListener("click", () => this.closeWindow());

      btnHi.addEventListener("click", () => this.setLanguage("hi"));
      btnEn.addEventListener("click", () => this.setLanguage("en"));

      clearBtn.addEventListener("click", () => {
        if (confirm(this.currentLang === "en" ? "Reset chat history?" : "क्या आप चैट इतिहास रीसेट करना चाहते हैं जी? 🌸")) {
          this.clearHistory();
        }
      });

      sendBtn.addEventListener("click", () => this.handleUserSend());
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.handleUserSend();
        }
      });

      chipsBar.addEventListener("click", (e) => {
        const chip = e.target.closest(".drishti-chip");
        if (chip) {
          const q = chip.getAttribute("data-query");
          if (q) this.sendUserMessage(q);
        }
      });
    },

    toggleWindow: function () {
      if (this.isOpen) this.closeWindow();
      else this.openWindow();
    },

    openWindow: function () {
      const win = document.getElementById("drishti-chat-window");
      win.classList.add("active");
      this.isOpen = true;
      document.getElementById("drishti-input").focus();

      if (this.messages.length === 0) {
        const greeting = DrishtiBrain.getGreeting(this.currentLang);
        this.addBotMessage(greeting);
      }
      this.scrollToBottom();
      this.updateTimerDisplay();
    },

    closeWindow: function () {
      const win = document.getElementById("drishti-chat-window");
      win.classList.remove("active");
      this.isOpen = false;
    },

    handleUserSend: function () {
      if (this.isExpired) {
        alert(this.currentLang === "en" 
          ? "Your 5-minute free session has ended. Please subscribe or call Shastri Ji (+91 9829743685)."
          : "आपका 5 मिनट का फ्री समय समाप्त हो चुका है। कृपया प्रीमियम लें या शास्त्री जी को फोन करें (+91 98297 43685)");
        return;
      }

      if (this.isStreaming) return; // Prevent double submit while streaming

      const input = document.getElementById("drishti-input");
      const text = input.value.trim();
      if (!text) return;
      input.value = "";

      this.startSessionTimer();
      this.sendUserMessage(text);
    },

    sendUserMessage: function (text) {
      if (this.isExpired) return;

      this.addUserMessage(text);
      this.showThinkingIndicator();

      // ChatGPT / Gemini style realistic thinking delay (1.8s)
      this.isStreaming = true;
      setTimeout(() => {
        this.hideThinkingIndicator();
        const response = this.generateResponse(text);
        this.streamBotMessage(response, () => {
          this.isStreaming = false;
        });
      }, 1800);
    },

    addUserMessage: function (text) {
      const time = this.getCurrentTime();
      this.messages.push({ sender: "user", text: text, time: time });
      this.saveHistory();
      this.renderMessage({ sender: "user", text: text, time: time });
    },

    addBotMessage: function (text, isPaywall = false) {
      const time = this.getCurrentTime();
      this.messages.push({ sender: "bot", text: text, time: time, isPaywall: isPaywall });
      this.saveHistory();
      this.renderMessage({ sender: "bot", text: text, time: time, isPaywall: isPaywall });
    },

    // ChatGPT/Gemini style streaming typewriter effect
    streamBotMessage: function (fullText, onComplete) {
      const body = document.getElementById("drishti-messages-body");
      const time = this.getCurrentTime();

      const msgDiv = document.createElement("div");
      msgDiv.className = "drishti-msg bot";

      const bubble = document.createElement("div");
      bubble.className = "drishti-bubble";
      bubble.innerHTML = `<span class="drishti-streaming-cursor"></span>`;

      const timeDiv = document.createElement("div");
      timeDiv.className = "drishti-time";
      timeDiv.textContent = time;

      msgDiv.appendChild(bubble);
      msgDiv.appendChild(timeDiv);
      body.appendChild(msgDiv);
      this.scrollToBottom();

      let charIndex = 0;
      const totalLen = fullText.length;
      // Stream speed: 3-5 chars per tick (approx 25ms interval) for smooth reading
      const streamInterval = setInterval(() => {
        charIndex += Math.floor(Math.random() * 3) + 2;
        if (charIndex > totalLen) charIndex = totalLen;

        const currentSlice = fullText.substring(0, charIndex);
        const formatted = this.formatMarkdown(currentSlice);
        bubble.innerHTML = formatted + (charIndex < totalLen ? `<span class="drishti-streaming-cursor"></span>` : "");
        this.scrollToBottom();

        if (charIndex >= totalLen) {
          clearInterval(streamInterval);
          this.messages.push({ sender: "bot", text: fullText, time: time });
          this.saveHistory();
          if (onComplete) onComplete();
        }
      }, 25);
    },

    formatMarkdown: function (text) {
      return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>");
    },

    renderMessage: function (msg) {
      const body = document.getElementById("drishti-messages-body");
      const msgDiv = document.createElement("div");
      msgDiv.className = `drishti-msg ${msg.sender}`;

      let formattedText = this.formatMarkdown(msg.text);

      if (msg.isPaywall) {
        formattedText = `
          <div class="drishti-paywall-card">
            ${formattedText}
            <div class="drishti-plan-grid">
              <div class="drishti-plan-box">
                <strong>मासिक / Monthly</strong>
                <div class="price">₹150</div>
                <a href="https://wa.me/${SHASTRI_PHONE_CLEAN}?text=Pranam%20Shastri%20Ji%2C%20I%20want%20to%20subscribe%20to%20Monthly%20Plan%20Rs%20150." target="_blank" class="service-badge-pill" style="background:#0B192C; color:#FFF; font-size:0.68rem;">
                  चुनें / Select
                </a>
              </div>
              <div class="drishti-plan-box featured">
                <strong>वार्षिक / Yearly</strong>
                <div class="price">₹1,500</div>
                <a href="https://wa.me/${SHASTRI_PHONE_CLEAN}?text=Pranam%20Shastri%20Ji%2C%20I%20want%20to%20subscribe%20to%20Yearly%20Plan%20Rs%201500." target="_blank" class="service-badge-pill" style="background:#9F1239; color:#FFF; font-size:0.68rem;">
                  ⭐ सर्वश्रेष्ठ / Best
                </a>
              </div>
            </div>
            <div style="display:flex; gap:6px; margin-top:8px;">
              <a href="tel:${SHASTRI_PHONE_CLEAN}" class="service-badge-pill" style="background:#16A34A; color:#FFF; font-size:0.75rem; width:100%; text-align:center; padding:6px;">
                📞 शास्त्री जी से बात करें
              </a>
            </div>
          </div>
        `;
      }

      msgDiv.innerHTML = `
        <div class="drishti-bubble">${formattedText}</div>
        <div class="drishti-time">${msg.time}</div>
      `;
      body.appendChild(msgDiv);
      this.scrollToBottom();
    },

    showThinkingIndicator: function () {
      this.hideThinkingIndicator();
      const body = document.getElementById("drishti-messages-body");
      const div = document.createElement("div");
      div.id = "drishti-thinking-pill";
      div.className = "drishti-typing";
      div.innerHTML = `
        <span style="font-size:0.74rem; color:#D4AF37; font-weight:700; margin-right:4px;">
          ${this.currentLang === "en" ? "Drishti is meditating on your stars..." : "दृष्टि आपके सितारे देख रही हैं... ✨"}
        </span>
        <div class="drishti-typing-dot"></div>
        <div class="drishti-typing-dot"></div>
        <div class="drishti-typing-dot"></div>
      `;
      body.appendChild(div);
      this.scrollToBottom();
    },

    hideThinkingIndicator: function () {
      const el = document.getElementById("drishti-thinking-pill");
      if (el) el.remove();
    },

    scrollToBottom: function () {
      const body = document.getElementById("drishti-messages-body");
      if (body) body.scrollTop = body.scrollHeight;
    },

    getCurrentTime: function () {
      return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    },

    saveHistory: function () {
      try {
        sessionStorage.setItem("drishti_chat_history", JSON.stringify(this.messages));
      } catch (e) {}
    },

    loadHistory: function () {
      try {
        const stored = sessionStorage.getItem("drishti_chat_history");
        if (stored) {
          this.messages = JSON.parse(stored);
          const body = document.getElementById("drishti-messages-body");
          body.innerHTML = "";
          this.messages.forEach((msg) => this.renderMessage(msg));
        }
      } catch (e) {}
    },

    clearHistory: function () {
      this.messages = [];
      sessionStorage.removeItem("drishti_chat_history");
      const body = document.getElementById("drishti-messages-body");
      body.innerHTML = "";
      this.addBotMessage(
        this.currentLang === "en"
          ? "Chat has been reset, dear friend! 🌸 Feel free to ask any new question regarding your astrology, career, or life remedies. 💖✨"
          : "चैट रीसेट हो गई है जी! 🌸 अब आप मुझसे कोई भी नया प्रश्न पूछ सकते हैं। मैं आपकी सेवा में सदा उपस्थित हूँ। 💖✨"
      );
    },

    // NLP Routing with Astrology Guardrail
    generateResponse: function (userQuery) {
      const q = userQuery.toLowerCase().trim();
      const lang = this.currentLang;

      // 1. STRICT ASTROLOGY GUARDRAIL
      if (!DrishtiBrain.isAstrologyRelated(q)) {
        return DrishtiBrain.getRefusal(lang);
      }

      // Check for Active Kundli Data
      let currentKundli = null;
      if (window.currentKundliData) {
        currentKundli = window.currentKundliData;
      } else {
        try {
          const stored = sessionStorage.getItem("current_kundli_data");
          if (stored) currentKundli = JSON.parse(stored);
        } catch (e) {}
      }

      // 2. Kundli Specific Query
      if (
        q.includes("kundli") || q.includes("कुंडली") || q.includes("लग्न") || q.includes("lagna") ||
        q.includes("saransh") || q.includes("सारांश") || q.includes("faladesh") || q.includes("फलादेश")
      ) {
        return DrishtiBrain.getKundliResponse(currentKundli, lang);
      }

      // 3. Investment & Wealth
      if (
        q.includes("invest") || q.includes("निवेश") || q.includes("share") || q.includes("शेयर") ||
        q.includes("stock") || q.includes("market") || q.includes("money") || q.includes("dhan") ||
        q.includes("पैसा") || q.includes("धन") || q.includes("gold") || q.includes("सोना") ||
        q.includes("property") || q.includes("जमीन") || q.includes("मकान")
      ) {
        return DrishtiBrain.getInvestment(lang);
      }

      // 4. Career, Workload & Stress
      if (
        q.includes("career") || q.includes("करियर") || q.includes("job") || q.includes("नौकरी") ||
        q.includes("workload") || q.includes("वर्कलोड") || q.includes("kaam") || q.includes("काम") ||
        q.includes("business") || q.includes("व्यापार") || q.includes("promotion") || q.includes("तरक्की") ||
        q.includes("stress") || q.includes("तनाव") || q.includes("ups and downs") || q.includes("उतार-चढ़ाव")
      ) {
        return DrishtiBrain.getCareer(lang);
      }

      // 5. Love Life & Marriage
      if (
        q.includes("love") || q.includes("प्रेम") || q.includes("marriage") || q.includes("शादी") ||
        q.includes("vivah") || q.includes("विवाह") || q.includes("partner") || q.includes("पति") ||
        q.includes("पत्नी") || q.includes("relationship") || q.includes("संबंध") || q.includes("breakup")
      ) {
        return DrishtiBrain.getLoveMarriage(lang);
      }

      // 6. Future Challenges & Cautions
      if (
        q.includes("pareshan") || q.includes("परेशान") || q.includes("problem") || q.includes("दिक्कत") ||
        q.includes("danger") || q.includes("खतरा") || q.includes("caution") || q.includes("सावधानी") ||
        q.includes("bhavishya") || q.includes("भविष्य") || q.includes("aane wali") || q.includes("संकट") ||
        q.includes("sade sati") || q.includes("साढ़ेसाती") || q.includes("rahu") || q.includes("राहु") ||
        q.includes("shani") || q.includes("शनि")
      ) {
        return DrishtiBrain.getFutureChallenges(lang);
      }

      // 7. Upcoming Gains & Auspicious Times
      if (
        q.includes("labh") || q.includes("लाभ") || q.includes("gain") || q.includes("profit") ||
        q.includes("fayda") || q.includes("फायदा") || q.includes("good time") || q.includes("shubh") ||
        q.includes("शुभ समय") || q.includes("achha samay") || q.includes("bhagyodaya") || q.includes("भाग्योदय") ||
        q.includes("kismat") || q.includes("किस्मत")
      ) {
        return DrishtiBrain.getUpcomingGains(lang);
      }

      // 8. Remedies & Upay
      if (
        q.includes("upay") || q.includes("उपाय") || q.includes("remedy") || q.includes("remedies") ||
        q.includes("mantra") || q.includes("मंत्र") || q.includes("puja") || q.includes("पूजा") ||
        q.includes("gemstone") || q.includes("रत्न") || q.includes("rudraksha") || q.includes("रुद्राक्ष") ||
        q.includes("daan") || q.includes("दान")
      ) {
        return DrishtiBrain.getRemedies(lang);
      }

      // 9. Greetings & Pleasantries
      if (
        q.includes("hello") || q.includes("hi") || q.includes("namaste") || q.includes("नमस्ते") ||
        q.includes("pranam") || q.includes("प्रणाम") || q.includes("radhe") || q.includes("राधे") ||
        q.includes("ram") || q.includes("राम")
      ) {
        return DrishtiBrain.getGreeting(lang);
      }

      // 10. Emotional Support
      if (
        q.includes("sad") || q.includes("udas") || q.includes("उदास") || q.includes("dar") ||
        q.includes("डर") || q.includes("depress") || q.includes("tension") || q.includes("चिंता")
      ) {
        return DrishtiBrain.getEmotionalSupport(lang);
      }

      // 11. Thank you
      if (
        q.includes("thank") || q.includes("dhanyawad") || q.includes("धन्यवाद") ||
        q.includes("shukriya") || q.includes("शुक्रिया")
      ) {
        return DrishtiBrain.getThankYou(lang);
      }

      // 12. Default Vedic Guidance
      return DrishtiBrain.getGeneralGuidance(lang);
    }
  };

  window.DrishtiBrain = DrishtiBrain;
  window.DrishtiChat = DrishtiChat;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => DrishtiChat.init());
  } else {
    DrishtiChat.init();
  }
})();
