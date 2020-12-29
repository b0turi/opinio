let ready = false;
let topText = "";
WebFont.load({
    google: {
        families: ['Lilita One', 'Arvo:bold']
    },
    active: function() {
        ready = true;
    }
});

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext('2d');

function drawText(x, y, width, size, text, color1, color2) {
    let firstLine = '';
    let secondLine = '';
    let yOffset = size / 2;
    ctx.font = size + 'px Lilita One';
    let textWidth = ctx.measureText(text).width;
    ctx.save();
    ctx.translate(x, y + size / 2);
    if(textWidth > width) {
        if (text.split(' ').length == 1) {
            ctx.translate(0, -(size - (size * width / textWidth)));
            ctx.scale(width / textWidth, width / textWidth);
            yOffset -= (size * width / textWidth);
        } else {
            secondLine = text;
            while (ctx.measureText(firstLine).width < ctx.measureText(secondLine).width && secondLine.split(' ').length > 1) {
                firstLine += secondLine.split(' ')[0] + ' ';
                secondLine = secondLine.substring(secondLine.indexOf(' ') + 1);
            }
            let firstLineWidth = ctx.measureText(firstLine).width;
            let secondLineWidth = ctx.measureText(secondLine).width;
            if(Math.max(firstLineWidth, secondLineWidth) > width) {
                textWidth = Math.max(firstLineWidth, secondLineWidth);
                ctx.translate(0, -(size - (size * width / textWidth)));
                ctx.scale(width / textWidth, width / textWidth);
                yOffset = 1.5 * (size * width / textWidth);
            } else {
                yOffset = 1.5 * size;
            }
        }
    }
    ctx.fillStyle = color2;
    ctx.fillText(secondLine != '' ? firstLine : text,
                textWidth > width ? 4 * width / textWidth : 4,
                -size + size / 12);
    if(secondLine != '') {
        ctx.fillText(secondLine,
                    textWidth > width ? 4 * width / textWidth : 4,
                    textWidth > width ? 4 : size + 4);
    }
    ctx.fillStyle = color1;
    ctx.strokeStyle = color2;
    ctx.lineWidth = textWidth > width ? 10 * width / textWidth : 6;

    ctx.strokeText(secondLine != '' ? firstLine : text, 0, -size);
    ctx.fillText(secondLine != '' ? firstLine : text, 0, -size);
    if(secondLine != '') {
        ctx.strokeText(secondLine, 0, 0);
        ctx.fillText(secondLine, 0, 0);
    }
    ctx.restore();

    return yOffset;
}

function drawAlbum(x, y, title, artist, rank, image) {

    let mainShadow = '#ab480b';
    let mainText = '#ede5d7';
    yOffset = drawText(x, y, 280, 35, title, mainText, mainShadow);
    drawText(x, y + yOffset, 280, 20, artist, mainText, mainShadow);
    ctx.fillStyle = mainShadow;
    ctx.fillRect(x - 120, y - 42, 110, 110);
    ctx.drawImage(image, x - 115, y - 38, 100, 100);

    ctx.font = rank == 10 ? '60px Arvo' : '90px Arvo';
    ctx.save();
    ctx.translate(x - 190, rank == 10 ? y + 40 : y + 50);
    ctx.fillStyle = mainShadow;
    ctx.fillText(''+rank, 0, 0);

    ctx.strokeStyle = mainShadow;
    ctx.lineWidth = 8;
    ctx.fillStyle = mainText;
    ctx.strokeText(''+rank, -6, -6);
    ctx.fillText(''+rank, -6, -6);
    ctx.restore();
}

function drawBackground(){
    ctx.fillStyle = '#ede5d7';
    ctx.fillRect(0, 0, 1000, 1000);

    ctx.fillStyle = '#ac0f16';
    ctx.fillRect(0, 0, 1000, 80);

    ctx.fillStyle = '#56070b';
    ctx.fillRect(0, 80, 1000, 8);

    ctx.fillStyle = '#bc3e44';
    ctx.fillRect(0, 0, 1000, 4);


    // gold
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(0, 88, 500, 502);

    ctx.fillStyle = '#FFA500';
    ctx.fillRect(0, 582, 500, 8);

    ctx.fillStyle = '#FFEC80';
    ctx.fillRect(0, 88, 500, 4);

    // silver
    ctx.fillStyle = '#B3C2CB';
    ctx.fillRect(0, 590, 500, 205);

    ctx.fillStyle = '#90A3A9';
    ctx.fillRect(0, 787, 500, 8);

    ctx.fillStyle = '#D6D6D6';
    ctx.fillRect(0, 590, 500, 4);

    // bronze
    ctx.fillStyle = '#cd853f';
    ctx.fillRect(0, 795, 500, 205);

    ctx.fillStyle = '#8e5925';
    ctx.fillRect(0, 992, 500, 8);

    ctx.fillStyle = '#EA9A4B';
    ctx.fillRect(0, 795, 500, 4);

    ctx.fillStyle = '#f1792f';
    ctx.fillRect(502, 88, 498, 1000);


    ctx.fillStyle = '#780408';
    ctx.fillRect(498, 88, 4, 1000);

    ctx.fillStyle = '#ab480b';
    ctx.fillRect(502, 212, 498, 8);
    ctx.fillRect(502, 342, 498, 8);
    ctx.fillRect(502, 472, 498, 8);
    ctx.fillRect(502, 602, 498, 8);
    ctx.fillRect(502, 732, 498, 8);
    ctx.fillRect(502, 862, 498, 8);
    ctx.fillRect(502, 992, 498, 8);

    ctx.fillStyle = '#f49459';
    ctx.fillRect(502, 88, 498, 4);
    ctx.fillRect(502, 220, 498, 4);
    ctx.fillRect(502, 350, 498, 4);
    ctx.fillRect(502, 480, 498, 4);
    ctx.fillRect(502, 610, 498, 4);
    ctx.fillRect(502, 740, 498, 4);
    ctx.fillRect(502, 870, 498, 4);
}

