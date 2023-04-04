import mqtt from 'mqtt';
import { useState } from 'react';

// const mqttUrl = 'mqtt://test.mosquitto.org';
let client = null;

export function connect(host, options) {
  client = mqtt.connect(host, options);

  return new Promise((resolve, reject) => {
    client.on('connect', () => {
      console.log('connected to MQTT broker');
      resolve();
    });

    client.on('error', (err) => {
      console.error('connection error', err);
      reject(err);
    });
  });
}

export function disconnect() {
  if (client) {
    client.end();
  }
}

export function subscribe(topic, callback) {
  if (client) {
    client.subscribe(topic, (err) => {
      if (err) {
        console.error('subscribe error', err);
      }
    });

    client.on('message', (topic, message) => {
      callback(topic, message.toString());
    });
  }
}

export function publish(topic, message) {
  if (client) {
    console.log('publishing message', message, 'to topic', topic)
    client.publish(topic, message);
  }
}

export function connected () {
  if (client) {
    return client.connected;
  } else {
    return false;
  }
}