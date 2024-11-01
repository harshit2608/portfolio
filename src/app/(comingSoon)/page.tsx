'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

export default function ComingSoon() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas!.width) this.x = 0;
        else if (this.x < 0) this.x = canvas!.width;

        if (this.y > canvas!.height) this.y = 0;
        else if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        if (ctx) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      if (ctx) {
        ctx.clearRect(0, 0, canvas!.width, canvas!.height);
        for (const particle of particles) {
          particle.update();
          particle.draw();
        }
        requestAnimationFrame(animate);
      }
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const resumeUrl = `https://drive.google.com/uc?export=download&id=1lBJeFaCOOwEr06lp6zPQR6zpFj3rO9Vz`;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black text-white">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 px-4 text-center">
        <h1 className="mb-4 text-6xl font-bold uppercase md:text-9xl">
          Coming Soon
        </h1>
        <p className="mb-8 text-2xl md:text-3xl">
          My portfolio is under construction. Stay tuned!
        </p>
        <a href={resumeUrl} download="Harshit_Resume.pdf">
          <Button className="rounded bg-white px-4 py-2 font-bold text-black hover:bg-gray-200">
            Download Resume
          </Button>
        </a>
      </div>
    </div>
  );
}
