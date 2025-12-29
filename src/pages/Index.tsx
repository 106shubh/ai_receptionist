import { useState, useEffect } from 'react';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { CollegeInfo } from '@/components/CollegeInfo';
import { ContactCard } from '@/components/ContactCard';
import { RecruiterMarquee } from '@/components/RecruiterMarquee';
import { AdmissionSupport } from '@/components/AdmissionSupport';
import { MailPreview } from '@/components/chat/MailPreview';
import type { Message } from '@/types/chat';
import { generateCollegeResponse, QUICK_QUESTIONS, type CollegeTopic } from '@/data/collegeData';
import { getSessionId } from '@/lib/userId';
import api from '@/data/externalRequest';
import { ExternalLink, MessageSquare, ChevronRight } from 'lucide-react';
import { getAIResponse } from '@/lib/gemini';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Footer } from '@/components/Footer';

type InquiryStep = 'idle' | 'mail_preview' | 'mail_sending' | 'mail_sent';

export default function Index() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [inquiryStep, setInquiryStep] = useState<InquiryStep>('idle');
    const [mailData, setMailData] = useState({ draft: '', message: '', department: '' });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_sessionId, setSessionId] = useState<string>('');



    useEffect(() => {
        const sid = getSessionId();
        setSessionId(sid);

        // Load messages from localStorage
        const savedMessages = localStorage.getItem(`chat_history_${sid}`);
        if (savedMessages) {
            try {
                const parsed = JSON.parse(savedMessages);
                // Convert string dates back to Date objects
                const formatted = parsed.map((m: any) => ({
                    ...m,
                    timestamp: new Date(m.timestamp)
                }));
                setMessages(formatted);
            } catch (e) {
                console.error("Error parsing saved messages:", e);
            }
        }
    }, []);

    // Save messages to localStorage whenever they change
    useEffect(() => {
        if (_sessionId && messages.length > 0) {
            localStorage.setItem(`chat_history_${_sessionId}`, JSON.stringify(messages));
        }
    }, [messages, _sessionId]);

    const addBotMessage = (content: string) => {
        const assistantMsg: Message = {
            id: `msg-${Date.now()}-assistant`,
            role: 'assistant',
            content,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMsg]);
        setIsTyping(false);
    };

    const handleSendMessage = async (text: string) => {
        // Add user message
        const userMsg: Message = {
            id: `msg-${Date.now()}-user`,
            role: 'user',
            content: text,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMsg]);

        // Standard Chat Behavior
        setIsTyping(true);
        const delay = 800 + Math.random() * 1200;
        setTimeout(async () => {
            const response = await generateCollegeResponse(text);
            if (typeof response === 'string') {
                addBotMessage(response);
            } else if (response.type === 'mail_preview') {
                setMailData({ draft: response.draft, message: response.message, department: response.department });
                setInquiryStep('mail_preview');
                addBotMessage("Here's the mail draft for review. Please confirm to send.");
            }
        }, delay);
    };



    const handleConfirmMail = async () => {
        setInquiryStep('mail_sending');
        try {
            const result = await api.post('/send_mail', { draft: mailData.draft, department: mailData.department });
            if (result.data.status === 'succeed') {
                setInquiryStep('mail_sent');
                addBotMessage(result.data.message);
                setTimeout(() => {
                    setInquiryStep('idle');
                    setMailData({ draft: '', message: '', department: '' });
                }, 5000);
            } else {
                addBotMessage(result.data.message);
                setInquiryStep('mail_preview');
            }
        } catch (error) {
            console.error(error);
            addBotMessage("Sorry, there was an error sending the mail. Please try again.");
            setInquiryStep('mail_preview');
        }
    };

    const handleCancelMail = () => {
        setInquiryStep('idle');
        setMailData({ draft: '', message: '', department: '' });
        addBotMessage("You canceled the mail.");
    };



    return (
        <div className="min-h-screen bg-gradient-soft bg-static-blobs font-sans flex flex-col selection:bg-accent/30 overflow-x-hidden relative">

            {/* HEADER */}
            <header className="sticky top-0 z-50 bg-white/90 border-b border-border shadow-sm">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <motion.div
                            whileHover={{ rotate: 15, scale: 1.15 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="w-10 h-10 rounded-full bg-gradient-hero p-0.5 shadow-md ring-2 ring-white/50"
                        >
                            <img src="/src/assets/bcrec-emblem.png" alt="Logo" className="w-full h-full object-cover rounded-full bg-white shadow-inner" />
                        </motion.div>
                        <div className="flex flex-col">
                            <h1 className="font-serif text-lg font-bold text-primary leading-none group-hover:text-accent transition-all duration-300">BCREC</h1>
                            <span className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">Durgapur</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-secondary rounded-full text-[10px] font-bold text-secondary-foreground border tracking-wider uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            Systems Online
                        </span>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="https://bcrec.ac.in"
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg hover:shadow-accent/20"
                        >
                            Official Site
                            <ExternalLink size={14} />
                        </motion.a>
                    </div>
                </div>
            </header>

            {/* RECRUITER MARQUEE */}
            <RecruiterMarquee />

            {/* MAIN CONTENT */}
            <motion.main
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-7xl mx-auto px-4 md:px-6 py-8 lg:py-16 grow w-full"
            >
                <div className="grid lg:grid-cols-4 gap-8 items-start transform-gpu">

                    {/* CHAT AREA (Left/Center) */}
                    <motion.div
                        className="lg:col-span-3 h-[calc(100vh-16rem)] min-h-[600px] shadow-2xl shadow-black/5 rounded-2xl relative overflow-hidden bg-white/60 border border-white/50"
                    >
                        <ChatContainer
                            messages={messages}
                            isTyping={isTyping}
                            onSendMessage={handleSendMessage}
                            disabled={inquiryStep === 'mail_sending' || inquiryStep === 'mail_sent'}
                        >
                            {inquiryStep !== 'idle' && (inquiryStep === 'mail_preview' || inquiryStep === 'mail_sending' || inquiryStep === 'mail_sent') && (
                                <MailPreview
                                    draft={mailData.draft}
                                    message={mailData.message}
                                    department={mailData.department}
                                    onConfirm={handleConfirmMail}
                                    onCancel={handleCancelMail}
                                    status={inquiryStep === 'mail_sent' ? 'sent' : inquiryStep === 'mail_sending' ? 'sending' : 'preview'}
                                />
                            )}
                        </ChatContainer>
                    </motion.div>

                    {/* SIDEBAR (Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex flex-col gap-6 lg:h-[calc(100vh-16rem)] lg:overflow-y-auto custom-scrollbar pr-1 hidden lg:flex"
                    >

                        {/* Quick Questions */}
                        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/40">
                            <div className="flex items-center gap-2 mb-4">
                                <MessageSquare className="w-4 h-4 text-accent" />
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Quick Inquiries</h3>
                            </div>
                            <div className="flex flex-col gap-2.5">
                                {QUICK_QUESTIONS.map((q: string, i: number) => (
                                    <motion.button
                                        whileHover={{ x: 5, backgroundColor: "hsl(var(--accent) / 0.1)" }}
                                        key={i}
                                        onClick={() => handleSendMessage(q)}
                                        disabled={isTyping}
                                        className={cn(
                                            "px-4 py-3 rounded-xl bg-card text-foreground text-xs font-bold transition-all text-left flex items-center justify-between group w-full border border-border/50 shadow-sm",
                                            isTyping ? "opacity-50 cursor-not-allowed" : "hover:shadow-md hover:border-accent/40"
                                        )}
                                    >
                                        <span className="opacity-80 group-hover:opacity-100">{q}</span>
                                        <ChevronRight className="w-3 h-3 text-accent opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* College Info */}
                        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                            <CollegeInfo />
                        </motion.div>

                        {/* Admission Support */}
                        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                            <AdmissionSupport />
                        </motion.div>

                        {/* Contact Card */}
                        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                            <ContactCard />
                        </motion.div>
                    </motion.div>

                    {/* Mobile Sidebar (Visible below chat on mobile) */}
                    <div className="flex flex-col gap-6 lg:hidden">
                        {/* Quick Questions Mobile */}
                        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/40">
                            <div className="flex items-center gap-2 mb-4">
                                <MessageSquare className="w-4 h-4 text-accent" />
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Quick Questions</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {QUICK_QUESTIONS.map((q: string, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSendMessage(q)}
                                        disabled={isTyping}
                                        className="px-3.5 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider border border-transparent hover:border-accent/20 transition-all"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <CollegeInfo />
                        <AdmissionSupport />
                        <ContactCard />
                    </div>

                </div>
            </motion.main>

            {/* FOOTER */}
            <Footer />
        </div>
    );
}
