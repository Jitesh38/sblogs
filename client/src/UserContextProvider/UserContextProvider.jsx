import { createContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [key, setKey] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser, key, setKey }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
