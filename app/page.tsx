"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Github,
  Linkedin,
  FileText,
  Mail,
  ExternalLink,
  Home,
  User,
  Code,
  GraduationCap,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Quote,
  HandHeart,
  FolderKanban,
} from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [isProjectAnimating, setIsProjectAnimating] = useState(false)
  const [isSkillAnimating, setIsSkillAnimating] = useState(false)
  const [isTestimonialAnimating, setIsTestimonialAnimating] = useState(false)
  const [projectDirection, setProjectDirection] = useState<"left" | "right">("right")
  const [skillDirection, setSkillDirection] = useState<"left" | "right">("right")
  const [testimonialDirection, setTestimonialDirection] = useState<"left" | "right">("right")
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "education", "projects", "experience", "skills", "testimonials", "contact"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
      document.documentElement.classList.remove("light")
    } else {
      document.documentElement.classList.add("light")
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const projects = [
    {
      title: "LinuxShell",
      description:
        "A custom Linux shell for managing encrypted email credentials and files using XOR-based encryption. Built on principles of process creation, inter-process communication using pipes, and multithreading to enable concurrent tasks like password retrieval, decryption, and automated input.",
      stack: ["Linux", "C", "Multithreading", "Processes management", "Operating Systems", "Semaphores"],
      github: "https://github.com/osamamadi/LinuxShell",
      demo: "",
    },
    {
      title: "BLIB - Library Management System",
      description:
        "A full-stack library system built in Java as part of a semester project. Students can search, borrow, order, and return books while receiving real-time notifications. The system also generates monthly librarian reports summarizing book and user activities.",
      stack: ["Java", "MySQL", "FXML", "OCSF", "GitHub", "BCNF", "Singleton Pattern"],
      github: "https://github.com/osamamadi/BLIB.git",
      demo: "",
    },
    {
      title: "MicroLearn",
      description:
        "A full-stack platform built with my teammates Wadiea Farran, Helal Ali, Safa Awad, Nuwar Dabbah and Bader Boshnak. MicroLearn helps students learn faster by watching short videos and taking quizzes. It supports missed-lecture catch-ups and revision before exams. We added a badge and level-up system to make it fun and motivating. Big thanks to our lecturer Naomi Unkelos-Shpigel PhD for her support.",
      stack: [
        "Next.js",
        "Node.js",
        "MongoDB Atlas",
        "NoSQL",
        "JSON",
        "YouTube API",
        "Gemini API",
        "HTML5",
        "CSS",
        "Tailwind CSS",
        "JavaScript",
        "Vercel",
      ],
      github: "https://github.com/osamamadi/MicroLearn",
      demo: "https://micro-learn-67et.vercel.app/",
    },
    {
      title: "Notification Guardian",
      description:
        "Built during a hackathon, an AI-powered system detects phishing and fraudulent notifications in real time. It analyses suspicious links, messages and notifications and warns users before harm. Beyond detection it includes a learning mode that teaches users to recognise and avoid phishing attempts independently. Built under pressure with my teammates Wadiea Farran, Qassem Nassar and Ibrahim Asad; our team ranked among the top 6 out of 36.",
      stack: ["Kotlin", "Android SDK", "Next.js", "Express.js", "Python", "Google Gemini API", "VirusTotal API"],
      github: "https://github.com/osamamadi/NoticationGuardian",
      demo: "",
    },
  ]

  const skillGroups = [
    {
      category: "Programming Languages",
      skills: ["C", "C#", "Python", "Java", "JavaScript", "Kotlin", "Assembly", "SQL", "HTML", "CSS"],
    },
    {
      category: "Frameworks & Libraries",
      skills: ["React", "Preact", "Next.js", "Express.js", "Node.js", "Tailwind CSS", "JavaFX"],
    },
    {
      category: "Tools & Technologies",
      skills: [
        "Git",
        "GitHub",
        "Visual Studio",
        "Visual Studio Code",
        "Eclipse",
        "Android SDK",
        "Vercel",
        "Visual Paradigm",
      ],
    },
    {
      category: "Databases & Cloud",
      skills: ["MySQL", "MongoDB Atlas", "NoSQL", "Firebase", "JSON"],
    },
    {
      category: "Concepts & Methodologies",
      skills: ["UML", "OOP", "Data Structures", "Algorithms", "REST APIs", "Multithreading", "Operating Systems"],
    },
  ]

  const testimonials = [
    {
      text: "Osama is a fluent communicator with strong leadership and teamwork skills, showing excellence in presentations and class participation. He is known for his professionalism, motivation, and reliability in every task.",
      author: "Jeries Eady",
      role: "Senior Lecturer – English Studies Unit, Braude College of Engineering",
      hasPdf: true,
      pdfPath: "/recommendation-jeries-eady.pdf",
    },
  ]

  const nextProject = () => {
    if (isProjectAnimating) return
    setProjectDirection("right")
    setIsProjectAnimating(true)
    setTimeout(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % projects.length)
      setIsProjectAnimating(false)
    }, 300)
  }

  const prevProject = () => {
    if (isProjectAnimating) return
    setProjectDirection("left")
    setIsProjectAnimating(true)
    setTimeout(() => {
      setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)
      setIsProjectAnimating(false)
    }, 300)
  }

  const nextSkill = () => {
    if (isSkillAnimating) return
    setSkillDirection("right")
    setIsSkillAnimating(true)
    setTimeout(() => {
      setCurrentSkillIndex((prev) => (prev + 1) % skillGroups.length)
      setIsSkillAnimating(false)
    }, 300)
  }

  const prevSkill = () => {
    if (isSkillAnimating) return
    setSkillDirection("left")
    setIsSkillAnimating(true)
    setTimeout(() => {
      setCurrentSkillIndex((prev) => (prev - 1 + skillGroups.length) % skillGroups.length)
      setIsSkillAnimating(false)
    }, 300)
  }

  const nextTestimonial = () => {
    if (isTestimonialAnimating) return
    setTestimonialDirection("right")
    setIsTestimonialAnimating(true)
    setTimeout(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length)
      setIsTestimonialAnimating(false)
    }, 300)
  }

  const prevTestimonial = () => {
    if (isTestimonialAnimating) return
    setTestimonialDirection("left")
    setIsTestimonialAnimating(true)
    setTimeout(() => {
      setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
      setIsTestimonialAnimating(false)
    }, 300)
  }

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "education", icon: GraduationCap, label: "Education" },
    { id: "projects", icon: FolderKanban, label: "Projects" },
    { id: "experience", icon: HandHeart, label: "Experience & Volunteering" },
    { id: "skills", icon: Code, label: "Skills" },
    { id: "testimonials", icon: Quote, label: "Testimonials" },
    { id: "contact", icon: MessageSquare, label: "Contact" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <nav
        ref={navRef}
        className="fixed left-0 top-0 z-50 flex h-screen w-20 flex-col items-center gap-4 border-r border-border/40 bg-background/95 py-8 backdrop-blur-lg transition-colors duration-500"
      >
        <div className="flex flex-1 flex-col items-center gap-4">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            const isFirst = index === 0

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                  isFirst && isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                    : isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                } group`}
                aria-label={item.label}
              >
                <Icon className="h-5 w-5" />
                <span className="absolute left-full ml-4 whitespace-nowrap rounded-md bg-popover px-3 py-1.5 text-sm font-medium text-popover-foreground shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:bg-accent/50 hover:text-foreground group"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="absolute left-full ml-4 whitespace-nowrap rounded-md bg-popover px-3 py-1.5 text-sm font-medium text-popover-foreground shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
        </button>
      </nav>

      <div className="ml-20">
        {/* Hero Section */}
        <section id="home" className="container mx-auto px-6 py-32 md:py-48">
          <div className="flex flex-col items-center text-center">
            <div className="animate-fade-in-up mb-8">
              <img
                src="/osama.jpeg"
                alt="Osama Madi - Software Engineering Student"
                className="h-60 w-60 rounded-full border-4 border-border object-cover"
              />
            </div>
            <h1 className="animate-fade-in-up mb-4 text-balance text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Osama Madi
            </h1>
            <p className="animate-fade-in-up mb-12 text-balance text-xl text-muted-foreground md:text-2xl">
              Software Engineering Student
            </p>
            <div className="animate-fade-in-up flex gap-6">
              <Button size="lg" variant="outline" className="h-14 w-14 rounded-full p-0 bg-transparent" asChild>
                <a
                  href="https://www.linkedin.com/in/osama-madi-10b490295/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-14 w-14 rounded-full p-0 bg-transparent" asChild>
                <a href="https://github.com/osamamadi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-6 w-6" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-14 w-14 rounded-full p-0 bg-transparent" asChild>
                <a href="/CV Osama Madi.pdf" download aria-label="Download CV">
                  <FileText className="h-6 w-6" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="container mx-auto px-6 py-24">
          <h2 className="mb-12 text-balance text-4xl font-bold tracking-tight md:text-5xl">About Me</h2>
          <div className="mx-auto max-w-3xl">
            <div className="space-y-6 text-xl leading-relaxed text-muted-foreground">
              <p>
                Motivated software engineering student with a passion for problem-solving and coding, maintaining a GPA
                of 87 and a strong sense of discipline.
              </p>
              <p>
                My commitment to excellence extends beyond the classroom; I successfully combine my demanding studies
                with a non-technical role at Office Depot. This experience strengthened my time management,
                responsibility, and ability to work well under pressure — all critical for a high-performance
                development environment.
              </p>
              <p>
                Actively seeking a part-time Junior/Intern Software Engineer role to apply my skills and work ethic. I
                enjoy exploring new technologies, contributing to open source, and sharing knowledge, with a goal to
                build impactful software solutions.
              </p>
            </div>
          </div>
        </section>

        <section id="education" className="container mx-auto px-6 py-24">
          <h2 className="mb-12 text-balance text-4xl font-bold tracking-tight md:text-5xl">Education</h2>
          <div className="mx-auto max-w-3xl space-y-12">
            <div className="relative timeline-border pl-8">
              <div className="absolute -left-2 top-0 h-4 w-4 rounded-full timeline-dot" />
              <div className="mb-2 text-lg text-muted-foreground">2023 - Present</div>
              <h3 className="mb-1 text-2xl font-semibold">B.Sc in Software Engineering</h3>
              <div className="flex justify-between font-semibold text-lg text-muted-foreground mb-3">
                <span>Braude College of Engineering</span>
                <span>Expected Graduation: June 2027</span>
              </div>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                Software engineering studies focused on modern development, AI, and full-stack web development. Skilled in JavaScript, React, Node.js, Express, MongoDB, MySQL, Python, and Java, with strong understanding of algorithms, databases, and software design principles. Always eager to contribute and made the{" "}
                <strong>Dean's List</strong> in my third year of studies. Some of my projects might surprise you — take a look
                below.
              </p>
            </div>
            <div className="relative timeline-border pl-8">
              <div className="absolute -left-2 top-0 h-4 w-4 rounded-full timeline-dot" />
              <div className="mb-2 text-lg text-muted-foreground">2019 - 2021</div>
              <h3 className="mb-1 text-2xl font-semibold">Bagrut in Computer Science</h3>
              <div className="flex justify-between font-semibold text-lg text-muted-foreground mb-3">
                <span>Ort Hilmi High School</span>
              </div>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                I began my coding journey at age 16, specializing in the top-level 5-unit Computer Science track at ORT
                Hilmi Shafie High School in Akko. This intensive pursuit, fueled by countless nights of dedicated
                programming, resulted in a Bagrut (High School Diploma) with a <strong>final grade of 97</strong>.<br />
                This specialization provided me with strong expertise in C#, foundational principles of Object-Oriented
                Programming (OOP), and a deep understanding of core data structures and algorithms, including Trees,
                Queues, and Stacks.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full py-24">
          <div className="container mx-auto px-6">
            <h2 className="mb-12 text-balance text-4xl font-bold tracking-tight md:text-5xl">Projects</h2>
          </div>

          <div className="relative min-h-[500px]">
            <div className="container mx-auto px-6">
              <Card
                className={`group mx-auto max-w-4xl border-0 bg-transparent shadow-none transition-all ${
                  isProjectAnimating
                    ? projectDirection === "right"
                      ? "animate-slide-out-left"
                      : "animate-slide-out-right"
                    : "animate-slide-in"
                }`}
              >
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <CardTitle className="text-balance text-3xl">{projects[currentProjectIndex].title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{currentProjectIndex + 1}</span>
                      <span>/</span>
                      <span>{projects.length}</span>
                    </div>
                  </div>
                  <CardDescription className="text-pretty text-base leading-relaxed">
                    {projects[currentProjectIndex].description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {projects[currentProjectIndex].stack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {projects[currentProjectIndex].github && (
                      <Button variant="outline" size="lg" asChild>
                        <a href={projects[currentProjectIndex].github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-5 w-5" />
                          View Code
                        </a>
                      </Button>
                    )}
                    {projects[currentProjectIndex].demo && (
                      <Button variant="outline" size="lg" asChild>
                        <a href={projects[currentProjectIndex].demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-5 w-5" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <button
              onClick={prevProject}
              disabled={isProjectAnimating}
              className="fixed-carousel-arrow fixed-carousel-arrow-left"
              aria-label="Previous project"
              style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", zIndex: 20 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextProject}
              disabled={isProjectAnimating}
              className="fixed-carousel-arrow fixed-carousel-arrow-right"
              aria-label="Next project"
              style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", zIndex: 20 }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="mt-8 flex justify-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isProjectAnimating) {
                      setProjectDirection(index > currentProjectIndex ? "right" : "left")
                      setIsProjectAnimating(true)
                      setTimeout(() => {
                        setCurrentProjectIndex(index)
                        setIsProjectAnimating(false)
                      }, 300)
                    }
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentProjectIndex ? "w-8 bg-foreground" : "w-2 bg-muted-foreground/40"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="container mx-auto px-6 py-24">
          <h2 className="mb-12 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Experience and Volunteering
          </h2>
          <div className="mx-auto max-w-3xl space-y-12">
            <div className="relative timeline-border pl-8">
              <div className="absolute -left-2 top-0 h-4 w-4 rounded-full timeline-dot" />
              <div className="mb-2 text-lg text-muted-foreground">2023 - Present</div>
              <div className="mb-1 flex items-center gap-2">
                <h3 className="text-2xl font-semibold">Perach Tutor</h3>
                <span className="px-2 py-0.5 text-xs rounded-md border bg-neutral-100 text-neutral-800 border-neutral-300 dark:bg-white/10 dark:text-white dark:border-white/20">
                  Volunteering
                </span>
              </div>
              <div className="mb-3 font-medium text-lg text-muted-foreground">Al-Manara School, Acre</div>
              <p className="text-pretty leading-relaxed text-muted-foreground mb-3">
                Educational and personal tutor for elementary students, providing academic support and mentorship to
                help young students excel in their studies and personal development.
              </p>
            </div>

            <div className="relative timeline-border pl-8">
              <div className="absolute -left-2 top-0 h-4 w-4 rounded-full timeline-dot" />
              <div className="mb-2 text-lg text-muted-foreground">2024 - Present</div>
              <div className="mb-1 flex items-center gap-2">
                <h3 className="text-2xl font-semibold">Academic Mentor</h3>
                <span className="px-2 py-0.5 text-xs rounded-md border bg-neutral-100 text-neutral-800 border-neutral-300 dark:bg-white/10 dark:text-white dark:border-white/20">
                  Work
                </span>
              </div>
              <div className="mb-3 font-medium text-lg text-muted-foreground">
                Academic Mentoring Program, Braude College
              </div>
              <p className="text-pretty leading-relaxed text-muted-foreground mb-3">
                Mentor for first-year students, providing homework assistance and academic support to help new students
                navigate their academic journey and succeed in their software engineering studies.
              </p>
            </div>

            <div className="relative timeline-border pl-8">
              <div className="absolute -left-2 top-0 h-4 w-4 rounded-full timeline-dot" />
              <div className="mb-2 text-lg text-muted-foreground">Nov 2025 - Present</div>
              <div className="mb-1 flex items-center gap-2">
                <h3 className="text-2xl font-semibold">
                  Teaching Assistant – Operating Systems and OOP
                </h3>
                <span className="px-2 py-0.5 text-xs rounded-md border bg-neutral-100 text-neutral-800 border-neutral-300 dark:bg-white/10 dark:text-white dark:border-white/20">
                  Work
                </span>
              </div>
              <div className="mb-3 font-medium text-lg text-muted-foreground">Braude College of Engineering</div>
              <p className="text-pretty leading-relaxed text-muted-foreground mb-3">
                Assisting in academic workshops for undergraduate courses in Operating Systems and Object-Oriented
                Programming. Responsible for guiding students through lab exercises, explaining core concepts, debugging
                code, and supporting project development throughout the semester.
              </p>
            </div>
          </div>
        </section>

        <section id="skills" className="w-full py-24">
          <div className="container mx-auto px-6">
            <h2 className="mb-12 text-balance text-4xl font-bold tracking-tight md:text-5xl">Skills</h2>
          </div>

          <div className="relative min-h-[300px]">
            <div className="container mx-auto px-6">
              <Card
                className={`mx-auto max-w-4xl border-0 bg-transparent shadow-none transition-all ${
                  isSkillAnimating
                    ? skillDirection === "right"
                      ? "animate-slide-out-left"
                      : "animate-slide-out-right"
                    : "animate-slide-in"
                }`}
              >
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <CardTitle className="text-balance text-3xl">{skillGroups[currentSkillIndex].category}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{currentSkillIndex + 1}</span>
                      <span>/</span>
                      <span>{skillGroups.length}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {skillGroups[currentSkillIndex].skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="px-4 py-2 text-base">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <button
              onClick={prevSkill}
              disabled={isSkillAnimating}
              className="fixed-carousel-arrow fixed-carousel-arrow-left"
              aria-label="Previous skill category"
              style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", zIndex: 20 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSkill}
              disabled={isSkillAnimating}
              className="fixed-carousel-arrow fixed-carousel-arrow-right"
              aria-label="Next skill category"
              style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", zIndex: 20 }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="mt-8 flex justify-center gap-2">
              {skillGroups.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isSkillAnimating) {
                      setSkillDirection(index > currentSkillIndex ? "right" : "left")
                      setIsSkillAnimating(true)
                      setTimeout(() => {
                        setCurrentSkillIndex(index)
                        setIsSkillAnimating(false)
                      }, 300)
                    }
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSkillIndex ? "w-8 bg-foreground" : "w-2 bg-muted-foreground/40"
                  }`}
                  aria-label={`Go to skill category ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-24">
          <div className="container mx-auto px-6">
            <h2 className="mb-12 text-balance text-4xl font-bold tracking-tight md:text-5xl">
              What People Experience When Working With Me
            </h2>
          </div>

          <div className="relative min-h-[400px]">
            <div className="container mx-auto px-6">
              <Card
                className={`mx-auto max-w-4xl border-0 bg-transparent shadow-none transition-all ${
                  isTestimonialAnimating
                    ? testimonialDirection === "right"
                      ? "animate-slide-out-left"
                      : "animate-slide-out-right"
                    : "animate-slide-in"
                }`}
              >
                <CardContent className="pt-12 pb-12">
                  <Quote className="mb-6 h-12 w-12 text-muted-foreground/40" />
                  <blockquote className="mb-8 text-pretty text-2xl font-medium leading-relaxed">
                    {testimonials[currentTestimonialIndex].text}
                  </blockquote>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-full bg-accent" />
                    <div>
                      <div className="font-semibold">{testimonials[currentTestimonialIndex].author}</div>
                      <div className="text-sm text-muted-foreground">{testimonials[currentTestimonialIndex].role}</div>
                    </div>
                  </div>
                  {testimonials[currentTestimonialIndex].hasPdf && (
                    <Button variant="outline" size="lg" asChild className="mt-4 bg-transparent">
                      <a href="/Jeries Rec Letter.pdf" download>
                        <FileText className="mr-2 h-5 w-5" />
                        Download Full Recommendation Letter
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            <button
              onClick={prevTestimonial}
              disabled={isTestimonialAnimating}
              className="fixed-carousel-arrow fixed-carousel-arrow-left"
              aria-label="Previous testimonial"
              style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", zIndex: 20 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextTestimonial}
              disabled={isTestimonialAnimating}
              className="fixed-carousel-arrow fixed-carousel-arrow-right"
              aria-label="Next testimonial"
              style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", zIndex: 20 }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isTestimonialAnimating) {
                      setTestimonialDirection(index > currentTestimonialIndex ? "right" : "left")
                      setIsTestimonialAnimating(true)
                      setTimeout(() => {
                        setCurrentTestimonialIndex(index)
                        setIsTestimonialAnimating(false)
                      }, 300)
                    }
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentTestimonialIndex ? "w-8 bg-foreground" : "w-2 bg-muted-foreground/40"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container mx-auto px-6 py-24">
          <h2 className="mb-12 text-balance text-4xl font-bold tracking-tight md:text-5xl">Get In Touch</h2>
          <div className="mx-auto max-w-2xl">
            <p className="mb-12 text-pretty text-lg leading-relaxed text-muted-foreground">
              Have a project in mind or just want to chat? Feel free to reach out email directly at{" "}
              <a href="mailto:osamamadi43@gmail.com" className="text-foreground underline">
                osamamadi43@gmail.com
              </a>
            </p>
          </div>
        </section>
        {/* Footer */}
        <footer className="border-t border-border/40 py-12">
          <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Osama Madi. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
