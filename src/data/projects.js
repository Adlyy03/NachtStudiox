export const projectsData = [
  {
    id: 'kroma-os',
    title: 'Kroma OS',
    subtitle: 'High-Throughput Telemetry & Infrastructure Control Panel',
    category: 'Web Application',
    categoryKey: 'webapp',
    year: '2024',
    badge: 'Studio Architecture Showcase',
    summary:
      'Dashboard analitik berkecepatan tinggi yang memproses ribuan data stream per detik dengan WebGL rendering dan zero frame drops.',
    challenge:
      'Menampilkan data live telemetri server dan metrik latensi jaringan secara simultan tanpa membebani browser thread.',
    solution:
      'Arsitektur modular berbasis virtual canvas dan web workers untuk background computation, dipadukan dengan dark UI kontras tinggi untuk monitoring malam hari.',
    stack: ['React', 'TypeScript', 'Three.js / WebGL', 'WebSockets', 'Tailwind'],
    deliverables: ['Real-time Charting', 'Dynamic Node Map', 'Role Dashboard', 'Audit Logging'],
    highlights: ['Render latency < 16ms pada 10,000 node', 'Monochrome aesthetic dengan specular highlights'],
  },
  {
    id: 'aethelgard',
    title: 'Aethelgard Spatial',
    subtitle: 'Minimalist Architectural Archive & Digital Monograph',
    category: 'Website Development',
    categoryKey: 'website',
    year: '2024',
    badge: 'Studio Architecture Showcase',
    summary:
      'Platform editorial untuk biro arsitektur kontemporer dengan tipografi dinamis, transisi halus GSAP, dan viewer 3D model interaktif.',
    challenge:
      'Menghadirkan pengalaman galeri fisik ke ranah web tanpa kehilangan nuansa tactile dan ketenangan visual ruang arsitektural.',
    solution:
      'Pemanfaatan grid 12-kolom asimetris, spatial audio subtle, dan scroll-scrubbed camera angle yang terkoordinasi dengan teks deskripsi proyek.',
    stack: ['Vite', 'React', 'GSAP ScrollTrigger', 'Three.js', 'Custom CSS Tokens'],
    deliverables: ['Editorial Archive Layout', 'Interactive 3D Model Explorer', 'Lighthouse 99/100', 'Bespoke Typography'],
    highlights: ['Zero layout shift', 'Transisi halaman sub-100ms'],
  },
  {
    id: 'vectra-protocol',
    title: 'Vectra Mobile',
    subtitle: 'Cryptographic Asset Manager & Tactile Portfolio Wallet',
    category: 'Mobile Application',
    categoryKey: 'mobile',
    year: '2024',
    badge: 'Studio Architecture Showcase',
    summary:
      'Aplikasi mobile finansial dengan interaksi gesture presisi, keamanan biometrik instan, dan visualisasi portofolio monokromatik.',
    challenge:
      'Membuat transaksi kompleks terasa tenang, intuitif, dan aman di perangkat layar sentuh kecil.',
    solution:
      'Haptic feedback integration, state management deterministik dengan zero desync, dan kurva animasi custom yang responsif terhadap kecepatan sentuhan jari.',
    stack: ['React Native', 'Expo', 'Zustand', 'Reanimated 3', 'Secure Store'],
    deliverables: ['Biometric Auth Flow', 'Multi-Wallet Switcher', 'Haptic Interactions', 'Offline Sync'],
    highlights: ['Waktu peluncuran dingin < 1.2s', 'Aksesibilitas kontras AA compliance'],
  },
  {
    id: 'monolith-commerce',
    title: 'Monolith Storefront',
    subtitle: 'Ultra-Minimalist Headless Commerce Engine',
    category: 'Website Development',
    categoryKey: 'website',
    year: '2024',
    badge: 'Studio Architecture Showcase',
    summary:
      'Etalase belanja editorial tanpa ornamen generik, dirancang untuk brand produk desain independen dengan navigasi keyboard penuh.',
    challenge:
      'Menyingkirkan banner promosi berisik dan elemen AI-slop agar produk dan materialitas objek menjadi satu-satunya fokus pembeli.',
    solution:
      'Layout modular berbasis buku seni cetak, tipografi berjarak rapat, dan sistem checkout instan tanpa halaman peralihan yang tidak perlu.',
    stack: ['React', 'Next.js API', 'GSAP', 'CSS Variables', 'Stripe Integration Layer'],
    deliverables: ['Custom Product Inspector', 'Cart Slide Drawer', 'Keyboard Navigation (Vim-style hints)', 'Edge Cache'],
    highlights: ['Skor SEO 100/100', 'Ukuran payload awal < 85KB gzip'],
  },
];
