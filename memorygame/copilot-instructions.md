# Copilot Instructions for Memory Game Project

## Project Overview
This is a memory game implementation where players flip cards to find matching pairs. The game features a grid of cards with symbols face down, and players must match all pairs to win.

## Code Style and Preferences
- Use modern JavaScript ES6+ features
- Follow semantic HTML5 structure
- Use CSS Grid or Flexbox for layout
- Implement responsive design principles
- Use meaningful variable and function names
- Add comments for complex logic
- Follow consistent indentation (2 spaces)

## Game Specifications
- **Grid Size**: Support 4x4, 6x6, or 8x8 grids
- **Players**: 1 or 2 players
- **Card Topics**: Colors, Star Wars characters, Pokemon, or Countries
- **Game Flow**: 
  - Cards start face down
  - Players flip two cards per turn
  - Matching pairs stay face up
  - Non-matching pairs flip back after delay
  - Game ends when all pairs are matched

## Technical Requirements
- Use vanilla JavaScript (no frameworks required)
- Implement proper event handling
- Use CSS animations for card flipping
- Include game state management
- Add score tracking and timer
- Implement local storage for high scores

## API Integration (if applicable)
- Star Wars API: https://akabab.github.io/starwars-api/#alljson
- Pokemon API: https://pokeapi.co/
- Flags API: https://flagsapi.com/#quick

## File Structure
- `index.html` - Main HTML structure
- `style.css` - Game styling and animations
- `script.js` - Game logic and functionality
- `assets/` - Images and icons (if needed)

## Key Features to Implement
1. Card generation and shuffling
2. Click event handling
3. Card matching logic
4. Game state management
5. Player turn management
6. Win condition detection
7. Score and timer display
8. Reset/new game functionality

## Performance Considerations
- Optimize card rendering for larger grids
- Use efficient DOM manipulation
- Implement smooth animations
- Minimize API calls when using external data

## Accessibility
- Add proper ARIA labels
- Ensure keyboard navigation
- Use semantic HTML elements
- Provide alternative text for images
- Maintain good color contrast

## Testing Considerations
- Test with different grid sizes
- Verify card matching logic
- Test player switching (2-player mode)
- Validate win conditions
- Test with different card themes

## Common Patterns
When generating code, prefer:
- Arrow functions for callbacks
- Template literals for string interpolation
- Destructuring for object properties
- Async/await for API calls
- Event delegation for dynamic elements

## Error Handling
- Handle API failures gracefully
- Validate grid size inputs
- Prevent invalid card selections
- Handle edge cases in game logic

## Browser Compatibility
- Target modern browsers (ES6+ support)
- Use progressive enhancement
- Test on mobile devices
- Ensure responsive design works across devices
