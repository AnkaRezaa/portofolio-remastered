import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

interface TerminalLine {
  id: number;
  prompt?: string;
  text: string;
  type?: "command" | "output" | "success" | "warn";
}

// Infinite command pool for left terminal
const COMMAND_TEMPLATES = [
  { cmd: "cisco-ios --show-routes", outputs: [
    "O    10.10.20.0/24 [110/11] via 10.10.10.2, GigabitEthernet0/0",
    "O    10.10.30.0/24 [110/11] via 10.10.10.3, GigabitEthernet0/1",
    "[OK] OSPF Area 0 neighbor state: Full/DR (10.10.10.2)",
    "[OK] IEEE 802.1Q trunk active: VLANs 10, 20, 30",
  ]},
  { cmd: "mikrotik-cli /ip firewall nat print", outputs: [
    "0 chain=srcnat action=masquerade out-interface=ether1",
    "1 chain=dstnat action=dst-nat to-addresses=192.168.10.50 to-ports=80",
    "[OK] Queue Tree: Bandwidth_QoS max-limit=50M/100M active",
  ]},
  { cmd: "nmap -sS -p 22,80,443 192.168.10.1/24", outputs: [
    "PORT     STATE SERVICE",
    "22/tcp   open  ssh",
    "80/tcp   open  http",
    "443/tcp  open  https",
    "[OK] 0 vulnerabilities detected across 24 hosts",
  ]},
  { cmd: "npm run deploy:production", outputs: [
    "✓ 2,384 modules transformed in 280ms",
    "✓ React 18 + TypeScript strict type-check passed",
    "[SUCCESS] Web apps deployed: ALAB, myGARDEN, Hotelier",
  ]},
  { cmd: "whoami --spec", outputs: [
    "USER: Muhammad Anka Reza (IT Infrastructure & Software Engineer)",
    "CAMPUS: Politeknik Negeri Malang (D4 Teknologi Informasi)",
    "CREDENTIALS: 09+ Verified National & Global Accreditations",
  ]},
  { cmd: "sysbench --test=cpu --cpu-max-prime=20000 run", outputs: [
    "Running CPU speed test (20000 primes)...",
    "Total time: 1.482s | Min latency: 0.12ms | Max latency: 0.28ms",
    "[OK] System responsiveness rating: 99.8%",
  ]},
];

