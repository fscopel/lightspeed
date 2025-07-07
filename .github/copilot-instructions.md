# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project: Lightspeed Spacecraft Simulator

This is a React SPA that simulates a spacecraft cockpit with relativistic physics effects. The app features:

- Bootstrap-based UI for a modern spacecraft cockpit interface
- Destination selection (nearby constellations, galaxies, center of Milky Way)
- Acceleration controls up to 99.999999999999999999% speed of light
- Dual time display showing spacecraft time vs Earth time with relativistic time dilation
- Physics-accurate calculations using Lorentz transformation

## Key Components:

- `SpacecraftCockpit`: Main dashboard component
- `DestinationSelector`: Interface for choosing travel destinations
- `AccelerationControls`: Speed controls with relativistic effects
- `TimeDisplay`: Dual clocks showing time dilation effects
- `SpacecraftDashboard`: Complete cockpit interface

## Physics Implementation:

- Time dilation formula: Δt' = Δt / √(1 - v²/c²)
- Lorentz factor calculations for relativistic effects
- Real-time physics updates based on spacecraft velocity

Use Bootstrap components and modern React patterns throughout the codebase.
