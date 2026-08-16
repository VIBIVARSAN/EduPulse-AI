// ===================================================================
// EduPulse AI - Initial Academic Database & Telemetry State
// ===================================================================

export const INITIAL_USERS = [
  {
    id: "stu-1",
    name: "Alex Chen",
    email: "alex.chen@edupulse.edu",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    studentId: "STU-2026-084",
    department: "Computer Science & AI",
    year: "Year 3 (Junior)",
    semester: "Semester 5",
    gpa: 8.74,
    attendanceRate: 88.5,
    riskLevel: "Low", // Low, Moderate, High
    phone: "+1 (555) 234-5678",
    bio: "Passionate about Machine Learning, Distributed Systems, and Human-Computer Interaction.",
    advisor: "Dr. Sarah Bennett",
    enrolledCourseIds: ["cs-101", "cs-204", "ds-301", "ma-202"],
  },
  {
    id: "stu-2",
    name: "Maya Patel",
    email: "maya.patel@edupulse.edu",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    studentId: "STU-2026-092",
    department: "Data Science & Analytics",
    year: "Year 2 (Sophomore)",
    semester: "Semester 3",
    gpa: 7.40,
    attendanceRate: 71.0,
    riskLevel: "High", // Attendance < 75%
    phone: "+1 (555) 876-5432",
    bio: "Aspiring Data Scientist with keen interest in Predictive Analytics and Natural Language Processing.",
    advisor: "Prof. Alan Turing",
    enrolledCourseIds: ["cs-101", "ds-301", "ma-202"],
  },
  {
    id: "stu-3",
    name: "Liam Smith",
    email: "liam.smith@edupulse.edu",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    studentId: "STU-2026-115",
    department: "Computer Science & AI",
    year: "Year 3 (Junior)",
    semester: "Semester 5",
    gpa: 9.45,
    attendanceRate: 96.0,
    riskLevel: "Low",
    phone: "+1 (555) 345-6789",
    bio: "Competitive programmer, open-source contributor, and cloud architecture enthusiast.",
    advisor: "Dr. Sarah Bennett",
    enrolledCourseIds: ["cs-101", "cs-204", "cs-401"],
  },
  {
    id: "stu-4",
    name: "Sofia Rodriguez",
    email: "sofia.r@edupulse.edu",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    studentId: "STU-2026-143",
    department: "Cyber Security & Networks",
    year: "Year 1 (Freshman)",
    semester: "Semester 1",
    gpa: 6.85,
    attendanceRate: 68.5,
    riskLevel: "High", // At-risk
    phone: "+1 (555) 456-7890",
    bio: "Exploring network security, cryptography protocols, and digital forensics.",
    advisor: "Dr. Elena Rostova",
    enrolledCourseIds: ["cs-101", "cs-401", "ma-202"],
  },
  {
    id: "tea-1",
    name: "Dr. Sarah Bennett",
    email: "sarah.bennett@edupulse.edu",
    role: "teacher",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    teacherId: "FAC-2018-012",
    department: "Computer Science & AI",
    title: "Professor & Chair of Machine Intelligence",
    coursesTaught: ["cs-101", "cs-204"],
    office: "Engineering Hall 402",
    officeHours: "Mon / Wed 2:00 PM - 4:30 PM",
    rating: 4.9,
    reviewsCount: 142,
    bio: "Ph.D. in Computer Science from MIT. Over 14 years of research experience in Deep Learning and Distributed Neural Architectures.",
  },
  {
    id: "tea-2",
    name: "Prof. Alan Turing",
    email: "alan.turing@edupulse.edu",
    role: "teacher",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    teacherId: "FAC-2015-004",
    department: "Data Science & Analytics",
    title: "Associate Professor of Statistical Computing",
    coursesTaught: ["ds-301", "ma-202"],
    office: "Mathematics Building 210",
    officeHours: "Tue / Thu 10:00 AM - 12:30 PM",
    rating: 4.8,
    reviewsCount: 98,
    bio: "Specializing in High-Dimensional Statistics, Bayesian Modeling, and Big Data Optimization.",
  },
  {
    id: "tea-3",
    name: "Dr. Elena Rostova",
    email: "elena.rostova@edupulse.edu",
    role: "teacher",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    teacherId: "FAC-2020-029",
    department: "Cyber Security & Networks",
    title: "Assistant Professor of Systems Security",
    coursesTaught: ["cs-401"],
    office: "Security Lab 105",
    officeHours: "Friday 1:00 PM - 4:00 PM",
    rating: 4.85,
    reviewsCount: 64,
    bio: "Expert in Cryptographic Protocols, Zero-Knowledge Proofs, and Cloud Infrastructure Defense.",
  },
  {
    id: "adm-1",
    name: "Marcus Vance",
    email: "marcus.vance@edupulse.edu",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    adminId: "ADM-2012-001",
    department: "Office of the Academic Provost",
    title: "Chief Academic Registrar & Operations Director",
    phone: "+1 (555) 100-9900",
    bio: "Overseeing university accreditation, academic curriculum standards, and intelligent student support services.",
  }
];

