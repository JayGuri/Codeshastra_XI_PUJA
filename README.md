# PUJA Travels - Intelligent Travel Planner

Demo Video : https://drive.google.com/file/d/1cHbQ5BNTHH79U0i1G24Vf8SRIUbPPVHX/view

PUJA Travels is an innovative travel planning platform that combines immersive 3D visualization with AI-powered itinerary generation. Plan your perfect journey with our interactive globe interface and intelligent chatbot assistant.

## ✨ Features

- **Interactive 3D Globe Visualization**: Explore destinations with our immersive Cesium-powered globe or Google Earth interface
- **AI-Powered Travel Assistant**: Generate personalized travel itineraries based on your preferences
- **Split-View Interface**: Seamlessly interact with both the globe and chatbot in our intuitive split-screen layout
- **Glass Morphism UI**: Modern, translucent interface with beautiful backdrop blur effects
- **Responsive Design**: Optimized for both desktop and mobile experiences
- **Community Trips**: Discover and join group adventures with like-minded travelers
- **Budget Management**: Set and track your travel budget with smart recommendations

## 🚀 Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **3D Visualization**: Cesium, Google Maps API
- **UI Components**: Lucide React (icons)
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS with custom glass morphism effects

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Maps API key (for Google Earth view)
- Cesium ion access token (for Cesium globe view)

## 🔧 Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/puja-travels.git
   cd puja-travels
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Create a `.env.local` file in the root directory and add your API keys:
   \`\`\`
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   NEXT_PUBLIC_CESIUM_ACCESS_TOKEN=your_cesium_access_token
   \`\`\`

4. Start the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🖥️ Usage

### Planning a Trip

1. On the home page, you'll see our split-view interface with the 3D globe on the left and the travel form on the right.
2. Fill in your travel details:
   - Starting city and destination
   - Travel dates
   - Number of travelers
   - Budget
   - Travel interests
   - Relationship type (solo, couple, family, group)
   - Travel class (budget, economy, luxury)
3. Click "Create Itinerary" to generate your personalized travel plan.
4. The chatbot will display your itinerary and switch to chat mode, where you can refine your plan through conversation.

### Exploring the Globe

- Use the "Globe Type" selector to switch between Cesium and Google Earth views.
- Navigate the globe using mouse controls:
  - Left-click + drag: Rotate the globe
  - Right-click + drag: Pan the view
  - Scroll wheel: Zoom in/out
- Click on markers to view information about destinations.

### Community Features

- Visit the Community page to discover group trips.
- Filter trips by transport type, budget, age group, and price range.
- Join existing trips or create your own to share with the community.

## 📁 Project Structure

\`\`\`
puja-travels/
├── app/                  # Next.js app directory
│   ├── about/            # About page
│   ├── community/        # Community page
│   ├── globals.css       # Global styles
│   ├── layout.jsx        # Root layout
│   └── page.jsx          # Home page
├── components/           # React components
│   ├── AuroraBackground.jsx  # Background effect component
│   ├── Card.jsx          # Destination card component
│   ├── ChatBot.jsx       # AI chatbot component
│   ├── CesiumGlobe.jsx   # Cesium globe component
│   ├── FilterSidebar.jsx # Community filters component
│   ├── GoogleEarthGlobe.jsx # Google Earth component
│   ├── Logo.js           # Logo component
│   ├── Navbar.jsx        # Navigation component
│   └── RouteFinder.jsx   # Route planning component
├── lib/                  # Utility functions and helpers
│   └── utils.js          # Utility functions
├── public/               # Static assets
│   └── images/           # Image assets
└── utils/                # Additional utilities
    └── routingService.js # Routing service utility
\`\`\`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Cesium](https://cesium.com/) for the 3D globe visualization
- [Google Maps Platform](https://developers.google.com/maps) for the Google Earth integration
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for the beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for animations

---

Built with ❤️ by Jay Guri , Ayush Patel , Pakshal Jain and Udit Sevak
\`\`\`


