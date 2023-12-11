import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { LogoutPage } from "../LogoutPage/LogoutPage";

function Menu(){
  const { isLoggedIn, logout } = useAuth();
  const handlelogout = () => {
    
    logout();
    
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem('expirationTime');
  };
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/Visual">Visuals</Link>
              </li>
              <li>
                <Link to="/login" onClick={handlelogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
