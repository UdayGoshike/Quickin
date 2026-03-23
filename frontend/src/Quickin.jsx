import React from "react";
import "./App.css";
import "./Quickincss.css";
import quickinLogo from "./assets/quickin-logo.png";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Entertainment",
    subtitle: "Hollywood, Music & Streaming",
    emoji: "🎬",
    slug: "entertainment",
  },
  {
    title: "Geopolitics",
    subtitle: "Global Relations & Economy",
    emoji: "🌍",
    slug: "geopolitics",
  },
  {
    title: "Science",
    subtitle: "Space, Tech & Innovation",
    emoji: "🔬",
    slug: "science",
  },
  {
    title: "Sports",
    subtitle: "Leagues, Scores & Analysis",
    emoji: "🏆",
    slug: "sports",
  },
  {
    title: "Others",
    subtitle: "Explore more categories",
    emoji: "⋯",
    slug: "others",
  },
];

function CategoryCard({ item, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full cursor-pointer items-center justify-between rounded-[8px] border border-slate-100 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:translate-x-1 hover:bg-[#7c3aed] hover:text-white"
    >
      <div>
        <h3 className="text-lg font-bold">{item.title}</h3>
        <p className="text-xs text-slate-500 transition-colors duration-300 group-hover:text-[#ede9fe]">
          {item.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xl">{item.emoji}</span>
        <span className="material-symbols-outlined text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
         
        </span>
      </div>
    </button>
  );
}

export default function Quickin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <header className="mx-auto flex w-full max-w-7xl items-center px-0 py-0">
        <img
          src={quickinLogo}
          alt="Quickin logo"
          className="h-20 w-auto object-contain"
        />
      </header>

      <main className="mx-auto w-full max-w-[1100px] px-6 pb-12">
        <section className="grid grid-cols-1 items-center gap-12 py-8 lg:grid-cols-2">
          <div className="space-y-6">
            <h1
              className="tracking-tighter text-slate-900"
              style={{
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 700,
                lineHeight: 1.08,
                fontSize: "clamp(3rem, 5vw, 6.5rem)",
              }}
            >
              The more you <br />
              <span className="italic text-[#7c3aed]">Explore,</span> <br />
              the more you <br />
              <span className="italic text-[#7c3aed]">Discover</span>
            </h1>

            <p className="mt-6 max-w-md text-lg text-slate-600">
              Curated insights across technology, global affairs, and culture.
              Stay ahead with Quickin.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {categories.map((item) => (
              <CategoryCard
                key={item.slug}
                item={item}
                onClick={() => navigate(`/category/${item.slug}`)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}