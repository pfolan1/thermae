import { useState } from "react";

// ─── COLOUR SYSTEM ────────────────────────────────────────────────────────────
// Steam white / deep slate / ember terracotta / glacial blue
const C = { steam:"#F0EBE3", slate:"#0D1219", ember:"#C4612A", ice:"#7DD3F0", gold:"#D4A847" };

// ─── VENUE DATA ───────────────────────────────────────────────────────────────
const VENUES = [
  // ── LONDON ──
  { id:1, city:"London", country:"UK", name:"ARC Wellness", area:"Canary Wharf", type:"both", price:"£28", rating:4.9, reviews:142, hours:"6am–10pm", temp:"3°C", tags:["Finnish","Ice Bath","Luxury"], emoji:"🔥🧊", open:true, hygiene:"A+", lockers:true, transport:"Canary Wharf (Jubilee/DLR) · 3 min", parking:"NCP Canary Wharf · 5 min", desc:"London's largest sauna — a circular space for 65 people with ice baths and a curated sound system.", nearby:{ coffee:[{n:"Grind Canary Wharf",t:"Coffee",d:"2 min"},{n:"Naoki Matcha",t:"Matcha",d:"4 min"}], pubs:[{n:"The Gun",t:"Gastropub",d:"6 min",note:"Classic Thames-side pub"},{n:"Henry Addington",t:"Pub",d:"4 min",note:"Good ale selection"}], food:[{n:"Roka Canary Wharf",t:"Japanese",d:"5 min",note:"Ideal post-sauna"},{n:"Dishoom",t:"Indian",d:"8 min",note:"Best dal in London"}] }},
  { id:2, city:"London", country:"UK", name:"Community Sauna Hackney", area:"Hackney Wick", type:"sauna", price:"£9.50", rating:4.8, reviews:89, hours:"10am–9pm", temp:"No plunge", tags:["Wood-fired","Community","Budget"], emoji:"🔥", open:true, hygiene:"A", lockers:false, transport:"Hackney Wick (Overground) · 6 min", parking:"Street parking", desc:"The original London community sauna. Multiple East London locations.", nearby:{ coffee:[{n:"Counter Culture",t:"Coffee",d:"5 min"}], pubs:[{n:"The Carpenter's Arms",t:"Pub",d:"7 min",note:"Local favourite"},{n:"Hackney Wick Bar",t:"Bar",d:"4 min",note:"Great craft beers"}], food:[{n:"Cornerstone",t:"Seafood",d:"8 min",note:"Michelin-starred"},{n:"Barge East",t:"River Dining",d:"5 min",note:"Floating restaurant"}] }},
  { id:3, city:"London", country:"UK", name:"Banya No.1 Chiswick", area:"Chiswick", type:"both", price:"£38", rating:4.8, reviews:201, hours:"9am–11pm", temp:"Ice buckets", tags:["Russian Banya","Traditional","Steam"], emoji:"♨️", open:true, hygiene:"A", lockers:true, transport:"Chiswick Park (District) · 10 min", parking:"Free street parking weekends", desc:"Authentic Russian banya with hot rooms, steam, cold plunges and traditional platza treatment.", nearby:{ coffee:[{n:"Gail's Chiswick",t:"Coffee",d:"4 min"}], pubs:[{n:"The Swan",t:"Pub",d:"5 min",note:"River views, great wine"},{n:"Mawson Arms",t:"Historic Pub",d:"6 min",note:"Fuller's brewery tap"}], food:[{n:"La Trompette",t:"French",d:"6 min",note:"Neighbourhood gem"},{n:"High Road Brasserie",t:"Brasserie",d:"4 min",note:"Lovely terrace"}] }},

  // ── BATH ──
  { id:4, city:"Bath", country:"UK", name:"Thermae Bath Spa", area:"City Centre", type:"both", price:"£45", rating:4.8, reviews:2841, hours:"9am–9:30pm", temp:"Rooftop pool", tags:["Roman Hot Springs","Iconic","Rooftop Pool"], emoji:"♨️🌿", open:true, hygiene:"A+", lockers:true, transport:"Bath Spa station · 5 min walk", parking:"Southgate car park · 7 min", desc:"The only natural thermal spa in the UK, built above Roman hot springs that have flowed for 10,000 years. Open-air rooftop pool with views over Bath. An absolute bucket list venue.", nearby:{ coffee:[{n:"Colonna & Small's",t:"Coffee",d:"6 min",note:"World-class specialty coffee"},{n:"Moksha Caffe",t:"Coffee",d:"4 min"}], pubs:[{n:"The Star Inn",t:"Historic Pub",d:"8 min",note:"Bath's most historic pub, 18th century"},{n:"The Bell",t:"Live Music Pub",d:"9 min",note:"Great local institution"}], food:[{n:"The Circus Restaurant",t:"Modern British",d:"7 min",note:"Outstanding seasonal menu"},{n:"Yak Yeti Yak",t:"Nepalese",d:"5 min",note:"Bath institution, brilliant value"}] }},
  { id:5, city:"Bath", country:"UK", name:"Campwell Farm Sauna", area:"Bradford on Avon", type:"both", price:"£25", rating:4.9, reviews:134, hours:"Wed–Sun · sessions bookable", temp:"Cold plunge / shower", tags:["Wood-fired","Forest","Countryside"], emoji:"🔥🌲", open:true, hygiene:"A+", lockers:false, transport:"Bradford-on-Avon station · 15 min", parking:"Free on-site at Church Farm", desc:"Hidden on the edge of woodland 15 minutes from Bath. Wood-fired sauna created to reconnect people with nature. Quiet, magical, and genuinely restorative.", nearby:{ coffee:[{n:"The Bunch of Grapes",t:"Café/Pub",d:"10 min",note:"Bradford on Avon's favourite"},{n:"Canteen",t:"Coffee",d:"8 min"}], pubs:[{n:"The Canal Tavern",t:"Canalside Pub",d:"12 min",note:"Towpath pub, beautiful setting"},{n:"Bradford on Avon pubs",t:"Various",d:"10 min",note:"Lovely market town"}], food:[{n:"The Bunch of Grapes",t:"Gastropub",d:"10 min",note:"Excellent food and wine"}] }},
  { id:6, city:"Bath", country:"UK", name:"Aether Sauna Warleigh Weir", area:"River Avon", type:"both", price:"£28", rating:4.9, reviews:78, hours:"Sessions bookable online", temp:"River Avon", tags:["Riverside","Wood-fired","Wild Swim"], emoji:"🌊🔥", open:true, hygiene:"A+", lockers:false, transport:"Bathampton · 20 min walk", parking:"Warleigh Lane · limited", desc:"Brand new for 2025. Perched on the banks of the River Avon at Warleigh Weir — one of the UK's most-loved wild swimming spots. Sauna, steam and a cold Avon plunge in the same breath.", nearby:{ coffee:[{n:"The George Inn Bathampton",t:"Pub/Café",d:"25 min walk"}], pubs:[{n:"The George Inn",t:"Canalside Pub",d:"25 min walk",note:"Stunning canal-side setting"}], food:[{n:"Bring your own — it's glorious countryside"}] }},

  // ── BRISTOL ──
  { id:7, city:"Bristol", country:"UK", name:"Bristol Community Sauna", area:"Brislington", type:"both", price:"£12", rating:4.8, reviews:312, hours:"Daily — multiple sessions", temp:"5°C / 10°C plunge", tags:["Finnish","Community","Budget"], emoji:"🔥🧊", open:true, hygiene:"A", lockers:true, transport:"Bus 349 St Anne's Rd · 3 min", parking:"On-site parking off Trym Rd", desc:"14-person locally-built Finnish sauna in the garden of St Anne's House. Two cold plunges at 5°C and 10°C plus three cold showers. Membership from £15/month.", nearby:{ coffee:[{n:"Tincan Coffee Co",t:"Coffee",d:"12 min"},{n:"Playground Coffee",t:"Coffee",d:"10 min"}], pubs:[{n:"The Rhubarb Tavern",t:"Local",d:"5 min",note:"Friendly local pub"},{n:"The Old Market Tavern",t:"Craft Beer",d:"8 min",note:"Great Bristol ales"}], food:[{n:"Brislington Chippy",t:"Fish & Chips",d:"4 min",note:"Post-sauna classic"},{n:"Souk Kitchen",t:"Middle Eastern",d:"12 min",note:"Bristol favourite"}] }},
  { id:8, city:"Bristol", country:"UK", name:"Ardagh Community Sauna", area:"Horfield", type:"both", price:"£10", rating:4.8, reviews:178, hours:"Multiple weekly sessions", temp:"Ambient plunge pools", tags:["Wood-fired","Community","Budget"], emoji:"🔥", open:true, hygiene:"A", lockers:false, transport:"Bus along Kellaway Ave · 5 min", parking:"Ardagh Pavilion car park · Free", desc:"Large wood-fired sauna on Horfield Common with cold plunge pools and solar-heated showers. Regular music events — Sauna Sounds — combine heat with live performance.", nearby:{ coffee:[{n:"Extract Coffee Horfield",t:"Coffee",d:"8 min"}], pubs:[{n:"The Annexe Inn",t:"Local",d:"6 min",note:"Horfield local, unpretentious"},{n:"Sportsman Inn",t:"Pub",d:"7 min",note:"Classic Bristol boozer"}], food:[{n:"Aldi Horfield (post-session essentials)",t:"Supermarket",d:"5 min"},{n:"The Gallimaufry",t:"Café/Bar",d:"12 min",note:"Bristol creative quarter institution"}] }},
  { id:9, city:"Bristol", country:"UK", name:"Sivo Wellness Leigh Court", area:"Abbots Leigh", type:"both", price:"£30", rating:4.8, reviews:96, hours:"Bookable sessions — see website", temp:"Ice baths filtered", tags:["Boutique","Country Estate","Finnish"], emoji:"🔥🧊", open:true, hygiene:"A+", lockers:true, transport:"Bus 1 · Long Ashton P&R", parking:"Leigh Court free on-site", desc:"Set within the serene grounds of Leigh Court estate. Pristine saunas and filtered ice baths designed for comfort and calm. Changing rooms, towels and refreshments included.", nearby:{ coffee:[{n:"Leigh Court Farm Shop Café",t:"Coffee",d:"5 min"}], pubs:[{n:"The Bird in Hand Saltmarsh",t:"Country Pub",d:"8 min",note:"Brilliant country gastropub"},{n:"The George Inn Abbots Leigh",t:"Village Pub",d:"6 min",note:"Classic Somerset village pub"}], food:[{n:"The Bird in Hand",t:"Gastropub",d:"8 min",note:"Exceptional food"},{n:"Leigh Court Farm Shop",t:"Deli/Café",d:"5 min",note:"Local produce heaven"}] }},
  { id:10, city:"Bristol", country:"UK", name:"Sensate Spa Studios", area:"City Centre / Clifton", type:"both", price:"£35", rating:4.9, reviews:54, hours:"3–4 sessions per day · max 6", temp:"Cold plunge pool", tags:["Secret Garden","Boutique","Private"], emoji:"♨️🌿", open:true, hygiene:"A+", lockers:false, transport:"Bus 8 · Clifton Triangle · 5 min", parking:"Clifton street parking", desc:"Hidden behind old temple doors in a secret garden built from 80% recycled materials. Hot tub, sauna, and cold plunge with only 6 guests per session. Bristol's most intimate wellness space.", nearby:{ coffee:[{n:"Small Street Espresso",t:"Coffee",d:"8 min",note:"Bristol's finest espresso bar"},{n:"Wogan Coffee Clifton",t:"Coffee",d:"5 min"}], pubs:[{n:"The Clifton Wine Bar",t:"Wine Bar",d:"4 min",note:"Excellent natural wine list"},{n:"The Albion",t:"Pub",d:"6 min",note:"Classic Clifton gastro pub"}], food:[{n:"Clifton Sausage",t:"Bistro",d:"5 min",note:"Bristol brunch classic"},{n:"Bulrush",t:"Fine Dining",d:"8 min",note:"Michelin-starred, book ahead"}] }},

  // ── BRIGHTON ──
  { id:11, city:"Brighton", country:"UK", name:"Sauna in the Lanes", area:"The Lanes", type:"both", price:"£25", rating:4.9, reviews:287, hours:"Daily · check schedule", temp:"Cold plunge pools ×2", tags:["Nordic","City Centre","Historic Courtyard"], emoji:"🔥🧊", open:true, hygiene:"A+", lockers:true, transport:"Brighton station · 12 min walk · Bus 1/7 closer", parking:"NCP Lanes · 5 min", desc:"Authentic Nordic sauna tucked into the courtyard of Brighton's first synagogue. Built in Estonian alderwood with a Huum beehive stove. Two cold plunge pools, outdoor showers, lockers. Steps from the beach.", nearby:{ coffee:[{n:"Pelicano Coffee",t:"Coffee",d:"4 min"},{n:"Small Batch Coffee",t:"Coffee",d:"3 min",note:"Brighton's signature roaster"}], pubs:[{n:"The Basketmakers Arms",t:"Traditional Pub",d:"6 min",note:"Brighton institution, 300+ whiskies"},{n:"The Cricketers",t:"Historic Pub",d:"5 min",note:"Brighton's oldest pub"}], food:[{n:"The Salt Room",t:"Seafood",d:"10 min",note:"Brighton's best seafood, sea views"},{n:"Cin Cin",t:"Italian",d:"7 min",note:"Outstanding pasta"}] }},
  { id:12, city:"Brighton", country:"UK", name:"The Holistic Sauna", area:"Hove Seafront", type:"both", price:"£22", rating:4.7, reviews:143, hours:"Daily · morning and evening sessions", temp:"Channel via beach access", tags:["Seafront","Finnish","Sea Plunge"], emoji:"🌊🔥", open:true, hygiene:"A", lockers:true, transport:"Hove station · 10 min walk", parking:"Kingsway seafront parking", desc:"Finnish barrel sauna on Hove seafront with direct access to the English Channel. The cold plunge is the sea itself — walk 50 metres and you're in.", nearby:{ coffee:[{n:"Hove Actually",t:"Coffee",d:"5 min"},{n:"Coffee @ 33",t:"Coffee",d:"3 min"}], pubs:[{n:"The Geese",t:"Local",d:"5 min",note:"Unpretentious Hove local"},{n:"The Caxton Arms",t:"Pub",d:"7 min",note:"Old-school Brighton pub"}], food:[{n:"Chard",t:"Modern British",d:"8 min",note:"Brilliant Hove neighbourhood restaurant"},{n:"Riddle & Finns",t:"Seafood",d:"10 min",note:"Brighton seafood classic"}] }},
  { id:13, city:"Brighton", country:"UK", name:"Fire & Ice Wellness", area:"Westbury-on-Trym (nr Bristol)", type:"both", price:"£20", rating:4.8, reviews:167, hours:"Sessions incl. silent Wednesdays", temp:"Natural spring cold plunge", tags:["Spring Water","Forest","Silent Sessions"], emoji:"🌿🧊", open:true, hygiene:"A+", lockers:false, transport:"Bus to Westbury-on-Trym · 5 min", parking:"Off Trym Rd · Free", desc:"Sauna and cold plunge fed by natural spring water with no chlorine. Silent sessions every Wednesday evening. A genuinely restorative experience in a natural setting.", nearby:{ coffee:[{n:"Friska Westbury",t:"Coffee",d:"7 min"}], pubs:[{n:"The Prince of Wales",t:"Village Pub",d:"5 min",note:"Classic Westbury local"},{n:"The White Horse",t:"Pub",d:"6 min",note:"Good food and beer"}], food:[{n:"The Westbury Arms",t:"Gastropub",d:"4 min",note:"Solid local food"},{n:"Polpo Clifton",t:"Italian",d:"12 min",note:"Casual Italian done well"}] }},

  // ── DUBLIN ──
  { id:14, city:"Dublin", country:"Ireland", name:"The Sea Sauna", area:"Donabate", type:"both", price:"€20", rating:4.9, reviews:118, hours:"8am–8pm", temp:"Irish Sea", tags:["Outdoor","Coastal","Wood-fired"], emoji:"🌊🔥", open:true, hygiene:"A", lockers:false, transport:"Donabate DART · 12 min", parking:"Free on-site", desc:"Wood-fired sauna overlooking the Irish Sea. The cold plunge is the North Atlantic. Pure magic.", nearby:{ coffee:[{n:"The Bakehouse",t:"Coffee",d:"10 min"}], pubs:[{n:"The Grand Hotel Bar",t:"Pub",d:"8 min",note:"Classic Irish bar"},{n:"Donabate Village Pub",t:"Local",d:"5 min",note:"Post-plunge pint heaven"}], food:[{n:"The Waterside",t:"Seafood",d:"10 min",note:"Local catch"},{n:"Café Paloma",t:"Café",d:"7 min",note:"Great brunch"}] }},
  { id:15, city:"Dublin", country:"Ireland", name:"The Outcast Saunas", area:"Prussia Street", type:"sauna", price:"€25", rating:4.8, reviews:94, hours:"11am–9pm", temp:"Cold shower", tags:["Outdoor","Urban","Trendy"], emoji:"🔥", open:true, hygiene:"A", lockers:true, transport:"Stoneybatter Bus · 3 min", parking:"Street parking", desc:"Dublin's coolest outdoor sauna on Prussia Street. A great atmosphere and growing community.", nearby:{ coffee:[{n:"Brother Hubbard North",t:"Coffee",d:"6 min"},{n:"Matcha & Co",t:"Matcha",d:"4 min"}], pubs:[{n:"The Cobblestone",t:"Traditional Irish",d:"5 min",note:"Best trad sessions in Dublin"},{n:"Mulligan's Stoneybatter",t:"Local",d:"4 min",note:"Brilliant local boozer"}], food:[{n:"The Hill",t:"Casual",d:"5 min",note:"Great burgers"},{n:"Delahunt",t:"Modern Irish",d:"8 min",note:"Seasonal Irish cuisine"}] }},
  { id:16, city:"Dublin", country:"Ireland", name:"Riverbank Sauna", area:"Palmerstown", type:"both", price:"€22", rating:4.8, reviews:53, hours:"10am–8pm", temp:"River Liffey", tags:["Riverside","Scenic","Outdoor"], emoji:"🌿🔥", open:true, hygiene:"A+", lockers:false, transport:"Bus 25/66 · 5 min", parking:"Free on-site", desc:"Wood-fired sauna on the banks of the Liffey. One of Dublin's most unique wellness experiences.", nearby:{ coffee:[{n:"Blanchardstown Centre Café",t:"Coffee",d:"8 min"}], pubs:[{n:"The Anglers Rest",t:"Gastropub",d:"6 min",note:"Riverside pub"},{n:"Brady's Chapelizod",t:"Historic",d:"5 min",note:"One of Dublin's oldest pubs"}], food:[{n:"The Mullingar House",t:"Traditional",d:"7 min",note:"Irish pub grub done right"}] }},

  // ── GALWAY ──
  { id:17, city:"Galway", country:"Ireland", name:"Sauna Fiáin", area:"Oranmore / Renville Pier", type:"both", price:"€22", rating:4.9, reviews:87, hours:"9am–7pm", temp:"Wild Atlantic", tags:["Wood-fired","Wild Atlantic","Outdoor"], emoji:"🌊🔥", open:true, hygiene:"A", lockers:false, transport:"Oranmore · 5 min from pier", parking:"Free at Renville Pier", desc:"Hand-built Finnish sauna at Renville Pier on the Wild Atlantic Way. Plunge into the Atlantic or a cold barrel.", nearby:{ coffee:[{n:"Oranmore Village Café",t:"Coffee",d:"8 min"}], pubs:[{n:"The Huntsman Inn",t:"Gastropub",d:"10 min",note:"Great seafood"},{n:"Griffin's Bar",t:"Local",d:"7 min",note:"Classic Irish local"}], food:[{n:"Kai Restaurant",t:"Modern Irish",d:"20 min",note:"Galway institution"},{n:"The House Hotel",t:"Brunch",d:"15 min",note:"Best brunch in Galway"}] }},

  // ── CORK ──
  { id:18, city:"Cork", country:"Ireland", name:"The Hot Box Cork City", area:"City Centre", type:"both", price:"€20", rating:4.8, reviews:134, hours:"9am–9pm", temp:"3 temps available", tags:["Sauna Village","Multi-plunge","Urban"], emoji:"🔥🧊", open:true, hygiene:"A", lockers:true, transport:"Cork City Bus · 4 min", parking:"Paid multi-storey nearby", desc:"Cork's sauna village — five unique experiences and plunge pools at three temperatures.", nearby:{ coffee:[{n:"Cork Coffee Roasters",t:"Coffee",d:"3 min"},{n:"Filter Coffee Bar",t:"Coffee",d:"4 min"}], pubs:[{n:"The Oval Bar",t:"Traditional",d:"4 min",note:"Cork institution since 1920s"},{n:"An Bróg",t:"Local",d:"5 min",note:"Great pints"}], food:[{n:"Market Lane",t:"Modern Irish",d:"6 min",note:"Outstanding local produce"},{n:"Nash 19",t:"Café/Bistro",d:"5 min",note:"The Cork brunch spot"}] }},

  // ── MANCHESTER ──
  { id:19, city:"Manchester", country:"UK", name:"Kontrast", area:"Northern Quarter", type:"both", price:"£17", rating:4.8, reviews:167, hours:"8am–10pm", temp:"3°C / 8°C / 12°C", tags:["Community","Café On-site","Finnish"], emoji:"🔥🧊", open:true, hygiene:"A+", lockers:true, transport:"Manchester Victoria · 8 min walk", parking:"NCP Piccadilly · 10 min", desc:"UK's first sauna and ice bath café. Three plunge pools from 3–12°C and two Finnish saunas.", nearby:{ coffee:[{n:"Kontrast Café",t:"Coffee",d:"On-site"},{n:"Takk Coffee",t:"Coffee",d:"4 min"}], pubs:[{n:"The Marble Arch Inn",t:"Craft Beer",d:"6 min",note:"Best craft beer pub in Mcr"},{n:"Britons Protection",t:"Historic Pub",d:"8 min",note:"200-year-old institution"}], food:[{n:"Elnecot",t:"Modern British",d:"5 min",note:"NQ gem"},{n:"Sugo Pasta Kitchen",t:"Italian",d:"6 min",note:"Best pasta outside Italy"}] }},
  { id:20, city:"Manchester", country:"UK", name:"FIX MCR", area:"City Centre", type:"both", price:"£22", rating:4.9, reviews:89, hours:"6am–9pm", temp:"4°C / 10°C", tags:["UK's Biggest Sauna","Breathwork","Himalayan Salt"], emoji:"⚡🧊", open:true, hygiene:"A+", lockers:true, transport:"Deansgate (Metrolink) · 5 min", parking:"Deansgate car park", desc:"UK's largest cedar sauna with Himalayan salt walls. Guided breathwork and sound healing.", nearby:{ coffee:[{n:"Federal Café",t:"Coffee",d:"6 min"},{n:"Blank Street",t:"Coffee",d:"3 min"}], pubs:[{n:"Albert Square Chop House",t:"Gastropub",d:"5 min",note:"Manchester institution"},{n:"Bunny Jackson's",t:"Bar",d:"4 min",note:"Great cocktails"}], food:[{n:"Hawksmoor Manchester",t:"Steakhouse",d:"7 min",note:"Post-sauna protein"},{n:"Mana",t:"Fine Dining",d:"10 min",note:"Michelin-starred"}] }},

  // ── NEW YORK ──
  { id:21, city:"New York", country:"USA", name:"Othership Flatiron", area:"Flatiron, Manhattan", type:"both", price:"$65", rating:4.9, reviews:312, hours:"6am–10pm", temp:"0–4°C plunge", tags:["Guided Breathwork","Luxury","Finnish"], emoji:"🔥🧊", open:true, hygiene:"A+", lockers:true, transport:"23rd St (N/R/F/M/1) · 4 min", parking:"SP+ Parking · 5 min", desc:"Multi-sensory sauna and cold plunge with guided breathwork. NYC's most talked-about wellness venue.", nearby:{ coffee:[{n:"La Colombe",t:"Coffee",d:"3 min"},{n:"MatchaBar",t:"Matcha",d:"5 min"}], pubs:[{n:"The Flatiron Room",t:"Whiskey Bar",d:"4 min",note:"300+ whiskeys"},{n:"Craft Bar",t:"American",d:"5 min",note:"Great beer and food"}], food:[{n:"Eleven Madison Park",t:"Fine Dining",d:"6 min",note:"World class"},{n:"Shake Shack Madison Sq",t:"Burgers",d:"3 min",note:"The OG location"}] }},
  { id:22, city:"New York", country:"USA", name:"Bathhouse Flatiron", area:"Flatiron, Manhattan", type:"both", price:"$65", rating:4.8, reviews:245, hours:"7am–11pm", temp:"45°F cold pools", tags:["Thermal Pools","Russian Banya","Upscale"], emoji:"♨️🌊", open:true, hygiene:"A+", lockers:true, transport:"23rd St (N/R) · 6 min", parking:"Icon Parking · 4 min", desc:"Six thermal pools including Russian banya and infrared sauna. Pools heated by crypto mining.", nearby:{ coffee:[{n:"Blue Bottle Coffee",t:"Coffee",d:"4 min"},{n:"Cha Cha Matcha",t:"Matcha",d:"3 min"}], pubs:[{n:"The Breslin",t:"Gastropub",d:"4 min",note:"Ace Hotel bar"},{n:"NoMad Bar",t:"Cocktails",d:"5 min",note:"World-class cocktails"}], food:[{n:"Gramercy Tavern",t:"American",d:"8 min",note:"NYC classic"},{n:"Cosme",t:"Mexican",d:"7 min",note:"Best modern Mexican NYC"}] }},

  // ── LOS ANGELES ──
  { id:23, city:"Los Angeles", country:"USA", name:"Teddy's Hot House Venice", area:"Venice Beach", type:"both", price:"$35", rating:4.9, reviews:178, hours:"7am–9pm", temp:"Cold plunge outdoor", tags:["Community","Venice","Contrast Therapy"], emoji:"🔥🧊", open:true, hygiene:"A+", lockers:true, transport:"Bus Rapid Transit Venice · 5 min", parking:"Street parking or beach lot", desc:"What started in a backyard is now Venice's favourite contrast therapy studio. 90-minute cycles of hot/cold/repeat.", nearby:{ coffee:[{n:"Blue Bottle Venice",t:"Coffee",d:"4 min"},{n:"Cha Cha Matcha Venice",t:"Matcha",d:"3 min"}], pubs:[{n:"The Brig",t:"Craft Beer",d:"5 min",note:"Venice institution"},{n:"Townhouse Venice",t:"Dive Bar",d:"4 min",note:"Old-school Venice, legendary"}], food:[{n:"Gjusta",t:"Deli/Bakery",d:"6 min",note:"LA's best deli"},{n:"Felix Trattoria",t:"Italian",d:"5 min",note:"Best pasta in LA"}] }},

  // ── SAN FRANCISCO ──
  { id:24, city:"San Francisco", country:"USA", name:"Onsen SF Bathhouse", area:"Tenderloin", type:"both", price:"$65", rating:4.8, reviews:112, hours:"Daily 10am–10pm", temp:"Cold plunge shower", tags:["Redwood Sauna","Japanese Soak","Robes Included"], emoji:"♨️🧊", open:true, hygiene:"A+", lockers:true, transport:"Powell BART/Muni · 8 min", parking:"Civic Center Garage", desc:"3,200 sq ft urban oasis with redwood sauna, steam room, cold-plunge shower and 104°F soaking pool. Robes and towels included.", nearby:{ coffee:[{n:"Equator Coffees",t:"Coffee",d:"6 min"}], pubs:[{n:"Smuggler's Cove",t:"Tiki Bar",d:"8 min",note:"Best rum selection on earth"},{n:"The Alembic",t:"Cocktails",d:"10 min",note:"Serious cocktail bar"}], food:[{n:"Zuni Café",t:"Californian",d:"5 min",note:"SF institution"},{n:"Brenda's French Soul Food",t:"Creole",d:"4 min",note:"Queue for this one"}] }},

  // ── EDINBURGH ──
  { id:25, city:"Edinburgh", country:"UK", name:"Portobello Beach Sauna", area:"Portobello Beach", type:"both", price:"£15", rating:4.9, reviews:203, hours:"8am–8pm", temp:"Firth of Forth", tags:["Beach","Wood-fired","Community"], emoji:"🌊🔥", open:true, hygiene:"A+", lockers:false, transport:"Bus 26/45 · 5 min walk", parking:"Beach Road free parking", desc:"Wood-fired sauna steps from the beach with the Firth of Forth as your cold plunge. The Edinburgh sauna experience.", nearby:{ coffee:[{n:"Fortitude Coffee Portobello",t:"Coffee",d:"6 min"}], pubs:[{n:"The Espy",t:"Pub",d:"4 min",note:"Best beer garden in Edinburgh"},{n:"The Portobello Bar",t:"Local",d:"3 min",note:"Classic Scottish local"}], food:[{n:"Port Mahon",t:"Spanish",d:"5 min",note:"Excellent tapas"},{n:"Café Truva",t:"Turkish",d:"4 min",note:"Edinburgh's best brunch"}] }},

  // ── BELFAST ──
  { id:26, city:"Belfast", country:"UK", name:"Ormeau Baths Spa", area:"Ormeau Road", type:"both", price:"£18", rating:4.7, reviews:76, hours:"9am–9pm", temp:"Cold plunge", tags:["Historic Building","Finnish","Urban"], emoji:"🔥🧊", open:true, hygiene:"A", lockers:true, transport:"Metro Bus · 4 min", parking:"Street parking Ormeau", desc:"Victorian bathhouse converted into a wellness space with Finnish sauna, steam and cold plunge. Beautiful historic building.", nearby:{ coffee:[{n:"Established Coffee",t:"Coffee",d:"5 min",note:"Belfast's best"},{n:"Suki Tea",t:"Tea",d:"6 min"}], pubs:[{n:"The Errigle Inn",t:"Traditional",d:"4 min",note:"Classic south Belfast"},{n:"Sunflower Bar",t:"Craft Beer",d:"8 min",note:"Belfast's best craft bar"}], food:[{n:"Ox Belfast",t:"Modern Irish",d:"10 min",note:"One of Ireland's best restaurants"},{n:"General Merchants",t:"Brunch",d:"6 min",note:"Best brunch in Belfast"}] }},

  // ── HELSINKI ──
  { id:27, city:"Helsinki", country:"Finland", name:"Löyly Public Sauna", area:"Hernesaari", type:"both", price:"€29", rating:4.9, reviews:1240, hours:"11am–10pm", temp:"Baltic Sea", tags:["Iconic","Wood-fired","Restaurant On-site"], emoji:"🌊🔥", open:true, hygiene:"A+", lockers:true, transport:"Tram 6 Hernesaarenranta · 5 min", parking:"Löyly parking lot", desc:"Helsinki's most famous sauna. Stunning waterfront architecture, three saunas, and a direct plunge into the Baltic Sea. Restaurant on-site.", nearby:{ coffee:[{n:"Löyly Café",t:"Coffee",d:"On-site"}], pubs:[{n:"Löyly Bar",t:"Bar",d:"On-site",note:"Pre or post sauna"},{n:"A21 Cocktail Bar",t:"Cocktails",d:"15 min",note:"Helsinki's best cocktail bar"}], food:[{n:"Löyly Restaurant",t:"Nordic/Finnish",d:"On-site",note:"Outstanding Finnish cuisine"}] }},
  { id:28, city:"Helsinki", country:"Finland", name:"Sompasauna", area:"Kallio / Sompasaari", type:"both", price:"Free", rating:4.9, reviews:432, hours:"Always open", temp:"Gulf of Finland", tags:["Free","Community","24/7"], emoji:"🔥🌊", open:true, hygiene:"A", lockers:false, transport:"Tram 6 · 10 min walk", parking:"Street parking", desc:"Helsinki's legendary free sauna — run by volunteers, open 24/7, year-round. Bring your own beer. The most authentic sauna experience in the world.", nearby:{ coffee:[{n:"Kahvila Sävy",t:"Coffee",d:"10 min"}], pubs:[{n:"Kulma Bar",t:"Local",d:"12 min",note:"Kallio neighbourhood character"},{n:"Bar Kino",t:"Cinema Bar",d:"10 min"}], food:[{n:"Döner Harju",t:"Street Food",d:"8 min",note:"After-sauna Helsinki tradition"}] }},
  { id:29, city:"Helsinki", country:"Finland", name:"Allas Sea Pool", area:"Market Square", type:"both", price:"€18", rating:4.8, reviews:567, hours:"8am–10pm", temp:"Baltic Sea +10°C", tags:["Outdoor Pools","City Centre","Year-round"], emoji:"🌊♨️", open:true, hygiene:"A+", lockers:true, transport:"Market Square · steps away", parking:"Katajanokan parking", desc:"Year-round outdoor sea pools with sauna right at Helsinki's Market Square. The most central sauna experience in Finland.", nearby:{ coffee:[{n:"Fazer Café Kluuvi",t:"Coffee",d:"8 min"}], pubs:[{n:"Kappeli",t:"Bar",d:"5 min",note:"Helsinki's most iconic café-bar"}], food:[{n:"Market Square stalls",t:"Street Food",d:"On-site",note:"Fresh Baltic herring and reindeer rolls"}] }},

  // ── STOCKHOLM ──
  { id:30, city:"Stockholm", country:"Sweden", name:"Centralbadet", area:"Norrmalm", type:"both", price:"SEK 350 (~£26)", rating:4.8, reviews:689, hours:"7am–9:30pm", temp:"Cold plunge pools", tags:["Art Nouveau","Historic","1904"], emoji:"♨️🧊", open:true, hygiene:"A+", lockers:true, transport:"T-Centralen · 5 min", parking:"Q-Park City · 5 min", desc:"Stunning 1904 Art Nouveau bathhouse in the city centre. Sauna, steam rooms, pools and cold plunges in a truly beautiful building.", nearby:{ coffee:[{n:"Drop Coffee",t:"Coffee",d:"8 min",note:"Stockholm's best specialty"},{n:"Johan & Nyström",t:"Coffee",d:"6 min"}], pubs:[{n:"Pharmarium",t:"Cocktails",d:"7 min",note:"Apothecary-themed, brilliant"}], food:[{n:"Operakällaren",t:"Swedish Fine Dining",d:"5 min",note:"Sweden's most storied restaurant"},{n:"Meatballs for the People",t:"Swedish",d:"8 min",note:"Definitive Swedish meatballs"}] }},
  { id:31, city:"Stockholm", country:"Sweden", name:"Hellasgården", area:"Nacka Forest", type:"both", price:"SEK 160 (~£12)", rating:4.9, reviews:445, hours:"7am–9pm", temp:"Lake Källtorpssjön", tags:["Forest","Lake Plunge","Traditional"], emoji:"🌲🔥", open:true, hygiene:"A+", lockers:true, transport:"Bus 401 from Slussen · 20 min", parking:"Hellasgården car park · Free", desc:"Traditional Swedish sauna in a forest reserve outside Stockholm. Lake plunge in summer, through a hole in the ice in winter. Life-changing.", nearby:{ coffee:[{n:"Hellasgården Café",t:"Coffee",d:"On-site",note:"Homemade buns"}], pubs:[{n:"Forest only — that's the point"}], food:[{n:"Hellasgården Restaurant",t:"Swedish",d:"On-site",note:"Classic Swedish home cooking"}] }},

  // ── COPENHAGEN ──
  { id:32, city:"Copenhagen", country:"Denmark", name:"La Banchina", area:"Refshaleøen", type:"both", price:"Free entry", rating:4.9, reviews:567, hours:"8am–9pm", temp:"Copenhagen Harbour", tags:["Harbour","Rustic","Café On-site"], emoji:"🌊🔥", open:true, hygiene:"A+", lockers:false, transport:"Bus 9A · 10 min walk", parking:"Refshaleøen free parking", desc:"Rustic wooden sauna, cold harbour plunge, and a small café serving natural wine and food. Copenhagen's most beloved wellness spot.", nearby:{ coffee:[{n:"La Banchina Café",t:"Coffee",d:"On-site",note:"Excellent coffee and natural wine"}], pubs:[{n:"Mikkeller Bar",t:"Craft Beer",d:"15 min",note:"Copenhagen's legendary craft beer bar"}], food:[{n:"Barr Restaurant",t:"New Nordic",d:"8 min",note:"NOMA team's casual restaurant"},{n:"Hija de Sanchez",t:"Tacos",d:"20 min",note:"Best tacos in Scandinavia"}] }},

  // ── OSLO ──
  { id:33, city:"Oslo", country:"Norway", name:"KOK Oslo Sauna Bar", area:"Sørenga", type:"both", price:"NOK 295 (~£22)", rating:4.9, reviews:498, hours:"12pm–10pm", temp:"Oslofjord 4–15°C", tags:["Bar On-site","Fjord Plunge","Social"], emoji:"🌊🔥", open:true, hygiene:"A+", lockers:true, transport:"Bus 60 Sørenga · 5 min", parking:"Limited street parking", desc:"Sauna bar right on the Oslofjord. Plunge into the fjord, then warm up with a beer or aquavit. The quintessential Oslo experience.", nearby:{ coffee:[{n:"Tim Wendelboe",t:"Coffee",d:"18 min",note:"World-famous Oslo roastery"},{n:"Fuglen Oslo",t:"Coffee",d:"20 min",note:"Most iconic Norwegian café"}], pubs:[{n:"KOK Bar",t:"Bar",d:"On-site",note:"Cold beers and aquavit post-plunge"}], food:[{n:"Maaemo",t:"Norwegian Fine Dining",d:"12 min",note:"Three Michelin stars"},{n:"Mathallen Food Hall",t:"Food Hall",d:"15 min",note:"Oslo's best food market"}] }},
];

