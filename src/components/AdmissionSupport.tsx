import { Headset } from 'lucide-react';
import { collegeData } from '@/data/collegeData';
import { memo } from 'react';

export const AdmissionSupport = memo(function AdmissionSupport() {
    return (
        <div className="bg-gradient-to-br from-accent to-orange-600 rounded-2xl p-6 text-white shadow-elevated relative overflow-hidden group">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors" />

            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                    <Headset className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-serif text-lg font-bold">Admission Help Desk</h3>
            </div>

            <p className="text-sm text-white/90 mb-6 leading-relaxed">
                Need immediate assistance? Our expert counselors are ready to guide you through the enrollment process.
            </p>

            <div className="space-y-3">
                <a
                    href={`tel:${collegeData.contact.admission}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white text-accent rounded-xl text-sm font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
                >
                    Call Admission Cell
                </a>
                <p className="text-[10px] text-center text-white/70 font-medium uppercase tracking-wider">
                    Mon - Sat • 10 AM - 5 PM
                </p>
            </div>
        </div>
    );
});
