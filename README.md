# Interactive Birthday Candle

## Project Description

The Interactive Birthday Candle is a fun and engaging web application built with React and Vite. It simulates the experience of blowing out a birthday candle using a device's microphone. This project combines visual elements, audio input, and interactive features to create a unique digital birthday celebration.

### Key Features

1. **Responsive Design**: The application is fully responsive, providing an optimal viewing experience across a wide range of devices, from mobile phones to desktop computers.

2. **Interactive Candle**: A visually appealing birthday cake with a realistic candle and flickering flame is displayed.

3. **Microphone Integration**: The app uses the Web Audio API to access the user's microphone (with permission) to detect when the user blows into it.

4. **Blow-to-Extinguish Mechanism**: When a loud enough sound (like blowing) is detected, the candle flame is extinguished.

5. **Relight Option**: Users can "relight" the candle to restart the experience.

### Technical Highlights

- Built with React for efficient UI rendering and state management.
- Utilizes Vite for fast development and optimized production builds.
- Implements Tailwind CSS for responsive and customizable styling.
- Leverages the Web Audio API for microphone access and sound detection.
- Uses React Hooks (useState, useEffect, useRef) for managing component lifecycle and state.

### How It Works

1. The app displays a birthday cake with a lit candle.
2. When the user clicks the "Blow out the candle!" button, the app requests microphone access.
3. Once access is granted, the app listens for audio input.
4. If a sound above a certain threshold is detected (simulating blowing), the candle flame disappears.
5. The user can then click "Relight candle" to reset the experience.

This project demonstrates the integration of various web technologies to create an interactive and engaging user experience, perfect for virtual birthday celebrations or as a fun addition to birthday-themed websites.
