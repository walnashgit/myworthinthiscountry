// Canonical seed dataset for Value of Your Life — a public ledger of India's preventable
// tragedies and who answered for them.
//
// Schema per incident:
//   id            stable kebab-case slug
//   name          common name of the incident
//   date          ISO date (YYYY-MM-DD)
//   state         Indian state / UT
//   city          city or district
//   category      fire | stampede | collapse | rail | industrial | flood-landslide | aviation | sabotage
//   deaths        widely reported death toll (see tollNote where disputed)
//   injured       widely reported injured count (null if unclear)
//   tollNote      optional note when the official toll is disputed
//   summary       what happened
//   officialResponse  what the government did afterwards
//   blamed        who the state / inquiries pointed the finger at
//   punished      [{who, outcome}] — individuals/entities actually acted against
//   convictions   number of people criminally CONVICTED by a court (not arrested, not suspended)
//   caseStatus    trial-ongoing | investigation-ongoing | convicted | acquitted | closed-no-charges | compensation-only
//   compensation  ex-gratia / court-ordered compensation, if announced
//   exGratiaPerLife  ₹ per deceased announced by the state (null when unclear)
//   image         {src, credit} — Wikimedia Commons image or site photo (null if none)
//   sources       [{title, url, publisher?}] — first is Wikipedia; rest are news reports
//
// Data is community-maintained, compiled from public reporting, and may be
// incomplete or out of date. Corrections welcome. Last reviewed: 2026-07.

