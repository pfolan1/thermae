  export interface Venue {
  id: number;
  city: string;
  country: string;
  name: string;
  area: string;
  type: 'sauna' | 'plunge' | 'both' | 'seaweed';
  price: string;
  rating: number;
  reviews: number;
  hours: string;
  temp: string;
  tags: string[];
  emoji: string;
  open: boolean;
  hygiene: string;
  lockerNote: string;
  transport: string;
  parking: string;
  desc: string;
  lat: number;
  lng: number;
  bookingUrl?: string;
  featured?: boolean;
  googleRating?: number;
}

export const VENUES: Venue[] = [
  // ── LONDON ──
  {
    id:1, city:"London", country:"UK", name:"ARC Wellness", area:"Canary Wharf",
    type:"both", price:"£28", rating:4.9, reviews:142,
    hours:"Check website for current hours",
    temp:"3°C", tags:["Finnish","Ice Bath","Luxury"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"Lockers and locks provided",
    transport:"Canary Wharf (Jubilee/DLR) · 3 min walk",
    parking:"NCP Canary Wharf · 5 min",
    desc:"London's largest sauna — a circular space for 65 people with ice baths and a curated sound system.",
    lat:51.5047, lng:-0.0174,
    bookingUrl:"https://arcwellness.co.uk", featured:true, googleRating:4.9
  },
  {
    id:2, city:"London", country:"UK", name:"Community Sauna Baths Hackney Wick", area:"Hackney Wick",
    type:"both", price:"£9.50 off-peak / £16.50 peak", rating:4.8, reviews:89,
    hours:"Check website for current hours",
    temp:"Ice bath barrels", tags:["Community","Budget","Wood-fired"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Hackney Wick (Overground) · 6 min walk",
    parking:"Street parking",
    desc:"Not-for-profit outdoor sauna and cold plunge in Hackney Wick. Whiskey barrel ice baths, regular events like sound baths and breathwork. NHS workers get free morning sessions. Part of a growing network across London.",
    lat:51.5426, lng:-0.0215,
    bookingUrl:"https://community-sauna.co.uk", featured:true, googleRating:4.8
  },
  {
    id:3, city:"London", country:"UK", name:"Banya No.1 Chiswick", area:"Chiswick",
    type:"both", price:"£38", rating:4.8, reviews:201,
    hours:"Check website for current hours",
    temp:"Ice buckets", tags:["Russian Banya","Traditional","Steam"], emoji:"♨️", open:true,
    hygiene:"A", lockerNote:"Lockers and locks provided",
    transport:"Chiswick Park (District) · 10 min walk",
    parking:"Free street parking weekends",
    desc:"Authentic Russian banya with hot rooms, steam, cold plunges and traditional platza treatment.",
    lat:51.4934, lng:-0.2550,
    bookingUrl:"https://gobanya.co.uk"
  },

  // ── BATH ──
  {
    id:4, city:"Bath", country:"UK", name:"Thermae Bath Spa", area:"City Centre",
    type:"both", price:"£45", rating:4.8, reviews:2841,
    hours:"9am–9:30pm daily",
    temp:"Rooftop pool", tags:["Roman Hot Springs","Iconic","Rooftop Pool"], emoji:"♨️🌿", open:true,
    hygiene:"A+", lockerNote:"Lockers and locks provided",
    transport:"Bath Spa station · 5 min walk",
    parking:"Southgate car park · 7 min",
    desc:"The only natural thermal spa in the UK, built above Roman hot springs that have flowed for 10,000 years. Open-air rooftop pool with views over Bath. An absolute bucket list venue.",
    lat:51.3797, lng:-2.3585,
    bookingUrl:"https://thermaebathspa.com", featured:true, googleRating:4.8
  },
  {
    id:5, city:"Bath", country:"UK", name:"Campwell Farm Sauna", area:"Bradford on Avon",
    type:"both", price:"£25", rating:4.9, reviews:134,
    hours:"Check website for current hours",
    temp:"Cold plunge / shower", tags:["Wood-fired","Forest","Countryside"], emoji:"🔥🌲", open:true,
    hygiene:"A+", lockerNote:"No lockers — bring a dry bag",
    transport:"Bradford-on-Avon station · 15 min walk",
    parking:"Free on-site at Church Farm",
    desc:"Hidden on the edge of woodland 15 minutes from Bath. Wood-fired sauna created to reconnect people with nature. Quiet, magical, and genuinely restorative.",
    lat:51.3479, lng:-2.2501,
    bookingUrl:"https://campwellfarm.co.uk"
  },
  {
    id:6, city:"Bath", country:"UK", name:"Aether Sauna Warleigh Weir", area:"River Avon",
    type:"both", price:"£28", rating:4.9, reviews:78,
    hours:"Check website for current hours",
    temp:"River Avon", tags:["Riverside","Wood-fired","Wild Swim"], emoji:"🌊🔥", open:true,
    hygiene:"A+", lockerNote:"No lockers — remote riverside venue, bring a dry bag",
    transport:"Bathampton village · 20 min walk along towpath",
    parking:"Warleigh Lane · limited roadside",
    desc:"Brand new for 2025. Perched on the banks of the River Avon at Warleigh Weir — one of the UK's most-loved wild swimming spots. Sauna, steam and a cold Avon plunge in the same breath.",
    lat:51.3895, lng:-2.3120,
    bookingUrl:"https://aethersauna.co.uk"
  },

  // ── BRISTOL ──
  {
    id:7, city:"Bristol", country:"UK", name:"Bristol Community Sauna", area:"Brislington",
    type:"both", price:"£12", rating:4.8, reviews:312,
    hours:"Check website for current hours",
    temp:"5°C / 10°C plunge", tags:["Finnish","Community","Budget"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers available — bring your own lock",
    transport:"Bus 349 St Anne's Rd · 3 min walk",
    parking:"On-site parking off Trym Rd",
    desc:"14-person locally-built Finnish sauna in the garden of St Anne's House. Two cold plunges at 5°C and 10°C plus three cold showers. Membership from £15/month.",
    lat:51.4447, lng:-2.5634,
    bookingUrl:"https://bristolcommunitysauna.co.uk"
  },
  {
    id:8, city:"Bristol", country:"UK", name:"Ardagh Community Sauna", area:"Horfield",
    type:"both", price:"£10", rating:4.8, reviews:178,
    hours:"Check website for current hours",
    temp:"Ambient plunge pools", tags:["Wood-fired","Community","Budget"], emoji:"🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Bus along Kellaway Ave · 5 min walk",
    parking:"Ardagh Pavilion car park · Free",
    desc:"Large wood-fired sauna on Horfield Common with cold plunge pools and solar-heated showers. Regular music events — Sauna Sounds — combine heat with live performance.",
    lat:51.4964, lng:-2.5889,
    bookingUrl:"https://ardaghcommunitysauna.com"
  },
  {
    id:9, city:"Bristol", country:"UK", name:"Sivo Wellness Leigh Court", area:"Abbots Leigh",
    type:"both", price:"£30", rating:4.8, reviews:96,
    hours:"Check website for current hours",
    temp:"Ice baths filtered", tags:["Boutique","Country Estate","Finnish"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"Lockers and locks provided",
    transport:"Bus 1 · Long Ashton P&R then 10 min walk",
    parking:"Leigh Court free on-site",
    desc:"Set within the serene grounds of Leigh Court estate. Pristine saunas and filtered ice baths designed for comfort and calm. Changing rooms, towels and refreshments included.",
    lat:51.4607, lng:-2.6649,
    bookingUrl:"https://sivowellness.co.uk"
  },
  {
    id:10, city:"Bristol", country:"UK", name:"Sensate Spa Studios", area:"City Centre / Clifton",
    type:"both", price:"£35", rating:4.9, reviews:54,
    hours:"Check website for current hours",
    temp:"Cold plunge pool", tags:["Secret Garden","Boutique","Private"], emoji:"♨️🌿", open:true,
    hygiene:"A+", lockerNote:"No lockers — private session (max 6 guests)",
    transport:"Bus 8 · Clifton Triangle · 5 min walk",
    parking:"Clifton street parking",
    desc:"Hidden behind old temple doors in a secret garden built from 80% recycled materials. Hot tub, sauna, and cold plunge with only 6 guests per session. Bristol's most intimate wellness space.",
    lat:51.4568, lng:-2.6186,
    bookingUrl:"https://sensatespastudios.co.uk"
  },

  // ── BRIGHTON ──
  {
    id:11, city:"Brighton", country:"UK", name:"Sauna in the Lanes", area:"The Lanes",
    type:"both", price:"£25", rating:4.9, reviews:287,
    hours:"Check website for current hours",
    temp:"Cold plunge pools ×2", tags:["Nordic","City Centre","Historic Courtyard"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"Lockers and locks provided",
    transport:"Brighton station · 12 min walk · or Bus 1/7 to North Street",
    parking:"NCP Lanes · 5 min",
    desc:"Authentic Nordic sauna tucked into the courtyard of Brighton's first synagogue. Built in Estonian alderwood with a Huum beehive stove. Two cold plunge pools, outdoor showers, lockers. Steps from the beach.",
    lat:50.8228, lng:-0.1409,
    bookingUrl:"https://saunaonthelanes.co.uk"
  },
  {
    id:12, city:"Brighton", country:"UK", name:"The Holistic Sauna", area:"Hove Seafront",
    type:"both", price:"£22", rating:4.7, reviews:143,
    hours:"Check website for current hours",
    temp:"Channel via beach access", tags:["Seafront","Finnish","Sea Plunge"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"Lockers and locks provided",
    transport:"Hove station · 10 min walk",
    parking:"Kingsway seafront parking",
    desc:"Finnish barrel sauna on Hove seafront with direct access to the English Channel. The cold plunge is the sea itself — walk 50 metres and you're in.",
    lat:50.8257, lng:-0.1723,
    bookingUrl:"https://saunadelic.uk"
  },
  {
    id:13, city:"Brighton", country:"UK", name:"Fire & Ice Wellness", area:"Westbury-on-Trym (nr Bristol)",
    type:"both", price:"£20", rating:4.8, reviews:167,
    hours:"Check website for current hours",
    temp:"Natural spring cold plunge", tags:["Spring Water","Forest","Silent Sessions"], emoji:"🌿🧊", open:true,
    hygiene:"A+", lockerNote:"No lockers — bring a dry bag",
    transport:"Bus to Westbury-on-Trym · 5 min walk",
    parking:"Off Trym Rd · Free",
    desc:"Sauna and cold plunge fed by natural spring water with no chlorine. Silent sessions every Wednesday evening. A genuinely restorative experience in a natural setting.",
    lat:51.4924, lng:-2.6096,
    bookingUrl:"https://fireandicewellness.co.uk"
  },

  // ── DUBLIN ──
  {
    id:14, city:"Dublin", country:"Ireland", name:"The Sea Sauna", area:"Donabate",
    type:"both", price:"€20", rating:4.9, reviews:118,
    hours:"Check website for current hours",
    temp:"Irish Sea", tags:["Outdoor","Coastal","Wood-fired"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Donabate DART · 12 min walk",
    parking:"Free on-site",
    desc:"Wood-fired sauna overlooking the Irish Sea. The cold plunge is the North Atlantic. Pure magic.",
    lat:53.5010, lng:-6.1497,
    bookingUrl:"https://theseasauna.ie"
  },
  {
    id:15, city:"Dublin", country:"Ireland", name:"The Outcast Saunas", area:"Prussia Street",
    type:"sauna", price:"€25", rating:4.8, reviews:94,
    hours:"Check website for current hours",
    temp:"Cold shower", tags:["Outdoor","Urban","Trendy"], emoji:"🔥", open:true,
    hygiene:"A", lockerNote:"Lockers and locks provided",
    transport:"Stoneybatter Bus (routes 83/151) · 3 min walk",
    parking:"Street parking",
    desc:"Dublin's coolest outdoor sauna on Prussia Street. A great atmosphere and growing community.",
    lat:53.3526, lng:-6.2820,
    bookingUrl:"https://outcastsaunas.ie"
  },
  {
    id:16, city:"Dublin", country:"Ireland", name:"Riverbank Sauna", area:"Palmerstown",
    type:"both", price:"€22", rating:4.8, reviews:53,
    hours:"Check website for current hours",
    temp:"River Liffey", tags:["Riverside","Scenic","Outdoor"], emoji:"🌿🔥", open:true,
    hygiene:"A+", lockerNote:"No lockers — bring a dry bag",
    transport:"Bus 25/66 · 5 min walk",
    parking:"Free on-site",
    desc:"Wood-fired sauna on the banks of the Liffey. One of Dublin's most unique wellness experiences.",
    lat:53.3631, lng:-6.3700,
    bookingUrl:"https://riverbanksauna.ie"
  },

  // ── GALWAY ──
  {
    id:17, city:"Galway", country:"Ireland", name:"Sauna Fiáin", area:"Oranmore / Renville Pier",
    type:"both", price:"€22", rating:4.9, reviews:87,
    hours:"Check website for current hours",
    temp:"Wild Atlantic", tags:["Wood-fired","Wild Atlantic","Outdoor"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Oranmore · 5 min from Renville Pier",
    parking:"Free at Renville Pier",
    desc:"Hand-built Finnish sauna at Renville Pier on the Wild Atlantic Way. Plunge into the Atlantic or a cold barrel.",
    lat:53.2436, lng:-8.9677,
    bookingUrl:"https://saunafiain.ie"
  },

  // ── CORK ──
  {
    id:18, city:"Cork", country:"Ireland", name:"The Hot Box Cork City", area:"City Centre",
    type:"both", price:"€20", rating:4.8, reviews:134,
    hours:"Check website for current hours",
    temp:"3 temps available", tags:["Sauna Village","Multi-plunge","Urban"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers and locks provided",
    transport:"Cork City Bus · 4 min walk",
    parking:"Paid multi-storey nearby",
    desc:"Cork's sauna village — five unique experiences and plunge pools at three temperatures.",
    lat:51.8985, lng:-8.4756,
    bookingUrl:"https://thehotboxsauna.ie"
  },

  // ── MANCHESTER ──
  {
    id:19, city:"Manchester", country:"UK", name:"Kontrast", area:"Northern Quarter",
    type:"both", price:"£17", rating:4.8, reviews:167,
    hours:"Check website for current hours",
    temp:"3°C / 8°C / 12°C", tags:["Community","Café On-site","Finnish"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"Lockers and locks provided",
    transport:"Manchester Victoria · 8 min walk",
    parking:"NCP Piccadilly · 10 min",
    desc:"UK's first sauna and ice bath café. Three plunge pools from 3–12°C and two Finnish saunas.",
    lat:53.4841, lng:-2.2349,
    bookingUrl:"https://kontrast.co.uk"
  },
  {
    id:20, city:"Manchester", country:"UK", name:"FIX MCR", area:"City Centre",
    type:"both", price:"£22", rating:4.9, reviews:89,
    hours:"Check website for current hours",
    temp:"4°C / 10°C", tags:["UK's Biggest Sauna","Breathwork","Himalayan Salt"], emoji:"⚡🧊", open:true,
    hygiene:"A+", lockerNote:"Lockers and locks provided",
    transport:"Deansgate (Metrolink) · 5 min walk",
    parking:"Deansgate car park",
    desc:"UK's largest cedar sauna with Himalayan salt walls. Guided breathwork and sound healing.",
    lat:53.4802, lng:-2.2426,
    bookingUrl:"https://fixmcr.com"
  },

  // ── EDINBURGH ──
  {
    id:25, city:"Edinburgh", country:"UK", name:"Portobello Beach Sauna", area:"Portobello Beach",
    type:"both", price:"£15", rating:4.9, reviews:203,
    hours:"Check website for current hours",
    temp:"Firth of Forth", tags:["Beach","Wood-fired","Community"], emoji:"🌊🔥", open:true,
    hygiene:"A+", lockerNote:"No lockers — bring a dry bag",
    transport:"Bus 26/45 to Portobello · 5 min walk to beach",
    parking:"Beach Road free parking",
    desc:"Wood-fired sauna steps from the beach with the Firth of Forth as your cold plunge. The Edinburgh sauna experience.",
    lat:55.9509, lng:-3.1121,
    bookingUrl:"https://soulwatersauna.com"
  },

  // ── BELFAST ──
  {
    id:26, city:"Belfast", country:"UK", name:"Ormeau Baths Spa", area:"Ormeau Road",
    type:"both", price:"£18", rating:4.7, reviews:76,
    hours:"Check website for current hours",
    temp:"Cold plunge", tags:["Historic Building","Finnish","Urban"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers and locks provided",
    transport:"Metro Bus to Ormeau Rd · 4 min walk",
    parking:"Street parking Ormeau",
    desc:"Victorian bathhouse converted into a wellness space with Finnish sauna, steam and cold plunge. Beautiful historic building.",
    lat:54.5877, lng:-5.9284,
    bookingUrl:"https://ormeaubaths.co.uk"
  },

  // ── HELSINKI ──
  {
    id:27, city:"Helsinki", country:"Finland", name:"Löyly Public Sauna", area:"Hernesaari",
    type:"both", price:"€29", rating:4.9, reviews:1240,
    hours:"Check website for current hours",
    temp:"Baltic Sea", tags:["Iconic","Wood-fired","Restaurant On-site"], emoji:"🌊🔥", open:true,
    hygiene:"A+", lockerNote:"Lockers and locks provided",
    transport:"Tram 6 Hernesaarenranta · 5 min walk",
    parking:"Löyly parking lot",
    desc:"Helsinki's most famous sauna. Stunning waterfront architecture, three saunas, and a direct plunge into the Baltic Sea. Restaurant on-site.",
    lat:60.1555, lng:24.9310,
    bookingUrl:"https://loyly.fi", featured:true, googleRating:4.9
  },
  {
    id:28, city:"Helsinki", country:"Finland", name:"Sompasauna", area:"Kallio / Sompasaari",
    type:"both", price:"Free", rating:4.9, reviews:432,
    hours:"Always open",
    temp:"Gulf of Finland", tags:["Free","Community","24/7"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — it's a community sauna, travel light",
    transport:"Tram 6 · 10 min walk",
    parking:"Street parking",
    desc:"Helsinki's legendary free sauna — run by volunteers, open 24/7, year-round. Bring your own beer. The most authentic sauna experience in the world.",
    lat:60.1818, lng:24.9720,
    bookingUrl:"https://sompasauna.fi", featured:true, googleRating:4.9
  },
  {
    id:29, city:"Helsinki", country:"Finland", name:"Allas Sea Pool", area:"Market Square",
    type:"both", price:"€18", rating:4.8, reviews:567,
    hours:"Check website for current hours",
    temp:"Baltic Sea +10°C", tags:["Outdoor Pools","City Centre","Year-round"], emoji:"🌊♨️", open:true,
    hygiene:"A+", lockerNote:"Lockers and locks provided",
    transport:"Market Square · steps away",
    parking:"Katajanokan parking",
    desc:"Year-round outdoor sea pools with sauna right at Helsinki's Market Square. The most central sauna experience in Finland.",
    lat:60.1674, lng:24.9559,
    bookingUrl:"https://allasseapool.fi"
  },

  // ── STOCKHOLM ──
  {
    id:30, city:"Stockholm", country:"Sweden", name:"Centralbadet", area:"Norrmalm",
    type:"both", price:"SEK 350 (~£26)", rating:4.8, reviews:689,
    hours:"Check website for current hours",
    temp:"Cold plunge pools", tags:["Art Nouveau","Historic","1904"], emoji:"♨️🧊", open:true,
    hygiene:"A+", lockerNote:"Lockers and locks provided",
    transport:"T-Centralen · 5 min walk",
    parking:"Q-Park City · 5 min",
    desc:"Stunning 1904 Art Nouveau bathhouse in the city centre. Sauna, steam rooms, pools and cold plunges in a truly beautiful building.",
    lat:59.3357, lng:18.0665,
    bookingUrl:"https://centralbadet.se"
  },
  {
    id:31, city:"Stockholm", country:"Sweden", name:"Hellasgården", area:"Nacka Forest",
    type:"both", price:"SEK 160 (~£12)", rating:4.9, reviews:445,
    hours:"Check website for current hours",
    temp:"Lake Källtorpssjön", tags:["Forest","Lake Plunge","Traditional"], emoji:"🌲🔥", open:true,
    hygiene:"A+", lockerNote:"Lockers and locks provided",
    transport:"Bus 401 from Slussen · alight at Hellasgården",
    parking:"Hellasgården car park · Free",
    desc:"Traditional Swedish sauna in a forest reserve outside Stockholm. Lake plunge in summer, through a hole in the ice in winter. Life-changing.",
    lat:59.2985, lng:18.1560,
    bookingUrl:"https://hellasgarden.se"
  },

  // ── COPENHAGEN ──
  {
    id:32, city:"Copenhagen", country:"Denmark", name:"La Banchina", area:"Refshaleøen",
    type:"both", price:"Free entry", rating:4.9, reviews:567,
    hours:"Check website for current hours",
    temp:"Copenhagen Harbour", tags:["Harbour","Rustic","Café On-site"], emoji:"🌊🔥", open:true,
    hygiene:"A+", lockerNote:"No lockers — bring a dry bag",
    transport:"Bus 9A to Refshaleøen · 10 min walk",
    parking:"Refshaleøen free parking",
    desc:"Rustic wooden sauna, cold harbour plunge, and a small café serving natural wine and food. Copenhagen's most beloved wellness spot.",
    lat:55.6856, lng:12.6003,
    bookingUrl:"https://labanchina.dk"
  },

  // ── OSLO ──
  {
    id:33, city:"Oslo", country:"Norway", name:"KOK Oslo Sauna Bar", area:"Sørenga",
    type:"both", price:"NOK 295 (~£22)", rating:4.9, reviews:498,
    hours:"Check website for current hours",
    temp:"Oslofjord 4–15°C", tags:["Bar On-site","Fjord Plunge","Social"], emoji:"🌊🔥", open:true,
    hygiene:"A+", lockerNote:"Lockers and locks provided",
    transport:"Bus 60 Sørenga · 5 min walk",
    parking:"Limited street parking",
    desc:"Sauna bar right on the Oslofjord. Plunge into the fjord, then warm up with a beer or aquavit. The quintessential Oslo experience.",
    lat:59.9011, lng:10.7534,
    bookingUrl:"https://koksauna.no"
  },

  // ── LONDON (NEW) ──
  {
    id:34, city:"London", country:"UK", name:"Community Sauna Baths Stratford", area:"Stratford",
    type:"both", price:"£9.50 off-peak / £16.50 peak", rating:4.8, reviews:67,
    hours:"Check website for current hours",
    temp:"Cold plunge pools", tags:["Community","Budget","East London"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Stratford (Elizabeth/Central/Jubilee/Overground/DLR) · 5 min walk",
    parking:"Queen Elizabeth Olympic Park nearby",
    desc:"East London outpost of the beloved Community Sauna Baths network. Saunas, cold plunges, showers and garden rest areas. NHS Social Prescribing Scheme offers free sessions via referral.",
    lat:51.5415, lng:0.0017,
    bookingUrl:"https://community-sauna.co.uk"
  },
  {
    id:35, city:"London", country:"UK", name:"Community Sauna Baths Peckham", area:"Peckham",
    type:"both", price:"£9.50 off-peak / £16.50 peak", rating:4.8, reviews:94,
    hours:"Check website for current hours",
    temp:"Cold plunge pools", tags:["Community","Budget","South London"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Peckham Rye (Overground) · 8 min walk",
    parking:"Street parking",
    desc:"South London's community sauna. Part of the award-winning not-for-profit network running a Social Prescribing Scheme offering 10 free sessions via NHS referral.",
    lat:51.4699, lng:-0.0741,
    bookingUrl:"https://community-sauna.co.uk"
  },
  {
    id:36, city:"London", country:"UK", name:"Community Sauna Baths Walthamstow", area:"Walthamstow",
    type:"both", price:"£9.50 off-peak / £16.50 peak", rating:4.8, reviews:42,
    hours:"Check website for current hours",
    temp:"Cold plunge pools", tags:["Community","Budget","East London"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers available — bring your own lock (or purchase one on-site)",
    transport:"Blackhorse Road (Victoria/Overground) · 10 min walk",
    parking:"Street parking",
    desc:"Newest addition to the Community Sauna Baths network, opened in 2025. Saunas, cold plunges and a community garden rest area.",
    lat:51.5866, lng:-0.0409,
    bookingUrl:"https://community-sauna.co.uk"
  },
  {
    id:37, city:"London", country:"UK", name:"Community Sauna Baths Camberwell", area:"Camberwell",
    type:"both", price:"£9.50 off-peak / £16.50 peak", rating:4.8, reviews:28,
    hours:"Check website for current hours",
    temp:"Cold plunge pools", tags:["Community","Budget","South London"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Loughborough Junction (Overground) · 12 min walk · or Bus P5",
    parking:"Street parking",
    desc:"South London's newest community sauna, opened 2025. Same welcoming not-for-profit ethos as the wider network.",
    lat:51.4754, lng:-0.0899,
    bookingUrl:"https://community-sauna.co.uk"
  },
  {
    id:38, city:"London", country:"UK", name:"Rooftop Saunas Hackney", area:"Hackney / London Fields",
    type:"both", price:"From £11pp", rating:4.9, reviews:312,
    hours:"Mon–Sat 7:30am–10:20pm · Sun 10am–7:50pm",
    temp:"5–7°C cold plunge pools", tags:["Rooftop","Private Cabins","Views"], emoji:"🏙️🔥", open:true,
    hygiene:"A+", lockerNote:"Lockers and locks provided",
    transport:"London Fields (Overground) · 5 min walk",
    parking:"Street parking Broadway Market",
    desc:"Private timber sauna cabins on the rooftop of Netil House between Broadway Market and Victoria Park. Sweeping East London views, cold plunge pools and waterfall buckets. One of London's most unique and photogenic wellness spots.",
    lat:51.5380, lng:-0.0565,
    bookingUrl:"https://rooftopsaunas.com"
  },
  {
    id:39, city:"London", country:"UK", name:"Rooftop Saunas Brixton", area:"Brixton",
    type:"both", price:"From £11pp", rating:4.9, reviews:278,
    hours:"Mon–Sat 8am–10:20pm · Sun 9am–7:40pm",
    temp:"5–7°C outdoor cold plunge", tags:["Rooftop","Private Cabins","South London"], emoji:"🏙️🔥", open:true,
    hygiene:"A+", lockerNote:"Lockers and locks provided",
    transport:"Brixton (Victoria) · 5 min walk",
    parking:"Brixton multi-storey nearby",
    desc:"11 storeys up at International House in Brixton. Private sauna cabins with iconic London skyline views and outdoor cold plunge pools. Sister café The Birds Nest is right next door for post-sauna food and drinks.",
    lat:51.4619, lng:-0.1150,
    bookingUrl:"https://rooftopsaunas.com"
  },
  {
    id:40, city:"London", country:"UK", name:"Sauna & Plunge Shoreditch", area:"Shoreditch",
    type:"both", price:"From £30pp", rating:4.8, reviews:156,
    hours:"Check website for current hours",
    temp:"3°C / 6°C / 9°C plunge pools", tags:["Nordic","Infrared","Boutique"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"Lockers and locks provided",
    transport:"Old Street (Northern) · 5 min walk",
    parking:"NCP Old Street · 5 min",
    desc:"Nordic-inspired wellness space at 124 Tabernacle Street with infrared and steam saunas, 3D-printed eco plunge pools at three temperatures, breathwork classes and a boutique coffee lounge. One of London's slickest contrast therapy venues.",
    lat:51.5257, lng:-0.0837,
    bookingUrl:"https://saunaandplunge.life"
  },
  {
    id:41, city:"London", country:"UK", name:"Banya No.1 Hoxton", area:"Hoxton / Shoreditch",
    type:"both", price:"From £35", rating:4.8, reviews:198,
    hours:"Check website for current hours",
    temp:"Cold plunge pool", tags:["Russian Banya","Traditional","Steam"], emoji:"♨️", open:true,
    hygiene:"A", lockerNote:"Lockers and locks provided",
    transport:"Hoxton (Overground) · 5 min walk",
    parking:"Street parking Hoxton Square",
    desc:"Authentic Russian banya experience in Hoxton. Steam sauna with 700°C cast iron, cold plunge, optional platza (oak branch massage), and salt and honey rubs. One of the most intense and authentic heat experiences in London.",
    lat:51.5290, lng:-0.0783,
    bookingUrl:"https://gobanya.co.uk", featured:true, googleRating:4.8
  },
  {
    id:42, city:"London", country:"UK", name:"Finnish Church Sauna Rotherhithe", area:"Rotherhithe",
    type:"sauna", price:"From £25/hour", rating:4.9, reviews:87,
    hours:"Check website for current hours",
    temp:"Cold shower", tags:["Finnish","Historic","Authentic"], emoji:"🇫🇮🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Rotherhithe (Overground) · 5 min walk",
    parking:"Street parking Albion Street",
    desc:"The only authentic Finnish sauna in a Finnish church in London — run by London's Finnish community in Rotherhithe. Holds 8 people. Book private or join a communal session. As authentic as it gets outside Helsinki.",
    lat:51.5018, lng:-0.0533,
    bookingUrl:"https://finnishchurch.org.uk"
  },
  {
    id:43, city:"London", country:"UK", name:"Brockwell Lido Sauna", area:"Herne Hill / Brixton",
    type:"sauna", price:"£8", rating:4.8, reviews:234,
    hours:"Check website for current hours",
    temp:"Outdoor lido / plunge pool", tags:["Lido","Budget","Community"], emoji:"🏊🔥", open:true,
    hygiene:"A", lockerNote:"Lockers and locks provided (shared with lido)",
    transport:"Herne Hill (Thameslink) · 5 min walk",
    parking:"Brockwell Park car park",
    desc:"Small wooden sauna huts at the edge of Brockwell Lido's outdoor pool. Health suite includes sauna, steam room, jacuzzi and plunge pool for just £8. One of the best value wellness experiences in London.",
    lat:51.4523, lng:-0.1082,
    bookingUrl:"https://fusion-lifestyle.com/centres/brockwell-lido"
  },
  {
    id:44, city:"London", country:"UK", name:"Contrast Anerley", area:"Anerley / Crystal Palace",
    type:"both", price:"Check website", rating:4.8, reviews:67,
    hours:"Check website for current hours",
    temp:"Ice bath", tags:["Private","Boutique","South London"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"No lockers — private session (max 4 guests)",
    transport:"Anerley (Overground) · 5 min walk",
    parking:"Street parking Anerley",
    desc:"Private sauna and cold plunge in leafy South London. Maximum 4 people per session for a completely private experience. Traditional Finnish sauna, ice bath, red light therapy and a boutique lounge with complimentary tea.",
    lat:51.4109, lng:-0.0748,
    bookingUrl:"https://contrastlondon.co.uk"
  },
  {
    id:45, city:"London", country:"UK", name:"Shoreditch & Soul", area:"Shoreditch",
    type:"sauna", price:"Membership from £99/month", rating:4.8, reviews:34,
    hours:"Check website for current hours",
    temp:"Cold plunge", tags:["Members Club","Luxury","Events"], emoji:"♨️🌿", open:true,
    hygiene:"A+", lockerNote:"Lockers and locks provided",
    transport:"Shoreditch High Street (Overground) · 3 min walk",
    parking:"NCP Shoreditch nearby",
    desc:"Brand new for 2025. 40-person sauna inside a former Victorian textile warehouse on Cheshire Street. Plant-based dining, alcohol-free cocktails, breathwork, sound healing and supper clubs. London's most immersive wellness members club.",
    lat:51.5234, lng:-0.0741
  },
  {
    id:46, city:"London", country:"UK", name:"Revitalise Urban Spa", area:"Hackney",
    type:"both", price:"Check website", rating:4.7, reviews:48,
    hours:"Check website for current hours",
    temp:"Copper ice baths", tags:["Lithuanian Sauna","Infrared","Boutique"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Hackney Central (Overground) · 7 min walk",
    parking:"Street parking",
    desc:"Traditional Lithuanian and high-spec infrared saunas with copper ice baths. Regular Aufguss rituals, breathwork workshops, and both social and serene morning sessions. A serious contrast therapy venue with real edge.",
    lat:51.5467, lng:-0.0574
  },
  {
    id:47, city:"London", country:"UK", name:"Parliament Hill Lido Sauna", area:"Hampstead Heath",
    type:"sauna", price:"£3.50 add-on", rating:4.9, reviews:178,
    hours:"Late September–May · mornings only",
    temp:"Outdoor lido pool", tags:["Seasonal","Lido","Budget"], emoji:"🔥🌿", open:true,
    hygiene:"A", lockerNote:"Lockers and locks provided (shared with lido)",
    transport:"Gospel Oak (Overground) · 12 min walk",
    parking:"Highgate Road free street parking",
    desc:"Shipping container sauna at the base of Hampstead Heath, one of London's most beautiful spots. Open autumn–spring only. At £3.50 it's the best value sauna in London by some margin.",
    lat:51.5584, lng:-0.1579,
    bookingUrl:"https://cityoflondon.gov.uk/things-to-do/green-spaces/hampstead-heath"
  },

  // ── DUBLIN (NEW) ──
  {
    id:48, city:"Dublin", country:"Ireland", name:"The Barrel Sauna Dundrum", area:"Dundrum",
    type:"both", price:"Check website", rating:4.8, reviews:123,
    hours:"Check website for current hours",
    temp:"Cold plunge pools", tags:["Handcrafted","Finnish","South Dublin"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Individual changing stalls with lockers — lock provided",
    transport:"Dundrum (Luas Green) · 5 min walk",
    parking:"Dundrum Town Centre nearby",
    desc:"Handcrafted barrel saunas with cold plunges and showers. Individual changing stalls with lockers, seating areas and a relaxed unhurried atmosphere. Dublin's most popular dedicated sauna brand.",
    lat:53.2915, lng:-6.2404,
    bookingUrl:"https://thebarrelsauna.ie"
  },
  {
    id:49, city:"Dublin", country:"Ireland", name:"The Barrel Sauna Tallaght", area:"Tallaght",
    type:"both", price:"Check website", rating:4.7, reviews:78,
    hours:"Check website for current hours",
    temp:"Cold plunge pools", tags:["Handcrafted","Finnish","West Dublin"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Individual changing stalls with lockers — lock provided",
    transport:"Tallaght (Luas Red) · 5 min walk",
    parking:"On-site parking available",
    desc:"West Dublin outpost of The Barrel Sauna — same handcrafted quality, cold plunges and community feel.",
    lat:53.2874, lng:-6.3748,
    bookingUrl:"https://thebarrelsauna.ie"
  },
  {
    id:50, city:"Dublin", country:"Ireland", name:"Sandycove Store & Yard", area:"Sandycove / Dún Laoghaire",
    type:"both", price:"Check website", rating:4.9, reviews:203,
    hours:"Check website for current hours",
    temp:"Cold plunge and ice baths", tags:["Forty Foot","Dún Laoghaire","Iconic"], emoji:"🌊🔥", open:true,
    hygiene:"A+", lockerNote:"No lockers — bring a dry bag or use your car",
    transport:"Sandycove & Glasthule (DART) · 5 min walk",
    parking:"Sandycove beach car park",
    desc:"Award-winning sauna and cold plunge just 5 minutes walk from the legendary Forty Foot. Two saunas, cold baths, hot tub and red light therapy. Run by a dog-friendly team — frequented by Forty Foot sea swimmers looking to warm up after their dip. A Dublin institution.",
    lat:53.2861, lng:-6.1147,
    bookingUrl:"https://saysaunas.com"
  },
  {
    id:51, city:"Dublin", country:"Ireland", name:"Fad Saoil Sauna", area:"Clontarf",
    type:"both", price:"Check website", rating:4.9, reviews:112,
    hours:"Check website for current hours",
    temp:"Ice baths", tags:["Community","North Dublin","Coastal"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Clontarf Road (DART) · 5 min walk",
    parking:"Street parking Clontarf",
    desc:"Peaceful sauna in Clontarf East with ice baths and a serene atmosphere. Excellent staff and a welcoming community feel. One of Dublin's most highly rated neighbourhood saunas.",
    lat:53.3658, lng:-6.2109
  },
  {
    id:52, city:"Dublin", country:"Ireland", name:"The Hot Box Sauna Inchicore", area:"Inchicore",
    type:"both", price:"Check website", rating:4.8, reviews:156,
    hours:"Check website for current hours",
    temp:"Three temperatures: cold, tepid, warm", tags:["Sauna Village","Multi-experience","Dublin City"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers and locks provided",
    transport:"Kylemore (Luas Red) · 10 min walk",
    parking:"Street parking Inchicore",
    desc:"Dublin's sauna village — five distinctive Finnish sauna experiences and plunge pools at three different temperatures in the heart of Inchicore. One of the most comprehensive sauna experiences in Ireland.",
    lat:53.3392, lng:-6.3218,
    bookingUrl:"https://thehotboxsauna.ie"
  },
  {
    id:53, city:"Dublin", country:"Ireland", name:"Helios Sauna Bray", area:"Bray, Co. Wicklow",
    type:"both", price:"Check website", rating:4.9, reviews:167,
    hours:"Sessions on the hour · walk-ins welcome",
    temp:"Coastal cold plunge / whiskey barrel", tags:["Coastal","Seafront","Whiskey Barrel"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Bray (DART) · 15 min walk to seafront",
    parking:"Seafront parking Bray",
    desc:"Built in a derelict fisherman's cottage on Bray seafront by two Trinity engineers. Outdoor sauna and cold plunge from repurposed whiskey barrels. Sessions on the hour with stunning sea views. Also has locations in Co. Wicklow and Co. Wexford.",
    lat:53.2027, lng:-6.0984,
    bookingUrl:"https://heliossauna.ie"
  },
  {
    id:54, city:"Dublin", country:"Ireland", name:"Spir Sauna Dublin", area:"Dublin City",
    type:"both", price:"Check website", rating:4.8, reviews:67,
    hours:"Check website for current hours",
    temp:"Chilled filtered cold plunge", tags:["Wood-fired","Urban","Handmade"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Dublin City Centre · various buses and Luas",
    parking:"City centre parking",
    desc:"Handmade bespoke wood-fired sauna with chilled and filtered cold plunge. A clean, thoughtfully designed urban wellness space.",
    lat:53.3398, lng:-6.2591
  },
  {
    id:55, city:"Dublin", country:"Ireland", name:"Saunos at Wanderers FC", area:"Ballsbridge, Dublin 4",
    type:"both", price:"Check website", rating:4.8, reviews:89,
    hours:"Check website for current hours",
    temp:"Steel plunge pools", tags:["Wood-fired","South Dublin","Community"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Lansdowne Road (DART) · 5 min walk",
    parking:"Wanderers FC car park",
    desc:"Eight to ten-person wood-fired sauna and chilly steel plunge pools at Wanderers Football Club in Ballsbridge. A relaxed, community-focused contrast therapy experience in one of Dublin's finest neighbourhoods.",
    lat:53.3272, lng:-6.2277,
    bookingUrl:"https://saunos.ie"
  },

  // ── CORK (NEW) ──
  {
    id:56, city:"Cork", country:"Ireland", name:"Coastal Roast Sauna", area:"Garrettstown Beach",
    type:"both", price:"Check website", rating:4.9, reviews:134,
    hours:"Check website for current hours",
    temp:"Atlantic sea plunge + plunge pools", tags:["Beach","Coastal","Café On-site"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 45 min from Cork City via N71",
    parking:"Garrettstown beach car park",
    desc:"Sauna with panoramic Atlantic Ocean views at Garrettstown Beach. Cool off with a sea dip then warm up in the sauna. Don't miss the O'Flynn's gourmet sausage hot dogs from the on-site café. Views and vibes both 10/10.",
    lat:51.6434, lng:-8.5809,
    bookingUrl:"https://coastalroast.ie"
  },
  {
    id:57, city:"Cork", country:"Ireland", name:"The Sauna Snugg", area:"Garrylucas Beach + Ballincollig",
    type:"both", price:"Check website", rating:4.8, reviews:98,
    hours:"Check website for current hours",
    temp:"Sea + cold plunge", tags:["Coastal","Two Locations","Wood-fired"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 30 min from Cork City · Ballincollig studio closer",
    parking:"Beach car park / on-site",
    desc:"Two Cork locations — a stunning seaside sauna at Garrylucas Beach with Atlantic views, and a newer city studio in Ballincollig for year-round access. Traditional wood-burning saunas with hot and cold therapy.",
    lat:51.6095, lng:-8.5252,
    bookingUrl:"https://thesaunasnugg.com"
  },
  {
    id:58, city:"Cork", country:"Ireland", name:"Wildwood Sauna Cork City", area:"Cork City Marina",
    type:"both", price:"Check website", rating:4.8, reviews:87,
    hours:"Check website for current hours",
    temp:"Chilled filtered ice baths", tags:["City Centre","Marina","Wood-fired"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"No lockers — changing rooms available",
    transport:"Bus to Marina / Cork City buses · 5 min walk",
    parking:"Marina Market car park nearby",
    desc:"Wood-burning sauna in the heart of Cork City, directly opposite the Marina Market. One sauna, two ice baths with chilled filtered water, two cold showers and changing rooms. A proper, no-fuss Cork contrast therapy experience.",
    lat:51.8974, lng:-8.4578
  },
  {
    id:59, city:"Cork", country:"Ireland", name:"The Cosy Sauna Kinsale", area:"Kinsale",
    type:"both", price:"Check website", rating:4.9, reviews:78,
    hours:"Check website for current hours",
    temp:"Irish Sea", tags:["Coastal","Kinsale","Sea Plunge"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 25 min from Cork City",
    parking:"Kinsale town car parks",
    desc:"Traditional sauna at The Dock beach in Kinsale combining sauna heat with a plunge into the cold Irish Sea. Kinsale is one of Ireland's most beautiful coastal towns — this is the perfect post-sail or post-hike recovery.",
    lat:51.7063, lng:-8.5228,
    bookingUrl:"https://thecosysauna.com"
  },
  {
    id:60, city:"Cork", country:"Ireland", name:"Hidden Sauna Bridgefield", area:"Castlemartyr, East Cork",
    type:"both", price:"Check website", rating:4.9, reviews:56,
    hours:"Check website for current hours",
    temp:"Spring-fed river plunge pool", tags:["Countryside","River","Wood-fired"], emoji:"🔥🌲", open:true,
    hygiene:"A+", lockerNote:"No lockers — remote venue, leave valuables in your car",
    transport:"Drive — 30 min east of Cork City via N25",
    parking:"On-site at the farm",
    desc:"Outdoor retreat in the East Cork countryside. Wood-fired sauna powered by timber from a 20-acre ash forest. Cold plunge pool fed by spring water from the Dower River. Coffee and herbal tea in the relaxation area after. Genuinely hidden and genuinely magical.",
    lat:51.9069, lng:-8.0658
  },

  // ── LONDON (NEW ADDITIONS) ──
  {
    id:62, city:"London", country:"UK", name:"Stoke Newington Sauna", area:"Stoke Newington",
    type:"both", price:"£25", rating:4.8, reviews:64,
    hours:"Mon–Fri 7am–9pm, Sat–Sun 9am–9pm",
    temp:"10°C / 15°C plunge pools", tags:["Finnish","Ice Bath","Infrared","North London"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Stoke Newington (rail) · 5 min walk · or bus 73/476",
    parking:"Street parking on Victorian Grove",
    desc:"North London's neighbourhood sauna. A 12-person Finnish sauna at 90°C, a 4-person infrared cabin, and two cold plunge pools at 10°C and 15°C. Silent morning sessions and social Friday evenings. Memberships from £59.99/month — one of the best-value sauna setups in the city.",
    lat:51.5595, lng:-0.0726,
    bookingUrl:"https://stokenewingtonsauna.com"
  },
  {
    id:63, city:"London", country:"UK", name:"Sweheat Sauna", area:"Royal Victoria Dock",
    type:"both", price:"Check website", rating:4.9, reviews:48,
    hours:"Mon/Thu/Fri 4pm–10pm · Sat–Sun 9am–10pm",
    temp:"Dock water plunge", tags:["Wood-fired","East London","Events","Waterside"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Royal Victoria (DLR) · 7 min walk",
    parking:"On-site parking at Royal Victoria Dock",
    desc:"A wood-fired sauna perched right on the waterside at Royal Victoria Dock. Private bookings for up to 6 people, with authentic Aufguss rituals, full moon events and storytelling sessions woven into the programme. One of London's most atmospheric sauna experiences — the dock views make it genuinely special.",
    lat:51.5087, lng:0.0254,
    bookingUrl:"https://www.sweheatsauna.co.uk"
  },
  {
    id:64, city:"London", country:"UK", name:"New Docklands Steam Baths", area:"Canning Town",
    type:"both", price:"£27–£30", rating:4.7, reviews:112,
    hours:"Sessions: mornings (Sat–Sun), afternoons (Tue–Sun), evenings (nightly)",
    temp:"Refrigerated plunge pool", tags:["Steam","East London","Budget","Community"], emoji:"♨️🧊", open:true,
    hygiene:"A", lockerNote:"Lockers on-site",
    transport:"Canning Town (Jubilee/DLR) · 8 min walk",
    parking:"Street parking on Stephenson Street",
    desc:"A proper East London institution. Four steam rooms at different temperatures, a traditional cedarwood sauna (wet and dry modes), and a refrigerated plunge pool. Up to 60 people per session, with NHS and emergency worker discounts. Simple, honest, community-focused bathhouse — none of the Instagram faff.",
    lat:51.5137, lng:0.0030,
    bookingUrl:"https://newdocklands.uk"
  },
  {
    id:65, city:"London", country:"UK", name:"York Hall Spa", area:"Bethnal Green",
    type:"both", price:"From £32.50", rating:4.8, reviews:187,
    hours:"Check website for current hours",
    temp:"Ice fountain & plunge pool", tags:["Historic Building","Steam","Iconic","East London"], emoji:"♨️🏛️", open:true,
    hygiene:"A+", lockerNote:"Lockers and locks provided",
    transport:"Bethnal Green (Central) · 5 min walk",
    parking:"Limited street parking",
    desc:"Built in 1929 and reopened in 2025 after a £500k renovation, York Hall is one of London's most iconic bathhouses. Three hot rooms, two aroma steam rooms, traditional sauna, infrared sauna, ice fountain, monsoon shower, plunge pool and hammam. East London history with a thoroughly modern wellness fit-out.",
    lat:51.5278, lng:-0.0541,
    bookingUrl:"https://be-well.org.uk/spa/"
  },
  {
    id:66, city:"London", country:"UK", name:"Sauna Social Club", area:"Peckham",
    type:"both", price:"From £14.99", rating:4.9, reviews:93,
    hours:"Wednesday–Sunday",
    temp:"Four ice baths at different temps", tags:["Ice Bath","South London","Events","Community","Budget"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Peckham Rye (Overground) · 8 min walk",
    parking:"Street parking on Brayards Road",
    desc:"Tucked into a railway arch in Peckham, this is Southwark's most characterful sauna club. One large 'listening sauna' with a custom hi-fi system, one smaller 'chatty sauna', and four ice baths set at different temperatures. DJ nights on Fridays and Saturdays, plus sound baths, yoga and breathwork. A proper social venue.",
    lat:51.4682, lng:-0.0609,
    bookingUrl:"https://www.saunasocialclub.co.uk"
  },
  {
    id:67, city:"London", country:"UK", name:"Urban Heat Sauna", area:"Camberwell",
    type:"both", price:"Check website", rating:4.8, reviews:57,
    hours:"Mon 5:30–8pm · Wed–Thu 5:30–9pm · Fri 8am–8pm · Sat 10am–4pm · Sun 12–7:30pm",
    temp:"5°C / 10°C outdoor ice baths", tags:["Finnish","Ice Bath","South London","Community"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers on-site · towel hire available",
    transport:"Loughborough Junction (rail) · 5 min walk",
    parking:"Street parking on Camberwell Station Road",
    desc:"A 15-seater Finnish sauna at 90–95°C set in a railway arch in Camberwell, with two outdoor ice baths (5°C and 10°C) in the yard outside. Communal, quiet, same-gender and guided sessions on the weekly rota. Parent-and-baby sessions available. No-frills, serious sauna — exactly what South London needed.",
    lat:51.4685, lng:-0.0888,
    bookingUrl:"https://www.urbanheatwellness.com"
  },
  {
    id:68, city:"London", country:"UK", name:"Porchester Spa", area:"Bayswater",
    type:"both", price:"From £32", rating:4.7, reviews:324,
    hours:"Mon/Wed/Sat: men only · Tue/Thu/Fri: women only · Sun: mixed",
    temp:"Cold plunge pool", tags:["Historic Building","Steam","Iconic","West London"], emoji:"♨️🏛️", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Royal Oak or Bayswater (Circle/District) · 5 min walk",
    parking:"Porchester Road street parking",
    desc:"A Grade II listed bathhouse from 1929 in Bayswater — one of London's oldest and finest. Turkish-style rooms (tepidarium, caldarium, laconium), two steam rooms, a sauna and a cold plunge pool. Single-sex sessions weekdays, mixed on Sundays. Proper old-school London spa, unchanged in the best possible way.",
    lat:51.5153, lng:-0.1835,
    bookingUrl:"https://www.porchesterspatreatments.co.uk"
  },
  {
    id:69, city:"London", country:"UK", name:"Ironmonger Row Baths", area:"Old Street",
    type:"both", price:"From £47", rating:4.8, reviews:146,
    hours:"Check website for current hours",
    temp:"Ice fountain & plunge pool", tags:["Historic Building","Steam","Hammam","Luxury"], emoji:"♨️🏛️", open:true,
    hygiene:"A+", lockerNote:"Lockers and locks provided",
    transport:"Old Street (Northern/Elizabeth) · 3 min walk",
    parking:"Pay & Display on Norman Street",
    desc:"A beautifully restored Victorian baths building steps from Old Street roundabout. Saunas, aroma steam rooms, Turkish-style hot rooms, ice fountain, monsoon shower, bucket shower, plunge pool and hammam — all within a 2-hour session. Operated by Spa Experience, it's the finest traditional bathhouse in the City of London.",
    lat:51.5249, lng:-0.0932,
    bookingUrl:"https://www.spaexperience.org.uk/locations/old-street"
  },

  // ── BATH (additional) ──
  {
    id:70, city:"Bath", country:"UK", name:"Gainsborough Bath Spa", area:"City Centre",
    type:"both", price:"From £65", rating:4.8, reviews:312,
    hours:"9am–8pm daily",
    temp:"Thermal pools & plunge", tags:["Luxury","Historic Building","Thermal Pools","Iconic"], emoji:"♨️🏛️", open:true,
    hygiene:"A+", lockerNote:"Lockers and robes provided",
    transport:"Bath Spa station · 6 min walk",
    parking:"Southgate car park · 8 min",
    desc:"The only spa in the world outside Iceland to offer naturally heated geothermal waters direct from the source. Set inside two restored Grade II listed townhouses on Beau Street, the Gainsborough channels the same thermal waters beneath Bath — at a different price point to Thermae but without the queues. The hydrotherapy pool, thermal suite and vitality pools make it exceptional.",
    lat:51.3799, lng:-2.3596,
    bookingUrl:"https://www.gainsboroughbathspa.com"
  },

  // ── BRIGHTON (additional) ──
  {
    id:71, city:"Brighton", country:"UK", name:"Saltdean Lido Sauna", area:"Saltdean",
    type:"both", price:"From £12", rating:4.7, reviews:78,
    hours:"Check website for current hours",
    temp:"Cold plunge & sea", tags:["Lido","Seafront","Community","Outdoor"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"Lockers available on-site",
    transport:"Bus 27 from Brighton · 25 min",
    parking:"Saltdean Lido car park",
    desc:"The Grade II listed Saltdean Lido, one of Britain's finest Art Deco lidos, added sauna and contrast therapy facilities as part of its major restoration. Sea views, outdoor cold plunges in restored pools, and a genuine community-run ethos. An unexpectedly beautiful sauna experience six miles east of Brighton.",
    lat:50.7956, lng:-0.0321,
    bookingUrl:"https://saltdeanlido.co.uk"
  },

  // ── MANCHESTER (additional) ──
  {
    id:72, city:"Manchester", country:"UK", name:"Manifest Health Club", area:"Salford / Greengate",
    type:"both", price:"Day pass from £25", rating:4.8, reviews:143,
    hours:"Mon–Fri 6am–10pm · Sat–Sun 7am–9pm",
    temp:"6°C cold plunge", tags:["Finnish","Ice Bath","Luxury","City Centre"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"Lockers and towels provided",
    transport:"Salford Central (rail) · 5 min walk",
    parking:"NCP Greengate · 3 min",
    desc:"Manchester's most complete contrast therapy venue — a Finnish sauna, infrared cabin, and cold plunge pool in a beautifully designed Salford space. Day passes include full locker, towel and robe. Memberships for regulars. A serious wellness club rather than a gym add-on.",
    lat:53.4826, lng:-2.2496,
    bookingUrl:"https://www.manifesthealthclub.com"
  },
  {
    id:73, city:"Manchester", country:"UK", name:"AMP Wellbeing", area:"Ancoats",
    type:"both", price:"From £20", rating:4.7, reviews:97,
    hours:"Mon–Fri 7am–9pm · Sat–Sun 8am–8pm",
    temp:"Ice bath & cold shower", tags:["Finnish","Ice Bath","East London","Community"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Piccadilly Gardens tram · 10 min walk",
    parking:"Ancoats street parking",
    desc:"In the heart of Ancoats, Manchester's most creative neighbourhood, AMP combines a Finnish sauna with cold water immersion and recovery-focused programming. Regular guided breathwork and Wim Hof sessions. Used by a mix of athletes, creatives and anyone serious about recovery.",
    lat:53.4802, lng:-2.2241,
    bookingUrl:"https://www.ampwellbeing.co.uk"
  },

  // ── EDINBURGH (additional) ──
  {
    id:74, city:"Edinburgh", country:"UK", name:"One Spa Edinburgh", area:"West End",
    type:"both", price:"From £45", rating:4.8, reviews:521,
    hours:"7am–9pm daily",
    temp:"Hydropool & plunge", tags:["Luxury","Steam","Rooftop Pool","Iconic"], emoji:"♨️🌿", open:true,
    hygiene:"A+", lockerNote:"Lockers, robes and towels included",
    transport:"Haymarket station · 8 min walk",
    parking:"Edinburgh International Conference Centre NCP",
    desc:"One of Scotland's finest urban spas, set within the Sheraton Grand Hotel at Festival Square. The rooftop hydropool with Edinburgh skyline views is justifiably famous. Within the thermal suite: a Finnish sauna, aroma steam room, ice fountain, experiential showers and a 17m pool. Exceptional for a city-centre spa day.",
    lat:55.9476, lng:-3.2070,
    bookingUrl:"https://www.one-spa.com"
  },
  {
    id:75, city:"Edinburgh", country:"UK", name:"Balmoral Spa", area:"New Town",
    type:"both", price:"From £55", rating:4.9, reviews:284,
    hours:"7am–9pm daily",
    temp:"Plunge pool & cold shower", tags:["Luxury","Historic Building","Iconic","Steam"], emoji:"♨️🏛️", open:true,
    hygiene:"A+", lockerNote:"Robes and slippers provided",
    transport:"Waverley station · 2 min walk",
    parking:"NCP St Andrew Square · 5 min",
    desc:"Inside Edinburgh's most iconic hotel at the foot of Princes Street, the Balmoral Spa offers a full thermal suite including Finnish sauna, steam room, plunge pool and an indoor pool beneath the castle. Classically Scottish luxury with impeccable service — the best hotel spa experience in the city.",
    lat:55.9518, lng:-3.1886,
    bookingUrl:"https://www.roccofortehotels.com/hotels-and-resorts/the-balmoral-hotel/spa/"
  },
  {
    id:76, city:"Edinburgh", country:"UK", name:"Thermae Scotland", area:"Murrayfield / West Edinburgh",
    type:"both", price:"From £22", rating:4.7, reviews:156,
    hours:"Mon–Fri 6:30am–10pm · Sat–Sun 8am–9pm",
    temp:"8°C cold plunge", tags:["Finnish","Ice Bath","Community","Contrast Therapy"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Murrayfield tram · 10 min walk",
    parking:"Free on-site parking",
    desc:"Edinburgh's dedicated contrast therapy venue — Finnish sauna, infrared sauna and cold plunge in a no-frills wellness-focused facility in west Edinburgh. Popular with rugby and running communities around Murrayfield. Guided breathwork and Wim Hof sessions run weekly. Honest pricing and a great community.",
    lat:55.9436, lng:-3.2553,
    bookingUrl:"https://www.thermaescotland.co.uk"
  },

  // ── BELFAST (additional) ──
  {
    id:77, city:"Belfast", country:"UK", name:"Bullitt Hotel Wellness", area:"Cathedral Quarter",
    type:"both", price:"From £30", rating:4.7, reviews:118,
    hours:"7am–10pm daily",
    temp:"Cold plunge & ice bath", tags:["Finnish","Ice Bath","Boutique","City Centre"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"Lockers, robes and towels provided",
    transport:"Belfast City Hall · 5 min walk",
    parking:"Crown Entry car park",
    desc:"The Bullitt Hotel's subterranean wellness floor is Belfast's most stylish contrast therapy offering. Finnish sauna, cold plunge pool and ice bath in a beautifully designed industrial-chic space under one of the Cathedral Quarter's most popular hotels. Bookable by non-guests — a genuine Belfast hidden gem.",
    lat:54.5987, lng:-5.9300,
    bookingUrl:"https://www.bullitthotel.com/wellness"
  },
  {
    id:78, city:"Belfast", country:"UK", name:"Andras House Sauna & Spa", area:"City Centre",
    type:"both", price:"From £18", rating:4.6, reviews:89,
    hours:"Mon–Fri 7am–9pm · Sat–Sun 8am–8pm",
    temp:"Cold shower & plunge", tags:["Steam","Historic Building","Budget","City Centre"], emoji:"♨️🧊", open:true,
    hygiene:"A", lockerNote:"Lockers available",
    transport:"Europa Buscentre · 3 min walk",
    parking:"Great Northern Mall car park",
    desc:"A long-established Belfast spa institution near the Europa Hotel, offering sauna, steam room and wet spa facilities at genuinely accessible prices. Not the flashiest venue in town but consistently well-reviewed for value, cleanliness and the friendly no-nonsense Belfast welcome.",
    lat:54.5952, lng:-5.9363,
    bookingUrl:"https://www.andrashouse.co.uk/spa"
  },
  {
    id:79, city:"Belfast", country:"UK", name:"Titanic Quarter Sauna", area:"Titanic Quarter",
    type:"both", price:"From £20", rating:4.7, reviews:64,
    hours:"Check website for current hours",
    temp:"Cold plunge", tags:["Finnish","Ice Bath","Waterside","East London"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Titanic Quarter (rail/Glider) · 5 min walk",
    parking:"Titanic Quarter visitor parking",
    desc:"A newer wellness venue in Belfast's regenerated Titanic Quarter, with direct views across the River Lagan. Finnish sauna and cold plunge, steps from the Titanic Belfast museum and the working dock heritage. Part of a growing Belfast wellness scene that's developed rapidly since 2022.",
    lat:54.6074, lng:-5.9084,
    bookingUrl:"https://www.titanicbelfast.com"
  },

  // ── GLASGOW (new city) ──
  {
    id:80, city:"Glasgow", country:"UK", name:"Blythswood Square Spa", area:"City Centre",
    type:"both", price:"From £40", rating:4.8, reviews:398,
    hours:"7am–9pm daily",
    temp:"Plunge pool & cold shower", tags:["Luxury","Steam","Historic Building","Iconic"], emoji:"♨️🏛️", open:true,
    hygiene:"A+", lockerNote:"Robes, slippers and towels provided",
    transport:"Buchanan Street (Subway) · 5 min walk",
    parking:"NCP Mitchell Street · 5 min",
    desc:"Set inside a former RAC Club in a magnificent Georgian townhouse on Blythswood Square, this is Glasgow's finest urban spa. The thermal suite includes a Finnish sauna, steam room, plunge pool and treatment rooms. The original 1920s detailing — mosaic tiles, arched ceilings — makes it one of Britain's most beautiful spa spaces.",
    lat:55.8642, lng:-4.2607,
    bookingUrl:"https://www.theblythswood.com/spa"
  },
  {
    id:81, city:"Glasgow", country:"UK", name:"Bòthan Sauna Glasgow", area:"West End",
    type:"both", price:"From £18", rating:4.9, reviews:112,
    hours:"Check website for current hours",
    temp:"8°C cold plunge", tags:["Finnish","Ice Bath","Community","Wood-fired"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Kelvinbridge (Subway) · 7 min walk",
    parking:"Kelvingrove street parking",
    desc:"Glasgow's community sauna in the West End — an intimate Finnish sauna with cold plunge, run with the same ethos as Edinburgh's best neighbourhood venues. Wood-fired heat, honest pricing and a genuinely warm Glasgow welcome. Events programme includes sound baths, breathwork and whisky-tasting sauna nights.",
    lat:55.8693, lng:-4.2894,
    bookingUrl:"https://www.bòthan.co.uk"
  },
  {
    id:82, city:"Glasgow", country:"UK", name:"The Baths Glasgow", area:"Partick / West End",
    type:"both", price:"From £15", rating:4.7, reviews:87,
    hours:"Mon–Fri 7am–10pm · Sat–Sun 8am–9pm",
    temp:"Ice bath & cold plunge", tags:["Historic Building","Steam","Community","West London"], emoji:"♨️🧊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Partick (Subway/rail) · 6 min walk",
    parking:"Dumbarton Road street parking",
    desc:"Housed in a converted Victorian bathhouse in Partick, The Baths brings sauna culture to Glasgow's West End in a building with genuine heritage. Sauna, steam room and cold plunge in original tiled surroundings. Budget-friendly and community-focused — a great contrast to the hotel spa experience.",
    lat:55.8720, lng:-4.3106,
    bookingUrl:"https://www.thebathsglasgow.co.uk"
  },

  // ── CARDIFF (new city) ──
  {
    id:83, city:"Cardiff", country:"UK", name:"St David's Spa", area:"Cardiff Bay",
    type:"both", price:"From £50", rating:4.8, reviews:276,
    hours:"9am–9pm daily",
    temp:"Plunge pool & ice fountain", tags:["Luxury","Steam","Waterside","Iconic"], emoji:"♨️🌊", open:true,
    hygiene:"A+", lockerNote:"Robes and towels provided",
    transport:"Cardiff Bay (rail) · 3 min walk",
    parking:"Red Dragon Centre car park",
    desc:"Perched on the waterfront at Cardiff Bay with views across the barrage and Bristol Channel, St David's Spa is Wales's finest thermal spa experience. A full thermal suite — sauna, steam rooms, ice fountain, hydrotherapy pool, plunge pool — in a striking glass-fronted building beside the five-star St David's Hotel. The Bay setting makes every session feel like a mini-break.",
    lat:51.4638, lng:-3.1624,
    bookingUrl:"https://www.stdavidshotel.com/spa"
  },
  {
    id:84, city:"Cardiff", country:"UK", name:"Pontcanna Sauna Club", area:"Pontcanna",
    type:"both", price:"From £16", rating:4.8, reviews:93,
    hours:"Check website for current hours",
    temp:"7°C cold plunge", tags:["Finnish","Ice Bath","Community","Wood-fired"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Pontcanna Fields bus · 5 min walk",
    parking:"Pontcanna Fields free parking",
    desc:"Cardiff's community-owned sauna club in the green heart of Pontcanna Fields. A wood-fired Finnish sauna built on the banks of the River Taff, with a cold plunge fed from the river. Run on a not-for-profit basis by sauna enthusiasts — affordable, welcoming and genuinely lovely.",
    lat:51.4898, lng:-3.2044,
    bookingUrl:"https://www.pontcannasaunaclub.co.uk"
  },
  {
    id:85, city:"Cardiff", country:"UK", name:"Spire Cardiff Wellness", area:"Pontprennau",
    type:"both", price:"From £28", rating:4.6, reviews:134,
    hours:"Mon–Fri 7am–9pm · Sat–Sun 8am–8pm",
    temp:"Cold plunge & ice bath", tags:["Finnish","Ice Bath","Luxury","City Centre"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"Lockers, robes and towels provided",
    transport:"Drive recommended · bus 30 from city",
    parking:"Free on-site parking",
    desc:"The wellness centre within Spire Cardiff Hospital complex offers a full contrast therapy suite open to non-patients: Finnish sauna, infrared cabin, cold plunge pool and ice bath. A serious recovery facility used by Cardiff Blues rugby players and athletes alongside the general public. One of the best-equipped sauna facilities in Wales.",
    lat:51.5268, lng:-3.1368,
    bookingUrl:"https://www.spirecardiff.co.uk/wellbeing"
  },

  // ── STOCKHOLM (additional) ──
  {
    id:86, city:"Stockholm", country:"Sweden", name:"Sturebadet", area:"Östermalm",
    type:"both", price:"From 250 SEK", rating:4.8, reviews:634,
    hours:"Mon–Fri 6:30am–9pm · Sat–Sun 8am–8pm",
    temp:"Cold plunge pool", tags:["Luxury","Historic Building","Steam","Art Nouveau"], emoji:"♨️🏛️", open:true,
    hygiene:"A+", lockerNote:"Lockers, robes and towels provided",
    transport:"Östermalmstorg (T-bana) · 1 min walk",
    parking:"Birger Jarlsgatan street parking",
    desc:"Stockholm's most celebrated historic bathhouse, opened in 1885 inside the spectacular Sturegallerian arcade. The Art Nouveau thermal suite features a Swedish sauna, steam room, Roman pool and cold plunge — all beneath a breathtaking ornate skylight. A living piece of Stockholm's history and the city's most atmospherically beautiful sauna experience.",
    lat:59.3346, lng:18.0752,
    bookingUrl:"https://www.sturebadet.se"
  },
  {
    id:87, city:"Stockholm", country:"Sweden", name:"Yasuragi", area:"Hasseludden / Nacka",
    type:"both", price:"From 495 SEK", rating:4.9, reviews:487,
    hours:"9am–9pm daily",
    temp:"Multiple cold pools", tags:["Luxury","Finnish","Outdoor Pools","Nordic"], emoji:"🧘🔥", open:true,
    hygiene:"A+", lockerNote:"Yukata robe included",
    transport:"Saltsjöbanan railway to Henriksdal · boat connection",
    parking:"Free on-site parking",
    desc:"A Japanese-inspired spa resort on a private peninsula 30 minutes from Stockholm. Yasuragi combines a full Nordic sauna programme — Finnish saunas, outdoor wood-fired saunas, cold plunges into the archipelago — with Japanese bathhouse traditions including ofuro soaking pools and onsen-style outdoor baths. One of Scandinavia's most unique and beautiful wellness experiences.",
    lat:59.2781, lng:18.1847,
    bookingUrl:"https://www.yasuragi.se"
  },

  // ── HELSINKI (additional) ──
  {
    id:88, city:"Helsinki", country:"Finland", name:"Kulttuurisauna", area:"Hakaniemi",
    type:"both", price:"From €14", rating:4.9, reviews:389,
    hours:"Tue–Sun 3pm–9pm",
    temp:"Baltic Sea plunge", tags:["Finnish","Sea Plunge","Boutique","Iconic"], emoji:"🔥🌊", open:true,
    hygiene:"A+", lockerNote:"Lockers provided · towel hire available",
    transport:"Hakaniemi (Metro) · 10 min walk",
    parking:"Street parking on Hakaniemenranta",
    desc:"Designed by architects Tuomas Toivonen and Nene Tsuboi and opened in 2013, Kulttuurisauna is widely regarded as one of the world's most beautifully designed saunas. The cedar-lined interior opens directly through a wooden door to the Baltic Sea — a 10-second walk from sauna to cold water. A quiet, contemplative sauna experience that captures everything essential about Finnish sauna culture.",
    lat:60.1780, lng:24.9662,
    bookingUrl:"https://www.kulttuurisauna.fi"
  },

  // ── COPENHAGEN (additional) ──
  {
    id:89, city:"Copenhagen", country:"Denmark", name:"Saunerne Copenhagen", area:"Holmen",
    type:"both", price:"From 150 DKK", rating:4.8, reviews:203,
    hours:"Check website for current hours",
    temp:"Harbour water plunge", tags:["Wood-fired","Waterside","Community","Nordic"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Bus 9A to Holmen · 5 min walk",
    parking:"Limited street parking on Holmen",
    desc:"Floating wood-fired saunas moored in Copenhagen's historic naval harbour at Holmen. The city's most characterful sauna experience — you heat up in a hand-built cedar cabin then dive straight into the harbour. Programme includes evening swims, winter bathing events and full-moon saunas. The old naval buildings provide one of Copenhagen's most atmospheric backdrops.",
    lat:55.6820, lng:12.5921,
    bookingUrl:"https://www.saunerne.dk"
  },
  {
    id:90, city:"Copenhagen", country:"Denmark", name:"Kastrup Sea Bath", area:"Kastrup / Amager",
    type:"plunge", price:"Free", rating:4.8, reviews:1243,
    hours:"Open year-round · lifeguard Jun–Aug",
    temp:"Baltic Sea · 2°C–20°C seasonal", tags:["Sea Plunge","Free","Outdoor","Iconic"], emoji:"🌊❄️", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Bus 35 from Nørreport · 25 min",
    parking:"Free on-site parking",
    desc:"Jørn Utzon's masterpiece-level bathing pavilion in Kastrup — a sinuous white ring of bleached oak hovering above the sea. No sauna here, just the Baltic in all its icy glory: a ramped walk down into the water at whatever temperature the season dictates. Breathtakingly beautiful architecture. Free, open year-round, and an essential Copenhagen experience.",
    lat:55.6282, lng:12.6424,
    bookingUrl:"https://kastrup-soebad.dk"
  },
  {
    id:91, city:"Copenhagen", country:"Denmark", name:"Amager Strandpark Sauna", area:"Amager Beach",
    type:"both", price:"From 80 DKK", rating:4.7, reviews:167,
    hours:"Mon–Sun 10am–9pm (seasonal extended hours)",
    temp:"Baltic Sea plunge", tags:["Finnish","Sea Plunge","Outdoor","Coastal"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"Lockers available",
    transport:"Amager Strand (Metro M2) · 5 min walk",
    parking:"Amager Strandpark free parking",
    desc:"A public sauna facility at the southern end of Amager Strandpark, Copenhagen's popular 4.6km urban beach. Finnish sauna cabin with direct access to the Baltic — a simple, genuinely affordable alternative to the more famous city saunas. Incredible sunset views across Øresund towards Sweden. Busy on summer evenings, beautifully empty in winter.",
    lat:55.6478, lng:12.6434,
    bookingUrl:"https://www.amager-strandpark.dk"
  },

  // ── OSLO (additional) ──
  {
    id:92, city:"Oslo", country:"Norway", name:"The Well Oslo", area:"Kolbotn (south Oslo)",
    type:"both", price:"From 295 NOK", rating:4.9, reviews:1876,
    hours:"Mon–Fri 10am–11pm · Sat–Sun 9am–11pm",
    temp:"Multiple cold pools 8°C–15°C", tags:["Luxury","Finnish","Thermal Pools","Nordic"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"Lockers provided · robes for hire",
    transport:"Kolbotn (Østfoldbanen) · 5 min walk",
    parking:"Large free on-site parking",
    desc:"Scandinavia's largest spa complex and a genuine landmark in Nordic wellness. The Well contains 16 different pools, 12 saunas, 6 steam rooms and 5 cold plunges across multiple zones themed around different sauna traditions — Finnish, Russian, Turkish, Japanese. The sheer scale and quality makes it worth the 20-minute journey south of Oslo. A full day is barely enough.",
    lat:59.8000, lng:10.7981,
    bookingUrl:"https://www.thewell.no"
  },
  {
    id:93, city:"Oslo", country:"Norway", name:"Frognerbadet", area:"Frogner",
    type:"both", price:"From 130 NOK", rating:4.7, reviews:423,
    hours:"Mon–Fri 7am–7:30pm · Sat–Sun 10am–5pm",
    temp:"Cold plunge & outdoor pool", tags:["Outdoor Pools","Historic Building","Community","Iconic"], emoji:"🏊🔥", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Frogner Park bus · 5 min walk",
    parking:"Kirkeveien street parking",
    desc:"Oslo's classic outdoor lido in Frogner Park, opened in 1930 and listed as a protected heritage site. The sauna pavilion sits alongside the beautifully restored outdoor pools — Finnish sauna with outdoor deck and cold plunge. Magnificent in summer when the pools are full; wonderfully quiet in winter when it's just the hardy sauna regulars. A genuine Oslo institution.",
    lat:59.9266, lng:10.7066,
    bookingUrl:"https://www.frognerbadet.no"
  },
  {
    id:94, city:"Oslo", country:"Norway", name:"Tjuvholmen Sjøbad", area:"Tjuvholmen / Aker Brygge",
    type:"plunge", price:"Free", rating:4.7, reviews:687,
    hours:"Open year-round",
    temp:"Oslo Fjord · 2°C–22°C seasonal", tags:["Sea Plunge","Free","Outdoor","Waterside"], emoji:"🌊❄️", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Aker Brygge tram · 5 min walk",
    parking:"Tjuvholmen street parking · very limited",
    desc:"Oslo's most photogenic sea bath — a small but perfectly placed bathing facility on the Tjuvholmen art peninsula, steps from the Astrup Fearnley Museum. No sauna, but the Oslo Fjord plunge here — in a setting designed by Renzo Piano — is one of the most architecturally stunning cold water experiences in Europe. Free, year-round and open at all hours.",
    lat:59.9071, lng:10.7248,
    bookingUrl:"https://www.visitoslo.com/en/product/?TLp=185440"
  },

  // ── GALWAY (additional) ──
  {
    id:95, city:"Galway", country:"Ireland", name:"Inis Wellness Galway", area:"Salthill",
    type:"both", price:"From €20", rating:4.8, reviews:134,
    hours:"Check website for current hours",
    temp:"Sea plunge & cold pool", tags:["Finnish","Sea Plunge","Coastal","Community"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Bus 401 Galway–Salthill · 5 min walk",
    parking:"Salthill Promenade free parking",
    desc:"A sauna and cold plunge venue in Salthill, Galway's seafront suburb, with views across Galway Bay to the Burren. Finnish sauna cabin with direct cold plunge pool and easy access to the Atlantic for the brave. A few minutes' walk from the famous Blackrock Diving Tower. Part of Galway's quietly excellent wellness scene.",
    lat:53.2610, lng:-9.0853,
    bookingUrl:"https://www.iniswellness.ie"
  },
  {
    id:96, city:"Galway", country:"Ireland", name:"Galway City Sauna", area:"Galway City Centre",
    type:"both", price:"From €18", rating:4.7, reviews:87,
    hours:"Mon–Sat 8am–9pm · Sun 9am–7pm",
    temp:"7°C cold plunge", tags:["Finnish","Ice Bath","City Centre","Community"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Galway city centre · 10 min walk from Eyre Square",
    parking:"Galway city centre car parks",
    desc:"Galway's city-centre contrast therapy venue — a proper Finnish sauna and cold plunge for those who want the experience without driving to the coast. Regular sessions, guided breathwork events and a friendly community atmosphere. Simple, honest and exactly what the West of Ireland needed in the city proper.",
    lat:53.2743, lng:-9.0488,
    bookingUrl:"https://www.galwaycitysauna.ie"
  },

  // ── SLIGO ──
  {
    id:97, city:"Sligo", country:"Ireland", name:"Voya Seaweed Baths Strandhill", area:"Strandhill",
    type:"seaweed", price:"From €30", rating:4.9, reviews:312,
    hours:"Check website for current hours",
    temp:"Cold shower & sea", tags:["Seaweed Bath","Seafront","Coastal","Outdoor","Wild Atlantic"], emoji:"🌿♨️", open:true,
    hygiene:"A+", lockerNote:"Lockers provided",
    transport:"Drive — 8 km from Sligo town",
    parking:"Free on-site parking at Strandhill beach",
    desc:"The original Irish seaweed bath experience on the shores of Strandhill beach with views of Knocknarea. Voya's certified organic seaweed is harvested from the North Atlantic and packed into private wooden bathing boxes fed with heated sea water. An ancient Irish wellness tradition, now with a proper modern bathhouse. Unforgettable — especially in a winter Atlantic storm.",
    lat:54.2693, lng:-8.5994,
    bookingUrl:"https://www.voya.ie/seaweed-baths"
  },

  // ── KERRY ──
  {
    id:98, city:"Kerry", country:"Ireland", name:"Skellig Sauna", area:"Portmagee",
    type:"both", price:"From €25", rating:4.9, reviews:87,
    hours:"Check website for current hours",
    temp:"Atlantic plunge", tags:["Wood-fired","Seafront","Coastal","Wild Atlantic"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 20 km from Cahersiveen",
    parking:"Free on-site at Portmagee pier",
    desc:"A wood-fired sauna barrel perched above the Atlantic at Portmagee, looking out towards the Skellig Islands. One of Ireland's most dramatically situated sauna experiences — the contrast between the 90°C cedar heat and the wild Atlantic below is extraordinary. Book via Airbnb Experiences; slots fill weeks ahead in summer.",
    lat:51.8847, lng:-10.2993,
    bookingUrl:"https://www.airbnb.com/experiences/skellig-sauna"
  },
  {
    id:99, city:"Kerry", country:"Ireland", name:"Killarney Thermal Spa", area:"Killarney",
    type:"both", price:"From €35", rating:4.7, reviews:198,
    hours:"Check website for current hours",
    temp:"Cold plunge & ice bath", tags:["Luxury","Steam","Finnish","City Centre"], emoji:"♨️🔥", open:true,
    hygiene:"A+", lockerNote:"Lockers, robes and towels provided",
    transport:"Killarney town centre · 5 min walk",
    parking:"Killarney town car parks",
    desc:"Killarney's dedicated wellness centre with Finnish sauna, steam room and contrast therapy pools in the heart of Ireland's most visited town. A genuine sauna (not just a hotel gym add-on), with proper plunge and ice bath options and a well-run programme of guided sessions. The perfect way to recover after hiking the MacGillycuddy's Reeks.",
    lat:52.0599, lng:-9.5044,
    bookingUrl:"https://www.killarneyspasalud.ie"
  },

  // ── WICKLOW ──
  {
    id:100, city:"Wicklow", country:"Ireland", name:"Greystones Sauna", area:"Greystones",
    type:"both", price:"From €20", rating:4.8, reviews:134,
    hours:"Check website for current hours",
    temp:"8°C cold plunge", tags:["Finnish","Ice Bath","Coastal","Community"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Greystones DART station · 10 min walk",
    parking:"Greystones Marina car park",
    desc:"A well-run Finnish sauna and cold plunge on the Wicklow coast at Greystones, popular with the DART-commuting wellness crowd from south Dublin. Great community atmosphere, a solid regular events programme, and incredible sea views from the outdoor cold plunge area. A proper sauna club just 40 minutes from Dublin by train.",
    lat:53.1434, lng:-6.0697,
    bookingUrl:"https://www.greystonessauna.ie"
  },

  // ── GOTHENBURG ──
  {
    id:101, city:"Gothenburg", country:"Sweden", name:"Hagabadet", area:"Haga",
    type:"both", price:"From 195 SEK", rating:4.8, reviews:756,
    hours:"Mon–Fri 7am–9pm · Sat–Sun 9am–7pm",
    temp:"Cold plunge pool", tags:["Historic Building","Steam","Art Nouveau","Iconic"], emoji:"♨️🏛️", open:true,
    hygiene:"A+", lockerNote:"Lockers and robes provided",
    transport:"Haga tram stop · 3 min walk",
    parking:"Linnégatan street parking",
    desc:"A stunning 1913 Art Nouveau bathhouse in the heart of Göteborg's historic Haga district. Swedish sauna, Roman pool, steam rooms, and cold plunge in one of Scandinavia's most beautiful wellness buildings. The ornate tiled interior has been lovingly preserved — this is what a bathhouse should feel like. A genuine Swedish institution.",
    lat:57.6982, lng:11.9579,
    bookingUrl:"https://www.hagabadet.se"
  },
  {
    id:102, city:"Gothenburg", country:"Sweden", name:"Frihamnen Sauna", area:"Frihamnen",
    type:"both", price:"From 150 SEK", rating:4.7, reviews:203,
    hours:"Check website for current hours",
    temp:"Harbour plunge", tags:["Waterside","Community","Nordic","Outdoor"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Bus 16 to Frihamnen · 5 min walk",
    parking:"Frihamnen port parking",
    desc:"A waterside sauna in Gothenburg's regenerated Frihamnen harbour district. Floating sauna cabins with direct access to Göta Älv, one of Gothenburg's most dramatically evolving urban waterfronts. Simple, honest, community-run — a real local alternative to the polished hotel spa experience. The riverside plunge is unforgettable in winter.",
    lat:57.7089, lng:11.9742,
    bookingUrl:"https://www.frihamnen.nu/sauna"
  },

  // ── BERGEN ──
  {
    id:103, city:"Bergen", country:"Norway", name:"Alrek Badehus", area:"Landås",
    type:"both", price:"From 195 NOK", rating:4.7, reviews:189,
    hours:"Mon–Fri 7am–9pm · Sat–Sun 9am–7pm",
    temp:"Cold plunge pool", tags:["Community","Finnish","Historic Building","Budget"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Buss 62 to Landås · 5 min walk",
    parking:"Alrekstad free parking",
    desc:"Bergen's neighbourhood bathhouse in the Landås district — a proper Finnish sauna, steam room and cold plunge serving the local community for decades. None of the tourist gloss of the city centre, just genuine Bergen sauna culture at honest prices. Beloved by regulars and recommended by locals over any hotel spa in the city.",
    lat:60.3623, lng:5.3601,
    bookingUrl:"https://www.alrekbadehus.no"
  },
  {
    id:104, city:"Bergen", country:"Norway", name:"Nordnes Sjøbad", area:"Nordnes",
    type:"plunge", price:"From 70 NOK", rating:4.8, reviews:423,
    hours:"Mon–Fri 7am–7pm · Sat–Sun 9am–6pm",
    temp:"Bergen Fjord · 4°C–16°C seasonal", tags:["Sea Plunge","Historic Building","Outdoor","Community"], emoji:"🌊❄️", open:true,
    hygiene:"A", lockerNote:"Lockers available",
    transport:"Walk from city centre · 15 min / ferry from Bryggen",
    parking:"Nordnes park limited parking",
    desc:"Bergen's beloved open-air seawater pool on the Nordnes peninsula, with a small sauna cabin and direct fjord access. Built in 1915 and still going strong — a proper historic sea bath in the Norwegian tradition. The combination of the Hanseatic Wharf backdrop and the cold Vestfjorden makes this one of Norway's most atmospheric outdoor bathing spots.",
    lat:60.3956, lng:5.3039,
    bookingUrl:"https://www.bergenskommune.no/nordnes-sjobad"
  },

  // ── LAPLAND (ROVANIEMI) ──
  {
    id:105, city:"Rovaniemi", country:"Finland", name:"Arctic SnowHotel Sauna Village", area:"Sinettä / Arctic Circle",
    type:"both", price:"From €45", rating:4.9, reviews:278,
    hours:"Check website for current hours",
    temp:"Frozen lake plunge", tags:["Finnish","Outdoor","Scenic","Nordic"], emoji:"❄️🔥", open:true,
    hygiene:"A+", lockerNote:"Robes provided",
    transport:"Drive — 25 km from Rovaniemi centre",
    parking:"Free on-site parking",
    desc:"A full sauna village beside a frozen lake in the Lappish wilderness, 25km from Rovaniemi. Traditional Finnish smoke sauna, wood-fired barrel sauna, and an outdoor lake plunge — best in winter when the lake is frozen and the northern lights are overhead. The snow-covered pine forest setting makes this the quintessential Arctic sauna experience. Guests plunge directly through a hole in the ice.",
    lat:66.5494, lng:25.7037,
    bookingUrl:"https://www.arcticsnowhotel.fi/sauna"
  },
  {
    id:106, city:"Rovaniemi", country:"Finland", name:"Arktikum Sauna Rovaniemi", area:"City Centre",
    type:"both", price:"From €20", rating:4.8, reviews:142,
    hours:"Check website for current hours",
    temp:"River Ounasjoki plunge", tags:["Finnish","Sea Plunge","City Centre","Iconic"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Rovaniemi centre · 10 min walk from station",
    parking:"Arktikum free parking",
    desc:"A public sauna on the banks of the River Ounasjoki in central Rovaniemi, steps from the Arktikum science museum. Traditional Finnish sauna with a direct jump into the river — an exhilarating experience year-round, but particularly magical in winter under the northern lights. The most accessible sauna experience in Finnish Lapland for visitors based in the city.",
    lat:66.5050, lng:25.7193,
    bookingUrl:"https://www.visitrovaniemi.fi/sauna"
  },

  // ── LIVERPOOL ──
  {
    id:107, city:"Liverpool", country:"UK", name:"Sauna Social Liverpool", area:"Baltic Triangle",
    type:"both", price:"From £18", rating:4.8, reviews:124,
    hours:"Check website for current hours",
    temp:"7°C cold plunge", tags:["Finnish","Ice Bath","Community","East London"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Liverpool Central (rail) · 15 min walk",
    parking:"Baltic Triangle street parking",
    desc:"Liverpool's community sauna in the creative Baltic Triangle district. A Finnish sauna and cold plunge in a converted warehouse, with a strong programme of guided sessions, breathwork events and social sauna nights. Part of a wave of community wellness spaces transforming Liverpool's warehouse district. Great atmosphere, honest pricing.",
    lat:53.3999, lng:-2.9820,
    bookingUrl:"https://www.saunasocialliverpool.co.uk"
  },
  {
    id:108, city:"Liverpool", country:"UK", name:"Liverpool Lido Sauna", area:"Liverpool Waterfront",
    type:"both", price:"From £15", rating:4.7, reviews:89,
    hours:"Check website for current hours",
    temp:"Mersey River plunge", tags:["Waterside","Outdoor","Community","Historic Building"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Pier Head ferry terminal · 5 min walk",
    parking:"Waterfront parking at Albert Dock",
    desc:"A sauna and outdoor cold water bathing facility on Liverpool's iconic waterfront, with views across the Mersey to the Wirral peninsula. Wood-fired sauna cabin and direct River Mersey plunge access — one of England's most dramatic outdoor bathing settings. Run by local volunteers with the same ethos as London's community sauna movement.",
    lat:53.4053, lng:-2.9974,
    bookingUrl:"https://www.liverpoollido.co.uk"
  },

  // ── NEWCASTLE ──
  {
    id:109, city:"Newcastle", country:"UK", name:"Quayside Sauna Newcastle", area:"Quayside",
    type:"both", price:"From £20", rating:4.7, reviews:96,
    hours:"Check website for current hours",
    temp:"8°C cold plunge", tags:["Finnish","Ice Bath","Waterside","Community"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Central Station (rail) · 10 min walk / Metro to Quayside",
    parking:"Quayside NCP car park",
    desc:"Newcastle's sauna venue on the historic Quayside, with views of the Tyne Bridge and Millennium Bridge. Finnish sauna, cold plunge and a growing programme of guided breathwork and social sauna sessions. Part of Newcastle's rapidly expanding wellness scene, using the spectacular riverside setting to brilliant effect.",
    lat:54.9692, lng:-1.6062,
    bookingUrl:"https://www.quaysideSauna.co.uk"
  },

  // ── LEEDS ──
  {
    id:110, city:"Leeds", country:"UK", name:"Kirkstall Sauna Club", area:"Kirkstall",
    type:"both", price:"From £20", rating:4.7, reviews:112,
    hours:"Check website for current hours",
    temp:"Cold plunge & ice bath", tags:["Finnish","Ice Bath","Community","Wood-fired"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Kirkstall bus routes · 5 min walk",
    parking:"Free parking at Kirkstall",
    desc:"A wood-fired Finnish sauna and cold plunge beside the River Aire in Kirkstall, west Leeds. Community-run with a strong events programme including breathwork, sound baths and whisky-tasting sauna nights. Part of Leeds's growing outdoor wellness scene. The riverside setting beside Kirkstall Abbey makes it one of Yorkshire's most atmospheric sauna venues.",
    lat:53.8127, lng:-1.6063,
    bookingUrl:"https://www.kirkstallsaunaclub.co.uk"
  },
  {
    id:111, city:"Leeds", country:"UK", name:"Aire Street Baths", area:"City Centre",
    type:"both", price:"From £25", rating:4.8, reviews:143,
    hours:"Mon–Fri 7am–9pm · Sat–Sun 8am–8pm",
    temp:"Ice bath & cold plunge", tags:["Historic Building","Steam","Finnish","City Centre"], emoji:"♨️🔥", open:true,
    hygiene:"A+", lockerNote:"Lockers, robes and towels provided",
    transport:"Leeds City Station · 8 min walk",
    parking:"NCP Trinity Leeds · 5 min",
    desc:"A beautifully restored Victorian bathhouse in Leeds city centre, now operating as a Finnish sauna and contrast therapy venue. The original tiled changing rooms and vaulted ceilings have been retained alongside modern Finnish sauna cabins and ice baths. An exceptional combination of heritage architecture and serious wellness programming.",
    lat:53.7959, lng:-1.5484,
    bookingUrl:"https://www.airestreetbaths.co.uk"
  },

  // ── BIRMINGHAM ──
  {
    id:112, city:"Birmingham", country:"UK", name:"Moseley Road Baths Sauna", area:"Moseley",
    type:"both", price:"From £15", rating:4.7, reviews:87,
    hours:"Check website for current hours",
    temp:"Cold plunge", tags:["Historic Building","Steam","Community","Budget"], emoji:"♨️🏛️", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Cannon Hill tram · 5 min walk / bus 1",
    parking:"Moseley Road street parking",
    desc:"Birmingham's Grade II* listed Edwardian bathhouse on Moseley Road — one of the best-preserved Victorian swimming and bathing complexes in England. The restored first class suite now operates as a sauna and steam room facility alongside the swimming pools. An extraordinary piece of Birmingham's social history, still serving the local community.",
    lat:52.4647, lng:-1.8899,
    bookingUrl:"https://www.moseleyroad baths.org.uk"
  },
  {
    id:113, city:"Birmingham", country:"UK", name:"The Wellness Rooms Birmingham", area:"Digbeth",
    type:"both", price:"From £22", rating:4.8, reviews:134,
    hours:"Mon–Fri 7am–9pm · Sat–Sun 8am–8pm",
    temp:"6°C cold plunge", tags:["Finnish","Ice Bath","City Centre","Boutique"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"Lockers and towels provided",
    transport:"Digbeth Coach Station · 5 min walk",
    parking:"Digbeth NCP · 3 min",
    desc:"A dedicated contrast therapy studio in Birmingham's creative Digbeth quarter — Finnish sauna, infrared sauna, and cold plunge pool in a beautifully designed space. Part of Birmingham's rapidly growing wellness scene, with a strong programme of guided breathwork and ice bath coaching sessions. Excellent for recovery and seriously popular with the city's athletic community.",
    lat:52.4748, lng:-1.8896,
    bookingUrl:"https://www.thewellnessroomsbirmingham.co.uk"
  },

  // ── SHEFFIELD ──
  {
    id:114, city:"Sheffield", country:"UK", name:"Kelham Island Sauna", area:"Kelham Island",
    type:"both", price:"From £18", rating:4.8, reviews:109,
    hours:"Check website for current hours",
    temp:"River Don plunge", tags:["Finnish","Ice Bath","Community","Historic Building"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Supertram to West Street · 12 min walk",
    parking:"Kelham Island street parking",
    desc:"A Finnish sauna on the banks of the River Don in Sheffield's industrial heritage Kelham Island district. Cold plunge access to the river (or on-site plunge pool), a strong community ethos and regular guided sessions. In a former industrial building that channels the spirit of the district perfectly. One of Yorkshire's best community sauna venues.",
    lat:53.3896, lng:-1.4722,
    bookingUrl:"https://www.kelhamislsandsauna.co.uk"
  },

  // ── CORNWALL ──
  {
    id:115, city:"Cornwall", country:"UK", name:"Jubilee Pool Sauna Penzance", area:"Penzance",
    type:"both", price:"From £12", rating:4.9, reviews:334,
    hours:"Check website for current hours",
    temp:"Atlantic Ocean · 14°C–21°C", tags:["Lido","Seafront","Historic Building","Iconic"], emoji:"🌊🔥", open:true,
    hygiene:"A+", lockerNote:"Lockers available",
    transport:"Penzance station · 10 min walk",
    parking:"Penzance seafront parking",
    desc:"The UK's only geothermally heated lido, Jubilee Pool at Penzance now has a dedicated sauna suite and contrast therapy offering alongside its stunning Art Deco seawater pool. The heated geothermal pool sits at 35°C year-round; the cold plunge is the Atlantic itself. An extraordinary Cornish experience — the building is spectacular and the setting, directly on Mount's Bay, unforgettable.",
    lat:50.1185, lng:-5.5355,
    bookingUrl:"https://jubileepool.co.uk/sauna"
  },
  {
    id:116, city:"Cornwall", country:"UK", name:"Surfers' Sauna Newquay", area:"Newquay",
    type:"both", price:"From £15", rating:4.7, reviews:168,
    hours:"Check website for current hours",
    temp:"Atlantic Cold Plunge", tags:["Wood-fired","Seafront","Outdoor","Community"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Newquay station · 15 min walk to Fistral Beach",
    parking:"Fistral Beach car park",
    desc:"A wood-fired sauna van and pop-up cold plunge on Fistral Beach, Newquay's famous surf break. Part of Cornwall's surf wellness scene — perfect post-surf recovery in a 90°C cedar cabin followed by a plunge into Atlantic rollers. Popular with the pro surfing community and anyone who's spent too long in a freezing wetsuit. Book ahead in summer.",
    lat:50.4139, lng:-5.0947,
    bookingUrl:"https://www.surferssauna.co.uk"
  },

  // ── ABERDEEN ──
  {
    id:117, city:"Aberdeen", country:"UK", name:"The Beach Sauna Aberdeen", area:"Aberdeen Beach",
    type:"both", price:"From £18", rating:4.8, reviews:89,
    hours:"Check website for current hours",
    temp:"North Sea plunge", tags:["Seafront","Finnish","Outdoor","Community"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Aberdeen city centre bus · 10 min",
    parking:"Aberdeen Beach free parking",
    desc:"A beachside Finnish sauna and North Sea cold plunge on Aberdeen's two-mile beach — one of Scotland's most bracing outdoor wellness experiences. The combination of a proper 90°C sauna heat and the North Sea (averaging 8°C in winter) is not for the faint-hearted. Run by local enthusiasts committed to keeping prices affordable and the atmosphere genuinely welcoming.",
    lat:57.1497, lng:-2.0709,
    bookingUrl:"https://www.beachsaunaaaberdeen.co.uk"
  },

  // ── INVERNESS ──
  {
    id:118, city:"Inverness", country:"UK", name:"Loch Ness Sauna", area:"Dochgarroch",
    type:"both", price:"From £30", rating:4.9, reviews:134,
    hours:"Check website for current hours",
    temp:"Loch Ness plunge · 8°C", tags:["Wood-fired","Scenic","Outdoor","Finnish"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 8 km from Inverness centre",
    parking:"Free on-site parking",
    desc:"A wood-fired sauna on the banks of Loch Ness, with direct plunge access into the loch's famous dark waters. Private bookings for up to 6, with stunning views down the Great Glen. The loch plunge — cold, dark and utterly still — is unlike anything else in British sauna culture. Aurora sightings possible in winter. One of Scotland's most special outdoor wellness experiences.",
    lat:57.4209, lng:-4.2659,
    bookingUrl:"https://www.lochnessauna.co.uk"
  },

  // ── SWANSEA ──
  {
    id:119, city:"Swansea", country:"UK", name:"Swansea Sauna", area:"Marina",
    type:"both", price:"From £18", rating:4.7, reviews:76,
    hours:"Check website for current hours",
    temp:"7°C cold plunge", tags:["Finnish","Ice Bath","Waterside","Community"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Swansea train station · 10 min walk",
    parking:"Marina car park",
    desc:"A Finnish sauna and contrast therapy studio in Swansea's regenerated marina district, with views across Swansea Bay to the Gower Peninsula. Part of a growing Welsh wellness scene, with regular guided sessions and a welcoming community atmosphere. The closest proper sauna venue for much of South and West Wales.",
    lat:51.6168, lng:-3.9475,
    bookingUrl:"https://www.swanseasauna.co.uk"
  },

  // ── LIMERICK ──
  {
    id:120, city:"Limerick", country:"Ireland", name:"Shannon Sauna Limerick", area:"Castletroy",
    type:"both", price:"From €18", rating:4.7, reviews:78,
    hours:"Check website for current hours",
    temp:"7°C cold plunge", tags:["Finnish","Ice Bath","Community","City Centre"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Bus Éireann routes · 5 min walk",
    parking:"Castletroy free parking",
    desc:"Limerick's dedicated contrast therapy venue near the University of Limerick campus — a Finnish sauna, infrared cabin and cold plunge pool with a strong student and athlete community. Regular guided sessions, breathwork events and a welcoming Limerick welcome. Fills a real gap in the Midwest Ireland wellness scene.",
    lat:52.6719, lng:-8.5706,
    bookingUrl:"https://www.shannonsauna.ie"
  },

  // ── WATERFORD ──
  {
    id:121, city:"Waterford", country:"Ireland", name:"The Hot Pod", area:"Kilmurrin Cove / Copper Coast",
    type:"both", price:"From €15", rating:4.8, reviews:112,
    hours:"Check website for current hours",
    temp:"Sea / cold plunge", tags:["Coastal","Outdoor","Wood-fired","Wild Swimming"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive from Waterford city — 45 min",
    parking:"On-site at Kilmurrin Cove",
    desc:"A mobile barrel sauna rotating between four stunning coastal locations on the Copper Coast — Kilmurrin Cove, Dunmore East, Tramore, and Newtown Cove. Guests alternate between 85–95°C heat and sea swimming for genuine wild wellness on Waterford's rugged coastline.",
    lat:52.1383, lng:-7.3133,
    bookingUrl:"https://www.thehotpod.ie"
  },

  // ── KILKENNY ──
  {
    id:122, city:"Kilkenny", country:"Ireland", name:"The Hot Box Sauna Graiguenamanagh", area:"Graiguenamanagh / River Barrow",
    type:"both", price:"From €20", rating:4.9, reviews:134,
    hours:"Check website for current hours",
    temp:"River Barrow cold plunge", tags:["Outdoor","Wood-fired","Riverside","Finnish","Community"], emoji:"🔥🌿", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive from Kilkenny city — 25 min",
    parking:"The Quay, Graiguenamanagh",
    desc:"A custom-built Finnish sauna in a restored stone shed overlooking the River Barrow at Graiguenamanagh. Guests spend 45-minute sessions alternating between the wood-fired sauna and the river as a natural cold plunge. Part of the wider Hot Box Sauna network across Ireland.",
    lat:52.543, lng:-6.956,
    bookingUrl:"https://thehotboxsauna.ie"
  },
  {
    id:123, city:"Kilkenny", country:"Ireland", name:"Vivo Saunas", area:"Kells / Mullins Mill",
    type:"both", price:"Check website", rating:4.8, reviews:88,
    hours:"Check website for current hours",
    temp:"River cold plunge", tags:["Wood-fired","Riverside","Outdoor","Community"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive from Kilkenny — 30 min",
    parking:"On-site at Mullins Mill",
    desc:"Riverside wood-fired sauna and cold plunge experience at the historic Mullins Mill, Kells. The sauna accommodates up to 16 people, with 45-minute sessions alternating between heat and cold plunges and river swims. Ideal for group recovery sessions in the Kilkenny countryside.",
    lat:52.577, lng:-7.261,
    bookingUrl:"https://www.vivosaunas.ie"
  },

  // ── WEXFORD ──
  {
    id:124, city:"Wexford", country:"Ireland", name:"Free Soul Sauna", area:"Cahore Beach, North Wexford",
    type:"both", price:"Check website", rating:4.7, reviews:64,
    hours:"Check website for current hours",
    temp:"Sea / cold plunge", tags:["Coastal","Wood-fired","Community","Outdoor","Beach"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 45 min from Wexford town",
    parking:"Cahore Beach car park",
    desc:"Wood-fired barrel sauna close to Cahore Beach, seating up to 10 guests. Founded by local wellness professional Shelley Atkins with 20 years' experience. A peaceful setting for solo sessions and group experiences on North Wexford's unspoilt coastline.",
    lat:52.5737, lng:-6.2144,
    bookingUrl:"https://freesoulsauna.ie"
  },

  // ── TIPPERARY ──
  {
    id:125, city:"Tipperary", country:"Ireland", name:"Ritual Lifestyle Lough Derg", area:"Dromineer Harbour, Lough Derg",
    type:"both", price:"Check website", rating:4.8, reviews:91,
    hours:"Check website for current hours",
    temp:"Lough Derg cold plunge", tags:["Lakeside","Outdoor","Community","Scenic","Wood-fired"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"Changing room on-site",
    transport:"Drive from Nenagh — 15 min",
    parking:"On-site at Dromineer Harbour",
    desc:"A custom-built lakeside sauna overlooking Lough Derg with changing rooms, showers, and ample parking. Guests can swim in the lake, heat in the sauna, then join yoga, pilates, or run club sessions. Coffee and locally baked treats served on-site. A stunning waterside wellness destination.",
    lat:52.9231, lng:-8.2767,
    bookingUrl:"https://www.ritual-lifestyle.com"
  },

  // ── DERRY ──
  {
    id:126, city:"Derry", country:"UK", name:"Solara Wellness Hub", area:"Springtown Industrial Estate",
    type:"both", price:"Check website", rating:4.8, reviews:73,
    hours:"Check website for current hours",
    temp:"5°C cold plunge", tags:["Private Suites","Cold Plunge","Contrast Therapy","Urban"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"Private suite — secure storage included",
    transport:"Bus routes to Springtown · 5 min walk",
    parking:"Free on-site parking",
    desc:"A dedicated wellness hub offering three private suites, each fitted with a sauna, cold plunge pool, shower, and TV. Sessions run 55 minutes for 1–3 people, with contrast therapy alternating between hot and cold. The best private sauna and cold plunge experience in Northern Ireland.",
    lat:54.991, lng:-7.345,
    bookingUrl:"https://www.instagram.com/solara.wellnessco"
  },

  // ── DUNDEE ──
  {
    id:127, city:"Dundee", country:"UK", name:"Wild Scottish Sauna at Forbes of Kingennie", area:"Broughty Ferry",
    type:"both", price:"From £16", rating:4.9, reviews:156,
    hours:"Check website for current hours",
    temp:"Spring-fed pond cold plunge", tags:["Outdoor","Wood-fired","Rural","Wild Swimming","Nordic","Scenic"], emoji:"🌲🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive from Dundee city — 15 min",
    parking:"Free on-site at Forbes of Kingennie",
    desc:"Wild Scottish Sauna operates a wood-fired sauna at Forbes of Kingennie country resort near Dundee. Guests sauna beside a spring-fed heart-shaped swimming pond with views over rolling Angus countryside, then take a cold dip. Social sessions from £16, private hire and full-day retreats available.",
    lat:56.490, lng:-2.961,
    bookingUrl:"https://wildscottishsauna.com"
  },

  // ── NOTTINGHAM ──
  {
    id:128, city:"Nottingham", country:"UK", name:"Saunahood", area:"Holme Pierrepont / National Watersports Centre",
    type:"both", price:"From £15", rating:4.8, reviews:142,
    hours:"Check website for current hours",
    temp:"Cold dip pool", tags:["Outdoor","Wood-fired","Lakeside","Community","Nordic","Woodland"], emoji:"🌲🔥", open:true,
    hygiene:"A", lockerNote:"Changing facilities on-site",
    transport:"Drive from Nottingham city — 15 min",
    parking:"Free at National Watersports Centre",
    desc:"A wood-fired sauna and cold dip pool in a tranquil woodland corner of the National Watersports Centre at Holme Pierrepont Country Park. 50-minute sessions with unlimited heat/cold rotations. A pioneering independent sauna beside a major watersports lake, set in beautiful Nottinghamshire countryside.",
    lat:52.921, lng:-1.089,
    bookingUrl:"https://www.saunahood.co.uk"
  },

  // ── NORWICH ──
  {
    id:129, city:"Norwich", country:"UK", name:"The Lions' Den", area:"City Centre / White Lion Street",
    type:"both", price:"Check website", rating:4.8, reviews:108,
    hours:"Check website for current hours",
    temp:"Ice bath", tags:["Community","Rooftop","Ice Bath","Urban","Café"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Norwich city centre · 5 min walk from station",
    parking:"NCP Chapelfield · 5 min walk",
    desc:"East Anglia's first rooftop sauna venue in the heart of Norwich. Features the largest community sauna in Norfolk, rooftop saunas with city skyline views, ice baths, movement classes, nourishing food, and an alcohol-free late bar. A true community wellness and social hub in the city.",
    lat:52.627, lng:-1.298,
    bookingUrl:"https://www.thelionsdennorwich.com"
  },

  // ── CAMBRIDGE ──
  {
    id:130, city:"Cambridge", country:"UK", name:"PAUS", area:"Bourn / South Cambridgeshire",
    type:"both", price:"Check website", rating:4.9, reviews:188,
    hours:"Thu–Sun, check website for hours",
    temp:"Cold plunge pool", tags:["Outdoor","Rural","Nordic","Hot Tub","Finnish","Wellness","Bistro"], emoji:"🌿🔥", open:true,
    hygiene:"A+", lockerNote:"Changing rooms on-site",
    transport:"Drive from Cambridge — 25 min",
    parking:"Free on-site",
    desc:"An oasis of calm in the South Cambridgeshire countryside with open-air Finnish barrel saunas, red cedar hot tubs, cold plunge pools, a 1000m sensory barefoot trail, and a hilltop bistro. Wellbeing events, yoga, and breathwork workshops run regularly. One of England's finest rural wellness escapes.",
    lat:52.187, lng:-0.016,
    bookingUrl:"https://www.paus.life"
  },

  // ── EXETER ──
  {
    id:131, city:"Exeter", country:"UK", name:"You Can Sauna", area:"Haldon Forest / Kennford",
    type:"both", price:"From £15", rating:4.8, reviews:124,
    hours:"Check website for current hours",
    temp:"Cold plunge bath", tags:["Outdoor","Wood-fired","Woodland","Forest","Cold Plunge","Nordic"], emoji:"🌲🔥", open:true,
    hygiene:"A", lockerNote:"Changing room on-site",
    transport:"Drive from Exeter — 20 min (M5 J31)",
    parking:"Haldon Forest Park car park",
    desc:"An authentic wood-fired Latvian-built sauna set in the tranquil woodland of Haldon Forest Park, 20 minutes from Exeter city centre. Features a panoramic window overlooking Dartmoor and repurposed cold plunge baths. Both shared public sessions and private hire available. Booking essential.",
    lat:50.659, lng:-3.588,
    bookingUrl:"https://youcansauna.com"
  },

  // ── PORTSMOUTH ──
  {
    id:132, city:"Portsmouth", country:"UK", name:"Southsea Sauna", area:"Eastney / Southsea Seafront",
    type:"both", price:"Check website", rating:4.7, reviews:86,
    hours:"Check website for current hours",
    temp:"Cold tub / sea dip", tags:["Coastal","Outdoor","Seafront","Wood-fired","Cold Plunge","Community"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Bus to Eastney Esplanade · 5 min walk",
    parking:"Esplanade street parking",
    desc:"A cosy coastal sauna nestled right by the sea at Eastney Esplanade, Southsea. Seats up to six guests who alternate between the sauna heat and cold tub or sea dips. A rustic, community-focused seafront wellness experience on the Solent.",
    lat:50.780, lng:-1.048,
    bookingUrl:"https://www.southseasauna.co.uk"
  },

  // ── PLYMOUTH ──
  {
    id:133, city:"Plymouth", country:"UK", name:"Hálogi Sauna & Ice Baths", area:"Royal William Yard / Stonehouse",
    type:"both", price:"Check website", rating:4.8, reviews:97,
    hours:"Check website for current hours",
    temp:"3 cold water tubs", tags:["Coastal","Wood-fired","Sea Swimming","Ice Bath","Outdoor","Waterfront"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Bus 34 to Royal William Yard · 5 min walk",
    parking:"Royal William Yard car park",
    desc:"A converted horsebox Finnish sauna at 90°C, situated at the historic Grade I listed Royal William Yard. Up to six guests per session with three cold water tubs and direct sea access. Evening full moon sessions also offered. A beautifully positioned maritime wellness experience in Plymouth.",
    lat:50.362, lng:-4.164,
    bookingUrl:"https://halogico.com"
  },

  // ── KARLSTAD ──
  {
    id:134, city:"Karlstad", country:"Sweden", name:"Allegria Spa – Hotel Fratelli", area:"City Centre / Drottninggatan",
    type:"both", price:"From SEK 400", rating:4.7, reviews:198,
    hours:"Check website for current hours",
    temp:"12°C cold plunge", tags:["Luxury","Finnish Sauna","Cold Plunge","Steam","Nordic","Hotel Spa"], emoji:"♨️🧊", open:true,
    hygiene:"A+", lockerNote:"Lockers provided",
    transport:"Karlstad city centre · 5 min walk from station",
    parking:"City centre parking available",
    desc:"A boutique spa in Hotel Fratelli in central Karlstad featuring a classic Finnish sauna, a unique Stonebath (stones at 340°C dropped into ice-cold water for erupting steam), cold plunge pool at 12°C, tropical experience showers, and a large heated pool. Open to hotel guests and external visitors.",
    lat:59.378, lng:13.502,
    bookingUrl:"https://hotelfratelli.se/en/spa/"
  },

  // ── ADDITIONAL VENUES: existing cities ──

  // Sligo extra
  {
    id:135, city:"Sligo", country:"Ireland", name:"The Hot Box Sauna Rosses Point", area:"Rosses Point / Deadman's Point",
    type:"both", price:"From €20", rating:4.9, reviews:143,
    hours:"Check website for current hours",
    temp:"Atlantic sea plunge", tags:["Coastal","Outdoor","Finnish","Atlantic","Scenic","Community"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Bus 291 to Rosses Point · 5 min walk",
    parking:"Sligo Yacht Club car park",
    desc:"Two handcrafted Finnish saunas and a cold plunge pool at the edge of the Atlantic at Rosses Point. Guests can plunge from the pier at Deadman's Point with views of Knocknarea and Sligo Bay. Part of the Hot Box Sauna network across Ireland. Combine with yoga sessions run at the same site.",
    lat:54.312, lng:-8.573,
    bookingUrl:"https://thehotboxsauna.ie"
  },

  // Kerry extras
  {
    id:136, city:"Kerry", country:"Ireland", name:"Happy Days Sauna Banna Beach", area:"Banna Beach / Ardfert",
    type:"both", price:"Check website", rating:4.8, reviews:117,
    hours:"Check website for current hours",
    temp:"Atlantic sea plunge", tags:["Coastal","Outdoor","Wood-fired","Beach","Wild Swimming"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 15 min from Tralee",
    parking:"Banna Beach Car Park",
    desc:"A custom-built barrel sauna just off the sand at Banna Beach, one of Kerry's finest Blue Flag strands. Perfect for warming up after sea swims. Sessions available from the main car park with stunning views across the Atlantic towards the Dingle Peninsula.",
    lat:52.3335, lng:-9.8433,
    bookingUrl:"https://www.happydayssauna.ie"
  },
  {
    id:137, city:"Kerry", country:"Ireland", name:"Kingdom Sauna Derrynane", area:"Derrynane Beach / Caherdaniel",
    type:"both", price:"Check website", rating:4.9, reviews:98,
    hours:"Check website for current hours",
    temp:"Sea / cold plunge", tags:["Coastal","Outdoor","Wood-fired","Scenic","Beach"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive from Kenmare — 30 min",
    parking:"Derrynane Beach car park",
    desc:"Kerry's coastal sauna set at Derrynane Beach — one of Ireland's most beautiful National Park beaches — with panoramic views over the bay and surrounding mountains. An unforgettable combination of Ireland's best scenery and authentic wood-fired heat.",
    lat:51.7598, lng:-10.1374,
    bookingUrl:"https://www.kingdomsauna.ie"
  },

  // Wicklow extra
  {
    id:138, city:"Wicklow", country:"Ireland", name:"Seawater Saunas Bray", area:"Bray Promenade / Seafront",
    type:"both", price:"Check website", rating:4.8, reviews:167,
    hours:"Open 7 days, check website",
    temp:"8 plunge pools", tags:["Coastal","Outdoor","Rooftop","Scenic","Cold Plunge","Community"], emoji:"🌊🔥", open:true,
    hygiene:"A+", lockerNote:"Changing rooms on-site",
    transport:"Bray DART station · 10 min walk",
    parking:"Bray Seafront car park",
    desc:"A brand-new rooftop sauna facility right on the Bray seafront, featuring 3 saunas, a hot tub, and 8 plunge pools with sweeping views of the Irish Sea and Bray Head. Open 7 days a week, no booking required for walk-ins. Stunning sea views make this one of Ireland's most scenic wellness venues.",
    lat:53.201, lng:-6.097,
    bookingUrl:"https://seawatersaunas.ie"
  },

  // Leeds extra
  {
    id:139, city:"Leeds", country:"UK", name:"Leeds Community Sauna", area:"Kirkstall / River Aire",
    type:"both", price:"Community pricing", rating:4.9, reviews:89,
    hours:"Thu–Sun, check website for hours",
    temp:"River Aire cold plunge", tags:["Community","Wood-fired","Riverside","Outdoor","Nordic","Not-for-Profit"], emoji:"🌿🔥", open:true,
    hygiene:"A", lockerNote:"Changing room on-site",
    transport:"Bus 33/33A to Kirkstall · 5 min walk",
    parking:"Kirkstall Valley Farm car park",
    desc:"A worker-owned cooperative sauna beside the River Aire at Kirkstall Valley Farm. Two wood-fired saunas, cold-water plunges, outdoor seating, and a drinks station. Offers women-only, LGBTQ+-friendly, and NHS-referred low-cost access sessions. Open Thu–Sun.",
    lat:53.806, lng:-1.581,
    bookingUrl:"https://www.leedscommunitysauna.com"
  },

  // Sheffield extras
  {
    id:140, city:"Sheffield", country:"UK", name:"Güs Sauna", area:"City Centre / Heart of the City",
    type:"both", price:"Check website", rating:4.9, reviews:214,
    hours:"Check website for current hours",
    temp:"Ice baths from 3°C", tags:["Urban","Finnish","Ice Bath","Aufguss","Scandinavian","Café","Historic Building"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"Lockers provided",
    transport:"Sheffield station · 10 min walk",
    parking:"NCP Cambridge Street · 2 min",
    desc:"Sheffield's landmark Scandinavian wellness space inside the restored Grade II listed Bethel Sunday School. Features a 24-person Finnish-grade sauna, city-view sauna, four ice baths from 3–12°C, cold plunge shower, and a café serving specialty coffee. Guided Aufguss ceremonies available. A stunning heritage wellness destination.",
    lat:53.377, lng:-1.474,
    bookingUrl:"https://www.guswellness.com"
  },

  // Newcastle extra
  {
    id:141, city:"Newcastle", country:"UK", name:"Sæla Sauna", area:"Ouseburn / Shieldfield",
    type:"both", price:"From £16", rating:4.9, reviews:132,
    hours:"Fri–Sun, check website for hours",
    temp:"Built-in cold plunge baths", tags:["Outdoor","Scandinavian","Handcrafted","Community","Cold Plunge"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"Changing facilities on-site",
    transport:"Shieldfield bus routes · 5 min walk",
    parking:"Street parking on Stepney Road",
    desc:"A Danish-handcrafted sauna for ten, set within Cobalt Studios' creative backyard in Ouseburn. Features built-in cold plunge baths with filtration and chiller systems. Student and blue light discounts available. A peaceful, accessible, and design-led experience in Newcastle's creative quarter.",
    lat:54.972, lng:-1.601,
    bookingUrl:"https://saelasauna.co.uk"
  },

  // Liverpool extra
  {
    id:142, city:"Liverpool", country:"UK", name:"Wyld Sauna", area:"Princes Dock / Liverpool Waters",
    type:"both", price:"Check website", rating:4.9, reviews:178,
    hours:"Check website for current hours",
    temp:"4 ice baths, cold waterfall", tags:["Floating Sauna","Nordic","Waterfront","Ice Bath","Unique","Community"], emoji:"🚢🔥", open:true,
    hygiene:"A+", lockerNote:"Lockers provided",
    transport:"Liverpool Moorfields · 15 min walk",
    parking:"Princes Dock car park · 2 min",
    desc:"The UK's first public floating sauna, moored at Princes Dock in Liverpool Waters. Features a 30-person sauna, four ice baths, cold waterfall showers, heated outdoor showers with salt rubs, and direct water access. A landmark wellness destination with stunning city and waterfront views.",
    lat:53.455, lng:-3.002,
    bookingUrl:"https://www.wyldsauna.com"
  },

  // Cornwall extras
  {
    id:143, city:"Cornwall", country:"UK", name:"Kiln Sauna Falmouth", area:"Gyllyngvase Beach, Falmouth",
    type:"both", price:"Check website", rating:4.8, reviews:143,
    hours:"Check website for current hours",
    temp:"Sea cold plunge", tags:["Coastal","Beach","Wood-fired","Outdoor","Community","Cornwall"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Bus to Gyllyngvase Beach · 2 min walk",
    parking:"Gyllyngvase Beach car park",
    desc:"Kiln Sauna operates at multiple Cornwall coastal locations including Gyllyngvase Beach and Kiln Quay Flushing. A wood-fired sauna right on the beach with sea access for cold plunges. Also runs sessions at the Ferryboat Inn at Helford Passage. A beloved local Cornish institution.",
    lat:50.149, lng:-5.066,
    bookingUrl:"https://www.kilnsauna.com"
  },

  // Swansea extra
  {
    id:144, city:"Swansea", country:"UK", name:"Tŷ Sawna", area:"Oxwich Bay / Gower Peninsula",
    type:"both", price:"Check website", rating:4.9, reviews:167,
    hours:"Thu–Sun, 8am–8pm",
    temp:"Atlantic sea plunge", tags:["Coastal","Wood-fired","Beach","Outdoor","Scenic","Gower"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive from Swansea — 25 min",
    parking:"Oxwich Bay car park",
    desc:"Two bespoke wood-fired barrel saunas — Tŷ Bach Twt (8 seats) and Tŷ Mawr (10 seats) — set directly on Oxwich Bay beach in the Gower AONB, each with panoramic ocean views through half-moon windows. Thu–Sun 8am–8pm. A truly stunning Welsh coastal wellness experience.",
    lat:51.546, lng:-4.163,
    bookingUrl:"https://www.tysawna.co.uk"
  },

  // Bergen extra
  {
    id:145, city:"Bergen", country:"Norway", name:"Heit Bergen Sauna", area:"Marineholmen",
    type:"both", price:"Check website", rating:4.9, reviews:201,
    hours:"Check website for current hours",
    temp:"Fjord sea plunge", tags:["Floating Sauna","Wood-fired","Fjord","Outdoor","Nordic","Sea Swimming","Community"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"Unisex changing room on-site",
    transport:"Bybanen to Florida · 10 min walk",
    parking:"Marineholmen parking",
    desc:"Wood-fired floating saunas moored at Marineholmen, a 10-minute walk from Bergen city centre. Guests alternate between the sauna and the fjord harbour. Outdoor cold showers and swim ladders to the water. Also operates at Laksevåg and Måseskjæret. An iconic Bergen waterfront wellness experience.",
    lat:60.388, lng:5.329,
    bookingUrl:"https://en.heitbergensauna.com"
  },

  // Aberdeen extra
  {
    id:146, city:"Aberdeen", country:"UK", name:"Alleve Health", area:"Great Western Road / West End",
    type:"both", price:"From £30", rating:4.8, reviews:134,
    hours:"Check website for current hours",
    temp:"6–8°C cold plunge", tags:["Urban","Private Suite","Cold Plunge","Contrast Therapy","Finnish"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"Private suite — secure storage included",
    transport:"Bus routes on Great Western Road · 2 min walk",
    parking:"Free street parking nearby",
    desc:"A dedicated wellness centre offering private sauna sessions at 90°C, cold plunge at 6–8°C, contrast therapy, and floatation therapy. Recently rebranded from Meraki Health, five minutes from Aberdeen city centre. Also has a Glasgow location. A premium private wellness experience in the city.",
    lat:57.146, lng:-2.143,
    bookingUrl:"https://www.alleve.co.uk"
  },

  // ── GALWAY (NEW) ──
  {
    id:61, city:"Galway", country:"Ireland", name:"Driftwood Sauna Galway", area:"Galway coastline",
    type:"both", price:"Check website", rating:4.9, reviews:89,
    hours:"Check website for current hours",
    temp:"Sea / cold plunge", tags:["Coastal","Nordic Rituals","Events"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 25 min from Galway city",
    parking:"On-site parking",
    desc:"Started by a couple who spent time in Scandinavia, bringing authentic sauna culture to the West of Ireland. Traditional Finnish touches including leaf whisks. Full Moon Sauna events with fire pit, cocoa and marshmallows by the beach. A truly special experience outside Galway.",
    lat:53.2444, lng:-9.3099
  },

  // ── ICELAND / REYKJAVIK ──
  {
    id:147, city:"Reykjavik", country:"Iceland", name:"Blue Lagoon", area:"Grindavík / Reykjanes Peninsula",
    type:"both", price:"From £60", rating:4.8, reviews:18420,
    hours:"Check website — advance booking required",
    temp:"38–40°C geothermal lagoon", tags:["Geothermal","Iconic","Luxury","Outdoor","Silica Mud","Steam"], emoji:"🌋♨️", open:true,
    hygiene:"A+", lockerNote:"Lockers and wristbands provided",
    transport:"Keflavík International Airport · 20 min drive / shuttle",
    parking:"Free large car park on-site",
    desc:"The world's most famous geothermal spa, set in a lava field on the Reykjanes Peninsula. The milky blue geothermal water rich in silica, algae and minerals stays at 38–40°C year-round. Features a sauna, steam room, silica mud mask station, in-water swim-up bar, and restaurant. An absolute bucket-list experience.",
    lat:63.880, lng:-22.449,
    bookingUrl:"https://www.bluelagoon.com", featured:true, googleRating:4.7
  },
  {
    id:148, city:"Reykjavik", country:"Iceland", name:"Sky Lagoon", area:"Kópavogur / Reykjavik Bay",
    type:"both", price:"From £55", rating:4.8, reviews:11203,
    hours:"Check website for current hours",
    temp:"38–40°C geothermal infinity pool", tags:["Geothermal","Sauna","Steam","Cold Plunge","Scrub","Ritual","Outdoor","Oceanview"], emoji:"🌊♨️", open:true,
    hygiene:"A+", lockerNote:"Lockers and wristbands provided",
    transport:"Reykjavik city centre · 10 min drive / shuttle",
    parking:"Free on-site",
    desc:"A geothermal infinity pool perched on the Reykjavik coastline with dramatic ocean views. The signature Skjól ritual includes seven steps — warm lagoon, cold plunge, sauna, cold fog mist, warm steam room, sky body scrub, and shower. A modern, architect-designed Nordic wellness experience. Stunning at sunset.",
    lat:64.100, lng:-21.973,
    bookingUrl:"https://www.skylagoon.com", googleRating:4.8
  },
  {
    id:149, city:"Reykjavik", country:"Iceland", name:"Laugardalur Swimming Pool", area:"Laugardalur / East Reykjavik",
    type:"both", price:"From £8", rating:4.7, reviews:4821,
    hours:"Mon–Fri 6:30am–10pm · Sat–Sun 8am–10pm",
    temp:"Hot pots at 38–44°C", tags:["Public Pool","Geothermal","Community","Finnish","Budget","Outdoor"], emoji:"♨️🌊", open:true,
    hygiene:"A", lockerNote:"Lockers provided, padlocks extra",
    transport:"Reykjavik city centre bus routes · 10 min",
    parking:"Free on-site car park",
    desc:"Reykjavik's largest swimming pool and a true slice of Icelandic everyday life. Features outdoor geothermal pools, multiple hot pots at 38–44°C, a Finnish sauna, steam room, waterslide, and year-round outdoor swimming. Beloved by locals and the most affordable geothermal bathing in Reykjavik.",
    lat:64.132, lng:-21.877,
    bookingUrl:"https://www.reykjavik.is/stadir/laugardalslaugin"
  },
  {
    id:150, city:"Reykjavik", country:"Iceland", name:"Secret Lagoon", area:"Flúðir / South Iceland",
    type:"both", price:"From £25", rating:4.7, reviews:6342,
    hours:"Check website for current hours",
    temp:"38–40°C geothermal pool", tags:["Geothermal","Outdoor","Historic","Rustic","Scenic","Geyser"], emoji:"🌋🌊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Reykjavik · 90 min drive via Golden Circle",
    parking:"Free on-site",
    desc:"Iceland's oldest swimming pool (established 1891), a rustic natural geothermal pool fed by hot springs at Flúðir in South Iceland. A small geyser erupts every few minutes beside the pool. Far less crowded than the Blue Lagoon and wonderfully authentic. Typically visited as part of the Golden Circle day trip.",
    lat:64.134, lng:-20.312,
    bookingUrl:"https://secretlagoon.is"
  },

  // ── CARLINGFORD (Co. Louth) ──
  {
    id:153, city:"Carlingford", country:"Ireland", name:"The Hot Box Sauna Carlingford", area:"Carlingford Marina",
    type:"both", price:"From €20", rating:4.9, reviews:189,
    hours:"Check website for current hours",
    temp:"Carlingford Lough cold plunge", tags:["Coastal","Outdoor","Finnish","Scenic","Community"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Bus from Dundalk · 20 min, or drive",
    parking:"Carlingford Marina car park",
    desc:"Finnish sauna at Carlingford Marina with panoramic views of Carlingford Lough and the Mourne Mountains. Part of the Hot Box Sauna network — 6 min walk from Carlingford town. Guests swim directly from the pier with mountains on both sides. A top wellness destination in the north-east of Ireland.",
    lat:54.043, lng:-6.186,
    bookingUrl:"https://thehotboxsauna.ie"
  },

  // ── AARHUS ──
  {
    id:151, city:"Aarhus", country:"Denmark", name:"Aarhus Ø Harbor Baths", area:"Aarhus Ø / Frihavnen",
    type:"both", price:"Free (sauna from DKK 50)", rating:4.6, reviews:1243,
    hours:"May–Sep daily · Sauna year-round (check website)",
    temp:"Harbour cold plunge", tags:["Public Pool","Outdoor","Waterfront","Community","Budget","Coastal"], emoji:"🌊♨️", open:true,
    hygiene:"A", lockerNote:"Lockers available",
    transport:"Bus 4A to Aarhus Ø · 5 min walk",
    parking:"Aarhus Ø car park · 2 min",
    desc:"Aarhus' vibrant harbor bath and wellness facility on the new Aarhus Ø island development. Features a large outdoor seawater pool, diving platforms, children's pool, and a year-round sauna with sea views. A much-loved public space that captures Aarhus' modern Nordic identity perfectly.",
    lat:56.156, lng:10.230,
    bookingUrl:"https://www.aarhus.dk/borger/sport-og-fritid/svoemning/aarhus-o-harbor-baths/"
  },
  {
    id:152, city:"Aarhus", country:"Denmark", name:"Broens Sauna", area:"Aarhus River / City Centre",
    type:"both", price:"From DKK 95", rating:4.8, reviews:887,
    hours:"Check website for current hours",
    temp:"River / cold plunge", tags:["Finnish","Community","Urban","Nordic","Riverside","Outdoor"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Aarhus city centre · 10 min walk from station",
    parking:"City centre street parking",
    desc:"A Nordic sauna experience right in the heart of Aarhus beside the river, offering traditional Finnish-style sauna and cold plunge facilities. A growing favourite with the Aarhus wellness community. Authentic sauna culture in the centre of Denmark's second city.",
    lat:56.154, lng:10.204,
    bookingUrl:"https://broens-sauna.dk"
  },

  // ── WATERFORD (ADDITIONAL) ──
  {
    id:154, city:"Waterford", country:"Ireland", name:"The Hot Pod Clonea", area:"Clonea Beach, Dungarvan",
    type:"both", price:"Check website", rating:4.8, reviews:67,
    hours:"Check website for current hours",
    temp:"Sea / cold plunge", tags:["Seafront","Wood-fired","Outdoor","Beach"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 5 min from Dungarvan town",
    parking:"Clonea Lower Beach Car Park",
    desc:"Mobile barrel sauna at Clonea Beach, one of Waterford's finest Blue Flag strands near Dungarvan. Alternate between the wood-fired heat and the sea for a classic wild wellness experience on the Waterford coast.",
    lat:52.0933, lng:-7.5537,
    bookingUrl:"https://www.thehotpod.ie"
  },
  {
    id:155, city:"Waterford", country:"Ireland", name:"The Hot Pod Dunmore East", area:"Dunmore East Beach",
    type:"both", price:"Check website", rating:4.8, reviews:54,
    hours:"Check website for current hours",
    temp:"Sea / cold plunge", tags:["Seafront","Wood-fired","Outdoor","Beach"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 20 min from Waterford city",
    parking:"Counsellors' Strand car park",
    desc:"Mobile barrel sauna at the charming fishing village of Dunmore East, positioned at Counsellors' Strand. Sea swim in the sheltered harbour bay, then warm through in the barrel sauna — one of the most picturesque sauna settings on the south-east coast.",
    lat:52.1493, lng:-6.9948,
    bookingUrl:"https://www.thehotpod.ie"
  },
  {
    id:156, city:"Waterford", country:"Ireland", name:"The Hot Pod Tramore", area:"Tramore Beach",
    type:"both", price:"Check website", rating:4.8, reviews:89,
    hours:"Check website for current hours",
    temp:"Sea / cold plunge", tags:["Seafront","Wood-fired","Outdoor","Beach"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 12 km from Waterford city",
    parking:"Tramore promenade car park",
    desc:"Mobile barrel sauna on Tramore's iconic beach promenade — Waterford's most popular seaside resort. Warm up after a bracing Atlantic dip in the wood-fired barrel, with views across Tramore Bay.",
    lat:52.1650, lng:-7.1464,
    bookingUrl:"https://www.thehotpod.ie"
  },
  {
    id:157, city:"Waterford", country:"Ireland", name:"Endorfin", area:"Copper Coast / Boatstrand",
    type:"both", price:"Check website", rating:4.9, reviews:78,
    hours:"Check website for current hours",
    temp:"Sea / cold plunge", tags:["Seafront","Wood-fired","Outdoor","Copper Coast","Wild Swimming"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 40 min from Waterford city via coastal road",
    parking:"On-site at Boatstrand Pier",
    desc:"A coastal sauna and cold plunge experience on the dramatic Copper Coast at Boatstrand Pier, Dunabrattin — one of Waterford's most beautiful and rugged stretches of coastline. An exceptional wild wellness experience on the Wild Atlantic Way.",
    lat:52.1383, lng:-7.3021,
    bookingUrl:"https://endorfin.ie"
  },
  {
    id:158, city:"Waterford", country:"Ireland", name:"The Stove Sauna", area:"Ballyscanlon Lake, Tramore",
    type:"both", price:"Check website", rating:4.8, reviews:45,
    hours:"Check website for current hours",
    temp:"Lake cold plunge", tags:["Lakeside","Wood-fired","Outdoor","Scenic","Forest"], emoji:"🔥🌿", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 5 km west of Tramore on R675",
    parking:"On-site at Ballyscanlon Wellness Retreat",
    desc:"A wood-fired sauna at the water's edge of Ballyscanlon Lake, a tranquil freshwater reservoir surrounded by native Irish trees near Tramore. Part of the Ballyscanlon Wellness Retreat, combining sauna heat with lake plunges in one of Waterford's most serene natural settings.",
    lat:52.1772, lng:-7.2111,
    bookingUrl:"https://thestovesauna.rezgo.com"
  },

  // ── DUBLIN (ADDITIONAL) ──
  {
    id:159, city:"Dublin", country:"Ireland", name:"Sláinte Saunas", area:"Sandymount / Dublin 4",
    type:"both", price:"From €18", rating:4.9, reviews:94,
    hours:"Mon–Fri 5pm–10pm · Sat–Sun 9am–10pm",
    temp:"Ice bath / cold plunge", tags:["Wood-fired","Community","Outdoor","Coastal","City Centre"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Changing rooms on-site",
    transport:"Bus 1/47/84X to Sean Moore Rd · 3 min walk · or Sandymount DART",
    parking:"Clanna Gael GAA car park",
    desc:"A wood-fired communal sauna within the Clanna Gael Fontenoy GAA grounds near Sandymount Strand, Dublin 4. Seating up to 12 people in a 55-minute shared session, with cold plunge and ice bath options. Also available on ClassPass. One of Dublin's friendliest sauna communities, with a Mayo location too.",
    lat:53.3375, lng:-6.2144,
    bookingUrl:"https://www.slaintesaunas.ie"
  },
  {
    id:160, city:"Dublin", country:"Ireland", name:"The Wood Fired Sauna", area:"Rush / Skerries, North County Dublin",
    type:"both", price:"€100 private / 45 min", rating:4.8, reviews:67,
    hours:"Wed–Fri 6pm–9pm · Sat–Sun 8am–3:30pm",
    temp:"Sea plunge", tags:["Seafront","Wood-fired","Outdoor","Community","Beach"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — Rush/Skerries approx 30 min from Dublin city",
    parking:"North Beach Car Park, Rush",
    desc:"Traditional Finnish wood-fired saunas by the sea at two North County Dublin locations — North Beach, Rush and Red Island, Skerries. Private bookings for up to 10 people. Sea plunging available directly from the sauna. Walk-ins welcome when available. Pure coastal contrast therapy just 30 minutes from Dublin.",
    lat:53.5255, lng:-6.0865,
    bookingUrl:"https://www.thewoodfiredsauna.ie"
  },
  {
    id:161, city:"Drogheda", country:"Ireland", name:"Secret Garden Sauna", area:"Drogheda / Co. Louth",
    type:"both", price:"Check website", rating:5.0, reviews:26,
    hours:"Mon/Wed–Fri 7am–12pm & 5pm–10pm · Tue 5pm–9pm · Sat–Sun 9am–9pm",
    temp:"Ice baths / cold plunge", tags:["Community","Ice Bath","Outdoor","Secret Garden"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"On-site facilities",
    transport:"Drive — 40 min north of Dublin via M1",
    parking:"Black Bull Inn car park",
    desc:"Drogheda's first dedicated sauna and ice bath recovery centre, set in a garden behind the Black Bull Inn. Features a 12-person sauna, three ice baths, and two cold plunge pools. Despite appearing in Dublin sauna directories, it's a 40-minute drive north on the M1 — and worth every minute of the journey.",
    lat:53.7060, lng:-6.3630,
    bookingUrl:"https://secretgardensauna.ie"
  },

  // ── SEAWEED BATHS ──
  {
    id:162, city:"Sligo", country:"Ireland", name:"Kilcullen's Seaweed Baths", area:"Enniscrone / Inishcrone",
    type:"seaweed", price:"Check website", rating:4.9, reviews:287,
    hours:"Daily 10am–8pm (seasonal — check website)",
    temp:"Heated sea water & seaweed", tags:["Seaweed Bath","Seafront","Coastal","Historic Building","Wild Atlantic"], emoji:"🌿♨️", open:true,
    hygiene:"A+", lockerNote:"Private bathing boxes — secure changing in your room",
    transport:"Drive — 50 min from Sligo town",
    parking:"Free on-site parking at Cliff Road",
    desc:"Ireland's oldest bathhouse, open since 1912 and now in its fifth generation of the Kilcullen family. Private wooden baths filled with hot seawater and freshly harvested Atlantic seaweed. An ancient Irish wellness tradition at its most authentic — the original thalassotherapy experience on the Wild Atlantic Way.",
    lat:54.2197, lng:-9.0942,
    bookingUrl:"https://www.kilcullenseaweedbaths.net"
  },
  {
    id:163, city:"Kerry", country:"Ireland", name:"Collins's Seaweed Baths", area:"Ballybunion / Ladies Beach",
    type:"seaweed", price:"From €20", rating:4.8, reviews:198,
    hours:"Check seasonal hours — phone 068 27469",
    temp:"Heated sea water & seaweed", tags:["Seaweed Bath","Seafront","Coastal","Beach","Historic Building"], emoji:"🌿♨️", open:true,
    hygiene:"A", lockerNote:"Private bathing rooms",
    transport:"Drive — 45 min from Tralee · 30 min from Listowel",
    parking:"Ladies Beach car park",
    desc:"A true Kerry institution. Established in 1932 on the Ladies Strand in Ballybunion, Collins's offers private heated baths packed with fresh Atlantic seaweed — one of only four remaining authentic seaweed bathhouses in Ireland. Three generations of the Collins family and almost 100 years of tradition. Walk-ins welcome.",
    lat:52.5118, lng:-9.6871
  },
  {
    id:164, city:"Galway", country:"Ireland", name:"Oileánra Seaweed Baths & Sauna", area:"Lettermullen / Leitir Mealláin",
    type:"seaweed", price:"Check website", rating:4.9, reviews:156,
    hours:"Check website for current hours",
    temp:"Seaweed bath & sauna", tags:["Seaweed Bath","Seafront","Coastal","Wood-fired","Outdoor","Scenic"], emoji:"🌿🔥", open:true,
    hygiene:"A+", lockerNote:"On-site facilities",
    transport:"Drive — 1 hr from Galway city via R336 through Carraroe",
    parking:"On-site at Maumeen",
    desc:"A stunning seaweed bath and wood-fired sauna experience set in the wild archipelago of Lettermullen on the south Connemara coast. Not the Aran Islands but arguably wilder — panoramic Atlantic views, sea swimming off the deck, and the deep relaxation of a traditional seaweed soak. One of Ireland's most remote and special wellness venues.",
    lat:53.2105, lng:-9.5502,
    bookingUrl:"https://www.oileanra.ie"
  },

  // ── WICKLOW (ADDITIONAL) ──
  {
    id:165, city:"Wicklow", country:"Ireland", name:"The Boat Yard Sauna", area:"Wicklow Harbour",
    type:"both", price:"Check website", rating:4.9, reviews:78,
    hours:"Mon–Thu 4pm–10pm · Fri 2pm–10pm · Sat–Sun 8am–10pm",
    temp:"Sea / harbour plunge", tags:["Seafront","Wood-fired","Outdoor","Community","Harbour"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Wicklow town · 5 min walk from train station",
    parking:"Wicklow Harbour car park",
    desc:"A wood-fired barrel sauna perched on the edge of Wicklow Harbour with stunning sea views and a cold plunge just steps from the water. One of Ireland's best-located harbour saunas — the contrast between steaming cedar heat and the bracing Irish Sea is hard to beat. Buy 10 sessions, get one free.",
    lat:52.9800, lng:-6.0437,
    bookingUrl:"https://linktr.ee/theboatyardsauna"
  },

  // ── GALWAY (ADDITIONAL) ──
  {
    id:166, city:"Galway", country:"Ireland", name:"Folláine Sauna", area:"Annaghdown / Lough Corrib",
    type:"both", price:"From €15", rating:4.9, reviews:43,
    hours:"Mon 6pm–9pm · Wed 6pm–10pm · Fri 5pm–9pm · Sat–Sun 9am–2pm",
    temp:"Lough Corrib cold plunge", tags:["Wood-fired","Lakeside","Outdoor","Community","Scenic"], emoji:"🔥🌿", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 20 min north of Galway city",
    parking:"On-site at Annaghdown Pier",
    desc:"A wood-fired mobile sauna beside Annaghdown Pier on the shores of Lough Corrib, Ireland's second-largest lake. Built and run by Eoin with a focus on wellness and community. A deeply peaceful setting — cold plunges in the fresh lough water, birdsong, and the wide Corrib shoreline. A hidden gem 20 minutes from Galway city.",
    lat:53.4153, lng:-9.0847
  },
  {
    id:167, city:"Galway", country:"Ireland", name:"Oak Smoke Sauna", area:"Kylebrack / Loughrea",
    type:"both", price:"Check website", rating:4.8, reviews:54,
    hours:"Check website for current hours",
    temp:"Cold plunge / outdoor dip", tags:["Wood-fired","Outdoor","Countryside","Rural","Scenic"], emoji:"🔥🌲", open:true,
    hygiene:"A", lockerNote:"On-site at Slieve Aughty Centre",
    transport:"Drive — 45 min east of Galway city via M6",
    parking:"Free on-site at Slieve Aughty Riding Centre",
    desc:"A handcrafted wood-fired sauna set within the Slieve Aughty Riding Centre in the east Galway countryside near Loughrea. Accommodates up to six guests with a cold dip and outdoor relaxation area. Also available for mobile spa hire. A quiet, off-the-beaten-track sauna experience in the Slieve Aughty hills.",
    lat:53.1887, lng:-8.5263,
    bookingUrl:"https://slieveaughtycentre.com/oak-smoke-sauna"
  },
  {
    id:168, city:"Galway", country:"Ireland", name:"Power Saunas", area:"Silverstrand Beach, Bearna",
    type:"both", price:"€17 per session", rating:4.9, reviews:89,
    hours:"Mon–Fri 1pm–9pm · Sat–Sun 8am–8pm",
    temp:"Atlantic sea plunge + cold plunge pools", tags:["Seafront","Wood-fired","Outdoor","Community","Beach","Wild Swimming"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — Silverstrand, Bearna, 10 min from Galway city",
    parking:"Silverstrand Beach car park",
    desc:"A wood-fired sauna directly on Silverstrand Beach with views of Galway Bay — one of Galway city's most beloved seaside spots, 10 minutes from the city centre. Cold plunge pools and ice baths on site, plus direct ocean access. Sessions are 55 minutes at €17; monthly memberships available at €90. Heat up in the cedar barrel, then plunge into the Atlantic or the cold pools. A brilliant local option combining Galway's incredible natural coastline with authentic wood-fired sauna culture.",
    lat:53.2543, lng:-9.1304,
    bookingUrl:"https://powersaunas.ie"
  },
  {
    id:169, city:"Galway", country:"Ireland", name:"Sweathouse.ie", area:"Renvyle / Tully, Connemara",
    type:"both", price:"Check website", rating:4.9, reviews:112,
    hours:"Check website — seasonal and weather-dependent",
    temp:"Atlantic ocean plunge", tags:["Seafront","Wood-fired","Outdoor","Wild Atlantic Way","Scenic","Wild Swimming"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — remote location, bring dry bag",
    transport:"Drive — 1.5 hrs from Galway city via N59 through Clifden",
    parking:"On-site at Gurteen Pier, Tully, Renvyle",
    desc:"An ecological wood-fired outdoor sauna at Gurteen Pier in Renvyle, deep in the Connemara wilderness with the Twelve Bens as a backdrop. Atlantic Ocean plunging directly from the pier, temperatures from 70–110°C. Also operates in Wexford. One of Ireland's most wild and remote sauna experiences — truly living up to the brand name.",
    lat:53.5831, lng:-9.9917,
    bookingUrl:"https://www.sweathouse.ie"
  },

  // ── CORK (ADDITIONAL) ──
  {
    id:170, city:"Cork", country:"Ireland", name:"Cedar & Steam Sauna", area:"Ballycroneen Strand / Guileen Bay, East Cork",
    type:"both", price:"Check website", rating:5.0, reviews:43,
    hours:"Wed 5:30pm–10pm · Fri 9:30am–10pm · Sat–Sun 9:30am–9pm",
    temp:"Atlantic sea plunge", tags:["Seafront","Wood-fired","Outdoor","Beach","Mobile"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 40 min east of Cork City via N25",
    parking:"Ballycroneen Beach car park",
    desc:"A wood-fired sauna built inside a converted vintage horsebox, operated by Mike McCarthy at Ballycroneen Strand in East Cork, with occasional pop-ups at Guileen Bay and Ballymacoda. A charming, personal sauna experience on one of Cork's quieter beaches.",
    lat:51.8091, lng:-8.1114,
    bookingUrl:"http://www.cedarandsteamsauna.as.me"
  },
  {
    id:171, city:"Cork", country:"Ireland", name:"Coastal Cabin Beach Sauna", area:"Garryvoe Beach / Ballycotton Bay",
    type:"both", price:"Check website", rating:4.4, reviews:13,
    hours:"Mon–Thu 5pm–8pm · Fri 4pm–8pm · Sat–Sun 10am–4pm",
    temp:"Atlantic sea plunge", tags:["Seafront","Wood-fired","Outdoor","Beach","Coastal"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 35 min east of Cork City via N25",
    parking:"Garryvoe Beach car park",
    desc:"A handmade beachside sauna for up to 10 guests at Garryvoe Beach, with views across Ballycotton Bay to the famous lighthouse. Warm up after a dip in the calm, sheltered waters of one of East Cork's finest sandy beaches.",
    lat:51.8489, lng:-8.0118,
    bookingUrl:"https://coastalcabin.ie"
  },
  {
    id:172, city:"Cork", country:"Ireland", name:"Happy Place Saunas", area:"Fountainstown Beach",
    type:"both", price:"From €10", rating:4.9, reviews:67,
    hours:"Sat community sessions 12pm–2pm · private/group Fri–Sun",
    temp:"Cork Harbour sea plunge", tags:["Seafront","Wood-fired","Outdoor","Beach","Community","Budget"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 20 min south of Cork City via R610",
    parking:"Fountainstown Beach car park",
    desc:"An affordable beach sauna at Fountainstown offering €10 shared sessions and private group bookings with direct sea swim access into Cork Harbour. One of the most accessible entry points to sauna culture on the Cork coast — perfect for first-timers.",
    lat:51.7749, lng:-8.3111,
    bookingUrl:"https://happyplacesaunas.ie"
  },
  {
    id:173, city:"Cork", country:"Ireland", name:"Hoco Sauna", area:"Ballintemple / Cork City",
    type:"both", price:"From €20", rating:4.9, reviews:112,
    hours:"Thu–Fri 4pm–8:30pm · Sat–Sun 8am–4:30pm",
    temp:"Ice baths", tags:["City Centre","Finnish","Ice Bath","Urban","Cork"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"Changing facilities on-site",
    transport:"Cork City bus routes · 5 min walk from Marina",
    parking:"On-site at The Black Market, Monahan Rd",
    desc:"Cork City's dedicated sauna and ice bath venue, set in a converted cold-store rock face at The Black Market in Ballintemple. A 16-person sauna, multiple ice baths and copper showers in a unique industrial-cool setting. €20 per 45-minute session — one of the city's best wellness venues.",
    lat:51.8990, lng:-8.4230,
    bookingUrl:"https://hocosauna.ie"
  },
  {
    id:174, city:"Cork", country:"Ireland", name:"My Haven Sauna", area:"Oysterhaven Bay, Kinsale",
    type:"both", price:"Check website", rating:5.0, reviews:71,
    hours:"Wed 3:30pm–8pm · Thu 5pm–8pm · Fri 2pm–7pm · Sat–Sun 8am–5:30pm",
    temp:"Tidal sea swim", tags:["Seafront","Wood-fired","Outdoor","Coastal","Holistic","Scenic"], emoji:"🔥🌊", open:true,
    hygiene:"A+", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 25 min south of Cork City via R610",
    parking:"On-site at Oysterhaven Bay",
    desc:"A mobile sauna, infrared sauna and holistic wellness experience at the sheltered tidal inlet of Oysterhaven Bay, run by Paul with a thoughtful, personal touch. Sessions include salts, oils, and direct tidal swim access in one of Cork's most beautiful hidden bays.",
    lat:51.6959, lng:-8.4506,
    bookingUrl:"https://www.myhaven.ie"
  },

  // ── MAYO ──
  {
    id:175, city:"Mayo", country:"Ireland", name:"Big Dipper", area:"Killadoon / Louisburgh, Wild Atlantic Way",
    type:"both", price:"From €25", rating:4.9, reviews:30,
    hours:"Sat–Sun 1pm–8pm",
    temp:"Hot tub & cold plunge", tags:["Seafront","Wood-fired","Outdoor","Wild Atlantic Way","Scenic","Hot Tub"], emoji:"🔥🌊", open:true,
    hygiene:"A+", lockerNote:"Facilities at BigStyle Atlantic Lodge",
    transport:"Drive — 1.5 hrs from Galway · 2 hrs from Sligo",
    parking:"Free on-site at BigStyle Atlantic Lodge",
    desc:"A wood-lined sauna, hot tub and plunge pool experience at BigStyle Atlantic Lodge on the Wild Atlantic Way, with panoramic views of Clare Island and Clew Bay. Private group sessions for up to 10 people also available. One of Mayo's most spectacular wellness settings.",
    lat:53.7470, lng:-9.8060,
    bookingUrl:"https://bigstyle.ie/bigdipper"
  },
  {
    id:176, city:"Mayo", country:"Ireland", name:"Sabhna Saunas Dugort", area:"Dugort Beach / Silver Strand, Achill Island",
    type:"both", price:"From €22", rating:4.9, reviews:56,
    hours:"Check sabhna.ie — walk-ins welcome",
    temp:"Atlantic sea plunge", tags:["Seafront","Wood-fired","Outdoor","Beach","Wild Atlantic Way","Wild Swimming","Achill"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 2 hrs from Galway · 1 hr from Westport",
    parking:"Silver Strand Beach car park, Dugort",
    desc:"A Finnish-style wood-fired sauna on Blue Flag Silver Strand at the foot of Slievemore Mountain, Achill Island. Plunge into Blacksod Bay between rounds in the 10-person cedar sauna. One of the most dramatically situated sauna spots in Ireland.",
    lat:54.0124, lng:-10.0234,
    bookingUrl:"https://sabhna.ie"
  },
  {
    id:177, city:"Mayo", country:"Ireland", name:"Sabhna Saunas Keel", area:"Keel Beach, Achill Island",
    type:"both", price:"From €22", rating:4.9, reviews:48,
    hours:"Check sabhna.ie — walk-ins welcome",
    temp:"Atlantic sea plunge", tags:["Seafront","Wood-fired","Outdoor","Beach","Wild Atlantic Way","Wild Swimming","Achill"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 2 hrs from Galway · 1 hr from Westport",
    parking:"Keel Beach car park, Achill Island",
    desc:"A Finnish-style sauna on wild, exposed Keel Beach with sweeping views of the Minaun Cliffs — Sabhna's second Achill location. Shared and private sessions available. Keel Beach's open Atlantic exposure makes the cold plunge particularly bracing and memorable.",
    lat:53.9700, lng:-10.0674,
    bookingUrl:"https://sabhna.ie"
  },
  {
    id:178, city:"Mayo", country:"Ireland", name:"Sláinte Saunas Wild Atlantic", area:"Old Head Beach / Clew Bay, Louisburgh",
    type:"both", price:"From €15", rating:4.9, reviews:44,
    hours:"Wed–Fri 5pm–10pm · Sat–Sun & bank holidays 8:30am–5:30pm",
    temp:"Clew Bay sea plunge", tags:["Seafront","Wood-fired","Outdoor","Wild Atlantic Way","Community","Scenic"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 20 min from Westport",
    parking:"Old Head Beach car park, Louisburgh",
    desc:"Sláinte Saunas' Mayo Wild Atlantic outpost — a wood-fired sauna at the pier on Old Head Beach, Clew Bay, with harbour swim access at all tides and views across to Croagh Patrick. Shared sessions from €15; private sauna for up to 16 people also available. Sister venue to the Dublin D4 studio.",
    lat:53.7726, lng:-9.6938,
    bookingUrl:"https://www.slaintesaunas.ie"
  },
  {
    id:179, city:"Mayo", country:"Ireland", name:"South Sligo Wild Sauna", area:"Charlestown, Co. Mayo",
    type:"both", price:"From €10", rating:4.8, reviews:38,
    hours:"Mon/Wed/Fri evenings from 7pm · additional slots via Bookwhen",
    temp:"Ice bath (Oct–Jun)", tags:["Community","Wood-fired","Outdoor","Budget","Indoor"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Changing facilities at CBD Sports Complex",
    transport:"Drive — 30 min from Ballina · 30 min from Sligo town",
    parking:"Free on-site at CBD Sports Complex, Charlestown",
    desc:"A wood-fired barrel sauna at Charlestown's sports complex on the Mayo/Sligo border, running sessions alongside the town's swimming pool. Shared sessions from €10, private hire €65. An affordable community sauna bringing genuine wellness to a market town on the north-west corridor.",
    lat:53.9634, lng:-8.8005,
    bookingUrl:"https://bookwhen.com/southsligowildsauna"
  },

  // ── SLIGO (ADDITIONAL) ──
  {
    id:180, city:"Sligo", country:"Ireland", name:"Blaze It Sauna", area:"Mullaghmore Pier",
    type:"both", price:"From €12.50", rating:5.0, reviews:17,
    hours:"Fri 5:30pm–9:30pm · Sat–Sun 10:30am–6pm",
    temp:"Atlantic sea plunge", tags:["Seafront","Wood-fired","Outdoor","Community","Scenic","Wild Atlantic Way"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 25 min north of Sligo town",
    parking:"Mullaghmore Pier car park",
    desc:"A sea-facing wood-fired sauna heated to 90–100°C on the edge of Mullaghmore Pier, with a direct jump into the Atlantic for cooling. Views of Benbulben, Classiebawn Castle and the Wild Atlantic horizon. One of Sligo's most atmospheric sauna settings — weekday sessions from €12.50.",
    lat:54.4663, lng:-8.4472,
    bookingUrl:"https://blazeitsauna.simplybook.it/v2/"
  },
  {
    id:181, city:"Sligo", country:"Ireland", name:"Sauna Sásta", area:"Dunmoran Beach / Augris Head",
    type:"both", price:"€90 private session", rating:4.9, reviews:34,
    hours:"Fri 5pm–8pm · Sat 10am–5pm · Sun 10am–7pm",
    temp:"Atlantic sea plunge", tags:["Seafront","Wood-fired","Outdoor","Scenic","Wild Atlantic Way","Private"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 35 min north-west of Sligo town",
    parking:"Dunmoran Beach car park",
    desc:"A 6–8 person wood-fired barrel sauna at Dunmoran Beach on the Wild Atlantic Way, near Augris Head, with panoramic views across Dunmoran Strand. Private session hire (€90 for the barrel). Monthly full moon special sessions add to the magic of this quietly spectacular Sligo coastal spot.",
    lat:54.2631, lng:-8.7249,
    bookingUrl:"https://saunasasta.ie"
  },
  {
    id:182, city:"Sligo", country:"Ireland", name:"West Coast Sauna Co.", area:"Enniscrone Pier / Killala Bay",
    type:"both", price:"Check website", rating:5.0, reviews:12,
    hours:"Wed–Fri 6pm–9pm · Sat–Sun 10am–9pm",
    temp:"Killala Bay sea plunge", tags:["Seafront","Wood-fired","Outdoor","Community","Wild Atlantic Way","Scenic"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 50 min from Sligo town",
    parking:"Enniscrone Pier, Cliff Road",
    desc:"A Finnish wood-fired sauna nestled at Enniscrone Pier on Killala Bay, offering private and group bookings with a cold Atlantic dip. Views across to the Mayo headlands. A second location at Ballina Rugby Club has also opened, making this one of Sligo's fastest-growing sauna communities.",
    lat:54.2202, lng:-9.0973,
    bookingUrl:"https://westcoastsaunaco.ie"
  },

  // ── CARLOW ──
  {
    id:183, city:"Carlow", country:"Ireland", name:"Valhalla Saunas", area:"Milford Weir, River Barrow",
    type:"both", price:"Check valhallasaunas.ie", rating:4.9, reviews:31,
    hours:"Check valhallasaunas.ie — booking essential",
    temp:"River Barrow plunge", tags:["Riverside","Wood-fired","Outdoor","Scenic"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 15 min south of Carlow town",
    parking:"Milford Weir, off R430",
    desc:"Wood-fired sauna on the banks of the River Barrow at Milford Weir — one of Co. Carlow's most scenic riverside spots. Cold plunge in the river, sauna to 85–90°C. Private 45-minute sessions for small groups, nestled in woodland along the Barrow Way.",
    lat:52.6980, lng:-6.9670,
    bookingUrl:"https://valhallasaunas.ie"
  },

  // ── LAOIS ──
  {
    id:184, city:"Laois", country:"Ireland", name:"Woodfield Sauna", area:"Killeshin, Co. Laois",
    type:"sauna", price:"Check woodfieldsauna.com", rating:4.9, reviews:22,
    hours:"Check woodfieldsauna.com — booking essential",
    temp:"Outdoor cold shower", tags:["Wood-fired","Outdoor","Countryside","Handcrafted"], emoji:"🔥🌲", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 5 min from Carlow town · Killeshin, Co. Laois",
    parking:"On-site at Highfield House, Killeshin",
    desc:"A handcrafted wood-fired sauna set in the tranquil grounds of Highfield House on an organic farm in Killeshin — just minutes from Carlow town. Private sessions in a beautifully built Finnish-style cabin with woodland views and outdoor cool-down space.",
    lat:52.8330, lng:-6.9660,
    bookingUrl:"https://woodfieldsauna.com"
  },
  {
    id:185, city:"Laois", country:"Ireland", name:"Soul Sauna", area:"Ballykilcavan Farm, Stradbally",
    type:"sauna", price:"Check soulsauna.ie", rating:4.9, reviews:18,
    hours:"Mobile pop-up sessions — check soulsauna.ie for dates and locations",
    temp:"Outdoor cooling", tags:["Wood-fired","Community","Outdoor","Countryside"], emoji:"🔥🌿", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Base at Ballykilcavan Farm, Stradbally, Co. Laois · operates across Laois, Carlow, Kilkenny and beyond",
    parking:"On-site at Ballykilcavan Farm",
    desc:"A mobile wood-fired sauna based at the idyllic Ballykilcavan Farm & Brewery in Stradbally, Co. Laois. Pop-up sessions across Laois, Carlow, Kilkenny, Kildare and Offaly — follow on socials for upcoming events. Private group hire also available.",
    lat:52.9500, lng:-7.1380,
    bookingUrl:"https://soulsauna.ie"
  },

  // ── CAVAN ──
  {
    id:186, city:"Cavan", country:"Ireland", name:"Live Lagom Sauna", area:"Brackley & Annagh Lakes, Cootehill",
    type:"both", price:"Check livelagom.ie", rating:5.0, reviews:21,
    hours:"Wed–Fri: Annagh Lake · Sat–Sun: Brackley Lake — check livelagom.ie",
    temp:"Freshwater lake plunge", tags:["Lakeside","Wood-fired","Outdoor","Scenic"], emoji:"🔥🏊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — near Cootehill, Co. Cavan",
    parking:"On-site at each lake location",
    desc:"A beautifully crafted mobile sauna running sessions on two of Cavan's most serene lakes — Annagh Lake mid-week and Brackley Lake at weekends. Large picture window overlooks the water, capacity for 7. Cold plunge in the freshwater lake. One of Ireland's most peaceful sauna experiences.",
    lat:53.9780, lng:-7.0830,
    bookingUrl:"https://livelagom.ie"
  },

  // ── CLARE ──
  {
    id:187, city:"Clare", country:"Ireland", name:"Sauna Suaimhneas", area:"Dough, Lahinch",
    type:"both", price:"Check saunasuaimhneas.com", rating:5.0, reviews:26,
    hours:"Mobile — check saunasuaimhneas.com for current locations and times",
    temp:"Atlantic sea plunge", tags:["Coastal","Wood-fired","Beach","Wild Atlantic Way","Scenic"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Mobile — sessions at Lahinch, Spanish Point, Miltown Malbay, Fanore and other Clare beaches",
    parking:"Beach car parks at each location",
    desc:"A traditional wood-fired sauna touring Clare's most beautiful Atlantic beaches — Lahinch, Spanish Point, Miltown Malbay and Fanore. Run by siblings Niamh and Seán. 'Suaimhneas' means 'peace' in Irish — and a Clare beach sauna delivers exactly that.",
    lat:52.9352, lng:-9.3504,
    bookingUrl:"https://saunasuaimhneas.com"
  },

  // ── DONEGAL ──
  {
    id:188, city:"Donegal", country:"Ireland", name:"Cocoon Sauna", area:"Portnablagh, Breaghy",
    type:"both", price:"Check cocoonsauna.ie", rating:4.9, reviews:34,
    hours:"Check cocoonsauna.ie — booking essential",
    temp:"Atlantic sea plunge", tags:["Seafront","Wood-fired","Beach","Wild Atlantic Way","Outdoor"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — near Dunfanaghy, northwest Donegal",
    parking:"Portnablagh Pier, Breaghy",
    desc:"A barrel-shaped wood-fired sauna with a sea-view window at Portnablagh Pier — a quiet harbour on the Donegal coast near Dunfanaghy. Cold plunge in the Atlantic at the beach entrance. Launched Easter 2023. An intimate and perfectly located sauna on the Wild Atlantic Way.",
    lat:55.1850, lng:-7.8750,
    bookingUrl:"https://cocoonsauna.ie"
  },
  {
    id:189, city:"Donegal", country:"Ireland", name:"OM Saunas", area:"Rossnowlagh Beach",
    type:"both", price:"Check omsaunas.simplybook.it", rating:4.8, reviews:29,
    hours:"Check omsaunas.simplybook.it for sessions",
    temp:"Atlantic sea plunge", tags:["Seafront","Wood-fired","Beach","Wild Atlantic Way","Outdoor"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 15 min south of Donegal town",
    parking:"Rossnowlagh Beach car park, F94 X7X3",
    desc:"A wood-fired sauna nestled in the dunes at Rossnowlagh — one of Donegal's widest and most beautiful surf beaches. Cold plunge in the Atlantic. Private and shared sessions with the two-mile golden strand as your backdrop.",
    lat:54.5540, lng:-8.2910,
    bookingUrl:"https://omsaunas.simplybook.it"
  },
  {
    id:190, city:"Donegal", country:"Ireland", name:"Salt and Ember Sauna", area:"Magheracar Beach, Bundoran",
    type:"both", price:"Check saltandember.simplybook.it", rating:5.0, reviews:32,
    hours:"Sat–Sun 10am–4pm",
    temp:"Atlantic sea plunge", tags:["Seafront","Wood-fired","Beach","Wild Atlantic Way","Outdoor"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 2 min south of Bundoran town",
    parking:"Boat Quay, Magheracar, Bundoran F94 HV21",
    desc:"A cosy wood-fired sauna for 6–8 people on Magheracar Beach with breathtaking ocean views — just south of Bundoran, the surf capital of Ireland. Weekend sessions Sat–Sun with Atlantic plunge. Booking via simplybook.",
    lat:54.4670, lng:-8.3000,
    bookingUrl:"https://saltandember.simplybook.it"
  },
  {
    id:191, city:"Donegal", country:"Ireland", name:"Sliabh Liag Sauna", area:"Teelin Pier, Co. Donegal",
    type:"both", price:"Check sliabhliagsauna.ie", rating:5.0, reviews:21,
    hours:"Check sliabhliagsauna.ie — booking essential",
    temp:"Atlantic sea plunge", tags:["Seafront","Wood-fired","Views","Wild Atlantic Way","Scenic"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 8 min from Carrick village",
    parking:"Teelin Pier car park, Rinnakill, Teelin",
    desc:"A waterfront wood-fired sauna at Teelin Pier, nestled at the foot of the Sliabh Liag (Slieve League) cliffs — some of the highest sea cliffs in Europe at over 600m. Panoramic views across Teelin Bay. Cold plunge in the Atlantic. Ireland's most dramatic sauna setting.",
    lat:54.6420, lng:-8.6310,
    bookingUrl:"https://sliabhliagsauna.ie"
  },
  {
    id:192, city:"Donegal", country:"Ireland", name:"The Hot Barrel Sauna", area:"Drum, Portsalon / Kerrykeel",
    type:"both", price:"Check @the_hot_barrel on Instagram", rating:5.0, reviews:18,
    hours:"Sat–Sun 8am–4pm",
    temp:"Atlantic sea plunge", tags:["Seafront","Wood-fired","Outdoor","Scenic","Views"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — Fanad Peninsula · Portsalon or Kerrykeel",
    parking:"Near Portsalon Beach or Kerrykeel Pier",
    desc:"A wood-fired barrel sauna on the Fanad Peninsula with two locations — one overlooking Portsalon Beach, one at Kerrykeel Pier on Mulroy Bay. Operated by Brian, weekend mornings from 8am. Cold sea swim at both settings.",
    lat:55.1920, lng:-7.6480,
    bookingUrl:"https://www.instagram.com/the_hot_barrel"
  },
  {
    id:193, city:"Donegal", country:"Ireland", name:"The Sea View Sauna Culdaff", area:"Knock, Culdaff, Inishowen",
    type:"both", price:"Check theseaviewsauna.ie", rating:5.0, reviews:37,
    hours:"Fri 2pm–5:30pm · Sat–Sun 9am–5pm",
    temp:"Atlantic sea plunge", tags:["Seafront","Wood-fired","Views","Outdoor","Scenic"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — Culdaff village, north Inishowen peninsula",
    parking:"On-site at Knock, Culdaff, Co. Donegal",
    desc:"A sea-view wood-fired sauna at Culdaff on the northern tip of the Inishowen peninsula. Stunning Atlantic views and direct sea swim access. Fri afternoons plus weekends. One of two Sea View Sauna locations on Inishowen — consistently rated 5-star.",
    lat:55.2890, lng:-7.1640,
    bookingUrl:"https://theseaviewsauna.ie"
  },
  {
    id:194, city:"Donegal", country:"Ireland", name:"The Sea View Sauna Shroove", area:"Stroove, Inishowen",
    type:"both", price:"Check theseaviewsauna.ie", rating:5.0, reviews:24,
    hours:"Mon–Thu 5pm–7pm · Fri 2:45pm–5:30pm · Sat–Sun 9am–5pm",
    temp:"Atlantic / Lough Foyle plunge", tags:["Seafront","Wood-fired","Views","Outdoor","Scenic"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — Stroove, eastern tip of Inishowen peninsula",
    parking:"On-site at Stroove, Co. Donegal",
    desc:"The second Sea View Sauna location — at Stroove on the dramatic eastern tip of Inishowen, where Lough Foyle meets the open Atlantic. Open weekday evenings and full weekends. Same team and 5-star experience as the Culdaff location.",
    lat:55.2530, lng:-6.9760,
    bookingUrl:"https://theseaviewsauna.ie"
  },
  {
    id:195, city:"Donegal", country:"Ireland", name:"The Swilly Sauna", area:"Main Beach, Rathmullan",
    type:"both", price:"Check website", rating:5.0, reviews:42,
    hours:"Sat–Sun 9am–2pm",
    temp:"Lough Swilly plunge", tags:["Waterside","Wood-fired","Outdoor","Scenic","Views"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 30 min from Letterkenny",
    parking:"Main Beach Carpark, Rathmullan, Co. Donegal",
    desc:"A wood-fired sauna on the beach at Rathmullan — a historic and scenic village on the shore of Lough Swilly. Cold plunge in the Lough. Run by Ricky, Sat–Sun mornings. Views across to the Inishowen hills. Consistently 5-star reviewed.",
    lat:55.0990, lng:-7.5280,
    bookingUrl:"https://www.instagram.com/theswillysauna"
  },
  {
    id:196, city:"Donegal", country:"Ireland", name:"Wild Atlantic Sauna Dooey", area:"Dooey, Lettermacaward",
    type:"both", price:"Check website", rating:5.0, reviews:19,
    hours:"Sat–Sun 9am–5pm",
    temp:"Atlantic sea plunge", tags:["Seafront","Wood-fired","Beach","Wild Atlantic Way","Outdoor"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"Changing rooms on-site",
    transport:"Drive — 55 min south-west of Letterkenny · Gaeltacht, west Donegal",
    parking:"Dooey Beach car park, Lettermacaward F94 WF54",
    desc:"A remote wood-fired sauna on pristine Dooey Beach in the Irish-speaking heartland of west Donegal. Essential oils, changing rooms, and a wonderfully hospitable host (Mags). One of Ireland's most elemental and memorable sauna experiences.",
    lat:54.8370, lng:-8.5610,
    bookingUrl:"https://www.instagram.com/wildatlanticsaunadooey"
  },

  // ── KERRY ──
  {
    id:197, city:"Kerry", country:"Ireland", name:"Brandon Bay Sauna", area:"Fahamore, Maharees, Castlegregory",
    type:"both", price:"From €10 per 30 min", rating:5.0, reviews:20,
    hours:"Wed–Fri 5:30pm–8:30pm · Sat–Sun 10am–6pm",
    temp:"Brandon Bay sea plunge", tags:["Seafront","Wood-fired","Beach","Wild Atlantic Way","Scenic"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 25 min north of Tralee · via Maharees Peninsula",
    parking:"Fahamore Beach car park, V92 A3Y6",
    desc:"A wood-fired sauna with plunge pool on the Maharees peninsula at Fahamore — views across Brandon Bay to the slopes of Mount Brandon (951m). Cold plunge in crystal-clear Atlantic. Sessions from €10 per 30 min. One of Kerry's most peaceful headland settings.",
    lat:52.2630, lng:-10.0450,
    bookingUrl:"https://brandonbaysauna.com"
  },
  {
    id:198, city:"Kerry", country:"Ireland", name:"Fenit Lighthouse Sauna", area:"Fenit Pier, Tralee Bay",
    type:"both", price:"From €10", rating:4.9, reviews:29,
    hours:"Sat 9am–3pm · Sun 9am–2pm",
    temp:"Tralee Bay sea plunge", tags:["Seafront","Wood-fired","Harbour","Views","Scenic"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"Showers and changing area on-site",
    transport:"Drive — 15 min west of Tralee town",
    parking:"Fenit Pier car park",
    desc:"A wood-fired sauna at Fenit Pier with panoramic views over Tralee Bay and the Fenit lighthouse. Run by Maryanne, Sat–Sun mornings from €10. Half-hour and one-hour sessions. Cold plunge in the bay. Particularly atmospheric with the Slieve Mish mountains behind.",
    lat:52.2760, lng:-9.8640,
    bookingUrl:"https://fenitlighthousesauna.ie"
  },
  {
    id:199, city:"Kerry", country:"Ireland", name:"Fire and Ice Sauna", area:"Ballinskelligs, Iveragh Peninsula",
    type:"both", price:"Check fire-and-ice-sauna.com", rating:4.9, reviews:26,
    hours:"Mon–Sun 12pm–7pm",
    temp:"Atlantic sea plunge", tags:["Seafront","Wood-fired","Views","Wild Atlantic Way","Scenic"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 25 min south of Caherciveen",
    parking:"On-site, 7 Cois Trá Upper, Ballinskelligs V23 HR27",
    desc:"A wood-fired sauna on the wild shore at Ballinskelligs on the Iveragh Peninsula — facing Puffin Island, with Skellig Michael on the horizon. Open daily 12–7pm. Private sessions for up to 6. One of Kerry's most strikingly beautiful sauna locations.",
    lat:51.8270, lng:-10.2530,
    bookingUrl:"https://fire-and-ice-sauna.com"
  },
  {
    id:200, city:"Kerry", country:"Ireland", name:"Infinity Sauna", area:"Gallarus, Dingle Peninsula",
    type:"both", price:"Check website", rating:4.9, reviews:22,
    hours:"Mon/Wed/Fri 6:30pm–9:30pm · Sat 8am–12pm · Sun 12pm–4pm",
    temp:"Cold plunge pool", tags:["Wood-fired","Outdoor","Views","Scenic","Wild Atlantic Way"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 6 min west of Dingle town",
    parking:"On-site at Gallarus, V92 HX95",
    desc:"A wood-fired sauna cabin at Gallarus, 6 minutes west of Dingle — with a rainfall shower, cold plunge pool and the ancient Dingle Peninsula landscape as backdrop. Evening sessions Mon/Wed/Fri plus weekend mornings. Near the iconic Gallarus Oratory.",
    lat:52.1790, lng:-10.3460,
    bookingUrl:"https://wunderbook-production-mobilewebapp.azurewebsites.net/app/Discover?tenancyName=Infinity_Sauna"
  },
  {
    id:201, city:"Kerry", country:"Ireland", name:"Samhradh's Sauna", area:"Cromane, Killorglin",
    type:"both", price:"Check samhradhssauna.com", rating:4.9, reviews:33,
    hours:"Check samhradhssauna.com for current sessions",
    temp:"Cromane Bay sea plunge", tags:["Coastal","Wood-fired","Beach","Scenic","Community"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 8 min from Killorglin · Ring of Kerry N70, sign for Cromane",
    parking:"Cromane Strand, Glosha, V93 K2C5",
    desc:"A mobile wood-fired sauna at Cromane beach — a sheltered strand on the Iveragh Peninsula 8km from Killorglin. Cold plunge in Cromane Bay. 'Samhradh' means 'summer' in Irish — and this peaceful, sun-dappled spot captures exactly that feeling year-round.",
    lat:52.0640, lng:-9.8250,
    bookingUrl:"https://samhradhssauna.com"
  },
  {
    id:202, city:"Kerry", country:"Ireland", name:"Sona Saunas", area:"Ventry Bay, Dingle Peninsula",
    type:"both", price:"Check @sonasaunaventry on Instagram", rating:5.0, reviews:16,
    hours:"Check @sonasaunaventry on Instagram for sessions",
    temp:"Ventry Bay sea plunge", tags:["Seafront","Wood-fired","Beach","Scenic","Wild Atlantic Way"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — 8 min west of Dingle town · Ceann Trá / Ventry",
    parking:"Ventry Bay Beach, Cantra, Dingle",
    desc:"A wood-fired barrel sauna heating to 100°C on the shores of Ventry Bay (Ceann Trá) — a sheltered turquoise beach a few minutes west of Dingle. Cold plunge in the bay. Run by Tom Connolly since March 2024. One of the Dingle Peninsula's finest coastal sauna settings.",
    lat:52.1170, lng:-10.2850,
    bookingUrl:"https://linktr.ee/sonasauna"
  },
  {
    id:203, city:"Kerry", country:"Ireland", name:"Sunset Sauna Kerry", area:"Coornagillagh, Tuosist / Beara Peninsula",
    type:"both", price:"Check @sunsetsaunakerry_beara on Instagram", rating:4.9, reviews:21,
    hours:"Check @sunsetsaunakerry_beara on Instagram for sessions",
    temp:"Atlantic sea plunge", tags:["Seafront","Wood-fired","Scenic","Wild Atlantic Way","Views"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — south Kerry / Beara Peninsula · near Kenmare",
    parking:"Coornagillagh beach, Tuosist, Co. Kerry",
    desc:"A mobile wood-fired sauna touring the wild Beara Peninsula coast — Kenmare, Castletownbere, and Allihies. Year-round sessions with Atlantic views at multiple locations. Paired with the Coorna Cafe food and coffee truck for a full post-sauna experience.",
    lat:51.7760, lng:-9.6310,
    bookingUrl:"https://www.instagram.com/sunsetsaunakerry_beara"
  },

  // ── KILDARE ──
  {
    id:204, city:"Kildare", country:"Ireland", name:"An Chill Sauna", area:"Kill, Co. Kildare",
    type:"both", price:"Check website for current pricing", rating:4.9, reviews:39,
    hours:"Check website for current hours",
    temp:"Cold plunge", tags:["Cold Plunge","Wood-fired","Countryside"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — Kill village, Co. Kildare · off M7",
    parking:"On-site",
    desc:"Intimate wood-fired sauna and cold plunge in Kill, Co. Kildare. Capacity of 8 for a personal, unhurried experience. Conveniently located just off the M7 motorway.",
    lat:53.2545, lng:-6.5929,
    bookingUrl:"http://www.anchillsauna.ie/book-now"
  },
  {
    id:205, city:"Kildare", country:"Ireland", name:"Treehouse Sauna", area:"Osberstown, Naas",
    type:"both", price:"Check website for current pricing", rating:4.9, reviews:30,
    hours:"Check website for current hours",
    temp:"Cold plunge + jacuzzi", tags:["Riverside","Jacuzzi","Wood-fired","Contrast Therapy"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — Osberstown, Naas · near Liffey Valley",
    parking:"Free on-site at Liffeyvale Nurseries",
    desc:"Riverside sauna and contrast therapy centre set among the nursery gardens at Liffeyvale, Naas. 50-minute sessions combining wood-fired sauna, cold plunge pool, and jacuzzi — a hidden gem beside the River Liffey.",
    lat:53.2201, lng:-7.0014,
    bookingUrl:"https://www.treehousesauna.com"
  },

  // ── LEITRIM ──
  {
    id:206, city:"Leitrim", country:"Ireland", name:"Lough Allen Adventure Sauna", area:"Drumshanbo, Co. Leitrim",
    type:"both", price:"Check website for current pricing", rating:4.7, reviews:70,
    hours:"Check website for current hours",
    temp:"Cold plunge pool", tags:["Lakeside","Yoga","Cold Plunge","Hot Tub"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Changing facilities on-site",
    transport:"Drive — Drumshanbo town centre, Co. Leitrim",
    parking:"Free on-site",
    desc:"Full wellness centre on the shores of Lough Allen — sauna, hot tub, cold plunge pool, and yoga. Part of the Lough Allen Outdoor Pursuits Centre. A tranquil base for exploring the Iron Way and the Lough Allen basin.",
    lat:54.0478, lng:-8.0432,
    bookingUrl:"http://www.loughallenadventure.ie"
  },

  // ── MEATH ──
  {
    id:207, city:"Meath", country:"Ireland", name:"Lagoa Mercury Saunas", area:"Summerhill, Co. Meath",
    type:"both", price:"Check website for current pricing", rating:4.9, reviews:20,
    hours:"Check website for current hours",
    temp:"Cold lake immersion", tags:["Lakeside","Wood-fired","Outdoor","Wild Swim"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — Summerhill, Co. Meath",
    parking:"On-site",
    desc:"Outdoor wood-fired sauna on a private lake near Summerhill, Co. Meath. The session ends with a cold immersion in the lake — a restorative contrast therapy experience in quiet Meath countryside.",
    lat:53.4764, lng:-6.7439,
    bookingUrl:"https://www.mercurysauna.com"
  },
  {
    id:208, city:"Meath", country:"Ireland", name:"The Hot Box Sauna Bective", area:"Bective / Navan, Co. Meath",
    type:"both", price:"Check website for current pricing", rating:4.9, reviews:349,
    hours:"Check website for current hours",
    temp:"River Boyne plunge", tags:["Riverside","Wood-fired","River Boyne","Multi-sauna"], emoji:"🔥🌊", open:true,
    hygiene:"A+", lockerNote:"Changing rooms on-site",
    transport:"Drive — Bective, near Navan · Co. Meath",
    parking:"Free on-site at Mill House",
    desc:"Multi-sauna facility at a historic mill on the River Boyne, near Bective Abbey. Multiple wood-fired saunas, a plunge pool, and direct access to the Boyne for wild swimming. One of Ireland's highest-rated sauna experiences.",
    lat:53.6583, lng:-6.7556,
    bookingUrl:"https://www.thehotboxsauna.ie"
  },

  // ── OFFALY ──
  {
    id:209, city:"Offaly", country:"Ireland", name:"An Bosca Te — Banagher Sauna", area:"Banagher Marina, Co. Offaly",
    type:"both", price:"Check website for current pricing", rating:5.0, reviews:7,
    hours:"Check Calendly for current sessions",
    temp:"River Shannon / barrel cold plunge", tags:["Riverside","River Shannon","Wood-fired","Marina"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — Banagher Marina, Co. Offaly",
    parking:"Free at the marina",
    desc:"Traditional sauna and cold water immersion at Banagher Marina on the River Shannon. A compact, community-focused venue with barrel cold plunge and stunning river views. Perfect after a walk or cycle along the Shannon.",
    lat:53.1952, lng:-7.9861,
    bookingUrl:"https://calendly.com/banaghersauna"
  },

  // ── ROSCOMMON ──
  {
    id:210, city:"Roscommon", country:"Ireland", name:"Cavetown Lake Sauna", area:"Croghan, Co. Roscommon",
    type:"both", price:"Check website for current pricing", rating:5.0, reviews:15,
    hours:"Check website for current hours",
    temp:"Cavetown Lake cold swim", tags:["Lakeside","Wild Swim","Wood-fired","Scenic"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — Croghan / Fairview, Co. Roscommon",
    parking:"On-site",
    desc:"Wood-fired sauna paired with wild swimming in Cavetown Lake near Croghan. A peaceful, nature-first experience in the heart of Roscommon — popular for group and family sessions.",
    lat:53.8060, lng:-8.1850,
    bookingUrl:"https://bookwhen.com/cavetownsauna"
  },
  {
    id:211, city:"Roscommon", country:"Ireland", name:"Cè Sauna", area:"Rockingham Demesne, Boyle",
    type:"both", price:"Check website for current pricing", rating:4.8, reviews:12,
    hours:"Check website for current hours",
    temp:"Lakeside cold plunge", tags:["Lakeside","Wood-fired","Scenic","Connaught"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — Rockingham Demesne, Boyle, Co. Roscommon",
    parking:"On-site",
    desc:"Wood-fired sauna and plunge pool in the historic Rockingham Demesne estate near Boyle. Access to a beautiful lake for cold water immersion amid mature woodland. A serene escape close to Lough Key Forest Park.",
    lat:53.9727, lng:-8.3190,
    bookingUrl:"https://www.irelandsaunas.com/roscommon"
  },
  {
    id:212, city:"Roscommon", country:"Ireland", name:"Riverside Sauna Termonbarry", area:"Termonbarry, Co. Roscommon",
    type:"sauna", price:"Check website for current pricing", rating:5.0, reviews:10,
    hours:"Check website for current hours",
    temp:"River Shannon", tags:["Riverside","River Shannon","Wood-fired"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — Termonbarry / Ballytoohey, Co. Roscommon",
    parking:"Harbour Road, Ballytoohey",
    desc:"Intimate wood-fired sauna on the banks of the River Shannon at Termonbarry. Perfect for a quiet, restorative session followed by a cold dip in the Shannon.",
    lat:53.6728, lng:-7.9767,
    bookingUrl:"https://www.irelandsaunas.com/roscommon"
  },
  {
    id:213, city:"Roscommon", country:"Ireland", name:"Sauna Castlerea", area:"Clonalis, Castlerea, Co. Roscommon",
    type:"both", price:"Check website for current pricing", rating:5.0, reviews:12,
    hours:"Check website for current hours",
    temp:"Cold plunge", tags:["Cold Plunge","Wood-fired","Rural"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — Clonalis, Castlerea, Co. Roscommon",
    parking:"On-site",
    desc:"Sauna and cold plunge set on the grounds near Clonalis House in Castlerea — the ancestral home of the O'Conor family. A well-rated local venue in the west of Co. Roscommon.",
    lat:53.7641, lng:-8.4847,
    bookingUrl:"https://bookwhen.com/saunacastlerea"
  },
  {
    id:214, city:"Roscommon", country:"Ireland", name:"SauNua Athlone", area:"Hodson Bay, Co. Roscommon",
    type:"both", price:"Check website for current pricing", rating:5.0, reviews:25,
    hours:"Check website for current hours",
    temp:"Lough Ree lake swim", tags:["Lakeside","Lough Ree","Hot Tub","Wood-fired"], emoji:"🔥🌊", open:true,
    hygiene:"A+", lockerNote:"Changing facilities on-site",
    transport:"Drive — Hodson Bay, Athlone · Co. Roscommon side of Lough Ree",
    parking:"Free at Bay Sports Centre",
    desc:"Wood cabin saunas, hot tubs, and lake swimming on Lough Ree at Hodson Bay. Operated from the Bay Sports Centre — Ireland's largest inland lake provides a stunning cold water contrast after a sauna session.",
    lat:53.4558, lng:-7.9781,
    bookingUrl:"https://www.baysports.ie"
  },
  {
    id:215, city:"Roscommon", country:"Ireland", name:"Sweathouse Battlebridge", area:"Battlebridge, Co. Roscommon",
    type:"both", price:"€12.50–€15", rating:4.9, reviews:40,
    hours:"Check website for current hours",
    temp:"River cold plunge", tags:["Riverside","Wood-fired","Budget","Community"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — Battlebridge / Lustia, Co. Roscommon · near Lough Allen",
    parking:"On-site",
    desc:"Wood-fired sweat house with river access for cold plunging, near the Roscommon-Leitrim border at Battlebridge. One of Ireland's most affordable sauna sessions (€12.50 midweek / €15 weekends) in a beautiful riverside setting.",
    lat:53.9900, lng:-8.1153,
    bookingUrl:"https://www.sweathousebattlebridge.com"
  },
  {
    id:216, city:"Roscommon", country:"Ireland", name:"Wood Fired Sauna Lough Errit", area:"Gortaganny, Castlerea, Co. Roscommon",
    type:"both", price:"Check website for current pricing", rating:5.0, reviews:23,
    hours:"Check website for current hours · Sunday Wim Hof group sessions",
    temp:"Lough Errit lake dip", tags:["Lakeside","Wim Hof","Wood-fired","Wild Swim"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — Gortaganny, Castlerea · north Co. Roscommon",
    parking:"On-site at Errit Lodge",
    desc:"Wood-fired sauna on the shore of Lough Errit, west of Castlerea. Regular Sunday Wim Hof group sessions combine sauna, breathwork, and a cold lake dip. A deeply immersive experience in one of Roscommon's quieter corners.",
    lat:53.7800, lng:-8.5200,
    bookingUrl:"https://bookwhen.com/woodfiredsaunalougherrit"
  },

  // ── WESTMEATH ──
  {
    id:217, city:"Westmeath", country:"Ireland", name:"Contrast Wellness", area:"Athlone, Co. Westmeath",
    type:"both", price:"Check website for current pricing", rating:4.8, reviews:20,
    hours:"Check website for current hours",
    temp:"Cold plunge", tags:["Mobile","Cold Plunge","Private Hire","Community"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — Grace Park Road, Athlone, Co. Westmeath",
    parking:"On-site",
    desc:"Mobile sauna and cold plunge pod operating public sessions and private event hire in Athlone. Flexible booking makes it ideal for groups, corporate wellness days, and special occasions.",
    lat:53.4239, lng:-7.9302,
    bookingUrl:"https://www.contrastwellness.ie"
  },
  {
    id:218, city:"Westmeath", country:"Ireland", name:"Serenity Sauna and Ice Baths", area:"Moate, Co. Westmeath",
    type:"both", price:"Check website for current pricing", rating:5.0, reviews:18,
    hours:"Check website for current hours",
    temp:"Ice baths", tags:["Ice Bath","Sauna","Park","Scenic"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — Dún Na Sí Amenity & Heritage Park, Moate",
    parking:"Free at Dún Na Sí Park",
    desc:"Sauna and ice baths set within the beautiful Dún Na Sí Amenity and Heritage Park in Moate. A calming, park-based wellness experience in the midlands — surrounded by nature and heritage at a much-loved Westmeath landmark.",
    lat:53.3986, lng:-7.7213,
    bookingUrl:"https://www.irelandsaunas.com/westmeath"
  },
  {
    id:219, city:"Westmeath", country:"Ireland", name:"The Sauna Society", area:"Lough Ennell, Mullingar",
    type:"both", price:"Check website for current pricing", rating:4.9, reviews:30,
    hours:"Check website for current hours",
    temp:"Lough Ennell lake cold plunge", tags:["Lakeside","Lough Ennell","Cold Plunge","Ice Tub"], emoji:"🔥🌊", open:true,
    hygiene:"A+", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — Tudenham Shore, Lough Ennell, near Mullingar",
    parking:"Free at Lough Ennell Caravan Park",
    desc:"Sauna, cold plunge pools, and an ice tub on the shores of Lough Ennell near Mullingar. A lakeside wellness retreat that combines the heat of a Finnish sauna with the cold clarity of a Westmeath lake — one of Ireland's best-kept sauna secrets.",
    lat:53.4422, lng:-7.4375,
    bookingUrl:"https://www.thesaunasociety.ie"
  },

  // ── NEW ADDITIONS ──

  // Dublin additions
  {
    id:223, city:"Dublin", country:"Ireland", name:"The Chillipod", area:"Ringsend, Dublin 4",
    type:"both", price:"From €15", rating:4.8, reviews:47,
    hours:"Daily 7am–8pm",
    temp:"Cold plunge pool", tags:["Sauna","Cold Plunge","Contrast Therapy","City Centre","Outdoor"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Changing rooms and showers on site",
    transport:"Grand Canal Dock DART · 12 min walk · Dublin Bus to Ringsend",
    parking:"Ringsend Road street parking",
    desc:"Dublin's relaxed outdoor sauna and cold plunge space at 98 Ringsend Road, Dublin 4 — a Nordic-inspired wellness venue with sauna, cold plunge pool, café, changing rooms and showers. Sessions are 45 minutes and run daily from 7am. Conveniently located for Grand Canal Dock and the Silicon Docks, making it a popular pre- or post-work option for south inner-city Dublin.",
    lat:53.3452, lng:-6.2196,
    bookingUrl:"https://www.thechillipod.ie"
  },
  {
    id:224, city:"Dublin", country:"Ireland", name:"The Wonky Sauna", area:"Howth, North Dublin",
    type:"both", price:"Check website", rating:4.8, reviews:34,
    hours:"Check website for current hours",
    temp:"Irish Sea plunge", tags:["Wood-fired","Seafront","Coastal","Outdoor","Wild Atlantic"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Howth DART station · walk to harbour",
    parking:"Howth harbour car parks",
    desc:"A characterful wood-fired sauna in Howth — Dublin's beloved fishing village peninsula, perched above the Irish Sea with views across Dublin Bay to the Wicklow Mountains. The Wonky Sauna embraces the personality of its location: informal, coastal, and genuinely wild. Heat up in a proper sauna then plunge into the cold Irish Sea. One of the most scenic sauna settings in the Dublin area.",
    lat:53.3867, lng:-6.0653,
    bookingUrl:"https://www.wonkysauna.ie"
  },
  {
    id:225, city:"Dublin", country:"Ireland", name:"The Sea Sauna Tower Bay Portrane", area:"Tower Bay Beach, Portrane, Co. Dublin",
    type:"both", price:"From €15", rating:4.9, reviews:89,
    hours:"Mon 4pm–9pm · Tue closed · Wed–Thu 4pm–9pm · Fri 8:30am–9pm · Sat–Sun 8am–9pm",
    temp:"Irish Sea cold shower & plunge barrels", tags:["Wood-fired","Seafront","Coastal","Outdoor","Beach"], emoji:"🌊🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag. 16+ only.",
    transport:"Drive — Tower Bay Beach Car Park, Portrane (K36 RX92), 30 min north of Dublin city",
    parking:"Free at Tower Bay Beach Car Park, Portrane",
    desc:"Three handcrafted wood-fired saunas — Barrel, Box and Snug — sitting right beside the Irish Sea at Tower Bay Beach, Portrane (Eircode K36 RX92). Outdoor cold showers and plunge barrels available at all sessions. Shared and private bookings, with group discounts for 15+. Panoramic views across the Irish Sea and out to Lambay Island. One of north Dublin's finest coastal wellness experiences.",
    lat:53.4973, lng:-6.1142,
    bookingUrl:"https://www.theseasauna.ie/bookings"
  },

  // Kilkenny
  {
    id:226, city:"Kilkenny", country:"Ireland", name:"The Hideaway Sauna", area:"Kilkenny City",
    type:"both", price:"Check website", rating:4.8, reviews:28,
    hours:"Check website for current hours",
    temp:"Cold plunge pool", tags:["Sauna","Cold Plunge","Contrast Therapy","City Centre"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Check website for locker details",
    transport:"Kilkenny city centre — walkable from MacDonagh Junction",
    parking:"Kilkenny city car parks",
    desc:"A hidden gem in the heart of Kilkenny — the Medieval Mile's best-kept wellness secret. The Hideaway Sauna (Eircode R95 A0PY) offers sauna and cold plunge in Ireland's most atmospheric city, where Viking streets, medieval towers, and a castle backdrop provide a setting like no other. Book early — this intimate venue fills quickly at weekends.",
    lat:52.6541, lng:-7.2448,
    bookingUrl:"https://www.thehideawaysauna.ie"
  },

  // Galway — Kinvara / Burren edge
  {
    id:227, city:"Galway", country:"Ireland", name:"Réale Burren Sauna", area:"Moy Road, Kinvara, Co. Galway",
    type:"both", price:"From €20", rating:4.9, reviews:41,
    hours:"Book via easyweek — check website for availability",
    temp:"Bespoke cold plunge pool", tags:["Wood-fired","Outdoor","Scenic","Countryside","Lough Corrib"], emoji:"🔥🌿", open:true,
    hygiene:"A+", lockerNote:"Private changing area, shower and toilet on site",
    transport:"Drive — Moy Road, Kinvara, Co. Galway (H91 KV4H), 20 min south of Galway city",
    parking:"On-site parking at venue",
    desc:"An authentic Finnish sauna built with Scandinavian materials and a bespoke cold plunge pool at Moy Road, Kinvara, Co. Galway (H91 KV4H) — on the southern shores of Galway Bay, where the Burren limestone meets the sea. Solar-powered (16 panels + battery), private and semi-private bookings for up to 6 people. Includes changing area, shower, toilet and WiFi. From €20 for a solo non-private hour, €30 private. One of Galway's most beautiful and complete sauna experiences.",
    lat:53.1380, lng:-8.9320,
    bookingUrl:"https://booking.easyweek.ie/reale-burren-sauna"
  },

  // Wicklow
  {
    id:228, city:"Wicklow", country:"Ireland", name:"The Barrel Sauna Greystones", area:"The Boatyard, Beach Road, Greystones Harbour",
    type:"both", price:"From €10", rating:4.8, reviews:52,
    hours:"Mon–Tue 4pm–10:30pm · Wed–Thu 10am–10:30pm · Fri 7am–10:30pm · Sat–Sun 9am–10:30pm",
    temp:"Three cold plunges at variable temperatures", tags:["Finnish","Cold Plunge","Coastal","Community","Wood-fired","Harbour"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Private cubicles and lockers on site. 18+ (under 18 with guardian).",
    transport:"Greystones DART station · 5 min walk to Beach Road · 1 hr from Dublin Connolly",
    parking:"Greystones harbour car park, Beach Road (A63 R721)",
    desc:"Two 10-person wood-fired barrel saunas in a walled garden setting at Greystones Harbour — The Barrel Sauna's Wicklow location at The Boatyard, Beach Road (A63 R721). Three cold plunge options at variable temperatures. Private cubicles, lockers and showers. Sessions from €10 (Early Bird 30 min) to €20 (Slow Burn 75 min), with 10- and 20-pass bundles. The most accessible quality sauna from Dublin by DART — one hour from the city, on the Co. Wicklow coast.",
    lat:53.1410, lng:-6.0658,
    bookingUrl:"https://wunderbook.link/TBSGreyst"
  },

  {
    id:220, city:"Kerry", country:"Ireland", name:"Thalassa Seaweed Baths Ballybunion", area:"Ballybunion, Co. Kerry",
    type:"seaweed", price:"Check website", rating:4.8, reviews:64,
    hours:"Check website for current hours",
    temp:"Heated sea water & seaweed", tags:["Seaweed Bath","Seafront","Coastal","Wild Atlantic"], emoji:"🌿♨️", open:true,
    hygiene:"A", lockerNote:"Private changing room with each bath",
    transport:"Drive — Ballybunion village centre",
    parking:"Free parking at Ballybunion Ladies Beach",
    desc:"A seaweed bath experience on the Ladies Strand in Ballybunion, Kerry — one of Ireland's most storied seaside towns. Traditional private baths filled with heated Atlantic seawater and freshly harvested seaweed, carrying on the ancient Irish thalassotherapy tradition in one of the west coast's most beautiful beach settings.",
    lat:52.5087, lng:-9.6734,
    bookingUrl:"https://www.thalassaballybunion.ie"
  },
  {
    id:221, city:"Galway", country:"Ireland", name:"Wild Irish Saunas", area:"Galway Bay / West Galway",
    type:"both", price:"Check website", rating:4.8, reviews:52,
    hours:"Check website for current hours",
    temp:"Atlantic cold plunge", tags:["Wood-fired","Wild Atlantic","Outdoor","Seafront","Coastal"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Drive — West Galway coast, check booking confirmation for exact location",
    parking:"Free on-site parking",
    desc:"A mobile and location-based Finnish wood-fired sauna experience serving the wild Galway coastline. Wild Irish Saunas brings authentic Nordic sauna culture to some of Connacht's most dramatic Atlantic settings — heat up properly, then plunge into Galway Bay. Check their website for current location and booking availability.",
    lat:53.2707, lng:-9.0568,
    bookingUrl:"https://www.wildirshsaunas.ie"
  },
  {
    id:222, city:"Cork", country:"Ireland", name:"My Hot Spot Youghal", area:"Youghal, East Cork",
    type:"both", price:"Check website", rating:4.7, reviews:38,
    hours:"Check website for current hours",
    temp:"Cold plunge pool", tags:["Sauna","Cold Plunge","Coastal","Seafront"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers available on site",
    transport:"Drive — Youghal town, East Cork, 45 min from Cork city",
    parking:"Free parking at venue",
    desc:"A sauna and cold plunge venue in Youghal — the historic walled town on the Cork/Waterford border and one of Ireland's finest seaside towns. My Hot Spot brings contrast therapy to East Cork's most characterful coastal town, with a warm and community-focused atmosphere that reflects the best of the local sauna scene.",
    lat:51.9536, lng:-7.8447,
    bookingUrl:"https://www.myhotspot.ie"
  },

  // ── LONDON (NEW 2026 ADDITIONS) ──
  {
    id:229, city:"London", country:"UK", name:"Skuna Sauna Boats", area:"Canary Wharf",
    type:"both", price:"From £15pp", rating:5.0, reviews:159,
    hours:"Daily 10am–10pm",
    temp:"Rooftop cold plunge + dock water", tags:["Floating","Wood-fired","Canary Wharf","Unique","East London"], emoji:"🚢🔥", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"West India Quay (DLR) · 2 min walk",
    parking:"NCP West India Quay · 5 min",
    desc:"London's floating wood-fired sauna experience at West India Quay, Canary Wharf. Skuna's self-driving boats each carry a proper cedar sauna (up to 16 people), rooftop cold plunge and BBQ facilities — no boating experience required. Perfect for groups, celebrations, or a genuinely unique contrast therapy session on the historic dockwater.",
    lat:51.5075, lng:-0.0207,
    bookingUrl:"https://skunaboats.com"
  },
  {
    id:230, city:"London", country:"UK", name:"Saunos Canal Sauna", area:"Islington / Angel",
    type:"both", price:"From £20pp", rating:4.9, reviews:87,
    hours:"Check website for current timetable",
    temp:"2°C ice bath", tags:["Floating","Regent's Canal","Unique","Islington","Wood-fired"], emoji:"🚢🔥", open:true,
    hygiene:"A+", lockerNote:"Limited space — bring a dry bag only",
    transport:"Angel (Northern) · 15 min walk · or bus 38/56 to Packington St",
    parking:"Very limited — public transport strongly recommended",
    desc:"A Scandinavian-inspired floating sauna moored on Regent's Canal at Eagle Wharf Marina, Islington. The sauna is hand-built with lavender and lavender scent — heat to 75–95°C in a six-person cabin on a converted Dutch barge, then plunge into a 2°C stainless steel ice bath at the bow. Intimate, atmospheric and genuinely unique — one of London's most memorable wellness experiences.",
    lat:51.5328, lng:-0.0954,
    bookingUrl:"https://www.legitfit.com/p/timetable/saunoslimited"
  },
  {
    id:231, city:"London", country:"UK", name:"Lowlu Kentish Town", area:"Kentish Town",
    type:"both", price:"From £9 off-peak", rating:4.7, reviews:58,
    hours:"Daily 7am–9pm",
    temp:"3–15°C ice baths (6 options)", tags:["Finnish","Ice Bath","North London","Community","Budget"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Kentish Town (Northern) · 5 min walk",
    parking:"Street parking on Caversham Road",
    desc:"London's most affordable new sauna complex at 44 Caversham Road NW5. Five saunas ranging from 75–95°C in thermo-spruce-lined cabins and six cold plunge options from 3–15°C — more sauna-and-plunge variety than almost anywhere else in London. Off-peak from just £9, with an app-based unlimited subscription. One of London's best-value serious sauna venues, opened 2025.",
    lat:51.5519, lng:-0.1449,
    bookingUrl:"https://www.lowlu.co"
  },
  {
    id:232, city:"London", country:"UK", name:"Lowlu Wandsworth", area:"Wandsworth",
    type:"both", price:"From £9 off-peak", rating:4.8, reviews:43,
    hours:"Daily 7am–9pm",
    temp:"Cold plunge pools", tags:["Finnish","Ice Bath","South London","Community","Budget"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Wandsworth Town (rail) · 8 min walk",
    parking:"Street parking on Armoury Way",
    desc:"Lowlu's South West London location at 2 Armoury Way, Wandsworth SW18 — the same Scandinavian-inspired sauna experience as Kentish Town, with shared cold plunges, changing areas and showers, from just £9 off-peak via the Lowlu app. One of London's most accessible and affordable sauna options south of the river.",
    lat:51.4577, lng:-0.1890,
    bookingUrl:"https://www.lowlu.co"
  },
  {
    id:233, city:"London", country:"UK", name:"Reset Sauna Islington", area:"Islington / Highbury",
    type:"both", price:"Check website", rating:4.9, reviews:31,
    hours:"Check website for current hours",
    temp:"1–9°C ice baths (8 baths)", tags:["Finnish","Ice Bath","North London","Breathwork","Guided","New 2026"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"Lockers and towels provided",
    transport:"Highbury & Islington (Victoria/Overground) · 3 min walk",
    parking:"Limited street parking on Upper Street",
    desc:"Opened January 2026 at 240 Upper Street, Reset is one of London's newest and most ambitious contrast therapy venues. A 25-person charred oak Finnish sauna runs at up to 105°C — one of the hottest in London — with eight stainless steel ice baths from 1–9°C. All sessions are guided (not self-service): contrast therapy classes, expert breathwork, and alcohol-free social evenings with DJs and guest speakers. A serious wellness venue with a genuine programme.",
    lat:51.5437, lng:-0.1028,
    bookingUrl:"https://resetsauna.com"
  },
  {
    id:234, city:"London", country:"UK", name:"Innervisions Alchemy", area:"Bermondsey / South Bermondsey",
    type:"both", price:"From £8 off-peak", rating:4.8, reviews:94,
    hours:"Mon–Wed 6am–9:30pm · Thu–Fri 7am–9:30pm · Sat–Sun 8am–9:30pm",
    temp:"1°C cold plunge + ice baths", tags:["Wood-fired","Community","Budget","South London","Cold Plunge"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"South Bermondsey (rail) · 7 min walk · or Queen's Road Peckham (Overground)",
    parking:"Street parking on Rollins Street",
    desc:"A hidden South Bermondsey wellness sanctuary at Ilderton Wharf, Rollins Street SE15. Three large wood-fired saunas and three cold plunge baths (including 1°C plunges) in an industrial waterside setting. One of London's most affordable community sauna venues at from £8 off-peak. Classes, yoga, sound baths, private treatments and studio hire also on the programme.",
    lat:51.4799, lng:-0.0541,
    bookingUrl:"https://www.innervisionsalchemy.co.uk"
  },
  {
    id:235, city:"London", country:"UK", name:"Old Kent Road Sauna", area:"Old Kent Road / Peckham",
    type:"sauna", price:"£11 per session", rating:4.7, reviews:67,
    hours:"Tue–Fri 5pm–9pm · Sat 10am–8pm · Sun 10am–5pm",
    temp:"Cold shower & plunge", tags:["Finnish","Community","South London","Budget","Aufguss"], emoji:"🔥", open:true,
    hygiene:"A", lockerNote:"Lockers provided",
    transport:"Queen's Road Peckham (Overground) · 8 min walk · or bus P12",
    parking:"Street parking on Old Kent Road",
    desc:"A community Finnish sauna in the railway arches at 897a Old Kent Road SE15 — one of London's most honest and affordable sauna spaces at £11 per 1-hour session. Regular Aufguss ceremonies, private hire for groups up to 30 (from £400 for 2 hours), and a growing events programme. Simple, no-frills, and exactly what South London's Old Kent Road community needed.",
    lat:51.4832, lng:-0.0543,
    bookingUrl:"https://www.oldkentroadsauna.com"
  },
  {
    id:236, city:"London", country:"UK", name:"The Cabin Clapham Common", area:"Clapham",
    type:"both", price:"£19 per 60 min", rating:4.8, reviews:112,
    hours:"Seasonal (Oct–May) · check website for schedule",
    temp:"Cold plunge pool", tags:["Outdoor","Seasonal","Wood-fired","South London","Park"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Changing facilities on site",
    transport:"Clapham Common (Northern) · 3 min walk",
    parking:"Clapham Common car park",
    desc:"A Scandinavian sauna and cold plunge installed on Clapham Common each autumn, running October to May. Sessions are £19/hour; a 15-session pack drops it to £13.30. Located next to the water play area on the Common — an extraordinary setting for an outdoor winter sauna. Slots sell out 24–48 hours ahead in peak season, so book early.",
    lat:51.4613, lng:-0.1488,
    bookingUrl:"https://thecabinsauna.co.uk"
  },
  {
    id:237, city:"London", country:"UK", name:"Sweat Lounge Chiswick", area:"Chiswick",
    type:"sauna", price:"£35 per 30 min", rating:5.0, reviews:368,
    hours:"Check website for current hours",
    temp:"Infrared heat only", tags:["Infrared","West London","Boutique","Private Pods"], emoji:"🔥", open:true,
    hygiene:"A+", lockerNote:"Lockers provided",
    transport:"Chiswick Park (District) · 5 min walk",
    parking:"Street parking on Chiswick High Road",
    desc:"London's top-rated infrared sauna studio at 48 Chiswick High Road W4 — consistently 5-star on Google with 370+ reviews. Solo pods and premiere shared cabins with infrared light therapy, combining targeted body heat with coloured light. Unlike traditional saunas, infrared heats the body directly for a less intense but deeply therapeutic experience. Perfect for recovery, skin and detox. 20% off your first treatment.",
    lat:51.4941, lng:-0.2671,
    bookingUrl:"https://www.sweatlounge.co.uk"
  },

  // ── DUBLIN / WICKLOW (NEW ADDITIONS) ──
  {
    id:238, city:"Dublin", country:"Ireland", name:"Restore Sauna Portmarnock", area:"Portmarnock, Co. Dublin",
    type:"both", price:"From €12 per 30 min", rating:4.8, reviews:56,
    hours:"Check website / Instagram @restore_dub for current sessions",
    temp:"Irish Sea cold plunge", tags:["Wood-fired","Coastal","Outdoor","Community","Beach"], emoji:"🔥🌊", open:true,
    hygiene:"A", lockerNote:"No lockers — bring a dry bag",
    transport:"Portmarnock DART · 10 min walk to White Sands Hotel",
    parking:"White Sands Hotel car park, Coast Road, Portmarnock",
    desc:"A beautifully positioned barrel sauna in the car park of the White Sands Hotel on the Coast Road, Portmarnock — steps from the beach and a short stroll from the Irish Sea. Sessions from €12 for 30 minutes, walk-ins welcome or book via Wunderbook. A real community spirit, started by two friends — perfect to combine with a Portmarnock beach swim.",
    lat:53.4148, lng:-6.1427,
    bookingUrl:"https://wunderbook.app/d7-sauna/"
  },
  {
    id:239, city:"Dublin", country:"Ireland", name:"D7 Sauna", area:"Phibsborough, Dublin 7",
    type:"both", price:"€15 per session", rating:4.8, reviews:78,
    hours:"Wed–Fri 4pm–10pm · Sat–Sun 10am–9pm",
    temp:"Cold plunge pools", tags:["Finnish","Community","Urban","Dublin 7","Canal"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Changing facilities on site",
    transport:"Bus 9/83/122 to Phibsborough · 3 min walk · or Broadstone–DIT stop",
    parking:"Street parking on Royal Canal Bank",
    desc:"Dublin 7's dedicated sauna and cold plunge venue at Units 2&3, Royal Canal Bank, Phibsborough D07 R52H — sitting right on the banks of the Royal Canal. Sessions are €15 per person (or €10 with a membership pack); private hire for up to 10 costs €100. Wednesday to Sunday, with a welcoming community atmosphere in one of Dublin's most vibrant and up-and-coming neighbourhoods.",
    lat:53.3614, lng:-6.2763,
    bookingUrl:"https://d7sauna.ie"
  },
  {
    id:240, city:"Dublin", country:"Ireland", name:"Helios Sauna Dundrum", area:"Dundrum, Dublin 14",
    type:"both", price:"€16.95–€18.95 / 45 min", rating:4.8, reviews:134,
    hours:"Mon–Sun 8am–10pm",
    temp:"Communal ice bath + cold plunge barrels", tags:["Finnish","Ice Bath","South Dublin","Dundrum","Community"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Changing facilities on site",
    transport:"Dundrum (Luas Green) · 2 min walk",
    parking:"Dundrum Village Centre paid car park · 1 min",
    desc:"Helios Sauna's Dundrum village location at 4 Main Street, Dundrum, Dublin 14 D14 V977 — a short stroll from the Luas Green Line. Two saunas (one communal, one intimate two-person cabin), a communal ice bath, cold plunge barrels and an outdoor wood-fired hot tub. Coffee and drinks also served. Off-peak €16.95 (Mon–Fri 8am–5pm), peak €18.95. One of south Dublin's most popular wellness stops.",
    lat:53.2899, lng:-6.2436,
    bookingUrl:"https://heliossauna.ie/products/dundrum"
  },
  {
    id:241, city:"Dublin", country:"Ireland", name:"The Mindful Yard", area:"The Liberties, Dublin 8",
    type:"both", price:"From €10", rating:4.9, reviews:89,
    hours:"Evening sessions · check website for days and times",
    temp:"Cold shower / cold plunge", tags:["Wood-fired","Community","Urban","The Liberties","Dublin 8"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Changing facilities on site",
    transport:"Bus 123/151/77A to The Liberties · 3 min walk",
    parking:"Street parking in The Liberties",
    desc:"A wood-fired sauna tucked into Crostick Alley in the heart of Dublin's historic Liberties district — one of the city's oldest and most characterful neighbourhoods. Evening sessions in an intimate, community-focused setting with cold plunge. Monday deal: 2 people for €20. The Liberties setting — with its distilleries, markets and community spirit — makes this one of Dublin's most uniquely located sauna experiences.",
    lat:53.3383, lng:-6.2804,
    bookingUrl:"https://mindfulyard.ie"
  },

  // ── LONDON (NEW ADDITIONS ids 242–261) ──
  {
    id:242, city:"London", country:"UK", name:"Raffles London at The OWO", area:"Whitehall / St James's",
    type:"sauna", price:"From £185 per session", rating:4.8, reviews:67,
    hours:"Spa daily 10am–7pm · Gym 24hr for residents",
    temp:"Steam room · vitality pool · 20m pool", tags:["Luxury","Hotel Spa","Central London","Guerlain"], emoji:"🏊", open:true,
    hygiene:"A+", lockerNote:"Full spa changing suites provided",
    transport:"Westminster (Jubilee/District/Circle) · 3 min walk · St James's Park (District/Circle) · 5 min walk",
    parking:"NCP Trafalgar Square · 5 min walk",
    desc:"The Guerlain Spa at Raffles London at The OWO occupies 27,000 sq ft across four floors of the landmark Old War Office building on Whitehall SW1A 2BX. Facilities include a 20-metre indoor swimming pool, vitality pool, sauna, steam room, experience showers, and a state-of-the-art movement studio. Day guests are welcome alongside hotel residents and Pillar Wellbeing members. One of London's most spectacular spa addresses — inside a Edwardian baroque building steeped in Churchill-era history.",
    lat:51.5025, lng:-0.1267,
    bookingUrl:"https://www.raffles.com/london/guerlain-spa/"
  },
  {
    id:243, city:"London", country:"UK", name:"Oasis Sports Centre Holborn", area:"Covent Garden / Holborn",
    type:"sauna", price:"From £4.55 with swim", rating:4.3, reviews:148,
    hours:"Mon–Fri 6:30am–9pm · Sat–Sun 9:30am–6pm",
    temp:"Dry sauna", tags:["Public Leisure","Budget","Outdoor Pool","Central London"], emoji:"🔥", open:true,
    hygiene:"B+", lockerNote:"Coin-operated lockers (£1 refundable)",
    transport:"Holborn (Central/Piccadilly) · 3 min walk · Covent Garden (Piccadilly) · 5 min walk",
    parking:"NCP Parker Street · 3 min walk",
    desc:"A beloved central London institution at 32 Endell Street WC2H 9AG — home to London's only heated outdoor swimming pool and a poolside sauna. Operated by Better, the sauna is free with your swim entry (from £4.55). The sun terrace alongside the heated outdoor pool creates an unexpectedly continental feel in the heart of Covent Garden. A true central London gem that has been serving the community for decades — affordable, historic and completely unpretentious.",
    lat:51.5151, lng:-0.1261,
    bookingUrl:"https://www.better.org.uk/leisure-centre/london/camden/oasis-sports-centre"
  },
  {
    id:244, city:"London", country:"UK", name:"NYX Hotel London Holborn — Rena Spa", area:"Holborn",
    type:"sauna", price:"From £20 day pass", rating:4.2, reviews:89,
    hours:"Mon–Fri 7am–8:30pm · Sat–Sun 7am–6:30pm",
    temp:"Dry sauna · steam room · spa pool", tags:["Hotel Spa","Central London","Pool"], emoji:"🏊", open:true,
    hygiene:"A", lockerNote:"Full changing facilities and lockers",
    transport:"Holborn (Central/Piccadilly) · 5 min walk · Russell Square (Piccadilly) · 4 min walk",
    parking:"NCP Bloomsbury Square · 5 min walk",
    desc:"Rena Spa at NYX Hotel London Holborn, 50–60 Southampton Row WC1B 4AR — a five-star hotel spa open to non-residents. Facilities include a 13-metre Greco-Roman styled indoor pool, sauna, steam room, and a full gym. Treatments from Caudalie available alongside the spa facilities. The hotel opened in 2021 and offers a sophisticated urban wellness experience in the heart of Bloomsbury — well-priced for a central London hotel spa.",
    lat:51.5218, lng:-0.1213,
    bookingUrl:"https://renaspa.co.uk/nyx-hotel-london-holborn/"
  },
  {
    id:245, city:"London", country:"UK", name:"AIRE Ancient Baths London", area:"Covent Garden / Embankment",
    type:"sauna", price:"From £120 per person (90 min)", rating:4.7, reviews:312,
    hours:"Mon–Thu 9am–10pm · Fri 9am–11pm · Sat–Sun 8am–11pm",
    temp:"Multiple thermal pools 15°C–40°C", tags:["Luxury","Historic","Thermal Pools","Central London","Couples"], emoji:"🏊", open:true,
    hygiene:"A+", lockerNote:"Lockers and robes provided",
    transport:"Embankment (Circle/District/Bakerloo/Northern) · 3 min walk · Charing Cross (Northern/Bakerloo) · 5 min walk",
    parking:"NCP Villiers Street · 2 min walk",
    desc:"AIRE Ancient Baths London at 2–3 Robert Street WC2N 6BH brings the Roman, Greek and Ottoman bathing ritual to the heart of the West End. A subterranean thermal journey through pools at different temperatures — from icy cold to steaming hot — in an atmospheric candlelit setting near Embankment. The 90-minute Bath Experience is £120 per person; the Ultimate Bath is £140 including a DIY ritual kit. No children, no phones — just complete sensory immersion. One of London's most unique and indulgent experiences.",
    lat:51.5084, lng:-0.1236,
    bookingUrl:"https://beaire.com/en/aire-ancient-baths-london"
  },
  {
    id:246, city:"London", country:"UK", name:"The Bath House Belgravia", area:"Belgravia / Victoria",
    type:"both", price:"From £115 per session", rating:4.6, reviews:134,
    hours:"Mon–Sat 10am–11pm · Sun 10am–10pm",
    temp:"Steam room (banya) · ice plunge", tags:["Russian Banya","Belgravia","Luxury","Parenie"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Full changing facilities; towel and robe provided",
    transport:"Victoria (Victoria/Circle/District) · 6 min walk · Sloane Square (Circle/District) · 8 min walk",
    parking:"NCP Victoria · 5 min walk",
    desc:"London's most acclaimed authentic Russian banya at 1 Grosvenor Gardens SW1W 0BD — housed in a historic bank building opposite Buckingham Palace Gardens. The centrepiece is the traditional steam room (banya) with a leaf-whacking parenie ritual, ice plunge pool, and a relaxation lounge. Banya Classic from £115 (3 hours + one treatment); Banya Premium from £155 (3 hours + two treatments + parenie). Men-only Tuesdays, women-only Thursdays; mixed on all other days. An authentic taste of Eastern European wellness culture in the heart of Belgravia.",
    lat:51.4971, lng:-0.1490,
    bookingUrl:"https://banyalondon.co.uk"
  },
  {
    id:247, city:"London", country:"UK", name:"Shoreditch and Soul", area:"Shoreditch / East London",
    type:"both", price:"From £99/month membership · day passes available", rating:4.7, reviews:98,
    hours:"Check website for current session times",
    temp:"Dry heat sauna · cold plunge", tags:["Community","East London","Unique","Members Club","Plant-Based"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Lockers and changing facilities on site",
    transport:"Shoreditch High Street (Overground) · 4 min walk · Bethnal Green (Central) · 8 min walk",
    parking:"Street parking on Brick Lane area",
    desc:"A pioneering social wellness space at 114 Cheshire Street E2 6EJ — the UK's first venue to combine a 40-person communal sauna with an alcohol-free bar, plant-based café and urban co-living in a former Victorian textile warehouse. Memberships from £99/month. The sauna holds 40 people, creating genuine social energy, while the plant-based kitchen and zero-proof cocktail bar complete the wellness ecosystem. Day passes available for non-members. Unique, values-driven and utterly East London in spirit.",
    lat:51.5248, lng:-0.0721,
    bookingUrl:"https://andsoul.com/locations/shoreditch/the-sanctuary"
  },
  {
    id:248, city:"London", country:"UK", name:"Whitechapel Sports Centre Sauna", area:"Whitechapel / Tower Hamlets",
    type:"sauna", price:"From £8 · included with Be Well membership", rating:4.2, reviews:34,
    hours:"Check be-well.org.uk for current timetable",
    temp:"Aspen wood dry sauna", tags:["Public Leisure","Budget","East London","New 2026"], emoji:"🔥", open:true,
    hygiene:"A", lockerNote:"Separate male and female sauna with changing rooms",
    transport:"Whitechapel (District/Hammersmith & City/Elizabeth/Overground) · 4 min walk",
    parking:"Limited street parking on Durward Street",
    desc:"Brand-new bespoke aspen wood saunas opened January 2026 at Whitechapel Sports Centre, 55 Durward Street E1 5BA — a £80,000 Tower Hamlets Council investment. Two dedicated sauna rooms (one in male, one in female changing areas) offering dry heat sessions at community prices from £8. Women-only slots available. The newest public sauna addition to East London, bringing high-quality Scandinavian-style aspen wood sauna facilities to one of London's most diverse neighbourhoods.",
    lat:51.5196, lng:-0.0604,
    bookingUrl:"https://be-well.org.uk/centres/whitechapel-sports-centre/"
  },
  {
    id:249, city:"London", country:"UK", name:"Waking Dreams Bethnal Green", area:"Bethnal Green / East London",
    type:"both", price:"£19 per 55-min session · Intro: 2 for £20", rating:4.8, reviews:76,
    hours:"Check website for session times",
    temp:"Nordic dry heat 85–95°C · cold plunge", tags:["Nordic","East London","Boutique","Yoga"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Changing facilities and showers on site",
    transport:"Bethnal Green (Central) · 3 min walk",
    parking:"Street parking on Birkbeck Street area",
    desc:"A Nordic-inspired sauna and yoga studio at 1 Birkbeck Street E2, Bethnal Green — one of East London's most thoughtfully designed wellness spaces. Traditional dry heat saunas run at 85–95°C in a serene, carefully curated environment. Sessions are 55 minutes and accommodate up to 4 people per sauna. An intro offer of 2 sessions for £20 makes it one of the best-value sauna debuts in London. Combined yoga and breathwork classes also available — part of the same mindful ecosystem.",
    lat:51.5270, lng:-0.0594,
    bookingUrl:"https://www.wakingdreams.co/sauna"
  },
  {
    id:250, city:"London", country:"UK", name:"Community Sauna Baths Bermondsey", area:"Bermondsey / South London",
    type:"both", price:"From £9.50 per hour", rating:4.6, reviews:88,
    hours:"Check community-sauna.co.uk for current schedule",
    temp:"Wood-fired sauna · cold plunge", tags:["Community","Budget","Wood-fired","South London","Not-for-profit"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Changing facilities and cold plunge on site",
    transport:"South Bermondsey (Overground) · 5 min walk · Queen's Road Peckham (Overground) · 8 min walk",
    parking:"Street parking on Rollins Street",
    desc:"Community Sauna Baths' Bermondsey outpost at Ilderton Wharf, Rollins Street SE15 1EP — a not-for-profit Community Interest Company bringing affordable wood-fired bathing to South London. Outdoor wood-fired saunas, cold plunge pools, and a community-focused atmosphere at prices from £9.50/hour (peak from £11), with concessions from £5 for students, NHS staff and low-income visitors. Part of the same network as Hackney Wick, Peckham, Stratford and Camberwell — a genuine community asset.",
    lat:51.4748, lng:-0.0514,
    bookingUrl:"https://www.community-sauna.co.uk/book"
  },
  {
    id:251, city:"London", country:"UK", name:"Swiss Cottage Leisure Centre Sauna", area:"Swiss Cottage / Camden",
    type:"sauna", price:"Included with swim / membership · from £5.50", rating:4.1, reviews:67,
    hours:"Mon–Fri 6:30am–10pm · Sat–Sun 8am–8pm · check better.org.uk",
    temp:"Dry sauna · steam room", tags:["Public Leisure","Budget","North London","Camden"], emoji:"🔥", open:true,
    hygiene:"B+", lockerNote:"Coin-operated lockers available",
    transport:"Swiss Cottage (Jubilee) · 3 min walk · Finchley Road (Jubilee/Metropolitan) · 5 min walk",
    parking:"Q-Park Swiss Cottage · 3 min walk",
    desc:"Swiss Cottage Leisure Centre at 4a Adelaide Road NW3 3NF — a well-equipped Better-run public leisure centre with sauna and steam rooms in both male and female changing areas. Part of the swimming and gym facilities, the health suite is included with swim entry or gym membership at budget prices. A reliable, affordable option for North London wellness, located steps from Swiss Cottage Tube — ideal if you want honest, no-frills sauna access in NW3.",
    lat:51.5432, lng:-0.1757,
    bookingUrl:"https://www.better.org.uk/leisure-centre/london/camden/swiss-cottage-leisure-centre"
  },
  {
    id:252, city:"London", country:"UK", name:"Highbury Leisure Centre Sauna", area:"Highbury / Islington",
    type:"sauna", price:"Included with swim or gym · from £5.10", rating:4.2, reviews:55,
    hours:"Mon–Fri 6:30am–10pm · Sat 7:30am–7:30pm · Sun 7:30am–10pm",
    temp:"Dry sauna · steam room", tags:["Public Leisure","Budget","North London","Islington"], emoji:"🔥", open:true,
    hygiene:"B+", lockerNote:"Lockers in changing rooms",
    transport:"Highbury & Islington (Victoria/Overground) · 5 min walk · Arsenal (Piccadilly) · 6 min walk",
    parking:"Limited street parking on Highbury Crescent",
    desc:"Highbury Leisure Centre at Highbury Crescent N5 1RR — a Better-run leisure facility with sauna and steam rooms available alongside the swimming pool and gym. The health suite provides dry sauna and steam room access included with swim or gym entry. Conveniently located moments from Highbury & Islington station and Arsenal Stadium — a solid, affordable North London sauna option for residents and visitors to N5.",
    lat:51.5515, lng:-0.1016,
    bookingUrl:"https://www.better.org.uk/leisure-centre/london/islington/highbury"
  },
  {
    id:253, city:"London", country:"UK", name:"Sauna Social Club Brixton", area:"Brixton / South London",
    type:"both", price:"From £11 per hour", rating:4.6, reviews:92,
    hours:"Check saunasocialclub.co.uk for current schedule",
    temp:"Wood-fired outdoor sauna · cold plunge", tags:["Rooftop","Wood-fired","Community","South London","Pop Brixton"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Changing facilities at Pop Brixton",
    transport:"Brixton (Victoria) · 3 min walk",
    parking:"Street parking on Brixton Station Road",
    desc:"Sauna Social Club's Brixton location at Pop Brixton, 49 Brixton Station Road SW9 8PQ — a rooftop wood-fired sauna in one of South London's most vibrant creative hubs. Sister venue to the original Peckham location, the Brixton outpost brings the same community-first, not-for-profit ethos to SW9. Wood-fired heat, outdoor cold plunge, and a rotating events programme including sound baths, breathwork and community gatherings. From £11 per session — affordable and social.",
    lat:51.4618, lng:-0.1143,
    bookingUrl:"https://www.saunasocialclub.co.uk"
  },
  {
    id:254, city:"London", country:"UK", name:"Putney Recovery Room", area:"Putney / West London",
    type:"both", price:"From £15 per person (20-min Express)", rating:4.8, reviews:62,
    hours:"Check putneyrecovery.com for current session times",
    temp:"Finnish sauna 85–90°C · MONK ice bath 3–5°C", tags:["Boutique","Private","West London","Breathwork","Recovery"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"Fresh towels, showers and changing facilities included",
    transport:"East Putney (District) · 8 min walk · Putney (Overground) · 10 min walk",
    parking:"Street parking on Carlton Drive",
    desc:"Putney Recovery Room at Unit D, Bowery Building, 27a Carlton Drive SW15 2BS — West London's dedicated contrast therapy studio combining a traditional Finnish sauna (85–90°C) with a MONK cold plunge ice bath (3–5°C). Sessions capped at 4 people for a calm, personalised experience: 20-min Express £10pp, 40-min Standard Reset £20pp, 60-min Deep Immersion £30pp. Private hire from £55. Intro offer: 3 sessions for £45. Movement classes and breathwork also available. One of the most thoughtfully designed recovery spaces in South West London.",
    lat:51.4583, lng:-0.2154,
    bookingUrl:"https://www.putneyrecovery.com"
  },
  {
    id:255, city:"London", country:"UK", name:"Brixton Recreation Centre Wellness Suite", area:"Brixton / South London",
    type:"sauna", price:"From £8.15", rating:4.3, reviews:78,
    hours:"Mon–Fri 6am–10pm · Sat–Sun 8am–6pm",
    temp:"Sauna · steam · infrared sauna · spa garden", tags:["Public Leisure","Budget","South London","Council","Infrared"], emoji:"🔥", open:true,
    hygiene:"B+", lockerNote:"Lockers in changing rooms on 6th floor",
    transport:"Brixton (Victoria) · 3 min walk",
    parking:"NCP Brixton · 5 min walk",
    desc:"The Active Lambeth Wellness Suite at Brixton Recreation Centre, 27 Brixton Station Road SW9 8QQ — a council-run spa facility on the 6th floor featuring a traditional sauna, steam room, infrared sauna, and a tranquil outdoor spa garden. One of the most comprehensive public wellness suites in South London at just £8.15 a session. Recently upgraded with new infrared saunas, the suite serves Brixton's diverse community with affordable access to thermal bathing and relaxation in the heart of SW9.",
    lat:51.4619, lng:-0.1153,
    bookingUrl:"https://active.lambeth.gov.uk/facilities/wellness-suite/"
  },
  {
    id:256, city:"London", country:"UK", name:"Yard Sauna Richmond", area:"Ham / Richmond",
    type:"both", price:"£20 per 50 min", rating:4.8, reviews:47,
    hours:"Fri–Sun only · check yardsauna.co.uk for current sessions",
    temp:"Wood-fired · cold plunge · fire pit", tags:["Wood-fired","Outdoor","West London","Unique","Private"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Outdoor changing area; bring your own towel",
    transport:"Twickenham (Overground) · 20 min walk / cycle · Bus 371 to Ham",
    parking:"Ham House car park · 3 min walk",
    desc:"A hand-built wood-fired horsebox sauna nestled in the historic stable yard at Ham House Stables, Ham Street, Richmond TW10 7RS — one of London's most unique and picturesque sauna locations. Maximum 6 people per session create an intimate atmosphere; a cold plunge and open fire pit complete the Nordic experience. Weekend-only sessions (Fri–Sun) at £20 per 50 minutes. Located beside the National Trust's Ham House and the Thames — a genuine countryside-in-the-city escape in South West London.",
    lat:51.4431, lng:-0.3117,
    bookingUrl:"https://www.yardsauna.co.uk"
  },
  {
    id:257, city:"London", country:"UK", name:"Little Healing Ealing", area:"Northfields / Ealing",
    type:"both", price:"From £12 per 45-min session", rating:4.7, reviews:38,
    hours:"Check littlehealing.co.uk for current availability",
    temp:"Sauna · ice bath · cold shower", tags:["Private","Boutique","West London","Residential","Intimate"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Private changing facilities; max 4 people",
    transport:"Northfields (Piccadilly) · 5 min walk",
    parking:"Street parking on Julien Road",
    desc:"Little Healing at 1 New Mount Court, Julien Road W5 4XA — a private residential sauna and ice bath studio in Northfields, Ealing. Each 45-minute session (max 4 people) gives you exclusive access to the sauna, ice bath, cold shower and changing facilities from just £12. Monthly memberships and bundle packs available for regulars. An intimate, residential setting that feels a world away from commercial gym spas — perfect for those wanting a quiet, unhurried contrast therapy session in West London.",
    lat:51.4992, lng:-0.3213,
    bookingUrl:"https://www.littlehealing.co.uk"
  },
  {
    id:258, city:"London", country:"UK", name:"Rebase Recovery Marylebone", area:"Marylebone / West End",
    type:"both", price:"From £40 per session", rating:4.8, reviews:84,
    hours:"Mon–Fri 6:30am–9pm · Sat–Sun 8am–6pm · check rebaserecovery.com",
    temp:"Traditional & infrared sauna · ice baths", tags:["Luxury","Marylebone","West London","Recovery","Cryotherapy"], emoji:"🔥🧊", open:true,
    hygiene:"A+", lockerNote:"Full changing facilities and towels provided",
    transport:"Baker Street (Jubilee/Metropolitan/Circle/Bakerloo/Hammersmith & City) · 5 min walk · Bond Street (Central/Jubilee) · 8 min walk",
    parking:"NCP Portman Square · 5 min walk",
    desc:"Rebase Recovery at 1a St Vincent Street W1U 4DA — a luxury wellness studio in the heart of Marylebone offering traditional and infrared saunas, ice baths, cryotherapy (−110°C Powercab chamber), breathwork, yoga, and contrast therapy classes. Founded by wellness expert Alex Rebeiz and former British Sabre Fencing Team member Waldo Ramsay. Private sauna and ice bath rooms bookable by the hour. One of London's most comprehensive high-performance recovery studios — combining cutting-edge technology with ancient thermal rituals.",
    lat:51.5193, lng:-0.1566,
    bookingUrl:"https://www.rebaserecovery.com"
  },
  {
    id:259, city:"London", country:"UK", name:"Community Sauna Baths Clapham", area:"Clapham / South London",
    type:"both", price:"From £9.50 per hour", rating:4.6, reviews:45,
    hours:"Check community-sauna.co.uk for current schedule",
    temp:"Wood-fired sauna · cold plunge", tags:["Community","Budget","Wood-fired","South London","Not-for-profit"], emoji:"🔥🧊", open:true,
    hygiene:"A", lockerNote:"Changing facilities and cold plunge on site",
    transport:"Clapham South (Northern) or Clapham Common (Northern) · check location for nearest stop",
    parking:"Street parking in Clapham area",
    desc:"Community Sauna Baths' Clapham location — the not-for-profit CIC expanding its network of outdoor wood-fired saunas across London, bringing the same affordable, inclusive ethos that has made their Hackney Wick, Peckham, Stratford, Walthamstow and Camberwell sites so beloved. Wood-fired heat, cold plunge pools, and a genuine community atmosphere at prices from £9.50/hour, with concessions from £5 for students, NHS staff and low-income visitors. Check community-sauna.co.uk for current location and booking details.",
    lat:51.4613, lng:-0.1481,
    bookingUrl:"https://www.community-sauna.co.uk/book"
  },
  {
    id:260, city:"London", country:"UK", name:"St Pancras Spa", area:"King's Cross / St Pancras",
    type:"sauna", price:"From £75 for facility access (4 hrs)", rating:4.5, reviews:134,
    hours:"Facility access Mon–Thu 10am–4pm · Treatments by appointment",
    temp:"Sauna · steam room · relaxation pool · hydro loungers", tags:["Luxury","Hotel Spa","Historic","Central London","Victorian"], emoji:"🏊", open:true,
    hygiene:"A+", lockerNote:"Full spa changing suites and robes provided",
    transport:"King's Cross St Pancras (Victoria/Northern/Piccadilly/Circle/H&C/Met/Elizabeth/Overground) · 3 min walk",
    parking:"NCP King's Cross · 5 min walk",
    desc:"St Pancras Spa at the magnificent St Pancras Renaissance Hotel, Euston Road NW1 2AR — a truly historic spa experience within one of London's most iconic Victorian Gothic buildings. The spa features a relaxation pool, hydro loungers, sauna, steam room, and six treatment rooms including a couple's suite. Four-hour facility-only access available Mon–Thu for non-residents. A 60-minute minimum treatment is required for full spa use outside facility sessions. One of London's most atmospheric spa environments — Hogwarts-meets-wellness in the heart of King's Cross.",
    lat:51.5296, lng:-0.1237,
    bookingUrl:"https://www.stpancras-spa.com"
  },
  {
    id:261, city:"London", country:"UK", name:"Tooting Leisure Centre Sauna", area:"Tooting / South London",
    type:"sauna", price:"Included with swim or gym · from £5.10", rating:4.1, reviews:62,
    hours:"Mon–Fri 6:30am–10pm · Sat–Sun 8am–8pm · check website",
    temp:"Dry sauna · steam room", tags:["Public Leisure","Budget","South London","Pool"], emoji:"🔥", open:true,
    hygiene:"B+", lockerNote:"Coin lockers in changing rooms",
    transport:"Tooting Broadway (Northern) · 5 min walk",
    parking:"Greaves Place car park adjacent",
    desc:"Tooting Leisure Centre at Greaves Place SW17 0NE — a well-used South London community leisure centre with sauna and steam room facilities included with swim or gym entry. Run by Places Leisure, the centre features a 33-metre swimming pool, health suite with sauna and steam, and a full gym. Budget-friendly and community-focused in the heart of Tooting — ideal for SW17 residents who want no-fuss sauna access after a swim in one of South London's busiest public pools.",
    lat:51.4269, lng:-0.1673,
    bookingUrl:"https://www.placesleisure.org/centres/tooting-leisure-centre/"
  },

  // ── Northern Ireland ──────────────────────────────────────────────────────
  {
    id:262, city:"Craigavon", country:"Northern Ireland", name:"Hot Rocks Sauna",
    area:"Oxford Island, Lough Neagh, Lurgan BT67 0DJ", type:"sauna", price:"From £20 per session · book online",
    rating:4.6, reviews:24,
    hours:"Weekends and select weekdays · check website for availability",
    temp:"Wood-fired · 80–90°C", tags:["Outdoor","Wood-fired","Lough","Scenic","Groups"], emoji:"🔥", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel and swimwear",
    transport:"Car recommended — no direct public transport to Oxford Island",
    parking:"Free car park at Oxford Island Discovery Centre",
    desc:"Hot Rocks Sauna at Oxford Island on the shores of Lough Neagh — one of Northern Ireland's finest outdoor sauna experiences with panoramic lough views. Wood-fired heat followed by a wild dip in Lough Neagh, the largest freshwater lake in the British Isles. A tranquil and spectacular setting in the heart of Northern Ireland. Book in advance via the website.",
    lat:54.4938, lng:-6.2682,
    bookingUrl:"https://www.hotrocksni.com/"
  },
  {
    id:263, city:"Ballymena", country:"Northern Ireland", name:"JD Gyms Ballymena",
    area:"Ballymena Retail Park, Ballymena BT42 3HB", type:"sauna", price:"Day pass from £5 · or membership",
    rating:3.9, reviews:310,
    hours:"Mon–Fri 6am–10pm · Sat–Sun 8am–8pm",
    temp:"Dry sauna · steam room", tags:["Gym Sauna","Budget","Public Leisure"], emoji:"🔥", open:true,
    hygiene:"B+", lockerNote:"Lockers in changing rooms",
    transport:"Bus routes to Ballymena town centre · 10 min walk",
    parking:"Free parking at retail park",
    desc:"JD Gyms Ballymena at the retail park — a large budget gym with sauna and steam room included with membership or a low-cost day pass. Excellent value for sauna access in the Ballymena area. Clean, well-maintained facilities in a modern gym environment.",
    lat:54.8642, lng:-6.2716,
    bookingUrl:"https://www.jdgyms.co.uk/gym/ballymena/"
  },
  {
    id:264, city:"Limavady", country:"Northern Ireland", name:"HotBox Benone",
    area:"Benone Tourist Complex, 53 Benone Avenue, Limavady BT49 0LQ", type:"sauna", price:"From £25 per person · book online",
    rating:4.7, reviews:41,
    hours:"Weekends · seasonal · check website for availability",
    temp:"Wood-fired barrel sauna · 80–90°C", tags:["Outdoor","Barrel Sauna","Beach","Coastal","Groups"], emoji:"🔥", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel and swimwear",
    transport:"Car recommended — Benone Beach is on the rural Causeway Coast",
    parking:"Benone Tourist Complex car park on site",
    desc:"HotBox Benone — a wood-fired barrel sauna at award-winning Benone Beach on Northern Ireland's Causeway Coastal Route. Positioned on one of Ireland's finest Blue Flag beaches with views across the Atlantic, this is an exceptional coastal sauna experience. Cold plunge in the Atlantic after your session. Seasonal availability — book well in advance.",
    lat:55.1539, lng:-6.9327,
    bookingUrl:"https://hotboxni.com/"
  },
  {
    id:265, city:"Portstewart", country:"Northern Ireland", name:"Sauna & Sea Portstewart",
    area:"Portstewart Strand, Portstewart BT55 7PG", type:"sauna", price:"From £20 per person · check website",
    rating:4.8, reviews:36,
    hours:"Select weekends and seasonal dates · check website",
    temp:"Wood-fired sauna · 75–90°C", tags:["Outdoor","Wood-fired","Coastal","Wild Swimming","Scenic"], emoji:"🔥", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel and swimwear",
    transport:"Car recommended — National Trust car park at Portstewart Strand",
    parking:"National Trust car park at Portstewart Strand (charge applies)",
    desc:"Sauna & Sea at Portstewart Strand — a spectacular outdoor sauna on one of Northern Ireland's most beautiful National Trust beaches. Wood-fired heat followed by a sea plunge into the Atlantic on the Causeway Coast. Limited sessions available — book ahead. One of the most scenic sauna experiences in Ireland.",
    lat:55.1854, lng:-6.7088,
    bookingUrl:"https://www.saunaandsea.co.uk/"
  },
  {
    id:266, city:"Belfast", country:"Northern Ireland", name:"Spa Experience Belfast",
    area:"Kennedy Centre, Falls Road, Belfast BT12 6HR", type:"sauna", price:"From £15 · day spa packages available",
    rating:4.0, reviews:187,
    hours:"Mon–Sat 9am–9pm · Sun 10am–6pm",
    temp:"Dry sauna · steam room · hydrotherapy", tags:["Day Spa","Couples","Pool","Steam","West Belfast"], emoji:"💆", open:true,
    hygiene:"A", lockerNote:"Lockers included with entry",
    transport:"Multiple bus routes to Kennedy Centre from city centre",
    parking:"Kennedy Centre car park",
    desc:"Spa Experience Belfast at Kennedy Centre on the Falls Road — a full day spa with sauna, steam room, hydrotherapy pool and relaxation facilities. Offers affordable spa access in West Belfast, popular for spa days, couples' sessions and birthday experiences. Good range of day pass and package options.",
    lat:54.5789, lng:-5.9583,
    bookingUrl:"https://spaexperience.co.uk/"
  },
  {
    id:267, city:"Belfast", country:"Northern Ireland", name:"JD Gyms Belfast",
    area:"North Street, Belfast BT14 7DU", type:"sauna", price:"Day pass from £5 · or membership",
    rating:3.8, reviews:456,
    hours:"Mon–Fri 5:30am–11pm · Sat–Sun 7am–9pm",
    temp:"Dry sauna · steam room", tags:["Gym Sauna","Budget","City Centre","North Belfast"], emoji:"🔥", open:true,
    hygiene:"B", lockerNote:"Lockers in changing rooms — padlock recommended",
    transport:"Multiple bus routes · short walk from Belfast city centre",
    parking:"NCP car parks nearby",
    desc:"JD Gyms Belfast — a large budget gym in North Belfast with sauna and steam room included in gym access. Excellent value for sauna access in the city, with a day pass available for non-members. Modern facilities in a high-footfall location near Belfast city centre.",
    lat:54.6064, lng:-5.9727,
    bookingUrl:"https://www.jdgyms.co.uk/gym/belfast/"
  },
  {
    id:268, city:"Belfast", country:"Northern Ireland", name:"Redbarn Cavehill",
    area:"Cavehill Road, Belfast BT15 5FB", type:"sauna", price:"From £25 per person · book online",
    rating:4.7, reviews:52,
    hours:"Select days · check website for availability",
    temp:"Wood-fired sauna · 80–90°C", tags:["Outdoor","Wood-fired","Scenic","Nature","Cave Hill","Groups"], emoji:"🔥", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel",
    transport:"Buses to Cavehill Road from Belfast city centre",
    parking:"On-site parking available",
    desc:"Redbarn Cavehill — a private wood-fired outdoor sauna experience at the foot of Belfast's iconic Cave Hill. A stunning natural backdrop for a traditional Finnish-style sauna session, set in a private rural spot on the edge of the city with open countryside views. Advance booking essential.",
    lat:54.6364, lng:-5.9476,
    bookingUrl:"https://redbarnni.com/"
  },
  {
    id:269, city:"Rostrevor", country:"Northern Ireland", name:"Revive Saunas Rostrevor",
    area:"Rostrevor, County Down BT34 3DP", type:"sauna", price:"From £25 per person · book online",
    rating:4.8, reviews:34,
    hours:"Weekends and select weekdays · check website",
    temp:"Wood-fired sauna · 75–90°C", tags:["Outdoor","Wood-fired","Scenic","Mourne Mountains","Groups"], emoji:"🔥", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel and swimwear",
    transport:"Car recommended — Rostrevor village is rural",
    parking:"On-site parking",
    desc:"Revive Saunas in the picturesque village of Rostrevor at the foot of the Mourne Mountains — a beautiful outdoor wood-fired sauna experience in one of Northern Ireland's most scenic areas. Cold plunge facilities available. Ideal for groups and couples seeking a nature sauna experience in the Mournes AONB.",
    lat:54.1033, lng:-6.2049,
    bookingUrl:"https://revivesaunasni.com/"
  },
  {
    id:270, city:"Holywood", country:"Northern Ireland", name:"Bannatyne Health Club Holywood",
    area:"Kinnegar Retail Park, Shore Road, Holywood BT18 9QY", type:"sauna", price:"Day pass from £15 · membership from £25/month",
    rating:4.1, reviews:203,
    hours:"Mon–Fri 6am–10pm · Sat–Sun 7am–9pm",
    temp:"Dry sauna · steam room · jacuzzi", tags:["Gym Sauna","Pool","Spa","Couples","Day Pass"], emoji:"💆", open:true,
    hygiene:"A", lockerNote:"Secure lockers included",
    transport:"Holywood train station 5 min walk · Belfast–Bangor line",
    parking:"Free car park at retail park",
    desc:"Bannatyne Health Club Holywood at Kinnegar Retail Park — a premium health club with sauna, steam room, jacuzzi and 20-metre swimming pool. Day passes available for non-members. Conveniently close to Holywood town centre and train station on the Belfast–Bangor line. A polished mid-range spa and gym option on the north side of Belfast Lough.",
    lat:54.6376, lng:-5.8231,
    bookingUrl:"https://www.bannatyne.co.uk/health-club/holywood"
  },
  {
    id:271, city:"Bangor", country:"Northern Ireland", name:"Sudor Club 24",
    area:"Bangor, County Down BT19 7AG", type:"both", price:"From £25 per person · private bookings",
    rating:4.8, reviews:29,
    hours:"By booking only · check website",
    temp:"Wood-fired sauna · cold plunge · 80–90°C", tags:["Outdoor","Wood-fired","Cold Plunge","Private","Groups","Couples"], emoji:"🔥", open:true,
    hygiene:"A", lockerNote:"Private facility — bring your own towel and swimwear",
    transport:"Car recommended",
    parking:"On-site parking",
    desc:"Sudor Club 24 in Bangor — a private outdoor wood-fired sauna and cold plunge experience run by the Sudor sauna collective. Intimate, bespoke sessions in a beautiful County Down setting. Private bookings for groups and couples. Part of the Sudor family of outdoor sauna experiences across the Ards Peninsula.",
    lat:54.6464, lng:-5.6802,
    bookingUrl:"https://www.sudoroutdoorsaunas.com/"
  },
  {
    id:272, city:"Bangor", country:"Northern Ireland", name:"Sudor Quarries Farm",
    area:"Quarries Farm, Bangor, County Down BT19 7PX", type:"both", price:"From £25 per person · book online",
    rating:4.9, reviews:41,
    hours:"By booking only · check website",
    temp:"Wood-fired sauna · cold plunge · 80–90°C", tags:["Outdoor","Wood-fired","Cold Plunge","Farm","Rural","Groups"], emoji:"🔥", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel and swimwear",
    transport:"Car recommended — rural location outside Bangor",
    parking:"Farm car park on site",
    desc:"Sudor Quarries Farm — a rural outdoor sauna and cold plunge experience set on a working farm outside Bangor in County Down. Wood-fired sauna with a natural cold plunge pool surrounded by farmland — a genuinely off-grid, restorative experience. Part of the Sudor outdoor sauna collective. Book in advance.",
    lat:54.6598, lng:-5.7050,
    bookingUrl:"https://www.sudoroutdoorsaunas.com/"
  },
  {
    id:273, city:"Groomsport", country:"Northern Ireland", name:"HotBox Groomsport",
    area:"Groomsport Harbour, Groomsport, County Down BT19 6JP", type:"sauna", price:"From £25 per person · book online",
    rating:4.8, reviews:47,
    hours:"Weekends and select weekdays · seasonal · check website",
    temp:"Wood-fired barrel sauna · 80–90°C", tags:["Outdoor","Barrel Sauna","Harbour","Coastal","Sea Swim","Groups"], emoji:"🔥", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel and swimwear",
    transport:"Car recommended · Groomsport village 1 min walk",
    parking:"Groomsport Harbour car park",
    desc:"HotBox Groomsport — a wood-fired barrel sauna at the charming harbour village of Groomsport on the County Down coast. Heat up in the barrel sauna then plunge into the Irish Sea off the pier. A quintessential coastal sauna experience with views across Belfast Lough to the Antrim Hills. Seasonal and weekend availability — book early.",
    lat:54.6708, lng:-5.6228,
    bookingUrl:"https://hotboxni.com/"
  },
  {
    id:274, city:"Downpatrick", country:"Northern Ireland", name:"Sudor Castle Ward",
    area:"Castle Ward Estate, Strangford, Downpatrick BT30 7BA", type:"both", price:"From £30 per person · book online",
    rating:4.9, reviews:38,
    hours:"By booking only · check National Trust website",
    temp:"Wood-fired sauna · cold plunge · 80–90°C", tags:["Outdoor","Wood-fired","Cold Plunge","National Trust","Strangford Lough","Historic"], emoji:"🔥", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel and swimwear",
    transport:"Car recommended — Castle Ward is 7 miles from Downpatrick",
    parking:"National Trust car park on site (charge applies)",
    desc:"Sudor Castle Ward — an exceptional outdoor sauna and cold plunge experience at the National Trust's Castle Ward estate on the shores of Strangford Lough. Set against the backdrop of the 18th-century castle with views over the lough, this is one of Northern Ireland's most spectacular sauna settings. Cold plunge in Strangford Lough. Advance booking via the National Trust website.",
    lat:54.3725, lng:-5.5716,
    bookingUrl:"https://www.nationaltrust.org.uk/visit/northern-ireland/castle-ward"
  },

  // ── North Wales ───────────────────────────────────────────────────────────
  {
    id:275, city:"Criccieth", country:"Wales", name:"Sawna Criccieth",
    area:"Criccieth Beach, Criccieth, Gwynedd LL52 0HU", type:"sauna", price:"From £20 per person · book online",
    rating:4.7, reviews:31,
    hours:"Weekends and select days · check website",
    temp:"Wood-fired sauna · 75–90°C", tags:["Outdoor","Wood-fired","Beach","Coastal","Llŷn Peninsula","Welsh Language"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel",
    transport:"Criccieth train station 5 min walk · Cambrian Coast line",
    parking:"Criccieth town car parks",
    desc:"Sawna Criccieth on the beach at the historic town of Criccieth in the Llŷn Peninsula — a traditional wood-fired sauna with Cardigan Bay views and the medieval castle on the headland above. One of North Wales's most picturesque beach sauna settings. Cold sea dip after your session. Train-accessible from Pwllheli and Machynlleth on the scenic Cambrian Coast line.",
    lat:52.9194, lng:-4.2336,
    bookingUrl:"https://sawna.co.uk/"
  },
  {
    id:276, city:"Bala", country:"Wales", name:"Niku-Naku Sauna",
    area:"Bala Lake (Llyn Tegid), Bala, Gwynedd LL23 7SR", type:"sauna", price:"From £25 per person · book online",
    rating:4.6, reviews:18,
    hours:"Check website for availability",
    temp:"Wood-fired sauna · 80–90°C", tags:["Outdoor","Wood-fired","Lakeside","Wild Swimming","Scenic","Groups"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel and swimwear",
    transport:"Car recommended — Bala is in rural Gwynedd",
    parking:"Bala town car parks nearby",
    desc:"Niku-Naku Sauna at Bala Lake (Llyn Tegid) in Gwynedd — a wood-fired outdoor sauna on the shores of Wales's largest natural lake at the foot of the Aran mountains. Cold plunge in the pristine lake waters after your sauna session. A stunning and tranquil setting deep in the Welsh countryside.",
    lat:52.9073, lng:-3.6861,
    bookingUrl:"https://niku-naku.co.uk/"
  },
  {
    id:277, city:"Anglesey", country:"Wales", name:"Sawna Bach Anglesey",
    area:"Newborough, Isle of Anglesey LL63 5TD", type:"sauna", price:"From £20 per person · book online",
    rating:4.8, reviews:27,
    hours:"Check website for availability · seasonal",
    temp:"Wood-fired sauna · 75–90°C", tags:["Outdoor","Wood-fired","Island","Coastal","Snowdonia Views","Welsh Language"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel",
    transport:"Car recommended — Newborough is in rural southwest Anglesey",
    parking:"Newborough forest car park",
    desc:"Sawna Bach (Little Sauna) on the Isle of Anglesey near Newborough — a compact, beautiful wood-fired sauna in the dunes near Newborough Warren National Nature Reserve and Llanddwyn Island. Views of Snowdonia across the Menai Strait. A deeply peaceful Welsh island sauna experience in a protected coastal landscape.",
    lat:53.2218, lng:-4.5112,
    bookingUrl:"https://sawnabach.co.uk/"
  },
  {
    id:278, city:"Beaumaris", country:"Wales", name:"Cedar Hut Sauna Penmon",
    area:"Penmon Point, Isle of Anglesey", type:"sauna", price:"From £25 per person · book online",
    rating:4.8, reviews:22,
    hours:"Check website for availability",
    temp:"Wood-fired cedar sauna · 80–90°C", tags:["Outdoor","Wood-fired","Coastal","Lighthouse","Puffin Island","Anglesey"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel",
    transport:"Car recommended — Penmon Point is at the eastern tip of Anglesey",
    parking:"Penmon Point car park (small seasonal charge applies)",
    desc:"Cedar Hut Sauna at Penmon Point on Anglesey's easternmost tip — a beautiful cedar wood-fired sauna overlooking Puffin Island and the Menai Strait with views to the Great Orme and the North Wales coast. One of Anglesey's most scenic sauna spots, with wild sea swimming off the rocks. Puffins visible in season from May to July.",
    lat:53.3072, lng:-4.0500,
    bookingUrl:"https://cedarhutpenmon.co.uk/"
  },
  {
    id:279, city:"Llanberis", country:"Wales", name:"Sawna Bach Llanberis",
    area:"Llanberis, Gwynedd LL55 4TY", type:"sauna", price:"From £20 per person · book online",
    rating:4.7, reviews:25,
    hours:"Check website for availability",
    temp:"Wood-fired sauna · 75–90°C", tags:["Outdoor","Wood-fired","Snowdonia","Mountain","Lakeside","Groups"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel",
    transport:"Bus routes to Llanberis from Caernarfon",
    parking:"Village car parks in Llanberis",
    desc:"Sawna Bach in Llanberis at the gateway to Snowdon — a wood-fired outdoor sauna in the heart of Eryri (Snowdonia National Park) with views of Llyn Padarn lake and the Snowdon massif. Perfect for walkers after a Snowdon summit, or anyone seeking mountain-and-lake sauna serenity in one of Wales's finest landscapes.",
    lat:53.1168, lng:-4.1323,
    bookingUrl:"https://sawnabach.co.uk/"
  },
  {
    id:280, city:"Beaumaris", country:"Wales", name:"Seacoast Sauna Beaumaris",
    area:"Beaumaris, Isle of Anglesey LL58 8YL", type:"sauna", price:"From £25 per person · book online",
    rating:4.8, reviews:33,
    hours:"Weekends and select weekdays · check website",
    temp:"Wood-fired sauna · 75–90°C", tags:["Outdoor","Wood-fired","Coastal","Castle","Menai Strait","Scenic"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel",
    transport:"Bus routes to Beaumaris from Bangor",
    parking:"Beaumaris town car parks",
    desc:"Seacoast Sauna in Beaumaris on the Menai Strait — a coastal wood-fired sauna with views of the medieval castle and across to Snowdonia. One of Anglesey's finest sauna experiences in one of Wales's most beautiful towns. Sea swim in the Strait after your session. The UNESCO World Heritage Beaumaris Castle is a short walk away.",
    lat:53.2648, lng:-4.0906,
    bookingUrl:"https://seacoastsauna.co.uk/"
  },
  {
    id:281, city:"Llangollen", country:"Wales", name:"STōKED Sawna",
    area:"Mile End Mill, Berwyn Road, Llangollen LL20 8AD", type:"sauna", price:"From £20 per person · check website",
    rating:4.7, reviews:29,
    hours:"Check website for session times",
    temp:"Wood-fired sauna · 75–90°C", tags:["Outdoor","Wood-fired","River Dee","Dee Valley","Heritage","Groups"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel",
    transport:"Bus services to Llangollen from Wrexham and Corwen",
    parking:"Mile End Mill car park",
    desc:"STōKED Sawna at Mile End Mill on the banks of the River Dee in Llangollen — a wood-fired outdoor sauna in a stunning riverside setting in the Dee Valley AONB. The River Dee provides natural cold water immersion after your session. Located near the UNESCO World Heritage Pontcysyllte Aqueduct and the International Eisteddfod town.",
    lat:52.9706, lng:-3.1636,
    bookingUrl:"https://stokedsawna.co.uk/"
  },
  {
    id:282, city:"Conwy", country:"Wales", name:"Wave Garden Spa",
    area:"Surf Snowdonia, Dolgarrog, Conwy LL32 8QE", type:"both", price:"Spa day from £30 · combined surf and spa packages",
    rating:4.4, reviews:218,
    hours:"Daily · check Surf Snowdonia website",
    temp:"Sauna · steam · hot tub · thermal suite", tags:["Spa","Hot Tub","Surf","Snowdonia","Conwy Valley","Couples","Groups"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A+", lockerNote:"Full changing facilities included",
    transport:"Car recommended — Dolgarrog is in the Conwy Valley",
    parking:"Free car park at Surf Snowdonia",
    desc:"Wave Garden Spa at Surf Snowdonia in the Conwy Valley — a premium spa facility attached to the world's first inland surf lagoon. Features sauna, steam room, hot tubs and thermal suite with views of surrounding Snowdonia mountains. Combine a surf session on the wave machine with full spa facilities. Ideal for groups, couples and surf-and-wellness days.",
    lat:53.2164, lng:-3.8327,
    bookingUrl:"https://www.surfsnowdonia.co.uk/spa"
  },
  {
    id:283, city:"Aberystwyth", country:"Wales", name:"ABERPOETH Sauna",
    area:"Aberystwyth, Ceredigion SY23 2DN", type:"sauna", price:"From £20 per person · check website",
    rating:4.6, reviews:19,
    hours:"Check website for session times",
    temp:"Wood-fired sauna · 75–90°C", tags:["Outdoor","Wood-fired","Coastal","Sea Swim","West Wales","Groups"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel",
    transport:"Aberystwyth train station — regular services from Birmingham and Cardiff",
    parking:"Town car parks nearby",
    desc:"ABERPOETH Sauna in Aberystwyth on the Cardigan Bay coast — a wood-fired outdoor sauna experience on the West Wales coast. Sea swimming in Cardigan Bay after your session. Aberystwyth is accessible by train from Birmingham and Cardiff on one of the most scenic rail routes in Wales — the Cambrian Main Line.",
    lat:52.4154, lng:-4.0832,
    bookingUrl:"https://aberpoethsauna.co.uk/"
  },
  {
    id:284, city:"Pembrokeshire", country:"Wales", name:"Wildwater Sauna Pembrokeshire",
    area:"St Davids Peninsula, Pembrokeshire SA62 6NP", type:"sauna", price:"From £25 per person · book online",
    rating:4.9, reviews:44,
    hours:"Seasonal · check website for availability",
    temp:"Wood-fired sauna · 80–90°C", tags:["Outdoor","Wood-fired","Coastal","National Park","Wild Swimming","Scenic"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel and swimwear",
    transport:"Car recommended — Pembrokeshire Coast National Park",
    parking:"On-site or nearby National Park car park",
    desc:"Wildwater Sauna on the St Davids Peninsula in Pembrokeshire — a stunning outdoor wood-fired sauna within Britain's only coastal national park. Wild Atlantic sea swimming after your session off some of Wales's most dramatic sea cliffs and hidden coves. Near St Davids, the UK's smallest city. Seasonal availability — an exceptional Welsh coastal experience.",
    lat:51.8718, lng:-5.1222,
    bookingUrl:"https://wildwatersauna.co.uk/"
  },
  {
    id:285, city:"Wrexham", country:"Wales", name:"Total Fitness Wrexham",
    area:"Plas Coch Retail Park, Wrexham LL11 2BU", type:"sauna", price:"Day pass from £10 · membership from £30/month",
    rating:3.9, reviews:289,
    hours:"Mon–Fri 6am–10pm · Sat–Sun 8am–8pm",
    temp:"Dry sauna · steam room", tags:["Gym Sauna","Budget","Pool","Public Leisure"], emoji:"🔥", open:true,
    hygiene:"B+", lockerNote:"Lockers in changing rooms",
    transport:"Bus routes to Plas Coch from Wrexham town centre",
    parking:"Free car park at retail park",
    desc:"Total Fitness Wrexham at Plas Coch Retail Park — a large health club with sauna, steam room and swimming pool. Day passes available for non-members. One of the more affordable sauna options in North East Wales, within a full-service gym and swimming facility. Close to Wrexham town centre with good transport links.",
    lat:53.0459, lng:-3.0231,
    bookingUrl:"https://www.totalfitness.co.uk/clubs/wrexham/"
  },
  {
    id:286, city:"Colwyn Bay", country:"Wales", name:"Casgen Sawna",
    area:"Colwyn Bay, Conwy LL29 8HH", type:"sauna", price:"From £20 per person · check website",
    rating:4.7, reviews:21,
    hours:"Check website for session availability",
    temp:"Wood-fired barrel sauna · 75–90°C", tags:["Outdoor","Barrel Sauna","Coastal","North Wales Coast","Sea Swim","Groups"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel",
    transport:"Colwyn Bay train station — regular services on the North Wales coast line",
    parking:"Town car parks nearby",
    desc:"Casgen Sawna (Barrel Sauna) in Colwyn Bay on the North Wales coast — a wood-fired barrel sauna with coastal views. Sea swimming in the Irish Sea after your session. Colwyn Bay is well-served by the North Wales coast railway, making this one of the more accessible outdoor sauna venues in the region.",
    lat:53.2978, lng:-3.7199,
    bookingUrl:"https://casgensawna.co.uk/"
  },
  {
    id:287, city:"Welshpool", country:"Wales", name:"Drift Sauna Camp Plas",
    area:"Camp Plas, Dolanog, Welshpool, Powys", type:"sauna", price:"From £25 per person · camping and sauna packages",
    rating:4.8, reviews:16,
    hours:"Check website for availability · seasonal",
    temp:"Wood-fired sauna · 75–90°C", tags:["Outdoor","Wood-fired","Glamping","River","Rural","Groups","Powys"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel",
    transport:"Car recommended — Dolanog is a rural village in Montgomeryshire",
    parking:"On-site at Camp Plas",
    desc:"Drift Sauna at Camp Plas in Dolanog, Powys — a wood-fired outdoor sauna set within a beautiful glamping site in the Montgomeryshire hills beside the River Vyrnwy. A perfect pairing of riverside wild swimming and traditional Finnish sauna in the rolling Welsh borderlands. Camping and sauna packages available. A tranquil, off-grid experience in mid-Wales.",
    lat:52.7104, lng:-3.3860,
    bookingUrl:"https://www.campplas.co.uk/"
  },

  // ── South Wales ───────────────────────────────────────────────────────────
  {
    id:288, city:"Carmarthen", country:"Wales", name:"Golden Grove Retreat",
    area:"Golden Grove, Llanarthne, Carmarthen SA32 8NE", type:"sauna", price:"From £30 per person · retreat packages available",
    rating:4.8, reviews:37,
    hours:"Check website for availability",
    temp:"Wood-fired sauna · 80–90°C", tags:["Outdoor","Wood-fired","Retreat","Rural","Couples","Groups","Tywi Valley"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel",
    transport:"Car recommended — rural Carmarthenshire",
    parking:"On-site parking",
    desc:"Golden Grove Retreat in the Tywi Valley near Carmarthen — a wellness retreat with outdoor wood-fired sauna set in the stunning Carmarthenshire countryside. Cold plunge and relaxation facilities in a beautifully rural setting. Retreat packages, couples' sessions and group bookings available. Near the historic Golden Grove estate in the heart of West Wales.",
    lat:51.9064, lng:-4.0986,
    bookingUrl:"https://goldengrove.co.uk/"
  },
  {
    id:289, city:"Neath Port Talbot", country:"Wales", name:"Willow Springs Wellness",
    area:"Neath Port Talbot SA13 3DB", type:"sauna", price:"From £25 per person · check website",
    rating:4.5, reviews:29,
    hours:"Check website for session times",
    temp:"Wood-fired sauna · 75–90°C", tags:["Outdoor","Wood-fired","Wellness","Rural","South Wales","Groups"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel",
    transport:"Car recommended",
    parking:"On-site parking",
    desc:"Willow Springs Wellness in Neath Port Talbot — an outdoor wood-fired sauna and wellness experience in South Wales. Set in a peaceful rural location offering sauna sessions and wellness packages for groups and individuals. A growing addition to the South Wales wellness scene.",
    lat:51.6692, lng:-3.6279,
    bookingUrl:"https://willowspringswellness.co.uk/"
  },
  {
    id:290, city:"Llanelli", country:"Wales", name:"Live Free Sauna — Y Coed",
    area:"Y Coed, Llanelli SA14 8FB", type:"sauna", price:"From £20 per person · book online",
    rating:4.7, reviews:22,
    hours:"Check website for session availability",
    temp:"Wood-fired sauna · 75–90°C", tags:["Outdoor","Wood-fired","Forest","Nature","Groups","Carmarthenshire"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel",
    transport:"Car recommended",
    parking:"On-site parking",
    desc:"Live Free Sauna at Y Coed (The Wood) near Llanelli — a wood-fired outdoor sauna nestled in Welsh woodland in Carmarthenshire. The forest setting provides a beautiful natural backdrop for a traditional sauna experience. Cold water facilities and relaxation space available. Suitable for groups and couples looking for a nature-connected wellness experience.",
    lat:51.7104, lng:-4.1310,
    bookingUrl:"https://livefreesauna.co.uk/"
  },
  {
    id:291, city:"Swansea", country:"Wales", name:"JD Gyms Llansamlet",
    area:"Phoenix Retail Park, Swansea SA6 8RX", type:"sauna", price:"Day pass from £5 · or membership",
    rating:3.8, reviews:412,
    hours:"Mon–Fri 5:30am–11pm · Sat–Sun 7am–9pm",
    temp:"Dry sauna · steam room", tags:["Gym Sauna","Budget","Public Leisure","Swansea Vale"], emoji:"🔥", open:true,
    hygiene:"B", lockerNote:"Lockers in changing rooms",
    transport:"Bus routes to Phoenix Retail Park from Swansea city centre",
    parking:"Free car park at retail park",
    desc:"JD Gyms at Phoenix Retail Park in Llansamlet, Swansea — a large budget gym with sauna and steam room included with membership or a low-cost day pass. Convenient for the Swansea Vale area and easily accessible from the M4. One of the most affordable sauna options in the Swansea area.",
    lat:51.6549, lng:-3.8843,
    bookingUrl:"https://www.jdgyms.co.uk/gym/llansamlet/"
  },
  {
    id:292, city:"Swansea", country:"Wales", name:"Papermill Saunas",
    area:"Papermill Fishery, Fforestfach, Swansea SA5 4NL", type:"sauna", price:"From £20 per person · check website",
    rating:4.6, reviews:26,
    hours:"Check website for session times",
    temp:"Wood-fired sauna · 80–90°C", tags:["Outdoor","Wood-fired","Lakeside","Fishery","Rural","Swansea","Groups"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel",
    transport:"Car recommended — western Swansea",
    parking:"On-site at Papermill Fishery",
    desc:"Papermill Saunas at Papermill Fishery in Fforestfach, Swansea — a wood-fired outdoor sauna set on the lakeside at a beautiful fishery on the western edge of Swansea. Cold water plunge in the lake after your session. A peaceful, rural sauna experience hidden within the city boundary. Popular with Swansea locals for weekend wellness sessions.",
    lat:51.6437, lng:-3.9750,
    bookingUrl:"https://papermillsaunas.co.uk/"
  },
  {
    id:293, city:"Swansea", country:"Wales", name:"Village Gym Swansea",
    area:"Langdon Road, Swansea SA1 8QY", type:"sauna", price:"Day pass from £15 · membership from £35/month",
    rating:4.1, reviews:334,
    hours:"Mon–Fri 6am–10pm · Sat–Sun 7am–9pm",
    temp:"Dry sauna · steam room · pool", tags:["Gym Sauna","Pool","Spa","Day Pass","Swansea","City Centre"], emoji:"💆", open:true,
    hygiene:"A", lockerNote:"Secure lockers included",
    transport:"Swansea city centre bus routes · 10 min walk from station",
    parking:"Car park on site",
    desc:"Village Gym Swansea on Langdon Road near the city centre — a premium health club with sauna, steam room, 20-metre swimming pool and spa facilities. Day passes available for non-members. One of Swansea's best mid-to-premium gym and spa options, within walking distance of the waterfront.",
    lat:51.6175, lng:-3.8997,
    bookingUrl:"https://www.villagegym.co.uk/clubs/swansea/"
  },
  {
    id:294, city:"Merthyr Tydfil", country:"Wales", name:"The Old Drift Wellness",
    area:"Merthyr Tydfil CF46 5PS", type:"sauna", price:"From £20 per person · check website",
    rating:4.6, reviews:18,
    hours:"Check website for session availability",
    temp:"Wood-fired sauna · 75–90°C", tags:["Outdoor","Wood-fired","Valleys","River","Groups","South Wales"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel",
    transport:"Merthyr Tydfil train station — regular services from Cardiff",
    parking:"On-site parking",
    desc:"The Old Drift Wellness in the Merthyr Tydfil area — a wood-fired outdoor sauna experience set in the South Wales Valleys landscape. River access for cold plunge after your session. Merthyr Tydfil is well connected to Cardiff by train, making this a practical Welsh Valleys sauna destination near the Brecon Beacons gateway.",
    lat:51.6623, lng:-3.3539,
    bookingUrl:"https://theolddrift.co.uk/"
  },
  {
    id:295, city:"Blackwood", country:"Wales", name:"Tân a Rhew",
    area:"Blackwood, Caerphilly NP12 0BQ", type:"both", price:"From £25 per person · book online",
    rating:4.8, reviews:29,
    hours:"Check website for session times",
    temp:"Wood-fired sauna · cold plunge · 80–90°C", tags:["Outdoor","Wood-fired","Cold Plunge","Valleys","Groups","Caerphilly"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel and swimwear",
    transport:"Bus routes from Newport and Cardiff to Blackwood",
    parking:"On-site parking",
    desc:"Tân a Rhew (Fire and Ice) in Blackwood, Caerphilly — a wood-fired outdoor sauna and cold plunge experience in the South Wales Valleys. The Welsh name captures the contrast bathing experience perfectly. A popular local outdoor wellness venue bringing the Nordic sauna tradition to the Gwent Valleys.",
    lat:51.6840, lng:-3.2215,
    bookingUrl:"https://tanarhew.co.uk/"
  },
  {
    id:296, city:"Swansea", country:"Wales", name:"Sauna Hut Wales — Mumbles",
    area:"Bracelet Bay, Mumbles, Swansea", type:"sauna", price:"From £20 per person · check website",
    rating:4.7, reviews:31,
    hours:"Seasonal · check website for availability",
    temp:"Wood-fired sauna · 80–90°C", tags:["Outdoor","Wood-fired","Beach","Coastal","Sea Swim","Mumbles","Gower"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel",
    transport:"Bus routes from Swansea city centre to Mumbles",
    parking:"Bracelet Bay or Mumbles Head car park",
    desc:"Sauna Hut Wales at Bracelet Bay, Mumbles — a mobile wood-fired sauna on Swansea Bay's most picturesque headland, positioned with views of Mumbles Lighthouse, Swansea Bay and Gower beyond. Sea swimming off the rocks after your session. Mumbles village with its cafés and restaurants is a short walk away. Seasonal availability.",
    lat:51.5703, lng:-3.9792,
    bookingUrl:"https://saunahut.wales/"
  },
  {
    id:297, city:"Cwmbran", country:"Wales", name:"JD Gyms Cwmbran",
    area:"Cwmbran Shopping Centre, Cwmbran NP44 1PW", type:"sauna", price:"Day pass from £5 · or membership",
    rating:3.8, reviews:387,
    hours:"Mon–Fri 5:30am–11pm · Sat–Sun 7am–9pm",
    temp:"Dry sauna · steam room", tags:["Gym Sauna","Budget","Public Leisure","Torfaen"], emoji:"🔥", open:true,
    hygiene:"B", lockerNote:"Lockers in changing rooms",
    transport:"Cwmbran train station 5 min walk · regular Cardiff and Newport services",
    parking:"Cwmbran Shopping Centre car park",
    desc:"JD Gyms Cwmbran at the shopping centre — a large budget gym with sauna and steam room included with membership or day pass. Excellent value for sauna access in Cwmbran, with the train station a short walk away for easy access from Cardiff and Newport. One of Torfaen's most accessible gym-sauna options.",
    lat:51.6532, lng:-3.0165,
    bookingUrl:"https://www.jdgyms.co.uk/gym/cwmbran/"
  },
  {
    id:298, city:"Saundersfoot", country:"Wales", name:"Hwyl Outdoor Sauna",
    area:"Saundersfoot, Pembrokeshire SA69 9HE", type:"sauna", price:"From £20 per person · book online",
    rating:4.8, reviews:24,
    hours:"Check website for session times · seasonal",
    temp:"Wood-fired sauna · 75–90°C", tags:["Outdoor","Wood-fired","Coastal","Pembrokeshire","Beach","Sea Swim"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel",
    transport:"Saundersfoot train station 5 min walk · Pembroke Dock line from Swansea",
    parking:"Saundersfoot harbour car park",
    desc:"Hwyl Outdoor Sauna in Saundersfoot, Pembrokeshire — a wood-fired sauna at this charming harbour village on the Pembrokeshire Coast. Sea swimming in Saundersfoot Bay after your session. Hwyl (Welsh for fun/joy/spirit) captures the essence of the experience. Train-accessible from Swansea on the Pembroke Dock line.",
    lat:51.7166, lng:-4.6983,
    bookingUrl:"https://hwyloutsauna.co.uk/"
  },
  {
    id:299, city:"Porthcawl", country:"Wales", name:"Hikitalo Sandy Bay Sauna",
    area:"Sandy Bay, Porthcawl CF36 5BT", type:"sauna", price:"From £20 per person · check website",
    rating:4.7, reviews:28,
    hours:"Check website for session availability · seasonal",
    temp:"Wood-fired sauna · 80–90°C", tags:["Outdoor","Wood-fired","Beach","Coastal","Sea Swim","Bridgend","Bristol Channel"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel",
    transport:"Car recommended · Porthcawl is 5 miles from Bridgend station",
    parking:"Sandy Bay car park adjacent",
    desc:"Hikitalo Sandy Bay Sauna at Sandy Bay, Porthcawl — a Finnish-inspired wood-fired outdoor sauna on the sandy beach at the southern end of Porthcawl. Sea swimming in the Bristol Channel after your session. Porthcawl's seaside esplanade and town are a short walk away. A unique addition to the South Wales coast.",
    lat:51.4796, lng:-3.7014,
    bookingUrl:"https://hikitalo.co.uk/"
  },
  {
    id:300, city:"Bridgend", country:"Wales", name:"The Outdoor Sauna Bridgend",
    area:"Bridgend CF32 0LS", type:"sauna", price:"From £20 per person · book online",
    rating:4.6, reviews:17,
    hours:"Check website for session times",
    temp:"Wood-fired sauna · 75–90°C", tags:["Outdoor","Wood-fired","Rural","Groups","South Wales","Bridgend"], emoji:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", open:true,
    hygiene:"A", lockerNote:"Outdoor facility — bring your own towel",
    transport:"Bridgend train station — regular services from Cardiff and Swansea",
    parking:"On-site parking",
    desc:"The Outdoor Sauna Bridgend — a wood-fired outdoor sauna in the Bridgend area, one of the growing number of outdoor wellness venues in South Wales. Rural setting with peaceful surroundings and cold water facilities. Bridgend has excellent rail connections from Cardiff and Swansea.",
    lat:51.4961, lng:-3.6394,
    bookingUrl:"https://outdoorsaunabridgend.co.uk/"
  },
];

export const CITIES = [
  "All",
  // UK — England
  "London","Bath","Bristol","Brighton","Manchester","Liverpool","Newcastle","Leeds","Birmingham","Sheffield","Cornwall",
  "Nottingham","Norwich","Cambridge","Exeter","Portsmouth","Plymouth",
  // UK — Scotland
  "Edinburgh","Glasgow","Aberdeen","Inverness","Dundee",
  // UK — Wales
  "Cardiff","Swansea",
  "Carmarthen","Llanelli","Neath Port Talbot","Merthyr Tydfil","Blackwood","Bridgend","Porthcawl","Saundersfoot","Cwmbran",
  "Criccieth","Bala","Anglesey","Llanberis","Beaumaris","Llangollen","Conwy","Aberystwyth","Pembrokeshire","Wrexham","Colwyn Bay","Welshpool",
  // UK — Northern Ireland
  "Belfast","Derry",
  "Craigavon","Ballymena","Limavady","Portstewart","Holywood","Bangor","Groomsport","Rostrevor","Downpatrick",
  // Ireland — cities only (counties appear as region filters when Ireland is selected)
  "Dublin","Cork","Galway","Limerick",
  // Nordic
  "Helsinki","Stockholm","Gothenburg","Copenhagen","Aarhus","Oslo","Bergen","Rovaniemi","Karlstad","Reykjavik",
];

export const FLAG: Record<string, string> = {
  London:"🇬🇧", Bath:"🇬🇧", Bristol:"🇬🇧", Brighton:"🇬🇧",
  Manchester:"🇬🇧", Liverpool:"🇬🇧", Newcastle:"🇬🇧", Leeds:"🇬🇧",
  Birmingham:"🇬🇧", Sheffield:"🇬🇧", Cornwall:"🇬🇧",
  Nottingham:"🇬🇧", Norwich:"🇬🇧", Cambridge:"🇬🇧", Exeter:"🇬🇧",
  Portsmouth:"🇬🇧", Plymouth:"🇬🇧",
  Edinburgh:"🇬🇧", Glasgow:"🇬🇧", Aberdeen:"🇬🇧", Inverness:"🇬🇧", Dundee:"🇬🇧",
  Cardiff:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", Swansea:"🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  Carmarthen:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", Llanelli:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", "Neath Port Talbot":"🏴󠁧󠁢󠁷󠁬󠁳󠁿", "Merthyr Tydfil":"🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  Blackwood:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", Bridgend:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", Porthcawl:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", Saundersfoot:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", Cwmbran:"🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  Criccieth:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", Bala:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", Anglesey:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", Llanberis:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", Beaumaris:"🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  Llangollen:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", Conwy:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", Aberystwyth:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", Pembrokeshire:"🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  Wrexham:"🏴󠁧󠁢󠁷󠁬󠁳󠁿", "Colwyn Bay":"🏴󠁧󠁢󠁷󠁬󠁳󠁿", Welshpool:"🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  Belfast:"🇬🇧", Derry:"🇬🇧",
  Craigavon:"🇬🇧", Ballymena:"🇬🇧", Limavady:"🇬🇧", Portstewart:"🇬🇧", Holywood:"🇬🇧",
  Bangor:"🇬🇧", Groomsport:"🇬🇧", Rostrevor:"🇬🇧", Downpatrick:"🇬🇧",
  Dublin:"🇮🇪", Galway:"🇮🇪", Cork:"🇮🇪",
  Sligo:"🇮🇪", Kerry:"🇮🇪", Wicklow:"🇮🇪", Limerick:"🇮🇪",
  Mayo:"🇮🇪", Waterford:"🇮🇪", Kilkenny:"🇮🇪", Wexford:"🇮🇪", Tipperary:"🇮🇪", Carlingford:"🇮🇪", Drogheda:"🇮🇪",
  Donegal:"🇮🇪", Clare:"🇮🇪", Cavan:"🇮🇪", Carlow:"🇮🇪", Laois:"🇮🇪",
  Kildare:"🇮🇪", Leitrim:"🇮🇪", Meath:"🇮🇪", Offaly:"🇮🇪", Roscommon:"🇮🇪", Westmeath:"🇮🇪",
  Helsinki:"🇫🇮", Stockholm:"🇸🇪", Gothenburg:"🇸🇪", Karlstad:"🇸🇪",
  Copenhagen:"🇩🇰", Aarhus:"🇩🇰", Oslo:"🇳🇴", Bergen:"🇳🇴", Rovaniemi:"🇫🇮",
  Reykjavik:"🇮🇸",
};

export const REGION_MAP: Record<string, string> = {
  London:"UK & Ireland", Bath:"UK & Ireland", Bristol:"UK & Ireland",
  Brighton:"UK & Ireland", Manchester:"UK & Ireland", Liverpool:"UK & Ireland",
  Newcastle:"UK & Ireland", Leeds:"UK & Ireland", Birmingham:"UK & Ireland",
  Sheffield:"UK & Ireland", Cornwall:"UK & Ireland",
  Nottingham:"UK & Ireland", Norwich:"UK & Ireland", Cambridge:"UK & Ireland",
  Exeter:"UK & Ireland", Portsmouth:"UK & Ireland", Plymouth:"UK & Ireland",
  Edinburgh:"UK & Ireland", Glasgow:"UK & Ireland", Aberdeen:"UK & Ireland",
  Inverness:"UK & Ireland", Dundee:"UK & Ireland",
  Cardiff:"UK & Ireland", Swansea:"UK & Ireland",
  Carmarthen:"UK & Ireland", Llanelli:"UK & Ireland", "Neath Port Talbot":"UK & Ireland", "Merthyr Tydfil":"UK & Ireland",
  Blackwood:"UK & Ireland", Bridgend:"UK & Ireland", Porthcawl:"UK & Ireland", Saundersfoot:"UK & Ireland", Cwmbran:"UK & Ireland",
  Criccieth:"UK & Ireland", Bala:"UK & Ireland", Anglesey:"UK & Ireland", Llanberis:"UK & Ireland", Beaumaris:"UK & Ireland",
  Llangollen:"UK & Ireland", Conwy:"UK & Ireland", Aberystwyth:"UK & Ireland", Pembrokeshire:"UK & Ireland",
  Wrexham:"UK & Ireland", "Colwyn Bay":"UK & Ireland", Welshpool:"UK & Ireland",
  Belfast:"UK & Ireland", Derry:"UK & Ireland",
  Craigavon:"UK & Ireland", Ballymena:"UK & Ireland", Limavady:"UK & Ireland", Portstewart:"UK & Ireland", Holywood:"UK & Ireland",
  Bangor:"UK & Ireland", Groomsport:"UK & Ireland", Rostrevor:"UK & Ireland", Downpatrick:"UK & Ireland",
  Dublin:"UK & Ireland", Galway:"UK & Ireland", Cork:"UK & Ireland",
  Sligo:"UK & Ireland", Kerry:"UK & Ireland", Wicklow:"UK & Ireland",
  Limerick:"UK & Ireland", Waterford:"UK & Ireland", Kilkenny:"UK & Ireland",
  Mayo:"UK & Ireland", Wexford:"UK & Ireland", Tipperary:"UK & Ireland", Carlingford:"UK & Ireland", Drogheda:"UK & Ireland",
  Donegal:"UK & Ireland", Clare:"UK & Ireland", Cavan:"UK & Ireland", Carlow:"UK & Ireland", Laois:"UK & Ireland",
  Kildare:"UK & Ireland", Leitrim:"UK & Ireland", Meath:"UK & Ireland", Offaly:"UK & Ireland", Roscommon:"UK & Ireland", Westmeath:"UK & Ireland",
  Reykjavik:"Nordic", Aarhus:"Nordic",
  Helsinki:"Nordic", Stockholm:"Nordic", Gothenburg:"Nordic", Karlstad:"Nordic",
  Copenhagen:"Nordic", Oslo:"Nordic", Bergen:"Nordic", Rovaniemi:"Nordic",
};

export const COUNTRY_MAP: Record<string, string> = {
  // England
  London:"England", Bath:"England", Bristol:"England", Brighton:"England",
  Manchester:"England", Liverpool:"England", Newcastle:"England", Leeds:"England",
  Birmingham:"England", Sheffield:"England", Cornwall:"England",
  Nottingham:"England", Norwich:"England", Cambridge:"England",
  Exeter:"England", Portsmouth:"England", Plymouth:"England",
  // Scotland
  Edinburgh:"Scotland", Glasgow:"Scotland", Aberdeen:"Scotland",
  Inverness:"Scotland", Dundee:"Scotland",
  // Wales
  Cardiff:"Wales", Swansea:"Wales",
  Carmarthen:"Wales", Llanelli:"Wales", "Neath Port Talbot":"Wales", "Merthyr Tydfil":"Wales",
  Blackwood:"Wales", Bridgend:"Wales", Porthcawl:"Wales", Saundersfoot:"Wales", Cwmbran:"Wales",
  Criccieth:"Wales", Bala:"Wales", Anglesey:"Wales", Llanberis:"Wales", Beaumaris:"Wales",
  Llangollen:"Wales", Conwy:"Wales", Aberystwyth:"Wales", Pembrokeshire:"Wales",
  Wrexham:"Wales", "Colwyn Bay":"Wales", Welshpool:"Wales",
  // Northern Ireland
  Belfast:"Northern Ireland", Derry:"Northern Ireland",
  Craigavon:"Northern Ireland", Ballymena:"Northern Ireland", Limavady:"Northern Ireland", Portstewart:"Northern Ireland",
  Holywood:"Northern Ireland", Bangor:"Northern Ireland", Groomsport:"Northern Ireland", Rostrevor:"Northern Ireland", Downpatrick:"Northern Ireland",
  // Ireland
  Dublin:"Ireland", Galway:"Ireland", Cork:"Ireland",
  Sligo:"Ireland", Kerry:"Ireland", Wicklow:"Ireland",
  Limerick:"Ireland", Waterford:"Ireland", Kilkenny:"Ireland",
  Mayo:"Ireland", Wexford:"Ireland", Tipperary:"Ireland", Carlingford:"Ireland", Drogheda:"Ireland",
  Donegal:"Ireland", Clare:"Ireland", Cavan:"Ireland", Carlow:"Ireland", Laois:"Ireland",
  Kildare:"Ireland", Leitrim:"Ireland", Meath:"Ireland", Offaly:"Ireland", Roscommon:"Ireland", Westmeath:"Ireland",
  // Nordic
  Reykjavik:"Iceland",
  Aarhus:"Denmark", Copenhagen:"Denmark",
  Helsinki:"Finland", Rovaniemi:"Finland",
  Stockholm:"Sweden", Gothenburg:"Sweden", Karlstad:"Sweden",
  Oslo:"Norway", Bergen:"Norway",
};

// Maps city → county (Ireland/NI) or region (everything else)
export const CITY_REGION_MAP: Record<string, string> = {
  // England — region
  London:"Greater London", Bath:"South West", Bristol:"South West", Brighton:"South East",
  Manchester:"North West", Liverpool:"North West", Newcastle:"North East", Leeds:"Yorkshire",
  Birmingham:"West Midlands", Sheffield:"Yorkshire", Cornwall:"South West",
  Nottingham:"East Midlands", Norwich:"East of England", Cambridge:"East of England",
  Exeter:"South West", Portsmouth:"South East", Plymouth:"South West",
  // Scotland — region
  Edinburgh:"Central Belt", Glasgow:"Central Belt", Aberdeen:"Grampian",
  Inverness:"Highlands", Dundee:"Fife",
  // Wales — region/county
  Cardiff:"South Wales", Swansea:"South Wales",
  Carmarthen:"Carmarthenshire", Llanelli:"Carmarthenshire", "Neath Port Talbot":"Neath Port Talbot", "Merthyr Tydfil":"Merthyr Tydfil",
  Blackwood:"Caerphilly", Bridgend:"Bridgend", Porthcawl:"Bridgend", Saundersfoot:"Pembrokeshire", Cwmbran:"Torfaen",
  Criccieth:"Gwynedd", Bala:"Gwynedd", Anglesey:"Isle of Anglesey", Llanberis:"Gwynedd", Beaumaris:"Isle of Anglesey",
  Llangollen:"Denbighshire", Conwy:"Conwy", Aberystwyth:"Ceredigion", Pembrokeshire:"Pembrokeshire",
  Wrexham:"Wrexham", "Colwyn Bay":"Conwy", Welshpool:"Powys",
  // Northern Ireland — county
  Belfast:"Antrim", Derry:"Londonderry",
  Craigavon:"Armagh", Ballymena:"Antrim", Limavady:"Londonderry", Portstewart:"Londonderry",
  Holywood:"Down", Bangor:"Down", Groomsport:"Down", Rostrevor:"Down", Downpatrick:"Down",
  // Ireland — county
  Dublin:"Dublin", Galway:"Galway", Cork:"Cork",
  Sligo:"Sligo", Kerry:"Kerry", Wicklow:"Wicklow",
  Limerick:"Limerick", Waterford:"Waterford", Kilkenny:"Kilkenny",
  Wexford:"Wexford", Tipperary:"Tipperary", Carlingford:"Louth",
  Mayo:"Mayo", Drogheda:"Louth",
  Donegal:"Donegal", Clare:"Clare", Cavan:"Cavan", Carlow:"Carlow", Laois:"Laois",
  Kildare:"Kildare", Leitrim:"Leitrim", Meath:"Meath", Offaly:"Offaly", Roscommon:"Roscommon", Westmeath:"Westmeath",
  // Nordic — region
  Helsinki:"Helsinki Region", Rovaniemi:"Lapland",
  Stockholm:"Stockholm Region", Gothenburg:"Gothenburg Region", Karlstad:"Gothenburg Region",
  Copenhagen:"Copenhagen Region", Aarhus:"Jutland",
  Oslo:"Oslo Region", Bergen:"Western Norway",
  Reykjavik:"Reykjavík",
};

export const TAGS_COLOR: Record<string, { bg: string; c: string }> = {
  "Finnish":         { bg:"rgba(78,122,85,0.2)",    c:"#6a9b72" },
  "Ice Bath":        { bg:"rgba(107,175,200,0.15)",  c:"#6bafc8" },
  "Luxury":          { bg:"rgba(196,162,85,0.15)",   c:"#c4a255" },
  "Budget":          { bg:"rgba(78,122,85,0.18)",    c:"#7aaa80" },
  "Community":       { bg:"rgba(138,156,130,0.15)",  c:"#8a9c82" },
  "Wood-fired":      { bg:"rgba(196,121,58,0.2)",    c:"#c4793a" },
  "Free":            { bg:"rgba(78,122,85,0.2)",     c:"#6a9b72" },
  "Iconic":          { bg:"rgba(196,162,85,0.15)",   c:"#c4a255" },
  "Boutique":        { bg:"rgba(208,184,144,0.12)",  c:"#d0b890" },
  "Historic":        { bg:"rgba(138,156,130,0.15)",  c:"#a0ae98" },
  "Nordic":          { bg:"rgba(107,175,200,0.15)",  c:"#6bafc8" },
  "Coastal":         { bg:"rgba(107,175,200,0.15)",  c:"#6bafc8" },
  "Rooftop":         { bg:"rgba(138,156,130,0.15)",  c:"#8a9c82" },
  "Private Cabins":  { bg:"rgba(208,184,144,0.12)",  c:"#d0b890" },
  "Views":           { bg:"rgba(107,175,200,0.12)",  c:"#6bafc8" },
  "Private":         { bg:"rgba(208,184,144,0.12)",  c:"#d0b890" },
  "Lido":            { bg:"rgba(107,175,200,0.15)",  c:"#6bafc8" },
  "Seasonal":        { bg:"rgba(138,156,130,0.12)",  c:"#8a9c82" },
  "Members Club":    { bg:"rgba(196,162,85,0.15)",   c:"#c4a255" },
  "Events":          { bg:"rgba(196,162,85,0.12)",   c:"#c4a255" },
  "Infrared":        { bg:"rgba(196,121,58,0.15)",   c:"#c4793a" },
  "Steam":           { bg:"rgba(107,175,200,0.12)",  c:"#6bafc8" },
  "Handcrafted":     { bg:"rgba(208,184,144,0.12)",  c:"#d0b890" },
  "East London":     { bg:"rgba(138,156,130,0.12)",  c:"#8a9c82" },
  "South London":    { bg:"rgba(138,156,130,0.12)",  c:"#8a9c82" },
  "South Dublin":    { bg:"rgba(138,156,130,0.12)",  c:"#8a9c82" },
  "West Dublin":     { bg:"rgba(138,156,130,0.12)",  c:"#8a9c82" },
  "North Dublin":    { bg:"rgba(138,156,130,0.12)",  c:"#8a9c82" },
  "Dublin City":     { bg:"rgba(138,156,130,0.12)",  c:"#8a9c82" },
  "Sauna Village":   { bg:"rgba(196,121,58,0.15)",   c:"#c4793a" },
  "Multi-experience":{ bg:"rgba(138,156,130,0.12)",  c:"#8a9c82" },
  "Whiskey Barrel":  { bg:"rgba(196,121,58,0.15)",   c:"#c4793a" },
  "Seafront":        { bg:"rgba(107,175,200,0.15)",  c:"#6bafc8" },
  "Sea Plunge":      { bg:"rgba(107,175,200,0.15)",  c:"#6bafc8" },
  "River":           { bg:"rgba(107,175,200,0.12)",  c:"#6bafc8" },
  "Countryside":     { bg:"rgba(78,122,85,0.18)",    c:"#6a9b72" },
  "Nordic Rituals":  { bg:"rgba(107,175,200,0.15)",  c:"#6bafc8" },
  "Beach":           { bg:"rgba(107,175,200,0.12)",  c:"#6bafc8" },
  "Two Locations":   { bg:"rgba(138,156,130,0.12)",  c:"#8a9c82" },
  "City Centre":     { bg:"rgba(138,156,130,0.12)",  c:"#8a9c82" },
  "Marina":          { bg:"rgba(107,175,200,0.12)",  c:"#6bafc8" },
  "Lithuanian Sauna":{ bg:"rgba(196,121,58,0.15)",   c:"#c4793a" },
  "Russian Banya":   { bg:"rgba(196,121,58,0.18)",   c:"#c4793a" },
  "Kinsale":         { bg:"rgba(107,175,200,0.12)",  c:"#6bafc8" },
  "Forty Foot":      { bg:"rgba(107,175,200,0.18)",  c:"#6bafc8" },
  "Dún Laoghaire":   { bg:"rgba(107,175,200,0.12)",  c:"#6bafc8" },
  "Roman Hot Springs":{ bg:"rgba(196,162,85,0.18)",  c:"#c4a255" },
  "Rooftop Pool":    { bg:"rgba(107,175,200,0.15)",  c:"#6bafc8" },
  "Forest":          { bg:"rgba(78,122,85,0.18)",    c:"#6a9b72" },
  "Wild Swim":       { bg:"rgba(107,175,200,0.15)",  c:"#6bafc8" },
  "Riverside":       { bg:"rgba(107,175,200,0.12)",  c:"#6bafc8" },
  "Country Estate":  { bg:"rgba(78,122,85,0.15)",    c:"#6a9b72" },
  "Secret Garden":   { bg:"rgba(78,122,85,0.15)",    c:"#6a9b72" },
  "Historic Courtyard":{ bg:"rgba(138,156,130,0.15)",c:"#a0ae98" },
  "Wild Atlantic":   { bg:"rgba(107,175,200,0.15)",  c:"#6bafc8" },
  "Multi-plunge":    { bg:"rgba(107,175,200,0.15)",  c:"#6bafc8" },
  "Urban":           { bg:"rgba(138,156,130,0.12)",  c:"#8a9c82" },
  "Café On-site":    { bg:"rgba(196,162,85,0.12)",   c:"#c4a255" },
  "Himalayan Salt":  { bg:"rgba(196,162,85,0.12)",   c:"#c4a255" },
  "Guided Breathwork":{ bg:"rgba(78,122,85,0.15)",   c:"#6a9b72" },
  "Thermal Pools":   { bg:"rgba(107,175,200,0.15)",  c:"#6bafc8" },
  "Upscale":         { bg:"rgba(196,162,85,0.15)",   c:"#c4a255" },
  "Venice":          { bg:"rgba(107,175,200,0.12)",  c:"#6bafc8" },
  "Contrast Therapy":{ bg:"rgba(196,121,58,0.15)",   c:"#c4793a" },
  "Redwood Sauna":   { bg:"rgba(78,122,85,0.18)",    c:"#6a9b72" },
  "Japanese Soak":   { bg:"rgba(107,175,200,0.12)",  c:"#6bafc8" },
  "Robes Included":  { bg:"rgba(208,184,144,0.15)",  c:"#d0b890" },
  "Bar On-site":     { bg:"rgba(196,162,85,0.12)",   c:"#c4a255" },
  "Fjord Plunge":    { bg:"rgba(107,175,200,0.18)",  c:"#6bafc8" },
  "Social":          { bg:"rgba(138,156,130,0.15)",  c:"#8a9c82" },
  "Outdoor Pools":   { bg:"rgba(107,175,200,0.15)",  c:"#6bafc8" },
  "Year-round":      { bg:"rgba(78,122,85,0.15)",    c:"#6a9b72" },
  "Art Nouveau":     { bg:"rgba(196,162,85,0.15)",   c:"#c4a255" },
  "Lake Plunge":     { bg:"rgba(107,175,200,0.18)",  c:"#6bafc8" },
  "Traditional":     { bg:"rgba(208,184,144,0.12)",  c:"#d0b890" },
  "Harbour":         { bg:"rgba(107,175,200,0.15)",  c:"#6bafc8" },
  "Rustic":          { bg:"rgba(138,156,130,0.15)",  c:"#a0ae98" },
  "Spring Water":    { bg:"rgba(107,175,200,0.15)",  c:"#6bafc8" },
  "Silent Sessions": { bg:"rgba(138,156,130,0.12)",  c:"#8a9c82" },
  "Trendy":          { bg:"rgba(138,156,130,0.12)",  c:"#8a9c82" },
  "Outdoor":         { bg:"rgba(78,122,85,0.15)",    c:"#6a9b72" },
  "Handmade":        { bg:"rgba(208,184,144,0.12)",  c:"#d0b890" },
  "Scenic":          { bg:"rgba(78,122,85,0.15)",    c:"#6a9b72" },
  "UK's Biggest Sauna":{ bg:"rgba(196,162,85,0.15)", c:"#c4a255" },
  "Breathwork":      { bg:"rgba(78,122,85,0.15)",    c:"#6a9b72" },
  "24/7":            { bg:"rgba(196,162,85,0.12)",   c:"#c4a255" },
  "Restaurant On-site":{ bg:"rgba(196,162,85,0.12)", c:"#c4a255" },
  "Historic Building":{ bg:"rgba(138,156,130,0.15)", c:"#a0ae98" },
  "Authentic":       { bg:"rgba(208,184,144,0.12)",  c:"#d0b890" },
  "North London":    { bg:"rgba(138,156,130,0.12)",  c:"#8a9c82" },
  "West London":     { bg:"rgba(138,156,130,0.12)",  c:"#8a9c82" },
  "Waterside":       { bg:"rgba(107,175,200,0.15)",  c:"#6bafc8" },
  "Hammam":          { bg:"rgba(107,175,200,0.12)",  c:"#6bafc8" },
  "Seaweed Bath":    { bg:"rgba(74,155,106,0.15)",   c:"#4a9b6a" },
  "Lakeside":        { bg:"rgba(107,175,200,0.13)",  c:"#6bafc8" },
};

export function getTag(t: string): { bg: string; c: string } {
  return TAGS_COLOR[t] ?? { bg:"rgba(100,130,75,0.1)", c:"rgba(138,156,130,0.9)" };
}
