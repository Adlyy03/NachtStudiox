# LichtCraft --- Design System & Visual Design Specification

**Versi:** 1.0\
**Arah visual:** monochrome premium, editorial, dimensional, motion-led

## 1. Konsep Visual

LichtCraft tampil seperti studio digital modern: tegas, minimal, berani
memakai ruang kosong, dengan detail cahaya dan bayangan yang memberi
kedalaman. Nuansa B&W tidak berarti semua elemen harus datar; dimensi
dibangun lewat kontras, gradient abu-abu, blur, border transparan,
pencahayaan putih, dan shadow lembut.

**Kata kunci:** monochrome, premium, precise, cinematic, tactile,
confident, modern.

### Prinsip desain

1.  **Monochrome first:** hitam, putih, dan rentang abu-abu sebagai
    seluruh palet utama.
2.  **Typography-led:** tipografi kuat menjadi elemen visual utama.
3.  **Depth with restraint:** shadow dan glow memberi dimensi, bukan
    membuat semua kartu terlihat mengambang.
4.  **Motion with purpose:** animasi membantu membangun fokus dan
    mengarahkan mata.
5.  **Content first:** gerakan visual tidak boleh mengorbankan
    keterbacaan atau kecepatan.
6.  **Responsive by design:** komposisi desktop bukan sekadar diperkecil
    untuk mobile.

## 2. Palet Warna

  --------------------------------------------------------------------------
  Token                   Nilai                      Penggunaan
  ----------------------- -------------------------- -----------------------
  `--color-ink`           `#080808`                  Background utama

  `--color-black`         `#000000`                  Area gelap pekat

  `--color-charcoal`      `#111111`                  Panel/kartu gelap

  `--color-elevated`      `#181818`                  Permukaan terangkat

  `--color-gray-700`      `#3A3A3A`                  Border/elemen sekunder

  `--color-gray-500`      `#777777`                  Teks sekunder yang
                                                     cukup kontras

  `--color-gray-300`      `#BDBDBD`                  Teks pendukung pada
                                                     latar gelap

  `--color-off-white`     `#F2F2F0`                  Background terang
                                                     sesekali

  `--color-white`         `#FFFFFF`                  Teks utama dan
                                                     highlight

  `--color-border`        `rgba(255,255,255,0.12)`   Border di atas
                                                     permukaan gelap

  `--color-glow`          `rgba(255,255,255,0.16)`   Glow putih yang halus
  --------------------------------------------------------------------------

Jangan menambahkan ungu, biru, atau warna aksen lain kecuali arah visual
diubah secara eksplisit.

## 3. Bayangan, Glow, dan Kedalaman

Gunakan shadow berlapis, bukan outline hitam yang keras.

``` css
:root {
  --shadow-card:
    0 18px 50px rgba(0, 0, 0, 0.32),
    0 2px 10px rgba(0, 0, 0, 0.22);

  --shadow-floating:
    0 28px 80px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(255, 255, 255, 0.07);

  --shadow-inset:
    inset 0 1px 0 rgba(255, 255, 255, 0.07),
    inset 0 -1px 0 rgba(0, 0, 0, 0.3);

  --glow-white:
    0 0 28px rgba(255, 255, 255, 0.09);
}
```

### Aturan penggunaan

-   Background gelap: pakai radial gradient abu-abu gelap secara halus
    untuk fokus visual.
-   Kartu: border putih transparan + shadow lembut.
-   Hover: sedikit peningkatan shadow, border, atau posisi; jangan
    membuat semua kartu melompat tinggi.
-   Glow: khusus elemen fokus seperti objek hero atau CTA, bukan pada
    setiap elemen.
-   Teks: hindari shadow tebal yang mengurangi ketajaman.
-   Pastikan shadow tidak menjadi pengganti kontras yang memadai.

## 4. Tipografi

Gunakan pasangan font sans-serif modern. Rekomendasi awal: -
**Display/headline:** `Space Grotesk` atau font display sans yang
sejenis. - **Body/UI:** `Inter` atau sans-serif sistem.

Jika font eksternal menambah beban, gunakan fallback sistem.

