import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fontsource/playfair-display";
import "@fontsource/roboto";

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

  // Detecta se é mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Calcula o tempo juntos
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
    };
    
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Memórias para o carrossel
  const memories = [
    {
      id: 1,
      image: "/src/assets/foto.jpg",
      date: "02/05/2025",
      title: "Nosso Primeiro Dia",
      description: "O dia que mudou tudo"
    },
    {
      id: 2,
      image: "/src/assets/foto2.jpg",
      date: "15/05/2025",
      title: "Primeiro Passeio",
      description: "Diversão e risadas juntos"
    },
    {
      id: 3,
      image: "/src/assets/foto3.jpg",
      date: "20/06/2025",
      title: "Momentos Especiais",
      description: "Cada instante é único"
    }
  ];

  // Configurações do carrossel otimizadas para mobile
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    arrows: !isMobile,
    adaptiveHeight: true,
    customPaging: i => (
      <div className="w-2 h-2 rounded-full bg-pink-300 opacity-50" />
    ),
    appendDots: dots => (
      <div className="pb-6">
        <ul className="m-0 p-0 flex justify-center">{dots}</ul>
      </div>
    )
  };

  // Efeito de corações ao tocar no botão
  const handleLoveTap = () => {
    setLoveTaps(prev => prev + 1);
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 2000);
  };

  return (
    <div className="font-roboto bg-gradient-to-b from-pink-50 to-white min-h-screen pb-10 px-4">
      {/* Efeito de corações */}
      {showHearts && [...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute text-pink-400 animate-float pointer-events-none"
          style={{
            fontSize: `${Math.random() * 24 + 16}px`,
            top: '110%',
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        >
          {['❤', '💖', '💘', '💝'][Math.floor(Math.random() * 4)]}
        </div>
      ))}

      {/* Cabeçalho */}
      <div className="pt-8 pb-6 text-center">
        <h1 className="font-playfair text-4xl font-bold text-pink-600 mb-2">
          Para Cindy 💖
        </h1>
        <p className="text-pink-500">
          Cada dia ao seu lado é um presente
        </p>
      </div>

      {/* Carrossel otimizado para mobile */}
      <div className="mx-auto max-w-md">
        <Slider {...sliderSettings}>
          {memories.map(memory => (
            <div key={memory.id} className="px-2 outline-none focus:outline-none">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                {/* Imagem com altura proporcional à tela */}
                <div className="relative" style={{ paddingTop: '125%' }}>
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-xs text-pink-200">{memory.date}</p>
                  <h3 className="font-playfair text-white text-lg font-bold">{memory.title}</h3>
                  <p className="text-pink-100 text-sm">{memory.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Mensagem central */}
      <div className="bg-white/90 mx-auto mt-8 p-6 rounded-xl shadow-md max-w-md border border-pink-100">
        <p className="text-gray-700 italic text-center">
          "Se eu pudesse te dar uma coisa na vida, te daria a capacidade de se
          ver pelos meus olhos — só assim você entenderia o quanto é especial
          pra mim."
        </p>
      </div>

      {/* Contador de tempo - versão mobile */}
      <div className="mt-8 bg-gradient-to-r from-pink-100 to-rose-100 mx-auto p-5 rounded-xl shadow-md max-w-md">
        <h3 className="font-playfair text-center text-pink-700 font-bold text-xl mb-4">
          Nosso Tempo Juntos
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/80 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-pink-600">{timeTogether.days}</div>
            <div className="text-xs text-pink-500">DIAS</div>
          </div>
          <div className="bg-white/80 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-pink-600">{timeTogether.hours}</div>
            <div className="text-xs text-pink-500">HORAS</div>
          </div>
          <div className="bg-white/80 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-pink-600">{timeTogether.minutes}</div>
            <div className="text-xs text-pink-500">MINUTOS</div>
          </div>
          <div className="bg-white/80 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-pink-600">{timeTogether.seconds}</div>
            <div className="text-xs text-pink-500">SEGUNDOS</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="h-2 bg-white rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-400 to-rose-500" 
              style={{ width: `${Math.min(timeTogether.days/365*100, 100)}%` }}
            />
          </div>
          <p className="text-center text-xs text-pink-600 mt-1">
            {((timeTogether.days/365)*100).toFixed(1)}% de um ano juntos!
          </p>
        </div>
      </div>

      {/* Promessas - versão mobile */}
      <div className="mt-8 mx-auto max-w-md">
        <h3 className="font-playfair text-center text-pink-700 font-bold text-xl mb-4">
          Minhas Promessas
        </h3>
        
        <div className="space-y-3">
          {[
            "Sempre te fazer sorrir",
            "Te apoiar em todos os sonhos",
            "Valorizar cada momento juntos",
            "Ser seu porto seguro",
            "Amar você mais a cada dia"
          ].map((promise, i) => (
            <div 
              key={i} 
              className="bg-white/90 p-4 rounded-lg border border-pink-200 shadow-sm flex items-start"
            >
              <span className="text-pink-400 mr-3">❤️</span>
              <p className="text-gray-700">{promise}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rodapé especial */}
      <div className="mt-10 text-center">
        <button 
          onClick={handleLoveTap}
          className={`bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all ${
            loveTaps > 0 ? 'animate-pulse' : ''
          }`}
        >
          {loveTaps > 0 ? `Delicia ×${loveTaps}` : 'Clica aqui!'}
        </button>
        <p className="text-xs text-pink-400 mt-4">
          Feito com carinho para você
        </p>
      </div>

      {/* Estilos CSS */}
      <style jsx global>{`
        @keyframes float {
          to {
            transform: translateY(-100vh) rotate(360deg);
          }
        }
        .animate-float {
          animation: float linear forwards;
        }
        
        /* Otimizações para iOS */
        .slick-dots li {
          width: 10px;
          height: 10px;
          margin: 0 4px;
        }
        
        /* Melhora a visualização em iPhones */
        @media (max-width: 768px) {
          .slick-slide {
            padding: 0 5px;
          }
          
          /* Garante que as imagens não ultrapassem a largura */
          img {
            max-width: 100%;
            height: auto;
          }
        }
      `}</style>
    </div>
  );
}