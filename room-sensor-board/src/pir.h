#ifndef __PIR__
#define __PIR__

#include <Arduino.h>

class pir {
    public:
        pir(int pin);
        void begin();
        bool isMotion();
    private:
        int _pin;
        bool _state;
        
};
    



#endif