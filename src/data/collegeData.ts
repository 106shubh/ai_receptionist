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

export const generateCollegeResponse = (input: string): string => {
    const text = input.toLowerCase();

    // Greeting
    if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
        return "Hello! I am your BCREC Virtual Assistant. How can I help you today?";
    }

    // Admission
    if (text.includes("admission") || text.includes("apply") || text.includes("join")) {
        return `Admissions at BCREC are based on WBJEE/JEE Main ranks. For the current session, you can contact our admission cell at ${collegeData.contact.admission} or visit the campus for counseling.`;
    }

    // Fees
    if (text.includes("fee") || text.includes("cost") || text.includes("price")) {
        return "The fee structure varies by course. For B.Tech, it's approximately ₹4.5 - 5 Lakhs for the full 4-year course. For a detailed breakdown, please contact the accounts office or visit the official website.";
    }

    // Placements
    if (text.includes("placement") || text.includes("job") || text.includes("company") || text.includes("recruit")) {
        return `BCREC has an excellent placement record of ${collegeData.stats.placementRate}. Major recruiters include TCS, Capgemini, Cognizant, Infosys, and more. Our Training & Placement cell provides rigorous training to all students.`;
    }

    // Departments
    if (text.includes("department") || text.includes("course") || text.includes("branch") || text.includes("stream") || text.includes("what can i study")) {
        return `We offer a wide range of courses:
        
B.Tech Branches: 
CSE, IT, ECE, ME, EE, CE, and specialized streams like CSE-AIML, CSE-Data Science, CSE-CSD, and CSE-Cyber Security.

Professional Courses: 
BCA, BBA, and B.Com.

Postgraduate Courses: 
MBA (with various specializations), MCA, and M.Tech.`;
    }

    // Specific match for new courses
    if (text.includes("bca") || text.includes("bba") || text.includes("b.com") || text.includes("bcom")) {
        return "BCREC offers professional undergraduate courses like BCA, BBA, and B.Com, designed to provide a strong foundation in computer applications, management, and commerce respectively.";
    }

    if (text.includes("mba") || text.includes("mca") || text.includes("mtech") || text.includes("m.tech")) {
        return "Our postgraduate portfolio includes MBA (with multiple specializations), MCA, and M.Tech. These programs are designed for advanced technical and managerial development.";
    }

    // Facilities
    if (text.includes("facility") || text.includes("infrastructure") || text.includes("campus")) {
        return `Our campus features: ${collegeData.facilities.join(", ")}. It's a vibrant environment designed for holistic development.`;
    }

    // Hostel
    if (text.includes("hostel") || text.includes("stay") || text.includes("accommodation") || text.includes("dorm")) {
        return `${collegeData.hostel.description} Fee is roughly ${collegeData.hostel.fees}`;
    }

    // Transport
    if (text.includes("transport") || text.includes("bus") || text.includes("travel") || text.includes("reach")) {
        return `${collegeData.transport.description} ${collegeData.transport.routes}`;
    }

    // Scholarship
    if (text.includes("scholarship") || text.includes("financial aid") || text.includes("svmcms")) {
        return collegeData.scholarship.details;
    }

    // Library
    if (text.includes("library") || text.includes("book") || text.includes("study")) {
        return collegeData.library.details;
    }

    // Contact
    if (text.includes("contact") || text.includes("phone") || text.includes("email") || text.includes("address")) {
        return `You can reach us at ${collegeData.contact.phone} or email ${collegeData.contact.email}. Our campus is located at ${collegeData.location}.`;
    }

    // Location
    if (text.includes("location") || text.includes("where") || text.includes("durgapur")) {
        return `BCREC is located in Durgapur, West Bengal. Exact Address: ${collegeData.location}.`;
    }

    // Default response
    return "I'm not quite sure about that specific request. You might find detailed information on our official website at https://bcrec.ac.in, or you can ask me about admissions, fees, placements, or facilities!";
};

export const QUICK_QUESTIONS = [
    "Admission Process",
    "Fee Structure",
    "Placement Records",
    "Hostel Facilities",
    "Available Branches",
    "Scholarships",
    "Campus Life",
    "Library Resources",
    "Technical Clubs",
    "Leave a Message"
];
