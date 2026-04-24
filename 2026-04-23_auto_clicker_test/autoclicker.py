import tkinter as tk
from tkinter import ttk
import threading
import time
from pynput.mouse import Button, Controller
from pynput.keyboard import Listener, KeyCode

# Global variables
clicking = False
click_interval = 0.1  # Default 100ms
mouse = Controller()
# Hotkey to toggle auto-clicking: F8
toggle_key = KeyCode(char=' ') # Default space for now, but F8 is better. Let's use a common hotkey.

# Since KeyCode(char=' ') is for characters, let's use Key.f8 if available
from pynput.keyboard import Key

def clicker():
    global clicking
    while True:
        if clicking:
            mouse.click(Button.left, 1)
        time.sleep(click_interval)

def on_press(key):
    global clicking
    if key == Key.f8:
        clicking = not clicking
        print(f"Clicking: {clicking}")

def update_interval():
    global click_interval
    try:
        val = float(interval_entry.get())
        if val <= 0:
            val = 0.001 # Minimum interval to avoid hanging
        click_interval = val
    except ValueError:
        pass

def toggle_clicking():
    global clicking
    clicking = not clicking
    status_label.config(text=f"Status: {'Running' if clicking else 'Stopped'}")

# Setup GUI
root = tk.Tk()
root.title("Simple Auto Clicker")
root.geometry("300x200")
root.resizable(False, False)

frame = ttk.Frame(root, padding="20")
frame.pack(expand=True)

status_label = ttk.Label(frame, text="Status: Stopped", font=("Helvetica", 12))
status_label.pack(pady=10)

ttk.Label(frame, text="Interval (seconds):").pack()
interval_entry = ttk.Entry(frame)
interval_entry.insert(0, "0.1")
interval_entry.pack(pady=5)

update_btn = ttk.Button(frame, text="Update Interval", command=update_interval)
update_btn.pack(pady=5)

toggle_btn = ttk.Button(frame, text="Start/Stop (F8)", command=toggle_clicking)
toggle_btn.pack(pady=10)

ttk.Label(frame, text="Hotkey: F8 to toggle", font=("Helvetica", 8)).pack()

# Start clicking thread
click_thread = threading.Thread(target=clicker, daemon=True)
click_thread.start()

# Start keyboard listener
keyboard_listener = Listener(on_press=on_press)
keyboard_listener.start()

# Update status label when toggle_key is pressed via listener
def monitor_status():
    status_label.config(text=f"Status: {'Running' if clicking else 'Stopped'}")
    root.after(100, monitor_status)

monitor_status()
root.mainloop()
