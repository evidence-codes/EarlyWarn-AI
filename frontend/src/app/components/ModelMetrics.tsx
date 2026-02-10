import React, { useEffect, useState } from "react";
import axios from "axios";
import { Activity, Target, CheckCircle, BarChart2 } from "lucide-react";

interface Metrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  last_trained: string;
}

const ModelMetrics = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await axios.get("http://localhost:8000/predict/metrics");
      setMetrics(response.data);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  if (!metrics) return null;

  const formatDate = (dateString: string) => {
    return (
      new Date(dateString).toLocaleDateString() +
      " " +
      new Date(dateString).toLocaleTimeString()
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            Model Performance (Live)
          </h3>
          <p className="text-sm text-gray-500">
            Real-time metrics from the current running ML model.
          </p>
        </div>
        <span className="text-xs text-gray-400">
          Last Trained: {formatDate(metrics.last_trained)}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-blue-600 uppercase">
              Accuracy
            </span>
            <Target className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {(metrics.accuracy * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-green-600 uppercase">
              Precision
            </span>
            <CheckCircle className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {metrics.precision.toFixed(3)}
          </p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-purple-600 uppercase">
              Recall
            </span>
            <BarChart2 className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {metrics.recall.toFixed(3)}
          </p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-orange-600 uppercase">
              F1-Score
            </span>
            <Activity className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {metrics.f1_score.toFixed(3)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModelMetrics;
