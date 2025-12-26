import { Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Internships from "./pages/Internships";
import InternshipDetail from "./pages/InternshipDetail";
import Saved from "./pages/Saved";

function NavItem({ to, children }) {
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? "ihNavLink ihNavLinkActive" : "ihNavLink")}>
      {children}
    </NavLink>
  );
}

export default function App() {
  return (
    <div className="ihShell">
      <header className="ihTopbar">
        <div className="ihContainer" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link to="/" className="ihBrand">
            <span className="ihLogoMark" />
            <span style={{ fontSize: 18 }}>InternHub</span>
          </Link>

          <nav className="ihNav">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/internships">Internships</NavItem>
            <NavItem to="/saved">Saved</NavItem>
          </nav>

          <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
            <button className="ihButton">Sign in</button>
            <button className="ihButton ihButtonPrimary">Get started</button>
          </div>
        </div>
      </header>

      <main className="ihContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/internships/:id" element={<InternshipDetail />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </main>
    </div>
  );
}
