import { Send, Edit3, User, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { memo } from 'react';

interface InquiryPreviewProps {
    data: {
        name: string;
        email: string;
        message: string;
    };
    onConfirm: () => void;
    onEdit: () => void;
    status: 'preview' | 'sending' | 'sent';
}

export const InquiryPreview = memo(function InquiryPreview({ data, onConfirm, onEdit, status }: InquiryPreviewProps) {
    if (status === 'sent') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center shadow-sm"
            >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 scale-110">
                    <CheckCircle2 className="text-white w-6 h-6" />
                </div>
                <h3 className="font-bold text-green-900 mb-1">Inquiry Sent!</h3>
                <p className="text-xs text-green-700/80">Our team will get back to you shortly at {data.email}.</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white rounded-2xl border border-border shadow-elevated overflow-hidden"
        >
            <div className="bg-primary/5 px-5 py-4 border-b border-border/50">
                <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                    <MessageSquare size={16} className="text-accent" />
                    Inquiry Summary
                </h3>
            </div>

            <div className="p-5 space-y-4">
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <User size={14} className="text-accent" />
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">Your Name</span>
                        <p className="text-sm font-medium text-foreground">{data.name || "—"}</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <Mail size={14} className="text-accent" />
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">Email Address</span>
                        <p className="text-sm font-medium text-foreground">{data.email || "—"}</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <MessageSquare size={14} className="text-accent" />
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">Message</span>
                        <p className="text-sm text-foreground/80 leading-relaxed italic">"{data.message || "—"}"</p>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-muted/30 border-t border-border/50 flex gap-3">
                <button
                    onClick={onEdit}
                    disabled={status === 'sending'}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-white text-xs font-bold hover:bg-muted/50 transition-all disabled:opacity-50"
                >
                    <Edit3 size={14} />
                    Edit
                </button>
                <button
                    onClick={onConfirm}
                    disabled={status === 'sending'}
                    className={cn(
                        "flex-[2] flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all disabled:opacity-50",
                        status === 'sending' ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                >
                    {status === 'sending' ? (
                        <>
                            <div className="w-3 h-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send size={14} />
                            Send Inquiry
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
});
