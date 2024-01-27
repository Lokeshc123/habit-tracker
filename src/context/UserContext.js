import { createContext, useState } from "react";

const UserType = createContext();

const UserContext = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  return (
    <UserType.Provider
      value={{ userId, setUserId, completedTasks, setCompletedTasks }}
    >
      {children}
    </UserType.Provider>
  );
};

export { UserContext, UserType };
