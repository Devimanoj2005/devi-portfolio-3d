import { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin, ExternalLink, Download, ChevronDown, Code2, Zap, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EnhancedThreeDBackground from '@/components/EnhancedThreeDBackground';
import './Home.css';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState<'hero' | 'skills' | 'projects' | 'default'>('hero');
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Determine active section
      if (heroRef.current && window.scrollY < heroRef.current.offsetHeight) {
        setActiveSection('hero');
      } else if (skillsRef.current && window.scrollY < skillsRef.current.offsetTop + skillsRef.current.offsetHeight) {
        setActiveSection('skills');
      } else if (projectsRef.current && window.scrollY < projectsRef.current.offsetTop + projectsRef.current.offsetHeight) {
        setActiveSection('projects');
      } else {
        setActiveSection('default');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Enhanced 3D Background */}
      <EnhancedThreeDBackground scrollY={scrollY} section={activeSection} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/60 border-b border-cyan-500/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-magenta-400 to-lime-400 bg-clip-text text-transparent animate-pulse-slow">
            Devi Manoj
          </div>
          <div className="hidden md:flex gap-8">
            {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium hover:text-cyan-400 transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-magenta-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-magenta-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-lime-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="space-y-2">
              <p className="text-cyan-400 text-sm font-mono tracking-widest animate-slide-in">FULL STACK DEVELOPER</p>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-magenta-400 to-lime-400 bg-clip-text text-transparent animate-gradient-shift">
                  Devi Manoj
                </span>
              </h1>
              <p className="text-xl text-slate-300 animate-slide-in" style={{ animationDelay: '0.2s' }}>
                Building innovative digital experiences with React, Next.js & modern web technologies
              </p>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-lg animate-slide-in" style={{ animationDelay: '0.4s' }}>
              B.Tech Computer Science student at SJCET Palai. Passionate about creating elegant solutions to complex problems. 
              Experienced in full-stack development, UI/UX design, and emerging technologies.
            </p>

            <div className="flex gap-4 pt-4 animate-slide-in" style={{ animationDelay: '0.6s' }}>
              <Button 
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-cyan-500 to-magenta-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
              >
                View My Work
              </Button>
              <Button 
                variant="outline" 
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4 animate-slide-in" style={{ animationDelay: '0.8s' }}>
              {[
                { icon: Github, href: 'https://github.com', color: 'cyan' },
                { icon: Linkedin, href: 'https://linkedin.com', color: 'magenta' },
                { icon: Mail, href: 'mailto:2005devimanoj@email.com', color: 'lime' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-lg bg-slate-800/50 hover:bg-${social.color}-500/20 transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                  style={{ transitionDelay: `${idx * 0.1}s` }}
                >
                  <social.icon className={`w-5 h-5 text-${social.color}-400`} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Profile Image */}
          <div className="relative h-96 md:h-full flex items-center justify-center animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-magenta-500/20 to-lime-500/20 rounded-2xl blur-3xl animate-pulse-slow"></div>
            <div className="relative w-80 h-80 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 transform hover:scale-105 transition-transform duration-500">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663680620057/QQh8dPZNNQRS49LEtwLZBL/profile-avatar-bor3nhSe99v7jaugBFbu7G.webp"
                alt="Devi Manoj"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-30"></div>
              <div className="absolute inset-0 border-2 border-cyan-400/0 hover:border-cyan-400/50 rounded-2xl transition-all duration-500"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-cyan-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center animate-fade-in-up">
            <span className="bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">About Me</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4 text-slate-300 animate-slide-in">
              <p>
                I'm a motivated B.Tech Computer Science student with a passion for building innovative digital solutions. 
                My journey in tech started with curiosity about how things work, and it evolved into a deep commitment to mastering full-stack development.
              </p>
              <p>
                Currently, I'm focused on creating elegant, performant web applications using modern technologies like React, Next.js, and Node.js. 
                I believe in writing clean, maintainable code and creating user experiences that delight.
              </p>
              <p>
                Beyond coding, I'm actively involved in tech communities, mentoring junior developers, and continuously learning emerging technologies.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-8 border border-cyan-500/20 hover:border-magenta-500/50 transition-all duration-300 animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Quick Facts
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Location', value: 'Kerala, India' },
                  { label: 'Education', value: 'B.Tech CSE, SJCET Palai (2024-2028)' },
                  { label: 'Experience', value: 'Frontend Intern (6 months)' },
                  { label: 'Interests', value: 'Web Dev, UI/UX, AI, Open Source' },
                ].map((item, idx) => (
                  <div key={idx} className="transform hover:translate-x-2 transition-transform duration-300">
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="text-white font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center animate-fade-in-up">
            <span className="bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent">Technical Skills</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'], icon: Code2 },
              { title: 'Backend', skills: ['Node.js', 'Express.js', 'Django', 'Spring Boot', 'REST APIs'], icon: Layers },
              { title: 'Databases', skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'SQLite'], icon: Zap },
              { title: 'Languages', skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'SQL'], icon: Code2 },
              { title: 'Tools & DevOps', skills: ['Git', 'GitHub', 'Docker', 'Vercel', 'Netlify', 'Figma'], icon: Layers },
              { title: 'Other', skills: ['Authentication', 'API Security', 'Performance Optimization', 'UI/UX Design'], icon: Zap },
            ].map((category, idx) => (
              <div 
                key={idx}
                className="group p-6 rounded-lg bg-slate-800/50 border border-cyan-500/20 hover:border-magenta-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-magenta-500/10 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <h3 className="text-lg font-bold text-cyan-400 mb-4 group-hover:text-magenta-400 transition-colors duration-300 flex items-center gap-2">
                  <category.icon className="w-5 h-5" />
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-sm rounded-full bg-slate-700/50 text-slate-200 border border-slate-600/50 group-hover:border-lime-500/50 transition-all duration-300 hover:bg-lime-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center animate-fade-in-up">
            <span className="bg-gradient-to-r from-magenta-400 to-lime-400 bg-clip-text text-transparent">Featured Projects</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Secure Print Sharing System',
                year: '2026',
                description: 'Full-stack web app for secure document sharing with end-to-end encryption, real-time database updates, and role-based access control.',
                tags: ['React', 'Node.js', 'MongoDB', 'Encryption', 'Real-time'],
              },
              {
                title: 'AI Interview Preparation System',
                year: '2026',
                description: 'AI-powered interview practice platform with real-time interaction, instant feedback, NLP-based assessment, and personalized suggestions.',
                tags: ['React', 'Python', 'NLP', 'AI', 'WebSocket'],
              },
              {
                title: 'Relationship Web Application',
                year: '2026',
                description: 'Platform to visualize and manage user relationships using interactive graph-based UI with dynamic data rendering and responsive design.',
                tags: ['React', 'D3.js', 'GraphQL', 'Visualization'],
              },
              {
                title: 'Class Seat Reservation System',
                year: '2025',
                description: 'Classroom seat booking system with real-time availability, user authentication, booking history tracking, and admin dashboard.',
                tags: ['React', 'Express', 'MySQL', 'Real-time'],
              },
            ].map((project, idx) => (
              <div 
                key={idx}
                className="group relative p-6 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 hover:border-magenta-500/50 transition-all duration-300 overflow-hidden transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-magenta-500/0 group-hover:from-cyan-500/10 group-hover:to-magenta-500/10 transition-all duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">{project.title}</h3>
                    <span className="text-sm text-slate-400">{project.year}</span>
                  </div>
                  
                  <p className="text-slate-300 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 text-xs rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/30 transition-colors duration-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-300">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="text-magenta-400 hover:text-magenta-300 hover:bg-magenta-500/10 transition-all duration-300">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center animate-fade-in-up">
            <span className="bg-gradient-to-r from-lime-400 to-magenta-400 bg-clip-text text-transparent">Achievements</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: '1st Place', desc: 'SheBuild Hackathon, CSEA SJCET Palai', icon: '🏆' },
              { title: '2nd Place', desc: 'Smart India Hackathon (SIH) Preliminary Level', icon: '🥈' },
              { title: 'IIT Madras', desc: 'Selected for exclusive 3-day technical workshop', icon: '🎓' },
              { title: 'Leadership', desc: 'Technical Officer & Design Lead in college clubs', icon: '⭐' },
            ].map((achievement, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-lg bg-slate-800/50 border border-lime-500/20 hover:border-lime-500/50 transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-4xl mb-3 transform hover:scale-125 transition-transform duration-300">{achievement.icon}</div>
                <h3 className="text-lg font-bold text-lime-400 mb-2">{achievement.title}</h3>
                <p className="text-slate-300">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-cyan-400 via-magenta-400 to-lime-400 bg-clip-text text-transparent">Let's Connect</span>
          </h2>
          
          <p className="text-slate-300 mb-12 text-lg animate-slide-in">
            I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <Button className="bg-gradient-to-r from-cyan-500 to-magenta-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
            <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300">
              <Github className="w-4 h-4 mr-2" />
              GitHub Profile
            </Button>
          </div>

          <div className="flex justify-center gap-6 animate-slide-in" style={{ animationDelay: '0.4s' }}>
            <a href="mailto:2005devimanoj@email.com" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
              2005devimanoj@email.com
            </a>
            <a href="tel:8302922872" className="text-slate-400 hover:text-magenta-400 transition-colors duration-300">
              +91 8302922872
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 py-8 px-6 text-center text-slate-400">
        <p>© 2026 Devi Manoj. Built with React, Canvas 3D & Tailwind CSS.</p>
      </footer>
    </div>
  );
}
