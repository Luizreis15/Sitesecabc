import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import {
  ArrowRight,
  UserPlus,
  FileCheck,
  MessageCircle,
  PartyPopper,
  LayoutDashboard,
  MapPin,
  Instagram,
  Phone,
  Mail,
} from 'lucide-react'

const WHATSAPP_NUMBER = '5511933194304'

const whatsappAssociado = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Olá! Quero saber mais sobre como me tornar associado do SECABC e conhecer os benefícios exclusivos.'
)}`

const whatsappGeral = `https://wa.me/${WHATSAPP_NUMBER}`

// Banners do carrossel "Destaques" — edite aqui (imagem, link e alt de cada slide)
const BANNERS = [
  {
    img: '/images/banners/banner-01.jpg',
    href: 'https://www.secabc.online/festa-criancas',
    alt: 'Festa das Crianças SECABC',
  },
  {
    img: '/images/banners/banner-02.jpg',
    href: '/beneficios',
    alt: 'Benefícios exclusivos SECABC',
  },
  {
    img: '/images/banners/banner-03.jpg',
    href: 'https://www.veramo.com.br/login',
    alt: 'Agende sua homologação online',
  },
  {
    img: '/images/banners/banner-04.jpg',
    href: '/sedes-regionais',
    alt: 'Sedes regionais SECABC',
  },
  {
    img: '/images/banners/banner-05.jpg',
    href: whatsappAssociado,
    alt: 'Seja um associado SECABC',
  },
]

const linkItems = [
  {
    title: 'Seja um associado',
    description: 'Benefícios exclusivos para você e sua família',
    href: whatsappAssociado,
    icon: UserPlus,
    variant: 'solid',
    external: true,
  },
  {
    title: 'Agendar homologação',
    description: 'Atendimento rápido e seguro',
    href: 'https://www.veramo.com.br/login',
    icon: FileCheck,
    variant: 'outline',
    external: true,
  },
  {
    title: 'Falar no WhatsApp',
    description: 'Atendimento rápido pelo WhatsApp',
    href: whatsappGeral,
    icon: MessageCircle,
    variant: 'outline',
    external: true,
  },
  {
    title: 'Festa das Crianças',
    description: 'Acesse a página do evento',
    href: 'https://www.secabc.online/festa-criancas',
    icon: PartyPopper,
    variant: 'outline',
    external: true,
  },
  {
    title: 'Painel do Contribuinte',
    description: 'Acesse sua área restrita',
    href: 'https://portal.afsys.com.br/secabc/login',
    icon: LayoutDashboard,
    variant: 'outline',
    external: true,
  },
  {
    title: 'Sedes Regionais',
    description: 'Encontre a sede mais perto de você',
    href: '/sedes-regionais',
    icon: MapPin,
    variant: 'outline',
    external: false,
  },
  {
    title: 'Instagram',
    description: '@secabc_',
    href: 'https://instagram.com/secabc_',
    icon: Instagram,
    variant: 'outline',
    external: true,
  },
]

const floatingTags = ['Direitos', 'Benefícios', 'Homologação', 'ABC']

const stats = [
  { value: 'Grande ABC', label: 'Santo André, SBC, SCS, Mauá e região' },
  { value: 'Comerciários', label: 'Representação e defesa dos direitos' },
  { value: 'Sedes', label: 'Atendimento presencial na região' },
  { value: 'Benefícios', label: 'Saúde, lazer e assessoria jurídica' },
]

// Citação do presidente — substitua pelo texto real
const QUOTE = {
  text: 'Nosso compromisso é lutar todos os dias pelos direitos dos comerciários do ABC, com respeito, proximidade e assessoria de verdade para quem mais precisa.',
  author: '— Ademar Gonçalves, Presidente',
}

