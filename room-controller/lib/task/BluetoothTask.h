#ifndef __BLUETOOTHTASK__
#define __BLUETOOTHTASK__

#include <Arduino.h>
#include "Task.h"
#include "led.h"
#include "rBlinds.h"
#include <ArduinoJson.h>
#include "messages.h"
#include "SoftwareSerial.h"
#include "SmartRoom.h"


class BluetoothTask : public Task
{

public:
    BluetoothTask(int rxPin, int txPin, SmartRoom *smartRoom);
    void init(int period);
    void tick();

private:
    int rxPin;
    int txPin;
    SmartRoom *smartRoom;   
    SoftwareSerial *serialBT;
};

#endif