export const INITIAL_COURSES = [
  {
    id: "cs-101",
    code: "CS 101",
    title: "Data Structures & Advanced Algorithms",
    category: "Computer Science",
    level: "Intermediate",
    credits: 4,
    instructorId: "tea-1",
    instructorName: "Dr. Sarah Bennett",
    rating: 4.9,
    reviewsCount: 184,
    enrolledCount: 128,
    capacity: 150,
    schedule: "Mon, Wed 10:00 AM - 11:30 AM",
    room: "Auditorium CS-1",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
    description: "Master foundational and advanced data structures including dynamic arrays, balanced search trees, heaps, graphs, hashing, and dynamic programming with algorithmic complexity analysis.",
    prerequisites: ["Intro to Programming (CS 50)", "Discrete Mathematics (MA 101)"],
    syllabus: [
      {
        week: "Week 1-2",
        title: "Complexity Analysis & Dynamic Arrays",
        topics: ["Big-O, Big-Theta, Big-Omega notation", "Amortized analysis", "Dynamic array implementations"]
      },
      {
        week: "Week 3-4",
        title: "Trees, AVL & Red-Black Trees",
        topics: ["Binary Search Trees", "Tree rotations & self-balancing properties", "B-Trees & Multi-way indexing"]
      },
      {
        week: "Week 5-6",
        title: "Graph Algorithms & Shortest Paths",
        topics: ["Breadth-First and Depth-First Search", "Dijkstra and A* pathfinding", "Minimum Spanning Trees (Kruskal/Prim)"]
      },
      {
        week: "Week 7-8",
        title: "Dynamic Programming & Optimization",
        topics: ["Memoization vs Tabulation", "Knapsack & Edit Distance", "NP-Completeness and Approximation"]
      }
    ]
  },
  {
    id: "cs-204",
    code: "CS 204",
    title: "Applied Artificial Intelligence & Machine Learning",
    category: "Artificial Intelligence",
    level: "Advanced",
    credits: 4,
    instructorId: "tea-1",
    instructorName: "Dr. Sarah Bennett",
    rating: 4.95,
    reviewsCount: 210,
    enrolledCount: 140,
    capacity: 150,
    schedule: "Tue, Thu 01:00 PM - 02:30 PM",
    room: "AI Discovery Lab 3",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80",
    description: "Comprehensive introduction to machine learning paradigms: supervised, unsupervised, and reinforcement learning. Hands-on projects with PyTorch, Transformer models, and deep convolutional networks.",
    prerequisites: ["Linear Algebra", "Calculus III", "Data Structures"],
    syllabus: [
      {
        week: "Week 1-3",
        title: "Supervised Learning Foundations",
        topics: ["Linear & Logistic Regression", "Gradient Descent variants", "Loss functions and regularization (L1/L2)"]
      },
      {
        week: "Week 4-6",
        title: "Deep Neural Networks & Backpropagation",
        topics: ["Feedforward architectures", "Activation functions", "Automatic differentiation & PyTorch internals"]
      },
      {
        week: "Week 7-9",
        title: "Sequence Models & Attention Mechanisms",
        topics: ["RNNs, LSTMs, and GRUs", "Self-Attention and Transformer Architecture", "Pre-training and Fine-tuning LLMs"]
      }
    ]
  },
  {
    id: "ds-301",
    code: "DS 301",
    title: "Predictive Analytics & Big Data Systems",
    category: "Data Science",
    level: "Intermediate",
    credits: 3,
    instructorId: "tea-2",
    instructorName: "Prof. Alan Turing",
    rating: 4.8,
    reviewsCount: 95,
    enrolledCount: 88,
    capacity: 100,
    schedule: "Mon, Wed 02:00 PM - 03:30 PM",
    room: "Data Analytics Center 12",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
    description: "Learn scalable data pipeline architectures, distributed processing with Apache Spark, statistical inference, hypothesis testing, and production predictive modeling.",
    prerequisites: ["Probability & Statistics", "Python for Scientific Computing"],
    syllabus: [
      {
        week: "Week 1-3",
        title: "Exploratory Data Analysis & Statistical Modeling",
        topics: ["Sampling distributions", "Hypothesis testing & p-values", "Multivariate regression"]
      },
      {
        week: "Week 4-6",
        title: "Distributed Data Processing",
        topics: ["MapReduce concepts", "Apache Spark DataFrame APIs", "Stream processing paradigms"]
      }
    ]
  },
  {
    id: "ma-202",
    code: "MA 202",
    title: "Linear Algebra & Optimization for Engineering",
    category: "Mathematics",
    level: "Beginner",
    credits: 3,
    instructorId: "tea-2",
    instructorName: "Prof. Alan Turing",
    rating: 4.75,
    reviewsCount: 112,
    enrolledCount: 165,
    capacity: 180,
    schedule: "Tue, Thu 09:00 AM - 10:30 AM",
    room: "Hall of Sciences 104",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80",
    description: "Vector spaces, matrices, linear transformations, eigenvalues and eigenvectors, singular value decomposition (SVD), and convex optimization techniques.",
    prerequisites: ["Calculus I & II"],
    syllabus: [
      {
        week: "Week 1-3",
        title: "Vector Spaces & Matrix Transformations",
        topics: ["Linear independence & spanning sets", "Matrix rank and nullity", "Orthogonality & Gram-Schmidt"]
      },
      {
        week: "Week 4-6",
        title: "Spectral Theory & Decomposition",
        topics: ["Eigenvalues and Eigenvectors", "Diagonalization", "Singular Value Decomposition (SVD)"]
      }
    ]
  },
  {
    id: "cs-401",
    code: "CS 401",
    title: "Cloud Infrastructure & Enterprise Cyber Security",
    category: "Cyber Security",
    level: "Advanced",
    credits: 4,
    instructorId: "tea-3",
    instructorName: "Dr. Elena Rostova",
    rating: 4.88,
    reviewsCount: 84,
    enrolledCount: 76,
    capacity: 90,
    schedule: "Friday 09:00 AM - 12:00 PM",
    room: "Security Operations Center",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    description: "Zero-trust network architectures, container security, IAM policies, public-key cryptography, penetration testing methodologies, and defensive threat modeling.",
    prerequisites: ["Computer Networks", "Operating Systems"],
    syllabus: [
      {
        week: "Week 1-4",
        title: "Cryptographic Protocols & PKI",
        topics: ["Symmetric & Asymmetric Ciphers", "Diffie-Hellman & Elliptic Curves", "TLS Handshake internals"]
      },
      {
        week: "Week 5-8",
        title: "Cloud Threat Modeling & Defense",
        topics: ["Container isolation & Kubernetes security", "Zero Trust Architecture", "Incident response workflows"]
      }
    ]
  }
];

