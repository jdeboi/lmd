
export const rooms = [
    { id: 1, short: "mac", link: "macbook-air", title: "macbook air", x: 5, y: 22, rot: -90, dir: "right", about: "interior/exterior spaces online", shortcut: "&#x2318;1", year: 2020 },
    { id: 2, short: "wet", link: "wet-streams", title: "wet streams", x: 12, y: 13, rot: 0, dir: "bottom", about: "thinking about internet sexuality, online homemaking", shortcut: "&#x2318;2", year: 2020 },
    { id: 3, short: "hard", link: "hard-drives-on-seashores", title: "hard drives on seashores", x: 12, y: 8, rot: -90, dir: "right", about: "thinking about digital escape", shortcut: "&#x2318;3", year: 2020 },
    { id: 4, short: "jung", link: "jungle-gyms", title: "jungle gyms", x: 7, y: 8, rot: 90, dir: "left", about: "thinking about confined covid space", shortcut: "&#x2318;4", year: 2020 },
    { id: 5, short: "wasted", link: "wasted-days", title: "wasted days", x: 0, y: 17, rot: -90, dir: "right", about: "thinking about quarantine time", shortcut: "&#x2318;5", year: 2020 },
    { id: 6, short: "esc", link: "esc-to-mars", title: "esc to mars", x: 0, y: 0, rot: 0, dir: "bottom", about: "thinking about digital escape", shortcut: "&#x2318;6", year: 2020 },
    { id: 7, short: "xfin", link: "xfinity-depths", title: "xfinity depths", x: 5, y: 0, rot: 0, dir: "bottom", about: "thinking about infinite scroll", shortcut: "&#x2318;7", year: 2020 },
    { id: 8, short: "cloud", link: "cloud-confessional", title: "cloud confessional", x: 20, y: 22, rot: 90, dir: "left", about: "thinking about the quality of online social space", shortcut: "&#x2318;8", year: 2020 },
    { id: 9, short: "blind", link: "blind-eye", title: "blind eye", x: 15, y: 0, rot: 0, dir: "bottom", about: "How does the white cube translate into cyber-dimensions? What social and economic barriers (for example, systemic racism) prevent access to the art world, and how do these barriers operate online?", shortcut: "&#x2318;9", year: 2021 },
    { id: 10, short: "flush", link: "flush", title: "flush", x: 27, y: 5, rot: 90, dir: "left", about: "thinking about internet vortexes, blackholes, shitholes...", shortcut: "&#x2318;F1", year: 2020 },
    { id: 11, short: "home", link: "home-page", title: "home page", x: 27, y: 10, rot: 90, dir: "left", about: "thinking about digital privacy, digital/analog movement", shortcut: "&#x2318;F2", year: 2020 },
    { id: 12, short: "yose", link: "yosemite", title: "yosemite", x: -5, y: 12, rot: -90, dir: "right", about: "How do digital representations of ", shortcut: "&#x2318;F3", year: 2021 },
    { id: 13, short: "click", link: "click-me-baby", title: "click me, baby", x: 10, y: 0, rot: 0, dir: "bottom", about: "buy something!", shortcut: "&#x2318;F4", year: 2021 },
];

const sk = [...rooms];
sk.unshift({ id: 0, short: "gallery", title: "gallery", label: "gallery", link: "", classN: "gallery", shortcut: "&#x2318;0" })
export const sketches = sk;


export const getUrl = (short) => {
    let sk = sketches.find((sketch) => sketch.short === short);
    return "/" + sk.link;
}

export const getSketch = (room) => {
    return rooms.find((r) => r.link === room);
}

export const getRoomDescription = (room) => {
    let rm = rooms.find((r) => r.link === room);
    if (rm) {
        return rm.about;
    }
    return "";
}

export const getRoomTitle = (room) => {
    let rm = rooms.find((r) => r.link === room);
    if (rm) {
        return rm.title;
    }
    return "";
}

export const getRoomCount = (room, users) => {
    let rm = users.filter((usr) => usr.room === room);
    return rm.length+1;
}