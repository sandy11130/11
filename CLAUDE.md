# Remotion Demo Project

This repo contains a Remotion motion graphics demo and the Claude Code skill for video generation.

## Skills

The Remotion video skill is installed at `.claude/skills/remotion/SKILL.md`.
Invoke it with `/video-generator` or describe a video you want to create.

## Project Structure

```
.claude/skills/remotion/   # Remotion skill definition
remotion-demo/             # Demo Remotion project
```

## Running the Demo

```bash
cd remotion-demo
npm install
npm run dev    # Opens Remotion Studio at http://localhost:3000
```

## Rendering

```bash
cd remotion-demo
npx remotion render CoolDemo out/video.mp4
```

## Key Files

- `remotion-demo/src/Root.tsx` — composition registry
- `remotion-demo/src/Demo.tsx` — main video composition
- `remotion-demo/src/styles.ts` — shared design tokens
- `remotion-demo/src/scenes/` — individual scene components
