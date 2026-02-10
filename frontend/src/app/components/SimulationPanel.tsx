import React, { useState } from "react";
import {
  Gauge,
  GraduationCap,
  Calendar,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import RiskBadge from "./RiskBadge";

const SimulationPanel: React.FC = () => {
  const [gpa, setGpa] = useState(3.0);
  const [attendance, setAttendance] = useState(0.8);
  const [assignments, setAssignments] = useState(10);

  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    setLoading(true);
    // Simulate network delay for effect
    setTimeout(() => {
      try {
        // MOCK LOGIC matches backend
        let riskScore = 0;
        if (gpa < 2.0) riskScore += 0.4;
        if (attendance < 0.8) riskScore += 0.3;
        if (assignments < 5) riskScore += 0.2;

        const prob = Math.min(riskScore + Math.random() * 0.1, 1.0);
        let riskLevel = "Low";
        if (prob > 0.7) riskLevel = "High";
        else if (prob > 0.4) riskLevel = "Medium";

        setPrediction({
          risk_level: riskLevel,
          probability: prob,
        });
      } catch (error) {
        console.error("Simulation error", error);
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Gauge className="w-5 h-5 text-indigo-600" />
            What-if Analysis
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Simulate how changes in performance metrics affect student risk.
          </p>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Section */}
        <div className="lg:col-span-8 space-y-8">
          {/* GPA Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-gray-400" />
                GPA
              </label>
              <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-1 rounded">
                {gpa.toFixed(1)} / 4.0
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="4"
              step="0.1"
              value={gpa}
              onChange={(e) => setGpa(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0.0</span>
              <span>2.0</span>
              <span>4.0</span>
            </div>
          </div>

          {/* Attendance Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                Attendance Rate
              </label>
              <span
                className={`text-xs font-bold px-2 py-1 rounded ${attendance < 0.7 ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}
              >
                {(attendance * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={attendance}
              onChange={(e) => setAttendance(parseFloat(e.target.value))}
              className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600`}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Assignments Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gray-400" />
                Assignments Completed
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="50"
                value={assignments}
                onChange={(e) => setAssignments(parseInt(e.target.value))}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSimulate}
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-all hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Simulating...
                </>
              ) : (
                <>
                  Run Simulation <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-gray-100 pt-8 lg:pt-0 lg:pl-8 flex flex-col justify-center">
          {!prediction ? (
            <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <Gauge className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">
                Adjust metrics and click "Run Simulation" to see the predicted
                risk.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-lg animate-in fade-in zoom-in duration-300">
              <div
                className={`p-1 h-2 w-full ${
                  prediction.risk_level === "High"
                    ? "bg-red-500"
                    : prediction.risk_level === "Medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                }`}
              ></div>
              <div className="p-6 text-center">
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">
                  Predicted Outcome
                </p>
                <div className="mb-4">
                  <RiskBadge level={prediction.risk_level} />
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-gray-900">
                    {(prediction.probability * 100).toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-400">Risk Probability</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulationPanel;
