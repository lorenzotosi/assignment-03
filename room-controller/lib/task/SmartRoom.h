#ifndef __SMARTROOM__
#define __SMARTROOM__

#include <Arduino.h>
#include "Task.h"
#include "led.h"
#include "rBlinds.h"
#include <ArduinoJson.h>
#include "messages.h"
#include "updater.h"

class SmartRoom : public Task
{
public:
    SmartRoom(led *light, rBlinds *rollerBlinds);
    bool isLightOn();
    void setLightStatus(bool status);
    int getRollerBlindsStatus();
    void setRollerBlindsStatus(int percentage);
    void init(int period);
    void tick();
    void updateRoom(String message);
private:
    led *light;
    rBlinds *rollerBlinds;
    DynamicJsonDocument doc = DynamicJsonDocument(256);
    Updater *update = new Updater();
};

#endif