function Reveal({ children, delay = 0 }) {
  return (
    <div
      data-reveal-links="true"
      className="opacity-0 translate-y-3.5 transition-all duration-700 ease-out"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function LinkCard({ item }) {
  const Icon = item.icon
  const className =
    item.variant === 'solid'
      ? 'bg-gradient-to-br from-accent to-secondary text-accent-foreground border border-transparent hover:shadow-lg hover:shadow-accent/25'
      : 'bg-white/[0.03] border border-white/15 text-white hover:border-accent/50 hover:bg-white/[0.06]'

  const iconWrap =
    item.variant === 'solid'
      ? 'bg-black/15 text-accent-foreground'
      : 'bg-accent/20 text-accent'

  const descClass =
    item.variant === 'solid'
      ? 'text-accent-foreground/70'
      : 'text-white/65'

  const arrowClass =
    item.variant === 'solid' ? 'text-accent-foreground' : 'text-accent'

  const inner = (
    <>
      <div
        className={`flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl ${iconWrap}`}
      >
        <Icon size={22} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-heading text-[1.05rem] font-semibold leading-tight tracking-tight">
          {item.title}
        </h3>
        <p className={`mt-0.5 text-xs leading-snug ${descClass}`}>{item.description}</p>
      </div>
      <ArrowRight
        size={20}
        className={`shrink-0 transition-transform duration-250 group-hover:translate-x-1 ${arrowClass}`}
      />
    </>
  )

  const sharedClass = `group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 no-underline transition-all duration-250 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] ${className}`

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={sharedClass}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link to={item.href} className={sharedClass}>
      {inner}
    </Link>
  )
}

function BannerSlide({ banner, eager }) {
  const img = (
    <img
      src={banner.img}
      alt={banner.alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : 'auto'}
      className="aspect-video w-full rounded-2xl object-cover shadow-lg shadow-black/20"
    />
  )

  if (banner.href.startsWith('/')) {
    return (
      <Link to={banner.href} className="block">
        {img}
      </Link>
    )
  }

  return (
    <a href={banner.href} target="_blank" rel="noopener noreferrer" className="block">
      {img}
    </a>
  )
}

export default function Links() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }))
  const [api, setApi] = useState(null)
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal-links="true"]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove('opacity-0', 'translate-y-3.5')
            e.target.classList.add('opacity-100', 'translate-y-0')
          }
        })
      },
      { threshold: 0.1 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!api) return
    setSelected(api.selectedScrollSnap())
    api.on('select', () => setSelected(api.selectedScrollSnap()))
  }, [api])

  const tagPositions = [
    'top-[6%] right-[6%]',
    'top-[52%] left-[4%]',
    'top-[68%] right-[5%]',
    'top-[32%] left-[6%]',
  ]

  return (
    <>
      <Helmet>
        <title>SECABC — Links | Sindicato dos Comerciários do ABC</title>
        <meta
          name="description"
          content="Atalhos do SECABC: seja um associado, agende sua homologação, fale no WhatsApp, veja a Festa das Crianças, painel do contribuinte e sedes."
        />
      </Helmet>

      <main className="flex min-h-screen justify-center bg-primary font-sans text-white">
        <div className="flex w-full max-w-[460px] flex-col">
          {/* HERO */}
          <section className="relative overflow-hidden px-7 pb-9 pt-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-[#0c335e]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(246,165,42,0.16),transparent_55%)]" />
            <svg
              aria-hidden="true"
              viewBox="0 0 460 420"
              className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
              fill="none"
            >
              <circle cx="430" cy="-30" r="170" stroke="#F6A52A" strokeWidth="1" opacity="0.35" />
              <circle cx="430" cy="-30" r="220" stroke="#F6A52A" strokeWidth="1" opacity="0.18" />
              <circle cx="10" cy="440" r="150" stroke="#F6A52A" strokeWidth="1" opacity="0.28" />
              <path d="M -40 130 Q 230 50 500 170" stroke="#F6A52A" strokeWidth="1" opacity="0.22" />
              <path d="M -40 320 Q 230 400 500 280" stroke="#F6A52A" strokeWidth="1" opacity="0.18" />
            </svg>

            {floatingTags.map((tag, i) => (
              <span
                key={tag}
                className={`absolute z-10 rounded-full border border-accent/40 bg-primary/50 px-3 py-1.5 text-[0.66rem] font-medium tracking-[0.16em] text-highlight backdrop-blur-sm animate-[linksTagFloat_3.8s_ease-in-out_infinite] ${tagPositions[i]}`}
                style={{ animationDelay: `${0.9 + i * 0.25}s` }}
              >
                {tag}
              </span>
            ))}

            <div className="relative z-10">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-accent/60 bg-white/5 p-3 shadow-lg shadow-black/25 backdrop-blur-sm">
                <img
                  src="/images/logo/logo.png"
                  alt="Logo SECABC"
                  loading="eager"
                  className="h-full w-full object-contain"
                />
              </div>
              <h1 className="font-heading text-[clamp(1.75rem,6.5vw,2.35rem)] font-bold leading-tight tracking-tight text-highlight">
                SECABC
              </h1>
              <span className="mt-3 inline-block rounded-full border border-accent/40 bg-primary/50 px-3.5 py-1.5 text-[0.66rem] uppercase tracking-[0.18em] text-highlight backdrop-blur-sm">
                Sindicato dos Empregados no Comércio do ABC
              </span>
              <p className="mt-3 text-sm italic text-white/75">
                Direitos, benefícios e atendimento perto de você.
              </p>
            </div>
          </section>

          {/* DESTAQUES */}
          <section className="px-5 pb-2 pt-6">
            <Reveal>
              <p className="mb-3 text-center text-[0.7rem] uppercase tracking-[0.28em] text-highlight/60">
                Destaques
              </p>
            </Reveal>

            <Reveal delay={80}>
              <Carousel
                opts={{ loop: true }}
                plugins={[autoplay.current]}
                setApi={setApi}
                className="w-full"
              >
                <CarouselContent>
                  {BANNERS.map((banner, i) => (
                    <CarouselItem key={banner.img}>
                      <BannerSlide banner={banner} eager={i === 0} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              <div className="mt-3 flex justify-center gap-2">
                {BANNERS.map((banner, i) => (
                  <button
                    key={banner.img}
                    type="button"
                    aria-label={`Ir para o destaque ${i + 1}`}
                    onClick={() => api?.scrollTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      selected === i ? 'w-5 bg-accent' : 'w-1.5 bg-accent/30'
                    }`}
                  />
                ))}
              </div>
            </Reveal>
          </section>

          {/* LINKS */}
          <section className="flex flex-col gap-3 px-5 pb-4 pt-5">
            <Reveal>
              <p className="mb-1.5 text-center text-[0.7rem] uppercase tracking-[0.28em] text-highlight/60">
                Escolha por onde começar
              </p>
            </Reveal>

            {linkItems.map((item, i) => (
              <Reveal key={item.title} delay={80 + i * 70}>
                <LinkCard item={item} />
              </Reveal>
            ))}
          </section>

          {/* ABOUT */}
          <section className="border-t border-white/15 px-5 pb-8 pt-7">
            <Reveal>
              <div className="relative mb-5 overflow-hidden rounded-[20px] border border-white/15 shadow-xl transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src="/images/presidente/presidente-01.jpg"
                  alt="Ademar Gonçalves, Presidente do SECABC"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover object-[center_15%]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/95 via-primary/55 to-transparent px-4 pb-4 pt-10">
                  <h3 className="font-heading text-lg font-semibold">Ademar Gonçalves</h3>
                  <p className="text-xs tracking-wide text-white/75">Presidente do SECABC</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mb-3.5 flex justify-center">
                <span className="rounded-full border border-accent/40 px-3.5 py-1.5 text-[0.66rem] uppercase tracking-[0.24em] text-highlight">
                  Conheça o sindicato
                </span>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <h2 className="mb-4 text-center font-heading text-[clamp(1.5rem,5vw,1.9rem)] font-bold leading-tight">
                Quem é o <em className="not-italic text-accent">SECABC</em>
              </h2>
            </Reveal>

            <Reveal delay={220}>
              <p className="mb-5 text-center text-sm leading-relaxed text-white/75">
                O Sindicato dos Empregados no Comércio do ABC luta pelos direitos
                e oferece benefícios exclusivos para os comerciários da região —
                com atendimento nas sedes, homologações, assessoria jurídica e
                ações para toda a família.
              </p>
            </Reveal>

            <div className="mb-5 grid grid-cols-2 gap-2.5">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={260 + i * 70}>
                  <div
                    className={`min-h-24 rounded-[14px] border border-white/15 bg-white/[0.03] px-3.5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 ${
                      i % 2 === 1 ? 'mt-5' : ''
                    }`}
                  >
                    <p className="font-heading text-base font-semibold leading-tight text-accent">
                      {s.value}
                    </p>
                    <p className="mt-1 text-[0.7rem] leading-snug text-white/65">
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={520}>
              <div className="rounded-[18px] border border-accent/35 bg-white/[0.03] px-5 py-5 transition-transform duration-400 hover:-translate-y-0.5">
                <p className="font-heading text-base italic leading-relaxed text-highlight">
                  "{QUOTE.text}"
                </p>
                <p className="mt-2.5 text-xs text-white/70">{QUOTE.author}</p>
              </div>
            </Reveal>
          </section>

          {/* FOOTER */}
          <footer className="border-t border-white/15 px-5 pb-8 pt-6 text-center">
            <div className="mb-4 flex flex-wrap justify-center gap-4">
              <Link
                to="/"
                className="text-[0.72rem] uppercase tracking-[0.16em] text-white/65 no-underline transition-colors hover:text-highlight"
              >
                Início
              </Link>
              <Link
                to="/servicos"
                className="text-[0.72rem] uppercase tracking-[0.16em] text-white/65 no-underline transition-colors hover:text-highlight"
              >
                Serviços
              </Link>
              <Link
                to="/beneficios"
                className="text-[0.72rem] uppercase tracking-[0.16em] text-white/65 no-underline transition-colors hover:text-highlight"
              >
                Benefícios
              </Link>
              <Link
                to="/contato"
                className="text-[0.72rem] uppercase tracking-[0.16em] text-white/65 no-underline transition-colors hover:text-highlight"
              >
                Contato
              </Link>
            </div>

            <div className="mb-4 flex flex-col items-center gap-1.5 text-[0.72rem] text-white/60">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="shrink-0 text-accent" />
                Rua Padre Manoel de Paiva, 55 – Jardim, Santo André – SP – CEP 09070-230
              </span>
              <a
                href="tel:+551149921522"
                className="flex items-center gap-1.5 transition-colors hover:text-highlight"
              >
                <Phone size={13} className="shrink-0 text-accent" />
                11-4992-1522
              </a>
              <a
                href="mailto:adm@secabc.org.br"
                className="flex items-center gap-1.5 transition-colors hover:text-highlight"
              >
                <Mail size={13} className="shrink-0 text-accent" />
                adm@secabc.org.br
              </a>
            </div>

            <p className="text-[0.7rem] text-white/45">
              © {new Date().getFullYear()} SECABC · Sindicato dos Empregados no
              Comércio do ABC
            </p>
          </footer>
        </div>
      </main>

      <style>{`
        @keyframes linksTagFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </>
  )
}
