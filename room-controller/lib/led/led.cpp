#include "Led.h"

Led::Led(int pin)
{
    _pin = pin;
    _state = false;
}

void Led::initialize()
{
    pinMode(_pin, OUTPUT);
}

void Led::on()
{
    digitalWrite(_pin, HIGH);
    _state = true;
}

void Led::off()
{
    digitalWrite(_pin, LOW);
    _state = false;
}

void Led::toggle()
{
    if (_state)
    {
        off();
    }
    else
    {
        on();
    }
}

bool Led::isOn()
{
    return _state;
}