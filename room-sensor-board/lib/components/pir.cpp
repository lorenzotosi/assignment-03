#include "pir.h"


pir::pir(int pin) {
    _pin = pin;
    _state = false;
}

void pir::initialize() {
    pinMode(_pin, INPUT);
}

bool pir::isMotion() {
    if (digitalRead(_pin) != _state) {
        _state = !_state;
        return true;
    }
    return false;
}