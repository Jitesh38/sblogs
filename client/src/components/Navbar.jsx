import { NavLink } from "react-router";
import { fetchData } from "../utils";
import { useContext, useDebugValue, useEffect, useState } from "react";
import { UserContext } from "../UserContextProvider/UserContextProvider";

function Navbar() {
  const context = useContext(UserContext);
  const [user, setUser] = useState({});
  let token = sessionStorage.getItem("token");
  useEffect(() => {
    async function fetchUser() {
      if (token) {
        let data = await fetchData("user");
        if (data) {
          setUser(data);
        }
      } else {
        setUser(null);
      }
    }
    fetchUser();
  }, [context.user]);

  const logout = async () => {
    let data = await fetchData("user/logout");
    if (data) {
      sessionStorage.clear();
      context.setUser(null);
      setUser(null);
      token = null;
      // setToken(null);
      // setUser(null);
      alert("Logout successfully");
    }
  };

  const debounceFunc = (fn, delay) => {
    let timerid;
    return function (...args) {
      clearTimeout(timerid);
      timerid = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  };

  const fetchBlog = async (key) => {
    context.setKey(key);
  };

  const debouncedBlog = debounceFunc(fetchBlog, 1000);

  const serchBlog = async (e) => {
    debouncedBlog(`${e.target.value}`);
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        {/* Left - Logo */}
        <div className="flex-1">
          <NavLink to={"/"} className="btn btn-ghost normal-case text-xl">
            SBlogs
          </NavLink>
        </div>

        {/* Mobile Menu (Hamburger) */}
        <div className="flex-none lg:hidden">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-square"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to={"/add-post"}>Add Post</NavLink>
              </li>
              {token ? (
                <>
                  <li>
                    <NavLink to={"/profile"}>Profile</NavLink>
                  </li>
                  <li onClick={logout}>
                    <a>Logout</a>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink to={"/login"}>Login</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Right Section - Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          {token && (
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-40"
              onKeyUp={serchBlog}
            />
          )}

          {/* Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            {token ? (
              <>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User avatar"
                      src={`${import.meta.env.VITE_API_URL}/public/temp/${
                        user?.avatar
                      }`}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <NavLink to={"/profile"}>Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/add-post"}>Add Post</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/bookmarks"}>
                      Bookmarks
                      <span className="badge">New</span>
                    </NavLink>
                  </li>
                  <li onClick={logout}>
                    <a>Logout</a>
                  </li>
                </ul>
              </>
            ) : (
              <NavLink to={"/login"}>
                <button className="btn ">Login</button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
