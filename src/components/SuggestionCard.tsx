
import { cn } from "@/lib/utils";

interface SuggestionCardProps {
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const SuggestionCard = ({ text, icon, onClick, className }: SuggestionCardProps) => {
  return (
    <button
      className={cn(
        "glass-card px-5 py-4 rounded-xl text-left",
        "border border-white/10 transition-all duration-300",
        "hover:border-neon-cyan/50 hover:bg-neon-cyan/10",
        "active:scale-95 focus:outline-none focus:border-neon-cyan",
        "w-full",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className="text-neon-cyan flex-shrink-0">
            {icon}
          </div>
        )}
        <span className="text-white text-lg font-medium">{text}</span>
      </div>
    </button>
  );
};

export default SuggestionCard;
