#include "BluetoothTask.h"

BluetoothTask::BluetoothTask(int rxPin, int txPin, SmartRoom *smartRoom)
{
    this->rxPin = rxPin;
    this->txPin = txPin;
    this->smartRoom = smartRoom;
}

void BluetoothTask::init(int period)
{
    Task::init(period);
    serialBT = new SoftwareSerial(rxPin, txPin);
    serialBT->begin(9600);
}

void BluetoothTask::tick()
{
    if (serialBT->available())
    {
        
    }
}