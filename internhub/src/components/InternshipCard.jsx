// src/components/InternshipCard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { isSaved, toggleSaved } from "../api/saved";

function Tag({ children }) {
  return <span className="ihPill">{children}</span>;
}

export default function InternshipCard({ internship }) {
  const [saved, setSaved] = useState(isSaved(internship.id));

  function onToggleSave() {
    toggleSaved(internship.id);
    setSaved(isSaved(internship.id));
  }

  return (
    <div className="ihCard">
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 4 }}>
            {internship.role}
          </div>
          <div style={{ color: "#444", fontWeight: 800 }}>
            {internship.company} · {internship.location} · {internship.workType}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onToggleSave} className="ihButton">
            {saved ? "Saved" : "Save"}
          </button>

          <Link
            to={`/internships/${internship.id}`}
            className="ihButton ihButtonPrimary"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              whiteSpace: "nowrap",
            }}
          >
            View details
          </Link>
        </div>
      </div>

      <div style={{ marginTop: 10, color: "#555", lineHeight: 1.6 }}>
        {internship.description}
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {(internship.tags ?? []).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </div>
  );
}
