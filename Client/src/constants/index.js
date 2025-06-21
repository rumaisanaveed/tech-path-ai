import PersonOne from "../assets/icons/person1.svg";
import PersonTwo from "../assets/icons/person2.svg";
import PersonThree from "../assets/icons/person3.svg";
import PersonFour from "../assets/icons/person4.svg";
import {
  BadgeCheck,
  BarChart3,
  Brush,
  Calculator,
  Calendar,
  Compass,
  Headphones,
  Home,
  LayoutDashboard,
  LocateFixed,
  Newspaper,
  Trophy,
  User,
  Users,
} from "lucide-react";
import Brain from "@/assets/icons/brain.svg";
import CircleCheck from "@/assets/icons/circle-check.svg";
import Timer from "@/assets/icons/timer.svg";

export const floatingTestimonialsData = [
  {
    position: "top-20 left-36",
    imageSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    imageAlt: "Student testimonial",
    text: "Career Mentor has the best\nroadmaps for us students.",
    avatarBgColor: "bg-blue-100",
    textSize: "text-xs",
    textColor: "text-custom-gray-dark",
    borderColor: "border-gray-400",
    showBackground: false,
  },
  {
    position: "top-24 right-24",
    imageSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    imageAlt: "Student testimonial",
    text: "Gamification helps me\nmotivated to keep learning.",
    avatarBgColor: "bg-orange-100",
    textSize: "text-sm",
    textColor: "text-gray-600",
    borderColor: "border-gray-300",
    showBackground: true,
  },
  {
    position: "bottom-36 left-20",
    imageSrc:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    imageAlt: "Student testimonial",
    text: "Career Mentor helped me\ngrow so much.",
    avatarBgColor: "bg-orange-100",
    textSize: "text-sm",
    textColor: "text-gray-600",
    borderColor: "border-gray-300",
    showBackground: true,
  },
  {
    position: "bottom-36 right-12",
    imageSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    imageAlt: "Student testimonial",
    text: "Signing up for Career Mentor is\nthe best decision of my life.",
    avatarBgColor: "bg-purple-100",
    textSize: "text-sm",
    textColor: "text-gray-600",
    borderColor: "border-gray-300",
    showBackground: true,
    maxWidth: "max-w-xs",
  },
];

export const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Blogs", href: "/blogs", icon: Newspaper },
  { label: "Events", href: "/events", icon: User },
  { label: "Career Exploration", href: "/careers", icon: Compass },
];

export const stepsData = [
  {
    heading: "Discover Yourself",
    text: " Take our smart assessment to understand your unique strengths and interests.",
  },
  {
    heading: "Explore Career Paths",
    text: "Dive into top tech fields with clear roadmaps, job roles, and required skills.",
  },
  {
    heading: "Prepare & Connect",
    text: "Start learning, earn badges, and connect with real industry mentors.",
  },
];

export const features = [
  {
    title: "Career Assessment",
    description: "AI-based test to discover what suits you best",
  },
  {
    title: "Career Explorer",
    description: "Explore in-demand tech careers and what’s required",
  },
  {
    title: "Skill Tracking",
    description: "Visualize your learning progress with milestones",
  },
  {
    title: "Expert Guidance",
    description: "Book sessions with real industry professionals",
  },
  {
    title: "Events & Blogs",
    description: "Stay updated with local tech events & insights",
  },
  {
    title: "Gamification",
    description: "Earn points, badges & motivation along your path",
  },
];

export const testimonials = [
  {
    text: "CareerMentor helped me identify my true passion in AI, and now I’m confidently building my skills toward a Data Scientist career!",
    name: "Anas from NUST",
    image: PersonOne,
    borderColor: "#FFC36A",
  },
  {
    text: "Before CareerMentor, I was confused between Web Development and UI/UX. The personalized guidance helped me choose the right path!",
    name: "Aisha from FAST",
    image: PersonTwo,
    borderColor: "#FFD36E",
  },
  {
    text: "The step-by-step learning roadmaps and mentorship sessions gave me clarity that no university course ever did.",
    name: "Bilal from IBA",
    image: PersonThree,
    borderColor: "#A6E3F7",
  },
  {
    text: "CareerMentor helped me identify my true passion and confidently build a career in tech.",
    name: "Anas from GIKI",
    image: PersonFour,
    borderColor: "#8CD4FF",
  },
];

export const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/user/dashboard" },
  {
    label: "Career Assessment",
    icon: BadgeCheck,
    href: "/user/dashboard/career-assessment",
  },
  { label: "Career Explorer", icon: Compass, href: "/careers" },
  {
    label: "Skill Tracker",
    icon: BarChart3,
    href: "/user/dashboard/skill-tracker",
  },
  { label: "Mentorship", icon: Users, href: "/user/dashboard/mentorship" },
  {
    label: "Events",
    icon: Calendar,
    href: "/events",
  },
  {
    label: "Blogs",
    icon: Newspaper,
    href: "/blogs",
    children: [
      { label: "My Blogs", href: "/user/dashboard/my-blogs" },
      { label: "View All Blogs", href: "/blogs" },
    ],
  },
  { label: "Achievements", icon: Trophy, href: "/user/dashboard/achievements" },
];

