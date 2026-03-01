import React, { useState, useEffect } from 'react';
import { Heart, Calendar as CalendarIcon, MapPin, Home, Users, Star, ArrowRight, Sparkles } from 'lucide-react';

const App = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [showAnniversaryEffect, setShowAnniversaryEffect] = useState(false);

  // Mensagens personalizadas para cada dia de Março
  const messages = {
    1: "Março começou! Um novo mês para te amar ainda mais. Hoje o dia é nosso, mesmo com a distância. ☀️",
    2: "FELIZ 1 MÊS DE NAMORO! 💍 O melhor mês da minha vida. O primeiro de uma eternidade. Te amo, minha noiva!",
    3: "Acordar sabendo que sou seu é o que me dá forças aqui em Agricolândia. Bom dia, minha princesa. ❤️",
    4: "Se o caixa estiver cheio hoje, respira fundo. Pensa no nosso futuro lar, sem filas, só nós dois. 🏠",
    5: "Brasília parece longe no mapa, mas no meu coração você está a um batimento de distância. 📍",
    6: "Prometo te fazer a mulher mais feliz do mundo. Cada esforço meu é por nós. 🌟",
    7: "Sábado de saudade. Queria estar aí para te fazer uma massagem depois do trabalho. 💆‍♀️",
    8: "Dia da Mulher. E eu tenho a mulher mais incrível, guerreira e linda do universo ao meu lado. 🌹",
    9: "Planejar nossa família com você é o meu sonho favorito. Imagina nossos pequenos? 👨‍👩‍👧‍👦",
    10: "Você é o meu 'sim' para todas as perguntas da vida. Nunca duvide do meu amor. ✔️❤️",
    11: "O cansaço do trabalho passa, mas o meu cuidado por você só aumenta. Descansa, meu amor. 🌙",
    12: "Contando as moedas e os dias para o nosso próximo encontro.",
    13: "Sexta-feira! Que sua jornada no caixa voe para você vir logo pros meus braços (mesmo que por vídeo). 🎥",
    14: "Dormir pensando no dia em que nossa rotina será acordar e tomar café juntos na nossa casa. ☕",
    15: "Domingo de paz. Você é o meu descanso, Hadalia. Minha paz em meio ao caos. 🕊️",
    16: "Mais uma semana começando. Estarei aqui para te apoiar em cada minuto, não esquece. 🤝",
    17: "Seu sorriso é o meu combustível. Sorria hoje, mesmo que o dia seja difícil. 😊",
    18: "Agricolândia é pequena demais para o tamanho do amor que sinto por você. 🌎❤️",
    19: "Quero cuidar de você para sempre. Na saúde, na doença e no cansaço pós-expediente. 🩹",
    20: "Faltam poucos dias para completarmos mais semanas de pura felicidade. Obrigado por existir. ✨",
    21: "Final de semana chegou! Momento de esquecer os problemas e focar no nosso amor. 🥂",
    22: "Você não é apenas minha namorada, é minha futura esposa e mãe dos meus filhos. 💍",
    23: "Segunda-feira pesada? Fecha os olhos e sente o meu abraço te apertando daí. 🤗",
    24: "Vou fazer de tudo por você. Você merece o mundo, e eu vou tentar te dar ele. 🌍",
    25: "Minha motivação diária: Construir nossa vida juntos. Falta pouco para o nosso 'nós'. 🔨❤️",
    26: "Operadora de caixa mais linda do mundo. O mercado tem sorte de ter esse sorriso lá. 🛒",
    27: "O 'para sempre' é muito tempo? Para mim, parece pouco para o quanto quero te amar. ♾️",
    28: "Sábado de planos. Onde vamos morar? Como será nossa sala? Amo sonhar com você. 🛋️",
    29: "O amor vence a distância. Brasília e Agricolândia nunca estiveram tão perto. 🗺️",
    30: "Reta final de Março. Mais um mês vencido com muito amor e fidelidade. 🏆",
    31: "Terminando o mês com a mesma certeza do primeiro dia: É VOCÊ. Ontem, hoje e sempre. 💍❤️"
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  useEffect(() => {
    // Efeito especial para o aniversário de 1 mês
    if (selectedDay === 2) {
      setShowAnniversaryEffect(true);
      const timer = setTimeout(() => setShowAnniversaryEffect(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [selectedDay]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 md:p-8 font-sans selection:bg-pink-500/30">
      {/* Background Decorativo com Blur */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600 rounded-full blur-[120px]" />
      </div>

      <main className="max-w-4xl mx-auto relative z-10">
        {/* Cabeçalho do Calendário */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
            <CalendarIcon className="w-4 h-4 text-pink-500" />
            <span className="text-xs uppercase tracking-widest text-neutral-400">Março 2026</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-white to-amber-500 mb-4">
            31 Dias de Nós
          </h1>
          <p className="text-neutral-400 max-w-lg mx-auto italic">
            "De Agricolândia para Brasília: um calendário feito de promessas, cuidado e o sonho da nossa família."
          </p>
        </header>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Grade do Calendário */}
          <div className="md:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {weekDays.map(day => (
                <div key={day} className="text-center text-[10px] uppercase tracking-tighter text-neutral-500 font-bold py-2">
                  {day}
                </div>
              ))}
              {/* O mês de Março de 2026 começa num Domingo (dia 1) */}
              {days.map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`
                    relative aspect-square rounded-xl text-sm font-medium transition-all duration-300
                    flex items-center justify-center overflow-hidden
                    ${selectedDay === day 
                      ? 'bg-pink-600 text-white shadow-[0_0_20px_rgba(219,39,119,0.4)] scale-110 z-20' 
                      : 'hover:bg-white/10 text-neutral-400 border border-transparent hover:border-white/20'}
                    ${day === 2 ? 'border-amber-500/50 border-2' : ''}
                  `}
                >
                  {day}
                  {day === 2 && (
                    <div className="absolute top-1 right-1">
                      <Heart className={`w-2 h-2 ${selectedDay === 2 ? 'text-white' : 'text-amber-500'} fill-current`} />
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10 text-[10px] text-neutral-500 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Aniversário (2 de Março)</span>
              </div>
              <span>Agricolândia ↔ Brasília</span>
            </div>
          </div>

          {/* Área da Mensagem Selecionada */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-pink-600 to-pink-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden min-h-[300px] flex flex-col justify-center border border-white/20">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Heart className="w-32 h-32 -mr-10 -mt-10 rotate-12" />
              </div>
              
              <div className="relative z-10">
                <div className="text-pink-200 text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current" />
                  Mensagem do Dia {selectedDay}
                </div>
                <p className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                  "{messages[selectedDay]}"
                </p>
                <div className="h-1 w-12 bg-white/30 rounded-full" />
              </div>
            </div>

            {/* Painel de Promessas e Metas */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-amber-500 font-bold flex items-center gap-2">
                <Home className="w-4 h-4" /> Nossa Promessa
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-pink-500">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Encurtar a distância entre nós.</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-amber-500">
                    <Users className="w-4 h-4" />
                  </div>
                  <span>Construir nossa família e nosso lar.</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-green-500">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span>Te fazer a mulher mais feliz do mundo.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé fixo */}
        <footer className="mt-16 pb-8 text-center border-t border-white/5 pt-8">
          <p className="text-neutral-500 text-sm flex items-center justify-center gap-2">
            Feito com <Heart className="w-4 h-4 text-pink-500 fill-current animate-pulse" /> por Stanley para Hadalia
          </p>
        </footer>

        {/* Modal/Efeito de Celebração de 1 Mês */}
        {showAnniversaryEffect && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4">
            <div className="bg-amber-500 text-black px-8 py-6 rounded-3xl font-black text-2xl md:text-4xl shadow-[0_0_60px_rgba(245,158,11,0.6)] animate-bounce text-center">
              🎉 FELIZ 1 MÊS! 🎉
              <div className="text-sm font-bold mt-2 uppercase tracking-tighter">O primeiro de uma vida inteira</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;