import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Brain,
  BarChart3,
  Target,
  Flame,
  GraduationCap,
  Code2,
  Briefcase,
  Heart,
  Zap,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import dashboardPreview from "../assets/images/Dashboard.png";

/* ──────────────────── Animation Helpers ──────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const features = [
  {
    icon: <Brain size={20} />,
    title: "AI Performance Insights",
    desc: "Get smart feedback on your daily productivity and learning habits.",
  },
  {
    icon: <Flame size={20} />,
    title: "Streak Tracking",
    desc: "Build momentum with daily streaks and habit consistency tracking.",
  },
  {
    icon: <BarChart3 size={20} />,
    title: "Weekly Analytics",
    desc: "Understand your performance with clean visual progress reports.",
  },
  {
    icon: <Target size={20} />,
    title: "Goal Focus",
    desc: "Stay aligned with your personal goals using AI-powered guidance.",
  },
];

const faqs = [
  {
    question: "What is AI Mentor?",
    answer:
      "AI Mentor is a personal growth assistant that tracks your progress, analyzes your habits, and gives AI-powered feedback to help you improve every day.",
  },
  {
    question: "Who is AI Mentor for?",
    answer:
      "AI Mentor is designed for students, developers, professionals, and anyone who wants to improve their productivity and consistency.",
  },
  {
    question: "How does the AI feedback work?",
    answer:
      "Your activity and progress data are analyzed by AI to generate personalized insights, performance summaries, and improvement suggestions.",
  },
  {
    question: "Do I need to track my progress daily?",
    answer:
      "Daily tracking helps AI Mentor provide better insights, but the platform is flexible and adapts to your schedule.",
  },
  {
    question: "Is AI Mentor free?",
    answer:
      "AI Mentor will have a free plan with core features and optional premium features for advanced analytics and deeper insights.",
  },
];

/* ──────────────────── Section Wrapper ──────────────────── */
function Section({ children, className = "", id }) {
  return (
    <section
      id={id}
      className={`relative w-full max-w-6xl mx-auto px-6 py-24 md:py-32 ${className}`}
    >
      {children}
    </section>
  );
}

