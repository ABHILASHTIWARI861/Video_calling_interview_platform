import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  VideoIcon,
  FileVideoCamera,
  ZapIcon,
  UserRoundPlus,
  MessageCircleCode,
  GemIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

function Home_page() {
  return (
    <div className="relative min-h-screen ">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xs bg-blue-500/30 border-white/10">
        <div className="max-w-8xl  px-6 py-4 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="size-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md group-hover:scale-105 transition">
              <GemIcon className="size-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-wide">
                My Project<span className="text-indigo-400">IQ</span>
              </p>
              <p className="text-xs text-white/50 -mt-1">
                Collaborative Interviews
              </p>
            </div>
          </Link>

          {/* AUTH */}
          <SignInButton mode="modal">
            <button className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-semibold text-sm flex items-center gap-2 shadow-lg">
              Get Started
              <ArrowRightIcon className="size-4" />
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium">
              <ZapIcon className="size-4" />
              Real-time pair programming
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              Build confidence.
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent">
                Crack interviews together.
              </span>
            </h1>

            <p className="text-lg text-white/70 max-w-xl">
              A modern interview workspace with live coding, instant feedback,
              and face-to-face collaboration — built for serious candidates.
            </p>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-4">
              {["Live Video", "Collaborative Editor", "Multi-language Support"].map(  
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                  >
                    <CheckIcon className="size-4 text-emerald-400" />
                    <span className="text-sm">{item}</span>
                  </div>
                )
              )}
            </div>

            {/* CTA */}
            <div className="flex gap-4 flex-wrap">
              <SignInButton mode="modal">
                <button className="px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold flex items-center gap-2">
                  Start Session
                  <ArrowRightIcon className="size-5" />
                </button>
              </SignInButton>

              <button className="px-7 py-3 rounded-xl border border-white/15 hover:bg-white/5 transition flex items-center gap-2">
                <VideoIcon className="size-5" />
                View Demo
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 pt-6 max-w-md">
              <div>
                <p className="text-3xl font-bold text-indigo-400">10k+</p>
                <p className="text-sm text-white/60">Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-violet-400">50k+</p>
                <p className="text-sm text-white/60">Sessions</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-emerald-400">99.9%</p>
                <p className="text-sm text-white/60">Uptime</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <img
              src="/hero.png"
              alt="Interview workspace preview"
              className="rounded-3xl shadow-2xl border border-white/10 hover:scale-[1.02] transition duration-500"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 pb-24">   
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            Built for real-world{" "}
            <span className="text-indigo-400">technical interviews</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Everything you need to simulate high-pressure interviews with ease
            and clarity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[                                      //Array of object
            {
              Icon: FileVideoCamera,
              title: "HD Video Rooms",
              desc: "Crystal-clear video and audio for distraction-free interviews.",
            },
            {
              Icon: MessageCircleCode,
              title: "Live Code Sync",
              desc: "Edit, execute, and discuss code in real time.",
            },
            {
              Icon: UserRoundPlus,
              title: "Instant Pairing",
              desc: "Invite interviewers or peers with a single click.",
            },
          ].map(({Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl p-8 bg-white/5 border border-white/10 hover:border-indigo-400/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition"
            >
              <div className="size-14 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6">
                <Icon className="size-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-white/60">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home_page;