import serial
import time

ser = serial.Serial("/dev/cu.usbmodem14201", 9600, timeout=0.1)
ser.close()
ser.open()
x = 0;
while True:
    ser.write(str(x).encode('utf-8'))
    ser.write(b'\n')
    x = x + 1
    time.sleep(1)