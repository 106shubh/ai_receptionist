import { User, Copy, Check } from 'lucide-react';
import { cn } from "@/lib/utils";
import type { Message } from "@/types/chat";
import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessageProps {
    message: Message;
}

export const ChatMessage = memo(function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === 'user';
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1] // Custom ease-out expo for smoothness
            }}
            className={cn(
                "flex w-full mt-3 space-x-3 max-w-3xl mx-auto px-4 group",
                isUser ? "flex-row-reverse space-x-reverse" : "flex-row"
            )}
        >
            <div
                className={cn(
                    "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-md z-10 transition-transform duration-300 group-hover:scale-110",
                    isUser
                        ? "bg-gradient-hero text-primary-foreground ring-2 ring-white"
                        : "bg-card border border-accent/20 p-0.5"
                )}
            >
                {isUser ? (
                    <User className="h-5 w-5" />
                ) : (
                    <img
                        src="/src/assets/bcrec-emblem.png"
                        alt="Assistant"
                        className="w-full h-full object-cover rounded-full"
                    />
                )}
            </div>

            <div className={cn("flex flex-col relative max-w-[85%] lg:max-w-[75%]", isUser ? "items-end" : "items-start")}>
                <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-[10px] font-bold tracking-tight text-muted-foreground/60 uppercase">
                        {isUser ? "Sender" : "BCREC Assistant"}
                    </span>
                    <span className="text-[10px] text-muted-foreground/40">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>

                <div
                    className={cn(
                        "relative px-5 py-3.5 shadow-sm text-sm leading-relaxed whitespace-pre-wrap transition-all duration-300",
                        isUser
                            ? "bg-chat-user text-chat-user-foreground rounded-2xl rounded-tr-sm shadow-md hover:shadow-lg"
                            : "bg-card text-foreground rounded-2xl rounded-tl-sm border border-border/50 hover:border-accent/40 shadow-soft"
                    )}
                >
                    {message.content}

                    <AnimatePresence>
                        {!isUser && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                whileHover={{ scale: 1.1 }}
                                animate={{ opacity: 1 }}
                                onClick={handleCopy}
                                className="absolute -right-10 top-2 p-2 text-muted-foreground/40 hover:text-accent transition-colors rounded-full hover:bg-white/50"
                                title="Copy response"
                            >
                                {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
});
