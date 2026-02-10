import React from "react";
import RiskBadge from "./RiskBadge";

interface Student {
  id: number;
  name: string;
  student_id: string;
  gpa: number;
  attendance_rate: number;
  assignments_completed: number;
  risk_level?: string;
  risk_factors?: string[];
}

interface StudentTableProps {
  students: Student[];
  onPredict: (studentId: number) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, onPredict }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Student ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              GPA
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Attendance
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Assignments
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Risk Level
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.student_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {student.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.gpa.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {(student.attendance_rate * 100).toFixed(0)}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.assignments_completed}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.risk_level ? (
                  <div className="flex flex-col items-start gap-1">
                    <RiskBadge level={student.risk_level} />
                    {student.risk_factors &&
                      student.risk_factors.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {student.risk_factors.map((factor, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200"
                            >
                              {factor}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs">Not Assessed</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onPredict(student.id)}
                  className="text-indigo-600 hover:text-indigo-900 font-semibold text-xs uppercase tracking-wide"
                >
                  Re-Analyze
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
