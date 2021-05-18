const size = 50;


class Body {

    constructor(mass) {
        this.mass = mass;

        this.position = createVector();
        this.velocity = createVector();
    }

    hit(other) {
        const x0 = this.position.x;
        const y0 = this.position.y;
        const x1 = other.position.x;
        const y1 = other.position.y;

        if (x0 < x1 + size && x0 + size > x1 &&
            y0 < y1 + size && y0 + size > y1) {
            // hit
            background(255, 0, 0);
            return true;
        }

        return false;
    }

    collide(other) {

        const mt = this.mass + other.mass;
        const md = this.mass - other.mass;
        
        let vi1 = this.velocity.copy();
        let vi2 = other.velocity.copy();

        let vf = vi1.mult(md / mt);
        vf.add( vi2.mult( (2*other.mass) / mt) );

        return vf;
    }

    addForce(force) {
        this.velocity.add(force.mult(1/this.mass));
    }

    show() {
        fill(255);
        rect(this.position.x, this.position.y, size, size);

        fill(0);
        text(this.mass, this.position.x, this.position.y);
    }

    update() {
        this.position.add(this.velocity);
    }
}