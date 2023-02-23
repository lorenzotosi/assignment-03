#ifndef __LED__
#define __LED__

#include <Arduino.h>

class led {
    public:
        led(int pin);
        void initialize();
        void on();
        void off();
        void toggle();
    private:
        int _pin;
        bool _state;
        
};

#endif