import { useEffect, useState } from "react";
import "./Chat.scss";
import { ReactSVG } from "react-svg";

const Chat = ({ message, connected }) => {
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState([]);
  const closeable = true;

  useEffect(() => {
    if (message) {
      console.log("message", message)
      setMessages(messages.concat(message));
    }
  }, [message]);


  return (
    <>
      <div className={`chat ${show ? "show" : ""}`}>
        <div className="chat__content">
          <h3 className="chat__header">Chat</h3>
          <div className="chat__messages">
            {messages.map((message, index) => (
              <div className="chat__message" key={index}>
                <div className="chat__message__content">
                  <p className="chat__message__text">{message}</p>
                  <p className="chat__message__time">12:00</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
