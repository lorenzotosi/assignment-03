#include "constants.h"

WiFiClient espClient;
PubSubClient client(espClient);

pir* p = new pir(19);
led* l = new led(18);
photoresistor* ph = new photoresistor(32);
execute* e = new execute(p, l, ph, &client, topic);
Scheduler* s = new Scheduler();

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = String("occupance-client-")+String(random(0xffff), HEX);

    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      client.subscribe(topic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  s->init(1000);
  s->addTask(e);
  e->init(1000);
  clientWifi::wifiConnect(ssid, password);
  randomSeed(micros());
  client.setServer(mqtt_server, 1883);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  s->schedule();
}