function drawCanvas(userName, data) {

    let images = [];
    for(let i in data) {
    	images.push(data[i]['image']);
    }
    console.log(images);

    //while(images.length < 10) {}

    topText = userName.toUpperCase() + "'S TOP 10 ALBUMS OF 2020";
    drawBackground();
    let goldText = '#FFFEC4';
    let goldShadow = '#b15e25';
    ctx.font = '250px Arvo';
    ctx.save();
    ctx.translate(40, 327);
    ctx.fillStyle = goldShadow;
    ctx.fillText('1', 0, 0);

    ctx.strokeStyle = goldShadow;
    ctx.lineWidth = 8;
    ctx.fillStyle = goldText;
    ctx.strokeText('1', -9, -9);
    ctx.fillText('1', -9, -9);
    ctx.restore();

    ctx.fillStyle = goldShadow;
    ctx.fillRect(167, 107, 300, 300);
    ctx.drawImage(images[0], 172, 112, 290, 290);
    let yOffset = drawText(20, 460, 480, 80, data[0]['album'], goldText, goldShadow);
    drawText(20, 460 + yOffset, 480, 45, data[0]['artist'], goldText, goldShadow);

    let silverShadow = '#333333';
    let silverText = '#bbbbbb';
    yOffset = drawText(200, 670, 280, 60, data[1]['album'], silverText, silverShadow);
    drawText(200, 670 + yOffset, 280, 30, data[1]['artist'], silverText, silverShadow);
    ctx.fillStyle = silverShadow;
    ctx.fillRect(10, 600, 180, 180);
    ctx.drawImage(images[1], 15, 605, 170, 170);

    ctx.font = '90px Arvo';
    ctx.save();
    ctx.translate(12, 675);
    ctx.fillStyle = silverShadow;
    ctx.fillText('2', 0, 0);

    ctx.strokeStyle = silverShadow;
    ctx.lineWidth = 8;
    ctx.fillStyle = silverText;
    ctx.strokeText('2', -6, -6);
    ctx.fillText('2', -6, -6);
    ctx.restore();

    let bronzeShadow = '#763f19';
    let bronzeText = '#d57736';
    yOffset = drawText(200, 875, 280, 60, data[2]['album'], bronzeText, bronzeShadow);
    drawText(200, 875 + yOffset, 280, 30, data[2]['artist'], bronzeText, bronzeShadow);
    ctx.fillStyle = bronzeShadow;
    ctx.fillRect(10, 805, 180, 180);
    ctx.drawImage(images[2], 15, 810, 170, 170);

    ctx.font = '90px Arvo';
    ctx.save();
    ctx.translate(12, 880);
    ctx.fillStyle = bronzeShadow;
    ctx.fillText('3', 0, 0);

    ctx.strokeStyle = bronzeShadow;
    ctx.lineWidth = 8;
    ctx.fillStyle = bronzeText;
    ctx.strokeText('3', -6, -6);
    ctx.fillText('3', -6, -6);
    ctx.restore();

    for(let i = 0; i < 7; i++) {
        drawAlbum(710, 140 + i * 130, data[i + 3]['album'], data[i + 3]['artist'], i + 4, images[i + 3]);
    }

    ctx.font = '60px Lilita One';
    let textWidth = ctx.measureText(topText).width;

    ctx.save();
    ctx.translate(500, 0);
    if(textWidth > 950) {
        ctx.scale(950 / textWidth, 1);
    }

    ctx.fillStyle = '#2a2726';
    ctx.fillText(topText, -(textWidth / 2) + 3, 64);

    ctx.fillStyle = '#ede5d7';
    ctx.fillText(topText, -(textWidth / 2), 60);
    ctx.restore();
}
