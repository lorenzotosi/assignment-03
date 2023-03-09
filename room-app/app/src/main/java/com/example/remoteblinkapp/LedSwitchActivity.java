package com.example.remoteblinkapp;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.bluetooth.BluetoothSocket;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.SeekBar;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

@SuppressLint("MissingPermission")
public class LedSwitchActivity extends AppCompatActivity {

    private OutputStream bluetoothOutputStream;
    private InputStream bluetoothInputStream;
    private Button remoteButton;
    private boolean ledState;
    private BluetoothClientConnectionThread connectionThread;

    private SeekBar seekBar;

    private boolean stop;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_led_switch);
        ledState = false;
        stop = false;
        initUI();
    }

    private void initUI() {
        remoteButton = findViewById(R.id.remotebutton);
        remoteButton.setBackgroundColor(Color.LTGRAY);
        remoteButton.setEnabled(false);
        remoteButton.setOnClickListener((v) -> sendLightStatus());
        seekBar = findViewById(R.id.seekBar);
        seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {

            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
                sendSeekBarValue(seekBar.getProgress());
            }
        });
        seekBar.setEnabled(false);
    }

    private void sendLightStatus() {
        new Thread(() -> {
            try {
                String message = "{light: " + (ledState ? 0 : 1) + "}\n";
                System.out.println(message);
                bluetoothOutputStream.write(message.getBytes(StandardCharsets.US_ASCII));
                ledState = !ledState;
                runOnUiThread(() -> remoteButton.setBackgroundColor(ledState ? Color.GREEN : Color.RED));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }).start();
    }

    private void sendSeekBarValue(int progress) {
        new Thread(() -> {
            try {
                String message = "{window: " + progress + "}\n";
                System.out.println(message);
                bluetoothOutputStream.write(message.getBytes(StandardCharsets.US_ASCII));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }).start();
    }

    private void getMessage() {
        new Thread(() -> {
            while(!this.stop) {
                try {
                    StringBuilder message = new StringBuilder();
                    int i;
                    while((i = bluetoothInputStream.read()) != '\n' && i != -1 && i != 0) {
                        message.append((char)i);
                    }
                    System.out.println(message);
                    if (!message.toString().isEmpty()) {
                        JSONObject jsonObject = new JSONObject(message.toString());
                        if (jsonObject.has("light")) {
                            int ledState = jsonObject.getInt("light");
                            runOnUiThread(() -> remoteButton.setBackgroundColor(ledState == 1 ? Color.GREEN : Color.RED));
                        }
                        if (jsonObject.has("window")) {
                            int seekBarValue = jsonObject.getInt("window");
                            runOnUiThread(() -> seekBar.setProgress(seekBarValue));
                        }
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                } /*catch (JSONException e) {
                    throw new RuntimeException(e);
                }*/ catch (JSONException e) {
                    throw new RuntimeException(e);
                }
            }
        }).start();
    }

    @Override
    protected void onStart() {
        super.onStart();
        Intent intent = getIntent();
        BluetoothDevice bluetoothDevice = intent.getParcelableExtra(ScanActivity.X_BLUETOOTH_DEVICE_EXTRA);
        BluetoothAdapter btAdapter = getSystemService(BluetoothManager.class).getAdapter();
        Log.i(C.TAG, "Connecting to " + bluetoothDevice.getName());
        connectionThread = new BluetoothClientConnectionThread(bluetoothDevice, btAdapter, this::manageConnectedSocket);
        connectionThread.start();
    }

    private void manageConnectedSocket(BluetoothSocket socket) {
        try {
            bluetoothOutputStream = socket.getOutputStream();
            bluetoothInputStream = socket.getInputStream();
            Log.i(C.TAG, "Connection successful!");
            this.getMessage();
        } catch (IOException e) {
            Log.e(C.TAG, "Error occurred when creating output stream", e);
        }
        runOnUiThread(() -> {
            remoteButton.setEnabled(true);
            remoteButton.setBackgroundColor(Color.RED);
            seekBar.setEnabled(true);
        });
    }

    @Override
    protected void onStop() {
        super.onStop();
        stop = true;
        connectionThread.cancel();
    }

}