### Skala desktop

  Token                                Ukuran     Weight Penggunaan
  ------------ ------------------------------ ---------- ------------------------
  Display XL     `clamp(3.5rem, 8vw, 7.5rem)`   600--700 Headline hero
  H1              `clamp(2.75rem, 5vw, 5rem)`   600--700 Headline section utama
  H2             `clamp(2rem, 3.5vw, 3.5rem)`        600 Judul section
  H3                        `1.25rem–1.75rem`        600 Judul kartu
  Body L                           `1.125rem`        400 Intro section
  Body                                 `1rem`        400 Konten umum
  Small                            `0.875rem`   400--500 Label dan metadata
  Eyebrow                     `0.7rem–0.8rem`        600 Label uppercase

### Aturan tipografi

-   Headline memakai line-height rapat, sekitar `0.95–1.1`.
-   Body menggunakan line-height sekitar `1.5–1.75`.
-   Batasi lebar paragraf agar mudah dipindai.
-   Gunakan uppercase hanya untuk label pendek, bukan paragraf.
-   Jangan memakai terlalu banyak ukuran dan weight yang berbeda dalam
    satu section.

## 5. Layout dan Grid

-   Kontainer desktop: `max-width: 1440px`, dengan padding horizontal
    responsif.
-   Grid desktop: 12 kolom.
-   Grid tablet: 6 kolom.
-   Grid mobile: 4 kolom atau layout satu kolom.
-   Spacing berbasis kelipatan 4 atau 8 px.
-   Section memiliki ruang vertikal besar agar desain terasa tenang dan
    premium.
-   Gunakan asimetri secara terkontrol: hero bisa menyeimbangkan teks
    dan visual, sementara section lain menjaga keterbacaan.

Contoh token spacing:

``` css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
  --space-32: 8rem;
}
```

## 6. Bentuk, Border, dan Permukaan

-   Radius kecil (`8–12px`) untuk kontrol dan elemen UI.
-   Radius menengah (`16–24px`) untuk kartu dan media.
-   Radius besar hanya untuk visual hero atau objek dekoratif.
-   Border tipis berwarna putih transparan di permukaan gelap.
-   Hindari glassmorphism berlebihan. Blur dipakai selektif dan tidak
    boleh membuat teks buram.
-   Tombol utama putih dengan teks hitam; tombol sekunder transparan
    dengan border putih tipis.

## 7. Komposisi Section

### A. Header / Navigation

-   Wordmark `LichtCraft` di kiri.
-   Link anchor ringkas di tengah/kanan.
-   CTA di kanan jika tujuan kontak sudah tersedia.
-   Background transparan di atas hero; dapat menjadi gelap
    solid/translucent saat scroll.
-   Border bawah sangat halus.
-   Mobile menggunakan menu yang mudah diakses.

### B. Hero

-   Background hitam dengan pencahayaan radial abu-abu yang halus.
-   Wordmark atau label kecil di atas headline.
-   Headline besar dan lugas yang menjelaskan hasil, bukan hanya
    teknologi.
-   Subheadline maksimal 2--3 baris.
-   Dua tindakan: CTA utama dan link sekunder ke portofolio.
-   Visual motion graphic sebagai centerpiece: bentuk abstrak monokrom,
    garis, objek metalik, permukaan reflektif, atau komposisi 3D
    sederhana.
-   Hindari visual yang terlalu ramai di belakang teks.
-   Pastikan headline dan CTA terlihat sebelum animasi selesai.

Contoh arah copy (draft, bisa direvisi): \> Digital experiences, crafted
with intent.

Subheadline draft: \> LichtCraft membangun website dan aplikasi digital
yang dirancang untuk membantu bisnis tampil lebih kuat dan bekerja lebih
baik.

CTA draft: - `Explore Our Work` - `Discuss a Project` (aktifkan setelah
kontak siap)

### C. Value Proposition

-   Pernyataan singkat tentang perpaduan desain, engineering, dan tujuan
    bisnis.
-   Gunakan tipografi besar dengan reveal sederhana.
-   Jangan memakai statistik yang belum terverifikasi.

### D. Services

-   Tiga kartu utama: Website, Web App, Mobile App.
-   Setiap kartu punya nomor/label, deskripsi singkat, dan visual kecil
    atau ikon garis.
