#include "rBlinds.h"

rBlinds::rBlinds(uint16_t pin)
{
    _pin = pin;
    this->attach(_pin);
}

void rBlinds::setAngle(int angle)
{
    this->write(angle);
}

int rBlinds::getAngle()
{
    return this->read();
}