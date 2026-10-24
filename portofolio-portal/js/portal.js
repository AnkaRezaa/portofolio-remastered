/**
 * REZA-OS // ADVANCED LINUX CLI CONTROLLER & INTERACTIVE SHELL
 * Paced boot sequence, Neofetch, creative commands (cowsay, ping, ls, cat, fortune, sudo),
 * and keyboard shortcuts (1-7, Tab auto-complete, Up/Down history).
 */

(function () {
  'use strict';

  // --- 1. WEB AUDIO SYNTHESIZER ---
  class SoundEngine {
    constructor() {
      this.ctx = null;
    }

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    }

    playKey() {
      try {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const freq = 550 + Math.random() * 250;
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.012, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.02);
      } catch (e) {}
    }

    playChime() {
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.09);
        osc.frequency.setValueAtTime(783.99, now + 0.18);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.35);
      } catch (e) {}
    }

    playVictory() {
      try {
        this.init();
        if (!this.ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const start = this.ctx.currentTime + idx * 0.09;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, start);
          gain.gain.setValueAtTime(0.04, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(start);
          osc.stop(start + 0.22);
        });
      } catch (e) {}
    }

    playTrainWhistle() {
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        [440, 554.37].forEach((f) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(f, now);
          gain.gain.setValueAtTime(0.025, now);
          gain.gain.linearRampToValueAtTime(0.035, now + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.55);
        });
      } catch (e) {}
    }

    playRickTune() {
      try {
        this.init();
        if (!this.ctx) return;
        const notes = [
          { f: 293.66, d: 0.14 },
          { f: 329.63, d: 0.14 },
          { f: 392.00, d: 0.14 },
          { f: 329.63, d: 0.14 },
          { f: 493.88, d: 0.22 },
          { f: 493.88, d: 0.22 },
          { f: 440.00, d: 0.38 }
        ];
        let time = this.ctx.currentTime;
        notes.forEach((n) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(n.f, time);
          gain.gain.setValueAtTime(0.02, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + n.d);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(time);
          osc.stop(time + n.d);
          time += n.d + 0.03;
        });
      } catch (e) {}
    }

    playErrorBuzz() {
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.setValueAtTime(80, now + 0.1);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } catch (e) {}
    }

    playPostBeep() {
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now); // Pure 880Hz PC speaker tone
        gain.gain.setValueAtTime(0.045, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } catch (e) {}
    }
  }

  const sfx = new SoundEngine();

  // --- 2. AUTHENTIC LINUX BOOTLOADER SEQUENCE ---
  const bootSteps = [
    { tag: 'kernel', text: 'Linux version 6.8.0-reza-generic (gcc version 13.2.0) #42-Ubuntu SMP PREEMPT_DYNAMIC', delay: 320 },
    { tag: 'kernel', text: 'Command line: BOOT_IMAGE=/vmlinuz-reza-os root=/dev/nvme0n1p2 ro quiet splash', delay: 280 },
    { tag: 'info',   text: 'systemd 255.4-1ubuntu8 running in system mode (+PAM +AUDIT +SELINUX)', delay: 300 },
    { tag: 'ok',     text: 'Started D-Bus System Message Bus.', delay: 240 },
    { tag: 'ok',     text: 'Mounted /dev/nvme0n1p2 on /almamater (Polinema D4 Teknologi Informasi).', delay: 280 },
    { tag: 'ok',     text: 'Started Network Manager & Topology Controller (Cisco Packet Tracer, OSPF, VLAN).', delay: 300 },
    { tag: 'ok',     text: 'Reached target System Time Synchronized (NTP pool.ntp.org).', delay: 220 },
    { tag: 'ok',     text: 'Started Hardware Diagnostic & IT Support Telemetry Subsystem.', delay: 260 },
    { tag: 'ok',     text: 'Started Web Application Server (React 18, Tailwind CSS, Vite Engine).', delay: 300 },
    { tag: 'ok',     text: 'Verified 9 Official Accreditations & Licenses in security vault.', delay: 240 },
    { tag: 'ok',     text: 'Reached target Multi-User System.', delay: 240 },
    { tag: 'ok',     text: 'Reached target Graphical Interface & Network Stack.', delay: 260 }
  ];

  const bootScreen = document.getElementById('bootScreen');
  const mainScreen = document.getElementById('mainScreen');
  const systemdLogs = document.getElementById('systemdLogs');
  const btnSkipBoot = document.getElementById('btnSkipBoot');
  const cliInput = document.getElementById('cliInput');
  const cliOutputLog = document.getElementById('cliOutputLog');

  let isBootComplete = false;

  function finishBoot() {
    if (isBootComplete) return;
    isBootComplete = true;

    // Trigger authentic CRT mode switch scanline collapse/expand flash
    const termWindow = document.querySelector('.os-terminal-window');
    if (termWindow) {
      termWindow.classList.remove('crt-mode-switch');
      void termWindow.offsetWidth; // force reflow
      termWindow.classList.add('crt-mode-switch');
    }

    sfx.playPostBeep();
    sfx.playChime();

    if (bootScreen) bootScreen.style.display = 'none';
    if (mainScreen) mainScreen.style.display = 'flex';

    const termBody = document.getElementById('terminalBody');
    if (termBody) termBody.scrollTop = 0;

    if (cliInput) {
      setTimeout(() => cliInput.focus(), 150);
    }
  }

  function runLoginSequence() {
    const ttyBlock = document.getElementById('ttyLoginBlock');
    const typeUser = document.getElementById('typeLoginUser');
    const passRow = document.getElementById('ttyPassRow');
    const typePass = document.getElementById('typeLoginPass');
    const authMsg = document.getElementById('ttyAuthMsg');
    const cursor = document.getElementById('cursorLogin');

    if (!ttyBlock) {
      finishBoot();
      return;
    }

    ttyBlock.style.display = 'flex';
    const termBody = document.getElementById('terminalBody');
    if (termBody) termBody.scrollTop = termBody.scrollHeight;

    // Type username 'anka'
    const username = 'anka';
    let uIdx = 0;
    const uTimer = setInterval(() => {
      if (isBootComplete) { clearInterval(uTimer); return; }
      if (uIdx < username.length) {
        typeUser.textContent += username[uIdx];
        sfx.playKey();
        uIdx++;
      } else {
        clearInterval(uTimer);
        setTimeout(() => {
          if (isBootComplete) return;
          if (cursor) cursor.style.display = 'none';
          if (passRow) passRow.style.display = 'flex';

          // Type password bullets
          const passBullets = '••••••••••••';
          let pIdx = 0;
          const pTimer = setInterval(() => {
            if (isBootComplete) { clearInterval(pTimer); return; }
            if (pIdx < passBullets.length) {
              typePass.textContent += passBullets[pIdx];
              sfx.playKey();
              pIdx++;
            } else {
              clearInterval(pTimer);
              setTimeout(() => {
                if (isBootComplete) return;
                if (authMsg) {
                  authMsg.textContent = '[AUTH_SUCCESS] Last login: Sat Oct 24 2026 on tty1. Session opened for anka (uid=1000).';
                  authMsg.style.display = 'block';
                }
                sfx.playPostBeep();
                setTimeout(finishBoot, 420);
              }, 220);
            }
          }, 45);
        }, 220);
      }
    }, 110);
  }

  function runBootSequence() {
    if (!systemdLogs) {
      finishBoot();
      return;
    }

    let i = 0;
    function printNext() {
      if (isBootComplete) return;
      if (i >= bootSteps.length) {
        setTimeout(runLoginSequence, 350);
        return;
      }

      const step = bootSteps[i];
      const line = document.createElement('div');
      line.className = 'sys-line';

      if (step.tag === 'ok') {
        line.innerHTML = `<span class="sys-tag ok">[  OK  ]</span> <span class="sys-msg">${step.text}</span>`;
      } else if (step.tag === 'info') {
        line.innerHTML = `<span class="sys-tag info">[ INFO ]</span> <span class="sys-msg">${step.text}</span>`;
      } else if (step.tag === 'kernel') {
        line.innerHTML = `<span class="sys-msg" style="color: var(--primary-light);">${step.text}</span>`;
      }

      systemdLogs.appendChild(line);
      sfx.playKey();
      const termBody = document.getElementById('terminalBody');
      if (termBody) termBody.scrollTop = termBody.scrollHeight;

      i++;
      setTimeout(printNext, step.delay || 260);
    }

    printNext();
  }

  if (btnSkipBoot) {
    btnSkipBoot.addEventListener('click', finishBoot);
  }
  window.addEventListener('keydown', (e) => {
    if (!isBootComplete && (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ')) {
      finishBoot();
    }
  });

  runBootSequence();

  // --- 3. RICH INTERACTIVE TERMINAL ENGINE ---
  const cmdHistory = [];
  let historyIdx = -1;

  function appendOutput(html, type = 'info') {
    if (!cliOutputLog) return;
    const row = document.createElement('div');
    row.className = `cli-log-row ${type}`;
    row.innerHTML = html;
    cliOutputLog.appendChild(row);
    const termBody = document.getElementById('terminalBody');
    if (termBody) {
      termBody.scrollTop = termBody.scrollHeight;
    }
  }

  // Virtual Filesystem in /home/reza
  const vfs = {
    'bio.md': `# MUHAMMAD ANKA REZA\nIT Support Specialist • Network Engineer • Web Developer\n\nAlmamater: Politeknik Negeri Malang (D4 Teknologi Informasi)\nLokasi: Malang / Blitar, Jawa Timur\nDedikasi: Membangun infrastruktur jaringan andal & aplikasi web interaktif modern.`,
    'skills.json': `{\n  "network": ["Cisco Packet Tracer", "OSPF", "BGP", "VLAN", "MikroTik"],\n  "frontend": ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Vite"],\n  "systems": ["Linux (Ubuntu/Debian)", "Windows Server", "Hardware Repair"]\n}`,
    'resume.pdf': `[BERKAS DOKUMEN RESMI CV / RESUME - MUHAMMAD ANKA REZA]\nLokasi Berkas: resumeCV/resume.pdf\nKetik perintah 'cv' atau klik menu [ 8 ] untuk membuka/mengunduh berkas PDF resmi.`,
    'contact.txt': `Email: rezawalker02@gmail.com\nLinkedIn: https://linkedin.com/in/muhammad-anka-reza-620a0b2b7/\nGitHub: https://github.com/AnkaRezaa\nWhatsApp: +62 853-3434-7482`,
    'secret.txt': `[DEV LOGS - REZA-OS]\nSelamat menemukan berkas rahasia!\nPortal ini dibuat murni menggunakan Vanilla JS, Web Audio API, & Semantic CSS.\nCoba ketik perintah rahasia: 'sl', 'coffee', 'hack', 'matrix', 'rickroll', atau 'konami'.`,
    '/etc/passwd': `root:x:0:0:root:/root:/bin/bash\nanka:x:1000:1000:Muhammad Anka Reza:/home/anka:/bin/bash\nguest:x:1001:1001:Verified Visitor:/home/guest:/bin/bash`,
    '/etc/shadow': `cat: /etc/shadow: Izin ditolak! Anda harus memiliki akses root untuk membaca berkas bayangan.`
  };

  const fortunes = [
    "“Ada 10 tipe manusia di dunia: mereka yang paham biner, dan mereka yang tidak.”",
    "“Aturan No. 1 IT Support: Sudah coba restart perangkatnya belum?”",
    "“Jaringan komputer ibarat udara: baru disadari keberadaannya saat mulai hilang.”",
    "“Talk is cheap. Show me the code. — Linus Torvalds”",
    "“DNS: Selalu DNS yang jadi tersangka saat jaringan bermasalah.”",
    "“Kompilasi kode yang sukses pada percobaan pertama patut dicurigai.”"
  ];

  function generateCowsay(text) {
    const msg = text || "Hire Reza: 9+ Certs, IT Support, Cisco, and React Dev!";
    const border = '-'.repeat(msg.length + 2);
    return `<pre>
 ${border}
&lt; ${msg} &gt;
 ${border}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
</pre>`;
  }

  // CV Modal Viewer Elements & Controls
  const cvModalOverlay = document.getElementById('cvModalOverlay');
  const cvPdfFrame = document.getElementById('cvPdfFrame');
  const btnCloseCvModal = document.getElementById('btnCloseCvModal');

  function openCvViewer() {
    if (cvPdfFrame && (!cvPdfFrame.src || cvPdfFrame.src === 'about:blank' || !cvPdfFrame.src.includes('resumeCV/resume.pdf'))) {
      cvPdfFrame.src = 'resumeCV/resume.pdf#toolbar=1';
    }
    if (cvModalOverlay) {
      cvModalOverlay.style.display = 'flex';
    }
    sfx.playChime();
    appendOutput('📄 [VIEWER] Membuka jendela pratinjau dokumen resmi CV / Resume Muhammad Anka Reza...', 'success');
  }

  function closeCvViewer() {
    if (cvModalOverlay) {
      cvModalOverlay.style.display = 'none';
    }
    sfx.playKey();
    if (cliInput) setTimeout(() => cliInput.focus(), 100);
  }

  if (btnCloseCvModal) {
    btnCloseCvModal.addEventListener('click', closeCvViewer);
  }

  if (cvModalOverlay) {
    cvModalOverlay.addEventListener('click', (e) => {
      if (e.target === cvModalOverlay) closeCvViewer();
    });
  }

  // Command Implementations
  const shellCommands = {
    help: () => {
      appendOutput(`
<div style="color: var(--primary-light); font-weight: 700; margin-bottom: 4px;">=== REZA-OS COMMAND MANUAL ===</div>
<div style="display: grid; grid-template-columns: 140px 1fr; gap: 4px; font-size: 12px;">
  <span style="color: var(--primary);">1 / portfolio</span><span>Buka web portofolio lengkap interaktif</span>
  <span style="color: var(--primary);">2 / linkedin</span><span>Buka profil LinkedIn resmi</span>
  <span style="color: var(--primary);">3 / whatsapp</span><span>Kirim pesan langsung via WhatsApp</span>
  <span style="color: var(--primary);">4 / github</span><span>Buka repositori kode & open source</span>
  <span style="color: var(--primary);">5 / email</span><span>Kirim email ke rezawalker02@gmail.com</span>
  <span style="color: var(--primary);">6 / instagram</span><span>Kunjungi profil Instagram</span>
  <span style="color: var(--primary);">7 / twitter</span><span>Kunjungi akun Twitter / X</span>
  <span style="color: var(--primary);">8 / cv / resume</span><span>Buka &amp; unduh berkas PDF CV resmi</span>
  <span style="color: var(--systemd-info);">ls / dir</span><span>Daftar berkas virtual di /home/reza</span>
  <span style="color: var(--systemd-info);">cat &lt;file&gt;</span><span>Lihat isi berkas (contoh: cat bio.md)</span>
  <span style="color: var(--systemd-info);">skills</span><span>Tampilkan matriks kompetensi teknis</span>
  <span style="color: var(--systemd-info);">ping &lt;host&gt;</span><span>Simulasi transmisi paket ICMP (contoh: ping reza)</span>
  <span style="color: var(--systemd-info);">ip / ifconfig</span><span>Tampilkan informasi kartu jaringan eth0</span>
  <span style="color: var(--systemd-info);">uname -a</span><span>Tampilkan info kernel OS</span>
  <span style="color: var(--systemd-info);">neofetch</span><span>Tampilkan info lengkap sistem & spesifikasi hardware</span>
  <span style="color: var(--systemd-info);">uptime</span><span>Tampilkan durasi aktif sistem</span>
  <span style="color: var(--systemd-info);">whoami</span><span>Identitas otorisasi sesi saat ini</span>
  <span style="color: var(--systemd-warn);">cowsay &lt;teks&gt;</span><span>Karakter ASCII Cow berbicara teks Anda</span>
  <span style="color: var(--systemd-warn);">fortune</span><span>Kutipan acak seputar programmer & sysadmin</span>
  <span style="color: var(--systemd-warn);">sudo &lt;cmd&gt;</span><span>Mencoba akses root administrator</span>
  <span style="color: var(--systemd-warn);">clear</span><span>Bersihkan log terminal</span>
  <span style="color: var(--systemd-warn);">reboot</span><span>Jalankan ulang bootloader Linux OS</span>
</div>
<div style="margin-top: 8px; font-size: 11px; color: var(--text-dim); font-style: italic;">
  💡 Tip Rahasia: Terminal ini menyimpan Easter Egg tersembunyi khas Linux geek (coba ketik: <span class="cmd-pill" onclick="window.runCli('sl')">sl</span>, <span class="cmd-pill" onclick="window.runCli('coffee')">coffee</span>, <span class="cmd-pill" onclick="window.runCli('hack')">hack</span>, <span class="cmd-pill" onclick="window.runCli('matrix')">matrix</span>, <span class="cmd-pill" onclick="window.runCli('rickroll')">rickroll</span>, atau <span class="cmd-pill" onclick="window.runCli('konami')">konami</span>).
</div>
      `);
    },

    ls: () => {
      appendOutput(`
<div style="display: flex; flex-wrap: wrap; gap: 18px; font-weight: 600;">
  <span style="color: var(--systemd-ok);">portfolio.bin*</span>
  <span style="color: var(--systemd-info);">bio.md</span>
  <span style="color: var(--systemd-info);">skills.json</span>
  <span style="color: var(--systemd-warn);">resume.pdf</span>
  <span style="color: var(--systemd-info);">contact.txt</span>
  <span style="color: #64748b;">secret.txt</span>
  <span style="color: var(--primary);">certificates/</span>
</div>
      `);
    },

    dir: () => shellCommands.ls(),

    cat: (args) => {
      const filename = args[0];
      if (!filename) {
        appendOutput('Penggunaan: cat &lt;nama_berkas&gt; (contoh: cat bio.md atau cat resume.pdf)', 'warn');
        return;
      }
      if (filename === 'resume.pdf') {
        shellCommands['8']();
        return;
      }
      if (vfs[filename]) {
        appendOutput(`<pre style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 4px;">${vfs[filename]}</pre>`, 'info');
      } else {
        appendOutput(`cat: ${filename}: Tidak ditemukan berkas tersebut. Ketik 'ls' untuk melihat daftar berkas.`, 'error');
      }
    },

    skills: () => {
      appendOutput(`
<div style="color: var(--primary-light); font-weight: 700; margin-bottom: 4px;">[MATRIKS KOMPETENSI TEKNIS]:</div>
<div>• <strong>Infrastruktur & Jaringan:</strong> Cisco Packet Tracer, OSPF/BGP Routing, VLAN, Bandwidth Management, MikroTik</div>
<div>• <strong>Pengembangan Web:</strong> HTML5, CSS3, JavaScript, React 18, Tailwind CSS, Vite Engine, RESTful APIs</div>
<div>• <strong>Sistem Operasi & IT Support:</strong> Linux (Ubuntu/Debian), Windows Server, Hardware Diagnostics, Lab Maintenance</div>
<div>• <strong>Desain & UX:</strong> Figma Wireframing, UX Writing, Responsive Architecture</div>
      `, 'success');
    },

    ping: (args) => {
      const target = args[0] || 'reza-station';
      appendOutput(`PING ${target} (192.168.1.100) 56(84) bytes of data.`);
      
      let seq = 1;
      const interval = setInterval(() => {
        const time = (12 + Math.random() * 8).toFixed(1);
        appendOutput(`64 bytes from ${target} (192.168.1.100): icmp_seq=${seq} ttl=64 time=${time} ms`, 'success');
        sfx.playKey();
        seq++;
        if (seq > 4) {
          clearInterval(interval);
          appendOutput(`--- ${target} ping statistics ---<br>4 packets transmitted, 4 received, 0% packet loss, time 3004ms`, 'info');
        }
      }, 350);
    },

    cowsay: (args) => {
      const text = args.join(' ');
      appendOutput(generateCowsay(text), 'info');
    },

    fortune: () => {
      const quote = fortunes[Math.floor(Math.random() * fortunes.length)];
      appendOutput(`<div style="font-style: italic; color: var(--primary-light);">${quote}</div>`, 'info');
    },

    quote: () => shellCommands.fortune(),

    ip: () => {
      appendOutput(`
<div style="font-size: 12px; line-height: 1.5;">
1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 65536 qdisc noqueue state UNKNOWN<br>
&nbsp;&nbsp;&nbsp;&nbsp;inet 127.0.0.1/8 scope host lo<br>
2: eth0: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc fq_codel state UP<br>
&nbsp;&nbsp;&nbsp;&nbsp;inet 192.168.1.100/24 brd 192.168.1.255 scope global dynamic eth0<br>
&nbsp;&nbsp;&nbsp;&nbsp;gateway: 192.168.1.1 // DNS: 1.1.1.1, 8.8.8.8
</div>
      `);
    },
    ifconfig: () => shellCommands.ip(),

    uname: (args) => {
      if (args[0] === '-a' || args[0] === '-r') {
        appendOutput('Linux reza-station 6.8.0-generic #42-Ubuntu SMP PREEMPT_DYNAMIC Sat Oct 24 x86_64 GNU/Linux', 'info');
      } else {
        appendOutput('Linux', 'info');
      }
    },

    neofetch: () => {
      const art = `
   .-.      <strong style="color: var(--primary);">anka@reza-station</strong>
  oo|       -----------------
 /` + '`' + `\\       <strong>OS:</strong> RezaOS 24.04 LTS x86_64
(\\_.-/     <strong>Kernel:</strong> 6.8.0-reza-generic
           <strong>Uptime:</strong> 4 years (Always Active & Ready)
           <strong>Shell:</strong> bash 5.2.21-interactive
           <strong>Terminal:</strong> Reza-Linux-CLI v2.0
           <strong>CPU:</strong> AMD Ryzen 7 5800H with Radeon Graphics (16) @ 3.20GHz
           <strong>Memory:</strong> 16384MiB / 32768MiB
           <strong>Specialization:</strong> IT Support • Cisco Network • Web Dev
           <strong>Palette:</strong> <span style="background:#ef4444; color:#fff">&nbsp;1&nbsp;</span><span style="background:#f97316; color:#fff">&nbsp;2&nbsp;</span><span style="background:#eab308; color:#000">&nbsp;3&nbsp;</span><span style="background:#22c55e; color:#000">&nbsp;4&nbsp;</span><span style="background:#06b6d4; color:#000">&nbsp;5&nbsp;</span><span style="background:#3b82f6; color:#fff">&nbsp;6&nbsp;</span><span style="background:#a855f7; color:#fff">&nbsp;7&nbsp;</span>
`;
      appendOutput(`<pre style="color: var(--primary-light); font-size: 11px; line-height: 1.35;">${art}</pre>`, 'info');
    },
    fastfetch: () => shellCommands.neofetch(),

    uptime: () => {
      appendOutput('21:44:00 up 4 years, 142 days, 1 user, load average: 0.08, 0.04, 0.01', 'info');
    },

    whoami: () => {
      appendOutput('guest@reza-station // Clearance: Level-1 (Verified Visitor)', 'info');
    },

    date: () => {
      appendOutput(new Date().toString(), 'info');
    },

    history: () => {
      if (cmdHistory.length === 0) {
        appendOutput('Belum ada riwayat perintah yang diketik.');
        return;
      }
      const list = cmdHistory.map((cmd, i) => `${i + 1}  ${cmd}`).join('<br>');
      appendOutput(list, 'info');
    },

    clear: () => {
      if (cliOutputLog) cliOutputLog.innerHTML = '';
      appendOutput('<span style="color: var(--systemd-ok); font-weight: 700;">[TERMINAL CLEARED]</span> Layar dibersihkan. Ketik <span class="cmd-pill" onclick="window.runCli(\'help\')">help</span> untuk daftar perintah.', 'info');
    },

    // --- EASTER EGGS ---
    sl: () => {
      sfx.playTrainWhistle();
      const train = `
      (  ) (@@) ( )  (@)  ()    @@    O     @     O     @
   (@@@)
  (    )
 (@@@@)
    (   )
   ====        ________                ___________
 _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ _____ \\   |           |
   /     |  |   H  |  |   | |   | |   | |       | |
  |      |  |   H  |__----------------| |       | |
  | ________|___H__/__|_____/[][]~\\_______|       |
  |/ |   |_____I_____I_____I_____I_____I_____I_____|
__(@@)___(@@)__(@@)___(@@)__(@@)___(@@)___(@@)___(@@)___`;
      appendOutput(`<pre style="color: #f97316; font-size: 10px; line-height: 1.15; overflow-x: auto;">${train}</pre>`, 'info');
      appendOutput('🚂 <strong>CHOO CHOO!</strong> Anda baru saja salah ketik perintah <code>ls</code> menjadi <code>sl</code>! Kereta uap legendaris Unix melintas di layar Anda.', 'warn');
    },

    coffee: () => {
      sfx.playChime();
      const coffee = `
      (  )   (   )  )
       ) (   )  (  (
       ( )  (    ) )
       _____________
      <_____________> ___
      |             |/ _ \\
      |  ESPRESSO   | | | |
      |  FOR REZA   |_| | |
      |  & VISITOR  |\\___/
      \\_____________/
         =========`;
      appendOutput(`<pre style="color: #f59e0b; font-size: 11px; line-height: 1.25;">${coffee}</pre>`, 'info');
      appendOutput('☕ <strong>HTTP 418: I\'m a teapot!</strong> Secangkir espresso hangat disajikan untuk Anda. Istirahat sejenak, coding & review profil butuh stamina!', 'warn');
    },
    brew: () => shellCommands.coffee(),

    hack: (args) => {
      const target = args.join(' ') || 'Mainframe Server';
      appendOutput(`[+] Menginisialisasi modul CyberDeck v4.2 pada target: <strong>${target}</strong>...`, 'info');
      
      const sequence = [
        { t: `[+] Scanning open TCP/UDP ports on ${target}... Ditemukan: 22 (SSH), 80 (HTTP), 443 (HTTPS), 1337 (ROOT_PORT)`, d: 350, s: 'info' },
        { t: `[+] Mengabaikan firewall heuristik & Cloudflare edge proxy... [BYPASS OK]`, d: 800, s: 'warn' },
        { t: `[+] Menjalankan quantum solver pada kunci enkripsi RSA-4096...`, d: 1300, s: 'warn' },
        { t: `[+] Menginjeksi buffer payload ke dalam kernel memory ring... [EXPLOIT EXECUTED]`, d: 1800, s: 'warn' },
        { t: `🎉 <strong>[ROOT ACCESS GRANTED]</strong> Shell administrator berhasil diperoleh pada ${target}!`, d: 2300, s: 'success' },
        { t: `🛡️ <em>Just kidding!</em> Muhammad Anka Reza menjunjung tinggi etika keamanan siber (White-Hat), hardening jaringan Cisco, dan perlindungan data pengguna.`, d: 3000, s: 'info' }
      ];

      sequence.forEach((step) => {
        setTimeout(() => {
          appendOutput(step.t, step.s);
          sfx.playKey();
          if (step.s === 'success') sfx.playVictory();
        }, step.d);
      });
    },
    nmap: (args) => shellCommands.hack(args),

    matrix: () => {
      sfx.playKey();
      const matrixArt = `
  01001000 01100001 01100011 01101011 00100000 01110100 01101000 01100101 00100000 01010000 01101100 01100001 01101110 01100101 01110100
  10110101 00101100 11001010 10101010 01110011 01111001 01110011 01100001 01100100 01101101 01101001 01101110 00100000 01110010 01100101 01111010 01100001`;
      appendOutput(`<pre style="color: #22c55e; font-size: 10px; line-height: 1.2;">${matrixArt}</pre>`, 'info');
      appendOutput(`
<div style="color: #22c55e; font-size: 12px; line-height: 1.5;">
  🕶️ <strong>Morpheus:</strong> <em>"Bangun, Neo... The Matrix has you. Ikuti kelinci putih. 🐇"</em><br>
  • <strong>Pil Biru:</strong> Tekan <span class="cmd-pill" onclick="window.runCli('1')">[ 1 ] Portofolio Web</span> untuk kembali ke web app modern.<br>
  • <strong>Pil Merah:</strong> Tetap di shell Linux RezaOS dan temukan rahasia lainnya!
</div>`, 'success');
    },

    konami: () => {
      sfx.playVictory();
      const trophy = `
       .----------------.
      | .--------------. |
      | |   ★ ★ ★ ★    | |
      | |   GOD MODE   | |
      | |  ACTIVATED!  | |
      | |   ★ ★ ★ ★    | |
      | '--------------' |
       '----------------'
              (  )
              _)(_
             /____\\`;
      appendOutput(`<pre style="color: #fbbf24; font-weight: 700; font-size: 11px; line-height: 1.2;">${trophy}</pre>`, 'warn');
      appendOutput(`👑 <strong>[1337 HACKER CLEARANCE UNLOCKED]</strong><br>Selamat! Anda telah memasukkan Konami Code legendaris (↑ ↑ ↓ ↓ ← → ← → B A)! Otorisasi Anda dinaikkan menjadi <strong>ROOT UID=0</strong>. Terima kasih telah mengeksplorasi portofolio Reza sedalam ini!`, 'success');
    },

    rickroll: () => {
      sfx.playRickTune();
      const rickArt = `
          ░░░░░░░░▄▄▄▀▀▀▀▄▄▄▄▄▄▄
          ░░░░░░▄▀░░░░░░░░░░░░░░░▀▄
          ░░░░▄▀░░░░░░░░░░░░░░░░░░░▀▄
          ░░░▄▀░░░░▄▄▄▄▄░░░░░░░░░░░░░▀▄
          ░░█░░░░░▄░░░░▄░░░░░░░░░░░░░░░█
          ░█░░░░░░░░░░░░░░░░░░░░░░░░░░░█
          ░█░░░░░░░░░░░░░░░░░░░░░░░░░░░█
          ░░█░░░▀▀▄▄▄▄▄▄▀▀░░░░░░░░░░░░░█
          ░░░▀▄░░░░░░░░░░░░░░░░░░░░░░░▄▀`;
      appendOutput(`<pre style="color: #ec4899; font-size: 10px; line-height: 1.1;">${rickArt}</pre>`, 'info');
      appendOutput('🎵 <strong>Never gonna give you up, never gonna let you down!</strong> 🕺 You just got CLI-Rickrolled in RezaOS! Enjoy the retro 8-bit synthesizer melody!', 'warn');
    },
    astley: () => shellCommands.rickroll(),
    roll: () => shellCommands.rickroll(),

    secret: () => {
      sfx.playChime();
      appendOutput(`
<div style="background: rgba(249, 115, 22, 0.08); border-left: 3px solid var(--primary); padding: 8px 12px; margin: 4px 0;">
  🔒 <strong>DEV-FLAG:</strong> <code style="color: var(--primary-light);">FLAG{REZ4_L1NUX_M45T3R_2026}</code><br>
  <span style="font-size: 11.5px; color: var(--text-muted);">
    Anda menemukan catatan rahasia developer!<br>
    Portal ini dirancang murni dengan Vanilla JavaScript, Semantic CSS, dan Web Audio API untuk performa maksimal tanpa dependensi berat.<br>
    Perintah rahasia yang aktif: <strong>sl</strong>, <strong>coffee</strong>, <strong>hack</strong>, <strong>matrix</strong>, <strong>rickroll</strong>, <strong>neofetch</strong>, <strong>konami</strong>.
  </span>
</div>
      `, 'info');
    },
    flag: () => shellCommands.secret(),
    easteregg: () => shellCommands.secret(),

    exit: () => {
      appendOutput('[SESSION CLOSED] Ingin keluar dari terminal Linux? Mengarahkan langsung ke Web Portofolio Utama...', 'warn');
      setTimeout(() => shellCommands['1'](), 800);
    },
    quit: () => shellCommands.exit(),

    sudo: (args) => {
      const fullCmd = args.join(' ').toLowerCase();
      if (fullCmd.includes('rm') || fullCmd.includes('delete')) {
        sfx.playErrorBuzz();
        appendOutput('🚨 <strong>[SECURITY ALERT]</strong> Akses ditolak! /dev/nvme0n1p2 dipasang sebagai READ-ONLY demi keamanan portofolio Reza.', 'error');
      } else if (fullCmd.includes('hire')) {
        sfx.playVictory();
        appendOutput('🎉 <strong>[ROOT PRIVILEGES GRANTED]</strong> Keputusan hebat! Mengarahkan ke WhatsApp untuk diskusi kolaborasi / wawancara sekarang...', 'success');
        setTimeout(() => shellCommands.whatsapp(), 1000);
      } else if (fullCmd.includes('sandwich')) {
        appendOutput('🥪 <strong>[SUDO]</strong> What? Make it yourself... Tunggu, Anda menggunakan sudo? Okay, ini sandwich spesial untuk Anda! 🥪', 'success');
      } else if (fullCmd.includes('su') || fullCmd === '-i') {
        sfx.playVictory();
        appendOutput('root@reza-station:~# Selamat datang di mode root. Jangan lupa tetap berbuat baik dan bangun web yang cepat!', 'success');
      } else if (fullCmd.startsWith('apt')) {
        appendOutput('Hit:1 http://reza.dev/packages stable InRelease [100% OK]<br>Semua paket keahlian Reza (Cisco, React, Linux) sudah mutakhir.', 'info');
      } else {
        sfx.playErrorBuzz();
        appendOutput(`anka is not in the sudoers file. Insiden ini telah dilaporkan kepada administrator.`, 'warn');
      }
    },

    reboot: () => {
      if (systemdLogs) systemdLogs.innerHTML = '';
      if (bootScreen) bootScreen.style.display = 'block';
      if (mainScreen) mainScreen.style.display = 'none';
      if (cliOutputLog) cliOutputLog.innerHTML = '';
      isBootComplete = false;
      runBootSequence();
    },

    // Shortcuts for links
    '1': () => {
      appendOutput('[EXEC] Membuka Web Portofolio Lengkap...', 'success');
      sfx.playChime();
      const targetUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') && window.location.port === '5173'
        ? 'http://127.0.0.1:5173/'
        : './portfolio/';
      setTimeout(() => { window.location.href = targetUrl; }, 600);
    },
    portfolio: () => shellCommands['1'](),
    run: () => shellCommands['1'](),

    '2': () => {
      appendOutput('[EXEC] Membuka LinkedIn Muhammad Anka Reza...', 'info');
      sfx.playKey();
      window.open('https://www.linkedin.com/in/muhammad-anka-reza-620a0b2b7/?isSelfProfile=true', '_blank');
    },
    linkedin: () => shellCommands['2'](),

    '3': () => {
      appendOutput('[EXEC] Membuka chat WhatsApp...', 'info');
      sfx.playKey();
      window.open('https://wa.me/6285334347482?text=Halo%20Reza,%20saya%20tertarik%20berkolaborasi%20proyek.', '_blank');
    },
    whatsapp: () => shellCommands['3'](),
    wa: () => shellCommands['3'](),

    '4': () => {
      appendOutput('[EXEC] Membuka GitHub AnkaRezaa...', 'info');
      sfx.playKey();
      window.open('https://github.com/AnkaRezaa', '_blank');
    },
    github: () => shellCommands['4'](),

    '5': () => {
      appendOutput('[EXEC] Membuka transmisi email ke rezawalker02@gmail.com...', 'info');
      sfx.playKey();
      window.location.href = 'mailto:rezawalker02@gmail.com?subject=Tawaran%20Kolaborasi%20/%20Pekerjaan';
    },
    email: () => shellCommands['5'](),

    '6': () => {
      appendOutput('[EXEC] Membuka Instagram @toxickers002...', 'info');
      sfx.playKey();
      window.open('https://www.instagram.com/toxickers002/', '_blank');
    },
    instagram: () => shellCommands['6'](),
    ig: () => shellCommands['6'](),

    '7': () => {
      appendOutput('[EXEC] Membuka Twitter / X @Toxickers1...', 'info');
      sfx.playKey();
      window.open('https://x.com/Toxickers1', '_blank');
    },
    twitter: () => shellCommands['7'](),
    x: () => shellCommands['7'](),

    '8': () => {
      openCvViewer();
    },
    cv: () => shellCommands['8'](),
    resume: () => shellCommands['8'](),
  };

  // Global helper for clicking command pills
  window.runCli = function (cmdString) {
    if (cliInput) {
      cliInput.value = cmdString;
      executeCommand(cmdString);
    }
  };

  function executeCommand(rawInput) {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    cmdHistory.push(trimmed);
    historyIdx = cmdHistory.length;

    appendOutput(`<span class="prompt-tag">anka@reza-station:~$</span> <strong>${trimmed}</strong>`, 'cmd');

    const parts = trimmed.split(' ').filter(Boolean);
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (shellCommands[commandName]) {
      shellCommands[commandName](args);
    } else {
      appendOutput(`bash: ${commandName}: perintah tidak ditemukan. Ketik <span class="cmd-pill" onclick="window.runCli('help')">help</span> untuk melihat daftar perintah.`, 'error');
    }

    if (cliInput) cliInput.value = '';
    const termBody = document.getElementById('terminalBody');
    if (termBody) {
      setTimeout(() => { termBody.scrollTop = termBody.scrollHeight; }, 30);
    }
  }

  // CLI Input Keydown (Enter, Up, Down, Tab)
  if (cliInput) {
    cliInput.addEventListener('keydown', (e) => {
      sfx.playKey();

      if (e.key === 'Enter') {
        executeCommand(cliInput.value);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (cmdHistory.length > 0 && historyIdx > 0) {
          historyIdx--;
          cliInput.value = cmdHistory[historyIdx];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIdx < cmdHistory.length - 1) {
          historyIdx++;
          cliInput.value = cmdHistory[historyIdx];
        } else {
          historyIdx = cmdHistory.length;
          cliInput.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const current = cliInput.value.trim().toLowerCase();
        if (!current) return;
        const available = Object.keys(shellCommands);
        const match = available.find((c) => c.startsWith(current));
        if (match) {
          cliInput.value = match;
        }
      }
    });
  }

  // Keyboard number shortcuts (1-8) & Escape key when not typing in the input
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (cvModalOverlay && cvModalOverlay.style.display !== 'none') {
        closeCvViewer();
        return;
      }
    }

    if (!isBootComplete) return;
    if (document.activeElement === cliInput) return;

    if (['1', '2', '3', '4', '5', '6', '7', '8'].includes(e.key)) {
      executeCommand(e.key);
    }
  });

  // Global Konami Code sequence detector (↑ ↑ ↓ ↓ ← → ← → B A)
  const konamiSeq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIdx = 0;

  window.addEventListener('keydown', (e) => {
    if (!isBootComplete) return;
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    const target = konamiSeq[konamiIdx];

    if (key === target || key === target.toLowerCase()) {
      konamiIdx++;
      if (konamiIdx === konamiSeq.length) {
        konamiIdx = 0;
        executeCommand('konami');
      }
    } else {
      konamiIdx = (key === 'ArrowUp') ? 1 : 0;
    }
  });

  // Audio click on links
  document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => sfx.playKey());
  });

  // Top Panel Live Clock
  function updateTopClock() {
    const clockEl = document.getElementById('topClock');
    if (!clockEl) return;
    const now = new Date();
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const dName = days[now.getDay()];
    const mName = months[now.getMonth()];
    const dateNum = String(now.getDate()).padStart(2, '0');
    const timeStr = now.toTimeString().split(' ')[0];
    clockEl.textContent = `${dName} ${dateNum} ${mName} ${timeStr} WIB`;
  }
  setInterval(updateTopClock, 1000);
  updateTopClock();

  // Fullscreen Toggle Button (F11 / Native RequestFullscreen)
  const btnFullscreen = document.getElementById('btnFullscreen');
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      sfx.playKey();
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        btnFullscreen.textContent = '[ ⛶ Normal ]';
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
          btnFullscreen.textContent = '[ ⛶ Fullscreen ]';
        }
      }
    });
  }
  document.addEventListener('fullscreenchange', () => {
    if (btnFullscreen) {
      btnFullscreen.textContent = document.fullscreenElement ? '[ ⛶ Normal ]' : '[ ⛶ Fullscreen ]';
    }
  });

  // Top Panel Reboot Button
  const btnRebootTop = document.getElementById('btnRebootTop');
  if (btnRebootTop) {
    btnRebootTop.addEventListener('click', () => {
      sfx.playKey();
      shellCommands.reboot();
    });
  }

  // Auto-focus on CLI Input whenever user clicks inside terminal window
  const termBody = document.getElementById('terminalBody');
  if (termBody) {
    termBody.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      if (cliInput) cliInput.focus();
    });
  }

})();
