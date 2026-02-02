
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', content: string}[]>([
    { role: 'bot', content: 'SYSTEM: Connection established. I am your Alakhya-Nexus guide. How can I assist your mission?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are a futuristic, cyberpunk-themed AI guide for Alakhya 2024, an engineering symposium at SECE college. 
          The symposium is powered by THE 404 SOCIETY. 
          Use cyberpunk terminology like "Nexus", "Mission", "Decrypted", "Kernel", "Uplink".
          Be helpful but stay in character: cold, efficient, yet supportive of the hackers/engineers attending.
          Keep responses concise.`,
        },
      });

      const botText = response.text || "Communication error. Connection lost.";
      setMessages(prev => [...prev, { role: 'bot', content: botText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: "ERROR: Firewall blocked the uplink." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[500px] bg-black border-2 border-green-500 shadow-[0_0_30px_#00FF4155] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
          <div className="bg-green-500 p-3 flex justify-between items-center">
            <span className="text-black font-black uppercase text-xs tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
              NEXUS_GUIDE v1.0
            </span>
            <button onClick={() => setIsOpen(false)} className="text-black hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 font-mono text-sm bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 border ${
                  m.role === 'user' 
                    ? 'border-green-500/50 bg-green-500/10 text-green-400' 
                    : 'border-white/20 bg-white/5 text-white'
                }`}>
                  <div className="text-[10px] uppercase font-black mb-1 opacity-50">
                    {m.role === 'user' ? 'GUEST_INPUT' : 'NEXUS_RESP'}
                  </div>
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-green-500 animate-pulse text-xs italic">
                &gt; Processing signal...
              </div>
            )}
          </div>

          <div className="p-4 border-t border-green-500/30 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Enter query..."
              className="flex-grow bg-black border border-green-500/30 p-2 text-green-500 focus:outline-none focus:border-green-500 transition-colors text-sm"
            />
            <button 
              onClick={handleSend}
              className="bg-green-500 text-black px-4 py-2 font-black text-xs uppercase hover:bg-white transition-colors"
            >
              SEND
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-green-500 text-black rounded-full flex items-center justify-center shadow-[0_0_20px_#00FF41] hover:scale-110 transition-all border-4 border-black group"
        >
          <svg className="w-8 h-8 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-ping"></div>
        </button>
      )}
    </div>
  );
};

export default Assistant;
