import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  ShieldCheck, 
  Target, 
  Award,
  Maximize2,
  Clock,
  Instagram,
  Facebook,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Carousel slides
const carouselSlides = [
  {
    image: "assets/images/hero-1.jpg",
    title: "Alpinismo Industrial de Alta Performance",
    subtitle: "Segurança absoluta e rigor técnico em trabalhos de difícil acesso nas alturas.",
    tag: "SEGURANÇA REGULAMENTADA"
  },
  {
    image: "assets/images/hero-2.jpg",
    title: "Climatização & Conforto Térmico",
    subtitle: "Instalação, manutenção preventiva e higienização profunda de sistemas de ar condicionado.",
    tag: "TÉCNICOS CREA / ABRAVA"
  },
  {
    image: "assets/images/hero-3.jpg",
    title: "Soluções Verticais Integradas",
    subtitle: "Manutenção predial, pintura técnica de fachadas, limpeza de vidros e içamentos especializados.",
    tag: "EFICIÊNCIA OPERACIONAL"
  }
];

// Service list items
const services = [
  {
    image: "assets/images/servico-1.jpg",
    title: "Instalação/manutenção de ar condicionado",
    description: "Dimensionamento de carga térmica de precisão, instalação de infraestrutura em cobre com isolamento térmico premium e manutenção para equipamentos residenciais, comerciais, inverter e cassete de todas as marcas com técnicos certificados.",
    features: ["Certificação técnica", "Garantia de eficiência", "Peças originais"]
  },
  {
    image: "assets/images/servico-2.jpg",
    title: "Higienização de ar condicionado",
    description: "Sanitização de alto espectro em condensadoras e evaporadoras. Remoção de biofilmes acumulados, ácaros, poeiras e fungos com bactericidas biodegradáveis aprovados pela ANVISA para resguardar a saúde das suas vias aéreas.",
    features: ["Bactericida ANVISA", "Aumento da vida útil", "Redução de consumo elétrico"]
  },
  {
    image: "assets/images/servico-3.jpg",
    title: "Colocação e retirada de lonas promocionais",
    description: "Instalação impecável com tensionamento perfeito contra intempéries de banners institucionais, lonas publicitárias e coberturas promocionais no topo de prédios corporativos e fachadas através de alpinismo industrial especializado.",
    features: ["Tensionamento seguro", "Agilidade operacional", "Ação rápida pós-campanha"]
  },
  {
    image: "assets/images/servico-4.jpg",
    title: "Içamentos diversos",
    description: "Movimentação aérea especializada de condensadoras de grande porte, pele de vidro, tampos de granito, estruturas metálicas e volumes especiais externamente pelas fachadas prediais sob rígido controle de ancoragens e polias multiplicadoras.",
    features: ["Análise de carga", "Cabos de aço de alta resistência", "Responsabilidade técnica"]
  },
  {
    image: "assets/images/servico-5.jpg",
    title: "Manutenção predial",
    description: "Tratamento profundo contra corrosão de ferragens estruturais expostas, calafetação técnica de juntas de dilatação, reparo de rebocos friáveis e pintura geral selada de fachadas externas sob técnicas avançadas de rope access.",
    features: ["Vedação de infiltrações", "Aplicação de selante PU", "Laudo técnico de fachada"]
  },
  {
    image: "assets/images/servico-6.jpg",
    title: "Limpeza predial",
    description: "Lavagem especializada por hidrojateamento com pressão calculada de pastilhas cerâmicas e limpeza profissional com detergente neutro ionizado sobre peitoris e peles de vidro, restaurando o brilho espelhado original do edifício.",
    features: ["Limpeza sem manchas", "Hidrojateamento controlado", "Equipamentos de alta pressão"]
  }
];

// Portfolio items
const portfolioItems = [
  {
    id: 1,
    image: "assets/images/portfolio/foto-1.jpg",
    title: "Içamento de Condensadora AC",
    category: "Içamentos",
    description: "Elevação vertical de condensadoras de 60.000 BTUs para terraço técnico."
  },
  {
    id: 2,
    image: "assets/images/portfolio/foto-2.jpg",
    title: "Revitalização de Fachada Comercial",
    category: "Manutenção Predial",
    description: "Pintura técnica e calafetação de rachaduras em edifício corporativo no centro."
  },
  {
    id: 3,
    image: "assets/images/portfolio/foto-3.jpg",
    title: "Manutenção Preventiva de Climatizadores",
    category: "Ar Condicionado",
    description: "Limpeza profunda de componentes de compressores externos sob alpinismo."
  },
  {
    id: 4,
    image: "assets/images/portfolio/foto-4.jpg",
    title: "Instalação de Multi-Splits VRV",
    category: "Ar Condicionado",
    description: "Sistema de climatização inteligente instalado em centro comercial regional."
  },
  {
    id: 5,
    image: "assets/images/portfolio/foto-5.jpg",
    title: "Limpeza de Vidros em Altura",
    category: "Limpeza Predial",
    description: "Lavagem de fachadas de vidro e painéis solares integrados sob corda em condomínio vertical."
  },
  {
    id: 6,
    image: "assets/images/portfolio/foto-6.jpg",
    title: "Soldagem Estrutural em Altura",
    category: "Manutenção Predial",
    description: "Fixação e reparos de estruturas metálicas de escoramento de mezanino externo."
  }
];

