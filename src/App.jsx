import { useEffect, useMemo, useRef, useState } from 'react'

const GROOM = 'Muh Lutfi Sanusi'
const BRIDE = 'Adriyanti Gaffar, S.Pd'
const EVENT = new Date('2026-11-14T20:00:00+08:00') // WITA
const MAPS = 'https://www.google.com/maps/search/?api=1&query=SMP+1+Patampanua+Leppangeng+Utara+Pinrang'
const FOTO = ['/img/foto1.jpg', '/img/foto2.jpg', '/img/foto3.jpg', '/img/foto4.jpg']

function Reveal({ children, d = 0, type = '', className = '' }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.15 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} style={{ '--d': `${d}s` }} className={`rv ${type} ${on ? 'in' : ''} ${className}`}>{children}</div>
}

function useCountdown() {
  const calc = () => {
    const diff = Math.max(0, EVENT - new Date())
    return { Hari: Math.floor(diff / 864e5), Jam: Math.floor(diff / 36e5) % 24, Menit: Math.floor(diff / 6e4) % 60, Detik: Math.floor(diff / 1e3) % 60 }
  }
  const [t, setT] = useState(calc)
  useEffect(() => { const i = setInterval(() => setT(calc()), 1000); return () => clearInterval(i) }, [])
  return t
}

const Ornament = ({ className = '' }) => (
  <svg viewBox="0 0 200 20" className={`mx-auto h-4 w-40 text-gold ${className}`} fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M0 10 H80 M120 10 H200" /><path d="M100 1 L109 10 L100 19 L91 10Z" fill="currentColor" /><circle cx="84" cy="10" r="2" /><circle cx="116" cy="10" r="2" />
  </svg>
)