const CITIES = ["All","London","Bath","Bristol","Brighton","Dublin","Galway","Cork","Manchester","Edinburgh","Belfast","New York","Los Angeles","San Francisco","Helsinki","Stockholm","Copenhagen","Oslo"];
const FLAG = { London:"🇬🇧", Bath:"🇬🇧", Bristol:"🇬🇧", Brighton:"🇬🇧", Dublin:"🇮🇪", Galway:"🇮🇪", Cork:"🇮🇪", Manchester:"🇬🇧", Edinburgh:"🇬🇧", Belfast:"🇬🇧", "New York":"🇺🇸", "Los Angeles":"🇺🇸", "San Francisco":"🇺🇸", Helsinki:"🇫🇮", Stockholm:"🇸🇪", Copenhagen:"🇩🇰", Oslo:"🇳🇴" };
const REGION_MAP = { London:"UK & Ireland", Bath:"UK & Ireland", Bristol:"UK & Ireland", Brighton:"UK & Ireland", Dublin:"UK & Ireland", Galway:"UK & Ireland", Cork:"UK & Ireland", Manchester:"UK & Ireland", Edinburgh:"UK & Ireland", Belfast:"UK & Ireland", "New York":"USA", "Los Angeles":"USA", "San Francisco":"USA", Helsinki:"Nordic", Stockholm:"Nordic", Copenhagen:"Nordic", Oslo:"Nordic" };

