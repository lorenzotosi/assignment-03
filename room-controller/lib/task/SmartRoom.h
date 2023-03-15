#ifndef __SMARTROOM__
#define __SMARTROOM__

#include "Task.h"
#include "Arduino.h"
#include "Led.h"
#include "rBlinds.h"
#include <ArduinoJson.h>


class SmartRoom : public Task {
    public:
        SmartRoom(Led* l, rBlinds* r);
        void tick();
        void init();
    private:
        Led* led;
        rBlinds* rBlind;
        DynamicJsonDocument doc = DynamicJsonDocument(256);
};

#endif