export const TerminalStreamBg: React.FC = () => {
  const { theme } = useTheme();

  // Left Terminal State
  const [leftLines, setLeftLines] = useState<TerminalLine[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string>("anka@reza:~$");
  const [currentTypingText, setCurrentTypingText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Right Telemetry State
  const [rightLines, setRightLines] = useState<string[]>([]);

  const leftContainerRef = useRef<HTMLDivElement | null>(null);
  const rightContainerRef = useRef<HTMLDivElement | null>(null);

  // Continuous Left Terminal Typing Loop (NEVER CLEARS - Infinite Ring Buffer)
  useEffect(() => {
    let isCancelled = false;
    let lineCounter = 0;
    let templateIndex = 0;

    const runInfiniteLeftTerminal = async () => {
      while (!isCancelled) {
        const template = COMMAND_TEMPLATES[templateIndex % COMMAND_TEMPLATES.length];
        templateIndex++;

        // 1. Type command character by character rapidly
        setIsTyping(true);
        setCurrentPrompt("anka@reza:~$");
        setCurrentTypingText("");

        for (let i = 1; i <= template.cmd.length; i++) {
          if (isCancelled) return;
          setCurrentTypingText(template.cmd.slice(0, i));
          // Rapid typing: 10ms - 22ms per char
          await new Promise((r) => setTimeout(r, 12 + Math.random() * 10));
        }

        // Enter pause
        await new Promise((r) => setTimeout(r, 90));
        if (isCancelled) return;

        // Push completed command to buffer
        setLeftLines((prev) => [
          ...prev.slice(-35), // Keep continuous buffer (oldest scroll off smoothly)
          {
            id: ++lineCounter,
            prompt: "anka@reza:~$",
            text: template.cmd,
            type: "command",
          },
        ]);

        setCurrentTypingText("");
        setIsTyping(false);
        await new Promise((r) => setTimeout(r, 40));

        // 2. Output lines stream downwards rapidly
        for (const outText of template.outputs) {
          if (isCancelled) return;
          setLeftLines((prev) => [
            ...prev.slice(-35),
            {
              id: ++lineCounter,
              text: outText,
              type: outText.startsWith("[OK]") || outText.startsWith("[SUCCESS]")
                ? "success"
                : "output",
            },
          ]);
          await new Promise((r) => setTimeout(r, 35 + Math.random() * 25));
        }

        // Brief realistic pause before typing the next continuous command
        await new Promise((r) => setTimeout(r, 180 + Math.random() * 100));
      }
    };

    runInfiniteLeftTerminal();
    return () => {
      isCancelled = true;
    };
  }, []);

  // Continuous Right Telemetry Monitor Loop (Packets & Live Dynamic Counters)
  useEffect(() => {
    let isCancelled = false;
    let pingSeq = 100;
    let bytesTotal = 48200;

    const runInfiniteRightTelemetry = async () => {
      const telemetryGenerators = [
        () => {
          pingSeq++;
          const time = (0.8 + Math.random() * 0.4).toFixed(2);
          return `64 bytes from 10.10.1.1: icmp_seq=${pingSeq} ttl=64 time=${time} ms`;
        },
        () => {
          bytesTotal += Math.floor(Math.random() * 512);
          return `[ETH0] TX: ${(bytesTotal / 1024).toFixed(1)}MB | RX: ${((bytesTotal * 1.8) / 1024).toFixed(1)}MB | 0 errors`;
        },
        () => `[BGP] AS64512 Peer 10.24.0.1 SYN-ACK state: ESTABLISHED [RTT: 12ms]`,
        () => `[VLAN_20] Trunk port Gi0/1 IEEE 802.1Q frames: ${Math.floor(Math.random() * 900 + 100)}/s`,
        () => `[REACT_FIBER] Reconciliation pass complete: commit 0.28ms @ 120fps`,
        () => `[SYS_LOAD] CPU: ${(12 + Math.random() * 8).toFixed(1)}% | RAM: 4.8GB/32GB | TMP: 42°C`,
        () => `[FIREWALL] Inbound packet evaluated: Chain=INPUT Action=ACCEPT Port=${Math.random() > 0.5 ? 443 : 80}`,
        () => `[MYSQL] Connection pool active: 8 threads, latency 0.18ms`,
      ];

      while (!isCancelled) {
        const gen = telemetryGenerators[Math.floor(Math.random() * telemetryGenerators.length)];
        const newLine = gen();

        setRightLines((prev) => [...prev.slice(-35), newLine]);

        // Continuous streaming speed for right flank
        await new Promise((r) => setTimeout(r, 90 + Math.random() * 60));
      }
    };

    runInfiniteRightTelemetry();
    return () => {
      isCancelled = true;
    };
  }, []);

  // Auto-scroll left and right containers downwards
  useEffect(() => {
    if (leftContainerRef.current) {
      leftContainerRef.current.scrollTop = leftContainerRef.current.scrollHeight;
    }
  }, [leftLines, currentTypingText]);

  useEffect(() => {
    if (rightContainerRef.current) {
      rightContainerRef.current.scrollTop = rightContainerRef.current.scrollHeight;
    }
  }, [rightLines]);

  const isDark = theme === "dark";

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden font-mono select-none transition-opacity duration-700 w-full h-full p-4 sm:p-6 ${
        isDark ? "opacity-[0.08]" : "opacity-[0.14]"
      }`}
      style={{
        // Radial mask: Softer at center for zero reading distraction, clearer at flanks
        maskImage: isDark
          ? "radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,1) 100%)"
          : "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 75%, rgba(0,0,0,1) 100%)",
        WebkitMaskImage: isDark
          ? "radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,1) 100%)"
          : "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 75%, rgba(0,0,0,1) 100%)",
      }}
      aria-hidden="true"
    >
      {/* Dual Flank Grid: Left Terminal + Right Telemetry */}
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 text-[11px] sm:text-xs leading-relaxed">
        
        {/* Left Flank: Interactive Continuous Command Shell */}
        <div
          ref={leftContainerRef}
          className="lg:col-span-6 h-full overflow-hidden flex flex-col justify-end space-y-1"
        >
          <div className="pb-1.5 mb-1 border-b border-orange-500/30 dark:border-orange-500/20 text-[10px] text-orange-700 dark:text-orange-500/60 font-bold flex items-center justify-between">
            <span>TTY: /dev/pts/0 [SHELL_STREAM]</span>
            <span>LOOP: CONTINUOUS</span>
          </div>

          {leftLines.map((line) => (
            <div key={line.id} className="whitespace-pre-wrap break-all">
              {line.type === "command" ? (
                <p className="flex items-start gap-1.5">
                  <span className="font-extrabold text-orange-600 dark:text-orange-500 shrink-0">
                    {line.prompt}
                  </span>
                  <span className={isDark ? "text-amber-200 font-semibold" : "text-slate-900 font-bold"}>
                    {line.text}
                  </span>
                </p>
              ) : line.type === "success" ? (
                <p className={`pl-3 font-semibold ${isDark ? "text-emerald-400" : "text-emerald-700"}`}>
                  {line.text}
                </p>
              ) : (
                <p
                  className={`pl-3 ${
                    isDark ? "text-slate-300" : "text-slate-800 font-medium"
                  }`}
                >
                  {line.text}
                </p>
              )}
            </div>
          ))}

          {/* Active Typing Command Line */}
          {isTyping && (
            <div className="flex items-center gap-1.5 whitespace-pre-wrap break-all">
              <span className="font-extrabold text-orange-600 dark:text-orange-500 shrink-0">
                {currentPrompt}
              </span>
              <span
                className={`font-bold ${
                  isDark ? "text-amber-200" : "text-slate-900"
                }`}
              >
                {currentTypingText}
              </span>
              <span className="inline-block w-1.5 h-3.5 bg-orange-600 dark:bg-orange-500 animate-pulse ml-0.5" />
            </div>
          )}

          {!isTyping && leftLines.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-orange-600 dark:text-orange-500">anka@reza:~$</span>
              <span className="inline-block w-1.5 h-3.5 bg-orange-600 dark:bg-orange-500 animate-pulse" />
            </div>
          )}
        </div>

        {/* Right Flank: Live Packet Telemetry & Diagnostics Stream */}
        <div
          ref={rightContainerRef}
          className="hidden lg:flex lg:col-span-6 h-full overflow-hidden flex-col justify-end space-y-1 text-right"
        >
          <div className="pb-1.5 mb-1 border-b border-orange-500/30 dark:border-orange-500/20 text-[10px] text-orange-700 dark:text-orange-500/60 font-bold flex items-center justify-between">
            <span>PACKET_MONITOR: /dev/net0</span>
            <span>STATUS: 24/7 CAPTURE</span>
          </div>

          {rightLines.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap break-all">
              <p
                className={`${
                  line.includes("icmp_seq")
                    ? isDark ? "text-orange-400 font-semibold" : "text-orange-700 font-bold"
                    : line.includes("ESTABLISHED") || line.includes("ACCEPT")
                    ? isDark ? "text-emerald-400 font-semibold" : "text-emerald-700 font-bold"
                    : isDark
                    ? "text-slate-300 font-medium"
                    : "text-slate-800 font-semibold"
                }`}
              >
                {line}
              </p>
            </div>
          ))}

          <div className="flex items-center justify-end gap-1.5 text-orange-600 dark:text-orange-500/70 text-[10px] font-bold">
            <span>TELEMETRY_SYNCING</span>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
          </div>
        </div>

      </div>
    </div>
  );
};
