
import { useState } from "react";
import { Link } from "react-router-dom"

const Navbar = ({ setCurrentObj }) => {

  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const emptyObj = () => {
    setCurrentObj({})
  }

  return (
    <nav className="navbar">
      <div className="brand">
        <Link to="/">Home</Link>
      </div>
      <button className={`toggle-button${isActive ? ' active' : ''}`} onClick={handleToggle}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <div className={`navbar-links${isActive ? ' active' : ''}`}>
        <ul>
          <li><Link to="/applicants" onClick={emptyObj}>Applicants</Link></li>
          <li><Link to="/applications" onClick={emptyObj}>Applications</Link></li>
          <li><Link to="/companies" onClick={emptyObj}>Companies</Link></li>
          <li><Link to="/employees" onClick={emptyObj}>Employees</Link></li>
          <li><Link to="/jobs" onClick={emptyObj}>Jobs</Link></li>
          <li><Link to="/recruiters" onClick={emptyObj}>Recruiters</Link></li>
          <li><Link to="/reviews" onClick={emptyObj}>Reviews</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
