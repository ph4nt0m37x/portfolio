
import { useEffect, useRef, useState } from "react";
import "./App.css";

type Project = {
  number: string;
  name: string;
  description: string;
  stack: string[];
  status: string;
  image: string;
  href?: string;
};

const projects: Project[] = [
  {
    number: "01",
    name: "Distributed Library Management System",
    description:
        "A distributed information system built on microservices, CQRS, and event-driven communication, coordinating catalog, inventory, membership, and borrowing operations.",
    stack: ["Kotlin", "Spring Boot", "Axon", "Kafka", "Docker"],
    status: "completed",
    image: "/projects/library-system.png",
    href: "https://github.com/ph4nt0m37x/library-system",
  },
  {
    number: "02",
    name: "Geospatial Route Optimization System",
    description:
        "An alternative navigation platform exploring graph-based route optimization to prioritize smoother driving experiences over conventional shortest-path routing.",
    stack: ["Flutter", "Python", "OSM", "OSRM", "NetworkX"],
    status: "completed",
    image: "/projects/better-roads.png",
    href: "https://github.com/ph4nt0m37x/betterroads",
  },
  {
    number: "03",
    name: "Minecraft Language Editor",
    description:
        "A browser-based localization tool featuring structured language-file editing, inline text styling, and real-time translation previews.",
    stack: ["React", "TypeScript", "Vite"],
    status: "completed",
    image: "/projects/minecraft-lang-builder.png",
    href: "https://ph4nt0m37x.github.io/minecraft-lang-editor/",
  },
  {
    number: "04",
    name: "Job Fair 2026 - Web Development & Technical Lead",
    description:
        "Led a team of five responsible for maintaining and updating the Job Fair 2026 website. Coordinated development tasks, organized team contributions, and oversaw ongoing platform improvements to keep the website functional, accurate, and up to date throughout the event cycle.",
    stack: ["Angular", "Spring Boot", "MySQL"],
    status: "complete",
    image: "/projects/jobfair.png",
    href: "https://vjobfair.org.mk/",
  },
  {
    number: "05",
    name: "Web & Mobile Event Discovery Platform (Blok34)",
    description:
        "A community-focused event discovery platform built with ASP.NET Core and Onion Architecture, later expanded into a cross-platform Flutter application with Firebase authentication, cloud data management, and weather forecasts via Open-Meteo.",
    stack: ["Flutter", "Dart", "ASP.NET Core", "Firebase", "Azure", "Open-Meteo"],
    status: "completed",
    image: "/projects/blok344.jpg",
    href: "https://github.com/ph4nt0m37x/blok34_mobile",
  },
  {
    number: "06",
    name: "3D Narrative Survival Game (Плави Воз)",
    description:
        "A 3D, story-driven survival game developed in Godot using GDScript, combining narrative design, environmental storytelling, and survival gameplay. Set in a fictional winter apocalypse inspired by 1970s Yugoslavia, the game follows a lone survivor navigating an isolated, frozen world.",
    stack: ["Godot", "GDScript", "3D Game Development", "Blender"],
    status: "paused",
    image: "/projects/plavi-voz.png",
    href: "https://github.com/ph4nt0m37x/Plavi-Voz",
  },
  {
    number: "07",
    name: "Academic Mentorship & Networking Platform (Mост)",
    description:
        "A full-stack web application built with Django and Bootstrap, implementing a structured platform for academic networking, mentorship, and opportunity discovery. Combines server-side application logic, data management, and a responsive user interface to support collaboration between students, mentors, and professionals.",
    stack: ["Python", "Django", "Bootstrap"],
    status: "completed",
    image: "/projects/most.png",
    href: "https://github.com/ph4nt0m37x/most",
  },
  {
    number: "08",
    name: "Financial Market Analysis & Visualization Platform",
    description:
        "A containerized financial data analysis platform built with Flask, featuring automated stock market data scraping with Beautiful Soup, data processing with pandas, and SQLite-based storage. Includes interactive Plotly visualizations and technical analysis tools, with a responsive Bootstrap interface and Docker-based deployment.",
    stack: ["Python", "Flask", "pandas", "Beautiful Soup", "SQLite", "Plotly", "Bootstrap", "Docker"],
    status: "completed",
    image: "/projects/mse.png",
    href: "https://github.com/ph4nt0m37x/MSE-Web-App",
  },
  {
    number: "09",
    name: "Cloud-Native Application & CI/CD Pipeline",
    description:
        "A full-stack notes application built with Flask and React, designed to demonstrate an end-to-end DevOps workflow. Containerized with Docker and deployed on Kubernetes, with GitHub Actions automating build and deployment pipelines and Argo CD enabling GitOps-based continuous delivery.",
    stack: ["Python", "Flask", "React", "Docker", "Kubernetes", "GitHub Actions", "Argo CD"],
    status: "completed",
    image: "/projects/notes-app.png",
    href: "https://github.com/ph4nt0m37x/notes-app",
  },
  // {
  //   number: "10",
  //   name: "?",
  //   description:
  //       "A proposed monitoring platform for tracing service interactions, analyzing event flows, and investigating failure propagation across distributed applications.",
  //   stack: ["Docker", "Kafka", "OpenTelemetry", "Grafana"],
  //   status: "concept",
  //   image: "/projects/observability.png",
  // },
];

