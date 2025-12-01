import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    const particleCount = 150;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      size: Math.random() * 2 + 1.5,
      baseSize: Math.random() * 2 + 1.5,
    }));

    // Track mouse position
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      // Update and draw particles
      particles.forEach((particle) => {
        // Calculate distance to mouse
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Repel particles near cursor
        const repelRadius = 150;
        if (distance < repelRadius && distance > 0) {
          const force = (repelRadius - distance) / repelRadius;
          const angle = Math.atan2(-dy, -dx); // Negative for repel direction
          particle.vx += Math.cos(angle) * force * 0.8;
          particle.vy += Math.sin(angle) * force * 0.8;
          particle.size = particle.baseSize * (1 + force * 1.8);
        } else {
          particle.size = particle.baseSize;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Add friction (less friction = more floating)
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Random movement (increased for more floating)
        particle.vx += (Math.random() - 0.5) * 0.15;
        particle.vy += (Math.random() - 0.5) * 0.15;

        // Boundary check with bounce
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.9;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.9;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }
      });

      // Draw connection lines between nearby particles
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.3;
            ctx.strokeStyle = `rgba(242, 84, 91, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles with glow
      particles.forEach((particle) => {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Glow effect near cursor
        if (distance < 150) {
          const glowIntensity = (1 - distance / 150) * 1;
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size * 8
          );
          gradient.addColorStop(0, `rgba(242, 84, 91, ${glowIntensity * 0.6})`);
          gradient.addColorStop(0.4, `rgba(242, 84, 91, ${glowIntensity * 0.3})`);
          gradient.addColorStop(1, 'rgba(242, 84, 91, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw particle with gradient
        const particleGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        );

        if (distance < 150) {
          const intensity = 1 - distance / 150;
          particleGradient.addColorStop(0, `rgba(242, 84, 91, ${0.95 + intensity * 0.05})`);
          particleGradient.addColorStop(1, `rgba(242, 84, 91, ${0.7 + intensity * 0.2})`);
        } else {
          particleGradient.addColorStop(0, 'rgba(169, 63, 85, 0.9)');
          particleGradient.addColorStop(1, 'rgba(169, 63, 85, 0.5)');
        }

        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
};

export default ParticleBackground;
