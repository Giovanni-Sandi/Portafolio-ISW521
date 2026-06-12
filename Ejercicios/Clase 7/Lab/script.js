/* ════════════════════════════════════════════════════
   HydroSense AI — script.js
   JavaScript Vanilla · Funcionalidad completa
   ════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────
   1. RELOJ EN TIEMPO REAL
────────────────────────────────────────── */
function initClock() {
  const clockEl = document.getElementById('clock');
  const dateEl  = document.getElementById('clockDate');
  if (!clockEl || !dateEl) return;

  const dias    = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const meses   = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

  function tick() {
    const now  = new Date();
    const h    = String(now.getHours()).padStart(2, '0');
    const m    = String(now.getMinutes()).padStart(2, '0');
    const s    = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${h}:${m}:${s}`;
    dateEl.textContent  = `${dias[now.getDay()]} ${now.getDate()} ${meses[now.getMonth()]} ${now.getFullYear()}`;
  }

  tick();
  setInterval(tick, 1000);
}

/* ──────────────────────────────────────────
   2. MENÚ HAMBURGUESA RESPONSIVE
────────────────────────────────────────── */
function initHamburger() {
  const btn      = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const sidebar  = document.getElementById('sidebar');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    btn.classList.toggle('is-open');

    // En móvil abrimos el nav y el sidebar
    if (navLinks) navLinks.classList.toggle('is-open');
    if (sidebar)  sidebar.classList.toggle('sidebar--open');
  });

  // Cerrar al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !navLinks?.contains(e.target) && !sidebar?.contains(e.target)) {
      btn.setAttribute('aria-expanded', 'false');
      btn.classList.remove('is-open');
      navLinks?.classList.remove('is-open');
      sidebar?.classList.remove('sidebar--open');
    }
  });
}

/* ──────────────────────────────────────────
   3. ANIMACIÓN CONTADOR (hero stats)
────────────────────────────────────────── */
function animateCounters() {
  const elements = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1800;
      const start    = performance.now();

      function step(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quart
        const ease     = 1 - Math.pow(1 - progress, 4);
        const current  = Math.round(ease * target);
        el.textContent = current.toLocaleString('es');
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.3 });

  elements.forEach(el => observer.observe(el));
}

/* ──────────────────────────────────────────
   4. CANVAS: FONDO DE TUBERÍAS ANIMADAS
────────────────────────────────────────── */
function initPipeCanvas() {
  const canvas = document.getElementById('pipeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Partículas que fluyen a lo largo de rutas tipo tubería
  const pipes = [];
  const PIPE_COUNT = 6;

  for (let i = 0; i < PIPE_COUNT; i++) {
    pipes.push({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      vx:    (Math.random() - 0.5) * 0.6,
      vy:    (Math.random() - 0.5) * 0.6,
      len:   Math.random() * 120 + 60,
      alpha: Math.random() * 0.3 + 0.05,
      width: Math.random() * 1.5 + 0.3,
      color: Math.random() > 0.5 ? '#00e5ff' : '#0066ff',
    });
  }

  // Partículas flotantes (gotas de agua)
  const particles = [];
  for (let i = 0; i < 30; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.5,
      vy: Math.random() * 0.3 + 0.1,
      alpha: Math.random() * 0.3 + 0.05,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Líneas de flujo (tuberías)
    pipes.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Rebote suave en bordes
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      const grad = ctx.createLinearGradient(p.x, p.y, p.x + p.len * p.vx * 5, p.y + p.len * p.vy * 5);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(0.5, p.color.replace(')', `, ${p.alpha})`).replace('rgb', 'rgba').replace('#', 'rgba(').replace('00e5ff', '0,229,255').replace('0066ff', '0,102,255'));
      grad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.len * Math.cos(Math.atan2(p.vy, p.vx)),
                 p.y + p.len * Math.sin(Math.atan2(p.vy, p.vx)));
      ctx.strokeStyle = p.color + '22';
      ctx.lineWidth   = p.width;
      ctx.stroke();
    });

    // Gotas de agua
    particles.forEach(p => {
      p.y += p.vy;
      if (p.y > canvas.height) p.y = -5;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 255, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/* ──────────────────────────────────────────
   5. SPARKLINES (mini gráficas en KPI)
────────────────────────────────────────── */
function initSparklines() {
  document.querySelectorAll('.sparkline').forEach(canvas => {
    const values = canvas.dataset.values.split(',').map(Number);
    const color  = canvas.dataset.color || '#00e5ff';
    const ctx    = canvas.getContext('2d');
    const W = canvas.offsetWidth  || 120;
    const H = canvas.offsetHeight || 36;
    canvas.width  = W * 2; // retina
    canvas.height = H * 2;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(2, 2);

    const min  = Math.min(...values);
    const max  = Math.max(...values);
    const range = max - min || 1;
    const step  = W / (values.length - 1);

    // Área rellena
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, color + '40');
    grad.addColorStop(1, color + '00');

    ctx.beginPath();
    values.forEach((v, i) => {
      const x = i * step;
      const y = H - ((v - min) / range) * (H - 6) - 3;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    // Cierra área
    ctx.lineTo((values.length - 1) * step, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Línea de la gráfica
    ctx.beginPath();
    values.forEach((v, i) => {
      const x = i * step;
      const y = H - ((v - min) / range) * (H - 6) - 3;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth   = 1.5;
    ctx.lineJoin    = 'round';
    ctx.stroke();

    // Punto final destacado
    const lastX = (values.length - 1) * step;
    const lastV = values[values.length - 1];
    const lastY = H - ((lastV - min) / range) * (H - 6) - 3;
    ctx.beginPath();
    ctx.arc(lastX, lastY, 2.5, 0, Math.PI * 2);
    ctx.fillStyle   = color;
    ctx.shadowBlur  = 6;
    ctx.shadowColor = color;
    ctx.fill();
  });
}

/* ──────────────────────────────────────────
   6. GRÁFICA PRINCIPAL (consumo 24h)
────────────────────────────────────────── */
function initMainChart() {
  const canvas = document.getElementById('mainChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const container = canvas.parentElement;
  const W = container.offsetWidth  || 600;
  const H = 220;
  canvas.width  = W * 2;
  canvas.height = H * 2;
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';
  ctx.scale(2, 2);

  const labels = ['00','02','04','06','08','10','12','14','16','18','20','22','24'];
  const datasets = [
    { color: '#00e5ff', data: [420,380,350,340,420,580,720,850,820,760,680,540,460] },
    { color: '#0066ff', data: [310,280,260,250,310,420,520,640,610,580,510,400,340] },
    { color: '#00ff88', data: [280,250,220,210,270,360,440,520,500,480,420,350,300] },
    { color: '#ffaa00', data: [180,160,140,130,160,240,320,410,400,370,310,250,200] },
  ];

  const allValues = datasets.flatMap(d => d.data);
  const maxVal    = Math.max(...allValues);

  const PADDING = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartW   = W - PADDING.left - PADDING.right;
  const chartH   = H - PADDING.top  - PADDING.bottom;
  const xStep    = chartW / (labels.length - 1);
  let   frame    = 0;
  const TOTAL_FRAMES = 60;

  function drawChart(progress) {
    ctx.clearRect(0, 0, W, H);

    // Líneas de cuadrícula horizontales
    ctx.setLineDash([4, 6]);
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.06)';
    ctx.lineWidth   = 1;
    for (let i = 0; i <= 4; i++) {
      const y = PADDING.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(PADDING.left, y);
      ctx.lineTo(PADDING.left + chartW, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Etiquetas eje X
    ctx.fillStyle  = 'rgba(120, 150, 190, 0.5)';
    ctx.font       = '9px JetBrains Mono, monospace';
    ctx.textAlign  = 'center';
    labels.forEach((label, i) => {
      const x = PADDING.left + i * xStep;
      ctx.fillText(label, x, H - 8);
    });

    // Etiquetas eje Y
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const y   = PADDING.top + (chartH / 4) * i;
      const val = Math.round(maxVal - (maxVal / 4) * i);
      ctx.fillText(val.toString(), PADDING.left - 6, y + 3);
    }

    // Línea vertical del tiempo actual (ahora)
    const nowHour   = new Date().getHours();
    const nowIdx    = Math.min(Math.round(nowHour / 2), labels.length - 1);
    const nowX      = PADDING.left + nowIdx * xStep;
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.3)';
    ctx.lineWidth   = 1;
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(nowX, PADDING.top);
    ctx.lineTo(nowX, PADDING.top + chartH);
    ctx.stroke();
    ctx.setLineDash([]);

    // Dibujar cada serie de datos
    datasets.forEach(({ color, data }) => {
      const points = data.slice(0, Math.round(data.length * progress));
      if (points.length < 2) return;

      // Área rellena con gradiente
      const grad = ctx.createLinearGradient(0, PADDING.top, 0, PADDING.top + chartH);
      grad.addColorStop(0, color + '30');
      grad.addColorStop(1, color + '00');

      ctx.beginPath();
      points.forEach((v, i) => {
        const x = PADDING.left + i * xStep;
        const y = PADDING.top  + chartH - (v / maxVal) * chartH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      const lastX = PADDING.left + (points.length - 1) * xStep;
      ctx.lineTo(lastX, PADDING.top + chartH);
      ctx.lineTo(PADDING.left, PADDING.top + chartH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Línea principal
      ctx.beginPath();
      points.forEach((v, i) => {
        const x = PADDING.left + i * xStep;
        const y = PADDING.top  + chartH - (v / maxVal) * chartH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = color;
      ctx.lineWidth   = 2;
      ctx.lineJoin    = 'round';
      ctx.shadowBlur  = 6;
      ctx.shadowColor = color;
      ctx.stroke();
      ctx.shadowBlur  = 0;
    });
  }

  function animate() {
    frame++;
    const progress = Math.min(frame / TOTAL_FRAMES, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    drawChart(ease);
    if (progress < 1) requestAnimationFrame(animate);
  }

  animate();

  // Redimensionar con el contenedor
  const ro = new ResizeObserver(() => {
    const newW = container.offsetWidth || 600;
    canvas.width  = newW * 2;
    canvas.height = H * 2;
    canvas.style.width  = newW + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(2, 2);
    drawChart(1);
  });
  ro.observe(container);
}

/* ──────────────────────────────────────────
   7. SENSORES IOT (generación dinámica)
────────────────────────────────────────── */
const SENSOR_DATA = [
  { id: 'SN-01', name: 'Caudalímetro Norte',   value: '284 L/s',  status: 'online',  loc: 'Planta Norte'    },
  { id: 'SN-02', name: 'Presión Nodo A',       value: '3.6 bar',  status: 'online',  loc: 'Av. Principal'   },
  { id: 'SC-01', name: 'Calidad pH Central',   value: '7.2 pH',   status: 'online',  loc: 'Estación Centro' },
  { id: 'SC-02', name: 'Turbidez Centro',      value: '0.4 NTU',  status: 'warn',    loc: 'Sector Centro'   },
  { id: 'SS-01', name: 'Caudal Sur',           value: '196 L/s',  status: 'online',  loc: 'Zona Sur'        },
  { id: 'SS-02', name: 'Temperatura Sur',      value: '17.8 °C',  status: 'online',  loc: 'Depósito Sur'    },
  { id: 'SI-01', name: 'Flujo Industrial',     value: '88 L/s',   status: 'warn',    loc: 'Zona Industrial' },
  { id: 'SI-02', name: 'Presión Industrial',   value: '2.1 bar',  status: 'alert',   loc: 'Fábrica Bloque A'},
  { id: 'SM-01', name: 'Macro Medidor 1',      value: '1,240 m³', status: 'online',  loc: 'Entrada Gral.'   },
  { id: 'SM-02', name: 'Macro Medidor 2',      value: '980 m³',   status: 'online',  loc: 'Ramificación B'  },
  { id: 'SF-01', name: 'Detector Fugas A',     value: 'Fuga!',    status: 'alert',   loc: 'Calle 45'        },
  { id: 'SF-02', name: 'Detector Fugas B',     value: 'Normal',   status: 'online',  loc: 'Av. 68'          },
  { id: 'SC-03', name: 'Cloro Residual',       value: '0.5 mg/L', status: 'online',  loc: 'Planta Trat.'    },
  { id: 'SN-03', name: 'Nivel Depósito N',     value: '78%',      status: 'online',  loc: 'Tanque Norte'    },
  { id: 'SX-01', name: 'Sensor Offline',       value: 'N/A',      status: 'offline', loc: 'Zona Este'       },
  { id: 'SN-04', name: 'Nivel Depósito S',     value: '91%',      status: 'warn',    loc: 'Tanque Sur'      },
];

function renderSensors() {
  const grid = document.getElementById('sensorsGrid');
  if (!grid) return;

  grid.innerHTML = '';

  SENSOR_DATA.forEach(sensor => {
    const el = document.createElement('article');
    el.className = `sensor-card${sensor.status === 'offline' ? ' sensor-card--offline' : ''}`;
    el.setAttribute('role', 'listitem');
    el.setAttribute('aria-label', `Sensor ${sensor.id}: ${sensor.name} — ${sensor.status}`);

    const valueClass = sensor.status === 'alert' ? ' sensor-value--alert'
                     : sensor.status === 'warn'  ? ' sensor-value--warn'
                     : '';

    el.innerHTML = `
      <div class="sensor-header">
        <span class="sensor-id">${sensor.id}</span>
        <span class="sensor-status-dot sensor-status-dot--${sensor.status}"
              aria-label="Estado: ${sensor.status}"></span>
      </div>
      <p class="sensor-name">${sensor.name}</p>
      <p class="sensor-value${valueClass}">${sensor.value}</p>
      <p class="sensor-location">${sensor.loc}</p>
    `;

    grid.appendChild(el);
  });
}

/* ──────────────────────────────────────────
   8. ACTIVIDAD RECIENTE (feed dinámico)
────────────────────────────────────────── */
const ACTIVITY_ITEMS = [
  { time: '12:47', text: '<strong>Sensor SC-02</strong> reportó turbidez elevada (0.4 NTU)' },
  { time: '12:31', text: 'Sistema ajustó presión automáticamente en <strong>Sector Centro</strong>' },
  { time: '12:15', text: '<strong>IA Hydro</strong> generó predicción de pico para las 14h' },
  { time: '11:58', text: 'Mantenimiento preventivo completado en <strong>Planta Norte</strong>' },
  { time: '11:42', text: '<strong>Fuga detectada</strong> en Calle 45, equipo notificado' },
  { time: '11:20', text: 'Sensor SI-02 reportó presión baja (2.1 bar) en Zona Industrial' },
  { time: '10:55', text: 'Reporte diario generado y enviado al administrador' },
];

function renderActivity() {
  const list = document.getElementById('activityList');
  if (!list) return;

  list.innerHTML = '';

  ACTIVITY_ITEMS.forEach(item => {
    const li = document.createElement('li');
    li.className = 'activity-item';
    li.setAttribute('role', 'listitem');
    li.innerHTML = `
      <span class="activity-time">${item.time}</span>
      <span class="activity-dot" aria-hidden="true"></span>
      <p class="activity-text">${item.text}</p>
    `;
    list.appendChild(li);
  });
}

/* ──────────────────────────────────────────
   9. ACTUALIZACIÓN DE VALORES EN TIEMPO REAL
────────────────────────────────────────── */
function initLiveUpdates() {
  // Actualiza valores de sensores cada 8 segundos con variación aleatoria
  setInterval(() => {
    const caudal  = (2800 + Math.random() * 100 - 50).toFixed(0);
    const presion = (3.2  + Math.random() * 0.4).toFixed(1);
    const ph      = (7.0  + Math.random() * 0.4).toFixed(1);

    // Actualiza KPI cards si existen en DOM
    const kpiValues = document.querySelectorAll('.kpi-value');
    if (kpiValues[0]) {
      const num = parseInt(kpiValues[0].textContent.replace(/[^0-9]/g, ''), 10);
      const delta = Math.floor(Math.random() * 20) - 10;
      const newVal = num + delta;
      // Animación de cambio
      kpiValues[0].style.transition = 'color 0.3s';
      kpiValues[0].style.color = delta > 0 ? '#00ff88' : '#ff4444';
      setTimeout(() => { kpiValues[0].style.color = ''; }, 600);
    }
  }, 8000);

  // Parpadea la etiqueta LIVE
  // (ya es un @keyframes live-blink en CSS)

  // Actualiza "última sincronización"
  const syncEl = document.getElementById('lastSync');
  if (!syncEl) return;
  let syncMin = 2;
  setInterval(() => {
    syncMin = Math.max(1, syncMin + (Math.random() > 0.5 ? 1 : -1));
    syncEl.textContent = `${syncMin} minuto${syncMin !== 1 ? 's' : ''}`;
  }, 30000);
}

/* ──────────────────────────────────────────
   10. NOTIFICACIONES (panel flotante simple)
────────────────────────────────────────── */
function initNotifications() {
  const btn = document.getElementById('notifBtn');
  if (!btn) return;

  const NOTIFS = [
    { level: 'alert', msg: 'Presión crítica en Zona Industrial (Sensor SI-02)' },
    { level: 'warn',  msg: 'Turbidez elevada en Sector Centro (SC-02)' },
    { level: 'info',  msg: 'Mantenimiento programado mañana 06:00h' },
  ];

  // Crear panel
  const panel = document.createElement('div');
  panel.id = 'notifPanel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Notificaciones del sistema');
  panel.style.cssText = `
    display: none;
    position: fixed;
    top: 70px;
    right: 16px;
    width: 300px;
    background: rgba(4, 8, 15, 0.96);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(0,229,255,0.2);
    border-radius: 12px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.7);
    z-index: 200;
    overflow: hidden;
  `;

  const header = document.createElement('div');
  header.style.cssText = `
    display: flex; justify-content: space-between; align-items: center;
    padding: 14px 16px; border-bottom: 1px solid rgba(0,229,255,0.1);
    font-family: 'Space Grotesk', sans-serif; font-size: 13px;
    font-weight: 700; color: #e8f0fe;
  `;
  header.innerHTML = `<span>Notificaciones</span><span style="font-size:10px;font-family:monospace;color:#00e5ff">3 nuevas</span>`;
  panel.appendChild(header);

  NOTIFS.forEach(n => {
    const item = document.createElement('div');
    const colors = { alert: '#ff4444', warn: '#ffaa00', info: '#0066ff' };
    item.style.cssText = `
      display: flex; align-items: flex-start; gap: 10px;
      padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.04);
      font-size: 12px; color: rgba(180,200,240,0.8);
    `;
    item.innerHTML = `
      <span style="width:7px;height:7px;border-radius:50%;background:${colors[n.level]};
        flex-shrink:0;margin-top:5px;box-shadow:0 0 6px ${colors[n.level]}"></span>
      <p>${n.msg}</p>
    `;
    panel.appendChild(item);
  });

  document.body.appendChild(panel);

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const visible = panel.style.display === 'block';
    panel.style.display = visible ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== btn) {
      panel.style.display = 'none';
    }
  });
}

/* ──────────────────────────────────────────
   11. BOTONES DE RANGO EN LA GRÁFICA
────────────────────────────────────────── */
function initChartButtons() {
  const buttons = document.querySelectorAll('.chart-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('chart-btn--active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('chart-btn--active');
      btn.setAttribute('aria-pressed', 'true');
      // En producción real aquí cargaríamos datos diferentes
      // Para la demo: re-inicializamos la gráfica con variación
      initMainChart();
    });
  });
}

/* ──────────────────────────────────────────
   12. INICIALIZACIÓN GENERAL
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Orden de inicialización
  initClock();
  initHamburger();
  animateCounters();
  initPipeCanvas();
  renderSensors();
  renderActivity();
  initMainChart();
  initNotifications();
  initChartButtons();
  initLiveUpdates();

  // Sparklines con pequeño delay para que el DOM esté listo
  requestAnimationFrame(() => {
    setTimeout(initSparklines, 50);
  });

  console.info('%c HydroSense AI v3.4.1 ', 'background:#0066ff;color:white;font-weight:bold;border-radius:4px;padding:2px 6px;');
  console.info('%c Sistema de Monitoreo Hídrico Inteligente · Laboratorio CSS Flexbox ', 'color:#00e5ff');
});