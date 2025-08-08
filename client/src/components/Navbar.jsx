import { NavLink } from "react-router";
import { fetchData } from "../utils";
import { useDebugValue, useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState({});
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    async function fetchUser() {
      if (token) {
        let data = await fetchData("user");
        if (data) {
          setUser(data);
        }
      }
    }
    fetchUser();
  }, []);

  const logout = async () => {
    let data = await fetchData("user/logout");
    if (data) {
      sessionStorage.clear();
      alert("Logout successfully");
    }
  };

  const serchBlog = async (e) => {
    let key = e.target.value;
    let data = await fetchData(`post/search?q=${encodeURIComponent(key)}`)

    if(data){
      console.log(data);
    }
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <NavLink to={"/"}>
            <div className="btn btn-ghost text-xl">SBlogs</div>
          </NavLink>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            onKeyDown={serchBlog}
          />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={`${import.meta.env.VITE_API_URL}/public/temp/${
                    user?.avatar
                  }`}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {token ? (
                <>
                  <li>
                    <NavLink to={"/profile"} className="justify-between">
                      Profile
                    </NavLink>
                  </li>
                  <li onClick={logout}>
                    <a>Logout</a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to={"/login"} className="justify-between">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
