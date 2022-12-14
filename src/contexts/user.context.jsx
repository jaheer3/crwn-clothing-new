import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { async } from '@firebase/util';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser : () => null
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser ] = useState(null);
  const value = { currentUser, setCurrentUser };
  useEffect(()=>{
    const unsubscribed = onAuthStateChangedListener((user)=>{
      if(user) {
        createUserDocumentFromAuth(user);
      }
      console.log(user);
      setCurrentUser(user);
    })
    return unsubscribed;
  },
  []
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
