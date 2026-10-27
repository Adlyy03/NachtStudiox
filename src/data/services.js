export const servicesData = [
  {
    id: 'website',
    number: '01',
    title: 'Website Development',
    tagline: 'Editorial & High-Performance Web Platforms',
    description:
      'Kami merancang dan membangun website company profile, landing page produk, katalog digital, dan editorial showcase dengan fokus pada tipografi kuat, hierarki jelas, dan performa tinggi tanpa kompromi.',
    metrics: '< 0.8s LCP • 99+ Lighthouse • 100% SEO Ready',
    deliverables: [
      'Bespoke Visual Architecture & Typography',
      'Responsif multi-device tanpa layout shift',
      'GSAP scroll & micro-interaction terarah',
      'Headless CMS integration atau Markdown',
      'Technical SEO, Schema & OpenGraph ready',
    ],
    technologies: ['React', 'Next.js / Vite', 'GSAP', 'Tailwind / Vanilla CSS', 'Sanity / Strapi'],
    idealFor: 'Brand premium, arsitektur/studio kreatif, startup yang ingin tampil kredibel dan berkarakter.',
  },
  {
    id: 'webapp',
    number: '02',
    title: 'Web Application',
    tagline: 'Scalable Systems & Mission-Critical Portals',
    description:
      'Aplikasi web kompleks dengan state management solid, visualisasi data interaktif, dan arsitektur modular: mulai dari SaaS internal portal, dashboard analitik, hingga multi-role management tools.',
    metrics: 'Zero-latency UI • Role-based Security • Scalable Modules',
    deliverables: [
      'Kompleks data table, filtering, dan visualisasi interaktif',
      'Autentikasi berlapis & Role-Based Access Control (RBAC)',
      'Optimasi query & caching untuk dataset besar',
      'Clean component architecture yang mudah dimaintain',
      'API integration (REST / GraphQL / WebSocket)',
    ],
    technologies: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL / Supabase', 'TanStack Query'],
    idealFor: 'Tim bisnis, startup operasional, dan korporasi yang membutuhkan tools internal atau produk SaaS tangguh.',
  },
  {
    id: 'mobile',
    number: '03',
    title: 'Mobile Application',
    tagline: 'Fluid & Resilient Native Experiences',
    description:
      'Pengembangan aplikasi mobile iOS dan Android yang mengutamakan ergonomi sentuhan pengguna, offline-first reliability, transisi gesture mulus, dan sinkronisasi data instan.',
    metrics: '60fps UI • Offline Sync • Biometric Security',
    deliverables: [
      'Cross-platform codebase (iOS & Android) dari satu arsitektur teruji',
      'Desain interaksi tactile dan animasi fluid 60fps',
      'Local caching & offline capability',
      'Push notification & hardware integration (Camera, Biometrics, GPS)',
      'Persiapan rilis Google Play & Apple App Store',
    ],
    technologies: ['React Native / Expo', 'TypeScript', 'Zustand', 'Native Modules', 'SQLite / WatermelonDB'],
    idealFor: 'Produk digital B2C atau B2B yang membutuhkan akses cepat di genggaman tangan.',
  },
];
