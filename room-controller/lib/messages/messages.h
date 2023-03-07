#ifndef __MESSAGES__
#define __MESSAGES__

#include <Arduino.h>
#include <ArduinoJson.h>

class Messages {
    public:
        Messages();
        void init();
        void read();
        void send();
        bool isMsgArrived();
        String get() { msgArrived = false; return payload; }
    private:
        DynamicJsonDocument doc = DynamicJsonDocument(256);
        String payload;
        bool msgArrived;
};

extern Messages Message;

#endif