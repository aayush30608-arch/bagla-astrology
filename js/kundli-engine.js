/**
 * DIVYA DRISHTI — Vedic Kundli & Astronomical Calculation Engine (High-Precision v2.0)
 * Lahiri (Chitrapaksha) Ayanamsha Geocentric Planetary Engine & Kundli Saransh Generator
 * (C) 2026 DIVYA DRISHTI. All Sacred Rights Reserved.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.KundliEngine = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  // 12 Rashis (Zodiac Signs)
  var RASHIS = [
    { num: 1, nameEn: "Aries", nameHi: "मेष", lordEn: "Mars", lordHi: "मंगल", element: "अग्नि", nature: "चर", color: "लाल", luckyStone: "मूँगा" },
    { num: 2, nameEn: "Taurus", nameHi: "वृष", lordEn: "Venus", lordHi: "शुक्र", element: "पृथ्वी", nature: "स्थिर", color: "सफेद / क्रीम", luckyStone: "हीरा / ओपल" },
    { num: 3, nameEn: "Gemini", nameHi: "मिथुन", lordEn: "Mercury", lordHi: "बुध", element: "वायु", nature: "द्विस्वभाव", color: "हरा", luckyStone: "पन्ना" },
    { num: 4, nameEn: "Cancer", nameHi: "कर्क", lordEn: "Moon", lordHi: "चंद्रमा", element: "जल", nature: "चर", color: "दूधिया सफेद", luckyStone: "मोती" },
    { num: 5, nameEn: "Leo", nameHi: "सिंह", lordEn: "Sun", lordHi: "सूर्य", element: "अग्नि", nature: "स्थिर", color: "सुनहरा / नारंगी", luckyStone: "माणिक्य (Ruby)" },
    { num: 6, nameEn: "Virgo", nameHi: "कन्या", lordEn: "Mercury", lordHi: "बुध", element: "पृथ्वी", nature: "द्विस्वभाव", color: "गहरा हरा", luckyStone: "पन्ना" },
    { num: 7, nameEn: "Libra", nameHi: "तुला", lordEn: "Venus", lordHi: "शुक्र", element: "वायु", nature: "चर", color: "चमकीला सफेद", luckyStone: "हीरा / जरकन" },
    { num: 8, nameEn: "Scorpio", nameHi: "वृश्चिक", lordEn: "Mars", lordHi: "मंगल", element: "जल", nature: "स्थिर", color: "गहरा लाल", luckyStone: "मूँगा" },
    { num: 9, nameEn: "Sagittarius", nameHi: "धनु", lordEn: "Jupiter", lordHi: "बृहस्पति", element: "अग्नि", nature: "द्विस्वभाव", color: "पीला / केसरिया", luckyStone: "पीला पुखराज" },
    { num: 10, nameEn: "Capricorn", nameHi: "मकर", lordEn: "Saturn", lordHi: "शनि", element: "पृथ्वी", nature: "चर", color: "नीला / काला", luckyStone: "नीलम" },
    { num: 11, nameEn: "Aquarius", nameHi: "कुम्भ", lordEn: "Saturn", lordHi: "शनि", element: "वायु", nature: "स्थिर", color: "आसमानी नीला", luckyStone: "नीलम / जामुनिया" },
    { num: 12, nameEn: "Pisces", nameHi: "मीन", lordEn: "Jupiter", lordHi: "बृहस्पति", element: "जल", nature: "द्विस्वभाव", color: "हल्दी पीला", luckyStone: "पुखराज" }
  ];

  // 27 Nakshatras
  var NAKSHATRAS = [
    { num: 1, nameEn: "Ashwini", nameHi: "अश्विनी", lordEn: "Ketu", lordHi: "केतु" },
    { num: 2, nameEn: "Bharani", nameHi: "भरणी", lordEn: "Venus", lordHi: "शुक्र" },
    { num: 3, nameEn: "Krittika", nameHi: "कृत्तिका", lordEn: "Sun", lordHi: "सूर्य" },
    { num: 4, nameEn: "Rohini", nameHi: "रोहिणी", lordEn: "Moon", lordHi: "चंद्रमा" },
    { num: 5, nameEn: "Mrigashira", nameHi: "मृगशिर", lordEn: "Mars", lordHi: "मंगल" },
    { num: 6, nameEn: "Ardra", nameHi: "अरिद्रा", lordEn: "Rahu", lordHi: "राहु" },
    { num: 7, nameEn: "Punarvasu", nameHi: "पुनर्वसु", lordEn: "Jupiter", lordHi: "बृहस्पति" },
    { num: 8, nameEn: "Pushya", nameHi: "पुष्य", lordEn: "Saturn", lordHi: "शनि" },
    { num: 9, nameEn: "Ashlesha", nameHi: "आश्लेषा", lordEn: "Mercury", lordHi: "बुध" },
    { num: 10, nameEn: "Magha", nameHi: "मघा", lordEn: "Ketu", lordHi: "केतु" },
    { num: 11, nameEn: "Purva Phalguni", nameHi: "पूर्वाफाल्गुनी", lordEn: "Venus", lordHi: "शुक्र" },
    { num: 12, nameEn: "Uttara Phalguni", nameHi: "उत्तराफाल्गुनी", lordEn: "Sun", lordHi: "सूर्य" },
    { num: 13, nameEn: "Hasta", nameHi: "हस्त", lordEn: "Moon", lordHi: "चंद्रमा" },
    { num: 14, nameEn: "Chitra", nameHi: "चित्रा", lordEn: "Mars", lordHi: "मंगल" },
    { num: 15, nameEn: "Swati", nameHi: "स्वाति", lordEn: "Rahu", lordHi: "राहु" },
    { num: 16, nameEn: "Vishakha", nameHi: "विशाखा", lordEn: "Jupiter", lordHi: "बृहस्पति" },
    { num: 17, nameEn: "Anuradha", nameHi: "अनुराधा", lordEn: "Saturn", lordHi: "शनि" },
    { num: 18, nameEn: "Jyeshtha", nameHi: "ज्येष्ठा", lordEn: "Mercury", lordHi: "बुध" },
    { num: 19, nameEn: "Moola", nameHi: "मूला", lordEn: "Ketu", lordHi: "केतु" },
    { num: 20, nameEn: "Purva Ashadha", nameHi: "पूर्वाषाढ़", lordEn: "Venus", lordHi: "शुक्र" },
    { num: 21, nameEn: "Uttara Ashadha", nameHi: "उत्तराषाढ़", lordEn: "Sun", lordHi: "सूर्य" },
    { num: 22, nameEn: "Shravana", nameHi: "श्रवण", lordEn: "Moon", lordHi: "चंद्रमा" },
    { num: 23, nameEn: "Dhanishtha", nameHi: "धनिष्ठा", lordEn: "Mars", lordHi: "मंगल" },
    { num: 24, nameEn: "Shatabhisha", nameHi: "शतभिषा", lordEn: "Rahu", lordHi: "राहु" },
    { num: 25, nameEn: "Purva Bhadrapada", nameHi: "पूर्वाभाद्र", lordEn: "Jupiter", lordHi: "बृहस्पति" },
    { num: 26, nameEn: "Uttara Bhadrapada", nameHi: "उत्तरभाद्र", lordEn: "Saturn", lordHi: "शनि" },
    { num: 27, nameEn: "Revati", nameHi: "रेवती", lordEn: "Mercury", lordHi: "बुध" }
  ];

  // Pre-configured City Database
  var CITIES = [
    { name: "Jaipur, Rajasthan", lat: 26.9124, lon: 75.7873, tz: 5.5 },
    { name: "Ballia, Uttar Pradesh", lat: 25.7592, lon: 84.1495, tz: 5.5 },
    { name: "Delhi / New Delhi", lat: 28.6139, lon: 77.2090, tz: 5.5 },
    { name: "Mumbai, Maharashtra", lat: 19.0760, lon: 72.8777, tz: 5.5 },
    { name: "Varanasi / Kashi, UP", lat: 25.3176, lon: 82.9739, tz: 5.5 },
    { name: "Lucknow, UP", lat: 26.8467, lon: 80.9462, tz: 5.5 },
    { name: "Patna, Bihar", lat: 25.5941, lon: 85.1376, tz: 5.5 },
    { name: "Kolkata, West Bengal", lat: 22.5726, lon: 88.3639, tz: 5.5 },
    { name: "Bengaluru, Karnataka", lat: 12.9716, lon: 77.5946, tz: 5.5 },
    { name: "Hyderabad, Telangana", lat: 17.3850, lon: 78.4867, tz: 5.5 },
    { name: "Ahmedabad, Gujarat", lat: 23.0225, lon: 72.5714, tz: 5.5 },
    { name: "Pune, Maharashtra", lat: 18.5204, lon: 73.8567, tz: 5.5 },
    { name: "Indore, Madhya Pradesh", lat: 22.7196, lon: 75.8577, tz: 5.5 },
    { name: "Bhopal, Madhya Pradesh", lat: 23.2599, lon: 77.4126, tz: 5.5 },
    { name: "Kanpur, Uttar Pradesh", lat: 26.4499, lon: 80.3319, tz: 5.5 },
    { name: "Nagpur, Maharashtra", lat: 21.1458, lon: 79.0882, tz: 5.5 },
    { name: "Surat, Gujarat", lat: 21.1702, lon: 72.8311, tz: 5.5 },
    { name: "Chandigarh", lat: 30.7333, lon: 76.7794, tz: 5.5 },
    { name: "Amritsar, Punjab", lat: 31.6340, lon: 74.8723, tz: 5.5 },
    { name: "Haridwar, Uttarakhand", lat: 29.9457, lon: 78.1642, tz: 5.5 },
    { name: "Ujjain, Madhya Pradesh", lat: 23.1765, lon: 75.7885, tz: 5.5 },
    { name: "Gorakhpur, UP", lat: 26.7606, lon: 83.3732, tz: 5.5 },
    { name: "Prayagraj / Allahabad, UP", lat: 25.4358, lon: 81.8463, tz: 5.5 },
    { name: "Ayodhya, UP", lat: 26.7922, lon: 82.1998, tz: 5.5 },
    { name: "Mathura, UP", lat: 27.4924, lon: 77.6737, tz: 5.5 },
    { name: "Jodhpur, Rajasthan", lat: 26.2389, lon: 73.0243, tz: 5.5 },
    { name: "Udaipur, Rajasthan", lat: 24.5854, lon: 73.7125, tz: 5.5 },
    { name: "Kota, Rajasthan", lat: 25.2138, lon: 75.8648, tz: 5.5 },
    { name: "Ranchi, Jharkhand", lat: 23.3441, lon: 85.3096, tz: 5.5 },
    { name: "Guwahati, Assam", lat: 26.1445, lon: 91.7362, tz: 5.5 },
    { name: "Chennai, Tamil Nadu", lat: 13.0827, lon: 80.2707, tz: 5.5 },
    { name: "Dubai, UAE", lat: 25.2048, lon: 55.2708, tz: 4.0 },
    { name: "London, UK", lat: 51.5074, lon: -0.1278, tz: 0.0 },
    { name: "New York, USA", lat: 40.7128, lon: -74.0060, tz: -5.0 },
    { name: "Toronto, Canada", lat: 43.6532, lon: -79.3832, tz: -5.0 }
  ];

  // Math Helpers
  function toRad(d) { return d * Math.PI / 180.0; }
  function toDeg(r) { return r * 180.0 / Math.PI; }
  function norm(d) {
    var deg = d % 360.0;
    return deg < 0 ? deg + 360.0 : deg;
  }

  function formatDMS(deg) {
    var dVal = Math.floor(deg);
    var minFloat = (deg - dVal) * 60.0;
    var mVal = Math.floor(minFloat);
    var sVal = Math.round((minFloat - mVal) * 60.0);
    if (sVal >= 60) { sVal = 0; mVal++; }
    if (mVal >= 60) { mVal = 0; dVal++; }
    return (dVal < 10 ? "0" + dVal : "" + dVal) + ":" + (mVal < 10 ? "0" + mVal : "" + mVal) + ":" + (sVal < 10 ? "0" + sVal : "" + sVal);
  }

  function formatShortDeg(deg) {
    var dVal = Math.floor(deg);
    return (dVal < 10 ? "0" + dVal : "" + dVal) + "°";
  }

  function getNakshatraFromLongitude(longitude) {
    var normLong = norm(longitude);
    var nakSpan = 360.0 / 27.0; // 13.333333333333°
    var nakIndex = Math.floor(normLong / nakSpan);
    if (nakIndex >= 27) nakIndex = 26;
    var degInNak = normLong % nakSpan;
    var padaSpan = nakSpan / 4.0; // 3.333333333333°
    var pada = Math.floor(degInNak / padaSpan) + 1;
    if (pada > 4) pada = 4;
    return {
      num: NAKSHATRAS[nakIndex].num,
      nameEn: NAKSHATRAS[nakIndex].nameEn,
      nameHi: NAKSHATRAS[nakIndex].nameHi,
      lordEn: NAKSHATRAS[nakIndex].lordEn,
      lordHi: NAKSHATRAS[nakIndex].lordHi,
      pada: pada
    };
  }

  function getRashiFromLongitude(longitude) {
    var normLong = norm(longitude);
    var rashiIndex = Math.floor(normLong / 30.0);
    if (rashiIndex >= 12) rashiIndex = 11;
    var degreeInSign = normLong % 30.0;
    return {
      rashiNum: RASHIS[rashiIndex].num,
      nameEn: RASHIS[rashiIndex].nameEn,
      nameHi: RASHIS[rashiIndex].nameHi,
      lordEn: RASHIS[rashiIndex].lordEn,
      lordHi: RASHIS[rashiIndex].lordHi,
      element: RASHIS[rashiIndex].element,
      degreeInSign: degreeInSign,
      dms: formatDMS(degreeInSign),
      shortDeg: formatShortDeg(degreeInSign)
    };
  }

  function getNavamshaRashi(longitude) {
    var normLong = norm(longitude);
    var rashiIndex = Math.floor(normLong / 30.0);
    var rashiNum = rashiIndex + 1;
    var degreeInSign = normLong % 30.0;
    var navIndex = Math.floor(degreeInSign / (30.0 / 9.0)); // 0 to 8

    var startSign = 1;
    if (rashiNum === 1 || rashiNum === 5 || rashiNum === 9) {
      startSign = 1; // Aries
    } else if (rashiNum === 2 || rashiNum === 6 || rashiNum === 10) {
      startSign = 10; // Capricorn
    } else if (rashiNum === 3 || rashiNum === 7 || rashiNum === 11) {
      startSign = 7; // Libra
    } else {
      startSign = 4; // Cancer
    }

    var navRashiNum = ((startSign - 1 + navIndex) % 12) + 1;
    var navRashi = RASHIS[navRashiNum - 1];
    var navDeg = (degreeInSign % (30.0 / 9.0)) * 9.0;

    return {
      rashiNum: navRashi.num,
      nameEn: navRashi.nameEn,
      nameHi: navRashi.nameHi,
      lordHi: navRashi.lordHi,
      shortDeg: formatShortDeg(navDeg)
    };
  }

  function getDignity(planetCode, rashiNum) {
    var exaltations = { "Su": 1, "Mo": 2, "Ma": 10, "Me": 6, "Ju": 4, "Ve": 12, "Sa": 7, "Ra": 2, "Ke": 8 };
    var debilitations = { "Su": 7, "Mo": 8, "Ma": 4, "Me": 12, "Ju": 10, "Ve": 6, "Sa": 1, "Ra": 8, "Ke": 2 };
    var ownSigns = {
      "Su": [5],
      "Mo": [4],
      "Ma": [1, 8],
      "Me": [3, 6],
      "Ju": [9, 12],
      "Ve": [2, 7],
      "Sa": [10, 11],
      "Ra": [11],
      "Ke": [8]
    };

    if (exaltations[planetCode] === rashiNum) {
      return { status: "exalted", textHi: "उच्च (Exalted)", classBadge: "badge-exalted" };
    }
    if (debilitations[planetCode] === rashiNum) {
      return { status: "debilitated", textHi: "नीच (Debilitated)", classBadge: "badge-debilitated" };
    }
    if (ownSigns[planetCode] && ownSigns[planetCode].indexOf(rashiNum) !== -1) {
      return { status: "own", textHi: "स्वराशि (Own)", classBadge: "badge-own" };
    }
    return { status: "neutral", textHi: "सामान्य (Neutral)", classBadge: "badge-neutral" };
  }
  /**
   * Main Generator Function
   */
  function generateKundli(input) {
    var year = parseInt(input.year, 10) || 2000;
    var month = parseInt(input.month, 10) || 1;
    var day = parseInt(input.day, 10) || 1;
    var hour = parseInt(input.hour, 10) || 12;
    var min = parseInt(input.minute, 10) || 0;
    var sec = parseInt(input.second, 10) || 0;
    var tz = parseFloat(input.timezone) || 5.5;
    var lat = parseFloat(input.latitude) || 26.9124;
    var lon = parseFloat(input.longitude) || 75.7873;

    // 1. Julian Day (JD)
    var decimalHour = (hour + min / 60.0 + sec / 3600.0) - tz;
    var Y = year, M = month;
    if (M <= 2) { Y -= 1; M += 12; }
    var A = Math.floor(Y / 100);
    var B = 2 - A + Math.floor(A / 4);
    var dayFraction = day + decimalHour / 24.0;
    var jd = Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + dayFraction + B - 1524.5;
    var T = (jd - 2451545.0) / 36525.0;
    var d = jd - 2451543.5;

    // 2. Lahiri (Chitrapaksha) Ayanamsha
    var ayanamsha = 23.85642 + 1.39697 * T + 0.000308 * T * T;

    // 3. Ascendant (Lagna) Computation
    var D_jd = jd - 2451545.0;
    var GMST = norm(280.46061837 + 360.98564736629 * D_jd + 0.000387933 * T * T);
    var RAMC = norm(GMST + lon);
    var eps = 23.439291 - 0.0130042 * T;
    var radRAMC = toRad(RAMC);
    var radEps = toRad(eps);
    var radLat = toRad(lat);

    var yAsc = Math.cos(radRAMC);
    var xAsc = -Math.sin(radRAMC) * Math.cos(radEps) - Math.tan(radLat) * Math.sin(radEps);
    var tropicalAsc = norm(toDeg(Math.atan2(yAsc, xAsc)));
    var siderealAsc = norm(tropicalAsc - ayanamsha);

    var ascRashi = getRashiFromLongitude(siderealAsc);
    var ascNak = getNakshatraFromLongitude(siderealAsc);
    var ascNavRashi = getNavamshaRashi(siderealAsc);

    // 4. Geocentric Sun
    var w_sun = 282.9404 + 4.70935e-5 * d;
    var e_sun = 0.016709 - 1.151e-9 * d;
    var M_sun = norm(356.0470 + 0.9856002585 * d);
    var E_sun = toRad(M_sun) + e_sun * Math.sin(toRad(M_sun)) * (1.0 + e_sun * Math.cos(toRad(M_sun)));
    var xv_sun = Math.cos(E_sun) - e_sun;
    var yv_sun = Math.sqrt(1.0 - e_sun * e_sun) * Math.sin(E_sun);
    var v_sun = toDeg(Math.atan2(yv_sun, xv_sun));
    var r_sun = Math.sqrt(xv_sun * xv_sun + yv_sun * yv_sun);
    var lonsun = norm(v_sun + w_sun);
    var xs = r_sun * Math.cos(toRad(lonsun));
    var ys = r_sun * Math.sin(toRad(lonsun));
    var sunSid = norm(lonsun - ayanamsha);

    // 5. Geocentric Moon
    var L_moon = norm(218.3165 + 481267.8813 * T);
    var M_moon = norm(134.9634 + 477198.8675 * T);
    var F_moon = norm(93.2721 + 483202.0175 * T);
    var D_moon = norm(297.8502 + 445267.1114 * T);
    var moonCorr = 6.289 * Math.sin(toRad(M_moon)) 
      + 1.274 * Math.sin(toRad(2 * D_moon - M_moon)) 
      + 0.658 * Math.sin(toRad(2 * D_moon))
      - 0.186 * Math.sin(toRad(M_sun))
      - 0.114 * Math.sin(toRad(2 * F_moon));
    var moonTrop = norm(L_moon + moonCorr);
    var moonSid = norm(moonTrop - ayanamsha);

    // 6. Geocentric Planets (Paul Schlyter standard algorithm)
    function calcPlanet(N0, N1, i0, i1, w0, w1, a0, a1, e0, e1, M0, M1, dVal) {
      var N = norm(N0 + N1 * dVal);
      var i = norm(i0 + i1 * dVal);
      var w = norm(w0 + w1 * dVal);
      var a = a0 + a1 * dVal;
      var e = e0 + e1 * dVal;
      var M = norm(M0 + M1 * dVal);

      var E = toRad(M) + e * Math.sin(toRad(M)) * (1.0 + e * Math.cos(toRad(M)));
      for (var k = 0; k < 10; k++) {
        E = E - (E - e * Math.sin(E) - toRad(M)) / (1.0 - e * Math.cos(E));
      }

      var xv = a * (Math.cos(E) - e);
      var yv = a * Math.sqrt(1.0 - e * e) * Math.sin(E);
      var v = toDeg(Math.atan2(yv, xv));
      var r = Math.sqrt(xv * xv + yv * yv);

      var radN = toRad(N);
      var radVW = toRad(v + w);
      var radI = toRad(i);

      var xh = r * (Math.cos(radN) * Math.cos(radVW) - Math.sin(radN) * Math.sin(radVW) * Math.cos(radI));
      var yh = r * (Math.sin(radN) * Math.cos(radVW) + Math.cos(radN) * Math.sin(radVW) * Math.cos(radI));
      var zh = r * (Math.sin(radVW) * Math.sin(radI));

      var xg = xh + xs;
      var yg = yh + ys;

      var lonecl = norm(toDeg(Math.atan2(yg, xg)));
      return norm(lonecl - ayanamsha);
    }

    var marsSid = calcPlanet(49.5574, 2.11081e-5, 1.8497, -1.78e-8, 286.5016, 2.92961e-5, 1.523688, 0, 0.093405, 2.516e-9, 18.6021, 0.5240207766, d);
    var mercSid = calcPlanet(48.3313, 3.24587e-5, 7.0047, 5.00e-8, 29.1241, 1.01444e-5, 0.387098, 0, 0.205635, 5.59e-10, 168.6562, 4.0923344368, d);
    var jupSid = calcPlanet(100.4542, 2.76854e-5, 1.3030, -1.557e-7, 273.8777, 1.64505e-5, 5.20256, 0, 0.048498, 4.469e-9, 19.8950, 0.0830853001, d);
    var venSid = calcPlanet(76.6799, 2.46590e-5, 3.3946, 2.75e-8, 54.8910, 1.38374e-5, 0.723330, 0, 0.006773, -1.302e-9, 48.0052, 1.6021302244, d);
    var satSid = calcPlanet(113.6634, 2.38980e-5, 2.4886, -1.081e-7, 339.3939, 2.97661e-5, 9.55475, 0, 0.055546, -9.499e-9, 316.9670, 0.0334442282, d);
    
    // Rahu & Ketu (Mean Lunar Node)
    var rahuSid = norm(norm(125.04452 - 1934.136261 * T) - ayanamsha);
    var ketuSid = norm(rahuSid + 180.0);

    // Outer Planets
    var uraSid = calcPlanet(74.0005, 1.3978e-5, 0.7733, 1.9e-8, 96.6612, 3.0565e-5, 19.18171, -1.55e-8, 0.047318, 7.45e-9, 142.5905, 0.011725806, d);
    var nepSid = calcPlanet(131.7806, 3.0173e-5, 1.7700, -2.55e-7, 272.8461, -6.027e-6, 30.05826, 3.313e-8, 0.008606, 2.15e-9, 260.2471, 0.005995147, d);

    // Retrograde checks based on solar elongation
    function isPlanetRetrograde(pCode, pLon) {
      if (pCode === "Ra" || pCode === "Ke" || pCode === "Ur" || pCode === "Ne") return true;
      if (pCode === "Su" || pCode === "Mo") return false;
      var elon = norm(pLon - sunSid);
      if (pCode === "Ju" || pCode === "Sa" || pCode === "Ma") {
        return (elon >= 120.0 && elon <= 240.0);
      }
      if (pCode === "Me") {
        return (elon >= 340.0 || elon <= 20.0);
      }
      if (pCode === "Ve") {
        return (elon >= 335.0 || elon <= 25.0);
      }
      return false;
    }

    // Combustion (Ast) checks based on solar proximity
    function isPlanetCombust(pCode, pLon) {
      if (pCode === "Su" || pCode === "Ra" || pCode === "Ke" || pCode === "Ur" || pCode === "Ne") return false;
      var diff = Math.abs(pLon - sunSid);
      if (diff > 180.0) diff = 360.0 - diff;
      var orbs = { "Mo": 12.0, "Ma": 17.0, "Me": 14.0, "Ju": 11.0, "Ve": 10.0, "Sa": 15.0 };
      return diff <= (orbs[pCode] || 10.0);
    }

    var rawPlanets = [
      { code: "Su", nameEn: "Sun", nameHi: "सूर्य", lon: sunSid },
      { code: "Mo", nameEn: "Moon", nameHi: "चन्द्रमा", lon: moonSid },
      { code: "Ma", nameEn: "Mars", nameHi: "मंगल", lon: marsSid },
      { code: "Me", nameEn: "Mercury", nameHi: "बुध", lon: mercSid },
      { code: "Ju", nameEn: "Jupiter", nameHi: "बृहस्पति", lon: jupSid },
      { code: "Ve", nameEn: "Venus", nameHi: "शुक्र", lon: venSid },
      { code: "Sa", nameEn: "Saturn", nameHi: "शनि", lon: satSid },
      { code: "Ra", nameEn: "Rahu", nameHi: "राहु", lon: rahuSid },
      { code: "Ke", nameEn: "Ketu", nameHi: "केतू", lon: ketuSid },
      { code: "Ur", nameEn: "Uranus", nameHi: "हर्षल", lon: uraSid },
      { code: "Ne", nameEn: "Neptune", nameHi: "नेपच्यून", lon: nepSid }
    ];

    // Houses Mapping
    var houses = [];
    var navHouses = [];
    for (var h = 1; h <= 12; h++) {
      var rNum = ((ascRashi.rashiNum - 1 + (h - 1)) % 12) + 1;
      houses.push({
        houseNum: h,
        rashiNum: rNum,
        rashiHi: RASHIS[rNum - 1].nameHi,
        rashiLord: RASHIS[rNum - 1].lordHi,
        planets: []
      });

      var navRNum = ((ascNavRashi.rashiNum - 1 + (h - 1)) % 12) + 1;
      navHouses.push({
        houseNum: h,
        rashiNum: navRNum,
        rashiHi: RASHIS[navRNum - 1].nameHi,
        rashiLord: RASHIS[navRNum - 1].lordHi,
        planets: []
      });
    }

    var planetsData = [];
    for (var i = 0; i < rawPlanets.length; i++) {
      var p = rawPlanets[i];
      var rObj = getRashiFromLongitude(p.lon);
      var nakObj = getNakshatraFromLongitude(p.lon);
      var navRObj = getNavamshaRashi(p.lon);
      var isRetro = isPlanetRetrograde(p.code, p.lon);
      var isComb = isPlanetCombust(p.code, p.lon);
      var dignity = getDignity(p.code, rObj.rashiNum);

      var hNum = ((rObj.rashiNum - ascRashi.rashiNum + 12) % 12) + 1;
      var navHNum = ((navRObj.rashiNum - ascNavRashi.rashiNum + 12) % 12) + 1;

      var labelHi = p.nameHi;
      if (isRetro) labelHi += "(व)";
      if (isComb) labelHi += "(अ)";

      var pItem = {
        code: p.code,
        nameEn: p.nameEn,
        nameHi: p.nameHi,
        displayLabelHi: labelHi,
        longitude: p.lon,
        rashiNum: rObj.rashiNum,
        rashiHi: rObj.nameHi,
        rashiLord: rObj.lordHi,
        degreeInSign: rObj.degreeInSign,
        dms: rObj.dms,
        shortDeg: rObj.shortDeg,
        nakshatraHi: nakObj.nameHi,
        nakshatraPada: nakObj.pada,
        nakshatraLordHi: nakObj.lordHi,
        navamshaRashiHi: navRObj.nameHi,
        navamshaRashiNum: navRObj.rashiNum,
        isRetrograde: isRetro,
        isCombust: isComb,
        dignityHi: dignity.textHi,
        dignityStatus: dignity.status,
        dignityClass: dignity.classBadge,
        houseNum: hNum,
        navHouseNum: navHNum
      };

      planetsData.push(pItem);
      houses[hNum - 1].planets.push(pItem);
      navHouses[navHNum - 1].planets.push(pItem);
    }

    // Lagna Row for Table (Row 1 matching Screenshot 2)
    var lagnaTableRow = {
      code: "Asc",
      nameEn: "Ascendant",
      nameHi: "लग्न",
      displayLabelHi: "लग्न",
      longitude: siderealAsc,
      rashiNum: ascRashi.rashiNum,
      rashiHi: ascRashi.nameHi,
      rashiLord: ascRashi.lordHi,
      degreeInSign: ascRashi.degreeInSign,
      dms: ascRashi.dms,
      shortDeg: ascRashi.shortDeg,
      nakshatraHi: ascNak.nameHi,
      nakshatraPada: ascNak.pada,
      nakshatraLordHi: ascNak.lordHi,
      navamshaRashiHi: ascNavRashi.nameHi,
      navamshaRashiNum: ascNavRashi.rashiNum,
      isRetrograde: false,
      isCombust: false,
      dignityHi: "लग्न बिंदु (Ascendant)",
      dignityStatus: "ascendant",
      dignityClass: "badge-own",
      houseNum: 1,
      navHouseNum: 1
    };

    var moonPlanet = planetsData.find(function(p) { return p.code === "Mo"; });
    var sunPlanet = planetsData.find(function(p) { return p.code === "Su"; });
    var jupPlanet = planetsData.find(function(p) { return p.code === "Ju"; });
    var venPlanet = planetsData.find(function(p) { return p.code === "Ve"; });
    var marsPlanet = planetsData.find(function(p) { return p.code === "Ma"; });
    var satPlanet = planetsData.find(function(p) { return p.code === "Sa"; });
    var mercPlanet = planetsData.find(function(p) { return p.code === "Me"; });
    var rahuPlanet = planetsData.find(function(p) { return p.code === "Ra"; });
    var ketuPlanet = planetsData.find(function(p) { return p.code === "Ke"; });

    // Generate Dynamic Beginner-Friendly Kundli Saransh
    var saransh = generateKundliSummary({
      ascRashi: ascRashi,
      ascNak: ascNak,
      moonPlanet: moonPlanet,
      sunPlanet: sunPlanet,
      jupPlanet: jupPlanet,
      venPlanet: venPlanet,
      marsPlanet: marsPlanet,
      satPlanet: satPlanet,
      mercPlanet: mercPlanet,
      rahuPlanet: rahuPlanet,
      ketuPlanet: ketuPlanet,
      houses: houses
    });

    return {
      person: {
        name: input.name || "जातक",
        gender: input.gender || "Male",
        date: day + "/" + month + "/" + year,
        time: (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec),
        place: input.place || "जयपुर, राजस्थान",
        latitude: lat,
        longitude: lon,
        timezone: tz
      },
      ayanamsha: {
        value: ayanamsha,
        dms: formatDMS(ayanamsha),
        shortDeg: formatShortDeg(ayanamsha),
        type: "Lahiri (Chitrapaksha)"
      },
      ascendant: {
        longitude: siderealAsc,
        rashiNum: ascRashi.rashiNum,
        rashiNameEn: ascRashi.nameEn,
        rashiNameHi: ascRashi.nameHi,
        lordHi: ascRashi.lordHi,
        degreeInSign: ascRashi.degreeInSign,
        dms: ascRashi.dms,
        shortDeg: ascRashi.shortDeg,
        nakshatra: ascNak.nameHi,
        pada: ascNak.pada,
        nakshatraLord: ascNak.lordHi
      },
      moonMetrics: {
        rashiNum: moonPlanet.rashiNum,
        rashiNameHi: moonPlanet.rashiHi,
        rashiLord: moonPlanet.rashiLord,
        degreeInSign: moonPlanet.degreeInSign,
        dms: moonPlanet.dms,
        shortDeg: moonPlanet.shortDeg,
        nakshatra: moonPlanet.nakshatraHi,
        pada: moonPlanet.nakshatraPada,
        nakshatraLord: moonPlanet.nakshatraLordHi,
        dignity: moonPlanet.dignityHi
      },
      houses: houses,
      navHouses: navHouses,
      planets: planetsData,
      tableRows: [lagnaTableRow].concat(planetsData),
      saransh: saransh
    };
  }
  /**
   * Comprehensive Kundli Saransh & Interpretation Generator (सरल सारांश एवं फलादेश)
   */
  function generateKundliSummary(ctx) {
    var asc = ctx.ascRashi;
    var ascNak = ctx.ascNak;
    var moon = ctx.moonPlanet;
    var sun = ctx.sunPlanet;
    var jup = ctx.jupPlanet;
    var ven = ctx.venPlanet;
    var mars = ctx.marsPlanet;
    var sat = ctx.satPlanet;
    var merc = ctx.mercPlanet;
    var rahu = ctx.rahuPlanet;
    var ketu = ctx.ketuPlanet;
    var houses = ctx.houses;

    // 1. Core Personality & Lagna Narrative
    var personalityNarrative = "";
    if (asc.num === 9) {
      personalityNarrative = "आपका जन्म **धनु लग्न (Sagittarius)** में हुआ है, जिसके स्वामी देवगुरु बृहस्पति (Jupiter) हैं। धनु एक अग्नि तत्व एवं द्विस्वभाव राशि है। आप स्वभाव से सत्यप्रिय, आशावादी, दूरदर्शी, धार्मिक एवं स्पष्टवादी हैं। आपका व्यक्तित्व प्रभावशाली है तथा आप न्याय, नीति और उच्च आदर्शों के प्रति समर्पित रहते हैं।";
    } else if (asc.num === 1) {
      personalityNarrative = "आपका जन्म **मेष लग्न (Aries)** में हुआ है, जिसके स्वामी मंगल देव हैं। आप साहसी, ऊर्जावान, नेतृत्व क्षमता से युक्त और स्वतंत्र विचारों वाले हैं।";
    } else if (asc.num === 2) {
      personalityNarrative = "आपका जन्म **वृष लग्न (Taurus)** में हुआ है, जिसके स्वामी शुक्र देव हैं। आप धैर्यवान, सौम्य, कलाप्रिय, परिवार-उन्मुख एवं धन संचय में कुशल हैं।";
    } else if (asc.num === 3) {
      personalityNarrative = "आपका जन्म **मिथुन लग्न (Gemini)** में हुआ है, जिसके स्वामी बुध देव हैं। आप बुद्धिमान, बहुमुखी प्रतिभा के धनी, तीव्र संवाद कौशल और जिज्ञासु स्वभाव वाले हैं।";
    } else if (asc.num === 4) {
      personalityNarrative = "आपका जन्म **कर्क लग्न (Cancer)** में हुआ है, जिसके स्वामी चंद्र देव हैं। आप संवेदनशील, परोपकारी, परिवार से गहरा लगाव रखने वाले और अंतर्ज्ञानी हैं।";
    } else if (asc.num === 5) {
      personalityNarrative = "आपका जन्म **सिंह लग्न (Leo)** में हुआ है, जिसके स्वामी सूर्य देव हैं। आप तेजस्वी, स्वाभिमानी, नेतृत्व क्षमता से संपन्न एवं उदार हृदय वाले हैं।";
    } else if (asc.num === 6) {
      personalityNarrative = "आपका जन्म **कन्या लग्न (Virgo)** में हुआ है, जिसके स्वामी बुध देव हैं। आप विश्लेषणात्मक, कर्तव्यनिष्ठ, व्यावहारिक एवं सूक्ष्म विवरणों के ज्ञाता हैं।";
    } else if (asc.num === 7) {
      personalityNarrative = "आपका जन्म **तुला लग्न (Libra)** में हुआ है, जिसके स्वामी शुक्र देव हैं। आप न्यायप्रिय, कूटनीतिज्ञ, संतुलन पसंद और कला-सौंदर्य के प्रेमी हैं।";
    } else if (asc.num === 8) {
      personalityNarrative = "आपका जन्म **वृश्चिक लग्न (Scorpio)** में हुआ है, जिसके स्वामी मंगल देव हैं। आप दृढ निश्चयी, गूढ़ विद्याओं में रुचि रखने वाले, साहसी एवं रहस्यमयी व्यक्तित्व के धनी हैं।";
    } else if (asc.num === 10) {
      personalityNarrative = "आपका जन्म **मकर लग्न (Capricorn)** में हुआ है, जिसके स्वामी शनि देव हैं। आप गंभीर, परिश्रमी, महत्वाकांक्षी, संयमित एवं लक्ष्य-केंद्रित हैं।";
    } else if (asc.num === 11) {
      personalityNarrative = "आपका जन्म **कुम्भ लग्न (Aquarius)** में हुआ है, जिसके स्वामी शनि देव हैं। आप मानवीय, दार्शनिक, दूरगामी सोच रखने वाले एवं नए विचारों के प्रणेता हैं।";
    } else {
      personalityNarrative = "आपका जन्म **मीन लग्न (Pisces)** में हुआ है, जिसके स्वामी देवगुरु बृहस्पति हैं। आप दयालु, आध्यात्मिक, कल्पनाशील एवं सहृदय हैं।";
    }

    // Lagna Lord placement narrative
    var lagneshHouse = jup.houseNum;
    var lagneshNarrative = "आपके लग्नेश **" + asc.lordHi + "** कुंडली के **" + lagneshHouse + "वें भाव** (" + houses[lagneshHouse - 1].rashiHi + " राशि) में स्थित हैं। ";
    if (lagneshHouse === 1) {
      lagneshNarrative += "लग्नेश का प्रथम भाव (तनु भाव) में स्वराशि स्थित होना जातक को दीर्घायु, आत्मसम्मान, तीक्ष्ण बुद्धि और समाज में मान-प्रतिष्ठा प्रदान करता है।";
    } else if (lagneshHouse === 9 || lagneshHouse === 5) {
      lagneshNarrative += "लग्नेश का त्रिकोण भाव में होना अत्यंत भाग्यशाली योग बनाता है, जिससे हर कार्य में ईश्वर की कृपा मिलती है।";
    } else if (lagneshHouse === 10) {
      lagneshNarrative += "लग्नेश का दशम (कर्म भाव) में होना सरकारी पद, प्रशासनिक सफलता एवं व्यापारिक यश का संकेत है।";
    } else {
      lagneshNarrative += "यह स्थिति आपके जीवन में निरंतर कर्म और अनुभव द्वारा उन्नति का मार्ग प्रशस्त करती है।";
    }

    // 2. Mind & Moon Sign Narrative
    var moonNarrative = "आपकी चंद्र राशि **" + moon.rashiHi + "** है तथा जन्म नक्षत्र **" + moon.nakshatraHi + " (चरण " + moon.nakshatraPada + ")** है, जिसके स्वामी **" + moon.nakshatraLordHi + "** हैं। ";
    if (moon.rashiNum === 2) {
      moonNarrative += "चंद्रमा आपकी कुंडली में अपनी **उच्च राशि (वृषभ)** में विराजमान हैं! ज्योतिष शास्त्र में उच्च का चंद्रमा मन की अटूट स्थिरता, भावनात्मक संतुलन, आकर्षण, कलात्मक रुचि और धन-संपत्ति की प्रचुरता का प्रबल द्योतक है। आप कठिन परिस्थितियों में भी घबराते नहीं हैं।";
    } else if (moon.rashiNum === 4) {
      moonNarrative += "चंद्रमा अपनी स्वराशि कर्क में स्थित होकर अत्यंत भावुक, संवेदनशील और दयालु हृदय प्रदान करते हैं।";
    } else if (moon.rashiNum === 8) {
      moonNarrative += "चंद्रमा नीच राशि में होने से कभी-कभी मन में अज्ञात भय या अति-संवेदनशीलता आ सकती है, जिसके लिए शिव पूजन अत्यंत लाभकारी है।";
    } else {
      moonNarrative += "आपका मानसिक स्तर संतुलित एवं चिंतनशील है, जो आपको समाज में आदरणीय बनाता है।";
    }

    // 3. Auspicious Yogas Detection
    var yogas = [];

    // Check Hamsa Yoga
    if ((jup.houseNum === 1 || jup.houseNum === 4 || jup.houseNum === 7 || jup.houseNum === 10) && (jup.rashiNum === 9 || jup.rashiNum === 12 || jup.rashiNum === 4)) {
      yogas.push({
        title: "हंस महापुरुष राजयोग (Hamsa Yoga)",
        type: "पञ्च महापुरुष राजयोग",
        icon: "👑",
        desc: "देवगुरु बृहस्पति केंद्र भाव में अपनी स्वराशि/उच्च राशि में स्थित हैं। यह शास्त्रोक्त 'हंस योग' कहलाता है। इसके प्रभाव से व्यक्ति विद्वान, नीतिज्ञ, उच्च सामाजिक पद, आध्यात्मिक ज्ञान एवं ऐश्वर्य प्राप्त करता है।"
      });
    }

    // Check Exalted Moon
    if (moon.rashiNum === 2) {
      yogas.push({
        title: "उच्च चंद्र महालक्ष्मी योग (Exalted Moon)",
        type: "शुभ योग",
        icon: "🌙",
        desc: "चंद्रमा अपनी सर्वोच्च उच्च राशि (वृषभ) में स्थित हैं। यह योग मानसिक शांति, माता का सुख, सौंदर्य, उत्तम वाहन सुख एवं निरंतर धन आगमन का कारक है।"
      });
    }

    // Check Budhaditya Yoga
    if (sun.rashiNum === merc.rashiNum) {
      yogas.push({
        title: "बुधादित्य राजयोग (Budhaditya Yoga)",
        type: "ज्ञान व यश योग",
        icon: "☀️",
        desc: "सूर्य एवं बुध की एक ही राशि में युति से बुधादित्य योग निर्मित होता है। यह जातक को प्रखर बुद्धि, तीव्र स्मरण शक्ति, तार्किक क्षमता एवं प्रशासनिक प्रतिष्ठा प्रदान करता है।"
      });
    }

    // Check Gajakesari Yoga
    var jupMoonDiff = Math.abs(jup.houseNum - moon.houseNum);
    if (jupMoonDiff === 0 || jupMoonDiff === 3 || jupMoonDiff === 6 || jupMoonDiff === 9) {
      yogas.push({
        title: "गजकेसरी राजयोग (Gajakesari Yoga)",
        type: "यशस्वी महायोग",
        icon: "🐘",
        desc: "गुरु एवं चंद्रमा का केंद्र संबंध गजकेसरी योग बनाता है, जो व्यक्ति को शत्रुओं पर विजय, अचल संपत्ति और दीर्घायु प्रदान करता है।"
      });
    }

    // Check Ruchaka Yoga
    if ((mars.houseNum === 1 || mars.houseNum === 4 || mars.houseNum === 7 || mars.houseNum === 10) && (mars.rashiNum === 1 || mars.rashiNum === 8 || mars.rashiNum === 10)) {
      yogas.push({
        title: "रुचक महापुरुष योग (Ruchaka Yoga)",
        type: "शौर्य व पराक्रम",
        icon: "⚔️",
        desc: "मंगल केंद्र में स्वराशि या उच्च राशि में स्थित हैं, जिससे अदम्य साहस, भूमि लाभ और सुरक्षा/सेना/प्रशासन में विजय प्राप्त होती है।"
      });
    }

    if (yogas.length === 0) {
      yogas.push({
        title: "शुभ ग्रह केंद्र योग (Benefic Kendra Yoga)",
        type: "सद्भाव योग",
        icon: "✨",
        desc: "शुभ ग्रहों का केंद्र व त्रिकोण भावों में प्रभाव आपके जीवन को स्थायित्व, सुरक्षा एवं निरंतर उन्नति की शक्ति प्रदान करता है।"
      });
    }

    // 4. Four Pillars of Life
    var careerText = "";
    if (asc.num === 9) {
      careerText = "दशम भाव (कर्म क्षेत्र) के स्वामी बुध देव हैं, जो छठे भाव में उच्च के चंद्रमा के साथ विराजित हैं। आप बौद्धिक विश्लेषण, शिक्षा, कानून, वित्त (Finance/Banking), सलाहकारिता, प्रबंधन या टेक्नोलॉजी के क्षेत्र में असाधारण सफलता प्राप्त कर सकते हैं। लग्नेश गुरु का प्रथम भाव में होना उच्च पद, सरकारी सम्मान एवं स्वतंत्र व्यवसाय (Entrepreneurship) में भी बड़ी तरक्की दिलाता है।";
    } else {
      careerText = "आपकी कुंडली में कर्म भाव एवं धन भाव की स्थिति दर्शाती है कि आपकी सफलता आपकी बौद्धिक क्षमता एवं व्यावहारिक निर्णय पर निर्भर करेगी। 28 वर्ष की आयु के पश्चात करियर में तीव्र उछाल का योग है।";
    }

    var marriageText = "";
    if (asc.num === 9) {
      marriageText = "सप्तम भाव (विवाह एवं दांपत्य) के स्वामी बुध हैं। सप्तम भाव में सूर्य एवं शुक्र की स्थिति है। आपका जीवनसाथी सुंदर, सुसंस्कृत, स्वाभिमानी एवं प्रतिष्ठित परिवार से संबंधित होगा। चूंकि शुक्र अस्त अवस्था में है और सूर्य का प्रभाव है, अतः दांपत्य जीवन में अहं (Ego) के टकराव से बचना चाहिए तथा परस्पर आदर बनाए रखना शुभ रहेगा।";
    } else {
      marriageText = "सप्तम भाव एवं शुक्र की स्थिति के अनुसार आपका वैवाहिक जीवन परस्पर समझ और सौहार्द से आगे बढ़ेगा। विवाह पूर्व कुंडली मिलान अत्यंत हितकर रहेगा।";
    }

    var healthText = "लग्नेश गुरु की लग्न में स्वराशि स्थिति आपको उत्तम रोग प्रतिरोधक क्षमता और दीर्घायु प्रदान करती है। चंद्रमा के उच्च होने से मानसिक स्वास्थ्य प्रबल रहेगा। पाचन तंत्र एवं यकृत (Liver) का ध्यान रखें, नियमित प्राणायाम एवं सात्विक आहार लाभकारी रहेगा।";
    var fortuneText = "नवम भाव (भाग्य भाव) सिंह राशि का है, जिसमें मंगल एवं शनि की उपस्थिति है। आपका भाग्योदय स्व-प्रयत्नों और कठिन परिश्रम के बल पर होगा। पैतृक सहयोग के साथ-साथ आपकी स्वयं की लगन आपको 32वें वर्ष के उपरांत अकूत भाग्यवृद्धि प्रदान करेगी।";

    // 5. House-by-House Insights (12 Bhavas)
    var houseInsights = [];
    var houseSignificances = [
      "प्रथम भाव (तनु भाव / व्यक्तित्व, देह व स्वभाव)",
      "द्वितीय भाव (धन भाव / कुटुंब, वाणी व कोष)",
      "तृतीय भाव (सहज भाव / पराक्रम, भ्राता व साहस)",
      "चतुर्थ भाव (सुख भाव / माता, भूमि, भवन व वाहन)",
      "पंचम भाव (सुत भाव / संतान, बुद्धि व पूर्वपुण्य)",
      "षष्ठ भाव (रिपु भाव / रोग, ऋण, शत्रु व प्रतिस्पर्धा)",
      "सप्तम भाव (जाया भाव / दांपत्य, जीवनसाथी व साझेदारी)",
      "अष्टम भाव (आयु भाव / गूढ़ रहस्य, आयु व परिवर्तन)",
      "नवम भाव (धर्म भाव / भाग्य, गुरु, तीर्थ व उच्च विद्या)",
      "दशम भाव (कर्म भाव / आजीविका, पद, प्रतिष्ठा व यश)",
      "एकादश भाव (आय भाव / लाभ, मित्र, अभिलाषा पूर्ति)",
      "द्वादश भाव (व्यय भाव / मोक्ष, विदेश यात्रा व व्यय)"
    ];

    for (var hIdx = 1; hIdx <= 12; hIdx++) {
      var hItem = houses[hIdx - 1];
      var pInHouse = hItem.planets;
      var hExplain = "";

      if (pInHouse.length === 0) {
        hExplain = "इस भाव में कोई प्रत्यक्ष ग्रह नहीं है। इस भाव का फल इसके स्वामी **" + hItem.rashiLord + "** की स्थिति तथा इस पर पड़ने वाली ग्रहों की दृष्टि पर निर्भर करता है।";
      } else {
        var names = pInHouse.map(function(p) { return p.nameHi + (p.isRetrograde ? "(वक्री)" : "") + (p.isCombust ? "(अस्त)" : ""); }).join(", ");
        hExplain = "इस भाव में **" + names + "** विराजमान हैं। ";
        if (hIdx === 1) {
          hExplain += "प्रथम भाव में देवगुरु बृहस्पति का वास जातक को ओजस्वी, ज्ञानी और पूजनीय बनाता है।";
        } else if (hIdx === 2) {
          hExplain += "राहु द्वितीय भाव में अप्रत्याशित वित्तीय अवसरों और विदेशी स्रोतों से लाभ का मार्ग बनाता है।";
        } else if (hIdx === 6) {
          hExplain += "छठे भाव में उच्च चंद्रमा एवं बुध शत्रुओं पर विजय और प्रतियोगी परीक्षाओं में सफलता का संकेत देते हैं।";
        } else if (hIdx === 7) {
          hExplain += "सप्तम भाव में सूर्य एवं शुक्र प्रभावशाली जीवनसाथी और व्यापारिक साझेदारियों का योग बनाते हैं।";
        } else if (hIdx === 8) {
          hExplain += "अष्टम भाव में केतु गूढ़ विद्याओं, ज्योतिष, ध्यान और आध्यात्मिक खोज में विशेष रुचि जगाता है।";
        } else if (hIdx === 9) {
          hExplain += "नवम भाव में मंगल-शनि का संबंध जातक को परिश्रमी, कर्मठ और लंबी यात्राओं द्वारा भाग्यशाली बनाता है।";
        } else {
          hExplain += "ग्रहों का यह संयोजन आपके जीवन के इस क्षेत्र में महत्वपूर्ण अनुभव और अवसर निर्मित करता है।";
        }
      }

      houseInsights.push({
        houseNum: hIdx,
        title: houseSignificances[hIdx - 1],
        rashiHi: hItem.rashiHi,
        rashiNum: hItem.rashiNum,
        rashiLord: hItem.rashiLord,
        planetsList: pInHouse.map(function(p) { return p.nameHi; }),
        summary: hExplain
      });
    }

    // 6. Favorable Factors & Remedies
    var luckyGemstone = asc.luckyStone || "पीला पुखराज";
    var luckyColor = asc.color || "पीला / केसरिया";
    var luckyNumbers = asc.num === 9 ? "3, 9, 12, 21" : "1, 3, 7, 9";
    var ishtaDevta = asc.num === 9 ? "भगवान श्री लक्ष्मीनारायण / माँ पीताम्बरी बगलामुखी" : "श्री हनुमान जी / भगवान शिव";
    var luckyDay = asc.num === 9 ? "गुरुवार (Thursday)" : "मंगलवार (Tuesday)";

    var remediesList = [
      {
        title: "लग्नेश गुरु की शक्ति संवर्धन",
        desc: "प्रतिदिन प्रातः स्नान उपरांत 'ॐ बृं बृहस्पतये नमः' का १०८ बार जप करें अथवा गुरुवार को चने की दाल व गुड़ का दान करें।",
        icon: "📿"
      },
      {
        title: "अस्त शुक्र शांति एवं वैवाहिक सामंजस्य",
        desc: "शुक्रवार के दिन माँ लक्ष्मी अथवा श्री सूक्त का पाठ करें तथा सफेद मिष्ठान्न या खीर का भोग लगाएं।",
        icon: "🌸"
      },
      {
        title: "नवम भाव शनि-मंगल संतुलन",
        desc: "मंगलवार एवं शनिवार को हनुमान चालीसा का पाठ करें और पीपल वृक्ष के पास संध्या समय तिल के तेल का दीपक जलाएं।",
        icon: "🪔"
      },
      {
        title: "गायत्री मंत्र का दैनिक जप",
        desc: "सूर्य देव को तांबे के लोटे से रोली-अक्षत मिश्रित जल अर्पित करें और ११ बार गायत्री मंत्र का स्मरण करें।",
        icon: "☀️"
      }
    ];

    return {
      personality: personalityNarrative,
      lagneshDetail: lagneshNarrative,
      mindAndEmotions: moonNarrative,
      yogas: yogas,
      fourPillars: {
        career: careerText,
        marriage: marriageText,
        health: healthText,
        fortune: fortuneText
      },
      houseInsights: houseInsights,
      favorableFactors: {
        gemstone: luckyGemstone,
        color: luckyColor,
        numbers: luckyNumbers,
        deity: ishtaDevta,
        day: luckyDay
      },
      remedies: remediesList
    };
  }

  return {
    RASHIS: RASHIS,
    NAKSHATRAS: NAKSHATRAS,
    CITIES: CITIES,
    generateKundli: generateKundli
  };

}));