export const INITIAL_ASSIGNMENTS = [
  {
    id: "asg-1",
    courseId: "cs-101",
    courseCode: "CS 101",
    courseTitle: "Data Structures & Advanced Algorithms",
    title: "Implementation of Self-Balancing AVL Trees & Benchmark",
    description: "Construct a fully functional generic AVL Tree in C++ or Python with insert, delete, and re-balancing rotations. Benchmark performance against standard Red-Black tree implementations.",
    dueDate: "2026-08-25T23:59:59",
    totalPoints: 100,
    status: "submitted", // pending, submitted, graded
    submissions: [
      {
        studentId: "stu-1",
        studentName: "Alex Chen",
        submittedAt: "2026-08-15T18:30:00",
        content: "Implemented AVL Tree in Python with unit tests and benchmark charts. Rotations (LL, RR, LR, RL) verified with 10,000 randomized insertions.",
        attachmentName: "avl_benchmark_alex_chen.zip",
        grade: 96,
        feedback: "Outstanding implementation of rotational balancing and clear benchmarking visualization.",
        aiEvaluation: {
          score: 96,
          summary: "Highly optimal algorithmic implementation with O(log n) worst-case balance guarantees verified.",
          strengths: ["Clean separation of rotation helper methods", "Comprehensive edge cases covered (duplicate keys, deletion of root)"],
          improvements: ["Consider optimizing memory footprint by storing height difference in 2 bits instead of full integer."]
        }
      },
      {
        studentId: "stu-2",
        studentName: "Maya Patel",
        submittedAt: "2026-08-14T21:10:00",
        content: "Draft implementation of AVL tree rotations. Deletion balance factor recalculation requires final fix.",
        attachmentName: "avl_maya_patel.py",
        grade: 78,
        feedback: "Good start, but double rotation logic contains a pointer bug during node deletion.",
        aiEvaluation: {
          score: 78,
          summary: "Core insertion logic is correct; right-left rotation during deletion causes unbalanced subtree under heavy random workloads.",
          strengths: ["Clear code commenting", "Correct height calculation function"],
          improvements: ["Fix RL double rotation edge case when balance factor equals -2."]
        }
      }
    ]
  },
  {
    id: "asg-2",
    courseId: "cs-204",
    courseCode: "CS 204",
    courseTitle: "Applied Artificial Intelligence & Machine Learning",
    title: "Transformer Attention Visualization & Fine-Tuning Lab",
    description: "Implement multi-head scaled dot-product attention from scratch. Fine-tune a lightweight BERT model for sentiment classification and extract attention heatmaps.",
    dueDate: "2026-08-28T23:59:59",
    totalPoints: 100,
    status: "pending",
    submissions: [
      {
        studentId: "stu-1",
        studentName: "Alex Chen",
        submittedAt: null,
        content: "",
        attachmentName: "",
        grade: null,
        feedback: null,
        aiEvaluation: null
      }
    ]
  },
  {
    id: "asg-3",
    courseId: "ds-301",
    courseCode: "DS 301",
    courseTitle: "Predictive Analytics & Big Data Systems",
    title: "Spark Streaming Real-Time Anomaly Detection",
    description: "Configure an Apache Spark streaming pipeline consuming simulated IoT sensor data. Implement sliding-window z-score anomaly detection.",
    dueDate: "2026-08-20T23:59:59",
    totalPoints: 100,
    status: "graded",
    submissions: [
      {
        studentId: "stu-1",
        studentName: "Alex Chen",
        submittedAt: "2026-08-12T14:15:00",
        content: "Configured 10-second sliding window with watermark threshold of 30 seconds. Deployed Dockerized Kafka cluster for sensor generation.",
        attachmentName: "spark_streaming_alex.py",
        grade: 92,
        feedback: "Very robust watermark handling and clean streaming sink.",
        aiEvaluation: {
          score: 92,
          summary: "Exceptional streaming pipeline architecture with high throughput resilience.",
          strengths: ["Proper late-arriving event handling", "Clean decoupled modular architecture"],
          improvements: ["Increase parallelism partitions for high data spikes."]
        }
      }
    ]
  },
  {
    id: "asg-4",
    courseId: "ma-202",
    courseCode: "MA 202",
    courseTitle: "Linear Algebra & Optimization for Engineering",
    title: "SVD Image Compression & Eigenface Analysis",
    description: "Write a program to perform low-rank matrix approximation via Singular Value Decomposition on grayscale face datasets.",
    dueDate: "2026-09-05T23:59:59",
    totalPoints: 50,
    status: "pending",
    submissions: []
  }
];

