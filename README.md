# AEGIS GRID

## The Future of Disaster Survival Infrastructure

AEGIS GRID is an advanced, AI-powered disaster management ecosystem designed for resilient operation in environments where traditional communication networks and infrastructure have collapsed. It integrates decentralized mesh networking, hyperlocal risk assessment, and autonomous survival intelligence to provide a unified command center for both first responders and civilian survivors.

---

## Vision

In an era of increasing climate unpredictability, current emergency response systems frequently fail during critical moments due to their reliance on centralized infrastructure. AEGIS GRID solves this by providing a decentralized survival layer that remains functional when global networks fail.

The platform is built on three core pillars:
1.  **Resilience**: Operating independently of cellular or internet availability through peer-to-peer mesh protocols.
2.  **Intelligence**: Utilizing Edge-AI to provide real-time survival instructions and risk predictions.
3.  **Coordination**: Synchronizing hyperlocal disaster data into a unified tactical overview for effective rescue operations.

---

## Core Infrastructure

### 1. Tactical Command Center
A high-fidelity dashboard providing a comprehensive overview of global and local risk indexes, environmental telemetry, and active mesh node density. It serves as the primary interface for mission control.

### 2. Decentralized Mesh Network
Utilizing P2P protocols (PeerJS), AEGIS GRID establishes a resilient communication layer. Every user acts as a node, extending the network's reach and ensuring that SOS signals and intelligence can be broadcast without reliance on centralized servers.

### 3. Geospatial Risk Intelligence
An interactive 3D mapping system powered by Mapbox. It features:
*   Three-dimensional terrain and building extrusions.
*   Real-time flood and disaster simulation layers.
*   AI-optimized evacuation routing based on current threat vectors.

### 4. Autonomous Survival Assistant
Powered by the Google Gemini SDK, the AI assistant provides tactical, concise, and practice-based survival instructions tailored to the user's specific incident and environmental context.

### 5. Community Intelligence Feed
A verified stream of hyperlocal reports. Users can dispatch incidents through a simulated satellite uplink, ensuring that critical data is replicated across mesh nodes even in low-bandwidth scenarios.

---

## Technical Stack

*   **Framework**: Next.js 15+ (App Router)
*   **Styling**: Tailwind CSS with custom Tactical Dark design tokens.
*   **3D Rendering**: React Three Fiber / Three.js for global monitoring simulations.
*   **Mapping**: Mapbox GL JS with 3D Terrain and Fill Extrusions.
*   **AI Integration**: Google Gemini SDK (@google/genai).
*   **P2P Networking**: PeerJS for decentralized node management.
*   **State Management**: Zustand for real-time telemetry and system states.
*   **Animations**: Framer Motion for tactical HUD micro-interactions.

---

## Getting Started

### Prerequisites
*   Node.js 18.0 or higher.
*   Mapbox Access Token.
*   Google Gemini API Key.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/batmanven/aegis.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Launch the development server:
   ```bash
   npm run dev
   ```

---

## License

This project is developed for the WeatherWise Hackathon 2026. All rights reserved.
