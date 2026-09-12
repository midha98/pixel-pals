/**
 * Chakkakku Hockey (ചക്കിന് വെച്ചത് ഹോക്കിക്ക് കൊണ്ടു)
 * Interactive Logic, Audio Synthesizer, Confetti Engine, & Useless Database
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Web Audio API Sound Synthesizer
     Zero external audio dependencies - 100% reliable synthesized effects!
     ========================================================================== */
  class SoundManager {
    constructor() {
      this.enabled = true;
      this.ctx = null;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      return this.enabled;
    }

    // Playful cartoon spring "boing"
    playBoing() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.35);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    }

    // Comic slide whistle / pop
    playSlide() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.25);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    }

    // Clown honk / buzz for "Even Worse Idea"
    playHonk() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'square';
      osc1.frequency.setValueAtTime(160, now);
      osc2.frequency.setValueAtTime(240, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.3);
      osc2.stop(now + 0.3);
    }

    // Celebratory victory chime
    playChime() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, now + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.45);
      });
    }

    // Bubble pop for floating emojis
    playPop() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    }
  }

  const sound = new SoundManager();

  /* ==========================================================================
     2. Useless Solutions & Worse Ideas Database
     ========================================================================== */
  const DATABASE = {
    hungry: {
      tag: "🍔 Hungry Dilemma",
      solutions: [
        {
          text: "Buy a hockey stick and keep it near a jackfruit. Hunger solved... maybe.",
          sideEffect: "Stomach rumbles in Malayalam",
          cost: "₹1,200 + 1 Ripe Jackfruit",
          time: "-45 Minutes"
        },
        {
          text: "Chew vigorously on a blank piece of paper while watching a 4K documentary about Malabar Biryani.",
          sideEffect: "Paper fiber intake up 400%",
          cost: "₹2 (A4 paper)",
          time: "3 Hours wasted"
        },
        {
          text: "Inform your digestive tract that hunger is simply an outdated Western construct invented in 1842.",
          sideEffect: "Intestinal mutiny",
          cost: "₹0",
          time: "Instant confusion"
        },
        {
          text: "Drink half a glass of lukewarm tap water and convince your brain that it is exotic French consommé.",
          sideEffect: "Severe disappointment",
          cost: "Free",
          time: "30 Seconds"
        },
        {
          text: "Take a picture of a samosa from 2019, set it as your lock screen, and lick your phone glass twice.",
          sideEffect: "Questionable screen hygiene",
          cost: "Sanitizer wipes",
          time: "1 Minute"
        }
      ],
      worseIdeas: [
        "Go to the refrigerator, stare into the empty shelves for 17 consecutive minutes, close it, and repeat until dinner cooks itself.",
        "Challenge a squirrel to a duel for a half-eaten cashew nut behind the local temple.",
        "Eat a spoonful of raw haldi powder while shouting 'I AM INVINCIBLE' at the ceiling fan."
      ]
    },

    battery: {
      tag: "🔋 Dead Battery Dilemma",
      solutions: [
        {
          text: "Put your phone inside the refrigerator for 10 minutes and smile at a jackfruit.",
          sideEffect: "Phone is chilly, battery still 1%",
          cost: "10 mins of electricity",
          time: "10 Minutes"
        },
        {
          text: "Rub two AAA batteries against your forehead while chanting '5G come back to me' in reverse.",
          sideEffect: "Forehead smudges & neighbor glances",
          cost: "Two dead batteries",
          time: "5 Minutes"
        },
        {
          text: "Plug the charger directly into an unripe green banana. Potassium is rich in electrolytes, right?",
          sideEffect: "Sticky USB-C port",
          cost: "1 Robusta banana",
          time: "15 Minutes"
        },
        {
          text: "Blow frantically into the charging slot like it's a 1994 Nintendo game cartridge.",
          sideEffect: "Dizziness & hyperventilation",
          cost: "Lung capacity",
          time: "3 Minutes"
        }
      ],
      worseIdeas: [
        "Wrap the phone in tin foil, place it on the roof, and wait for a thunderstorm to strike like Benjamin Franklin.",
        "Draw 100% battery icon with a green marker pen directly on your OLED screen. Problem solved visually.",
        "Whisper motivational TED talk speeches directly into the speaker grille."
      ]
    },

    raining: {
      tag: "🌧️ Rain Dilemma",
      solutions: [
        {
          text: "Open an umbrella inside your house and wait.",
          sideEffect: "Grandmother unleashes 7 bad luck superstitions",
          cost: "1 Umbrella",
          time: "Indefinite"
        },
        {
          text: "Wear scuba goggles to the balcony and challenge the rain clouds to an aggressive staring contest.",
          sideEffect: "Cloud does not blink",
          cost: "1 Goggles",
          time: "40 Minutes"
        },
        {
          text: "Place a bucket outside in the rain. When full, pour it into the kitchen sink to assert absolute dominance over nature.",
          sideEffect: "Nature remains completely unbothered",
          cost: "1 Plastic bucket",
          time: "1 Hour"
        },
        {
          text: "Address the storm through a megaphone, offering a truce in exchange for two hot banana fritters (pazham pori).",
          sideEffect: "Crowd gathers to watch the spectacle",
          cost: "₹50 fritters",
          time: "20 Minutes"
        }
      ],
      worseIdeas: [
        "Dry the rain puddles on your road using your domestic hair dryer connected via 9 extension cords.",
        "File an official complaint with the Department of Weather demanding rain be rescheduled to Tuesday 3 PM.",
        "Wear your raincoat inside out so the rain gets confused about who is wearing whom."
      ]
    },

    exams: {
      tag: "📚 Exam Tomorrow",
      solutions: [
        {
          text: "Rotate your notebook three times and pray to the ceiling fan.",
          sideEffect: "Ceiling fan spins on speed 5, pages blow away",
          cost: "3 Notebook rotations",
          time: "5 Minutes"
        },
        {
          text: "Place the textbook under your pillow and hope for osmosis/diffusion to transfer chapter 4 into your brain.",
          sideEffect: "Stiff neck and zero formulas absorbed",
          cost: "1 Pillow",
          time: "8 Hours"
        },
        {
          text: "Highlight every single sentence with neon yellow so that everything is equally important and therefore nothing is.",
          sideEffect: "Retinal blindness from highlighter glow",
          cost: "4 Highlighters",
          time: "2 Hours"
        },
        {
          text: "Write 'Sir Isaac Newton was a very polite gentleman' 100 times in cursive to earn cosmic physics karma.",
          sideEffect: "Writer's cramp",
          cost: "1 Blue ballpoint",
          time: "45 Minutes"
        }
      ],
      worseIdeas: [
        "Show up to the exam hall wearing full hockey goalkeeper padding and pretend you misheard 'Physics Test' as 'Penalty Strokes'.",
        "Offer the examiner a fresh jackfruit in exchange for full marks on Section B.",
        "Learn only page 73 of the syllabus and pray the entire question paper is derived exclusively from page 73."
      ]
    },

    bus: {
      tag: "🚌 Missed Bus Dilemma",
      solutions: [
        {
          text: "Wave goodbye to random buses until one feels sorry and reverses.",
          sideEffect: "Bus driver accelerates faster",
          cost: "Dignity",
          time: "35 Minutes"
        },
        {
          text: "Sprint aggressively alongside the bus for 4 kilometers to prove to the passengers that you didn't really need a ride anyway.",
          sideEffect: "Cardiovascular collapse",
          cost: "Running shoes",
          time: "25 Minutes"
        },
        {
          text: "Sit at the bus stop until the concept of buses goes extinct and commercial teleportation is invented.",
          sideEffect: "Extremely long wait",
          cost: "Time",
          time: "Circa 2099"
        },
        {
          text: "Challenge the nearest auto-rickshaw driver to a rapid chess match for free passage across town.",
          sideEffect: "Auto driver checkmates you in 3 moves with Scholar's Mate",
          cost: "₹150 meter fare",
          time: "10 Minutes"
        }
      ],
      worseIdeas: [
        "Throw a jackfruit into the street and see if it rolls towards your destination faster than traffic.",
        "Disguise yourself as a bus stop pole so nobody notices you are running 2 hours late.",
        "Walk backwards so it looks like you are returning from a successful journey."
      ]
    },

    rejected: {
      tag: "❤️ Heartbreak Dilemma",
      solutions: [
        {
          text: "Give a chocolate to a coconut tree for emotional support.",
          sideEffect: "Ants consume the chocolate, tree says nothing",
          cost: "₹40 Dairy Milk",
          time: "15 Minutes"
        },
        {
          text: "Go to the supermarket, look deeply into the soul of a fresh cabbage, and whisper: 'Only you understand me.'",
          sideEffect: "Security gently escorts you to the exit",
          cost: "₹18 cabbage",
          time: "20 Minutes"
        },
        {
          text: "Adopt a field hockey stick, name it 'Suresh', and introduce it at family dinner as your new fiancé.",
          sideEffect: "Family considers an intervention",
          cost: "1 Hockey stick",
          time: "A lifetime of memories"
        },
        {
          text: "Write a 4-page apology letter addressed to 'The Theoretical Concept of Romantic Love' on a fresh banana leaf.",
          sideEffect: "Goat eats the banana leaf",
          cost: "1 Banana leaf",
          time: "1 Hour"
        }
      ],
      worseIdeas: [
        "Send your ex an anonymous courier containing exactly one raw potato with the word 'REGRET' carved into it.",
        "Change your WhatsApp status to a photo of a jackfruit with melancholic violin music in the background.",
        "Hire a brass band to stand outside your own house and play celebratory songs for your independence."
      ]
    },

    sleepy: {
      tag: "😴 Sleepy Dilemma",
      solutions: [
        {
          text: "Stare into the ceiling fan on speed 5 until your blinking frequency synchronizes with the blade RPM.",
          sideEffect: "Hypnotic trance & neck strain",
          cost: "Electricity bill",
          time: "20 Minutes"
        },
        {
          text: "Drink a cup of boiling black coffee while wearing a heavy woolen winter monkey cap in peak May humidity.",
          sideEffect: "Thermal overload",
          cost: "₹15 coffee",
          time: "10 Minutes"
        },
        {
          text: "Set 52 alarms spaced exactly 45 seconds apart, each programmed with the sound of an elephant trumpet.",
          sideEffect: "Every neighborhood dog joins the orchestra",
          cost: "Free",
          time: "All morning"
        }
      ],
      worseIdeas: [
        "Take a power nap, but sleep in the pose of a goalkeeper anticipating a penalty kick.",
        "Splash cold water not on your face, but directly onto your bed so you can never lie down again."
      ]
    },

    broke: {
      tag: "💸 Broke Dilemma",
      solutions: [
        {
          text: "Check your trouser pockets 16 times in the hope that a stray ₹2,000 note has spontaneously duplicated via mitosis.",
          sideEffect: "Pocket lint accumulation",
          cost: "₹0 found",
          time: "15 Minutes"
        },
        {
          text: "Declare your bedroom an independent sovereign republic and mint your own currency using plastic bottle caps.",
          sideEffect: "Local grocery store rejects bottle cap dollars",
          cost: "3 Bottle caps",
          time: "30 Minutes"
        },
        {
          text: "Politely address the ATM machine using gentle words of encouragement and affirmation.",
          sideEffect: "Security guard gives you a suspicious look",
          cost: "Dignity",
          time: "5 Minutes"
        }
      ],
      worseIdeas: [
        "Try to pay your electricity bill with a fresh jackfruit and a written poem about green energy.",
        "Look for buried pirate treasure underneath your living room carpet tiles."
      ]
    },

    mosquitoes: {
      tag: "🦟 Mosquito Dilemma",
      solutions: [
        {
          text: "Negotiate a bilateral peace treaty with the mosquito general. Offer your left elbow in exchange for your right ear.",
          sideEffect: "Mosquitoes ignore treaty terms completely",
          cost: "3 Drops of blood",
          time: "10 Minutes"
        },
        {
          text: "Equip two badminton rackets, execute 360-degree kung-fu swings in the dark, and claim victory over thin air.",
          sideEffect: "Broken lamp and bruised shins",
          cost: "1 Broken lampshade",
          time: "25 Minutes"
        }
      ],
      worseIdeas: [
        "Invite a family of frogs to reside permanently inside your bedroom as natural biological air defense.",
        "Wear an astronaut suit made entirely of bubble wrap and sleep in the bathtub."
      ]
    },

    bugs: {
      tag: "💻 404 Code Bugs",
      solutions: [
        {
          text: "Delete all comments in your codebase. If the code can't explain itself, neither can the compiler.",
          sideEffect: "Future you will weep bitter tears",
          cost: "Code sanity",
          time: "5 Minutes"
        },
        {
          text: "Place a hockey stick across your keyboard. Whatever characters it types, git commit -m 'Fixed with sports physics'.",
          sideEffect: "Build failed: syntax error unexpected 🏑",
          cost: "Job security",
          time: "2 Minutes"
        },
        {
          text: "Restart your computer 7 times in a row, facing northeast, while offering a slice of jackfruit to the Wi-Fi router.",
          sideEffect: "Router lights blink green in confusion",
          cost: "1 Slice jackfruit",
          time: "15 Minutes"
        }
      ],
      worseIdeas: [
        "Replace all semicolons with Greek question marks (;) and blame cosmic rays for the compiler errors.",
        "Push directly to main branch on Friday 5:59 PM and immediately throw your laptop into the Arabian Sea."
      ]
    },

    custom: {
      tag: "✍️ Custom Dilemma",
      solutions: [
        {
          text: "Procure a regulation hockey stick, align it precisely with a ripe jackfruit, and whisper your problem to it three times.",
          sideEffect: "Problem remains completely unbothered",
          cost: "Priceless",
          time: "42 Seconds"
        },
        {
          text: "Consult the sacred elders of uselessness: spin around three times, slap your forehead, and take a long nap.",
          sideEffect: "Mild dizziness",
          cost: "₹0",
          time: "1 Hour"
        }
      ],
      worseIdeas: [
        "Pretend the problem never existed and spend the afternoon teaching a coconut how to swim.",
        "Write a strongly-worded letter to the universe on the back of a grocery receipt."
      ]
    }
  };

  /* ==========================================================================
     3. Useless Facts Collection
     ========================================================================== */
  const USELESS_FACTS = [
    "Jackfruits don't play professional field hockey primarily due to their severe lack of wrist mobility and absence of sports insurance.",
    "A coconut falling from a tree has a 99.8% chance of not solving your calculus homework.",
    "Ceiling fans on speed 5 have solved 0% of personal financial problems, despite spinning very enthusiastically.",
    "If you shout at an umbrella inside a closed room, the umbrella will not take offense, but your family will.",
    "Ancient manuscripts indicate that zero battles in Kerala history were decided by throwing ripe jackfruits at the enemy.",
    "Holding a hockey stick while brushing your teeth does not improve dental hygiene, but makes you look like an intense athlete.",
    "The average adult spends 14 years of their life waiting for microwave food to cool down while burning their tongue anyway.",
    "Bananas share 50% of their DNA with humans, which explains why neither of them can parallel park on the first attempt.",
    "Placing your phone in airplane mode does not grant it the physical ability to fly across the living room.",
    "If you stare at an auto-rickshaw meter long enough, it will still charge you ₹30 extra for rain.",
    "Scientifically speaking, 10 out of 10 jackfruits prefer being left on the tree rather than being substituted for a hockey ball.",
    "You cannot catch a cold from a cold cold-drink, but your mother will swear under oath that you can.",
    "The official Malayalam translation of 'Artificial Intelligence' is still pending approval from the village tea shop committee."
  ];

  /* ==========================================================================
     4. Confetti Engine (Canvas-Confetti with Lightweight Fallback)
     ========================================================================== */
  function fireConfetti() {
    if (typeof window.confetti === 'function') {
      // Primary high-quality canvas-confetti
      const colors = ['#FFD200', '#10B981', '#0284C7', '#FB7185', '#F59E0B'];
      window.confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.65 },
        colors: colors,
        disableForReducedMotion: true
      });

      // Side cannons for extra flair
      setTimeout(() => {
        window.confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        window.confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });
      }, 150);
    } else {
      // Fallback simple DOM sparkle burst
      createDomSparkles();
    }
  }

  function createDomSparkles() {
    const emojis = ['🥭', '🏑', '✨', '🎉', '💥', '🥥'];
    for (let i = 0; i < 20; i++) {
      const span = document.createElement('span');
      span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      span.style.position = 'fixed';
      span.style.left = `${50 + (Math.random() * 40 - 20)}%`;
      span.style.top = `${60 + (Math.random() * 20 - 10)}%`;
      span.style.fontSize = `${Math.random() * 20 + 16}px`;
      span.style.pointerEvents = 'none';
      span.style.zIndex = '9999';
      span.style.transition = 'all 0.8s ease-out';
      document.body.appendChild(span);

      setTimeout(() => {
        span.style.transform = `translate(${(Math.random() - 0.5) * 300}px, -${Math.random() * 250 + 50}px) scale(0)`;
        span.style.opacity = '0';
      }, 20);

      setTimeout(() => span.remove(), 900);
    }
  }

  /* ==========================================================================
     5. DOM Elements & State
     ========================================================================== */
  const soundToggle = document.getElementById('soundToggle');
  const soundIcon = document.getElementById('soundIcon');
  const problemSelect = document.getElementById('problemSelect');
  const customContainer = document.getElementById('customProblemContainer');
  const customInput = document.getElementById('customProblemInput');
  const solveBtn = document.getElementById('solveBtn');
  const thinkingBox = document.getElementById('thinkingBox');
  const thinkingText = document.getElementById('thinkingText');
  const solutionCard = document.getElementById('solutionCard');
  const solutionProblemTag = document.getElementById('solutionProblemTag');
  const solutionText = document.getElementById('solutionText');
  const metaSideEffect = document.getElementById('metaSideEffect');
  const metaCost = document.getElementById('metaCost');
  const worseIdeaBtn = document.getElementById('worseIdeaBtn');
  const copyAdviceBtn = document.getElementById('copyAdviceBtn');
  const copyText = document.getElementById('copyText');
  const copyIcon = document.getElementById('copyIcon');
  const shareWhatsAppBtn = document.getElementById('shareWhatsAppBtn');
  const startSolvingBtn = document.getElementById('startSolvingBtn');
  const randomSurpriseBtn = document.getElementById('randomSurpriseBtn');
  const proverbBadge = document.getElementById('proverbBadge');
  const proverbModal = document.getElementById('proverbModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalUnderstoodBtn = document.getElementById('modalUnderstoodBtn');
  const footerProverbBtn = document.getElementById('footerProverbBtn');
  const footerResetBtn = document.getElementById('footerResetBtn');
  const newFactBtn = document.getElementById('newFactBtn');
  const factQuote = document.getElementById('factQuote');
  const factNumber = document.getElementById('factNumber');
  const gaugeNumber = document.getElementById('gaugeNumber');
  const gaugeTagline = document.getElementById('gaugeTagline');
  const toastMessage = document.getElementById('toastMessage');
  const floatingBg = document.getElementById('floatingBg');
  const unlockedBadgeCount = document.getElementById('unlockedBadgeCount');
  const heroMascot = document.getElementById('heroMascot');
  const targetJackfruit = document.getElementById('targetJackfruit');
  const gameScoreEl = document.getElementById('gameScore');
  const problemsUnsolvedEl = document.getElementById('problemsUnsolvedCount');

  let currentCategory = 'hungry';
  let lastSolutionIndex = -1;
  let gameScore = 0;
  let unsolvedProblemsTicker = 1428913;

  const thinkingPhrases = [
    "Consulting senior council of jackfruits...",
    "Calculating trajectory with zero hockey physics...",
    "Subtracting common sense from the equation...",
    "Asking an elderly coconut tree for advice...",
    "Reversing logic gates to achieve maximum uselessness...",
    "Simulating bad life choices in 4K resolution..."
  ];

  const gaugeTaglines = [
    "Certified 100% Ineffective. Science is speechless.",
    "Zero utility detected. Nobel Prize in Confusion pending.",
    "Scientists tested this on 50 lab squirrels. All were baffled.",
    "Efficiency: Negative Infinity. Well done.",
    "Guaranteed not to help even a microscopic fraction.",
    "Peer-reviewed by 3 crows and an unripe mango."
  ];

  /* ==========================================================================
     6. Ambient Floating Emojis
     ========================================================================== */
  const FLOAT_EMOJIS = ['🥭', '🏑', '🥥', '🥭', '🌧️', '🔋', '📚', '🥭', '🏑'];

  function createFloatingItem() {
    if (!floatingBg) return;
    const item = document.createElement('div');
    item.className = 'floating-item';
    item.textContent = FLOAT_EMOJIS[Math.floor(Math.random() * FLOAT_EMOJIS.length)];
    item.style.left = `${Math.random() * 95}vw`;
    item.style.fontSize = `${Math.random() * 24 + 22}px`;
    item.style.animationDuration = `${Math.random() * 12 + 14}s`;
    item.style.animationDelay = `${Math.random() * 2}s`;

    // Click to pop!
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playPop();
      showMiniToast(e.clientX, e.clientY, "+0 Useful Points! 🥭");
      item.style.transform = 'scale(2)';
      item.style.opacity = '0';
      setTimeout(() => item.remove(), 200);
    });

    floatingBg.appendChild(item);

    // Remove when animation finishes
    setTimeout(() => {
      if (item.parentNode) item.remove();
    }, 26000);
  }

  // Seed initial floating elements
  for (let i = 0; i < 12; i++) {
    setTimeout(createFloatingItem, i * 600);
  }
  setInterval(createFloatingItem, 2500);

  function showMiniToast(x, y, text) {
    const pop = document.createElement('div');
    pop.textContent = text;
    pop.style.position = 'fixed';
    pop.style.left = `${x}px`;
    pop.style.top = `${y}px`;
    pop.style.transform = 'translate(-50%, -50%)';
    pop.style.background = '#FEF08A';
    pop.style.color = '#854D0E';
    pop.style.fontFamily = 'var(--font-heading)';
    pop.style.fontWeight = '700';
    pop.style.fontSize = '0.85rem';
    pop.style.padding = '4px 10px';
    pop.style.borderRadius = '9999px';
    pop.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    pop.style.pointerEvents = 'none';
    pop.style.zIndex = '9999';
    pop.style.transition = 'all 0.6s ease-out';
    document.body.appendChild(pop);

    setTimeout(() => {
      pop.style.transform = 'translate(-50%, -80px) scale(1.1)';
      pop.style.opacity = '0';
    }, 20);
    setTimeout(() => pop.remove(), 650);
  }

  /* ==========================================================================
     7. Problem Dropdown & Generation Logic
     ========================================================================== */
  problemSelect.addEventListener('change', (e) => {
    sound.playBoing();
    const val = e.target.value;
    if (val === 'custom') {
      customContainer.classList.remove('hidden');
      customInput.focus();
    } else {
      customContainer.classList.add('hidden');
    }
  });

  solveBtn.addEventListener('click', () => {
    sound.playSlide();
    triggerSolutionGeneration();
  });

  function triggerSolutionGeneration(forceCategory = null) {
    let cat = forceCategory || problemSelect.value;
    if (!cat) {
      // Auto pick a funny random one if nothing selected
      const keys = Object.keys(DATABASE).filter(k => k !== 'custom');
      cat = keys[Math.floor(Math.random() * keys.length)];
      problemSelect.value = cat;
      customContainer.classList.add('hidden');
    }

    currentCategory = cat;

    // Show comical thinking state
    solutionCard.classList.add('hidden');
    thinkingBox.classList.remove('hidden');
    thinkingText.textContent = thinkingPhrases[Math.floor(Math.random() * thinkingPhrases.length)];

    // Button vibration
    solveBtn.style.transform = 'scale(0.96)';
    setTimeout(() => { solveBtn.style.transform = ''; }, 150);

    setTimeout(() => {
      thinkingBox.classList.add('hidden');
      displayRandomSolution(cat);
      sound.playChime();
      fireConfetti();

      // Tick unsolved counter up
      unsolvedProblemsTicker++;
      if (problemsUnsolvedEl) {
        problemsUnsolvedEl.textContent = unsolvedProblemsTicker.toLocaleString();
      }

      // Scroll smoothly to solution
      solutionCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 600);
  }

  function displayRandomSolution(categoryKey) {
    const data = DATABASE[categoryKey] || DATABASE.hungry;
    let solutions = data.solutions;

    let index = Math.floor(Math.random() * solutions.length);
    if (solutions.length > 1 && index === lastSolutionIndex) {
      index = (index + 1) % solutions.length;
    }
    lastSolutionIndex = index;

    const sol = solutions[index];

    let customText = (categoryKey === 'custom' && customInput.value.trim()) ? `Regarding "${customInput.value.trim()}": ` : '';

    solutionProblemTag.textContent = data.tag;
    solutionText.textContent = `"${customText}${sol.text}"`;
    metaSideEffect.textContent = sol.sideEffect;
    metaCost.textContent = sol.cost;

    solutionCard.classList.remove('hidden');

    // Update 0% meter roast
    gaugeTagline.textContent = gaugeTaglines[Math.floor(Math.random() * gaugeTaglines.length)];
    gaugeNumber.textContent = "0.00%";
  }

  // Generate Even Worse Idea Button
  worseIdeaBtn.addEventListener('click', () => {
    sound.playHonk();
    const data = DATABASE[currentCategory] || DATABASE.hungry;
    const worse = data.worseIdeas || [
      "Ask a friendly coconut to take over your life obligations for the next 7 years.",
      "Sprint to the nearest hockey turf and challenge a jackfruit to sudden-death penalty kicks."
    ];

    const pick = worse[Math.floor(Math.random() * worse.length)];

    solutionText.textContent = `💥 EVEN WORSE IDEA: "${pick}"`;
    metaSideEffect.textContent = "Catastrophic comedy failure";
    metaCost.textContent = "3 Extra Braincells (Lost forever)";

    // Mini screen shake on worse idea
    document.body.style.transform = 'translateX(4px)';
    setTimeout(() => { document.body.style.transform = 'translateX(-4px)'; }, 50);
    setTimeout(() => { document.body.style.transform = 'translateX(2px)'; }, 100);
    setTimeout(() => { document.body.style.transform = ''; }, 150);

    // Confetti
    fireConfetti();
    showToast("Disaster Escalated! 💥");
  });

  // Copy Advice to Clipboard
  copyAdviceBtn.addEventListener('click', async () => {
    sound.playBoing();
    const textToCopy = `Chakkakku Hockey Useless Advice:\n${solutionText.textContent}\n\nSolved 0% at: https://chakkakku-hockey.local 🥭🏑`;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = textToCopy;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      copyIcon.textContent = "✅";
      copyText.textContent = "Copied Nonsense!";
      showToast("Useless advice copied! Paste responsibly 🥭");
      setTimeout(() => {
        copyIcon.textContent = "📋";
        copyText.textContent = "Copy Useless Advice";
      }, 2500);
    } catch (err) {
      showToast("Advice is too useless to copy! 🥭");
    }
  });

  // Share via WhatsApp
  shareWhatsAppBtn.addEventListener('click', () => {
    sound.playBoing();
    const msg = encodeURIComponent(`🥭 Chakkakku Hockey Advice:\n${solutionText.textContent}\n\nEvery problem deserves the wrong solution! 🏑`);
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
  });

  // Hero "Start Solving Wrongly" button
  startSolvingBtn.addEventListener('click', () => {
    sound.playBoing();
    const solverSec = document.getElementById('solverSection');
    if (solverSec) {
      solverSec.scrollIntoView({ behavior: 'smooth' });
      problemSelect.focus();
    }
  });

  // Hero "Surprise Disaster" button
  randomSurpriseBtn.addEventListener('click', () => {
    sound.playSlide();
    const keys = Object.keys(DATABASE).filter(k => k !== 'custom');
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    problemSelect.value = randomKey;
    customContainer.classList.add('hidden');
    triggerSolutionGeneration(randomKey);
  });

  // Hero Mascot Click easter egg
  heroMascot.addEventListener('click', () => {
    sound.playBoing();
    heroMascot.style.transform = 'scale(1.2) rotate(15deg)';
    fireConfetti();
    showToast("Jackie says: Always aim for the jackfruit! 🥭");
    setTimeout(() => {
      heroMascot.style.transform = '';
    }, 400);
  });

  /* ==========================================================================
     8. Sound Toggle
     ========================================================================== */
  soundToggle.addEventListener('click', () => {
    const isEnabled = sound.toggle();
    if (isEnabled) {
      soundIcon.textContent = '🔊';
      soundToggle.querySelector('.sound-label').textContent = 'Sound On';
      sound.playBoing();
      showToast("Sound effects enabled! 🎶");
    } else {
      soundIcon.textContent = '🔇';
      soundToggle.querySelector('.sound-label').textContent = 'Muted';
      showToast("Sound muted 🔇");
    }
  });

  /* ==========================================================================
     9. Badges Interaction
     ========================================================================== */
  const badgeCards = document.querySelectorAll('.badge-card');
  badgeCards.forEach(badge => {
    badge.addEventListener('click', () => {
      const isUnlocked = badge.classList.contains('unlocked');
      if (isUnlocked) {
        sound.playBoing();
        badge.style.transform = 'scale(1.1) rotate(4deg)';
        setTimeout(() => { badge.style.transform = ''; }, 300);
        showToast(`Honored: ${badge.querySelector('.badge-name').textContent}! 🎖️`);
      } else {
        badge.classList.add('unlocked');
        sound.playChime();
        fireConfetti();
        updateBadgeCounter();
        showToast(`Badge Unlocked: ${badge.querySelector('.badge-name').textContent}! 🎉`);
      }
    });
  });

  function updateBadgeCounter() {
    const count = document.querySelectorAll('.badge-card.unlocked').length;
    if (unlockedBadgeCount) {
      unlockedBadgeCount.textContent = count;
    }
  }

  /* ==========================================================================
     10. Random Useless Fact Generator
     ========================================================================== */
  let factIdx = 0;
  newFactBtn.addEventListener('click', () => {
    sound.playBoing();
    factIdx = (factIdx + 1) % USELESS_FACTS.length;
    factQuote.style.opacity = '0';
    factQuote.style.transform = 'translateY(10px)';

    setTimeout(() => {
      factQuote.textContent = `"${USELESS_FACTS[factIdx]}"`;
      factNumber.textContent = (factIdx + 1).toString().padStart(2, '0');
      factQuote.style.transition = 'all 0.3s ease';
      factQuote.style.opacity = '1';
      factQuote.style.transform = 'translateY(0)';
    }, 200);
  });

  /* ==========================================================================
     11. Mini-Game: Jackfruit Hockey Tap
     ========================================================================== */
  const gameArena = document.getElementById('gameArena');
  if (targetJackfruit && gameArena) {
    targetJackfruit.addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playPop();
      gameScore++;
      gameScoreEl.textContent = gameScore;

      // Confetti burst on multiples of 5
      if (gameScore % 5 === 0) {
        sound.playChime();
        fireConfetti();
        showToast(`High Score: ${gameScore} totally useless taps! 🏆`);
      }

      // Move target to a random position in arena
      const maxX = gameArena.clientWidth - 80;
      const maxY = gameArena.clientHeight - 80;
      const nextX = Math.max(10, Math.floor(Math.random() * maxX));
      const nextY = Math.max(10, Math.floor(Math.random() * maxY));

      targetJackfruit.style.left = `${nextX}px`;
      targetJackfruit.style.top = `${nextY}px`;
      targetJackfruit.style.transform = 'scale(1.25)';
      setTimeout(() => { targetJackfruit.style.transform = ''; }, 200);
    });
  }

  /* ==========================================================================
     12. Proverb Modal
     ========================================================================== */
  function openProverbModal() {
    sound.playSlide();
    proverbModal.classList.remove('hidden');
  }

  function closeProverbModal() {
    sound.playBoing();
    proverbModal.classList.add('hidden');
  }

  proverbBadge.addEventListener('click', openProverbModal);
  if (footerProverbBtn) footerProverbBtn.addEventListener('click', openProverbModal);
  closeModalBtn.addEventListener('click', closeProverbModal);
  modalUnderstoodBtn.addEventListener('click', closeProverbModal);

  proverbModal.addEventListener('click', (e) => {
    if (e.target === proverbModal) closeProverbModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !proverbModal.classList.contains('hidden')) {
      closeProverbModal();
    }
  });

  /* ==========================================================================
     13. Toast Notification Helper
     ========================================================================== */
  let toastTimeout;
  function showToast(msg) {
    if (!toastMessage) return;
    toastMessage.textContent = msg;
    toastMessage.classList.remove('hidden');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastMessage.classList.add('hidden');
    }, 3000);
  }

  /* ==========================================================================
     14. Reset All Nonsense
     ========================================================================== */
  if (footerResetBtn) {
    footerResetBtn.addEventListener('click', () => {
      sound.playHonk();
      problemSelect.selectedIndex = 0;
      customContainer.classList.add('hidden');
      solutionCard.classList.add('hidden');
      thinkingBox.classList.add('hidden');
      gameScore = 0;
      if (gameScoreEl) gameScoreEl.textContent = '0';
      showToast("Everything reset to pristine zero usefulness! 🔄");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
