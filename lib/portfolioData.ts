// Portfolio Data Configuration
// یہاں اپنی معلومات تبدیل کریں | Edit Your Information Here

export const personalInfo = {
  name: "Muhammad Abid",
  title: "Full-Stack Developer",
  subtitle: "Sr. Laravel, PHP, React.js & Next.js Developer",
  location: "Lahore, Pakistan",
  experience: "4+ Years",
  bio: "Passionate Full-Stack Developer with over 4 years of experience building scalable web applications. I specialize in backend development with Laravel and PHP, while also crafting modern, responsive frontends using React.js and Next.js. I love turning complex problems into simple, beautiful, and intuitive solutions.",
  email: "abidali31570@gmail.com",
  phone: "+923048948784",
  resumeUrl: "/resume.pdf",
};

export const socialLinks = {
  github: "https://github.com/abid729",
  linkedin: "https://www.linkedin.com/in/abid729",
  twitter: "",
  website: "",
};

export const skills = [
  {
    category: "Backend Development",
    items: [
      { name: "Laravel", level: 95 },
      { name: "PHP", level: 95 },
      { name: "MySQL", level: 90 },
      { name: "PostgreSQL", level: 85 },
      { name: "RESTful APIs", level: 95 },
      { name: "GraphQL", level: 80 },
    ]
  },
  {
    category: "Frontend Development",
    items: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML/CSS", level: 95 },
    ]
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS", level: 85 },
      { name: "Docker", level: 80 },
      { name: "Git/GitHub", level: 90 },
      { name: "CI/CD", level: 80 },
      { name: "Linux", level: 85 },
    ]
  },
  {
    category: "Other Skills",
    items: [
      { name: "API Integration", level: 95 },
      { name: "Database Design", level: 90 },
      { name: "Problem Solving", level: 95 },
      { name: "Agile/Scrum", level: 85 },
      { name: "Team Leadership", level: 80 },
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard. Built for scalability and performance.",
    technologies: ["Laravel", "React.js", "MySQL", "Stripe", "AWS"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop",
    githubUrl: "https://github.com/abid729/ecommerce-platform",
    liveUrl: "https://www.bompvt.com/",
    featured: true,
  },
  {
    id: 2,
    title: "Real-Time Chat Application",
    description: "WebSocket-based real-time chat application with group chat, file sharing, and push notifications. Supports thousands of concurrent users.",
    technologies: ["Next.js", "Socket.io", "Redis", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&h=500&fit=crop",
    githubUrl: "#",
    liveUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Task Management System",
    description: "Collaborative project management tool with kanban boards, time tracking, and team analytics. Perfect for agile teams.",
    technologies: ["Laravel", "Next.js", "MySQL", "Redis"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
    githubUrl: "#",
    liveUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Social Media Analytics Dashboard",
    description: "Advanced analytics dashboard for tracking social media metrics across multiple platforms with AI-powered insights.",
    technologies: ["React.js", "Laravel", "Chart.js", "MySQL", "AWS"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    githubUrl: "",
    liveUrl: "",
    featured: false,
  },
  {
    id: 5,
    title: "Booking & Reservation System",
    description: "Multi-vendor booking platform with calendar integration, payment processing, and automated email notifications.",
    technologies: ["Laravel", "React.js", "MySQL", "Stripe", "SendGrid"],
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=500&fit=crop",
    githubUrl: "https://github.com/abid729/booking-system",
    liveUrl: "https://example-booking.com",
    featured: true,
  },
  {
    id: 6,
    title: "Learning Management System",
    description: "Complete LMS with course creation, video streaming, quizzes, and student progress tracking. Used by 10,000+ students.",
    technologies: ["Next.js", "Laravel", "PostgreSQL", "AWS S3", "Stripe"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop",
    githubUrl: "https://github.com/abid729/lms-platform",
    liveUrl: "",
    featured: false,
  }
];

export const experiences = [
  {
    id: 1,
    position: "Senior Full-Stack Developer",
    company: "Arhamsoft.",
    location: "Lahore, Pakistan",
    period: "Jan 2022 - Present",
    description: "Leading development of enterprise web applications using Laravel and React.js. Managing a team of 5 developers and implementing best practices.",
    achievements: [
      "Improved application performance by 60%",
      "Led migration to microservices architecture",
      "Mentored junior developers"
    ]
  },
  {
    id: 2,
    position: "Full-Stack Developer",
    company: "BMA Solutions",
    location: "Lahore, Pakistan",
    period: "Mar 2021 - Dec 2021",
    description: "Developed and maintained multiple client projects using Laravel, PHP, and modern JavaScript frameworks.",
    achievements: [
      "Delivered 20+ successful projects",
      "Implemented CI/CD pipelines",
      "Reduced deployment time by 70%"
    ]
  },
  
];

export const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Virtual University of Pakistan",
    location: "Lahore, Pakistan",
    year: "2018 - 2020",
    grade: "CGPA: 3.7/4.0"
  }
];

export const certifications = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2023"
  },
  {
    name: "Laravel Certified Developer",
    issuer: "Laravel",
    year: "2022"
  },
  {
    name: "React.js Professional Certification",
    issuer: "Meta",
    year: "2022"
  }
];

