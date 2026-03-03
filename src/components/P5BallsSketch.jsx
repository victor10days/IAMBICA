import { useEffect, useRef } from 'react';
import p5 from 'p5';

const P5BallsSketch = ({ height = '400px' }) => {
  const containerRef = useRef(null);
  const p5Ref = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      let balls = [];
      let stars = [];
      const threshold = 30;
      let accChangeX = 0;
      let accChangeY = 0;
      let accChangeT = 0;

      class Ball {
        constructor() {
          this.x = p.random(p.width);
          this.y = p.random(p.height);
          this.diameter = p.random(10, 30);
          this.xspeed = p.random(-2, 2);
          this.yspeed = p.random(-2, 2);
          this.direction = 0.7;
          this.oxspeed = this.xspeed;
          this.oyspeed = this.yspeed;
        }
        move() {
          this.x += this.xspeed * this.direction;
          this.y += this.yspeed * this.direction;
        }
        turn() {
          if (this.x < 0) { this.x = 0; this.direction = -this.direction; }
          else if (this.y < 0) { this.y = 0; this.direction = -this.direction; }
          else if (this.x > p.width - 20) { this.x = p.width - 20; this.direction = -this.direction; }
          else if (this.y > p.height - 20) { this.y = p.height - 20; this.direction = -this.direction; }
        }
        shake() {
          this.xspeed += p.random(5, accChangeX / 3);
          this.yspeed += p.random(5, accChangeX / 3);
        }
        stopShake() {
          if (this.xspeed > this.oxspeed) { this.xspeed -= 0.6; } else { this.xspeed = this.oxspeed; }
          if (this.yspeed > this.oyspeed) { this.yspeed -= 0.6; } else { this.yspeed = this.oyspeed; }
        }
        display() {
          p.noStroke();
          p.fill(210, 43, 43);
          p.ellipse(this.x, this.y, this.diameter, this.diameter);
        }
      }

      class Star {
        constructor(tx, ty, tc, tf, td) {
          this.x = tx; this.y = ty; this.c = tc; this.f = tf; this.down = td;
        }
        showStar() {
          p.stroke(this.c);
          p.point(this.x, this.y);
        }
        twinkle() {
          if (this.c >= 255) { this.down = true; }
          if (this.c <= 90) { this.down = false; }
          if (this.down) { this.c -= this.f; } else { this.c += this.f; }
        }
      }

      function checkForShake() {
        accChangeX = p.abs(p.accelerationX - p.pAccelerationX);
        accChangeY = p.abs(p.accelerationY - p.pAccelerationY);
        accChangeT = accChangeX + accChangeY;

        if (accChangeT >= threshold) {
          for (let i = 0; i < balls.length; i++) {
            balls[i].shake();
            balls[i].turn();
          }
        } else {
          for (let i = 0; i < balls.length; i++) {
            balls[i].stopShake();
            balls[i].turn();
            balls[i].move();
          }
        }
      }

      p.setup = () => {
        const canvas = p.createCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
        canvas.style('display', 'block');
        for (let i = 0; i < 20; i++) balls.push(new Ball());
        for (let i = 0; i < 1000; i++) {
          stars.push(new Star(p.random(p.width), p.random(p.height), p.random(255), p.random(5, 10), p.random(100)));
        }
      };

      p.draw = () => {
        const c1 = p.color(250, 243, 225);
        const c2 = p.color(245, 231, 198);
        for (let y = 0; y < p.height; y++) {
          const n = p.map(y, 0, p.height, 0, 1);
          p.stroke(p.lerpColor(c1, c2, n));
          p.line(0, y, p.width, y);
        }

        for (let i = 0; i < stars.length; i++) {
          stars[i].twinkle();
          stars[i].showStar();
        }

        for (let i = 0; i < balls.length; i++) {
          balls[i].move();
          balls[i].display();
        }

        checkForShake();
      };

      p.windowResized = () => {
        if (containerRef.current) {
          p.resizeCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
        }
      };
    };

    p5Ref.current = new p5(sketch, containerRef.current);

    return () => {
      p5Ref.current.remove();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: height === '100%' ? '100%' : height, display: 'block', overflow: 'hidden' }} />;
};

export default P5BallsSketch;
