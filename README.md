# Word to PDF Converter

A modern, web-based application that converts Word documents (.doc, .docx) to PDF format with an intuitive drag-and-drop interface.

## Features

- 🎯 **Simple & Modern UI** - Clean, responsive design with drag-and-drop functionality
- 📄 **Word to PDF Conversion** - Supports .doc and .docx files
- 🚀 **Fast Processing** - Client-side conversion for privacy and speed
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ⬇️ **Instant Download** - Get your converted PDF immediately

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Conversion**: Mammoth.js (Word parsing) + jsPDF (PDF generation)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd word-to-pdf-converter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be available in the `dist` directory.

## Usage

1. **Upload a Word Document**:
   - Drag and drop a .doc or .docx file onto the upload zone
   - Or click "Choose File" to browse and select a file

2. **Wait for Conversion**:
   - The app will automatically process your document
   - Progress is shown with a visual indicator

3. **Download Your PDF**:
   - Once conversion is complete, click "Download PDF"
   - The file will be saved with the same name but .pdf extension

## File Support

- **Supported formats**: .doc, .docx
- **Maximum file size**: 10MB
- **Conversion features**: Text, basic formatting, paragraphs

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # React components
│   ├── FileUploadZone.tsx
│   └── ConversionStatus.tsx
├── utils/              # Utility functions
│   └── converter.ts    # Word to PDF conversion logic
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## License

MIT License - feel free to use this project for personal or commercial purposes.