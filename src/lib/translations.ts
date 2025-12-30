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
            badge: "Open for work",
            title_start: "Transforming ideas into",
            title_highlight: "high-performance software.",
            title_end: "",
            description: "Full-stack developer specialized in Next.js and .NET. I build accessible, scalable web applications with a total focus on user experience.",
            projectsBtn: "View Projects",
            contactBtn: "Contact Me",
            downloadCv: "Download CV",
        },
        about: {
            title: "About Me",
            description1: "I am studying Systems Analysis and Development and, over the last year, I turned my curiosity for technology into a career focused on Fullstack development. My goal goes beyond writing lines of code: I seek to create digital experiences that combine performance, responsiveness, and clean code.",
            description2: "My main stack is centered on the JavaScript ecosystem, with strong mastery of Next.js, TypeScript, and Tailwind CSS (with Shadcn/ui) for modern interfaces. On the Back-end, I apply the robustness of C# and .NET to create scalable solutions when necessary.",
            description3: "Beyond technical development, I am passionate about knowledge sharing. I am founder of TKZ Dev, a community where I mentor and assist beginner developers in taking their first steps, which daily reinforces my soft skills in leadership, communication, and teamwork.",
            experienceTitle: "Experience",
            experiences: [
                {
                    year: "2025 - Present",
                    title: "Founder & Community Leader",
                    company: "TKZ Dev",
                    description: "Leading a developer community focused on helping beginners by sharing knowledge and code reviews."
                },
                {
                    year: "2025 - Present",
                    title: "Full Stack Developer",
                    company: "Freelance",
                    description: "Developing modern web applications with a focus on performance and responsiveness using Next.js and C#."
                },
                {
                    year: "2025",
                    title: "Development Student",
                    company: "Bootcamps & Courses",
                    description: "Completed C# + .NET Bootcamp and Next.js specialization. Currently studying Systems Analysis and Development."
                }
            ]
        },
        skills: {
            title: "Tech Stack",
            description: "I work with a modern stack to build performant and scalable web applications.",
            categories: {
                Frontend: "Frontend",
                Backend: "Backend",
                Tools: "Tools",
            },
            cardDescription: "My go-to technologies for {category} development.",
        },
        projects: {
            title: "Featured Projects",
            description: "A selection of projects that demonstrate my passion for building web applications.",
            links: {
                code: "Code",
                demo: "Demo",
            },
            items: [
                {
                    title: "E-Commerce Platform",
                    description: "A full-featured online store built with Next.js 13, Server Components, and Stripe integration."
                },
                {
                    title: "SaaS Dashboard",
                    description: "Real-time analytics dashboard with chart visualization and team collaboration features."
                },
                {
                    title: "AI Content Generator",
                    description: "Application that uses OpenAI's GPT-4 API to help users generate high-quality blog posts."
                }
            ]
        },
        contact: {
            title: "Get in Touch",
            description: "Have a project in mind or just want to say hi? Send me a message!",
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
            javascript: "JavaScript is the programming language of the Web. I use it to create interactive and dynamic user experiences.",
            typescript: "TypeScript extends JavaScript by adding types. It helps me write more robust and maintainable code.",
            go: "Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.",
            nextjs: "Next.js is a React framework for production. It enables features like server-side rendering and static site generation.",
            nodejs: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. I use it to build scalable network applications.",
            aws_lambda: "AWS Lambda lets you run code without provisioning or managing servers. I use it for serverless compute tasks.",
            amazon_s3: "Amazon S3 is an object storage service that offers industry-leading scalability, data availability, security, and performance.",
            dynamodb: "Amazon DynamoDB is a key-value and document database that delivers single-digit millisecond performance at any scale.",
            postgresql: "PostgreSQL is a powerful, open source object-relational database system with over 30 years of active development.",
            mysql: "MySQL is the world's most popular open source database. I use it for reliable and scalable data storage.",
            redis: "Redis is an open source, in-memory data structure store, used as a database, cache, and message broker.",
            rust: "Rust is a language empowering everyone to build reliable and efficient software. I use it for high-performance components.",
            python: "Python is a programming language that lets you work quickly and integrate systems more effectively.",
            react: "React is a JavaScript library for building user interfaces. It's my go-to library for building modern web apps.",
            default: "A powerful technology in my stack.",
        },
        footer: {
            rights: "All rights reserved.",
            builtWidth: "Build with Next.js, Tailwind & Shadcn/ui",
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
            badge: "Disponível para projetos",
            title_start: "Transformando ideias em",
            title_highlight: "software de alta performance.",
            title_end: "",
            description: "Desenvolvedor Full-stack especializado em Next.js e .NET. Crio aplicações web acessíveis, escaláveis e com foco total na experiência do usuário.",
            projectsBtn: "Ver Projetos",
            contactBtn: "Entre em Contato",
            downloadCv: "Baixar Currículo",
        },
        about: {
            title: "Sobre Mim",
            description1: "Estou cursando Análise e Desenvolvimento de Sistemas e, ao longo do último ano, transformei minha curiosidade por tecnologia em uma carreira focada no desenvolvimento Fullstack. Meu objetivo vai além de escrever linhas de código: busco criar experiências digitais que unam performance, responsividade e código limpo.",
            description2: "Minha stack principal é centrada no ecossistema JavaScript, com forte domínio de Next.js, TypeScript e Tailwind CSS (com Shadcn/ui) para interfaces modernas. No Back-end, aplico a robustez do C# e .NET para criar soluções escaláveis quando necessário.",
            description3: "Além do desenvolvimento técnico, sou apaixonado pelo compartilhamento de conhecimento. Sou fundador da TKZ Dev, uma comunidade onde mentoro e auxilio desenvolvedores iniciantes a darem seus primeiros passos, o que reforça diariamente minhas soft skills de liderança, comunicação e trabalho em equipe.",
            experienceTitle: "Experiência",
            experiences: [
                {
                    year: "2025 - Presente",
                    title: "Fundador & Líder de Comunidade",
                    company: "TKZ Dev",
                    description: "Lidero uma comunidade de desenvolvedores voltada para ajudar iniciantes, compartilhando conhecimento e code reviews."
                },
                {
                    year: "2025 - Presente",
                    title: "Desenvolvedor Full Stack",
                    company: "Freelancer",
                    description: "Desenvolvimento de aplicações web modernas com foco em performance e responsividade utilizando Next.js e C#."
                },
                {
                    year: "2025",
                    title: "Estudante de Desenvolvimento",
                    company: "Bootcamps & Cursos",
                    description: "Conclusão de Bootcamp C# + .NET e especialização em Next.js. Atualmente cursando Análise e Desenvolvimento de Sistemas."
                }
            ]
        },
        skills: {
            title: "Tecnologias",
            description: "Trabalho com uma stack moderna para construir aplicações web performáticas e escaláveis.",
            categories: {
                Frontend: "Frontend",
                Backend: "Backend",
                Tools: "Ferramentas",
            },
            cardDescription: "Minhas principais tecnologias para desenvolvimento {category}.",
        },
        projects: {
            title: "Projetos em Destaque",
            description: "Uma seleção de projetos que demonstram minha paixão por construir aplicações web.",
            links: {
                code: "Código",
                demo: "Demo",
            },
            items: [
                {
                    title: "Plataforma E-Commerce",
                    description: "Uma loja online completa construída com Next.js 13, Server Components e integração Stripe."
                },
                {
                    title: "Dashboard SaaS",
                    description: "Dashboard de análise em tempo real com visualização de gráficos e recursos de colaboração."
                },
                {
                    title: "Gerador de Conteúdo AI",
                    description: "Aplicação que usa a API GPT-4 da OpenAI para ajudar usuários a gerar posts de blog de alta qualidade."
                }
            ]
        },
        contact: {
            title: "Entre em Contato",
            description: "Tem um projeto em mente ou apenas quer dar um oi? Me mande uma mensagem!",
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
            javascript: "JavaScript é a linguagem de programação da Web. Uso para criar experiências de usuário interativas e dinâmicas.",
            typescript: "TypeScript estende o JavaScript adicionando tipos. Me ajuda a escrever código mais robusto e manutenível.",
            go: "Go é uma linguagem de programação open source que facilita a construção de software simples, confiável e eficiente.",
            nextjs: "Next.js é um framework React para produção. Habilita recursos como renderização no servidor e geração de site estático.",
            nodejs: "Node.js é um runtime JavaScript construído na engine V8 do Chrome. Uso para construir aplicações de rede escaláveis.",
            aws_lambda: "AWS Lambda permite rodar código sem provisionar ou gerenciar servidores. Uso para tarefas de computação serverless.",
            amazon_s3: "Amazon S3 é um serviço de armazenamento de objetos que oferece escalabilidade, disponibilidade de dados e segurança líderes do setor.",
            dynamodb: "Amazon DynamoDB é um banco de dados chave-valor e documento que entrega desempenho de milissegundos em qualquer escala.",
            postgresql: "PostgreSQL é um poderoso sistema de banco de dados objeto-relacional open source com mais de 30 anos de desenvolvimento ativo.",
            mysql: "MySQL é o banco de dados open source mais popular do mundo. Uso para armazenamento de dados confiável e escalável.",
            redis: "Redis é um armazenamento de estrutura de dados em memória open source, usado como banco de dados, cache e message broker.",
            rust: "Rust é uma linguagem que empodera todos a construir software confiável e eficiente. Uso para componentes de alta performance.",
            python: "Python é uma linguagem de programação que permite trabalhar rapidamente e integrar sistemas de forma mais eficaz.",
            react: "React é uma biblioteca JavaScript para construir interfaces de usuário. É minha biblioteca principal para web apps modernos.",
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
            badge: "Disponible para proyectos",
            title_start: "Transformando ideas en",
            title_highlight: "software de alto rendimiento.",
            title_end: "",
            description: "Desarrollador Full-stack especializado en Next.js y .NET. Creo aplicaciones web accesibles, escalables y con un enfoque total en la experiencia del usuario.",
            projectsBtn: "Ver Proyectos",
            contactBtn: "Contáctame",
            downloadCv: "Descargar CV",
        },
        about: {
            title: "Sobre Mí",
            description1: "Estoy cursando Análisis y Desarrollo de Sistemas y, a lo largo del último año, transformé mi curiosidad por la tecnología en una carrera centrada en el desarrollo Fullstack. Mi objetivo va más allá de escribir líneas de código: busco crear experiencias digitales que unan rendimiento, capacidad de respuesta y código limpio.",
            description2: "Mi stack principal se centra en el ecosistema JavaScript, con un fuerte dominio de Next.js, TypeScript y Tailwind CSS (con Shadcn/ui) para interfaces modernas. En el Back-end, aplico la robustez de C# y .NET para crear soluciones escalables cuando es necesario.",
            description3: "Además del desarrollo técnico, me apasiona compartir conocimientos. Soy fundador de TKZ Dev, una comunidad donde asesoro y ayudo a desarrolladores principiantes a dar sus primeros pasos, lo que refuerza diariamente mis habilidades blandas de liderazgo, comunicación y trabajo en equipo.",
            experienceTitle: "Experiencia",
            experiences: [
                {
                    year: "2025 - Presente",
                    title: "Fundador y Líder de Comunidad",
                    company: "TKZ Dev",
                    description: "Liderando una comunidad de desarrolladores enfocada en ayudar a principiantes compartiendo conocimientos y revisiones de código."
                },
                {
                    year: "2025 - Presente",
                    title: "Desarrollador Full Stack",
                    company: "Freelance",
                    description: "Desarrollo de aplicaciones web modernas con enfoque en rendimiento y capacidad de respuesta utilizando Next.js y C#."
                },
                {
                    year: "2025",
                    title: "Estudiante de Desarrollo",
                    company: "Bootcamps y Cursos",
                    description: "Finalización de Bootcamp C# + .NET y especialización en Next.js. Actualmente cursando Análisis y Desarrollo de Sistemas."
                }
            ]
        },
        skills: {
            title: "Tech Stack",
            description: "Trabajo con un stack moderno para construir aplicaciones web escalables y de alto rendimiento.",
            categories: {
                Frontend: "Frontend",
                Backend: "Backend",
                Tools: "Herramientas",
            },
            cardDescription: "Mis tecnologías principales para desarrollo {category}.",
        },
        projects: {
            title: "Proyectos Destacados",
            description: "Una selección de proyectos que demuestran mi pasión por construir aplicaciones web.",
            links: {
                code: "Código",
                demo: "Demo",
            },
            items: [
                {
                    title: "Plataforma E-Commerce",
                    description: "Una tienda en línea completa construida con Next.js 13, Server Components e integración Stripe."
                },
                {
                    title: "Dashboard SaaS",
                    description: "Panel de análisis en tiempo real con visualización de gráficos y funciones de colaboración."
                },
                {
                    title: "Generador de Contenido IA",
                    description: "Aplicación que utiliza la API GPT-4 de OpenAI para ayudar a los usuarios a generar publicaciones de blog de alta calidad."
                }
            ]
        },
        contact: {
            title: "Ponte en Contacto",
            description: "¿Tienes un proyecto en mente o solo quieres saludar? ¡Envíame un mensaje!",
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
            javascript: "JavaScript es el lenguaje de programación de la Web. Lo uso para crear experiencias de usuario interactivas y dinámicas.",
            typescript: "TypeScript extiende JavaScript añadiendo tipos. Me ayuda a escribir código más robusto y mantenible.",
            go: "Go es un lenguaje de programación de código abierto que facilita la construcción de software simple, confiable y eficiente.",
            nextjs: "Next.js es un framework de React para producción. Permite características como renderizado del lado del servidor y generación de sitios estáticos.",
            nodejs: "Node.js es un entorno de ejecución de JavaScript construido en el motor V8 de Chrome. Lo uso para construir aplicaciones de red escalables.",
            aws_lambda: "AWS Lambda te permite ejecutar código sin aprovisionar o administrar servidores. Lo uso para tareas de computación serverless.",
            amazon_s3: "Amazon S3 es un servicio de almacenamiento de objetos que ofrece escalabilidad, disponibilidad de datos y seguridad líderes en la industria.",
            dynamodb: "Amazon DynamoDB es una base de datos de clave-valor y documentos que ofrece rendimiento de milisegundos a cualquier escala.",
            postgresql: "PostgreSQL es un potente sistema de base de datos relacional de objetos de código abierto con más de 30 años de desarrollo activo.",
            mysql: "MySQL es la base de datos de código abierto más popular del mundo. La uso para almacenamiento de datos confiable y escalable.",
            redis: "Redis es un almacén de estructura de datos en memoria de código abierto, utilizado como base de datos, caché y agente de mensajes.",
            rust: "Rust es un lenguaje que empodera a todos para construir software confiable y eficiente. Lo uso para componentes de alto rendimiento.",
            python: "Python es un lenguaje de programación que te permite trabajar rápidamente e integrar sistemas de manera más efectiva.",
            react: "React es una biblioteca de JavaScript para construir interfaces de usuario. Es mi biblioteca principal para aplicaciones web modernas.",
            default: "Una tecnología poderosa en mi stack.",
        },
        footer: {
            rights: "Todos los derechos reservados.",
            builtWidth: "Construido con Next.js, Tailwind & Shadcn/ui",
        },
    },
};
