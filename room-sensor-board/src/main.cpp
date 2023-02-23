#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "constants.h"
#include "pir.h"
#include "led.h"
#include "photoresistor.h"


WiFiClient espClient;
PubSubClient client(espClient);

pir* p = new pir(19);
led* l = new led(18);
photoresistor* ph = new photoresistor(32);

unsigned long lastMsgTime = 0;

void setup_wifi() {

  delay(10);

  Serial.println(String("Connecting to ") + ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.println(String("Message arrived on [") + topic + "] len: " + length );
}

void reconnect() {
  
  // Loop until we're reconnected
  
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    
    // Create a random client ID
    String clientId = String("occupance-client-")+String(random(0xffff), HEX);

    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      // client.publish("outTopic", "hello world");
      // ... and resubscribe
      client.subscribe(topic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  p->initialize();
  setup_wifi();
  randomSeed(micros());
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  unsigned long now = millis();
  if (now - lastMsgTime > 10000) {
    lastMsgTime = now;

    //if (p->isMotion()) {
      StaticJsonDocument<200> doc;
      doc["isLedOn"] = digitalRead(18);
      doc["lightLevel"] = analogRead(32);
      serializeJson(doc, Serial);
      Serial.println();

      char buffer[256];
      serializeJson(doc, buffer);
      client.publish(topic, buffer);
      digitalWrite(18, !digitalRead(18));
    //}
    //mi serve il pir per testare, devo gestire il led
  }
}