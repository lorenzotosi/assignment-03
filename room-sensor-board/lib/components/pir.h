#ifndef __PIR__
#define __PIR__

#include <Arduino.h>

class pir {
    public:
        pir(int pin);
        void initialize();
        bool isMotion();
    private:
        int _pin;
        bool _state;
        
};

#endif