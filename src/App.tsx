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
  Star,
  Loader2,
  Clock,
  Award,
  CircleDollarSign,
  Briefcase,
  HelpCircle,
  Plus,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

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
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/confirmacao" element={<ConfirmationPage />} />
    </Routes>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
  key?: React.Key;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-800 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group"
      >
        <span className="text-lg font-medium text-white group-hover:text-[#D4AF37] transition-colors">{question}</span>
        <div className="text-[#D4AF37] shrink-0 ml-4">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-zinc-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    crm: '',
    especialidade: '',
    cidade: '',
    whatsapp: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppClick = (eventName: string = 'Contact') => {
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', eventName, {
        content_name: 'Clique WhatsApp Direto',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Disparo do Pixel da Meta
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Lead', {
        content_name: 'Inscrição Mentoria Mini Lipo',
        status: 'submitted'
      });
    }

    // Enviar Webhook imediatamente
    try {
      const WEBHOOK_FALLBACK = 'https://webhooks.cruzconsorcio.com.br/webhook/20bf868c-0118-4274-b747-7ee5865ddbad';
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL || WEBHOOK_FALLBACK;
      
      console.log('Iniciando envio do webhook...');
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'Mentoria Mini Lipo Landing Page',
          url_origem: window.location.href
        }),
      });
      
      if (response.ok) {
        console.log('Webhook enviado com sucesso!');
      } else {
        console.error('Falha no webhook:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Erro crítico no envio do webhook:', error);
    }
    
    // Redirecionar para página de confirmação final
    navigate('/confirmacao', { state: { confirmed: true } });
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-zinc-800' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-white font-serif text-xl tracking-tighter">DR. FRANCISCO FRANCO</span>
            <span className="text-[10px] text-[#D4AF37] tracking-[0.2em] uppercase">Ottoclinic</span>
          </div>
          <button 
            onClick={() => document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth' })}
            className="hidden md:flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8860B] text-black px-6 py-2 rounded-full font-bold transition-all text-sm uppercase tracking-wider"
          >
            Garantir Vaga
          </button>
        </div>
      </nav>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 w-full z-[60] p-4 md:hidden">
        <button 
          onClick={() => document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
        >
          Garantir Vaga <ArrowRight size={18} />
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <img 
            src="https://i.imgur.com/hprBXVA.jpeg" 
            alt="Dr. Luiz Francisco Franco" 
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
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-4 py-1 rounded-full mb-6 text-[#D4AF37] text-xs font-bold uppercase tracking-widest animate-pulse">
              <Star size={14} fill="#D4AF37" />
              Curso VIP – Mini Lipo Hands-On
            </div>
            <h1 className="text-5xl md:text-8xl font-serif text-white leading-tight mb-6 uppercase">
              Formação Prática em <span className="text-[#D4AF37]">Lipoaspiração</span> Fracionada
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 mb-10 font-light max-w-2xl leading-relaxed">
              Domine a técnica que gera <span className="text-white font-medium">alta lucratividade</span> em consultório e conquiste sua liberdade profissional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button 
                onClick={() => document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#D4AF37] hover:bg-[#B8860B] text-black px-10 py-5 rounded-full font-bold transition-all text-lg uppercase tracking-widest group shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]"
              >
                Quero me inscrever
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-4 px-6 py-2 bg-zinc-900/50 backdrop-blur-sm rounded-full border border-zinc-800 text-zinc-300 text-sm">
                <Users size={16} className="text-[#D4AF37]" />
                <span className="font-medium text-center">Apenas 6 vagas por turma</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <div className="relative z-20 w-full bg-zinc-950/80 backdrop-blur-md border-y border-zinc-900 mt-20 py-8">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <ShieldCheck />, text: "Segurança Total" },
              { icon: <Award />, text: "Técnica Validada" },
              { icon: <Clock />, text: "Hands-on Real" },
              { icon: <Star />, text: "Referência na Área" }
            ].map((badge, i) => (
              <div key={i} className="flex items-center justify-center gap-3 text-zinc-500 uppercase tracking-[0.2em] text-[10px] font-bold">
                <span className="text-[#D4AF37]">{badge.icon}</span>
                {badge.text}
              </div>
            ))}
          </div>
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
                alt="Dr. Luiz Francisco Franco" 
                className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div>
              <span className="text-[#D4AF37] font-bold uppercase tracking-widest text-sm mb-4 block">Sobre o Mentor</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">Dr. Luiz Francisco Gonçalves Franco</h2>
              <div className="space-y-6 text-lg text-zinc-400 leading-relaxed font-light">
                <p>
                  Sou médico e fundador da <span className="text-white font-medium">Ottoclinic</span>, clínica especializada em estética avançada.
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
                    <div className="w-8 h-8 shrink-0 rounded-full bg-black text-[#D4AF37] flex items-center justify-center text-sm">0{i+1}</div>
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

      {/* The Strategy / Success Path */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle>O Caminho para sua Liberdade</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent -translate-y-12" />
            
            {[
              { 
                step: "01", 
                title: "Domínio Técnico", 
                desc: "Aprenda a técnica refinada de Mini Lipo que garante resultados naturais e máxima segurança.",
                icon: <Award /> 
              },
              { 
                step: "02", 
                title: "Autoridade e Escala", 
                desc: "Posicione-se como referência e atraia pacientes que valorizam seu trabalho e pagam o preço justo.",
                icon: <TrendingUp /> 
              },
              { 
                step: "03", 
                title: "Liberdade Real", 
                desc: "Abandone os plantões exaustivos. Trabalhe com horário marcado e procedimentos de alta lucratividade.",
                icon: <CircleDollarSign /> 
              }
            ].map((path, i) => (
              <div key={i} className="relative z-10 group">
                <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl group-hover:border-[#D4AF37] transition-all duration-500 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-[#D4AF37]/30 flex items-center justify-center mb-8 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                    {path.icon}
                  </div>
                  <span className="text-4xl font-serif text-white/10 absolute top-6 right-10 group-hover:text-[#D4AF37]/20 transition-colors uppercase italic font-black">{path.step}</span>
                  <h4 className="text-2xl text-white font-serif mb-4">{path.title}</h4>
                  <p className="text-zinc-400 text-lg leading-relaxed">{path.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle>Conteúdo Programático</SectionTitle>
          
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] font-medium tracking-widest uppercase text-sm">
              Regiões abordadas: Abdômen, Flancos, Costas, Culotes, Braços, Interno de coxa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Módulo I", subtitle: "Base e Estrutura", items: ["Anatomia aplicada", "Farmacologia local", "Equipamentos e insumos"] },
              { title: "Módulo II", subtitle: "Planejamento e Segurança", items: ["Seleção de pacientes", "Marcação estratégica", "Protocolos de segurança"] },
              { title: "Módulo III", subtitle: "Técnica e Execução", items: ["Infiltração tumescente", "Mini Lipo Aspiração", "Pós-operatório imediato"] },
              { title: "Módulo Bônus", subtitle: "Técnicas Avançadas", items: ["Mini abdominoplastia", "Lipo transferência glútea", "Mini lipo de média definição"] }
            ].map((mod, i) => (
              <div key={i} className="bg-zinc-900 p-8 rounded-3xl border-t-4 border-[#D4AF37] flex flex-col">
                <span className="text-[#D4AF37] font-bold text-sm uppercase tracking-widest mb-2 block">{mod.title}</span>
                <h4 className="text-xl text-white font-serif mb-6">{mod.subtitle}</h4>
                <ul className="space-y-4 flex-grow">
                  {mod.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-zinc-400 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
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
              { img: "https://i.imgur.com/CzdsDzp.jpeg", label: "Definição de contorno corporal com técnica de Mini Lipo", tag: "Flanco + Culote + Lipo Transferência Glútea" },
              { img: "https://i.imgur.com/WFgBZzA.jpeg", label: "Resultado natural com harmonização glútea", tag: "Abdômen + flancos + lipo transferência glútea" },
              { img: "https://i.imgur.com/beHeJFc.jpeg", label: "Redução de volume e melhora de contorno", tag: "Caso lateral + posterior" },
              { img: "https://i.imgur.com/mnsw9ym.jpeg", label: "Harmonização corporal com resultado proporcional", tag: "Abdômen + Flancos + Mini Abdominoplastia" }
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


      {/* FAQ Section */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <SectionTitle subtitle>Perguntas Frequentes</SectionTitle>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 md:p-12">
            {[
              {
                question: "O curso é voltado para qual especialidade?",
                answer: "O curso é destinado a médicos de diversas áreas que desejam ingressar ou se aprimorar na técnica de Mini Lipo, desde que possuam CRM ativo e interesse em estética avançada."
              },
              {
                question: "Posso realizar os procedimentos em consultório?",
                answer: "Sim, um dos grandes diferenciais da Mini Lipo é a possibilidade de execução em ambiente ambulatorial (consultório) devidamente equipado, sob anestesia local, garantindo baixo custo operacional e alta margem."
              },
              {
                question: "Quantos pacientes terei no Hands-on?",
                answer: "Trabalhamos com turmas extremamente reduzidas (máximo 6 pessoas) para garantir que todos os alunos tenham tempo de prática real e supervisão direta do Dr. Luiz Francisco Franco."
              },
              {
                question: "O curso oferece certificado?",
                answer: "Sim, ao concluir a mentoria você receberá o certificado de formação prática em Mini Lipo pela Ottoclinic, validando sua capacitação na técnica."
              },
              {
                question: "Existe suporte pós-curso?",
                answer: "Sim, mantemos um canal aberto para tirar dúvidas sobre seus primeiros casos pós-curso, garantindo que você tenha segurança total no início da jornada."
              }
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Steps to Start */}
      <section className="py-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: "1", title: "Preencha o formulário", icon: <BookOpen />, subtitle: "Envie seus dados básicos" },
              { step: "2", title: "Contato da Consultora", icon: <MessageCircle />, subtitle: "Tiramos todas as suas dúvidas" },
              { step: "3", title: "Escolha sua Data", icon: <Clock />, subtitle: "Agende sua mentoria presencial" },
              { step: "4", title: "Prática Real", icon: <Award />, subtitle: "Inicie sua nova carreira estética" }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 border border-zinc-900 rounded-2xl bg-black/20">
                <div className="text-[#D4AF37] mb-4">{step.icon}</div>
                <h5 className="text-white font-serif text-sm uppercase tracking-wider mb-2">{step.title}</h5>
                <p className="text-zinc-500 text-[10px]">{step.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration */}
      <section id="inscricao" className="py-24 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-[#D4AF37] font-bold uppercase tracking-widest text-sm mb-4 block text-center lg:text-left">Garanta sua Vaga</span>
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 text-center lg:text-left">Inicie sua Transformação</h2>
              <div className="space-y-8">
                {[
                  { title: "Turmas VIP", desc: "Apenas 6 alunos para garantir atenção total e prática intensiva." },
                  { title: "Suporte Total", desc: "Acompanhamento profissional mesmo após a conclusão do curso." },
                  { title: "ROI Imediato", desc: "Técnica focada em resultados que permitem retorno rápido do investimento." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0 text-[#D4AF37]">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl text-white font-medium mb-1">{item.title}</h4>
                      <p className="text-zinc-400 group-hover:text-zinc-600 transition-colors">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 p-8 md:p-12 rounded-3xl border border-zinc-800 shadow-2xl relative">
              <div className="absolute -top-12 -right-6 hidden lg:block">
                <div className="bg-[#D4AF37] text-black font-bold p-6 rounded-full w-24 h-24 flex items-center justify-center text-center text-xs uppercase leading-tight rotate-12 shadow-xl">
                  Últimas Vagas Disponíveis
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="nome" className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Nome Completo *</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-zinc-800"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cpf" className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest">CPF *</label>
                    <input
                      type="text"
                      id="cpf"
                      name="cpf"
                      required
                      value={formData.cpf}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-zinc-800"
                      placeholder="000.000.000-00"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="crm" className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest">CRM</label>
                    <input
                      type="text"
                      id="crm"
                      name="crm"
                      value={formData.crm}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-zinc-800"
                      placeholder="CRM-UF"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="especialidade" className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Especialidade</label>
                    <input
                      type="text"
                      id="especialidade"
                      name="especialidade"
                      value={formData.especialidade}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-zinc-800"
                      placeholder="Ex: Dermatologia"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cidade" className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Cidade *</label>
                    <input
                      type="text"
                      id="cidade"
                      name="cidade"
                      required
                      value={formData.cidade}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-zinc-800"
                      placeholder="Sua cidade"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest">WhatsApp *</label>
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      required
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-zinc-800"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-4 bg-[#D4AF37] hover:bg-[#B8860B] text-black px-8 py-4 rounded-full font-bold transition-all text-lg uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.2)] mt-4"
                >
                  <MessageCircle size={24} />
                  Quero Garantir Minha Vaga
                </button>
              </form>
              <div className="mt-8 pt-8 border-t border-zinc-800 flex items-start gap-3">
                <ShieldCheck className="text-[#D4AF37] shrink-0" size={18} />
                <p className="text-zinc-500 text-xs leading-relaxed">
                  <span className="text-zinc-400 font-bold block mb-1">Privacidade Garantida:</span>
                  Nossa clínica segue rigorosos padrões de segurança. Seus dados serão usados apenas para contato direto sobre a mentoria.
                </p>
              </div>
            </div>
          </div>
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
            <span className="text-white font-serif text-2xl tracking-tighter">DR. FRANCISCO FRANCO</span>
            <span className="text-xs text-[#D4AF37] tracking-[0.2em] uppercase">Ottoclinic</span>
          </div>
          <div className="flex gap-6">
            <a href="https://instagram.com/ottoclinic.oficial" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              <Instagram size={20} />
              @ottoclinic.oficial
            </a>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-zinc-600 text-[10px] uppercase tracking-wider">
              Otto Clinic Clinica Medica Ltda - CNPJ 46.476.811/0001-64
            </p>
            <p className="text-zinc-600 text-xs">
              © 2026 Ottoclinic. Todos os direitos reservados.
            </p>
          </div>
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
          onClick={() => handleWhatsAppClick('Contact')}
          className="fixed bottom-24 md:bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
        >
          <div className="absolute -top-12 right-0 bg-white text-black text-xs font-bold px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Falar no WhatsApp
            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white rotate-45" />
          </div>
          <MessageCircle size={32} />
        </motion.a>
      </AnimatePresence>
    </div>
  );
}

function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isConfirmed = location.state?.confirmed;

  useEffect(() => {
    if (!isConfirmed) {
      navigate('/');
    } else {
      // Disparo do Pixel da Meta para Conversão Final
      if (typeof (window as any).fbq === 'function') {
        (window as any).fbq('track', 'CompleteRegistration', {
          content_name: 'Inscrição Confirmada Mentoria Mini Lipo'
        });
      }
    }
  }, [isConfirmed, navigate]);

  const handleWhatsAppContactClick = () => {
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Contact');
    }
  };

  if (!isConfirmed) return null;

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans flex items-center justify-center p-6 selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 p-8 md:p-12 rounded-3xl border border-zinc-800 shadow-2xl text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-8"
          >
            <div className="w-20 h-20 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-[#D4AF37]" size={48} />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-wider">Sua inscrição foi confirmada!</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Parabéns! Seus dados foram recebidos com sucesso. Nossa equipe entrará em contato em breve para os próximos passos.
            </p>
            
            <div className="pt-6 border-t border-zinc-800">
              <p className="text-zinc-500 mb-6 text-sm uppercase tracking-widest">Se quiser falar com a nossa equipe agora:</p>
              <a 
                href={`https://wa.me/554399755348?text=Olá! Acabei de confirmar minha inscrição na Mentoria Mini Lipo.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppContactClick}
                className="flex items-center justify-center gap-4 bg-[#25D366] hover:bg-[#128C7E] text-white px-10 py-5 rounded-full font-bold transition-all text-xl uppercase tracking-widest shadow-[0_0_30px_rgba(37,211,102,0.3)]"
              >
                <MessageCircle size={28} />
                Falar no WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
