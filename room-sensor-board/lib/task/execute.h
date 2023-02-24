#ifndef __EXECUTE__
#define __EXECUTE__

#include "Task.h"
#include "pir.h"
#include "led.h"
#include "photoresistor.h"
#include <PubSubClient.h>
#include <ArduinoJson.h>

class execute : public Task {
    public:
        execute(pir* p, led* l, photoresistor* ph, PubSubClient* client, const char* topic);
        void init(int period);
        void tick();
    private:
        pir* p;
        led* l;
        photoresistor* ph;
        PubSubClient* client;
        const char* topic;
};

#endif
