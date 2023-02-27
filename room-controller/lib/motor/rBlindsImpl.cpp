#include "rBlinds.h"

rBlinds::rBlinds(uint16_t pin){
    _pin = pin;
    this->attach(_pin);
}

void rBlinds::setAngle(int angle){
    int val = angle;
    val = map(val, 0, 100, 0, 180);
    this->write(angle);
}

