#include "execute.h"

execute::execute(pir* p, led* l, photoresistor* ph, PubSubClient* client, const char* topic) {
    this->p = p;
    this->l = l;
    this->ph = ph;
    this->client = client;
    this->topic = topic;
}

void execute::init(int period) {
    Task::init(period);
}

void execute::tick() {
    //if(p->isMotion()){
        StaticJsonDocument<200> doc;
        doc["isLedOn"] = "si o no, non lo so :((";
        doc["lightLevel"] = analogRead(32);
        doc["isMotion"] = p->getState();
        serializeJson(doc, Serial);
        Serial.println();

        char buffer[256];
        serializeJson(doc, buffer);
        client->publish(this->topic, buffer);
    //}

    if(p->getState()){
        l->on();
    } else {
        l->off();
    }
}
