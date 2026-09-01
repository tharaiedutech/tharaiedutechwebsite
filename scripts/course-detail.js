// Course Detail Page JavaScript

// Course Data Database
const courseData = {
    'deep-learning': {
        title: 'Deep Learning & Neural Networks',
        track: 'AI & Machine Learning',
        rating: '4.9/5',
        students: '2,456',
        level: 'Advanced',
        duration: '14 Weeks',
        mode: 'Hybrid',
        price: '₹35,000',
        nextBatch: 'Jan 20, 2026',
        seatsLeft: '8/25',
        description: 'Master deep learning and build neural networks from scratch. Learn CNNs, RNNs, Transformers, and deploy production-ready AI models. This comprehensive course takes you from neural network fundamentals to advanced architectures used in modern AI systems.',
        learningOutcomes: [
            'Build neural networks from scratch using TensorFlow and PyTorch',
            'Implement CNNs for computer vision applications',
            'Create RNNs and LSTMs for sequence modeling',
            'Understand and implement transformer architecture',
            'Fine-tune pre-trained models for specific tasks',
            'Deploy deep learning models to production environments',
            'Optimize model performance and reduce inference time',
            'Apply deep learning to real-world business problems'
        ],
        prerequisites: [
            'Python programming experience',
            'Basic machine learning knowledge',
            'Linear algebra fundamentals',
            'Calculus basics (derivatives and gradients)',
            'Familiarity with NumPy and Pandas'
        ],
        modules: [
            {
                title: 'Module 1: Neural Network Fundamentals',
                topics: [
                    'What are Neural Networks',
                    'Perceptrons & Multi-layer Networks',
                    'Activation Functions (ReLU, Sigmoid, Tanh)',
                    'Forward Propagation',
                    'Backpropagation Algorithm',
                    'Gradient Descent Basics'
                ]
            },
            {
                title: 'Module 2: Training Neural Networks',
                topics: [
                    'Loss Functions & Optimization',
                    'Learning Rate & Momentum',
                    'Regularization Techniques (L1, L2, Dropout)',
                    'Batch Normalization',
                    'Hyperparameter Tuning',
                    'Overfitting & Underfitting',
                    'Practical Training Tips'
                ]
            },
            {
                title: 'Module 3: Convolutional Neural Networks (CNNs)',
                topics: [
                    'CNN Architecture Overview',
                    'Convolution & Pooling Layers',
                    'Popular CNN Models (VGG, ResNet, Inception)',
                    'Transfer Learning',
                    'Image Classification Project',
                    'Object Detection Basics',
                    'Data Augmentation Techniques'
                ]
            },
            {
                title: 'Module 4: Recurrent Neural Networks (RNNs)',
                topics: [
                    'RNN Architecture & Applications',
                    'LSTM (Long Short-Term Memory)',
                    'GRU (Gated Recurrent Units)',
                    'Sequence-to-Sequence Models',
                    'Text Generation Project',
                    'Time Series Forecasting',
                    'Bidirectional RNNs'
                ]
            },
            {
                title: 'Module 5: Transformers & Attention',
                topics: [
                    'Attention Mechanism Explained',
                    'Transformer Architecture',
                    'BERT & GPT Foundations',
                    'Vision Transformers (ViT)',
                    'Multi-modal Transformers',
                    'Fine-tuning Pre-trained Models',
                    'Self-Attention vs Cross-Attention'
                ]
            },
            {
                title: 'Module 6: Advanced Deep Learning',
                topics: [
                    'GANs (Generative Adversarial Networks)',
                    'Variational AutoEncoders (VAEs)',
                    'Neural Architecture Search',
                    'Model Compression & Quantization',
                    'Edge AI Deployment',
                    'Explainable AI (XAI) Techniques'
                ]
            },
            {
                title: 'Module 7: Capstone Project',
                topics: [
                    'Project Problem Selection',
                    'Dataset Collection & Preparation',
                    'Model Architecture Design',
                    'Training & Optimization',
                    'Performance Evaluation',
                    'Deployment & Production',
                    'Final Presentation & Documentation'
                ]
            }
        ],
        instructor: {
            name: 'Dr. Arun Kumar',
            title: 'PhD in Artificial Intelligence',
            experience: '12+ years in AI/ML',
            background: 'Ex-Google AI',
            bio: 'Dr. Arun Kumar is a leading AI researcher with 12+ years of experience in deep learning and neural networks. He has published 20+ research papers and worked on cutting-edge AI projects at Google.'
        },
        careerRoles: [
            'Deep Learning Engineer',
            'Computer Vision Engineer',
            'NLP Engineer',
            'AI Research Scientist'
        ],
        salaryRange: '₹12-20 LPA'
    },
    'gen-ai-llm': {
        title: 'Generative AI & Large Language Models',
        track: 'AI & Machine Learning',
        rating: '4.9/5',
        students: '3,245',
        level: 'Intermediate',
        duration: '14 Weeks',
        mode: 'Hybrid',
        price: '₹45,000',
        nextBatch: 'Jan 20, 2026',
        seatsLeft: '8/25',
        heroImage: 'https://images.unsplash.com/photo-1676277791608-ac3b5e4d01bc?w=800&h=600&fit=crop&q=80',
        description: 'This comprehensive course takes you deep into the world of Generative AI and Large Language Models. You will learn to work with cutting-edge AI models like GPT-4, Claude, and Gemini, understanding their architecture, capabilities, and practical applications. Through hands-on projects, you will build real-world AI applications, implement fine-tuning strategies, and deploy production-ready AI systems.',
        learningOutcomes: [
            'Master the fundamentals of Generative AI and LLM architecture',
            'Work with GPT-4, Claude, Gemini, and other state-of-the-art models',
            'Build AI-powered applications using API integration',
            'Implement prompt engineering techniques for optimal results',
            'Fine-tune LLMs for specific use cases and domains',
            'Deploy and scale AI applications in production environments',
            'Understand ethical considerations and responsible AI practices'
        ],
        prerequisites: [
            'Basic Python programming knowledge',
            'Understanding of machine learning concepts (helpful but not mandatory)',
            'Enthusiasm to learn cutting-edge AI technologies'
        ],
        modules: [
            {
                title: 'Module 1: Introduction to Generative AI',
                topics: [
                    'What is Generative AI?',
                    'Evolution of LLMs',
                    'Key Applications and Use Cases',
                    'Understanding Transformers',
                    'GPT Architecture Overview'
                ]
            },
            {
                title: 'Module 2: LLM Architecture & Fundamentals',
                topics: [
                    'Transformer Architecture Deep Dive',
                    'Attention Mechanisms',
                    'Tokenization and Embeddings',
                    'Model Parameters and Scaling',
                    'Pre-training vs Fine-tuning'
                ]
            },
            {
                title: 'Module 3: API Integration & Usage',
                topics: [
                    'OpenAI API Setup',
                    'Working with GPT-4 and GPT-3.5',
                    'Claude API Integration',
                    'Google Gemini API',
                    'Rate Limiting and Cost Optimization'
                ]
            },
            {
                title: 'Module 4: Advanced Prompt Engineering',
                topics: [
                    'Prompt Design Principles',
                    'Chain-of-Thought Prompting',
                    'Few-shot and Zero-shot Learning',
                    'Prompt Templates and Best Practices',
                    'Handling Edge Cases'
                ]
            },
            {
                title: 'Module 5: Fine-tuning LLMs',
                topics: [
                    'When to Fine-tune vs Prompt Engineering',
                    'Dataset Preparation',
                    'Fine-tuning Methods (LoRA, QLoRA)',
                    'Evaluation Metrics',
                    'Production Deployment'
                ]
            },
            {
                title: 'Module 6: Production Deployment & Scaling',
                topics: [
                    'Deploying LLM Applications',
                    'Monitoring and Logging',
                    'Scaling Strategies',
                    'Security Best Practices',
                    'Cost Optimization Techniques'
                ]
            },
            {
                title: 'Module 7: CAPSTONE PROJECT',
                topics: [
                    'Build an End-to-End AI Application',
                    'Integrate Multiple LLMs',
                    'Implement Fine-tuning for Specific Use Case',
                    'Deploy to Production',
                    'Present and Defend Your Project'
                ]
            }
        ],
        instructor: {
            name: 'Dr. AI Expert',
            title: 'AI/ML Research Scientist',
            experience: '15+ years in AI Research',
            background: 'Ph.D. in Machine Learning',
            bio: 'Leading AI researcher with extensive experience in Generative AI and LLMs. Published 50+ papers and worked with top tech companies.'
        },
        careerRoles: [
            'AI Engineer',
            'LLM Specialist',
            'Generative AI Developer',
            'ML Engineer',
            'AI Product Manager'
        ],
        salaryRange: '₹15-30 LPA'
    },
    'llm-rag': {
        title: 'Fine-tuning LLMs & RAG Systems',
        track: 'AI & Machine Learning',
        rating: '4.8/5',
        students: '1,892',
        level: 'Advanced',
        duration: '10 Weeks',
        mode: 'Hybrid',
        price: '₹42,000',
        nextBatch: 'Jan 25, 2026',
        seatsLeft: '10/20',
        heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80',
        description: 'Master advanced LLM customization and Retrieval Augmented Generation (RAG) systems. This course teaches you how to fine-tune large language models for specific domains and build production-ready RAG applications. Learn to integrate vector databases, optimize embeddings, and deploy scalable RAG systems that power intelligent search and question-answering applications.',
        learningOutcomes: [
            'Master advanced fine-tuning techniques for LLMs',
            'Build end-to-end RAG (Retrieval Augmented Generation) systems',
            'Integrate vector databases (Pinecone, Weaviate, Chroma)',
            'Optimize embeddings for better retrieval performance',
            'Implement hybrid search strategies',
            'Deploy production-ready RAG applications',
            'Handle edge cases and improve accuracy'
        ],
        prerequisites: [
            'Strong Python programming skills',
            'Understanding of LLMs and transformer architecture',
            'Basic knowledge of APIs and databases',
            'Familiarity with machine learning concepts'
        ],
        modules: [
            {
                title: 'Module 1: Advanced Fine-tuning Techniques',
                topics: [
                    'Fine-tuning vs Prompt Engineering',
                    'LoRA (Low-Rank Adaptation)',
                    'QLoRA and Efficient Fine-tuning',
                    'Dataset Preparation and Quality',
                    'Evaluation Metrics for Fine-tuned Models'
                ]
            },
            {
                title: 'Module 2: RAG System Architecture',
                topics: [
                    'What is RAG and Why Use It?',
                    'RAG Architecture Overview',
                    'Retrieval vs Generation Components',
                    'Chunking Strategies',
                    'RAG Pipeline Design Patterns'
                ]
            },
            {
                title: 'Module 3: Vector Database Integration',
                topics: [
                    'Introduction to Vector Databases',
                    'Pinecone Setup and Usage',
                    'Weaviate Integration',
                    'Chroma and FAISS',
                    'Choosing the Right Vector Database'
                ]
            },
            {
                title: 'Module 4: Embedding Optimization',
                topics: [
                    'Understanding Embeddings',
                    'OpenAI vs Open-source Embeddings',
                    'Fine-tuning Embeddings',
                    'Semantic Search Optimization',
                    'Measuring Retrieval Quality'
                ]
            },
            {
                title: 'Module 5: Production RAG Systems',
                topics: [
                    'Building Scalable RAG Applications',
                    'Caching Strategies',
                    'Monitoring and Logging',
                    'Cost Optimization',
                    'Security and Access Control'
                ]
            },
            {
                title: 'Module 6: CAPSTONE PROJECT',
                topics: [
                    'Build a Production RAG Application',
                    'Integrate Multiple Data Sources',
                    'Implement Hybrid Search',
                    'Fine-tune LLM for Domain-Specific Use Case',
                    'Deploy and Present Your Solution'
                ]
            }
        ],
        instructor: {
            name: 'Prof. RAG Specialist',
            title: 'AI Solutions Architect',
            experience: '12+ years in AI/ML',
            background: 'Masters in Computer Science',
            bio: 'Expert in building production RAG systems for Fortune 500 companies. Specialized in LLM fine-tuning and vector search optimization.'
        },
        careerRoles: [
            'AI Engineer',
            'RAG System Developer',
            'LLM Specialist',
            'ML Solutions Architect',
            'AI Research Engineer'
        ],
        salaryRange: '₹18-35 LPA'
    }
};

