export const SITE_CONFIG = {
    name: "Alex Lima",
    role: "Full Stack Developer",
    shortName: "TKZ Dev",
    url: "https://alexlima-portfolio.vercel.app",
    ogImage: "/opengraph-image.png",
    description: "Portfólio de Alex Lima (Líder TKZ), desenvolvedor Full Stack especializado em Next.js, TypeScript e .NET.",
    keywords: [
        "Alex Lima",
        "Full Stack Developer",
        "Desenvolvedor Full Stack",
        "Next.js",
        "React",
        "TypeScript",
        ".NET",
        "C#",
        "Tailwind CSS",
        "TKZ Dev",
        "Portfolio",
        "Frontend",
        "Backend"
    ],
    stats: {
        yearsExperience: 3,
        projectsDelivered: 15,
        technologies: 10,
    },
    contact: {
        email: "contato@tkzdev.com",
        phone: "+5586995971050",
        phoneDisplay: "+55 (86) 99597-1050",
        whatsappMessage: "Olá Alex! Vi seu portfólio e gostaria de conversar sobre um projeto.",
        whatsappUrl: "https://wa.me/5586995971050"
    },
    social: {
        github: "https://github.com/AlexLimaTKZ",
        linkedin: "https://www.linkedin.com/in/alexslima1/"
    }
} as const;

export const PERSON_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alex Lima",
    "alternateName": "Líder TKZ",
    "url": SITE_CONFIG.url,
    "image": `${SITE_CONFIG.url}/alexlima.png`,
    "jobTitle": "Full Stack Developer",
    "worksFor": {
        "@type": "Organization",
        "name": "TKZ Dev"
    },
    "sameAs": [
        SITE_CONFIG.social.github,
        SITE_CONFIG.social.linkedin
    ],
    "knowsAbout": [
        "Next.js",
        "React",
        "TypeScript",
        ".NET",
        "C#",
        "Tailwind CSS",
        "Full Stack Development",
        "Cloud Computing",
        "SEO Optimization"
    ]
};
