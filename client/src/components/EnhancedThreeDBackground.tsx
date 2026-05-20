import { useEffect, useRef } from 'react';

interface EnhancedThreeDBackgroundProps {
  scrollY: number;
  section?: 'hero' | 'skills' | 'projects' | 'default';
}

export default function EnhancedThreeDBackground({ scrollY, section = 'default' }: EnhancedThreeDBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Advanced particle system
    interface Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      color: string;
      life: number;
    }

    const particles: Particle[] = [];
    const particleCount = section === 'hero' ? 120 : 70;

    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          vz: Math.random() * 3,
          size: Math.random() * 4 + 1,
          color: ['#00d9ff', '#ff006e', '#39ff14', '#00ffff'][Math.floor(Math.random() * 4)],
          life: 1,
        });
      }
    };
    initParticles();

    // 3D shapes with advanced rendering
    interface Shape {
      x: number;
      y: number;
      z: number;
      rotX: number;
      rotY: number;
      rotZ: number;
      size: number;
      type: string;
      color: string;
      speed: number;
      scale: number;
    }

    const shapes: Shape[] = [
      {
        x: canvas.width * 0.2,
        y: canvas.height * 0.3,
        z: 500,
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        size: 60,
        type: 'cube',
        color: '#00d9ff',
        speed: 0.012,
        scale: 1,
      },
      {
        x: canvas.width * 0.8,
        y: canvas.height * 0.6,
        z: 400,
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        size: 80,
        type: 'pyramid',
        color: '#ff006e',
        speed: 0.018,
        scale: 1,
      },
      {
        x: canvas.width * 0.5,
        y: canvas.height * 0.5,
        z: 600,
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        size: 100,
        type: 'torus',
        color: '#39ff14',
        speed: 0.01,
        scale: 1,
      },
      {
        x: canvas.width * 0.35,
        y: canvas.height * 0.7,
        z: 550,
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        size: 70,
        type: 'sphere',
        color: '#00ffff',
        speed: 0.015,
        scale: 1,
      },
    ];

    let animationId: number;
    let time = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Draw cube with enhanced lighting
    const drawCube = (ctx: CanvasRenderingContext2D, shape: Shape) => {
      const s = shape.size * shape.scale;
      const vertices = [
        [-s, -s, -s],
        [s, -s, -s],
        [s, s, -s],
        [-s, s, -s],
        [-s, -s, s],
        [s, -s, s],
        [s, s, s],
        [-s, s, s],
      ];

      const rotated = vertices.map(([x, y, z]) => {
        let rx = x,
          ry = y * Math.cos(shape.rotX) - z * Math.sin(shape.rotX),
          rz = y * Math.sin(shape.rotX) + z * Math.cos(shape.rotX);

        const x2 = rx * Math.cos(shape.rotY) + rz * Math.sin(shape.rotY),
          y2 = ry,
          z2 = -rx * Math.sin(shape.rotY) + rz * Math.cos(shape.rotY);

        const x3 = x2 * Math.cos(shape.rotZ) - y2 * Math.sin(shape.rotZ),
          y3 = x2 * Math.sin(shape.rotZ) + y2 * Math.cos(shape.rotZ),
          z3 = z2;

        return [x3 + shape.x, y3 + shape.y, z3 + shape.z];
      });

      const projected = rotated.map(([x, y, z]) => {
        const scale = 500 / (z + 500);
        return [x * scale, y * scale];
      });

      ctx.strokeStyle = shape.color;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = shape.color;
      ctx.shadowBlur = 20;
      ctx.globalAlpha = 0.7;

      const edges = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
      ];

      edges.forEach(([start, end]) => {
        ctx.beginPath();
        ctx.moveTo(projected[start][0], projected[start][1]);
        ctx.lineTo(projected[end][0], projected[end][1]);
        ctx.stroke();
      });

      // Draw vertices as glowing points
      ctx.fillStyle = shape.color;
      projected.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const drawPyramid = (ctx: CanvasRenderingContext2D, shape: Shape) => {
      const s = shape.size * shape.scale;
      const vertices = [
        [0, -s, 0],
        [s, s, -s],
        [-s, s, -s],
        [-s, s, s],
        [s, s, s],
      ];

      const rotated = vertices.map(([x, y, z]) => {
        let rx = x,
          ry = y * Math.cos(shape.rotX) - z * Math.sin(shape.rotX),
          rz = y * Math.sin(shape.rotX) + z * Math.cos(shape.rotX);

        const x2 = rx * Math.cos(shape.rotY) + rz * Math.sin(shape.rotY),
          y2 = ry,
          z2 = -rx * Math.sin(shape.rotY) + rz * Math.cos(shape.rotY);

        const x3 = x2 * Math.cos(shape.rotZ) - y2 * Math.sin(shape.rotZ),
          y3 = x2 * Math.sin(shape.rotZ) + y2 * Math.cos(shape.rotZ),
          z3 = z2;

        return [x3 + shape.x, y3 + shape.y, z3 + shape.z];
      });

      const projected = rotated.map(([x, y, z]) => {
        const scale = 500 / (z + 500);
        return [x * scale, y * scale];
      });

      ctx.strokeStyle = shape.color;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = shape.color;
      ctx.shadowBlur = 20;
      ctx.globalAlpha = 0.7;

      const edges = [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 1],
      ];

      edges.forEach(([start, end]) => {
        ctx.beginPath();
        ctx.moveTo(projected[start][0], projected[start][1]);
        ctx.lineTo(projected[end][0], projected[end][1]);
        ctx.stroke();
      });

      ctx.fillStyle = shape.color;
      projected.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const drawTorus = (ctx: CanvasRenderingContext2D, shape: Shape) => {
      const majorRadius = shape.size * shape.scale;
      const minorRadius = shape.size * shape.scale * 0.3;
      const segments = 24;
      const rings = 24;

      ctx.strokeStyle = shape.color;
      ctx.lineWidth = 1.8;
      ctx.shadowColor = shape.color;
      ctx.shadowBlur = 18;
      ctx.globalAlpha = 0.65;

      for (let i = 0; i < rings; i++) {
        const theta = (i / rings) * Math.PI * 2;
        for (let j = 0; j < segments; j++) {
          const phi = (j / segments) * Math.PI * 2;

          const x = (majorRadius + minorRadius * Math.cos(phi)) * Math.cos(theta);
          const y = minorRadius * Math.sin(phi);
          const z = (majorRadius + minorRadius * Math.cos(phi)) * Math.sin(theta);

          let rx = x,
            ry = y * Math.cos(shape.rotX) - z * Math.sin(shape.rotX),
            rz = y * Math.sin(shape.rotX) + z * Math.cos(shape.rotX);

          const x2 = rx * Math.cos(shape.rotY) + rz * Math.sin(shape.rotY),
            y2 = ry,
            z2 = -rx * Math.sin(shape.rotY) + rz * Math.cos(shape.rotY);

          const x3 = x2 * Math.cos(shape.rotZ) - y2 * Math.sin(shape.rotZ),
            y3 = x2 * Math.sin(shape.rotZ) + y2 * Math.cos(shape.rotZ),
            z3 = z2;

          const scale = 500 / (z3 + 500);
          const px = x3 * scale + shape.x;
          const py = y3 * scale + shape.y;

          if (j === 0) {
            ctx.beginPath();
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const drawSphere = (ctx: CanvasRenderingContext2D, shape: Shape) => {
      const radius = shape.size * shape.scale;
      const latSegments = 16;
      const lonSegments = 20;

      ctx.strokeStyle = shape.color;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = shape.color;
      ctx.shadowBlur = 16;
      ctx.globalAlpha = 0.6;

      for (let lat = 0; lat < latSegments; lat++) {
        const theta1 = (lat / latSegments) * Math.PI;
        const theta2 = ((lat + 1) / latSegments) * Math.PI;

        for (let lon = 0; lon < lonSegments; lon++) {
          const phi1 = (lon / lonSegments) * Math.PI * 2;
          const phi2 = ((lon + 1) / lonSegments) * Math.PI * 2;

          const x1 = radius * Math.sin(theta1) * Math.cos(phi1);
          const y1 = radius * Math.cos(theta1);
          const z1 = radius * Math.sin(theta1) * Math.sin(phi1);

          let rx = x1,
            ry = y1 * Math.cos(shape.rotX) - z1 * Math.sin(shape.rotX),
            rz = y1 * Math.sin(shape.rotX) + z1 * Math.cos(shape.rotX);

          const x2 = rx * Math.cos(shape.rotY) + rz * Math.sin(shape.rotY),
            y2 = ry,
            z2 = -rx * Math.sin(shape.rotY) + rz * Math.cos(shape.rotY);

          const x3 = x2 * Math.cos(shape.rotZ) - y2 * Math.sin(shape.rotZ),
            y3 = x2 * Math.sin(shape.rotZ) + y2 * Math.cos(shape.rotZ),
            z3 = z2;

          const scale = 500 / (z3 + 500);
          const px = x3 * scale + shape.x;
          const py = y3 * scale + shape.y;

          if (lon === 0) {
            ctx.beginPath();
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      // Clear with fade trail effect
      ctx.fillStyle = 'rgba(10, 14, 39, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 1;

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z -= particle.vz;

        if (particle.z < 0) {
          particle.z = 1000;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }

        const scale = particle.z / 1000;
        const size = particle.size * scale;

        ctx.fillStyle = particle.color;
        ctx.globalAlpha = scale * 0.7;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // Update and draw shapes
      shapes.forEach((shape) => {
        shape.rotX += shape.speed;
        shape.rotY += shape.speed * 0.7;
        shape.rotZ += shape.speed * 0.5;

        // Smooth scroll-based movement
        shape.y += (scrollY * 0.12 - shape.y) * 0.08;

        // Mouse interaction for hero section
        if (section === 'hero') {
          const dx = mouseX - shape.x;
          const dy = mouseY - shape.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 300;

          if (distance < maxDistance) {
            const influence = 1 - distance / maxDistance;
            shape.x += dx * influence * 0.02;
            shape.y += dy * influence * 0.02;
          }
        }

        switch (shape.type) {
          case 'cube':
            drawCube(ctx, shape);
            break;
          case 'pyramid':
            drawPyramid(ctx, shape);
            break;
          case 'torus':
            drawTorus(ctx, shape);
            break;
          case 'sphere':
            drawSphere(ctx, shape);
            break;
        }
      });

      // Draw dynamic connecting lines
      ctx.strokeStyle = `rgba(0, 217, 255, ${0.15 + Math.sin(time * 0.01) * 0.1})`;
      ctx.lineWidth = 1;
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const dx = shapes[j].x - shapes[i].x;
          const dy = shapes[j].y - shapes[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 600) {
            ctx.globalAlpha = 1 - distance / 600;
            ctx.beginPath();
            ctx.moveTo(shapes[i].x, shapes[i].y);
            ctx.lineTo(shapes[j].x, shapes[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [scrollY, section]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
