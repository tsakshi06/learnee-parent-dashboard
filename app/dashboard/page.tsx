"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { courses } from "@/lib/courses";

const COURSES_PER_PAGE = 6;

export default function CoursesPage() {
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";

  const [search, setSearch] = useState(initialSearch);
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState("5000");
  const [minRating, setMinRating] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCourses = useMemo(() => {
    let result = courses.filter((course) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        course.title.toLowerCase().includes(searchText) ||
        course.subject.toLowerCase().includes(searchText) ||
        course.teacher.toLowerCase().includes(searchText);

      const matchesGrade = !grade || course.grade === grade;
      const matchesSubject = !subject || course.subject === subject;
      const matchesPrice = course.price <= Number(maxPrice);
      const matchesRating =
        !minRating || course.rating >= Number(minRating);

      return (
        matchesSearch &&
        matchesGrade &&
        matchesSubject &&
        matchesPrice &&
        matchesRating
      );
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, grade, subject, maxPrice, minRating, sortBy]);

  const totalPages = Math.ceil(
    filteredCourses.length / COURSES_PER_PAGE
  );

  const visibleCourses = filteredCourses.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );

  function resetFilters() {
    setSearch("");
    setGrade("");
    setSubject("");
    setMaxPrice("5000");
    setMinRating("");
    setSortBy("relevance");
    setCurrentPage(1);
  }

  function updateFilter(
    setter: (value: string) => void,
    value: string
  ) {
    setter(value);
    setCurrentPage(1);
  }

  return (
    <main className="min-h-screen bg-[#f6f8fc]">

      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          <a
            href="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white shadow-sm">
              L
            </div>

            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Learniee
              </span>

              <p className="hidden text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:block">
                Learn. Grow. Succeed.
              </p>
            </div>
          </a>

          <a
            href="/dashboard"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <span>←</span>
            <span className="hidden sm:inline">
              Back to Dashboard
            </span>
            <span className="sm:hidden">
              Back
            </span>
          </a>

        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">

          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-50 backdrop-blur">
              <span>✨</span>
              Course Discovery
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Find the perfect course
              <span className="block text-blue-200">
                for your child.
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
              Explore quality courses from trusted teachers.
              Filter by grade, subject, budget and ratings to find
              the right learning experience.
            </p>
          </div>

          {/* SEARCH */}
          <div className="mt-8 max-w-4xl rounded-2xl bg-white p-2 shadow-2xl">
            <div className="flex flex-col gap-2 sm:flex-row">

              <div className="flex flex-1 items-center rounded-xl bg-slate-50 px-4 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500">
                <svg
                  className="mr-3 h-5 w-5 shrink-0 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                  />
                </svg>

                <input
                  value={search}
                  onChange={(e) =>
                    updateFilter(setSearch, e.target.value)
                  }
                  placeholder="Search courses, subjects or teachers..."
                  className="w-full bg-transparent py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>

              <button
                onClick={resetFilters}
                className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
              >
                Reset
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        <div className="grid gap-7 lg:grid-cols-[270px_1fr]">

          {/* FILTER SIDEBAR */}
          <aside className="h-fit overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 bg-slate-50/70 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Filters
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Refine your search
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  ⚙
                </div>
              </div>
            </div>

            <div className="p-5">

              {/* GRADE */}
              <div className="border-b border-slate-100 pb-5">
                <label className="mb-3 block text-sm font-bold text-slate-800">
                  Grade
                </label>

                <select
                  value={grade}
                  onChange={(e) =>
                    updateFilter(setGrade, e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                >
                  <option value="">All grades</option>
                  <option value="Grade 3-5">Grade 3-5</option>
                  <option value="Grade 6-8">Grade 6-8</option>
                  <option value="Grade 9-12">Grade 9-12</option>
                </select>
              </div>

              {/* SUBJECT */}
              <div className="border-b border-slate-100 py-5">
                <label className="mb-3 block text-sm font-bold text-slate-800">
                  Subject
                </label>

                <select
                  value={subject}
                  onChange={(e) =>
                    updateFilter(setSubject, e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                >
                  <option value="">All subjects</option>
                  <option value="Coding">Coding</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="Arts">Arts</option>
                  <option value="Music">Music</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              {/* PRICE */}
              <div className="border-b border-slate-100 py-5">
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-800">
                    Maximum price
                  </label>

                  <span className="rounded-lg bg-blue-50 px-2 py-1 text-xs font-bold text-blue-600">
                    ₹{Number(maxPrice).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-xs text-slate-400">
                  <span>₹500</span>
                  <span>₹5,000</span>
                </div>

                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) =>
                    updateFilter(setMaxPrice, e.target.value)
                  }
                  className="mt-3 w-full accent-blue-600"
                />
              </div>

              {/* RATING */}
              <div className="pt-5">
                <label className="mb-3 block text-sm font-bold text-slate-800">
                  Teacher rating
                </label>

                <select
                  value={minRating}
                  onChange={(e) =>
                    updateFilter(setMinRating, e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                >
                  <option value="">Any rating</option>
                  <option value="4.5">4.5+ ⭐</option>
                  <option value="4.7">4.7+ ⭐</option>
                  <option value="4.8">4.8+ ⭐</option>
                  <option value="4.9">4.9+ ⭐</option>
                </select>
              </div>

              <button
                onClick={resetFilters}
                className="mt-6 w-full rounded-xl border border-blue-100 bg-blue-50 py-3 text-sm font-bold text-blue-600 transition hover:bg-blue-100"
              >
                Clear all filters
              </button>

            </div>
          </aside>

          {/* RESULTS */}
          <section>

            {/* RESULTS HEADER */}
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  <span className="font-bold text-slate-900">
                    {filteredCourses.length}
                  </span>{" "}
                  courses available
                </p>

                {(search || grade || subject || minRating) && (
                  <p className="mt-1 text-xs text-slate-400">
                    Showing results based on your filters
                  </p>
                )}
              </div>

              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm outline-none transition focus:border-blue-500"
              >
                <option value="relevance">
                  Sort: Relevance
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="rating">
                  Rating: Highest First
                </option>
              </select>

            </div>

            {/* NO RESULTS */}
            {visibleCourses.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl">
                  🔎
                </div>

                <h2 className="mt-6 text-xl font-bold text-slate-900">
                  No courses found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  We couldn't find courses matching your current
                  search and filters. Try adjusting your preferences.
                </p>

                <button
                  onClick={resetFilters}
                  className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
                >
                  Clear filters
                </button>

              </div>
            )}

            {/* COURSE GRID */}
            {visibleCourses.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2">

                {visibleCourses.map((course) => (
                  <article
                    key={course.id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl"
                  >

                    {/* COURSE IMAGE / ICON */}
                    <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">

                      <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-600 shadow-sm">
                        {course.mode}
                      </div>

                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-5xl shadow-lg transition duration-300 group-hover:scale-110">
                        {course.icon}
                      </div>

                    </div>

                    {/* COURSE CONTENT */}
                    <div className="p-5">

                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                          {course.subject}
                        </span>

                        <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                          ⭐ {course.rating}
                        </div>
                      </div>

                      <h3 className="mt-4 line-clamp-1 text-lg font-bold text-slate-900">
                        {course.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                        {course.description}
                      </p>

                      {/* TEACHER */}
                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-sm font-bold text-white">
                          {course.teacher.charAt(0)}
                        </div>

                        <div>
                          <p className="text-xs text-slate-400">
                            Instructor
                          </p>

                          <p className="text-sm font-semibold text-slate-700">
                            {course.teacher}
                          </p>
                        </div>

                        <span className="ml-auto text-xs text-slate-400">
                          {course.reviews} reviews
                        </span>
                      </div>

                      {/* DETAILS */}
                      <div className="mt-4 grid grid-cols-2 gap-2">

                        <div className="rounded-xl bg-slate-50 p-3">
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Grade
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-700">
                            {course.grade}
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-3">
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Duration
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-700">
                            {course.duration}
                          </p>
                        </div>

                      </div>

                      {/* FOOTER */}
                      <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">

                        <div>
                          <p className="text-xs text-slate-400">
                            Course fee
                          </p>

                          <p className="mt-1 text-xl font-bold text-slate-900">
                            ₹{course.price.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-100 transition hover:bg-blue-700 hover:shadow-lg">
                          View Course
                        </button>

                      </div>

                    </div>
                  </article>
                ))}

              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">

                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => page - 1)
                  }
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ← Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-10 w-10 rounded-xl text-sm font-bold transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => page + 1)
                  }
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next →
                </button>

              </div>
            )}

          </section>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-8 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-6 text-center sm:px-8">
          <p className="text-xs text-slate-400">
            © 2026 Learniee. Find the right learning experience
            for your child.
          </p>
        </div>
      </footer>

    </main>
  );
}