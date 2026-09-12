/**
 * DIVYA DRISHTI — Vedic Daily Rashifal & Activity Prediction Engine
 * Dynamic Date, Panchang, Dasha & Planetary Transits Simulator
 * Author: Shastri & Maa Baglamukhi Upasak Amit Kumar Sharma Heritage (Jaipur)
 */

(function(window) {
  'use strict';

  // 12 Sacred Vedic Rashis Reference Database
  const RASHIS = {
    mesh: {
      id: 'mesh',
      nameHindi: 'मेष राशि',
      english: 'Aries',
      glyph: '♈',
      dates: '21 मार्च - 19 अप्रैल',
      element: 'अग्नि तत्व (Fire)',
      ruler: 'मंगल देव (Mars)',
      nature: 'चर, पुरुष, उग्र',
      gemstone: 'लाल मूंगा (Red Coral)',
      baseColor: 'सिंदूरी लाल, गहरा केसरिया',
      baseNumbers: '9, 18, 27'
    },
    vrishabh: {
      id: 'vrishabh',
      nameHindi: 'वृषभ राशि',
      english: 'Taurus',
      glyph: '♉',
      dates: '20 अप्रैल - 20 मई',
      element: 'पृथ्वी तत्व (Earth)',
      ruler: 'शुक्र देव (Venus)',
      nature: 'स्थिर, स्त्री, सौम्य',
      gemstone: 'हीरा / सफेद पुखराज (Diamond / Opal)',
      baseColor: 'दूधिया सफेद, चमकीला गुलाबी',
      baseNumbers: '6, 15, 24'
    },
    mithun: {
      id: 'mithun',
      nameHindi: 'मिथुन राशि',
      english: 'Gemini',
      glyph: '♊',
      dates: '21 मई - 20 जून',
      element: 'वायु तत्व (Air)',
      ruler: 'बुध देव (Mercury)',
      nature: 'द्विस्वभाव, पुरुष, बौद्धिक',
      gemstone: 'पन्ना (Emerald)',
      baseColor: 'तोतिया हरा, हल्का पीला',
      baseNumbers: '5, 14, 23'
    },
    kark: {
      id: 'kark',
      nameHindi: 'कर्क राशि',
      english: 'Cancer',
      glyph: '♋',
      dates: '21 जून - 22 जुलाई',
      element: 'जल तत्व (Water)',
      ruler: 'चंद्र देव (Moon)',
      nature: 'चर, स्त्री, भावुक व स्नेही',
      gemstone: 'सच्चा मोती (Natural Pearl)',
      baseColor: 'मोती जैसा सफेद, चांदी (Silver)',
      baseNumbers: '2, 11, 20'
    },
    singh: {
      id: 'singh',
      nameHindi: 'सिंह राशि',
      english: 'Leo',
      glyph: '♌',
      dates: '23 जुलाई - 22 अगस्त',
      element: 'अग्नि तत्व (Fire)',
      ruler: 'सूर्य देव (Sun)',
      nature: 'स्थिर, पुरुष, तेजस्वी व नेतृत्वकारी',
      gemstone: 'माणिक्य (Ruby)',
      baseColor: 'सुनहरा पीला, माणिक्य लाल',
      baseNumbers: '1, 10, 19'
    },
    kanya: {
      id: 'kanya',
      nameHindi: 'कन्या राशि',
      english: 'Virgo',
      glyph: '♍',
      dates: '23 अगस्त - 22 सितम्बर',
      element: 'पृथ्वी तत्व (Earth)',
      ruler: 'बुध देव (Mercury)',
      nature: 'द्विस्वभाव, स्त्री, विश्लेषणात्मक',
      gemstone: 'पन्ना (Emerald)',
      baseColor: 'गहरा हरा, नेवी ब्लू',
      baseNumbers: '5, 14, 32'
    },
    tula: {
      id: 'tula',
      nameHindi: 'तुला राशि',
      english: 'Libra',
      glyph: '♎',
      dates: '23 सितम्बर - 22 अक्टूबर',
      element: 'वायु तत्व (Air)',
      ruler: 'शुक्र देव (Venus)',
      nature: 'चर, पुरुष, न्यायप्रिय व संतुलित',
      gemstone: 'ओपल या श्वेत पुखराज',
      baseColor: 'क्रीम, आसमानी नीला',
      baseNumbers: '6, 15, 33'
    },
    vrishchik: {
      id: 'vrishchik',
      nameHindi: 'वृश्चिक राशि',
      english: 'Scorpio',
      glyph: '♏',
      dates: '23 अक्टूबर - 21 नवम्बर',
      element: 'जल तत्व (Water)',
      ruler: 'मंगल देव (Mars)',
      nature: 'स्थिर, स्त्री, गूढ़ व ऊर्जावान',
      gemstone: 'लाल मूंगा (Red Coral)',
      baseColor: 'मेहरून, रक्त वर्ण',
      baseNumbers: '9, 18, 36'
    },
    dhanu: {
      id: 'dhanu',
      nameHindi: 'धनु राशि',
      english: 'Sagittarius',
      glyph: '♐',
      dates: '22 नवम्बर - 21 दिसम्बर',
      element: 'अग्नि तत्व (Fire)',
      ruler: 'देवगुरु बृहस्पति (Jupiter)',
      nature: 'द्विस्वभाव, पुरुष, ज्ञानी व आशावादी',
      gemstone: 'पीला पुखराज (Yellow Sapphire)',
      baseColor: 'हल्दी पीला, स्वर्णिम केसरिया',
      baseNumbers: '3, 12, 21'
    },
    makar: {
      id: 'makar',
      nameHindi: 'मकर राशि',
      english: 'Capricorn',
      glyph: '♑',
      dates: '22 दिसम्बर - 19 जनवरी',
      element: 'पृथ्वी तत्व (Earth)',
      ruler: 'शनि देव (Saturn)',
      nature: 'चर, स्त्री, कर्मठ व व्यावहारिक',
      gemstone: 'नीलम (Blue Sapphire)',
      baseColor: 'गहरा नीला, स्लेटी (Grey)',
      baseNumbers: '8, 17, 26'
    },
    kumbh: {
      id: 'kumbh',
      nameHindi: 'कुंभ राशि',
      english: 'Aquarius',
      glyph: '♒',
      dates: '20 जनवरी - 18 फरवरी',
      element: 'वायु तत्व (Air)',
      ruler: 'शनि देव (Saturn)',
      nature: 'स्थिर, पुरुष, दार्शनिक व प्रगतिशील',
      gemstone: 'नीलम या जामुनिया',
      baseColor: 'आसमानी नीला, गहरा बैंगनी',
      baseNumbers: '4, 13, 22'
    },
    meen: {
      id: 'meen',
      nameHindi: 'मीन राशि',
      english: 'Pisces',
      glyph: '♓',
      dates: '19 फरवरी - 20 मार्च',
      element: 'जल तत्व (Water)',
      ruler: 'देवगुरु बृहस्पति (Jupiter)',
      nature: 'द्विस्वभाव, स्त्री, आध्यात्मिक व दयालु',
      gemstone: 'पुखराज (Yellow Sapphire)',
      baseColor: 'समुद्री हरा, पीला चन्दन',
      baseNumbers: '3, 12, 30'
    }
  };

  const DAYS_HINDI = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  const MONTHS_HINDI = [
    'जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
    'जुलाई', 'अगस्त', 'सितम्बर', 'अक्टूबर', 'नवम्बर', 'दिसम्बर'
  ];

  const DAY_RULERS = [
    { name: 'सूर्य देव', planetEn: 'Sun', color: 'लाल/केसरिया' },
    { name: 'चंद्र देव', planetEn: 'Moon', color: 'दूधिया सफेद' },
    { name: 'मंगल देव', planetEn: 'Mars', color: 'सिंदूरी' },
    { name: 'बुध देव', planetEn: 'Mercury', color: 'हरा' },
    { name: 'देवगुरु बृहस्पति', planetEn: 'Jupiter', color: 'पीला' },
    { name: 'शुक्र देव', planetEn: 'Venus', color: 'गुलाबी/सफेद' },
    { name: 'शनि देव', planetEn: 'Saturn', color: 'गहरा नीला/काला' }
  ];

  const NAKSHATRAS = [
    'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा', 'आर्द्रा', 'पुनर्वसु', 'पुष्य',
    'आश्लेषा', 'मघा', 'पूर्वाफाल्गुनी', 'उत्तराफाल्गुनी', 'हस्त', 'चित्रा', 'स्वाति',
    'विशाखा', 'अनुराधा', 'ज्येष्ठा', 'मूल', 'पूर्वाषाढ़ा', 'उत्तराषाढ़ा', 'श्रवण',
    'धनिष्ठा', 'शतभिषा', 'पूर्वाभाद्रपद', 'उत्तराभाद्रपद', 'रेवती'
  ];

  // Dynamic Activity & Prediction Engine
  function getFaladeshForRashi(rashiKey, targetDate) {
    const rashi = RASHIS[rashiKey] || RASHIS.mesh;
    const dateObj = new Date(targetDate);
    const dayOfWeek = dateObj.getDay();
    const dayOfMonth = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();

    const dayNameHindi = DAYS_HINDI[dayOfWeek];
    const monthNameHindi = MONTHS_HINDI[month];
    const fullDateHindi = `${dayNameHindi}, ${dayOfMonth} ${monthNameHindi} ${year}`;

    const dayRuler = DAY_RULERS[dayOfWeek];
    const nakshatraIndex = (dayOfMonth + month * 2 + (rashiKey.charCodeAt(0) % 7)) % NAKSHATRAS.length;
    const currentNakshatra = NAKSHATRAS[nakshatraIndex];

    // Pseudo-random deterministic seed for consistent daily generation
    const seed = (year * 365 + (month + 1) * 31 + dayOfMonth + rashiKey.length * 17 + rashiKey.charCodeAt(0)) % 1000;
    const bhagyaScore = 68 + (seed % 28); // 68% to 95%

    // Dynamic Activity Possibilities based on Rashi + Day
    const activityPool = [
      {
        title: 'अचानक आर्थिक लाभ या अटका धन मिलने के योग',
        prob: 75 + (seed % 20),
        tag: 'धन लाभ',
        desc: 'व्यापारिक लेन-देन या पूर्व में फंसा हुआ धन मिलने की प्रबल संभावना है। किसी अप्रत्याशित स्रोत से शुभ समाचार प्राप्त हो सकता है।'
      },
      {
        title: 'कार्यक्षेत्र में नई जिम्मेदारी व मान-सम्मान वृद्धि',
        prob: 70 + ((seed * 3) % 25),
        tag: 'करियर',
        desc: 'अधिकारियों व सहकर्मियों का पूर्ण सहयोग मिलेगा। आपकी बनाई गई किसी पुरानी योजना को आज स्वीकृति मिल सकती है।'
      },
      {
        title: 'परिवार में मांगलिक चर्चा व सामंजस्य',
        prob: 80 + ((seed * 7) % 18),
        tag: 'पारिवारिक',
        desc: 'पारिवारिक वातावरण सुखद रहेगा। जीवनसाथी अथवा माता-पिता के साथ किसी महत्वपूर्ण निर्णय पर सहमति बनेगी।'
      },
      {
        title: 'छोटी या लाभदायक यात्रा के योग',
        prob: 65 + ((seed * 11) % 28),
        tag: 'यात्रा',
        desc: 'व्यापारिक सिलसिले में अथवा किसी तीर्थ/धार्मिक स्थान की यात्रा का विचार बन सकता है। यात्रा शुभ फलदायी रहेगी।'
      },
      {
        title: 'विरोधी पक्ष व गुप्त शत्रुओं पर विजय',
        prob: 78 + ((seed * 5) % 19),
        tag: 'सुरक्षा व विजय',
        desc: 'माता बगलामुखी की कृपा से गुप्त विरोधियों के षड्यंत्र विफल होंगे। कोर्ट-कचहरी या विवादों में आपका पक्ष मजबूत रहेगा।'
      }
    ];

    // Select top 3-4 activities for today
    const activities = [
      activityPool[(seed) % activityPool.length],
      activityPool[(seed + 1) % activityPool.length],
      activityPool[(seed + 2) % activityPool.length]
    ];

    // Specific Domain Hindi Forecasts
    const careerForecasts = [
      `आज ${dayRuler.name} के विशेष प्रभाव से कार्यक्षेत्र में आपका पराक्रम व आत्मविश्वास शीर्ष पर रहेगा। अधिकारी आपके सुझावों को गंभीरता से लेंगे। व्यापार में साझेदारी से लाभ के प्रबल योग हैं।`,
      `नौकरीपेशा जातकों के लिए आज का दिन पद-प्रतिष्ठा बढ़ाने वाला रहेगा। यदि नई नौकरी या प्रोजेक्ट की तलाश में हैं, तो आज किया गया प्रयास सार्थक सिद्ध होगा। वाणी में सौम्यता बनाए रखें।`,
      `व्यापारिक दृष्टिकोण से आज का दिन दूरगामी परिणाम देने वाला है। प्रतिद्वंद्वी आपके सामने कमजोर महसूस करेंगे। तकनीकी और रचनात्मक क्षेत्रों से जुड़े लोगों को बेहतरीन अवसर मिलेंगे।`
    ];

    const financeForecasts = [
      `आर्थिक स्थिति में स्थिरता और मजबूती आएगी। किसी नए निवेश की योजना बन सकती है। फिजूलखर्ची से बचें और संचित धन में वृद्धि पर ध्यान दें।`,
      `अचानक धन लाभ के संकेत हैं। पैतृक संपत्ति अथवा पुराने निवेश से अप्रत्याशित मुनाफा होने की संभावना है। ऋण संबंधी मामलों में राहत मिलेगी।`,
      `आय के नए स्रोत विकसित हो सकते हैं। व्यापार में ग्राहकों की संख्या बढ़ेगी। शुभ कार्यों में धन का व्यय मानसिक शांति देगा।`
    ];

    const loveForecasts = [
      `दांपत्य जीवन में मधुरता और परस्पर विश्वास बढ़ेगा। जीवनसाथी के साथ शाम का समय अत्यंत सुखद व्यतीत होगा। अविवाहितों के लिए विवाह प्रस्ताव की बात आगे बढ़ सकती है।`,
      `प्रेम संबंधों में आपसी समझदारी बढ़ेगी। यदि कोई पुरानी गलतफहमी थी, तो आज खुलकर बातचीत करने से उसका समाधान निकलेगा। परिवार के बुजुर्गों का स्नेह प्राप्त होगा।`,
      `रिश्तों में प्रगाढ़ता आएगी। संतान पक्ष से कोई शुभ सूचना मन को प्रफुल्लित करेगी। मित्रों के साथ बिताया गया समय ऊर्जावान बनाएगा।`
    ];

    const healthForecasts = [
      `शारीरिक ऊर्जा व मानसिक प्रसन्नता बनी रहेगी। खान-पान में सात्विकता रखें और अत्यधिक तैलीय या मसालेदार भोजन से परहेज करें। योग व प्राणायाम अत्यंत लाभकारी रहेगा।`,
      `स्वास्थ्य सामान्य रहेगा, परंतु मौसमी बदलाव से सतर्क रहें। पर्याप्त मात्रा में जल ग्रहण करें और रात्रि में समय पर सोने का नियम बनाएं। तनाव से मुक्ति मिलेगी।`,
      `मानसिक शांति का अनुभव होगा। पुराने किसी रोग में सुधार के संकेत हैं। सुबह की धूप और ताजी हवा आपके उत्साह को दोगुना कर देगी।`
    ];

    const dosAndDonts = [
      {
        doText: 'प्रातःकाल सूर्योदय के समय गायत्री मंत्र अथवा इष्ट देव का ध्यान करें। आज महत्वपूर्ण कार्यों में वरिष्ठों का आशीर्वाद लेकर ही शुरुआत करें।',
        dontText: 'अति-उत्साह में आकर किसी अजनबी पर वित्तीय भरोसा न करें। व्यर्थ की बहसबाजी अथवा कटु वचनों के प्रयोग से बचें।'
      },
      {
        doText: 'किसी जरूरतमंद को फल, जल या अन्न का दान करें। अपने मुख्य कार्य को दोपहर 12 बजे से पूर्व आरंभ करना अत्यंत शुभ रहेगा।',
        dontText: 'उधार लेन-देन करने से आज परहेज रखें। क्रोध व आवेश में आकर कोई बड़ा पारिवारिक निर्णय न लें।'
      },
      {
        doText: 'माता-पिता के चरण स्पर्श कर दिन की शुरुआत करें। पीले या सफेद वस्त्र धारण करना आज अनुकूलता में वृद्धि करेगा।',
        dontText: 'वाहन चलाते समय जल्दबाजी न दिखाएं। किसी के बहकावे में आकर अपने दीर्घकालिक लक्ष्यों में बदलाव न करें।'
      }
    ];

    const remedies = [
      `श्री हनुमान चालीसा का पाठ करें और मस्तक पर केसर या लाल चंदन का तिलक लगाएं। इससे आत्मविश्वास व पराक्रम में अप्रत्याशित वृद्धि होगी।`,
      `माता बगलामुखी का ध्यान करते हुए 'ॐ ह्लीं बगलामुख्यै नमः' का 21 बार जप करें। शत्रुओं का शमन होगा और सभी कार्यों में निर्विघ्न सफलता प्राप्त होगी।`,
      `पक्षियों को बाजरा या अनाज डालें तथा गाय को हरा चारा अथवा रोटी खिलाएं। ग्रहों के अनिष्ट प्रभाव शांत होंगे और भाग्योदय होगा।`,
      `शिवलिंग पर जल व अक्षत अर्पित कर 'ॐ नमः शिवाय' का स्मरण करें। मानसिक एकाग्रता और आंतरिक शांति की प्राप्ति होगी।`
    ];

    const selectedCareer = careerForecasts[seed % careerForecasts.length];
    const selectedFinance = financeForecasts[(seed + 1) % financeForecasts.length];
    const selectedLove = loveForecasts[(seed + 2) % loveForecasts.length];
    const selectedHealth = healthForecasts[(seed + 3) % healthForecasts.length];
    const selectedDos = dosAndDonts[seed % dosAndDonts.length];
    const selectedRemedy = remedies[seed % remedies.length];

    // Auspicious times calculation
    const shubhMuhurat = `${10 + (seed % 3)}:15 AM से ${1 + (seed % 2)}:45 PM तक (अभिजीत मुहूर्त)`;
    const rahuKaal = `${4 + (dayOfWeek % 2)}:30 PM से ${6 - (dayOfWeek % 2)}:00 PM तक (राहुकाल - इसमें शुभ कार्य टालें)`;
    const luckyDir = ['उत्तर (North)', 'पूर्व (East)', 'ईशान कोण (North-East)', 'उत्तर-पश्चिम (North-West)'][seed % 4];

    return {
      rashi: rashi,
      dateFormatted: fullDateHindi,
      dayName: dayNameHindi,
      dayRuler: dayRuler.name,
      nakshatra: currentNakshatra,
      bhagyaScore: bhagyaScore,
      activities: activities,
      career: selectedCareer,
      finance: selectedFinance,
      love: selectedLove,
      health: selectedHealth,
      doText: selectedDos.doText,
      dontText: selectedDos.dontText,
      remedy: selectedRemedy,
      luckyColor: rashi.baseColor,
      luckyNumber: rashi.baseNumbers,
      luckyDir: luckyDir,
      shubhMuhurat: shubhMuhurat,
      rahuKaal: rahuKaal
    };
  }

  // DOM Renderer for Dedicated Rashi Page
  function renderRashiPage(currentRashiKey, dayOffset) {
    dayOffset = dayOffset || 0;
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + dayOffset);

    const data = getFaladeshForRashi(currentRashiKey, targetDate);

    // Update Date Text
    const elDate = document.getElementById('faladesh-date-text');
    if (elDate) elDate.textContent = data.dateFormatted;

    // Update Panchang Strip
    const elRuler = document.getElementById('faladesh-day-ruler');
    if (elRuler) elRuler.textContent = data.dayRuler;

    const elNakshatra = document.getElementById('faladesh-nakshatra');
    if (elNakshatra) elNakshatra.textContent = data.nakshatra;

    // Update Score Meter
    const elScore = document.getElementById('faladesh-score-val');
    const elScoreBar = document.getElementById('faladesh-score-bar');
    if (elScore) elScore.textContent = data.bhagyaScore + '%';
    if (elScoreBar) elScoreBar.style.width = data.bhagyaScore + '%';

    // Update Activities Container
    const elActivities = document.getElementById('faladesh-activities-list');
    if (elActivities) {
      elActivities.innerHTML = data.activities.map(act => `
        <div class="activity-prediction-card">
          <div class="act-prob-badge">
            <span class="act-prob-num">${act.prob}%</span>
            <span class="act-prob-sub">संभावना</span>
          </div>
          <div class="act-content">
            <div class="act-tag">${act.tag}</div>
            <h4 class="act-title">${act.title}</h4>
            <p class="act-desc">${act.desc}</p>
          </div>
        </div>
      `).join('');
    }

    // Update 4 Pillars
    const elCareer = document.getElementById('faladesh-career');
    if (elCareer) elCareer.textContent = data.career;

    const elFinance = document.getElementById('faladesh-finance');
    if (elFinance) elFinance.textContent = data.finance;

    const elLove = document.getElementById('faladesh-love');
    if (elLove) elLove.textContent = data.love;

    const elHealth = document.getElementById('faladesh-health');
    if (elHealth) elHealth.textContent = data.health;

    // Update Do's and Don'ts
    const elDo = document.getElementById('faladesh-do');
    if (elDo) elDo.textContent = data.doText;

    const elDont = document.getElementById('faladesh-dont');
    if (elDont) elDont.textContent = data.dontText;

    // Update Remedy
    const elRemedy = document.getElementById('faladesh-remedy');
    if (elRemedy) elRemedy.textContent = data.remedy;

    // Update Lucky Metrics
    const elColor = document.getElementById('faladesh-color');
    if (elColor) elColor.textContent = data.luckyColor;

    const elNum = document.getElementById('faladesh-number');
    if (elNum) elNum.textContent = data.luckyNumber;

    const elDir = document.getElementById('faladesh-direction');
    if (elDir) elDir.textContent = data.luckyDir;

    const elMuhurat = document.getElementById('faladesh-muhurat');
    if (elMuhurat) elMuhurat.textContent = data.shubhMuhurat;

    const elRahu = document.getElementById('faladesh-rahu');
    if (elRahu) elRahu.textContent = data.rahuKaal;

    // Update Active Date Button
    document.querySelectorAll('.date-switch-btn').forEach(btn => {
      const offset = parseInt(btn.getAttribute('data-offset') || '0', 10);
      if (offset === dayOffset) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Setup Date Switcher buttons
  function initDateSwitcher(currentRashiKey) {
    document.querySelectorAll('.date-switch-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const offset = parseInt(this.getAttribute('data-offset') || '0', 10);
        renderRashiPage(currentRashiKey, offset);
      });
    });
  }

  // Quick 12 Rashi Switcher Navigation Bar Generator
  function renderRashiQuickBar(currentRashiKey) {
    const container = document.getElementById('rashi-quick-bar');
    if (!container) return;

    const keys = Object.keys(RASHIS);
    container.innerHTML = keys.map(key => {
      const r = RASHIS[key];
      const isActive = (key === currentRashiKey) ? 'active' : '';
      return `
        <a href="rashi-${key}.html" class="quick-rashi-pill ${isActive}">
          <span class="quick-glyph">${r.glyph}</span>
          <span class="quick-name">${r.nameHindi.replace(' राशि', '')}</span>
        </a>
      `;
    }).join('');
  }

  // Expose API
  window.DivyaRashifal = {
    RASHIS: RASHIS,
    getFaladeshForRashi: getFaladeshForRashi,
    renderRashiPage: renderRashiPage,
    initDateSwitcher: initDateSwitcher,
    renderRashiQuickBar: renderRashiQuickBar
  };

})(window);
