import { Send, Paperclip, Smile } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (input.trim() && !disabled) {
            onSendMessage(input.trim());
            setInput("");
            // Reset height
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 128)}px`;
        }
    }, [input]);

    return (
        <form
            onSubmit={handleSubmit}
            className={cn(
                "p-4 border-t bg-card/50 backdrop-blur-sm relative z-20 transition-all",
                disabled && "opacity-70 pointer-events-none"
            )}
        >
            <div className="max-w-3xl mx-auto relative">
                <div className="flex items-end gap-2 p-2 bg-chat-input rounded-2xl border shadow-soft focus-within:ring-2 focus-within:ring-accent/30 focus-within:border-accent/50 transition-all duration-300">
                    <button
                        type="button"
                        className="p-2 text-muted-foreground hover:bg-secondary rounded-xl transition-colors shrink-0"
                        title="Attach file (Not implemented)"
                    >
                        <Paperclip size={20} />
                    </button>

                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your question here..."
                        rows={1}
                        className="flex-1 max-h-32 min-h-[44px] py-2.5 px-2 bg-transparent border-0 focus:ring-0 resize-none text-sm placeholder:text-muted-foreground/70 custom-scrollbar"
                        disabled={disabled}
                    />

                    <button
                        type="button"
                        className="p-2 text-muted-foreground hover:bg-secondary rounded-xl transition-colors shrink-0 max-sm:hidden"
                        title="Insert Emoji"
                    >
                        <Smile size={20} />
                    </button>

                    <button
                        type="submit"
                        disabled={!input.trim() || disabled}
                        className={cn(
                            "p-2.5 rounded-xl transition-all duration-300 shrink-0",
                            input.trim() && !disabled
                                ? "bg-gradient-accent text-accent-foreground shadow-glow hover:translate-y-[-1px] active:translate-y-[1px]"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                        )}
                    >
                        <Send size={20} className={cn(input.trim() && !disabled && "fill-current")} />
                    </button>
                </div>
                <div className="text-[10px] text-center mt-2 text-muted-foreground/60 font-medium tracking-wide">
                    Press <kbd className="font-sans px-1 py-0.5 rounded border bg-secondary/50">Enter</kbd> to send • <kbd className="font-sans px-1 py-0.5 rounded border bg-secondary/50">Shift + Enter</kbd> for new line
                </div>
            </div>
        </form>
    );
}
