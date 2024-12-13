// import React, { useEffect, useState } from "react";
// import { createContext } from "react";
// import { useMutation } from 'react-query';
// import axios from 'axios';

// export const UserContext = createContext();

// const UserDetails = (props) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userAddress, setAddress] = useState("");
  
//   return (
//     <UserContext.Provider
//       value={{
//         isAuthenticated,
//         setIsAuthenticated,
//         userAddress,
//         setAddress,
//       }}
//     >
//       {props.children}
//     </UserContext.Provider>
//   );
// };

// export default UserDetails;