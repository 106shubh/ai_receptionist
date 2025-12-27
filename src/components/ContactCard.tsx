import { Phone, Mail, Globe, MapPin, ExternalLink } from 'lucide-react';
import { collegeData } from '@/data/collegeData';
import { memo } from 'react';

export const ContactCard = memo(function ContactCard() {
    return (
        <div className="bg-primary rounded-2xl p-6 text-primary-foreground shadow-elevated relative overflow-hidden group">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <h3 className="font-serif text-lg font-semibold mb-6 flex items-center gap-2 relative z-10">
                Contact Information
            </h3>

            <div className="space-y-5 relative z-10">
                <a
                    href={`tel:${collegeData.contact.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-4 hover:text-accent transition-colors group/link"
                >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/link:bg-white/20 transition-colors">
                        <Phone className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-primary-foreground/60 uppercase tracking-wider">Call Us</span>
                        <span className="text-sm font-medium">{collegeData.contact.phone}</span>
                    </div>
                </a>

                <a
                    href={`mailto:${collegeData.contact.email}`}
                    className="flex items-center gap-4 hover:text-accent transition-colors group/link"
                >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/link:bg-white/20 transition-colors">
                        <Mail className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-primary-foreground/60 uppercase tracking-wider">Email Us</span>
                        <span className="text-sm font-medium">{collegeData.contact.email}</span>
                    </div>
                </a>

                <a
                    href={`http://${collegeData.contact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 hover:text-accent transition-colors group/link"
                >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/link:bg-white/20 transition-colors">
                        <Globe className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-primary-foreground/60 uppercase tracking-wider">Website</span>
                        <span className="text-sm font-medium truncate max-w-[180px]">{collegeData.contact.website}</span>
                    </div>
                </a>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 relative z-10">
                <a
                    href="https://maps.google.com"
                    target="_blank"
                    className="flex items-start gap-3 hover:text-accent transition-colors text-sm leading-relaxed"
                >
                    <MapPin className="w-4 h-4 mt-1 shrink-0" />
                    <span className="opacity-90">{collegeData.location}</span>
                    <ExternalLink className="w-3 h-3 mt-1 opacity-50" />
                </a>
            </div>
        </div>
    );
});
