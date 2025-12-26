import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { listInternships } from "../api";
import InternshipCard from "../components/InternshipCard";

function Chip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={active ? "ihButton ihButtonPrimary" : "ihButton"}
      style={{ padding: "8px 10px", borderRadius: 999 }}
    >
      {children}
    </button>
  );
}

export default function Internships() {
  const [items, setItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") || "");
  const [workType, setWorkType] = useState(searchParams.get("workType") || "All");
  const [role, setRole] = useState(searchParams.get("role") || "All");
  const [tag, setTag] = useState(searchParams.get("tag") || "All");

  useEffect(() => {
    listInternships().then(setItems);
  }, []);

  useEffect(() => {
    const next = {};
    if (q.trim()) next.q = q.trim();
    if (workType !== "All") next.workType = workType;
    if (role !== "All") next.role = role;
    if (tag !== "All") next.tag = tag;
    setSearchParams(next, { replace: true });
  }, [q, workType, role, tag, setSearchParams]);

  const roles = useMemo(() => {
    const s = new Set(items.map((i) => i.role));
    return ["All", ...Array.from(s)];
  }, [items]);

  const tags = useMemo(() => {
    const s = new Set();
    items.forEach((i) => (i.tags ?? []).forEach((t) => s.add(t)));
    return ["All", ...Array.from(s)];
  }, [items]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return items.filter((i) => {
      const matchesQuery =
        query.length === 0 ||
        i.company.toLowerCase().includes(query) ||
        i.role.toLowerCase().includes(query) ||
        i.location.toLowerCase().includes(query) ||
        i.tags.join(" ").toLowerCase().includes(query);

      const matchesWorkType = workType === "All" || i.workType === workType;
      const matchesRole = role === "All" || i.role === role;
      const matchesTag = tag === "All" || (i.tags ?? []).includes(tag);

      return matchesQuery && matchesWorkType && matchesRole && matchesTag;
    });
  }, [items, q, workType, role, tag]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h2 style={{ margin: 0 }}>Internships</h2>
          <div style={{ color: "#666", marginTop: 6 }}>{filtered.length} results</div>
        </div>

        <div className="ihRow">
          <input
            className="ihInput"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search company, role, location, tags"
            style={{ minWidth: 280 }}
          />

          <select className="ihSelect" value={workType} onChange={(e) => setWorkType(e.target.value)}>
            <option value="All">Work type</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Onsite</option>
          </select>

          <select className="ihSelect" value={role} onChange={(e) => setRole(e.target.value)} style={{ maxWidth: 340 }}>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <button
            className="ihButton"
            onClick={() => {
              setQ("");
              setWorkType("All");
              setRole("All");
              setTag("All");
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="ihCard">
        <div style={{ fontWeight: 900, marginBottom: 10 }}>Filter by tag</div>
        <div className="ihRow">
          {tags.map((t) => (
            <Chip key={t} active={tag === t} onClick={() => setTag(t)}>
              {t}
            </Chip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="ihCard">No results. Try a different keyword or reset filters.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((i) => (
            <InternshipCard key={i.id} internship={i} />
          ))}
        </div>
      )}
    </div>
  );
}
