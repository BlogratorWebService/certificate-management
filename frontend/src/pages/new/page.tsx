import type React from "react";
import { useState } from "react";
import NewStudentContainer from "@/pages/new/pageContainer";
import { createStudent } from "@/services/apiServices";

interface FormDataType {
  name: string;
  registrationNumber: string;
  courseName: string;
  startDate: string;
  endDate: string;
  certificateFile: File | null;
  marksheetFile: File | null;
  studentPicFile: File | null;
}

export default function NewStudent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    registrationNumber: "",
    courseName: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    certificateFile: null,
    marksheetFile: null,
    studentPicFile: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("registrationNumber", formData.registrationNumber);
    formPayload.append("courseName", formData.courseName);
    formPayload.append("startDate", formData.startDate);
    formPayload.append("endDate", formData.endDate);

    if (formData.certificateFile) {
      formPayload.append("certificateFile", formData.certificateFile);
    }
    if (formData.marksheetFile) {
      formPayload.append("marksheetFile", formData.marksheetFile);
    }
    if (formData.studentPicFile) {
      formPayload.append("studentPicFile", formData.studentPicFile);
    }

    try {
      const res = await createStudent(formPayload);
      console.log("Student created successfully:", res.data.data);
      setSuccess(true);

    } catch (err : any) {
      console.error("Submission error:", err);
      setError(err.response?.data?.message || "An error occurred please check your network connection and try again");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <NewStudentContainer
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
      loading={loading}
      error={error}
      success={success}
    />
  );
}
