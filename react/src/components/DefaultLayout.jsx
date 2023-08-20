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
      <aside>
        <Link to="/">Dashboard</Link>
      </aside>

      <div className="content">
        <header>
          <div>Header</div>

          <div>
            {user.name}
            <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
          </div>
        </header>
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
