'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Camera, Clock3, MapPin, Menu, Search, Star, X } from 'lucide-react'

const images = {
  logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4ii8Qkj42MaCIBeEhmypGz8GRKmBOY.png',
  hero: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MFh0KDQqrIUiYuGDmZPmkbGdsLO45f.png',
  napolitano: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2YiHjA7he7tbLQQ0KNbtfkkcA0PC81.png',
  jalapeno: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wYvj9qcXZWO5MGqZ39rTIz0RJrJ8b6.png',
  cheesecake: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iaUddVHqIGo0hqAisnCi3M9QdwDikx.png',
  vibe: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mlKBjWzc4qFJzB3y5u2yp1TSpAOAPz.png',
  space: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YURbboE5NOjwGOAIT26CVhbqNttNIM.png',
}

const categories = ['Churros de autor', 'Tostadas & salados', 'Postres & tartas', 'Bebidas & cafetería']
const menu = [
  { category: categories[0], name: 'Churro clásico Crunchy', description: 'Azúcar, canela y dip de manjar o chocolate belga.', price: '$3.50', image: images.napolitano },
  { category: categories[0], name: 'Churro relleno especial', description: 'Relleno abundante de manjar, Nutella o crema pastelera.', price: '$4.50', image: images.jalapeno },
  { category: categories[0], name: 'Box Crunchy para compartir', description: 'Mini churros, toppings y salsas artesanales.', price: '$12.00', image: images.hero },
  { category: categories[1], name: 'Churro Napolitano', description: 'Tomate, nueces, albahaca, orégano y mozzarella.', price: '$6.90', image: images.napolitano },
  { category: categories[1], name: 'Churro Jalapeño', description: 'Queso crema, tomates confitados, jalapeños y orégano.', price: '$6.90', image: images.jalapeno },
  { category: categories[2], name: 'Cheesecake de frutos rojos', description: 'Tarta artesanal con mermelada casera y almendras.', price: '$5.50', image: images.cheesecake },
  { category: categories[2], name: 'Cheesecake Mango Coco', description: 'Cremoso, tropical y terminado con mango fresco.', price: '$5.50', image: images.cheesecake },
  { category: categories[3], name: 'Sodas artesanales', description: 'Bebidas refrescantes, frías y llenas de color.', price: '$3.25', image: images.vibe },
  { category: categories[3], name: 'Café de especialidad', description: 'Espresso, cappuccino, latte frío o caliente.', price: '$2.80', image: images.vibe },
]

