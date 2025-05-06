import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function LoveCard() {
  const [isMobile, setIsMobile] = useState(false);
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [loveTaps, setLoveTaps] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMemory, setActiveMemory] = useState(0);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Efeito de carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Detecção de dispositivo
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        document.body.style.overflowX = 'hidden';
        document.body.style.touchAction = 'manipulation';
      }
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Contador de tempo com marcos especiais
  useEffect(() => {
    const calculateTime = () => {
      const startDate = new Date("2025-04-26");
      const now = new Date();
      const diff = now - startDate;
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeTogether({ days, hours, minutes, seconds });
      
      // Efeito especial em marcos
      if ([7, 30, 100, 365].includes(days)) {
        setShowHearts(true);
        setTimeout(() => setShowHearts(false), 3000);
      }
    };
    
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Efeito parallax para o vídeo
  useEffect(() => {
    if (!isMobile) {
      const handleScroll = () => {
        if (videoRef.current) {
          const scrollPosition = window.pageYOffset;
          videoRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile]);

  // Memórias personalizadas
  const memories = [
    {
      id: 1,
      image: "src/assets/fotofoto1.jpg",
      date: "26/04/2025",
      title: "Nosso Primeiro Dia",
      description: "O dia em que tudo começou"
    },
    {
      id: 2,
      image: "src/assets/foto1.jpg",
      date: "02/05/2025",
      title: "Primeira vez que te vi e você tava uma delicia",
      description: "Dia da do Until Down e barulhos suspeitos"
    },

    {
      id: 3,
      image: "src/assets/abugi.jpg",
      date: "02/05/2025",
      title: "Hmmm abugi deu ate fome agora",
      description: "O lanche todo erado pq o bk era pobre pqp"
    },

    {
      id: 4,
      image: "src/assets/tadinho.png",
      date: "02/05/2025",
      title: "Eu fico assim quando você me manda mensagem",
      description: "Amo quando você me manda mensagem, mesmo que seja só um 'oi'",
    }
  ];

  // Configurações premium do carrossel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: !isMobile,
    arrows: !isMobile,
    fade: true,
    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    customPaging: i => (
      <div className={`w-3 h-1 rounded-full transition-all duration-500 ${i === activeMemory ? 'bg-pink-600 w-8' : 'bg-pink-300'}`} />
    ),
    appendDots: dots => (
      <div className="pb-4">
        <ul className="m-0 p-0 flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    beforeChange: (current, next) => {
      setActiveMemory(next);
      if (containerRef.current) {
        containerRef.current.classList.add('animate-pulse');
        setTimeout(() => {
          containerRef.current?.classList.remove('animate-pulse');
        }, 300);
      }
    }
  };

  // Efeito de corações premium
  const handleLoveTap = () => {
    setLoveTaps(prev => prev + 1);
    setShowHearts(true);
    
    setTimeout(() => setShowHearts(false), 2500);
  };

  // Mensagens românticas
  const romanticMessages = [
    { days: 0, message: "Nosso amor está apenas começando..." },
    { days: 7, message: "Uma semana de pura felicidade!" },
    { days: 30, message: "Um mês de momentos inesquecíveis!" },
    { days: 100, message: "Cada dia contigo é um presente!" },
    { days: 365, message: "Um ano de amor e cumplicidade!" }
  ];

  const getRomanticMessage = () => {
    const sorted = [...romanticMessages].sort((a, b) => b.days - a.days);
    const found = sorted.find(msg => timeTogether.days >= msg.days);
    return found ? found.message : "Você é o melhor que já me aconteceu!";
  };

  // Progresso do ano
  const yearProgress = Math.min((timeTogether.days / 365) * 100, 100);

  // Tela de loading premium
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-pink-100 to-rose-100 flex flex-col items-center justify-center z-50">
        <div className="relative w-32 h-32 mb-6">
          <div 
            className="absolute inset-0 border-4 border-pink-300 border-t-pink-600 rounded-full animate-spin"
            style={{ animationDuration: '1.5s' }}
          ></div>
          <div className="absolute inset-4 flex items-center justify-center">
            <div 
              className="text-5xl text-pink-600 animate-pulse"
              style={{ animationDuration: '2s' }}
            >
              ❤️
            </div>
          </div>
        </div>
        <p className="text-pink-700 font-medium text-lg">Preparando uma surpresa especial...</p>
        <p className="text-pink-500 text-sm mt-2">Isso vai valer a pena, prometo!</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen pb-12 px-4 overflow-x-hidden bg-gradient-to-b from-pink-50 via-white to-pink-50"
      style={{
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        fontFamily: "'Poppins', sans-serif"
      }}
    >
      {/* Estilos globais inline */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@400;500;700&display=swap');
          
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-80vh) rotate(360deg); opacity: 0; }
          }
          @keyframes confetti-fall {
            0% { transform: translateY(-100vh) rotate(0deg); }
            100% { transform: translateY(100vh) rotate(360deg); }
          }
          .touch-feedback {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .touch-feedback:active {
            transform: scale(0.97);
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          @media (hover: hover) {
            .touch-feedback:hover {
              transform: translateY(-2px);
              box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
          }
          .font-playfair {
            font-family: 'Playfair Display', serif;
          }
          @supports (-webkit-touch-callout: none) {
            body, .min-h-screen {
              min-height: -webkit-fill-available;
            }
          }
        `}
      </style>

      {/* Efeito de corações */}
      {showHearts && [...Array(isMobile ? 15 : 25)].map((_, i) => (
        <div
          key={i}
          className="fixed text-pink-400 animate-float pointer-events-none z-30"
          style={{
            fontSize: `${Math.random() * 24 + 16}px`,
            left: `${Math.random() * 100}%`,
            bottom: '10%',
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 0.5}s`,
            textShadow: '0 0 8px rgba(255,255,255,0.7)',
            opacity: 0.9,
            zIndex: 30,
          }}
        >
          {['❤', '💖', '💘', '✨', '🌟'][Math.floor(Math.random() * 5)]}
        </div>
      ))}

      {/* Seção Hero com Vídeo Parallax */}
      <div className="relative h-[90vh] min-h-[600px] overflow-hidden touch-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-105"
          poster="/images/video-poster-mobile.jpg"
          style={{ transition: 'transform 0.5s ease-out' }}
        >
          <source src="/videos/love-video.mp4" type="video/mp4" />
          <source src="/videos/love-video.webm" type="video/webm" />
        </video>
        
        <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center z-10 p-4">
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-4 leading-tight px-2">
            Esse site é só o começo
          </h1>
          <p className="text-lg sm:text-xl text-pink-100 text-center max-w-md px-4">
            "Um código feito com carinho, pensando na nossa história."
          </p>
          
          <button 
            onClick={handleLoveTap}
            className={`mt-8 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-bold shadow-lg transform transition-all duration-300 active:scale-95 active:shadow-md touch-feedback ${
              loveTaps > 0 ? 'animate-pulse' : ''
            }`}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {loveTaps > 0 ? `Eu Te Amo ×${loveTaps}` : 'Toque Aqui ❤️'}
          </button>
        </div>
        
        {!isMobile && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
            <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        )}
      </div>

      {/* Seção de Memórias */}
      <div className="mx-auto max-w-md mt-8 px-1">
        <h2 className="font-playfair text-3xl text-center text-pink-700 font-bold mb-6 px-4">
          Nossas Memórias
        </h2>
        
        <Slider {...sliderSettings}>
          {memories.map((memory, index) => (
            <div key={memory.id} className="px-1 outline-none">
              <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-white/40 active:scale-95 transition-transform duration-200 touch-feedback">
                <div className="relative" style={{ paddingTop: '125%' }}>
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    loading={index < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5">
                  <p className="text-xs text-pink-200 font-medium">{memory.date}</p>
                  <h3 className="font-playfair text-white text-xl font-bold mt-1">{memory.title}</h3>
                  <p className="text-pink-100 text-sm mt-1">{memory.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Mensagem Romântica Interativa */}
      <div 
        className="bg-white/95 mx-auto mt-10 p-6 rounded-xl shadow-sm max-w-md border border-pink-100/70 transform transition-all duration-300 active:scale-[0.98] touch-feedback"
        style={{ touchAction: 'manipulation' }}
      >
        <p className="text-gray-700 text-center text-lg leading-relaxed">
          "Se eu pudesse te dar uma coisa na vida, te daria a capacidade de se ver pelos meus olhos. 
          <span className="block mt-3 text-pink-600 font-medium">Só assim entenderia a dádiva que é te ter na minha vida.</span>"
        </p>
      </div>

      {/* Contador de Tempo Premium */}
      <div className="bg-gradient-to-br from-pink-100/80 via-white to-rose-100/80 mx-auto mt-10 p-6 rounded-2xl shadow-inner max-w-md border border-pink-200/50">
        <h2 className="font-playfair text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 font-bold mb-6">
          Nosso Tempo
        </h2>
        
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: timeTogether.days, label: "Dias", color: "from-pink-400 to-pink-500" },
            { value: timeTogether.hours, label: "Horas", color: "from-rose-400 to-rose-500" },
            { value: timeTogether.minutes, label: "Minutos", color: "from-purple-400 to-purple-500" },
            { value: timeTogether.seconds, label: "Segundos", color: "from-red-400 to-red-500" }
          ].map((item, i) => (
            <div 
              key={i} 
              className="bg-white/90 rounded-xl p-3 text-center shadow-sm border border-pink-100/50 active:scale-95 transition-transform touch-feedback"
            >
              <div className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br ${item.color}`}>
                {item.value}
              </div>
              <div className="text-xs text-pink-600 mt-1 font-medium tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 px-4">
          <div className="h-2 bg-white/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-purple-500 rounded-full"
              style={{ width: `${yearProgress}%`, transition: 'width 0.5s ease' }}
            ></div>
          </div>
          <p className="text-center text-xs text-pink-600 mt-2">
            {yearProgress.toFixed(1)}% de um ano juntos!
          </p>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-pink-600/90 text-sm italic px-4">
            {getRomanticMessage()}
          </p>
        </div>
      </div>

      {/* Seção de Promessas */}
      <div className="mx-auto mt-10 max-w-md px-4">
        <h2 className="font-playfair text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 font-bold mb-6">
          Minhas Promessas
        </h2>
        
        <div className="space-y-3">
          {[
            { icon: "❤️", text: "Amar você mais a cada dia que passar" },
            { icon: "🤗", text: "Ser seu abraço quando o mundo for frio" },
            { icon: "🤝", text: "Apoiar cada sonho seu incondicionalmente" },
            { icon: "😊", text: "Fazer seus olhos brilharem todos os dias" },
            { icon: "🤲", text: "Cuidar do nosso amor como o maior tesouro" }
          ].map((promise, i) => (
            <div 
              key={i}
              className="bg-white/95 p-4 rounded-xl border border-pink-100/70 shadow-sm flex items-start active:scale-[0.98] transition-transform touch-feedback"
              style={{ touchAction: 'manipulation' }}
            >
              <span className="text-2xl mr-3 mt-0.5">{promise.icon}</span>
              <p className="text-gray-700 flex-1">{promise.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rodapé Especial */}
      <div className="mt-12 text-center px-4">
        <button 
          onClick={handleLoveTap}
          className={`bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-4 rounded-full font-bold shadow-xl transition-all duration-300 active:scale-95 touch-feedback ${
            loveTaps > 0 ? 'animate-pulse' : ''
          }`}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {loveTaps > 0 ? `Eu Te Amo ×${loveTaps}` : 'Eu Te Amo!'}
        </button>
        
        <p className="text-xs text-pink-400/90 mt-6">
          Feito com todo o amor do meu coração para você
        </p>
        
        <div className="flex justify-center space-x-4 mt-4">
          {['❤️', '💖', '💞', '💘'].map((icon, i) => (
            <span 
              key={i} 
              className="text-xl opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300"
              style={{ display: 'inline-block' }}
            >
              {icon}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}