import { useState, useCallback } from 'react'
import { FileText } from 'lucide-react'
import FileUploadZone from './components/FileUploadZone'
import ConversionStatus from './components/ConversionStatus'
import { convertWordToPdf } from './utils/converter'

export interface ConversionState {
  status: 'idle' | 'uploading' | 'converting' | 'success' | 'error'
  progress: number
  error?: string
  pdfUrl?: string
  fileName?: string
}

function App() {
  const [conversionState, setConversionState] = useState<ConversionState>({
    status: 'idle',
    progress: 0
  })

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file.name.match(/\.(doc|docx)$/i)) {
      setConversionState({
        status: 'error',
        progress: 0,
        error: 'Please select a valid Word document (.doc or .docx)'
      })
      return
    }

    setConversionState({
      status: 'uploading',
      progress: 25,
      fileName: file.name
    })

    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setConversionState(prev => ({
        ...prev,
        status: 'converting',
        progress: 50
      }))

      const pdfBlob = await convertWordToPdf(file)
      const pdfUrl = URL.createObjectURL(pdfBlob)

      setConversionState(prev => ({
        ...prev,
        status: 'success',
        progress: 100,
        pdfUrl
      }))
    } catch (error) {
      setConversionState({
        status: 'error',
        progress: 0,
        error: error instanceof Error ? error.message : 'Conversion failed'
      })
    }
  }, [])

  const handleReset = useCallback(() => {
    if (conversionState.pdfUrl) {
      URL.revokeObjectURL(conversionState.pdfUrl)
    }
    setConversionState({
      status: 'idle',
      progress: 0
    })
  }, [conversionState.pdfUrl])

  const handleDownload = useCallback(() => {
    if (conversionState.pdfUrl && conversionState.fileName) {
      const link = document.createElement('a')
      link.href = conversionState.pdfUrl
      link.download = conversionState.fileName.replace(/\.(doc|docx)$/i, '.pdf')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }, [conversionState.pdfUrl, conversionState.fileName])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <FileText className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Word to PDF Converter
            </h1>
            <p className="text-gray-600">
              Convert your Word documents to PDF format quickly and easily
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            {conversionState.status === 'idle' && (
              <FileUploadZone onFileUpload={handleFileUpload} />
            )}

            {conversionState.status !== 'idle' && (
              <ConversionStatus
                state={conversionState}
                onReset={handleReset}
                onDownload={handleDownload}
              />
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Supported formats: .doc, .docx • Maximum file size: 10MB
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App