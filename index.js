var dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];
var c = document.getElementById("global_warming");
c.width = dimension[0];
c.height = dimension[1];

document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        oxygen = []
    }
}

var oxygen = []
var air = 1;
function spontaneous_generation(event) {
    rect = c.getBoundingClientRect();
    cX = event.clientX - rect.left;
    cY = event.clientY - rect.top;
    for (deus_ex_machina = 0; deus_ex_machina < air; deus_ex_machina++) {
        oxygen.push([cX + Math.random() * 1, cY + Math.random() * 100, Math.random() * 5, Math.random() * 5]);
    }
    //step()
}
var atomic_radius = 20
var ctx = c.getContext("2d");
var brownian_motion = setInterval(step, 30);
var lightspeed = c.width/100

function step() {
    // clear
    ctx.fillStyle = "#000000";
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, c.width, c.height)

    if (oxygen.length > 1) {
        for (molecule = 0; molecule < oxygen.length; molecule++) {
            let bump = [0, 0]
            for (forces = 0; forces < oxygen.length; forces++) {
                if (forces !== molecule) {

                    let distance = Math.sqrt(Math.pow(oxygen[molecule][0] - oxygen[forces][0], 2) + Math.pow(oxygen[molecule][1] - oxygen[forces][1], 2))
                    let ratioX = (oxygen[molecule][0] - oxygen[forces][0]) / distance
                    let ratioY = (oxygen[molecule][1] - oxygen[forces][1]) / distance

                    bump[0] += ratioX * (1 / Math.pow(distance, 2))
                    bump[1] += ratioY * (1 / Math.pow(distance, 2))
                }
            }

            bump[0] += 5 / oxygen[molecule][0]
            bump[0] -= 5 / (c.width - oxygen[molecule][0])

            bump[1] += 5 / oxygen[molecule][1]
            bump[1] -= 5 / (c.height - oxygen[molecule][1])

            let bump_distance = Math.sqrt(Math.pow(bump[0], 2) + Math.pow(bump[1], 2))
            bump[0] = 5 * (bump[0] / (bump_distance))
            bump[1] = 5 * (bump[1] / (bump_distance))

            ctx.globalAlpha = 1;

            ctx.strokeStyle = "#00FF00";
            ctx.beginPath();
            ctx.moveTo(oxygen[molecule][0], oxygen[molecule][1])

            oxygen[molecule][2] += bump[0] * (1 - (oxygen[molecule][2] / lightspeed))
            oxygen[molecule][3] += bump[1] * (1 - (oxygen[molecule][3] / lightspeed))
            oxygen[molecule][0] += oxygen[molecule][2]
            oxygen[molecule][1] += oxygen[molecule][3]

            ctx.lineTo(oxygen[molecule][0], oxygen[molecule][1])
            ctx.stroke();

            // border tesseract
            if (oxygen[molecule][0] > c.width) {
                oxygen[molecule][0] = c.width - 10
            }
            if (oxygen[molecule][0] < 0) {
                oxygen[molecule][0] = 10
            }
            if (oxygen[molecule][1] > c.height) {
                oxygen[molecule][1] = c.height - 10
            }
            if (oxygen[molecule][1] < 0) {
                oxygen[molecule][1] = 10
            }

            // draw
            ctx.fillStyle = "#843031";
            ctx.beginPath();
            ctx.arc(oxygen[molecule][0], oxygen[molecule][1], 4, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    
}