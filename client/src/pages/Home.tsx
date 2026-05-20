import { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin, ExternalLink, Download, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThreeDBackground from '@/components/ThreeDBackground';
import './Home.css';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* 3D Background Canvas */}
      <ThreeDBackground scrollY={scrollY} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/50 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-magenta-400 to-lime-400 bg-clip-text text-transparent">
            Devi Manoj
          </div>
          <div className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection('about')} className="text-sm hover:text-cyan-400 transition-colors">About</button>
            <button onClick={() => scrollToSection('skills')} className="text-sm hover:text-cyan-400 transition-colors">Skills</button>
            <button onClick={() => scrollToSection('projects')} className="text-sm hover:text-cyan-400 transition-colors">Projects</button>
            <button onClick={() => scrollToSection('contact')} className="text-sm hover:text-cyan-400 transition-colors">Contact</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-magenta-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-cyan-400 text-sm font-mono tracking-widest">FULL STACK DEVELOPER</p>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-magenta-400 to-lime-400 bg-clip-text text-transparent">
                  Devi Manoj
                </span>
              </h1>
              <p className="text-xl text-slate-300">Building innovative digital experiences with React, Next.js & modern web technologies</p>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-lg">
              B.Tech Computer Science student at SJCET Palai. Passionate about creating elegant solutions to complex problems. 
              Experienced in full-stack development, UI/UX design, and emerging technologies.
            </p>

            <div className="flex gap-4 pt-4">
              <Button 
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-cyan-500 to-magenta-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                View My Work
              </Button>
              <Button 
                variant="outline" 
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-slate-800/50 hover:bg-cyan-500/20 transition-colors">
                <Github className="w-5 h-5 text-cyan-400" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-slate-800/50 hover:bg-magenta-500/20 transition-colors">
                <Linkedin className="w-5 h-5 text-magenta-400" />
              </a>
              <a href="mailto:2005devimanoj@email.com" className="p-3 rounded-lg bg-slate-800/50 hover:bg-lime-500/20 transition-colors">
                <Mail className="w-5 h-5 text-lime-400" />
              </a>
            </div>
          </div>

          {/* Right: Profile Image */}
          <div className="relative h-96 md:h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-magenta-500/20 to-lime-500/20 rounded-2xl blur-3xl"></div>
            <div className="relative w-80 h-80 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663680620057/QQh8dPZNNQRS49LEtwLZBL/profile-avatar-bor3nhSe99v7jaugBFbu7G.webp"
                alt="Devi Manoj"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-30"></div>
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
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">About Me</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4 text-slate-300">
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

            <div className="bg-slate-800/50 rounded-lg p-8 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="text-white font-semibold">Kerala, India</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Education</p>
                  <p className="text-white font-semibold">B.Tech CSE, SJCET Palai (2024-2028)</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Experience</p>
                  <p className="text-white font-semibold">Frontend Intern (6 months)</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Interests</p>
                  <p className="text-white font-semibold">Web Dev, UI/UX, AI, Open Source</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent">Technical Skills</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
              { title: 'Backend', skills: ['Node.js', 'Express.js', 'Django', 'Spring Boot', 'REST APIs'] },
              { title: 'Databases', skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'SQLite'] },
              { title: 'Languages', skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'SQL'] },
              { title: 'Tools & DevOps', skills: ['Git', 'GitHub', 'Docker', 'Vercel', 'Netlify', 'Figma'] },
              { title: 'Other', skills: ['Authentication', 'API Security', 'Performance Optimization', 'UI/UX Design'] },
            ].map((category, idx) => (
              <div 
                key={idx}
                className="group p-6 rounded-lg bg-slate-800/50 border border-cyan-500/20 hover:border-magenta-500/50 transition-all hover:shadow-lg hover:shadow-magenta-500/10"
              >
                <h3 className="text-lg font-bold text-cyan-400 mb-4 group-hover:text-magenta-400 transition-colors">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-sm rounded-full bg-slate-700/50 text-slate-200 border border-slate-600/50 group-hover:border-lime-500/50 transition-colors"
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
      <section id="projects" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
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
                className="group relative p-6 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 hover:border-magenta-500/50 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-magenta-500/0 group-hover:from-cyan-500/10 group-hover:to-magenta-500/10 transition-all"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <span className="text-sm text-slate-400">{project.year}</span>
                  </div>
                  
                  <p className="text-slate-300 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 text-xs rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/50">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="text-magenta-400 hover:text-magenta-300 hover:bg-magenta-500/10">
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
          <h2 className="text-4xl font-bold mb-12 text-center">
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
                className="p-6 rounded-lg bg-slate-800/50 border border-lime-500/20 hover:border-lime-500/50 transition-all"
              >
                <div className="text-3xl mb-3">{achievement.icon}</div>
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
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-magenta-400 to-lime-400 bg-clip-text text-transparent">Let's Connect</span>
          </h2>
          
          <p className="text-slate-300 mb-12 text-lg">
            I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="bg-gradient-to-r from-cyan-500 to-magenta-500 hover:shadow-lg hover:shadow-cyan-500/50">
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
            <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
              <Github className="w-4 h-4 mr-2" />
              GitHub Profile
            </Button>
          </div>

          <div className="flex justify-center gap-6">
            <a href="mailto:2005devimanoj@email.com" className="text-slate-400 hover:text-cyan-400 transition-colors">
              2005devimanoj@email.com
            </a>
            <a href="tel:8302922872" className="text-slate-400 hover:text-magenta-400 transition-colors">
              +91 8302922872
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 py-8 px-6 text-center text-slate-400">
        <p>© 2026 Devi Manoj. Built with React, Three.js & Tailwind CSS.</p>
      </footer>
    </div>
  );
}
