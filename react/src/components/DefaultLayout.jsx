import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();
  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      });
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data)
      });
  }, [])


  return (
    <div id="defaultLayout">


      <div className="content">
        <header>
          <div>
            <Link className="btn-logout font-weight" to="/">Dashboard</Link>
            <Link className="btn-logout font-weight" to="/add-product">Add Product</Link>
          </div>

          <div>
            <span className="header-username">
              {user.name}
            </span>
            <a href="#" onClick={onLogout} className="btn-logout font-weight">Logout</a>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>

    </div>
  );
}
