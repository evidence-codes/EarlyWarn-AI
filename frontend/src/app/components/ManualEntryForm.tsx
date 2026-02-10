import React, { useState } from "react";
import axios from "axios";
import { UserPlus, Save, X } from "lucide-react";
import PredictionSuccessModal from "./PredictionSuccessModal";

interface ManualEntryFormProps {
  onStudentAdded?: (student: any) => void;
}

const ManualEntryForm: React.FC<ManualEntryFormProps> = ({
  onStudentAdded,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [predictionData, setPredictionData] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    student_id: "",
    gpa: 3.0,
    attendance_rate: 0.8,
    assignments_completed: 10,
    household_income_bracket: 2,
    parent_education_level: 2,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "name" || name === "student_id" ? value : parseFloat(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create Student
      const createRes = await axios.post("http://localhost:8000/students/", {
        ...formData,
        assignments_completed: parseInt(
          formData.assignments_completed.toString(),
        ),
      });
      const newStudent = createRes.data;

      // 2. Run Prediction
      const predictRes = await axios.post(
        `http://localhost:8000/predict/?student_id=${newStudent.id}`,
      );

      // 3. Combine Data
      const completeStudent = {
        ...newStudent,
        risk_level: predictRes.data.risk_level,
        risk_factors: [], // Backend could return this later, or we derive it
      };

      if (onStudentAdded) {
        onStudentAdded(completeStudent);
      }

      setIsOpen(false);
      // Reset form slightly but keep some defaults
      setFormData((prev) => ({ ...prev, name: "", student_id: "" }));

      // SHOW RESULT MODAL
      setPredictionData(completeStudent);
      setShowResult(true);
    } catch (error) {
      console.error("Error creating student:", error);
      alert("Failed to add student. Ensure ID is unique.");
    } finally {
      setLoading(false);
    }
  };

  if (showResult && predictionData) {
    return (
      <PredictionSuccessModal
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        type="single"
        data={predictionData}
      />
    );
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col items-center justify-center w-full h-full min-h-[150px] p-6 bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-xl hover:bg-indigo-100 hover:border-indigo-300 transition-all group"
      >
        <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
          <UserPlus className="w-6 h-6 text-indigo-600" />
        </div>
        <span className="font-medium text-indigo-900">
          Add Student Manually
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative animate-in zoom-in-95 duration-200 border border-gray-100">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <UserPlus className="w-6 h-6 text-indigo-600" />
          New Student Entry
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                Full Name
              </label>
              <input
                required
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g. Jane Doe"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                Student ID
              </label>
              <input
                required
                name="student_id"
                type="text"
                value={formData.student_id}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g. S123"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                GPA (0-4)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="4"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                Attendance
              </label>
              <input
                type="number"
                step="0.05"
                min="0"
                max="1"
                name="attendance_rate"
                value={formData.attendance_rate}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                Assignments
              </label>
              <input
                type="number"
                min="0"
                name="assignments_completed"
                value={formData.assignments_completed}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 transition-all transform active:scale-95"
            >
              {loading ? (
                "Analyzing Data..."
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" /> Save & Run Prediction
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManualEntryForm;
