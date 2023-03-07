#ifndef __BLUETOOTHTASK__
#define __BLUETOOTHTASK__

#include "includes.h"

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