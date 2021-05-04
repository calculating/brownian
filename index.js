var dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];
var c = document.getElementById("global_warming");
c.width = dimension[0];
c.height = dimension[1];

var oxygen = []
var air = 100
for (deus_ex_machina = 0; deus_ex_machina < air; deus_ex_machina++) {
    oxygen.push([c.width / 2, c.height / 2, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]);
}
var acceleration = 5
var lightspeed = c.width/10
var ctx = c.getContext("2d");
var brownian_motion = setInterval(step, 30);
var sun = [c.width * 0.2, -100]

function step() {
    // clear
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, c.width, c.height)

    for (molecule = 0; molecule < oxygen.length; molecule++) {
        // motion blur
        let previous_X = oxygen[molecule][0]
        let previous_Y = oxygen[molecule][1]

        // bump
        let direction = Math.random() * Math.PI * 2
        if (Math.abs(Math.cos(direction)) / Math.cos(direction) == Math.abs(oxygen[molecule][2]) / oxygen[molecule][2]) {
            oxygen[molecule][2] += Math.cos(direction) * acceleration * (1 - oxygen[molecule][2] / lightspeed) ^ 2
        } else {
            oxygen[molecule][2] += Math.cos(direction) * acceleration
        }
        if (Math.abs(Math.cos(direction)) / Math.cos(direction) == Math.abs(oxygen[molecule][3]) / oxygen[molecule][3]) {
            oxygen[molecule][3] += Math.cos(direction) * acceleration * (1 - oxygen[molecule][3] / lightspeed) ^ 2
        } else {
            oxygen[molecule][3] += Math.cos(direction) * acceleration
        }

        // avoid breaking the universe
        if (Math.abs(oxygen[molecule][2]) > lightspeed) {
            oxygen[molecule][2] = lightspeed * (Math.abs(oxygen[molecule][2]) / oxygen[molecule][2])
        }
        if (Math.abs(oxygen[molecule][3]) > lightspeed) {
            oxygen[molecule][3] = lightspeed * (Math.abs(oxygen[molecule][3]) / oxygen[molecule][3])
        }

        // update position
        oxygen[molecule][0] += oxygen[molecule][2]
        oxygen[molecule][1] += oxygen[molecule][3]

        // border tesseract
        if (oxygen[molecule][0] > c.width) {
            oxygen[molecule][0] -= c.width
            previous_X = oxygen[molecule][0]
        }
        if (oxygen[molecule][0] < 0) {
            oxygen[molecule][0] += c.width
            previous_X = oxygen[molecule][0]
        }
        if (oxygen[molecule][1] > c.height) {
            oxygen[molecule][1] -= c.height
            previous_Y = oxygen[molecule][1]
        }
        if (oxygen[molecule][1] < 0) {
            oxygen[molecule][1] += c.height
            previous_Y = oxygen[molecule][1]
        }

        // draw
        ctx.fillStyle = "#FFFFFF";
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.moveTo(oxygen[molecule][0], oxygen[molecule][1]);
        ctx.lineTo(sun[0] + ((oxygen[molecule][0] - sun[0]) * c.height), sun[1] + ((oxygen[molecule][1] - sun[1]) * c.height));
        ctx.lineTo(sun[0] + ((oxygen[molecule][0] - sun[0]) * c.height) + c.width, sun[1] + ((oxygen[molecule][1] - sun[1]) * c.height));
        ctx.fill();

        ctx.globalAlpha = 1;

        ctx.fillStyle = "#11e91c";
        ctx.strokeStyle = "#FF0000";
        ctx.beginPath();
        ctx.moveTo(oxygen[molecule][0], oxygen[molecule][1])
        ctx.lineTo(previous_X, previous_Y)
        ctx.stroke();

        ctx.fillStyle = "#843031";
        ctx.beginPath();
        ctx.arc(oxygen[molecule][0], oxygen[molecule][1], 3, 0, 2 * Math.PI);
        ctx.fill();
    }
}