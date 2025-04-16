import type React from "react"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Subject {
  id: string
  name: string
  marks: string
}

export default function Dashboard() {
  const [studentName, setStudentName] = useState("")
  const [certificateNumber, setCertificateNumber] = useState("")
  const [courseName, setCourseName] = useState("")
  const [subjects, setSubjects] = useState<Subject[]>([{ id: "1", name: "", marks: "" }])

  const addSubject = () => {
    setSubjects([...subjects, { id: Date.now().toString(), name: "", marks: "" }])
  }

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((subject) => subject.id !== id))
    }
  }

  const updateSubject = (id: string, field: "name" | "marks", value: string) => {
    setSubjects(subjects.map((subject) => (subject.id === id ? { ...subject, [field]: value } : subject)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      studentName,
      certificateNumber,
      courseName,
      subjects,
    })
    alert("Certificate created successfully!")
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Certificate</CardTitle>
          <CardDescription>Fill in the details to generate a new certificate</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input
                    id="studentName"
                    placeholder="Enter student's full name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificateNumber">Certificate Number</Label>
                  <Input
                    id="certificateNumber"
                    placeholder="Enter certificate number"
                    value={certificateNumber}
                    onChange={(e) => setCertificateNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseName">Course Name</Label>
                <Input
                  id="courseName"
                  placeholder="Enter course name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Subjects and Marks</h3>
                <Button type="button" variant="outline" size="sm" onClick={addSubject}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subject
                </Button>
              </div>

              {subjects.map((subject, index) => (
                <div key={subject.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <div className="md:col-span-7 space-y-2">
                    <Label htmlFor={`subject-${subject.id}`}>Subject Name</Label>
                    <Input
                      id={`subject-${subject.id}`}
                      placeholder="Enter subject name"
                      value={subject.name}
                      onChange={(e) => updateSubject(subject.id, "name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <Label htmlFor={`marks-${subject.id}`}>Marks</Label>
                    <Input
                      id={`marks-${subject.id}`}
                      placeholder="Enter marks"
                      value={subject.marks}
                      onChange={(e) => updateSubject(subject.id, "marks", e.target.value)}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSubject(subject.id)}
                      disabled={subjects.length === 1}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full mt-5">
              Create Certificate
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
