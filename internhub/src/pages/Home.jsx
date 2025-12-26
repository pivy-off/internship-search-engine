import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FeatureCard({ title, text }) {
  return (
    <div className="ihCard">
      <div style={{ fontWeight: 950, marginBottom: 6 }}>{title}</div>
      <div className="ihMuted" style={{ lineHeight: 1.55 }}>
        {text}
      </div>
    </div>
  );
}

export default function Home() {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [workType, setWorkType] = useState("All");
  const [role, setRole] = useState("All");

  function onSearch() {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (workType !== "All") params.set("workType", workType);
    if (role !== "All") params.set("role", role);
    const suffix = params.toString();
    nav(`/internships${suffix ? `?${suffix}` : ""}`);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <section className="ihPanel">
        <div className="ihSplit">
          <div>
            <div className="ihRow" style={{ marginBottom: 12 }}>
              <span className="ihPill ihPillAccent">International students</span>
              <span className="ihPill">Visa friendly</span>
              <span className="ihPill">CPT OPT aware</span>
            </div>

            <h1 style={{ margin: 0, fontSize: 54, lineHeight: 1.05, letterSpacing: -0.8 }}>
              Find internships with confidence
            </h1>

            <p className="ihMuted" style={{ marginTop: 14, maxWidth: 640, lineHeight: 1.65 }}>
              Search, filter, and save opportunities in one place. Built to reduce uncertainty for international students.
            </p>
          </div>

          <div className="ihCardSoft">
            <div style={{ fontWeight: 950, marginBottom: 10 }}>Search</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input
                className="ihInput"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Company, role, keyword"
              />

              <select className="ihSelect" value={workType} onChange={(e) => setWorkType(e.target.value)}>
                <option value="All">Work type</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Onsite">Onsite</option>
              </select>

              <select className="ihSelect" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="All">Role</option>
                <option value="Software Engineering Intern">Software Engineering Intern</option>
                <option value="Data Science Intern">Data Science Intern</option>
                <option value="Product Management Intern">Product Management Intern</option>
              </select>

              <button className="ihButton ihButtonPrimary" onClick={onSearch}>
                Search internships
              </button>

              <button className="ihButton ihButtonAccent" onClick={() => nav("/internships")}>
                Browse all
              </button>

              <div className="ihMuted" style={{ fontSize: 13, lineHeight: 1.5 }}>
                Tip: try Google + Remote + Python
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ihGrid4">
        <FeatureCard title="Browse" text="A clean list view focused on the info that matters." />
        <FeatureCard title="Filter" text="Narrow by work type, role, and tags with shareable URLs." />
        <FeatureCard title="Save" text="Bookmark opportunities so you never lose track." />
        <FeatureCard title="Track" text="Stay organized from discovery to application." />
      </section>
    </div>
  );
}
