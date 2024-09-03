const express = require("express");
const http = require("http");
const app = express();
const PORT = process.env.PORT || 9000;
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (or specify your React app's origin)
    methods: ["GET", "POST"],
  },
});

let position = { x: 0, y: 0 }; // Initial position

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Send current position to the newly connected client
  socket.emit("position", position);

  // Listen for movement updates from a client
  socket.on("move", (newPosition) => {
    position = newPosition; // Update the position on the server
    io.emit("position", position); // Broadcast the new position to all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
