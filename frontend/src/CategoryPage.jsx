import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

const categoryTitles = {
  entertainment: "Entertainment",
  health: "Health",
  science: "Science",
  sports: "Sports",
  business: "Business",
};

export default function CategoryPage() {
  const { categoryName } = useParams();

  const displayTitle =
    categoryTitles[categoryName?.toLowerCase()] || "Category";

  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const currentArticle = articles[currentIndex];

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `/api/webhook/6b656bdb-9b09-443c-9b36-ed08ccf3f38b/news/${categoryName}?t=${Date.now()}`
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
  }, [categoryName, refreshKey]);
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
    <div className="min-h-screen w-full bg-[#111111] font-sans text-[#2c2f30] antialiased">
      <Header />


      <main className="w-full px-1 pb-4 pt-28 md:px-3 md:pb-6 md:pt-32">
        <div className="mx-auto flex w-full max-w-[1500px] items-center justify-center gap-2">
          <button
            onClick={handlePrev}
            className="group hidden h-14 w-14 shrink-0 self-center rounded-full border border-[#751fe7]/20 bg-white shadow-[0_20px_50px_-12px_rgba(117,31,231,0.12)] transition-all duration-300 hover:bg-[#751fe7] active:scale-90 md:flex md:items-center md:justify-center"
          >
            <span className="text-3xl leading-none text-[#751fe7] transition-colors duration-300 group-hover:text-white">
              ‹
            </span>
          </button>

          <div className="relative flex min-h-[90vh] w-full flex-col overflow-hidden rounded-[1.75rem] bg-[#111111] p-8 md:min-h-[92vh] md:rounded-[2.25rem] md:p-10">


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
                <div className="relative z-10 grid flex-1 grid-cols-1 gap-10 overflow-hidden md:grid-cols-[1.1fr_0.9fr]">

                  {/* LEFT SIDE */}
                  <div className="flex flex-col  ">

                    <div>
                      <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl">
                        {currentArticle.title}
                      </h2>

                      <div className="mb-6 max-w-4xl space-y-4 text-lg leading-9 text-slate-300">
                        {(currentArticle.content || currentArticle.summary || "")
                          .split("\n")
                          .map((para, index) => (
                            <p key={index}>{para}</p>
                          ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-slate-500 md:text-base">
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
                            className="inline-block rounded-full bg-[#751fe7] px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90 md:text-base"
                          >
                            Read Full Article
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

                  {/* RIGHT SIDE */}
                  <div className="flex items-start justify-center">
                    {currentArticle.image && (
                      <img
                        src={currentArticle.image}
                        alt={currentArticle.title}
                        className="max-h-[80vh] w-full rounded-[1.5rem] object-contain"
                      />
                    )}
                  </div>

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