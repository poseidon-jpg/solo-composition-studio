# Private Suno Generator - Frontend UI

A beautiful, professional React frontend for the Private Suno music generation system. This interface connects to your Python/FastAPI backend for local AI music generation.

## Features

✨ **Clean Generation Interface**
- Style prompt input with placeholder examples
- Optional lyrics and exclusions
- Three control sliders: Weirdness, Style Influence, Audio Influence
- Advanced accordion with DSL editor and target length

🎵 **Custom Audio Player**
- Play/pause controls
- Seek bar with time display
- Volume control
- Download button

📊 **Track Output Panel**
- Embedded audio player for generated tracks
- Download options: WAV 48kHz, FLAC, Acapella, Instrumental
- Metadata tabs: Seed, Timeline JSON, Loudness Metrics

🎨 **Professional Design**
- Dark music-production aesthetic
- Purple/blue gradient accents
- Smooth animations and transitions
- Responsive layout

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Backend URL
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Point this to wherever your FastAPI backend is running.

### 3. Run Development Server
```bash
npm run dev
```

The UI will be available at `http://localhost:8080`

## Backend Integration

This frontend expects your Python/FastAPI backend to implement these endpoints:

### POST `/api/generate`
Request:
```json
{
  "style_prompt": "alt-rap with organic drums, airy falsetto hooks",
  "lyrics": "optional lyrics text",
  "exclusions": "trap, autotune",
  "sliders": {
    "weirdness": 0.5,
    "style_influence": 0.7,
    "audio_influence": 0.5
  },
  "moments_dsl": "DROP Hook1 bar:1 len:1.0s",
  "target_seconds": 30,
  "seed": 12345
}
```

Response:
```json
{
  "paths": {
    "mix_wav": "/path/to/mix.wav",
    "mix_flac": "/path/to/mix.flac",
    "acapella_wav": "/path/to/acapella.wav",
    "instrumental_wav": "/path/to/instrumental.wav"
  },
  "timeline_path": "/path/to/timeline.json",
  "metrics_path": "/path/to/metrics.json",
  "seed": 12345
}
```

### POST `/api/remix`
Same as `/api/generate` but keeps seed family and adjusts temperature/CFG slightly.

### GET `/api/library?limit=20`
Returns array of track metadata:
```json
[
  {
    "id": "track-uuid",
    "style_prompt": "...",
    "seed": 12345,
    "duration": 30,
    "created_at": "2025-01-15T10:30:00Z",
    "thumbnail": "/path/to/thumb.png"
  }
]
```

## TypeScript Types

All types are defined in `src/types/index.ts`:
- `GenerationRequest`
- `GenerationResponse`
- `Timeline` and `TimelineSection`
- `TrackMetadata`
- `GenerationProgress`

Use these to ensure type safety when extending the UI or backend.

## Customization

### Colors & Theme
Edit `src/index.css` to customize the design system:
- Primary purple: `--primary`
- Accent blue: `--accent`
- Background: `--background`
- All colors use HSL format

### Animations
Tailwind animations are configured in `tailwind.config.ts`:
- `animate-pulse-glow` - pulsing glow effect
- `animate-slide-up` - slide up entrance

## Project Structure

```
src/
├── components/
│   ├── AudioPlayer.tsx         # Custom audio player
│   ├── GenerationForm.tsx      # Main form with all controls
│   ├── ProgressIndicator.tsx   # Generation progress UI
│   └── TrackOutput.tsx         # Output display with downloads
├── lib/
│   └── api.ts                  # Backend API client
├── types/
│   └── index.ts                # TypeScript definitions
└── pages/
    └── Index.tsx               # Main page
```

## Development Notes

- **Mock Mode**: The UI includes simulated progress updates. Replace with WebSocket/SSE for real-time backend progress.
- **Library Tab**: Currently a placeholder. Connect to `/api/library` endpoint to display generated tracks.
- **Error Handling**: Toast notifications display errors. Customize in `src/pages/Index.tsx`.

## Next Steps

1. **Backend Connection**: Ensure your FastAPI backend is running and accessible
2. **CORS Configuration**: Configure CORS in FastAPI to allow requests from `http://localhost:8080`
3. **File Serving**: Set up static file serving for generated audio files
4. **WebSocket/SSE**: Add real-time progress updates from backend
5. **Library Implementation**: Build grid view of previous generations

## License

Frontend code: MIT License  
(Backend model weights and training data follow their respective licenses)

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and shadcn/ui
