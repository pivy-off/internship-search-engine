import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getInternshipById } from "../api";
import { isSaved, toggleSaved } from "../api/saved";

function Tag({ children }) {
  return (
    <span style={{ fontSize: 12, fontWeight: 700, padding: "6px 10px", borderRadius: 999, background: "#f0f0f0" }}>
      {children}
    </span>
  );
}

export default function InternshipDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getInternshipById(id).then((x) => {
      setItem(x);
      if (x) setSaved(isSaved(x.id));
    });
  }, [id, getInternshipById]);


  if (!item) {
    return (
      <div style={{ background: "white", border: "1px solid #e8e8e8", borderRadius: 18, padding: 16 }}>
        Not found
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Link to="/internships" style={{ textDecoration: "none", color: "#111", fontWeight: 700 }}>
        Back
      </Link>

      <div style={{ background: "white", border: "1px solid #e8e8e8", borderRadius: 18, padding: 18 }}>
        <h2 style={{ marginTop: 0, marginBottom: 6 }}>{item.role}</h2>
        <div style={{ color: "#444", fontWeight: 800, marginBottom: 8 }}>{item.company}</div>
        <div style={{ color: "#666", marginBottom: 14 }}>
          {item.location} · {item.workType} · {item.season}
        </div>

        <div style={{ color: "#555", lineHeight: 1.6, marginBottom: 14 }}>{item.description}</div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {(item.tags ?? []).map((t) => (

            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={() => {
              toggleSaved(item.id);
              setSaved(isSaved(item.id));
            }}
            style={{
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid #ddd",
              background: "white",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            {saved ? "Saved" : "Save"}
          </button>

          <a
            href={item.applyUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              textDecoration: "none",
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid #111",
              background: "#111",
              color: "white",
              fontWeight: 900,
            }}
          >
            Apply
          </a>
        </div>
      </div>
    </div>
  );
}
