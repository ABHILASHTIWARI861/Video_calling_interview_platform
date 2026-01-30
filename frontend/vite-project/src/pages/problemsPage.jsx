import { Link } from "react-router";
import Navbar from "../components/Navbar";

import { PROBLEMS } from "../data/problems";
import { ChevronRightIcon, LampDesk } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemsPage() {
  const problems = Object.values(PROBLEMS);    // Ye object ki saari values nikal ke array bana deta hai... Object par direct .map() nahi hota..... ,Array par .map() hota hai

  const easyProblemsCount = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumProblemsCount = problems.filter((p) => p.difficulty === "Medium").length;
  const hardProblemsCount = problems.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="relative min-h-screen bg-base-200">
      <Navbar />

      {/* LAMP BACKGROUND */}
      <div className="absolute inset-0 -z-10 
        bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_65%)]">
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">
            Interview Problems for <span className="text-violet-400">practice</span>
          </h1>
          <p className="text-base-content/70 max-w-xl">
            Sharpen your coding skills with carefully curated interview-style problems.
          </p>
        </div>

        {/* PROBLEMS LIST */}
        <div className="space-y-5">
          {problems.map((problem) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="group block rounded-2xl bg-base-100/80 backdrop-blur
                         border border-base-300 hover:border-violet-400/40
                         hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]
                         transition-all"
            >
              <div className="p-6">
                <div className="flex items-center justify-between gap-6">
                  
                  {/* LEFT */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-3">
                      
                      {/* ICON */}
                      <div className="size-12 rounded-xl 
                        bg-violet-500/15 text-violet-400
                        flex items-center justify-center">
                        <LampDesk className="size-6" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h2 className="text-xl font-bold group-hover:text-violet-400 transition">
                            {problem.title}
                          </h2>

                          <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
                            {problem.difficulty}
                          </span>
                        </div>

                        <p className="text-sm text-base-content/60">
                          {problem.category}
                        </p>
                      </div>
                    </div>

                    <p className="text-base-content/80 line-clamp-2">
                      {problem.description.text}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-2 text-violet-400 font-medium">
                    <span>Solve</span>
                    <ChevronRightIcon className="size-5 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* STATS */}
        <div className="mt-14 card bg-base-100/90 backdrop-blur shadow-xl">
          <div className="card-body">
            <div className="stats stats-vertical lg:stats-horizontal">
              <div className="stat">
                <div className="stat-title">Total Problems</div>
                <div className="stat-value text-primary">{problems.length}</div>
              </div>

              <div className="stat">
                <div className="stat-title">Easy</div>
                <div className="stat-value text-success">{easyProblemsCount}</div>
              </div>

              <div className="stat">
                <div className="stat-title">Medium</div>
                <div className="stat-value text-warning">{mediumProblemsCount}</div>
              </div>

              <div className="stat">
                <div className="stat-title">Hard</div>
                <div className="stat-value text-error">{hardProblemsCount}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProblemsPage;