import { Send, MessageSquare, CheckCircle2, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { memo } from 'react';

interface MailPreviewProps {
    draft: string;
    message: string;
    department: string;
    onConfirm: () => void;
    onCancel: () => void;
    status: 'preview' | 'sending' | 'sent';
}

export const MailPreview = memo(function MailPreview({ draft, message, department, onConfirm, onCancel, status }: MailPreviewProps) {
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
                <h3 className="font-bold text-green-900 mb-1">Mail Sent!</h3>
                <p className="text-xs text-green-700/80">The mail has been sent to the {department} department.</p>
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
                    Mail Preview
                </h3>
            </div>

            <div className="p-5 space-y-4">
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <Building size={14} className="text-accent" />
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">Department</span>
                        <p className="text-sm font-medium text-foreground">{department || "—"}</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <MessageSquare size={14} className="text-accent" />
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">Message</span>
                        <p className="text-sm text-foreground/80 leading-relaxed italic">"{message || "—"}"</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <MessageSquare size={14} className="text-accent" />
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">Mail Draft</span>
                        <p className="text-sm text-foreground/80 leading-relaxed">{draft || "—"}</p>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-muted/30 border-t border-border/50 flex gap-3">
                <button
                    onClick={onCancel}
                    disabled={status === 'sending'}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all disabled:opacity-50",
                        status === 'sending' ? "bg-muted text-muted-foreground" : "bg-gray-500 text-white hover:bg-gray-600"
                    )}
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    disabled={status === 'sending'}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all disabled:opacity-50",
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
                            Send Mail
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
});