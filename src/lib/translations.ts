export type Language = 'en' | 'pt' | 'es';

export const translations = {
    en: {
        nav: {
            about: "About",
            skills: "Skills",
            projects: "Projects",
            contact: "Contact",
        },
        hero: {
            badge: "Available for hire",
            title_start: "Transforming ideas into",
            title_highlight: "high-performance software.",
            title_end: "",
            description: "Full-Stack Developer with hands-on experience in Next.js, .NET, and cloud services. I design and deliver scalable web applications focused on performance and exceptional user experience.",
            projectsBtn: "View Projects",
            contactBtn: "Contact Me",
            downloadCv: "Download CV",
        },
        about: {
            title: "About Me",
            description1: "I'm a Full-Stack Developer with real-world experience delivering web applications for clients and businesses. I combine a solid foundation in Systems Analysis and Development with practical expertise gained from shipping production-ready projects — my focus is on building digital products that perform, scale, and provide a seamless user experience.",
            description2: "My core stack revolves around the JavaScript ecosystem, with deep proficiency in Next.js, TypeScript, and Tailwind CSS (with Shadcn/ui) for crafting modern interfaces. On the Back-end, I leverage C# and .NET to architect robust, scalable solutions tailored to each project's needs.",
            description3: "Beyond client work, I'm the founder of TKZ Dev — a developer community where I mentor aspiring developers through code reviews, pair programming, and hands-on guidance. Leading this community has sharpened my skills in leadership, communication, and collaborative problem-solving.",
            experienceTitle: "Experience",
            experiences: [
                {
                    year: "2025 - Present",
                    title: "Full Stack Developer",
                    company: "Freelance",
                    description: "Designing and delivering end-to-end web applications for clients — from requirements gathering to deployment. Working with Next.js, C#/.NET, and cloud services to ship performant, production-ready solutions."
                },
                {
                    year: "2025 - Present",
                    title: "Founder & Tech Lead",
                    company: "TKZ Dev",
                    description: "Founded and lead a developer community focused on mentoring junior developers through code reviews, technical workshops, and real-world project collaboration."
                },
                {
                    year: "2024 - 2025",
                    title: "Full Stack Developer — Training & Certification",
                    company: "Bootcamps & Specializations",
                    description: "Completed intensive C# + .NET Bootcamp and Next.js specialization. Currently pursuing a degree in Systems Analysis and Development to complement hands-on experience."
                }
            ]
        },
        skills: {
            title: "Tech Stack",
            description: "The technologies I use daily to build performant, scalable web applications for real clients.",
            categories: {
                Frontend: "Frontend",
                Backend: "Backend",
                Tools: "Tools",
            },
            cardDescription: "My go-to technologies for {category} development.",
        },
        projects: {
            title: "Featured Projects",
            description: "Real projects I've built and delivered — showcasing my ability to solve problems and ship quality software.",
            links: {
                code: "Code",
                demo: "Demo",
            },
            items: [
                {
                    title: "E-Commerce Platform",
                    description: "A full-featured online store built with Next.js 13, Server Components, and Stripe integration for a client's retail business."
                },
                {
                    title: "SaaS Dashboard",
                    description: "Real-time analytics dashboard with interactive chart visualization, role-based access, and team collaboration features."
                },
                {
                    title: "AI Content Generator",
                    description: "Production application leveraging OpenAI's GPT-4 API to help content teams generate and optimize high-quality blog posts at scale."
                }
            ]
        },
        contact: {
            title: "Let's Work Together",
            description: "Have a project that needs a developer? Let's talk about how I can help bring your idea to life.",
            form: {
                name: "Name",
                namePlaceholder: "John Doe",
                email: "Email",
                emailPlaceholder: "john@example.com",
                message: "Message",
                messagePlaceholder: "Tell me about your project...",
                submit: "Send Message",
            },
            validation: {
                name: "Name must be at least 2 characters.",
                email: "Please enter a valid email address.",
                message: "Message must be at least 10 characters.",
                success: "Message sent!",
            },
        },
        technologies: {
            javascript: "JavaScript is the programming language of the Web. I use it daily to create interactive and dynamic user experiences.",
            typescript: "TypeScript extends JavaScript by adding types. It helps me write more robust and maintainable production code.",
            go: "Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.",
            nextjs: "Next.js is my primary React framework for production. I use it to build server-rendered, high-performance web applications.",
            nodejs: "Node.js is a JavaScript runtime I use to build scalable APIs and backend services for my projects.",
            aws_lambda: "AWS Lambda lets you run code without provisioning or managing servers. I use it for serverless compute tasks in production.",
            amazon_s3: "Amazon S3 is an object storage service I use for scalable and secure file storage in client applications.",
            dynamodb: "Amazon DynamoDB is a key-value and document database that delivers single-digit millisecond performance at any scale.",
            postgresql: "PostgreSQL is my go-to relational database for projects that require complex queries and data integrity.",
            mysql: "MySQL is a reliable open source database I've used in several client projects for scalable data storage.",
            redis: "Redis is an in-memory data structure store I use for caching, session management, and real-time features.",
            rust: "Rust is a language empowering everyone to build reliable and efficient software. I use it for high-performance components.",
            python: "Python is a programming language I use for scripting, automation, and rapid prototyping.",
            react: "React is the JavaScript library at the core of my frontend work. I use it to build modern, component-driven web apps.",
            default: "A powerful technology in my stack.",
        },
        footer: {
            rights: "All rights reserved.",
            builtWidth: "Built with Next.js, Tailwind & Shadcn/ui",
        },
    },
    pt: {
        nav: {
            about: "Sobre",
            skills: "Habilidades",
            projects: "Projetos",
            contact: "Contato",
        },
        hero: {
            badge: "Disponível para contratação",
            title_start: "Transformando ideias em",
            title_highlight: "software de alta performance.",
            title_end: "",
            description: "Desenvolvedor Full-Stack com experiência prática em Next.js, .NET e serviços cloud. Projeto e entrego aplicações web escaláveis com foco em performance e experiência do usuário.",
            projectsBtn: "Ver Projetos",
            contactBtn: "Entre em Contato",
            downloadCv: "Baixar Currículo",
        },
        about: {
            title: "Sobre Mim",
            description1: "Sou Desenvolvedor Full-Stack com experiência real na entrega de aplicações web para clientes e empresas. Combino uma base sólida em Análise e Desenvolvimento de Sistemas com expertise prática adquirida entregando projetos em produção — meu foco é construir produtos digitais que performam, escalam e proporcionam uma experiência de usuário impecável.",
            description2: "Minha stack principal é centrada no ecossistema JavaScript, com profundo domínio de Next.js, TypeScript e Tailwind CSS (com Shadcn/ui) para criar interfaces modernas. No Back-end, utilizo C# e .NET para arquitetar soluções robustas e escaláveis sob medida para cada projeto.",
            description3: "Além do trabalho com clientes, sou fundador da TKZ Dev — uma comunidade de desenvolvedores onde mentoro profissionais em início de carreira através de code reviews, pair programming e orientação prática. Liderar essa comunidade aprimorou minhas habilidades em liderança, comunicação e resolução colaborativa de problemas.",
            experienceTitle: "Experiência",
            experiences: [
                {
                    year: "2025 - Presente",
                    title: "Desenvolvedor Full Stack",
                    company: "Freelancer",
                    description: "Projetando e entregando aplicações web completas para clientes — do levantamento de requisitos ao deploy. Trabalhando com Next.js, C#/.NET e serviços cloud para entregar soluções performáticas e prontas para produção."
                },
                {
                    year: "2025 - Presente",
                    title: "Fundador & Tech Lead",
                    company: "TKZ Dev",
                    description: "Fundei e lidero uma comunidade de desenvolvedores focada em mentorar devs juniores através de code reviews, workshops técnicos e colaboração em projetos reais."
                },
                {
                    year: "2024 - 2025",
                    title: "Desenvolvedor Full Stack — Formação & Certificação",
                    company: "Bootcamps & Especializações",
                    description: "Conclusão de Bootcamp intensivo C# + .NET e especialização em Next.js. Atualmente cursando Análise e Desenvolvimento de Sistemas para complementar a experiência prática."
                }
            ]
        },
        skills: {
            title: "Tecnologias",
            description: "As tecnologias que utilizo no dia a dia para construir aplicações web performáticas e escaláveis para clientes reais.",
            categories: {
                Frontend: "Frontend",
                Backend: "Backend",
                Tools: "Ferramentas",
            },
            cardDescription: "Minhas principais tecnologias para desenvolvimento {category}.",
        },
        projects: {
            title: "Projetos em Destaque",
            description: "Projetos reais que construí e entreguei — demonstrando minha capacidade de resolver problemas e entregar software de qualidade.",
            links: {
                code: "Código",
                demo: "Demo",
            },
            items: [
                {
                    title: "Plataforma E-Commerce",
                    description: "Loja online completa construída com Next.js 13, Server Components e integração Stripe para o negócio de varejo de um cliente."
                },
                {
                    title: "Dashboard SaaS",
                    description: "Dashboard de análise em tempo real com visualização interativa de gráficos, controle de acesso por perfil e recursos de colaboração em equipe."
                },
                {
                    title: "Gerador de Conteúdo AI",
                    description: "Aplicação em produção utilizando a API GPT-4 da OpenAI para ajudar equipes de conteúdo a gerar e otimizar posts de blog de alta qualidade em escala."
                }
            ]
        },
        contact: {
            title: "Vamos Trabalhar Juntos",
            description: "Tem um projeto que precisa de um desenvolvedor? Vamos conversar sobre como posso ajudar a tirar sua ideia do papel.",
            form: {
                name: "Nome",
                namePlaceholder: "João Silva",
                email: "Email",
                emailPlaceholder: "joao@exemplo.com",
                message: "Mensagem",
                messagePlaceholder: "Me conte sobre seu projeto...",
                submit: "Enviar Mensagem",
            },
            validation: {
                name: "Nome deve ter pelo menos 2 caracteres.",
                email: "Por favor insira um email válido.",
                message: "Mensagem deve ter pelo menos 10 caracteres.",
                success: "Mensagem enviada!",
            },
        },
        technologies: {
            javascript: "JavaScript é a linguagem da Web. Utilizo diariamente para criar experiências de usuário interativas e dinâmicas.",
            typescript: "TypeScript estende o JavaScript adicionando tipos. Me ajuda a escrever código de produção mais robusto e manutenível.",
            go: "Go é uma linguagem open source que facilita a construção de software simples, confiável e eficiente.",
            nextjs: "Next.js é meu framework React principal para produção. Uso para construir aplicações web de alta performance com renderização no servidor.",
            nodejs: "Node.js é o runtime JavaScript que utilizo para construir APIs escaláveis e serviços backend nos meus projetos.",
            aws_lambda: "AWS Lambda permite rodar código sem gerenciar servidores. Uso para tarefas de computação serverless em produção.",
            amazon_s3: "Amazon S3 é o serviço de armazenamento que utilizo para storage escalável e seguro em aplicações de clientes.",
            dynamodb: "Amazon DynamoDB é um banco de dados chave-valor e documento que entrega desempenho de milissegundos em qualquer escala.",
            postgresql: "PostgreSQL é meu banco relacional preferido para projetos que exigem queries complexas e integridade de dados.",
            mysql: "MySQL é um banco de dados confiável que já utilizei em diversos projetos de clientes para armazenamento escalável.",
            redis: "Redis é um armazenamento em memória que utilizo para cache, gerenciamento de sessões e features em tempo real.",
            rust: "Rust é uma linguagem para construir software confiável e eficiente. Uso para componentes de alta performance.",
            python: "Python é a linguagem que utilizo para scripting, automação e prototipagem rápida.",
            react: "React é a biblioteca no core do meu trabalho frontend. Uso para construir web apps modernos e baseados em componentes.",
            default: "Uma tecnologia poderosa na minha stack.",
        },
        footer: {
            rights: "Todos os direitos reservados.",
            builtWidth: "Construído com Next.js, Tailwind & Shadcn/ui",
        },
    },
    es: {
        nav: {
            about: "Sobre",
            skills: "Habilidades",
            projects: "Proyectos",
            contact: "Contacto",
        },
        hero: {
            badge: "Disponible para contratación",
            title_start: "Transformando ideas en",
            title_highlight: "software de alto rendimiento.",
            title_end: "",
            description: "Desarrollador Full-Stack con experiencia práctica en Next.js, .NET y servicios cloud. Diseño y entrego aplicaciones web escalables enfocadas en rendimiento y experiencia de usuario excepcional.",
            projectsBtn: "Ver Proyectos",
            contactBtn: "Contáctame",
            downloadCv: "Descargar CV",
        },
        about: {
            title: "Sobre Mí",
            description1: "Soy Desarrollador Full-Stack con experiencia real entregando aplicaciones web para clientes y empresas. Combino una base sólida en Análisis y Desarrollo de Sistemas con experiencia práctica adquirida entregando proyectos listos para producción — mi enfoque es construir productos digitales que rindan, escalen y proporcionen una experiencia de usuario impecable.",
            description2: "Mi stack principal se centra en el ecosistema JavaScript, con profundo dominio de Next.js, TypeScript y Tailwind CSS (con Shadcn/ui) para crear interfaces modernas. En el Back-end, utilizo C# y .NET para arquitectar soluciones robustas y escalables adaptadas a las necesidades de cada proyecto.",
            description3: "Además del trabajo con clientes, soy fundador de TKZ Dev — una comunidad de desarrolladores donde mentorizo a profesionales en inicio de carrera a través de revisiones de código, pair programming y orientación práctica. Liderar esta comunidad ha perfeccionado mis habilidades en liderazgo, comunicación y resolución colaborativa de problemas.",
            experienceTitle: "Experiencia",
            experiences: [
                {
                    year: "2025 - Presente",
                    title: "Desarrollador Full Stack",
                    company: "Freelance",
                    description: "Diseñando y entregando aplicaciones web completas para clientes — desde el levantamiento de requisitos hasta el despliegue. Trabajando con Next.js, C#/.NET y servicios cloud para entregar soluciones de alto rendimiento listas para producción."
                },
                {
                    year: "2025 - Presente",
                    title: "Fundador & Tech Lead",
                    company: "TKZ Dev",
                    description: "Fundé y lidero una comunidad de desarrolladores enfocada en mentorizar a devs juniors a través de revisiones de código, talleres técnicos y colaboración en proyectos reales."
                },
                {
                    year: "2024 - 2025",
                    title: "Desarrollador Full Stack — Formación y Certificación",
                    company: "Bootcamps y Especializaciones",
                    description: "Finalización de Bootcamp intensivo C# + .NET y especialización en Next.js. Actualmente cursando Análisis y Desarrollo de Sistemas para complementar la experiencia práctica."
                }
            ]
        },
        skills: {
            title: "Tech Stack",
            description: "Las tecnologías que utilizo a diario para construir aplicaciones web escalables y de alto rendimiento para clientes reales.",
            categories: {
                Frontend: "Frontend",
                Backend: "Backend",
                Tools: "Herramientas",
            },
            cardDescription: "Mis tecnologías principales para desarrollo {category}.",
        },
        projects: {
            title: "Proyectos Destacados",
            description: "Proyectos reales que construí y entregué — demostrando mi capacidad de resolver problemas y entregar software de calidad.",
            links: {
                code: "Código",
                demo: "Demo",
            },
            items: [
                {
                    title: "Plataforma E-Commerce",
                    description: "Tienda en línea completa construida con Next.js 13, Server Components e integración Stripe para el negocio minorista de un cliente."
                },
                {
                    title: "Dashboard SaaS",
                    description: "Panel de análisis en tiempo real con visualización interactiva de gráficos, control de acceso por roles y funciones de colaboración en equipo."
                },
                {
                    title: "Generador de Contenido IA",
                    description: "Aplicación en producción que utiliza la API GPT-4 de OpenAI para ayudar a equipos de contenido a generar y optimizar publicaciones de blog de alta calidad a escala."
                }
            ]
        },
        contact: {
            title: "Trabajemos Juntos",
            description: "¿Tienes un proyecto que necesita un desarrollador? Hablemos sobre cómo puedo ayudar a hacer realidad tu idea.",
            form: {
                name: "Nombre",
                namePlaceholder: "Juan Pérez",
                email: "Correo",
                emailPlaceholder: "juan@ejemplo.com",
                message: "Mensaje",
                messagePlaceholder: "Cuéntame sobre tu proyecto...",
                submit: "Enviar Mensaje",
            },
            validation: {
                name: "El nombre debe tener al menos 2 caracteres.",
                email: "Por favor ingresa un correo válido.",
                message: "El mensaje debe tener al menos 10 caracteres.",
                success: "¡Mensaje enviado!",
            },
        },
        technologies: {
            javascript: "JavaScript es el lenguaje de la Web. Lo uso a diario para crear experiencias de usuario interactivas y dinámicas.",
            typescript: "TypeScript extiende JavaScript añadiendo tipos. Me ayuda a escribir código de producción más robusto y mantenible.",
            go: "Go es un lenguaje de código abierto que facilita la construcción de software simple, confiable y eficiente.",
            nextjs: "Next.js es mi framework React principal para producción. Lo uso para construir aplicaciones web de alto rendimiento con renderizado del lado del servidor.",
            nodejs: "Node.js es el runtime JavaScript que utilizo para construir APIs escalables y servicios backend en mis proyectos.",
            aws_lambda: "AWS Lambda permite ejecutar código sin administrar servidores. Lo uso para tareas de computación serverless en producción.",
            amazon_s3: "Amazon S3 es el servicio de almacenamiento que utilizo para storage escalable y seguro en aplicaciones de clientes.",
            dynamodb: "Amazon DynamoDB es una base de datos clave-valor y documentos que ofrece rendimiento de milisegundos a cualquier escala.",
            postgresql: "PostgreSQL es mi base de datos relacional preferida para proyectos que requieren consultas complejas e integridad de datos.",
            mysql: "MySQL es una base de datos confiable que he utilizado en varios proyectos de clientes para almacenamiento escalable.",
            redis: "Redis es un almacén en memoria que utilizo para caché, gestión de sesiones y funcionalidades en tiempo real.",
            rust: "Rust es un lenguaje para construir software confiable y eficiente. Lo uso para componentes de alto rendimiento.",
            python: "Python es el lenguaje que utilizo para scripting, automatización y prototipado rápido.",
            react: "React es la biblioteca en el core de mi trabajo frontend. La uso para construir web apps modernas basadas en componentes.",
            default: "Una tecnología poderosa en mi stack.",
        },
        footer: {
            rights: "Todos los derechos reservados.",
            builtWidth: "Construido con Next.js, Tailwind & Shadcn/ui",
        },
    },
};
