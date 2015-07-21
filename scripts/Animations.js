// Drawing Logo

function animateLogo() {
    var canvas = document.getElementById("logo-animate");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 200, 100); 

    ctx.font = "40px Arial";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.fillText("Weather", (canvas.width / 2) + 10, (canvas.height / 2) + 20);


    var centerX = 52;
    var centerY = 53;
    var radius = 25;
    var counter = 1;

    setInterval(drawRainbow, 20); //animation

    function drawRainbow() {

        startDeg = Math.PI; 
        counter = counter + 0.03;
        if (counter > 1.75) {
            return false;
        }

        endDeg = Math.PI * counter;

        //drawing 7 arc for rainbow
        drawCircle(ctx, centerX, centerY, radius, startDeg, endDeg, 3, 'Violet');
        drawCircle(ctx, centerX, centerY, radius + 3, startDeg, endDeg + 0.1, 3, 'Indigo');
        drawCircle(ctx, centerX, centerY, radius + 6, startDeg, endDeg + 0.2, 3, 'Blue');
        drawCircle(ctx, centerX, centerY, radius + 9, startDeg, endDeg + 0.3, 3, 'Green');
        drawCircle(ctx, centerX, centerY, radius + 12, startDeg, endDeg + 0.4, 3, 'Yellow');
        drawCircle(ctx, centerX, centerY, radius + 15, startDeg, endDeg + 0.5, 3, 'Orange');
        drawCircle(ctx, centerX, centerY, radius + 18, startDeg, endDeg + 0.6, 3, 'Red');




    }

    //drawing one arc line
    function drawCircle(ctx, x, y, rad, start, end, lineWidth, color) {
        ctx.beginPath();
        ctx.arc(x, y, rad, start, end, false);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}

animateLogo();

/* Drawing Mill*/


function drawBody(speed) {
    var bodyCanvas = document.getElementById("bodyMill");
    ctx = bodyCanvas.getContext("2d");

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(30, 30);
    ctx.lineTo(20, 75);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(18, 75);
    ctx.lineTo(23, 75);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(30, 30);
    ctx.lineTo(40, 75);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(39, 75);
    ctx.lineTo(43, 75);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(30, 30, 3, 0, 2 * Math.PI);
    ctx.stroke();

    speed = 110 - speed*2;

    setTimeout(drawBlades, 1);

    function drawBlades() {
        var canvasBodyMill = document.getElementById("blades");
        ctx2 = canvasBodyMill.getContext("2d");
        ctx2.clearRect(0, 0, 75, 75);

        ctx2.translate(30, 30);


        ctx2.rotate((Math.PI / 180));

        ctx2.beginPath();
        ctx2.moveTo(0, 0);
        ctx2.lineTo(-20, -20);
        ctx2.stroke();

        ctx2.beginPath();
        ctx2.moveTo(0, 0);
        ctx2.lineTo(-20, 20);
        ctx2.stroke();

        ctx2.beginPath();
        ctx2.moveTo(0, 0);
        ctx2.lineTo(20, -20);
        ctx2.stroke();

        ctx2.beginPath();
        ctx2.moveTo(0, 0);
        ctx2.lineTo(20, 20);
        ctx2.stroke();

        ctx2.translate(-30, -30);

        setTimeout(drawBlades, speed);

    }
}





/*Draw direction*/

function drawDirection(deg) {
    var windDirection = document.getElementById("wind-direction");
    var ctx = windDirection.getContext('2d');

    ctx.font = "12px Arial";
    ctx.fillText(convertDegToDirection(deg), 5, 10);

    ctx.translate(30, 30);
    ctx.rotate(deg * Math.PI / 180);

    var fromx = 0;
    var fromy = 20;
    var tox = 0;
    var toy = -20;
    var headlen = 8;   // length of head in pixels
    var angle = Math.atan2(toy - fromy, tox - fromx);

    ctx.beginPath();
    ctx.arc(0, 0, 2, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(fromx - 3, fromy);
    ctx.lineTo(fromx + 3, fromy);
    ctx.stroke();
}


function convertDegToDirection(deg) {

    if ((deg <= 11.25)) {
        return 'N';
    } else if ((deg >= 348.75)) {
        return 'N';
    } else if ((deg > 11.25) && (deg <= 33.75)) {
        return 'NNE';
    } else if ((deg > 33.75) && (deg <= 56.25)) {
        return 'NE';
    } else if ((deg > 56.25) && (deg <= 78.75)) {
        return 'ENE';
    } else if ((deg > 78.75) && (deg <= 101.25)) {
        return 'E';
    } else if ((deg > 101.25) && (deg <= 123.75)) {
        return 'ESE';
    } else if ((deg > 123.75) && (deg <= 146.25)) {
        return 'SE';
    } else if ((deg > 146.25) && (deg <= 168.75)) {
        return 'SSE';
    } else if ((deg > 168.75) && (deg <= 191.15)) {
        return 'S';
    } else if ((deg > 191.25) && (deg <= 213.75)) {
        return 'SSW';
    } else if ((deg > 213.75) && (deg <= 236.25)) {
        return 'SW';
    } else if ((deg > 236.25) && (deg <= 258.75)) {
        return 'WSW';
    } else if ((deg > 258.75) && (deg <= 281.25)) {
        return 'W';
    } else if ((deg > 281.25) && (deg <= 303.75)) {
        return 'WNW';
    } else if ((deg > 303.75) && (deg <= 326.25)) {
        return 'NW';
    } else if ((deg > 326.75) && (deg <= 348.75)) {
        return 'NNW';
    } else {
        return 'Undef';
    }
}