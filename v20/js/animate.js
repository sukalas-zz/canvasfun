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
    let magnificationFactor;
    let zoom;
    let panX;
    let panY;

    let init = function() {
        h = new Helpers();
        controls();
        createCanvas();
    }

    let checkIfBelongsToMandelborSet = function(x, y) {
        // TODO
        let z = x;
        let zz = y;
        let iterations = 200;
        for (var i = 0; i < iterations; i++) {
            // Calculate the real and imaginary components of the result
            // separately
            var real = z * z - zz * zz + x;
            var imaginary = 2 * z * zz + y;

            z = real;
            zz = imaginary;
            if (z * zz > 5)
                return (i / iterations * 100); // In the Mandelbrot set

        }
        return 0; // Not in the set

    }

    let createCanvas = function() {
        box = h.id('box');
        c = h.create('canvas');
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        ctx = c.getContext("2d");

        document.body.appendChild(c);
        render(10000, 0.3, 0.86);
        // loop();
    }

    let render = function(z, x, y) {
        zoom = z;
        panX = x;
        panY = y;

        for (let x = 0; x < c.width; x++) {
            for (let y = 0; y < c.height; y++) {
                let belongsToSet = checkIfBelongsToMandelborSet(x / zoom - panX, y / zoom - panY);
                if (belongsToSet == 0) {
                    ctx.fillStyle = '#000';
                    ctx.fillRect(x, y, 1, 1); // Draw a black pixel
                } else {
                    ctx.fillStyle = 'hsl(' + belongsToSet / 3 + ', 100%, ' + belongsToSet + '%)';
                    ctx.fillRect(x, y, 1, 1); // Draw a colorful pixel
                }
            }
        }

    }


    let controls = function() {
        window.clear = clear;
        document.addEventListener('click', () => {
            zoom += 1000;
            console.log(zoom, panX, panY)
            render(zoom, panX, panY);
        })
        document.addEventListener('keyup', (e) => {
            let step = 0.001;
            switch (e.keyCode) {
                case 37: // LEFT
                    panX -= step;
                    break;
                case 39: // RIGHT
                    panX += step;
                    break;
                case 40: // DOWN
                    panY -= step;
                    break;
                case 38: // UP
                    panY -= step;
                    break;
            }
            render(zoom, panX, panY);
        })
    }


    let clear = function() {
        ctx.save();
        ctx.beginPath();
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.restore();
    }

    let draw = function() {
        ctx.save();
        ctx.beginPath();


        ctx.restore();
    }

    let loop = function() {
        clear();
        draw();
        requestAnimationFrame(loop);
    }

    let onResize = function() {
        window.onresize = function() {
            c.width = window.innerWidth;
            c.height = window.innerHeight;
        }
    }

    return {
        init: init
    }

}())