var dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];
var c = document.getElementById("global_warming");
c.width = dimension[0] - 20;
c.height = dimension[1] - 25;

var oxygen = []
var air = 500
for (deus_ex_machina = 0; deus_ex_machina < air; deus_ex_machina++) {
    oxygen.push([c.width / 2, c.height / 2, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]);
}
var acceleration = 0.05
var lightspeed = c.width/10
var ctx = c.getContext("2d");
var brownian_motion = setInterval(step, 5);
var sun = [c.width * 0.2, -100]

function step() {
    // clear
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, c.width, c.height)

    for (molecule = 0; molecule < oxygen.length; molecule++) {
        // bump
        let direction = Math.random() * Math.PI * 2
        oxygen[molecule][2] += Math.cos(direction) * acceleration * (Math.abs(oxygen[molecule][2]) + lightspeed / 100)
        oxygen[molecule][3] += Math.sin(direction) * acceleration * (Math.abs(oxygen[molecule][3]) + lightspeed / 100)

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
        }
        if (oxygen[molecule][0] < 0) {
            oxygen[molecule][0] += c.width
        }
        if (oxygen[molecule][1] > c.height) {
            oxygen[molecule][1] -= c.height
        }
        if (oxygen[molecule][1] < 0) {
            oxygen[molecule][1] += c.height
        }

        // draw
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.moveTo(oxygen[molecule][0] + c.height, oxygen[molecule][1] + c.height);
        ctx.lineTo(sun[0] + ((oxygen[molecule][0] - sun[0]) * c.height) + c.height, sun[1] + ((oxygen[molecule][1] - sun[1]) * c.height) + c.height);
        ctx.lineTo(sun[0] + ((oxygen[molecule][0] - sun[0]) * c.height) + c.width + c.height, sun[1] + ((oxygen[molecule][1] - sun[1]) * c.height) + c.height);
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = -c.height;
        ctx.shadowOffsetY = -c.height;
        ctx.shadowColor = "#FFFFFF";
        ctx.fill();
    }
}