export const INITIAL_ATTENDANCE = [
  {
    id: "att-1",
    courseId: "cs-101",
    date: "2026-08-14",
    records: [
      { studentId: "stu-1", studentName: "Alex Chen", status: "Present" },
      { studentId: "stu-2", studentName: "Maya Patel", status: "Absent" },
      { studentId: "stu-3", studentName: "Liam Smith", status: "Present" },
      { studentId: "stu-4", studentName: "Sofia Rodriguez", status: "Late" }
    ]
  },
  {
    id: "att-2",
    courseId: "cs-101",
    date: "2026-08-12",
    records: [
      { studentId: "stu-1", studentName: "Alex Chen", status: "Present" },
      { studentId: "stu-2", studentName: "Maya Patel", status: "Present" },
      { studentId: "stu-3", studentName: "Liam Smith", status: "Present" },
      { studentId: "stu-4", studentName: "Sofia Rodriguez", status: "Absent" }
    ]
  },
  {
    id: "att-3",
    courseId: "cs-204",
    date: "2026-08-13",
    records: [
      { studentId: "stu-1", studentName: "Alex Chen", status: "Present" },
      { studentId: "stu-3", studentName: "Liam Smith", status: "Present" }
    ]
  },
  {
    id: "att-4",
    courseId: "ds-301",
    date: "2026-08-13",
    records: [
      { studentId: "stu-1", studentName: "Alex Chen", status: "Late" },
      { studentId: "stu-2", studentName: "Maya Patel", status: "Absent" }
    ]
  }
];

