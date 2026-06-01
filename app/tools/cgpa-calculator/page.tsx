"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { courseData } from "@/lib/gpa/course-data"
import { Calculator, BookOpen, GraduationCap, ArrowLeft, Plus, Trash2, HelpCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface CGPACourse {
  id: string
  courseId: string // References standard course id, or "custom"
  customName: string
  credits: number
  gradePoints: number
  gradeCode: string
}

const gradeOptions = [
  { code: "S", points: 10, cutoff: "90", remarks: "---" },
  { code: "A", points: 9, cutoff: "80", remarks: "---" },
  { code: "B", points: 8, cutoff: "70", remarks: "---" },
  { code: "C", points: 7, cutoff: "60", remarks: "---" },
  { code: "D", points: 6, cutoff: "50", remarks: "---" },
  { code: "E", points: 4, cutoff: "40", remarks: "---" },
  { code: "U", points: 0, cutoff: "-", remarks: "---" },
  { code: "P", points: 0, cutoff: "-", remarks: "Pass" },
  { code: "F", points: 0, cutoff: "-", remarks: "Fail" },
  { code: "W", points: 0, cutoff: "-", remarks: "Not eligible for end term" },
  { code: "I", points: 0, cutoff: "-", remarks: "Course incomplete" },
]

export default function CGPACalculator() {
  // Sort courses alphabetically for easy browsing
  const sortedCourses = [...courseData].sort((a, b) => a.name.localeCompare(b.name))

  const [courses, setCourses] = useState<CGPACourse[]>([
    { id: "1", courseId: "", customName: "", credits: 4, gradePoints: 0, gradeCode: "" },
  ])

  // Calculate CGPA
  const totalCredits = courses.reduce((sum, course) => {
    // Only count credits for courses with a selected grade
    if (course.gradeCode) {
      return sum + course.credits
    }
    return sum
  }, 0)

  const totalGradePointsSum = courses.reduce((sum, course) => {
    if (course.gradeCode) {
      return sum + (course.credits * course.gradePoints)
    }
    return sum
  }, 0)

  const cgpa = totalCredits > 0 ? totalGradePointsSum / totalCredits : null

  // Count cleared courses (Passed / Cleared means S, A, B, C, D, E, or P)
  const clearedCredits = courses.reduce((sum, course) => {
    const passedGrades = ["S", "A", "B", "C", "D", "E", "P"]
    if (course.gradeCode && passedGrades.includes(course.gradeCode)) {
      return sum + course.credits
    }
    return sum
  }, 0)

  const addCourseRow = () => {
    setCourses([
      ...courses,
      {
        id: Date.now().toString(),
        courseId: "",
        customName: "",
        credits: 4,
        gradePoints: 0,
        gradeCode: "",
      },
    ])
  }

  const removeCourseRow = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter((c) => c.id !== id))
    }
  }

  const updateCourseRow = (id: string, field: keyof CGPACourse, value: any) => {
    setCourses(
      courses.map((c) => {
        if (c.id === id) {
          const updated = { ...c, [field]: value }

          // If standard course is selected, auto-populate credits and default fields
          if (field === "courseId" && value !== "custom") {
            const standardCourse = sortedCourses.find((course) => course.id === value)
            if (standardCourse) {
              updated.customName = standardCourse.name
              // Standard credits in BS is usually 4, unless it's a lab which can be 1 or 2
              const isLab = standardCourse.name.toLowerCase().includes("lab") || standardCourse.name.toLowerCase().includes("project")
              updated.credits = isLab ? 2 : 4
            }
          }
          
          if (field === "gradeCode") {
            const gradeObj = gradeOptions.find((g) => g.code === value)
            updated.gradePoints = gradeObj ? gradeObj.points : 0
          }

          return updated
        }
        return c
      })
    )
  }

  const resetAll = () => {
    setCourses([
      { id: "1", courseId: "", customName: "", credits: 4, gradePoints: 0, gradeCode: "" },
    ])
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 py-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Background glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/tools"
            className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Tools
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              CGPA <span className="text-primary">Calculator</span>
            </h1>
            <p className="text-white/70 text-lg">Calculate your Cumulative Grade Point Average across all semesters</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-8">
            {/* CGPA Calculation Form (Left 2 Columns) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Dynamic Formula Display Card */}
              <div className="glass rounded-xl p-6 sm:p-8 border border-primary/20 shadow-[0_0_15px_rgba(212,175,55,0.1)] bg-black/20 backdrop-blur-sm relative overflow-hidden group">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-6 h-6 text-primary animate-pulse" />
                  <h3 className="text-white font-semibold text-lg">Mathematical Formula</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-1 bg-black/50 p-6 rounded-xl border border-primary/20 flex flex-col items-center justify-center min-h-[120px] shadow-inner text-center">
                    <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-3">Formula</p>
                    <div className="flex flex-col items-center text-white">
                      <span className="text-sm font-semibold mb-1">CGPA =</span>
                      <div className="flex flex-col items-center">
                        <span className="border-b border-white px-3 pb-1 font-mono text-sm">Σ (C_i × GP_i)</span>
                        <span className="pt-1 font-mono text-sm">Σ C_i</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-3 text-white/70 text-sm leading-relaxed">
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-bold">C_i</span>
                      <span>is the credit of the course</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-bold">GP_i</span>
                      <span>is the grade point for that course, and</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-bold">Σ_i</span>
                      <span>is the sum over all registered courses successfully cleared during all the terms.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6 sm:p-8 border border-primary/20 shadow-[0_0_15px_rgba(212,175,55,0.1)] bg-black/20 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-semibold text-xl flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    Semester Courses
                  </h3>
                  <button
                    onClick={addCourseRow}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-lg transition-colors font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    Add Course
                  </button>
                </div>

                <div className="space-y-4">
                  {courses.map((course, index) => (
                    <div
                      key={course.id}
                      className="bg-black/40 rounded-xl p-4 border border-primary/10 shadow-inner group hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                        {/* Dropdown / Course Name */}
                        <div className="md:col-span-6">
                          <label className="block text-white/60 text-xs mb-2 uppercase tracking-widest font-bold">
                            Course name (Select or Custom)
                          </label>
                          <div className="flex flex-col gap-2">
                            <select
                              value={course.courseId}
                              onChange={(e) => updateCourseRow(course.id, "courseId", e.target.value)}
                              className="w-full p-3 rounded-lg bg-black border border-primary/20 text-white focus:outline-none focus:border-primary transition-all cursor-pointer shadow-inner appearance-none"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d4af37'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.75rem center',
                                backgroundSize: '1.25rem',
                              }}
                            >
                              <option value="" style={{backgroundColor: "#000", color: "#fff"}}>-- Select Standard Course --</option>
                              <option value="custom" style={{backgroundColor: "#000", color: "#fff"}}>-- Enter Custom Course Name --</option>
                              {sortedCourses.map((c) => (
                                <option key={c.id} value={c.id} style={{backgroundColor: "#000", color: "#fff"}}>
                                  {c.name} ({c.degree === "data-science" ? "DS" : "ES"} • {c.level})
                                </option>
                              ))}
                            </select>
                            
                            {course.courseId === "custom" && (
                              <input
                                type="text"
                                value={course.customName}
                                onChange={(e) => updateCourseRow(course.id, "customName", e.target.value)}
                                placeholder="Enter Custom Course Name"
                                className="w-full p-3 rounded-lg bg-black/40 border border-primary/20 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-all shadow-inner"
                              />
                            )}
                          </div>
                        </div>

                        {/* Credits */}
                        <div className="md:col-span-2">
                          <label className="block text-white/60 text-xs mb-2 uppercase tracking-widest font-bold">
                            Credits
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="8"
                            value={course.credits}
                            onChange={(e) => updateCourseRow(course.id, "credits", parseInt(e.target.value) || 1)}
                            className="w-full p-3 rounded-lg bg-black border border-primary/20 text-white focus:outline-none focus:border-primary transition-all shadow-inner text-center font-bold"
                          />
                        </div>

                        {/* Grade Dropdown */}
                        <div className="md:col-span-3">
                          <label className="block text-white/60 text-xs mb-2 uppercase tracking-widest font-bold">
                            Grade
                          </label>
                          <select
                            value={course.gradeCode}
                            onChange={(e) => updateCourseRow(course.id, "gradeCode", e.target.value)}
                            className="w-full p-3 rounded-lg bg-black border border-primary/20 text-white focus:outline-none focus:border-primary transition-all cursor-pointer shadow-inner appearance-none"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d4af37'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'right 0.75rem center',
                              backgroundSize: '1.25rem',
                            }}
                          >
                            <option value="" style={{backgroundColor: "#000", color: "#fff"}}>Select Grade</option>
                            {gradeOptions.map((g) => (
                              <option key={g.code} value={g.code} style={{backgroundColor: "#000", color: "#fff"}}>
                                {g.code} ({g.points > 0 ? `${g.points} pts` : "0 pts"})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Delete Button */}
                        <div className="md:col-span-1 flex justify-end">
                          <button
                            onClick={() => removeCourseRow(course.id)}
                            disabled={courses.length === 1}
                            className="p-3 rounded-lg bg-red-500/10 hover:bg-red-500/35 border border-red-500/20 text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                            title="Remove Course"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-primary/10">
                  <button
                    onClick={resetAll}
                    className="px-6 py-3 rounded-lg border border-primary/30 text-white hover:border-primary transition-all duration-300 font-semibold"
                  >
                    Reset All
                  </button>
                </div>
              </div>
            </div>

            {/* Results Sidebar and Grade Reference (Right 1 Column) */}
            <div className="space-y-6">
              {/* CGPA Calculation Results Card */}
              <div className="relative glass rounded-2xl p-6 border-2 border-primary/40 shadow-[0_0_30px_rgba(212,175,55,0.25)] overflow-hidden bg-black/30 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-2xl -z-10"></div>
                <h3 className="text-white font-semibold text-xl mb-6 text-center">Your Academic Standing</h3>
                
                <div className="text-center mb-6">
                  <div className="inline-block bg-gradient-to-br from-primary/20 to-primary/5 p-6 rounded-2xl border border-primary/30 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    <p className="text-6xl font-black text-primary mb-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                      {cgpa !== null ? cgpa.toFixed(2) : "---"}
                    </p>
                    <p className="text-white/60 text-xs uppercase tracking-widest font-semibold">Cumulative GPA</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-primary/20">
                  <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg border border-primary/10">
                    <span className="text-white/60 text-sm">Total Credits</span>
                    <span className="text-white font-bold">{totalCredits}</span>
                  </div>
                  <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg border border-primary/10">
                    <span className="text-white/60 text-sm">Cleared Credits</span>
                    <span className="text-white font-bold text-primary">{clearedCredits}</span>
                  </div>
                  <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg border border-primary/10">
                    <span className="text-white/60 text-sm">Standing</span>
                    <span className="text-primary font-bold">
                      {cgpa === null
                        ? "No Data Entered"
                        : cgpa >= 9
                        ? "Distinguished (S/A)"
                        : cgpa >= 8
                        ? "Very Good"
                        : cgpa >= 7
                        ? "Good"
                        : cgpa >= 5
                        ? "Satisfactory"
                        : "Needs Improvement"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grade points Reference Table */}
              <div className="glass rounded-xl p-6 border border-primary/20 shadow-[0_0_15px_rgba(212,175,55,0.1)] bg-black/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5 text-primary animate-pulse" />
                  <h3 className="text-white font-semibold text-base">Grade Points Reference</h3>
                </div>

                <div className="overflow-x-auto max-h-[300px] overflow-y-auto pr-1 shadow-inner scrollbar-thin">
                  <table className="w-full text-xs text-left text-white/80">
                    <thead className="text-[10px] text-primary uppercase tracking-wider border-b border-primary/20 bg-black/40">
                      <tr>
                        <th className="px-3 py-2">Code</th>
                        <th className="px-3 py-2 text-center">Points</th>
                        <th className="px-3 py-2 text-center">Cut-off</th>
                        <th className="px-3 py-2">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {gradeOptions.map((g) => (
                        <tr key={g.code} className="hover:bg-primary/5 transition-colors">
                          <td className="px-3 py-1.5 font-bold text-white">{g.code}</td>
                          <td className="px-3 py-1.5 text-center font-semibold text-primary">{g.points}</td>
                          <td className="px-3 py-1.5 text-center text-white/50">{g.cutoff}</td>
                          <td className="px-3 py-1.5 text-white/60 italic truncate max-w-[120px]" title={g.remarks}>
                            {g.remarks}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
