import React from "react";

export default function Button({ text, onClick }) {
  return (
    <>
      <button className="border rounded-sm p-2 bg-gray-100" onClick={onClick}>
        {text}
      </button>
    </>
  );
}
