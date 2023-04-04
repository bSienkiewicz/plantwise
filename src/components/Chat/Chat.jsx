import { useState } from "react";
import "./Chat.scss";
import { ReactSVG } from "react-svg";

const Chat = () => {
  const [show, setShow] = useState(true);
  return (
    <>
    <div className={`chat__backdrop ${show ? "show" : ""}`} onClick={() => setShow(false)}></div>
      <div className={`chat ${show ? "show" : ""}`}>
        <div className="chat__content">
          <div
            className={`chat__toggler ${show ? "show" : ""}`}
            onClick={() => setShow(!show)}
          >
            <ReactSVG src="/icons/log-icon.svg" />
          </div>
          <h3 className="chat__header">Device chat</h3>
          <div className="chat__messages">
            <div className="chat__message">
              <div className="chat__message__content">
                <p className="chat__message__text">Hello</p>
                <p className="chat__message__time">12:00</p>
              </div>
            </div>
            <div className="chat__message">
              <div className="chat__message__content">
                <p className="chat__message__text">No hello!</p>
                <p className="chat__message__time">12:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