// Auto-generate missing courses with template data
const courseTemplates = {
    'mcp': { title: 'Model Context Protocol', track: 'AI & Machine Learning', level: 'Advanced', duration: '8 Weeks', price: '₹38,000' },
    'prompt-engineering': { title: 'Prompt Engineering & LLM Optimization', track: 'AI & Machine Learning', level: 'Intermediate', duration: '6 Weeks', price: '₹28,000' },
    'agentic-ai': { title: 'Agentic AI Systems', track: 'AI & Machine Learning', level: 'Advanced', duration: '10 Weeks', price: '₹42,000' },
    'ml-fundamentals': { title: 'Machine Learning Fundamentals', track: 'AI & Machine Learning', level: 'Intermediate', duration: '12 Weeks', price: '₹35,000' },
    'computer-vision': { title: 'Computer Vision & Image Processing', track: 'AI & Machine Learning', level: 'Intermediate', duration: '10 Weeks', price: '₹38,000' },
    'nlp': { title: 'Natural Language Processing', track: 'AI & Machine Learning', level: 'Intermediate', duration: '10 Weeks', price: '₹38,000' },
    'reinforcement-learning': { title: 'Reinforcement Learning', track: 'AI & Machine Learning', level: 'Advanced', duration: '12 Weeks', price: '₹45,000' },
    'mlops': { title: 'MLOps & ML Engineering', track: 'AI & Machine Learning', level: 'Advanced', duration: '10 Weeks', price: '₹40,000' },
    'vector-databases': { title: 'Vector Databases & Embeddings', track: 'AI & Machine Learning', level: 'Advanced', duration: '6 Weeks', price: '₹32,000' },
    'data-science-python': { title: 'Data Science with Python', track: 'Data Science & ML', level: 'Beginner', duration: '14 Weeks', price: '₹32,000' },
    'statistical-analysis': { title: 'Statistical Analysis & Hypothesis Testing', track: 'Data Science & ML', level: 'Intermediate', duration: '8 Weeks', price: '₹28,000' },
    'data-visualization': { title: 'Data Visualization Mastery', track: 'Data Science & ML', level: 'Intermediate', duration: '6 Weeks', price: '₹25,000' },
    'cv-nlp-basics': { title: 'Computer Vision & NLP Basics', track: 'Data Science & ML', level: 'Intermediate', duration: '10 Weeks', price: '₹35,000' },
    'time-series': { title: 'Time Series Analysis & Forecasting', track: 'Data Science & ML', level: 'Intermediate', duration: '8 Weeks', price: '₹30,000' },
    'power-bi': { title: 'Power BI Complete Course', track: 'Data Analytics & BI', level: 'Intermediate', duration: '8 Weeks', price: '₹28,000' },
    'tableau': { title: 'Tableau Data Visualization', track: 'Data Analytics & BI', level: 'Intermediate', duration: '8 Weeks', price: '₹28,000' },
    'excel-advanced': { title: 'Advanced Excel & VBA', track: 'Data Analytics & BI', level: 'Beginner', duration: '6 Weeks', price: '₹18,000' },
    'data-storytelling': { title: 'Data Storytelling & Business Intelligence', track: 'Data Analytics & BI', level: 'Intermediate', duration: '6 Weeks', price: '₹22,000' },
    'sql-analytics': { title: 'SQL for Data Analytics', track: 'Data Analytics & BI', level: 'Beginner', duration: '6 Weeks', price: '₹20,000' },
    'looker-studio': { title: 'Looker Studio & Google Analytics', track: 'Data Analytics & BI', level: 'Intermediate', duration: '6 Weeks', price: '₹24,000' },
    'hadoop-bigdata': { title: 'Hadoop & Big Data Fundamentals', track: 'Data Engineering', level: 'Intermediate', duration: '10 Weeks', price: '₹35,000' },
    'kafka-streaming': { title: 'Kafka & Real-time Streaming', track: 'Data Engineering', level: 'Advanced', duration: '8 Weeks', price: '₹38,000' },
    'spark-pyspark': { title: 'Apache Spark & PySpark', track: 'Data Engineering', level: 'Advanced', duration: '10 Weeks', price: '₹40,000' },
    'pentaho-etl': { title: 'Pentaho & ETL Tools', track: 'Data Engineering', level: 'Intermediate', duration: '8 Weeks', price: '₹30,000' },
    'snowflake-dbt': { title: 'Snowflake & dbt', track: 'Data Engineering', level: 'Intermediate', duration: '8 Weeks', price: '₹35,000' },
    'airflow': { title: 'Apache Airflow & Data Orchestration', track: 'Data Engineering', level: 'Advanced', duration: '8 Weeks', price: '₹35,000' },
    'data-warehousing': { title: 'Data Warehousing & Modeling', track: 'Data Engineering', level: 'Intermediate', duration: '10 Weeks', price: '₹32,000' },
    'data-quality': { title: 'Data Quality & Governance', track: 'Data Engineering', level: 'Intermediate', duration: '6 Weeks', price: '₹28,000' },
    'realtime-pipelines': { title: 'Real-time Data Pipelines', track: 'Data Engineering', level: 'Advanced', duration: '10 Weeks', price: '₹42,000' },
    'mern-stack': { title: 'MERN Stack Development', track: 'Full Stack Development', level: 'Intermediate', duration: '14 Weeks', price: '₹38,000' },
    'java-fullstack': { title: 'Java Full Stack with Spring Boot', track: 'Full Stack Development', level: 'Intermediate', duration: '16 Weeks', price: '₹42,000' },
    'python-fullstack': { title: 'Python Full Stack with Django', track: 'Full Stack Development', level: 'Intermediate', duration: '14 Weeks', price: '₹38,000' },
    'dotnet-fullstack': { title: '.NET Full Stack Development', track: 'Full Stack Development', level: 'Intermediate', duration: '14 Weeks', price: '₹40,000' },
    'react-nextjs': { title: 'React & Next.js Mastery', track: 'Full Stack Development', level: 'Intermediate', duration: '10 Weeks', price: '₹32,000' },
    'nodejs-express': { title: 'Node.js & Express Backend', track: 'Full Stack Development', level: 'Intermediate', duration: '10 Weeks', price: '₹30,000' },
    'javascript-typescript': { title: 'JavaScript & TypeScript Complete', track: 'Full Stack Development', level: 'Intermediate', duration: '12 Weeks', price: '₹32,000' },
    'apis-graphql': { title: 'REST APIs & GraphQL', track: 'Full Stack Development', level: 'Intermediate', duration: '8 Weeks', price: '₹28,000' },
    'database-sql': { title: 'Database Design & SQL', track: 'Full Stack Development', level: 'Beginner', duration: '8 Weeks', price: '₹24,000' },
    'realtime-websockets': { title: 'Real-time Apps with WebSockets', track: 'Full Stack Development', level: 'Advanced', duration: '8 Weeks', price: '₹32,000' },
    'python-complete': { title: 'Python Programming Complete', track: 'Programming Fundamentals', level: 'Beginner', duration: '10 Weeks', price: '₹22,000' },
    'java-spring': { title: 'Java & Spring Framework', track: 'Programming Fundamentals', level: 'Intermediate', duration: '12 Weeks', price: '₹28,000' },
    'c-cpp': { title: 'C & C++ Programming', track: 'Programming Fundamentals', level: 'Intermediate', duration: '10 Weeks', price: '₹24,000' },
    'js-ts-complete': { title: 'JavaScript & TypeScript Fundamentals', track: 'Programming Fundamentals', level: 'Beginner', duration: '8 Weeks', price: '₹20,000' },
    'golang': { title: 'Go (Golang) Programming', track: 'Programming Fundamentals', level: 'Intermediate', duration: '8 Weeks', price: '₹28,000' },
    'dsa': { title: 'Data Structures & Algorithms', track: 'Programming Fundamentals', level: 'Intermediate', duration: '14 Weeks', price: '₹32,000' },
    'system-design': { title: 'System Design & Architecture', track: 'Programming Fundamentals', level: 'Advanced', duration: '10 Weeks', price: '₹38,000' },
    'clean-code': { title: 'Clean Code & Best Practices', track: 'Programming Fundamentals', level: 'Intermediate', duration: '6 Weeks', price: '₹22,000' },
    'uiux-basics': { title: 'UI/UX Design Fundamentals', track: 'UI/UX Design', level: 'Beginner', duration: '8 Weeks', price: '₹24,000' },
    'figma': { title: 'Figma for UI/UX Design', track: 'UI/UX Design', level: 'Beginner', duration: '6 Weeks', price: '₹18,000' },
    'advanced-css': { title: 'Advanced CSS & Animations', track: 'UI/UX Design', level: 'Intermediate', duration: '6 Weeks', price: '₹20,000' },
    'design-systems': { title: 'Design Systems & Component Libraries', track: 'UI/UX Design', level: 'Advanced', duration: '8 Weeks', price: '₹28,000' },
    'accessibility': { title: 'Web Accessibility (A11y)', track: 'UI/UX Design', level: 'Intermediate', duration: '6 Weeks', price: '₹22,000' },
    'aws-complete': { title: 'AWS Cloud Complete', track: 'Cloud & DevOps', level: 'Beginner', duration: '12 Weeks', price: '₹35,000' },
    'azure-complete': { title: 'Microsoft Azure Complete', track: 'Cloud & DevOps', level: 'Beginner', duration: '12 Weeks', price: '₹35,000' },
    'docker-k8s': { title: 'Docker & Kubernetes', track: 'Cloud & DevOps', level: 'Intermediate', duration: '10 Weeks', price: '₹38,000' },
    'cicd-pipelines': { title: 'CI/CD Pipelines & Automation', track: 'Cloud & DevOps', level: 'Intermediate', duration: '8 Weeks', price: '₹32,000' },
    'terraform-iac': { title: 'Terraform & Infrastructure as Code', track: 'Cloud & DevOps', level: 'Advanced', duration: '8 Weeks', price: '₹35,000' },
    'gcp': { title: 'Google Cloud Platform (GCP)', track: 'Cloud & DevOps', level: 'Beginner', duration: '12 Weeks', price: '₹35,000' },
    'monitoring': { title: 'Monitoring & Observability', track: 'Cloud & DevOps', level: 'Intermediate', duration: '6 Weeks', price: '₹28,000' },
    'devops-sre': { title: 'DevOps & SRE Practices', track: 'Cloud & DevOps', level: 'Advanced', duration: '12 Weeks', price: '₹42,000' },
    'cloud-security': { title: 'Cloud Security Best Practices', track: 'Cloud & DevOps', level: 'Intermediate', duration: '8 Weeks', price: '₹32,000' },
    'gitops': { title: 'GitOps & ArgoCD', track: 'Cloud & DevOps', level: 'Advanced', duration: '6 Weeks', price: '₹30,000' },
    'sf-admin': { title: 'Salesforce Administrator', track: 'Salesforce', level: 'Beginner', duration: '8 Weeks', price: '₹28,000' },
    'sf-adv-admin': { title: 'Salesforce Advanced Administrator', track: 'Salesforce', level: 'Intermediate', duration: '6 Weeks', price: '₹30,000' },
    'sf-developer': { title: 'Salesforce Developer (Apex & LWC)', track: 'Salesforce', level: 'Intermediate', duration: '12 Weeks', price: '₹38,000' },
    'sf-lwc': { title: 'Lightning Web Components', track: 'Salesforce', level: 'Intermediate', duration: '8 Weeks', price: '₹32,000' },
    'sf-flow': { title: 'Salesforce Flow & Process Automation', track: 'Salesforce', level: 'Intermediate', duration: '6 Weeks', price: '₹25,000' },
    'sf-einstein': { title: 'Salesforce Einstein Analytics', track: 'Salesforce', level: 'Intermediate', duration: '8 Weeks', price: '₹35,000' },
    'sf-ai-cloud': { title: 'Salesforce AI Cloud', track: 'Salesforce', level: 'Advanced', duration: '8 Weeks', price: '₹40,000' },
    'sf-data-cloud': { title: 'Salesforce Data Cloud', track: 'Salesforce', level: 'Intermediate', duration: '8 Weeks', price: '₹36,000' },
    'sf-cpq': { title: 'Salesforce CPQ', track: 'Salesforce', level: 'Advanced', duration: '10 Weeks', price: '₹42,000' },
    'sf-revenue': { title: 'Salesforce Revenue Cloud', track: 'Salesforce', level: 'Advanced', duration: '10 Weeks', price: '₹45,000' },
    'sf-service': { title: 'Salesforce Service Cloud', track: 'Salesforce', level: 'Intermediate', duration: '8 Weeks', price: '₹32,000' },
    'sf-marketing': { title: 'Salesforce Marketing Cloud', track: 'Salesforce', level: 'Intermediate', duration: '10 Weeks', price: '₹38,000' },
    'sf-integration': { title: 'Salesforce Integration Patterns', track: 'Salesforce', level: 'Advanced', duration: '8 Weeks', price: '₹40,000' },
    'mulesoft': { title: 'MuleSoft Integration', track: 'Salesforce', level: 'Advanced', duration: '10 Weeks', price: '₹45,000' },
    'sf-devops': { title: 'Salesforce DevOps', track: 'Salesforce', level: 'Advanced', duration: '6 Weeks', price: '₹35,000' },
    'uipath-rpa': { title: 'UiPath RPA Developer', track: 'Automation & RPA', level: 'Intermediate', duration: '10 Weeks', price: '₹35,000' },
    'power-automate': { title: 'Power Automate Desktop & Cloud', track: 'Automation & RPA', level: 'Beginner', duration: '6 Weeks', price: '₹22,000' },
    'unifyapps': { title: 'UnifyApps Automation', track: 'Automation & RPA', level: 'Intermediate', duration: '6 Weeks', price: '₹28,000' },
    'zapier': { title: 'Zapier & No-Code Automation', track: 'Automation & RPA', level: 'Beginner', duration: '4 Weeks', price: '₹15,000' },
    'low-code': { title: 'Low-Code/No-Code Development', track: 'Automation & RPA', level: 'Beginner', duration: '6 Weeks', price: '₹20,000' },
    'power-platform': { title: 'Microsoft Power Platform', track: 'Automation & RPA', level: 'Intermediate', duration: '10 Weeks', price: '₹32,000' },
    'ai-automation': { title: 'AI-Powered Automation', track: 'Automation & RPA', level: 'Advanced', duration: '8 Weeks', price: '₹38,000' },
    'process-mining': { title: 'Process Mining & Optimization', track: 'Automation & RPA', level: 'Intermediate', duration: '6 Weeks', price: '₹28,000' },
    'automation-anywhere': { title: 'Automation Anywhere', track: 'Automation & RPA', level: 'Intermediate', duration: '8 Weeks', price: '₹32,000' },
    'flutter': { title: 'Flutter Mobile Development', track: 'Mobile Development', level: 'Intermediate', duration: '12 Weeks', price: '₹35,000' },
    'react-native': { title: 'React Native Development', track: 'Mobile Development', level: 'Intermediate', duration: '12 Weeks', price: '₹35,000' },
    'ios-swift': { title: 'iOS Development with Swift', track: 'Mobile Development', level: 'Intermediate', duration: '14 Weeks', price: '₹40,000' },
    'android-kotlin': { title: 'Android Development with Kotlin', track: 'Mobile Development', level: 'Intermediate', duration: '14 Weeks', price: '₹40,000' },
    'mobile-backend': { title: 'Mobile Backend Development', track: 'Mobile Development', level: 'Intermediate', duration: '8 Weeks', price: '₹30,000' },
    'mobile-cicd': { title: 'Mobile CI/CD & DevOps', track: 'Mobile Development', level: 'Advanced', duration: '6 Weeks', price: '₹28,000' },
    'security-basics': { title: 'Cybersecurity Fundamentals', track: 'Cybersecurity', level: 'Beginner', duration: '8 Weeks', price: '₹25,000' },
    'ethical-hacking': { title: 'Ethical Hacking & Penetration Testing', track: 'Cybersecurity', level: 'Intermediate', duration: '12 Weeks', price: '₹40,000' },
    'cloud-sec': { title: 'Cloud Security', track: 'Cybersecurity', level: 'Intermediate', duration: '8 Weeks', price: '₹35,000' },
    'appsec': { title: 'Application Security', track: 'Cybersecurity', level: 'Intermediate', duration: '10 Weeks', price: '₹38,000' },
    'network-sec': { title: 'Network Security', track: 'Cybersecurity', level: 'Intermediate', duration: '10 Weeks', price: '₹35,000' },
    'soc-ops': { title: 'SOC Operations & Incident Response', track: 'Cybersecurity', level: 'Advanced', duration: '10 Weeks', price: '₹42,000' },
    'dsa-fundamentals': { title: 'Data Structures Fundamentals', track: 'Data Structures & Algorithms', level: 'Beginner', duration: '8 Weeks', price: '₹22,000' },
    'trees-graphs': { title: 'Trees & Graphs', track: 'Data Structures & Algorithms', level: 'Intermediate', duration: '10 Weeks', price: '₹28,000' },
    'sorting-searching': { title: 'Sorting & Searching Algorithms', track: 'Data Structures & Algorithms', level: 'Intermediate', duration: '8 Weeks', price: '₹24,000' },
    'dynamic-programming': { title: 'Dynamic Programming', track: 'Data Structures & Algorithms', level: 'Advanced', duration: '10 Weeks', price: '₹30,000' },
    'hash-advanced-ds': { title: 'Hash Tables & Advanced Structures', track: 'Data Structures & Algorithms', level: 'Advanced', duration: '10 Weeks', price: '₹30,000' },
    'algorithm-design-analysis': { title: 'Algorithm Design & Complexity Analysis', track: 'Data Structures & Algorithms', level: 'Advanced', duration: '10 Weeks', price: '₹32,000' },
    // Track 14: AI Tools for Non-Technical Professionals
    'chatgpt-mastery': { title: 'ChatGPT Mastery for Professionals', track: 'AI Tools (No-Code)', level: 'Beginner', duration: '4 Weeks', price: '₹15,000' },
    'claude-engineers': { title: 'Claude AI for Engineers', track: 'AI Tools (No-Code)', level: 'Beginner', duration: '3 Weeks', price: '₹12,000' },
    'gemini-ai': { title: 'Gemini & Google AI Tools', track: 'AI Tools (No-Code)', level: 'Beginner', duration: '3 Weeks', price: '₹12,000' },
    'canva-ai-design': { title: 'Canva AI for Design', track: 'AI Tools (No-Code)', level: 'Intermediate', duration: '4 Weeks', price: '₹18,000' },
    'copilot-productivity': { title: 'Microsoft Copilot for Productivity', track: 'AI Tools (No-Code)', level: 'Intermediate', duration: '5 Weeks', price: '₹20,000' },
    'notion-ai-pm': { title: 'Notion AI for Project Management', track: 'AI Tools (No-Code)', level: 'Intermediate', duration: '4 Weeks', price: '₹18,000' },
    'ai-image-video': { title: 'AI Image & Video Generation', track: 'AI Tools (No-Code)', level: 'Advanced', duration: '6 Weeks', price: '₹25,000' },
    'ai-workflow-automation': { title: 'AI Workflow Automation (No-Code)', track: 'AI Tools (No-Code)', level: 'Advanced', duration: '6 Weeks', price: '₹28,000' },
    // Track 15: Databases & Data Management
    'sql-fundamentals-advanced': { title: 'SQL Fundamentals & Advanced', track: 'Databases & Data Management', level: 'Beginner', duration: '10 Weeks', price: '₹25,000' },
    'postgresql-complete': { title: 'PostgreSQL Complete', track: 'Databases & Data Management', level: 'Intermediate', duration: '10 Weeks', price: '₹30,000' },
    'mysql-mastery': { title: 'MySQL Mastery', track: 'Databases & Data Management', level: 'Intermediate', duration: '10 Weeks', price: '₹30,000' },
    'mongodb-nosql': { title: 'MongoDB (NoSQL)', track: 'Databases & Data Management', level: 'Intermediate', duration: '8 Weeks', price: '₹28,000' },
    'redis-caching': { title: 'Redis & Caching Strategies', track: 'Databases & Data Management', level: 'Intermediate', duration: '6 Weeks', price: '₹22,000' },
    'cassandra-distributed': { title: 'Apache Cassandra (Distributed DB)', track: 'Databases & Data Management', level: 'Advanced', duration: '8 Weeks', price: '₹32,000' },
    'neo4j-graph-db': { title: 'Neo4j (Graph Database)', track: 'Databases & Data Management', level: 'Advanced', duration: '8 Weeks', price: '₹30,000' },
    'vector-databases-ai': { title: 'Vector Databases for AI', track: 'Databases & Data Management', level: 'Advanced', duration: '8 Weeks', price: '₹35,000' },
    'elasticsearch-search': { title: 'Elasticsearch & Search Analytics', track: 'Databases & Data Management', level: 'Advanced', duration: '10 Weeks', price: '₹35,000' },
    'database-design-optimization': { title: 'Database Design & Optimization', track: 'Databases & Data Management', level: 'Intermediate', duration: '10 Weeks', price: '₹28,000' },
    'oracle-plsql': { title: 'Oracle PL/SQL Programming', track: 'Databases & Data Management', level: 'Intermediate', duration: '10 Weeks', price: '₹32,000' }
};

