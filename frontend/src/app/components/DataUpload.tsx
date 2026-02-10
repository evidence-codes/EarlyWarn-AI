"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  Download,
} from "lucide-react";
import PredictionSuccessModal from "./PredictionSuccessModal";

interface DataUploadProps {
  onDataLoaded?: (data: any[]) => void;
}

export default function DataUpload({ onDataLoaded }: DataUploadProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");

  const [showResult, setShowResult] = useState(false);
  const [uploadStats, setUploadStats] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (validTypes.includes(file.type) || file.name.endsWith(".csv")) {
      setFile(file);
      setUploadStatus("idle");
    } else {
      alert("Please upload a CSV or Excel file.");
    }
  };

  const parseCSV = (text: string) => {
    const lines = text.split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const currentline = line.split(",");
      const obj: any = {};

      headers.forEach((header, index) => {
        let value = currentline[index]?.trim();
        // Handle numeric values
        if (
          header === "gpa" ||
          header === "attendance_rate" ||
          header === "assignments_completed"
        ) {
          obj[header] = parseFloat(value) || 0;
        } else if (header === "risk_factors") {
          obj[header] = value ? value.split(";").map((f) => f.trim()) : [];
        } else {
          obj[header] = value;
        }
      });

      // Simple explicit risk logic if not present (mocking backend logic for frontend preview)
      if (!obj.risk_level) {
        const prob =
          obj.gpa < 2.0 ? 0.8 : obj.attendance_rate < 0.8 ? 0.6 : 0.2;
        obj.risk_level = prob > 0.7 ? "High" : prob > 0.4 ? "Medium" : "Low";
      }

      if (!obj.id) obj.id = Date.now() + i;

      result.push(obj);
    }
    return result;
  };

  const handleUpload = () => {
    if (!file) return;

    setUploadStatus("uploading");

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsedData = parseCSV(text);

        // Calculate Stats
        const total = parsedData.length;
        const highRiskCount = parsedData.filter(
          (s: any) => s.risk_level === "High",
        ).length;

        setTimeout(() => {
          setUploadStatus("success");
          if (onDataLoaded) {
            onDataLoaded(parsedData);
          }

          setUploadStats({ total, highRiskCount });

          // Close upload modal, open result modal
          setIsOpen(false);
          setShowResult(true);

          // Reset file state
          setFile(null);
          setUploadStatus("idle");
        }, 800);
      } catch (error) {
        console.error("Parse error:", error);
        setUploadStatus("error");
      }
    };
    reader.onerror = () => {
      setUploadStatus("error");
    };
    reader.readAsText(file);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadStatus("idle");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 1. Result Summary Modal
  if (showResult && uploadStats) {
    return (
      <PredictionSuccessModal
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        type="batch"
        data={uploadStats}
      />
    );
  }

  // 2. Trigger Button (Default View)
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col items-center justify-center w-full h-full min-h-[150px] p-6 bg-white border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 hover:bg-gray-50 transition-all group"
      >
        <div className="bg-indigo-50 p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
          <Upload className="w-6 h-6 text-indigo-600" />
        </div>
        <span className="font-medium text-gray-700 group-hover:text-indigo-700">
          Import CSV Data
        </span>
        <span className="text-xs text-gray-400 mt-1">
          Drag & Drop Supported
        </span>
      </button>
    );
  }

  // 3. Upload Modal (Overlay)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative animate-in zoom-in-95 duration-200 border border-gray-100">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Download className="w-6 h-6 text-indigo-600" />
          Import Student Data
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Upload a CSV file to bulk import student records and generate risk
          predictions.
        </p>

        {/* Dropzone */}
        {!file ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
              isDragging
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50 bg-gray-50/50"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept=".csv, .xls, .xlsx"
            />
            <div className="flex flex-col items-center">
              <Upload
                className={`w-12 h-12 mb-4 ${isDragging ? "text-indigo-600" : "text-gray-400"}`}
              />
              <p className="text-base font-medium text-gray-700">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-400 mt-1">
                CSV, XLS, or XLSX (max 10MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-md border border-gray-200">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              {uploadStatus === "idle" && (
                <button
                  onClick={handleRemoveFile}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {uploadStatus === "idle" && (
              <button
                onClick={handleUpload}
                className="mt-4 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
              >
                Process File
              </button>
            )}

            {uploadStatus === "uploading" && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Uploading...</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full w-[45%] animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
