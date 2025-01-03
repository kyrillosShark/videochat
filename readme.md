# Real-Time Sign Language Detection & WebRTC Video Chat

A Flask + Socket.IO application that provides:

1. **Live Video Chat** between participants using WebRTC.
2. **Real-Time Sign Language Detection** using TensorFlow + Mediapipe.
3. **Optional** text overlay and TTS (Text-to-Speech) on the client side.

This repository includes:
- A Flask server (`app.py` or similar) that serves HTML/JS to the browser.
- Socket.IO events to handle real-time signaling for WebRTC and sign detection.
- A TensorFlow model (`action.h5`) and Mediapipe to detect signs from incoming frames.

---

## Table of Contents

1. [Features](#features)  
2. [Demo Overview](#demo-overview)  
3. [Setup & Installation](#setup--installation)  
4. [Usage](#usage)  
5. [Optional: ngrok](#optional-ngrok)  
6. [Environment Variables](#environment-variables)  
7. [Common Issues](#common-issues)  
8. [Project Structure](#project-structure)  
9. [License](#license)

---

## Features

- **WebRTC Video Chat**: Peer-to-peer audio/video streaming between participants in a “meeting.”
- **Pose & Hand Landmarks**: Mediapipe extracts key landmarks from the user’s live camera frames.
- **LSTM Model**: A TensorFlow model to interpret repeated frames and detect specific sign language gestures.
- **Real-Time Feedback**: Detected sign is emitted back to all participants (e.g., “Hello,” “You,” etc.).
- **Optional TTS (Client-Side)**: Each user’s browser can speak detected signs out loud if they enable TTS.

---

## Demo Overview

1. **Create or Join a Meeting**: Users land on the home page, enter a meeting ID & password to either create or join a session.
2. **Join the Video Room**: Once in the room, your local video is displayed, and remote video (from another user) will appear once they join.
3. **Enable Sign Language Detection**: When toggled on, your browser sends base64-encoded frames to the server at ~25 FPS.
4. **Server Inference**: The server uses Mediapipe + an LSTM model (`action.h5`) to detect signs.
5. **Broadcast Recognized Sign**: Detected signs (e.g., “hello”) are broadcast to everyone in the room; each client can show or speak them.

---

## Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kyrillosshark/videochat.git
cd videochat
```

### 2. Create a Virtual Environment (Recommended)

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

Your `requirements.txt` might include:
```
Flask==2.3.2
Flask-SocketIO==5.5.2
tensorflow==2.11.0
mediapipe==0.9.3.0
opencv-python==4.7.0.72
pyngrok==5.2.1
eventlet==0.33.3
```
(Adjust versions as needed.)

### 4. Ensure Model Files are Present

Place your trained TensorFlow model in the repository root or a subfolder:
```
action.h5
```
The path in the code is `MODEL_PATH = "action.h5"`. Change it if necessary.

---

## Usage

1. **Run the Server**  
   ```bash
   python main.py
   ```
   By default, it starts at `http://localhost:8000`.

2. **Open in Browser**  
   - Navigate to `http://localhost:8000`.
   - Create a meeting (e.g., ID: `room123`, Password: `abc`).
   - In a second browser or incognito window, join the same meeting.

3. **Enable Camera & Microphone**  
   - Your browser will prompt you to allow camera/mic access.
   - You should see your local video. When the other participant joins, you’ll see their video too.

4. **Toggle Features** in the top toolbar:
   - **Toggle Video** / **Toggle Audio** to enable or disable your camera or mic.
   - **Enable Sign Language**: Start sending frames to the server for sign detection.
   - **Enable TTS**: Speak out recognized signs locally.


https://github.com/user-attachments/assets/d84f1bb3-2e89-4395-8467-4ec927070e3f


5. **Leave** the meeting when finished.

---

## Optional: ngrok

If you want to quickly share your local server with an external user:
1. Set `NGROK_AUTH_TOKEN` in your environment.
2. The code attempts to start an ngrok tunnel on port `8000`:
   ```bash
   python main.py
   ```
3. Copy the generated ngrok URL from your terminal logs.

---

## Environment Variables

You can set these via `.env` or directly in your shell:

- **`PORT`**: Port on which the Flask/SocketIO server listens (default `8000`).
- **`SECRET_KEY`**: Flask session secret key (default `'your_secret_key_here'`).
- **`TURN_SERVER_URL`**: (Optional) A TURN server URL if you need NAT traversal.
- **`TURN_SERVER_USERNAME`** & **`TURN_SERVER_CREDENTIAL`**: Credentials for the TURN server.
- **`NGROK_AUTH_TOKEN`**: If you want the app to open an ngrok tunnel automatically.

---

## Common Issues

1. **No Remote Video**  
   - Ensure `usersInRoom` is sent to the client so it knows to create an offer.
   - Check logs to confirm the offer/answer exchange and ICE candidates are happening.
   - Confirm each side calls `peerConnection.addTrack(track, localStream);`.

2. **Sign Detected, But Shows as Empty**  
   - The `SIGN_TO_ENGLISH` dictionary in the code may map certain signs to `""`. If a recognized sign maps to an empty string, it won’t display or speak. Update to meaningful strings.

3. **TTS Not Heard by Other Participants**  
   - Client-side TTS is local only; it doesn’t route over WebRTC. If you want everyone to hear TTS, you must handle audio mixing or each participant individually runs TTS upon receiving the `recognized_sign`.

4. **Model Not Found**  
   - Make sure `action.h5` is in the correct location, or update `MODEL_PATH` accordingly.

5. **Permissions / Browser Blocks**  
   - If you block camera or mic, the remote participant sees no video or hears no audio.  
   - Use Incognito or a different browser to fully test multi-user flow.

---

## Project Structure

A typical layout:

```
<repository-root>/
│
├─ app.py                # Main Flask-SocketIO server
├─ requirements.txt
├─ action.h5             # Your trained TF model
├─ templates/
│   ├─ index.html        # Landing page for meeting creation/join
│   └─ room.html         # Main video chat page with sign detection
├─ static/               # (Optional) For static files if needed
│
└─ README.md             # This readme
```

---

## License

This project is licensed under the [MIT License](LICENSE), allowing you to freely modify and distribute it. Feel free to adapt any portion of the code to suit your needs.

---

**Enjoy your real-time sign language detection and WebRTC video chat application!** Feel free to open an issue or a pull request on GitHub if you encounter problems or have suggestions.
