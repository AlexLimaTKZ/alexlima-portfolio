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
            title_start: "I turn ideas into",
            title_highlight: "digital products that scale & convert.",
            title_end: "",
            description: "Full-Stack Developer combining high-impact design, high-performance software engineering (.NET & Next.js), and end-to-end project direction to maximize your business results.",
            projectsBtn: "View Projects",
            contactBtn: "Talk to me",
            whatsappMessage: "Hi Alex! I saw your portfolio and would like to discuss a project.",
        },
        services: {
            title: "Services",
            description: "Custom digital solutions built with modern stack, high-performance architecture, and focus on business results.",
            items: [
                {
                    title: "Institutional Websites",
                    description: "High-performance, responsive websites optimized for search engines (SEO) to build a solid online presence.",
                    stack: "Next.js • Tailwind • SEO"
                },
                {
                    title: "Landing Pages",
                    description: "High-converting single-pages with persuasive copy and instant loading to turn traffic into qualified leads.",
                    stack: "React • Framer Motion • Analytics"
                },
                {
                    title: "Systems & Dashboards",
                    description: "Tailored business solutions with complex integrations, robust database structures, and smooth UI dashboards.",
                    stack: "Next.js • .NET • SQL • Cloud"
                },
                {
                    title: "Mentoring & Code Review",
                    description: "Helping developers level up their code quality, clean architecture, and best practices through the TKZ Dev community.",
                    stack: "Clean Code • Git • Architecture"
                }
            ]
        },
        about: {
            title: "About Me",
            statsYears: "Years of Experience",
            statsProjects: "Projects Delivered",
            statsTechs: "Technologies",
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
        process: {
            title: "How I Work",
            steps: [
                {
                    title: "Discovery",
                    description: "Deep dive into your business goals, target audience, and project requirements to map out the strategy."
                },
                {
                    title: "Design",
                    description: "Creating premium high-fidelity mockups, user flows, and modern design systems tailored to your brand."
                },
                {
                    title: "Development",
                    description: "Writing clean, performant, and type-safe code using Next.js & .NET with standard industry patterns."
                },
                {
                    title: "Deploy & Optimize",
                    description: "Launching with production-grade speed, advanced SEO configuration, and responsive layout tests."
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
            filters: {
                all: "All",
                websites: "Websites",
                systems: "Systems",
                lps: "LPs",
            },
            links: {
                code: "Code",
                demo: "View Project",
            },
            items: [
                {
                    title: "TKZ Jobs Dev",
                    description: "Developer job board platform connecting tech talent with companies, featuring smart search, categorical filtering, and instant applications."
                },
                {
                    title: "CMC Fotos e Artes",
                    description: "Modern e-commerce for selling and customizing print-on-demand products, featuring an interactive catalog and dynamic cart."
                },
                {
                    title: "Adriana Carvalho Law Firm",
                    description: "A premium institutional website for a law firm, designed for lead generation, consultation scheduling, and search engine optimization (SEO)."
                },
                {
                    title: "Se7e Go",
                    description: "An automated quote generator for glazing and window frame companies, featuring a comprehensive management control dashboard."
                }
            ]
        },
        testimonials: {
            title: "Client Testimonials",
            description: "Real feedback from clients and community members who trust my work to bring their digital products to life.",
            items: [
                {
                    name: "Veloso",
                    company: "Se7e Go",
                    service: "SaaS & Quoting System",
                    quote: "The quote and budget management program for Se7eGo is outstanding! It helps me make our quotes and client management far more professional and top quality on a daily basis."
                },
                {
                    name: "Tamires Sthefany",
                    company: "CMC Fotos e Artes",
                    service: "E-Commerce & Catalog",
                    quote: "I loved the look and feel of my page! Beyond looking amazing and fast, now I have a powerful and highly effective tool to capture new clients and close sales."
                },
                {
                    name: "Dra. Adriana Carvalho",
                    company: "Adriana Carvalho Advocacia",
                    service: "Institutional Site & SEO",
                    quote: "I absolutely loved our new law firm website! The previous site done by another developer was frustrating, but Alex exceeded all expectations. I proudly show my page whenever I can and recommend him to everyone."
                },
                {
                    name: "Lucas Mendes",
                    company: "Comunidade TKZ Dev",
                    service: "TKZ Jobs Dev Platform",
                    quote: "The TKZ Jobs Dev project made a huge difference for our community. Developers looking for tech opportunities now have a streamlined place to find relevant jobs with much more ease and practicality."
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
            ctaTitle: "Got a project in mind?",
            ctaDescription: "Let's turn your idea into reality. Get in touch and let's talk.",
            ctaButton: "Start a conversation",
            navTitle: "Navigation",
            socialTitle: "Social",
            projects: "Projects",
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
            title_start: "Transformo ideias em",
            title_highlight: "produtos digitais que escalam e convertem.",
            title_end: "",
            description: "Desenvolvedor Full-Stack focado em unir design de alto impacto, código de alta performance (.NET & Next.js) e direção de projetos ponta a ponta para maximizar seus resultados.",
            projectsBtn: "Ver projetos recentes",
            contactBtn: "Falar comigo",
            whatsappMessage: "Olá Alex! Vi seu portfólio e gostaria de conversar sobre um projeto.",
        },
        services: {
            title: "Serviços",
            description: "Soluções digitais sob medida construídas com stack moderna, engenharia de alta performance e foco em resultados de negócio.",
            items: [
                {
                    title: "Sites Institucionais",
                    description: "Websites de alto desempenho, responsivos e otimizados para mecanismos de busca (SEO) para criar sua presença online.",
                    stack: "Next.js • Tailwind • SEO"
                },
                {
                    title: "Landing Pages",
                    description: "Páginas de alta conversão com copy persuasiva e carregamento instantâneo para transformar tráfego em clientes potenciais.",
                    stack: "React • Framer Motion • Analytics"
                },
                {
                    title: "Sistemas & Dashboards",
                    description: "Soluções de negócios sob medida com integrações complexas, estruturas robustas de banco de dados e painéis interativos.",
                    stack: "Next.js • .NET • SQL • Cloud"
                },
                {
                    title: "Mentoria & Code Review",
                    description: "Aceleração técnica para desenvolvedores focada em código limpo, arquitetura e boas práticas através da comunidade TKZ Dev.",
                    stack: "Clean Code • Git • Arquitetura"
                }
            ]
        },
        about: {
            title: "Sobre Mim",
            statsYears: "Anos de Experiência",
            statsProjects: "Projetos Entregues",
            statsTechs: "Tecnologias",
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
        process: {
            title: "Como Eu Trabalho",
            steps: [
                {
                    title: "Descoberta",
                    description: "Imersão profunda nos objetivos do seu negócio, público-alvo e requisitos do projeto para traçar a melhor estratégia."
                },
                {
                    title: "Design",
                    description: "Criação de protótipos de alta fidelidade, fluxos de usuário premium e sistemas de design modernos sob medida para sua marca."
                },
                {
                    title: "Desenvolvimento",
                    description: "Escrita de código limpo, performático e tipado usando Next.js e .NET, seguindo os melhores padrões do mercado."
                },
                {
                    title: "Deploy e Otimização",
                    description: "Lançamento do projeto com velocidade de produção, SEO avançado e testes de responsividade em todos os dispositivos."
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
            filters: {
                all: "Todos",
                websites: "Websites",
                systems: "Sistemas",
                lps: "LPs",
            },
            links: {
                code: "Código",
                demo: "Ver Projeto",
            },
            items: [
                {
                    title: "TKZ Jobs Dev",
                    description: "Plataforma de vagas e oportunidades em tecnologia para desenvolvedores, conectando talentos com empresas através de busca inteligente e filtros avançados."
                },
                {
                    title: "CMC Fotos e Artes",
                    description: "E-commerce moderno para venda e personalização de produtos sob demanda, com catálogo interativo e carrinho dinâmico."
                },
                {
                    title: "Adriana Carvalho Advocacia",
                    description: "Website institucional premium para escritório de advocacia, com foco em captação de clientes, agendamento de consultas e otimização completa para o Google (SEO)."
                },
                {
                    title: "Se7e Go",
                    description: "Gerador de orçamentos para empresas de vidraçaria que trabalham com esquadrias, contendo um painel administrativo com dashboard completo de controle."
                }
            ]
        },
        testimonials: {
            title: "Depoimentos de Impacto",
            description: "O que dizem os clientes e membros da comunidade que confiaram no meu trabalho para tirar seus produtos digitais do papel.",
            items: [
                {
                    name: "Veloso",
                    company: "Se7e Go",
                    service: "Software SaaS & Gestão",
                    quote: "O programa de gestão de orçamentos da Se7eGo é muito bom! Ele me ajuda a deixar os orçamentos e a gestão de clientes com muito mais profissionalismo e qualidade no dia a dia."
                },
                {
                    name: "Tamires Sthefany",
                    company: "CMC Fotos e Artes",
                    service: "E-Commerce & Catálogo",
                    quote: "Amei o visual da minha página! Além de linda e rápida, agora tenho uma ferramenta a mais e muito eficiente para captar novos clientes e fechar vendas."
                },
                {
                    name: "Dra. Adriana Carvalho",
                    company: "Adriana Carvalho Advocacia",
                    service: "Site Institucional & SEO",
                    quote: "Amei a nova página do escritório! O site anterior feito por outro desenvolvedor não tinha ficado legal, mas agora mostro sempre que posso o site e indico o trabalho do Alex para todo mundo."
                },
                {
                    name: "Lucas Mendes",
                    company: "Comunidade TKZ Dev",
                    service: "Plataforma TKZ Jobs Dev",
                    quote: "O projeto do TKZ Jobs Dev ajudou muito a nossa comunidade. Quem procura emprego na área de tecnologia agora tem um lugar para achar vagas com muito mais facilidade e praticidade."
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
            ctaTitle: "Tem um projeto em mente?",
            ctaDescription: "Vamos transformar sua ideia em realidade. Entre em contato e vamos conversar.",
            ctaButton: "Iniciar conversa",
            navTitle: "Navegação",
            socialTitle: "Social",
            projects: "Projetos",
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
            title_start: "Transformo ideas en",
            title_highlight: "productos digitales que escalan y convierten.",
            title_end: "",
            description: "Desarrollador Full-Stack enfocado en unir diseño de alto impacto, código de alto rendimiento (.NET & Next.js) y dirección de proyectos de extremo a extremo para maximizar sus resultados.",
            projectsBtn: "Ver proyectos",
            contactBtn: "Hablar conmigo",
            whatsappMessage: "¡Hola Alex! Vi tu portafolio y me gustaría hablar sobre un proyecto.",
        },
        services: {
            title: "Servicios",
            description: "Soluciones digitales a medida construidas con una stack moderna, arquitectura de alto rendimiento y enfoque en resultados de negocio.",
            items: [
                {
                    title: "Sitios Institucionales",
                    description: "Sitios web de alto rendimiento, responsivos y optimizados para buscadores (SEO) para crear una sólida presencia online.",
                    stack: "Next.js • Tailwind • SEO"
                },
                {
                    title: "Landing Pages",
                    description: "Páginas de alta conversión con copy persuasivo y carga instantánea para transformar tráfico en clientes potenciales.",
                    stack: "React • Framer Motion • Analytics"
                },
                {
                    title: "Sistemas y Paneles",
                    description: "Soluciones empresariales a medida con integraciones complejas, bases de datos robustas y paneles UI fluidos.",
                    stack: "Next.js • .NET • SQL • Cloud"
                },
                {
                    title: "Mentoría y Code Review",
                    description: "Aceleración técnica para desarrolladores enfocada en código limpio, arquitectura y buenas prácticas con la comunidad TKZ Dev.",
                    stack: "Clean Code • Git • Arquitectura"
                }
            ]
        },
        about: {
            title: "Sobre Mí",
            statsYears: "Años de Experiencia",
            statsProjects: "Proyectos Entregados",
            statsTechs: "Tecnologías",
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
        process: {
            title: "Cómo Trabajo",
            steps: [
                {
                    title: "Descubrimiento",
                    description: "Inmersión profunda en los objetivos de su negocio, público objetivo y requisitos del proyecto para trazar la estrategia."
                },
                {
                    title: "Diseño",
                    description: "Creación de prototipos de alta fidelidad, flujos de usuario premium y sistemas de diseño modernos adaptados a su marca."
                },
                {
                    title: "Desarrollo",
                    description: "Escritura de código limpio, de alto rendimiento y tipado usando Next.js y .NET, siguiendo los mejores patrones de la industria."
                },
                {
                    title: "Despliegue y Optimización",
                    description: "Lanzamiento del proyecto con velocidad de producción, optimización SEO avanzada y pruebas de diseño responsivo."
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
            filters: {
                all: "Todos",
                websites: "Sitios Web",
                systems: "Sistemas",
                lps: "LPs",
            },
            links: {
                code: "Código",
                demo: "Ver Proyecto",
            },
            items: [
                {
                    title: "TKZ Jobs Dev",
                    description: "Plataforma de empleos y oportunidades tecnológicas para desarrolladores, conectando talentos con empresas mediante búsqueda inteligente y filtros avanzados."
                },
                {
                    title: "CMC Fotos e Artes",
                    description: "Comercio electrónico moderno para venta y personalización de productos bajo demanda, con catálogo interactivo y carrito dinámico."
                },
                {
                    title: "Adriana Carvalho Abogacía",
                    description: "Sitio web institucional premium para bufete de abogados, enfocado en la conversión de clientes potenciales, agenda de consultas y optimización SEO integral."
                },
                {
                    title: "Se7e Go",
                    description: "Generador de presupuestos para empresas de vidriería y carpintería de aluminio, con un panel administrativo y de control completo."
                }
            ]
        },
        testimonials: {
            title: "Testimonios de Impacto",
            description: "Lo que dicen los clientes y miembros de la comunidad que confiaron en mi trabajo para desarrollar sus productos digitales.",
            items: [
                {
                    name: "Veloso",
                    company: "Se7e Go",
                    service: "Software SaaS y Gestión",
                    quote: "¡El programa de gestión de presupuestos de Se7eGo es excelente! Me ayuda a presentar presupuestos y gestionar clientes con mucho más profesionalismo y calidad."
                },
                {
                    name: "Tamires Sthefany",
                    company: "CMC Fotos e Artes",
                    service: "E-Commerce y Catálogo",
                    quote: "¡Me encantó el diseño de mi página! Además de hermosa y rápida, ahora tengo una herramienta muy eficiente para captar nuevos clientes."
                },
                {
                    name: "Dra. Adriana Carvalho",
                    company: "Adriana Carvalho Abogacía",
                    service: "Sitio Web Institucional y SEO",
                    quote: "¡Me encantó la nueva página de la firma! El sitio anterior hecho por otro desarrollador no había quedado bien, pero ahora muestro siempre que puedo mi web y recomiendo a Alex."
                },
                {
                    name: "Lucas Mendes",
                    company: "Comunidad TKZ Dev",
                    service: "Plataforma TKZ Jobs Dev",
                    quote: "El proyecto TKZ Jobs Dev ayudó muchísimo a nuestra comunidad. Quienes buscan trabajo en tecnología ahora tienen un lugar para encontrar vacantes con mucha más facilidad y practicidad."
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
            ctaTitle: "¿Tienes un proyecto en mente?",
            ctaDescription: "Transformemos tu idea en realidad. Contáctame y hablemos.",
            ctaButton: "Iniciar conversación",
            navTitle: "Navegación",
            socialTitle: "Social",
            projects: "Proyectos",
        },
    },
};
