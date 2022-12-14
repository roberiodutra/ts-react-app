import NavHome from "./navButtons/NavMemberArea";
import NavLogin from "./navButtons/NavLogin";
import NavMemberArea from "./navButtons/NavHome";
import NavSocialMedia from "./navButtons/NavSocialMedia";

export default function Header() {
  return (
    <header className="header">
      <a href="/" className="header-logo">
        DevHelper
      </a>
      <div className="header-navbar">
        <NavHome />
        <NavMemberArea />
        <NavLogin />
      </div>
      <NavSocialMedia />
    </header>
  );
}
