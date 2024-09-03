import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:9000"); // Connect to the Node.js server

const CollaborativePage = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Listen for position updates from the server
    socket.on("position", (newPosition) => {
      setPosition(newPosition);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("position");
    };
  }, []);

  const handleMove = () => {
    const newPosition = { x: position.x + 10, y: position.y + 10 };
    setPosition(newPosition);
    socket.emit("move", newPosition); // Send the new position to the server
  };

  return (
    <div
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "50px",
        height: "50px",
        backgroundColor: "blue",
        cursor: "pointer",
      }}
      onClick={handleMove}
    />
  );
};

export default CollaborativePage;
