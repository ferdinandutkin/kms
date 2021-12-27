function get_random_number_between(min, max) {
    return Math.random() * (max - min) + min;
}

const canvas = document.createElement('canvas');

canvas.width = innerWidth;
canvas.height = innerHeight;
window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});
const context = canvas.getContext('2d');




let mouse = {
    x: undefined,
    y: undefined

}

let prev_mouse = {
    x: undefined,
    y: undefined

};

document.body.addEventListener('mousemove', e => {
    prev_mouse.x = mouse.x;
    prev_mouse.y = mouse.y;

    mouse.x = e.x;
    mouse.y = e.y;


});







class Color {
    constructor(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }
    toString() {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`
    }
}


class Star {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;

    }


    draw() {

        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.color.toString();
        context.fill();
        context.closePath();
    }

    update() {



        const mouse_distance = {
            x:mouse.x - this.x,
            y:mouse.y - this.y
        }



        const mouse_diff = {
            x: Math.abs(mouse.x - prev_mouse.x),
            y: Math.abs(mouse.y - prev_mouse.y)
        }

        const hypot = Math.hypot(mouse_distance.x, mouse_distance.y);


    //балдеж
        if (false && (hypot > 0 && mouse_diff.x  > Math.abs(this.dx) || mouse_diff.y >  Math.abs(this.dy))) {

                this.x += mouse_distance.x * Math.random() * this.dx / hypot / 2;
                this.y += mouse_distance.y * Math.random() * this.dy / hypot / 2;


        }
        else  {
            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }
            this.x += this.dx;
            this.y += this.dy;

        }


        this.draw();

    }
}







const skyColor  = new Color(12, 26, 48, 1);


const starColor = new Color(238, 238, 0, 1);


    let circle_array = [];
function init() {
    circle_array = [];
    let max;





    if (innerWidth > 900) {
        max = Math.round(get_random_number_between(1600, 2000));
    }
    if (innerWidth > 768) {
        max = Math.round(get_random_number_between(1000, 1300));
    }
    else if (innerWidth > 400) {
        max = Math.round(get_random_number_between(800, 1000));
    }
    else {
        max = Math.round(get_random_number_between(600, 800));
    }

    for (let i = 0; i < max / 2; i++) {

        let radius = Math.round(get_random_number_between(1, 2));
        let x = get_random_number_between(radius, innerWidth - radius);
        let y = get_random_number_between(radius, innerHeight - radius);
        let dx = get_random_number_between(-1.5, 1.5);
        let dy = get_random_number_between(-1.5, 1.5);
        
        let red = Math.round(Math.random() * 255);
        let green = Math.round(Math.random() * 255);
        let blue = Math.round(Math.random() * 255);
        let alpha = get_random_number_between(0.5, 0.9);



        circle_array.push(new Star(x, y, dx, dy, radius, starColor));
    }
}
init();






function animate() {
    requestAnimationFrame(animate);




    context.fillStyle = skyColor.toString();

    context.fillRect(0, 0, canvas.width, canvas.height);



    for (let i = 0; i < circle_array.length; i++) {
        circle_array[i].update();
    }

    document.body.style.background = 'url(' + canvas.toDataURL() + ')';
}

animate();