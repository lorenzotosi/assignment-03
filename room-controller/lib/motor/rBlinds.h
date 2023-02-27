#ifndef __MOTORIMPL__
#define __MOTORIMPL__

#include <Servo.h>
#include <Arduino.h>

class rBlinds : public Servo{
    public:
        rBlinds(uint16_t pin);
        void setAngle(int angle);
    private:
        uint16_t _pin;
};

#endif