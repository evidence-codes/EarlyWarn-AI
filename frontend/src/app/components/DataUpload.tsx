"use client";

import React, { useState, useRef } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, X } from "lucide-react";

interface DataUploadProps {
  onDataLoaded?: (data: any[]) => void;
}

export default function DataUpload({ onDataLoaded }: DataUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ... (drag handlers remain the same)

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

      // Simple mapping based on expected CSV structure
      // student_id,name,gpa,attendance_rate,assignments_completed,risk_level,risk_factors

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
          // Handle semicolon separated factors if present
          obj[header] = value ? value.split(";").map((f) => f.trim()) : [];
        } else {
          obj[header] = value;
        }
      });

      // Add a unique ID if not present
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

        // Simulate network delay
        setTimeout(() => {
          setUploadStatus("success");
          if (onDataLoaded) {
            onDataLoaded(parsedData);
          }
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

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Import Student Data
          </h3>
          <p className="text-sm text-gray-500">
            Upload CSV or Excel files to update risk assessments.
          </p>
        </div>
        <div className="bg-indigo-50 p-2 rounded-lg">
          <Upload className="w-5 h-5 text-indigo-600" />
        </div>
      </div>

      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
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
              className={`w-10 h-10 mb-3 ${isDragging ? "text-indigo-600" : "text-gray-400"}`}
            />
            <p className="text-sm font-medium text-gray-700">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
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
              className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors shadow-sm"
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

          {uploadStatus === "success" && (
            <div className="mt-4 flex items-center text-green-700 bg-green-50 p-2 rounded-md border border-green-100">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span className="text-sm">Data imported successfully!</span>
            </div>
          )}
          {uploadStatus === "error" && (
            <div className="mt-4 flex items-center text-red-700 bg-red-50 p-2 rounded-md border border-red-100">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span className="text-sm">Import failed. Please try again.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
