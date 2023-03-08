#ifndef __UPDATER__
#define __UPDATER__

#include <Arduino.h>


class Updater {
  public:
    Updater();
    String createJson(int ledstate, int blindsstate);
    void sendJson();
    private:
    String _json;
};


#endif