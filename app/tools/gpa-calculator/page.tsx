"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { courseData } from "@/lib/gpa/course-data"
import { calculateScore } from "@/lib/gpa/calculate-score"
import { assignGrade } from "@/lib/gpa/grade-utils"
import type { Course } from "@/lib/gpa/types"
import { Calculator, BookOpen, GraduationCap, ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function GPACalculator() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedDegree, setSelectedDegree] = useState<"data-science" | "electronic-systems" | "">("")
  const [selectedLevel, setSelectedLevel] = useState<"foundation" | "diploma" | "degree" | "">("")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [formValues, setFormValues] = useState<Record<string, number>>({})
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null)
  const [calculatedGrade, setCalculatedGrade] = useState<string | null>(null)

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true'
    setIsAuthenticated(authStatus)
    if (!authStatus) {
      router.push('/signin')
    }
  }, [router])

  // Filter courses based on degree and level
  const availableLevels = selectedDegree
    ? Array.from(new Set(courseData.filter((c) => c.degree === selectedDegree).map((c) => c.level)))
    : []

  const availableCourses =
    selectedDegree && selectedLevel
      ? courseData.filter((c) => c.degree === selectedDegree && c.level === selectedLevel)
      : []

  const handleDegreeChange = (degree: "data-science" | "electronic-systems") => {
    setSelectedDegree(degree)
    setSelectedLevel("")
    setSelectedCourse(null)
    setFormValues({})
    setCalculatedScore(null)
    setCalculatedGrade(null)
  }

  const handleLevelChange = (level: "foundation" | "diploma" | "degree") => {
    setSelectedLevel(level)
    setSelectedCourse(null)
    setFormValues({})
    setCalculatedScore(null)
    setCalculatedGrade(null)
  }

  const handleCourseChange = (courseId: string) => {
    const course = availableCourses.find((c) => c.id === courseId)
    setSelectedCourse(course || null)
    setFormValues({})
    setCalculatedScore(null)
    setCalculatedGrade(null)
  }

  const handleInputChange = (fieldId: string, value: string) => {
    const numValue = parseFloat(value) || 0
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: numValue,
    }))
  }

  const handleCalculate = () => {
    if (!selectedCourse) return

    try {
      const score = calculateScore(selectedCourse.id, formValues)
      const grade = assignGrade(score)
      setCalculatedScore(score)
      setCalculatedGrade(grade)
    } catch (error) {
      console.error("Error calculating score:", error)
      alert("Error calculating score. Please check your inputs.")
    }
  }

  const handleReset = () => {
    setFormValues({})
    setCalculatedScore(null)
    setCalculatedGrade(null)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Navbar />
      <div className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        {/* Background animations */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20"></div>
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
              GPA <span className="text-primary">Calculator</span>
            </h1>
            <p className="text-white/70 text-lg">Calculate your course scores and grades</p>
          </div>

          {/* Degree Selection */}
          <div className="glass-dark rounded-xl p-6 border border-primary/30 mb-6">
            <label className="block text-white font-semibold mb-3 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-primary" />
              Select Degree Program
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleDegreeChange("data-science")}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedDegree === "data-science"
                    ? "border-primary bg-primary/10 text-white"
                    : "border-primary/30 bg-black/30 text-white/70 hover:border-primary/50"
                }`}
              >
                <span className="font-semibold">Data Science & Applications</span>
              </button>
              <button
                onClick={() => handleDegreeChange("electronic-systems")}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedDegree === "electronic-systems"
                    ? "border-primary bg-primary/10 text-white"
                    : "border-primary/30 bg-black/30 text-white/70 hover:border-primary/50"
                }`}
              >
                <span className="font-semibold">Electronic Systems</span>
              </button>
            </div>
          </div>

          {/* Level Selection */}
          {selectedDegree && (
            <div className="glass-dark rounded-xl p-6 border border-primary/30 mb-6">
              <label className="block text-white font-semibold mb-3 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-primary" />
                Select Course Level
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {availableLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => handleLevelChange(level)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      selectedLevel === level
                        ? "border-primary bg-primary/10 text-white"
                        : "border-primary/30 bg-black/30 text-white/70 hover:border-primary/50"
                    }`}
                  >
                    <span className="font-semibold capitalize">{level}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Course Selection */}
          {selectedLevel && availableCourses.length > 0 && (
            <div className="glass-dark rounded-xl p-6 border border-primary/30 mb-6">
              <label className="block text-white font-semibold mb-3">Select Course</label>
              <select
                value={selectedCourse?.id || ""}
                onChange={(e) => handleCourseChange(e.target.value)}
                className="w-full p-3 rounded-lg bg-black border border-primary/30 text-white focus:outline-none focus:border-primary"
              >
                <option value="">Choose a course...</option>
                {availableCourses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Course Formula & Input Fields */}
          {selectedCourse && (
            <>
              {/* Formula Display */}
              <div className="glass-dark rounded-xl p-6 border border-primary/30 mb-6">
                <h3 className="text-white font-semibold mb-2">Grading Formula</h3>
                <p className="text-primary font-mono text-sm break-all">{selectedCourse.formula}</p>
              </div>

              {/* Input Fields */}
              <div className="glass-dark rounded-xl p-6 border border-primary/30 mb-6">
                <h3 className="text-white font-semibold mb-4">Enter Your Scores</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCourse.formFields.map((field) => (
                    <div key={field.id}>
                      <label className="block text-white/90 mb-2">
                        {field.label}
                        <span className="text-white/50 text-sm ml-2">({field.description})</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={field.max}
                        value={formValues[field.id] || ""}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={`Max: ${field.max}`}
                        className="w-full p-3 rounded-lg bg-black border border-primary/30 text-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleCalculate}
                  className="flex-1 bg-primary hover:bg-primary/90 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Calculate Score
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-lg border border-primary/30 text-white hover:border-primary transition-all duration-300"
                >
                  Reset
                </button>
              </div>

              {/* Results */}
              {calculatedScore !== null && calculatedGrade !== null && (
                <div className="glass-dark rounded-xl p-8 border border-primary/30">
                  <h3 className="text-white font-semibold text-xl mb-4 text-center">Your Results</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <p className="text-white/70 mb-2">Total Score</p>
                      <p className="text-5xl font-bold text-primary">{calculatedScore.toFixed(2)}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/70 mb-2">Grade</p>
                      <p className="text-5xl font-bold text-primary">{calculatedGrade}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
