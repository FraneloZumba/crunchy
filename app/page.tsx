'use client'

import { useMemo, useState, useEffect } from 'react' // Añadimos useEffect
import { ArrowRight, Camera, Check, Clock3, MapPin, Menu, Minus, Plus, Search, Star, X } from 'lucide-react'
import Image from 'next/image'

// Nota Fran: Añadí hero1, hero2 y hero3 para el carrusel
const images = {
  logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Crunchy_Logo-28-l3vThOtZ7yTFTwUjM17dXSe7BrIwtB.png',
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
  casaSolano: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cxKbnPDLYt9LHYtTNbceB1YaHeKjJL.png',
  galeria: Array.from({ length: 10 }, (_, index) => `/galeria${index + 1}.jpg`),
}

const heroCarousel = [images.hero1, images.hero2, images.hero3]

const categories = ['Brunch', 'Churros', 'Postres', 'Salados', 'Calientes', 'Frías', 'Extras bebidas']

const formatPrice = (value: number) => `$${value.toFixed(2)}`
const parsePrice = (price: string) => Number(price.replace('$', ''))

const menu = [
  { category: categories[0], name: 'Brunch Americano', description: 'Incluye: Café americano, cappuccino o infusión. Pancakes, miel de maple, 2 huevos a elección, tocino y fruta en almíbar.', price: '$6.50', image: '/americano_brunch.jpg' },
  { category: categories[0], name: 'Brunch Crunchy', description: 'Incluye: Café americano, cappuccino o infusión. Pan integral de masa madre con pesto, queso, jamón, 2 huevos, tomate cherry, aguacate y mayonesa de jalapeño.', price: '$6.75', image: '/crunchy_brunch.jpg' },
  { category: categories[1], name: 'Churro clásico', description: 'Churro clásico de 15 cm. Elige azúcar, azúcar y canela o azúcar impalpable. Dip +$1.25.', price: '$1.50', image: '/churro_clasico.jpg' },
  { category: categories[1], name: 'Churro relleno', description: 'Churro clásico de 15 cm con relleno a elección. Topping +$0.50.', price: '$1.90', image: '/churro_relleno.jpg' },
  { category: categories[2], name: 'Cheesecake', description: 'Elige entre frutos rojos o mango-coco.', price: '$3.85', image: '/cheesecake.jpg' },
  { category: categories[2], name: 'Tiramisú de churro', description: 'La versión Crunchy de un clásico italiano.', price: '$3.85', image: '/tiramisu_de_churro.jpg' },
  { category: categories[2], name: 'Parfait de churro', description: 'Yogurt griego con fruta y churros.', price: '$3.85', image: '/parfait_de_churro.jpg' },
  { category: categories[2], name: 'Sundae de churro', description: 'Helado a elección con 2 churros y crema batida.', price: '$3.99', image: '/sundae_de_churro.jpg' },
  { category: categories[2], name: 'Sanduche de churro', description: 'Helado a elección entre espirales de churro.', price: '$4.25', image: '/sanduche_de_churro.jpg' },
  { category: categories[3], name: 'Churro jalapeño', description: 'Base de 2 churros, queso crema, tomates confitados, jalapeños y orégano. Picante muy bajo.', price: '$4.15', image: '/churro_jalapeno.jpg' },
  { category: categories[3], name: 'Churro pizza', description: 'Base de 2 churros, pasta de tomate, jamón, orégano y queso mozzarella.', price: '$3.85', image: '/churro_pizza.jpg' },
  { category: categories[3], name: 'Churro napolitano', description: 'Base de 2 churros, pasta de tomate, albahaca, orégano, nueces y queso mozzarella.', price: '$3.50', image: '/churro_napolitano.jpg' },
  { category: categories[4], name: 'Espresso', description: 'Café espresso.', price: '$2.00', image: '/espresso.jpg' },
  { category: categories[4], name: 'Espresso doble', description: 'Doble shot de espresso.', price: '$2.50', image: '/espresso_doble.jpg' },
  { category: categories[4], name: 'Americano', description: 'Espresso alargado con agua caliente.', price: '$2.75', image: '/americano.jpg' },
  { category: categories[4], name: 'Long black', description: 'Café intenso y aromático.', price: '$3.00', image: '/long_black.jpg' },
  { category: categories[4], name: 'Cortado', description: 'Espresso con un toque de leche.', price: '$2.85', image: '/cortado.jpg' },
  { category: categories[4], name: 'Cappuccino', description: 'Espresso, leche vaporizada y espuma.', price: '$2.95', image: '/cappuccino.jpg' },
  { category: categories[4], name: 'Latte', description: 'Espresso con leche cremosa.', price: '$3.00', image: '/latte.jpg' },
  { category: categories[4], name: 'Flat white', description: 'Espresso doble con microespuma.', price: '$3.00', image: '/flat_white.jpg' },
  { category: categories[4], name: 'Mocaccino', description: 'Café, chocolate y leche.', price: '$3.99', image: '/mocaccino.jpg' },
  { category: categories[4], name: 'Irish coffee', description: 'Café con un toque especial.', price: '$3.99', image: '/irish_coffee.jpg' },
  { category: categories[4], name: 'Latte de churro', description: 'Latte con el sabor de nuestro churro.', price: '$3.99', image: '/latte_de_churro.jpg' },
  { category: categories[4], name: 'Chocolate caliente', description: 'Chocolate caliente y reconfortante.', price: '$3.99', image: '/chocolate_caliente.jpg' },
  { category: categories[4], name: 'Infusiones', description: 'Frutos rojos, manzana y canela, u orange & ginger.', price: '$2.50', image: '/infusiones.jpg' },
  { category: categories[5], name: 'Creme brulatte', description: 'Café frío con una capa dulce y crujiente.', price: '$3.99', image: '/creme_brulatte.jpg' },
  { category: categories[5], name: 'Limonada gaseosa', description: 'Limonada refrescante con burbujas.', price: '$3.50', image: '/limonada_gaseosa.jpg' },
  { category: categories[5], name: 'Limonada de coco', description: 'Limonada cremosa con coco.', price: '$3.50', image: '/limonada_de_coco.jpg' },
  { category: categories[5], name: 'Limonada frutos rojos', description: 'Limonada con frutos rojos.', price: '$3.50', image: '/limonada_frutos_rojos.jpg' },
  { category: categories[5], name: 'Limonada clásica', description: 'Limonada recién hecha.', price: '$3.00', image: '/limonada_clasica.jpg' },
  { category: categories[5], name: 'Jugo natural', description: 'Banano-maracuyá, fresa, maracuyá, mora, coco o mango.', price: '$3.00', image: '/jugo_natural.jpg' },
  { category: categories[5], name: 'Smoothie', description: 'Banano-maracuyá, fresa, maracuyá, mora, coco o mango.', price: '$3.99', image: '/smoothie.jpg' },
  { category: categories[5], name: 'Milkshake', description: 'Con helado a elección.', price: '$3.99', image: '/milkshake.jpg' },
  { category: categories[6], name: 'Syrups', description: 'Pistacho, vainilla, caramelo salado, amaretto o licor de café.', price: '$0.50', image: '/syrups.jpg' },
  { category: categories[6], name: 'Tipo de leche', description: 'Almendras, avena o deslactosada.', price: '$0.50', image: '/tipo_de_leche.jpg' },
]

