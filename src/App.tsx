/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  BookOpen, 
  Instagram, 
  ArrowRight,
  ChevronRight,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const GOLD = "#D4AF37";
const DARK_GOLD = "#B8860B";
const WHATSAPP_NUMBER = "+554399755348";
const WHATSAPP_LINK = `https://wa.me/554399755348?text=Olá Dr. Luiz, gostaria de saber mais sobre a mentoria Mini Lipo Hands-on.`;

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: boolean }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-serif text-white mb-4 uppercase tracking-widest"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="w-24 h-1 bg-[#D4AF37] mx-auto mb-4"
      />
    )}
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string, key?: any }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl backdrop-blur-sm ${className}`}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-zinc-800' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-white font-serif text-xl tracking-tighter">DR. LUIZ FRANCISCO</span>
            <span className="text-[10px] text-[#D4AF37] tracking-[0.2em] uppercase">Ottoclinic</span>
          </div>
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black px-6 py-2 rounded-full font-bold transition-all text-sm uppercase tracking-wider"
          >
            Garantir Vaga
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <img 
            src="https://i.imgur.com/nKg1cyM.png" 
            alt="Dr. Luiz Francisco" 
            className="w-full h-full object-cover object-top opacity-50"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-[#D4AF37] font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base">
              Curso VIP – Mini Lipo Hands-On
            </span>
            <h1 className="text-5xl md:text-8xl font-serif text-white leading-tight mb-6 uppercase">
              Formação Prática em <span className="text-[#D4AF37]">Lipoaspiração</span> Fracionada
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 mb-10 font-light max-w-2xl leading-relaxed">
              Aprenda na prática. Ganhe segurança. Eleve sua carreira.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#D4AF37] hover:bg-[#B8860B] text-black px-10 py-5 rounded-full font-bold transition-all text-lg uppercase tracking-widest group"
              >
                Quero me inscrever
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-4 px-6 text-zinc-500 text-sm">
                <span>Turmas reduzidas e exclusivas</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#D4AF37]" />
              <img 
                src="https://i.imgur.com/l8hGeLZ.jpeg" 
                alt="Dr. Luiz Francisco" 
                className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div>
              <span className="text-[#D4AF37] font-bold uppercase tracking-widest text-sm mb-4 block">Sobre o Mentor</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">Dr. Luiz Francisco Gonçalves Franco</h2>
              <div className="space-y-6 text-lg text-zinc-400 leading-relaxed font-light">
                <p>
                  Sou médico e fundador da <span className="text-white font-medium">Ottoclinic</span>, clínica especializada em estética corporal.
                </p>
                <p>
                  Ao longo da minha trajetória, me tornei referência em Mini Lipo, sempre priorizando a segurança do paciente, resultados naturais e técnica refinada.
                </p>
                <p className="bg-zinc-900 p-6 border-l-4 border-[#D4AF37] italic text-white">
                  "Desenvolvi este curso com um objetivo claro: formar médicos capazes de iniciar com segurança e confiança na prática real."
                </p>
                <p className="text-sm uppercase tracking-widest text-zinc-500">CRM-PR 47604 | Ottoclinic</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Whom */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle>Para quem é este curso?</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Zap />, text: "Médicos que querem sair do plantão" },
              { icon: <TrendingUp />, text: "Médicos que querem aumentar faturamento" },
              { icon: <Users />, text: "Profissionais que desejam migrar para estética" },
              { icon: <ShieldCheck />, text: "Quem busca liberdade profissional" }
            ].map((item, idx) => (
              <Card key={idx} className="flex flex-col items-center text-center">
                <div className="text-[#D4AF37] mb-6 scale-150">{item.icon}</div>
                <p className="text-white font-medium text-lg leading-snug">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunity & Scale */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#D4AF37]/5 blur-3xl rounded-full translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-zinc-900/80 p-12 rounded-3xl border border-zinc-800">
              <h3 className="text-[#D4AF37] font-serif text-3xl mb-6 uppercase tracking-wider">Oportunidade Real</h3>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Hoje, muitos médicos vivem uma rotina de plantões intensos, com carga horária elevada e crescimento limitado. A Mini Lipo permite:
              </p>
              <ul className="space-y-4 mb-10">
                {["Aumento expressivo de faturamento", "Redução da carga de trabalho", "Mais autonomia profissional"].map((t, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="text-[#D4AF37] shrink-0" size={20} />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="text-2xl font-serif text-white italic border-t border-zinc-800 pt-8">
                "Você deixa de vender horas e passa a vender valor."
              </p>
            </div>
            <div className="bg-[#D4AF37] p-12 rounded-3xl text-black flex flex-col justify-center">
              <h3 className="font-serif text-3xl mb-6 uppercase tracking-wider">Potencial de Escala</h3>
              <p className="text-black/80 text-lg mb-8 leading-relaxed font-medium">
                Médicos que dominam a técnica conseguem:
              </p>
              <ul className="space-y-6">
                {[
                  "Construir agenda própria",
                  "Trabalhar com procedimentos de alto valor agregado",
                  "Escalar faturamento com previsibilidade"
                ].map((t, i) => (
                  <li key={i} className="flex items-center gap-4 text-xl font-bold uppercase tracking-tight">
                    <div className="w-8 h-8 rounded-full bg-black text-[#D4AF37] flex items-center justify-center text-sm">0{i+1}</div>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle>Diferenciais do Curso</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              "Hands-on REAL com pacientes",
              "Turma reduzida",
              "Acompanhamento direto",
              "Aplicação imediata",
              "Técnica validada"
            ].map((text, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl border border-zinc-800 p-6 text-center hover:border-[#D4AF37] transition-all">
                <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="relative z-10 text-white font-bold uppercase text-xs tracking-widest leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center mt-12 text-2xl font-serif text-[#D4AF37]">
            Você não sai apenas com conhecimento. Sai pronto para aplicar.
          </p>
        </div>
      </section>

      {/* Program */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle>Conteúdo Programático</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Módulo I", subtitle: "Base e Estrutura", items: ["Anatomia aplicada", "Farmacologia local", "Equipamentos e insumos"] },
              { title: "Módulo II", subtitle: "Planejamento e Segurança", items: ["Seleção de pacientes", "Marcação estratégica", "Protocolos de segurança"] },
              { title: "Módulo III", subtitle: "Técnica e Execução", items: ["Infiltração tumescente", "Aspiração fracionada", "Pós-operatório imediato"] }
            ].map((mod, i) => (
              <div key={i} className="bg-zinc-900 p-10 rounded-3xl border-t-4 border-[#D4AF37]">
                <span className="text-[#D4AF37] font-bold text-sm uppercase tracking-widest mb-2 block">{mod.title}</span>
                <h4 className="text-2xl text-white font-serif mb-6">{mod.subtitle}</h4>
                <ul className="space-y-4">
                  {mod.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle>Resultados Reais</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { img: "https://i.imgur.com/CzdsDzp.jpeg", label: "Definição de contorno corporal com técnica de Mini Lipo", tag: "Caso 1 (flanco + culote)" },
              { img: "https://i.imgur.com/KNwhwUB.jpeg", label: "Técnica aplicada com precisão e resultado natural", tag: "Abdômen intra + resultado" },
              { img: "https://i.imgur.com/zk8LK48.jpeg", label: "Redução de volume e melhora de contorno", tag: "Caso lateral + posterior" },
              { img: "https://i.imgur.com/pRMYM78.jpeg", label: "Harmonização corporal com resultado proporcional", tag: "Abdômen completo" }
            ].map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800">
                <img 
                  src={item.img} 
                  alt={item.tag} 
                  className="w-full h-[400px] object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-2 block">{item.tag}</span>
                  <p className="text-white text-lg font-serif">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-zinc-600 text-xs italic">
            Resultados reais. Podem variar de acordo com o paciente.
          </p>
        </div>
      </section>


      {/* Investment */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <SectionTitle subtitle>Investimento</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-zinc-900/50 p-10 rounded-3xl border border-zinc-800">
              <span className="text-zinc-500 uppercase tracking-widest text-xs mb-2 block">À Vista</span>
              <h4 className="text-4xl md:text-5xl font-serif text-[#D4AF37] mb-4">R$ 28.000</h4>
              <p className="text-zinc-400 text-sm">Transferência ou PIX</p>
            </div>
            <div className="bg-zinc-900/50 p-10 rounded-3xl border border-[#D4AF37]/30">
              <span className="text-zinc-500 uppercase tracking-widest text-xs mb-2 block">Parcelado</span>
              <h4 className="text-4xl md:text-5xl font-serif text-white mb-4">R$ 32.000</h4>
              <p className="text-zinc-400 text-sm">Em até 12x no cartão</p>
            </div>
          </div>
          <p className="text-xl text-zinc-400 font-light italic mb-12">
            "Investimento compatível com o nível de entrega prática e potencial de retorno."
          </p>
          <div className="bg-red-900/20 border border-red-900/50 p-4 rounded-xl inline-flex items-center gap-3 text-red-500 font-bold uppercase tracking-widest text-sm mb-12">
            <Zap size={18} />
            Vagas Limitadas - Turmas Reduzidas
          </div>
        </div>
      </section>

      {/* Registration */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionTitle subtitle>Inscrição</SectionTitle>
          <p className="text-xl text-white mb-12">Para garantir sua vaga, envie via WhatsApp:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left mb-12">
            {["Nome Completo", "CPF", "CRM", "Especialidade", "Comprovante do sinal"].map((t, i) => (
              <div key={i} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span className="text-zinc-300 text-sm">{t}</span>
              </div>
            ))}
          </div>
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-[#25D366] hover:bg-[#128C7E] text-white px-12 py-6 rounded-full font-bold transition-all text-xl uppercase tracking-widest shadow-[0_0_30px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle size={28} />
            Falar com a Secretária
          </a>
        </div>
      </section>

      {/* Final Call */}
      <section className="py-24 bg-black border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">
            Se você deseja evoluir na prática, aumentar seu faturamento e ter mais liberdade profissional, esse curso é para você.
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-white font-serif text-2xl tracking-tighter">DR. LUIZ FRANCISCO</span>
            <span className="text-xs text-[#D4AF37] tracking-[0.2em] uppercase">Ottoclinic</span>
          </div>
          <div className="flex gap-6">
            <a href="https://instagram.com/ottoclinic.oficial" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              <Instagram size={20} />
              @ottoclinic.oficial
            </a>
          </div>
          <p className="text-zinc-600 text-xs">
            © 2026 Ottoclinic. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <AnimatePresence>
        <motion.a
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
        >
          <div className="absolute -top-12 right-0 bg-white text-black text-xs font-bold px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Falar com a Secretária
            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white rotate-45" />
          </div>
          <MessageCircle size={32} />
        </motion.a>
      </AnimatePresence>
    </div>
  );
}
