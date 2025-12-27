import { motion } from 'framer-motion';
import { collegeData } from '@/data/collegeData';
import { Facebook, Twitter, Instagram, Linkedin, Facebook as Youtube } from 'lucide-react';

export function Footer() {
    return (
        <footer className="mt-auto bg-card/95 border-t border-border pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand & Mission */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-hero p-0.5 shadow-md">
                                <img src="/src/assets/bcrec-emblem.png" alt="Logo" className="w-full h-full object-cover rounded-full bg-white shadow-inner" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-serif text-lg font-bold text-primary leading-none">BCREC</span>
                                <span className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">Durgapur</span>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Dr. B.C. Roy Engineering College, Durgapur is dedicated to excellence in technical education and research, fostering innovation and leadership in our students.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, idx) => (
                                <motion.a
                                    key={idx}
                                    whileHover={{ y: -3, color: "hsl(var(--accent))" }}
                                    href="#"
                                    className="text-muted-foreground/60 transition-colors"
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Academic Excellence</h4>
                        <ul className="flex flex-col gap-3">
                            {["Computer Science & Engineering", "Mechanical Engineering", "Electronics & Comm.", "Electrical Engineering"].map((link, idx) => (
                                <li key={idx}>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Important Links */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Student Portals</h4>
                        <ul className="flex flex-col gap-3">
                            {["Admission 2024", "Placement Cell", "Scholarship Guidance", "Campus Life", "Alumni Connect"].map((link, idx) => (
                                <li key={idx}>
                                    <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Get In Touch</h4>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">Phone</span>
                                <span className="text-sm font-medium text-foreground">{collegeData.contact.phone}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">Email</span>
                                <span className="text-sm font-medium text-foreground">{collegeData.contact.email}</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
                            © {new Date().getFullYear()} Dr. B.C. Roy Engineering College, Durgapur
                        </p>
                        <p className="text-[10px] font-serif italic text-muted-foreground/30">
                            An Autonomous Institute | MAKAUT Affiliated | NAAC Accredited
                        </p>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
                        Design & Developed by <span className="text-accent/60">AI Assistant</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