export default function Page() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const filtered = useMemo(() => menu.filter((item) => item.category === activeCategory && `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase())), [activeCategory, query])

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff9f5] text-[#2b1810]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#ead8d0]/70 bg-[#fff9f5]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#inicio" className="flex items-center gap-2" aria-label="Crunchy inicio">
            <img src={images.logo} alt="Crunchy" className="h-11 w-11 rounded-full object-cover" />
            <span className="font-serif text-2xl font-black tracking-tight">crunchy<span className="text-[#e891a6]">.</span></span>
          </a>
          <nav className="hidden items-center gap-6 text-xs font-bold uppercase tracking-[0.12em] text-[#6e5147] lg:flex">
            <a href="#menu" className="transition-colors hover:text-[#d86583]">Menú</a><a href="#visitanos" className="transition-colors hover:text-[#d86583]">Visítanos</a><a href="#horarios" className="transition-colors hover:text-[#d86583]">Horarios</a>
          </nav>
          <a href="https://wa.me/593999999999" className="hidden rounded-full bg-[#3d231a] px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5 sm:block">Pedir por WhatsApp</a>
          <button className="rounded-full bg-[#f4a2b8] p-2 lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}>{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {mobileOpen && <nav className="flex flex-col gap-4 border-t border-[#ead8d0] px-5 py-5 text-sm font-bold uppercase tracking-wider lg:hidden"><a href="#menu" onClick={() => setMobileOpen(false)}>Menú</a><a href="#visitanos" onClick={() => setMobileOpen(false)}>Visítanos</a><a href="#horarios" onClick={() => setMobileOpen(false)}>Horarios</a></nav>}
      </header>

      <section id="inicio" className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-32 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:pb-24 lg:pt-40">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#efb5c2] bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#a9586e]"><Star size={13} fill="currentColor" /> Casa Solano · Cuenca</div>
          <h1 className="max-w-3xl font-serif text-[4rem] font-black leading-[.88] tracking-[-.055em] sm:text-7xl lg:text-[6.8rem]">Grab it.<br /><span className="text-[#e891a6]">Bite it.</span><br />Love it.</h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-[#765b51] sm:text-lg">Churros de autor, rellenos gourmet y café para hacer de cualquier antojo un plan inolvidable.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#menu" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#3d231a] px-6 py-4 text-sm font-black uppercase tracking-wide text-white transition-transform hover:-translate-y-1">Explorar menú <ArrowRight size={17} /></a><a href="https://wa.me/593999999999" className="inline-flex items-center justify-center rounded-full border-2 border-[#3d231a] px-6 py-4 text-sm font-black uppercase tracking-wide transition-colors hover:bg-[#f4a2b8]">Pedir por WhatsApp</a></div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-[#e4cfc6] pt-6 text-xs font-bold leading-4 text-[#765b51]"><div><span className="mb-2 block text-2xl text-[#e891a6]">01</span>Recién hechos</div><div><span className="mb-2 block text-2xl text-[#e891a6]">02</span>Dulce & salado</div><div><span className="mb-2 block text-2xl text-[#e891a6]">03</span>Muy instagrameable</div></div>
        </div>
        <div className="relative mx-auto w-full max-w-[530px]">
          <div className="absolute -right-4 -top-4 z-20 rounded-full bg-[#f4a2b8] px-5 py-4 text-center font-serif text-lg font-black leading-4 text-[#3d231a] shadow-lg shadow-[#d9859e]/30 sm:-right-8 sm:top-8">hecho<br />con amor</div>
          <div className="relative aspect-[.88] rotate-2 overflow-hidden rounded-[42%_42%_18%_18%] bg-[#e7cdc3] shadow-[18px_22px_0_#f4a2b8]"><img src={images.hero} alt="Selección de churros Crunchy servidos en Casa Solano" className="h-full w-full object-cover" /></div>
          <div className="absolute -bottom-7 -left-5 -rotate-6 rounded-full bg-white px-5 py-3 font-serif text-sm font-black shadow-lg sm:-left-10">crujiente por fuera ✦</div>
        </div>
      </section>

      <section id="menu" className="bg-[#4a2c22] px-5 py-20 text-white lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-[#f4a2b8]">Para cada antojo</p><h2 className="font-serif text-5xl font-black leading-none sm:text-6xl">Menú <span className="text-[#f4a2b8]">Crunchy</span></h2></div><div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3"><Search size={16} className="text-[#f4a2b8]" /><input aria-label="Buscar en el menú" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar..." className="w-28 bg-transparent text-sm outline-none placeholder:text-white/50 sm:w-40" /></div></div><div className="mb-10 flex gap-2 overflow-x-auto pb-2">{categories.map((category, index) => <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full px-4 py-3 text-xs font-black uppercase tracking-wider transition-colors ${activeCategory === category ? 'bg-[#f4a2b8] text-[#3d231a]' : 'border border-white/20 text-white/70 hover:border-[#f4a2b8]'}`}><span className="mr-2 opacity-60">0{index + 1}</span>{category}</button>)}</div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((item) => <article key={item.name} className="group overflow-hidden rounded-[26px] bg-[#fff9f5] text-[#2b1810]"><div className="relative aspect-[1.15] overflow-hidden"><img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute right-4 top-4 rounded-full bg-white px-3 py-2 text-sm font-black">{item.price}</span></div><div className="p-5"><h3 className="font-serif text-2xl font-black">{item.name}</h3><p className="mt-2 text-sm leading-5 text-[#80655b]">{item.description}</p><a href="https://wa.me/593999999999" className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#c65d7a]">Pedir este <ArrowRight size={14} /></a></div></article>)}{filtered.length === 0 && <p className="col-span-full rounded-3xl bg-white/10 p-10 text-center text-white/70">No encontramos ese antojo. Prueba otra búsqueda.</p>}</div></div></section>

      <section id="visitanos" className="px-5 py-20 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center"><div><p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-[#c65d7a]">Ven a conocernos</p><h2 className="font-serif text-5xl font-black leading-[.9] sm:text-6xl">Un lugar para<br /><span className="text-[#e891a6]">quedarte.</span></h2><p className="mt-7 max-w-md leading-7 text-[#765b51]">Diseñamos cada rincón para que tu visita se sienta como un pequeño plan especial. Trae a tu persona favorita y deja espacio para el postre.</p><a href="#horarios" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#f4a2b8] px-5 py-3 text-xs font-black uppercase tracking-wider">Cómo llegar <ArrowRight size={15} /></a></div><div className="grid grid-cols-2 gap-4 sm:gap-6"><img src={images.space} alt="Interior rosado e iluminado de Crunchy" className="h-64 w-full rounded-[30px] object-cover sm:h-80" /><img src={images.vibe} alt="Churro y bebida Crunchy en mesa" className="mt-10 h-64 w-full rounded-[30px] object-cover sm:h-80" /></div></div></div></section>

      <section id="horarios" className="px-5 pb-20 lg:px-8 lg:pb-28"><div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2"><div className="rounded-[30px] bg-[#f4a2b8] p-7 sm:p-10"><MapPin className="mb-8" size={28} /><h3 className="font-serif text-4xl font-black">Casa Solano</h3><p className="mt-3 text-[#5c3835]">Cuenca, Ecuador</p><a href="https://maps.google.com/?q=Casa+Solano+Cuenca" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#3d231a] px-5 py-3 text-xs font-black uppercase tracking-wider text-white">Abrir en Maps <ArrowRight size={14} /></a></div><div className="rounded-[30px] bg-white p-7 shadow-[0_10px_35px_rgba(92,47,35,.08)] sm:p-10"><div className="mb-7 flex items-center gap-3"><Clock3 className="text-[#d86583]" size={25} /><h3 className="font-serif text-3xl font-black">Horarios</h3></div><div className="space-y-4 text-sm"><div className="flex justify-between border-b border-[#ead8d0] pb-3"><span>Miércoles a Jueves</span><strong>11:00 — 20:00</strong></div><div className="flex justify-between border-b border-[#ead8d0] pb-3"><span>Viernes a Sábado</span><strong>10:00 — 21:00</strong></div><div className="flex justify-between"><span>Domingo</span><strong>10:00 — 18:00</strong></div></div></div></div></section>

      <footer className="bg-[#3d231a] px-5 py-10 text-white lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><div className="font-serif text-3xl font-black">crunchy<span className="text-[#f4a2b8]">.</span></div><p className="mt-1 text-xs uppercase tracking-[.2em] text-[#eab2bd]">Grab it · Bite it · Love it</p></div><a href="https://instagram.com/crunchychurros.ec" className="flex items-center gap-2 text-sm font-bold"><Camera size={18} /> @crunchychurros.ec</a><p className="text-xs text-white/50">© 2026 Crunchy Churros de Autor</p></div></footer>
    </main>
  )
}
