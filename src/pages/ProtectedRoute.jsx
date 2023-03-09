import React from "react";
import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

//children 경로에 접근할 수 있는 권한이 있는 경우에 표시할 컴포넌트
//requireAdmin 이 값이 true인 경우, 경로에 접근할 수 있는 권한이 있는 사용자는 관리자 계정이어야 함

export default function ProtectedRoute({ children, requireAdmin }) {
  //useAuthContext 를 사용하여 현재 사용자가 관리자인지 여부를 확인
  const { user } = useAuthContext();

  //사용자가 인증되지 않았거나 관리자가 아닌 경우 다른 경로로 리디렉션
  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace={true} />;
  }

  return children;

  //로그인한 사용자가 있는지 확인, 그 사용자가 어드민 권한이 있는지 확인
  //requireAdmin 이 true인 경우에는 로그인도 되어있어야 하고, 어드민 권한도 있어야 함
  //조건에 맞지 않으면  / 상위 경로로 이동
  //조건에 맞는 경우에만 전달된 children 을 보여줌
}