const TAGS_COLOR = {
  "Finnish":{bg:"rgba(196,97,42,0.15)",c:"#E8855A"}, "Ice Bath":{bg:"rgba(125,211,240,0.15)",c:"#7DD3F0"},
  "Luxury":{bg:"rgba(212,168,71,0.15)",c:"#D4A847"}, "Budget":{bg:"rgba(74,222,128,0.15)",c:"#4ade80"},
  "Community":{bg:"rgba(167,139,250,0.15)",c:"#a78bfa"}, "Wood-fired":{bg:"rgba(196,97,42,0.15)",c:"#E8855A"},
  "Free":{bg:"rgba(74,222,128,0.15)",c:"#4ade80"}, "Iconic":{bg:"rgba(212,168,71,0.15)",c:"#D4A847"},
  "Boutique":{bg:"rgba(212,168,71,0.15)",c:"#D4A847"}, "Historic":{bg:"rgba(125,211,240,0.15)",c:"#7DD3F0"},
  "Nordic":{bg:"rgba(125,211,240,0.15)",c:"#7DD3F0"}, "Coastal":{bg:"rgba(125,211,240,0.15)",c:"#7DD3F0"},
};
const getTag = t => TAGS_COLOR[t] || { bg:"rgba(255,255,255,0.07)", c:"rgba(255,255,255,0.45)" };