function generateCourseData(courseId, template) {
    return {
        title: template.title,
        track: template.track,
        rating: '4.7/5',
        students: '1,200',
        level: template.level,
        duration: template.duration,
        mode: 'Hybrid',
        price: template.price,
        nextBatch: 'Feb 1, 2026',
        seatsLeft: '12/25',
        heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80',
        description: `Master ${template.title} with our comprehensive ${template.duration} course. Learn industry best practices, work on real-world projects, and get job-ready with our hands-on training approach.`,
        learningOutcomes: [
            `Understand core concepts of ${template.title}`,
            'Work on real-world projects and case studies',
            'Master industry-standard tools and technologies',
            'Build a professional portfolio',
            'Prepare for industry certifications',
            'Get job placement assistance'
        ],
        prerequisites: [
            'Basic computer knowledge',
            template.level !== 'Beginner' ? 'Some programming experience recommended' : 'No prior experience needed',
            'Enthusiasm to learn new technologies'
        ],
        modules: [
            { title: 'Module 1: Fundamentals', topics: ['Introduction', 'Core Concepts', 'Tools Setup', 'Basic Operations', 'Best Practices'] },
            { title: 'Module 2: Intermediate Concepts', topics: ['Advanced Topics', 'Practical Applications', 'Industry Use Cases', 'Hands-on Practice', 'Project Work'] },
            { title: 'Module 3: Advanced Topics', topics: ['Expert Techniques', 'Optimization', 'Scaling', 'Production Deployment', 'Troubleshooting'] },
            { title: 'Module 4: CAPSTONE PROJECT', topics: ['Project Planning', 'Implementation', 'Testing & Deployment', 'Presentation', 'Portfolio Building'] }
        ],
        instructor: {
            name: 'Expert Instructor',
            title: 'Senior Professional',
            experience: '10+ years experience',
            background: 'Industry Expert',
            bio: `Experienced professional with deep expertise in ${template.title} and related technologies.`
        },
        careerRoles: [
            `${template.title} Specialist`,
            'Software Engineer',
            'Technical Consultant',
            'Solution Architect'
        ],
        salaryRange: '₹8-25 LPA'
    };
}

