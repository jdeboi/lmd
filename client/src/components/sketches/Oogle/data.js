

export const labels = [
  [
    // foyer
    { lev: 0, id: 0, name: "petrified wood", x: .5, y: 5, img: "wood", stars: 3.2, description: "What goes on a mantle? Can someone please answer this question? Highly-curated photos only, please." },
    { lev: 0, id: 1, name: "floppy fish",x: 3, y: 3.5,  img: "bathroom", stars: 2.6, description: "Facebook ads for this interactive floppy fish really got me. So many videos of happy cats! Tacocat has been a pain in the ass lately and I thought an electronic toy would tire that boy out. Well, I'd give this thing 2 stars because he's excited about the fish for all of about 20 seconds before he could care less." },
    { lev: 0, id: 2, name: "dad epitomizing the 80s photoshoot", x: .5, y: 1, img: "plant", stars: 3, description: "des2" },

    // living
    { lev: 0, id: 3, name: "plastic succulent", x: 9, y: .2, img: "plastic", stars: 4.1, description: "I could blame this fake plant purchase on the fact that the living room doesn't get much light, but the truth is that I'm really terrible at keeping things alive. But honestly, I don't think anyone can tell this thing is fake. Extra stars." },
    { lev: 0, id: 4, name: "color-coded books",x: 6.5, y: 4.5, img: "books", stars: 3.3, description: "thank god I saved all those physics textbooks so that I can create a color-coded mantle filled with (mostly) meaningless items I'll never use again." },
    { lev: 0, id: 5, name: "trash TV", x: 7.5, y: 5.5, img: "tv", stars: 4.9, description: "Seriously, the things people throw away?? My netflix and chill game just stepped way up. This is like a 2010 Samsung. So maybe the resolution isn't excellent, but shit people." },

    // bath
    { lev: 0, id: 6, name: "sopping wet bath mat", x: 14.5, y: 2, img: "bathmat", stars: 4, description: "I discovered in my thirties that people use a towel to dry off before exiting the shower. I have been leaving mini lakes on the bathroom floor since about 1989. I'd give this $12 Target bath mat 4 stars b/c it's soft and good bang for your buck. But still can't compete with my post-shower deluge." },
    { lev: 0, id: 7, name: "dying house plant", x: 14.2, y: 5.5, img: "plant", stars: 1.1, description: "I'm not very good at plant care. Sorry, plants? Insta ladies make it look so easy." },
    
    // kitchen
    { lev: 0, id: 8, name: "craft drawer", x: .5, y: 7, img: "craft", stars: 4.5, description: "Craft, craft, craft! What is better than having every tool that you need to pull off that Lundi Gras headdress? Hot glue to the max! Also, Perler beads are the best rediscovery of my 30s." },
    { lev: 0, id: 9, name: "hiding vodka", x: 1.5, y: 10.8, img: "vodka", stars: 2.0, description: "I hid this bottle to prevent my partner from drinking like a fish. I can't tell if my hiding solution has had any effect." },
    { lev: 0, id: 10, name: "old takeout", x: 6, y: 9, img: "sponge", stars: 3.3, description: "Was this takeout ever any good? No. But what is the value of pulling food directly out of the fridge? Has to be worth like a letter grade or two on the food scale. I'll give this B- fried rice an 92.5%; and this teacher rounds up." },
    
    // bedroom
    { lev: 0, id: 11, name: "mardi gras ephemera", x: 14, y: 8, stars: 5.0, img: "mardi", description: "Every New Orleanian has a mardi gras closet. I think most New Orleanians need a Mardi Gras room. Seriously, best day of life." },
    { lev: 0, id: 12, name: "maw maw's painting", x: 11, y: 7, stars: 2.8, img: "mawmaw", description: "My grandmother described herself as a primitive Acadian artist. I'm pretty sure we don't use the word 'primitive' anymore. Secretly, I don't particularly care for her work." },
    { lev: 0, id: 13, name: "booty shorts", x: 11.5, y: 11, stars: 3.6, img: "booty", description: "More Mardi Gras accessories for my bootaytay. These shorts verge on wedgy-dom. I really don't like wedgies, which is why I have never-ever worn a thong. Except maybe that one time in 8th grade because maybe that's what the cool girls were doing or something. I don't get the butt floss, sorry." },

  ],
  [
    // foyer
    { lev: 1, id: 0, name: "stanky litter box", x: 4.5, y: 5, stars: 1.4, img: "litter", description: "Tacocat has started pooping outside, which iis the best thing ever. Except for the garden. Or the neighbors? Not actually sure where his excrement ends up. Regardless, stoked this litter requries less input." },
    { lev: 1, id: 1, name: "cat pee rug stain", x: 4, y: 3, stars: 0.1, img: "bathroom", description: "To clarify, this pee stain came from a previous roommate's cat. Cat pee is the worst." },

    // living
    { lev: 1, id: 2, name: "forgotten coffee", x: 7, y: 2, stars: 2.2, img: "coffee", description: "I have this weird proclivity for making tea and subsequently forgetting all about said tea.I have this weird proclivity for making coffee and subsequently forgetting all about said coffee. Sometimes I wonder if I even like coffee, or if I just drink it because that is a normalized part of our culture? Does it actually make me feel more awake? I guess placebo is real." },
    { lev: 1, id: 3, name: "unused DSLR", x: 9, y: 4, stars: 2.9, img: "dslr", description: "A decade old DSLR that I bought like a true hipstter for way too much money and never learned how to use properly. I wouldn't be surprised if my iphone takes better pictures." },
    { lev: 1, id: 4, name: "Alexa, listening...", x: 12, y: .5, stars: 1.8, img: "alexa", description: "This one time I was home all alone, and (THIS IS TRUE), out of the blue that bitch goes, 'JESUS CHRIST' and starts reading the wikipedia page of Jesus. Don't think I've been that afraid, like ever. Why are we submitting to this shit?"  },

    // bath
    { lev: 1, id: 5, name: "hairballs", x: 14.4, y: 1, stars: 0.8, img: "hairball", description: "I feel like I could create a voluminous wig from the hair I lose after every shower." },
    { lev: 1, id: 6, name: "unecessary tampons", x: 15, y: 3, stars: 4.5, img: "tampons", description: "Woooo UTI. I went the hormonal route b/c who wants worse periods??? Except what are those hormones doing to my sex drive and psyche and long-term health? Whatever, no babies." },

    // kitchen
    { lev: 1, id: 7, name: "gnarly sponge", x: 1, y: 9, stars: 0.6, img: "sponge", description: "Why do sponges smell that gross and very specific sponge smell? Wet towels don't smell that way? Rotting food doesn't? Please educate me, internet." },
    { lev: 1, id: 8, name: "overused swiffer pad", x: 5, y: 10, stars: 2.1, img: "swiffer", description: "Strangely, I ordered these on Amazon and they were delivered with a handwritten note that said something lke, 'please invest in our family-run business,' which has to be a scam?? Based on the Amazon review, there is no way this is a small family operation. Or maybe I just don't understand how Amazon actually works. I know, I know. Get off that shit!" },

    // bedroom
    { lev: 1, id: 9, name: "friendly scale", x: 15, y: 11.5, stars: 4.4, img: "scale", description: "I think the house is sinking and the floor is off-kilter which is why the scale always has nice things to say." },
    { lev: 1, id: 10, name: "8 weeks of laundry", x: 14, y: 6.5, stars: 1.2, img: "laundry", description: "I haven't done the laundry since I started dating my partner. He is amazing. But if it's left to me, I have way too many pairs of underwear to get that shit done." },
    { lev: 1, id: 11, name: "jewelry box", x: 11, y: 9, img: "jewelry", stars: 2.6, description: "My mom gave me this jewelry box. Most of the stuff in here are things I got from my grandmother that I would never wear (gaudy necklaces, mostly). Time to clear this baby out." },

  ],
  [
    // foyer
    { lev: 2, id: 0, name: "$27,256 in student loans", x: -.5, y: 5.5, stars: 1.1, img: "bills", description: "LOAN FORGIVNESS LETS GO. College is becoming (already is? has been?) a racket." },
    { lev: 2, id: 1, name: "uncle's erotic art", x: .5, y: 2, img: "por", stars: 2.0, description: "I think my dad's family talks about sex more than certainly any other family I've ever heard about. This is not a joke. Some pervy dudes. At least it's out in the open? This '20th century erotic art masters' book was a gift from one of those horny uncles. Ew (?)" },

    // living
    { lev: 2, id: 2, name: "money jars", x: 11, y: 2.5, img: "money", stars: 3.4, description: "Here's da bank! Bills bills bills." },
    { lev: 2, id: 3, name: "letters from exes", x: 11.3, y: 4.5, stars: 3.6, img: "exes", description: "There is something nice about receiving a written letter. Is that a dying art? Honestly I kind of like having Google Doc love letters; easier to keep track of. Better hope Google's encrypting those saucy bits." },
    { lev: 2, id: 4, name: "passport, social", x: 7, y: 3.5, stars: 4.4, img: "passport", description: "Passport, social, birth certificate - everything you need to take over my identity." },

    // bath
    { lev: 2, id: 5, name: "mania meds", x: 15, y: 4.2, img: "meds", stars: 2.5, description: "About 8 years ago I had a manic psychotic break and completely lost my mind. Thought I was the second coming of Christ and went on a meadering journey all over NY and New Jersey until my family tracked me down with Twitter..." },

    // kitchen
    { lev: 2, id: 6, name: "dank green", x: .5, y: 10, img: "green", stars: 4.6, description: "I honestly think I might be done with the green. No more psychosis for me." },
    { lev: 2, id: 7, name: "stolen pint glasses", x: 8, y: 6.5, stars: 2.8, img: "glass", description: "I didn't steal them, so no guilt. They're kind of tacky, though. When are we supposed to become the Pinterest versions of ourselves? Let's go with 40." },

    // bedroom
    { lev: 2, id: 8, name: "large black dildo", x: 10.1, y: 10, stars: 3.6, img: "dildo", description: "Consistently 9 inches. Need I say more?" },
    { lev: 2, id: 9, name: "nippy bra", x: 10.7, y: 7.8, img: "bra", stars: 1.1, description: "From Free People. I honestly don't know why this bra exists. It does literally nothing to support the boob or hide the nip. It is super flimsy and pointless. It's like Free People can just sell tissue and people will buy it. (This was given to me, not purchased)" },

  ]
]

