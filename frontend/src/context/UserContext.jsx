// import { createContext, useState } from "react";

// export const UserContext = createContext({
//   user: null,
//   updateUser: () => {},
//   clearUser: () => {},
// });

// export default function UserProvider({ children }) {

//   const [user, setUser] = useState(() => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       return storedUser ? JSON.parse(storedUser) : null;
//     } catch (error) {
//       console.error("Failed to parse user from localStorage", error);
//       return null;
//     }
//   });

//   const updateUser = (userData) => {
//     setUser(userData);

//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const clearUser = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   const updateUserUserStats = (key, value) => {
//     setUser((prev) => ({
//       ...prev,
//       [key] : value
//     }))
//   }

//   const onPollCreateOrDelete = (type = "create") => {
//     const totalPollsCreated = user.totalPollsCreated || 0;
//       updateUserUserStats(
//         "totalPollsCreated", 
//         type == "create" ? totalPollsCreated + 1 : totalPollsCreated - 1
//       )
//   }

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         updateUser,
//         clearUser,
//         onPollCreateOrDelete
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// }


import { createContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  updateUser: () => {},
  clearUser: () => {},
  onPollCreateOrDelete: () => {},
});

export default function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateUserUserStats = (key, value) => {
    setUser((prev) => {
  
      const newUser = {
        ...prev,
        [key]: value,
      };
      localStorage.setItem("user", JSON.stringify(newUser));

      
      return newUser;
    });
  };

  const onPollCreateOrDelete = (type = "create") => {
  
    if (!user) return;

    const totalPollsCreated = user.totalPollsCreated || 0;
    updateUserUserStats(
      "totalPollsCreated",
      type === "create" ? totalPollsCreated + 1 : totalPollsCreated - 1
    );
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
        onPollCreateOrDelete,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}