export const features = [
  {
    id: "no-app",
    title: "No phone app. Ever.",
    body: "The desktop serves a self-contained page and a WebAssembly cipher over the LAN. Any phone browser works — Android, iPhone, whatever is in your pocket.",
    visual: "phone" as const,
  },
  {
    id: "encryption",
    title: "Sealed before it leaves the device",
    body: "Files are chunk-encrypted with AES-256-GCM before they cross the air, in both directions. A flipped byte fails authentication — it never decrypts.",
    visual: "cipher" as const,
  },
  {
    id: "qr",
    title: "Pairing you can verify by eye",
    body: "Scan a QR to join. An unambiguous XX-XX code — no 0/O, no 1/I/L — is shown on both screens, so you always know the session is yours.",
    visual: "code" as const,
  },
  {
    id: "directions",
    title: "Both directions",
    body: "Send from the PC. Receive from the phone. Same QR, same encryption, same one-screen flow.",
    visual: "arrows" as const,
  },
  {
    id: "size",
    title: "Multi-gigabyte, flat memory",
    body: "Files stream in 1 MiB encrypted frames and are never buffered whole — a 20 GB video moves as smoothly as a screenshot.",
    visual: "stream" as const,
  },
  {
    id: "discovery",
    title: "Finds the real network",
    body: "AirLynk picks the actual Wi-Fi adapter and filters the fake ones — VPNs, WSL, Hyper-V, Docker — so the QR always points somewhere reachable.",
    visual: "radar" as const,
  },
  {
    id: "safety",
    title: "Quarantine before trust",
    body: "In-flight uploads land in quarantine, get decrypted and authenticated before release, never overwrite existing files, and hostile filenames are sanitized.",
    visual: "shield" as const,
  },
  {
    id: "firewall",
    title: "Self-healing firewall",
    body: "Detects a missing or stale Windows Firewall rule — including rules pointing at an old install path — and repairs it with one click.",
    visual: "flame" as const,
  },
] as const;

export const steps = [
  {
    id: "start",
    title: "Start a session",
    body: "Drop files or pick a folder. AirLynk binds a tiny HTTP server to its LAN address on an ephemeral port — never 0.0.0.0.",
    detail: "start_send_session(files)",
  },
  {
    id: "scan",
    title: "Scan the QR",
    body: "The QR encodes the session URL plus the AES-256 key in the URL fragment — a part of the URL browsers never send to the server. The key stays between the two devices.",
    detail: "GET /s/<token> · key in #fragment",
  },
  {
    id: "verify",
    title: "Verify the code",
    body: "A four-character code drawn from an alphabet without 0/O/1/I/L appears on both screens. Same code, same session — no impostors.",
    detail: "pairing code · K7-M4",
  },
  {
    id: "seal",
    title: "Watch it seal",
    body: "Encrypted frames cross the air, each with its own authentication tag. Sessions auto-expire after ten quiet minutes and the server closes with them.",
    detail: "AES-256-GCM · per-chunk tag",
  },
] as const;

export const alternatives = [
  {
    name: "Cloud drives",
    price: "Your files ride through someone else's servers",
    points: [
      "Account required, on every device",
      "Upload bandwidth before anything moves",
      "Size caps and throttled tiers",
      "Your keys, their infrastructure",
    ],
  },
  {
    name: "Cables & messengers",
    price: "The old ways, with friction",
    points: [
      "Re-compressed photos, re-encoded videos",
      "Chat history cluttered with attachments",
      "The right cable is never nearby",
      "Cloud middleman for cross-platform",
    ],
  },
] as const;

export const airLynkPoints = [
  "Device to device, across the room",
  "Original bytes, untouched and unthrottled",
  "256-bit CSPRNG session tokens",
  "Key never sent, logged, or stored",
] as const;

