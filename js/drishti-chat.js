/**
 * DIVYA DRISHTI — "दृष्टि" (Drishti) AI Vedic Astrology Chatbot
 * Persona: Warm, loving, respectful, friendly Vedic AI companion
 * Equipped with comprehensive astrological intelligence:
 * - Investment Timing & Wealth (शेयर बाजार, सोना, प्रॉपर्टी)
 * - Career, Workload & Stress (कार्यभार, तरक्की, उतार-चढ़ाव)
 * - Love Life & Marriage (प्रेम संबंध, विवाह योग, दांपत्य सुख)
 * - Future Challenges & Precautions (शनि/राहु गोचर, सुरक्षा कवच)
 * - Upcoming Gains & Auspicious Times (शुभ समय, भाग्योदय)
 * - Accurate Vedic Remedies (सरल उपाय, मंत्र, दान, जीवन शैली)
 * - Live Kundli Detection & Personalized Interpretation
 */

(function () {
  "use strict";

  // Check if already initialized
  if (window.DrishtiChat) return;

  const DRISHTI_NAME = "दृष्टि (Drishti)";
  const DRISHTI_AVATAR = `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
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

  // Astrological Knowledge Base & Dialog Brain
  const DrishtiBrain = {
    // 1. GREETINGS & INTRO
    greetings: [
      "नमस्ते प्रिय जी! 🌸✨ मैं आपकी वैदिक AI सहेली और मार्गदर्शक 'दृष्टि' हूँ। आपके सितारे आज बहुत सुंदर संदेश दे रहे हैं। बताइए आज मैं आपकी क्या सहायता करूँ? 💖",
      "प्रणाम जी! 🙏✨ 'दिव्य दृष्टि' में आपका हृदय से स्वागत है। मैं यहाँ आपके जीवन, करियर, प्रेम, निवेश या कुंडली के हर सवाल का प्रेमपूर्वक समाधान देने के लिए उपस्थित हूँ। 🌺",
      "जय श्री कृष्णा! राधे-राधे जी! 🪔✨ आपके जीवन में सुख, शांति और समृद्धि बनी रहे। आज मन में क्या विचार या दुविधा चल रही है? मुझसे बेझिझक साझा करें जी। 🌸"
    ],

    // 2. INVESTMENT & FINANCIAL TIMING
    investment: {
      general: `नमस्ते प्रिय जी! 💰✨ धन और निवेश के विषय में ज्योतिष बहुत ही सुंदर और अचूक मार्गदर्शन देता है:

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
• अपनी तिजोरी या लॉकर में उत्तर दिशा की ओर मुख करके एक चांदी का सिक्का रखें। 💖✨`
    },

    // 3. CAREER, WORKLOAD & PROFESSIONAL UPS & DOWNS
    career: {
      general: `प्रणाम प्रिय जी! 💼🌟 कार्यक्षेत्र, नौकरी और कार्यभार (Workload) को लेकर आपकी चिंता को मैं भली-भांति समझ सकती हूँ:

⚖️ **वर्कलोड और तनाव का ज्योतिषीय कारण**:
• कुंडली का **10वां भाव (कर्म भाव)** और **6वां भाव (सेवा व संघर्ष)** जब शनि देव या राहु के प्रभाव में आता है, तो अचानक जिम्मेदारियां और काम का दबाव बहुत बढ़ जाता है।
• लेकिन याद रखें—शनि देव कठिन परिश्रम की परीक्षा लेते हैं, और जो इस परीक्षा में धैर्य रखता है, उसे बहुत बड़ी पदोन्नति और स्थायी मान-सम्मान मिलता है! 🏆

🌿 **वर्कलोड कम करने व तरक्की के अचूक उपाय**:
1. **नित्य सूर्य अर्घ्य**: प्रातः तांबे के लोटे में जल, चुटकी भर रोली (कुमकुम) और अक्षत डालकर सूर्य देव को 'ॐ सूर्याय नमः' कहकर अर्घ्य दें। इससे कार्यस्थल पर आपका प्रभाव व तेज बढ़ता है। ☀️
2. **शनिवार की सेवा**: शनिवार की शाम को पीपल के वृक्ष के पास सरसों के तेल का दीपक जलाएं और कार्यस्थल के चतुर्थ श्रेणी कर्मचारियों या सफाईकर्मियों को आदर दें व कुछ मीठा खिलाएं। 🪔
3. **कार्य डेस्क की दिशा**: अपने ऑफिस या दुकान में बैठते समय अपना मुख **उत्तर (North)** या **पूर्व (East)** दिशा की ओर रखें। इससे मानसिक स्पष्टता बनी रहती है।
4. **मानसिक शांति हेतु**: यदि बॉस या सहकर्मियों से तनाव हो, तो गले में चांदी की चेन पहनें या सोमवार को शिवलिंग पर कच्चा दूध अर्पित करें।

💖 घबराएं नहीं जी! हर उतार के बाद एक बहुत बड़ा चढ़ाव (Rise) आता है। आपके सितारे आपको संघर्ष से निखारकर स्वर्णिम सफलता की ओर ले जा रहे हैं! ✨💼`
    },

    // 4. LOVE LIFE & MARRIAGE
    loveMarriage: {
      general: `नमस्ते प्यारे मित्र जी! ❤️🌸 प्रेम संबंध और वैवाहिक जीवन हृदय का सबसे कोमल और महत्वपूर्ण पहलू है:

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

ईश्वर करे आपके जीवन में असीम प्रेम, समझ और खुशियां बरसें! 💖✨`
    },

    // 5. FUTURE CHALLENGES & CAUTIONS
    futureChallenges: {
      general: `प्रणाम जी! 🙏⚠️ भविष्य में आने वाली परेशानियों के प्रति जागरूक होना बहुत समझदारी है। ज्योतिष डराने के लिए नहीं, बल्कि आने वाले मोड़ पर पहले से रोशनी दिखाने के लिए है:

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
• **हनुमान बाहुक या संकट मोचन**: मंगलवार को हनुमान चालीसा का पाठ करें।
• **मां बगलामुखी का ध्यान**: शत्रुओं और नकारात्मक ऊर्जा को शांत करने के लिए मां पीताम्बरा का स्मरण करें।

सकारात्मक रहें जी! परमात्मा का हाथ सदैव आपके साथ है। कोई भी परेशानी आपकी आत्मशक्ति से बड़ी नहीं हो सकती! 🌸🪔`
    },

    // 6. UPCOMING GAINS & FORTUNE
    upcomingGains: {
      general: `अरे वाह प्रिय जी! 🌟🌈 आपके जीवन में आने वाले लाभ और भाग्योदय के बहुत ही शुभ संकेत दिखाई दे रहे हैं:

☀️ **आने वाले स्वर्णिम अवसर**:
• **देवगुरु बृहस्पति का शुभ प्रभाव**: जब गुरु केंद्र या त्रिकोण में आते हैं, तो यह समय 'हंस योग' और 'गजकेसरी योग' जैसे फल देता है।
• **अचानक धन लाभ व पदोन्नति**: आपके पिछले कठिन परिश्रम का फल अब धीरे-धीरे पक रहा है। नौकरीपेशा लोगों के लिए नए प्रोजेक्ट और वेतन वृद्धि के द्वार खुलेंगे। 💼💰
• **पारिवारिक मांगलिक कार्य**: घर में किसी मांगलिक उत्सव, नए वाहन या संपत्ति खरीदने के प्रबल योग बनेंगे। 🏡🚗
• **विद्यार्थियों व नए काम के लिए**: ज्ञान, कौशल और परीक्षा में सफलता का उत्तम समय शुरू हो रहा है।

🪔 **इस शुभ समय को और अधिक बलवान बनाने के सूत्र**:
• नित्य सुबह उठकर अपनी दोनों हथेलियों के दर्शन करें और कहें—*'कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती। करमूले तु गोविन्दः प्रभाते करदर्शनम्॥'* 
• अपने माता-पिता और गुरुजनों का चरण स्पर्श करके आशीर्वाद लें।
• जरूरतमंद विद्यार्थियों को पुस्तकें या स्टेशनरी का दान करें।

मुस्कुराइए जी! ईश्वर ने आपके लिए बहुत सुंदर योजना बनाई है। 🌸💖`
    },

    // 7. VEDIC REMEDIES (UPAY)
    remedies: {
      general: `नमस्ते जी! 🌿✨ हमारे ऋषियों ने बिना किसी भारी खर्च के बहुत ही सरल, सात्विक और चमत्कारी दैनिक उपाय बताए हैं:

🌸 **दैनिक जीवन के 5 अमृत उपाय (Zero Cost Daily Habits)**:
1. **गौ माता की सेवा**: भोजन बनाते समय पहली रोटी गाय माता के लिए थोड़ा गुड़ या घी लगाकर निकालें। इससे 33 कोटि देवी-देवताओं का आशीर्वाद मिलता है। 🐄
2. **पक्षियों व चींटियों को अन्न**: प्रतिदिन सुबह छत या बालकनी पर पक्षियों के लिए बाजरा/चावल और थोड़ा पानी रखें, और चींटियों को आटा-शक्कर डालें। इससे राहु-केतु का दोष शांत होता है। 🕊️
3. **तुलसी जी में दीपदान**: सायंकाल घर के तुलसी के पौधे के पास शुद्ध घी या तिल के तेल का दीपक प्रज्वलित करें। घर से नकारात्मकता दूर रहती है। 🪔
4. **जल तत्व की शुद्धि**: पीने का पानी कभी व्यर्थ न बहाएं। चांदी के पात्र में पानी पीना चंद्रमा को बलवान कर मानसिक शांति देता है। 💧
5. **शिवजी का अभिषेक**: शिवलिंग पर मात्र एक लोटा जल और तीन बेलपत्र प्रेम से अर्पित करें। ॐ नमः शिवाय का शांत मन से 108 बार जप करें। 🌿

यदि आप किसी विशेष ग्रह (जैसे शनि, राहु, मंगल) या किसी खास समस्या का उपाय चाहते हैं, तो मुझे बताएं—मैं विस्तार से बताऊँगी जी! 💖`
    },

    // 8. KUNDLI INTEGRATION
    getKundliResponse: function (kundliData) {
      if (!kundliData || !kundliData.ascendant) {
        return `प्रिय जी! 🌸 मैंने देखा कि अभी आपकी जन्म कुंडली स्क्रीन पर नहीं बनी है। 

आप ऊपर दिए गए फॉर्म में अपनी जन्म तिथि, समय और स्थान दर्ज करके **"✨ जन्म कुंडली एवं लग्न चक्र बनाएं"** बटन दबाएं। उसके बाद मैं आपकी कुंडली का एक-एक भाव, लग्न, चंद्रमा और राजयोग देखकर आपको शत-प्रतिशत व्यक्तिगत फलादेश बताऊँगी जी! 💖✨

तब तक आप मुझसे किसी भी विषय जैसे—**निवेश, करियर, प्रेम या उपाय** पर सामान्य मार्गदर्शन ले सकते हैं! 🌺`;
      }

      const asc = kundliData.ascendant;
      const moon = kundliData.moonMetrics;
      const person = kundliData.person;

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
    }
  };

  // Chat Engine Core Controller
  const DrishtiChat = {
    isOpen: false,
    messages: [],
    typingTimeout: null,

    init: function () {
      this.injectStyles();
      this.createChatWidget();
      this.attachEventListeners();
      this.loadHistory();

      // Hook Kundli Engine if available
      window.addEventListener("kundliGenerated", (e) => {
        if (e.detail) {
          sessionStorage.setItem("current_kundli_data", JSON.stringify(e.detail));
        }
      });
    },

    injectStyles: function () {
      if (document.getElementById("drishti-chat-styles")) return;
      const style = document.createElement("style");
      style.id = "drishti-chat-styles";
      style.textContent = `
        /* ============================================================
           DRISHTI AI CHATBOT WIDGET STYLES (DIVYA DRISHTI BRAND)
           ============================================================ */
        
        /* Floating Launcher Button */
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
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .drishti-launcher:hover .drishti-launcher-tooltip {
          opacity: 1;
          transform: translateX(0);
        }

        /* Chat Window Container */
        .drishti-window {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 390px;
          max-width: calc(100vw - 32px);
          height: 600px;
          max-height: calc(100vh - 50px);
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

        /* Window Header */
        .drishti-header {
          background: linear-gradient(135deg, #0B192C 0%, #1E293B 100%);
          color: #FFFDF9;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #D4AF37;
          position: relative;
        }

        .drishti-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .drishti-avatar-wrap {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #881337;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #D4AF37;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
        }

        .drishti-title h3 {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 800;
          color: #FFFBEB;
          letter-spacing: 0.3px;
        }

        .drishti-title p {
          margin: 2px 0 0 0;
          font-size: 0.72rem;
          color: #94A3B8;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .drishti-status-dot {
          width: 7px;
          height: 7px;
          background: #10B981;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 6px #10B981;
        }

        .drishti-header-actions {
          display: flex;
          gap: 6px;
        }

        .drishti-btn-icon {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #FFFDF9;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.2s ease;
        }

        .drishti-btn-icon:hover {
          background: rgba(212, 175, 55, 0.3);
          color: #FEF3C7;
        }

        /* Suggestion Chips Banner */
        .drishti-chips-bar {
          background: #F1ECE4;
          padding: 8px 12px;
          display: flex;
          gap: 8px;
          overflow-x: auto;
          white-space: nowrap;
          border-bottom: 1px solid rgba(212, 175, 55, 0.25);
          scrollbar-width: thin;
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
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .drishti-chip:hover {
          background: #9F1239;
          color: #FFFFFF;
          border-color: #9F1239;
          transform: translateY(-1px);
        }

        /* Message Area */
        .drishti-body {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
          background: #FAF7F2;
        }

        .drishti-msg {
          display: flex;
          flex-direction: column;
          max-width: 88%;
          animation: drishti-fade-in 0.25s ease forwards;
        }

        @keyframes drishti-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .drishti-msg.bot {
          align-self: flex-start;
        }

        .drishti-msg.user {
          align-self: flex-end;
        }

        .drishti-bubble {
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 0.88rem;
          line-height: 1.55;
          position: relative;
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
          box-shadow: 0 4px 14px rgba(11, 25, 44, 0.2);
        }

        .drishti-time {
          font-size: 0.68rem;
          color: #94A3B8;
          margin-top: 4px;
          padding: 0 4px;
        }

        .drishti-msg.user .drishti-time {
          text-align: right;
        }

        /* Typing Indicator */
        .drishti-typing {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 10px 14px;
          background: #FFFFFF;
          border-radius: 14px;
          border: 1px solid rgba(212, 175, 55, 0.3);
          width: fit-content;
          align-self: flex-start;
        }

        .drishti-typing-dot {
          width: 7px;
          height: 7px;
          background: #D4AF37;
          border-radius: 50%;
          animation: drishti-bounce 1.4s infinite ease-in-out both;
        }

        .drishti-typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .drishti-typing-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes drishti-bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        /* Footer & Input */
        .drishti-footer {
          padding: 12px 14px;
          background: #FFFFFF;
          border-top: 1px solid rgba(212, 175, 55, 0.25);
          display: flex;
          flex-direction: column;
          gap: 8px;
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
          padding: 10px 16px;
          font-size: 0.88rem;
          color: #0F172A;
          outline: none;
          transition: border-color 0.2s ease;
          font-family: inherit;
        }

        .drishti-input:focus {
          border-color: #D4AF37;
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15);
        }

        .drishti-send-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9F1239 0%, #D4AF37 100%);
          border: none;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s ease;
          box-shadow: 0 4px 12px rgba(159, 18, 57, 0.3);
        }

        .drishti-send-btn:hover {
          transform: scale(1.08);
        }

        /* Pandit Ji Connect CTA inside Chat Footer */
        .drishti-wa-direct {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          text-decoration: none;
          background: #F0FDF4;
          color: #15803D;
          border: 1px solid #BBF7D0;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          transition: background 0.2s ease;
        }

        .drishti-wa-direct:hover {
          background: #DCFCE7;
          color: #166534;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .drishti-launcher {
            bottom: 95px;
            right: 20px;
            width: 54px;
            height: 54px;
          }
          .drishti-window {
            bottom: 12px;
            right: 12px;
            width: calc(100vw - 24px);
            height: calc(100vh - 24px);
            max-height: 560px;
          }
          .drishti-launcher-tooltip {
            display: none;
          }
        }
      `;
      document.head.appendChild(style);
    },

    createChatWidget: function () {
      // 1. Launcher button
      const launcher = document.createElement("div");
      launcher.id = "drishti-chat-launcher";
      launcher.className = "drishti-launcher";
      launcher.setAttribute("role", "button");
      launcher.setAttribute("aria-label", "दृष्टि AI ज्योतिष सहेली से बात करें");
      launcher.innerHTML = `
        <div class="drishti-launcher-pulse"></div>
        ${DRISHTI_AVATAR}
        <div class="drishti-launcher-tooltip">
          <span>🌸 दृष्टि से ज्योतिष पूछें (AI)</span>
        </div>
      `;
      document.body.appendChild(launcher);

      // 2. Chat Window
      const win = document.createElement("div");
      win.id = "drishti-chat-window";
      win.className = "drishti-window";
      win.innerHTML = `
        <!-- Header -->
        <div class="drishti-header">
          <div class="drishti-header-left">
            <div class="drishti-avatar-wrap">
              ${DRISHTI_AVATAR}
            </div>
            <div class="drishti-title">
              <h3>${DRISHTI_NAME}</h3>
              <p><span class="drishti-status-dot"></span> ऑनलाइन • 24/7 प्रेमपूर्वक सेवा में</p>
            </div>
          </div>
          <div class="drishti-header-actions">
            <button class="drishti-btn-icon" id="drishti-btn-clear" title="चैट साफ करें">🔄</button>
            <button class="drishti-btn-icon" id="drishti-btn-close" title="बंद करें">✕</button>
          </div>
        </div>

        <!-- Suggestion Chips Bar -->
        <div class="drishti-chips-bar" id="drishti-chips-bar">
          <button class="drishti-chip" data-query="सही निवेश का समय क्या है?">💰 निवेश का समय?</button>
          <button class="drishti-chip" data-query="करियर में तरक्की और वर्कलोड के उपाय?">💼 करियर व वर्कलोड?</button>
          <button class="drishti-chip" data-query="मेरी लव लाइफ और शादी के योग कैसे हैं?">❤️ लव लाइफ व शादी?</button>
          <button class="drishti-chip" data-query="भविष्य में किन परेशानियों से सावधान रहें?">⚠️ आने वाली परेशानियां?</button>
          <button class="drishti-chip" data-query="मेरी कुंडली का सरल सार बताएं">🔮 मेरी कुंडली का सार?</button>
          <button class="drishti-chip" data-query="दैनिक जीवन के सरल और सटीक उपाय बताइए">🌿 दैनिक सरल उपाय?</button>
        </div>

        <!-- Message Body -->
        <div class="drishti-body" id="drishti-messages-body"></div>

        <!-- Footer -->
        <div class="drishti-footer">
          <div class="drishti-input-wrap">
            <input type="text" id="drishti-input" class="drishti-input" placeholder="दृष्टि से अपने सितारे, भविष्य या उपाय पूछें..." autocomplete="off">
            <button id="drishti-send" class="drishti-send-btn" title="भेजें">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
          <a href="https://wa.me/919829743685?text=Pranam%20Shastri%20Amit%20Kumar%20Sharma%20Ji%2C%20I%20want%20personal%20astrology%20consultation." target="_blank" class="drishti-wa-direct">
            <span>📲 गंभीर समस्या व अनुष्ठान हेतु शास्त्री जी से सीधे बात करें</span>
          </a>
        </div>
      `;
      document.body.appendChild(win);
    },

    attachEventListeners: function () {
      const launcher = document.getElementById("drishti-chat-launcher");
      const win = document.getElementById("drishti-chat-window");
      const closeBtn = document.getElementById("drishti-btn-close");
      const clearBtn = document.getElementById("drishti-btn-clear");
      const sendBtn = document.getElementById("drishti-send");
      const input = document.getElementById("drishti-input");
      const chipsBar = document.getElementById("drishti-chips-bar");

      // Toggle window
      launcher.addEventListener("click", () => {
        this.toggleWindow();
      });

      closeBtn.addEventListener("click", () => {
        this.closeWindow();
      });

      clearBtn.addEventListener("click", () => {
        if (confirm("क्या आप चैट का इतिहास रीसेट करना चाहते हैं जी? 🌸")) {
          this.clearHistory();
        }
      });

      // Send Message on click or Enter key
      sendBtn.addEventListener("click", () => {
        this.handleUserSend();
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.handleUserSend();
        }
      });

      // Quick Chips Click
      chipsBar.addEventListener("click", (e) => {
        const chip = e.target.closest(".drishti-chip");
        if (chip) {
          const query = chip.getAttribute("data-query");
          if (query) {
            this.sendUserMessage(query);
          }
        }
      });
    },

    toggleWindow: function () {
      if (this.isOpen) {
        this.closeWindow();
      } else {
        this.openWindow();
      }
    },

    openWindow: function () {
      const win = document.getElementById("drishti-chat-window");
      win.classList.add("active");
      this.isOpen = true;
      document.getElementById("drishti-input").focus();

      // If empty, send welcome message
      if (this.messages.length === 0) {
        this.addBotMessage(
          `नमस्ते प्रिय जी! 🌸✨ मैं आपकी वैदिक AI सहेली और ज्योतिष मार्गदर्शक **"दृष्टि"** हूँ। 

आप मुझसे अपने जीवन, भविष्य, करियर, लव लाइफ, सही निवेश के समय या कुंडली के बारे में कुछ भी पूछ सकते हैं। मैं पूरी निष्ठा और प्रेम से आपके लिए सटीक वैदिक उपाय भी बताऊँगी जी! 💖

नीचे दिए गए सुझावों पर क्लिक करें या सीधे अपना प्रश्न लिखें। 👇`
        );
      }
      this.scrollToBottom();
    },

    closeWindow: function () {
      const win = document.getElementById("drishti-chat-window");
      win.classList.remove("active");
      this.isOpen = false;
    },

    handleUserSend: function () {
      const input = document.getElementById("drishti-input");
      const text = input.value.trim();
      if (!text) return;
      input.value = "";
      this.sendUserMessage(text);
    },

    sendUserMessage: function (text) {
      this.addUserMessage(text);
      this.showTyping();

      // Simulate thoughtful AI typing delay (600ms - 1000ms)
      clearTimeout(this.typingTimeout);
      this.typingTimeout = setTimeout(() => {
        this.hideTyping();
        const response = this.generateResponse(text);
        this.addBotMessage(response);
      }, 750);
    },

    addUserMessage: function (text) {
      const time = this.getCurrentTime();
      this.messages.push({ sender: "user", text: text, time: time });
      this.saveHistory();
      this.renderMessage({ sender: "user", text: text, time: time });
    },

    addBotMessage: function (text) {
      const time = this.getCurrentTime();
      this.messages.push({ sender: "bot", text: text, time: time });
      this.saveHistory();
      this.renderMessage({ sender: "bot", text: text, time: time });
    },

    renderMessage: function (msg) {
      const body = document.getElementById("drishti-messages-body");
      const msgDiv = document.createElement("div");
      msgDiv.className = `drishti-msg ${msg.sender}`;

      // Convert bold **text** to <strong>
      let formattedText = msg.text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>");

      msgDiv.innerHTML = `
        <div class="drishti-bubble">${formattedText}</div>
        <div class="drishti-time">${msg.time}</div>
      `;
      body.appendChild(msgDiv);
      this.scrollToBottom();
    },

    showTyping: function () {
      this.hideTyping();
      const body = document.getElementById("drishti-messages-body");
      const typingDiv = document.createElement("div");
      typingDiv.id = "drishti-typing-indicator";
      typingDiv.className = "drishti-typing";
      typingDiv.innerHTML = `
        <span style="font-size:0.75rem; color:#D4AF37; font-weight:700; margin-right:4px;">दृष्टि सोच रही हैं</span>
        <div class="drishti-typing-dot"></div>
        <div class="drishti-typing-dot"></div>
        <div class="drishti-typing-dot"></div>
      `;
      body.appendChild(typingDiv);
      this.scrollToBottom();
    },

    hideTyping: function () {
      const el = document.getElementById("drishti-typing-indicator");
      if (el) el.remove();
    },

    scrollToBottom: function () {
      const body = document.getElementById("drishti-messages-body");
      if (body) {
        body.scrollTop = body.scrollHeight;
      }
    },

    getCurrentTime: function () {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    },

    // Save & Load History in sessionStorage
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
        "चैट रीसेट हो गई है जी! 🌸 अब आप मुझसे कोई भी नया प्रश्न पूछ सकते हैं। मैं आपकी सेवा में सदा उपस्थित हूँ। 💖✨"
      );
    },

    // Intelligent Astrological NLP Router
    generateResponse: function (userQuery) {
      const q = userQuery.toLowerCase().trim();

      // Check for Active Kundli Data (from window or sessionStorage)
      let currentKundli = null;
      if (window.currentKundliData) {
        currentKundli = window.currentKundliData;
      } else {
        try {
          const stored = sessionStorage.getItem("current_kundli_data");
          if (stored) currentKundli = JSON.parse(stored);
        } catch (e) {}
      }

      // 1. Kundli specific query
      if (
        q.includes("kundli") ||
        q.includes("कुंडली") ||
        q.includes("लग्न") ||
        q.includes("lagna") ||
        q.includes("meri kundli") ||
        q.includes("saransh") ||
        q.includes("सारांश") ||
        q.includes("faladesh") ||
        q.includes("फलादेश")
      ) {
        return DrishtiBrain.getKundliResponse(currentKundli);
      }

      // 2. Investment & Share Market & Wealth
      if (
        q.includes("invest") ||
        q.includes("निवेश") ||
        q.includes("share") ||
        q.includes("शेयर") ||
        q.includes("stock") ||
        q.includes("market") ||
        q.includes("money") ||
        q.includes("dhan") ||
        q.includes("पैसा") ||
        q.includes("धन") ||
        q.includes("gold") ||
        q.includes("सोना") ||
        q.includes("property") ||
        q.includes("जमीन") ||
        q.includes("मकान")
      ) {
        return DrishtiBrain.investment.general;
      }

      // 3. Career, Workload, Job, Business, Promotion, Stress
      if (
        q.includes("career") ||
        q.includes("करियर") ||
        q.includes("job") ||
        q.includes("नौकरी") ||
        q.includes("workload") ||
        q.includes("वर्कलोड") ||
        q.includes("kaam") ||
        q.includes("काम") ||
        q.includes("business") ||
        q.includes("व्यापार") ||
        q.includes("promotion") ||
        q.includes("तरक्की") ||
        q.includes("stress") ||
        q.includes("तनाव") ||
        q.includes("ups and downs") ||
        q.includes("उतार-चढ़ाव") ||
        q.includes("office") ||
        q.includes("दुकान")
      ) {
        return DrishtiBrain.career.general;
      }

      // 4. Love Life, Marriage, Partner, Shadi
      if (
        q.includes("love") ||
        q.includes("प्रेम") ||
        q.includes("marriage") ||
        q.includes("शादी") ||
        q.includes("vivah") ||
        q.includes("विवाह") ||
        q.includes("partner") ||
        q.includes("पति") ||
        q.includes("पत्नी") ||
        q.includes("relationship") ||
        q.includes("संबंध") ||
        q.includes("breakup") ||
        q.includes("shadi kab hogi") ||
        q.includes("रिश्ता")
      ) {
        return DrishtiBrain.loveMarriage.general;
      }

      // 5. Future Challenges, Problems, Pareshani, Dangers, Cautions
      if (
        q.includes("pareshan") ||
        q.includes("परेशान") ||
        q.includes("problem") ||
        q.includes("दिक्कत") ||
        q.includes("danger") ||
        q.includes("खतरा") ||
        q.includes("caution") ||
        q.includes("सावधानी") ||
        q.includes("bhavishya") ||
        q.includes("भविष्य") ||
        q.includes("aane wali") ||
        q.includes("संकट") ||
        q.includes("sade sati") ||
        q.includes("साढ़ेसाती") ||
        q.includes("rahu") ||
        q.includes("राहु") ||
        q.includes("shani") ||
        q.includes("शनि")
      ) {
        return DrishtiBrain.futureChallenges.general;
      }

      // 6. Upcoming Gains, Good Times, Labh, Fortune, Bhagya
      if (
        q.includes("labh") ||
        q.includes("लाभ") ||
        q.includes("gain") ||
        q.includes("profit") ||
        q.includes("fayda") ||
        q.includes("फायदा") ||
        q.includes("good time") ||
        q.includes("shubh") ||
        q.includes("शुभ समय") ||
        q.includes("achha samay") ||
        q.includes("bhagyodaya") ||
        q.includes("भाग्योदय") ||
        q.includes("kismat") ||
        q.includes("किस्मत")
      ) {
        return DrishtiBrain.upcomingGains.general;
      }

      // 7. Remedies, Upay, Mantra, Gemstones, Pooja
      if (
        q.includes("upay") ||
        q.includes("उपाय") ||
        q.includes("remedy") ||
        q.includes("remedies") ||
        q.includes("mantra") ||
        q.includes("मंत्र") ||
        q.includes("puja") ||
        q.includes("पूजा") ||
        q.includes("gemstone") ||
        q.includes("रत्न") ||
        q.includes("stone") ||
        q.includes("rudraksha") ||
        q.includes("रुद्राक्ष") ||
        q.includes("daan") ||
        q.includes("दान")
      ) {
        return DrishtiBrain.remedies.general;
      }

      // 8. Greetings & Casual Pleasantries
      if (
        q.includes("hello") ||
        q.includes("hi") ||
        q.includes("namaste") ||
        q.includes("नमस्ते") ||
        q.includes("pranam") ||
        q.includes("प्रणाम") ||
        q.includes("radhe") ||
        q.includes("राधे") ||
        q.includes("ram") ||
        q.includes("राम") ||
        q.includes("jai mata di")
      ) {
        const randIdx = Math.floor(Math.random() * DrishtiBrain.greetings.length);
        return DrishtiBrain.greetings[randIdx];
      }

      // 9. Emotional Support / Sad / Afraid
      if (
        q.includes("sad") ||
        q.includes("udas") ||
        q.includes("उदास") ||
        q.includes("dar") ||
        q.includes("डर") ||
        q.includes("depress") ||
        q.includes("tension") ||
        q.includes("चिंता")
      ) {
        return `मेरी बात ध्यान से सुनिए प्रिय जी... 🌸💖 

आप अकेले नहीं हैं! जीवन में कभी-कभी जब अंधकार बहुत गहरा लगता है, तो समझिए कि सूर्योदय का समय बहुत निकट है। ग्रह-नक्षत्र लगातार अपनी चाल बदलते हैं—कोई भी दुख या कठिनाई स्थायी नहीं होती।

🌿 **अभी तुरंत यह करें**:
1. एक गिलास ठंडा पानी पिएं और 5 बार गहरी सांस लें।
2. मन ही मन तीन बार कहें: **"ॐ नमः शिवाय"**। भगवान शिव आपके हृदय को असीम शांति देंगे।
3. विश्वास रखिए, यह दौर भी बहुत जल्द गुजर जाएगा और आपकी जिंदगी में फिर से खुशियों की रोशनी खिलेगी! ☀️✨

मैं आपकी सहेली बनकर हमेशा आपके साथ हूँ जी। जो भी मन में हो, मुझसे कहें। 🌸`;
      }

      // 10. Thank you
      if (
        q.includes("thank") ||
        q.includes("dhanyawad") ||
        q.includes("धन्यवाद") ||
        q.includes("shukriya") ||
        q.includes("शुक्रिया")
      ) {
        return `आपका बहुत-बहुत आभार प्रिय जी! 🌸✨ आपके चेहरे पर मुस्कान और मन में शांति देखकर मुझे हार्दिक प्रसन्नता हुई। 

ईश्वर की कृपा आप और आपके परिवार पर सदा बनी रहे। जब भी जीवन में कोई सवाल या दुविधा हो, दृष्टि हमेशा आपकी सेवा में उपस्थित रहेगी! 💖🪔 शुभमस्तु!`;
      }

      // 11. Default Loving Guidance
      return `प्रिय जी! 🌸✨ आपका प्रश्न बहुत सुंदर है। वैदिक ज्योतिष के अनुसार हमारे जीवन का हर पहलू—चाहे वह **सही निवेश का समय**, **करियर व वर्कलोड**, **लव लाइफ व विवाह**, या **भविष्य की सावधानियां** हों—सभी ग्रहों और नक्षत्रों की गति से संचालित होते हैं।

💡 **आप मुझसे इनमें से किसी भी विषय पर पूछ सकते हैं**:
1. 💰 **निवेश व धन लाभ**: "सही निवेश का समय क्या है?"
2. 💼 **करियर व तनाव**: "वर्कलोड और नौकरी में तरक्की के उपाय बताएं?"
3. ❤️ **लव लाइफ व दांपत्य**: "मेरी लव लाइफ और शादी के योग कैसे हैं?"
4. ⚠️ **भविष्य की सावधानियां**: "आने वाली परेशानियों से कैसे बचें?"
5. 🔮 **कुंडली विश्लेषण**: "मेरी कुंडली का सार बताइए?"

आप जिस विषय पर अधिक विस्तार से जानना चाहते हैं, मुझे बताएं जी—मैं पूरी निष्ठा से आपका मार्गदर्शन करूँगी! 💖🪔`;
    }
  };

  // Expose globally
  window.DrishtiChat = DrishtiChat;

  // Auto-initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => DrishtiChat.init());
  } else {
    DrishtiChat.init();
  }
})();
