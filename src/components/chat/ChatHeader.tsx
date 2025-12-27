

interface ChatHeaderProps {
    onlineCount?: number;
}

export function ChatHeader({ onlineCount: _onlineCount = 124 }: ChatHeaderProps) {
    return (
        <div className="flex items-center justify-between p-4 bg-gradient-hero rounded-t-2xl shadow-sm border-b border-white/10 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                    <div className="w-14 h-14 rounded-full border-2 border-accent/50 p-0.5 bg-white/10 backdrop-blur-sm overflow-hidden shadow-lg">
                        <img
                            src="/src/assets/bcrec-emblem.png"
                            alt="BCREC Emblem"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" title="Online" />
                </div>

                <div className="flex flex-col">
                    <h2 className="font-serif text-lg font-semibold text-primary-foreground tracking-wide">
                        Dr. B.C. Roy Engineering College
                    </h2>
                    <span className="text-sm text-primary-foreground/80 font-sans flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft"></span>
                        Virtual Reception • Online
                    </span>
                </div>
            </div>

            <div className="hidden sm:flex flex-col items-end text-primary-foreground/70 relative z-10">
                <span className="text-sm font-medium">BCREC Durgapur</span>
                <span className="text-xs opacity-70">Est. 2000</span>
            </div>
        </div>
    );
}
