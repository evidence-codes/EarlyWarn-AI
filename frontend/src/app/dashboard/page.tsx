"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentTable from "../components/StudentTable";
import { PerformanceChart } from "../components/AnalyticsCharts";
import SimulationPanel from "../components/SimulationPanel";
import DataUpload from "../components/DataUpload";
import ModelMetrics from "../components/ModelMetrics";
import ManualEntryForm from "../components/ManualEntryForm";

const API_URL = "http://localhost:8000"; // Should be env var

export default function Dashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      try {
        const response = await axios.get(`${API_URL}/students`);
        if (response.data) {
          setStudents(response.data);
        }
      } catch (e) {
        console.error("Backend unreachable:", e);
        // No mock fallback
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePredict = async (studentId: number) => {
    try {
      try {
        const response = await axios.post(
          `${API_URL}/predict?student_id=${studentId}`,
        );
        const updatedStudents = students.map((s) =>
          s.id === studentId
            ? { ...s, risk_level: response.data.risk_level }
            : s,
        );
        setStudents(updatedStudents);
      } catch (e) {
        console.error("Prediction failed:", e);
        alert("Prediction failed. Ensure backend is running.");
      }
    } catch (error) {
      console.error("Error predicting:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar is already in layout.tsx */}

      <div className="py-10">
        <header className="mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Monitor student performance and risk levels in real-time.
            </p>
          </div>
        </header>

        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Optimization: Real-time Model Metrics */}
            <section>
              <ModelMetrics />
            </section>

            {/* Quick Actions / Upload */}
            {/* Class Performance Section */}
            <section>
              <div className="bg-white overflow-hidden shadow-sm border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Class Performance
                </h3>
                <div className="h-[350px] w-full">
                  <PerformanceChart data={students} />
                </div>
              </div>
            </section>

            {/* Data Entry Section */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Data Upload */}
                <div className="h-full">
                  <DataUpload
                    onDataLoaded={(newData) => {
                      setStudents((prev) => [...prev, ...newData]);
                    }}
                  />
                </div>

                {/* Manual Entry */}
                <div className="h-full">
                  <ManualEntryForm
                    onStudentAdded={(newStudent: any) => {
                      setStudents((prev) => [...prev, newStudent]);
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Simulation Panel */}
            <section>
              <SimulationPanel />
            </section>

            {/* Student Table */}
            <section>
              <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg leading-6 font-semibold text-gray-900">
                      Student Risk Assessment
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Overview of student performance and predicted risk levels
                      (P0).
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Live Data
                  </span>
                </div>
                <div className="">
                  {loading ? (
                    <div className="p-12 text-center text-gray-500">
                      Loading student data...
                    </div>
                  ) : (
                    <StudentTable
                      students={students}
                      onPredict={handlePredict}
                    />
                  )}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
