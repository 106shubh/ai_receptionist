import { motion, type Variants } from 'framer-motion';

export function TypingIndicator() {
    const dotVariants: Variants = {
        animate: {
            y: [0, -6, 0],
            opacity: [0.4, 1, 0.4],
            transition: {
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex w-full mt-3 space-x-3 max-w-3xl mx-auto px-4 mb-4"
        >
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-card border border-accent/20 flex items-center justify-center shadow-sm relative overflow-hidden">
                <img
                    src="/src/assets/bcrec-emblem.png"
                    alt="Assistant"
                    className="w-full h-full object-cover p-1 animate-pulse-soft opacity-50"
                />
            </div>

            <div className="bg-card text-foreground rounded-2xl rounded-tl-sm px-6 py-4 shadow-soft border border-border/50 flex items-center gap-1.5 h-[48px]">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        variants={dotVariants}
                        animate="animate"
                        transition={{ delay: i * 0.15 }}
                        className="w-2 h-2 rounded-full bg-accent/60"
                    />
                ))}
            </div>
        </motion.div>
    );
}
