let Animate = (function() {
    // GLOBALS
    let h;
    let p;
    let c;
    let ctx;
    let box;
    let pause = false;
    let particles;
    let particleNum;

    let init = function() {
        h = new Helpers();
        createCanvas();
        controls();
        onResize();
    }

    let createCanvas = function() {
        box = h.id('box');
        c = h.create('canvas');
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        ctx = c.getContext("2d");
        particles = [];
        particleNum = 50;
        for (let i = 0; i < particleNum; i++) {
            particles[i] = new Particle(c.width / 2, c.height / 2, 10, 10, c.width, c.height);
        }
        document.body.appendChild(c);
        loop();
    }

    let clear = function() {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, c.width, c.height);
        ctx.fillStyle = particles[0].clearColor;
        ctx.fill();
        ctx.restore();
    }

    let draw = function() {
        ctx.save();
        ctx.beginPath();
        ctx.imageSmoothingEnabled = true;

        particles.forEach(p => {
            ctx.rect(p.x, p.y, p.width, p.height);
        });

        ctx.fill();
        // CanvasGradient ctx.createLinearGradient(x0, y0, x1, y1);
        var grd = ctx.createLinearGradient(0, c.height, c.width, 0);
        grd.addColorStop(0, 'purple');
        grd.addColorStop(1, 'red');
        ctx.fillStyle = grd;
        particles.forEach(p => {
            ctx.fillRect(p.x, p.y, p.width, p.height);
        })
        ctx.restore();
    }

    let loop = function() {
        clear();
        particles.forEach(p => {
            p.move();
        })
        draw();
        requestAnimationFrame(loop);
    }

    let controls = function() {
        document.body.onkeyup = function(e) {
            switch (e.keyCode) {
                case 37:
                    particles.forEach(p => {
                        p.direction = 'left';
                    })
                    break;
                case 38:
                    particles.forEach(p => {
                        p.direction = 'up';
                    })
                    break;
                case 39:
                    particles.forEach(p => {
                        p.direction = 'right';
                    })
                    break;
                case 40:
                    particles.forEach(p => {
                        p.direction = 'down';
                    })
                    break;
                case 82: // r = REST
                    particles.forEach(p => {
                        p.reset = true;
                    })
                    break;
                case 65: // a = AUTOPILOT
                    particles.forEach(p => {
                        p.autoPilot = !p.autoPilot;
                    })
                    break;
                case 65: // a = AUTOPILOT
                    particles.forEach(p => {
                        p.autoPilot = !p.autoPilot;
                    })
                    break;
                case 32: // spacebar = PAUSE
                    particles.forEach(p => {
                        p.pause = !p.pause;
                    })
                    break;
            }
        }
    }

    let onResize = function() {
        window.onresize = function() {
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            particles.forEach( p => {
                p.canvasW = c.width;
                p.canvasH = c.height;
            })
            console.log(c.width, c.height)
        }

    }

    return {
        init: init
    }

}())