export const INITIAL_EXAMS = [
  {
    id: "exam-1",
    courseId: "cs-101",
    courseCode: "CS 101",
    title: "Midterm Examination: Algorithms & Data Structures",
    date: "2026-09-15",
    time: "10:00 AM - 12:00 PM",
    durationMinutes: 120,
    totalMarks: 100,
    weightage: "30%",
    gradesRecorded: [
      { studentId: "stu-1", studentName: "Alex Chen", marks: 91, grade: "A" },
      { studentId: "stu-2", studentName: "Maya Patel", marks: 68, grade: "C+" },
      { studentId: "stu-3", studentName: "Liam Smith", marks: 95, grade: "A+" },
      { studentId: "stu-4", studentName: "Sofia Rodriguez", marks: 58, grade: "D" }
    ]
  },
  {
    id: "exam-2",
    courseId: "cs-204",
    courseCode: "CS 204",
    title: "Neural Networks & Backpropagation Quiz",
    date: "2026-08-30",
    time: "01:00 PM - 02:00 PM",
    durationMinutes: 60,
    totalMarks: 50,
    weightage: "15%",
    gradesRecorded: [
      { studentId: "stu-1", studentName: "Alex Chen", marks: 47, grade: "A" },
      { studentId: "stu-3", studentName: "Liam Smith", marks: 49, grade: "A+" }
    ]
  }
];

export const INTERACTIVE_QUIZ_QUESTIONS = [
  {
    id: "q1",
    course: "CS 101: Data Structures",
    question: "What is the worst-case time complexity of searching in an AVL Tree containing N elements?",
    options: [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)"
    ],
    correctAnswer: 1,
    explanation: "Because an AVL tree is strictly height-balanced (with height difference between subtrees <= 1), the tree height is bounded strictly by 1.44 * log2(N), guaranteeing O(log N) lookup time even in the worst case."
  },
  {
    id: "q2",
    course: "CS 204: Machine Learning",
    question: "Which mechanism in the Transformer architecture allows parallel processing of sequential token relationships?",
    options: [
      "Recurrent Feedback Loops",
      "Multi-Head Scaled Dot-Product Attention",
      "Hidden Markov Transition Matrix",
      "Max-Pooling Convolution"
    ],
    correctAnswer: 1,
    explanation: "Self-attention computes token-to-token similarity across the entire sequence matrix simultaneously without requiring sequential recurrent transitions."
  },
  {
    id: "q3",
    course: "MA 202: Linear Algebra",
    question: "If matrix A is symmetric and positive-definite, all its eigenvalues must be:",
    options: [
      "Negative real numbers",
      "Complex conjugates",
      "Strictly positive real numbers",
      "Equal to zero"
    ],
    correctAnswer: 2,
    explanation: "By the Spectral Theorem, real symmetric matrices have real eigenvalues, and positive-definiteness guarantees all eigenvalues λ > 0."
  },
  {
    id: "q4",
    course: "DS 301: Big Data Systems",
    question: "In Apache Spark, what differentiates a 'Transformation' from an 'Action'?",
    options: [
      "Transformations are executed immediately on worker nodes",
      "Transformations are lazy and build the DAG; actions trigger computation",
      "Actions cannot return values to the driver program",
      "Transformations only work on SQL tables"
    ],
    correctAnswer: 1,
    explanation: "Spark evaluates transformations lazily by constructing a Directed Acyclic Graph (DAG). Computation is only triggered when an action (like collect(), count(), save()) is called."
  }
];