window.INCIDENTS = [
  {
    "id": "morbi-bridge-collapse-2022",
    "name": "Morbi suspension bridge collapse",
    "date": "2022-10-30",
    "state": "Gujarat",
    "city": "Morbi",
    "category": "collapse",
    "deaths": 135,
    "injured": 180,
    "summary": "A 143-year-old colonial-era suspension footbridge over the Machchhu river collapsed four days after reopening from renovation, with roughly 300 people on it. The Oreva Group — a clock and appliance maker — held the operation and maintenance contract and reopened the bridge without a municipal fitness certificate, selling unlimited tickets.",
    "officialResponse": "SIT formed; Gujarat High Court took suo motu cognisance. The Morbi municipality's chief officer was suspended. Assembly elections held weeks later saw no ministerial resignation.",
    "blamed": "Oreva Group and its subcontractors; ticketing clerks and security guards were the first arrested. The municipality that awarded the contract without tender faced no criminal action as an institution.",
    "punished": [
      {
        "who": "Jaysukh Patel, Oreva Group MD",
        "outcome": "Arrested Jan 2023; charged with culpable homicide not amounting to murder; granted bail by Supreme Court in 2024; trial ongoing"
      },
      {
        "who": "9 lower-level accused (ticket clerks, guards, repair subcontractors)",
        "outcome": "Arrested; several granted bail; trial ongoing"
      },
      {
        "who": "Sandipsinh Zala, Morbi municipality chief officer",
        "outcome": "Suspended; no criminal conviction"
      }
    ],
    "convictions": 0,
    "caseStatus": "trial-ongoing",
    "compensation": "₹10 lakh per deceased (₹4L state + ₹6L Oreva, HC-directed); Oreva also directed to compensate orphaned children",
    "exGratiaPerLife": 1000000,
    "image": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Hanging_Bridge_from_Opposite_Side_Morbi_-_panoramio.jpg",
      "credit": "Wikimedia Commons, via 2022 Morbi bridge collapse"
    },
    "sources": [
      {
        "title": "Wikipedia: 2022 Morbi bridge collapse",
        "url": "https://en.wikipedia.org/wiki/2022_Morbi_bridge_collapse"
      },
      {
        "title": "Gujarat: Toll rises to 132 in Morbi bridge collapse",
        "url": "https://scroll.in/latest/1036222/over-100-dead-in-gujarat-bridge-collapse-177-rescued-so-far",
        "publisher": "Scroll.in"
      },
      {
        "title": "Morbi bridge collapse: HC says there may have been collusion between civic body and Oreva group",
        "url": "https://scroll.in/latest/1042590/morbi-bridge-collapse-hc-says-there-may-have-been-collusion-between-civic-body-and-oreva-group",
        "publisher": "Scroll.in"
      }
    ]
  },
  {
    "id": "chinnaswamy-stampede-2025",
    "name": "Bengaluru Chinnaswamy Stadium stampede",
    "date": "2025-06-04",
    "state": "Karnataka",
    "city": "Bengaluru",
    "category": "stampede",
    "deaths": 11,
    "injured": 56,
    "summary": "A crowd crush outside M. Chinnaswamy Stadium during Royal Challengers Bengaluru's IPL victory celebration, after lakhs turned up for an event announced at short notice with free-pass confusion and gates far exceeding capacity. The state government had encouraged the felicitation.",
    "officialResponse": "Magisterial and judicial (Justice John Michael D'Cunha) inquiries ordered; five police officers including Bengaluru's police commissioner suspended or transferred; RCB, DNA Entertainment and KSCA officials arrested and later bailed. The Central Administrative Tribunal later revoked one IPS officer's suspension, observing police were made scapegoats.",
    "blamed": "RCB (held 'prima facie responsible' by the D'Cunha commission and CAT for announcing the event without permission), event managers DNA, KSCA, and police officers. No minister resigned; the government that co-hosted the felicitation faced no action.",
    "punished": [
      {
        "who": "IPS officer Vikash Kumar Vikash & other police officers",
        "outcome": "Suspended; CAT quashed the suspension calling officers scapegoats; government appealed"
      },
      {
        "who": "B. Dayananda, Bengaluru Police Commissioner",
        "outcome": "Transferred/removed from post"
      },
      {
        "who": "RCB, DNA Entertainment & KSCA executives (incl. Nikhil Sosale)",
        "outcome": "Arrested; released on bail; trial/inquiry ongoing"
      }
    ],
    "convictions": 0,
    "caseStatus": "investigation-ongoing",
    "compensation": "₹10 lakh per deceased announced by state; RCB announced ₹10 lakh per family",
    "exGratiaPerLife": 1000000,
    "image": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Chinnaswamy_Stadium_during_India_vs_New_Zealand_Test_Match%2COctober_2024_3.jpg/960px-Chinnaswamy_Stadium_during_India_vs_New_Zealand_Test_Match%2COctober_2024_3.jpg",
      "credit": "The site: M. Chinnaswamy Stadium, Bengaluru — Wikimedia Commons"
    },
    "sources": [
      {
        "title": "Wikipedia: 2025 Bengaluru stampede",
        "url": "https://en.wikipedia.org/wiki/2025_Bengaluru_stampede"
      },
      {
        "title": "Bengaluru: 11 dead in stampede at stadium during IPL victory celebrations",
        "url": "https://scroll.in/latest/1083195/bengaluru-several-feared-dead-in-stampede-during-ipl-victory-celebrations-say-reports",
        "publisher": "Scroll.in"
      },
      {
        "title": "RCB marketing head among four arrested over Bengaluru stampede",
        "url": "https://scroll.in/latest/1083250/rcb-marketing-head-among-four-arrested-over-bengaluru-stampede",
        "publisher": "Scroll.in"
      }
    ]
  },
  {
    "id": "balasore-train-collision-2023",
    "name": "Balasore triple-train collision",
    "date": "2023-06-02",
    "state": "Odisha",
    "city": "Bahanaga, Balasore",
    "category": "rail",
    "deaths": 296,
    "injured": 1200,
    "summary": "The Coromandel Express was diverted by a wrongly-set signal into a stationary goods train at Bahanaga Bazar; derailed coaches were then struck by the Yeshvantpur–Howrah Express. India's deadliest rail disaster in over two decades, traced to signalling circuit failures linked to unauthorized repair work.",
    "officialResponse": "CBI probe ordered alongside the Commissioner of Railway Safety inquiry; CRS report cited lapses in the signalling department and flagged that similar wiring faults had been reported earlier and ignored.",
    "blamed": "Three field-level signal engineers. The Railway Board, railway minister, and senior zonal officials faced no action; the minister did not resign.",
    "punished": [
      {
        "who": "Arun Kumar Mahanta, Mohammed Amir Khan, Pappu Kumar (senior section engineer & technicians)",
        "outcome": "Arrested by CBI under culpable homicide charges; chargesheeted; trial ongoing"
      }
    ],
    "convictions": 0,
    "caseStatus": "trial-ongoing",
    "compensation": "₹10 lakh per deceased (Railways) plus PM/CM relief funds",
    "exGratiaPerLife": 1000000,
    "image": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/The_wreckage_of_the_three_compartments_of_the_Coromandel_Express_lies_beside_the_line.jpg/960px-The_wreckage_of_the_three_compartments_of_the_Coromandel_Express_lies_beside_the_line.jpg",
      "credit": "Wikimedia Commons, via 2023 Odisha train collision"
    },
    "sources": [
      {
        "title": "Wikipedia: 2023 Odisha train collision",
        "url": "https://en.wikipedia.org/wiki/2023_Odisha_train_collision"
      },
      {
        "title": "Odisha train collision toll rises to 288, around 900 injured",
        "url": "https://scroll.in/latest/1050271/233-dead-over-900-injured-as-trains-derail-in-odisha",
        "publisher": "Scroll.in"
      },
      {
        "title": "Odisha train accident: CBI arrests three railway officials",
        "url": "https://scroll.in/latest/1052252/odisha-train-accident-cbi-arrests-three-railway-officials",
        "publisher": "Scroll.in"
      }
    ]
  },
  {
    "id": "hathras-stampede-2024",
    "name": "Hathras satsang stampede",
    "date": "2024-07-02",
    "state": "Uttar Pradesh",
    "city": "Phulrai, Hathras",
    "category": "stampede",
    "deaths": 121,
    "injured": 150,
    "summary": "A crush at a religious gathering of preacher Suraj Pal ('Bhole Baba') attended by an estimated 2.5 lakh people against a permission for 80,000. Devotees surged to touch the preacher's feet as he left; most of the dead were women.",
    "officialResponse": "Judicial commission and SIT formed; SIT blamed organizers and suspended six local officials (SDM, CO, tehsildar among them). The preacher was not named in the FIR and the judicial commission later gave him a clean chit, blaming organizers and 'unknown conspirators'.",
    "blamed": "Event organizers and the crowd itself; local officials suspended. The preacher at whose event 121 people died faced no charges.",
    "punished": [
      {
        "who": "Devprakash Madhukar (main organizer) and 10 other organizers",
        "outcome": "Arrested; trial ongoing"
      },
      {
        "who": "6 local officials (SDM Sikandra Rao & others)",
        "outcome": "Suspended; no criminal charges"
      },
      {
        "who": "Suraj Pal ('Bhole Baba')",
        "outcome": "Not named in FIR; cleared by judicial commission"
      }
    ],
    "convictions": 0,
    "caseStatus": "trial-ongoing",
    "compensation": "₹2 lakh per deceased (state), ₹2 lakh (PMNRF)",
    "exGratiaPerLife": 400000,
    "image": null,
    "sources": [
      {
        "title": "Wikipedia: 2024 Hathras stampede",
        "url": "https://en.wikipedia.org/wiki/2024_Hathras_stampede"
      },
      {
        "title": "Uttar Pradesh: At least 50 killed in stampede at religious gathering in Hathras",
        "url": "https://scroll.in/latest/1070092/uttar-pradesh-at-least-50-killed-in-stampede-at-religious-gathering-in-hathras",
        "publisher": "Scroll.in"
      },
      {
        "title": "Hathras stampede: FIR registered against organisers of religious event, preacher not booked",
        "url": "https://scroll.in/latest/1070107/hathras-stampede-fir-registered-against-organisers-of-religious-event-preacher-not-booked",
        "publisher": "Scroll.in"
      }
    ]
  },
  {
    "id": "rajkot-game-zone-fire-2024",
    "name": "Rajkot TRP Game Zone fire",
    "date": "2024-05-25",
    "state": "Gujarat",
    "city": "Rajkot",
    "category": "fire",
    "deaths": 27,
    "injured": 3,
    "summary": "Fire tore through a gaming and amusement arcade built largely of temporary sheds, operating for years without a fire NOC. Welding work reportedly sparked the blaze near stored petrol and diesel generators; a single exit trapped visitors, including children.",
    "officialResponse": "SIT formed; Gujarat HC took suo motu note calling it a 'man-made disaster' and pulled up municipal corporations statewide. Several municipal officials arrested — a relative rarity — after the HC's pressure.",
    "blamed": "Game zone owners and partners; Rajkot Municipal Corporation officials who let it run without clearance for years.",
    "punished": [
      {
        "who": "TRP Game Zone owners/partners (Yuvrajsinh Solanki, Rahul Rathod & others)",
        "outcome": "Arrested; charged with culpable homicide; trial ongoing"
      },
      {
        "who": "RMC officials incl. town planning officers & fire officers",
        "outcome": "Arrested/suspended after HC intervention; trial ongoing"
      }
    ],
    "convictions": 0,
    "caseStatus": "trial-ongoing",
    "compensation": "₹4 lakh per deceased (state), ₹2 lakh (PMNRF)",
    "exGratiaPerLife": 600000,
    "image": null,
    "sources": [
      {
        "title": "Wikipedia: 2024 Rajkot fire",
        "url": "https://en.wikipedia.org/wiki/2024_Rajkot_fire"
      },
      {
        "title": "Gujarat: 27 killed in Rajkot gaming zone fire, three detained",
        "url": "https://scroll.in/latest/1068366/gujarat-27-killed-in-rajkot-gaming-zone-fire-three-detained",
        "publisher": "Scroll.in"
      },
      {
        "title": "Gujarat HC takes cognisance of gaming zone fire, says it seems to have been man-made disaster",
        "url": "https://scroll.in/latest/1068387/gujarat-hc-takes-cognisance-of-gaming-zone-fire-says-it-seems-to-have-been-man-made-disaster",
        "publisher": "Scroll.in"
      }
    ]
  },
  {
    "id": "wayanad-landslides-2024",
    "name": "Wayanad landslides",
    "date": "2024-07-30",
    "state": "Kerala",
    "city": "Mundakkai–Chooralmala, Wayanad",
    "category": "flood-landslide",
    "deaths": 254,
    "injured": 397,
    "tollNote": "254 bodies recovered; over 100 remained missing and are presumed dead — several counts place the true toll above 400.",
    "summary": "Pre-dawn landslides buried the villages of Mundakkai and Chooralmala after extreme rainfall. Scientists had long flagged the region's landslide susceptibility; the Gadgil committee (2011) had recommended restricting construction and quarrying in these Western Ghats zones — recommendations successive governments shelved.",
    "officialResponse": "Massive rescue operation; rehabilitation township announced. Centre and state disputed over disaster funds and whether adequate early warnings were issued. No inquiry fixed responsibility on any authority for ignoring ecological zoning warnings.",
    "blamed": "Extreme rainfall / climate change. Unregulated quarrying, tourism construction, and the shelving of Western Ghats protection reports drew expert criticism but no official culpability.",
    "punished": [],
    "convictions": 0,
    "caseStatus": "closed-no-charges",
    "compensation": "Ex-gratia announced; state-built rehabilitation township for survivors",
    "exGratiaPerLife": null,
    "image": null,
    "sources": [
      {
        "title": "Wikipedia: 2024 Wayanad landslides",
        "url": "https://en.wikipedia.org/wiki/2024_Wayanad_landslides"
      },
      {
        "title": "Kerala: Toll in Wayanad landslides increases to 143",
        "url": "https://scroll.in/latest/1071439/kerala-toll-in-wayanad-landslides-increases-to-143",
        "publisher": "Scroll.in"
      },
      {
        "title": "Could the deaths caused by the Wayanad landslide been avoided?",
        "url": "https://scroll.in/article/1071597/could-the-deaths-caused-by-the-wayanad-landslide-been-avoided",
        "publisher": "Scroll.in"
      }
    ]
  },
  {
    "id": "new-delhi-station-stampede-2025",
    "name": "New Delhi railway station stampede",
    "date": "2025-02-15",
    "state": "Delhi",
    "city": "New Delhi",
    "category": "stampede",
    "deaths": 18,
    "injured": 15,
    "summary": "A crush on platforms 13–14 as thousands of Maha Kumbh-bound passengers converged; Railways continued selling unreserved tickets as crowds swelled, and a late platform change announcement reportedly triggered the surge.",
    "officialResponse": "Two-member Railways inquiry ordered; Delhi HC sought answers on ticket-sale caps. No official was named, suspended, or charged publicly.",
    "blamed": "Crowd surge and rumor; Railways initially denied a stampede had occurred at all.",
    "punished": [],
    "convictions": 0,
    "caseStatus": "investigation-ongoing",
    "compensation": "₹10 lakh per deceased (Railways)",
    "exGratiaPerLife": 1000000,
    "image": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Platform_14_and_15_of_New_Delhi_railway_station.jpg/960px-Platform_14_and_15_of_New_Delhi_railway_station.jpg",
      "credit": "Wikimedia Commons, via 2025 New Delhi railway station crowd crush"
    },
    "sources": [
      {
        "title": "Wikipedia: 2025 New Delhi railway station crowd crush",
        "url": "https://en.wikipedia.org/wiki/2025_New_Delhi_railway_station_crowd_crush"
      },
      {
        "title": "18 killed in stampede at New Delhi Railway Station amid Maha Kumbh rush",
        "url": "https://scroll.in/latest/1079214/18-killed-in-stampede-at-new-delhi-railway-station-amid-maha-kumbh-rush",
        "publisher": "Scroll.in"
      },
      {
        "title": "'Why sell excess tickets?': Delhi HC to Indian Railways after New Delhi stampede",
        "url": "https://scroll.in/latest/1079379/why-sell-excess-tickets-delhi-hc-to-indian-railways-after-new-delhi-stampede",
        "publisher": "Scroll.in"
      }
    ]
  },
  {
    "id": "maha-kumbh-stampede-2025",
    "name": "Maha Kumbh Mela stampede, Prayagraj",
    "date": "2025-01-29",
    "state": "Uttar Pradesh",
    "city": "Prayagraj",
    "category": "stampede",
    "deaths": 30,
    "injured": 60,
    "tollNote": "Official toll of 30 was widely disputed; media investigations counted substantially more deaths across the mela grounds that night.",
    "summary": "A pre-dawn crush at the Sangam on Mauni Amavasya, the holiest bathing day, as tens of millions converged. Barricading funnels and VIP movement corridors were blamed for compressing crowds. Authorities took hours to confirm deaths had occurred.",
    "officialResponse": "Judicial commission of inquiry formed; officials transferred quietly. The state faced sustained criticism for suppressing the true toll; families reported difficulty obtaining death certificates.",
    "blamed": "Crowd pressure. No official or minister was held responsible for barricade planning or VIP protocol.",
    "punished": [],
    "convictions": 0,
    "caseStatus": "investigation-ongoing",
    "compensation": "₹25 lakh per deceased announced",
    "exGratiaPerLife": 2500000,
    "image": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Pantoon_bridge_view_01.jpg/960px-Pantoon_bridge_view_01.jpg",
      "credit": "Crowds at the 2025 Maha Kumbh Mela, Prayagraj — Wikimedia Commons"
    },
    "sources": [
      {
        "title": "Wikipedia: 2025 Prayagraj stampede",
        "url": "https://en.wikipedia.org/wiki/2025_Prayagraj_stampede"
      },
      {
        "title": "30 dead, 60 injured after stampede at Maha Kumbh in Uttar Pradesh's Prayagraj",
        "url": "https://scroll.in/latest/1078492/stampede-breaks-out-at-maha-kumbh-mela-in-prayagraj-casualties-feared",
        "publisher": "Scroll.in"
      },
      {
        "title": "Uttar Pradesh government orders judicial probe into Maha Kumbh stampede",
        "url": "https://scroll.in/latest/1078556/uttar-pradesh-government-orders-judicial-probe-into-maha-kumbh-stampede",
        "publisher": "Scroll.in"
      }
    ]
  },
  {
    "id": "vizag-gas-leak-2020",
    "name": "Visakhapatnam (LG Polymers) gas leak",
    "date": "2020-05-07",
    "state": "Andhra Pradesh",
    "city": "Visakhapatnam",
    "category": "industrial",
    "deaths": 12,
    "injured": 585,
    "summary": "Styrene vapour leaked overnight from LG Polymers' chemical plant at RR Venkatapuram during COVID lockdown restart, killing 12 and hospitalizing hundreds in surrounding villages. The plant had operated for years seeking post-facto environmental clearance.",
    "officialResponse": "High-Power Committee found the company primarily responsible (poor safety protocol, inadequate monitoring); NGT imposed interim ₹50 crore deposit. Twelve arrests including the company's CEO and directors.",
    "blamed": "LG Polymers management. State pollution control board's years of tolerance of the unclearanced plant drew criticism but no prosecutions of regulators.",
    "punished": [
      {
        "who": "12 LG Polymers officials incl. CEO Sunkey Jeong & directors",
        "outcome": "Arrested 2020; granted bail; trial ongoing"
      }
    ],
    "convictions": 0,
    "caseStatus": "trial-ongoing",
    "compensation": "₹1 crore per deceased (state); NGT-directed environmental compensation",
    "exGratiaPerLife": 10000000,
    "image": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/What_is_Shipyard.jpg/960px-What_is_Shipyard.jpg",
      "credit": "Visakhapatnam, where the LG Polymers plant is located — Wikimedia Commons"
    },
    "sources": [
      {
        "title": "Wikipedia: Visakhapatnam gas leak",
        "url": "https://en.wikipedia.org/wiki/Visakhapatnam_gas_leak"
      },
      {
        "title": "Visakhapatnam: At least 11 dead after gas leak at chemical plant, over 200 hospitalised",
        "url": "https://scroll.in/latest/961241/visakhapatnam-at-least-three-dead-after-gas-leak-at-chemical-plant-many-unconscious-say-reports",
        "publisher": "Scroll.in"
      },
      {
        "title": "Vizag gas leak: NGT says LG Polymers has 'absolute liability', refuses to review penalty order",
        "url": "https://scroll.in/latest/963689/vizag-gas-leak-ngt-says-lg-polymers-has-absolute-liability-refuses-to-review-penalty-order",
        "publisher": "Scroll.in"
      }
    ]
  },
  {
    "id": "kedarnath-floods-2013",
    "name": "Uttarakhand floods (Kedarnath disaster)",
    "date": "2013-06-16",
    "state": "Uttarakhand",
    "city": "Kedarnath valley & statewide",
    "category": "flood-landslide",
    "deaths": 6054,
    "injured": 4200,
    "tollNote": "5,748 persons were officially 'presumed dead' in addition to recovered bodies; totals cited range from ~5,700 to above 6,000.",
    "summary": "Cloudbursts and the breach of the Chorabari lake devastated the Kedarnath valley at the peak of the pilgrimage season. A 2013 CAG report — published weeks before — had warned Uttarakhand's disaster management authority had never met and mitigation works were absent. Unregulated hotels, roads and hydropower construction on floodplains amplified the toll.",
    "officialResponse": "Rescue by armed forces; Supreme Court halted new hydropower clearances and ordered an expert body, which linked dams to amplified damage. No official, regulator, or builder was prosecuted.",
    "blamed": "Nature ('Himalayan tsunami'). CAG-documented institutional failure and floodplain construction produced no accountability.",
    "punished": [],
    "convictions": 0,
    "caseStatus": "closed-no-charges",
    "compensation": "Ex-gratia ₹5 lakh per deceased (combined central/state announcements)",
    "exGratiaPerLife": 500000,
    "image": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Northern_India_17_Jun_2013.jpg/960px-Northern_India_17_Jun_2013.jpg",
      "credit": "Wikimedia Commons, via 2013 North India floods"
    },
    "sources": [
      {
        "title": "Wikipedia: 2013 North India floods",
        "url": "https://en.wikipedia.org/wiki/2013_North_India_floods"
      },
      {
        "title": "Kedarnath floods: 10 years later, and after extensive reconstruction, is the fragile region safer?",
        "url": "https://scroll.in/article/1054308/a-decade-after-the-devastating-kedarnath-floods-is-the-fragile-region-any-safer",
        "publisher": "Scroll.in"
      },
      {
        "title": "Five years after Uttarakhand floods, survivors wait for wounds to heal, lessons remain unlearned",
        "url": "https://scroll.in/article/885292/five-years-after-uttarakhand-floods-survivors-wait-for-wounds-to-heal-lessons-remain-unlearned",
        "publisher": "Scroll.in"
      }
    ]
  },
  {
    "id": "chamoli-disaster-2021",
    "name": "Chamoli flash flood (Rishiganga disaster)",
    "date": "2021-02-07",
    "state": "Uttarakhand",
    "city": "Chamoli (Raini / Tapovan)",
    "category": "flood-landslide",
    "deaths": 204,
    "injured": 30,
    "tollNote": "83 bodies recovered; 121 listed missing, later presumed dead — most were workers inside the Tapovan-Vishnugad project tunnels.",
    "summary": "A rock-ice avalanche off Ronti peak sent a debris flow down the Rishiganga, destroying the Rishiganga hydel project and drowning workers in the under-construction NTPC Tapovan-Vishnugad tunnels. Villagers of Raini had petitioned courts for years against blasting and construction in the fragile zone.",
    "officialResponse": "Rescue operation; scientific studies commissioned. Hydropower policy in the para-glacial zone continued; no developer or clearance authority faced action for siting projects there despite the 2013 SC-ordered expert warnings.",
    "blamed": "Glacial rockfall / climate change. Project siting and clearance decisions were not investigated for culpability.",
    "punished": [],
    "convictions": 0,
    "caseStatus": "closed-no-charges",
    "compensation": "₹4 lakh (state) + ₹2 lakh (PMNRF) per deceased; NTPC compensation to workers' families",
    "exGratiaPerLife": 600000,
    "image": null,
    "sources": [
      {
        "title": "Wikipedia: 2021 Uttarakhand flood",
        "url": "https://en.wikipedia.org/wiki/2021_Uttarakhand_flood"
      },
      {
        "title": "Uttarakhand glacier burst: CM says experts will look at cause later as rescue operations continue",
        "url": "https://scroll.in/latest/986187/uttarakhand-glacier-burst-over-100-missing-power-plant-damaged-in-chamoli",
        "publisher": "Scroll.in"
      },
      {
        "title": "'We thought this is our end': India villagers on glacier disaster",
        "url": "https://www.aljazeera.com/news/2021/2/9/families-hopeless-as-search-for-survivors-in-uttarakhand-disaster",
        "publisher": "Al Jazeera"
      }
    ]
  },
  {
    "id": "amri-hospital-fire-2011",
    "name": "AMRI Hospital fire, Kolkata",
    "date": "2011-12-09",
    "state": "West Bengal",
    "city": "Kolkata (Dhakuria)",
    "category": "fire",
    "deaths": 92,
    "injured": 90,
    "summary": "Fire from an illegally stocked basement (flammable materials in a space meant for parking) filled the upmarket private hospital with smoke; most victims were sedated or immobile patients. Staff allegedly fled and delayed calling the fire brigade; windows were sealed.",
    "officialResponse": "License cancelled; 16 arrests including most of the AMRI board. The trial has crawled for over a decade with directors on bail.",
    "blamed": "AMRI directors and hospital management. Fire-safety inspectors who had flagged and then tolerated violations faced no prosecution.",
    "punished": [
      {
        "who": "AMRI directors incl. S.K. Todi, R.S. Goenka & board members",
        "outcome": "Arrested 2011; granted bail; trial ongoing 13+ years later, no verdict"
      }
    ],
    "convictions": 0,
    "caseStatus": "trial-ongoing",
    "compensation": "₹5 lakh per deceased (interim, court-directed); civil claims continued",
    "exGratiaPerLife": 500000,
    "image": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/AMRI_Hospital_-_Advanced_Medical_Research_Institute_-_Dhakuria_-_Kolkata_2014-02-12_2008.JPG/960px-AMRI_Hospital_-_Advanced_Medical_Research_Institute_-_Dhakuria_-_Kolkata_2014-02-12_2008.JPG",
      "credit": "Wikimedia Commons, via AMRI hospital fire"
    },
    "sources": [
      {
        "title": "Wikipedia: AMRI hospital fire",
        "url": "https://en.wikipedia.org/wiki/AMRI_hospital_fire"
      },
      {
        "title": "Arrests over India hospital fire",
        "url": "https://www.aljazeera.com/news/2011/12/9/arrests-over-india-hospital-fire",
        "publisher": "Al Jazeera"
      },
      {
        "title": "Kolkata hospital fire kills 90, AMRI loses licence",
        "url": "https://www.business-standard.com/article/economy-policy/kolkata-hospital-fire-kills-90-amri-loses-licence-111121000037_1.html",
        "publisher": "Business Standard"
      }
    ]
  },
  {
    "id": "vivekananda-flyover-collapse-2016",
    "name": "Vivekananda Road flyover collapse",
    "date": "2016-03-31",
    "state": "West Bengal",
    "city": "Kolkata (Burrabazar)",
    "category": "collapse",
    "deaths": 27,
    "injured": 80,
    "summary": "A 100-metre span of an under-construction flyover crashed onto a crowded Burrabazar intersection at midday. The project, awarded to IVRCL in 2009, was seven years behind schedule with repeated design and material concerns on record.",
    "officialResponse": "10 IVRCL officials arrested; company offices sealed. Charges of murder were later diluted; accused obtained bail. Trial remains inconclusive.",
    "blamed": "IVRCL engineers and management; KMDA's supervision of a long-delayed, repeatedly-flagged project escaped criminal scrutiny.",
    "punished": [
      {
        "who": "10 IVRCL officials & engineers",
        "outcome": "Arrested; charges diluted from murder to culpable homicide; bailed; trial ongoing"
      }
    ],
    "convictions": 0,
    "caseStatus": "trial-ongoing",
    "compensation": "₹5 lakh per deceased (state)",
    "exGratiaPerLife": 500000,
    "image": null,
    "sources": [
      {
        "title": "Wikipedia: Vivekananda Road flyover collapse",
        "url": "https://en.wikipedia.org/wiki/Vivekananda_Road_flyover_collapse"
      },
      {
        "title": "Kolkata flyover collapse: Police detain 10 construction company executives, toll rises to 24",
        "url": "https://scroll.in/latest/806004/kolkata-flyover-collapse-at-least-90-rescued-in-overnight-operations-police-say-24-confirmed-dead",
        "publisher": "Scroll.in"
      },
      {
        "title": "India bridge collapse: At least 23 killed in Kolkata",
        "url": "https://www.aljazeera.com/news/2016/4/1/india-bridge-collapse-at-least-23-killed-in-kolkata",
        "publisher": "Al Jazeera"
      }
    ]
  },
  {
    "id": "puttingal-temple-fire-2016",
    "name": "Puttingal temple fireworks explosion",
    "date": "2016-04-10",
    "state": "Kerala",
    "city": "Paravur, Kollam",
    "category": "fire",
    "deaths": 111,
    "injured": 350,
    "summary": "A competitive fireworks display held despite the district administration explicitly denying permission ignited a stockpile of explosives in a concrete storehouse, which detonated and brought down structures on thousands of devotees.",
    "officialResponse": "Crime branch probe; dozens of temple committee members and pyrotechnicians arrested. A judicial commission report was submitted; trial proceedings have dragged with most accused on bail.",
    "blamed": "Temple administration and fireworks contractors who defied the prohibition; police who failed to stop an openly advertised banned display faced departmental questions but no prosecution.",
    "punished": [
      {
        "who": "Temple committee office-bearers & pyrotechnic contractors (40+ accused)",
        "outcome": "Arrested; bailed; trial ongoing"
      }
    ],
    "convictions": 0,
    "caseStatus": "trial-ongoing",
    "compensation": "₹10 lakh per deceased (combined state/centre announcements)",
    "exGratiaPerLife": 1000000,
    "image": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/0/0d/%E0%B4%AA%E0%B5%81%E0%B4%B1%E0%B5%8D%E0%B4%B1%E0%B4%BF%E0%B4%99%E0%B5%8D%E0%B4%99%E0%B5%BD_%E0%B4%A6%E0%B5%87%E0%B4%B5%E0%B4%BF_%E0%B4%95%E0%B5%8D%E0%B4%B7%E0%B5%87%E0%B4%A4%E0%B5%8D%E0%B4%B0%E0%B4%82.jpg",
      "credit": "Wikimedia Commons, via Puttingal temple fire"
    },
    "sources": [
      {
        "title": "Wikipedia: Puttingal temple fire",
        "url": "https://en.wikipedia.org/wiki/Puttingal_temple_fire"
      },
      {
        "title": "At least 102 killed, more than 380 injured in Kerala temple fire",
        "url": "http://scroll.in/latest/806429/at-least-75-killed-more-than-200-injured-in-kerala-temple-fire",
        "publisher": "Scroll.in"
      },
      {
        "title": "Five held as death toll from India temple fire rises",
        "url": "https://www.aljazeera.com/news/2016/4/11/five-held-as-death-toll-from-india-temple-fire-rises",
        "publisher": "Al Jazeera"
      }
    ]
  },
  {
    "id": "elphinstone-stampede-2017",
    "name": "Elphinstone Road station stampede",
    "date": "2017-09-29",
    "state": "Maharashtra",
    "city": "Mumbai",
    "category": "stampede",
    "deaths": 23,
    "injured": 39,
    "summary": "A crush on the narrow, decades-old foot overbridge connecting Elphinstone Road and Parel stations during morning rush and sudden rain. Commuters and MPs had formally requested a wider bridge for years; sanction was pending in files while footfall multiplied.",
    "officialResponse": "Railway inquiry attributed the crush to rain-driven crowding and rumor of the bridge collapsing. The Army was brought in to build new footbridges. No railway official was held responsible for years of ignored requests.",
    "blamed": "Rain, rumor, and crowd panic — effectively the commuters themselves.",
    "punished": [],
    "convictions": 0,
    "caseStatus": "closed-no-charges",
    "compensation": "₹5 lakh per deceased (Railways)",
    "exGratiaPerLife": 500000,
    "image": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Mumbai_03-2016_84_Elphinstone_Road_station.jpg/960px-Mumbai_03-2016_84_Elphinstone_Road_station.jpg",
      "credit": "Wikimedia Commons, via 2017 Mumbai stampede"
    },
    "sources": [
      {
        "title": "Wikipedia: 2017 Mumbai stampede",
        "url": "https://en.wikipedia.org/wiki/2017_Mumbai_stampede"
      },
      {
        "title": "Mumbai stampede: After Elphinstone tragedy, minister says all suburban stations will be checked",
        "url": "https://scroll.in/latest/852314/at-least-three-dead-after-a-stampede-breaks-out-near-mumbais-elphinstone-railway-station",
        "publisher": "Scroll.in"
      },
      {
        "title": "India: At least 22 killed in Mumbai station stampede",
        "url": "https://www.aljazeera.com/news/2017/9/29/india-at-least-22-killed-in-mumbai-station-stampede",
        "publisher": "Al Jazeera"
      }
    ]
  },
  {
    "id": "amritsar-train-disaster-2018",
    "name": "Amritsar Dussehra train disaster",
    "date": "2018-10-19",
    "state": "Punjab",
    "city": "Amritsar (Joda Phatak)",
    "category": "rail",
    "deaths": 59,
    "injured": 100,
    "summary": "A DMU train ploughed through spectators standing on tracks watching a Ravana effigy burn at a Dussehra event held beside the railway line — an event held at the same spot for years with political patronage and no crowd barriers.",
    "officialResponse": "The Chief Commissioner of Railway Safety inquiry blamed the crowd for 'trespassing'; Railways said no fault of the driver. A magisterial inquiry gave the event organizer and officials effective clean chits. Case closed with no prosecution.",
    "blamed": "The victims themselves, for standing on railway tracks.",
    "punished": [],
    "convictions": 0,
    "caseStatus": "closed-no-charges",
    "compensation": "₹5 lakh per deceased (state) + ₹2 lakh (PMNRF)",
    "exGratiaPerLife": 700000,
    "image": null,
    "sources": [
      {
        "title": "Wikipedia: Amritsar train disaster",
        "url": "https://en.wikipedia.org/wiki/2018_Amritsar_train_disaster"
      },
      {
        "title": "Punjab: At least 58 killed as train hits crowd standing on track celebrating Dussehra in Amritsar",
        "url": "https://scroll.in/latest/898900/punjab-several-feared-dead-as-train-runs-into-people-watching-burning-of-ravana-effigy-in-amritsar",
        "publisher": "Scroll.in"
      },
      {
        "title": "Amritsar train accident probe blames negligence, trespassing for tragedy",
        "url": "https://www.business-standard.com/article/current-affairs/amritsar-train-accident-probe-blames-negligence-trespassing-for-tragedy-118112200888_1.html",
        "publisher": "Business Standard"
      }
    ]
  },
  {
    "id": "surat-coaching-fire-2019",
    "name": "Surat Takshashila Arcade coaching-centre fire",
    "date": "2019-05-24",
    "state": "Gujarat",
    "city": "Surat (Sarthana)",
    "category": "fire",
    "deaths": 22,
    "injured": 18,
    "summary": "Fire in an illegally added top floor of a commercial complex trapped teenage students of an art coaching class; several jumped from the third and fourth floors as no fire escape existed. The building had no fire NOC; the illegal floor stood for years.",
    "officialResponse": "Building co-owners and coaching class operator arrested; several Surat Municipal Corporation officials suspended and two arrested. Statewide fire-safety drives announced — and repeated after the next fire.",
    "blamed": "Builders and the coaching operator; suspended municipal officials returned to service over time.",
    "punished": [
      {
        "who": "Building co-owners & coaching class owner (Bhargav Butani & others)",
        "outcome": "Arrested; bailed; trial ongoing"
      },
      {
        "who": "SMC fire & town-planning officials",
        "outcome": "Suspensions; two arrests; no convictions"
      }
    ],
    "convictions": 0,
    "caseStatus": "trial-ongoing",
    "compensation": "₹4 lakh per deceased (state) + ₹2 lakh (PMNRF)",
    "exGratiaPerLife": 600000,
    "image": null,
    "sources": [
      {
        "title": "Wikipedia: Surat fire",
        "url": "https://en.wikipedia.org/wiki/2019_Surat_fire"
      },
      {
        "title": "Surat fire: Coaching centre owner arrested, police say 20 killed in blaze",
        "url": "https://scroll.in/latest/924697/surat-fire-man-who-conducted-coaching-classes-arrested-police-say-toll-has-risen-to-20",
        "publisher": "Scroll.in"
      },
      {
        "title": "India: Death toll in Surat coaching centre fire rises to 20",
        "url": "https://www.aljazeera.com/news/2019/5/25/india-death-toll-in-surat-coaching-centre-fire-rises-to-20",
        "publisher": "Al Jazeera"
      }
    ]
  },
  {
    "id": "anaj-mandi-fire-2019",
    "name": "Anaj Mandi factory fire, Delhi",
    "date": "2019-12-08",
    "state": "Delhi",
    "city": "Old Delhi (Anaj Mandi)",
    "category": "fire",
    "deaths": 43,
    "injured": 58,
    "summary": "A pre-dawn fire in an illegal bag-manufacturing unit operating inside a residential building suffocated migrant workers sleeping between their machines. The building had no fire clearance; a single stairwell was stacked with stock.",
    "officialResponse": "Owner and manager arrested within a day. Court proceedings continue; the civic and licensing apparatus that allowed hundreds of such units to run was not prosecuted.",
    "blamed": "The property owner and factory manager.",
    "punished": [
      {
        "who": "Rehan (property owner) & manager Furkan",
        "outcome": "Arrested; charged; trial ongoing"
      }
    ],
    "convictions": 0,
    "caseStatus": "trial-ongoing",
    "compensation": "₹10 lakh per deceased (Delhi govt) + ₹2 lakh (PMNRF)",
    "exGratiaPerLife": 1200000,
    "image": null,
    "sources": [
      {
        "title": "Wikipedia: 2019 Delhi factory fire",
        "url": "https://en.wikipedia.org/wiki/2019_Delhi_factory_fire"
      },
      {
        "title": "Anaj Mandi: After 43 people die in factory blaze, fire official says: 'Half of Delhi is like this'",
        "url": "https://scroll.in/article/946185/after-43-die-in-factory-blaze-fire-official-says-half-of-delhi-is-like-this",
        "publisher": "Scroll.in"
      },
      {
        "title": "New Delhi factory fire: Dozens of workers sleeping inside killed",
        "url": "https://www.aljazeera.com/news/2019/12/8/new-delhi-factory-fire-dozens-of-workers-sleeping-inside-killed",
        "publisher": "Al Jazeera"
      }
    ]
  },
  {
    "id": "mundka-fire-2022",
    "name": "Mundka commercial building fire, Delhi",
    "date": "2022-05-13",
    "state": "Delhi",
    "city": "Mundka, West Delhi",
    "category": "fire",
    "deaths": 27,
    "injured": 40,
    "summary": "Fire engulfed a four-storey commercial building housing a CCTV/router assembly firm operating without fire clearance; a single exit and one stairwell trapped mostly women workers attending a company event.",
    "officialResponse": "Company owners (Kothari brothers) and the building owner arrested; MCD officials' role in the unlicensed building noted by inquiries but not prosecuted.",
    "blamed": "Company owners and landlord.",
    "punished": [
      {
        "who": "Harish & Varun Goel (company owners) and building owner Manish Lakra",
        "outcome": "Arrested; trial ongoing"
      }
    ],
    "convictions": 0,
    "caseStatus": "trial-ongoing",
    "compensation": "₹10 lakh per deceased (Delhi govt)",
    "exGratiaPerLife": 1000000,
    "image": null,
    "sources": [
      {
        "title": "Wikipedia: 2022 Delhi fire",
        "url": "https://en.wikipedia.org/wiki/2022_Delhi_fire"
      },
      {
        "title": "Fire in India capital New Delhi kills at least 27, dozens injured",
        "url": "https://www.aljazeera.com/news/2022/5/13/fire-in-india-capital-new-delhi-kills-at-least-27-scores-injured",
        "publisher": "Al Jazeera"
      },
      {
        "title": "Mundka fire: 29 still missing; death toll likely to rise as more charred remains found",
        "url": "https://www.deccanherald.com/national/north-and-central/27-dead-12-injured-as-fire-engulfs-commercial-building-in-west-delhi-1108969.html",
        "publisher": "Deccan Herald"
      }
    ]
  },
  {
    "id": "kamala-mills-fire-2017",
    "name": "Kamala Mills rooftop pub fire, Mumbai",
    "date": "2017-12-29",
    "state": "Maharashtra",
    "city": "Mumbai (Lower Parel)",
    "category": "fire",
    "deaths": 14,
    "injured": 55,
    "summary": "Fire from an illegal hookah setup swept two rooftop restaurants ('1 Above' and 'Mojo's Bistro') in the Kamala Mills compound; escape routes were blocked and illegal alterations abounded. Most victims suffocated in a toilet where they had taken refuge.",
    "officialResponse": "Owners of both establishments arrested; multiple BMC officials suspended and some arrested. BMC ran a brief demolition drive against illegal structures citywide. Accused got bail; trial continues.",
    "blamed": "Pub owners; BMC officers who licensed and ignored violations were suspended, several later reinstated.",
    "punished": [
      {
        "who": "1 Above owners (Sanghvi brothers, Abhijeet Mankar) & Mojo's Bistro co-owner Yug Pathak",
        "outcome": "Arrested; bailed; trial ongoing"
      },
      {
        "who": "5 BMC officials",
        "outcome": "Suspended/arrested; no convictions; reinstatements followed"
      }
    ],
    "convictions": 0,
    "caseStatus": "trial-ongoing",
    "compensation": "₹5 lakh per deceased (Maharashtra govt)",
    "exGratiaPerLife": 500000,
    "image": null,
    "sources": [
      {
        "title": "Wikipedia: Kamala Mills fire",
        "url": "https://en.wikipedia.org/wiki/2017_Kamala_Mills_fire"
      },
      {
        "title": "Kamala Mills fire kills 14: CM says guilty won't be spared, Opposition blames Mumbai civic body",
        "url": "https://scroll.in/latest/863137/mumbai-kamala-mills-fire-14-killed-three-restaurant-owners-charged",
        "publisher": "Scroll.in"
      },
      {
        "title": "Mumbai rooftop pub blaze claims 14 lives, 55 injured",
        "url": "https://www.business-standard.com/article/current-affairs/mumbai-rooftop-pub-blaze-claims-14-lifes-55-injured-117122900934_1.html",
        "publisher": "Business Standard"
      }
    ]
  },
  {
    "id": "jnaneswari-derailment-2010",
    "name": "Jnaneswari Express derailment",
    "date": "2010-05-28",
    "state": "West Bengal",
    "city": "Jhargram (West Midnapore)",
    "category": "sabotage",
    "deaths": 148,
    "injured": 200,
    "summary": "The Mumbai-bound Jnaneswari Express derailed at night on track sabotaged by removal of fishplates — attributed to Maoist-linked PCPA activists — and was then hit by an oncoming goods train.",
    "officialResponse": "CBI investigation; over 20 arrests of alleged PCPA/Maoist operatives. Trial has run for over a decade without final verdict; several accused bailed.",
    "blamed": "Maoist-linked saboteurs. Questions about intelligence failure and running trains at speed through a corridor under an active sabotage alert went unexamined.",
    "punished": [
      {
        "who": "20+ alleged PCPA/Maoist operatives",
        "outcome": "Arrested by CBI; long-running trial, no final verdict"
      }
    ],
    "convictions": 0,
    "caseStatus": "trial-ongoing",
    "compensation": "₹5 lakh per deceased (Railways)",
    "exGratiaPerLife": 500000,
    "image": null,
    "sources": [
      {
        "title": "Wikipedia: Jnaneswari Express derailment",
        "url": "https://en.wikipedia.org/wiki/Jnaneswari_Express_train_derailment"
      },
      {
        "title": "'Sabotage' behind India train crash",
        "url": "https://www.aljazeera.com/news/2010/5/28/sabotage-behind-india-train-crash",
        "publisher": "Al Jazeera"
      },
      {
        "title": "Train derails after Maoists blast track in West Bengal, 68 killed",
        "url": "https://www.governancenow.com/news/regular-story/train-derails-after-maoists-blast-track-west-bengal-68-killed",
        "publisher": "Governance Now"
      }
    ]
  },
  {
    "id": "meerut-fire-2006",
    "name": "Meerut Victoria Park trade-fair fire",
    "date": "2006-04-10",
    "state": "Uttar Pradesh",
    "city": "Meerut",
    "category": "fire",
    "deaths": 65,
    "injured": 161,
    "tollNote": "Toll figures cited range from 65 to over 100 across inquiries and reports.",
    "summary": "Fire raced through a consumer trade fair ('Brand India Fair') held in synthetic tents with a single functional exit, unlicensed electrical wiring and no firefighting arrangements. Whole families attending the fair were burnt.",
    "officialResponse": "A commission of inquiry indicted organizers and negligent officials. Nearly two decades later, in 2025, the Supreme Court apportioned compensation liability 60:40 between organizers and the UP government — a civil, not criminal, outcome.",
    "blamed": "Fair organizers and licensing officials.",
    "punished": [
      {
        "who": "Fair organizers (Mrinal Events & associates)",
        "outcome": "Prosecution launched; decades of proceedings produced compensation liability, not imprisonment"
      }
    ],
    "convictions": 0,
    "caseStatus": "compensation-only",
    "compensation": "SC-supervised compensation with 60:40 organizer:state liability (2025); interim payments earlier",
    "exGratiaPerLife": null,
    "image": null,
    "sources": [
      {
        "title": "Wikipedia: Meerut fire",
        "url": "https://en.wikipedia.org/wiki/2006_Meerut_fire"
      },
      {
        "title": "Event organisers must be liable for compensating victims for any accident: Supreme Court",
        "url": "https://www.deccanherald.com/india/event-organisers-must-be-liable-for-compensating-victims-for-any-accident-1100154.html",
        "publisher": "Deccan Herald"
      },
      {
        "title": "2006 Meerut Fire Tragedy: Supreme Court fixes liability 40:60 on state & organizers to compensate victims",
        "url": "https://www.livelaw.in/top-stories/2006-meerut-fire-tragedy-supreme-court-fixes-liability-4060-liability-on-state-organizers-to-compensate-victims-196517",
        "publisher": "LiveLaw"
      }
    ]
  },
  {
    "id": "malin-landslide-2014",
    "name": "Malin village landslide",
    "date": "2014-07-30",
    "state": "Maharashtra",
    "city": "Malin, Pune district",
    "category": "flood-landslide",
    "deaths": 151,
    "injured": 8,
    "summary": "A hillside collapsed onto the sleeping tribal village of Malin after intense rain. Investigations linked the slide to slope destabilization from mechanized land-levelling and deforestation carried out under government schemes.",
    "officialResponse": "Rescue and rehabilitation; studies confirmed anthropogenic contribution. No agency or contractor that levelled the slopes was prosecuted.",
    "blamed": "Heavy rainfall; the land-levelling angle was acknowledged in studies but assigned to no one.",
    "punished": [],
    "convictions": 0,
    "caseStatus": "closed-no-charges",
    "compensation": "₹5 lakh per deceased; village rehabilitated to new site",
    "exGratiaPerLife": 500000,
    "image": null,
    "sources": [
      {
        "title": "Wikipedia: Malin landslide",
        "url": "https://en.wikipedia.org/wiki/2014_Malin_landslide"
      },
      {
        "title": "At Least 60 Dead, Scores Missing in India Landslide",
        "url": "https://time.com/3069922/india-landslide/",
        "publisher": "TIME"
      },
      {
        "title": "Ten Years After Tragedy, Malin Residents Face Continuing Hardships",
        "url": "https://www.thebridgechronicle.com/news/ten-years-after-tragedy-malin-residents-face-continuing-hardships",
        "publisher": "The Bridge Chronicle"
      }
    ]
  },
  {
    "id": "indore-stepwell-collapse-2023",
    "name": "Indore temple stepwell collapse",
    "date": "2023-03-30",
    "state": "Madhya Pradesh",
    "city": "Indore (Sneh Nagar)",
    "category": "collapse",
    "deaths": 36,
    "injured": 16,
    "summary": "The slab covering an old stepwell (bawdi) — illegally built over to extend a temple floor — gave way under devotees gathered for Ram Navami, plunging them into the well. The municipal corporation had issued notices about the illegal structure and not acted on them.",
    "officialResponse": "FIR against temple trust president and secretary; the structure was demolished. IMC officials who sat on their own notices faced no charges.",
    "blamed": "Temple trust; municipal inaction on its own violation notices went unpunished.",
    "punished": [
      {
        "who": "Sevaram Galani (trust president) & trust secretary",
        "outcome": "FIR under culpable homicide provisions; proceedings ongoing"
      }
    ],
    "convictions": 0,
    "caseStatus": "trial-ongoing",
    "compensation": "₹5 lakh per deceased (state) + ₹2 lakh (PMNRF)",
    "exGratiaPerLife": 700000,
    "image": null,
    "sources": [
      {
        "title": "Wikipedia: Indore temple stepwell collapse",
        "url": "https://en.wikipedia.org/wiki/2023_Indore_temple_stepwell_collapse"
      },
      {
        "title": "Indore temple accident: At least 35 killed in India after falling into underground stepwell",
        "url": "https://www.cnn.com/2023/03/31/india/india-temple-stepwell-collapse-intl-hnk/index.html",
        "publisher": "CNN"
      },
      {
        "title": "India stepwell temple collapse death toll jumps to 35",
        "url": "https://www.cbsnews.com/news/india-temple-collapse-deaths-hindu-worshipers-fall-walk-in-well/",
        "publisher": "CBS News"
      }
    ]
  },
  {
    "id": "chennai-floods-2015",
    "name": "Chennai floods",
    "date": "2015-12-01",
    "state": "Tamil Nadu",
    "city": "Chennai & coastal TN",
    "category": "flood-landslide",
    "deaths": 470,
    "injured": 1000,
    "tollNote": "~470 deaths across Tamil Nadu during the Nov–Dec 2015 floods; Chennai city accounted for a large share.",
    "summary": "Record rains flooded Chennai, but a CAG audit later concluded the worst of it was 'man-made': the sudden, unannounced release of Chembarambakkam reservoir waters and decades of construction over wetlands, lakebeds and river margins turned rainfall into catastrophe.",
    "officialResponse": "CAG report (tabled 2018) indicted reservoir management and encroachment tolerance. No official was prosecuted for the release decision or for permitting floodplain construction.",
    "blamed": "Unprecedented rain, officially. The CAG's 'man-made disaster' finding produced no individual accountability.",
    "punished": [],
    "convictions": 0,
    "caseStatus": "closed-no-charges",
    "compensation": "₹4 lakh per deceased (state); central flood relief packages",
    "exGratiaPerLife": 400000,
    "image": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/2015_South_Indian_flood_Chennai_taken_by_Indian_Air_Force_helicopters.jpg/960px-2015_South_Indian_flood_Chennai_taken_by_Indian_Air_Force_helicopters.jpg",
      "credit": "Wikimedia Commons, via 2015 South India floods"
    },
    "sources": [
      {
        "title": "Wikipedia: 2015 South India floods",
        "url": "https://en.wikipedia.org/wiki/2015_South_India_floods"
      },
      {
        "title": "Tamil Nadu: December 2015 Chennai floods were a man-made disaster, says CAG",
        "url": "https://scroll.in/latest/885939/tamil-nadu-chennai-floods-in-december-2015-was-man-made-says-cag",
        "publisher": "Scroll.in"
      },
      {
        "title": "Chennai floods death toll rises to 280",
        "url": "https://www.cnbc.com/2015/12/05/chennai-floods-death-toll-rises-to-280.html",
        "publisher": "CNBC"
      }
    ]
  },
  {
    "id": "allahabad-station-stampede-2013",
    "name": "Allahabad railway station stampede (Kumbh Mela)",
    "date": "2013-02-10",
    "state": "Uttar Pradesh",
    "city": "Allahabad (Prayagraj)",
    "category": "stampede",
    "deaths": 36,
    "injured": 39,
    "summary": "A crush on a footbridge at Allahabad Junction as Kumbh pilgrims returning on Mauni Amavasya overwhelmed the station; a last-minute platform change and alleged police lathi-charge were blamed by witnesses.",
    "officialResponse": "Judicial inquiry (Justice Onkareshwar Bhatt) ordered; the railways denied the lathi-charge. Report's findings never led to prosecution of any official.",
    "blamed": "Crowd surge; platform-change miscommunication.",
    "punished": [],
    "convictions": 0,
    "caseStatus": "closed-no-charges",
    "compensation": "₹5 lakh per deceased (Railways + state combined announcements)",
    "exGratiaPerLife": 500000,
    "image": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Prayagraj_Jn_Railway_Station.jpg/960px-Prayagraj_Jn_Railway_Station.jpg",
      "credit": "The site: Prayagraj (Allahabad) Junction — Wikimedia Commons"
    },
    "sources": [
      {
        "title": "Wikipedia: 2013 Allahabad stampede",
        "url": "https://en.wikipedia.org/wiki/2013_Kumbh_Mela_stampede"
      },
      {
        "title": "Inquiry ordered into deadly India stampede",
        "url": "https://www.aljazeera.com/news/2013/2/11/inquiry-ordered-into-deadly-india-stampede",
        "publisher": "Al Jazeera"
      },
      {
        "title": "Kumbh Mela: Judicial probe into Allahabad stampede",
        "url": "https://www.oneindia.com/2013/02/18/uttar-pradesh-orders-judicial-probe-into-allahabad-stampede-1152770.html",
        "publisher": "Oneindia"
      }
    ]
  },
  {
    "id": "stephen-court-fire-2010",
    "name": "Stephen Court fire, Kolkata",
    "date": "2010-03-23",
    "state": "West Bengal",
    "city": "Kolkata (Park Street)",
    "category": "fire",
    "deaths": 43,
    "injured": 20,
    "summary": "Fire in the heritage Stephen Court building on Park Street trapped office workers on illegally-added upper floors; locked terrace doors cut off escape and many died on window ledges awaiting ladders that couldn't reach.",
    "officialResponse": "Owners' representatives and caretakers arrested; illegal floors ordered examined. Trial proceedings have lingered without closure.",
    "blamed": "Building owners/occupants association; locked terrace and illegal construction.",
    "punished": [
      {
        "who": "Building association members & caretakers (4 arrested)",
        "outcome": "Arrested; bailed; trial ongoing"
      }
    ],
    "convictions": 0,
    "caseStatus": "trial-ongoing",
    "compensation": "₹3–4 lakh per deceased (state announcements of the time)",
    "exGratiaPerLife": 350000,
    "image": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Stephen_Court_-_18_Park_Street_-_Kolkata_2013-06-19_8942.JPG/960px-Stephen_Court_-_18_Park_Street_-_Kolkata_2013-06-19_8942.JPG",
      "credit": "Wikimedia Commons, via Stephen Court fire"
    },
    "sources": [
      {
        "title": "Wikipedia: Stephen Court fire",
        "url": "https://en.wikipedia.org/wiki/Stephen_Court_fire"
      },
      {
        "title": "Blaze in Indian city claims lives",
        "url": "https://www.aljazeera.com/news/2010/3/27/blaze-in-indian-city-claims-lives",
        "publisher": "Al Jazeera"
      }
    ]
  },
  {
    "id": "rau-ias-basement-deaths-2024",
    "name": "Old Rajinder Nagar coaching-centre basement drownings",
    "date": "2024-07-27",
    "state": "Delhi",
    "city": "Old Rajinder Nagar, New Delhi",
    "category": "flood-landslide",
    "deaths": 3,
    "injured": 0,
    "summary": "Three UPSC aspirants drowned when monsoon water burst into the basement library of Rau's IAS Study Circle — a basement sanctioned for parking, used commercially, in an area where students had complained to the MCD about waterlogging and illegal basements weeks earlier.",
    "officialResponse": "CBI took over; coaching centre CEO and coordinator arrested, four basement co-owners arrested (later bailed with court rebukes about 'MCD's rot'). MCD suspended junior engineers; a citywide basement-sealing drive followed and faded.",
    "blamed": "Coaching centre management and basement co-owners; a passing SUV driver was even briefly arrested. MCD's systemic licensing failure drew judicial anger but no senior official was charged.",
    "punished": [
      {
        "who": "Abhishek Gupta (CEO, Rau's IAS) & coordinator",
        "outcome": "Arrested; bailed; trial ongoing"
      },
      {
        "who": "4 basement co-owners",
        "outcome": "Arrested; bailed"
      },
      {
        "who": "MCD junior engineers",
        "outcome": "One terminated, one suspended; no senior action"
      }
    ],
    "convictions": 0,
    "caseStatus": "trial-ongoing",
    "compensation": "₹10 lakh per deceased announced by Delhi govt",
    "exGratiaPerLife": 1000000,
    "image": null,
    "sources": [
      {
        "title": "Wikipedia: 2024 Delhi coaching centre flooding",
        "url": "https://en.wikipedia.org/wiki/2024_Delhi_coaching_centre_flooding"
      },
      {
        "title": "Delhi coaching centre deaths: High Court upholds order allowing Rau's IAS owner to photocopy financial documents seized by CBI",
        "url": "https://www.livelaw.in/high-court/delhi-high-court/delhi-coaching-centre-deaths-high-court-upholds-order-allowing-raus-ias-owner-to-photocopy-financial-documents-seized-by-cbi-289118",
        "publisher": "LiveLaw"
      },
      {
        "title": "Rau's IAS drowning deaths: Owner deliberately used basement for UPSC coaching classes, says CBI",
        "url": "https://www.theweek.in/news/india/2024/09/01/raus-ias-study-circle-drowning-deaths-owner-deliberately-used-basement-for-upsc-coaching-classes-says-cbi.html",
        "publisher": "The Week"
      }
    ]
  },
  {
    "id": "air-india-171-crash-2025",
    "name": "Air India Flight 171 crash, Ahmedabad",
    "date": "2025-06-12",
    "state": "Gujarat",
    "city": "Ahmedabad",
    "category": "aviation",
    "deaths": 270,
    "injured": 60,
    "tollNote": "241 of 242 aboard died, plus people on the ground in the BJ Medical College hostel the aircraft struck; combined tolls reported around 270.",
    "summary": "A Boeing 787-8 bound for London Gatwick crashed into a medical college hostel seconds after takeoff from Ahmedabad — India's deadliest aviation disaster in decades. The AAIB's preliminary report found both engine fuel-control switches moved to cutoff moments after liftoff; the final cause remained under investigation.",
    "officialResponse": "AAIB investigation with NTSB/UK AAIB participation; preliminary report released July 2025. Parliamentary committee reviews of aviation safety oversight followed.",
    "blamed": "Under investigation.",
    "punished": [],
    "convictions": 0,
    "caseStatus": "investigation-ongoing",
    "compensation": "₹1 crore per deceased announced by Tata Group, plus statutory carrier liability",
    "exGratiaPerLife": 10000000,
    "image": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/The_wreckage_of_the_crashed_Air_India_Flight_171.jpg/960px-The_wreckage_of_the_crashed_Air_India_Flight_171.jpg",
      "credit": "Wikimedia Commons, via Air India Flight 171"
    },
    "sources": [
      {
        "title": "Wikipedia: Air India Flight 171",
        "url": "https://en.wikipedia.org/wiki/Air_India_Flight_171"
      },
      {
        "title": "How Air India flight 171 crashed and its fatal last moments",
        "url": "https://www.aljazeera.com/news/2025/7/12/how-air-india-flight-171-crashed-and-its-fatal-last-moments",
        "publisher": "Al Jazeera"
      },
      {
        "title": "What happened to the fuel-control switches on doomed Air India flight 171?",
        "url": "https://www.aljazeera.com/news/2025/7/17/what-happened-to-the-fuel-control-switches-on-doomed-air-india-flight-171",
        "publisher": "Al Jazeera"
      }
    ]
  }
];
