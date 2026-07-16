import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  ArrowRight,
  PartyPopper,
  MessageCircle,
  FileCheck,
  LayoutDashboard,
  MapPin,
  Mail,
} from 'lucide-react'

const whatsappUrl = 'https://wa.me/11933194304'

const linkItems = [
  {
    title: 'Festa das Crianças',
    description: 'Em breve uma celebração especial para sua família',
    href: 'https://www.secabc.online/festa-criancas',
    icon: PartyPopper,
    variant: 'solid',
    external: true,
  },
  {
    title: 'Falar no WhatsApp',
    description: '(11) 93319-4304',
    href: whatsappUrl,
    icon: MessageCircle,
    variant: 'solid',
    external: true,
  },
  {
    title: 'Homologar Online',
    description: 'Agende sua homologação com segurança',
    href: 'https://www.veramo.com.br/login',
    icon: FileCheck,
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
    title: 'Contato',
    description: 'Fale com o sindicato',
    href: '/contato',
    icon: Mail,
    variant: 'outline',
    external: false,
  },
]

const floatingTags = ['Direitos', 'Homologação', 'Benefícios', 'ABC']

const stats = [
  { value: 'Grande ABC', label: 'Santo André, SBC, SCS, Mauá e região' },
  { value: 'Comerciários', label: 'Representação e defesa dos direitos' },
  { value: 'Sedes', label: 'Atendimento presencial na região' },
  { value: 'Benefícios', label: 'Saúde, lazer e assessoria jurídica' },
]

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

export default function Links() {
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

  const tagPositions = [
    'top-[8%] right-[6%]',
    'top-[44%] left-[4%]',
    'top-[56%] right-[5%]',
    'top-[30%] right-[5%]',
  ]

  return (
    <>
      <Helmet>
        <title>Links | SECABC</title>
        <meta
          name="description"
          content="Atalhos do SECABC: Festa das Crianças, WhatsApp, homologação, painel do contribuinte e sedes."
        />
      </Helmet>

      <main className="flex min-h-screen justify-center bg-primary font-sans text-white">
        <div className="flex w-full max-w-[460px] flex-col">
          {/* HERO */}
          <section className="relative min-h-[520px] w-full overflow-hidden bg-primary">
            <img
              src="/images/Diretoria_secabc.jpeg"
              alt="Diretoria SECABC"
              className="absolute inset-0 h-full w-full object-cover object-[center_20%] animate-[linksHeroZoom_18s_ease-in-out_infinite]"
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-primary/80 via-primary/30 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-primary via-primary/80 to-transparent" />

            {floatingTags.map((tag, i) => (
              <span
                key={tag}
                className={`absolute z-10 rounded-full border border-accent/40 bg-primary/50 px-3 py-1.5 text-[0.66rem] font-medium tracking-[0.16em] text-highlight backdrop-blur-sm animate-[linksTagFloat_3.8s_ease-in-out_infinite] ${tagPositions[i]}`}
                style={{ animationDelay: `${0.9 + i * 0.25}s` }}
              >
                {tag}
              </span>
            ))}

            <div className="absolute inset-x-0 bottom-0 z-10 px-7 pb-8 pt-7 text-center">
              <div className="mb-3 flex justify-center">
                <img
                  src="/images/Logo_secabc.png"
                  alt="Logo SECABC"
                  className="h-14 w-auto drop-shadow-md"
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
                  src="/images/Presidente_Ademar.jpeg"
                  alt="Presidente SECABC"
                  className="aspect-[4/5] w-full object-cover object-[center_15%]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/95 via-primary/55 to-transparent px-4 pb-4 pt-10">
                  <h3 className="font-heading text-lg font-semibold">SECABC</h3>
                  <p className="text-xs tracking-wide text-white/75">
                    Sindicato dos Empregados no Comércio do ABC
                  </p>
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
              <a
                href="https://www.secabc.online/festa-criancas"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center gap-4 rounded-2xl border border-transparent bg-gradient-to-br from-accent to-secondary px-4 py-3.5 text-accent-foreground no-underline transition-all duration-250 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/25"
              >
                <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl bg-black/15">
                  <PartyPopper size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-[1.05rem] font-semibold leading-tight">
                    Festa das Crianças
                  </h3>
                  <p className="mt-0.5 text-xs text-accent-foreground/70">
                    Acesse a página do evento
                  </p>
                </div>
                <ArrowRight
                  size={20}
                  className="shrink-0 transition-transform group-hover:translate-x-1"
                />
              </a>
            </Reveal>
          </section>

          {/* FOOTER */}
          <footer className="border-t border-white/15 px-5 pb-8 pt-6 text-center">
            <div className="mb-3 flex flex-wrap justify-center gap-4">
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
            <p className="text-[0.7rem] text-white/45">
              © {new Date().getFullYear()} SECABC · Sindicato dos Empregados no
              Comércio do ABC
            </p>
          </footer>
        </div>
      </main>

      <style>{`
        @keyframes linksHeroZoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes linksTagFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </>
  )
}
