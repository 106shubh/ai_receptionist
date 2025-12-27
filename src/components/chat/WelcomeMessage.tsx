import { GraduationCap, BookOpen, Clock, Shield } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

export function WelcomeMessage() {
    const features = [
        { icon: GraduationCap, text: "7 Departments" },
        { icon: BookOpen, text: "Since 2000" },
        { icon: Clock, text: "24/7 Support" },
        { icon: Shield, text: "MAKAUT Affiliated" },
    ];

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="flex flex-col items-center justify-center p-8 text-center h-full max-w-2xl mx-auto"
        >
            <motion.div
                variants={item}
                className="w-24 h-24 mb-6 rounded-full border-4 border-accent/20 bg-white p-2 shadow-2xl relative group"
            >
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700 animate-pulse-soft" />
                <img
                    src="/src/assets/bcrec-emblem.png"
                    alt="BCREC Emblem"
                    className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
                />
            </motion.div>

            <motion.h1
                variants={item}
                className="font-serif text-3xl font-bold text-foreground mb-2 tracking-tight"
            >
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-hero">BCREC</span>
            </motion.h1>
            <motion.p
                variants={item}
                className="text-secondary-foreground/60 font-medium mb-4"
            >
                Dr. B.C. Roy Engineering College, Durgapur
            </motion.p>

            <motion.p
                variants={item}
                className="text-muted-foreground max-w-md mb-10 leading-relaxed text-sm"
            >
                Your dedicated intelligent assistant for all campus inquiries. How can I help you today?
            </motion.p>

            <motion.div
                variants={item}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mb-10"
            >
                {features.map((feature, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5, backgroundColor: "hsl(var(--accent) / 0.1)" }}
                        className="flex flex-col items-center justify-center p-4 bg-secondary/30 rounded-2xl transition-all text-[11px] font-bold text-foreground border border-transparent hover:border-accent/20 gap-2 cursor-pointer shadow-soft hover:shadow-card"
                    >
                        <feature.icon className="w-6 h-6 text-accent mb-1" />
                        <span className="uppercase tracking-wider opacity-70 group-hover:opacity-100">{feature.text}</span>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div variants={item} className="mt-auto pt-6 border-t border-border/50 w-full opacity-50">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Approved by AICTE & NAAC Accredited
                </p>
            </motion.div>
        </motion.div>
    );
}
