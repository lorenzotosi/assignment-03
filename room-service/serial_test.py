import random
import serial
import time
import json

ser = serial.Serial("/dev/cu.usbmodem14201", 9600, timeout=1)
ser.close()

x = 1
y = 50

while True:
    ser.open()
    #ser.write(str(x).encode('ascii'))
    #ser.write(b'\n')
    data = {}
    if x % 2 == 0:
        data["light"] = 1
        y = y - random.randint(1, 10)
    else:
        data["light"] = 0
        y = y + random.randint(1, 10)
    data["window"] = y
    data=json.dumps(data)
    print (data)
    ser.write(data.encode('ascii'))
    ser.write(b'\n')
    ser.flush()
    ser.close()
    x = x + 1

    time.sleep(10)

    