import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
const App = () => {
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageRecieved(data.message);
    });
  }, [socket]);
  return (
    <>
      <input
        placeholder="Type message here"
        style={{ marginRight: 10 }}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage} style={{ padding: 3.5 }}>
        Message
      </button>
      <h1>Message</h1>
      {messageRecieved}
    </>
  );
};

export default App;
