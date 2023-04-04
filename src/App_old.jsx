import "./App.scss";
import { useEffect, useState } from 'react';
import { connected, connect, publish, disconnect, subscribe } from './components/MQTT/MQTT_functions';


export default function App() {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    if (!connected()) {
      //connect('ws://broker.emqx.io/mqtt', { clientId: 'mqttjs_3233323232123', port: 8083, reconnectPeriod: 1000 });
    }
    subscribe('device/led', handleReceived);
    return () => {
      disconnect();
    };
  }, []);

  const handleReceived = (topic, message) => {
    setReceivedMessage(message);
  };

  const handleButtonClick = (message) => {
    console.log('clicked!')
    publish('device/led', message);
  };

  return (
    <div>
      <p>Received message: {receivedMessage}</p>
      <hr />
      <h3>Send message</h3>
      <input type="text" onChange={()=>setMessage(event.target.value)}/>
      <button onClick={() => handleButtonClick(message)}>Send message</button>
    </div>
  );
}