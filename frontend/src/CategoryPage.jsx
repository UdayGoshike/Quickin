import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const categoryTitles = {
  entertainment: "Entertainment",
  geopolitics: "Geopolitics",
  science: "Science",
  sports: "Sports",
  others: "Others",
};

export default function CategoryPage() {
  const { categoryName } = useParams();

  const displayTitle =
    categoryTitles[categoryName?.toLowerCase()] || "Category";

  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentArticle = articles[currentIndex];

 useEffect(() => {
  async function fetchNews() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `/api/webhook/6b656bdb-9b09-443c-9b36-ed08ccf3f38b/news/${categoryName}`
      );

      const text = await res.text();
      console.log("raw response:", text);

      if (!text.trim()) {
        throw new Error("Empty response from server");
      }

      const data = JSON.parse(text);
      console.log("news data:", data);

      setArticles(Array.isArray(data.articles) ? data.articles : []);
      setCurrentIndex(0);
    } catch (err) {
      console.error("fetch error:", err);
      setError("Could not load news.");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }

  fetchNews();
}, [categoryName]);
  const handlePrev = () => {
    if (articles.length === 0) return;
    setCurrentIndex((prev) =>
      prev === 0 ? articles.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (articles.length === 0) return;
    setCurrentIndex((prev) =>
      prev === articles.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#f5f6f7] font-sans text-[#2c2f30] antialiased">
      <header className="fixed top-0 z-50 w-full border-b border-[#abadae]/15 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-center px-4 md:px-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black uppercase tracking-tighter text-[#751fe7] md:text-3xl">
              {displayTitle}
            </span>
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#751fe7]" />
          </div>
        </div>
      </header>

      <main className="w-full px-2 pb-4 pt-24 md:px-4 md:pb-6 md:pt-28">
        <div className="mx-auto flex w-full max-w-[1080px] items-center justify-center gap-2">
          <button
            onClick={handlePrev}
            className="group hidden h-14 w-14 shrink-0 self-center rounded-full border border-[#751fe7]/20 bg-white shadow-[0_20px_50px_-12px_rgba(117,31,231,0.12)] transition-all duration-300 hover:bg-[#751fe7] active:scale-90 md:flex md:items-center md:justify-center"
          >
            <span className="text-3xl leading-none text-[#751fe7] transition-colors duration-300 group-hover:text-white">
              ‹
            </span>
          </button>

          <div className="relative flex h-[80vh] w-full flex-col overflow-hidden rounded-[1.75rem] bg-white p-5 pt-10 shadow-[0_20px_50px_-12px_rgba(117,31,231,0.12)] md:h-[80vh] md:rounded-[2.25rem] md:p-6 md:pt-3">
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
              <div className="absolute right-[-10%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-[#751fe7] blur-[120px]" />
              <div className="absolute bottom-[-10%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-[#751fe7] blur-[120px]" />
            </div>

            {loading ? (
              <div className="relative z-10 flex h-full items-center justify-center">
                <p className="text-lg text-slate-500">Loading news...</p>
              </div>
            ) : error ? (
              <div className="relative z-10 flex h-full items-center justify-center">
                <p className="text-lg text-red-500">{error}</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="relative z-10 flex h-full items-center justify-center">
                <p className="text-lg text-slate-500">No articles found.</p>
              </div>
            ) : (
              <>
                <div className="relative z-10 flex flex-1 flex-col justify-between overflow-hidden">
                  <div>
                    {currentArticle.image && (
                      <img
                        src={currentArticle.image}
                        alt={currentArticle.title}
                        className="mb-5 h-44 w-full rounded-[1.5rem] object-cover md:h-52"
                      />
                    )}

                    <h2 className="mb-4 text-2xl font-bold leading-tight text-slate-800 md:text-3xl">
                      {currentArticle.title}
                    </h2>

                    <p className="mb-5 max-w-4xl text-base leading-relaxed text-slate-600 md:text-lg">
                      {currentArticle.summary || "No summary available."}
                    </p>
                  </div>

                  <div>
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500 md:text-base">
                      <span className="font-medium">
                        {currentArticle.source}
                      </span>
                      <span>
                        {currentArticle.publishedAt
                          ? new Date(currentArticle.publishedAt).toLocaleString()
                          : ""}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      {currentArticle.url ? (
                        <a
                          href={currentArticle.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block rounded-full bg-[#751fe7] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 md:text-base"
                        >
                          Read full article
                        </a>
                      ) : (
                        <div />
                      )}

                      <div className="text-sm text-slate-500 md:text-base">
                        {currentIndex + 1} / {articles.length}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-4 flex items-center justify-center gap-4 md:hidden">
                  <button
                    onClick={handlePrev}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-[#751fe7]/20 bg-white shadow-lg transition-all duration-300 hover:bg-[#751fe7] active:scale-95"
                  >
                    <span className="text-2xl text-[#751fe7] transition-colors duration-300 hover:text-white">
                      ‹
                    </span>
                  </button>

                  <button
                    onClick={handleNext}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-[#751fe7]/20 bg-white shadow-lg transition-all duration-300 hover:bg-[#751fe7] active:scale-95"
                  >
                    <span className="text-2xl text-[#751fe7] transition-colors duration-300 hover:text-white">
                      ›
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleNext}
            className="group hidden h-14 w-14 shrink-0 self-center rounded-full border border-[#751fe7]/20 bg-white shadow-[0_20px_50px_-12px_rgba(117,31,231,0.12)] transition-all duration-300 hover:bg-[#751fe7] active:scale-90 md:flex md:items-center md:justify-center"
          >
            <span className="text-3xl leading-none text-[#751fe7] transition-colors duration-300 group-hover:text-white">
              ›
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}