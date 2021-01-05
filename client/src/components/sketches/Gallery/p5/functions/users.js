

import { globalConfig, mouseToWorld, domCoordsToP5World } from "../../constants";

export function checkUserClicked(userEase, users, p5) {


    for (const otherUser of users) {
        if (otherUser.room === "gallery") {

            let mouse = mouseToWorld(userEase, p5)
            let userWorld = domCoordsToP5World(otherUser.x+17, otherUser.y-14)
            let userChat = {};
            userChat.x = userWorld.x + 23;
            userChat.y = userWorld.y - 16;
            let d = p5.dist(mouse.x, mouse.y, userWorld.x, userWorld.y);
            let dChat = p5.dist(mouse.x, mouse.y, userChat.x, userChat.y);

            // if (otherUser.userName === "cocktailBot") console.log(d, mx, my, otherUser.x, otherUser.y)
            if (d < 20 || dChat < 20) {
                return otherUser;
            }
        }
    }
    return null;
}

export function seeUserClicked(userEase, users, p5) {


    for (const otherUser of users) {
        if (otherUser.room === "gallery") {

            let mouse = mouseToWorld(userEase, p5)
            let userWorld = domCoordsToP5World(otherUser.x+17, otherUser.y-14)
            let userChat = {};
            userChat.x = userWorld.x + 23;
            userChat.y = userWorld.y - 16;
            let d = p5.dist(mouse.x, mouse.y, userWorld.x, userWorld.y);
            let dChat = p5.dist(mouse.x, mouse.y, userChat.x, userChat.y);

            p5.fill(0, 255, 0);
            
            // if (otherUser.userName === "cocktailBot") console.log(d, mx, my, otherUser.x, otherUser.y)
            if (d < 20 || dChat < 20) {
                p5.fill(255, 0, 0);
            }

            p5.ellipse(userChat.x, userChat.y, 24, 24);
        }
    }
    return null;
}


export function drawUser(user, p5) {
    p5.fill(255);
    p5.noStroke();
    p5.push();
    p5.textFont('times', 34);
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
    p5.text(user.avatar, -17, 17);

    p5.translate(0, 16);
    if (user.hasCheese) {
        drawCheese(p5);
    }

    if (user.hasWine) {
        drawWine(p5);
    }

    if (user.hasCocktail) {
        drawCocktail(p5);
    }

    p5.pop();
}

export function drawUsers(userEase, users, dogica, p5) {
    p5.fill(255);
    p5.noStroke();
    p5.textFont('times', 34);

    for (const otherUser of users) {
        let coord = domCoordsToP5World(otherUser.x, otherUser.y);
        let ava = otherUser.avatar;


        p5.push();
        p5.translate(coord.x, coord.y);
        p5.text(ava, 0, 0);

        if (otherUser.hasCheese || otherUser.hasWine || otherUser.hasCocktail) {
            p5.push();
            p5.translate(0, 24);
            drawLabel(p5, otherUser.userName, dogica);
            p5.pop();
        }
        else drawLabel(p5, otherUser.userName, dogica);
        
        p5.textFont('times');
        p5.textSize(34);

        if (p5.dist(otherUser.x, otherUser.y, userEase.x, userEase.y) < 150) {
            drawChat(p5);
        }

       
        if (otherUser.hasCheese) {
            drawCheese(p5);
        }

        if (otherUser.hasWine) {
            drawWine(p5);
        }

        if (otherUser.hasCocktail) {
            drawCocktail(p5);
        }

        p5.pop()
    }
}

function drawLabel(p5, name, dogica) {
    p5.textFont(dogica);
    p5.textSize(10);
    p5.noStroke();
    p5.fill(255);
    p5.rect(0, 0, p5.textWidth(name)+6, 12, 3, 3);
    p5.fill(0);
    p5.text(name, 3, 10);
}

function drawChat(p5) {
    p5.text("💬", 22, -14);
}

function drawCocktail(p5) {
    p5.text("🍸", 20, 20);
}

function drawCheese(p5) {
    p5.text("🧀", -10, 24);
    p5.text("🥖", 10, 24);
}

function drawWine(p5) {
    p5.text("🍷", -20, 20);
}