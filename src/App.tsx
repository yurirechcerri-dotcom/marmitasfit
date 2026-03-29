import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  CheckCircle2, 
  Timer, 
  UtensilsCrossed, 
  ShoppingBasket, 
  TrendingDown, 
  Gift,
  Flame, 
  Clock, 
  Star, 
  ShieldCheck,
  PlayCircle,
  ArrowRight,
  Menu,
  X,
  Instagram,
  Facebook,
  Youtube,
  ChevronDown,
  MessageCircle,
  Gift as GiftIcon
} from 'lucide-react';

// Color Palette Constants
const COLORS = {
  teal: '#00B5A5', // Verde Água
  orange: '#F18A51', // Laranja Comida
  green: '#4CAF50', // Verde Salada
  dark: '#1A1A1A',
  light: '#F8F8F8'
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const navigatingRef = useRef(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Exit Intent Logic
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !navigatingRef.current) {
        setShowExitPopup(true);
      }
    };

    // Back Redirect Logic
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      if (!navigatingRef.current) {
        // Only show popup if it's not already open
        setShowExitPopup(true);
        window.history.pushState(null, "", window.location.href);
      }
    };

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.href && anchor.href.includes('pay.cakto.com.br')) {
        navigatingRef.current = true;
        // Reset after a short delay in case navigation is cancelled or slow
        setTimeout(() => {
          navigatingRef.current = false;
        }, 2000);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  const recipes = [
    { name: "Macarrão Integral com Carne Moída Fit", cal: "440", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80" },
    { name: "Receitas de Ovos com Abóbora", cal: "370", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80" },
    { name: "Feijão Fradinho com Ovos e Espinafre", cal: "360", img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80" },
    { name: "Receitas de Frango com Batata Doce", cal: "420", img: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80" },
    { name: "Frango Cremoso com Aveia", cal: "430", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80" },
    { name: "Arroz Integral com Frango Desfiado e Legumes", cal: "390", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80" },
    { name: "Omelete de Forno com Legumes e Aveia", cal: "350", img: "https://images.unsplash.com/photo-1494597706938-de2cd7341979?auto=format&fit=crop&w=800&q=80" },
    { name: "Escondidinho de Frango com Purê de Mandioquinha", cal: "430", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" },
  ];

  const bonuses = [
    { 
      id: 1, 
      title: "Guia de Lanches Saudáveis e Econômicos", 
      desc: "Receitas rápidas para evitar lanches calóricos no meio do dia.", 
      oldPrice: "R$47",
      img: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=200&q=80"
    },
    { 
      id: 2, 
      title: "Plano de Organização Semanal", 
      desc: "Planeje suas receitas e treinos com um cronograma simples e funcional.", 
      oldPrice: "R$29",
      img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=200&q=80"
    },
    { 
      id: 3, 
      title: "Lista Inteligente de Substituições", 
      desc: "Substitua ingredientes sem perder o sabor ou sair da dieta.", 
      oldPrice: "R$37",
      img: "https://images.unsplash.com/photo-1598791318878-10e76d178023?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const faqs = [
    { q: "Como vou receber o material?", a: "O acesso é imediato! Assim que o pagamento for aprovado, você receberá um e-mail com todos os links para download e acesso aos vídeos." },
    { q: "Não sei cozinhar muito bem... esse material serve pra mim?", a: "Com certeza! As receitas foram pensadas justamente para quem não tem experiência. Temos vídeos passo a passo e instruções simples." },
    { q: "Posso acessar pelo celular?", a: "Sim! O material é 100% digital e otimizado para celulares, tablets e computadores." },
    { q: "E se eu não gostar? Tem garantia?", a: "Sim! Oferecemos 7 dias de garantia incondicional. Se não gostar, devolvemos seu dinheiro." },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-teal-50">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#00B5A5] origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Top Banner */}
      <div className="bg-[#00B5A5] text-white py-2 text-center text-xs md:text-sm font-bold px-4">
        🔥 Oferta Exclusiva: 75% de Desconto Somente Hoje!
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#00B5A5] rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">75 RECEITAS <span className="text-[#00B5A5]">FITNESS</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-widest">
            <a href="#metodo" className="hover:text-[#00B5A5] transition-colors">O Método</a>
            <a href="#receitas" className="hover:text-[#00B5A5] transition-colors">Receitas</a>
            <a href="#oferta" className="hover:text-[#00B5A5] transition-colors">Oferta</a>
            <button className="bg-[#F18A51] text-white px-6 py-2.5 rounded-full hover:bg-[#d97a45] transition-all shadow-lg shadow-orange-200">
              Quero Começar
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-12 pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#e6f7f6] text-[#00B5A5] px-4 py-2 rounded-full text-sm font-black mb-6 uppercase tracking-tighter border border-teal-100 shadow-sm"
            >
              <Star className="w-4 h-4 fill-current" />
              Receitas Saudáveis para quem quer praticidade
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-[1.1]"
            >
              75 Receitas Fitness <br />
              <span className="text-[#00B5A5]">Práticas e Econômicas</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl"
            >
              Seu Guia Completo para Secar ou Ganhar Massa Gastando Pouco! O método testado para quem não tem tempo de cozinhar.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <motion.a 
                href="#oferta" 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#F18A51] text-white px-10 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-orange-200 hover:shadow-orange-300 transition-all flex items-center justify-center gap-3 group"
              >
                QUERO AS RECEITAS!
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://randomuser.me/api/portraits/women/${i + 10}.jpg`} className="w-12 h-12 rounded-full border-4 border-white shadow-sm" alt="User" />
                ))}
              </div>
              <div>
                <div className="flex text-yellow-400 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm font-bold text-slate-500">+12.400 alunas satisfeitas</p>
              </div>
            </div>
          </motion.div>

            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0,
                  y: [0, -15, 0]
                }}
                transition={{ 
                  opacity: { duration: 0.8 },
                  scale: { duration: 0.8 },
                  rotate: { duration: 0.8 },
                  y: { 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }
                }}
                className="relative z-10"
              >
                {/* The "Sim" Card from reference */}
                <div className="bg-white p-4 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] max-w-md mx-auto relative transform hover:rotate-1 transition-transform duration-500">
                  <div className="relative rounded-[2.5rem] overflow-hidden aspect-[5/3] shadow-inner">
                    <img 
                      src="https://i.ibb.co/jPYnRPVK/sim.jpg" 
                      alt="Prato Saudável" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80";
                      }}
                    />
                  </div>

                  <div className="mt-[-40px] relative z-20 bg-white rounded-[2rem] p-5 shadow-2xl border border-slate-50 flex items-center justify-between mx-4">
                    <div className="text-left">
                      <p className="text-[#00B5A5] font-black text-[10px] uppercase tracking-widest mb-1">PROMOÇÃO</p>
                      <h4 className="text-slate-800 font-black text-lg leading-tight">
                        De R$ 97,00 por <br />
                        <span className="text-slate-900">apenas</span>
                      </h4>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-[#00A859]">R$</span>
                      <span className="text-5xl font-black text-[#00A859] tracking-tighter">19,90</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-[#00B5A5]/20 to-[#F18A51]/20 rounded-full blur-[100px] -z-10"></div>
            </div>
          </div>
        </header>

      {/* Ciclo Vicioso Section */}
      <section id="metodo" className="py-24 bg-[#F8F8F8] px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Se hoje você vive <br />
              esse <span className="text-[#F18A51]">ciclo vicioso:</span>
            </h2>
          </motion.div>
          
          <div className="relative flex flex-col items-center justify-center min-h-[650px] mb-12">
            {/* Central Image - Using the user provided image */}
            <div className="relative z-20 w-64 h-64 md:w-80 md:h-80">
              <img 
                src="https://i.ibb.co/gFZsrhzW/Captura-de-Tela-2026-03-27-a-s-13-16-44.png" 
                alt="Ciclo Vicioso - Mulher Cansada" 
                className="w-full h-full rounded-full object-cover shadow-2xl border-8 border-white" 
                referrerPolicy="no-referrer" 
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>

            {/* Circular Items & Arrows - Desktop */}
            <div className="absolute inset-0 pointer-events-none hidden md:block">
              {/* Item 1: Top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center w-full">
                <span className="font-bold text-slate-800 text-xl">chega em casa exausta</span>
              </div>

              {/* Arrow 1: Top to Top-Right */}
              <svg className="absolute top-[5%] right-[25%] w-20 h-20" viewBox="0 0 100 100">
                <path d="M 10 30 Q 50 10 80 40" fill="none" stroke="#333" strokeWidth="1.5" />
                <path d="M 75 35 L 80 40 L 75 45" fill="none" stroke="#333" strokeWidth="1.5" />
              </svg>

              {/* Item 2: Top Right */}
              <div className="absolute top-[25%] right-0 text-left max-w-[200px]">
                <span className="font-bold text-slate-800 text-xl">não tem nada pronto <br /> pra comer</span>
              </div>

              {/* Arrow 2: Top-Right to Bottom-Right */}
              <svg className="absolute top-[50%] right-[5%] w-20 h-20" viewBox="0 0 100 100">
                <path d="M 30 10 Q 70 50 30 90" fill="none" stroke="#333" strokeWidth="1.5" />
                <path d="M 35 85 L 30 90 L 35 95" fill="none" stroke="#333" strokeWidth="1.5" />
              </svg>

              {/* Item 3: Bottom Right */}
              <div className="absolute bottom-[10%] right-[5%] text-left max-w-[220px]">
                <span className="font-bold text-slate-800 text-xl">faz um lanche rápido ou <br /> pede um Ifood</span>
              </div>

              {/* Arrow 3: Bottom-Right to Bottom-Left */}
              <svg className="absolute bottom-[0%] left-1/2 -translate-x-1/2 w-40 h-20" viewBox="0 0 200 100">
                <path d="M 180 20 Q 100 60 20 20" fill="none" stroke="#333" strokeWidth="1.5" />
                <path d="M 25 25 L 20 20 L 25 15" fill="none" stroke="#333" strokeWidth="1.5" />
              </svg>

              {/* Item 4: Bottom Left */}
              <div className="absolute bottom-[10%] left-[5%] text-right max-w-[220px]">
                <span className="font-bold text-slate-800 text-xl">não consegue ter uma <br /> alimentação saudável</span>
              </div>

              {/* Arrow 4: Bottom-Left to Top-Left */}
              <svg className="absolute top-[50%] left-[5%] w-20 h-20" viewBox="0 0 100 100">
                <path d="M 70 90 Q 30 50 70 10" fill="none" stroke="#333" strokeWidth="1.5" />
                <path d="M 65 15 L 70 10 L 65 5" fill="none" stroke="#333" strokeWidth="1.5" />
              </svg>

              {/* Item 5: Top Left */}
              <div className="absolute top-[25%] left-0 text-right max-w-[200px]">
                <span className="font-bold text-slate-800 text-xl">vive uma eterna luta <br /> contra a balança</span>
              </div>

              {/* Arrow 5: Top-Left to Top */}
              <svg className="absolute top-[5%] left-[25%] w-20 h-20" viewBox="0 0 100 100">
                <path d="M 20 40 Q 50 10 90 30" fill="none" stroke="#333" strokeWidth="1.5" />
                <path d="M 85 25 L 90 30 L 85 35" fill="none" stroke="#333" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Mobile List */}
            <div className="md:hidden flex flex-col gap-6 mt-8 text-center">
              <span className="font-bold text-slate-800 text-lg">chega em casa exausta</span>
              <span className="font-bold text-slate-800 text-lg">não tem nada pronto pra comer</span>
              <span className="font-bold text-slate-800 text-lg">faz um lanche rápido ou pede um Ifood</span>
              <span className="font-bold text-slate-800 text-lg">não consegue ter uma alimentação saudável</span>
              <span className="font-bold text-slate-800 text-lg">vive uma eterna luta contra a balança</span>
            </div>
          </div>

          {/* Orange Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-[#F18A51] rounded-full py-4 px-6 md:py-6 md:px-10 text-center text-white shadow-xl max-w-xl mx-auto"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-1">Isso não é culpa sua.</h3>
            <p className="text-sm md:text-base font-medium opacity-95">
              Falta um método prático que funcione <br className="hidden md:block" /> para sua rotina corrida.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Indispensable Section */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#00B5A5]/5 rounded-full blur-3xl -ml-32"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-[#00A859] leading-tight mb-4">
              Por que esse <span className="text-[#F18A51]">material é indispensável</span> <br /> para você?
            </h2>
            <p className="text-xl text-slate-500 font-bold max-w-2xl mx-auto">
              Entenda como ele vai transformar sua relação com a comida e seu tempo.
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-[3rem] p-8 md:p-16 border-2 border-yellow-200 shadow-2xl relative">
            <div className="absolute -top-6 -left-6 bg-[#F18A51] text-white p-4 rounded-2xl shadow-lg rotate-[-10deg] hidden md:block">
              <GiftIcon className="w-8 h-8" />
            </div>
            
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-4xl font-black text-slate-800 mb-6">
                Se você ainda sai de casa sem saber o que vai comer...
              </h3>
              <div className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg transform -rotate-1 mb-8">
                <p className="text-lg md:text-xl font-black uppercase tracking-tight">
                  está perdendo tempo, dinheiro e resultado físico
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-10 text-left">
                <div className="space-y-6 text-slate-700 font-bold text-lg leading-relaxed">
                  <p className="bg-white/50 p-6 rounded-2xl border border-white shadow-sm">
                    A alimentação é parte essencial da transformação corporal — mas a maioria das pessoas come qualquer coisa no almoço ou janta, e ainda acredita que comer saudável é caro ou complicado.
                  </p>
                </div>
                <div className="space-y-6 text-slate-700 font-bold text-lg leading-relaxed">
                  <p className="bg-white/50 p-6 rounded-2xl border border-white shadow-sm">
                    Enquanto isso, quem já adquiriu nosso material aprendeu a se organizar, economizar e ter uma rotina alimentar prática e eficiente — mesmo treinando, estudando ou trabalhando o dia todo.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-12 max-w-2xl mx-auto">
              {[
                "Mais de 75 receitas criativas",
                "Deliciosas, Rápidas e Prontas em minutos",
                "Economia Garantida no supermercado"
              ].map((item, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl shadow-md border-l-8 border-[#00A859] flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#00A859] shrink-0" />
                  <span className="text-slate-800 font-black text-lg">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <a href="#oferta" className="inline-flex items-center gap-3 bg-[#F18A51] text-white px-10 py-5 rounded-full font-black text-xl shadow-2xl hover:bg-[#d97a45] transition-all transform hover:scale-105 uppercase tracking-tight">
                <ShoppingBasket className="w-6 h-6" />
                QUERO AS RECEITAS!
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TikTok Style Section */}
      <section className="py-24 px-4 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B5A5]/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F18A51]/10 rounded-full blur-3xl -ml-48 -mb-48"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#00B5A5] text-white px-4 py-2 rounded-full text-xs font-black mb-6 uppercase tracking-widest">
                <PlayCircle className="w-4 h-4" />
                O Fim das Receitas Chatas
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                Sem receitas chatas <br />
                de 15 minutos...
              </h2>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed font-medium">
                Aqui é tudo <span className="text-white font-black">rápido e direto ao ponto</span>. Esqueça vídeos longos e cansativos. Nosso material conta com vídeos em formato <span className="text-[#00B5A5] font-black italic">TikTok Style</span>: rápidos, dinâmicos e que você assiste em segundos!
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <Clock className="w-8 h-8 text-[#F18A51] mb-4" />
                  <h4 className="font-black text-lg mb-2">Preparo Express</h4>
                  <p className="text-sm text-slate-400">Receitas prontas em menos tempo do que você leva pra pedir um delivery.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <PlayCircle className="w-8 h-8 text-[#00B5A5] mb-4" />
                  <h4 className="font-black text-lg mb-2">Vídeos Curtos</h4>
                  <p className="text-sm text-slate-400">Formato dinâmico que vai direto ao que interessa, sem enrolação.</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[9/16] max-w-[320px] mx-auto bg-slate-800 rounded-[3rem] border-[10px] border-slate-700 shadow-2xl overflow-hidden relative group">
                <img 
                  src="https://i.ibb.co/ymRZzGNF/receita.png" 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                  alt="Marmitas da Semana TikTok"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=600&q=80";
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/50 group-hover:scale-125 transition-transform mb-4">
                    <PlayCircle className="w-10 h-10 text-white fill-current" />
                  </div>
                  <div className="bg-white/90 text-slate-900 px-4 py-2 rounded-lg font-black text-sm shadow-xl transform -rotate-2 group-hover:rotate-0 transition-transform">
                    25 MARMITAS CHECK! ✅
                  </div>
                </div>
                <div className="absolute bottom-8 left-0 w-full px-6">
                  <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="h-full w-1/3 bg-[#00B5A5]"
                    />
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#F18A51] rounded-2xl rotate-12 -z-10 shadow-xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#00B5A5] rounded-full -z-10 shadow-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Recipes Preview */}
      <section id="receitas" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-16">
            O que você vai <span className="text-[#00B5A5]">Receber:</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {recipes.map((recipe, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-50 group flex flex-col"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img 
                    src={recipe.img} 
                    alt={recipe.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1 text-center">
                  <h3 className="font-bold text-slate-800 mb-3 leading-tight text-base flex-1">{recipe.name}</h3>
                  <div className="flex items-center justify-center gap-1 text-[#F18A51] font-bold text-sm">
                    <Flame className="w-4 h-4 fill-current" />
                    {recipe.cal} calorias
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-[3rem] p-8 md:p-12 text-center border-2 border-[#F18A51] shadow-xl max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#F18A51]"></div>
            <h3 className="text-4xl md:text-5xl font-black text-[#F18A51] mb-4">E muito mais...</h3>
            <p className="text-slate-700 font-bold text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Receitas acessíveis, saudáveis e feitas para ajudar você a secar ou ganhar massa com praticidade.
            </p>
            <a href="#oferta" className="inline-flex items-center gap-3 bg-[#00A859] text-white px-10 py-5 rounded-full font-black text-xl shadow-2xl hover:bg-[#008f4c] transition-all transform hover:scale-105 uppercase tracking-tight">
              <div className="bg-white/20 p-1 rounded-full">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              QUERO AS RECEITAS!
            </a>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-4 bg-slate-50 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-center mb-20 tracking-tighter leading-none"
          >
            Esse é o <span className="text-[#00B5A5]">resumo</span> da sua vida:
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-start relative">
            {/* Bad Side */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="bg-[#FF5722] text-white px-8 py-4 rounded-t-[2rem] font-black text-xl inline-flex items-center gap-3 relative z-10 -mb-1 ml-6 shadow-lg">
                <X className="w-6 h-6 stroke-[3px]" /> Cozinhando Sozinha
              </div>
              <div className="bg-white rounded-[2.5rem] p-10 md:p-12 shadow-2xl border border-slate-100 relative group hover:border-red-100 transition-colors">
                <ul className="space-y-8">
                  {[
                    "Sempre joga comida fora porque estragou na geladeira",
                    "Gasta rios de dinheiro no IFood",
                    "Precisa cozinhar cansada todo dia",
                    "Pilhas de louça para lavar todos os dias",
                    "Enjoada de comer sempre a mesma comida"
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-5"
                    >
                      <div className="bg-[#FF5722] rounded-full p-1.5 mt-1 shrink-0 shadow-md">
                        <X className="w-4 h-4 text-white stroke-[4px]" />
                      </div>
                      <span className="text-slate-600 font-bold text-xl leading-tight">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Good Side */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="bg-[#00A859] text-white px-8 py-4 rounded-t-[2rem] font-black text-xl inline-flex items-center gap-3 relative z-10 -mb-1 ml-6 shadow-lg">
                <CheckCircle2 className="w-6 h-6" /> Cozinhando com o 75 Receitas Fitness
              </div>
              <div className="bg-white rounded-[2.5rem] p-10 md:p-12 shadow-2xl border-4 border-[#00A859]/20 relative group hover:border-[#00A859]/40 transition-colors">
                <ul className="space-y-8">
                  {[
                    "Comida saudável e organizada sempre pronta",
                    "Economiza dinheiro em todo fim de mês",
                    "Cozinha a cada 15 dias em apenas 2 horas",
                    "Cozinha sempre limpa e organizada",
                    "Cada dia come um prato diferente"
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-5"
                    >
                      <div className="bg-[#00A859] rounded-full p-1.5 mt-1 shrink-0 shadow-md">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-slate-900 font-black text-xl leading-tight">{item}</span>
                    </motion.li>
                  ))}
                  <motion.li 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-start gap-5"
                  >
                    <div className="bg-[#00A859] rounded-full p-1.5 mt-1 shrink-0 shadow-md">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[#00A859] font-black text-xl leading-tight">Mais tempo livre para você!</span>
                  </motion.li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-16 text-[#F18A51] leading-tight">
            Bônus que você recebe ao adquirir hoje:
          </h2>

          <div className="space-y-6">
            {bonuses.map((bonus, i) => (
              <motion.div 
                key={bonus.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="bg-[#FF5722] rounded-3xl p-4 md:p-6 shadow-xl relative group flex flex-col md:flex-row items-center gap-6"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl overflow-hidden shrink-0 shadow-lg border-4 border-white/20">
                  <img 
                    src={bonus.img} 
                    alt={bonus.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                </div>
                <div className="flex-1 text-center md:text-left text-white">
                  <h3 className="text-xl md:text-2xl font-black mb-2 leading-tight">Bônus {bonus.id} – {bonus.title}</h3>
                  <p className="text-white/90 font-bold text-sm md:text-base mb-4">{bonus.desc}</p>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <span className="text-white/60 line-through font-black text-lg">{bonus.oldPrice}</span>
                    <span className="bg-[#00A859] text-white px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg border-2 border-white/20">
                      GRÁTIS HOJE
                    </span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 text-white/20">
                  <GiftIcon className="w-8 h-8 md:w-12 md:h-12" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - FIXED LAYOUT */}
      <section id="oferta" className="py-32 bg-[#F8F8F8] px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">Escolha seu Plano</h2>
            <p className="text-xl text-slate-600">Comece sua transformação hoje mesmo com o melhor custo-benefício.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch pt-32 overflow-visible">
            {/* Basic Offer */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-xl border-2 border-slate-100 relative flex flex-col transition-all group"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00B5A5] text-white px-6 py-1 rounded-full text-sm font-black uppercase tracking-widest shadow-lg z-20">
                OFERTA BÁSICA
              </div>
              <div className="text-center mb-8 pt-6">
                <h3 className="text-3xl font-black text-[#00B5A5] mb-2">+ de 75 Receitas Variadas</h3>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  "Receitas Fitness (divididas entre secar e ganhar massa)",
                  "Lista de compras",
                  "Cronograma alimentar",
                  "Acesso vitalício",
                  "Entrega imediata por e-mail"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#00B5A5] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-600 font-bold">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-slate-400 line-through text-xl font-bold">R$ 97</span>
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-md font-black">-83%</span>
                </div>
                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2.5,
                    ease: "easeInOut"
                  }}
                >
                  <p className="text-6xl font-black text-[#00B5A5] mb-6">R$ 19,90</p>
                </motion.div>
                <motion.a 
                  href="https://pay.cakto.com.br/3fciqct_812449"
                  whileHover={{ scale: 1.05, backgroundColor: "#009e91" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-[#00B5A5] text-white py-5 rounded-2xl font-black text-xl shadow-lg shadow-teal-100 transition-all uppercase flex items-center justify-center"
                >
                  Comprar Agora!
                </motion.a>
              </div>
            </motion.div>

            {/* Premium Offer */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-2xl border-4 border-[#F18A51] relative flex flex-col transition-all group"
            >
              <div className="absolute -top-6 -right-2 z-30">
                <div className="bg-[#FF4444] text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-2 transform rotate-3">
                  <Star className="w-3 h-3 fill-current" />
                  MAIS POPULAR
                </div>
              </div>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F18A51] text-white px-6 py-1 rounded-full text-sm font-black uppercase tracking-widest shadow-lg z-20">
                SUPER OFERTA
              </div>
              <div className="text-center mb-8 pt-6">
                <h3 className="text-3xl font-black text-[#F18A51] mb-2">+ de 75 Receitas Variadas</h3>
                <p className="text-[#F18A51] font-black text-sm uppercase tracking-tighter bg-orange-50 inline-block px-3 py-1 rounded-full">COMPLETO</p>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  "Receitas Fitness (divididas entre secar e ganhar massa)",
                  "Lista de compras",
                  "Cronograma alimentar",
                  "Acesso vitalício + Atualizações",
                  "Entrega imediata por e-mail",
                  "Todos os Bônus Inclusos"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#F18A51] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700 font-bold">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-slate-400 line-through text-xl font-bold">R$ 147</span>
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-md font-black">-81%</span>
                </div>
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    scale: [1, 1.15, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                >
                  <p className="text-7xl font-black text-[#F18A51] mb-6 drop-shadow-md">R$ 27,90</p>
                </motion.div>
                <motion.a 
                  href="https://pay.cakto.com.br/7gyurer"
                  whileHover={{ scale: 1.05, backgroundColor: "#d97a45" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-[#F18A51] text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-orange-200 transition-all uppercase flex items-center justify-center"
                >
                  Levar Tudo!
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-16">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-800 hover:bg-teal-50/50 transition-colors"
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 transition-transform text-[#00B5A5] ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-8 md:p-12 max-w-2xl w-full relative overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setShowExitPopup(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-full text-sm font-black mb-6 uppercase tracking-widest">
                  <Flame className="w-4 h-4 fill-current" />
                  ESPERA! NÃO VÁ EMBORA AINDA...
                </div>
                
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                  Você vai mesmo continuar <br />
                  <span className="text-red-500">gastando tempo e dinheiro</span> <br />
                  cozinhando todo dia?
                </h2>

                <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                  Liberamos uma <span className="font-black text-slate-900">condição única e secreta</span> para você não desistir da sua saúde hoje. 
                  Sua última chance de ter o método completo por um preço ridículo.
                </p>

                <div className="bg-slate-50 rounded-3xl p-8 mb-10 border-2 border-dashed border-slate-200">
                  <p className="text-slate-500 font-bold mb-2 uppercase tracking-widest text-sm">OFERTA DE DESPEDIDA</p>
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <span className="text-slate-400 line-through text-2xl font-bold">R$ 97,00</span>
                    <ArrowRight className="text-slate-300" />
                    <span className="text-5xl md:text-7xl font-black text-[#00A859]">R$ 14,90</span>
                  </div>
                  <p className="text-[#00A859] font-black">PAGAMENTO ÚNICO • ACESSO IMEDIATO</p>
                </div>

                <div className="flex flex-col gap-4">
                  <motion.a 
                    href="https://pay.cakto.com.br/sdrs3to"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#00A859] text-white py-6 rounded-2xl font-black text-2xl shadow-xl shadow-green-100 transition-all uppercase flex items-center justify-center gap-3"
                  >
                    SIM! QUERO ESSA OFERTA AGORA
                    <ArrowRight className="w-6 h-6" />
                  </motion.a>
                  <button 
                    onClick={() => setShowExitPopup(false)}
                    className="text-slate-400 font-bold hover:text-slate-600 transition-colors underline underline-offset-4"
                  >
                    Não, prefiro continuar perdendo tempo na cozinha
                  </button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-teal-50 rounded-full blur-3xl opacity-50 -z-10"></div>
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-50 rounded-full blur-3xl opacity-50 -z-10"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#00B5A5] rounded-xl flex items-center justify-center">
                <UtensilsCrossed className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter">75 RECEITAS <span className="text-[#00B5A5]">FITNESS</span></span>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Transformando vidas através da alimentação prática e acessível. Junte-se a mais de 12 mil pessoas que mudaram sua rotina.
            </p>
          </div>
          <div>
            <h4 className="font-black text-xl mb-6">Links Úteis</h4>
            <ul className="space-y-4 text-slate-400 font-bold">
              <li><a href="#" className="hover:text-[#00B5A5] transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-[#00B5A5] transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-[#00B5A5] transition-colors">Suporte</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xl mb-6">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-[#00B5A5] transition-all">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-[#00B5A5] transition-all">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-[#00B5A5] transition-all">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 text-center text-slate-500 text-sm font-bold">
          <p>© 2024 75 Receitas Fitness. Todos os direitos reservados. Este site não é afiliado ao Facebook ou Google.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="#"
        className="fixed bottom-6 right-6 bg-[#4CAF50] text-white p-4 rounded-full shadow-2xl hover:bg-[#43a047] transition-all transform hover:scale-110 z-40 flex items-center justify-center"
      >
        <MessageCircle className="w-8 h-8" />
      </a>
    </div>
  );
}
