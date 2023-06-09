import mqtt from 'mqtt';
import { useState } from 'react';
import { toast } from 'react-toastify';
let client = null;

export function connectMQTT(host, options) {
  client = mqtt.connect(host, options);

  return new Promise((resolve, reject) => {
    client.on('connect', () => {
      resolve();
    });

    client.on('error', (err) => {
      console.error('connection error', err);
      reject(err);
    });
  });
}

export function disconnectMQTT() {
  if (client) {
    client.end();
  }
}

export function subscribeMQTT(topic, callback) {
  if (client) {
    client.subscribe(topic, (err) => {
      if (err) {
        console.error('subscribe error', err);
      }
    });

    client.on('message', (topic, message, packet) => {
      if (packet.retain) return;
      if (topic === 'plantwise/backend/add') {
        toast.success("Device added!");
      }
      callback(topic, message.toString());
    });
  }
}

export function publishMQTT(topic, message) {
  if (client) {
    console.log('publishing message', message, 'to topic', topic)
    client.publish(topic, message);
  }
}

export function connectedMQTT () {
  if (client) {
    return client.connected;
  } else {
    return false;
  }
}