import { } from 'framer-motion'; // Removed unused motion

const recruiters = [
    "TCS", "Capgemini", "Cognizant", "Infosys", "Wipro",
    "IBM", "Accenture", "SAP", "Tech Mahindra", "Amazon"
];

export function RecruiterMarquee() {
    const duplicatedRecruiters = [...recruiters, ...recruiters, ...recruiters, ...recruiters];

    return (
        <div className="w-full bg-white/80 border-t border-b border-border py-4 overflow-hidden relative shadow-sm">
            <div className="max-w-7xl mx-auto px-4 md:px-6 mb-2">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 text-center">
                    Placement Excellence • Top Recruiters
                </h3>
            </div>

            <div className="flex relative items-center overflow-hidden">
                <div
                    className="flex whitespace-nowrap gap-12 px-12 animate-[marquee_40s_linear_infinite] will-change-transform"
                    style={{ width: 'max-content' }}
                >
                    {duplicatedRecruiters.map((name, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer group"
                        >
                            <div className="w-2 h-2 rounded-full bg-accent group-hover:scale-150 transition-transform" />
                            <span className="text-sm font-black text-foreground tracking-tighter uppercase">{name}</span>
                        </div>
                    ))}
                </div>

                {/* Fade edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background/90 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background/90 to-transparent z-10 pointer-events-none" />
            </div>
        </div>
    );
}
