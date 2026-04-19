---
name: video-generator
description: AI video production workflow using Remotion. Use when creating videos, short films, commercials, or motion graphics. Triggers on requests to make promotional videos, product demos, social media videos, animated explainers, or any programmatic video content. Produces polished motion graphics, not slideshows.
tags: [remotion, video, react, animation, motion-graphics]
---

# Video Generator (Remotion)

Create professional motion graphics videos programmatically with React and Remotion.

## Default Workflow (ALWAYS follow this)

1. **Create the project** in `output/<project-name>/`
2. **Build all scenes** with proper motion graphics
3. **Install dependencies** with `npm install`
4. **Fix package.json scripts** to use `npx remotion` (not `bun`):
   ```
   "scripts": {
     "dev": "npx remotion studio",
     "build": "npx remotion bundle"
   }
   ```
5. **Start Remotion Studio** as a background process on port 3000

### Rendering (only when user explicitly asks to export):
```
cd output/<project-name>
npx remotion render CompositionName out/video.mp4
```

## Quick Start

**IMPORTANT:** `create-video@latest` has an interactive CLI that blocks in non-TTY environments. Use manual scaffolding instead:

```bash
mkdir -p output/my-video/src/scenes output/my-video/public/audio output/my-video/public/images
cd output/my-video

cat > package.json << 'EOF'
{
  "name": "my-video",
  "scripts": {
    "dev": "npx remotion studio",
    "build": "npx remotion bundle",
    "render": "npx remotion render"
  },
  "dependencies": {
    "@remotion/cli": "4.0.293",
    "react": "^19",
    "react-dom": "^19",
    "remotion": "4.0.293",
    "lucide-react": "^0.400"
  },
  "devDependencies": {
    "@types/react": "^19",
    "typescript": "^5"
  }
}
EOF

npm install
npm run dev
```

## Core Architecture

### Video Structure Pattern

```typescript
import {
  AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig,
  interpolate, spring, Img, staticFile, Audio,
} from "remotion";

export const MyVideo = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill>
      {/* Persistent background layer - OUTSIDE sequences */}
      <AnimatedBackground frame={frame} />

      {/* Scene sequences */}
      <Sequence from={0} durationInFrames={90}>
        <IntroScene />
      </Sequence>
      <Sequence from={90} durationInFrames={120}>
        <FeatureScene />
      </Sequence>
    </AbsoluteFill>
  );
};
```

## Motion Graphics Principles

### AVOID (Slideshow patterns)
- Fading to black between scenes
- Centered text on solid backgrounds
- Same transition for everything
- Linear/robotic animations
- Static screens
- Emoji icons — NEVER use emoji, always use Lucide React icons

### PURSUE (Motion graphics)
- Overlapping transitions (next starts BEFORE current ends)
- Layered compositions (background/midground/foreground)
- Spring physics for organic motion
- Varied timing (2-5s scenes, mixed rhythms)
- Continuous visual elements across scenes
- Custom transitions with clipPath, 3D transforms, morphs
- Lucide React for ALL icons

## Transition Techniques

1. **Morph/Scale** - Element scales up to fill screen, becomes next scene's background
2. **Wipe** - Colored shape sweeps across, revealing next scene
3. **Zoom-through** - Camera pushes into element, emerges into new scene
4. **Clip-path reveal** - Circle/polygon grows from point to reveal
5. **Persistent anchor** - One element stays while surroundings change
6. **Directional flow** - Scene 1 exits right, Scene 2 enters from right

## Animation Timing Reference

```typescript
const timing = {
  micro: 0.1,    // Small shifts
  snappy: 0.3,   // Element entrances
  standard: 0.6, // Scene transitions
  dramatic: 1.2, // Hero moments
};

const springs = {
  snappy: { stiffness: 400, damping: 30 },
  bouncy: { stiffness: 300, damping: 15 },
  smooth: { stiffness: 120, damping: 25 },
};
```

## Remotion Essentials

### Interpolation

```typescript
const opacity = interpolate(frame, [0, 30], [0, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});

const scale = spring({
  frame, fps,
  from: 0.8, to: 1,
  durationInFrames: 30,
  config: { damping: 12 },
});
```

### Sequences with Overlap

```jsx
<Sequence from={0} durationInFrames={100}>
  <Scene1 />
</Sequence>
<Sequence from={80} durationInFrames={100}>
  <Scene2 />
</Sequence>
```

## Unified Type Scale

Always define shared tokens in `styles.ts`:

```typescript
export const colors = {
  bg: "#0a0a0f",
  textPrimary: "rgba(255,255,255,0.95)",
  textSecondary: "rgba(255,255,255,0.55)",
};

export const type = {
  hero: { fontSize: 96, fontWeight: 700, letterSpacing: "-0.04em" },
  h1:   { fontSize: 68, fontWeight: 700, letterSpacing: "-0.035em" },
  h2:   { fontSize: 48, fontWeight: 600, letterSpacing: "-0.025em" },
  body: { fontSize: 28, fontWeight: 400, letterSpacing: "-0.01em" },
  stat: { fontSize: 86, fontWeight: 800, letterSpacing: "-0.04em" },
};
```

## File Structure

```
my-video/
├── src/
│   ├── Root.tsx          # Composition definitions
│   ├── index.ts          # Entry point
│   ├── styles.ts         # Shared tokens
│   ├── MyVideo.tsx       # Main composition
│   └── scenes/           # One file per scene
│       ├── IntroScene.tsx
│       └── CTAScene.tsx
├── public/
│   ├── images/
│   └── audio/
├── remotion.config.ts
└── package.json
```

## Quality Tests

Before delivering, verify:
- **Mute test:** Story follows visually without sound?
- **Squint test:** Hierarchy visible when squinting?
- **Timing test:** Motion feels natural, not robotic?
- **Slideshow test:** Does NOT look like PowerPoint?
