import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  ShieldCheck,
  Activity,
  Brain,
  GraduationCap,
  Users,
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wide uppercase">
              System Operational v2.0
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
            Predict Student Performance <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Before It's Too Late
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Advanced early warning system utilizing machine learning to identify
            at-risk students with over 85% accuracy. Intervene proactively.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Launch Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-700 transition-all duration-200 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Stats/Social Proof (Optional) */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-slate-900">85%+</p>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                Accuracy Rate
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">5k+</p>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                Students Tracked
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">24/7</p>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                Real-time Monitoring
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">100%</p>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                Secure Data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">
              Key Features
            </h2>
            <h3 className="mt-2 text-3xl font-bold leading-8 tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to succeed
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="w-6 h-6 text-indigo-600" />}
              title="Predictive Analytics"
              description="Forecast academic outcomes using historical data analysis and advanced ML models."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-6 h-6 text-violet-600" />}
              title="Risk Assessment"
              description="Identify at-risk students proactively with AI-driven insights before grades drop."
            />
            <FeatureCard
              icon={<Activity className="w-6 h-6 text-emerald-600" />}
              title="Real-time Monitoring"
              description="Track student progress continuously and intervene at the exact right moment."
            />
            <FeatureCard
              icon={<GraduationCap className="w-6 h-6 text-blue-600" />}
              title="Academic Insights"
              description="Deep dive into performance metrics across subjects, attendance, and behavioral patterns."
            />
            <FeatureCard
              icon={<Users className="w-6 h-6 text-orange-600" />}
              title="Cohort Analysis"
              description="Compare student performance against year-groups and historical averages."
            />
            <FeatureCard
              icon={<BarChart2 className="w-6 h-6 text-pink-600" />}
              title="Custom Reports"
              description="Generate detailed PDF reports for faculty, parents, and administrative review."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-indigo-50 border border-slate-100 group-hover:border-indigo-100 flex items-center justify-center mb-6 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