export const audiences = [
  {
    id: "developers",
    title: "Developers",
    body: "APKs, logs, build artifacts, test devices on the same desk. No adb fiddling, no upload to a bucket just to move a file two meters.",
  },
  {
    id: "students",
    title: "Students",
    body: "Lecture slides and assignments off a campus laptop, onto a phone, before the class ends — even on a dorm network with no internet.",
  },
  {
    id: "researchers",
    title: "Researchers",
    body: "Datasets too large for email and too sensitive for a drive. Moves in minutes across the room's own Wi-Fi.",
  },
  {
    id: "professionals",
    title: "Professionals",
    body: "Contracts, scans, and photos that are contractually required to never touch a cloud. AirLynk makes that the default, not the workaround.",
  },
  {
    id: "teams",
    title: "Teams",
    body: "A bridge between machines and phones that IT can actually reason about: LAN only, sessions expire, nothing is retained.",
  },
] as const;

export const techStack = [
  { name: "Tauri 2", role: "Desktop shell" },
  { name: "Rust", role: "Core + server" },
  { name: "axum", role: "Embedded HTTP" },
  { name: "tokio", role: "Async runtime" },
  { name: "WebAssembly", role: "Phone cipher" },
  { name: "AES-256-GCM", role: "Chunked AEAD" },
  { name: "React 19", role: "Desktop UI" },
  { name: "TypeScript", role: "Type safety" },
  { name: "Tailwind CSS 4", role: "Styling" },
  { name: "Vite 7", role: "Bundler" },
] as const;

export const testimonials = [
  {
    quote:
      "Moved a 14 GB capture from my desktop to my phone before my coffee cooled. I still don't know where the 'server' was.",
    name: "Mara J.",
    role: "Video editor",
  },
  {
    quote:
      "The pairing code is what sold me. Same four characters on both screens — it sounds small until you've used an app that doesn't have it.",
    name: "Tomás R.",
    role: "Security engineer",
  },
  {
    quote:
      "Our lab machines have no internet access. AirLynk is the only tool we've found that works at all — because it never needed it.",
    name: "Priya N.",
    role: "Research assistant",
  },
] as const;

export const faqs = [
  {
    q: "Does my phone need an app?",
    a: "No. The desktop serves a fully self-contained page plus a WebAssembly cipher module over the LAN. Any phone browser works — nothing is installed, nothing is fetched from the internet.",
  },
  {
    q: "Does it need internet access?",
    a: "No. AirLynk speaks only to devices on your local network. It works fine on a Wi-Fi router with the WAN cable pulled out, or a phone hotspot with mobile data off.",
  },
  {
    q: "Is it actually end-to-end encrypted?",
    a: "Yes — AES-256-GCM, per 1 MiB chunk, with per-chunk authentication tags, in both directions. The 256-bit session key is generated by the OS CSPRNG and travels only inside the QR code's URL fragment, which browsers never transmit to a server. It is never sent, logged, or stored.",
  },
  {
    q: "How large can the files be?",
    a: "Multi-gigabyte. Transfers stream with bounded memory — files are never buffered whole. Each session allows up to 500 files and 64 GiB.",
  },
  {
    q: "Which platforms are supported?",
    a: "Windows 10/11 (installer, MSI, or portable) and Linux — RPM for Fedora/RHEL, DEB for Ubuntu/Debian, and an AppImage for everything else.",
  },
  {
    q: "What if someone else scans my QR code?",
    a: "They'd need to be on the same network at that moment — and you'd see a mismatched pairing code. Unverified ciphertext is quarantined and rejected before a file ever exists, sessions expire after ten quiet minutes, and unknown tokens get an indistinguishable 404.",
  },
  {
    q: "What does it cost?",
    a: "Nothing, by design. AirLynk is MIT-licensed open source with no accounts — your name in the credits is the only account you'll ever need.",
  },
] as const;

export const builtWithChips = [
  "AES-256-GCM",
  "No accounts",
  "No cloud",
  "Multi-GB streaming",
  "LAN only",
  "Open source · MIT",
] as const;
