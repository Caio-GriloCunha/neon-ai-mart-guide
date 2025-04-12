
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import VoiceWave from "./VoiceWave";

interface AiResponseProps {
  message: string;
  isResponding: boolean;
  className?: string;
}

const AiResponse = ({ message, isResponding, className }: AiResponseProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!message) {
      setDisplayedText("");
      setIsComplete(false);
      return;
    }

    setIsComplete(false);
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(message.slice(0, index));
      index++;
      
      if (index > message.length) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, 30); // velocidade de digitação, ajuste conforme necessário

    return () => clearInterval(interval);
  }, [message]);

  if (!message && !isResponding) return null;

  return (
    <div 
      className={cn(
        "glass-card rounded-xl p-5 min-h-[100px]",
        "border border-white/10 transition-all duration-300",
        "animate-fade-in",
        className
      )}
    >
      {isResponding && !displayedText ? (
        <div className="flex flex-col items-center justify-center gap-2 py-4">
          <div className="text-neon-cyan text-lg font-medium">Processando sua solicitação...</div>
          <VoiceWave isActive={true} className="h-8 w-32" />
        </div>
      ) : (
        <div className="text-white text-lg">
          {displayedText}
          {!isComplete && <span className="animate-pulse">|</span>}
        </div>
      )}
    </div>
  );
};

export default AiResponse;
