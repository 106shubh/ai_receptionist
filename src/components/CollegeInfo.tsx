import { BookOpen, GraduationCap, Users, Building2, Trophy, MapPin } from 'lucide-react';
import { collegeData } from '@/data/collegeData';
import { memo } from 'react';

export const CollegeInfo = memo(function CollegeInfo() {
    const stats = [
        { icon: GraduationCap, label: "Departments", value: collegeData.stats.departments },
        { icon: Users, label: "Faculty", value: collegeData.stats.facultyCount },
        { icon: Building2, label: "Placements", value: collegeData.stats.placementRate },
        { icon: Trophy, label: "Recognition", value: "NAAC" },
    ];

    return (
        <div className="bg-card rounded-2xl shadow-card border p-6 hover:shadow-elevated transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-accent/10 rounded-xl">
                    <BookOpen className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                    College Highlights
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-xl border border-transparent hover:border-accent/20 hover:bg-secondary transition-all group"
                    >
                        <stat.icon className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-lg font-bold text-foreground tracking-tight">{stat.value}</span>
                        <span className="text-xs text-muted-foreground font-medium text-center">{stat.label}</span>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t">
                <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-foreground uppercase tracking-wider mb-0.5">Campus</span>
                        <span className="text-xs text-muted-foreground leading-relaxed">
                            {collegeData.location}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
});
