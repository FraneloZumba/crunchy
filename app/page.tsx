'use client'

import { useMemo, useState, useEffect } from 'react' // Añadimos useEffect
import { ArrowRight, Camera, Clock3, MapPin, Menu, Search, Star, X } from 'lucide-react'
import Image from 'next/image'

// Nota Fran: Añadí hero1, hero2 y hero3 para el carrusel
const images = {
  logo: '/logo.png',
  texturaNav: '/textura1.png',
  hero1: '/hero1.jpg', 
  hero2: '/hero2.jpg', 
  hero3: '/hero3.jpg', 
  napolitano: '/napolitano.jpg',
  jalapeno: '/jalapeno.jpg',
  cheesecake: '/cheesecake.jpg',
  vibe: '/vibe.jpg',
  space: '/space.jpg',
  mascota: '/mascota.png',
}

const heroCarousel = [images.hero1, images.hero2, images.hero3] // Array del carrusel

const categories = ['Churros de autor', 'Tostadas & salados', 'Postres & tartas', 'Bebidas & cafetería']

const menu = [
  { category: categories[0], name: 'Churro clásico Crunchy', description: 'Azúcar, canela y dip de manjar o chocolate belga.', price: '$3.50', image: images.napolitano },
  { category: categories[0], name: 'Churro relleno especial', description: 'Relleno abundante de manjar, Nutella o crema pastelera.', price: '$4.50', image: images.jalapeno },
  { category: categories[0], name: 'Box Crunchy para compartir', description: 'Mini churros, toppings y salsas artesanales.', price: '$12.00', image: images.hero1 },
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
  
  // Estado para controlar qué imagen del hero se muestra
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)

  // Efecto para rotar las imágenes automáticamente cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroCarousel.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const filtered = useMemo(() => 
    menu.filter((item) => 
      item.category === activeCategory && 
      `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase())
    ), 
  [activeCategory, query])

  return (
    <main className="bg-[#ede8e2] min-h-screen overflow-hidden text-[#44271a]">
      {/* NAVEGACIÓN CON TEXTURA CORREGIDA */}
      <header 
        className="top-0 z-50 fixed inset-x-0 border-[#44271a]/20 border-b"
        style={{ 
          backgroundImage: `url(${images.texturaNav})`,
          backgroundRepeat: 'repeat', /* CLAVE: Repetir en lugar de cover */
          backgroundSize: 'auto' /* Mantiene el tamaño original de tu textura1.png */
        }}
      >
        {/* Capa semi-transparente para legibilidad si es necesario */}
        <div className="absolute inset-0 bg-[#44271a]/40 backdrop-blur-[1px]"></div> 
        
        <div className="relative flex justify-between items-center mx-auto px-5 lg:px-8 py-4 max-w-7xl">
          {/* ... resto del contenido del nav se mantiene igual ... */}
          <a href="#inicio" className="flex items-center gap-2" aria-label="Crunchy inicio">
            <div className="relative bg-white border-[#ede8e2] border-2 rounded-full w-11 h-11 overflow-hidden">
              <Image src={images.logo} alt="Crunchy" fill className="object-cover" />
            </div>
            <span className="font-serif font-black text-[#ede8e2] text-2xl tracking-tight">
              crunchy
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-6 font-bold text-[#ede8e2] text-xs uppercase tracking-[0.12em]">
            <a href="#menu" className="hover:text-[#ed9aac] transition-colors">Menú</a>
            <a href="#visitanos" className="hover:text-[#ed9aac] transition-colors">Visítanos</a>
            <a href="#horarios" className="hover:text-[#ed9aac] transition-colors">Horarios</a>
          </nav>
          <a href="https://wa.me/593999999999" className="hidden sm:block bg-[#3a5a30] hover:bg-[#bae0e3] px-5 py-3 rounded-full font-black text-[#ede8e2] hover:text-[#44271a] text-xs uppercase tracking-wider transition-colors">
            Pedir por WhatsApp
          </a>
          <button className="lg:hidden bg-[#ed9aac] p-2 rounded-full text-[#44271a]" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      {/* El fondo marrón ocupa todo el ancho, como en la composición de referencia. */}
      <section id="inicio" className="relative bg-[#44271a] px-5 lg:px-8 pt-28 lg:pt-20 pb-4 lg:pb-2">
        <div className="relative items-center gap-8 grid lg:grid-cols-[1.02fr_.98fr] mx-auto px-6 lg:px-12 py-2 lg:py-1 max-w-7xl">
          
          <div className="z-10 relative">
            <div className="inline-flex items-center gap-2 bg-[#ede8e2] mb-4 px-4 py-2 rounded-full font-black text-[#44271a] text-[11px] uppercase tracking-[0.14em]">
              <Star size={13} fill="#ed9aac" className="text-[#ed9aac]" /> Casa Solano · Cuenca
            </div>
            
            <h1 className="max-w-3xl font-serif font-black text-[3.25rem] lg:text-[5rem] sm:text-6xl leading-[.88] tracking-[0.025em]">
              <span className="block text-[#ed9aac]">grab it</span>
              <span className="block text-[#bae0e3]">bite it</span>
              <span className="block text-[#ed9aac]">love it</span>
            </h1>
            
            <p className="mt-5 max-w-lg text-[#ede8e2]/90 text-sm sm:text-base leading-6">
              Churros de autor, rellenos gourmet y café para hacer de cualquier antojo un plan inolvidable.
            </p>
            
            <div className="flex sm:flex-row flex-col gap-3 mt-6">
              <a href="#menu" className="inline-flex justify-center items-center gap-3 bg-[#7a2e4a] hover:bg-[#ed9aac] px-5 py-3 rounded-full font-black text-[#ede8e2] hover:text-[#44271a] text-xs uppercase tracking-wide transition-colors">
                Explorar menú <ArrowRight size={17} />
              </a>
              <a href="https://wa.me/593999999999" className="inline-flex justify-center items-center bg-[#3a5a30] hover:bg-[#bae0e3] px-5 py-3 rounded-full font-black text-[#ede8e2] hover:text-[#44271a] text-xs uppercase tracking-wide transition-colors">
                Pedir por WhatsApp
              </a>
            </div>
            
            <div className="gap-4 grid grid-cols-3 mt-5 pt-3 border-[#ede8e2]/20 border-t max-w-xl font-bold text-[#ede8e2]/80 text-xs leading-4">
              <div><span className="block mb-2 font-serif text-[#ed9aac] text-2xl">01</span>Recién hechos</div>
              <div><span className="block mb-2 font-serif text-[#bae0e3] text-2xl">02</span>Dulce & salado</div>
              <div><span className="block mb-2 font-serif text-[#ed9aac] text-2xl">03</span>Muy instagrameable</div>
            </div>
          </div>

          {/* COMPOSICIÓN IMAGEN HERO - CARRUSEL */}
          <div className="relative mx-auto w-full max-w-[360px]">
            <div className="-top-4 sm:top-8 -right-4 sm:-right-8 z-20 absolute bg-[#bae0e3] shadow-black/20 shadow-lg px-5 py-4 rounded-full font-serif font-black text-[#44271a] text-lg text-center leading-4">
              hecho<br />con amor
            </div>
            
            <div className="relative bg-[#ede8e2] shadow-[18px_22px_0_#ed9aac] rounded-[42%_42%_18%_18%] aspect-[.88] overflow-hidden rotate-2">
              {heroCarousel.map((img, index) => (
                <Image 
                  key={index}
                  src={img} 
                  alt={`Crunchy Destacado ${index + 1}`} 
                  fill 
                  className={`object-cover transition-opacity duration-1000 ease-in-out ${
                    index === currentHeroIndex ? 'opacity-100' : 'opacity-0'
                  }`} 
                  priority={index === 0} 
                />
              ))}
            </div>

            <div className="-bottom-7 -left-5 sm:-left-10 absolute bg-[#ede8e2] shadow-lg px-5 py-3 border-[#44271a] border-2 rounded-full font-serif font-black text-[#44271a] text-sm -rotate-6">
              crujiente por fuera ✦
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE ANIMADO (DIVISOR) */}
      <div className="bg-[#ed9aac] py-3 border-[#44271a] border-y-2 w-full overflow-hidden text-[#44271a]">
        <div className="flex items-center font-serif font-black text-2xl lowercase tracking-widest animate-marquee">
          {/* Se repite para crear el efecto infinito */}
          <span className="mx-4 whitespace-nowrap">grab it . bite it . love it ✦</span>
          <span className="mx-4 whitespace-nowrap">grab it . bite it . love it ✦</span>
          <span className="mx-4 whitespace-nowrap">grab it . bite it . love it ✦</span>
          <span className="mx-4 whitespace-nowrap">grab it . bite it . love it ✦</span>
          <span className="mx-4 whitespace-nowrap">grab it . bite it . love it ✦</span>
          <span className="mx-4 whitespace-nowrap">grab it . bite it . love it ✦</span>
          <span className="mx-4 whitespace-nowrap">grab it . bite it . love it ✦</span>
          <span className="mx-4 whitespace-nowrap">grab it . bite it . love it ✦</span>
          <span className="mx-4 whitespace-nowrap">grab it . bite it . love it ✦</span>
          <span className="mx-4 whitespace-nowrap">grab it . bite it . love it ✦</span>
          <span className="mx-4 whitespace-nowrap">grab it . bite it . love it ✦</span>
          <span className="mx-4 whitespace-nowrap">grab it . bite it . love it ✦</span>
        </div>
      </div>

      {/* SECCIÓN MENÚ */}
      <section id="menu" className="bg-[#44271a] px-5 lg:px-8 py-20 lg:py-28 text-[#ede8e2]">
        <div className="mx-auto max-w-7xl">
          <div className="flex sm:flex-row flex-col justify-between sm:items-end gap-6 mb-10">
            <div>
              <p className="mb-3 font-black text-[#bae0e3] text-xs uppercase tracking-[.2em]">Para cada antojo</p>
              <h2 className="font-serif font-black text-5xl sm:text-6xl leading-none tracking-[0.025em]">Menú <span className="text-[#ed9aac]">Crunchy</span></h2>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-3 border border-[#ede8e2]/20 focus-within:border-[#ed9aac] rounded-full">
              <Search size={16} className="text-[#ed9aac]" />
              <input 
                aria-label="Buscar en el menú" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Buscar..." 
                className="bg-transparent outline-none w-28 sm:w-40 text-[#ede8e2] placeholder:text-[#ede8e2]/50 text-sm" 
              />
            </div>
          </div>

          <div className="flex gap-2 mb-10 pb-2 overflow-x-auto scrollbar-hide">
            {categories.map((category, index) => (
              <button 
                key={category} 
                onClick={() => setActiveCategory(category)} 
                className={`whitespace-nowrap rounded-full px-4 py-3 text-xs font-black uppercase tracking-wider transition-colors ${
                  activeCategory === category 
                    ? 'bg-[#ed9aac] text-[#44271a]' 
                    : 'border border-[#ede8e2]/20 text-[#ede8e2]/70 hover:border-[#bae0e3] hover:text-[#bae0e3]'
                }`}
              >
                <span className="opacity-60 mr-2">0{index + 1}</span>{category}
              </button>
            ))}
          </div>

          <div className="gap-5 grid md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <article key={item.name} className="group bg-[#ede8e2] rounded-[26px] overflow-hidden text-[#44271a]">
                <div className="relative aspect-[1.15] overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="top-4 right-4 absolute bg-[#bae0e3] px-3 py-2 rounded-full font-black text-[#44271a] text-sm">
                    {item.price}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-black text-2xl">{item.name}</h3>
                  <p className="mt-2 text-[#44271a]/80 text-sm leading-5">{item.description}</p>
                  <a href="https://wa.me/593999999999" className="inline-flex items-center gap-2 mt-5 font-black text-[#ed9aac] hover:text-[#44271a] text-xs uppercase tracking-wider transition-colors">
                    Pedir este <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full p-10 border border-[#ede8e2]/10 rounded-3xl text-[#ede8e2]/70 text-center">
                No encontramos ese antojo. Prueba otra búsqueda.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* SECCIÓN VISÍTANOS */}
      <section id="visitanos" className="bg-[#bae0e3] px-5 lg:px-8 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="lg:items-center gap-12 grid lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="mb-3 font-black text-[#44271a] text-xs uppercase tracking-[.2em]">Ven a conocernos</p>
              <h2 className="font-serif font-black text-[#44271a] text-5xl sm:text-6xl leading-[.9] tracking-[0.025em]">
                Un lugar para<br /><span className="text-[#ed9aac]">quedarte.</span>
              </h2>
              <p className="mt-7 max-w-md text-[#44271a]/80 leading-7">
                Diseñamos cada rincón para que tu visita se sienta como un pequeño plan especial. Trae a tu persona favorita y deja espacio para el postre.
              </p>
              <a href="#horarios" className="inline-flex items-center gap-2 bg-[#44271a] hover:bg-[#ed9aac] mt-7 px-5 py-3 rounded-full font-black text-[#ede8e2] hover:text-[#44271a] text-xs uppercase tracking-wider transition-colors">
                Cómo llegar <ArrowRight size={15} />
              </a>
            </div>
            <div className="gap-4 sm:gap-6 grid grid-cols-2">
              <div className="relative border-[#44271a] border-2 rounded-[30px] w-full h-64 sm:h-80 overflow-hidden">
                <Image src={images.space} alt="Interior de Crunchy" fill className="object-cover" />
              </div>
              <div className="relative mt-10 border-[#44271a] border-2 rounded-[30px] w-full h-64 sm:h-80 overflow-hidden">
                <Image src={images.vibe} alt="Churro Crunchy" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN HORARIOS Y MAPA */}
      <section id="horarios" className="bg-[#ede8e2] px-5 lg:px-8 py-20 lg:py-28">
        <div className="gap-5 grid md:grid-cols-2 mx-auto max-w-7xl">
          <div className="bg-[#ed9aac] p-7 sm:p-10 border-[#44271a] border-2 rounded-[30px]">
            <MapPin className="mb-8 text-[#44271a]" size={28} />
            <h3 className="font-serif font-black text-[#44271a] text-4xl">Casa Solano</h3>
            <p className="mt-3 text-[#44271a]/80">Cuenca, Ecuador</p>
            <a href="https://maps.google.com/?q=Casa+Solano+Cuenca" className="inline-flex items-center gap-2 bg-[#44271a] hover:bg-[#bae0e3] mt-8 px-5 py-3 rounded-full font-black text-[#ede8e2] hover:text-[#44271a] text-xs uppercase tracking-wider transition-colors">
              Abrir en Maps <ArrowRight size={14} />
            </a>
          </div>
          <div className="bg-white shadow-[8px_8px_0_#44271a] p-7 sm:p-10 border-[#44271a] border-2 rounded-[30px]">
            <div className="flex items-center gap-3 mb-7">
              <Clock3 className="text-[#bae0e3]" size={25} />
              <h3 className="font-serif font-black text-[#44271a] text-3xl">Horarios</h3>
            </div>
            <div className="space-y-4 text-[#44271a] text-sm">
              <div className="flex justify-between pb-3 border-[#44271a]/20 border-b">
                <span>Miércoles a Jueves</span><strong>11:00 — 20:00</strong>
              </div>
              <div className="flex justify-between pb-3 border-[#44271a]/20 border-b">
                <span>Viernes a Sábado</span><strong>10:00 — 21:00</strong>
              </div>
              <div className="flex justify-between">
                <span>Domingo</span><strong>10:00 — 18:00</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CON MASCOTA */}
      <footer className="relative bg-[#44271a] px-5 lg:px-8 pt-20 pb-10 overflow-hidden text-[#ede8e2]">
        <div className="right-5 sm:right-20 lg:right-40 -bottom-10 absolute opacity-90">
           <Image src={images.mascota} alt="Mascota Crunchy" width={200} height={200} className="object-contain" />
        </div>
        
        <div className="z-10 relative flex sm:flex-row flex-col justify-between sm:items-end gap-6 mx-auto mb-6 pb-10 border-[#ede8e2]/20 border-b max-w-7xl">
          <div>
            <div className="font-serif font-black text-[#ede8e2] text-5xl">
              crunchy<span className="text-[#ed9aac]">.</span>
            </div>
            <p className="mt-2 text-[#bae0e3] text-xs uppercase tracking-[.2em]">
              Grab it · Bite it · Love it
            </p>
          </div>
          <a href="https://instagram.com/crunchychurros.ec" className="flex items-center gap-2 font-bold hover:text-[#ed9aac] text-sm transition-colors">
            <Camera size={18} /> @crunchychurros.ec
          </a>
        </div>
        
        <div className="z-10 relative mx-auto max-w-7xl text-[#ede8e2]/50 text-xs">
          © 2026 Crunchy Churros de Autor.
        </div>
      </footer>
    </main>
  )
}
