
import { useState, useEffect, useCallback } from "react";

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  isProcessing: boolean;
  transcript: string;
  aiResponse: string;
  startListening: () => void;
  stopListening: () => void;
  askQuestion: (question: string) => void;
  resetConversation: () => void;
}

// Este hook é uma simulação do reconhecimento de voz e respostas da IA
export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  // Respostas simuladas da IA
  const getAiResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes("arroz")) {
      return "O arroz está no corredor 3, na seção de grãos. Temos várias marcas disponíveis, incluindo opções integrais e parboilizados.";
    }
    if (lowerQuestion.includes("pix") || lowerQuestion.includes("pagamento")) {
      return "Para pagar com Pix, basta finalizar suas compras no caixa de autoatendimento, selecionar a opção Pix, e escanear o QR code gerado. O pagamento é processado instantaneamente.";
    }
    if (lowerQuestion.includes("promoção") || lowerQuestion.includes("oferta") || lowerQuestion.includes("desconto")) {
      return "Hoje temos promoções especiais em produtos de limpeza com 20% de desconto, frutas da estação com 15% de desconto e itens selecionados na padaria com 10% de desconto.";
    }
    
    return "Desculpe, não tenho informações específicas sobre isso. Posso ajudá-lo a encontrar produtos ou informar sobre formas de pagamento. O que você gostaria de saber?";
  };

  const startListening = useCallback(() => {
    setIsListening(true);
    setTranscript("");
    
    // Simula o início do reconhecimento de voz
    console.log("Iniciando reconhecimento de voz...");
  }, []);

  const stopListening = useCallback(() => {
    setIsListening(false);
    
    // Simula o fim do reconhecimento com uma pergunta aleatória
    const randomQuestions = [
      "Onde encontro o arroz?",
      "Como faço para pagar com Pix?",
      "Quais são as promoções de hoje?"
    ];
    
    const randomIndex = Math.floor(Math.random() * randomQuestions.length);
    const simulatedQuestion = randomQuestions[randomIndex];
    
    setTranscript(simulatedQuestion);
    setIsProcessing(true);
    
    // Simula o processamento da IA
    setTimeout(() => {
      const response = getAiResponse(simulatedQuestion);
      setAiResponse(response);
      setIsProcessing(false);
    }, 2000);
    
    console.log("Reconhecimento de voz finalizado");
  }, []);
  
  const askQuestion = useCallback((question: string) => {
    setTranscript(question);
    setIsProcessing(true);
    
    // Simula o processamento da IA
    setTimeout(() => {
      const response = getAiResponse(question);
      setAiResponse(response);
      setIsProcessing(false);
    }, 1500);
  }, []);
  
  const resetConversation = useCallback(() => {
    setTranscript("");
    setAiResponse("");
    setIsProcessing(false);
    setIsListening(false);
  }, []);

  return {
    isListening,
    isProcessing,
    transcript,
    aiResponse,
    startListening,
    stopListening,
    askQuestion,
    resetConversation
  };
};