const NEARBY_ICON = { Coffee:"☕", Matcha:"🍵", Tea:"🍵", Pub:"🍺", "Craft Beer":"🍺", "Irish Bar":"🍻", Bar:"🍸", Cocktails:"🍸", "Wine Bar":"🍷", "Historic Pub":"🍺", "Local":"🍺", "Traditional":"🍺", "Traditional Pub":"🍺", "Dive Bar":"🍺", "Tiki Bar":"🍸", Japanese:"🍣", Indian:"🍛", Italian:"🍝", French:"🥐", Seafood:"🦞", "Modern British":"🍽️", "Modern Irish":"🌿", American:"🍔", Burgers:"🍔", Pizza:"🍕", "Street Food":"🌮", Bakery:"🥐", "Deli/Bakery":"🥐", Brunch:"🥞", "Café/Bistro":"☕", Swedish:"🦌", Norwegian:"🦌", Finnish:"🦌", "Nordic/Finnish":"🌿", "Fine Dining":"⭐", Steakhouse:"🥩", Brasserie:"🥂", Bistro:"🥂", Gastropub:"🍽️", Canalside:"⚓" };
const nearbyIcon = t => NEARBY_ICON[t] || "🍽️";

export default function App() {
  const [tab, setTab] = useState("discover");
  const [city, setCity] = useState("All");
  const [region, setRegion] = useState("All");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState([1, 4, 19, 27, 32]);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [nearbyTab, setNearbyTab] = useState("coffee");

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2000); };
  const toggleSave = id => {
    setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
    showToast(saved.includes(id) ? "Removed" : "Saved ❤️");
  };

  const regionCities = ["All", ...CITIES.filter(c => c !== "All" && (region === "All" || REGION_MAP[c] === region))];
  const filtered = VENUES.filter(v => {
    const cityOk = city === "All" || v.city === city;
    const regionOk = region === "All" || REGION_MAP[v.city] === region;
    const typeOk = typeFilter === "all" || v.type === typeFilter || (typeFilter === "both" && v.type === "both");
    const q = search.toLowerCase();
    const searchOk = !search || v.name.toLowerCase().includes(q) || v.area.toLowerCase().includes(q) || v.city.toLowerCase().includes(q) || v.tags.some(t => t.toLowerCase().includes(q)) || v.desc.toLowerCase().includes(q);
    return cityOk && regionOk && typeOk && searchOk;
  });

  // ─── STYLES ──────────────────────────────────────────────────────────────────
  const s = {
    wrap: { fontFamily:"'DM Sans',system-ui,sans-serif", background:"#070C12", minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center", padding:"20px" },
    phone: { width:"375px", height:"812px", background:"#0D1521", borderRadius:"46px", overflow:"hidden", position:"relative", boxShadow:"0 50px 100px rgba(0,0,0,0.85), inset 0 0 0 1.5px rgba(255,255,255,0.06)", display:"flex", flexDirection:"column" },
    notch: { height:"44px", background:"#070C12", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 },
    notchPill: { width:"120px", height:"30px", background:"#000", borderRadius:"22px" },
    screen: { flex:1, overflow:"hidden", position:"relative" },
    scroll: { height:"100%", overflowY:"auto", scrollbarWidth:"none" },
    nav: { height:"72px", background:"rgba(7,12,18,0.97)", backdropFilter:"blur(20px)", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"space-around", flexShrink:0, paddingBottom:"8px" },
    navBtn: () => ({ display:"flex", flexDirection:"column", alignItems:"center", gap:"3px", background:"none", border:"none", cursor:"pointer", padding:"4px 14px" }),
    navIcon: a => ({ fontSize:"20px", filter:a?"none":"grayscale(1) opacity(0.25)", transform:a?"scale(1.1)":"scale(1)", transition:"all 0.2s" }),
    navLabel: a => ({ fontSize:"10px", fontWeight:700, color:a?"#C4612A":"rgba(255,255,255,0.2)", transition:"color 0.2s", letterSpacing:"0.3px" }),
    pill: (a, accent) => ({ padding:"6px 14px", borderRadius:"100px", border:"none", cursor:"pointer", fontSize:"11px", fontWeight:700, background:a?(accent||"#C4612A"):"rgba(255,255,255,0.05)", color:a?"white":"rgba(255,255,255,0.38)", transition:"all 0.2s", flexShrink:0, fontFamily:"inherit", whiteSpace:"nowrap" }),
    card: { background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:"18px", marginBottom:"10px", overflow:"hidden", cursor:"pointer", transition:"border-color 0.2s" },
    cardImg: t => ({ height:"66px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"28px", background: t==="sauna"?"linear-gradient(135deg,#251408,#3A1C0A)": t==="plunge"?"linear-gradient(135deg,#061420,#0A2035)":"linear-gradient(135deg,#1E1005,#071520)" }),
    infoBox: { background:"rgba(255,255,255,0.035)", borderRadius:"10px", padding:"9px 11px" },
    infoLabel: { fontSize:"9px", color:"rgba(255,255,255,0.28)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:"3px" },
    sheet: { position:"absolute", inset:0, background:"rgba(0,0,0,0.85)", zIndex:50, display:"flex", flexDirection:"column", justifyContent:"flex-end" },
    sheetInner: { background:"#111B27", borderRadius:"28px 28px 0 0", border:"1px solid rgba(255,255,255,0.07)", maxHeight:"92%", display:"flex", flexDirection:"column" },
    bookBtn: { width:"100%", padding:"15px", borderRadius:"13px", background:"#C4612A", border:"none", color:"white", fontWeight:"800", fontSize:"15px", cursor:"pointer", fontFamily:"inherit" },
    toast: { position:"absolute", bottom:"80px", left:"20px", right:"20px", zIndex:100, padding:"11px 16px", borderRadius:"12px", background:"#C4612A", color:"white", fontSize:"13px", fontWeight:700, textAlign:"center", boxShadow:"0 8px 24px rgba(0,0,0,0.5)" },
  };

  // ─── VENUE CARD ───────────────────────────────────────────────────────────────
  const VenueCard = ({ v }) => (
    <div style={s.card} onClick={() => { setSelected(v); setNearbyTab("coffee"); }}>
      <div style={s.cardImg(v.type)}>{v.emoji}</div>
      <div style={{ padding:"11px 14px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"5px" }}>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:"13px", fontWeight:700, color:"white", marginBottom:"1px" }}>{FLAG[v.city]} {v.name}</div>
            <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.32)" }}>{v.area} · {v.city}</div>
          </div>
          <button style={{ background:"none", border:"none", cursor:"pointer", fontSize:"15px", flexShrink:0, paddingLeft:"8px", color:saved.includes(v.id)?"#e05a5a":"rgba(255,255,255,0.18)" }} onClick={e => { e.stopPropagation(); toggleSave(v.id); }}>{saved.includes(v.id) ? "❤️" : "🤍"}</button>
        </div>
        <div style={{ display:"flex", gap:"5px", flexWrap:"wrap", marginBottom:"6px" }}>
          {v.tags.slice(0,2).map(t => { const {bg,c} = getTag(t); return <span key={t} style={{ padding:"2px 7px", borderRadius:"5px", fontSize:"9px", fontWeight:700, background:bg, color:c }}>{t}</span>; })}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:"14px", fontWeight:800, color:"white" }}>{v.price}</div>
            <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.28)", marginTop:"1px" }}>{v.temp}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:"12px", fontWeight:700, color:C.gold }}>★ {v.rating}</div>
            <div style={{ fontSize:"9px", color:"rgba(255,255,255,0.28)" }}>{v.reviews} reviews</div>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── DISCOVER ─────────────────────────────────────────────────────────────────
  const DiscoverScreen = () => (
    <div style={s.scroll}>
      <div style={{ padding:"20px 16px 0" }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px" }}>
          <div>
            <div style={{ fontFamily:"Georgia, serif", fontSize:"24px", fontWeight:"bold", color:"white", letterSpacing:"-0.5px" }}>
              therm<span style={{ color:C.ember }}>ae</span>
            </div>
            <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.3)", marginTop:"1px", letterSpacing:"0.3px" }}>{CITIES.length - 1} cities · {VENUES.length} curated venues</div>
          </div>
          <div style={{ background:"rgba(196,97,42,0.12)", border:"1px solid rgba(196,97,42,0.25)", borderRadius:"10px", padding:"7px 10px", fontSize:"15px" }}>♨️</div>
        </div>

        {/* Search */}
        <div style={{ position:"relative", marginBottom:"10px" }}>
          <span style={{ position:"absolute", left:"11px", top:"50%", transform:"translateY(-50%)", fontSize:"12px" }}>🔍</span>
          <input placeholder="City, venue, vibe..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width:"100%", padding:"10px 11px 10px 32px", borderRadius:"12px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", color:"white", fontSize:"12px", fontFamily:"inherit", outline:"none", boxSizing:"border-box" }} />
        </div>

        {/* Region filter */}
        <div style={{ display:"flex", gap:"6px", marginBottom:"8px", overflowX:"auto", scrollbarWidth:"none" }}>
          {["All","UK & Ireland","Nordic","USA"].map(r => (
            <button key={r} style={s.pill(region===r)} onClick={() => { setRegion(r); setCity("All"); }}>
              {r==="Nordic"?"🧊 Nordic":r==="USA"?"🇺🇸 USA":r==="UK & Ireland"?"🇬🇧🇮🇪 UK+IE":"All"}
            </button>
          ))}
        </div>

        {/* City filter */}
        <div style={{ display:"flex", gap:"6px", marginBottom:"8px", overflowX:"auto", scrollbarWidth:"none" }}>
          {regionCities.map(c => (
            <button key={c} style={s.pill(city===c)} onClick={() => setCity(c)}>
              {c==="All" ? "All Cities" : c}
            </button>
          ))}
        </div>

        {/* Type filter */}
        <div style={{ display:"flex", gap:"6px", marginBottom:"12px" }}>
          {[["all","All"],["sauna","🔥 Sauna"],["plunge","🧊 Cold"],["both","♾️ Both"]].map(([v,l]) => (
            <button key={v} style={s.pill(typeFilter===v,"#7DD3F0")} onClick={() => setTypeFilter(v)}>{l}</button>
          ))}
        </div>

        <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.22)", marginBottom:"10px" }}>{filtered.length} venue{filtered.length!==1?"s":""}</div>
        {filtered.map(v => <VenueCard key={v.id} v={v} />)}
        <div style={{ height:"24px" }}></div>
      </div>
    </div>
  );

  // ─── SAVED ────────────────────────────────────────────────────────────────────
  const SavedScreen = () => {
    const sv = VENUES.filter(v => saved.includes(v.id));
    const cities = [...new Set(sv.map(v => v.city))];
    return (
      <div style={s.scroll}>
        <div style={{ padding:"20px 16px" }}>
          <div style={{ fontFamily:"Georgia, serif", fontSize:"20px", fontWeight:"bold", color:"white", marginBottom:"2px" }}>Saved</div>
          <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.3)", marginBottom:"16px" }}>
            {sv.length} venue{sv.length!==1?"s":""}{cities.length>0?` · ${cities.join(", ")}`:""}</div>
          {sv.length===0
            ? <div style={{ textAlign:"center", paddingTop:"60px" }}>
                <div style={{ fontSize:"40px", marginBottom:"12px" }}>🤍</div>
                <div style={{ fontSize:"15px", fontWeight:700, color:"white", marginBottom:"6px" }}>Nothing saved yet</div>
                <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.35)" }}>Tap the heart on any venue to save it</div>
              </div>
            : sv.map(v => <VenueCard key={v.id} v={v} />)}
        </div>
      </div>
    );
  };

  // ─── NEARBY TABS ─────────────────────────────────────────────────────────────
  const NearbySection = ({ venue }) => {
    const tabs = [
      { id:"coffee", label:"☕ Coffee", data: venue.nearby?.coffee || [] },
      { id:"pubs",   label:"🍺 Pubs",   data: venue.nearby?.pubs   || [] },
      { id:"food",   label:"🍽️ Eat",    data: venue.nearby?.food   || [] },
    ];
    const activeData = tabs.find(t => t.id === nearbyTab)?.data || [];
    return (
      <div>
        <div style={{ display:"flex", gap:"6px", marginBottom:"9px" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setNearbyTab(t.id)} style={{ flex:1, padding:"7px 4px", borderRadius:"9px", border:`1px solid ${nearbyTab===t.id?"#C4612A":"rgba(255,255,255,0.07)"}`, background:nearbyTab===t.id?"rgba(196,97,42,0.1)":"transparent", color:nearbyTab===t.id?"#E8855A":"rgba(255,255,255,0.35)", fontSize:"11px", fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
              {t.label}{t.data.length>0?` (${t.data.length})`:""}
            </button>
          ))}
        </div>
        {activeData.length === 0
          ? <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.25)", textAlign:"center", padding:"10px 0" }}>No listings yet</div>
          : activeData.map((item, i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"9px 11px", background:"rgba(255,255,255,0.035)", borderRadius:"10px", marginBottom:"6px", border:"1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display:"flex", gap:"8px", alignItems:"flex-start", flex:1 }}>
                  <span style={{ fontSize:"15px", flexShrink:0, marginTop:"1px" }}>{nearbyIcon(item.t)}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:"12px", fontWeight:700, color:"white" }}>{item.n}</div>
                    <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.3)" }}>{item.t}</div>
                    {item.note && <div style={{ fontSize:"10px", color:"rgba(196,97,42,0.8)", marginTop:"2px", fontStyle:"italic" }}>{item.note}</div>}
                  </div>
                </div>
                <span style={{ fontSize:"10px", color:"#7DD3F0", fontWeight:700, flexShrink:0, marginLeft:"8px" }}>{item.d}</span>
              </div>
            ))}
      </div>
    );
  };

  // ─── VENUE DETAIL SHEET ───────────────────────────────────────────────────────
  const VenueDetail = ({ venue, onClose }) => (
    <div style={s.sheet} onClick={onClose}>
      <div style={s.sheetInner} onClick={e => e.stopPropagation()}>
        <div style={{ width:"36px", height:"4px", background:"rgba(255,255,255,0.12)", borderRadius:"100px", margin:"12px auto 0" }}></div>
        {/* Header */}
        <div style={{ padding:"14px 18px 0" }}>
          <div style={{ fontSize:"30px", marginBottom:"8px" }}>{venue.emoji}</div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"2px" }}>
            <div>
              <div style={{ fontSize:"18px", fontWeight:800, color:"white", lineHeight:1.2 }}>{FLAG[venue.city]} {venue.name}</div>
              <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.38)", marginTop:"3px" }}>{venue.area} · {venue.city} · {venue.country}</div>
            </div>
            <div style={{ textAlign:"right", flexShrink:0, marginLeft:"10px" }}>
              <div style={{ fontSize:"15px", fontWeight:800, color:C.gold }}>★ {venue.rating}</div>
              <div style={{ fontSize:"9px", color:"rgba(255,255,255,0.3)" }}>{venue.reviews} reviews</div>
            </div>
          </div>
        </div>
        {/* Scrollable body */}
        <div style={{ flex:1, overflowY:"auto", padding:"12px 18px 24px" }}>
          {/* Info grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"7px", marginBottom:"9px" }}>
            <div style={s.infoBox}><div style={s.infoLabel}>Price</div><div style={{ fontSize:"14px", fontWeight:800, color:"white" }}>{venue.price}</div></div>
            <div style={s.infoBox}><div style={s.infoLabel}>Hours</div><div style={{ fontSize:"11px", fontWeight:600, color:"white" }}>{venue.hours}</div></div>
            <div style={s.infoBox}><div style={s.infoLabel}>Plunge Temp</div><div style={{ fontSize:"12px", fontWeight:700, color:"#7DD3F0" }}>{venue.temp}</div></div>
            <div style={s.infoBox}><div style={s.infoLabel}>Hygiene</div><div style={{ fontSize:"13px", fontWeight:700, color:"#4ade80" }}>{venue.hygiene}</div></div>
          </div>
          {/* Amenity pill */}
          <div style={{ marginBottom:"9px" }}>
            <span style={{ padding:"5px 10px", borderRadius:"8px", fontSize:"10px", fontWeight:700, background:venue.lockers?"rgba(74,222,128,0.12)":"rgba(255,255,255,0.04)", color:venue.lockers?"#4ade80":"rgba(255,255,255,0.22)", border:`1px solid ${venue.lockers?"rgba(74,222,128,0.2)":"rgba(255,255,255,0.07)"}` }}>{venue.lockers?"🔒 Lockers":"🔒 No lockers"}</span>
          </div>
          {/* Transport & parking */}
          <div style={{ display:"grid", gap:"6px", marginBottom:"9px" }}>
            <div style={s.infoBox}><div style={s.infoLabel}>🚇 Transport</div><div style={{ fontSize:"11px", color:"white", marginTop:"2px" }}>{venue.transport}</div></div>
            <div style={s.infoBox}><div style={s.infoLabel}>🚗 Parking</div><div style={{ fontSize:"11px", color:"white", marginTop:"2px" }}>{venue.parking}</div></div>
          </div>
          {/* Description */}
          <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.45)", lineHeight:1.65, marginBottom:"10px" }}>{venue.desc}</p>
          {/* Tags */}
          <div style={{ display:"flex", gap:"5px", flexWrap:"wrap", marginBottom:"14px" }}>
            {venue.tags.map(t => { const{bg,c}=getTag(t); return <span key={t} style={{ padding:"3px 9px", borderRadius:"6px", fontSize:"10px", fontWeight:700, background:bg, color:c }}>{t}</span>; })}
          </div>
          {/* Nearby section */}
          <div style={{ fontSize:"10px", fontWeight:700, color:"rgba(255,255,255,0.28)", textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:"8px" }}>📍 Nearby</div>
          <NearbySection venue={venue} />
          {/* Action buttons */}
          <div style={{ marginTop:"14px" }}>
            <button style={s.bookBtn} onClick={() => { showToast("Opening booking page..."); onClose(); }}>
              Book at {venue.name} →
            </button>
            <div style={{ display:"flex", gap:"8px", marginTop:"8px" }}>
              <button style={{ flex:"0 0 48px", padding:"13px", borderRadius:"11px", background:saved.includes(venue.id)?"rgba(224,90,90,0.1)":"rgba(255,255,255,0.05)", border:`1px solid ${saved.includes(venue.id)?"rgba(224,90,90,0.3)":"rgba(255,255,255,0.08)"}`, color:saved.includes(venue.id)?"#e05a5a":"rgba(255,255,255,0.3)", fontSize:"16px", cursor:"pointer" }} onClick={() => toggleSave(venue.id)}>{saved.includes(venue.id) ? "❤️" : "🤍"}</button>
              <button style={{ flex:1, padding:"13px", borderRadius:"11px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.38)", fontSize:"12px", fontWeight:700, cursor:"pointer", fontFamily:"inherit" }} onClick={() => { showToast("Link copied! 🔗"); onClose(); }}>Share venue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const navItems = [{ id:"discover", icon:"♨️", label:"Discover" }, { id:"saved", icon:"❤️", label:"Saved" }];

  return (
    <div style={s.wrap}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');::-webkit-scrollbar{display:none;}input{color:white!important;}input::placeholder{color:rgba(255,255,255,0.22)!important;}`}</style>
      <div style={s.phone}>
        <div style={s.notch}><div style={s.notchPill}></div></div>
        <div style={s.screen}>
          {tab === "discover" ? <DiscoverScreen /> : <SavedScreen />}
          {selected && <VenueDetail venue={selected} onClose={() => setSelected(null)} />}
          {toast && <div style={s.toast}>{toast}</div>}
        </div>
        <div style={s.nav}>
          {navItems.map(n => (
            <button key={n.id} style={s.navBtn()} onClick={() => setTab(n.id)}>
              <span style={s.navIcon(tab===n.id)}>{n.icon}</span>
              <span style={s.navLabel(tab===n.id)}>{n.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