function Cover({ guest }) {
  const petals = useMemo(() => Array.from({ length: 14 }, (_, i) => ({ l: (i * 71) % 100, d: 9 + (i % 5) * 2, de: 7 + (i % 7) })), [])
  return (
    <section className="tapestry relative h-[100dvh] min-h-[560px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <img src={FOTO[3]} alt="Muh Lutfi Sanusi & Adriyanti" className="h-full w-full object-cover object-[50%_20%]" />
          {/* Gradasi dipertebal di tengah agar teks elegan dan terbaca, wajah tetap terang */}
          <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/30 via-maroon-dark/70 to-maroon-dark/95" />
        </div>
      </div>
      <div className="absolute left-0 top-0 h-full w-[22%] max-w-[120px]" style={{ background: 'repeating-linear-gradient(90deg,#4a0a16 0 6px,#7a1426 6px 14px)', clipPath: 'polygon(0 0,100% 0,45% 30%,0 62%)', filter: 'drop-shadow(2px 4px 4px rgba(0,0,0,.4))' }} />
      <div className="absolute right-0 top-0 h-full w-[22%] max-w-[120px]" style={{ background: 'repeating-linear-gradient(90deg,#7a1426 0 6px,#4a0a16 6px 14px)', clipPath: 'polygon(0 0,100% 0,100% 62%,55% 30%)', filter: 'drop-shadow(-2px 4px 4px rgba(0,0,0,.4))' }} />
      <div className="tapestry absolute left-1/2 top-0 h-[9%] min-h-[48px] w-[58%] max-w-[280px] border-b-2 border-gold" style={{ clipPath: 'polygon(0 0,100% 0,50% 100%)' }}>
        <div className="absolute left-1/2 top-[18%] h-5 w-5 -translate-x-1/2 rotate-45 border border-gold-light bg-gold" />
      </div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {petals.map((p, i) => <span key={i} className="petal" style={{ left: `${p.l}%`, animationDuration: `${p.d}s`, animationDelay: `${p.de}s` }} />)}
      </div>

      {/* Teks Pengantin Diposisikan Tepat di Tengah Layar */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-cream drop-shadow-lg mt-24">
        <p className="font-serif2 text-[11px] sm:text-[13px] font-semibold uppercase tracking-[.4em] text-gold-light">The Wedding Of</p>
        
        <h1 className="mt-2 w-full font-script leading-[1.1] text-cream drop-shadow-md">
          <span className="block text-[clamp(42px,14vw,64px)]">Muh Lutfi Sanusi</span>
          <span className="block text-[clamp(30px,9vw,42px)] text-gold my-1">&amp;</span>
          <span className="block text-[clamp(42px,14vw,64px)]">Adriyanti</span>
        </h1>
        
        <div className="mt-6 flex items-center justify-center gap-3 w-full max-w-[280px]">
          <div className="h-px bg-gold/50 flex-1"></div>
          <p className="font-serif2 text-[12px] sm:text-sm font-semibold tracking-[.25em] text-gold-light whitespace-nowrap">14 NOVEMBER 2026</p>
          <div className="h-px bg-gold/50 flex-1"></div>
        </div>
        
        <div className="mt-10 text-[13px] text-cream/90 bg-maroon-dark/40 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gold/20">
          <p className="text-[11px] uppercase tracking-wider mb-1">Kepada Yth.</p>
          <p className="font-head text-lg font-semibold text-cream">{guest}</p>
        </div>
        
        <p className="bob mt-8 text-[11px] font-medium tracking-widest text-gold-light/70">GESER KE BAWAH ↓</p>
      </div>
    </section>
  )
}

const Backdrop = ({ o = 0.18 }) => (
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
    <img src="/img/orari.png" alt="" style={{ opacity: o }} className="h-[88%] max-h-[700px] w-auto select-none" />
  </div>
)

function Frame({ src, className = '' }) {
  return (
    <div className={`mx-auto overflow-hidden rounded-t-[999px] border-[3px] border-gold-light/80 p-1.5 shadow-2xl ${className}`}>
      <img src={src} alt="Foto pasangan" loading="lazy" className="h-full w-full rounded-t-[999px] object-cover" />
    </div>
  )
}

export default function App() {
  const t = useCountdown()
  const guest = useMemo(() => new URLSearchParams(location.search).get('to') || 'Tamu Undangan', [])
  const nextRef = useRef(null)

  return (
    <main className="relative mx-auto w-full max-w-[520px] overflow-hidden bg-maroon text-cream shadow-2xl">

      <div className="relative z-10">
        <Cover guest={guest} />

        {/* FOTO */}
        <section ref={nextRef} className="relative isolate bg-maroon px-6 pb-14 pt-16 text-center">
          <Backdrop />
          <Reveal type="rv-z"><Frame src={FOTO[0]} className="h-[min(480px,115vw)] w-[min(300px,78vw)]" /></Reveal>
          <Reveal d={0.2}><p className="mt-8 font-script text-4xl text-gold-light">Bride &amp; Groom</p><Ornament className="mt-2" /></Reveal>
        </section>

        {/* PEMBUKAAN + MEMPELAI */}
        <section className="relative isolate bg-gradient-to-b from-maroon to-maroon-dark px-6 py-14 text-center">
          <Backdrop />
          <Reveal><p dir="rtl" className="font-serif2 text-2xl text-gold-light">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p></Reveal>
          <Reveal d={0.15}>
            <p className="mx-auto mt-5 max-w-sm text-[17px] leading-relaxed text-cream/90">
              Assalamu'alaikum Warahmatullahi Wabarakatuh. Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.
            </p>
          </Reveal>
          <Reveal d={0.1}><p className="mx-auto mt-5 max-w-sm text-sm italic text-gold-light/90">“Di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan pasangan untukmu dari jenismu sendiri agar kamu merasa tenteram kepadanya.” (QS. Ar-Rum: 21)</p></Reveal>

          <Reveal type="rv-l" className="mt-12">
            <div className="mx-auto w-full max-w-[320px] rounded-[2rem] border border-gold/60 bg-maroon-dark/60 px-5 py-8 shadow-xl">
              <p className="font-serif2 text-xs uppercase tracking-[.3em] text-gold">Mempelai Pria</p>
              <h2 className="mt-2 font-head text-[clamp(22px,7vw,28px)] leading-tight">{GROOM}</h2>
            </div>
          </Reveal>
          <Reveal><p className="my-5 font-script text-5xl text-gold">dan</p></Reveal>
          <Reveal type="rv-r">
            <div className="mx-auto w-full max-w-[320px] rounded-[2rem] border border-gold/60 bg-maroon-dark/60 px-5 py-8 shadow-xl">
              <p className="font-serif2 text-xs uppercase tracking-[.3em] text-gold">Mempelai Wanita</p>
              <h2 className="mt-2 font-head text-[clamp(22px,7vw,28px)] leading-tight">{BRIDE}</h2>
            </div>
          </Reveal>
        </section>

        {/* SAVE THE DATE */}
        <section className="relative overflow-hidden px-5 py-20 text-center">
          <img src={FOTO[1]} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
          <div className="absolute inset-0 bg-maroon-dark/75" />
          <div className="relative">
            <Reveal><h3 className="font-script text-6xl text-gold-light">Save The Date</h3></Reveal>
            <Reveal d={0.15}>
              <div className="mx-auto mt-6 grid max-w-[340px] grid-cols-4 gap-2">
                {Object.entries(t).map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-gradient-to-b from-gold to-[#b8862e] py-3 shadow-lg">
                    <div className="font-head text-2xl font-semibold text-maroon-dark tabular-nums">{String(v).padStart(2, '0')}</div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-maroon-dark/80">{k}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal d={0.25}><p className="mx-auto mt-8 max-w-xs text-[17px] leading-relaxed text-cream/95">Dan Kami bersyukur, dipertemukan Allah di waktu terbaik. Kini kami menanti hari istimewa kami.</p></Reveal>
          </div>
        </section>

        {/* ACARA */}
        <section className="relative isolate bg-cream px-6 py-16 text-center text-maroon">
          <Backdrop o={0.14} />
          <Reveal><p className="font-script text-5xl">Waktu &amp; Tempat</p><Ornament className="mt-2" /></Reveal>
          <Reveal d={0.1} type="rv-z">
            <div className="mx-auto mt-8 max-w-[340px] rounded-[2rem] border-2 border-gold bg-white/60 px-6 py-9 shadow-xl">
              <p className="font-serif2 text-xs font-semibold uppercase tracking-[.3em] text-gold">Resepsi Pernikahan</p>
              <p className="mt-3 font-head text-2xl">Sabtu</p>
              <p className="font-head text-5xl leading-none">14</p>
              <p className="font-head text-xl">November 2026</p>
              <div className="my-5 h-px bg-gold/50" />
              <p className="font-serif2 text-lg font-semibold">Pukul 20.00 WITA – Selesai</p>
              <p className="text-sm italic text-maroon/70">(Malam Minggu)</p>
              <div className="my-5 h-px bg-gold/50" />
              <p className="font-serif2 text-lg font-semibold">Kediaman Mempelai</p>
              <p className="mt-1 text-[17px] leading-snug">Depan SMP 1 Patampanua<br />Leppangeng Utara, Pinrang</p>
              <a href={MAPS} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full bg-maroon px-6 py-2.5 font-serif2 text-sm font-semibold tracking-wider text-gold-light active:scale-95">📍 Lihat Lokasi</a>
            </div>
          </Reveal>
        </section>

        {/* GALERI */}
        <section className="relative isolate bg-maroon-dark px-5 py-16 text-center">
          <Backdrop o={0.15} />
          <Reveal><p className="font-script text-5xl text-gold-light">Galeri</p><Ornament className="mt-2" /></Reveal>
          <div className="mx-auto mt-8 grid max-w-[400px] grid-cols-2 gap-3">
            {FOTO.map((f, i) => (
              <Reveal key={f} d={i * 0.12} type="rv-z" className={i === 0 || i === 3 ? 'col-span-2' : ''}>
                <img src={f} alt={`Galeri ${i + 1}`} loading="lazy" className={`w-full rounded-2xl border-2 border-gold/60 object-cover shadow-xl ${i === 0 || i === 3 ? 'h-[380px] object-top' : 'h-[260px]'}`} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* PENUTUP + MENGUNDANG */}
        <section className="tapestry relative px-6 py-16 text-center">
          <div className="absolute inset-0 bg-maroon/85" />
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden"><img src="/img/orari.png" alt="" style={{ opacity: 0.18 }} className="h-[80%] max-h-[640px] w-auto" /></div>
          <div className="relative">
            <Reveal><p className="mx-auto max-w-sm text-[17px] leading-relaxed">Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kedua mempelai. Terima kasih atas perhatian dan kehadirannya.</p></Reveal>
            <Reveal d={0.1}><p className="mt-6 font-serif2 italic text-gold-light">Wassalamu'alaikum Warahmatullahi Wabarakatuh</p></Reveal>
            <Reveal d={0.15}><Ornament className="my-7" /><p className="font-serif2 text-xs uppercase tracking-[.3em] text-gold">Hormat Kami yang Mengundang</p></Reveal>
            <Reveal d={0.2}>
              <div className="mx-auto mt-5 max-w-[320px] space-y-5">
                <div><p className="font-head text-lg">Sanusi</p><p className="text-sm text-gold-light">YC8AXW · Wawan Op</p></div>
                <div><p className="font-head text-lg leading-snug">Drs. A. Bakhtiar Tombong, SH, MSi</p><p className="text-sm text-gold-light">YB8ESA</p><p className="text-sm">Ketua ORARI Lokal Pinrang</p></div>
              </div>
            </Reveal>
            <Reveal d={0.3}><p className="mt-12 font-script text-4xl text-gold-light">{GROOM.split(' ').slice(0, 2).join(' ')} &amp; Adriyanti</p></Reveal>
          </div>
        </section>
      </div>
    </main>
  )
}