export const rooms = [
  { "id": 0, "name": "foyer", "icon": "foyer", stars: 2.2, "points": [0, 0, 0, 0, 0, 6, 6, 0, 6, 6, 0, 0, 0, 0, 0], "iconPos": { x: 3, y: 3 }, img: "foyer", description: "The foyer is really just the, 'leave your crap here' room. One time I was waiting for the subway in Brooklyn with a huge IKEA bag full of random shit and this rat ran out from the tracks, grabbed a napkin, and pulled it into its little hole. We really aren't much different from subway mammals." },
  { "id": 1, "name": "living room", "icon": "living", stars: 4.4, "points": [6, 0, 0, 6, 0, 6, 14, 0, 6, 14, 0, 0, 6, 0, 0], "iconPos": { x: 10, y: 3 }, img: "bathroom", description: "The purchase of a Pottery Barn couch was such a game changer. When you get a good couch, you become a real adult. That is my honest metric." },
  { "id": 2, "name": "bathroom", "icon": "bathroom", stars: 4.1, "points": [14, 0, 0, 14, 0, 6, 18, 0, 6, 18, 0, 0, 14, 0, 0], "iconPos": { x: 16, y: 3 }, img: "bathroom", description: "Please let subway tile be cool for at least 5 years. Just re-did the bathroom to match the Pinterest so that shit better not change until I get my money's worth." },
  { "id": 3, "name": "kitchen", "icon": "kitchen", stars: 2.4, "points": [0, 0, 6, 0, 0, 12, 10, 0, 12, 10, 0, 6, 0, 0, 6], "iconPos": { x: 5, y: 9 }, img: "fridge", description: "This kitchen accidentally got painted this really offensive lime green (the paint swatches are hard to visualize on a wall if you aren't good at color!); color needs to go. Painting is just such a pain in the ass." },
  { "id": 4, "name": "bedroom", "icon": "bedroom", stars: 3.9, "points": [10, 0, 6, 10, 0, 12, 18, 0, 12, 18, 0, 6, 10, 0, 6], "iconPos": { x: 12, y: 8 }, img: "bedroom", description: "I inherited a Scandinavian bedroom set from my mom. Probably the bed I was conceived in. Try not to think about that too much." },
  { "id": 5, "name": "back yard", "icon": "backyard", stars: 4.0, "points": [], "iconPos": { x: 20, y: 8 }, img: "bbq", description: "We used the back porch so much before covid! Had a few great gatherings with fire pits; admittedly burned the deck and the plastic rug... oopsie." },
  { "id": 6, "name": "front porch", "icon": "frontporch", stars: 3.7, "points": [], "iconPos": { x: -2, y: 3 }, img: "front", description: "Porch game is so solid in New Orleans. I'd say this porch is pretty solid; the light can be kind of intense in the evening." }
];