-   Hover dapat mengubah border, elevasi, atau menampilkan detail
    tambahan.
-   Di mobile, kartu menjadi vertikal dan interaksi tidak bergantung
    pada hover.

### E. Selected Work / Portfolio

-   Grid asimetris dengan gambar/screenshot proyek.
-   Tiap item menunjukkan nama proyek, kategori, ringkasan hasil, dan
    teknologi jika relevan.
-   Gunakan gambar dengan rasio konsisten atau variasi yang disengaja.
-   Jika proyek belum ada, gunakan empty state yang tetap premium;
    jangan berpura-pura menampilkan klien nyata.
-   Klik proyek dapat membuka detail/case study di fase berikutnya.

### F. Why LichtCraft

-   Tiga prinsip, misalnya: purposeful design, reliable engineering,
    clear collaboration.
-   Hindari klaim absolut seperti "terbaik" atau "nomor satu".
-   Gunakan layout editorial dan divider tipis.

### G. Process

-   4 langkah: Discover → Define → Build → Refine & Launch.
-   Tampilkan alur yang jelas, bisa memakai garis yang digambar oleh
    GSAP.
-   Animasi garis hanya dekoratif; isi harus tetap terbaca tanpa
    animasi.

### H. CTA

-   Panel kontras dengan border tipis dan shadow lembut.
-   Headline ajakan konsultasi.
-   Tombol kontak setelah kanal kontak dipilih.
-   Sebelum itu, CTA dapat diarahkan ke portofolio atau ditampilkan
    sebagai placeholder non-publik.

### I. Footer

-   Wordmark, ringkasan singkat, anchor link, dan kanal sosial/kontak
    setelah dikonfirmasi.
-   Jangan menampilkan tautan sosial palsu.
-   Tambahkan copyright dengan tahun dinamis saat implementasi.

## 8. Sistem Motion Graphic

### Prinsip

Motion harus punya tujuan: membangun fokus, menjelaskan hierarki,
memberi feedback, atau menambah rasa kualitas. Hindari animasi berulang
yang membuat lelah.

### GSAP motion map

  --------------------------------------------------------------------------
  Area              Gerakan              Trigger           Catatan
  ----------------- -------------------- ----------------- -----------------
  Hero headline     Fade + y-translate   Page load         Cepat dan tidak
                    kecil, stagger                         menahan konten

  Hero visual       Slow                 Pointer/scroll,   Batasi amplitudo
                    rotation/parallax    selektif          

  Header            Perubahan            Scroll            Hindari layout
                    opacity/background                     shift

  Section heading   Reveal/mask          ScrollTrigger     Sekali atau scrub
                    sederhana                              ringan

  Service cards     Stagger              Masuk viewport    Jarak gerak kecil
                    opacity/translate                      

  Portfolio         Reveal               Masuk viewport    Jangan membuat
                    image/clip-path                        gambar lama
                                                           tersembunyi

  Process line      Draw line            Masuk viewport    Konten tetap
                                                           terbaca

  CTA               Hover/focus feedback Interaksi         Harus jelas untuk
                                                           keyboard juga
  --------------------------------------------------------------------------

### Batasan motion

-   Hindari scroll hijacking.
-   Jangan mengunci scroll pengguna.
-   Hindari animasi besar pada seluruh halaman secara bersamaan.
-   Gunakan `gsap.context()` atau integrasi `useGSAP` agar animasi
    dibersihkan dengan benar.
-   Jangan memodifikasi DOM React secara liar.
-   Hormati `prefers-reduced-motion`; sediakan versi tanpa gerakan
    besar.
-   Hindari animasi berkedip cepat.
-   Uji di perangkat mobile dengan performa menengah.

## 9. Arah Visual 3D

Gunakan Three.js / React Three Fiber hanya untuk satu atau dua visual
penting: - Objek abstrak putih/perak di ruang gelap. - Material matte
dan metalik dengan pencahayaan lembut. - Gerak lambat dan terkontrol. -
Kamera tidak terlalu agresif. - Fallback berupa gradient, SVG, atau
gambar statis. - Lazy-load scene jika berada di bawah fold. -
Nonaktifkan efek berat di perangkat yang tidak mendukung atau saat
reduced motion aktif.