export default function App() {
  // Navigation states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  // Carousel controls
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Lightbox controls
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxZoom, setLightboxZoom] = useState(false);

  // Contact form controls
  const [formState, setFormState] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: ""
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const autoPlayRef = useRef<(() => void) | null>(null);

  // Manage Active Navigation Link based on Scroll Offset
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "quem-somos", "servicos", "portfolio", "contato"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Carousel Auto Slide Functionality
  const nextSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev + 1) % carouselSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  }, []);

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoPlayRef.current) {
        autoPlayRef.current();
      }
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  // Prevent background scroll when menu or lightbox is open
  useEffect(() => {
    if (isMenuOpen || lightboxOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen, lightboxOpen]);

  // Handle keyboard arrow navigation inside portfolio lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") {
        setLightboxZoom(false);
        setLightboxIndex((prev) => (prev + 1) % portfolioItems.length);
      } else if (e.key === "ArrowLeft") {
        setLightboxZoom(false);
        setLightboxIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
      } else if (e.key === "Escape") {
        setLightboxOpen(false);
        setLightboxZoom(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  // Contact Form Submission Action
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus({
          type: "success",
          message: data.simulated 
            ? "Mensagem recebida com sucesso! (Modo de simulação ativo: os dados foram registrados no console do servidor)."
            : "Sua mensagem foi enviada com sucesso! Logo entraremos em contato com você."
        });
        setFormState({ nome: "", email: "", telefone: "", mensagem: "" });
      } else {
        setFormStatus({
          type: "error",
          message: data.error || "Ocorreu um erro inesperado ao processar o seu contato. Por favor, tente novamente."
        });
      }
    } catch (err) {
      console.error(err);
      setFormStatus({
        type: "error",
        message: "Falha de conexão com o servidor. Por favor, tente enviar novamente em alguns segundos."
      });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div id="inicio" className="min-h-screen bg-white text-[#1A1A1A] font-sans antialiased">
      
      {/* 1. FIXED NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Anchor */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <img 
              id="brand_logo"
              src="assets/images/logo-idvertical.png" 
              alt="Logo ID Vertical" 
              className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Inline SVG fallback should the image download be delayed
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const fallback = document.createElement("div");
                  fallback.className = "flex items-center gap-2";
                  fallback.innerHTML = `
                    <div class="h-10 w-10 bg-[#D32F2F] flex items-center justify-center rounded text-white font-display font-bold text-xl">ID</div>
                    <span class="font-display font-black text-2xl tracking-tighter text-[#1A1A1A]">ID <span class="text-[#D32F2F]">VERTICAL</span></span>
                  `;
                  parent.appendChild(fallback);
                }
              }}
            />
          </a>

          {/* Nav Links Desktop View */}
          <nav className="hidden md:flex items-center gap-8 font-display tracking-wide font-semibold text-sm xl:text-base">
            <a 
              href="#inicio" 
              className={`transition-colors duration-200 uppercase ${
                activeSection === "inicio" ? "text-[#D32F2F] font-bold" : "text-[#1A1A1A] hover:text-[#D32F2F]"
              }`}
            >
              Início
            </a>
            <a 
              href="#quem-somos" 
              className={`transition-colors duration-200 uppercase ${
                activeSection === "quem-somos" ? "text-[#D32F2F] font-bold" : "text-[#1A1A1A] hover:text-[#D32F2F]"
              }`}
            >
              Quem Somos
            </a>
            <a 
              href="#servicos" 
              className={`transition-colors duration-200 uppercase ${
                activeSection === "servicos" ? "text-[#D32F2F] font-bold" : "text-[#1A1A1A] hover:text-[#D32F2F]"
              }`}
            >
              Serviços
            </a>
            <a 
              href="#portfolio" 
              className={`transition-colors duration-200 uppercase ${
                activeSection === "portfolio" ? "text-[#D32F2F] font-bold" : "text-[#1A1A1A] hover:text-[#D32F2F]"
              }`}
            >
              Portfólio
            </a>
            <a 
              href="#contato" 
              className={`transition-colors duration-200 uppercase ${
                activeSection === "contato" ? "text-[#D32F2F] font-bold" : "text-[#1A1A1A] hover:text-[#D32F2F]"
              }`}
            >
              Fale Conosco
            </a>
          </nav>

          {/* Right Action Button Desktop */}
          <div className="hidden md:block">
            <a 
              href="https://wa.me/5551984374239?text=Olá!%20Gostaria%20de%20um%20orçamento."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 ml-4 bg-[#D32F2F] text-white font-display font-bold uppercase tracking-wider text-sm rounded-md shadow-md transition-all duration-300 hover:bg-[#B71C1C] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              id="cta_nav_budget"
            >
              Solicitar Orçamento
            </a>
          </div>

          {/* Burger Menu Button Mobile */}
          <button 
            id="mobile_hamburger_toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-[#1A1A1A] hover:text-[#D32F2F] focus:outline-none"
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Swipe-in Overlay-like Menu for Mobile */}
        <div 
          className={`md:hidden fixed inset-x-0 top-20 bg-white border-b border-gray-100 shadow-xl transition-all duration-300 z-40 origin-top ${
            isMenuOpen ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-0 -translate-y-4 pointer-events-none"
          }`}
          id="mobile_drawer_content"
        >
          <div className="px-4 pt-4 pb-6 space-y-3 font-display tracking-wide font-bold">
            <a 
              href="#inicio" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-base text-[#1A1A1A] hover:bg-gray-50 hover:text-[#D32F2F] rounded-md transition"
            >
              Início
            </a>
            <a 
              href="#quem-somos" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-base text-[#1A1A1A] hover:bg-gray-50 hover:text-[#D32F2F] rounded-md transition"
            >
              Quem Somos
            </a>
            <a 
              href="#servicos" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-base text-[#1A1A1A] hover:bg-gray-50 hover:text-[#D32F2F] rounded-md transition"
            >
              Serviços
            </a>
            <a 
              href="#portfolio" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-base text-[#1A1A1A] hover:bg-gray-50 hover:text-[#D32F2F] rounded-md transition"
            >
              Portfólio
            </a>
            <a 
              href="#contato" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-base text-[#1A1A1A] hover:bg-gray-50 hover:text-[#D32F2F] rounded-md transition"
            >
              Fale Conosco
            </a>
            <div className="pt-3">
              <a 
                href="https://wa.me/5551984374239?text=Olá!%20Gostaria%20de%20um%20orçamento."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="w-full inline-flex items-center justify-center py-3 bg-[#D32F2F] text-white text-base rounded hover:bg-[#B71C1C] transition-all"
              >
                Solicitar Orçamento
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to push out navbar */}
      <div className="h-20"></div>

      {/* 2. HERO IMAGE CAROUSEL SECTION */}
      <section className="relative h-[65vh] sm:h-[75vh] md:h-[85vh] w-full overflow-hidden bg-black" id="hero_wrapper">
        
        {/* Dynamic Carousel Slides Container */}
        <div className="absolute inset-0 w-full h-full">
          {carouselSlides.map((slide, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                idx === carouselIndex ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-105 pointer-events-none"
              }`}
            >
              {/* Foreground Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/90 via-[#1A1A1A]/60 to-black/35 z-10"></div>
              
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              
              {/* Slide Context */}
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
                  <div className="max-w-3xl transform transition-transform duration-700">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase leading-tight tracking-tight text-white mb-4">
                      ID Vertical <br />
                      <span className="text-[#D32F2F] drop-shadow-sm">Ar Condicionado & Alpinismo Industrial</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-200 font-sans tracking-wide leading-relaxed font-light mb-8 max-w-2xl">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                      <a 
                        href="https://wa.me/5551984374239?text=Olá!%20Gostaria%20de%20um%20orçamento."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 bg-[#D32F2F] text-white font-display font-extrabold uppercase tracking-widest text-[13px] sm:text-sm rounded-md transition-all duration-300 hover:bg-[#B71C1C] hover:-translate-y-1 hover:shadow-lg shadow-md active:translate-y-0"
                      >
                        Solicitar Orçamento
                      </a>
                      <a 
                        href="#quem-somos" 
                        className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-display font-extrabold uppercase tracking-widest text-[13px] sm:text-sm rounded-md transition-all duration-300 hover:bg-white hover:text-[#1A1A1A] hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
                      >
                        Conhecer Mais
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Arrow Nav Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-[#D32F2F] text-white transition-all backdrop-blur-sm"
          aria-label="Slide anterior"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-[#D32F2F] text-white transition-all backdrop-blur-sm"
          aria-label="Próximo slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slider Bottom Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {carouselSlides.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCarouselIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === carouselIndex ? "bg-[#D32F2F] w-8" : "bg-white/40 hover:bg-white"
              }`}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 3. QUEM SOMOS SECTION */}
      <section className="py-20 bg-white" id="quem-somos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Title */}
          <div className="text-center mb-16">
            <span className="text-[#D32F2F] font-mono lg:text-sm font-semibold tracking-widest uppercase block mb-2">QUEM SOMOS</span>
            <h2 className="text-3xl sm:text-4xl md:text-5.5xl font-display font-black uppercase text-[#1A1A1A] tracking-tight">
              Excelência Técnica e Segurança em Altura
            </h2>
            <div className="w-16 h-1.5 bg-[#D32F2F] mx-auto mt-4 rounded"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Descriptive Content */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="font-display font-black text-2xl uppercase tracking-xs text-[#1A1A1A]">
                Focados em soluções de engenharia térmica e alpinismo de difícil acesso em Novo Hamburgo
              </h3>
              <p className="text-base text-[#757575] leading-relaxed">
                A <strong>ID Vertical</strong> nasceu com a missão de redefinir os parâmetros de eficiência e segurança nas atividades de alpinismo industrial e climatização técnica. Sediados orgulhosamente em Novo Hamburgo, RS, nossa empresa atende em toda a região metropolitana e gaúcha com soluções técnicas precisas.
              </p>
              <p className="text-base text-[#757575] leading-relaxed">
                Somos especialistas certificados. Aliamos engenheiros e alpinistas com amplo treinamento sob normas regulamentadoras nacionais (certificações NR-35 capacitação para trabalho em altura e certificações completas em acesso por cordas) para lidar com cada projeto do simples ao monumental, mantendo as maiores margens de integridade estrutural e segurança técnica do mercado.
              </p>

              {/* Quick Contact Links */}
              <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href="tel:51984374239" 
                  className="flex items-center gap-3 p-4 border border-gray-100 rounded-lg hover:border-[#D32F2F]/30 hover:bg-gray-50/50 transition group"
                >
                  <div className="h-10 w-10 bg-[#D32F2F]/10 flex items-center justify-center rounded-lg text-[#D32F2F] group-hover:bg-[#D32F2F] group-hover:text-white transition">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider font-mono text-[#757575]">Fale Conosco</span>
                    <span className="font-sans font-bold text-sm text-[#1A1A1A]">(51) 98437-4239</span>
                  </div>
                </a>
                
                <a 
                  href="mailto:idverticalnh@gmail.com" 
                  className="flex items-center gap-3 p-4 border border-gray-100 rounded-lg hover:border-[#D32F2F]/30 hover:bg-gray-50/50 transition group"
                >
                  <div className="h-10 w-10 bg-[#D32F2F]/10 flex items-center justify-center rounded-lg text-[#D32F2F] group-hover:bg-[#D32F2F] group-hover:text-white transition">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider font-mono text-[#757575]">E-mail</span>
                    <span className="font-sans font-bold text-sm text-[#1A1A1A]">idverticalnh@gmail.com</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Mission Vision Values Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Mission */}
              <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-[#D32F2F] flex items-center justify-center rounded-xl text-white shrink-0">
                    <Target size={22} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xl uppercase tracking-wider text-[#1A1A1A] mb-1">Missão</h4>
                    <p className="text-sm text-[#757575] leading-relaxed">
                      Oferecer serviços de climatização de vanguarda e alpinismo industrial em altura desafiadora com segurança inegociável, inovando na execução técnica e respeito estrito a custos e prazos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vision */}
              <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-[#1A1A1A] flex items-center justify-center rounded-xl text-white shrink-0">
                    <Award size={22} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xl uppercase tracking-wider text-[#1A1A1A] mb-1">Visão</h4>
                    <p className="text-sm text-[#757575] leading-relaxed">
                      Liderar o mercado gaúcho de montagens verticais e engenharia térmica, sendo reconhecidos pela inovação em soluções de engenharia de difícil acesso.
                    </p>
                  </div>
                </div>
              </div>

              {/* Values */}
              <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-gray-100 flex items-center justify-center rounded-xl text-[#D32F2F] shrink-0">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xl uppercase tracking-wider text-[#1A1A1A] mb-1">Valores</h4>
                    <p className="text-sm text-[#757575] leading-relaxed">
                      Segurança em primeiro lugar, conformidade regulamentar rígida, competência técnica com formação continuada, ética transparente nas avaliações e foco em satisfação produtiva.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVIÇOS SECTION GRID */}
      <section className="py-20 bg-gray-50" id="servicos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center mb-16">
            <span className="text-[#D32F2F] font-mono lg:text-sm font-semibold tracking-widest uppercase block mb-2">NOSSOS SERVIÇOS</span>
            <h2 className="text-3xl sm:text-4xl md:text-5.5xl font-display font-black uppercase text-[#1A1A1A] tracking-tight">
              Especialidades Verticais e Climatização
            </h2>
            <div className="w-16 h-1.5 bg-[#D32F2F] mx-auto mt-4 rounded"></div>
            <p className="text-sm sm:text-base text-[#757575] font-light max-w-xl mx-auto mt-4">
              Cada serviço executado sob as mais rígidas diretrizes técnicas e operacionais da engenharia e segurança em trabalho de altura.
            </p>
          </div>

          {/* Service Cards Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, idx) => (
              <article 
                key={idx}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col h-full"
                id={`servico-card-${idx + 1}`}
              >
                {/* Visual Thumbnail */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-[#D32F2F]/20 opacity-0 group-hover:opacity-100 transition duration-300 z-10"></div>
                  <img 
                    src={svc.image} 
                    alt={svc.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info and Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-[#1A1A1A] mb-3 group-hover:text-[#D32F2F] transition duration-200">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-[#757575] leading-relaxed mb-6">
                      {svc.description}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2 border-t border-gray-100 pt-4 font-mono text-[11px] text-[#757575]">
                    {svc.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D32F2F]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          {/* Quick CTA bottom of Section */}
          <div className="mt-16 text-center">
            <span className="text-sm text-[#757575] mr-2">Necessita de um serviço técnico personalizado sob medida?</span>
            <a href="#contato" className="inline-flex items-center gap-1 font-display font-extrabold uppercase text-[#D32F2F] hover:text-[#B71C1C] transition hover:translate-x-0.5">
              Falar com Técnico <ChevronRight size={16} />
            </a>
          </div>

        </div>
      </section>

      {/* 5. PORTFÓLIO SECTION IN GRID WITH LIGHTBOX */}
      <section className="py-20 bg-white" id="portfolio">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-[#D32F2F] font-mono lg:text-sm font-semibold tracking-widest uppercase block mb-2">GALERIA DE OBRAS</span>
            <h2 className="text-3xl sm:text-4xl md:text-5.5xl font-display font-black uppercase text-[#1A1A1A] tracking-tight">
              Galeria de Projetos Realizados
            </h2>
            <div className="w-16 h-1.5 bg-[#D32F2F] mx-auto mt-4 rounded"></div>
            <p className="text-sm sm:text-base text-[#757575] font-light max-w-xl mx-auto mt-4">
              Explore o histórico de soluções integradas executadas em altura e usinas comerciais com pleno rigor estético e operacional.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, index) => (
              <div 
                key={item.id}
                onClick={() => {
                  setLightboxIndex(index);
                  setLightboxZoom(false);
                  setLightboxOpen(true);
                }}
                className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#1A1A1A] aspect-4/3 border border-gray-100 shadow-sm"
                id={`portfolio-item-${item.id}`}
              >
                {/* Thumbnail Image */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:opacity-40"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Premium hover overlay with only the center-aligned zoom icon and absolutely no text */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex items-center justify-center">
                  <span className="h-10 w-10 rounded-full bg-[#D32F2F] flex items-center justify-center text-white shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 size={18} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Lightbox Vanilla JS component */}
        {lightboxOpen && (
          <div 
            id="lightbox_modal"
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[9999] flex flex-col justify-between"
            onClick={() => {
              setLightboxOpen(false);
              setLightboxZoom(false);
            }}
          >
            {/* Top Toolbar */}
            <div className="w-full px-6 py-4 flex items-center justify-between text-white z-20" onClick={(e) => e.stopPropagation()}>
              <div></div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setLightboxZoom(!lightboxZoom)}
                  className="p-2 hover:bg-white/10 rounded-full text-white transition transition-transform active:scale-95"
                  title="Ajustar Zoom"
                >
                  {lightboxZoom ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
                </button>
                <button 
                  onClick={() => {
                    setLightboxOpen(false);
                    setLightboxZoom(false);
                  }}
                  className="p-2 hover:bg-[#D32F2F] hover:text-white rounded-full text-gray-300 transition transition-transform active:scale-95"
                  title="Fechar (Esc)"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Slides Center Stage */}
            <div className="flex-1 relative flex items-center justify-center px-4 sm:px-12">
              
              {/* Previous Nav Arrow Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxZoom(false);
                  setLightboxIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
                }}
                className="absolute left-4 p-2 sm:p-3 rounded-full bg-white/10 text-white hover:bg-[#D32F2F] transition z-30 flex items-center justify-center"
                aria-label="Foto anterior"
                title="Foto anterior (Seta Esquerda)"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Central Lightbox Image Container */}
              <div 
                className="max-w-full max-h-[75vh] flex items-center justify-center relative overflow-hidden transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={portfolioItems[lightboxIndex].image} 
                  alt={portfolioItems[lightboxIndex].title} 
                  className={`max-w-full max-h-[75vh] rounded object-contain select-none transition-transform duration-300 ${
                    lightboxZoom ? "scale-140 cursor-zoom-out" : "scale-100 cursor-zoom-in"
                  }`}
                  onClick={() => setLightboxZoom(!lightboxZoom)}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Next Nav Arrow Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxZoom(false);
                  setLightboxIndex((prev) => (prev + 1) % portfolioItems.length);
                }}
                className="absolute right-4 p-2 sm:p-3 rounded-full bg-white/10 text-white hover:bg-[#D32F2F] transition z-30 flex items-center justify-center"
                aria-label="Próxima foto"
                title="Próxima foto (Seta Direita)"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Empty padding spacer to balance top bar layout */}
            <div className="w-full h-10"></div>
          </div>
        )}
      </section>

      {/* 6. FALE CONOSCO CONEXÃO COM POST API + GOOGLE MAP EMBED */}
      <section className="py-20 bg-gray-50 border-t border-gray-100" id="contato">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section title */}
          <div className="text-center mb-16">
            <span className="text-[#D32F2F] font-mono lg:text-sm font-semibold tracking-widest uppercase block mb-2">FALE CONOSCO</span>
            <h2 className="text-3xl sm:text-4xl md:text-5.5xl font-display font-black uppercase text-[#1A1A1A] tracking-tight">
              Solicite um Orçamento
            </h2>
            <div className="w-16 h-1.5 bg-[#D32F2F] mx-auto mt-4 rounded"></div>
            <p className="text-sm sm:text-base text-[#757575] font-light max-w-xl mx-auto mt-4">
              Preencha o formulário abaixo ou fale diretamente pelos nossos canais.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-display font-black text-2.5xl uppercase tracking-tight text-[#1A1A1A] mb-6 border-b border-gray-100 pb-4">
                Enviar E-mail
              </h3>

              {/* Status Alert Notification Box */}
              {formStatus.type && (
                <div 
                  className={`p-4 mb-6 rounded-lg flex items-start gap-3 text-sm ${
                    formStatus.type === "success" 
                      ? "bg-green-50 text-green-800 border border-green-200" 
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                  id="form_alert_element"
                >
                  <div className="shrink-0 mt-0.5">
                    {formStatus.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                  </div>
                  <div>
                    <span className="font-semibold block">
                      {formStatus.type === "success" ? "Sucesso!" : "Atenção!"}
                    </span>
                    <span className="text-xs sm:text-sm">{formStatus.message}</span>
                  </div>
                </div>
              )}

              {/* Professional controlled Form */}
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Nome Field */}
                  <div>
                    <label htmlFor="form_nome" className="block text-xs uppercase tracking-wider font-mono text-[#757575] mb-2 font-semibold">
                      Nome Completo
                    </label>
                    <input 
                      type="text" 
                      id="form_nome"
                      name="nome"
                      required
                      value={formState.nome}
                      onChange={handleInputChange}
                      placeholder=""
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition text-sm text-[#1A1A1A]"
                    />
                  </div>

                  {/* Telefone Field */}
                  <div>
                    <label htmlFor="form_telefone" className="block text-xs uppercase tracking-wider font-mono text-[#757575] mb-2 font-semibold">
                      Telefone / Celular
                    </label>
                    <input 
                      type="tel" 
                      id="form_telefone"
                      name="telefone"
                      required
                      value={formState.telefone}
                      onChange={handleInputChange}
                      placeholder=""
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition text-sm text-[#1A1A1A]"
                    />
                  </div>
                </div>

                {/* E-mail Field */}
                <div>
                  <label htmlFor="form_email" className="block text-xs uppercase tracking-wider font-mono text-[#757575] mb-2 font-semibold">
                    Endereço de E-mail
                  </label>
                  <input 
                    type="email" 
                    id="form_email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder=""
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition text-sm text-[#1A1A1A]"
                  />
                </div>

                {/* Mensagem Area */}
                <div>
                  <label htmlFor="form_mensagem" className="block text-xs uppercase tracking-wider font-mono text-[#757575] mb-2 font-semibold">
                    Sua Mensagem / Descreva o Orçamento
                  </label>
                  <textarea 
                    id="form_mensagem"
                    name="mensagem"
                    required
                    rows={5}
                    value={formState.mensagem}
                    onChange={handleInputChange}
                    placeholder=""
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] outline-none transition text-sm text-[#1A1A1A] resize-none"
                  ></textarea>
                </div>

                {/* Submit Action Button */}
                <button 
                  type="submit"
                  disabled={formLoading}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#D32F2F] text-white font-display font-extrabold uppercase tracking-widest text-sm rounded-md shadow-md transition-all duration-300 hover:bg-[#B71C1C] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  id="form_submit_btn"
                >
                  {formLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Enviando Mensagem...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Enviar Solicitação
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Google Maps + Contact details info column */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8 animate-fade-in">
              
              {/* Company contact info panel */}
              <div className="bg-[#1A1A1A] text-white p-8 rounded-2xl flex flex-col justify-between flex-1 border border-black/10">
                <div>
                  <h3 className="font-display font-black text-2.5xl uppercase tracking-tight text-white mb-6">
                    FALE CONOSCO
                  </h3>
                  
                  <div className="space-y-5 font-sans">
                    {/* Location Card */}
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-[#D32F2F]">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-mono tracking-widest text-gray-400">Cidade Sede</span>
                        <p className="text-sm font-medium mt-0.5">Novo Hamburgo — RS, Brasil</p>
                        <p className="text-xs text-gray-400 mt-0.5">Atendimento operacional de excelência na região metropolitana.</p>
                      </div>
                    </div>

                    {/* Email Card */}
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-[#D32F2F]">
                        <Mail size={20} />
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-mono tracking-widest text-gray-400">Atendimento Técnico</span>
                        <a href="mailto:idverticalnh@gmail.com" className="text-sm font-bold mt-0.5 hover:text-[#D32F2F] transition duration-200 block">
                          idverticalnh@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* Tel Card */}
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-[#D32F2F]">
                        <Phone size={20} />
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-mono tracking-widest text-gray-400">WhatsApp Comercial</span>
                        <a 
                          href="https://wa.me/5551984374239?text=Olá!%20Gostaria%20de%20um%20orçamento." 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm font-bold mt-0.5 hover:text-[#D32F2F] transition duration-200 block"
                        >
                          (51) 98437-4239
                        </a>
                      </div>
                    </div>

                    {/* Working Hours Card */}
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-[#D32F2F]">
                        <Clock size={20} />
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-mono tracking-widest text-gray-400">Horário Comercial</span>
                        <p className="text-sm mt-0.5">Segunda à Sábado — 08:00 às 18:00</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <span className="block text-xs uppercase font-mono text-gray-400 mb-3">CONECTE-SE</span>
                  <div className="flex items-center gap-4">
                    <a 
                      href="https://www.instagram.com/id_vertical/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D32F2F] hover:text-white hover:border-[#D32F2F] transition text-gray-300"
                      aria-label="Seguir no Instagram"
                    >
                      <Instagram size={18} />
                    </a>
                    <a 
                      href="https://www.facebook.com/idvertical/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D32F2F] hover:text-white hover:border-[#D32F2F] transition text-gray-300"
                      aria-label="Seguir no Facebook"
                    >
                      <Facebook size={18} />
                    </a>
                    <a 
                      href="https://www.tiktok.com/@idvertical" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D32F2F] hover:text-white hover:border-[#D32F2F] transition text-gray-300"
                      aria-label="Seguir no TikTok"
                    >
                      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.14.94 1.09 2.27 1.8 3.73 1.96V10c-1.28-.17-2.49-.74-3.48-1.57-.04 2.89-.02 5.79-.03 8.68-.06 1.83-.58 3.65-1.58 5.14-1.46 2.13-3.95 3.49-6.57 3.6-2.6.14-5.26-.8-7-2.73-1.92-2.1-2.73-5.11-2.07-7.88.62-2.58 2.39-4.86 4.88-5.8 1.25-.47 2.6-.57 3.91-.32V13.5c-1.12-.26-2.33-.08-3.3.56-.99.66-1.57 1.81-1.6 3 .02 1.44.88 2.76 2.19 3.32 1.27.54 2.82.26 3.79-.69.75-.75 1.08-1.85 1.06-2.91V.02z"/>
                      </svg>
                    </a>
                  </div>
                </div>

              </div>

              {/* Google Maps embed code responsive iframe */}
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-64 relative bg-gray-200">
                <iframe 
                  id="google_maps_iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110912.25105149785!2d-51.20137039971505!3d-29.69055221981648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9519424ad6403661%3A0x5d959f79a24a61c8!2sNovo%20Hamburgo%2C%20RS!5e0!3m2!1spt-BR!2sbr!4v1779398066628!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer"
                  title="Mapa de localização ID Vertical em Novo Hamburgo - RS"
                ></iframe>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. BLACK FOOTER WITH LOGO */}
      <footer className="bg-[#1A1A1A] text-white border-t border-black py-16" id="footer_section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-12">
            
            {/* Logo details */}
            <div className="md:col-span-5 space-y-4">
              <a href="#inicio" className="flex items-center gap-3 group">
                <img 
                  src="assets/images/logo-idvertical-footer.png" 
                  alt="Logo ID Vertical Rodapé" 
                  className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-103"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const fallback = document.createElement("div");
                      fallback.className = "flex items-center gap-2";
                      fallback.innerHTML = `
                        <div class="h-10 w-10 bg-[#D32F2F] flex items-center justify-center rounded text-white font-display font-bold text-xl">ID</div>
                        <span class="font-display font-black text-2xl tracking-tighter text-white">ID <span class="text-[#D32F2F]">VERTICAL</span></span>
                      `;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </a>
              <p className="text-gray-400 font-sans text-xs sm:text-sm max-w-sm leading-relaxed mt-4">
                Sua empresa gaúcha especializada em climatização térmica de alta performance e engenharia vertical sob acesso por corda. Atendimento pautado na engenharia e máxima segurança.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-4 space-y-3 font-display tracking-wider">
              <h4 className="text-white text-base font-extrabold uppercase mb-4 border-b border-white/10 pb-2">LINKS RÁPIDOS</h4>
              <nav className="grid grid-cols-2 gap-3 text-xs sm:text-sm font-semibold">
                <a href="#inicio" className="text-gray-400 hover:text-[#D32F2F] transition uppercase">Início</a>
                <a href="#quem-somos" className="text-gray-400 hover:text-[#D32F2F] transition uppercase">Quem Somos</a>
                <a href="#servicos" className="text-gray-400 hover:text-[#D32F2F] transition uppercase">Serviços</a>
                <a href="#portfolio" className="text-gray-400 hover:text-[#D32F2F] transition uppercase">Portfólio</a>
                <a href="#contato" className="text-gray-400 hover:text-[#D32F2F] transition uppercase">Fale Conosco</a>
              </nav>
            </div>

            {/* Contacts Info Column */}
            <div className="md:col-span-3 space-y-3 font-sans text-xs sm:text-sm">
              <h4 className="text-white text-base font-display font-extrabold uppercase mb-4 border-b border-white/10 pb-2">CONTATO</h4>
              <p className="text-gray-400 flex items-center gap-2">
                <MapPin size={14} className="text-[#D32F2F] shrink-0" />
                <span>Novo Hamburgo, RS</span>
              </p>
              <p className="text-gray-400 flex items-center gap-2">
                <Phone size={14} className="text-[#D32F2F] shrink-0" />
                <a href="tel:51984374239" className="hover:text-white transition">(51) 98437-4239</a>
              </p>
              <p className="text-gray-400 flex items-center gap-2">
                <Mail size={14} className="text-[#D32F2F] shrink-0" />
                <a href="mailto:idverticalnh@gmail.com" className="hover:text-white transition">idverticalnh@gmail.com</a>
              </p>
            </div>

          </div>

          {/* Social and copyright footbar */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
            <div>
              <span>© ID Vertical 2024</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <span className="text-[10px]">Desenvolvido com excelência técnica</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] inline-block" />
              <span>Novo Hamburgo, RS</span>
            </div>
          </div>

        </div>
      </footer>

      {/* 8. WHATSAPP FLOATING CONTACT ACTION BUTTON */}
      <a 
        href="https://wa.me/5551984374239?text=Olá!%20Gostaria%20de%20um%20orçamento."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[999] h-14 w-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl transition hover:scale-110 active:scale-95 animate-whatsapp-pulse cursor-pointer"
        aria-label="Falar conosco no WhatsApp"
        id="whatsapp_float_btn"
      >
        {/* Lucide MessageCircle icon loaded fallback */}
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

    </div>
  );
}
