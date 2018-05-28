/*** IMPORTS ***/
// Module imports
import mqtt from "mqtt" // Docs: https://github.com/mqttjs/MQTT.js
/*** [end of imports] ***/

const url = "wss://m12.cloudmqtt.com"
const options = {
  port: "32409",
  username: "wampieoo",
  password: "wLoDczRDjipp"
}

const client = mqtt.connect(url, options)

client.on("connect", () => {
  console.info("Connecting to database...")

  client.subscribe("presence")
  client.publish("presence", "Hello mqtt")
})

client.on("message", (topic, message) => {
  console.info(`Message published to ${topic}: "${message}"`)
})

client.on("error", error => {
  console.error("Connection error:", error)
})

client.on("reconnect", () => {
  console.info("Reconnecting to database...")
})

client.on("close", () => {
  console.warn("Connection with database closed.")
})

export default client
