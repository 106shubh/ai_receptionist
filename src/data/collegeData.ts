// import { object } from 'framer-motion/client';
import { setSessionValue,getSessionValue } from '../lib/session';
import api from './externalRequest'
import type { AxiosResponse } from 'axios';
interface CollegeApiResponse {
    final_result: string;
    summary: string;
    ready_to_send?: boolean;
    draft?:string
    department?:string
}
export interface CollegeData {
    name: string;
    shortName: string;
    established: number;
    accreditation: string;
    location: string;
    contact: {
        phone: string;
        email: string;
        admission: string;
        website: string;
    };
    stats: {
        departments: number;
        courses: string;
        placementRate: string;
        facultyCount: string;
    };
    departments: string[];
    facilities: string[];
    hostel: {
        description: string;
        fees: string;
    };
    transport: {
        description: string;
        routes: string;
    };
    scholarship: {
        details: string;
    };
    library: {
        details: string;
    };
}

export const collegeData: CollegeData = {
    name: "Dr. B.C. Roy Engineering College, Durgapur",
    shortName: "BCREC",
    established: 2000,
    accreditation: "NAAC Accredited, AICTE Approved, MAKAUT Affiliated",
    location: "Jemua Road, Fuljhore, Durgapur, West Bengal 713206",
    contact: {
        phone: "+91-343-2501353",
        email: "info@bcrec.ac.in",
        admission: "+91-9932245566",
        website: "https://bcrec.ac.in"
    },
    stats: {
        departments: 7,
        courses: "B.Tech, M.Tech, MBA, MCA, BCA, BBA, B.Com",
        placementRate: "85%+",
        facultyCount: "200+"
    },
    departments: [
        "Computer Science & Engineering (CSE)",
        "Information Technology (IT)",
        "Electronics & Communication Engineering (ECE)",
        "Mechanical Engineering (ME)",
        "Electrical Engineering (EE)",
        "Civil Engineering (CE)",
        "CSE - AI & Machine Learning (CSE-AIML)",
        "CSE - Data Science",
        "CSE - Computer Science & Design (CSE-CSD)",
        "CSE - Cyber Security",
        "BCA (Bachelor of Computer Applications)",
        "BBA (Bachelor of Business Administration)",
        "B.Com (Bachelor of Commerce)",
        "MBA (Master of Business Administration)",
        "MCA (Master of Computer Applications)",
        "M.Tech (Various Specializations)"
    ],
    facilities: [
        "State-of-the-art Labs",
        "Modern Hostel (Boys & Girls)",
        "Central Library",
        "Multi-Gymnasium",
        "High-Speed Wi-Fi",
        "Cafeteria",
        "Medical Unit",
        "Bus Transportation"
    ],
    hostel: {
        description: "Separate hostels for boys and girls with 24/7 security, high-speed Wi-Fi, and nutritious meals.",
        fees: "Approximately ₹35,000 - ₹45,000 per semester (Subject to change)."
    },
    transport: {
        description: "BCREC provides bus services across Durgapur and nearby areas for students and staff.",
        routes: "Covers main points like City Centre, Benachity, Station, and more."
    },
    scholarship: {
        details: "Eligible students can apply for SVMCMS, Oasis, and other state/central government scholarships. The college office provides full guidance."
    },
    library: {
        details: "The Central Library has over 80,000 books, digital resources via IEEE/J-GATE, and a quiet study environment."
    }
};

export async function generateCollegeResponse(prompt: string): Promise<string | {type: 'mail_preview', draft: string, message: string, department: string}>{
    try {
    const summary: Record<string, any> =
        getSessionValue<Record<string, any>>('summary') ?? {};

    const request_body = {
        'user_query': prompt,
        'prev_action': summary
    };
    const result:AxiosResponse<CollegeApiResponse> = await api.post('/query',request_body)
    setSessionValue('summary',result.data.summary)
    if(result.data.ready_to_send){
        return {type: 'mail_preview', draft: result.data.draft || '', message: result.data.final_result, department: result.data.department || ''}
    }else{
        return result.data.final_result
    }
    

} catch (error) {
    return "Sorry, I am not getting response from backend"
}

};

export const QUICK_QUESTIONS = [
    "Admission Process",
    "Latest Events & News",
    "Top Placement Records",
    "Hostel Facilities",
    "Available Branches",
    "Available Scholarships",
    "Campus Life",
    "Library Resources",
    "Technical Clubs",
    "Leave a Message"
];

export const getCollegeContext = (): string => {
    return `
You are the Official Virtual Assistant of Dr. B.C. Roy Engineering College (BCREC), Durgapur. 
Your goal is to provide helpful, accurate, and professional information to students and parents based ONLY on the following data:

COLLEGE NAME: ${collegeData.name} (${collegeData.shortName})
ESTABLISHED: ${collegeData.established}
ACCREDITATION: ${collegeData.accreditation}
LOCATION: ${collegeData.location}

CONTACT:
- Phone: ${collegeData.contact.phone}
- Email: ${collegeData.contact.email}
- Admission: ${collegeData.contact.admission}
- Website: ${collegeData.contact.website}

DEPARTMENTS & COURSES:
${collegeData.departments.join(", ")}
Additional: ${collegeData.stats.courses}

FACILITIES:
${collegeData.facilities.join(", ")}

HOSTEL:
${collegeData.hostel.description}
Fees: ${collegeData.hostel.fees}

TRANSPORT:
${collegeData.transport.description}
Routes: ${collegeData.transport.routes}

SCHOLARSHIP:
${collegeData.scholarship.details}

LIBRARY:
${collegeData.library.details}

GUIDELINES:
1. Always be polite and professional.
2. If you don't know the answer or it's not in the data, direct the user to the official website or admission cell.
3. Keep responses concise but informative.
4. Use Markdown formatting (bolding, lists) for readability.
`;
};
