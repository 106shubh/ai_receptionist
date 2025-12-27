import { useRef, useEffect } from 'react';
import type { Message } from "@/types/chat";
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { WelcomeMessage } from './WelcomeMessage';

interface ChatContainerProps {
    messages: Message[];
    isTyping: boolean;
    onSendMessage: (text: string) => void;
    disabled?: boolean;
    children?: React.ReactNode;
}

export function ChatContainer({ messages, isTyping, onSendMessage, disabled, children }: ChatContainerProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messages.length > 0 && scrollRef.current) {
            const container = scrollRef.current;
            // Use requestAnimationFrame to ensure the DOM has rendered the new message
            requestAnimationFrame(() => {
                container.scrollTo({
                    top: container.scrollHeight,
                    behavior: 'smooth'
                });
            });
        }
    }, [messages, isTyping]);

    return (
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-elevated border border-border overflow-hidden ring-1 ring-black/5 will-change-transform">
            <ChatHeader />

            <div
                className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-gradient-soft relative"
                ref={scrollRef}
            >
                <div className="min-h-full flex flex-col pb-4">
                    {messages.length === 0 ? (
                        <WelcomeMessage />
                    ) : (
                        <div className="flex flex-col py-6 gap-2">
                            {messages.map((msg) => (
                                <ChatMessage key={msg.id} message={msg} />
                            ))}

                            {isTyping && <TypingIndicator />}
                        </div>
                    )}

                    {children && (
                        <div className="px-4 py-2 max-w-2xl mx-auto w-full">
                            {children}
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>
            </div>

            <ChatInput onSendMessage={onSendMessage} disabled={disabled} />
        </div>
    );
}
