import React from "react";
import "./App.css";
import "./Quickincss.css";
import quickinLogo from "./assets/quickin-logo.png";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const categories = [
  {
    title: "Entertainment",
    subtitle: "Hollywood, Music & Streaming",
    emoji: "🎬",
    slug: "entertainment",
  },
  {
    title: "Health",
    subtitle: "Medicine, Wellness & Research",
    emoji: "🩺",
    slug: "health",
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
    title: "Business",
    subtitle: "Markets, Startups & Economy",
    emoji: "💼",
    slug: "business",
  },
];

function CategoryCard({ item, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full cursor-pointer items-center justify-between rounded-[18px] border border-white/10 bg-[#e8e6eb] p-5 text-left shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#f3f1f6]"
    >
      <div>
        <h3 className="text-lg font-bold">{item.title}</h3>
        <p className="text-xs text-slate-800 transition-colors duration-300 g ">
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
    <div className="min-h-screen bg-[#111111] pt-28 text-slate-800">
      <Header />

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
              <span className="text-[#f4effa]"> The more you </span> <br />
              <span className="italic text-[#7c3aed]">Explore,</span> <br />
              <span className="text-[#f4effa]">the more you </span><br />
              <span className="italic text-[#7c3aed]">Discover</span>
            </h1>

            <p className="mt-6 max-w-md text-lg text-slate-600">
              Curated insights across technology, health, business, and culture.
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