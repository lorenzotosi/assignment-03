import serial
import time
import json

ser = serial.Serial("/dev/cu.usbmodem14201", 9600, timeout=1)
ser.close()

x = 1;
y = 100;

while True:
    ser.open()
    #ser.write(str(x).encode('ascii'))
    #ser.write(b'\n')
    data = {}
    if x % 2 == 0:
        data["luce"] = 1
    else:
        data["luce"] = 0
    data["tapparelle"] = y
    data=json.dumps(data)
    print (data)
    ser.write(data.encode('ascii'))
    ser.write(b'\n')
    ser.flush()
    ser.close()
    x = x + 1
    y = y + 1
    time.sleep(1)