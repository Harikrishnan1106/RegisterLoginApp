import { useEffect, useState } from "react";
import { UserDetailsAPI } from "../services/Api";
import NavBar from "../components/NavBar";
import { logout } from "../services/Auth";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../services/Auth";
import { Navigate } from "react-router-dom";

export default function DashboardPage() {
  const [user, setUser] = useState({ email: "", name: "", localId: "" });
  const navigate=useNavigate();
  useEffect(() => {
    UserDetailsAPI()
      .then((response) => {
        //console.log("UserDetailsAPI Response:", response); // Add this line to print the response
        setUser({
          name: response.data.users[0].displayName,
          email: response.data.users[0].email,
          localId: response.data.users[0].localId,
        });
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setUser({ email: "", name: "", localId: "" }); // Reset user state
      });
  }, []);
const logoutUser=()=>{
    logout();
    navigate('/login');
}
if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <NavBar logoutuser={logoutUser}/>
      <main role="main" className="container mt-5">
        <div className="container">
          <div className="text-center mt-5">
            <h3>Dashboard page</h3>
            {user.name && user.email && user.localId ? (
              <div>
                <p className="text-bold ">
                  Hi {user.name}, your Firebase ID is {user.localId}
                </p>
                <p>Your email ID is {user.email}</p>
              </div>
            ) : (
              <p>Loading..</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
