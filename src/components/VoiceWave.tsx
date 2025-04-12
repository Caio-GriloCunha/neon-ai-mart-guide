
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface VoiceWaveProps {
  isActive: boolean;
  className?: string;
}

const VoiceWave = ({ isActive, className }: VoiceWaveProps) => {
  const bars = Array.from({ length: 10 }, (_, i) => i);
  
  return (
    <div className={cn("flex items-end justify-center gap-1 h-16 w-full", className)}>
      {bars.map((i) => {
        // Cria diferentes delays para cada barra
        const delay = `${i * 0.1}s`;
        
        return (
          <div 
            key={i}
            className={cn(
              "bg-neon-cyan h-full w-1.5 rounded-full transition-all duration-300",
              isActive ? "opacity-100" : "opacity-20 h-2"
            )}
            style={{
              animation: isActive ? `wave 1s ease-in-out infinite` : "none",
              animationDelay: delay,
              height: isActive ? `${Math.random() * 60 + 20}%` : "10%",
            }}
          />
        );
      })}
    </div>
  );
};

export default VoiceWave;
