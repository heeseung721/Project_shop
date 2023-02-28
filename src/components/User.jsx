import React from "react";

export default function User({ user: { displayName } }) {
  return (
    <div className="flex items-center mr-1 shrink-0">
      {/* 넓이가 좁아지면 이름이 나오지 않고, 넓어졌을때만 나오게 함 */}
      <span className="hidden md:block">{displayName}</span>
    </div>
  );
}
