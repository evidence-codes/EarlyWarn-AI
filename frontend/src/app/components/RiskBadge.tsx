import React from "react";

type RiskLevel = "Low" | "Medium" | "High";

const RiskBadge: React.FC<{ level: string }> = ({ level }) => {
  let colorClass = "bg-gray-100 text-gray-800";

  if (level === "High") {
    colorClass = "bg-red-100 text-red-800 border border-red-200";
  } else if (level === "Medium") {
    colorClass = "bg-yellow-100 text-yellow-800 border border-yellow-200";
  } else if (level === "Low") {
    colorClass = "bg-green-100 text-green-800 border border-green-200";
  }

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
    >
      {level} Risk
    </span>
  );
};

export default RiskBadge;
