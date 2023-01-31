function show() {
    document.getElementById("jumpskar").style.display = "unset";
}
function hide() {
    document.getElementById("jumpskar").style.display = "none";
}
function play() {
    new Audio("img/spokisound.mp3").play();
}
let rot = 0;
let speed = 0;
let interval;
function beginRot() {
    interval = setInterval(function() {
        speed += 0.01;
        rot += speed;
        document.getElementById("sped").innerHTML = "sped: " + (Math.round(speed * 100) / 100) + " deg/ms<br>rotetoin: " + (Math.round((rot % 360) * 100) / 100) + " deg";
        document.getElementById("he-missed-:(").style.transform = "rotate(" + rot + "deg)";
    }, 1);
}
function endRot() {
    document.getElementById("he-missed-:(").style.transform = "rotate(0deg)";
    document.getElementById("sped").innerHTML = "sped: 0 deg/ms<br>rotetoin: 0 deg";
    clearInterval(interval);
    interval = setInterval(function() {
        if (speed <= 0) {
            speed = 0;
            clearInterval(interval);
        }
        speed -= 0.05;
        rot -= speed;
        if (rot <= 0) {
            rot = 0;
            clearInterval(interval);
        }
    }, 1)
}
function runbf() {
    let output = document.getElementById("output");
    let out = "";
    let code = document.getElementById("code").value;
    let input = document.getElementById("input").value;
    let arr = [];
    let pointer = 0;
    let inPointer = 0;
    for (let i = 0; i < 256; i++) {
        arr.push(0);
    }
    for (let i = 0; i < code.length; i++) {
        let char = code.charAt(i);
        if (char === '<') pointer--;
        if (char === '>') pointer++;
        if (pointer < 0) pointer = 255;
        if (pointer > 255) pointer = 0;
        if (char === '+') arr[pointer]++;
        if (char === '-') arr[pointer]--;
        if (arr[pointer] < 0) arr[pointer] = 255;
        if (arr[pointer] > 255) arr[pointer] = 0;
        if (char === '.') out += String.fromCharCode(arr[pointer]);
        if (char === ',') arr[pointer] = input[inPointer++];
        if (char === '[' && arr[pointer] === 0) {
            let layer = 0;
            for (let j = i; j < code.length; j++) {
                let character = code.charAt(j);
                if (character === '[') layer++;
                if (character === ']') layer--;
                if (layer === 0) {
                    i = j;
                    break;
                }
            }
        }
        if (char === ']' && arr[pointer] !== 0) {
            let layer = 0;
            for (let j = i; j >= 0; j--) {
                let character = code.charAt(j);
                if (character === '[') layer++;
                if (character === ']') layer--;
                if (layer === 0) {
                    i = j;
                    break;
                }
            }
        }
    }
    output.value = out;
}