Jangan membuat seluruh halaman menjadi scene 3D. HTML tetap menjadi
lapisan utama untuk teks, tombol, navigasi, dan aksesibilitas.

## 10. Interaksi UI

### Tombol

-   Primary: putih, teks hitam, hover sedikit berubah tone/elevasi.
-   Secondary: transparan, border tipis, teks putih.
-   Focus ring jelas.
-   State disabled dan loading perlu dirancang jika tombol menjalankan
    aksi async.

### Kartu

-   Default: surface charcoal, border halus.
-   Hover: border sedikit lebih terang, shadow bertambah, translateY
    kecil.
-   Touch: informasi penting selalu terlihat; jangan bergantung pada
    hover.

### Link

-   Underline atau perubahan opacity/warna yang konsisten.
-   Target link jelas.
-   External link ditandai bila perlu.

### Form admin (fase mendatang)

-   Label selalu terlihat.
-   Error ditempatkan dekat field terkait.
-   Tombol hapus memerlukan konfirmasi.
-   Status penyimpanan ditampilkan secara jelas.
-   Fokus keyboard dan navigasi field harus baik.

## 11. Responsif

### Mobile

-   Headline lebih kecil dan tidak terlalu banyak baris.
-   Satu kolom untuk layanan/portofolio jika ruang terbatas.
-   Kurangi atau matikan interaksi pointer dan scene 3D berat.
-   Tombol memiliki area sentuh memadai.
-   Menu mobile dapat ditutup dengan Escape dan setelah memilih anchor.
-   Jaga jarak antar elemen dan hindari teks terlalu kecil.

### Tablet

-   Gunakan dua kolom bila konten memungkinkan.
-   Pertahankan ruang kosong, tetapi hindari section terlalu tinggi
    tanpa alasan.

### Desktop

-   Manfaatkan grid asimetris, visual hero besar, dan scroll reveal.
-   Pastikan konten tetap nyaman pada layar ultrawide dengan max-width.

## 12. Aksesibilitas Visual

-   Teks utama dan tombol harus memiliki kontras yang memadai.
-   Abu-abu redup hanya untuk metadata yang tidak kritis.
-   Jangan menyampaikan status hanya dengan warna.
-   Semua animasi dekoratif harus bisa dilewati.
-   Gunakan semantic heading, landmark, dan alt text.
-   Focus state tidak boleh dihapus.
-   Uji dengan keyboard dan reduced-motion.

## 13. Design Tokens Awal

``` css
:root {
  color-scheme: dark;

  --color-bg: #080808;
  --color-bg-pure: #000000;
  --color-surface: #111111;
  --color-surface-raised: #181818;
  --color-text: #ffffff;
  --color-text-muted: #bdbdbd;
  --color-text-subtle: #777777;
  --color-border: rgba(255, 255, 255, 0.12);
  --color-border-strong: rgba(255, 255, 255, 0.22);

  --radius-sm: 0.625rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
  --radius-xl: 2rem;

  --shadow-card:
    0 18px 50px rgba(0, 0, 0, 0.32),
    0 2px 10px rgba(0, 0, 0, 0.22);

  --shadow-floating:
    0 28px 80px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(255, 255, 255, 0.07);

  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-fast: 180ms;
  --duration-base: 320ms;
  --duration-slow: 700ms;
}
```

## 14. Kriteria Visual Siap

-   [ ] B&W konsisten tanpa aksen warna yang tidak disetujui.
-   [ ] Bayangan dan glow menambah kedalaman, bukan mengaburkan
    hierarki.
-   [ ] Headline hero langsung menjelaskan positioning.
-   [ ] Setiap section memiliki fokus visual yang jelas.
-   [ ] Motion tidak menghambat pembacaan atau navigasi.
-   [ ] Layout bekerja di mobile, tablet, dan desktop.
-   [ ] Reduced motion tersedia.
-   [ ] Tidak ada data portofolio, testimoni, logo, atau statistik
    palsu.
-   [ ] Komponen UI memiliki hover, focus, active, dan disabled state
    yang sesuai.
-   [ ] Visual 3D memiliki fallback yang lebih ringan.