/* ──────────────────── Feature Card ──────────────────── */
function FeatureCard({ icon: Icon, title, description, color, index }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative glass-card p-8 rounded-3xl cursor-default overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${color}15, transparent 70%)`,
        }}
      />
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        <Icon size={28} style={{ color }} />
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}

/* ──────────────────── Step Card ──────────────────── */
function StepCard({ number, title, description, index }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="relative flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg shadow-[var(--color-primary)]/30">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm max-w-[220px]">{description}</p>
    </motion.div>
  );
}

/* ──────────────────── Audience Card ──────────────────── */
function AudienceCard({ icon: Icon, text, index }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="flex items-center gap-4 glass-card px-6 py-5 rounded-2xl"
    >
      <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/20 flex items-center justify-center shrink-0">
        <Icon size={20} className="text-[var(--color-primary)]" />
      </div>
      <span className="text-gray-200 font-medium">{text}</span>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   LANDING PAGE
   ════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const { user } = useAuth();
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-gray-100 font-sans overflow-x-hidden">
      {/* ─── Floating Background Orbs ─── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[15%] w-[600px] h-[600px] bg-[var(--color-primary)]/12 rounded-full blur-[180px] animate-float" />
        <div className="absolute top-[60%] right-[10%] w-[500px] h-[500px] bg-[var(--color-secondary)]/8 rounded-full blur-[160px] animate-float-delayed" />
        <div className="absolute top-[40%] left-[60%] w-[350px] h-[350px] bg-purple-500/6 rounded-full blur-[140px] animate-float-slow" />
      </div>

      {/* ──────────────────────────────────────────────────────
          NAVIGATION
         ────────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[var(--color-background)]/70 border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight text-white flex gap-2 items-center"
          >
            <Sparkles className="text-[var(--color-primary)]" size={20} />
            AI <span className="text-gray-400">Mentor</span>
          </Link>

          {user ? (
            <Link
              to="/dashboard"
              className="text-sm font-medium px-5 py-2 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white hover:opacity-90 transition-opacity"
            >
              Dashboard
            </Link>
          ) : (
            <div className="flex gap-3 items-center">
              <Link
                to="/login"
                className="text-sm font-medium hover:text-white text-gray-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium px-5 py-2 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white hover:opacity-90 transition-opacity shadow-lg shadow-[var(--color-primary)]/25"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </motion.nav>

      {/* ──────────────────────────────────────────────────────
          1️⃣ HERO SECTION
         ────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium shadow-[0_0_20px_rgba(139,92,246,0.25)]"
        >
          <Sparkles size={16} /> Welcome to the Future of Self-Growth
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]"
        >
          An AI That Actually
          <br />
          <span className="text-gradient">Understands You.</span>
          <br />
          <span className="text-gray-500">Not Just Responds.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl font-light leading-relaxed"
        >
          AI Mentor remembers your journey, tracks your growth, and gives you
          weekly intelligence about your life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/register"
              className="flex items-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-[var(--color-primary)]/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-all duration-300"
            >
              Start Growing Free <ArrowRight size={20} />
            </Link>
          </motion.div>
          <motion.a
            href="#features"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg border border-white/15 text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-300"
          >
            See How It Works <ChevronDown size={20} />
          </motion.a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-10 text-sm text-gray-500"
        >
          Built for ambitious learners, builders, and thinkers.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={24} className="text-gray-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats section */}
      {/* <Section className="py-12">
      <div className="grid grid-cols-3 text-center gap-6">
        <div>
          <h3 className="text-3xl font-bold text-white">10K+</h3>
          <p className="text-gray-400 text-sm">Reflections Logged</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-white">1200+</h3>
          <p className="text-gray-400 text-sm">Weekly Reports Generated</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-white">95%</h3>
          <p className="text-gray-400 text-sm">Users Improve Consistency</p>
        </div>
      </div>
    </Section> */}

      {/* ──────────────────────────────────────────────────────
          2️⃣ PROBLEM SECTION
         ────────────────────────────────────────────────────── */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold mb-16"
          >
            Most AI Tools <span className="text-gray-500">Forget You.</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start max-w-4xl mx-auto">
            {/* The Problem */}
            <motion.div variants={fadeUp} custom={1} className="text-left">
              <div className="space-y-3 text-xl md:text-2xl text-gray-500 font-light leading-relaxed">
                <p>You talk.</p>
                <p>It replies.</p>
                <p>Conversation ends.</p>
                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="text-gray-600 pt-4"
                >
                  Nothing is remembered.
                </motion.p>
                <motion.div
                  variants={fadeUp}
                  custom={3}
                  className="pt-4 space-y-2"
                >
                  <p className="text-gray-600">No growth.</p>
                  <p className="text-gray-600">No insight.</p>
                  <p className="text-gray-700">No evolution.</p>
                </motion.div>
              </div>
            </motion.div>

            {/* The Solution */}
            <motion.div variants={fadeUp} custom={2} className="text-left">
              <div className="relative pl-6 border-l-2 border-[var(--color-primary)]/50">
                <div className="space-y-4 text-xl md:text-2xl font-medium leading-relaxed">
                  <p className="text-white">
                    AI Mentor{" "}
                    <span className="text-gradient">builds memory.</span>
                  </p>
                  <p className="text-white">
                    <span className="text-gradient">Tracks</span> patterns.
                  </p>
                  <p className="text-white">
                    Gives <span className="text-gradient">clarity.</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Section>

      {/* ──────────────────────────────────────────────────────
          3️⃣ FEATURES SECTION
         ────────────────────────────────────────────────────── */}
      <Section id="features">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-[var(--color-primary)] font-medium mb-3 uppercase tracking-wider text-sm">
              What makes us different
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">
              How AI Mentor Is <span className="text-gradient">Different</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            <FeatureCard
              icon={Brain}
              title="Persistent Memory"
              description="Your reflections are stored and analyzed. AI Mentor learns how you think and remembers your journey."
              color="#8B5CF6"
              index={0}
            />
            <FeatureCard
              icon={BarChart3}
              title="Weekly Intelligence Reports"
              description="Get a weekly summary of your productivity, emotional trends, and growth patterns."
              color="#06B6D4"
              index={1}
            />
            <FeatureCard
              icon={Target}
              title="Reflection Engine"
              description="Structured reflection mode that helps you think deeper and act smarter every single day."
              color="#F59E0B"
              index={2}
            />
            <FeatureCard
              icon={Flame}
              title="Personal Growth Dashboard"
              description="Track streaks, consistency, and improvement. See your progress visually and stay motivated."
              color="#EF4444"
              index={3}
            />
          </motion.div>
        </motion.div>
      </Section>
      {/* ──────────────────────────────────────────────────────
          4️⃣ Product view
         ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">See AI Mentor In Action</h2>

            <p className="text-gray-400 max-w-2xl mx-auto">
              Track your growth, receive AI-powered insights, and stay
              consistent with a dashboard designed for continuous improvement.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Dashboard Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src={dashboardPreview}
                alt="AI Mentor Dashboard"
                className="rounded-xl shadow-2xl border border-gray-800 hover:scale-[1.02] transition"
              />
            </motion.div>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 items-start"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-indigo-500/10 p-3 rounded-lg text-indigo-400">
                    {feature.icon}
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>

                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────
          4️⃣ HOW IT WORKS
         ────────────────────────────────────────────────────── */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple. <span className="text-gradient">Powerful.</span> Personal.
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connecting Line (desktop only) */}
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-transparent" />

            <motion.div
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-12"
            >
              <StepCard
                number="1"
                title="Talk to your AI Mentor"
                description="Have natural conversations about your goals, thoughts, and progress."
                index={0}
              />
              <StepCard
                number="2"
                title="Reflect daily"
                description="Use guided reflection prompts to build self-awareness and clarity."
                index={1}
              />
              <StepCard
                number="3"
                title="Get intelligent weekly insights"
                description="Receive personalized reports on your growth patterns and trends."
                index={2}
              />
            </motion.div>
          </div>
        </motion.div>
      </Section>

      {/* ──────────────────────────────────────────────────────
          5️⃣ TARGET AUDIENCE
         ────────────────────────────────────────────────────── */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Who Is AI Mentor <span className="text-gradient">For?</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
          >
            <AudienceCard
              icon={GraduationCap}
              text="Students who want clarity"
              index={0}
            />
            <AudienceCard
              icon={Code2}
              text="Developers building discipline"
              index={1}
            />
            <AudienceCard
              icon={Briefcase}
              text="Professionals tracking growth"
              index={2}
            />
            <AudienceCard
              icon={Heart}
              text="Anyone serious about self-improvement"
              index={3}
            />
          </motion.div>
        </motion.div>
      </Section>

      {/* ──────────────────────────────────────────────────────
          6️⃣ SOCIAL PROOF
         ────────────────────────────────────────────────────── */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            variants={scaleIn}
            className="glass-card px-10 py-10 md:px-16 md:py-14 rounded-3xl max-w-2xl border border-[var(--color-primary)]/15 relative overflow-hidden"
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" />

            <Zap
              size={32}
              className="text-[var(--color-primary)] mx-auto mb-6"
            />
            <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed mb-6">
              "Built by a developer{" "}
              <span className="text-white font-medium">
                obsessed with growth.
              </span>{" "}
              Used daily for real-world self improvement."
            </p>
            <div className="w-12 h-[2px] bg-[var(--color-primary)]/40 mx-auto mb-4" />
            <p className="text-sm text-gray-500">
              Early stage — growing every day, just like you.
            </p>
          </motion.div>
        </motion.div>
      </Section>

      {/* ──────────────────────────────────────────────────────
          Faq
         ────────────────────────────────────────────────────── */}

      <section className="py-24 bg-gray-950 text-white">
        <div className="max-w-4xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>

            <p className="text-gray-400">
              Everything you need to know about AI Mentor.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-800 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-5 text-left"
                >
                  <span className="font-medium">{faq.question}</span>

                  <ChevronDown
                    className={`transition-transform ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {activeIndex === index && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{ originY: 0 }}
                      className="px-5 pb-5 text-gray-400"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────
          7️⃣ FINAL CTA
         ────────────────────────────────────────────────────── */}
      <section className="relative py-32 md:py-40">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[200px]" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="relative z-10 text-center px-6"
        >
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Stop Journaling.
            <br />
            <span className="text-gradient">Start Evolving.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-gray-400 text-lg mb-10 max-w-xl mx-auto"
          >
            Join a smarter way to grow. Your AI Mentor is waiting.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={2}
            className="flex justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-10 py-5 rounded-2xl font-semibold text-xl shadow-2xl shadow-[var(--color-primary)]/30 hover:shadow-[0_0_60px_rgba(139,92,246,0.45)] transition-all duration-500 pulse-glow"
              >
                Create Your Free Account <ArrowRight size={24} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ──────────────────────────────────────────────────────
          FOOTER
         ────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[var(--color-primary)]" />
            <span>AI Mentor</span>
          </div>
          <p>© 2026 AI Mentor. Built with passion for growth.</p>
        </div>
      </footer>
    </div>
  );
}
