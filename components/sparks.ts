// A tiny particle emitter for the fuse spark. Draws on one canvas, only while visible.

type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; r: number };

const RAMP = ["#FFF2DA", "#FFB347", "#F2591F", "#7A2410"];

export class Sparks {
  private ctx: CanvasRenderingContext2D;
  private ps: P[] = [];
  private raf = 0;
  private running = false;
  private dpr = 1;
  private origin = { x: 0, y: 0 };
  private last = { x: 0, y: 0 };
  private heat = 0;
  private io: IntersectionObserver;
  private ro: ResizeObserver;

  constructor(
    private canvas: HTMLCanvasElement,
    private locate: () => { x: number; y: number } | null,
    private opts: { base: number; vertical?: boolean } = { base: 0.35 },
  ) {
    this.ctx = canvas.getContext("2d")!;
    this.resize();
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas);
    this.io = new IntersectionObserver(([e]) => (e.isIntersecting ? this.start() : this.stop()));
    this.io.observe(canvas);
  }

  private resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = this.canvas.getBoundingClientRect();
    this.canvas.width = Math.max(1, Math.round(r.width * this.dpr));
    this.canvas.height = Math.max(1, Math.round(r.height * this.dpr));
  }

  private start() {
    if (this.running) return;
    this.running = true;
    const loop = () => {
      this.step();
      if (this.running) this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  private stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  private emit(n: number) {
    const { x, y } = this.origin;
    const d = this.dpr;
    for (let i = 0; i < n; i++) {
      const a = this.opts.vertical ? Math.PI * (0.2 + Math.random() * 0.6) * (Math.random() < 0.5 ? 1 : -1) : -Math.PI * (0.15 + Math.random() * 0.7);
      const speed = (0.6 + Math.random() * 1.8) * d;
      this.ps.push({
        x,
        y,
        vx: Math.cos(a) * speed - (this.opts.vertical ? 0 : 0.4 * d),
        vy: Math.sin(a) * speed,
        life: 0,
        max: 22 + Math.random() * 30,
        r: (0.5 + Math.random() * 1.1) * d,
      });
    }
  }

  private step() {
    const ctx = this.ctx;
    const pos = this.locate();
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (pos) {
      this.origin = { x: pos.x * this.dpr, y: pos.y * this.dpr };
      const moved = Math.hypot(this.origin.x - this.last.x, this.origin.y - this.last.y) / this.dpr;
      this.last = { ...this.origin };
      // Hotter while the reader is scrolling, embers when still.
      this.heat = Math.min(1, this.heat * 0.9 + moved * 0.08);
      const rate = this.opts.base + this.heat * 3;
      let n = Math.floor(rate);
      if (Math.random() < rate - n) n++;
      this.emit(n);
    }
    ctx.globalCompositeOperation = document.documentElement.dataset.theme === "light" ? "source-over" : "lighter";
    const g = 0.045 * this.dpr;
    this.ps = this.ps.filter((p) => {
      p.life++;
      p.vy += g;
      p.vx *= 0.97;
      p.x += p.vx;
      p.y += p.vy;
      const t = p.life / p.max;
      if (t >= 1) return false;
      ctx.globalAlpha = 1 - t;
      ctx.fillStyle = RAMP[Math.min(RAMP.length - 1, Math.floor(t * RAMP.length))];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * (1 - t * 0.5), 0, Math.PI * 2);
      ctx.fill();
      return true;
    });
    ctx.globalAlpha = 1;
  }

  destroy() {
    this.stop();
    this.io.disconnect();
    this.ro.disconnect();
  }
}
