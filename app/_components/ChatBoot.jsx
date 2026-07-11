'use client';

import { useState, useEffect, useRef } from 'react';
import { TbMessageChatbot, TbX, TbSend, TbMoodSmile } from 'react-icons/tb';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updated = [...messages, userMessage];

    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });

      const data = await res.json();

      if (data.message) {
        setMessages([...updated, { role: 'assistant', content: data.message }]);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">

      {/* 1. التلميح الترحيبي العائم (Badge) - تصميم طبي ناعم */}
      {!isOpen && (
     <div className="mb-4 max-w-[310px] rounded-2xl border border-amber-500/20 bg-[#151515]/95 backdrop-blur-md px-4 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)] animate-bounce-slow">

  <div className="flex items-center gap-3">

    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-xl text-amber-400">
      <TbMoodSmile />
    </div>

    <div>

      <p className="text-sm font-semibold text-white">
        Bonjour 👋
      </p>



    </div>

  </div>

</div>
      )}
       
      {/* 2. زر فتح البوت المطور بأيقونة شات طبية */}
<button
  onClick={() => setIsOpen(!isOpen)}
  className="
    group
    flex
    h-16
    w-16
    items-center
    justify-center
    rounded-full
    border
    border-amber-500/30
    bg-gradient-to-br
    from-amber-400
    to-amber-600
    text-black
    shadow-[0_8px_30px_rgba(245,158,11,0.35)]
    transition-all
    duration-300
    hover:scale-110
    hover:shadow-[0_12px_40px_rgba(245,158,11,0.45)]
    active:scale-95
  "
>
  {isOpen ? (
    <TbX className="text-2xl transition-transform duration-300 group-hover:rotate-90" />
  ) : (
    <TbMessageChatbot className="text-3xl transition-transform duration-300 group-hover:scale-110" />
  )}
</button>

      {/* 3. صندوق المحادثة (Chat Box) - أسلوب عيادة ديجيتال ويفي بجمالية رائعة */}
    {isOpen && (
  <div className="fixed bottom-24 right-6 w-[calc(100vw-32px)] sm:w-[390px] h-[560px] max-h-[calc(100vh-120px)] bg-[#111111] rounded-3xl flex flex-col border border-amber-500/20 shadow-[0_20px_60px_rgba(0,0,0,.6)] overflow-hidden z-[99]">

    {/* Header */}
    <div className="h-16 px-5 bg-gradient-to-r from-[#1B1B1B] via-[#171717] to-[#101010] border-b border-amber-500/20 flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl text-amber-400">
          🍽️
        </div>

        <div>
          <h2 className="font-semibold text-white">
            Bella Vista AI
          </h2>

          <p className="text-[11px] text-gray-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Disponible maintenant
          </p>
        </div>

      </div>

      <button
        onClick={() => setIsOpen(false)}
        className="p-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition"
      >
        <TbX />
      </button>

    </div>

    {/* Messages */}

    <div className="flex-1 overflow-y-auto bg-[#0F0F0F] p-5 space-y-4">

      {messages.length === 0 && (

        <div className="max-w-[90%] rounded-2xl rounded-tl-md border border-amber-500/20 bg-[#1A1A1A] p-4 text-sm text-gray-300 leading-7">

          <p>
            👋 <span className="font-semibold text-amber-400">
              Bienvenue chez Bella Vista.
            </span>
          </p>

          <p className="mt-2">
            Je peux vous aider concernant le menu, les réservations,
            les horaires et les événements.
          </p>

        </div>

      )}

      {messages.map((msg, i) => (

        <div
          key={i}
          className={`flex ${
            msg.role === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >

          <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-7 shadow ${
              msg.role === "user"
                ? "bg-amber-500 text-black rounded-br-none"
                : "bg-[#1A1A1A] border border-amber-500/20 text-gray-200 rounded-bl-none"
            }`}
          >
            {msg.content}
          </div>

        </div>

      ))}

      {loading && (

        <div className="flex w-16 justify-center gap-1 rounded-2xl rounded-bl-none border border-amber-500/20 bg-[#1A1A1A] px-4 py-3">

          <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"></span>

          <span
            className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></span>

          <span
            className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></span>

        </div>

      )}

      <div ref={endRef} />

    </div>

    {/* Footer */}

    <div className="border-t border-amber-500/20 bg-[#111111] p-4">

      <div className="flex gap-2">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Posez votre question..."
          className="flex-1 rounded-xl border border-amber-500/20 bg-[#1A1A1A] px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none focus:border-amber-500 transition"
        />

        <button
          onClick={sendMessage}
          className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-black flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-lg shadow-amber-500/20"
        >
          <TbSend className="text-lg" />
        </button>

      </div>

    </div>

  </div>
)} 
    </div>
  );
}