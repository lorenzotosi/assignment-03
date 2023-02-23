#include "photoresistor.h"

photoresistor::photoresistor(int pin) {
    _pin = pin;
}

int photoresistor::getLight() {
    return analogRead(_pin);
}