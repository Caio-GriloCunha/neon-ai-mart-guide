
import { useState, useEffect } from "react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import MicButton from "@/components/MicButton";
import VoiceWave from "@/components/VoiceWave";
import SuggestionCard from "@/components/SuggestionCard";
import AiResponse from "@/components/AiResponse";
import { 
  MapPin, 
  CreditCard, 
  Tag, 
  Sparkles, 
  ShoppingCart,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const {
    isListening,
    isProcessing,
    transcript,
    aiResponse,
    startListening,
    stopListening,
    askQuestion,
    resetConversation
  } = useSpeechRecognition();
  
  const [showWelcome, setShowWelcome] = useState(true);
  
  useEffect(() => {
    // Fix para garantir que a altura seja ajustada corretamente em dispositivos móveis
    const setHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setHeight();
    window.addEventListener('resize', setHeight);
    
    return () => window.removeEventListener('resize', setHeight);
  }, []);
  
  useEffect(() => {
    // Oculta a mensagem de boas-vindas quando há uma conversa acontecendo
    if (transcript || aiResponse || isListening) {
      setShowWelcome(false);
    } else {
      setShowWelcome(true);
    }
  }, [transcript, aiResponse, isListening]);
  
  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      
      // Simulação: para o reconhecimento após 5 segundos
      setTimeout(() => {
        if (isListening) {
          stopListening();
        }
      }, 5000);
    }
  };
  
  const suggestions = [
    { text: "Onde encontro o arroz?", icon: <MapPin size={24} /> },
    { text: "Como pagar com Pix?", icon: <CreditCard size={24} /> },
    { text: "Quais as promoções de hoje?", icon: <Tag size={24} /> },
    { text: "Dicas de compras", icon: <Sparkles size={24} /> }
  ];

  return (
    <div className="flex flex-col relative w-full responsive-height overflow-hidden">
      {/* Background circles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[40%] w-[80%] h-[80%] rounded-full bg-neon-blue/5 blur-3xl animate-rotate-center" />
        <div className="absolute -bottom-[30%] -left-[40%] w-[80%] h-[80%] rounded-full bg-neon-cyan/5 blur-3xl animate-rotate-center" style={{animationDirection: 'reverse'}} />
      </div>
      
      {/* Header com logo */}
      <header className="w-full p-6 flex justify-center">
        <div className="text-2xl font-bold text-glow text-neon-cyan">
          NEOMERCADO
        </div>
      </header>
      
      {/* Conteúdo principal */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 pb-6 overflow-y-auto flex flex-col">
        {/* Status de escuta */}
        <div 
          className={cn(
            "mb-6 flex items-center justify-center transition-opacity duration-300 h-8",
            isListening ? "opacity-100" : "opacity-0"
          )}
        >
          {isListening && (
            <div className="flex items-center gap-2 text-neon-cyan">
              <span className="text-lg font-semibold">Ouvindo...</span>
              <VoiceWave isActive={isListening} className="h-6 w-24" />
            </div>
          )}
        </div>
        
        {/* Mensagem de boas-vindas */}
        {showWelcome && (
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-3 text-white">
              Olá! Eu sou sua <span className="text-neon-cyan text-glow">assistente de compras</span>.
            </h1>
            <p className="text-xl text-white/80">
              Como posso te ajudar hoje?
            </p>
          </div>
        )}
        
        {/* Área da transcrição */}
        {transcript && (
          <div className="mb-6 animate-fade-in">
            <div className="glass-card rounded-xl p-4 text-white text-lg border border-white/10">
              <div className="flex items-start gap-2">
                <ShoppingCart className="text-neon-cyan mt-1 flex-shrink-0" size={20} />
                <span>{transcript}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Área da resposta da IA */}
        <AiResponse
          message={aiResponse}
          isResponding={isProcessing}
          className="mb-8"
        />
        
        {/* Botão de microfone central */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <MicButton
              isListening={isListening}
              isProcessing={isProcessing}
              onClick={handleMicClick}
              className="shadow-lg"
            />
            <div 
              className="absolute left-full top-1/2 -translate-y-1/2 ml-4 cursor-pointer"
              onClick={resetConversation}
            >
              <RefreshCw 
                size={24} 
                className={cn(
                  "text-white/70 hover:text-neon-cyan transition-colors duration-300",
                  aiResponse || transcript ? "opacity-100" : "opacity-0"
                )}
              />
            </div>
          </div>
        </div>
        
        {/* Sugestões rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg mx-auto">
          {suggestions.map((suggestion, index) => (
            <SuggestionCard
              key={index}
              text={suggestion.text}
              icon={suggestion.icon}
              onClick={() => askQuestion(suggestion.text)}
            />
          ))}
        </div>
      </main>
      
      {/* Rodapé com informações */}
      <footer className="w-full px-6 py-3 border-t border-white/10 flex justify-between items-center">
        <div className="text-white/60 text-sm">
          © 2025 NeoMercado
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300">
            <span className="sr-only">Acessibilidade</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V16" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12H16" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Index;
