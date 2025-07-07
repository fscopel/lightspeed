# Lightspeed - Relativistic Physics Visualization

An interactive web application that visualizes relativistic effects when traveling at speeds approaching the speed of light. Experience time dilation, length contraction, and journey calculations to various astronomical destinations.

## Features

- **Interactive Starfield**: Visual representation of traveling through space at relativistic speeds
- **Real-time Physics Calculations**: Live computation of relativistic effects including:
  - Time dilation
  - Length contraction
  - Lorentz factor
  - Coordinate vs proper time
- **Astronomical Destinations**: Choose from various cosmic destinations:
  - Proxima Centauri (4.24 ly)
  - Alpha Centauri (4.37 ly)
  - Sirius (8.6 ly)
  - Vega (25.04 ly)
  - Polaris (433 ly)
  - Galactic Center (26,000 ly)
  - Andromeda Galaxy (2.5M ly)
  - Observable Universe (46.5B ly)
- **Smart Unit Conversion**: Distances automatically displayed in appropriate units (meters, kilometers, miles, light years)
- **Responsive Design**: Futuristic UI with real-time FPS monitoring

## Tech Stack

- **React 18** with TypeScript for type-safe component development
- **Vite** for fast development and building
- **Canvas API** for high-performance starfield animation
- **Custom Physics Engine** with comprehensive relativistic calculations

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd lightspeed
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:9898`

### Building for Production

```bash
npm run build
```

## Usage

1. **Adjust Speed**: Use the speed slider to set your velocity as a fraction of light speed
2. **Select Destination**: Choose from the dropdown menu of astronomical destinations
3. **Observe Effects**: Watch how relativistic effects change in real-time:
   - Time dilation becomes significant at high speeds
   - Distances contract in the direction of travel
   - Journey times differ between coordinate and proper time

## Physics Background

This application demonstrates Einstein's special theory of relativity, specifically:

- **Time Dilation**: Time passes slower for objects moving at high speeds relative to a stationary observer
- **Length Contraction**: Objects appear shorter in the direction of motion when traveling at relativistic speeds
- **Lorentz Factor (γ)**: The factor by which time, length, and relativistic mass change for an object moving at velocity v

The calculations use the standard relativistic formulas:

- γ = 1/√(1 - v²/c²)
- Δt' = γΔt (time dilation)
- L' = L₀/γ (length contraction)

## Development

### Project Structure

```
src/
├── components/
│   └── Starfield.tsx      # Canvas-based starfield animation
├── utils/
│   └── relativity.ts      # Relativistic physics calculations
├── App.tsx                # Main application component
└── main.tsx              # Application entry point
```

### Key Components

- **Starfield Component**: Renders animated stars using HTML5 Canvas with performance optimization
- **Relativity Utils**: Comprehensive physics calculations including all major relativistic effects
- **App Component**: Main UI with controls and real-time data display

### Expanding the ESLint Configuration

This project uses TypeScript and ESLint for code quality. For production applications, consider enabling type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

## Contributing

Contributions are welcome! Feel free to:

- Report bugs or suggest features via GitHub issues
- Submit pull requests for improvements
- Add new astronomical destinations
- Enhance physics calculations or visualizations

## Educational Use

This project is ideal for:

- Physics education and demonstrations
- Understanding special relativity concepts
- Visualizing the scale of the universe
- Interactive learning about space travel

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Physics calculations based on Einstein's Special Theory of Relativity
- Astronomical distances sourced from scientific databases
- Inspired by the wonder of space exploration and theoretical physics
