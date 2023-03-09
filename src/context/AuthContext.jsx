import React, { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";

// React Context API를 사용하여, 전역에서 로그인 상태를 관리하는 컴포넌트

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  // 컴포넌트가 처음 마운트 되었을 때 딱 한번만 함수를 호출해서
  // 유저를 전달받으면 유저의 상태가 변경 될 때마다 setUser 설정(로그인 or 로그아웃 상태)
  // 로그인이 성공하면 setUser로 유저를 설정함
  useEffect(() => {
    onUserStateChange((user) => setUser(user));
  }, []);

  return (
    //로그인 상태를 유지하고 갱신
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

//useAuthContext 전역적인 로그인 상태 관리
export function useAuthContext() {
  return useContext(AuthContext);
}
