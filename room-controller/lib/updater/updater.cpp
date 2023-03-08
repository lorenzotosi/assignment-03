#include "updater.h"

Updater::Updater()
{
    _json = "";
}

String Updater::createJson(int ledstate, int blindsstate)
{
    _json = "{\"ledstate\":";
    _json += ledstate;
    _json += ",\"blindsstate\":";
    _json += blindsstate;
    _json += "}";
    return _json;
}

void Updater::sendJson()
{
    Serial.println(_json);
    _json = "";
}