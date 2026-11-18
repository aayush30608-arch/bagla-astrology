// ============================================================================
// DIVYA DRISHTI - SEO ADMIN PANEL ENGINE (js/seo-admin.js)
// Domain: https://divyadrishtiastroai.in
// Total Pages: 42 (Core, Astrology Tools, 12 Rashis, 15 Puja Services)
// ============================================================================

(function() {
  'use strict';

  const DEFAULT_PIN = "9829";
  const PIN_ALIASES = ["9829", "98290", "admin", "admin123", "divya"];
  const AUTH_KEY = "divya_seo_auth";
  const STORAGE_KEY = "divya_seo_master_catalog";
  const DOMAIN = "https://divyadrishtiastroai.in";

  let catalog = [];
  let currentIndex = 0;
  let activeSidebarFilter = "all";
  let activeTableFilter = "all";

  // ---------------------------------------------------------------------------
  // 1. PIN AUTHENTICATION (FAIL-SAFE, UNIVERSAL)
  // ---------------------------------------------------------------------------
  const authOverlay = document.getElementById("authOverlay");
  const adminPinInput = document.getElementById("adminPinInput");
  const unlockBtn = document.getElementById("unlockBtn");
  const authError = document.getElementById("authError");
  const lockBtn = document.getElementById("lockBtn");
  const eyeToggleBtn = document.getElementById("eyeToggleBtn");
  const quickUnlockBtn = document.getElementById("quickUnlockBtn");
  const authForm = document.getElementById("authForm");

  function isUserAuthenticated() {
    return (
      sessionStorage.getItem(AUTH_KEY) === "true" ||
      localStorage.getItem(AUTH_KEY) === "true"
    );
  }

  function checkAuth() {
    if (isUserAuthenticated()) {
      if (authOverlay) authOverlay.classList.add("hidden");
    } else {
      if (authOverlay) authOverlay.classList.remove("hidden");
      setTimeout(function() {
        if (adminPinInput) adminPinInput.focus();
      }, 200);
    }
  }

  function grantAccess() {
    sessionStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem(AUTH_KEY, "true");
    if (authOverlay) authOverlay.classList.add("hidden");
    if (authError) authError.textContent = "";
    showToast("प्रवेश स्वीकृत! Welcome to SEO Admin Panel", "&#128737;&#65039;");
  }

  function verifyPin() {
    const entered = (adminPinInput ? adminPinInput.value : "").trim();
    if (PIN_ALIASES.indexOf(entered) !== -1) {
      grantAccess();
    } else {
      if (authError) {
        authError.textContent = "गलत पिन (Invalid PIN)! कृपया 9829 दर्ज करें या '1-Click Login' दबाएं।";
      }
      if (adminPinInput) {
        adminPinInput.style.borderColor = "#EF4444";
        adminPinInput.focus();
        adminPinInput.select();
        setTimeout(function() {
          adminPinInput.style.borderColor = "";
        }, 1500);
      }
    }
  }

  if (authForm) {
    authForm.addEventListener("submit", function(e) {
      e.preventDefault();
      verifyPin();
    });
  }

  if (unlockBtn) {
    unlockBtn.addEventListener("click", function(e) {
      e.preventDefault();
      verifyPin();
    });
  }

  if (quickUnlockBtn) {
    quickUnlockBtn.addEventListener("click", function() {
      if (adminPinInput) adminPinInput.value = DEFAULT_PIN;
      verifyPin();
    });
  }

  if (eyeToggleBtn) {
    eyeToggleBtn.addEventListener("click", function() {
      if (!adminPinInput) return;
      if (adminPinInput.type === "password") {
        adminPinInput.type = "text";
        eyeToggleBtn.innerHTML = "&#128584;";
      } else {
        adminPinInput.type = "password";
        eyeToggleBtn.innerHTML = "&#128065;";
      }
    });
  }

  if (adminPinInput) {
    adminPinInput.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        verifyPin();
      }
    });
  }

  if (lockBtn) {
    lockBtn.addEventListener("click", function() {
      sessionStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(AUTH_KEY);
      if (adminPinInput) adminPinInput.value = "";
      if (authOverlay) authOverlay.classList.remove("hidden");
      setTimeout(function() {
        if (adminPinInput) adminPinInput.focus();
      }, 200);
    });
  }

  checkAuth();

  // ---------------------------------------------------------------------------
  // 2. DATA INITIALIZATION
  // ---------------------------------------------------------------------------
  function initData() {
    const localData = localStorage.getItem(STORAGE_KEY);
    if (localData) {
      try {
        catalog = JSON.parse(localData);
      } catch(e) {
        catalog = window.SEO_CATALOG || [];
      }
    } else if (window.SEO_CATALOG && Array.isArray(window.SEO_CATALOG) && window.SEO_CATALOG.length > 0) {
      catalog = JSON.parse(JSON.stringify(window.SEO_CATALOG));
    } else {
      catalog = [];
    }

    renderPagesSidebar();
    renderAuditTable();
    renderSitemapViewer();
    renderRobotsViewer();
    updateKpiMetrics();
    loadPage(0);
  }

  // ---------------------------------------------------------------------------
  // 3. TAB CONTROLS
  // ---------------------------------------------------------------------------
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach(function(btn) {
    btn.addEventListener("click", function() {
      tabButtons.forEach(function(b) { b.classList.remove("active"); });
      tabPanes.forEach(function(p) { p.classList.remove("active"); });
      btn.classList.add("active");
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add("active");
    });
  });

  function switchTab(tabId) {
    tabButtons.forEach(function(b) {
      if (b.dataset.tab === tabId) b.classList.add("active");
      else b.classList.remove("active");
    });
    tabPanes.forEach(function(p) {
      if (p.id === tabId) p.classList.add("active");
      else p.classList.remove("active");
    });
  }

  // ---------------------------------------------------------------------------
  // 4. PAGES DIRECTORY SIDEBAR LIST (EVERY WEB PAGE VISIBLY LISTED!)
  // ---------------------------------------------------------------------------
  const pagesScrollList = document.getElementById("pagesScrollList");
  const sidebarSearch = document.getElementById("sidebarSearch");
  const sideFilterPills = document.querySelectorAll(".side-pill");
  const sidebarCount = document.getElementById("sidebarCount");

  function renderPagesSidebar() {
    if (!pagesScrollList) return;
    pagesScrollList.innerHTML = "";
    const q = (sidebarSearch ? sidebarSearch.value : "").toLowerCase().trim();
    let matchCount = 0;

    catalog.forEach(function(item, idx) {
      if (activeSidebarFilter !== "all" && item.category !== activeSidebarFilter) return;
      if (q && !item.name.toLowerCase().includes(q) && !item.file.toLowerCase().includes(q) && !(item.title || "").toLowerCase().includes(q)) return;

      matchCount++;
      const score = computeItemScore(item);
      const scoreClass = score >= 85 ? "high" : (score >= 70 ? "mid" : "low");

      const itemEl = document.createElement("div");
      itemEl.className = "page-list-item " + (idx === currentIndex ? "active" : "");
      itemEl.dataset.idx = idx;

      itemEl.innerHTML = 
        '<div class="pli-info">' +
          '<div class="pli-title">' +
            '<span style="font-size:11px; opacity:0.6; font-family:monospace;">#' + (idx + 1) + '</span> ' +
            item.name +
          '</div>' +
          '<div class="pli-slug">' + item.file + '</div>' +
        '</div>' +
        '<div class="pli-meta">' +
          '<span class="pli-score ' + scoreClass + '">' + score + '%</span>' +
          '<span class="pli-badge ' + item.category + '">' + item.category + '</span>' +
        '</div>';

      itemEl.addEventListener("click", function() {
        loadPage(idx);
      });

      pagesScrollList.appendChild(itemEl);
    });

    if (sidebarCount) {
      sidebarCount.textContent = matchCount + " Pages";
    }
  }

  if (sidebarSearch) {
    sidebarSearch.addEventListener("input", renderPagesSidebar);
  }

  sideFilterPills.forEach(function(pill) {
    pill.addEventListener("click", function() {
      sideFilterPills.forEach(function(p) { p.classList.remove("active"); });
      pill.classList.add("active");
      activeSidebarFilter = pill.dataset.sideFilter;
      renderPagesSidebar();
    });
  });

  // ---------------------------------------------------------------------------
  // 5. FORM BINDINGS & LIVE UPDATES
  // ---------------------------------------------------------------------------
  const fieldTitle = document.getElementById("fieldTitle");
  const fieldDesc = document.getElementById("fieldDesc");
  const fieldKeywords = document.getElementById("fieldKeywords");
  const fieldCanonical = document.getElementById("fieldCanonical");
  const fieldRobots = document.getElementById("fieldRobots");
  const fieldSchema = document.getElementById("fieldSchema");
  const fieldPriority = document.getElementById("fieldPriority");
  const fieldOgTitle = document.getElementById("fieldOgTitle");
  const fieldOgDesc = document.getElementById("fieldOgDesc");
  const fieldOgImage = document.getElementById("fieldOgImage");

  const titleCounter = document.getElementById("titleCounter");
  const titleProgress = document.getElementById("titleProgress");
  const descCounter = document.getElementById("descCounter");
  const descProgress = document.getElementById("descProgress");

  const serpTitle = document.getElementById("serpTitle");
  const serpSnippet = document.getElementById("serpSnippet");
  const serpBreadcrumb = document.getElementById("serpBreadcrumb");
  const socialTitle = document.getElementById("socialTitle");
  const socialDesc = document.getElementById("socialDesc");
  const socialImgPreview = document.getElementById("socialImgPreview");
  const ogThumb = document.getElementById("ogThumb");
  const ogThumbUrl = document.getElementById("ogThumbUrl");

  function loadPage(idx) {
    if (!catalog[idx]) return;
    currentIndex = idx;
    const page = catalog[idx];

    const editFileEl = document.getElementById("currentEditingFileName");
    const editNameEl = document.getElementById("currentEditingPageName");
    if (editFileEl) editFileEl.textContent = page.file;
    if (editNameEl) editNameEl.textContent = page.name + " (" + page.category.toUpperCase() + ")";

    // Highlight active in sidebar
    document.querySelectorAll(".page-list-item").forEach(function(item) {
      if (parseInt(item.dataset.idx, 10) === idx) {
        item.classList.add("active");
        item.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } else {
        item.classList.remove("active");
      }
    });

    const liveLink = document.getElementById("livePageLink");
    if (liveLink) liveLink.href = page.file;

    if (fieldTitle) fieldTitle.value = page.title || "";
    if (fieldDesc) fieldDesc.value = page.description || "";
    if (fieldKeywords) fieldKeywords.value = page.keywords || "";
    if (fieldCanonical) fieldCanonical.value = page.canonical || page.url || "";
    if (fieldRobots) fieldRobots.value = page.robots || "index, follow";
    if (fieldSchema) fieldSchema.value = page.schemaType || "AstrologyService";
    if (fieldPriority) fieldPriority.value = page.priority || "0.90";
    if (fieldOgTitle) fieldOgTitle.value = page.ogTitle || page.title || "";
    if (fieldOgDesc) fieldOgDesc.value = page.ogDescription || page.description || "";
    if (fieldOgImage) fieldOgImage.value = page.ogImage || (DOMAIN + "/images/Divya%20Drishti%20Astro%20Guide%20Banner.png");

    updatePreviews();
  }

  function updatePreviews() {
    const title = fieldTitle ? fieldTitle.value : "";
    const desc = fieldDesc ? fieldDesc.value : "";
    const canonical = fieldCanonical ? fieldCanonical.value : "";
    const ogTitle = (fieldOgTitle && fieldOgTitle.value) ? fieldOgTitle.value : title;
    const ogDesc = (fieldOgDesc && fieldOgDesc.value) ? fieldOgDesc.value : desc;
    const ogImage = fieldOgImage ? fieldOgImage.value : "";

    // Title Counter & Progress
    const tLen = title.length;
    if (titleCounter) {
      titleCounter.textContent = tLen + " / 60 chars";
      titleCounter.className = "char-counter " + (tLen >= 50 && tLen <= 60 ? "good" : (tLen > 60 && tLen <= 70 ? "warn" : "bad"));
    }
    if (titleProgress) {
      const tPercent = Math.min(100, Math.round((tLen / 60) * 100));
      titleProgress.style.width = tPercent + "%";
      titleProgress.style.backgroundColor = (tLen >= 50 && tLen <= 60) ? "var(--emerald)" : ((tLen <= 70) ? "var(--gold-amber)" : "var(--ruby-light)");
    }

    // Desc Counter & Progress
    const dLen = desc.length;
    if (descCounter) {
      descCounter.textContent = dLen + " / 160 chars";
      descCounter.className = "char-counter " + (dLen >= 130 && dLen <= 160 ? "good" : (dLen > 160 && dLen <= 175 ? "warn" : "bad"));
    }
    if (descProgress) {
      const dPercent = Math.min(100, Math.round((dLen / 160) * 100));
      descProgress.style.width = dPercent + "%";
      descProgress.style.backgroundColor = (dLen >= 130 && dLen <= 160) ? "var(--emerald)" : ((dLen <= 175) ? "var(--gold-amber)" : "var(--ruby-light)");
    }

    // Google SERP Preview
    if (serpTitle) serpTitle.textContent = title || "No Title Specified";
    if (serpSnippet) serpSnippet.textContent = desc || "No description specified. Google will generate a snippet from page contents.";
    if (serpBreadcrumb) serpBreadcrumb.textContent = canonical || (DOMAIN + "/" + (catalog[currentIndex] ? catalog[currentIndex].file : ""));

    // Social Preview
    if (socialTitle) socialTitle.textContent = ogTitle || title;
    if (socialDesc) socialDesc.textContent = ogDesc || desc;
    if (socialImgPreview) socialImgPreview.src = ogImage || "images/Divya Drishti Astro Guide Banner.png";
    if (ogThumb) ogThumb.src = ogImage || "images/Divya Drishti Astro Guide Banner.png";
    if (ogThumbUrl) ogThumbUrl.textContent = ogImage;

    calculateHealthScore();
  }

  [fieldTitle, fieldDesc, fieldKeywords, fieldCanonical, fieldRobots, fieldSchema, fieldPriority, fieldOgTitle, fieldOgDesc, fieldOgImage].forEach(function(input) {
    if (input) {
      input.addEventListener("input", updatePreviews);
      input.addEventListener("change", updatePreviews);
    }
  });

  const syncOgBtn = document.getElementById("syncOgBtn");
  if (syncOgBtn) {
    syncOgBtn.addEventListener("click", function() {
      if (fieldOgTitle && fieldTitle) fieldOgTitle.value = fieldTitle.value;
      if (fieldOgDesc && fieldDesc) fieldOgDesc.value = fieldDesc.value;
      updatePreviews();
      showToast("Open Graph tags updated from Meta Title/Desc!", "&#128260;");
    });
  }

  const viewDesktopBtn = document.getElementById("viewDesktopBtn");
  const viewMobileBtn = document.getElementById("viewMobileBtn");
  const serpCard = document.getElementById("serpCard");

  if (viewDesktopBtn && viewMobileBtn && serpCard) {
    viewDesktopBtn.addEventListener("click", function() {
      viewDesktopBtn.classList.add("active");
      viewMobileBtn.classList.remove("active");
      serpCard.classList.remove("mobile");
    });

    viewMobileBtn.addEventListener("click", function() {
      viewMobileBtn.classList.add("active");
      viewDesktopBtn.classList.remove("active");
      serpCard.classList.add("mobile");
    });
  }

  // ---------------------------------------------------------------------------
  // 6. REAL-TIME SEO HEALTH SCORE ENGINE
  // ---------------------------------------------------------------------------
  function calculateHealthScore() {
    let score = 0;
    const title = (fieldTitle ? fieldTitle.value : "").trim();
    const desc = (fieldDesc ? fieldDesc.value : "").trim();
    const keywords = (fieldKeywords ? fieldKeywords.value : "").trim();
    const canonical = (fieldCanonical ? fieldCanonical.value : "").trim();
    const ogImage = (fieldOgImage ? fieldOgImage.value : "").trim();
    const schema = fieldSchema ? fieldSchema.value : "";

    const checkTitle = document.getElementById("checkTitle");
    const checkDesc = document.getElementById("checkDesc");
    const checkKeywords = document.getElementById("checkKeywords");
    const checkCanonical = document.getElementById("checkCanonical");
    const checkOg = document.getElementById("checkOg");
    const checkSchema = document.getElementById("checkSchema");

    if (title.length >= 45 && title.length <= 65) {
      score += 20;
      if (checkTitle) checkTitle.classList.add("passed");
    } else if (title.length >= 30 && title.length <= 75) {
      score += 12;
      if (checkTitle) checkTitle.classList.remove("passed");
    } else {
      if (checkTitle) checkTitle.classList.remove("passed");
    }

    if (desc.length >= 130 && desc.length <= 165) {
      score += 20;
      if (checkDesc) checkDesc.classList.add("passed");
    } else if (desc.length >= 90 && desc.length <= 180) {
      score += 12;
      if (checkDesc) checkDesc.classList.remove("passed");
    } else {
      if (checkDesc) checkDesc.classList.remove("passed");
    }

    if (keywords.length > 5) {
      score += 15;
      if (checkKeywords) checkKeywords.classList.add("passed");
    } else {
      if (checkKeywords) checkKeywords.classList.remove("passed");
    }

    if (canonical.startsWith("https://divyadrishtiastroai.in")) {
      score += 15;
      if (checkCanonical) checkCanonical.classList.add("passed");
    } else {
      if (checkCanonical) checkCanonical.classList.remove("passed");
    }

    if (ogImage.length > 10) {
      score += 15;
      if (checkOg) checkOg.classList.add("passed");
    } else {
      if (checkOg) checkOg.classList.remove("passed");
    }

    if (schema) {
      score += 15;
      if (checkSchema) checkSchema.classList.add("passed");
    } else {
      if (checkSchema) checkSchema.classList.remove("passed");
    }

    score = Math.min(100, score);

    const scoreValue = document.getElementById("scoreValue");
    const scoreCircle = document.getElementById("scoreCircle");
    const healthGrade = document.getElementById("healthGrade");

    if (scoreValue) scoreValue.textContent = score;
    if (scoreCircle) {
      scoreCircle.className = "score-circle " + (score >= 85 ? "" : (score >= 70 ? "amber" : "ruby"));
    }

    if (healthGrade) {
      if (score >= 85) {
        healthGrade.textContent = "उत्कृष्ट (Excellent) • Search Engine Ready";
        healthGrade.style.color = "var(--emerald)";
      } else if (score >= 70) {
        healthGrade.textContent = "मध्यम (Good) • Minor optimizations suggested";
        healthGrade.style.color = "var(--gold-amber)";
      } else {
        healthGrade.textContent = "सुधार आवश्यक (Needs Work) • Optimize tags";
        healthGrade.style.color = "var(--ruby-light)";
      }
    }

    return score;
  }

  // ---------------------------------------------------------------------------
  // 7. SAVE / RESET / STORAGE
  // ---------------------------------------------------------------------------
  function saveCurrentPage() {
    if (!catalog[currentIndex]) return;
    const page = catalog[currentIndex];

    if (fieldTitle) page.title = fieldTitle.value;
    if (fieldDesc) page.description = fieldDesc.value;
    if (fieldKeywords) page.keywords = fieldKeywords.value;
    if (fieldCanonical) page.canonical = fieldCanonical.value;
    if (fieldRobots) page.robots = fieldRobots.value;
    if (fieldSchema) page.schemaType = fieldSchema.value;
    if (fieldPriority) page.priority = fieldPriority.value;
    if (fieldOgTitle) page.ogTitle = fieldOgTitle.value;
    if (fieldOgDesc) page.ogDescription = fieldOgDesc.value;
    if (fieldOgImage) page.ogImage = fieldOgImage.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog));
    updateKpiMetrics();
    renderPagesSidebar();
    renderAuditTable();
    renderSitemapViewer();
    showToast("Saved changes for " + page.file + "!", "&#128190;");
  }

  const savePageBtn = document.getElementById("savePageBtn");
  if (savePageBtn) savePageBtn.addEventListener("click", saveCurrentPage);

  const saveLocalBtn = document.getElementById("saveLocalBtn");
  if (saveLocalBtn) {
    saveLocalBtn.addEventListener("click", function() {
      saveCurrentPage();
      showToast("All 42 pages saved in local memory!", "&#10024;");
    });
  }

  const resetCurrentBtn = document.getElementById("resetCurrentBtn");
  if (resetCurrentBtn) {
    resetCurrentBtn.addEventListener("click", function() {
      if (confirm("Reset this page's SEO tags to initial catalog defaults?")) {
        const original = (window.SEO_CATALOG || []).find(function(c) {
          return c.file === catalog[currentIndex].file;
        });
        if (original) {
          catalog[currentIndex] = JSON.parse(JSON.stringify(original));
          loadPage(currentIndex);
          saveCurrentPage();
          showToast("Reset to defaults!", "&#128260;");
        }
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 8. SITE-WIDE AUDIT MATRIX TABLE (TAB 2)
  // ---------------------------------------------------------------------------
  const auditTableBody = document.getElementById("auditTableBody");
  const tableSearch = document.getElementById("tableSearch");
  const tableFilterPills = document.querySelectorAll(".cat-pill[data-tbl-filter]");

  function computeItemScore(item) {
    let s = 0;
    if (item.title && item.title.length >= 45 && item.title.length <= 65) s += 20;
    else if (item.title && item.title.length >= 30) s += 12;

    if (item.description && item.description.length >= 130 && item.description.length <= 165) s += 20;
    else if (item.description && item.description.length >= 90) s += 12;

    if (item.keywords && item.keywords.length > 5) s += 15;
    if (item.canonical && item.canonical.startsWith("https://divyadrishtiastroai.in")) s += 15;
    if (item.ogImage && item.ogImage.length > 10) s += 15;
    if (item.schemaType) s += 15;
    return Math.min(100, s);
  }

  function renderAuditTable() {
    if (!auditTableBody) return;
    auditTableBody.innerHTML = "";
    const q = (tableSearch ? tableSearch.value : "").toLowerCase();

    catalog.forEach(function(item, idx) {
      if (activeTableFilter !== "all" && item.category !== activeTableFilter) return;
      if (q && !item.name.toLowerCase().includes(q) && !item.file.toLowerCase().includes(q) && !(item.title || "").toLowerCase().includes(q)) return;

      const tr = document.createElement("tr");
      const score = computeItemScore(item);

      const catClass = item.category === "core" ? "badge-core" : (item.category === "tools" ? "badge-tool" : (item.category === "rashi" ? "badge-rashi" : "badge-service"));
      const scoreClass = score >= 85 ? "high" : (score >= 70 ? "mid" : "low");

      const tLen = (item.title || "").length;
      const dLen = (item.description || "").length;

      tr.innerHTML = 
        '<td style="color: var(--text-muted); font-family: monospace;">' + (idx + 1) + '</td>' +
        '<td>' +
          '<div class="page-cell">' +
            '<span class="page-cell-title">' + item.name + '</span>' +
            '<span class="page-cell-slug">' + item.file + '</span>' +
          '</div>' +
        '</td>' +
        '<td><span class="badge ' + catClass + '">' + item.category.toUpperCase() + '</span></td>' +
        '<td>' +
          '<span style="font-size: 11.5px; color: ' + (tLen >= 50 && tLen <= 60 ? 'var(--emerald)' : (tLen <= 70 ? 'var(--gold-amber)' : 'var(--ruby-light)')) + ';">' +
            tLen + ' chars' +
          '</span>' +
        '</td>' +
        '<td>' +
          '<span style="font-size: 11.5px; color: ' + (dLen >= 130 && dLen <= 160 ? 'var(--emerald)' : (dLen <= 175 ? 'var(--gold-amber)' : 'var(--ruby-light)')) + ';">' +
            dLen + ' chars' +
          '</span>' +
        '</td>' +
        '<td><span style="font-size: 11.5px; color: var(--gold-light); font-family: monospace;">' + (item.schemaType || 'AstrologyService') + '</span></td>' +
        '<td><span class="score-badge ' + scoreClass + '">' + score + ' / 100</span></td>' +
        '<td>' +
          '<button class="btn btn-outline" style="padding: 4px 10px; font-size: 11px;" onclick="window.editPageByIndex(' + idx + ')">' +
            'Edit &#9997;&#65039;' +
          '</button>' +
        '</td>';

      auditTableBody.appendChild(tr);
    });
  }

  window.editPageByIndex = function(idx) {
    loadPage(idx);
    switchTab("tab-editor");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (tableSearch) tableSearch.addEventListener("input", renderAuditTable);
  tableFilterPills.forEach(function(pill) {
    pill.addEventListener("click", function() {
      tableFilterPills.forEach(function(p) { p.classList.remove("active"); });
      pill.classList.add("active");
      activeTableFilter = pill.dataset.tblFilter;
      renderAuditTable();
    });
  });

  function updateKpiMetrics() {
    const kpiTotal = document.getElementById("kpiTotalPages");
    const kpiAvg = document.getElementById("kpiAvgScore");
    if (kpiTotal) kpiTotal.textContent = catalog.length;
    let totalScore = 0;
    catalog.forEach(function(item) {
      totalScore += computeItemScore(item);
    });
    const avg = Math.round(totalScore / (catalog.length || 1));
    if (kpiAvg) kpiAvg.textContent = avg;
  }

  // ---------------------------------------------------------------------------
  // 9. XML SITEMAP MANAGER (TAB 3)
  // ---------------------------------------------------------------------------
  const sitemapViewer = document.getElementById("sitemapViewer");

  function generateSitemapXml() {
    const today = new Date().toISOString().split("T")[0];
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    catalog.forEach(function(item) {
      const loc = item.file === "index.html" ? (DOMAIN + "/") : (DOMAIN + "/" + item.file);
      xml += '  <url>\n' +
             '    <loc>' + loc + '</loc>\n' +
             '    <lastmod>' + today + '</lastmod>\n' +
             '    <changefreq>' + (item.changefreq || 'weekly') + '</changefreq>\n' +
             '    <priority>' + (item.priority || '0.80') + '</priority>\n' +
             '  </url>\n';
    });

    xml += '</urlset>\n';
    return xml;
  }

  function renderSitemapViewer() {
    if (sitemapViewer) sitemapViewer.textContent = generateSitemapXml();
  }

  const btnCopySitemap = document.getElementById("btnCopySitemap");
  if (btnCopySitemap) {
    btnCopySitemap.addEventListener("click", function() {
      navigator.clipboard.writeText(generateSitemapXml()).then(function() {
        showToast("Sitemap XML copied to clipboard!", "&#128203;");
      });
    });
  }

  const btnDownloadSitemap = document.getElementById("btnDownloadSitemap");
  if (btnDownloadSitemap) {
    btnDownloadSitemap.addEventListener("click", function() {
      const blob = new Blob([generateSitemapXml()], { type: "application/xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sitemap.xml";
      a.click();
      URL.revokeObjectURL(url);
      showToast("Downloaded sitemap.xml!", "&#128229;");
    });
  }

  // ---------------------------------------------------------------------------
  // 10. ROBOTS.TXT MANAGER (TAB 4)
  // ---------------------------------------------------------------------------
  const robotsViewer = document.getElementById("robotsViewer");

  function getRobotsTxtDefault() {
    return "# Robots.txt for DIVYA DRISHTI (Apke Sitare • Aapki Disha)\n" +
           "# Domain: https://divyadrishtiastroai.in\n\n" +
           "User-agent: *\n" +
           "Allow: /\n" +
           "Disallow: /scratch/\n" +
           "Disallow: /scripts/\n" +
           "Disallow: /seo-admin.html\n\n" +
           "# Search Engine Sitemaps\n" +
           "Sitemap: https://divyadrishtiastroai.in/sitemap.xml\n";
  }

  function renderRobotsViewer() {
    if (robotsViewer) robotsViewer.textContent = getRobotsTxtDefault();
  }

  const btnCopyRobots = document.getElementById("btnCopyRobots");
  if (btnCopyRobots) {
    btnCopyRobots.addEventListener("click", function() {
      if (!robotsViewer) return;
      navigator.clipboard.writeText(robotsViewer.textContent).then(function() {
        showToast("robots.txt copied to clipboard!", "&#128203;");
      });
    });
  }

  const btnDownloadRobots = document.getElementById("btnDownloadRobots");
  if (btnDownloadRobots) {
    btnDownloadRobots.addEventListener("click", function() {
      if (!robotsViewer) return;
      const blob = new Blob([robotsViewer.textContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "robots.txt";
      a.click();
      URL.revokeObjectURL(url);
      showToast("Downloaded robots.txt!", "&#128229;");
    });
  }

  // ---------------------------------------------------------------------------
  // 11. AUTOMATION, EXPORT & CODE MODAL
  // ---------------------------------------------------------------------------
  const codeModal = document.getElementById("codeModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalCloseAction = document.getElementById("modalCloseAction");
  const modalCopyBtn = document.getElementById("modalCopyBtn");
  const modalTitle = document.getElementById("modalTitle");
  const modalCodeContent = document.getElementById("modalCodeContent");

  function openModal(title, code) {
    if (modalTitle) modalTitle.textContent = title;
    if (modalCodeContent) modalCodeContent.textContent = code;
    if (codeModal) codeModal.classList.add("open");
  }

  function closeModal() {
    if (codeModal) codeModal.classList.remove("open");
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalCloseAction) modalCloseAction.addEventListener("click", closeModal);
  if (codeModal) {
    codeModal.addEventListener("click", function(e) {
      if (e.target === codeModal) closeModal();
    });
  }

  if (modalCopyBtn) {
    modalCopyBtn.addEventListener("click", function() {
      if (!modalCodeContent) return;
      navigator.clipboard.writeText(modalCodeContent.textContent).then(function() {
        showToast("Code copied to clipboard!", "&#128203;");
        closeModal();
      });
    });
  }

  // Copy Head Tags
  const btnCopyHead = document.getElementById("btnCopyHead");
  if (btnCopyHead) {
    btnCopyHead.addEventListener("click", function() {
      saveCurrentPage();
      const p = catalog[currentIndex];
      if (!p) return;
      const tags = '<!-- Master SEO Tags: ' + p.file + ' -->\n' +
                   '<title>' + p.title + '</title>\n' +
                   '<meta name="description" content="' + p.description + '">\n' +
                   '<meta name="keywords" content="' + p.keywords + '">\n' +
                   '<link rel="canonical" href="' + p.canonical + '">\n' +
                   '<meta name="robots" content="' + p.robots + '">\n\n' +
                   '<!-- Open Graph / WhatsApp -->\n' +
                   '<meta property="og:type" content="website">\n' +
                   '<meta property="og:site_name" content="Divya Drishti">\n' +
                   '<meta property="og:url" content="' + p.canonical + '">\n' +
                   '<meta property="og:title" content="' + (p.ogTitle || p.title) + '">\n' +
                   '<meta property="og:description" content="' + (p.ogDescription || p.description) + '">\n' +
                   '<meta property="og:image" content="' + p.ogImage + '">\n\n' +
                   '<!-- Twitter Cards -->\n' +
                   '<meta name="twitter:card" content="summary_large_image">\n' +
                   '<meta name="twitter:title" content="' + (p.ogTitle || p.title) + '">\n' +
                   '<meta name="twitter:description" content="' + (p.ogDescription || p.description) + '">\n' +
                   '<meta name="twitter:image" content="' + p.ogImage + '">';
      openModal("HTML <head> Tags for " + p.file, tags);
    });
  }

  // View JSON-LD Schema
  const btnViewSchema = document.getElementById("btnViewSchema");
  if (btnViewSchema) {
    btnViewSchema.addEventListener("click", function() {
      const p = catalog[currentIndex];
      if (!p) return;
      const schema = {
        "@context": "https://schema.org",
        "@type": p.schemaType || "AstrologyService",
        "name": p.title,
        "url": p.canonical,
        "description": p.description,
        "image": p.ogImage,
        "provider": {
          "@type": "AstrologyService",
          "name": "Divya Drishti",
          "founder": "Shastri Amit Kumar Sharma",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Jaipur",
            "addressRegion": "Rajasthan",
            "addressCountry": "IN"
          }
        }
      };
      const scriptTag = '<script type="application/ld+json">\n' + JSON.stringify(schema, null, 2) + '\n<\/script>';
      openModal("JSON-LD Schema for " + p.file, scriptTag);
    });
  }

  // Download Catalog JSON
  const btnDownloadCatalogJson = document.getElementById("btnDownloadCatalogJson");
  if (btnDownloadCatalogJson) {
    btnDownloadCatalogJson.addEventListener("click", function() {
      const jsonStr = JSON.stringify(catalog, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "seo-catalog.json";
      a.click();
      URL.revokeObjectURL(url);
      showToast("Downloaded seo-catalog.json!", "&#128229;");
    });
  }

  // Copy PowerShell Sync Command
  const btnCopySyncCmd = document.getElementById("btnCopySyncCmd");
  if (btnCopySyncCmd) {
    btnCopySyncCmd.addEventListener("click", function() {
      const cmd = "powershell -ExecutionPolicy Bypass -File .\\scripts\\apply-seo.ps1";
      navigator.clipboard.writeText(cmd).then(function() {
        showToast("PowerShell command copied! Paste and run in terminal.", "&#128203;");
      });
    });
  }

  // Import JSON
  const importJsonInput = document.getElementById("importJsonInput");
  const btnImportJson = document.getElementById("btnImportJson");
  if (btnImportJson && importJsonInput) {
    btnImportJson.addEventListener("click", function() {
      importJsonInput.click();
    });

    importJsonInput.addEventListener("change", function(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(ev) {
        try {
          const parsed = JSON.parse(ev.target.result);
          if (Array.isArray(parsed) && parsed.length > 0) {
            catalog = parsed;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog));
            initData();
            showToast("Imported " + catalog.length + " pages successfully!", "&#128229;");
          } else {
            alert("Invalid JSON format. Expected an array of page objects.");
          }
        } catch(err) {
          alert("Error reading JSON file: " + err.message);
        }
      };
      reader.readAsText(file);
    });
  }

  // Reset All to Defaults
  const btnResetAllDefaults = document.getElementById("btnResetAllDefaults");
  if (btnResetAllDefaults) {
    btnResetAllDefaults.addEventListener("click", function() {
      if (confirm("Are you sure you want to reset ALL 42 pages to default metadata? Any unsaved edits will be lost.")) {
        localStorage.removeItem(STORAGE_KEY);
        if (window.SEO_CATALOG) {
          catalog = JSON.parse(JSON.stringify(window.SEO_CATALOG));
        }
        initData();
        showToast("Reset all 42 pages to initial defaults!", "&#128260;");
      }
    });
  }

  // Navbar Sync / Export Button
  const exportCodeBtn = document.getElementById("exportCodeBtn");
  if (exportCodeBtn) {
    exportCodeBtn.addEventListener("click", function() {
      switchTab("tab-sync");
    });
  }

  // ---------------------------------------------------------------------------
  // 12. TOAST NOTIFICATION HELPER
  // ---------------------------------------------------------------------------
  const toast = document.getElementById("toastNotification");
  const toastMsg = document.getElementById("toastMsg");
  const toastIcon = document.getElementById("toastIcon");
  let toastTimer = null;

  function showToast(message, icon) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    if (toastIcon) toastIcon.innerHTML = icon || "&#10024;";
    toast.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function() {
      toast.classList.remove("show");
    }, 3200);
  }

  // Initialize Application
  initData();

})();