export const AI_ACADEMIC_INSIGHTS = {
  alexChen: {
    studentId: "stu-1",
    overallMastery: 92,
    strengths: [
      { subject: "Data Structures", score: 95, tag: "Mastered" },
      { subject: "Machine Learning", score: 91, tag: "Strong" },
      { subject: "Big Data Systems", score: 92, tag: "Strong" }
    ],
    weakAreas: [
      {
        subject: "Linear Algebra & Optimization",
        topic: "Eigenvector Decompositions & SVD",
        score: 72,
        riskLevel: "Moderate",
        recommendation: "Focus on orthogonal projections and review Gram-Schmidt decomposition problem sets."
      }
    ],
    studyPlan: [
      { day: "Monday", task: "Review SVD low-rank matrix approximation lecture 5" },
      { day: "Wednesday", task: "Solve 5 practice problems on Spectral Theorem" },
      { day: "Friday", task: "Complete Transformer Attention Visualization assignment" }
    ],
    aiStudyTips: [
      "Optimal retention window: 45 min focus blocks with 10 min active recall intervals.",
      "Your algorithm benchmark code is top tier—consider publishing the AVL benchmark to GitHub as an academic showcase.",
      "Upcoming MA 202 midterm weight is 30%—prioritize the linear transformations quiz."
    ]
  },
  campusMetrics: {
    totalStudents: 1240,
    totalTeachers: 86,
    activeCourses: 48,
    averageCampusGPA: 8.42,
    averageAttendance: 91.2,
    atRiskStudentsCount: 18,
    departmentPerformance: [
      { name: "Computer Science & AI", avgGPA: 8.85, attendance: 92.4, studentCount: 420 },
      { name: "Data Science & Analytics", avgGPA: 8.60, attendance: 90.1, studentCount: 310 },
      { name: "Cyber Security & Networks", avgGPA: 8.20, attendance: 88.6, studentCount: 260 },
      { name: "Mathematics & Physics", avgGPA: 8.45, attendance: 93.8, studentCount: 250 }
    ]
  }
};

export const ANNOUNCEMENTS = [
  {
    id: "ann-1",
    title: "Fall Semester 2026 Midterm Examination Schedules Published",
    date: "2026-08-15",
    category: "Examination",
    author: "Office of the Registrar",
    content: "The centralized midterm examination timetable for all undergraduate and graduate programs has been released. Please verify your hall ticket numbers and review venue allocations."
  },
  {
    id: "ann-2",
    title: "AI Research Symposium & Hackathon Call for Submissions",
    date: "2026-08-12",
    category: "Academic Event",
    author: "Dept. of Computer Science & AI",
    content: "Submissions are open for student poster presentations in Deep Learning, Edge AI, and Quantum Computing. Industry prize pool of $15,000."
  },
  {
    id: "ann-3",
    title: "Library Extended Hours for Midterm Preparation",
    date: "2026-08-10",
    category: "Campus Life",
    author: "University Library",
    content: "The Central Library reading halls and AI collaborative workstations will remain accessible 24/7 with faculty tutoring assistance starting next Monday."
  }
];

export const FAQS = [
  {
    question: "How does the AI Academic Intelligence system detect at-risk students?",
    answer: "Our proprietary AI engine continuously aggregates three key dimensions: attendance trends (flagging drops below 75%), assignment scoring trajectories (identifying steep declines > 15%), and conceptual quiz performance. It alerts teachers and academic advisors early with personalized recovery roadmaps."
  },
  {
    question: "Can teachers edit AI-generated grading feedback?",
    answer: "Yes! The AI Grading Assistant generates rubric suggestions, highlighted code weaknesses, and constructive notes as a draft. Faculty members have complete authority to modify scores and commentary before publishing grades."
  },
  {
    question: "How do course enrollments and prerequisites work?",
    answer: "Students can browse the Courses directory, inspect syllabus breakdowns, and click 'Enroll Now'. If prerequisites are met, the course is instantly attached to their dashboard schedule and grade book."
  },
  {
    question: "How can I export official academic transcripts and performance reports?",
    answer: "Students, teachers, and administrators can click 'Generate Academic Report' on any student profile to produce a standardized, watermarked, institutional performance report with printable layout."
  }
];
