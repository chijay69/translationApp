# Voice Translator App

A modern web application for real-time voice recording, transcription, and translation using Next.js and Google's Gemini AI.

## Features

- **Real-time Voice Recording**
  - Support for multiple languages
  - Real-time transcription while recording
  - High-quality audio capture in WebM/OGG format

- **Smart Transcription**
  - AI-powered transcript enhancement
  - Support for multiple source languages
  - Real-time display of transcription

- **Advanced Translation**
  - Powered by Google's Gemini AI
  - Support for multiple target languages
  - Maintains context and tone in translations
  - Automatic translation on language change

- **Recording Management**
  - Save and organize recordings
  - Persistent storage using localStorage
  - Play back recorded audio
  - View and manage transcripts
  - Retry transcription and translation

- **User Interface**
  - Modern, responsive design
  - Easy-to-use recording controls
  - Language selection for source and target
  - Copy-to-clipboard functionality
  - Loading states and error handling

## Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **UI Components**: Tailwind CSS
- **AI Integration**: Google Gemini AI
- **State Management**: React Context
- **Audio Processing**: Web Audio API
- **Speech Recognition**: Web Speech API

## Prerequisites

- Node.js 18.x or later
- Google Gemini API key
- Modern web browser with microphone support

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd translator-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the project root and add your Gemini API key:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Recording**
   - Click the microphone button to start recording
   - Select your source language before recording
   - Speak clearly into your microphone
   - Click the stop button when finished

2. **Transcription**
   - View real-time transcription while recording
   - Enhanced transcript appears after recording
   - Use the refresh button to retry transcription

3. **Translation**
   - Select target language for translation
   - Translations are generated automatically
   - View both original and translated text
   - Copy text using the copy button

4. **Managing Recordings**
   - Access previous recordings in the Documents section
   - Play back audio recordings
   - View and copy transcripts
   - Delete unwanted recordings

## Browser Support

The application requires a modern web browser with support for:
- Web Audio API
- Web Speech API
- MediaRecorder API
- localStorage

Tested and supported browsers:
- Chrome (recommended)
- Edge
- Firefox
- Safari

## Known Limitations

- Speech recognition quality may vary by language
- Requires microphone permissions
- Internet connection required for AI features
- Some browsers may have limited speech recognition support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 