export const initialAssessmentFeaturesListData = [
  {
    title: "10–15 mins",
    text: "Quick and easy",
    icon: Timer,
  },
  {
    title: "No wrong answers",
    text: "Answer honestly – it’s about you.",
    icon: CircleCheck,
  },
  {
    title: "Smart Suggestions",
    text: "Backed by career data & AI models.",
    icon: Brain,
  },
];

export const assessmentSections = [
  {
    sectionId: 1,
    sectionTitle: "Self Discovery",
    questions: [
      {
        id: "q1-s1",
        text: "This is question 1",
        options: [
          { id: "o1-q1-s1", text: "Option 1" },
          { id: "o2-q1-s1", text: "Option 2" },
          { id: "o3-q1-s1", text: "Option 3" },
          { id: "o4-q1-s1", text: "Option 4" },
        ],
      },
      {
        id: "q2-s1",
        text: "This is question 2",
        options: [
          { id: "o1-q2-s1", text: "Option 1" },
          { id: "o2-q2-s1", text: "Option 2" },
          { id: "o3-q2-s1", text: "Option 3" },
          { id: "o4-q2-s1", text: "Option 4" },
        ],
      },
      {
        id: "q3-s1",
        text: "This is question 3",
        options: [
          { id: "o1-q3-s1", text: "Option 1" },
          { id: "o2-q3-s1", text: "Option 2" },
          { id: "o3-q3-s1", text: "Option 3" },
          { id: "o4-q3-s1", text: "Option 4" },
        ],
      },
      {
        id: "q4-s1",
        text: "This is question 4",
        options: [
          { id: "o1-q4-s1", text: "Option 1" },
          { id: "o2-q4-s1", text: "Option 2" },
          { id: "o3-q4-s1", text: "Option 3" },
          { id: "o4-q4-s1", text: "Option 4" },
        ],
      },
    ],
  },
  {
    sectionId: 2,
    sectionTitle: "Technical Interests",
    questions: [
      {
        id: "q1-s2",
        text: "This is question 1",
        options: [
          { id: "o1-q1-s2", text: "Option 1" },
          { id: "o2-q1-s2", text: "Option 2" },
          { id: "o3-q1-s2", text: "Option 3" },
          { id: "o4-q1-s2", text: "Option 4" },
        ],
      },
      {
        id: "q2-s2",
        text: "This is question 2",
        options: [
          { id: "o1-q2-s2", text: "Option 1" },
          { id: "o2-q2-s2", text: "Option 2" },
          { id: "o3-q2-s2", text: "Option 3" },
          { id: "o4-q2-s2", text: "Option 4" },
        ],
      },
      {
        id: "q3-s2",
        text: "This is question 3",
        options: [
          { id: "o1-q3-s2", text: "Option 1" },
          { id: "o2-q3-s2", text: "Option 2" },
          { id: "o3-q3-s2", text: "Option 3" },
          { id: "o4-q3-s2", text: "Option 4" },
        ],
      },
      {
        id: "q4-s2",
        text: "This is question 4",
        options: [
          { id: "o1-q4-s2", text: "Option 1" },
          { id: "o2-q4-s2", text: "Option 2" },
          { id: "o3-q4-s2", text: "Option 3" },
          { id: "o4-q4-s2", text: "Option 4" },
        ],
      },
    ],
  },
  {
    sectionId: 3,
    sectionTitle: "Work Environment Preferences",
    questions: [
      {
        id: "q1-s3",
        text: "This is question 1",
        options: [
          { id: "o1-q1-s3", text: "Option 1" },
          { id: "o2-q1-s3", text: "Option 2" },
          { id: "o3-q1-s3", text: "Option 3" },
          { id: "o4-q1-s3", text: "Option 4" },
        ],
      },
      {
        id: "q2-s3",
        text: "This is question 2",
        options: [
          { id: "o1-q2-s3", text: "Option 1" },
          { id: "o2-q2-s3", text: "Option 2" },
          { id: "o3-q2-s3", text: "Option 3" },
          { id: "o4-q2-s3", text: "Option 4" },
        ],
      },
      {
        id: "q3-s3",
        text: "This is question 3",
        options: [
          { id: "o1-q3-s3", text: "Option 1" },
          { id: "o2-q3-s3", text: "Option 2" },
          { id: "o3-q3-s3", text: "Option 3" },
          { id: "o4-q3-s3", text: "Option 4" },
        ],
      },
      {
        id: "q4-s3",
        text: "This is question 4",
        options: [
          { id: "o1-q4-s3", text: "Option 1" },
          { id: "o2-q4-s3", text: "Option 2" },
          { id: "o3-q4-s3", text: "Option 3" },
          { id: "o4-q4-s3", text: "Option 4" },
        ],
      },
    ],
  },
  {
    sectionId: 4,
    sectionTitle: "Growth Mindset & Learning",
    questions: [
      {
        id: "q1-s4",
        text: "This is question 1",
        options: [
          { id: "o1-q1-s4", text: "Option 1" },
          { id: "o2-q1-s4", text: "Option 2" },
          { id: "o3-q1-s4", text: "Option 3" },
          { id: "o4-q1-s4", text: "Option 4" },
        ],
      },
      {
        id: "q2-s4",
        text: "This is question 2",
        options: [
          { id: "o1-q2-s4", text: "Option 1" },
          { id: "o2-q2-s4", text: "Option 2" },
          { id: "o3-q2-s4", text: "Option 3" },
          { id: "o4-q2-s4", text: "Option 4" },
        ],
      },
      {
        id: "q3-s4",
        text: "This is question 3",
        options: [
          { id: "o1-q3-s4", text: "Option 1" },
          { id: "o2-q3-s4", text: "Option 2" },
          { id: "o3-q3-s4", text: "Option 3" },
          { id: "o4-q3-s4", text: "Option 4" },
        ],
      },
      {
        id: "q4-s4",
        text: "This is question 4",
        options: [
          { id: "o1-q4-s4", text: "Option 1" },
          { id: "o2-q4-s4", text: "Option 2" },
          { id: "o3-q4-s4", text: "Option 3" },
          { id: "o4-q4-s4", text: "Option 4" },
        ],
      },
    ],
  },
];

