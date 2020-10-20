let labels = [
  {txt: "front porch", sc: 1},
  {txt: "foyer", sc: 1},
  {txt: "living room", sc: 1},
  {txt: "hall",sc: 1},
  {txt: "bathroom", sc: 1},
  {txt: "bedroom", sc: 1},
  {txt: "bedroom guest",  sc: 1},
  {txt: "bathroom guest",  sc: 1},
  {txt: "kitchen",  sc: 1},
  {txt: "back porch", sc: 1},

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

let points = [
  {"id":"porch1", "name": "Front Porch", "icon": "porch", "x": 40, "y":298, "on": false, "connected": ["Foyer"]},
  {"id":"foyer", "name": "Foyer", "icon": "foyer", "x": 303.5, "y":162, "on": false, "connected": ["Front Porch", "Living Room"]},
  {"id":"living", "name": "Living Room", "icon": "living", "x": 595, "y":162, "on": false, "connected": ["Foyer", "Hall", "Kitchen"]},
  {"id":"hall", "name": "Hall", "icon": "hall", "x": 595, "y":350, "on": false, "connected": ["Bedroom", "Bathroom", "Bathroom Guest", "Bedroom Guest"]},
  {"id":"bathroom1", "name": "Bathroom", "icon":"bathroom", "x": 595, "y":470, "on": false, "connected": ["Hall"]},
  {"id":"bedroom1", "name": "Bedroom", "icon":"bedroom", "x": 293, "y":452, "on": false, "connected": ["Hall"]},
  {"id":"bedroom2", "name": "Bedroom Guest", "icon":"bedroom", "x": 1009, "y":408, "on": false, "connected": ["Hall", "Bathroom Guest"]},
  {"id":"bathroom2", "name": "Bathroom Guest", "icon":"bathroom", "x": 1115, "y":532, "on": false, "connected": ["Bedroom Guest"]},
  {"id":"kitchen", "name": "Kitchen", "icon":"kitchen", "x": 1008, "y":183, "on": false, "connected": ["Living Room", "Back Porch"]},
  {"id":"porch2", "name": "Back Porch", "icon": "porch", "x": 1257, "y":293, "on": false, "connected": ["Kitchen"]}
];

for (let i = 0; i < 10; i ++) {
  labels[i].x = points[i].x;
  labels[i].y = points[i].y+3;
}
