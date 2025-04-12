
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface MicButtonProps {
  isListening: boolean;
  isProcessing: boolean;
  onClick: () => void;
  className?: string;
}

const MicButton = ({ isListening, isProcessing, onClick, className }: MicButtonProps) => {
  return (
    <button
      className={cn(
        "relative flex items-center justify-center w-32 h-32 rounded-full bg-secondary",
        "transition-all duration-300 ease-in-out",
        "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neon-cyan",
        isListening && "bg-neon-cyan/20",
        className
      )}
      onClick={onClick}
      aria-label="Ativar microfone"
      style={{
        "--neon-color": "rgba(14, 165, 233, 0.8)",
      } as React.CSSProperties}
    >
      <div className={cn(
        "absolute inset-0 rounded-full",
        isListening && "animate-pulse-neon"
      )} />
      <div className={cn(
        "absolute inset-0 rounded-full border-2",
        isListening ? "border-neon-cyan border-glow" : "border-white/20"
      )} />
      <Mic 
        size={50} 
        className={cn(
          "text-white transition-all duration-300",
          isListening && "text-neon-cyan text-glow",
          isProcessing && "animate-pulse"
        )}
      />
    </button>
  );
};

export default MicButton;
