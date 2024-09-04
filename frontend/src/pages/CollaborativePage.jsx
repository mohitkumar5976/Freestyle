import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:9000"); // Connect to the Node.js server

const CollaborativePage = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

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

  const handleMouseDown = (e) => {
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const newX = e.clientX - 25; // Adjust for the center of the box
    const newY = e.clientY - 25;

    const newPosition = { x: newX, y: newY };
    setPosition(newPosition);
    socket.emit("move", newPosition); // Send the new position to the server
  };

  return (
    <div
      onMouseUp={handleMouseUp}
      style={{
        width: "500px",
        height: "500px",
        backgroundColor: "yellow",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "200px",
          height: "200px",
          backgroundColor: "blue",
          cursor: "pointer",
        }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default CollaborativePage;