// Merge template courses with manual courses
Object.keys(courseTemplates).forEach(id => {
    if (!courseData[id]) {
        courseData[id] = generateCourseData(id, courseTemplates[id]);
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Course Detail JS Loaded!'); // Debug log

    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('course');

    console.log('Course ID:', courseId); // Debug log
    console.log('Course exists?', !!courseData[courseId]); // Debug log

    if (courseId && courseData[courseId]) {
        populateCourseDetails(courseData[courseId]);
    } else {
        // Show error or redirect
        document.getElementById('course-title').textContent = 'Course Not Found - ID: ' + courseId;
        console.error('Course not found:', courseId);
    }

    // Module accordion functionality
    initializeModuleAccordion();
});

// Populate course details
function populateCourseDetails(course) {
    // Hero section
    document.getElementById('course-track').textContent = course.track;
    document.getElementById('course-title-breadcrumb').textContent = course.title;
    document.getElementById('course-title').textContent = course.title;
    document.getElementById('course-rating').textContent = course.rating;
    document.getElementById('student-count').textContent = course.students + ' students';
    document.getElementById('course-level').textContent = '📊 ' + course.level;
    document.getElementById('course-duration').textContent = '⏱️ ' + course.duration;
    document.getElementById('course-mode').textContent = '💻 ' + course.mode;

    // Hero Image
    if (course.heroImage) {
        document.getElementById('course-hero-img').src = course.heroImage;
        document.getElementById('course-hero-img').alt = course.title + ' Course';
    }

    // Description
    document.getElementById('course-description').textContent = course.description;

    // Learning Outcomes
    const outcomesContainer = document.getElementById('learning-outcomes');
    outcomesContainer.innerHTML = '';
    course.learningOutcomes.forEach(outcome => {
        const li = document.createElement('li');
        li.textContent = outcome;
        outcomesContainer.appendChild(li);
    });

    // Prerequisites
    const prereqContainer = document.getElementById('prerequisites');
    prereqContainer.innerHTML = '';
    course.prerequisites.forEach(prereq => {
        const li = document.createElement('li');
        li.textContent = prereq;
        prereqContainer.appendChild(li);
    });

    // Modules
    const modulesContainer = document.getElementById('modules-container');
    modulesContainer.innerHTML = '';
    course.modules.forEach((module, index) => {
        const moduleDiv = document.createElement('div');
        moduleDiv.className = 'module-item';
        if (index === 0) moduleDiv.classList.add('active'); // First module open by default

        const header = document.createElement('div');
        header.className = 'module-header';

        const title = document.createElement('h4');
        title.textContent = module.title;

        const toggle = document.createElement('span');
        toggle.className = 'module-toggle';
        toggle.textContent = '▼';

        header.appendChild(title);
        header.appendChild(toggle);

        const topics = document.createElement('div');
        topics.className = 'module-topics';

        const topicsList = document.createElement('ul');
        module.topics.forEach(topic => {
            const li = document.createElement('li');
            li.textContent = topic;
            topicsList.appendChild(li);
        });

        topics.appendChild(topicsList);
        moduleDiv.appendChild(header);
        moduleDiv.appendChild(topics);
        modulesContainer.appendChild(moduleDiv);
    });

    // Instructor
    const instructorInfo = document.getElementById('instructor-info');
    instructorInfo.innerHTML = `
        <div class="instructor-photo"></div>
        <div class="instructor-details">
            <h3>${course.instructor.name}</h3>
            <p><strong>${course.instructor.title}</strong></p>
            <p>${course.instructor.experience} • ${course.instructor.background}</p>
            <p>${course.instructor.bio}</p>
        </div>
    `;

    // Career Info - Career Path Approach
    const careerInfo = document.getElementById('career-info');
    let rolesHTML = '<p class="career-intro">After completing this course, you\'ll be qualified for:</p>';
    rolesHTML += '<div class="career-roles">';
    course.careerRoles.forEach(role => {
        rolesHTML += `<div class="role-card"><h4>✓ ${role}</h4></div>`;
    });
    rolesHTML += '</div>';
    rolesHTML += `
        <div class="career-path">
            <h4>Your Career Growth Path:</h4>
            <div class="path-timeline">
                <div class="path-step">
                    <span class="path-level">Entry Level (0-2 years)</span>
                    <span class="path-role">Junior ${course.careerRoles[0]}</span>
                </div>
                <div class="path-arrow">→</div>
                <div class="path-step">
                    <span class="path-level">Mid Level (2-5 years)</span>
                    <span class="path-role">Senior ${course.careerRoles[0]}</span>
                </div>
                <div class="path-arrow">→</div>
                <div class="path-step">
                    <span class="path-level">Advanced (5+ years)</span>
                    <span class="path-role">Lead / Architect</span>
                </div>
            </div>
        </div>
    `;
    careerInfo.innerHTML = rolesHTML;


}

// Module accordion
function initializeModuleAccordion() {
    document.addEventListener('click', function(e) {
        const moduleHeader = e.target.closest('.module-header');
        if (moduleHeader) {
            const moduleItem = moduleHeader.parentElement;
            moduleItem.classList.toggle('active');
        }
    });
}

// Download Syllabus
document.getElementById('download-syllabus')?.addEventListener('click', function() {
    alert('Syllabus download feature coming soon!');
    // TODO: Implement PDF generation or link to downloadable syllabus
});
