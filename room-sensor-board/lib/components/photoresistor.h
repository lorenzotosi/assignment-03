#ifndef __PHOTORESISTOR__
#define __PHOTORESISTOR__

#include <Arduino.h>

class photoresistor {
    public:
        photoresistor(int pin);
        int getLight();
    private:
        int _pin;
        
};

#endif