const carouselProjects = [...projects, ...projects];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    const updateScreenSize = () => setIsMobile(mediaQuery.matches);

    updateScreenSize();
    mediaQuery.addEventListener("change", updateScreenSize);

    return () =>
        mediaQuery.removeEventListener("change", updateScreenSize);
  }, []);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => current + 1);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [paused]);

  const nextProject = () => {
    setActiveIndex((current) => current + 1);
  };

  const previousProject = () => {
    setActiveIndex((current) =>
        current === 0 ? projects.length - 1 : current - 1
    );
  };

  const handleTransitionEnd = () => {
    if (activeIndex < projects.length) return;

    setTransitionEnabled(false);
    setActiveIndex(0);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    });
  };

  const currentProject = projects[activeIndex % projects.length];

  return (
      <main className="site-shell" id="home">
        <header className="topbar">
          <a className="wordmark" href="#home" aria-label="Home">
            m<span>.</span>
          </a>

          <nav aria-label="Main navigation">
            <a href="#work">work</a>
            <a href="https://www.github.com/ph4nt0m37x">github↗</a>
            <a href="https://www.linkedin.com/in/marija-ilievskax/">linkedin↗</a>
            <a href="#contact">contact</a>
          </nav>

          <span className="topbar-note">portfolio / 2026</span>
        </header>

        <section className="hero" id="about">
          <h2 className="hero-name">Marija Ilievska</h2>

          <p className="eyebrow">
            SOFTWARE ENGINEERING · NORTH MACEDONIA
          </p>

          <h5 className="hero-heading">
            software, systems &amp; other things.
          </h5>

          <div className="hero-bottom">
            <p>
              Software engineering student interested in the less conventional side of software, from distributed architectures and algorithms to scientific computing and experimental projects. Tends to explore whatever happens to catch her interest.
            </p>
          </div>
        </section>

        <section className="work section" id="work">
          <div className="section-heading">
            <div>
              <h2>
                Selected work<span className="period">.</span>
              </h2>
              <span className="eyebrow">PROJECTS &amp; CONTRIBUTIONS</span>
            </div>

            <span className="section-count">9 PROJECTS</span>
          </div>

          <div
              className="carousel"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={(event) => {
                if (
                    !event.currentTarget.contains(
                        event.relatedTarget as Node | null
                    )
                ) {
                  setPaused(false);
                }
              }}
              onTouchStart={(event) => {
                touchStartX.current = event.touches[0].clientX;
                setPaused(true);
              }}
              onTouchEnd={(event) => {
                if (touchStartX.current !== null) {
                  const distance =
                      event.changedTouches[0].clientX - touchStartX.current;

                  if (Math.abs(distance) > 50) {
                    distance > 0 ? previousProject() : nextProject();
                  }
                }

                touchStartX.current = null;
                setPaused(false);
              }}
          >
            <button
                className="carousel-arrow carousel-arrow-left"
                type="button"
                onClick={previousProject}
                aria-label="Previous project"
            >
              ←
            </button>

            <div className="carousel-window">
              <div
                  className="carousel-track"
                  style={{
                    transform: `translateX(-${
                        activeIndex * (isMobile ? 100 : 50)
                    }%)`,
                    transition: transitionEnabled
                        ? "transform 850ms cubic-bezier(0.22, 1, 0.36, 1)"
                        : "none",
                  }}
                  onTransitionEnd={handleTransitionEnd}
              >
                {carouselProjects.map((project, index) => (
                    <article className="carousel-card" key={`${project.number}-${index}`}>
                      <div className="project-image">
                    <span className="image-placeholder">
                      {project.number} / SELECTED WORK
                    </span>

                        <img
                            src={project.image}
                            alt={`${project.name} preview`}
                            loading={index < 2 ? "eager" : "lazy"}
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                        />
                      </div>

                      <div className="project-meta">
                        <span>{project.number}</span>
                        <span className="project-status">
                      <span className="status-dot" />
                          {project.status}
                    </span>
                      </div>

                      <h3 className="carousel-title">{project.name}</h3>

                      <div className="carousel-stack">
                        {project.stack.join(" · ")}
                      </div>

                      <p className="carousel-description">
                        {project.description}
                      </p>

                      {project.href && (
                          <a
                              className="project-link"
                              href={project.href}
                              target="_blank"
                              rel="noreferrer"
                          >
                            view project ↗
                          </a>
                      )}
                    </article>
                ))}
              </div>
            </div>

            <button
                className="carousel-arrow carousel-arrow-right"
                type="button"
                onClick={nextProject}
                aria-label="Next project"
            >
              →
            </button>
          </div>

          <div className="carousel-bottom">
          <span className="carousel-counter" aria-live="off">
            {currentProject.number}
            <span> / {String(projects.length).padStart(2, "0")}</span>
          </span>

            <div className="carousel-progress" aria-hidden="true">
            <span
                style={{
                  width: `${((activeIndex % projects.length) + 1) / projects.length * 100}%`,
                }}
            />
            </div>

            <span className="carousel-note">
            {paused ? "PAUSED" : "AUTO"}
          </span>
          </div>
        </section>


        <div className="intro-contact" id="contact">
          <a href="mailto:ilievskamarija@proton.me">
            Contact for inquiries @ ilievskamarija@proton.me
          </a>
        </div>

        <footer className="footer">
          <a className="wordmark" href="#home" aria-label="Back to home">
            m<span>.</span>
          </a>

          <span>© 2026 · designed &amp; developed by me</span>

          <div className="footer-links">
            <a
                href="https://github.com/ph4nt0m37x"
                target="_blank"
                rel="noreferrer"
            >
              github ↗
            </a>
            <a href="#home">back to top ↑</a>
          </div>
        </footer>
      </main>
  );
}

export default App;