export const blogData = [
  {
    id: 1,
    category: "Back-end Development",
    title: "Understanding APIs: A Beginner's Guide to Backend Communication",
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=60",
    span: "col-span-2 row-span-1 lg:col-span-4 lg:row-span-2",
  },
  {
    id: 2,
    category: "Student Lifestyle",
    title: "Balancing Code and Campus Life: Tips for CS Students",
    image:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=800",
    span: "col-span-3 row-span-1 lg:col-span-4 lg:row-span-2",
  },
  {
    id: 3,
    category: "AI & Machine Learning",
    title: "Getting Started with Machine Learning Using Python",
    image:
      "https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202104/coding%20AI.png?itok=2gbVOckg",
    span: "col-span-3 row-span-2 lg:col-span-3 lg:row-span-3",
  },
  {
    id: 4,
    category: "Tech Trends",
    title: "Top Technologies CS Students Should Learn in 2025",
    image:
      "https://www.embl.org/news/wp-content/uploads/2020/10/BRAZMA_Machine_Learning_1000x600.jpg",
    span: "col-span-2 row-span-1 lg:col-span-5 lg:row-span-3",
  },
  {
    id: 5,
    category: "Web Development",
    title: "Why You Should Learn React in 2025",
    image:
      "https://codesrevolvewordpress.s3.us-west-2.amazonaws.com/revolveai/2023/01/18072951/machine-learning-in-code-generation.png",
    span: "col-span-2 row-span-1 lg:col-span-3 lg:row-span-1",
  },
  {
    id: 6,
    category: "Career & Internships",
    title: "How to Land Your First Internship as a CS Student",
    image:
      "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=800",
    span: "col-span-5 row-span-1 lg:col-span-2 lg:row-span-2",
  },
  {
    id: 7,
    category: "Open Source & Community",
    title: "Why Contributing to Open Source Makes You a Better Developer",
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=60",
    span: "col-span-5 row-span-1 lg:col-span-4 lg:row-span-2",
  },
];

export const assessmentSectionsNames = [
  {
    id: 1,
    name: "Communication and Interest",
    icon: Headphones,
  },
  {
    id: 2,
    name: "Problem Solving Skills",
    icon: Calculator,
  },
  {
    id: 3,
    name: "Critical Thinking",
    icon: LocateFixed,
  },
  {
    id: 4,
    name: "Creative Thinking",
    icon: Brush,
  },
];

// Dummy trait data (replace with dynamic if needed)
export const traits = [
  { name: "Communication and Interest", value: 80 },
  { name: "Problem Solving Skills", value: 70 },
  { name: "Critical Thinking", value: 50 },
  { name: "Creative Thinking", value: 60 },
];

// Dummy recommended careers
export const careers = [
  "Frontend Developer",
  "UI / UX Designer",
  "Mobile App Developer",
];

export const adminSidebarItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    label: "Blogs Management",
    icon: Newspaper,
    href: "/admin/dashboard/blogs",
  },
  {
    label: "Events Management",
    icon: Calendar,
    href: "/admin/dashboard/events",
  },
  {
    label: "Career Assessment Management",
    icon: BadgeCheck,
    href: "/admin/dashboard/career-assessment",
  },
  {
    label: "Career Explorer Management",
    icon: Compass,
    href: "/admin/dashboard/career-explorer",
  },
];
