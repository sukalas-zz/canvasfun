let main = function () {
    // Create dom elements
    let canvas = new Dom('Canvas', window.innerWidth, window.innerHeight);
    let particles = [];

    let leader = new Particle(window.innerWidth / 4, window.innerHeight / 2, 50, 50);
    for (let i = 0; i < 1000; i++) {
        let posX = Math.random() * window.innerWidth;
        let posY = Math.random() * canvas.e.height;
        let p = new Particle(posX, posY, 2, 2);
        particles.push(p);
    }

    // Append elements
    document.body.append(canvas.e);

    // Start the loop
    let loop = function () {
        canvas.cleanFaded(0, 0, canvas.e.width, canvas.e.height, `rgba(0, 0, 0, 0.25)`);
        // leader.move();
        canvas.draw(leader.x, leader.y, leader.width, leader.height, 'blue');
        for (let i = 0; i < particles.length; i++) {
            particles[i].move();
            let color = canvas.changeColor(Math.random());
            canvas.draw(particles[i].x, particles[i].y, particles[i].width, particles[i].height, color);


            if (particles[i].x > leader.x) {
                particles[i].accelerationX -= particles[i].x - leader.x;
            }
             if (particles[i].x < leader.x) {
                particles[i].accelerationX += leader.x - particles[i].x;
            }
            if (particles[i].y > leader.y) {
                particles[i].accelerationY -= Math.random();
            }
             if (particles[i].y < leader.y) {
                particles[i].accelerationY += Math.random();
            }

        }

        requestAnimationFrame(loop)
    }
    loop();
}