export const labels = [
  [
    {txt: "lukewarm peppermint tea", x:12, y:11.5},
    {txt: "Alexa, listening...", x:10, y:4},
    {txt: "dying house plant", x:1, y:1},
    {txt: "forgotten lunch tupperware", x:1, y: 10.8},
  ],
  [
    {txt: "(free) cherry flavored condoms", x:6.5, y:5},
    {txt: "love letters from exes", x:3, y:4},
    {txt: "rat-sized drain hairball", x:14.4, y:1},
    {txt: "8 weeks of laundry", x:14, y:7},
  ],
  [
    {txt: "$27,256 in student loan bills", x:11, y:10},
    {txt: "mania meds", x:14, y:5},
    {txt: "box full of green", x:6.5, y:3},
    {txt: "afternoon delight", x:7, y:2},
  ]
]

var labelsOG = [

  // foyer
  {txt: "Foster Wallace books (for looks)", x:240, y:250, sc: 2},
  {txt: "house plant that I overwatered", x:355, y:90, sc: 2},
  {txt: "past-due Amazon return",x:220, y:200,  sc: 3},
  {txt: "forgotten lunch tupperware", x:380, y:220, sc: 3},
  {txt: "decorative jar stolen (taken?) from bougie hotel", x:350, y:280, sc: 4},
  {txt: "$27,256 in student loan bills", x:220, y:50, sc: 4},


  // bedroom
  {txt: "lukewarm peppermint tea", x:210, y:500, sc: 2},
  {txt: "favorite earring lost behind dresser", x:220, y:360, sc: 2},
  {txt: "love letters from exes", x:300, y:330, sc: 3},
  {txt: "(free) cherry flavored condoms", x:380, y:520, sc: 3},
  {txt: "period blood-stained undies", x:350, y:550, sc: 4},
  {txt: "mania meds", x:200, y:400, sc: 4},
  {txt: "valuables box: birth certificate, social, passport", x:380, y:470, sc: 4},

  // bathroom
  {txt: "termite dust...", x:580, y:500, sc: 2},
  {txt: "rat-sized drain hairball", x:580, y:530, sc: 3},
  {txt: "15-year-expired laxatives", x:580, y:410, sc: 4},

  // bathroom 2
  {txt: "fungus amungus", x:1140, y:470, sc: 2},
  {txt: "shower blowie", x:1160, y:550, sc: 3},

  // hall
  {txt: "unplugged fire alarm", x:695, y:365, sc: 2},

  // back porch
  {txt: "fat cat sightings", x:1270, y:330, sc: 2},
  {txt: "spliff butts", x:1255, y:400, sc: 4},

  // front porch
  {txt: "3 Amazon packages worth of glitter", x:50, y:340, sc: 2},
  {txt: "not so secret key", x:55, y:500, sc: 3},

  // kitchen
  {txt: "ramen for days", x:950, y:260, sc: 2},
  {txt: "hot glue-able Mardi Gras bedazzlers", x:1080, y:80, sc: 2},
  {txt: "multiple dead cockroaches", x:900, y:150, sc: 3},
  {txt: "pantry moth infestation", x:1000, y:220, sc: 3},
  {txt: "very gassy gumbo", x:1080, y:260, sc: 4},
  {txt: "box full of green", x:1080, y:140, sc: 4},

  // living
  {txt: "color-coordinated textbooks", x:700, y:250, sc: 2},
  {txt: "side-of-the-road chair", x:590, y:50, sc: 2},
  {txt: "plastic World Market succulent", x:700, y:190, sc: 3},
  {txt: "Alexa, listening...", x:740, y:100, sc: 3},
  {txt: "afternoon delight", x:740, y:170, sc: 4},
  {txt: "unused ADT alarm", x:550, y:270, sc: 4},

  // 2nd bedroom
  {txt: "$4.34 in (scattered) change", x:900, y:460, sc: 2},
  {txt: "aspirational jeans", x:790, y:550, sc: 2},
  {txt: "70s porn mags from creepy uncle", x:940, y:340, sc: 3},

  {txt: "8 weeks of laundry", x:840, y:500, sc: 3},
  {txt: "magic mushrooms", x:840, y:420, sc: 4},
  {txt: "", x:920, y:550, sc: 4},


];

export const rooms = [
  {"name": "foyer", "icon": "foyer", "points": [0, 0, 0, 0,0,6,6,0,6,6,0,0,0, 0, 0], "iconPos": {x: 3, y: 3}},
  {"name": "living", "icon": "living", "points": [6, 0,0,6,0,6,14,0, 6, 14,0, 0,6, 0,0], "iconPos": {x: 10, y: 3}},
  {"name": "bathroom", "icon": "bathroom", "points": [14, 0,0,14,0, 6, 18,0,6, 18,0,0,14, 0,0], "iconPos": {x: 16, y: 3}},
  {"name": "kitchen", "icon": "kitchen", "points": [0,0,6, 0, 0,12,10,0, 12,10,0, 6,0,0,6], "iconPos": {x: 5, y: 9}},
  {"name": "bedroom", "icon": "bedroom", "points": [10,0, 6, 10, 0,12, 18,0, 12, 18,0,6,10,0, 6], "iconPos": {x: 12, y: 8}},
  {"name": "back yard", "icon": "backyard", "points": [], "iconPos": {x: 20, y: 8}},
  {"name": "front porch", "icon": "frontporch", "points": [], "iconPos": {x: -2, y: 3}}
];

export const roads = [
  [-2, 0, 3, 16, 0, 3],
  [3,0, 3, 3, 0, 8, 5, 0, 9],
  [10,0, 3, 12, 0, 8, 20, 0, 8]
];

export const doors = [
  [0, 0, 2, 0, 0, 4], //outsideDoor
  [2, 0, 6, 4, 0, 6], //kitchen
  [6, 0, 2, 6, 0, 4], // to living
  [14, 0, 2, 14, 0, 4], // bath
  [11, 0, 6, 13, 0, 6], // bed
  [18, 0, 7, 18, 0, 9] // back
]

export const roomLines = [
  [0, 0, 12, 18, 0, 12], // tophoriz
  [0, 0, 6, 2, 0, 6], // mid horiz
  [4, 0, 6, 11, 0, 6],
  [13, 0, 6, 18, 0, 6],
  [0, 0, 0, 18, 0, 0], // bottom horiz
  [0, 0, 0, 0, 0, 2], // vert bot left
  [0, 0, 4, 0, 0, 12],
  [6, 0, 0, 6, 0, 2],
  [6, 0, 4, 6, 0, 6],
  [10, 0, 6, 10, 0, 12],
  [14, 0, 0, 14, 0, 2],
  [14, 0, 4, 14, 0, 6],
  [18, 0, 0, 18, 0, 7],
  [18, 0, 9, 18, 0, 12],
]
