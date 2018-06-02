let main = function () {
    // Create dom elements
    let canvas = new Dom('Canvas', window.innerWidth, window.innerHeight);
    let particles = [];
    let speedDivider = 10000;
    let leader = new Particle(window.innerWidth / 2, window.innerHeight / 2, 10, 10);
    for (let i = 0; i < 1000; i++) {
        let posX = Math.random() * window.innerWidth;
        let posY = Math.random() * window.innerHeight;
        let p = new Particle(posX, posY, 1, 1);
        particles.push(p);
    }

    // Append elements
    document.body.append(canvas.e);

    // Start the loop
    let loop = function () {
        canvas.cleanFaded(0, 0, canvas.e.width, canvas.e.height, `rgba(0, 0, 0, 0.25)`);
        leader.move();
        canvas.draw(leader.x, leader.y, leader.width, leader.height, 'rgba(255, 255,255,1)');
        for (let i = 0; i < particles.length; i++) {
            particles[i].move();

            let color = canvas.changeColor(Math.random());
            canvas.draw(particles[i].x, particles[i].y, particles[i].width, particles[i].height, color);

            if (particles[i].x > leader.x) {
                particles[i].accelerationX += (particles[i].x - leader.x)/ speedDivider * Math.random();
            }
             if (particles[i].x < leader.x) {
                particles[i].accelerationX -= (leader.x - particles[i].x)/ speedDivider * Math.random();
            }
            if (particles[i].y > leader.y) {
                particles[i].accelerationY += (particles[i].y - leader.y)/ speedDivider * Math.random();
            }
             if (particles[i].y < leader.y) {
                particles[i].accelerationY -= (leader.y - particles[i].y)/ speedDivider * Math.random();
            }

            particles[i].accelerationY *= .999;
            particles[i].accelerationX *= .999;
        }
        if (leader.x > window.innerWidth || leader.x < 0 || leader.y > window.innerHeight || leader.y < 0) {
            leader.x = window.innerWidth/2;
            leader.y = window.innerHeight/2;
        }
        requestAnimationFrame(loop)
    }
    loop();
}