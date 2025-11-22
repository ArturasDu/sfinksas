(() => {
  const COLORS = ["red","blue","yellow","green","purple"];
  const COLOR_HEX = {
    red:"#ef5350",
    blue:"#42a5f5",
    yellow:"#ffeb3b",
    green:"#66bb6a",
    purple:"#ab47bc"
  };
  const ROMAN = ["I","II","III","IV","V","VI","VII","VIII","IX","X"];

  const STORAGE_ACH = "br_achievements_v2";
  const STORAGE_UPG = "br_upgrades_v2";
  const STORAGE_DAILY = "br_daily_v3";
  const STORAGE_STATS = "br_stats_v2";
  const STORAGE_SKILLS = "br_skills_v1";
  const STORAGE_SKILL_POINTS = "br_skill_points_v1";
  const STORAGE_PET = "br_pet_v1";
  const STORAGE_SKINS = "br_skins_v1";
  const STORAGE_QUESTS = "br_quests_v1";
  const STORAGE_LEADERBOARD = "br_leaderboard_v1";
  const STORAGE_LOGIN = "br_login_v1";
  const STORAGE_GUILD = "br_guild_v1";

  // Ledo boso sprites - VISOS 12 KADRŲ
  const BOSS_ICE_FRAMES = [
    "ledoboss_idle.png",              // 0 - phase1 neutral
    "ledoboss_idle_blink.png",        // 1 - phase1 half blink
    "ledoboss_idle_fullblink.png",    // 2 - phase1 full blink
    "ledoboss_2faze.png",             // 3 - phase2 angry
    "ledoboss_2faze_blink.png",       // 4 - phase2 half blink
    "ledoboss_2faze_fullblink.png",   // 5 - phase2 full blink
    "ledoboss_3faze.png",             // 6 - phase3 rage
    "ledoboss_3faze_blink.png",       // 7 - phase3 half blink
    "ledoboss_3faze_fullblink.png",   // 8 - phase3 full blink
    "ledoboss_hit.png",               // 9 - hit reaction
    "ledoboss_shock.png",             // 10 - shocked
    "ledoboss_icecrack.png"           // 11 - ice crack (HP < 30%)
  ];

  const TIPS = [
    "Spausk tik taikinio spalvos balionus.",
    "Combo sistema: iš eilės teisingi spaudimai aktyvuoja Fever režimą!",
    "Nauji specialūs balionai: ❤️ Gyvybė, 🛡️ Apsauga, 💥 Bomba ir kiti!",
    "Kas 5 lygį laukia iššūkio lygis su specialiomis taisyklėmis.",
    "Užbaik misijas ir uždirbk daugiau žvaigždučių.",
    "Fever režime gauk dvigubus taškus ir XP!",
    "Sukurk savo skill tree - pasirink, ką nori tobulinti.",
    "Atrakink naujus balionų ir fonų skinai.",
    "Kasdien prisijunk ir gauk bonusų!"
  ];

  // Skill tree struktūra
  const SKILL_TREE = {
    health: {
      name: "Gyvybės šaka",
      skills: [
        { id: "extra_life", name: "+1 Maks. Gyvybė", cost: 5, maxLevel: 3, effect: "Padidina maksimalias gyvybes" },
        { id: "hp_regen", name: "HP Regeneracija", cost: 8, maxLevel: 2, effect: "Prisijungus atstatoma 1 gyvybė" },
        { id: "boss_hp_bonus", name: "Boso HP Bonusas", cost: 12, maxLevel: 1, effect: "+3 HP bosų kovose" }
      ]
    },
    damage: {
      name: "Žalos šaka",
      skills: [
        { id: "boss_damage", name: "Stipresni Smūgiai", cost: 5, maxLevel: 3, effect: "+2 žala bosui kiekvienam lygiui" },
        { id: "elite_damage", name: "Prieš Elite", cost: 10, maxLevel: 2, effect: "+50% žala specialiems balionams" },
        { id: "ultra_boost", name: "Ultra Stiprinimas", cost: 15, maxLevel: 1, effect: "Ult'ai tampa 20% stipresni" }
      ]
    },
    special: {
      name: "Specialiųjų šaka",
      skills: [
        { id: "special_rate", name: "Specialių Dažnis", cost: 5, maxLevel: 3, effect: "+2% specialių balionų tikimybė" },
        { id: "effect_duration", name: "Efektų Trukmė", cost: 8, maxLevel: 2, effect: "+25% efektų trukmė" },
        { id: "rare_effects", name: "Reti Efektai", cost: 12, maxLevel: 1, effect: "Atsiranda retesni efektai" }
      ]
    },
    economy: {
      name: "Ekonomikos šaka",
      skills: [
        { id: "star_bonus", name: "Žvaigždučių Bonusas", cost: 5, maxLevel: 3, effect: "+1 žvaigždutė už lygį" },
        { id: "crystal_rate", name: "Kristalų Dažnis", cost: 8, maxLevel: 2, effect: "+15% kristalų tikimybė" },
        { id: "combo_bonus", name: "Combo Bonusas", cost: 12, maxLevel: 1, effect: "+10% taškų už combo" }
      ]
    }
  };

  // Augintiniai
  const PETS = [
    { id: "default", name: "Paprastasis", rarity: "common", bonus: "Jokio bonuso", cost: 0 },
    { id: "guardian", name: "Sargas", rarity: "rare", bonus: "+10% šansas, kad klaida neatims gyvybės", cost: 20 },
    { id: "collector", name: "Rinkėjas", rarity: "epic", bonus: "+25% žvaigždučių iš specialių balionų", cost: 50 },
    { id: "warrior", name: "Karys", rarity: "legendary", bonus: "+1 papildomas smūgis bosui", cost: 100 }
  ];

  // Skin'ai
  const BALLOON_SKINS = [
    { id: "default", name: "Klasikinis", cost: 0 },
    { id: "winter", name: "Žiemos", cost: 15 },
    { id: "halloween", name: "Helovyno", cost: 25 },
    { id: "space", name: "Kosminis", cost: 40 }
  ];

  const BACKGROUND_SKINS = [
    { id: "default", name: "Miestas", cost: 0 },
    { id: "night", name: "Naktis", cost: 20 },
    { id: "winter", name: "Žiema", cost: 30 },
    { id: "space", name: "Kosmosas", cost: 50 }
  ];

  // Questai
  const WEEKLY_QUESTS = [
    {
      id: "weekly_boss",
      title: "Boso Medžiotojas",
      desc: "Nugalėk 3 bosus per savaitę",
      target: 3,
      reward: 25,
      type: "bossesDefeated"
    },
    {
      id: "weekly_combo",
      title: "Combo Meistras",
      desc: "Pasiek 50 combo vienoje run'oje",
      target: 50,
      reward: 30,
      type: "maxCombo"
    },
    {
      id: "weekly_challenge",
      title: "Iššūkių Kūrėjas",
      desc: "Įveik 2 iššūkio lygius neprarandant gyvybių",
      target: 2,
      reward: 20,
      type: "challengesCompleted"
    }
  ];

  // Specialių balionų pool'as
  const SPECIAL_BALLOONS = [
    { type: "speed", chance: 0.15, label: "⚡" },
    { type: "slow", chance: 0.15, label: "🐌" },
    { type: "freeze", chance: 0.12, label: "❄" },
    { type: "wind", chance: 0.12, label: "🌪️" },
    { type: "crystal", chance: 0.15, label: "💎" },
    { type: "skill_point", chance: 0.02, label: "✨" },
    { type: "heart", chance: 0.08, label: "❤️" },
    { type: "shield", chance: 0.08, label: "🛡️" },
    { type: "bomb", chance: 0.06, label: "💥" },
    { type: "auto_target", chance: 0.05, label: "🎯" },
    { type: "color_changer", chance: 0.03, label: "🔁" },
    { type: "cursed", chance: 0.01, label: "☠️" }
  ];

  // Challenge lygiai
  const CHALLENGE_MODES = {
    reverse: {
      name: "Apverstos Taisyklės",
      description: "SPAUDYK VISAS KITAS SPALVAS! Taikinio spalvos balionai atims gyvybę!",
      rules: {
        targetColorHarmful: true,
        otherColorsGivePoints: true
      }
    },
    one_color: {
      name: "Vienos Spalvos",
      description: "Tik viena spalva! Tačiau atsargiai - pasislėpę prakeikti balionai!",
      rules: {
        onlyTargetColor: true,
        cursedBalloons: true
      }
    },
    darkness: {
      name: "Tamsos Režimas",
      description: "Matosi tik balionai arti pelytės! Pasikliauk savo instinktais!",
      rules: {
        darkMode: true,
        visibleRadius: 100
      }
    },
    limited_clicks: {
      name: "Riboti Paspaudimai",
      description: "Turi tik 20 paspaudimų! Išnaudok kiekvieną protingai!",
      rules: {
        maxClicks: 20,
        clicksLeft: 20
      }
    }
  };

  const dom = {
    body: document.body,
    gameArea: document.getElementById("game-area"),
    livesWrap: document.getElementById("lives"),
    targetDot: document.getElementById("target-dot"),
    levelLabel: document.getElementById("level-label"),
    logText: document.getElementById("log-text"),
    progressWrap: document.getElementById("progress-bar-wrap"),
    progressFill: document.getElementById("progress-fill"),

    statStars: document.getElementById("stat-stars"),
    statXp: document.getElementById("stat-xp"),
    statBestLevel: document.getElementById("stat-best-level"),
    statSkill: document.getElementById("stat-skill"),

    // Pagrindinis PUBG tipo meniu
    mainMenuScreen: document.getElementById("main-menu-screen"),
    gameRoot: document.getElementById("game-root"),
    mmPlay: document.getElementById("mm-play"),
    mmSkills: document.getElementById("mm-skills"),
    mmShop: document.getElementById("mm-shop"),
    mmSettings: document.getElementById("mm-settings"),
    menuStars: document.getElementById("menu-stars"),
    menuPoints: document.getElementById("menu-points"),
    menuBestLevel: document.getElementById("menu-best-level"),

    damageFlash: document.getElementById("damage-flash"),
    feverOverlay: document.getElementById("fever-overlay"),
    comboDisplay: document.getElementById("combo-display"),

    bossOverlay: document.getElementById("boss-overlay"),
    bossName: document.getElementById("boss-name"),
    bossHpFill: document.getElementById("boss-hp-fill"),
    bossHpValue: document.getElementById("boss-hp-value"),
    bossTip: document.getElementById("boss-tip"),
    bossEntity: document.getElementById("boss-entity"),
    bossHitbox: document.getElementById("boss-hitbox"),

    playerHpWrap: document.getElementById("player-hp-wrap"),
    playerHpFill: document.getElementById("player-hp-fill"),
    playerHpValue: document.getElementById("player-hp-value"),

    startOverlay: document.getElementById("start-overlay"),
    startTip: document.getElementById("start-tip"),
    btnStart: document.getElementById("btn-start"),

    gameOverOverlay: document.getElementById("game-over-overlay"),
    goLevel: document.getElementById("go-level"),
    goStars: document.getElementById("go-stars"),
    goBestLevel: document.getElementById("go-best-level"),
    goMaxCombo: document.getElementById("go-max-combo"),
    btnRestart: document.getElementById("btn-restart"),
    goMenuBtn: document.getElementById("btn-go-menu"),

    btnMenu: document.getElementById("btn-menu"),
    mainMenu: document.getElementById("main-menu"),
    mainMenuClose: document.getElementById("main-menu-close"),
    menuPanel: document.getElementById("menu-panel"),
    menuPanelTitle: document.getElementById("menu-panel-title"),
    menuPanelContent: document.getElementById("menu-panel-content"),
    menuPanelClose: document.getElementById("menu-panel-close"),

    loadingOverlay: document.getElementById("loading-overlay"),
    pauseBtn: document.getElementById("pause-btn"),
    pauseOverlay: document.getElementById("pause-overlay"),
    btnResume: document.getElementById("btn-resume"),
    btnMainMenu: document.getElementById("btn-main-menu"),

    // Ult mygtukai
    ultButtons: {
      bomb: document.getElementById("ult-bomb"),
      slow: document.getElementById("ult-slow"),
      target: document.getElementById("ult-target")
    },

    // Helper elementai
    helper: document.getElementById("helper"),
    helperBody: document.getElementById("helper-body"),

    // Žaidėjas
    player: document.getElementById("player")
  };

  const state = {
    running: false,
    lastFrame: 0,
    currentTime: 0,

    level: 1,
    checkpoint: 1,
    bestLevel: 1,

    targetColor: "blue",

    lives: 3,
    maxLives: 3,

    score: 0,
    xp: 0,
    stars: 0,
    skillPoints: 0,

    levelProgress: 0,
    levelTarget: 20,

    spawnInterval: 1000,
    maxBalloons: 10,
    lastSpawnTime: 0,

    balloons: [],

    // Combo sistema
    combo: 0,
    maxCombo: 0,
    feverUntil: 0,

    // Ult sistema
    ultCharge: {
      bomb: 0,
      slow: 0,
      target: 0
    },
    ultMaxCharge: 100,

    bossActive: false,
    boss: {
      hp: 0,
      hpMax: 0,
      playerHp: 0,
      playerHpMax: 0,
      minionsPopped: 0,
      lastMinionSpawn: 0,
      minionSpawnInterval: 1200,
      hitboxActive: false,
      hitboxWindowUntil: 0,
      posX: 0,
      dir: 1,
      speed: 0.06
    },

    effects: {
      speedUpUntil: 0,
      slowUntil: 0,
      freezeUntil: 0,
      windUntil: 0,
      shieldUntil: 0,
      autoTargetUntil: 0
    },

    counters: {
      balloonsPopped: 0,
      levelsCompleted: 0,
      bossesDefeated: 0,
      damageTaken: 0,
      crystalsCollected: 0,
      runs: 0,
      starsEarned: 0,
      maxCombo: 0,
      challengesCompleted: 0,
      questsCompleted: 0
    },

    statsTimeMs: 0,

    // Skill tree
    skills: {},

    // Augintinis
    pet: {
      id: "default",
      level: 1,
      xp: 0,
      nextLevelXp: 100
    },

    // Skin'ai
    skins: {
      balloon: "default",
      background: "default"
    },

    // Questai
    daily: null,
    weekly: null,
    achievements: null,
    debugStartLevel: null,

    // Challenge režimas
    challengeMode: null,
    challengeRules: null,

    // Leaderboard
    leaderboard: {
      levels: [],
      combo: [],
      score: []
    },

    // Titulai
    titles: ["Pradedančiasis"],
    currentTitle: "Pradedančiasis",

    // Prisijungimo bonusas
    loginStreak: 0,
    lastLogin: null,

    
    // Gildija (lokalus prototipas, pasiruošęs multiplayer)
    guild: {
      name: null,
      tag: null,
      role: "none", // "owner" | "officer" | "member" | "none"
      guildXp: 0,
      guildLevel: 1,
      members: []
    },

    // Multiplayer paruošimas (kliento pusė, be serverio)
    multiplayer: {
      mode: "solo",       // "solo" | "coop" | "versus"
      roomCode: null,
      isHost: false,
      players: [],
      lastHeartbeat: 0
    },

    // Žaidėjo pozicija ir šūviai
    player: {
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      speed: 0.45
    },
    bullets: [],
    input: {
      left: false,
      right: false
    },
    lastShotTime: 0,

    touch: {
      active: false,
      startX: 0,
      startY: 0,
      moved: false,
      startTime: 0
    },

// Tutorial
    tutorialCompleted: false,

    // Nustatymai
    settings: {
      sound: true,
      music: true,
      vibration: true
    }
  };

  let balloonIdCounter = 1;
  const bossSprite = {
    baseFrame: 0,
    currentFrame: 0,
    nextBlinkAt: 0,
    blinkUntil: 0,
    hitUntil: 0,
    shockUntil: 0
  };

  /* ==== PAGALBINIAI ==== */
  function isBossLevel(l){ return l>0 && l%10===0; }
  function isChallengeLevel(l){ return l>0 && l%5===0 && l%10!==0; }

  function calcLevelTarget(l){ return 18+Math.floor(l*2.3); }
  function calcSpawnInterval(l){
    let base=1100-(l-1)*40;
    if(base<380) base=380;
    return base;
  }

  function todayStr(){
    const d=new Date();
    return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
  }

  function randInt(min,max){
    return min+Math.floor(Math.random()*(max-min+1));
  }

  function flashLogHighlight(){
    const bar=document.getElementById("log-bar");
    bar.classList.remove("highlight");
    void bar.offsetWidth;
    bar.classList.add("highlight");
  }

  function log(msg){
    dom.logText.textContent = msg;
  }

  function clearBalloons(){
    for(const b of state.balloons){
      if(b.el) b.el.remove();
    }
    state.balloons=[];
  }

  function flashDamage(){
    dom.damageFlash.classList.remove("show");
    void dom.damageFlash.offsetWidth;
    dom.damageFlash.classList.add("show");
  }

  function updateCriticalVisual(){
    if(!state.bossActive && state.lives===1) dom.body.classList.add("critical-health");
    else dom.body.classList.remove("critical-health");
  }

  function recomputeWorld(){
    // Pašaliname senus fonus
    dom.gameArea.classList.remove("world-city","world-forest","world-mountain","world-space","world-default","world-night","world-winter","world-space");
    
    // Pritaikome skin'ą
    let cls = "world-" + (state.skins.background || "default");
    if (!dom.gameArea.classList.contains(cls)) {
      dom.gameArea.classList.add(cls);
    }
  }

  // Combo sistema
  function updateComboDisplay() {
    if (!dom.comboDisplay) return;
    
    if (state.combo > 0) {
      dom.comboDisplay.textContent = state.combo + " COMBO";
      dom.comboDisplay.style.display = "block";
      dom.comboDisplay.style.fontSize = Math.min(24, 16 + state.combo) + "px";
    } else {
      dom.comboDisplay.style.display = "none";
    }
  }

  function activateFever() {
    state.feverUntil = state.currentTime + 5000;
    if (dom.feverOverlay) {
      dom.feverOverlay.classList.add("active");
    }
    log("🔥 FEVER! Dvigubi taškus ir XP!");
    
    setTimeout(() => {
      if (dom.feverOverlay) {
        dom.feverOverlay.classList.remove("active");
      }
      log("Fever režimas baigėsi.");
    }, 5000);
  }

  function addCombo() {
    state.combo++;
    state.maxCombo = Math.max(state.maxCombo, state.combo);
    updateComboDisplay();
    
    if (state.combo >= 10 && state.feverUntil < state.currentTime) {
      activateFever();
    }
    
    // Ult įkrovimas
    if (state.ultCharge) {
      state.ultCharge.bomb = Math.min(state.ultMaxCharge, state.ultCharge.bomb + 2);
      state.ultCharge.slow = Math.min(state.ultMaxCharge, state.ultCharge.slow + 2);
      state.ultCharge.target = Math.min(state.ultMaxCharge, state.ultCharge.target + 2);
      updateUltButtons();
    }
  }

  function resetCombo() {
    state.combo = 0;
    updateComboDisplay();
  }

  // Ult sistema
  function updateUltButtons() {
    if (!dom.ultButtons || !state.ultCharge) return;
    
    for (const [type, button] of Object.entries(dom.ultButtons)) {
      if (!button) continue;
      const charge = state.ultCharge[type];
      const percent = (charge / state.ultMaxCharge) * 100;
      
      button.style.background = `linear-gradient(to top, #4CAF50 ${percent}%, #333 ${percent}%)`;
      button.disabled = charge < state.ultMaxCharge;
    }
  }

  function useUltimate(type) {
    if (!state.ultCharge || state.ultCharge[type] < state.ultMaxCharge) return;
    
    state.ultCharge[type] = 0;
    updateUltButtons();
    
    switch(type) {
      case "bomb":
        // Susprogdina visus balionus
        clearBalloons();
        log("💥 SUPER BOMBA! Visi balionai sunaikinti!");
        break;
      case "slow":
        // Lėtas laikas 4 sekundes
        state.effects.slowUntil = state.currentTime + 4000;
        log("⏰ LĖTAS LAIKAS! Balionai juda lėtai.");
        break;
      case "target":
        // Tik taikinio spalvos balionai 5 sekundes
        state.effects.autoTargetUntil = state.currentTime + 5000;
        log("🎯 TIKSLUS TAIKINYS! Rodomi tik taikinio balionai.");
        break;
    }
    flashLogHighlight();
  }

  // Augintinio sistema
  function updatePetVisual() {
    if (!dom.helperBody) return;
    
    if (state.pet.id === "default") {
      dom.helperBody.textContent = "🐾";
    } else {
      // Čia galima pridėti specifinius emoji arba sprite'us kiekvienam augintiniui
      dom.helperBody.textContent = "🐶"; // placeholder
    }
  }

  function getPetBonus() {
    const pet = PETS.find(p => p.id === state.pet.id);
    if (!pet) return {};
    
    switch(pet.id) {
      case "guardian":
        return { mistakeShield: 0.1 };
      case "collector":
        return { starBonus: 0.25 };
      case "warrior":
        return { bossDamage: 1 };
      default:
        return {};
    }
  }

  // Skill tree
  function loadSkills() {
    try {
      const raw = localStorage.getItem(STORAGE_SKILLS);
      if (raw) {
        state.skills = JSON.parse(raw);
      }
    } catch(e) {}
  }

  function saveSkills() {
    try {
      localStorage.setItem(STORAGE_SKILLS, JSON.stringify(state.skills));
    } catch(e) {}
  }

  function loadSkillPoints() {
    try {
      const raw = localStorage.getItem(STORAGE_SKILL_POINTS);
      if (raw !== null) {
        const val = parseInt(raw, 10);
        if (!isNaN(val)) state.skillPoints = val;
      }
    } catch(e) {}
  }

  function saveSkillPoints() {
    try {
      localStorage.setItem(STORAGE_SKILL_POINTS, String(state.skillPoints || 0));
    } catch(e) {}
  }

  function buySkill(branch, skillId) {
    const skill = SKILL_TREE[branch].skills.find(s => s.id === skillId);
    if (!skill) return false;

    const currentLevel = state.skills[skillId] || 0;
    if (currentLevel >= skill.maxLevel) return false;

    const cost = skill.cost;
    const currentPoints = state.skillPoints || 0;
    if (currentPoints < cost) return false;

    state.skillPoints = currentPoints - cost;
    saveSkillPoints();

    state.skills[skillId] = currentLevel + 1;
    saveSkills();
    applySkills();
    updateHUD();
    
    return true;
  }

  function applySkills() {
    // Gyvybės šaka
    state.maxLives = 3 + (state.skills.extra_life || 0);
    
    // Žalos šaka
    // (pritaikoma bosų kovose)
    
    // Specialiųjų šaka
    // (jau integruota į spawn logiką)
    
    // Ekonomikos šaka
    // (taikoma surinkus lygį)
  }

  // Challenge lygiai
  function startChallengeLevel() {
    const challengeKeys = Object.keys(CHALLENGE_MODES);
    const randomChallenge = challengeKeys[Math.floor(Math.random() * challengeKeys.length)];
    
    state.challengeMode = randomChallenge;
    state.challengeRules = CHALLENGE_MODES[randomChallenge];
    
    log(`🎯 ${state.challengeRules.name}: ${state.challengeRules.description}`);
    flashLogHighlight();
    
    // Specialus challenge HUD
    dom.body.classList.add("challenge-mode");
    
    if (state.challengeRules.rules.maxClicks) {
      state.challengeRules.rules.clicksLeft = state.challengeRules.rules.maxClicks;
    }
  }

  function endChallengeLevel() {
    state.challengeMode = null;
    state.challengeRules = null;
    dom.body.classList.remove("challenge-mode");
    state.counters.challengesCompleted++;
  }

  // Specialūs balionų efektai
  function handleSpecialBalloonEffect(type) {
    const now = state.currentTime;
    
    switch(type) {
      case "heart":
        if (state.lives < state.maxLives) {
          state.lives++;
          log("❤️ Gyvybė atstatyta!");
        }
        break;
      case "shield":
        state.effects.shieldUntil = Math.max(state.effects.shieldUntil, now + 8000);
        log("🛡️ Apsauga aktyvuota! Klaidos neatims gyvybių.");
        break;
      case "bomb":
        // Susprogdina artimiausius balionus
        const bombed = state.balloons.filter(b => 
          b.type === "normal" || b.type === "special"
        ).slice(0, 5); // 5 artimiausi
        
        bombed.forEach(b => {
          if (b.el) b.el.remove();
        });
        state.balloons = state.balloons.filter(b => !bombed.includes(b));
        log("💥 Bomba susprogdino kelis balionus!");
        break;
      case "auto_target":
        state.effects.autoTargetUntil = Math.max(state.effects.autoTargetUntil, now + 4000);
        log("🎯 Auto-target! Visi balionai skaičiuojami kaip teisingi.");
        break;
      case "color_changer":
        newTargetColor();
        log("🔁 Spalva pakeista!");
        break;
      case "skill_point":
        state.skillPoints = (state.skillPoints || 0) + 1;
        saveSkillPoints();
        log("✨ Gavai 1 skill tašką!");
        updateHUD();
        break;
      case "cursed":
        // Atsitiktinis neigiamas efektas
        const effects = [
          () => { log("☠️ Sumaišytos spalvos!"); /* čia reikėtų sumaišyti spalvas */ },
          () => { log("☠️ Taikinys paslėptas!"); if (dom.targetDot) dom.targetDot.style.opacity = "0.3"; setTimeout(() => { if (dom.targetDot) dom.targetDot.style.opacity = "1"; }, 3000); },
          () => { log("☠️ Kombo nunulintas!"); resetCombo(); }
        ];
        effects[Math.floor(Math.random() * effects.length)]();
        break;
    }
  }

  // Atnaujinta balionų spawn funkcija
  function spawnSpecialOrNormal(){
    if(state.bossActive) return;
    if(state.balloons.length>=state.maxBalloons) return;

    const specialChanceBase = 0.08;
    const specialChance = specialChanceBase + (state.skills.special_rate || 0) * 0.02;
    
    if(Math.random()<specialChance){
      spawnSpecialBalloon();
    }else{
      spawnNormalBalloon();
    }
  }

  function spawnSpecialBalloon(){
    const el=document.createElement("div");
    
    // Atsitiktinai parinkti specialų balioną pagal tikimybes
    let rand = Math.random();
    let cumulative = 0;
    let selectedType = SPECIAL_BALLOONS[0];
    
    for(const balloon of SPECIAL_BALLOONS){
      cumulative += balloon.chance;
      if(rand <= cumulative){
        selectedType = balloon;
        break;
      }
    }

    let cls="",label=selectedType.label;
    switch(selectedType.type){
      case "speed":cls="special-speed";break;
      case "slow":cls="special-slow";break;
      case "freeze":cls="special-freeze";break;
      case "wind":cls="special-wind";break;
      case "crystal":cls="special-crystal";break;
      case "heart":cls="special-heart";break;
      case "shield":cls="special-shield";break;
      case "bomb":cls="special-bomb";break;
      case "auto_target":cls="special-auto-target";break;
      case "color_changer":cls="special-color-changer";break;
      case "cursed":cls="special-cursed";break;
    }
    
    el.className="balloon "+cls;
    el.textContent=label;

    const rect=dom.gameArea.getBoundingClientRect();
    const x=Math.random()*(rect.width-50)+5;
    const y=-60;
    el.style.left=x+"px";
    el.style.top=y+"px";

    const obj={
      id:balloonIdCounter++,
      type:"special",
      effect:selectedType.type,
      el,
      x,
      y,
      speedY:0.09+Math.random()*0.04,
      driftPhase:Math.random()*Math.PI*2,
      driftSpeed:0.002+Math.random()*0.003,
      driftAmp:0.03+Math.random()*0.04
    };
    
    el.addEventListener("click",ev=>{
      ev.stopPropagation();
      if(!state.running || state.bossActive) return;
      handleSpecialClick(obj);
    });

    dom.gameArea.appendChild(el);
    state.balloons.push(obj);
  }

  function handleSpecialClick(b){
    if(b.el){
      b.el.classList.add("pop");
      setTimeout(()=>{
        if(b.el) b.el.remove();
      },60);
    }
    state.balloons = state.balloons.filter(x=>x.id!==b.id);

    handleSpecialBalloonEffect(b.effect);
    flashLogHighlight();
    
    if(b.effect === "crystal"){
      state.stars+=1;
      state.counters.starsEarned+=1;
      state.counters.crystalsCollected++;
    }
    
    checkAchievements();
    updateDailyOnEvent("balloonsPopped");
    updateHUD();
  }

  // Atnaujinta normalaus balionų paspaudimo logika
  function handleNormalClick(b){
    if(b.el){
      b.el.classList.add("pop");
      setTimeout(()=>{
        if(b.el) b.el.remove();
      },60);
    }
    state.balloons = state.balloons.filter(x=>x.id!==b.id);

    state.counters.balloonsPopped++;
    updateDailyOnEvent("balloonsPopped");

    let isCorrect = b.color === state.targetColor;
    
    // Challenge mode taisyklės
    if (state.challengeMode) {
      const rules = state.challengeRules.rules;
      
      if (rules.targetColorHarmful) {
        isCorrect = b.color !== state.targetColor;
      }
      
      if (rules.maxClicks) {
        rules.clicksLeft--;
        if (rules.clicksLeft <= 0) {
          // Baigėsi paspaudimai
          if (state.levelProgress < state.levelTarget) {
            gameOver("challenge_failed");
            return;
          }
        }
      }
    }

    if(isCorrect){
      // Fever režimo bonusas
      const multiplier = state.feverUntil > state.currentTime ? 2 : 1;
      
      state.score += 10 * multiplier;
      state.xp += 5 * multiplier;
      state.levelProgress++;
      addCombo();
      
      log("✅ Teisingas balionas! " + (multiplier > 1 ? " (FEVER!)" : ""));
      
      if(state.levelProgress>=state.levelTarget){
        levelCompleted();
      }
    } else {
      resetCombo();
      
      const shieldActive = state.effects.shieldUntil > state.currentTime;
      const petBonus = getPetBonus();
      const shieldChance = (state.upgrades?.mistakeShield || 0) * 0.12 + (petBonus.mistakeShield || 0);
      
      if((shieldActive || Math.random() < shieldChance) && !state.challengeMode){
        log("🛡 Klaida atleista – gyvybė nelabai nukentėjo.");
      }else{
        state.lives--;
        state.counters.damageTaken++;
        updateDailyOnEvent("damageTaken");
        flashDamage();
        log("❌ Neteisinga spalva.");
        if(state.lives<=0){
          updateHUD();
          gameOver("normal");
          return;
        }
      }
    }
    checkAchievements();
    updateHUD();
  }

  /* ==== ACHIEVEMENTS ==== */

  const ACHIEVEMENTS = [
    {
      id:"popper",
      title:"Balionų naikintojas",
      desc:"Susprogdink daug balionų.",
      type:"balloonsPopped",
      thresholds:[100,300,1000,3000,10000],
      rewards:[2,4,10,20,50]
    },
    {
      id:"level_climber",
      title:"Lygio laipiotojas",
      desc:"Pereik daug lygių.",
      type:"levelsCompleted",
      thresholds:[5,10,20,50,100],
      rewards:[2,5,10,20,40]
    },
    {
      id:"boss_hunter",
      title:"Boso medžiotojas",
      desc:"Nugalėk bosus.",
      type:"bossesDefeated",
      thresholds:[1,3,5,10],
      rewards:[5,10,20,40]
    },
    {
      id:"combo_master",
      title:"Combo Meistras",
      desc:"Pasiek didelius combo.",
      type:"maxCombo",
      thresholds:[10,25,50,100],
      rewards:[3,8,15,30]
    },
    {
      id:"challenge_expert",
      title:"Iššūkių Ekspertas",
      desc:"Įveik daug iššūkio lygių.",
      type:"challengesCompleted",
      thresholds:[3,10,25,50],
      rewards:[4,10,20,40]
    },
    {
      id:"tough",
      title:"Kietas riešutas",
      desc:"Ištverk daug žalos.",
      type:"damageTaken",
      thresholds:[10,30,80,150],
      rewards:[3,6,15,30]
    },
    {
      id:"crystal",
      title:"Kristalų radėjas",
      desc:"Surink kristalinius balionus.",
      type:"crystalsCollected",
      thresholds:[1,5,15,30],
      rewards:[3,8,18,35]
    },
    {
      id:"star_collector",
      title:"Žvaigždučių rinkėjas",
      desc:"Surink daug žvaigždučių iš visų šaltinių.",
      type:"starsEarned",
      thresholds:[20,60,150,350,800],
      rewards:[3,6,12,25,50]
    },
    {
      id:"runner",
      title:"Bėgikas",
      desc:"Sužaisk daug bandymų.",
      type:"runs",
      thresholds:[5,15,40,80],
      rewards:[2,5,12,25]
    }
  ];

  let achievementState = { meta:{} };

  function loadAchievements(){
    try{
      const raw = localStorage.getItem(STORAGE_ACH);
      if(raw){
        achievementState = JSON.parse(raw);
        if(!achievementState.meta) achievementState.meta = {};
      }
    }catch(e){}
  }
  function saveAchievements(){
    try{ localStorage.setItem(STORAGE_ACH,JSON.stringify(achievementState)); }catch(e){}
  }
  function getAchMeta(id){
    if(!achievementState.meta[id]){
      achievementState.meta[id]={unlocked:0,claimed:0};
    }
    return achievementState.meta[id];
  }
  function getAchProgress(ach){
    switch(ach.type){
      case "balloonsPopped": return state.counters.balloonsPopped;
      case "levelsCompleted": return state.counters.levelsCompleted;
      case "bossesDefeated": return state.counters.bossesDefeated;
      case "damageTaken": return state.counters.damageTaken;
      case "crystalsCollected": return state.counters.crystalsCollected;
      case "starsEarned": return state.counters.starsEarned;
      case "runs": return state.counters.runs;
      case "maxCombo": return state.counters.maxCombo;
      case "challengesCompleted": return state.counters.challengesCompleted;
      default: return 0;
    }
  }
  function notifyAch(ach,tier){
    const label = ROMAN[tier] || (tier+1);
    const reward = ach.rewards[tier] || 0;
    log(`🎉 Pasiekimas: ${ach.title} ${label} lygis! Gali atsiimti ⭐${reward}.`);
    flashLogHighlight();
  }
  function checkAchievements(){
    for(const ach of ACHIEVEMENTS){
      const meta=getAchMeta(ach.id);
      const progress = getAchProgress(ach);
      const nextIndex = meta.unlocked;
      if(nextIndex>=ach.thresholds.length) continue;
      if(progress>=ach.thresholds[nextIndex]){
        meta.unlocked = nextIndex+1;
        saveAchievements();
        notifyAch(ach,nextIndex);
      }
    }
  }
  function claimAchievementReward(achId){
    const ach = ACHIEVEMENTS.find(a=>a.id===achId);
    if(!ach) return;
    const meta=getAchMeta(achId);
    if(meta.claimed>=meta.unlocked) return;
    const tier = meta.claimed;
    const reward = ach.rewards[tier]||0;
    meta.claimed++;
    state.stars+=reward;
    state.counters.starsEarned+=reward;
    log(`⭐ Atsiėmei pasiekimą: ${ach.title} ${ROMAN[tier]||tier+1} (+${reward}⭐).`);
    flashLogHighlight();
    saveAchievements();
    updateHUD();
  }

  /* ==== UPGRADES ==== */

  const UPGRADES = [
    {
      id:"extraLife",
      title:"+Gyvybės",
      desc:"Padidina maksimalias širdeles (+1 už lygį).",
      maxLevel:3,
      costs:[5,10,20]
    },
    {
      id:"bossDamage",
      title:"Stipresni smūgiai bosui",
      desc:"Padidina vidutinę žalą bosui.",
      maxLevel:3,
      costs:[5,10,20]
    },
    {
      id:"mistakeShield",
      title:"Klaidos skydas",
      desc:"Šansas, kad neteisingas balionas neatims gyvybės.",
      maxLevel:3,
      costs:[5,10,20]
    },
    {
      id:"specialRate",
      title:"Daugiau specialių balionų",
      desc:"Padidina specialių balionų dažnį.",
      maxLevel:3,
      costs:[5,10,20]
    }
  ];

  function loadUpgrades(){
    try{
      const raw = localStorage.getItem(STORAGE_UPG);
      if(raw){
        const obj=JSON.parse(raw);
        if(obj && obj.extraLife!=null) state.upgrades=obj;
      }
    }catch(e){}
    // Inicijuoti upgrades jei jų nėra
    if (!state.upgrades) {
      state.upgrades = {
        extraLife: 0,
        bossDamage: 0,
        mistakeShield: 0,
        specialRate: 0
      };
    }
  }
  function saveUpgrades(){
    try{ localStorage.setItem(STORAGE_UPG,JSON.stringify(state.upgrades)); }catch(e){}
  }
  function applyUpgrades(){
    state.maxLives = 3 + (state.upgrades.extraLife || 0);
    if(state.lives>state.maxLives) state.lives=state.maxLives;
  }

  /* ==== DAILY: generuojam atsitiktines 3 misijas kas dieną ==== */

  const DAILY_POOL = [
    {
      idPrefix:"pop_easy",
      type:"balloonsPopped",
      min:40,max:80,
      text:"Susprogdink {n} balionų.",
      rewardPer:0.08, // ~3–6 žv.
    },
    {
      idPrefix:"pop_mid",
      type:"balloonsPopped",
      min:100,max:180,
      text:"Susprogdink {n} balionų vieną dieną.",
      rewardPer:0.06
    },
    {
      idPrefix:"lvl_easy",
      type:"levelsCompleted",
      min:3,max:6,
      text:"Pereik {n} lygius šiandien.",
      rewardPer:1.0
    },
    {
      idPrefix:"lvl_mid",
      type:"levelsCompleted",
      min:7,max:12,
      text:"Įveik {n} lygius per dieną.",
      rewardPer:0.8
    },
    {
      idPrefix:"boss_1",
      type:"bossesDefeated",
      min:1,max:1,
      text:"Nugalėk bent {n} bosą.",
      rewardPer:5.0
    },
    {
      idPrefix:"boss_2",
      type:"bossesDefeated",
      min:2,max:3,
      text:"Nugalėk {n} bosus vieną dieną.",
      rewardPer:4.0
    },
    {
      idPrefix:"dmg_tank",
      type:"damageTaken",
      min:5,max:12,
      text:"Atsilaikyk patirdamas bent {n} smūgius.",
      rewardPer:0.9
    }
  ];

  const STORAGE_DAILY_VERSION = 3; // atnaujinta versija

  function genDailyMissions(){
    const missions=[];
    const used = new Set();
    while(missions.length<3 && used.size<DAILY_POOL.length){
      const idx = randInt(0,DAILY_POOL.length-1);
      if(used.has(idx)) continue;
      used.add(idx);
      const tpl = DAILY_POOL[idx];
      const n = randInt(tpl.min,tpl.max);
      const text = tpl.text.replace("{n}",n);
      const reward = Math.max(3, Math.round(n*tpl.rewardPer));
      missions.push({
        id: tpl.idPrefix+"_"+todayStr(),
        type: tpl.type,
        text,
        target:n,
        progress:0,
        reward,
        claimed:false
      });
    }
    return missions;
  }

  function loadDaily(){
    try{
      const raw = localStorage.getItem(STORAGE_DAILY);
      if(raw){
        const obj=JSON.parse(raw);
        if(obj && obj.date===todayStr() && obj.version===STORAGE_DAILY_VERSION){
          state.daily=obj;
          return;
        }
      }
    }catch(e){}
    state.daily = {
      version: STORAGE_DAILY_VERSION,
      date: todayStr(),
      missions: genDailyMissions()
    };
    saveDaily();
  }
  function saveDaily(){
    try{ localStorage.setItem(STORAGE_DAILY,JSON.stringify(state.daily)); }catch(e){}
  }

  function updateDailyOnEvent(ev){
    if(!state.daily) return;
    for(const m of state.daily.missions){
      if(m.claimed) continue;
      if(m.type===ev){
        if(m.progress<m.target){
          m.progress++;
        }
      }
    }
    saveDaily();
  }

  function claimDaily(id){
    if(!state.daily) return;
    const m=state.daily.missions.find(x=>x.id===id);
    if(!m || m.claimed) return;
    if(m.progress<m.target) return;
    m.claimed=true;
    state.stars+=m.reward;
    state.counters.starsEarned+=m.reward;
    log(`⭐ Dienos užduotis: ${m.text} (+${m.reward}⭐).`);
    flashLogHighlight();
    saveDaily();
    updateHUD();
  }

  /* ==== STATISTIKA ==== */

  function loadStats(){
    try{
      const raw=localStorage.getItem(STORAGE_STATS);
      if(raw){
        const obj=JSON.parse(raw);
        if(obj && obj.counters){
          Object.assign(state.counters,obj.counters);
          state.statsTimeMs = obj.timeMs||0;
          state.bestLevel = obj.bestLevel||1;
        }
      }
    }catch(e){}
  }
  function saveStats(){
    try{
      localStorage.setItem(STORAGE_STATS,JSON.stringify({
        counters: state.counters,
        timeMs: state.statsTimeMs,
        bestLevel: state.bestLevel
      }));
    }catch(e){}
  }

  /* ==== BALIONAI (tęsinys) ==== */

  function spawnNormalBalloon(){
    const color = COLORS[Math.floor(Math.random()*COLORS.length)];
    const el=document.createElement("div");
    el.className="balloon color-"+color;
    if(color===state.targetColor) el.classList.add("target-main");

    const rect=dom.gameArea.getBoundingClientRect();
    const x=Math.random()*(rect.width-50)+5;
    const y=-60;
    el.style.left=x+"px";
    el.style.top=y+"px";

    const obj={
      id:balloonIdCounter++,
      type:"normal",
      color,
      el,
      x,
      y,
      speedY:0.09+Math.random()*0.04,
      driftPhase:Math.random()*Math.PI*2,
      driftSpeed:0.002+Math.random()*0.003,
      driftAmp:0.03+Math.random()*0.04
    };

    el.addEventListener("click",ev=>{
      ev.stopPropagation();
      if(!state.running || state.bossActive) return;
      handleNormalClick(obj);
    });

    dom.gameArea.appendChild(el);
    state.balloons.push(obj);
  }

  function spawnBossMinion(ts){
    if(!state.bossActive) return;
    const now = ts || performance.now();
    const b=state.boss;
    if(now - b.lastMinionSpawn < b.minionSpawnInterval) return;
    b.lastMinionSpawn = now;

    const el=document.createElement("div");
    const color = COLORS[Math.floor(Math.random()*COLORS.length)];
    el.className="balloon boss-minion color-"+color;

    const areaRect=dom.gameArea.getBoundingClientRect();
    const bossRect=dom.bossEntity.getBoundingClientRect();
    const x = bossRect.left+bossRect.width/2 - areaRect.left + (Math.random()*40-20);
    const y = bossRect.bottom - areaRect.top - 8;
    el.style.left=x+"px";
    el.style.top=y+"px";

    const ratio=b.hp/b.hpMax;
    let speedBase=0.09+state.level*0.003;
    if(ratio<=0.66 && ratio>0.33) speedBase+=0.03;
    else if(ratio<=0.33) speedBase+=0.06;

    const obj={
      id:balloonIdCounter++,
      type:"boss-minion",
      color,
      el,
      x,
      y,
      speedY:speedBase
    };

    el.addEventListener("click",ev=>{
      ev.stopPropagation();
      if(!state.running || !state.bossActive) return;
      handleBossMinionClick(obj);
    });

    dom.gameArea.appendChild(el);
    state.balloons.push(obj);
  }

  function handleBossMinionClick(b){
    if(b.el){
      b.el.classList.add("pop");
      setTimeout(()=>{
        if(b.el) b.el.remove();
      },60);
    }
    state.balloons = state.balloons.filter(x=>x.id!==b.id);

    state.boss.minionsPopped++;
    state.counters.balloonsPopped++;
    updateDailyOnEvent("balloonsPopped");
    checkAchievements();

    const count = state.boss.minionsPopped;
    if(count%10===0){
      const now=performance.now();
      state.boss.hitboxActive=true;
      state.boss.hitboxWindowUntil=now+2000;
      dom.bossHitbox.classList.add("active");
      dom.bossTip.textContent="Dabar! Spausk raudoną kontūrą aplink bosą!";
    }else{
      dom.bossTip.textContent="Sprogdink jo balionus. Kas 10 – silpna vieta.";
    }
  }

  function handleBossHit(){
    if(!state.bossActive) return;
    const b=state.boss;
    if(!b.hitboxActive) return;
    b.hitboxActive=false;
    dom.bossHitbox.classList.remove("active");

    let dmg = 0;
    if(Math.random()<0.85){
      dmg=1+Math.floor(Math.random()*15);
      dmg += (state.upgrades?.bossDamage || 0)*2;
      // Pet bonusas
      const petBonus = getPetBonus();
      dmg += (petBonus.bossDamage || 0);
    }

    if(dmg===0){
      log("⚠ Bosui žalos nepadarei.");
      dom.bossTip.textContent="Šį kartą nepataikei – sprogdink dar balionus.";
      return;
    }

    const now = performance.now();
    
    // Shock efektas pirmam hit'ui arba dideliam damage
    if (b.hp === b.hpMax || dmg > 10) {
      bossSprite.shockUntil = now + 500;
    }
    
    // Hit efektas
    bossSprite.hitUntil = now + 300;
    
    b.hp=Math.max(0,b.hp-dmg);
    log(`💥 Bosui atimta ${dmg} HP.`);
    dom.bossTip.textContent="Puikus smūgis! Toliau sprogdink jo balionus.";

    if(b.hp<=0){
      bossDefeated();
    }else{
      updateBossHUD();
    }
  }

  function bossPlayerHit(){
    const b=state.boss;
    b.playerHp=Math.max(0,b.playerHp-1);
    state.counters.damageTaken++;
    updateDailyOnEvent("damageTaken");
    flashDamage();
    log("😵 Bosas pataikė. -1 HP.");
    updateBossHUD();
    checkAchievements();
    if(b.playerHp<=0) gameOver("boss");
  }

  function newTargetColor(){
    let nc=state.targetColor;
    while(nc===state.targetColor){
      nc = COLORS[Math.floor(Math.random()*COLORS.length)];
    }
    state.targetColor = nc;
  }

  function levelCompleted(){
    state.counters.levelsCompleted++;
    updateDailyOnEvent("levelsCompleted");
    state.level++;
    if(state.level>state.bestLevel){
      state.bestLevel = state.level;
      saveStats();
    }
    state.levelProgress=0;
    state.levelTarget=calcLevelTarget(state.level);
    newTargetColor();

    clearBalloons();
    state.spawnInterval=calcSpawnInterval(state.level);
    state.maxBalloons=10+Math.floor(state.level*0.7);

    checkAchievements();

    // Patikrinti ar tai challenge lygis
    if(isChallengeLevel(state.level)){
      updateHUD();
      startChallengeLevel();
      return;
    }

    if(isBossLevel(state.level)){
      updateHUD();
      startBossFight();
      return;
    }

    log("⬆ Pereita į "+state.level+" lygį!");
    updateHUD();
  }

  function startBossFight(){
    state.bossActive=true;
    clearBalloons();
    dom.body.classList.add("boss-mode");

    const baseHp = 100 + Math.floor((state.level-10)*4);
    const basePlayerHp = 10 + (state.upgrades?.extraLife || 0);

    state.boss.hpMax = baseHp;
    state.boss.hp = baseHp;
    state.boss.playerHpMax = basePlayerHp;
    state.boss.playerHp = basePlayerHp;
    state.boss.minionsPopped=0;
    state.boss.lastMinionSpawn=0;
    state.boss.minionSpawnInterval=1200;
    state.boss.hitboxActive=false;
    state.boss.hitboxWindowUntil=0;

    const rect=dom.gameArea.getBoundingClientRect();
    state.boss.posX = rect.width/2;
    dom.bossEntity.style.left = (rect.width/2)+"px";

    dom.bossName.textContent = 
      state.level === 10 ? "❄ Ledo bosas" : 
      state.level === 20 ? "🔥 Ugnies bosas" : 
      state.level === 30 ? "⚡ Žaibo bosas" : 
      "👹 Mega bosas";
    dom.bossTip.textContent="Sprogdink boso balionus. Kas 10 – smūgis į silpną vietą.";

    bossSprite.baseFrame = 0;
    bossSprite.currentFrame = 0;
    bossSprite.nextBlinkAt = 0;
    bossSprite.blinkUntil = 0;
    bossSprite.hitUntil = 0;
    bossSprite.shockUntil = 0;
    dom.bossEntity.classList.add("float");

    updateBossHUD();
    log("⚔ Prasidėjo "+state.level+" lygio boso kova!");
  }

  function bossDefeated(){
    const skillReward = 2;
    state.skillPoints = (state.skillPoints || 0) + skillReward;
    saveSkillPoints();
    log("👑 Bosas nugalėtas! +5⭐ ir +" + skillReward + " skill taškai!");
    state.stars+=5;
    state.counters.starsEarned+=5;
    state.xp+=50;
    state.counters.bossesDefeated++;
    updateDailyOnEvent("bossesDefeated");
    checkAchievements();

    const nextLevel = state.level + 1;
    state.checkpoint = nextLevel;

    state.level = nextLevel;
    if(state.level>state.bestLevel){
      state.bestLevel=state.level;
      saveStats();
    }
    state.levelProgress=0;
    state.levelTarget=calcLevelTarget(state.level);
    newTargetColor();

    state.bossActive=false;
    clearBalloons();
    dom.body.classList.remove("boss-mode");
    dom.bossEntity.classList.remove("float");
    updateBossHUD();
    log("🎉 Bosas įveiktas! Checkpoint: "+state.checkpoint+" lygis.");
    updateHUD();
  }

  function gameOver(reason){
    state.running=false;
    state.bossActive=false;
    clearBalloons();
    dom.body.classList.remove("boss-mode");
    dom.bossEntity.classList.remove("float");
    updateBossHUD();
    updateCriticalVisual();
    saveStats();

    // Atnaujinti max combo
    state.counters.maxCombo = Math.max(state.counters.maxCombo, state.maxCombo);

    dom.startOverlay.style.display="none";
    dom.gameOverOverlay.style.display="flex";
    dom.goLevel.textContent = state.level;
    dom.goStars.textContent = state.stars;
    dom.goBestLevel.textContent = state.bestLevel;
    if (dom.goMaxCombo) {
      dom.goMaxCombo.textContent = state.maxCombo;
    }
  }

  /* ==== BOSO SPRITE ANIMACIJOS ==== */

  function updateBossVisualStage(){
    const b=state.boss;
    if (!dom.bossEntity) return;
    dom.bossEntity.classList.remove("stage1","stage2","stage3");
    if(!state.bossActive || !b.hpMax) return;
    const r=b.hp/b.hpMax;
    if(r>0.66) dom.bossEntity.classList.add("stage1");
    else if(r>0.33) dom.bossEntity.classList.add("stage2");
    else dom.bossEntity.classList.add("stage3");
  }

  function updateBossSprite(ts){
    if (!state.bossActive || !state.boss || !state.boss.hpMax) return;
    const now = ts || performance.now();
    const ratio = state.boss.hp / state.boss.hpMax;

    // Nustatome bazinį kadrą pagal HP
    if (ratio > 0.66) {
      bossSprite.baseFrame = 0; // Phase 1
    } else if (ratio > 0.33) {
      bossSprite.baseFrame = 3; // Phase 2
    } else if (ratio > 0.1) {
      bossSprite.baseFrame = 6; // Phase 3
    } else {
      bossSprite.baseFrame = 11; // Ice crack (labai mažai HP)
    }

    // Hit animacija turi pirmenybę
    if (now < bossSprite.hitUntil) {
      bossSprite.currentFrame = 9; // hit frame
    } 
    // Shock animacija (pirmas hit arba kritinis žala)
    else if (now < bossSprite.shockUntil) {
      bossSprite.currentFrame = 10; // shock frame
    }
    // Mirksėjimo animacija
    else {
      if (bossSprite.nextBlinkAt === 0) {
        bossSprite.nextBlinkAt = now + 1500 + Math.random() * 2000;
      }
      
      if (now > bossSprite.blinkUntil && now > bossSprite.nextBlinkAt) {
        bossSprite.blinkUntil = now + 160;
        bossSprite.nextBlinkAt = now + 2500 + Math.random() * 2000;
        bossSprite.currentFrame = bossSprite.baseFrame + 1; // half blink
      } else if (now > bossSprite.blinkUntil) {
        bossSprite.currentFrame = bossSprite.baseFrame; // normal
      }
    }

    const frameFile = BOSS_ICE_FRAMES[bossSprite.currentFrame] || BOSS_ICE_FRAMES[0];
    if (dom.bossEntity) {
      dom.bossEntity.style.backgroundImage = `url("${frameFile}")`;
    }
  }

  function updateBossHUD(){
    if(!state.bossActive){
      if (dom.bossOverlay) dom.bossOverlay.classList.remove("active");
      dom.body.classList.remove("boss-mode");
      if (dom.playerHpWrap) dom.playerHpWrap.classList.remove("active");
      if (dom.progressWrap) dom.progressWrap.style.opacity="1";
      if (dom.livesWrap) dom.livesWrap.style.display="flex";
      return;
    }
    
    if (dom.bossOverlay) dom.bossOverlay.classList.add("active");
    dom.body.classList.add("boss-mode");
    if (dom.livesWrap) dom.livesWrap.style.display="none";
    if (dom.progressWrap) dom.progressWrap.style.opacity="0";

    const b=state.boss;
    const pctBoss=b.hpMax?Math.max(0,Math.min(100,(b.hp/b.hpMax)*100)):0;
    if (dom.bossHpFill) dom.bossHpFill.style.width=pctBoss+"%";
    if (dom.bossHpValue) dom.bossHpValue.textContent=`${Math.max(0,Math.round(b.hp))}/${b.hpMax}`;

    if (dom.playerHpWrap) dom.playerHpWrap.classList.add("active");
    const pctPlayer=b.playerHpMax?Math.max(0,Math.min(100,(b.playerHp/b.playerHpMax)*100)):0;
    if (dom.playerHpFill) dom.playerHpFill.style.width=pctPlayer+"%";
    if (dom.playerHpValue) dom.playerHpValue.textContent=`${Math.max(0,b.playerHp)}/${b.playerHpMax}`;

    updateBossVisualStage();
  }

  /* ==== HUD ATNAUJINIMAS ==== */

  function updateHUD(){


    if (dom.menuStars) dom.menuStars.textContent = state.stars;
    if (dom.menuPoints) dom.menuPoints.textContent = state.skillPoints || 0;
    if (dom.menuBestLevel) dom.menuBestLevel.textContent = state.bestLevel;
    if (dom.statStars) dom.statStars.textContent = state.stars;
    if (dom.statXp) dom.statXp.textContent = state.xp;
    if (dom.statBestLevel) dom.statBestLevel.textContent = state.bestLevel;
    if (dom.statSkill) dom.statSkill.textContent = state.skillPoints || 0;

    if (dom.livesWrap){
      dom.livesWrap.innerHTML="";
      for(let i=0;i<state.maxLives;i++){
        const d=document.createElement("div");
        d.className="heart";
        if(i>=state.lives) d.classList.add("empty");
        dom.livesWrap.appendChild(d);
      }
    }

    if (dom.targetDot) dom.targetDot.style.background = COLOR_HEX[state.targetColor];
    if (dom.levelLabel) dom.levelLabel.textContent = state.level+" lygis";

    const pct = Math.max(0,Math.min(100,(state.levelProgress/state.levelTarget)*100));
    if (dom.progressFill) dom.progressFill.style.width=pct+"%";

    recomputeWorld();
    updateBossHUD();
    updateCriticalVisual();
    updateComboDisplay();
    updateUltButtons();
  }


  /* ==== ŽAIDĖJAS IR KULKOS (APAČIOJE) ==== */

  function initPlayer(){
    if(!dom.gameArea || !dom.player) return;
    const rect = dom.gameArea.getBoundingClientRect();
    state.player.x = rect.width/2 - state.player.width/2;
    state.player.y = rect.height - state.player.height - 10;
    dom.player.style.width = state.player.width + "px";
    dom.player.style.height = state.player.height + "px";
    dom.player.style.left = state.player.x + "px";
    dom.player.style.top = state.player.y + "px";
  }

  function shootBullet(){
    if(!state.running || !dom.gameArea) return;
    const now = state.currentTime || performance.now();
    if(now - state.lastShotTime < 180) return; // paprastas cooldown
    state.lastShotTime = now;

    const rect = dom.gameArea.getBoundingClientRect();
    const bulletEl = document.createElement("div");
    bulletEl.className = "bullet";

    const startX = state.player.x + state.player.width/2 - 3;
    const startY = state.player.y - 14;

    bulletEl.style.left = startX + "px";
    bulletEl.style.top = startY + "px";

    dom.gameArea.appendChild(bulletEl);

    state.bullets.push({
      x: startX,
      y: startY,
      speedY: -0.6, // juda į viršų (px/ms)
      el: bulletEl
    });
  }

  function updatePlayerAndBullets(dt){
    if(!dom.gameArea) return;
    const rect = dom.gameArea.getBoundingClientRect();

    // Žaidėjo judėjimas apačioje
    const move = state.player.speed * dt;
    if(state.input.left) state.player.x -= move;
    if(state.input.right) state.player.x += move;

    const minX = 5;
    const maxX = rect.width - state.player.width - 5;
    if(state.player.x < minX) state.player.x = minX;
    if(state.player.x > maxX) state.player.x = maxX;

    // Žaidėjas laikomas pačiame apačioje
    state.player.y = rect.height - state.player.height - 10;

    if(dom.player){
      dom.player.style.left = state.player.x + "px";
      dom.player.style.top = state.player.y + "px";
    }

    // Kulkų atnaujinimas ir kolizijos su balionais
    const remainingBullets = [];
    const topLimit = -30;

    for(const bullet of state.bullets){
      bullet.y += bullet.speedY * dt;
      if(bullet.el){
        bullet.el.style.top = bullet.y + "px";
      }

      if(bullet.y < topLimit){
        if(bullet.el) bullet.el.remove();
        continue;
      }

      let hit = false;
      for(const b of [...state.balloons]){
        if(!b.el) continue;
        // Paprasta stačiakampių kolizija
        const bx = b.x;
        const by = b.y;
        const bw = 40;
        const bh = 58;

        const bullX1 = bullet.x;
        const bullY1 = bullet.y;
        const bullX2 = bullX1 + 6;
        const bullY2 = bullY1 + 14;

        if(bullX1 < bx + bw && bullX2 > bx && bullY1 < by + bh && bullY2 > by){
          hit = true;
          if(b.type === "normal"){
            handleNormalClick(b);
          } else if(b.type === "special"){
            handleSpecialClick(b);
          } else if(b.type === "boss-minion"){
            handleBossMinionClick(b);
          }
          break;
        }
      }

      if(hit){
        if(bullet.el) bullet.el.remove();
      }else{
        remainingBullets.push(bullet);
      }
    }

    state.bullets = remainingBullets;
  }

  /* ==== ANIMACIJOS CIKLAS ==== */

  function updateFrame(ts){
    state.currentTime = ts;
    const dt = ts - state.lastFrame;
    state.lastFrame = ts;

    if(state.running){
      state.statsTimeMs += dt;

      if(!state.bossActive && !state.challengeMode){
        if(ts - state.lastSpawnTime > state.spawnInterval){
          state.lastSpawnTime = ts;
          spawnSpecialOrNormal();
        }

        const rect=dom.gameArea.getBoundingClientRect();
        const bottom=rect.height+80;
        const minX=5;
        const maxX=rect.width-45;

        const now=ts;
        let speedMul=1;
        if(state.effects.speedUpUntil>now) speedMul*=1.6;
        if(state.effects.slowUntil>now) speedMul*=0.5;
        const frozen = state.effects.freezeUntil>now;
        const windBoost = state.effects.windUntil>now ? 3 : 1;

        for(const b of [...state.balloons]){
          if(b.type==="normal" || b.type==="special"){
            b.driftPhase += b.driftSpeed*dt;
            const amp=b.driftAmp*windBoost;
            b.x += Math.sin(b.driftPhase)*amp*dt;
            if(b.x<minX)b.x=minX;
            if(b.x>maxX)b.x=maxX;
            if(b.el) b.el.style.left=b.x+"px";
          }
          if(!frozen){
            b.y += b.speedY*dt*speedMul;
            if(b.el) b.el.style.top=b.y+"px";
          }
          if(b.y>bottom){
            if(b.type==="normal" && b.color===state.targetColor && !state.challengeMode){
              state.lives--;
              state.counters.damageTaken++;
              updateDailyOnEvent("damageTaken");
              flashDamage();
              log("⚠ Praleistas taikinio balionas. -1 gyvybė.");
              if(state.lives<=0){
                updateHUD();
                gameOver("normal");
                break;
              }
            }
            if(b.el) b.el.remove();
            state.balloons=state.balloons.filter(x=>x.id!==b.id);
          }
        }
        updateHUD();
      } else if (state.bossActive) {
        // Boso kovos logika
        const b=state.boss;
        const rect=dom.gameArea.getBoundingClientRect();
        const width=rect.width;
        const bossWidth=160;
        let bx=b.posX || width/2;

        const ratio=b.hp/b.hpMax;
        if(ratio<=0.66 && ratio>0.33){
          b.speed=0.08;
          b.minionSpawnInterval=900;
        }else if(ratio<=0.33){
          b.speed=0.11;
          b.minionSpawnInterval=650;
        }else{
          b.speed=0.06;
          b.minionSpawnInterval=1200;
        }

        bx += b.dir * b.speed * dt;
        const half=bossWidth/2;
        if(bx<half){bx=half;b.dir=1;}
        if(bx>width-half){bx=width-half;b.dir=-1;}
        b.posX=bx;
        if (dom.bossEntity) dom.bossEntity.style.left=bx+"px";

        spawnBossMinion(ts);

        const bottom=rect.height+70;
        for(const bb of [...state.balloons]){
          if(bb.type!=="boss-minion") continue;
          bb.y += bb.speedY*dt;
          if(bb.el) bb.el.style.top=bb.y+"px";
          if(bb.y>bottom){
            if(bb.el) bb.el.remove();
            state.balloons=state.balloons.filter(x=>x.id!==bb.id);
            bossPlayerHit();
          }
        }

        if(b.hitboxActive && ts>b.hitboxWindowUntil){
          b.hitboxActive=false;
          if (dom.bossHitbox) dom.bossHitbox.classList.remove("active");
          if (dom.bossTip) dom.bossTip.textContent="Pavėlavai. Sprogdink dar 10 balionų.";
        }
        updateBossHUD();
        updateBossSprite(ts);
      } else if (state.challengeMode) {
        // Challenge lygio logika
        if(ts - state.lastSpawnTime > state.spawnInterval){
          state.lastSpawnTime = ts;
          spawnSpecialOrNormal();
        }

        const rect=dom.gameArea.getBoundingClientRect();
        const bottom=rect.height+80;
        const minX=5;
        const maxX=rect.width-45;

        for(const b of [...state.balloons]){
          if(b.type==="normal" || b.type==="special"){
            b.driftPhase += b.driftSpeed*dt;
            const amp=b.driftAmp;
            b.x += Math.sin(b.driftPhase)*amp*dt;
            if(b.x<minX)b.x=minX;
            if(b.x>maxX)b.x=maxX;
            if(b.el) b.el.style.left=b.x+"px";
          }
          b.y += b.speedY*dt;
          if(b.el) b.el.style.top=b.y+"px";
          
          if(b.y>bottom){
            if(b.el) b.el.remove();
            state.balloons=state.balloons.filter(x=>x.id!==b.id);
          }
        }
        updateHUD();
      }
      // Žaidėjo ir kulkų atnaujinimas (veikia visų režimų metu)
      updatePlayerAndBullets(dt);
    }

    requestAnimationFrame(updateFrame);
  }

  /* ==== PAUZĖ ==== */

  function togglePause(){
    if(state.running){
      state.running = false;
      dom.pauseOverlay.style.display = "flex";
    } else {
      state.running = true;
      state.lastFrame = performance.now();
      dom.pauseOverlay.style.display = "none";
    }
  }

  /* ==== PANELĖS / MENIU ==== */

  function toggleBottomMenu(){
    if (dom.mainMenu.classList.contains("open")) {
      dom.mainMenu.classList.remove("open");
      dom.menuPanel.style.display = "none";
      dom.mainMenu.dataset.returnAfterPanel = "";
    } else {
      dom.mainMenu.classList.add("open");
    }
  }

  function openPanel(title,html){
    dom.menuPanelTitle.textContent=title;
    dom.menuPanelContent.innerHTML=html;
    dom.menuPanel.style.display="block";

    if (dom.mainMenu.classList.contains("open")) {
      dom.mainMenu.classList.remove("open");
      dom.mainMenu.dataset.returnAfterPanel = "1";
    } else {
      dom.mainMenu.dataset.returnAfterPanel = "";
    }
  }

  function closePanel(){
    dom.menuPanel.style.display="none";
    if (dom.mainMenu.dataset.returnAfterPanel === "1") {
      dom.mainMenu.classList.add("open");
      dom.mainMenu.dataset.returnAfterPanel = "";
    }
  }

  function openSkillsPanel(){
    let html = `<div class="skill-tree">`;
    
    for(const [branchKey, branch] of Object.entries(SKILL_TREE)){
      html += `<div class="skill-branch">
        <div class="skill-branch-title">${branch.name}</div>
        <div class="skill-list">`;
      
      for(const skill of branch.skills){
        const currentLevel = state.skills[skill.id] || 0;
        const canLevel = currentLevel < skill.maxLevel;
        const cost = canLevel ? skill.cost : "-";
        
        html += `
          <div class="skill-item">
            <div class="skill-name">${skill.name} (${currentLevel}/${skill.maxLevel})</div>
            <div class="skill-desc">${skill.effect}</div>
            <div class="skill-meta">
              <span>Kaina: ✨${cost}</span>
              <span>Turite: ✨${state.skillPoints || 0}</span>
            </div>
            <div class="skill-actions">
              <button class="skill-buy" data-branch="${branchKey}" data-skill="${skill.id}" 
                ${(!canLevel || (state.skillPoints || 0) < cost) ? "disabled" : ""}>
                ${canLevel ? "Pirkti" : "Max"}
              </button>
            </div>
          </div>`;
      }
      
      html += `</div></div>`;
    }
    
    html += `</div>`;
    openPanel("Skill Tree", html);

    dom.menuPanelContent.onclick = (ev) => {
      const btn = ev.target.closest(".skill-buy");
      if(!btn || btn.disabled) return;
      
      const branch = btn.dataset.branch;
      const skillId = btn.dataset.skill;
      
      if(buySkill(branch, skillId)){
        openSkillsPanel(); // Refresh
      }
    };
  }

  function openPetsPanel(){
    let html = `<div class="pet-list">`;
    
    for(const pet of PETS){
      const isSelected = state.pet.id === pet.id;
      const canBuy = state.stars >= pet.cost && !isSelected;
      
      html += `
        <div class="pet-item ${isSelected ? 'selected' : ''}" data-pet-id="${pet.id}">
          <div class="pet-icon">${getPetEmoji(pet.id)}</div>
          <div class="pet-name">${pet.name}</div>
          <div class="pet-rarity">${getRarityText(pet.rarity)}</div>
          <div class="pet-bonus">${pet.bonus}</div>
          <div class="pet-cost">${pet.cost > 0 ? `⭐${pet.cost}` : 'Nemokama'}</div>
          ${!isSelected ? `
            <button class="pet-buy" ${!canBuy ? 'disabled' : ''}>
              ${canBuy ? 'Pirkti' : 'Per mažai žvaigždučių'}
            </button>
          ` : '<div class="pet-selected">Pasirinktas</div>'}
        </div>`;
    }
    
    html += `</div>`;
    openPanel("Augintiniai", html);

    dom.menuPanelContent.onclick = (ev) => {
      const buyBtn = ev.target.closest(".pet-buy");
      if(buyBtn && !buyBtn.disabled){
        const petItem = buyBtn.closest(".pet-item");
        const petId = petItem.dataset.petId;
        const pet = PETS.find(p => p.id === petId);
        
        if(pet && state.stars >= pet.cost){
          state.stars -= pet.cost;
          state.pet.id = petId;
          savePet();
          updatePetVisual();
          updateHUD();
          openPetsPanel(); // Refresh
        }
      }
    };
  }

  function getPetEmoji(petId){
    switch(petId){
      case "default": return "🐾";
      case "guardian": return "🛡️";
      case "collector": return "⭐";
      case "warrior": return "⚔️";
      default: return "🐾";
    }
  }

  function getRarityText(rarity){
    switch(rarity){
      case "common": return "Įprastas";
      case "rare": return "Retas";
      case "epic": return "Epic";
      case "legendary": return "Legendinis";
      default: return "Įprastas";
    }
  }

  function openSkinsPanel(){
    let html = `
      <div class="skin-category">
        <div class="skin-category-title">Balionų Skinai</div>
        <div class="skin-list">`;
    
    for(const skin of BALLOON_SKINS){
      const isSelected = state.skins.balloon === skin.id;
      const canBuy = state.stars >= skin.cost && !isSelected;
      
      html += `
        <div class="skin-item ${isSelected ? 'selected' : ''}" data-skin-type="balloon" data-skin-id="${skin.id}">
          <div class="skin-name">${skin.name}</div>
          <div class="skin-cost">${skin.cost > 0 ? `⭐${skin.cost}` : 'Nemokama'}</div>
          ${!isSelected ? `
            <button class="skin-buy" ${!canBuy ? 'disabled' : ''}>
              ${canBuy ? 'Pirkti' : 'Per mažai žvaigždučių'}
            </button>
          ` : '<div class="skin-selected">Naudojamas</div>'}
        </div>`;
    }
    
    html += `
        </div>
      </div>
      <div class="skin-category">
        <div class="skin-category-title">Fonų Skinai</div>
        <div class="skin-list">`;
    
    for(const skin of BACKGROUND_SKINS){
      const isSelected = state.skins.background === skin.id;
      const canBuy = state.stars >= skin.cost && !isSelected;
      
      html += `
        <div class="skin-item ${isSelected ? 'selected' : ''}" data-skin-type="background" data-skin-id="${skin.id}">
          <div class="skin-name">${skin.name}</div>
          <div class="skin-cost">${skin.cost > 0 ? `⭐${skin.cost}` : 'Nemokama'}</div>
          ${!isSelected ? `
            <button class="skin-buy" ${!canBuy ? 'disabled' : ''}>
              ${canBuy ? 'Pirkti' : 'Per mažai žvaigždučių'}
            </button>
          ` : '<div class="skin-selected">Naudojamas</div>'}
        </div>`;
    }
    
    html += `</div></div>`;
    openPanel("Skin'ai", html);

    dom.menuPanelContent.onclick = (ev) => {
      const buyBtn = ev.target.closest(".skin-buy");
      if(buyBtn && !buyBtn.disabled){
        const skinItem = buyBtn.closest(".skin-item");
        const skinType = skinItem.dataset.skinType;
        const skinId = skinItem.dataset.skinId;
        
        let skin;
        if(skinType === "balloon"){
          skin = BALLOON_SKINS.find(s => s.id === skinId);
        } else {
          skin = BACKGROUND_SKINS.find(s => s.id === skinId);
        }
        
        if(skin && state.stars >= skin.cost){
          state.stars -= skin.cost;
          state.skins[skinType] = skinId;
          saveSkins();
          recomputeWorld();
          updateHUD();
          openSkinsPanel(); // Refresh
        }
      }
    };
  }

  function openQuestsPanel(){
    let html = `<div class="quest-list">`;
    
    // Savaitės questai
    if(state.weekly){
      for(const quest of state.weekly.quests){
        const progress = getQuestProgress(quest);
        const pct = Math.max(0, Math.min(100, (progress / quest.target) * 100));
        const canClaim = progress >= quest.target && !quest.claimed;
        
        html += `
          <div class="quest-item">
            <div class="quest-title">${quest.title}</div>
            <div class="quest-desc">${quest.desc}</div>
            <div class="quest-progress">Progresas: ${progress}/${quest.target} (${pct.toFixed(0)}%)</div>
            <div class="quest-reward">Apdovanojimas: ⭐${quest.reward}</div>
            <div class="quest-actions">
              <button class="quest-claim" data-quest-id="${quest.id}" ${canClaim ? '' : 'disabled'}>
                ${quest.claimed ? 'Atsiimta' : 'Atsiimti'}
              </button>
            </div>
          </div>`;
      }
    }
    
    html += `</div>`;
    openPanel("Misijos", html);

    dom.menuPanelContent.onclick = (ev) => {
      const claimBtn = ev.target.closest(".quest-claim");
      if(claimBtn && !claimBtn.disabled){
        const questId = claimBtn.dataset.questId;
        claimQuest(questId);
        openQuestsPanel(); // Refresh
      }
    };
  }

  function openLeaderboardPanel(){
    let html = `
      <div class="leaderboard-tabs">
        <div class="leaderboard-tab active" data-tab="levels">Lygiai</div>
        <div class="leaderboard-tab" data-tab="combo">Combo</div>
        <div class="leaderboard-tab" data-tab="score">Taškai</div>
      </div>
      <div class="leaderboard-list" id="leaderboard-content">
        ${generateLeaderboardHTML('levels')}
      </div>`;
    
    openPanel("Lentelė", html);

    // Tab pasirinkimas
    dom.menuPanelContent.onclick = (ev) => {
      const tab = ev.target.closest(".leaderboard-tab");
      if(tab){
        document.querySelectorAll(".leaderboard-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        
        const tabType = tab.dataset.tab;
        document.getElementById("leaderboard-content").innerHTML = generateLeaderboardHTML(tabType);
      }
    };
  }

  function generateLeaderboardHTML(type){
    const entries = state.leaderboard[type] || [];
    let html = '';
    
    if(entries.length === 0){
      html = '<p style="text-align:center;opacity:0.7;padding:20px;">Dar nėra įrašų</p>';
    } else {
      entries.slice(0, 10).forEach((entry, index) => {
        html += `
          <div class="leaderboard-item">
            <div class="leaderboard-rank">${index + 1}</div>
            <div class="leaderboard-name">${entry.name || "Žaidėjas"}</div>
            <div class="leaderboard-score">${entry.score}</div>
          </div>`;
      });
    }
    
    return html;
  }

  function openTitlesPanel(){
    let html = `<div class="title-list">`;
    
    for(const title of state.titles){
      const isSelected = state.currentTitle === title;
      html += `
        <div class="title-item ${isSelected ? 'selected' : ''}" data-title="${title}">
          <div class="title-name">${title}</div>
          <div class="title-desc">${getTitleDescription(title)}</div>
        </div>`;
    }
    
    html += `</div>`;
    openPanel("Titulai", html);

    dom.menuPanelContent.onclick = (ev) => {
      const titleItem = ev.target.closest(".title-item");
      if(titleItem){
        const title = titleItem.dataset.title;
        state.currentTitle = title;
        saveTitles();
        openTitlesPanel(); // Refresh
      }
    };
  }

  function getTitleDescription(title){
    switch(title){
      case "Pradedančiasis": return "Pirmieji žingsniai žaidime";
      case "Balionų Naikintojas": return "Susprogdino 100+ balionų";
      case "Boso Medžiotojas": return "Nugalėjo pirmąjį bosą";
      case "Combo Meistras": return "Pasiekė 25+ combo";
      default: return "Pasiekimo aprašymas";
    }
  }

  function openUpgradesPanel(){
    let html=`<ul class="upgrade-list">`;
    for(const up of UPGRADES){
      const lvl = state.upgrades[up.id]||0;
      const max = up.maxLevel;
      const canLvl = lvl<max;
      const cost = canLvl? up.costs[lvl] : "-";
      html+=`
      <li class="upgrade-item">
        <div class="upgrade-title">${up.title} (lvl ${lvl}/${max})</div>
        <div class="upgrade-desc">${up.desc}</div>
        <div class="upgrade-meta">
          <span>Kaina: ⭐${cost}</span>
          <span>Turite: ⭐${state.stars}</span>
        </div>
        <div class="upgrade-actions">
          <button class="upgrade-buy" data-up-id="${up.id}" ${(!canLvl||state.stars<cost)?"disabled":""}>Pirkti</button>
        </div>
      </li>`;
    }
    html+=`</ul><p style="margin-top:4px;font-size:.72rem;opacity:.8;">Pagerinimai galioja visam žaidimui ir saugomi įrenginyje.</p>`;
    openPanel("Pagerinimai",html);

    dom.menuPanelContent.onclick = (ev)=>{
      const btn=ev.target.closest(".upgrade-buy");
      if(!btn || btn.disabled) return;
      const id=btn.getAttribute("data-up-id");
      const up=UPGRADES.find(u=>u.id===id);
      const lvl = state.upgrades[id]||0;
      if(lvl>=up.maxLevel) return;
      const cost=up.costs[lvl];
      if(state.stars<cost) return;
      state.stars-=cost;
      state.upgrades[id]=lvl+1;
      saveUpgrades();
      applyUpgrades();
      updateHUD();
      openUpgradesPanel();
    };
  }

  function openAchievementsPanel(){
    let html=`<ul class="ach-list">`;
    for(const ach of ACHIEVEMENTS){
      const meta=getAchMeta(ach.id);
      const progress=getAchProgress(ach);
      const unlocked=meta.unlocked;
      const claimed=meta.claimed;
      const nextIdx = Math.min(unlocked,ach.thresholds.length-1);
      const need=ach.thresholds[nextIdx];
      const pct=Math.max(0,Math.min(100,(progress/need)*100));
      const reward=ach.rewards[nextIdx]||0;
      const completed = claimed>=ach.thresholds.length;
      const canClaim = claimed<unlocked;
      const tierLabel = completed?"Visi lygiai":(ROMAN[nextIdx]||nextIdx+1);

      html+=`
      <li class="ach-item ${completed?"completed":""}">
        <div class="ach-title">${ach.title}</div>
        <div class="ach-desc">${ach.desc}</div>
        <div class="ach-meta">
          <span>${tierLabel}</span>
          <span>${Math.min(progress,need)}/${need} (${pct.toFixed(0)}%)</span>
        </div>
        <div class="ach-meta">
          <span>Apdovanojimas: ⭐${reward}</span>
          <span>Atsiimta: ${claimed}/${ach.thresholds.length}</span>
        </div>
        <div class="ach-actions">
          <button class="ach-claim" data-ach-id="${ach.id}" ${canClaim?"":"disabled"}>Atsiimti</button>
        </div>
      </li>`;
    }
    html+=`</ul>`;
    openPanel("Pasiekimai",html);

    dom.menuPanelContent.onclick = (ev)=>{
      const btn=ev.target.closest(".ach-claim");
      if(!btn || btn.disabled) return;
      const id=btn.getAttribute("data-ach-id");
      claimAchievementReward(id);
      openAchievementsPanel();
    };
  }

  function openDailyPanel(){
    if(!state.daily){
      openPanel("Dienos užduotys","<p>Kraunama...</p>");
      return;
    }
    let html=`<ul class="daily-list">`;
    for(const m of state.daily.missions){
      const pct = Math.max(0,Math.min(100,(m.progress/m.target)*100));
      html+=`
      <li class="daily-item">
        <div class="daily-top">
          <span>${m.text}</span>
          <span>⭐${m.reward}</span>
        </div>
        <div class="daily-progress">
          Progresas: ${m.progress}/${m.target} (${pct.toFixed(0)}%)
        </div>
        <div class="daily-actions">
          <button class="daily-claim" data-daily-id="${m.id}" ${(m.progress>=m.target && !m.claimed)?"":"disabled"}>${m.claimed?"Atsiimta":"Atsiimti"}</button>
        </div>
      </li>`;
    }
    html+=`</ul><p style="margin-top:4px;font-size:.72rem;opacity:.8;">Užduotys atsinaujina kiekvieną dieną atsitiktinai.</p>`;
    openPanel("Dienos užduotys",html);

    dom.menuPanelContent.onclick=(ev)=>{
      const btn=ev.target.closest(".daily-claim");
      if(!btn || btn.disabled) return;
      const id=btn.getAttribute("data-daily-id");
      claimDaily(id);
      openDailyPanel();
    };
  }

  function openLevelsPanel(){
    const from=state.level;
    const to = Math.ceil(from/10)*10;
    let strip=`<div class="levels-strip">`;
    for(let i=from;i<=to;i++){
      const cls=[
        "level-node",
        (i===from?"current":""),
        (isBossLevel(i)?"boss-node":""),
        (isChallengeLevel(i)?"challenge-node":"")
      ].join(" ").trim();
      
      let label;
      if(isBossLevel(i)) label="👹"+i;
      else if(isChallengeLevel(i)) label="🎯"+i;
      else label=i;
      
      strip+=`<div class="${cls}">${label}</div>`;
      if(i<to) strip+=`<div class="level-line"></div>`;
    }
    strip+=`</div>`;
    openPanel("Lygiai", strip+`<p style="margin-top:4px;font-size:.75rem;">Bosai kas 10 lygių, Challenge lygiai kas 5. Dabartinis: ${state.level}, checkpoint: ${state.checkpoint}.</p>`);
  }

  
  function openGuildPanel(){
    const g = state.guild || {};
    const name = g.name || "";
    const tag = g.tag || "";
    const lvl = g.guildLevel || 1;
    const xp = g.guildXp || 0;
    const members = Array.isArray(g.members) ? g.members : [];

    let membersHtml = "";
    if(members.length === 0){
      membersHtml = "<li>Kol kas nėra narių. Šiame prototipe naudojamas tik vietinis sąrašas.</li>";
    }else{
      membersHtml = members.map(m => 
        `<li>${m.name || "Žaidėjas"} – ${m.role || "narys"}</li>`
      ).join("");
    }

    let html = `
      <div class="guild-panel">
        <div class="guild-section">
          <h3>Gildijos informacija</h3>
          ${g.name 
            ? `<p><strong>${name}</strong> ${tag ? "["+tag+"]" : ""}</p>
               <p>Lygis: ${lvl} • XP: ${xp}</p>`
            : `<p>Šiuo metu nepriklausote jokiai gildijai. Sukurkite savo gildiją!</p>`
          }
        </div>
        <div class="guild-section">
          <h3>Sukurti / redaguoti gildiją</h3>
          <label>Pavadinimas</label>
          <input id="guild-name-input" type="text" maxlength="18" value="${name.replace(/"/g,'&quot;')}">
          <label>Trumpinys (tag)</label>
          <input id="guild-tag-input" type="text" maxlength="5" value="${tag.replace(/"/g,'&quot;')}">
          <button id="guild-save-btn">${g.name ? "Atnaujinti gildiją" : "Sukurti gildiją"}</button>
          <p class="multiplayer-hint">Šiame etape gildija yra vietinė (tik šiame įrenginyje), bet struktūra paruošta būsimam multiplayer.</p>
        </div>
        <div class="guild-section">
          <h3>Nariai</h3>
          <ul class="guild-member-list">
            ${membersHtml}
          </ul>
        </div>
      </div>
    `;
    openPanel("Gildija", html);

    dom.menuPanelContent.onclick = (ev) => {
      const btn = ev.target.closest("#guild-save-btn");
      if(btn){
        const nameInput = document.getElementById("guild-name-input");
        const tagInput = document.getElementById("guild-tag-input");
        const newName = (nameInput.value || "").trim();
        const newTag = (tagInput.value || "").trim().toUpperCase();
        if(!newName){
          alert("Įveskite gildijos pavadinimą.");
          return;
        }
        state.guild.name = newName;
        state.guild.tag = newTag || null;
        state.guild.role = "owner";
        // Pagrindinį žaidėją laikome pirmu nariu
        if(!Array.isArray(state.guild.members) || state.guild.members.length === 0){
          state.guild.members = [{ name: "Jūs", role: "vadovas" }];
        }
        saveGuild();
        openGuildPanel(); // Refresh
      }
    };
  }

  function openMultiplayerPanel(){
    const m = state.multiplayer;
    const room = m.roomCode || "—";

    let html = `
      <div class="multiplayer-panel">
        <div class="multiplayer-section">
          <h3>Multiplayer paruošimas</h3>
          <p>Ši versija paruošta būsimam internetiniam žaidimui: yra kambario kodų ir žaidėjų sąrašo sistema.</p>
          <p class="multiplayer-hint">Tikras žaidimas tarp kelių žaidėjų reikalauja serverio. Kol kas tai tik kliento prototipas.</p>
        </div>
        <div class="multiplayer-section">
          <h3>Kambarys</h3>
          <p>Dabartinis kambario kodas: <strong>${room}</strong></p>
          <button id="mp-host-btn">Sukurti naują kambarį</button>
        </div>
        <div class="multiplayer-section">
          <h3>Prisijungti su kodu</h3>
          <label>Kodo įvedimas</label>
          <input id="mp-join-code" type="text" maxlength="6" placeholder="Pvz. AB12CD">
          <button id="mp-join-btn">Prisijungti (lokalus prototipas)</button>
        </div>
      </div>
    `;
    openPanel("Multiplayer (beta)", html);

    dom.menuPanelContent.onclick = (ev) => {
      const hostBtn = ev.target.closest("#mp-host-btn");
      const joinBtn = ev.target.closest("#mp-join-btn");
      if(hostBtn){
        // Sukuriame pseudo-kambario kodą
        const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let code = "";
        for(let i=0;i<6;i++){
          code += alphabet[Math.floor(Math.random()*alphabet.length)];
        }
        state.multiplayer.mode = "coop";
        state.multiplayer.roomCode = code;
        state.multiplayer.isHost = true;
        state.multiplayer.players = [{ id: "local", name: "Jūs" }];
        openMultiplayerPanel();
      } else if(joinBtn){
        const inp = document.getElementById("mp-join-code");
        const val = (inp.value || "").trim().toUpperCase();
        if(!val){
          alert("Įveskite kambario kodą.");
          return;
        }
        state.multiplayer.mode = "coop";
        state.multiplayer.roomCode = val;
        state.multiplayer.isHost = false;
        state.multiplayer.players = [{ id: "local", name: "Jūs" }];
        alert("Šiuo metu tai tik vizualus prisijungimas. Tikras žaidimas tarp kelių žaidėjų atsiras, kai bus serveris.");
        openMultiplayerPanel();
      }
    };
  }

function openTutorialPanel(){
    const tutorialSteps = [
      "🎯 Spauskite tik taikinio spalvos balionus",
      "❤️ Saugokite gyvybes - jos rodomos viršuje", 
      "🔥 Surinkite 10 combo ir aktyvuokite FEVER režimą!",
      "💫 Naudokite specialius balionus ir ultimus",
      "👹 Kas 10 lygį laukia BOSAS!",
      "🎯 Kas 5 lygį - SPECIALUS IŠŠŪKIS!",
      "⭐ Surinkite žvaigždutes norėdami atrakinti naujoves!",
      "🎮 Sėkmės žaidime!"
    ];
    
    let html = `<div class="tutorial-steps">`;
    tutorialSteps.forEach((step, index) => {
      html += `<div class="tutorial-step">${index + 1}. ${step}</div>`;
    });
    html += `</div>`;
    
    openPanel("Tutorial", html);
  }

  /* ==== PAPILDOMOS SISTEMOS ==== */

  // Augintinio sistema
  function loadPet() {
    try {
      const raw = localStorage.getItem(STORAGE_PET);
      if (raw) {
        state.pet = JSON.parse(raw);
      }
    } catch(e) {}
  }

  function savePet() {
    try {
      localStorage.setItem(STORAGE_PET, JSON.stringify(state.pet));
    } catch(e) {}
  }

  // Skin'ų sistema
  function loadSkins() {
    try {
      const raw = localStorage.getItem(STORAGE_SKINS);
      if (raw) {
        state.skins = JSON.parse(raw);
      }
    } catch(e) {}
  }

  function saveSkins() {
    try {
      localStorage.setItem(STORAGE_SKINS, JSON.stringify(state.skins));
    } catch(e) {}
  }

  // Questų sistema
  function loadQuests() {
    try {
      const raw = localStorage.getItem(STORAGE_QUESTS);
      if (raw) {
        const obj = JSON.parse(raw);
        if (obj && obj.date) {
          const today = todayStr();
          const weekStart = getWeekStart();
          
          if (obj.date === weekStart) {
            state.weekly = obj;
          } else {
            // Nauja savaitė - generuojamus naujus questus
            state.weekly = {
              date: weekStart,
              quests: WEEKLY_QUESTS.map(quest => ({
                ...quest,
                progress: 0,
                claimed: false
              }))
            };
            saveQuests();
          }
        }
      } else {
        // Pirmas kartas - generuojam questus
        const weekStart = getWeekStart();
        state.weekly = {
          date: weekStart,
          quests: WEEKLY_QUESTS.map(quest => ({
            ...quest,
            progress: 0,
            claimed: false
          }))
        };
        saveQuests();
      }
    } catch(e) {}
  }

  function getWeekStart() {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const weekStart = new Date(d.setDate(diff));
    return weekStart.getFullYear() + "-" + (weekStart.getMonth() + 1) + "-" + weekStart.getDate();
  }

  function saveQuests() {
    try {
      localStorage.setItem(STORAGE_QUESTS, JSON.stringify(state.weekly));
    } catch(e) {}
  }

  function getQuestProgress(quest) {
    switch(quest.type) {
      case "bossesDefeated": return state.counters.bossesDefeated;
      case "maxCombo": return state.counters.maxCombo;
      case "challengesCompleted": return state.counters.challengesCompleted;
      default: return 0;
    }
  }

  function claimQuest(questId) {
    if (!state.weekly) return;
    
    const quest = state.weekly.quests.find(q => q.id === questId);
    if (!quest || quest.claimed) return;
    
    const progress = getQuestProgress(quest);
    if (progress < quest.target) return;
    
    quest.claimed = true;
    state.stars += quest.reward;
    state.counters.starsEarned += quest.reward;
    state.counters.questsCompleted++;
    
    log(`⭐ Misija įvykdyta: ${quest.title} (+${quest.reward}⭐)`);
    flashLogHighlight();
    saveQuests();
    updateHUD();
  }

  // Leaderboard sistema
  function loadLeaderboard() {
    try {
      const raw = localStorage.getItem(STORAGE_LEADERBOARD);
      if (raw) {
        state.leaderboard = JSON.parse(raw);
      }
    } catch(e) {}
  }

  function saveLeaderboard() {
    try {
      localStorage.setItem(STORAGE_LEADERBOARD, JSON.stringify(state.leaderboard));
    } catch(e) {}
  }

  function addToLeaderboard(type, score, name) {
    if (!state.leaderboard[type]) {
      state.leaderboard[type] = [];
    }
    
    state.leaderboard[type].push({
      name: name || "Žaidėjas",
      score: score,
      date: todayStr()
    });
    
    // Rūšiuoti ir palikti tik top 10
    state.leaderboard[type].sort((a, b) => b.score - a.score);
    state.leaderboard[type] = state.leaderboard[type].slice(0, 10);
    
    saveLeaderboard();
  }

  // Prisijungimo bonusas
  
  function loadGuild(){
    try{
      const raw = localStorage.getItem(STORAGE_GUILD);
      if(raw){
        const data = JSON.parse(raw);
        if(typeof data === "object" && data){
          // Išlaikome numatytą struktūrą
          state.guild = Object.assign({}, state.guild, data);
        }
      }
    }catch(e){}
  }

  function saveGuild(){
    try{
      localStorage.setItem(STORAGE_GUILD, JSON.stringify(state.guild));
    }catch(e){}
  }

function checkLoginBonus() {
    try {
      const raw = localStorage.getItem(STORAGE_LOGIN);
      if (raw) {
        const loginData = JSON.parse(raw);
        const today = todayStr();
        
        if (loginData.lastLogin === today) {
          // Jau šiandien prisijungė
          state.loginStreak = loginData.streak;
          return;
        }
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.getFullYear() + "-" + (yesterday.getMonth() + 1) + "-" + yesterday.getDate();
        
        if (loginData.lastLogin === yesterdayStr) {
          // Streakas tęsiasi
          state.loginStreak = loginData.streak + 1;
        } else {
          // Streakas nutrūko
          state.loginStreak = 1;
        }
        
        // Paskirstyti bonusą
        giveLoginBonus();
        
        // Išsaugoti naujus duomenis
        const newLoginData = {
          lastLogin: today,
          streak: state.loginStreak
        };
        localStorage.setItem(STORAGE_LOGIN, JSON.stringify(newLoginData));
        
      } else {
        // Pirmas prisijungimas
        state.loginStreak = 1;
        giveLoginBonus();
        
        const loginData = {
          lastLogin: todayStr(),
          streak: 1
        };
        localStorage.setItem(STORAGE_LOGIN, JSON.stringify(loginData));
      }
    } catch(e) {}
  }

  function giveLoginBonus() {
    const bonuses = [
      { streak: 1, stars: 5, message: "Pirmos dienos bonusas! +5⭐" },
      { streak: 3, stars: 10, message: "3 dienų streakas! +10⭐" },
      { streak: 7, stars: 25, message: "Savaitės streakas! +25⭐" },
      { streak: 14, stars: 50, message: "2 savaičių streakas! +50⭐" },
      { streak: 30, stars: 100, message: "Mėnesio streakas! +100⭐" }
    ];
    
    const bonus = bonuses.find(b => b.streak === state.loginStreak);
    if (bonus) {
      state.stars += bonus.stars;
      state.counters.starsEarned += bonus.stars;
      log(`🎁 ${bonus.message}`);
      flashLogHighlight();
    } else {
      // Standartinis dienos bonusas
      const dailyStars = 2 + Math.floor(state.loginStreak / 2);
      state.stars += dailyStars;
      state.counters.starsEarned += dailyStars;
      log(`🎁 ${state.loginStreak} dienų streakas! +${dailyStars}⭐`);
      flashLogHighlight();
    }
    updateHUD();
  }

  // Titulai
  function saveTitles() {
    try {
      localStorage.setItem("br_titles_v1", JSON.stringify({
        titles: state.titles,
        currentTitle: state.currentTitle
      }));
    } catch(e) {}
  }

  function loadTitles() {
    try {
      const raw = localStorage.getItem("br_titles_v1");
      if (raw) {
        const obj = JSON.parse(raw);
        state.titles = obj.titles || ["Pradedančiasis"];
        state.currentTitle = obj.currentTitle || "Pradedančiasis";
      }
    } catch(e) {}
  }

  function unlockTitle(title) {
    if (!state.titles.includes(title)) {
      state.titles.push(title);
      log(`🏆 Atrakintas naujas titulas: ${title}!`);
      flashLogHighlight();
      saveTitles();
    }
  }

  /* ==== START / RESET ==== */

  function resetRun(fromCheckpoint){
    clearBalloons();
    state.running=false;
    state.bossActive=false;
    state.challengeMode=null;
    state.challengeRules=null;
    dom.body.classList.remove("boss-mode", "challenge-mode");
    dom.bossEntity.classList.remove("float");
    updateBossHUD();
    updateCriticalVisual();

    // Reset combo ir ult
    state.combo = 0;
    state.maxCombo = 0;
    state.ultCharge = { bomb: 0, slow: 0, target: 0 };
    updateComboDisplay();
    updateUltButtons();

    let startLevel;
    if (fromCheckpoint) {
      startLevel = state.checkpoint || 1;
    } else if (state.debugStartLevel && state.debugStartLevel > 0) {
      startLevel = state.debugStartLevel;
    } else {
      startLevel = 1;
    }

    state.level = startLevel;
    state.levelTarget=calcLevelTarget(state.level);
    state.levelProgress=0;

    state.lives=state.maxLives;
    state.targetColor = COLORS[Math.floor(Math.random()*COLORS.length)];

    state.spawnInterval=calcSpawnInterval(state.level);
    state.maxBalloons=10+Math.floor(state.level*0.7);

    // Reset efektus
    state.effects = {
      speedUpUntil: 0,
      slowUntil: 0,
      freezeUntil: 0,
      windUntil: 0,
      shieldUntil: 0,
      autoTargetUntil: 0
    };

    dom.startOverlay.style.display="none";
    dom.gameOverOverlay.style.display="none";

    state.counters.runs++;
    saveStats();

    if(isChallengeLevel(state.level)){
      startChallengeLevel();
    } else if(isBossLevel(state.level)){
      startBossFight();
    }else{
      log("Spausk taikinio spalvos balionus. Bosai kas 10 lygių, Challenge lygiai kas 5.");
      updateHUD();
    }
  }

  function startRun(){
    state.running=true;
    state.lastFrame=performance.now();
  }

  function showRandomTip(){
    if (dom.startTip) {
      dom.startTip.textContent = TIPS[Math.floor(Math.random()*TIPS.length)];
    }
  }

  /* ==== TUTORIAL ==== */

  function showTutorial(){
    const steps = [
      "Sveiki! Tai Balloon Rush Pro žaidimas.",
      "🎯 Spauskite tik taikinio spalvos balionus",
      "❤️ Saugokite gyvybes - jos rodomos viršuje",
      "🔥 Surinkite 10 combo ir aktyvuokite FEVER režimą!",
      "💫 Naudokite specialius balionus ir ultimus",
      "👹 Kas 10 lygį laukia BOSAS!",
      "🎯 Kas 5 lygį - SPECIALUS IŠŠŪKIS!",
      "⭐ Surinkite žvaigždutes norėdami atrakinti naujoves!",
      "🎮 Sėkmės!"
    ];
    
    let currentStep = 0;
    
    function showStep() {
      if (currentStep < steps.length) {
        log("💡 " + steps[currentStep]);
        currentStep++;
        setTimeout(showStep, 3000);
      } else {
        state.tutorialCompleted = true;
        localStorage.setItem("br_tutorial_completed", "true");
      }
    }
    
    showStep();
  }

  /* ==== EVENTAI ==== */

  dom.btnMenu.addEventListener("click",()=>{
    toggleBottomMenu();
  });

  dom.mainMenu.addEventListener("click",(ev)=>{
    const btn=ev.target.closest("button");
    if(!btn) return;
    const act=btn.dataset.action;
    
    switch(act){
      case "play":
        dom.mainMenu.classList.remove("open");
        dom.menuPanel.style.display="none";
        dom.mainMenu.dataset.returnAfterPanel="";
        resetRun(false);
        startRun();
        break;
      case "skills":
        openSkillsPanel();
        break;
      case "pets":
        openPetsPanel();
        break;
      case "skins":
        openSkinsPanel();
        break;
      case "upgrades":
        openUpgradesPanel();
        break;
      case "achievements":
        openAchievementsPanel();
        break;
      case "daily":
        openDailyPanel();
        break;
      case "quests":
        openQuestsPanel();
        break;
      case "stats":
        openStatsPanel();
        break;
      case "leaderboard":
        openLeaderboardPanel();
        break;
      case "titles":
        openTitlesPanel();
        break;
      case "guild":
        openGuildPanel();
        break;
      case "multiplayer":
        openMultiplayerPanel();
        break;
      case "tutorial":
        openTutorialPanel();
        break;
    }
  });

  dom.menuPanelClose.addEventListener("click",()=>{
    closePanel();
  });

  dom.mainMenuClose.addEventListener("click",()=>{
    dom.mainMenu.classList.remove("open");
    dom.menuPanel.style.display="none";
    dom.mainMenu.dataset.returnAfterPanel="";
  });


  // PUBG tipo pagrindinis meniu mygtukai
  if (dom.mmPlay && dom.mainMenuScreen && dom.gameRoot) {
    dom.mmPlay.addEventListener("click", () => {
      dom.mainMenuScreen.style.display = "none";
      dom.gameRoot.style.display = "block";
      // rodom start ekraną su patarimu
      if (dom.startOverlay) dom.startOverlay.style.display = "flex";
      if (typeof showRandomTip === "function") showRandomTip();
    });
  }
  if (dom.mmSkills) {
    dom.mmSkills.addEventListener("click", () => {
      if (dom.gameRoot && dom.gameRoot.style.display === "none") {
        dom.gameRoot.style.display = "block";
      }
      openSkillsPanel();
    });
  }
  if (dom.mmShop) {
    dom.mmShop.addEventListener("click", () => {
      if (dom.gameRoot && dom.gameRoot.style.display === "none") {
        dom.gameRoot.style.display = "block";
      }
      // Kol kas kaip parduotuvę naudojame pagerinimų panelę
      if (typeof openUpgradesPanel === "function") {
        openUpgradesPanel();
      }
    });
  }
  if (dom.mmSettings) {
    dom.mmSettings.addEventListener("click", () => {
      const soundChecked = state.options && state.options.sound !== false;
      const musicChecked = state.options && state.options.music !== false;
      const html = `
        <div class="settings-panel">
          <label><input type="checkbox" id="opt-sound" ${soundChecked ? "checked" : ""}> Garso efektai</label>
          <label><input type="checkbox" id="opt-music" ${musicChecked ? "checked" : ""}> Muzika</label>
        </div>
      `;
      openPanel("Nustatymai", html);
      const soundCb = document.getElementById("opt-sound");
      const musicCb = document.getElementById("opt-music");
      if (soundCb) soundCb.addEventListener("change", () => {
        if (!state.options) state.options = { sound: true, music: true, vibration: true };
        state.options.sound = soundCb.checked;
        if (typeof saveOptions === "function") saveOptions();
      });
      if (musicCb) musicCb.addEventListener("change", () => {
        if (!state.options) state.options = { sound: true, music: true, vibration: true };
        state.options.music = musicCb.checked;
        if (typeof saveOptions === "function") saveOptions();
      });
    });
  }

  dom.btnStart.addEventListener("click",()=>{
    dom.startOverlay.style.display="none";
    resetRun(false);
    startRun();
  });

  dom.btnRestart.addEventListener("click",()=>{
    dom.gameOverOverlay.style.display="none";
    resetRun(true);   // grįžtam į paskutinį checkpoint
    startRun();
  });
  if (dom.goMenuBtn) {
    dom.goMenuBtn.addEventListener("click", () => {
      // Iš game over ekrano grįžtam į pagrindinį meniu
      dom.gameOverOverlay.style.display = "none";
      state.running = false;
      clearBalloons();
      dom.body.classList.remove("boss-mode");
      if (dom.gameRoot) dom.gameRoot.style.display = "none";
      if (dom.mainMenuScreen) dom.mainMenuScreen.style.display = "block";
    });
  }


  dom.bossHitbox.addEventListener("click",ev=>{
    ev.stopPropagation();
    handleBossHit();
  });

  // Ult mygtukų event listeners
  if (dom.ultButtons.bomb) {
    dom.ultButtons.bomb.addEventListener("click", () => useUltimate("bomb"));
  }
  if (dom.ultButtons.slow) {
    dom.ultButtons.slow.addEventListener("click", () => useUltimate("slow"));
  }
  if (dom.ultButtons.target) {
    dom.ultButtons.target.addEventListener("click", () => useUltimate("target"));
  }

  // Pauzės event listeners
  if (dom.pauseBtn) {
    dom.pauseBtn.addEventListener("click", togglePause);
  }
  if (dom.btnResume) {
    dom.btnResume.addEventListener("click", togglePause);
  }
  if (dom.btnMainMenu) {
    dom.btnMainMenu.addEventListener("click", () => {
      // Iš pauzės grįžtam į pagrindinį meniu
      togglePause();
      state.running = false;
      clearBalloons();
      dom.body.classList.remove("boss-mode");
      dom.gameOverOverlay.style.display = "none";
      if (dom.gameRoot) dom.gameRoot.style.display = "none";
      if (dom.mainMenuScreen) dom.mainMenuScreen.style.display = "block";
    });
  }

  // Nustatymų event listeners
  if (document.getElementById("sound-toggle")) {
    document.getElementById("sound-toggle").addEventListener("change", (e) => {
      state.settings.sound = e.target.checked;
    });
  }
  if (document.getElementById("music-toggle")) {
    document.getElementById("music-toggle").addEventListener("change", (e) => {
      state.settings.music = e.target.checked;
    });
  }

  // Klaviatūros valdymas žaidėjui apačioje
  window.addEventListener("keydown",(e)=>{
    if(e.code==="ArrowLeft" || e.code==="KeyA"){
      state.input.left = true;
    }else if(e.code==="ArrowRight" || e.code==="KeyD"){
      state.input.right = true;
    }else if(e.code==="Space"){
      e.preventDefault();
      shootBullet();
    }
  });

  window.addEventListener("keyup",(e)=>{
    if(e.code==="ArrowLeft" || e.code==="KeyA"){
      state.input.left = false;
    }else if(e.code==="ArrowRight" || e.code==="KeyD"){
      state.input.right = false;
    }
  });

  // TOUCH KONTROLĖS (telefonui)
  if ('ontouchstart' in window && dom.gameArea) {
    dom.gameArea.addEventListener("touchstart",(ev)=>{
      if (!state.running) return;
      const t = ev.touches[0];
      state.touch.active = true;
      state.touch.startX = t.clientX;
      state.touch.startY = t.clientY;
      state.touch.moved = false;
      state.touch.startTime = performance.now();
    }, { passive: true });

    dom.gameArea.addEventListener("touchmove",(ev)=>{
      if (!state.touch.active || !dom.gameArea) return;
      const t = ev.touches[0];
      const dx = Math.abs(t.clientX - state.touch.startX);
      const dy = Math.abs(t.clientY - state.touch.startY);
      if (dx > 5 || dy > 5) {
        state.touch.moved = true;
      }
      const rect = dom.gameArea.getBoundingClientRect();
      const relX = t.clientX - rect.left;
      const targetX = relX - state.player.width/2;
      const minX = 5;
      const maxX = rect.width - state.player.width - 5;
      state.player.x = Math.max(minX, Math.min(maxX, targetX));
      if (dom.player) {
        dom.player.style.left = state.player.x + "px";
      }
    }, { passive: true });

    dom.gameArea.addEventListener("touchend",(ev)=>{
      if (!state.touch.active) return;
      const endTime = performance.now();
      const duration = endTime - state.touch.startTime;
      // Jei trumpas paspaudimas be didelio judesio – laikom kaip šūvį
      if (!state.touch.moved && duration < 220) {
        shootBullet();
      }
      state.touch.active = false;
    });
  }

  /* ==== LOADING ==== */

  function startLoading(){
    let p=0;
    const step=()=>{
      p+=3;
      if(p>100)p=100;
      if (document.getElementById("loading-bar-fill")) {
        document.getElementById("loading-bar-fill").style.width=p+"%";
      }
      if (document.getElementById("loading-percent")) {
        document.getElementById("loading-percent").textContent=p+"%";
      }
      if(p<100){
        setTimeout(step,30);
      }else{
        setTimeout(()=>{
          if(dom.loadingOverlay){
            dom.loadingOverlay.style.display="none";
          }
          showRandomTip();
          dom.startOverlay.style.display="flex";
          
          // Rodyti tutorial pirmą kartą
          if(!state.tutorialCompleted && !localStorage.getItem("br_tutorial_completed")){
            setTimeout(showTutorial, 1000);
          }
        },200);
      }
    };
    step();
  }

  /* ==== STATS PANELĖ ==== */

  function formatMinutes(ms){
    const m=Math.floor(ms/60000);
    return m+" min";
  }

  function openStatsPanel(){
    const c=state.counters;
    const html=`
    <table class="stats-table">
      <tr><td>Iš viso susprogdinta balionų:</td><td>${c.balloonsPopped}</td></tr>
      <tr><td>Pereita lygių:</td><td>${c.levelsCompleted}</td></tr>
      <tr><td>Nugalėta bosų:</td><td>${c.bossesDefeated}</td></tr>
      <tr><td>Gauta žalos kartų:</td><td>${c.damageTaken}</td></tr>
      <tr><td>Surinkta kristalų:</td><td>${c.crystalsCollected}</td></tr>
      <tr><td>Didžiausias combo:</td><td>${c.maxCombo}</td></tr>
      <tr><td>Įveikta iššūkių:</td><td>${c.challengesCompleted}</td></tr>
      <tr><td>Užbaigta misijų:</td><td>${c.questsCompleted}</td></tr>
      <tr><td>Surinkta žvaigždučių (iš viso):</td><td>${c.starsEarned}</td></tr>
      <tr><td>Žaidimų paleista:</td><td>${c.runs}</td></tr>
      <tr><td>Bendras laikas:</td><td>${formatMinutes(state.statsTimeMs)}</td></tr>
      <tr><td>Geriausias lygis:</td><td>${state.bestLevel}</td></tr>
      <tr><td>Dabartinis checkpoint:</td><td>${state.checkpoint}</td></tr>
      <tr><td>Prisijungimų streakas:</td><td>${state.loginStreak} dienos</td></tr>
    </table>
    <div style="margin-top:8px;font-size:.75rem;opacity:.8;">
      Testinis lygis:
      <input id="test-level-input" type="number" min="1" max="999" value="${state.debugStartLevel||state.level}" style="width:60px;">
      <button id="btn-test-level" style="padding:2px 6px;margin-left:4px;font-size:.75rem;">Taikyti</button>
    </div>
    <div style="margin-top:6px;font-size:.7rem;opacity:.7;">
      Pastaba: ištrynus naršyklės duomenis, progresas dings.
    </div>`;
    openPanel("Statistika",html);

    setTimeout(()=>{
      const btn=document.getElementById("btn-test-level");
      const inp=document.getElementById("test-level-input");
      if(btn && inp){
        btn.onclick=()=>{
          let v=parseInt(inp.value,10);
          if(!v || v<1) v=1;
          state.debugStartLevel=v;
          log("Testinis lygis nustatytas į "+v+". Naują žaidimą pradėsi nuo jo.");
          flashLogHighlight();
        };
      }
    },0);
  }

  /* ==== INIT ==== */

  function init(){
    // Įkelti visus duomenis
    loadAchievements();
    loadUpgrades();
    loadSkills();
    loadSkillPoints();
    applySkills();
    applyUpgrades();
    loadStats();
    loadDaily();
    loadPet();
    loadSkins();
    loadQuests();
    loadLeaderboard();
    loadTitles();
    loadGuild();
    checkLoginBonus();
    
    // Patikrinti ar tutorial jau baigtas
    state.tutorialCompleted = !!localStorage.getItem("br_tutorial_completed");
    
    // Inicializuoti pradinę būseną
    state.level=1;
    state.checkpoint=1;
    state.levelTarget=calcLevelTarget(1);
    state.targetColor=COLORS[Math.floor(Math.random()*COLORS.length)];
    
    // Inicializuoti upgrades jei reikia
    if (!state.upgrades) {
      state.upgrades = {
        extraLife: 0,
        bossDamage: 0,
        mistakeShield: 0,
        specialRate: 0
      };
    }
    
    // Inicializuoti ult charge
    state.ultCharge = {
      bomb: 0,
      slow: 0,
      target: 0
    };
    
    updateHUD();
    updatePetVisual();
    updateUltButtons();
    initPlayer();
    
    startLoading();
    requestAnimationFrame(updateFrame);
  }

  // Paleisti žaidimą
  init();
})();