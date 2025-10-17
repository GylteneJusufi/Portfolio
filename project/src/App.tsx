import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail as MailIconPlain,
  ArrowRight,
  Sparkles,
  Palette,
  Code2,
  Figma,
  Layers,
  Eye,
  Moon,
  Sun,
  XCircle,
  User,
  Briefcase,
  Book,
  MapPin,
} from "lucide-react";
import g from "./g-image.jpeg";

/* ----------------------------- Modal (Portal) ----------------------------- */
type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-[95vw] max-w-5xl rounded-2xl overflow-hidden border border-white/10 bg-slate-900">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
          aria-label="Close modal"
        >
          <XCircle size={18} />
          Close
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

/* --------------------------- Figma Embed (iframe) ------------------------- */
type FigmaEmbedProps = {
  url: string; // full figma URL (proto or file)
  title?: string;
  theme?: "dark" | "light";
  ratio?: string; // "62.5%" (16:10) | "56.25%" (16:9)
};

function FigmaEmbed({
  url,
  title = "Figma Prototype",
  theme = "dark",
  ratio = "62.5%",
}: FigmaEmbedProps) {
  const isValid = typeof url === "string" && url.startsWith("http");
  return (
    <div className="relative w-full bg-black/20" style={{ paddingTop: ratio }}>
      {isValid ? (
        <iframe
          title={title}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
          src={`https://www.figma.com/embed?embed_host=share&theme=${theme}&url=${encodeURIComponent(
            url
          )}`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-sm opacity-80">
          Invalid Figma URL
        </div>
      )}
    </div>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>(
    { x: 0, y: 0 }
  );
  const [isDark, setIsDark] = useState<boolean>(true);

  // Modal state for viewing a prototype
  const [openProto, setOpenProto] = useState<boolean>(false);
  const [protoUrl, setProtoUrl] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleMouseMove = (e: MouseEvent) =>
      setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const skills = [
    { name: "UI Design", icon: Palette, color: "from-rose-400 to-pink-500" },
    { name: "UX Research", icon: Eye, color: "from-emerald-400 to-teal-500" },
    { name: "Prototyping", icon: Layers, color: "from-blue-400 to-cyan-500" },
    {
      name: "Design Systems",
      icon: Figma,
      color: "from-violet-400 to-purple-500",
    },
    { name: "Front-end Dev", icon: Code2, color: "from-orange-400 to-red-500" },
    {
      name: "User Testing",
      icon: Sparkles,
      color: "from-amber-400 to-yellow-500",
    },
  ];

  // Replace with your real links; put cover images in /public/covers/
  const projects: Array<{
    title: string;
    description: string;
    category: string;
    cover: string;
    figmaFile?: string;
    figmaProto?: string;
    tags: string[];
  }> = [
    {
      title: "Banking App Redesign",
      description:
        "Complete UX overhaul of a digital banking platform, increasing user satisfaction by 47% and reducing task time by 35%.",
      category: "Mobile App",
      cover: "/covers/banking.jpg",
      figmaFile:
        "https://www.figma.com/file/XXXXXXXX/Banking-UI?type=design&node-id=0-1",
      figmaProto:
        "https://www.figma.com/proto/XXXXXXXX/Banking-UI?node-id=0-1&scaling=scale-down-width",
      tags: ["UI/UX", "Mobile", "Fintech"],
    },
    {
      title: "E-Commerce Platform",
      description:
        "Designed an intuitive shopping experience with personalized recommendations, +28% conversion rate.",
      category: "Web Design",
      cover: "/covers/ecommerce.jpg",
      figmaFile:
        "https://www.figma.com/file/YYYYYYYY/Ecom?type=design&node-id=0-1",
      figmaProto:
        "https://www.figma.com/proto/YYYYYYYY/Ecom?node-id=0-1&scaling=scale-down-width",
      tags: ["UI/UX", "Web", "E-commerce"],
    },
    {
      title: "Health & Wellness Dashboard",
      description:
        "Comprehensive health tracking with data viz and personalized insights.",
      category: "Dashboard",
      cover: "/covers/health.jpg",
      figmaFile:
        "https://www.figma.com/file/ZZZZZZZZ/Health?type=design&node-id=0-1",
      figmaProto:
        "https://www.figma.com/proto/ZZZZZZZZ/Health?node-id=0-1&scaling=scale-down-width",
      tags: ["UI/UX", "Data Viz", "Healthcare"],
    },
    {
      title: "Design System",
      description:
        "Scalable DS with 200+ components for faster and consistent product development.",
      category: "System",
      cover: "/covers/design-system.jpg",
      figmaFile: "https://www.figma.com/file/AAAAAAAA/DS?type=design&node-id=0-1",
      figmaProto:
        "https://www.figma.com/proto/AAAAAAAA/DS?node-id=0-1&scaling=scale-down-width",
      tags: ["Design System", "Components", "Documentation"],
    },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const openFigmaProto = (url: string) => {
    setProtoUrl(url);
    setOpenProto(true);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 overflow-x-hidden ${
        isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Animated background gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
            isDark ? "opacity-20" : "opacity-10"
          } bg-gradient-to-r from-cyan-500 to-blue-500`}
          style={{
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
          }}
        />
        <div
          className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl ${
            isDark ? "opacity-10" : "opacity-5"
          } bg-gradient-to-r from-pink-500 to-rose-500`}
        />
        <div
          className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl ${
            isDark ? "opacity-10" : "opacity-5"
          } bg-gradient-to-r from-emerald-500 to-teal-500`}
        />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? isDark
              ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10"
              : "bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-0">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {["About", "Work", "Skills", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-5 py-2 transition-colors relative group ${
                    isDark
                      ? "text-slate-300 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-3/4 transition-all duration-300" />
                </button>
              ))}

              <button
                onClick={() => setIsDark(!isDark)}
                className={`ml-2 p-2 rounded-lg transition-all ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10"
                    : "bg-slate-200 hover:bg-slate-300"
                }`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <a
                href="#contact"
                className="ml-4 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105"
              >
                Let's Talk
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg transition-all ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10"
                    : "bg-slate-200 hover:bg-slate-300"
                }`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden backdrop-blur-xl border-t ${
              isDark
                ? "bg-slate-900/95 border-white/10"
                : "bg-white/95 border-slate-200"
            }`}
          >
            <div className="px-6 py-6 space-y-4">
              {["About", "Work", "Skills", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left transition-colors py-2 ${
                    isDark
                      ? "text-slate-300 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                <span
                  className={`block text-2xl sm:text-3xl font-normal mb-4 ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Hi, I'm
                </span>
                <span
                  className={`bg-gradient-to-r bg-clip-text text-transparent ${
                    isDark
                      ? "from-white via-cyan-100 to-blue-100"
                      : "from-slate-900 via-cyan-600 to-blue-600"
                  }`}
                >
                  Gyltene Jusufi
                </span>
              </h1>

              <p className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent mb-6">
                UI/UX Designer & Developer
              </p>

              <p
                className={`text-xl mb-12 max-w-2xl leading-relaxed ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Crafting beautiful, intuitive digital experiences that blend
                aesthetic excellence with functional design.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#work"
                  className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-medium hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 flex items-center space-x-2 text-white"
                >
                  <span>View My Work</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className={`px-8 py-4 backdrop-blur-sm border rounded-full font-medium transition-all flex items-center space-x-2 ${
                    isDark
                      ? "bg-white/5 border-white/10 hover:bg-white/10"
                      : "bg-white border-slate-200 hover:bg-slate-50 shadow-sm"
                  }`}
                >
                  <span>Get In Touch</span>
                </a>
              </div>
            </div>

            {/* Profile Image (Bigger Circle) */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div
                  className={`absolute -inset-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl ${
                    isDark ? "opacity-30" : "opacity-20"
                  }`}
                />
                <div
                  className={`relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[28rem] lg:h-[38rem] 
                  rounded-full overflow-hidden border-4 ${
                    isDark ? "border-white/10" : "border-white shadow-2xl"
                  }`}
                >
                  <img
                    src={g}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>

                <div className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl rotate-12 opacity-80" />
                <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl -rotate-12 opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`relative py-32 px-6 lg:px-8 ${isDark ? "" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-semibold text-cyan-400 mb-4 tracking-wider uppercase">
                About Me
              </h2>
              <h3 className="text-4xl sm:text-5xl font-bold mb-8 leading-tight">
                Designing with purpose,{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  developing with passion
                </span>
              </h3>
              <div
                className={`space-y-6 text-lg leading-relaxed ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                <p>
                  I am a passionate software developer specializing in web and
                  mobile application development. I have hands-on experience in
                  both frontend and backend development, using technologies such
                  as Java, Spring Boot, HTML/CSS, Vue.js, and Python.
                </p>
                <p>
                  Beyond programming, I possess advanced skills in UI/UX design
                  and am highly proficient in using Figma to create functional
                  and aesthetically appealing prototypes.
                </p>
                <p>
                  I enjoy combining technical expertise with creativity to build
                  solutions that deliver exceptional user experiences. I am a
                  collaborative, motivated individual who is always eager to
                  learn new technologies and contribute to innovative and
                  impactful projects.
                </p>
              </div>
            </div>

            {/* Right column cards + CV */}
            <div className="relative">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div
                  className={`backdrop-blur-sm rounded-2xl p-6 border shadow-sm ${
                    isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <User className="text-cyan-400" />
                    <h4 className="text-xl font-semibold">Personal Info</h4>
                  </div>
                  <ul
                    className={`${
                      isDark ? "text-slate-300" : "text-slate-700"
                    } space-y-2`}
                  >
                    <li>
                      <span className="font-medium">Name:</span> Gyltene Jusufi
                    </li>
                    <li>
                      <span className="font-medium">Age:</span> 20
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-1 shrink-0 text-cyan-400" />
                      <span>Prishtine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MailIconPlain className="w-4 h-4 mt-1 shrink-0 text-cyan-400" />
                      <a
                        href="mailto:gyltenejusufi123@gmail.com"
                        className="hover:underline"
                      >
                        gyltenejusufi123@gmail.com
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Experience */}
                <div
                  className={`backdrop-blur-sm rounded-2xl p-6 border shadow-sm ${
                    isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Briefcase className="text-blue-400" />
                    <h4 className="text-xl font-semibold">Experience</h4>
                  </div>
                  <ul
                    className={`${
                      isDark ? "text-slate-300" : "text-slate-700"
                    } space-y-3`}
                  >
                    <li>
                      <div className="font-medium">Call Agent</div>
                      <div
                        className={`${
                          isDark ? "text-slate-400" : "text-slate-500"
                        } text-sm`}
                      >
                        Cacttus Education
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* CV Buttons */}
              <div className="mt-12 flex flex-wrap gap-3">
                {/* Put your PDF at /public/cv/GylteneJusufi-CV.pdf */}
                <a
                  href="/GylteneJusufi-CV.pdf"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/40 transition-all"
                >
                  View CV
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/GylteneJusufi-CV.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-blue-500 to-indigo-500 hover:shadow-lg hover:shadow-blue-500/40 transition-all"
                >
                  Download CV
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section (Figma integrated) */}
      <section id="work" className="relative py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm font-semibold text-cyan-400 mb-4 tracking-wider uppercase">
              Featured Work
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold mb-6">
              Projects that make{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                a difference
              </span>
            </h3>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Live Figma prototypes embedded directly—click any “View
              Prototype”.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group relative backdrop-blur-sm border rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] ${
                  isDark
                    ? "bg-white/5 border-white/10 hover:border-white/20"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl"
                }`}
              >
                <div className="h-64 relative overflow-hidden">
                  {project.cover?.startsWith("linear-gradient") ? (
                    <div
                      style={{ background: project.cover }}
                      className="w-full h-full"
                    />
                  ) : (
                    <img
                      src={project.cover || "/covers/fallback.jpg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div
                    className={`absolute inset-0 ${
                      isDark
                        ? "bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"
                        : "bg-gradient-to-t from-white via-white/50 to-transparent"
                    }`}
                  />
                  <div
                    className={`absolute top-6 right-6 px-4 py-2 backdrop-blur-md rounded-full text-sm border ${
                      isDark
                        ? "bg-white/10 border-white/20"
                        : "bg-white/80 border-white"
                    }`}
                  >
                    {project.category}
                  </div>
                </div>

                <div className="p-8">
                  <h4 className="text-2xl font-bold mb-3 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    {project.title}
                  </h4>
                  <p
                    className={`${
                      isDark ? "text-slate-400" : "text-slate-600"
                    } mb-6 leading-relaxed`}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 border rounded-full text-sm ${
                          isDark
                            ? "bg-white/5 border-white/10 text-slate-300"
                            : "bg-slate-50 border-slate-200 text-slate-600"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.figmaProto && (
                      <button
                        onClick={() => openFigmaProto(project.figmaProto!)}
                        className="group inline-flex items-center space-x-2 px-4 py-2 rounded-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/40 transition-all"
                      >
                        <span>View Prototype</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                    {project.figmaFile && (
                      <a
                        href={project.figmaFile}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                          isDark
                            ? "bg-white/5 border border-white/10 hover:bg-white/10"
                            : "bg-white border border-slate-200 hover:bg-slate-50"
                        } transition-colors`}
                      >
                        <Figma size={16} />
                        <span>Open in Figma</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal with Figma embed */}
          <Modal open={openProto} onClose={() => setOpenProto(false)}>
            {protoUrl ? (
              <FigmaEmbed
                url={protoUrl}
                theme={isDark ? "dark" : "light"}
                ratio="62.5%"
              />
            ) : (
              <div className="p-10 text-center">No prototype URL provided.</div>
            )}
          </Modal>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`relative py-32 px-6 lg:px-8 ${isDark ? "" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm font-semibold text-cyan-400 mb-4 tracking-wider uppercase">
              Skills & Tools
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold mb-6">
              My creative{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                toolkit
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className={`group relative backdrop-blur-sm border rounded-2xl p-8 hover:scale-110 transition-all duration-300 ${
                    isDark
                      ? "bg-white/5 border-white/10 hover:border-white/20"
                      : "bg-white border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl"
                  }`}
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${skill.color} rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform`}
                  >
                    <Icon className="text-white" size={28} />
                  </div>
                  <h4
                    className={`text-center font-semibold group-hover:text-cyan-400 transition-colors ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {skill.name}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm font-semibold text-cyan-400 mb-4 tracking-wider uppercase">
            Get In Touch
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold mb-6">
            Let's create something{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              amazing together
            </span>
          </h3>
          <p
            className={`text-xl mb-12 max-w-2xl mx-auto ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            I'm always excited to collaborate on innovative projects or discuss
            new opportunities.
          </p>

          <a
            href="mailto:gyltenejusufi123@gmail.com"
            className="inline-flex items-center space-x-2 px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 text-white"
          >
            <MailIconPlain size={20} />
            <span>gyltenejusufi123@gmail.com</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`relative border-t py-12 px-6 lg:px-8 ${
          isDark ? "border-white/10" : "border-slate-200 bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className={`${isDark ? "text-slate-400" : "text-slate-600"} mb-4 md:mb-0`}>
            © 2025 Gyltene Jusufi. Crafted with creativity and code.
          </div>
          <div className={`flex space-x-8 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            <button
              onClick={() => scrollToSection("about")}
              className={`${isDark ? "hover:text-white" : "hover:text-slate-900"} transition-colors`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("work")}
              className={`${isDark ? "hover:text-white" : "hover:text-slate-900"} transition-colors`}
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className={`${isDark ? "hover:text-white" : "hover:text-slate-900"} transition-colors`}
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`${isDark ? "hover:text-white" : "hover:text-slate-900"} transition-colors`}
            >
              Contact
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