export const roads = [
  [-2, 0, 3, 16, 0, 3],
  [3, 0, 3, 3, 0, 8, 5, 0, 9],
  [10, 0, 3, 12, 0, 8, 20, 0, 8]
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



// export const labelsOg2 = [
//   [
//     { lev: 0, id: 0, name: "forgotten coffee cup", x: 12, y: 11.5, img: "coffee", description: "I have this weird proclivity for making tea and subsequently forgetting all about said tea.I have this weird proclivity for making tea and subsequently forgetting all about said tea.I have this weird proclivity for making tea and subsequently forgetting all about said tea.I have this weird proclivity for making tea and subsequently forgetting all about said tea.I have this weird proclivity for making tea and subsequently forgetting all about said tea.I have this weird proclivity for making tea and subsequently forgetting all about said tea.I have this weird proclivity for making tea and subsequently forgetting all about said tea.I have this weird proclivity for making tea and subsequently forgetting all about said tea.I have this weird proclivity for making tea and subsequently forgetting all about said tea.I have this weird proclivity for making tea and subsequently forgetting all about said tea.I have this weird proclivity for making tea and subsequently forgetting all about said tea." },
//     { lev: 0, id: 1, name: "Alexa, listening...", x: 10, y: 4, img: "bathroom", description: "des1" },
//     { lev: 0, id: 2, name: "dying house plant", x: 1, y: 1, img: "plant", description: "des2" },
//     { lev: 0, id: 3, name: "smelly sponge", x: 1, y: 10.8, img: "sponge", description: "des3" },
//   ],
//   [
//     { lev: 1, id: 0, name: "nippy bra", x: 6.5, y: 5, img: "bra", description: "des4" },
//     { lev: 1, id: 1, name: "love letters from exes", x: 3, y: 4, img: "bathroom", description: "des5" },
//     { lev: 1, id: 2, name: "rat-sized drain hairball", x: 14.4, y: 1, img: "bathroom", description: "des6" },
//     { lev: 1, id: 3, name: "8 weeks of laundry", x: 14, y: 7, img: "bathroom", description: "des7" },
//   ],
//   [
//     { lev: 2, id: 0, name: "$27,256 in student loan bills", x: 11, y: 10, img: "bathroom", description: "des8" },
//     { lev: 2, id: 1, name: "mania meds", x: 14, y: 5, img: "meds", description: "des9" },
//     { lev: 2, id: 2, name: "box full of green", x: 6.5, y: 3, img: "bathroom", description: "des00" },
//     { lev: 2, id: 3, name: "large black dildo", x: 7, y: 2, img: "dildo", description: "des0000" },
//   ]
// ]

// var labelsOG = [

//   // foyer
//   { txt: "Foster Wallace books (for looks)", x: 240, y: 250, sc: 2 },
//   { txt: "house plant that I overwatered", x: 355, y: 90, sc: 2 },
//   { txt: "past-due Amazon return", x: 220, y: 200, sc: 3 },
//   { txt: "forgotten lunch tupperware", x: 380, y: 220, sc: 3 },
//   { txt: "decorative jar stolen (taken?) from bougie hotel", x: 350, y: 280, sc: 4 },
//   { txt: "$27,256 in student loan bills", x: 220, y: 50, sc: 4 },


//   // bedroom
//   { txt: "lukewarm peppermint tea", x: 210, y: 500, sc: 2 },
//   { txt: "favorite earring lost behind dresser", x: 220, y: 360, sc: 2 },
//   { txt: "love letters from exes", x: 300, y: 330, sc: 3 },
//   { txt: "(free) cherry flavored condoms", x: 380, y: 520, sc: 3 },
//   { txt: "period blood-stained undies", x: 350, y: 550, sc: 4 },
//   { txt: "mania meds", x: 200, y: 400, sc: 4 },
//   { txt: "valuables box: birth certificate, social, passport", x: 380, y: 470, sc: 4 },

//   // bathroom
//   { txt: "termite dust...", x: 580, y: 500, sc: 2 },
//   { txt: "rat-sized drain hairball", x: 580, y: 530, sc: 3 },
//   { txt: "15-year-expired laxatives", x: 580, y: 410, sc: 4 },

//   // bathroom 2
//   { txt: "fungus amungus", x: 1140, y: 470, sc: 2 },
//   { txt: "shower blowie", x: 1160, y: 550, sc: 3 },

//   // hall
//   { txt: "unplugged fire alarm", x: 695, y: 365, sc: 2 },

//   // back porch
//   { txt: "fat cat sightings", x: 1270, y: 330, sc: 2 },
//   { txt: "spliff butts", x: 1255, y: 400, sc: 4 },

//   // front porch
//   { txt: "3 Amazon packages worth of glitter", x: 50, y: 340, sc: 2 },
//   { txt: "not so secret key", x: 55, y: 500, sc: 3 },

//   // kitchen
//   { txt: "ramen for days", x: 950, y: 260, sc: 2 },
//   { txt: "hot glue-able Mardi Gras bedazzlers", x: 1080, y: 80, sc: 2 },
//   { txt: "multiple dead cockroaches", x: 900, y: 150, sc: 3 },
//   { txt: "pantry moth infestation", x: 1000, y: 220, sc: 3 },
//   { txt: "very gassy gumbo", x: 1080, y: 260, sc: 4 },
//   { txt: "box full of green", x: 1080, y: 140, sc: 4 },

//   // living
//   { txt: "color-coordinated textbooks", x: 700, y: 250, sc: 2 },
//   { txt: "side-of-the-road chair", x: 590, y: 50, sc: 2 },
//   { txt: "plastic World Market succulent", x: 700, y: 190, sc: 3 },
//   { txt: "Alexa, listening...", x: 740, y: 100, sc: 3 },
//   { txt: "afternoon delight", x: 740, y: 170, sc: 4 },
//   { txt: "unused ADT alarm", x: 550, y: 270, sc: 4 },

//   // 2nd bedroom
//   { txt: "$4.34 in (scattered) change", x: 900, y: 460, sc: 2 },
//   { txt: "aspirational jeans", x: 790, y: 550, sc: 2 },
//   { txt: "70s porn mags from creepy uncle", x: 940, y: 340, sc: 3 },

//   { txt: "8 weeks of laundry", x: 840, y: 500, sc: 3 },
//   { txt: "magic mushrooms", x: 840, y: 420, sc: 4 },
//   { txt: "", x: 920, y: 550, sc: 4 },


// ];
