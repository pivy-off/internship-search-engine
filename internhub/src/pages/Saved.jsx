import { useEffect, useState } from "react";
import { listInternships } from "../api/mockApi";
import { getSavedIds } from "../api/saved";
import InternshipCard from "../components/InternshipCard";

export default function Saved() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    listInternships().then((all) => {
      const ids = new Set(getSavedIds());
      setItems(all.filter((i) => ids.has(i.id)));
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <h2 style={{ margin: 0 }}>Saved</h2>

      {items.length === 0 ? (
        <div style={{ background: "white", border: "1px solid #e8e8e8", borderRadius: 18, padding: 16 }}>
          No saved internships yet.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((i) => (
            <InternshipCard key={i.id} internship={i} />
          ))}
        </div>
      )}
    </div>
  );
}
