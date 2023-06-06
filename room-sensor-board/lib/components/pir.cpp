#include "pir.h"


pir::pir(int pin) {
    _pin = pin;
    _state = false;
}

void pir::initialize() {
    pinMode(_pin, INPUT);
}

bool pir::isMotion() {
    return digitalRead(_pin);
}

bool pir::getState() {
    return _state;
}