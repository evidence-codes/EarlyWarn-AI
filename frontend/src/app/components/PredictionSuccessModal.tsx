import React from "react";
import { X, CheckCircle, AlertTriangle, AlertOctagon } from "lucide-react";

interface PredictionSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "single" | "batch";
  data: any; // Flexible data structure based on type
}

const PredictionSuccessModal: React.FC<PredictionSuccessModalProps> = ({
  isOpen,
  onClose,
  type,
  data,
}) => {
  if (!isOpen) return null;

  const getRiskColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level?.toLowerCase()) {
      case "high":
        return <AlertOctagon className="w-12 h-12 text-red-500 mb-2" />;
      case "medium":
        return <AlertTriangle className="w-12 h-12 text-yellow-500 mb-2" />;
      case "low":
        return <CheckCircle className="w-12 h-12 text-green-500 mb-2" />;
      default:
        return null; // Should not happen
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          {type === "single" ? (
            <>
              <div className="flex justify-center">
                {getRiskIcon(data.risk_level)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Prediction Complete
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Analysis for{" "}
                <span className="font-semibold text-gray-700">{data.name}</span>
              </p>

              <div
                className={`p-4 rounded-xl border ${getRiskColor(data.risk_level)} mb-6`}
              >
                <p className="text-sm font-medium uppercase tracking-wide opacity-80">
                  Risk Assessment
                </p>
                <p className="text-3xl font-bold mt-1">{data.risk_level}</p>
                {data.probability !== undefined && (
                  <p className="text-xs mt-2 opacity-75">
                    Probability: {(data.probability * 100).toFixed(1)}%
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Upload Successful
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                We have successfully processed and analyzed your file.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500">Total Students</p>
                  <p className="text-xl font-bold text-gray-900">
                    {data.total}
                  </p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                  <p className="text-xs text-red-600">High Risk Found</p>
                  <p className="text-xl font-bold text-red-700">
                    {data.highRiskCount}
                  </p>
                </div>
              </div>
            </>
          )}

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
          >
            {type === "single" ? "Add Another Student" : "View Dashboard"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionSuccessModal;
