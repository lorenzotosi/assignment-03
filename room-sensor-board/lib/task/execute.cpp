#include "execute.h"

execute::execute(pir* p, led* l, photoresistor* ph, PubSubClient* client) {
    this->p = p;
    this->l = l;
    this->ph = ph;
    this->client = client;
    
}

void execute::init(int period) {
    Task::init(period);
}

void execute::tick() {

    //this->client.loop();
    StaticJsonDocument<200> doc;
    doc["isLedOn"] = "sium";
    doc["lightLevel"] = analogRead(32);
    serializeJson(doc, Serial);
    Serial.println();

    char buffer[256];
    serializeJson(doc, buffer);
    client->publish("occupance", buffer);
}



