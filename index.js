var dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];
var c = document.getElementById("global_warming");
c.width = dimension[0] - 20;
c.height = dimension[1] - 25;

var oxygen = [c.width / 2, c.height / 2, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]
var acceleration = 0.05
var lightspeed = c.width/2
var ctx = c.getContext("2d");
var brownian_motion = setInterval(step, 10);

function step() {
    for (frames = 0; frames < 1; frames++) {
        // bump
        let direction = Math.random() * Math.PI * 2
        oxygen[2] += Math.cos(direction) * acceleration * (Math.abs(oxygen[2]) + lightspeed / 100)
        oxygen[3] += Math.sin(direction) * acceleration * (Math.abs(oxygen[3]) + lightspeed / 100)

        // avoid breaking the universe
        if (Math.abs(oxygen[2]) > lightspeed) {
            oxygen[2] = lightspeed * (Math.abs(oxygen[2]) / oxygen[2])
        }
        if (Math.abs(oxygen[3]) > lightspeed) {
            oxygen[3] = lightspeed * (Math.abs(oxygen[3]) / oxygen[3])
        }

        // update position
        oxygen[0] += oxygen[2]
        oxygen[1] += oxygen[3]

        // border tesseract
        if (oxygen[0] > c.width) {
            oxygen[0] -= c.width
        }
        if (oxygen[0] < 0) {
            oxygen[0] += c.width
        }
        if (oxygen[1] > c.height) {
            oxygen[1] -= c.height
        }
        if (oxygen[1] < 0) {
            oxygen[1] += c.height
        }

        // draw
        ctx.fillStyle = "#FFFFFF";
        ctx.globalAlpha = 0.01;
        ctx.fillRect(0, 0, c.width, c.height)
        ctx.fillStyle = "#000000";
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(oxygen[0], oxygen[1], 10, 0, 2 * Math.PI);
        ctx.stroke();
    }
}