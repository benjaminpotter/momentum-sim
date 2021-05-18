let s_vel1;
let s_vel2;
let s_m1;
let s_m2;
let b_start;

let b1;
let b2;

function setup() {
    let p = createP("Velocity 1");
    p.position(500,0);
    s_vel1 = createSlider(0, 6, 0);
    s_vel1.position(500, 40);
    
    p = createP("Velocity 2");
    p.position(500, 50);
    s_vel2 = createSlider(0, 6, 0);
    s_vel2.position(500, 90);

    p = createP("Mass 1");
    p.position(500, 100);
    s_m1 = createSlider(1, 10, 1);
    s_m1.position(500, 140);

    p = createP("Mass 2");
    p.position(500, 150);
    s_m2 = createSlider(1, 10, 1);
    s_m2.position(500, 190);

    b_start = createButton("Start");
    b_start.position(500, 220);
    b_start.mousePressed(() => {
        b1 = new Body(s_m1.value());
        b2 = new Body(s_m2.value());

        b1.position = createVector(100, 300);
        b2.position = createVector(300, 300);

        b1.addForce(createVector(s_vel1.value(), 0));
        b2.addForce(createVector(s_vel2.value(), 0));
    });

    createCanvas(400, 400);

    rectMode(CENTER);
    textAlign(CENTER, CENTER);
}

function wall(cx, cy, size, angle) {
    const sinA = sin(angle);
    const cosA = cos(angle);
    const offs = size / 2;

    const ep1 = createVector(cx - (cosA * offs), cy - (sinA * offs));
    const ep2 = createVector(cx + (cosA * offs), cy + (sinA * offs));

    const lGap = 10;
    const lCnt = size / lGap;
    for(let i = -lCnt/2; i < lCnt/2; i++) {
        const p = createVector(cx + (cosA * i * lGap), cy + (sinA * i * lGap));
        line(p.x, p.y, p.x + (10 * cos(angle+PI/4)), p.y + (10 * sin(angle+PI/4)));
    }

    line(ep1.x, ep1.y, ep2.x, ep2.y);
}

function scene() {
    // floor
    wall(200, 325, 350, 0);
    
    // walls
    wall(25, 200, 400, PI/2);
    wall(375, 200, 400, -PI/2);

    fill(0);
    text("Ben Potter", 340, 390);
}

function draw() {
    background(220);

    scene();

    if (!b1 || !b2)
        return;

    if (b1.position.x + size > width || b1.position.x - size < 0)
        b1.velocity.mult(-1);
    if (b2.position.x + size > width || b2.position.x - size < 0)
        b2.velocity.mult(-1);

    if (b1.hit(b2)) {
        const vf1 = b1.collide(b2);
        const vf2 = b2.collide(b1);

        b1.velocity = vf1;
        b2.velocity = vf2;
    }

    b1.update();
    b2.update();

    b1.show();
    b2.show();
}
