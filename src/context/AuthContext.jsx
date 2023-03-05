import React, { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  // 컴포넌트가 처음 마운트 되었을 때 딱 한번만 함수를 호출해서
  // 유저를 전달받으면 유저의 상태가 변경 될 때마다 setUser 설정(로그인 or 로그아웃 상태)
  //로그인이 성공하면 setUser로 유저를 설정함
  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
