#include "led.h"

led::led(int pin) {
    _pin = pin;
    _state = false;
}

void led::initialize() {
    pinMode(_pin, OUTPUT);
}

void led::on() {
    digitalWrite(_pin, HIGH);
    _state = true;
}

void led::off() {
    digitalWrite(_pin, LOW);
    _state = false;
}

void led::toggle() {
    if (_state) {
        off();
    } else {
        on();
    }
}

bool led::getState() {
    return _state;
}