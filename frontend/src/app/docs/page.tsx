"use client";

import Link from "next/link";
import {
  Book,
  Terminal,
  Zap,
  ChevronRight,
  Server,
  Shield,
  Database,
} from "lucide-react";

export default function Documentation() {
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-24 space-y-8 h-[calc(100vh-6rem)] overflow-y-auto pr-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                  Getting Started
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#introduction"
                      onClick={(e) => scrollToSection(e, "introduction")}
                      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors font-medium text-sm"
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Introduction
                    </a>
                  </li>
                  <li>
                    <a
                      href="#installation"
                      onClick={(e) => scrollToSection(e, "installation")}
                      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors font-medium text-sm"
                    >
                      Installation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#quick-start"
                      onClick={(e) => scrollToSection(e, "quick-start")}
                      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors font-medium text-sm"
                    >
                      Quick Start
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                  Core Concepts
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#predictive-models"
                      onClick={(e) => scrollToSection(e, "predictive-models")}
                      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors font-medium text-sm"
                    >
                      Predictive Models
                    </a>
                  </li>
                  <li>
                    <a
                      href="#risk-scoring"
                      onClick={(e) => scrollToSection(e, "risk-scoring")}
                      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors font-medium text-sm"
                    >
                      Risk Scoring
                    </a>
                  </li>
                  <li>
                    <a
                      href="#data-privacy"
                      onClick={(e) => scrollToSection(e, "data-privacy")}
                      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors font-medium text-sm"
                    >
                      Data Privacy
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            <div className="prose prose-indigo max-w-none">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-6">
                Documentation v2.0
              </span>

              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Documentation
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Welcome to the EarlyWarn AI documentation. Learn how to
                integrate, configure, and maximize the potential of our student
                performance prediction system.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mb-12">
                <a
                  href="#quick-start"
                  onClick={(e) => scrollToSection(e, "quick-start")}
                  className="block p-6 bg-white border border-gray-200 rounded-xl hover:border-indigo-600 hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
                    <Zap className="w-5 h-5 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    Quick Start Guide
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Set up your dashboard and connect your data sources in under
                    10 minutes.
                  </p>
                </a>

                <a
                  href="#api-reference"
                  onClick={(e) => scrollToSection(e, "api-reference")}
                  className="block p-6 bg-white border border-gray-200 rounded-xl hover:border-violet-600 hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 bg-violet-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-violet-600 transition-colors">
                    <Terminal className="w-5 h-5 text-violet-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                    API Reference
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Detailed documentation for our REST API endpoints and data
                    schemas.
                  </p>
                </a>
              </div>

              <div className="space-y-16">
                <section id="introduction" className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Book className="h-6 w-6 text-indigo-600" />
                    Introduction
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    EarlyWarn AI uses advanced machine learning algorithms to
                    analyze historical academic data, attendance records, and
                    behavioral patterns to predict student performance. Our goal
                    is to provide educators with actionable insights to
                    intervene early and improve student outcomes.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                    <p className="text-blue-700 text-sm">
                      <strong>Note:</strong> This documentation covers the v2.0
                      release. For older versions, please see the legacy
                      archive.
                    </p>
                  </div>
                </section>

                <section id="installation" className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Server className="h-6 w-6 text-indigo-600" />
                    Installation
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Install the EarlyWarn client using your preferred package
                    manager:
                  </p>
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-gray-200 shadow-lg">
                    <div className="flex justify-between items-center mb-2 border-b border-gray-700 pb-2">
                      <span className="text-xs text-gray-500">Terminal</span>
                    </div>
                    <div>
                      <span className="text-green-400">$</span> npm install
                      @earlywarn/client
                    </div>
                  </div>
                </section>

                <section id="quick-start" className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Zap className="h-6 w-6 text-indigo-600" />
                    Quick Start
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Initialize the client with your API key:
                  </p>
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-gray-200 shadow-lg overflow-x-auto">
                    <pre>
                      <span className="text-purple-400">import</span> {"{"}{" "}
                      EarlyWarn {"}"}{" "}
                      <span className="text-purple-400">from</span>{" "}
                      <span className="text-green-300">
                        "@earlywarn/client"
                      </span>
                      ;<span className="text-purple-400">const</span> client ={" "}
                      <span className="text-purple-400">new</span> EarlyWarn(
                      {"{"}
                      apiKey:{" "}
                      <span className="text-green-300">"your_api_key"</span>,
                      schoolId:{" "}
                      <span className="text-green-300">"school_123"</span>
                      {"}"});
                    </pre>
                  </div>
                </section>

                <section id="predictive-models" className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Database className="h-6 w-6 text-indigo-600" />
                    Predictive Models
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Our system employs an ensemble of{" "}
                    <strong>Random Forest</strong> and <strong>LSTM</strong>{" "}
                    networks to process time-series data.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>
                      <strong>Accuracy:</strong> 85%+ on validation sets.
                    </li>
                    <li>
                      <strong>Features:</strong> Grades, Attendance,
                      Participation, assignment submissions.
                    </li>
                    <li>
                      <strong>Latency:</strong> Real-time inference &lt; 200ms.
                    </li>
                  </ul>
                </section>

                <section id="risk-scoring" className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="h-6 w-6 text-indigo-600" />
                    Risk Scoring
                  </h2>
                  <p className="text-gray-600">
                    Each student is assigned a risk score from 0-100.
                  </p>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                      <span className="block text-2xl font-bold text-green-700">
                        0-30
                      </span>
                      <span className="text-sm text-green-600 font-medium">
                        Low Risk
                      </span>
                    </div>
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                      <span className="block text-2xl font-bold text-yellow-700">
                        31-70
                      </span>
                      <span className="text-sm text-yellow-600 font-medium">
                        Moderate Risk
                      </span>
                    </div>
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                      <span className="block text-2xl font-bold text-red-700">
                        71-100
                      </span>
                      <span className="text-sm text-red-600 font-medium">
                        High Risk
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
