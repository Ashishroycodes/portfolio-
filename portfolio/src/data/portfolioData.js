/**
 * ====================================================================
 * PORTFOLIO CONFIGURATION DATA - PREMIUM DARK / GOLD LUXURY TECH THEME
 * ====================================================================
 * Personalized for Ashish Roy - 3rd Year B.Tech CSE Student & Aspiring Full-Stack Developer
 */

export const portfolioData = {
  // Personal Details
  personal: {
    name: "Ashish Roy",
    preferredName: "Ashish",
    title: "3rd-Year B.Tech CSE Student & Full-Stack Developer",
    statusBadge: "Available for opportunities",
    tagline:
      "3rd-Year B.Tech Computer Science student crafting scalable web architectures, high-performance distributed systems, and modern interactive digital experiences.",
    headline: {
      greeting: "Hello, I'm",
      name: "Ashish Roy",
      role: "Full-Stack Developer &",
      highlight: "Computer Science Engineer",
    },
    bioTitle: "Building solutions with code & creativity.",
    bio: [
      "Hello! I am Ashish Roy, a 3rd-year Bachelor of Technology (B.Tech) Computer Science & Engineering student at Vivekananda Global University (VGU), Jaipur.",
      "I am deeply focused on developing high-performance, user-centric web applications while mastering core computer science foundations in Data Structures, Algorithms, and System Architecture.",
      "I am eager to contribute, learn, and grow through software development internships, hackathons, and collaborative engineering projects.",
    ],
    aboutHighlights: [
      { label: "Problem Solver", desc: "Analytical mindset tackling complex algorithmic and structural challenges." },
      { label: "Clean & Maintainable Code", desc: "Dedicated to writing well-documented, modular, and reusable software." },
      { label: "Continuous Learner", desc: "Always exploring emerging frameworks, system design patterns, and tooling." },
      { label: "Full-Stack & AI Interest", desc: "Passionate about modern React, robust APIs, and applied AI integrations." },
    ],
    cutoutUrl: "/ashish-cutout.png",
    photoUrl: "/profile.jpg",
    location: "Jaipur, India",
    email: "ashishroybr9@gmail.com",
    githubUrl: "https://github.com/Ashishroycodes",
    linkedinUrl: "https://linkedin.com/in/ashish-roy111/",
    portfolioUrl: "https://portfolio-green-phi-wgbvlpt5uc.vercel.app/",
    openToWork: true,
    resumeUrl: "#resume",
    resumePdf: "/resume.pdf",
    currentStatus: "3rd Year B.Tech CSE",
  },

  // Realistic Student Statistics for Hero Section
  heroStats: [
    { label: "Academic Standing", value: "3rd Year", subtext: "B.Tech CSE" },
    { label: "Personal Projects", value: "15+", subtext: "Web & Software" },
    { label: "Technical Skills", value: "12+", subtext: "Languages & Tools" },
  ],

  // Navigation Links
  navLinks: [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ],

  // Social Links
  socialLinks: [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/ashish-roy111/",
      icon: "Linkedin",
      username: "ashish-roy111",
    },
    {
      name: "GitHub",
      url: "https://github.com/Ashishroycodes",
      icon: "Github",
      username: "@Ashishroycodes",
    },
    {
      name: "Portfolio",
      url: "https://portfolio-green-phi-wgbvlpt5uc.vercel.app/",
      icon: "Portfolio",
      username: "Live Portfolio",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/",
      icon: "Instagram",
      username: "@ashishroy",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/",
      icon: "Facebook",
      username: "Ashish Roy",
    },
    {
      name: "Email",
      url: "mailto:ashishroybr9@gmail.com",
      icon: "Mail",
      username: "ashishroybr9@gmail.com",
    },
  ],

  // Skills Data (Distinguished between Primary and Currently Learning)
  skills: {
    primary: [
      { name: "Java", category: "Languages", level: "Primary", description: "Object-Oriented Programming, core algorithms, and robust application logic." },
      { name: "C++", category: "Languages", level: "Primary", description: "Low-level foundations, memory management concepts, and algorithmic problem solving." },
      { name: "Python", category: "Languages", level: "Primary", description: "Scripting, rapid prototyping, backend logic, and AI/ML experiments." },
      { name: "JavaScript", category: "Web Dev", level: "Primary", description: "ES6+, asynchronous programming, DOM manipulation, and modern web architectures." },
      { name: "React", category: "Web Dev", level: "Primary", description: "Component-based architecture, hooks, state management, and modern responsive UI." },
      { name: "HTML5 & CSS3", category: "Web Dev", level: "Primary", description: "Semantic markup, modern CSS layouts, flexbox, grid, and fluid animations." },
      { name: "SQL & DBMS", category: "Data & Systems", level: "Primary", description: "Relational database modeling, complex queries, normalization, and ACID properties." },
      { name: "Git & GitHub", category: "Tools", level: "Primary", description: "Version control, branching workflows, pull requests, and collaborative code reviews." },
    ],
    learning: [
      { name: "Data Structures & Algorithms", category: "Core CS", level: "Learning", description: "Deep practice in arrays, linked lists, trees, graphs, dynamic programming, and optimization." },
      { name: "Node.js & Express", category: "Backend", level: "Learning", description: "Building RESTful endpoints, API routing, middleware, and database connectivity." },
      { name: "AI/ML Fundamentals", category: "Emerging Tech", level: "Learning", description: "Foundational machine learning concepts, neural network theory, and LLM API integrations." },
      { name: "System Design Basics", category: "Architecture", level: "Learning", description: "Understanding client-server models, caching principles, and scalable system trade-offs." },
    ],
  },

  // Services Data (Student-level, authentic)
  services: [
    {
      id: "web-dev",
      title: "Web Development",
      category: "Full-Stack & Web",
      description:
        "Building responsive, standards-compliant web applications designed for speed, clarity, and cross-device compatibility.",
      features: [
        "Modern single-page applications",
        "Responsive, mobile-friendly design",
        "Semantic, SEO-friendly HTML & CSS",
        "Clean, maintainable code structure",
      ],
    },
    {
      id: "frontend-dev",
      title: "Frontend Engineering",
      category: "UI & Component Architecture",
      description:
        "Crafting aesthetic, interactive interfaces with modern React, reusable component design, and smooth user micro-interactions.",
      features: [
        "React component architecture",
        "Tailored modern CSS styling",
        "Smooth page & element transitions",
        "Interactive state management",
      ],
    },
    {
      id: "backend-api",
      title: "Backend & API Development",
      category: "Server & Databases",
      description:
        "Developing structured RESTful APIs and integrating backend services with relational and NoSQL databases.",
      features: [
        "RESTful API design & integration",
        "Database querying with SQL",
        "Server-side scripting with Node.js & Python",
        "CRUD operations & data handling",
      ],
    },
    {
      id: "ai-data",
      title: "AI & Data-Related Projects",
      category: "Intelligent Applications",
      description:
        "Exploring machine learning fundamentals, dataset manipulation, and integrating generative AI endpoints into software solutions.",
      features: [
        "Generative AI API integration",
        "Data parsing & preprocessing in Python",
        "Exploratory data analysis",
        "Smart search & assistance prototypes",
      ],
    },
  ],

  // Featured Projects
  projects: [
    {
      id: "speakup-ai",
      title: "SpeakUp AI – Communication & Interview Practice App",
      category: ["ai", "fullstack"],
      categoryLabel: "AI & Speech Intelligence",
      featured: true,
      summary:
        "AI-driven communication coach and mock interview simulator featuring real-time speech recognition, fluency & vocabulary scoring, multi-turn AI roleplay, and adaptive learning roadmaps.",
      description:
        "SpeakUp AI is a full-stack personal communication coach and interview preparation ecosystem engineered for students and early-career software developers. It bridges the gap between technical competency and expressive presentation with AI-driven mock interviews (Technical, HR, and Behavioral), browser-native speech recognition (STT) and voice synthesis (TTS), interactive vocabulary builders with spaced repetition, situational roleplays, and polymorphic daily improvement analytics. Backed by configurable LLM providers (Google Gemini, Groq, OpenAI), robust JWT user session management, and SQLite/MySQL persistence.",
      image: "/speakup.jpg",
      technologies: [
        "React 19",
        "Node.js",
        "Vite",
        "Google Gemini API",
        "Web Speech API",
        "REST APIs",
        "MySQL / SQLite",
        "JWT Auth",
        "Vercel",
      ],
      demoUrl: "https://speakup-ai-psi.vercel.app/",
      githubUrl: "https://github.com/Ashishroycodes/speakup_ai",
      highlights: [
        "Full-cycle AI Interview Simulator covering Technical, HR, and Behavioral questions with real-time audio transcripts and timers",
        "Structured competency scoring reports evaluating fluency, vocabulary precision, and multi-day polymorphic improvement plans",
        "Interactive AI Communication Coach supporting conversational practice, voice interaction, and contextual response suggestions",
        "Gamified Vocabulary Studio spanning Beginner to Advanced, Interview jargon, and Gen-Z terminology with spaced repetition quizzes",
        "Interactive Roleplay Studio & Daily Challenges with XP progress tracking, streak milestones, and educator dashboard preview mode",
        "Production-grade architecture with React 19, native Node.js REST backend, JWT auth, and dual SQLite/MySQL persistent storage",
      ],
    },
    {
      id: "weathergpt",
      title: "WeatherGPT – AI Weather Advisor",
      category: ["ai", "fullstack"],
      categoryLabel: "AI & Meteorological GIS",
      featured: true,
      summary:
        "Smart India Hackathon (SIH) prototype featuring conversational weather intelligence, GIS Doppler radar tracking, CAP v1.2 disaster alerts, and multilingual voice interaction.",
      description:
        "WeatherGPT is an intelligent conversational meteorological intelligence and GIS decision support platform designed as a Smart India Hackathon (SIH) prototype. It empowers farmers, aviation pilots, maritime operators, and emergency responders with real-time weather analytics, Numerical Weather Prediction (NWP GFS vs. WRF 3km Meso comparisons), CAP v1.2 compliant squall and thunderstorm emergency alerts, and a multilingual voice-enabled AI assistant supporting English and 5 regional Indian languages (Hindi, Bengali, Tamil, Telugu, Marathi).",
      image: "/weathergpt.jpg",
      technologies: [
        "FastAPI",
        "Python 3.13",
        "Vite",
        "JavaScript",
        "Leaflet GIS",
        "Three.js",
        "WebSockets",
        "Open-Meteo API",
        "Docker",
      ],
      demoUrl: "https://weathergpt-ai-weather-advisor.vercel.app/",
      githubUrl: "https://github.com/Ashishroycodes/weathergpt-ai-weather-advisor",
      highlights: [
        "Conversational AI assistant with intent classification, context cards, and multi-turn meteorological reasoning",
        "Dual Numerical Weather Prediction (GFS 0.25° vs WRF 3km) isobaric comparisons and CAPE atmospheric stability indices",
        "CAP v1.2 compliant extreme weather alerts with audio squall sirens and geolocation dispatch",
        "Multilingual voice interaction using Web Speech API (STT & TTS) supporting 6 Indian languages",
        "Sector decision modules for Agriculture (Kisan advisories), Aviation (METAR/TAF), and Marine (INCOIS)",
        "Procedural atmospheric particle canvas rendering 7 dynamic weather themes synced in real-time",
      ],
    },
    {
      id: "cloudpulse",
      title: "CloudPulse – Infrastructure Observability Hub",
      category: "fullstack",
      categoryLabel: "Full-Stack System",
      featured: true,
      summary:
        "Real-time monitoring and anomaly detection platform for Kubernetes clusters, microservice health, and latency bottlenecks.",
      description:
        "CloudPulse provides engineering teams with instant visibility into cluster health, memory leaks, and HTTP response distributions. Features WebSocket streaming, time-series telemetry charts, and automated threshold alerts.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
      technologies: ["React", "Node.js", "WebSockets", "Chart.js", "Docker", "PostgreSQL"],
      demoUrl: "https://cloudpulse-demo.example.com",
      githubUrl: "https://github.com/example/cloudpulse",
      highlights: [
        "Handles 10,000+ streaming events per second with sub-50ms render latency",
        "Configurable alerting rules with instant webhook triggers to Slack & Discord",
        "Built-in telemetry export in CSV and JSON formats",
      ],
    },
    {
      id: "nexus-commerce",
      title: "Nexus – Headless High-Speed E-Commerce",
      category: "frontend",
      categoryLabel: "Frontend Architecture",
      featured: true,
      summary:
        "Blazing fast eCommerce experience with instant fuzzy search, optimistic checkout flow, and 99/100 Lighthouse performance.",
      description:
        "An enterprise-ready storefront engineered for maximum conversion. Implements predictive pre-fetching, multi-currency localization, Stripe Elements integration, and fluid micro-interactions for adding items to the basket.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
      technologies: ["React", "JavaScript", "Modern CSS", "Stripe API", "Vite"],
      demoUrl: "https://nexus-commerce.example.com",
      githubUrl: "https://github.com/example/nexus-commerce",
      highlights: [
        "Achieved 99/100 Google Lighthouse score with zero render blocking",
        "Optimistic UI updates for zero-lag cart management",
        "Fully accessible navigation and keyboard shortcut support",
      ],
    },
    {
      id: "devflow",
      title: "DevFlow – Developer Snippets & Collaboration",
      category: "fullstack",
      categoryLabel: "Full-Stack Tool",
      featured: false,
      summary:
        "Collaborative cloud workspace for organizing syntax-highlighted code snippets, markdown cheatsheets, and API testing payloads.",
      description:
        "Engineered for dev teams to centralize recurring code recipes and configurations. Features Monaco Editor integration, tagging, instant share links with expiring tokens, and dark-mode first design.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
      technologies: ["React", "Express.js", "MongoDB", "Monaco Editor", "JWT"],
      demoUrl: "https://devflow.example.com",
      githubUrl: "https://github.com/example/devflow",
      highlights: [
        "Syntax highlighting support for over 45 programming languages",
        "Role-based access control (Private, Team, Public sharing)",
        "Offline-capable PWA with IndexedDB sync",
      ],
    },
  ],

  // Education & Learning Journey (No fabricated years of employment)
  educationJourney: [
    {
      id: "vgu-btech",
      stage: "Undergraduate Degree",
      title: "B.Tech in Computer Science & Engineering",
      institution: "Vivekananda Global University (VGU)",
      location: "Jaipur, Rajasthan, India",
      period: "2023 – 2027 (Expected)",
      currentStatus: "Current: 3rd Year",
      isCurrent: true,
      description:
        "Actively in 3rd year pursuing Computer Science & Engineering. Specializing in data structures, algorithms, object-oriented software engineering, and full-stack web application development.",
      highlights: [
        "Deepening expertise in Data Structures & Algorithms using Java and C++.",
        "Building real-world web applications and dynamic interfaces using React.",
        "Participating in university coding contests, hackathons, and technical projects.",
      ],
      topics: ["Data Structures & Algorithms", "DBMS & SQL", "Operating Systems", "Computer Networks", "Web Development"],
    },
    {
      id: "dbkn-12th",
      stage: "Senior Secondary Education",
      title: "Higher Secondary Certificate (Class XII) – Science (PCM)",
      institution: "D.B.K.N. College, Narhan",
      location: "Narhan, Bihar, India",
      period: "Completed",
      currentStatus: "Completed",
      isCurrent: false,
      description:
        "Completed senior secondary education in the Science stream with core emphasis on Physics, Chemistry, and Advanced Mathematics.",
      highlights: [
        "Built strong mathematical problem-solving skills in Calculus, Vectors, and Algebra.",
        "Developed analytical reasoning essential for algorithmic computing.",
      ],
      topics: ["Advanced Mathematics", "Physics", "Chemistry", "Analytical Science"],
    },
    {
      id: "st-xaviers-10th",
      stage: "Secondary School Education",
      title: "Secondary School Examination (Class X)",
      institution: "St. Xavier's Public School",
      location: "Bihar, India",
      period: "Completed",
      currentStatus: "Completed",
      isCurrent: false,
      description:
        "Completed secondary matriculation with comprehensive academics in science, mathematics, and computer foundations.",
      highlights: [
        "Established strong discipline, scholastic excellence, and passion for technology.",
        "Participated in school science and logic exhibitions.",
      ],
      topics: ["Mathematics", "General Sciences", "Computer Basics", "English Communication"],
    },
  ],

  // Relevant Certificates
  certificates: [
    {
      id: "cert-deloitte-analytics",
      title: "Data Analytics Job Simulation",
      issuer: "Deloitte",
      issuerBadge: "Deloitte",
      iconColor: "#86bc25",
      issueDate: "August 2026",
      expiryDate: "Lifetime Credential",
      credentialId: "6a870d7a9c1de56b669f6467",
      credentialUrl: "/certificates/deloitte-data-analytics.jpg",
      image: "/certificates/deloitte-data-analytics.jpg",
      category: "Data Analytics",
      skills: ["Data Analysis", "Forensic Technology", "Analytical Thinking", "Data Interpretation"],
      description:
        "Practical job simulation completed with Deloitte via Forage, demonstrating practical tasks in Data Analysis and Forensic Technology (User Verification Code: 68b942cf303929516ee6f0d9).",
    },
    {
      id: "cert-generative-ai",
      title: "What Is Generative AI?",
      issuer: "LinkedIn Learning",
      issuerBadge: "LinkedIn",
      iconColor: "#0a66c2",
      issueDate: "August 2026",
      expiryDate: "Lifetime Credential",
      credentialId: "LINKEDIN-GENAI-2026",
      credentialUrl: "/certificates/cert-generative-ai.pdf",
      image: "/certificates/cert-generative-ai.png",
      pdfUrl: "/certificates/cert-generative-ai.pdf",
      category: "Artificial Intelligence",
      skills: ["Generative AI Models", "Prompt Engineering", "Large Language Models (LLMs)", "AI Ethics"],
      description:
        "Official certificate of completion covering foundational generative AI principles, neural networks, foundation models, and enterprise AI workflows.",
    },
    {
      id: "cert-programming",
      title: "Introduction to Programming & Computer Science",
      issuer: "Academic & Tech Excellence",
      issuerBadge: "Code",
      iconColor: "#d4af37",
      issueDate: "August 2026",
      expiryDate: "Lifetime Credential",
      credentialId: "AK-34039-CS",
      credentialUrl: "/certificates/cert-programming.png",
      image: "/certificates/cert-programming.png",
      category: "Core Engineering",
      skills: ["Algorithms & Logic", "Data Structures", "Control Flow", "Object-Oriented Design"],
      description:
        "Awarded to Ashish Kumar for demonstrated excellence in programming paradigms, algorithmic problem solving, and software fundamentals.",
    },
    {
      id: "cert-technical-advanced",
      title: "Advanced Technical Proficiency & System Architecture",
      issuer: "Global Skill Verification",
      issuerBadge: "Verified",
      iconColor: "#f59e0b",
      issueDate: "2026",
      expiryDate: "Verified",
      credentialId: "GSV-79WKJOSMRG9R",
      credentialUrl: "/certificates/cert-1.jpg",
      image: "/certificates/cert-1.jpg",
      category: "Software Engineering",
      skills: ["System Architecture", "Scalable Systems", "Code Quality", "API Engineering"],
      description:
        "Comprehensive technical evaluation and verification in modern software engineering principles and architectural patterns.",
    },
    {
      id: "cert-completion",
      title: "Specialized Engineering Course Completion",
      issuer: "Technical Education Board",
      issuerBadge: "Academic",
      iconColor: "#e5b842",
      issueDate: "September 2025",
      expiryDate: "Verified",
      credentialId: "E6M-CHJDK-SQYH",
      credentialUrl: "/certificates/cert-completion.pdf",
      image: "/certificates/cert-completion.png",
      pdfUrl: "/certificates/cert-completion.pdf",
      category: "Specialized Systems",
      skills: ["Advanced Computing", "Distributed Logic", "Applied Tech"],
      description:
        "Accredited completion of specialized technical curricula and rigorous practical milestone implementations.",
    },
  ],
};