export default function Page() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [order, setOrder] = useState<Record<string, number>>({})
  const [selectedItem, setSelectedItem] = useState<(typeof menu)[number] | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [orderOpen, setOrderOpen] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'transferencia' | 'puerta' | ''>('')

  const orderItems = Object.entries(order).map(([name, quantity]) => ({
    item: menu.find((entry) => entry.name === name)!,
    quantity,
  }))
  const orderTotal = orderItems.reduce((total, { item, quantity }) => total + parsePrice(item.price) * quantity, 0)

  const addItemToOrder = (showSummary = false) => {
    if (!selectedItem) return
    setOrder((current) => ({
      ...current,
      [selectedItem.name]: (current[selectedItem.name] ?? 0) + quantity,
    }))
    setSelectedItem(null)
    setQuantity(1)
    setOrderOpen(showSummary)
  }

  const paymentLabel = paymentMethod === 'transferencia' ? 'pagaré por transferencia' : 'pagaré en la puerta de mi domicilio'
  const whatsappMessage = `Hola Crunchy, me llamo ${customerName.trim()} y quiero pedir ${orderItems.map(({ item, quantity }) => `${quantity} ${item.name}`).join(', ')}. Total: ${formatPrice(orderTotal)}. ${paymentLabel}.`
  const whatsappUrl = `https://wa.me/593989998834?text=${encodeURIComponent(whatsappMessage)}`

  // Estado para controlar qué imagen del hero se muestra
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroCarousel.length)
      setCurrentGalleryIndex((prev) => (prev + 1) % images.galeria.length)
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
          <a href="#inicio" className="flex items-center" aria-label="Crunchy inicio">
            <Image src={images.logo} alt="Crunchy" width={128} height={56} className="w-32 h-auto object-contain" priority />
          </a>
          <nav className="hidden lg:flex items-center gap-6 font-bold text-[#ede8e2] text-xs uppercase tracking-[0.08em]">
            <a href="#menu" className="hover:text-[#ed9aac] transition-colors">Menú</a>
            <a href="#visitanos" className="hover:text-[#ed9aac] transition-colors">Visítanos</a>
            <a href="#horarios" className="hover:text-[#ed9aac] transition-colors">Horarios</a>
          </nav>
          <a href="https://wa.me/593989998834" className="hidden sm:block bg-[#3a5a30] hover:bg-[#bae0e3] px-5 py-3 rounded-full font-black text-[#ede8e2] hover:text-[#44271a] text-xs uppercase tracking-wider transition-colors">
            Pedir por WhatsApp
          </a>
          <button className="lg:hidden bg-[#ed9aac] p-2 rounded-full text-[#44271a]" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      {/* El fondo marrón ocupa todo el ancho, como en la composición de referencia. */}
      <section id="inicio" className="relative bg-[#44271a] px-5 lg:px-8 pt-28 lg:pt-22 pb-4 lg:pb-2">
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
              <a href="https://wa.me/593989998834" className="inline-flex justify-center items-center bg-[#3a5a30] hover:bg-[#bae0e3] px-5 py-3 rounded-full font-black text-[#ede8e2] hover:text-[#44271a] text-xs uppercase tracking-wide transition-colors">
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
      <section id="menu" className="bg-[#ede8e2] px-4 sm:px-5 lg:px-8 py-10 sm:py-14 lg:py-16 text-[#44271a]">
        <div className="mx-auto max-w-7xl">
          <div className="flex sm:flex-row flex-col justify-between sm:items-end gap-4 mb-5 sm:mb-6">
            <div>
              <p className="mb-2 font-black text-[#44271a] text-[10px] uppercase tracking-[.2em]">Para cada antojo</p>
              <h2 className="font-serif font-black text-4xl sm:text-5xl leading-none tracking-[0.025em]">Menú <span className="text-[#ed9aac]">Crunchy</span></h2>
            </div>
            <div className="flex items-center gap-2 bg-[#44271a]/5 px-3 py-2 border border-[#44271a]/20 focus-within:border-[#ed9aac] rounded-full">
              <Search size={16} className="text-[#ed9aac]" />
              <input 
                aria-label="Buscar en el menú" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Buscar..." 
                className="bg-transparent outline-none w-28 sm:w-40 text-[#44271a] placeholder:text-[#44271a]/50 text-sm" 
              />
              <button type="button" onClick={() => setOrderOpen(true)} className="inline-flex items-center gap-2 bg-[#3a5a30] px-3 py-2 rounded-full font-black text-[#ede8e2] text-[10px] uppercase tracking-wider">
                <Check size={14} /> Pedido {orderItems.length > 0 ? `(${orderItems.length})` : ''}
              </button>
            </div>
          </div>

          <div className="flex gap-2 mb-6 pb-1 overflow-x-auto scrollbar-hide">
            {categories.map((category, index) => (
              <button 
                key={category} 
                onClick={() => setActiveCategory(category)} 
                className={`whitespace-nowrap rounded-full px-3 py-2 text-[10px] font-black uppercase tracking-wider transition-colors ${
                  activeCategory === category 
                    ? 'bg-[#ed9aac] text-[#44271a]' 
                    : 'border border-[#44271a]/20 text-[#44271a]/70 hover:border-[#bae0e3] hover:text-[#44271a]'
                }`}
              >
                <span className="opacity-60 mr-2">0{index + 1}</span>{category}
              </button>
            ))}
          </div>

          <div className="gap-3 sm:gap-4 grid md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <article key={item.name} className="group bg-white shadow-[4px_4px_0_#44271a] rounded-2xl overflow-hidden text-[#44271a]">
                <div className="relative aspect-[1.35] overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="top-4 right-4 absolute bg-[#bae0e3] px-3 py-2 rounded-full font-black text-[#44271a] text-sm">
                    {item.price}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-black text-xl">{item.name}</h3>
                  <p className="mt-1 text-[#44271a]/80 text-xs leading-4">{item.description}</p>
                  <button type="button" onClick={() => { setSelectedItem(item); setQuantity(1) }} className="inline-flex items-center gap-2 bg-[#ed9aac] hover:bg-[#44271a] mt-3 px-4 py-2 rounded-full font-black text-[#44271a] text-[10px] hover:text-[#ede8e2] uppercase tracking-wider transition-colors">
                    Pedir este <ArrowRight size={14} />
                  </button>
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
      <div className="relative mt-2 w-full">
        <div className="relative border-[#44271a] border-2 rounded-[30px] w-full h-80 sm:h-[28rem] overflow-hidden">
          {images.galeria.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt={`Galería de Crunchy, imagen ${index + 1}`}
              fill
              className={`object-cover transition-opacity duration-[1800ms] ease-in-out ${index === currentGalleryIndex ? 'opacity-100' : 'opacity-0'}`}
              priority={index === 0}
            />
          ))}
          <div className="right-4 bottom-4 absolute bg-[#ede8e2]/90 px-3 py-1 rounded-full font-black text-[#44271a] text-xs">
            {String(currentGalleryIndex + 1).padStart(2, '0')} / 10
          </div>
        </div>
      </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN HORARIOS Y MAPA */}
      <section id="horarios" className="bg-[#ede8e2] px-5 lg:px-8 py-20 lg:py-28">
        <div className="gap-5 grid md:grid-cols-2 mx-auto max-w-7xl">
          <div className="bg-[#ed9aac] p-7 sm:p-10 border-[#44271a] border-2 rounded-[30px]">
            <div className="flex sm:flex-row flex-col items-start gap-6">
              <div className="relative border-[#44271a] border-2 rounded-2xl w-full sm:w-36 h-48 overflow-hidden shrink-0">
                <Image src={images.casaSolano} alt="Calle de Casa Solano en Cuenca, Ecuador" fill className="object-cover" />
              </div>
              <div>
                <MapPin className="mb-8 text-[#44271a]" size={28} />
                <h3 className="font-serif font-black text-[#44271a] text-4xl">Casa Solano</h3>
                <p className="mt-3 text-[#44271a]/80">Gonzalo Cordero y Av. Solano - Cuenca, Ecuador</p>
                <a href="https://maps.google.com/?q=Casa+Solano+Cuenca" className="inline-flex items-center gap-2 bg-[#44271a] hover:bg-[#bae0e3] mt-8 px-5 py-3 rounded-full font-black text-[#ede8e2] hover:text-[#44271a] text-xs uppercase tracking-wider transition-colors">
                  Abrir en Maps <ArrowRight size={14} />
                </a>
              </div>
            </div>
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

      {selectedItem && (
        <div className="z-[60] fixed inset-0 flex justify-center items-center bg-[#44271a]/70 p-4" role="dialog" aria-modal="true" aria-labelledby="quantity-title">
          <div className="bg-[#ede8e2] shadow-2xl p-6 rounded-3xl w-full max-w-sm text-[#44271a]">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="mb-1 font-black text-[#ed9aac] text-[10px] uppercase tracking-widest">Añadir al pedido</p>
                <h2 id="quantity-title" className="font-serif font-black text-2xl leading-none">{selectedItem.name}</h2>
                <p className="mt-2 text-[#44271a]/70 text-sm">{selectedItem.price}</p>
              </div>
              <button type="button" onClick={() => setSelectedItem(null)} className="hover:bg-[#44271a]/10 p-2 rounded-full" aria-label="Cerrar"><X size={18} /></button>
            </div>
            <div className="flex justify-center items-center gap-5 my-7">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="bg-[#bae0e3] p-2 rounded-full" aria-label="Reducir cantidad"><Minus size={18} /></button>
              <span className="font-serif font-black text-3xl">{quantity}</span>
              <button type="button" onClick={() => setQuantity((value) => value + 1)} className="bg-[#ed9aac] p-2 rounded-full" aria-label="Aumentar cantidad"><Plus size={18} /></button>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => addItemToOrder(false)} className="flex-1 bg-[#bae0e3] hover:bg-[#ed9aac] px-3 py-3 rounded-full font-black text-[#44271a] text-[10px] uppercase tracking-wider transition-colors">Añadir más comida</button>
              <button type="button" onClick={() => addItemToOrder(true)} className="flex-1 bg-[#44271a] hover:bg-[#3a5a30] px-3 py-3 rounded-full font-black text-[#ede8e2] text-[10px] uppercase tracking-wider transition-colors">Pedir</button>
            </div>
          </div>
        </div>
      )}

      {orderOpen && !selectedItem && (
        <div className="z-[60] fixed inset-0 flex justify-center items-center bg-[#44271a]/70 p-4" role="dialog" aria-modal="true" aria-labelledby="order-title">
          <div className="bg-[#ede8e2] shadow-2xl p-6 rounded-3xl w-full max-w-md text-[#44271a]">
            <div className="flex justify-between items-start gap-4">
              <div><p className="mb-1 font-black text-[#ed9aac] text-[10px] uppercase tracking-widest">Tu pedido</p><h2 id="order-title" className="font-serif font-black text-3xl">Arma tu pedido</h2></div>
              <button type="button" onClick={() => setOrderOpen(false)} className="hover:bg-[#44271a]/10 p-2 rounded-full" aria-label="Cerrar"><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-3 my-5">
              {orderItems.length === 0 ? <p className="text-[#44271a]/70 text-sm">Todavía no has añadido productos.</p> : orderItems.map(({ item, quantity }) => (
                <div key={item.name} className="flex justify-between items-center gap-3 bg-white/70 p-3 rounded-xl text-sm">
                  <div className="min-w-0">
                    <span className="block font-bold truncate">{item.name}</span>
                    <span className="text-[#44271a]/70">{quantity} × {item.price} = {formatPrice(parsePrice(item.price) * quantity)}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button type="button" onClick={() => setOrder((current) => quantity > 1 ? { ...current, [item.name]: quantity - 1 } : Object.fromEntries(Object.entries(current).filter(([name]) => name !== item.name)))} className="bg-[#bae0e3] p-2 rounded-full" aria-label={`Quitar una unidad de ${item.name}`}><Minus size={14} /></button>
                    <button type="button" onClick={() => setOrder((current) => ({ ...current, [item.name]: quantity + 1 }))} className="bg-[#ed9aac] p-2 rounded-full" aria-label={`Añadir una unidad de ${item.name}`}><Plus size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
            {orderItems.length > 0 && <>
              <div className="flex justify-between items-center mt-2 pt-4 border-[#44271a]/20 border-t font-black text-lg">
                <span>Total del pedido</span>
                <span>{formatPrice(orderTotal)}</span>
              </div>
              <label htmlFor="customer-name" className="block mb-2 font-black text-xs uppercase tracking-wider">Pon el nombre de a quién va el pedido</label>
              <input id="customer-name" value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Tu nombre" className="bg-white px-4 py-3 rounded-xl outline-none w-full text-sm" />
              <fieldset className="mt-4">
                <legend className="mb-2 font-black text-xs uppercase tracking-wider">¿Cómo pagarás tu pedido?</legend>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 bg-white/70 hover:bg-white px-3 py-3 rounded-xl text-sm cursor-pointer">
                    <input type="radio" name="payment-method" value="transferencia" checked={paymentMethod === 'transferencia'} onChange={() => setPaymentMethod('transferencia')} className="accent-[#3a5a30]" />
                    Pagaré por transferencia
                  </label>
                  <label className="flex items-center gap-3 bg-white/70 hover:bg-white px-3 py-3 rounded-xl text-sm cursor-pointer">
                    <input type="radio" name="payment-method" value="puerta" checked={paymentMethod === 'puerta'} onChange={() => setPaymentMethod('puerta')} className="accent-[#3a5a30]" />
                    Pagaré en la puerta de mi domicilio
                  </label>
                </div>
              </fieldset>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={() => { setOrderOpen(false); document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' }) }} className="flex-1 bg-[#bae0e3] hover:bg-[#ed9aac] px-3 py-3 rounded-full font-black text-[#44271a] text-[10px] uppercase tracking-wider transition-colors">Añadir más comida</button>
                <a href={customerName.trim() && paymentMethod ? whatsappUrl : undefined} aria-disabled={!customerName.trim() || !paymentMethod} onClick={(event) => { if (!customerName.trim() || !paymentMethod) event.preventDefault() }} className="flex flex-1 justify-center items-center bg-[#3a5a30] px-3 py-3 rounded-full font-black text-[#ede8e2] text-[10px] uppercase tracking-wider">Pedir por WhatsApp</a>
              </div>
            </>}
          </div>
        </div>
      )}

      {/* FOOTER CON MASCOTA */}
      <footer className="relative bg-[#44271a] px-5 lg:px-8 pt-20 pb-10 overflow-hidden text-[#ede8e2]">
        <div className="z-10 relative flex sm:flex-row flex-col justify-between sm:items-end gap-6 mx-auto mb-6 pb-10 border-[#ede8e2]/20 border-b max-w-7xl">
          <div>
          <Image src={images.logo} alt="Crunchy" width={220} height={96} className="w-52 h-auto object-contain" />
          </div>
          <div className="flex flex-col items-center sm:items-end gap-1">
            <Image src={images.mascota} alt="Mascota Crunchy" width={180} height={180} className="mt-3 object-contain" />
            <a href="https://instagram.com/crunchychurros.ec" className="flex items-center gap-2 font-bold hover:text-[#ed9aac] text-sm transition-colors">
              <Camera size={18} /> @crunchychurros.ec
            </a>
          </div>
        </div>
        
        <div className="z-10 relative mx-auto max-w-7xl text-[#ede8e2]/50 text-xs">
          © 2026 Crunchy Churros de Autor.
        </div>
      </footer>
    </main>
  )
}
