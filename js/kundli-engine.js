/**
 * DIVYA DRISHTI — Vedic Kundli & Astronomical Calculation Engine
 * Chitrapaksha / Lahiri Ayanamsha North Indian Lagna & Navamsha Chart Generator
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
  const RASHIS = [
    { num: 1, nameEn: "Aries", nameHi: "मेष", lordEn: "Mars", lordHi: "मंगल", element: "अग्नि" },
    { num: 2, nameEn: "Taurus", nameHi: "वृषभ", lordEn: "Venus", lordHi: "शुक्र", element: "पृथ्वी" },
    { num: 3, nameEn: "Gemini", nameHi: "मिथुन", lordEn: "Mercury", lordHi: "बुध", element: "वायु" },
    { num: 4, nameEn: "Cancer", nameHi: "कर्क", lordEn: "Moon", lordHi: "चंद्रमा", element: "जल" },
    { num: 5, nameEn: "Leo", nameHi: "सिंह", lordEn: "Sun", lordHi: "सूर्य", element: "अग्नि" },
    { num: 6, nameEn: "Virgo", nameHi: "कन्या", lordEn: "Mercury", lordHi: "बुध", element: "पृथ्वी" },
    { num: 7, nameEn: "Libra", nameHi: "तुला", lordEn: "Venus", lordHi: "शुक्र", element: "वायु" },
    { num: 8, nameEn: "Scorpio", nameHi: "वृश्चिक", lordEn: "Mars", lordHi: "मंगल", element: "जल" },
    { num: 9, nameEn: "Sagittarius", nameHi: "धनु", lordEn: "Jupiter", lordHi: "बृहस्पति", element: "अग्नि" },
    { num: 10, nameEn: "Capricorn", nameHi: "मकर", lordEn: "Saturn", lordHi: "शनि", element: "पृथ्वी" },
    { num: 11, nameEn: "Aquarius", nameHi: "कुंभ", lordEn: "Saturn", lordHi: "शनि", element: "वायु" },
    { num: 12, nameEn: "Pisces", nameHi: "मीन", lordEn: "Jupiter", lordHi: "बृहस्पति", element: "जल" }
  ];

  // 27 Nakshatras
  const NAKSHATRAS = [
    { num: 1, nameEn: "Ashwini", nameHi: "अश्विनी", lordEn: "Ketu", lordHi: "केतु" },
    { num: 2, nameEn: "Bharani", nameHi: "भरणी", lordEn: "Venus", lordHi: "शुक्र" },
    { num: 3, nameEn: "Krittika", nameHi: "कृत्तिका", lordEn: "Sun", lordHi: "सूर्य" },
    { num: 4, nameEn: "Rohini", nameHi: "रोहिणी", lordEn: "Moon", lordHi: "चंद्रमा" },
    { num: 5, nameEn: "Mrigashira", nameHi: "मृगशिरा", lordEn: "Mars", lordHi: "मंगल" },
    { num: 6, nameEn: "Ardra", nameHi: "आर्द्रा", lordEn: "Rahu", lordHi: "राहु" },
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
    { num: 19, nameEn: "Moola", nameHi: "मूल", lordEn: "Ketu", lordHi: "केतु" },
    { num: 20, nameEn: "Purva Ashadha", nameHi: "पूर्वाषाढ़ा", lordEn: "Venus", lordHi: "शुक्र" },
    { num: 21, nameEn: "Uttara Ashadha", nameHi: "उत्तराषाढ़ा", lordEn: "Sun", lordHi: "सूर्य" },
    { num: 22, nameEn: "Shravana", nameHi: "श्रवण", lordEn: "Moon", lordHi: "चंद्रमा" },
    { num: 23, nameEn: "Dhanishtha", nameHi: "धनिष्ठा", lordEn: "Mars", lordHi: "मंगल" },
    { num: 24, nameEn: "Shatabhisha", nameHi: "शतभिषा", lordEn: "Rahu", lordHi: "राहु" },
    { num: 25, nameEn: "Purva Bhadrapada", nameHi: "पूर्वभाद्रपद", lordEn: "Jupiter", lordHi: "बृहस्पति" },
    { num: 26, nameEn: "Uttara Bhadrapada", nameHi: "उत्तरभाद्रपद", lordEn: "Saturn", lordHi: "शनि" },
    { num: 27, nameEn: "Revati", nameHi: "रेवती", lordEn: "Mercury", lordHi: "बुध" }
  ];

  // Combustion Orbs (Degrees from Sun)
  const COMBUSTION_ORBS = {
    "Moon": 12.0,
    "Mars": 17.0,
    "Mercury": 14.0,
    "Jupiter": 11.0,
    "Venus": 10.0,
    "Saturn": 15.0
  };

  // Pre-configured City Database (Latitude, Longitude, Default Timezone)
  const CITIES = [
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
    { name: "San Francisco, USA", lat: 37.7749, lon: -122.4194, tz: -8.0 },
    { name: "Toronto, Canada", lat: 43.6532, lon: -79.3832, tz: -5.0 },
    { name: "Sydney, Australia", lat: -33.8688, lon: 151.2093, tz: 10.0 }
  ];

  // Helper Math Functions
  const toRad = deg => deg * Math.PI / 180.0;
  const toDeg = rad => rad * 180.0 / Math.PI;
  const normalizeDeg = deg => {
    deg = deg % 360;
    return deg < 0 ? deg + 360 : deg;
  };

  /**
   * Convert Gregorian Date and Universal Time to Julian Day (JD)
   */
  function getJulianDay(year, month, day, hour, min, sec, tz) {
    let decimalHour = (hour + min / 60.0 + sec / 3600.0) - tz;
    let Y = year;
    let M = month;
    if (M <= 2) {
      Y -= 1;
      M += 12;
    }
    const A = Math.floor(Y / 100);
    const B = 2 - A + Math.floor(A / 4);
    const dayFraction = day + decimalHour / 24.0;
    const JD = Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + dayFraction + B - 1524.5;
    return JD;
  }

  /**
   * Compute Lahiri (Chitrapaksha) Ayanamsha for a given Julian Day
   * Standard Vedic value approx 23.85° at year 2000, progressing ~50.29 arcsec/year
   */
  function getLahiriAyanamsha(jd) {
    const T = (jd - 2451545.0) / 36525.0; // Centuries since J2000
    // Lahiri Ayanamsha formula
    const ayan = 23.85642 + 1.39697 * T + 0.000308 * T * T;
    return ayan;
  }

  /**
   * Approximate Mean & True Longitudes of Planets (Meeus algorithm adapted for Vedic chart)
   */
  function getPlanetLongitudes(jd, ayanamsha) {
    const T = (jd - 2451545.0) / 36525.0;
    const D = jd - 2451545.0;

    // 1. Sun (Surya)
    const L0 = normalizeDeg(280.46646 + 36000.76983 * T);
    const M_sun = normalizeDeg(357.52911 + 35999.05029 * T);
    const C_sun = (1.914602 - 0.004817 * T) * Math.sin(toRad(M_sun)) + (0.019993 - 0.000101 * T) * Math.sin(toRad(2 * M_sun));
    const sunTropical = normalizeDeg(L0 + C_sun);
    const sunSidereal = normalizeDeg(sunTropical - ayanamsha);

    // 2. Moon (Chandra)
    const L_moon = normalizeDeg(218.3165 + 481267.8813 * T);
    const M_moon = normalizeDeg(134.9634 + 477198.8675 * T);
    const F_moon = normalizeDeg(93.2721 + 483202.0175 * T);
    const D_moon = normalizeDeg(297.8502 + 445267.1114 * T);
    // Major Lunar Inequalities
    const moonCorrection = 6.289 * Math.sin(toRad(M_moon)) 
      + 1.274 * Math.sin(toRad(2 * D_moon - M_moon)) 
      + 0.658 * Math.sin(toRad(2 * D_moon))
      - 0.186 * Math.sin(toRad(M_sun))
      - 0.114 * Math.sin(toRad(2 * F_moon));
    const moonTropical = normalizeDeg(L_moon + moonCorrection);
    const moonSidereal = normalizeDeg(moonTropical - ayanamsha);

    // 3. Rahu & Ketu (Mean Lunar Node, always retrograde in Vedic)
    const omega = normalizeDeg(125.04452 - 1934.136261 * T);
    const rahuSidereal = normalizeDeg(omega - ayanamsha);
    const ketuSidereal = normalizeDeg(rahuSidereal + 180.0);

    // 4. Mars (Mangal)
    const M_mars = normalizeDeg(19.373 + 19140.299 * T);
    const L_mars = normalizeDeg(355.433 + 19141.696 * T + 10.69 * Math.sin(toRad(M_mars)));
    const marsSidereal = normalizeDeg(L_mars - ayanamsha);

    // 5. Mercury (Budh)
    const M_merc = normalizeDeg(174.794 + 149472.516 * T);
    const L_merc = normalizeDeg(252.251 + 149474.072 * T + 6.34 * Math.sin(toRad(M_merc)));
    // Heliocentric to geocentric elongation approximation
    const dSunMerc = normalizeDeg(L_merc - sunTropical);
    const mercGeocentric = normalizeDeg(sunTropical + 23.0 * Math.sin(toRad(dSunMerc)));
    const mercSidereal = normalizeDeg(mercGeocentric - ayanamsha);

    // 6. Jupiter (Guru)
    const M_jup = normalizeDeg(20.020 + 3034.906 * T);
    const L_jup = normalizeDeg(34.351 + 3036.303 * T + 5.55 * Math.sin(toRad(M_jup)));
    const jupSidereal = normalizeDeg(L_jup - ayanamsha);

    // 7. Venus (Shukra)
    const M_ven = normalizeDeg(50.416 + 58517.815 * T);
    const L_ven = normalizeDeg(181.979 + 58519.213 * T + 0.78 * Math.sin(toRad(M_ven)));
    const dSunVen = normalizeDeg(L_ven - sunTropical);
    const venGeocentric = normalizeDeg(sunTropical + 46.0 * Math.sin(toRad(dSunVen)));
    const venSidereal = normalizeDeg(venGeocentric - ayanamsha);

    // 8. Saturn (Shani)
    const M_sat = normalizeDeg(317.020 + 1222.114 * T);
    const L_sat = normalizeDeg(50.077 + 1223.511 * T + 6.36 * Math.sin(toRad(M_sat)));
    const satSidereal = normalizeDeg(L_sat - ayanamsha);

    return {
      Sun: sunSidereal,
      Moon: moonSidereal,
      Mars: marsSidereal,
      Mercury: mercSidereal,
      Jupiter: jupSidereal,
      Venus: venSidereal,
      Saturn: satSidereal,
      Rahu: rahuSidereal,
      Ketu: ketuSidereal
    };
  }

  /**
   * Ascendant (Lagna) Calculation based on Local Sidereal Time and Geographical Coordinates
   */
  function calculateAscendant(jd, lat, lon, ayanamsha, hour, min, sec, tz) {
    const T = (jd - 2451545.0) / 36525.0;
    let decimalUTC = (hour + min / 60.0 + sec / 3600.0) - tz;

    // Greenwich Mean Sidereal Time (GMST) in degrees
    let GMST = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T;
    GMST = normalizeDeg(GMST);

    // Local Sidereal Time (RAMC in degrees)
    const RAMC = normalizeDeg(GMST + lon);

    // Obliquity of the Ecliptic
    const eps = 23.439291 - 0.0130042 * T;

    // Formula for Ascendant (Lagna)
    const radRAMC = toRad(RAMC);
    const radEps = toRad(eps);
    const radLat = toRad(lat);

    const y = -Math.cos(radRAMC);
    const x = Math.sin(radRAMC) * Math.cos(radEps) + Math.tan(radLat) * Math.sin(radEps);

    let tropicalAsc = toDeg(Math.atan2(y, x));
    tropicalAsc = normalizeDeg(tropicalAsc);

    // Convert to Sidereal Ascendant by subtracting Ayanamsha
    const siderealAsc = normalizeDeg(tropicalAsc - ayanamsha);
    return siderealAsc;
  }

  /**
   * Degree formatting to Degrees, Minutes, Seconds
   */
  function formatDMS(deg) {
    const d = Math.floor(deg);
    const minFloat = (deg - d) * 60;
    const m = Math.floor(minFloat);
    const s = Math.round((minFloat - m) * 60);
    return `${d}° ${m < 10 ? '0' + m : m}' ${s < 10 ? '0' + s : s}"`;
  }

  /**
   * Short 2-digit degree for chart boxes (e.g. "26°")
   */
  function formatShortDeg(deg) {
    const d = Math.floor(deg);
    return `${d < 10 ? '0' + d : d}°`;
  }

  /**
   * Get Rashi details from 0-360 longitude
   */
  function getRashiFromLongitude(long) {
    const signIndex = Math.floor(long / 30);
    const degreeInSign = long - (signIndex * 30);
    const rashiData = RASHIS[signIndex % 12];
    return {
      rashiNum: rashiData.num,
      nameEn: rashiData.nameEn,
      nameHi: rashiData.nameHi,
      lordEn: rashiData.lordEn,
      lordHi: rashiData.lordHi,
      element: rashiData.element,
      degreeInSign: degreeInSign,
      dms: formatDMS(degreeInSign),
      shortDeg: formatShortDeg(degreeInSign)
    };
  }

  /**
   * Get Nakshatra and Pada from 0-360 longitude
   */
  function getNakshatraFromLongitude(long) {
    const span = 360.0 / 27.0; // 13.333333 degrees
    const nakIndex = Math.floor(long / span);
    const rem = long - (nakIndex * span);
    const pada = Math.floor(rem / (span / 4.0)) + 1;
    const nakData = NAKSHATRAS[nakIndex % 27];
    return {
      num: nakData.num,
      nameEn: nakData.nameEn,
      nameHi: nakData.nameHi,
      lordEn: nakData.lordEn,
      lordHi: nakData.lordHi,
      pada: Math.min(pada, 4)
    };
  }

  /**
   * Calculate Navamsha Sign (D9) from longitude
   */
  function getNavamshaSign(long) {
    const navSpan = 360.0 / 108.0; // 3.33333 degrees per navamsha
    const navIndex = Math.floor(long / navSpan);
    const signNum = (navIndex % 12) + 1;
    return RASHIS[signNum - 1];
  }

  /**
   * Planetary Dignity Assessment
   */
  function getPlanetDignity(planetName, rashiNum) {
    const exaltations = { Sun: 1, Moon: 2, Mars: 10, Mercury: 6, Jupiter: 4, Venus: 12, Saturn: 7, Rahu: 2, Ketu: 8 };
    const debilitations = { Sun: 7, Moon: 8, Mars: 4, Mercury: 12, Jupiter: 10, Venus: 6, Saturn: 1, Rahu: 8, Ketu: 2 };
    const ownSigns = { Sun: [5], Moon: [4], Mars: [1, 8], Mercury: [3, 6], Jupiter: [9, 12], Venus: [2, 7], Saturn: [10, 11], Rahu: [11], Ketu: [8] };

    if (exaltations[planetName] === rashiNum) return { textHi: "उच्च (Exalted)", status: "exalted" };
    if (debilitations[planetName] === rashiNum) return { textHi: "नीच (Debilitated)", status: "debilitated" };
    if (ownSigns[planetName] && ownSigns[planetName].includes(rashiNum)) return { textHi: "स्वराशि (Own Sign)", status: "own" };
    return { textHi: "सम / मित्र (Normal)", status: "neutral" };
  }

  /**
   * Main Master Calculation Method
   */
  function generateKundli(input) {
    // Inputs: year, month, day, hour, min, sec, lat, lon, tz, name, gender
    const year = parseInt(input.year, 10);
    const month = parseInt(input.month, 10);
    const day = parseInt(input.day, 10);
    const hour = parseInt(input.hour, 10);
    const min = parseInt(input.min, 10);
    const sec = parseInt(input.sec || 0, 10);
    const lat = parseFloat(input.lat);
    const lon = parseFloat(input.lon);
    const tz = parseFloat(input.tz || 5.5);

    const jd = getJulianDay(year, month, day, hour, min, sec, tz);
    const ayanamsha = getLahiriAyanamsha(jd);

    // Calculate Lagna (Ascendant)
    const ascLong = calculateAscendant(jd, lat, lon, ayanamsha, hour, min, sec, tz);
    const ascRashi = getRashiFromLongitude(ascLong);
    const ascNak = getNakshatraFromLongitude(ascLong);

    // Calculate Planets
    const planetLongs = getPlanetLongitudes(jd, ayanamsha);

    // Also calculate planetary speeds by taking small delta (0.25 day) to determine retrograde
    const jdDelta = jd - 0.25;
    const planetLongsDelta = getPlanetLongitudes(jdDelta, getLahiriAyanamsha(jdDelta));

    const planetKeys = [
      { key: "Sun", nameEn: "Sun", nameHi: "सूर्य", code: "Su" },
      { key: "Moon", nameEn: "Moon", nameHi: "चंद्रमा", code: "Mo" },
      { key: "Mars", nameEn: "Mars", nameHi: "मंगल", code: "Ma" },
      { key: "Mercury", nameEn: "Mercury", nameHi: "बुध", code: "Me" },
      { key: "Jupiter", nameEn: "Jupiter", nameHi: "बृहस्पति", code: "Ju" },
      { key: "Venus", nameEn: "Venus", nameHi: "शुक्र", code: "Ve" },
      { key: "Saturn", nameEn: "Saturn", nameHi: "शनि", code: "Sa" },
      { key: "Rahu", nameEn: "Rahu", nameHi: "राहु", code: "Ra" },
      { key: "Ketu", nameEn: "Ketu", nameHi: "केतु", code: "Ke" }
    ];

    const sunLong = planetLongs.Sun;
    const planetsData = [];

    // House mapping: House 1 is ascRashi.rashiNum
    // House H has Rashi = ((ascRashi.rashiNum - 1 + H - 1) % 12) + 1
    const houses = [];
    for (let h = 1; h <= 12; h++) {
      const houseRashiNum = ((ascRashi.rashiNum - 1 + (h - 1)) % 12) + 1;
      houses.push({
        houseNum: h,
        rashiNum: houseRashiNum,
        rashiData: RASHIS[houseRashiNum - 1],
        planets: []
      });
    }

    planetKeys.forEach(p => {
      const long = planetLongs[p.key];
      const rashi = getRashiFromLongitude(long);
      const nak = getNakshatraFromLongitude(long);
      const navamsha = getNavamshaSign(long);

      // Check Retrograde: speed = long - longDelta
      let isRetro = false;
      if (p.key === "Rahu" || p.key === "Ketu") {
        isRetro = true; // Always retrograde in traditional Vedic
      } else if (p.key !== "Sun" && p.key !== "Moon") {
        let diff = long - planetLongsDelta[p.key];
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        if (diff < 0) isRetro = true;
      }

      // Check Combustion: distance to Sun < threshold
      let isCombust = false;
      if (COMBUSTION_ORBS[p.key]) {
        let sunDist = Math.abs(normalizeDeg(long - sunLong));
        if (sunDist > 180) sunDist = 360 - sunDist;
        if (sunDist <= COMBUSTION_ORBS[p.key]) isCombust = true;
      }

      const dignity = getPlanetDignity(p.key, rashi.rashiNum);

      // Calculate which house this planet falls in (1 to 12)
      const houseIndex = ((rashi.rashiNum - ascRashi.rashiNum + 12) % 12);
      const houseNum = houseIndex + 1;

      const pObj = {
        nameEn: p.nameEn,
        nameHi: p.nameHi,
        code: p.code,
        longitude: long,
        rashiNum: rashi.rashiNum,
        rashiNameEn: rashi.nameEn,
        rashiNameHi: rashi.nameHi,
        degreeInSign: rashi.degreeInSign,
        dms: rashi.dms,
        shortDeg: rashi.shortDeg,
        nakshatraNameEn: nak.nameEn,
        nakshatraNameHi: nak.nameHi,
        pada: nak.pada,
        nakshatraLord: nak.lordHi,
        navamshaNameHi: navamsha.nameHi,
        navamshaNum: navamsha.num,
        isRetrograde: isRetro,
        isCombust: isCombust,
        dignity: dignity.textHi,
        dignityStatus: dignity.status,
        houseNum: houseNum
      };

      planetsData.push(pObj);
      houses[houseIndex].planets.push(pObj);
    });

    // Compute basic panchang & Avakahada metrics
    const moonPlanet = planetsData.find(p => p.code === "Mo");
    const moonNak = getNakshatraFromLongitude(moonPlanet.longitude);
    const moonRashi = getRashiFromLongitude(moonPlanet.longitude);

    return {
      person: {
        name: input.name || "जातक",
        gender: input.gender || "Male",
        date: `${day}/${month}/${year}`,
        time: `${hour}:${min}:${sec}`,
        place: input.place || "भारत",
        latitude: lat,
        longitude: lon,
        timezone: tz
      },
      ayanamsha: {
        value: ayanamsha,
        dms: formatDMS(ayanamsha),
        type: "Lahiri (Chitrapaksha)"
      },
      ascendant: {
        longitude: ascLong,
        rashiNum: ascRashi.rashiNum,
        rashiNameEn: ascRashi.nameEn,
        rashiNameHi: ascRashi.nameHi,
        degreeInSign: ascRashi.degreeInSign,
        dms: ascRashi.dms,
        shortDeg: ascRashi.shortDeg,
        nakshatra: ascNak.nameHi,
        pada: ascNak.pada,
        lordHi: ascRashi.lordHi
      },
      moonMetrics: {
        rashiNum: moonRashi.rashiNum,
        rashiNameHi: moonRashi.nameHi,
        rashiLord: moonRashi.lordHi,
        nakshatra: moonNak.nameHi,
        pada: moonNak.pada
      },
      houses: houses,
      planets: planetsData
    };
  }

  return {
    RASHIS: RASHIS,
    NAKSHATRAS: NAKSHATRAS,
    CITIES: CITIES,
    generateKundli: generateKundli
  };

}));
