import React from 'react'
import { Download, RefreshCw, CheckCircle, AlertCircle, FileText, Loader } from 'lucide-react'
import type { ConversionState } from '../App'

interface ConversionStatusProps {
  state: ConversionState
  onReset: () => void
  onDownload: () => void
}

const ConversionStatus: React.FC<ConversionStatusProps> = ({
  state,
  onReset,
  onDownload
}) => {
  const getStatusIcon = () => {
    switch (state.status) {
      case 'uploading':
      case 'converting':
        return <Loader className="w-8 h-8 text-primary-600 animate-spin" />
      case 'success':
        return <CheckCircle className="w-8 h-8 text-green-600" />
      case 'error':
        return <AlertCircle className="w-8 h-8 text-red-600" />
      default:
        return <FileText className="w-8 h-8 text-gray-400" />
    }
  }

  const getStatusText = () => {
    switch (state.status) {
      case 'uploading':
        return 'Uploading file...'
      case 'converting':
        return 'Converting to PDF...'
      case 'success':
        return 'Conversion complete!'
      case 'error':
        return 'Conversion failed'
      default:
        return ''
    }
  }

  const getStatusColor = () => {
    switch (state.status) {
      case 'uploading':
      case 'converting':
        return 'text-primary-600'
      case 'success':
        return 'text-green-600'
      case 'error':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="text-center space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
          {getStatusIcon()}
        </div>
        
        <div className="space-y-2">
          <h3 className={`text-lg font-semibold ${getStatusColor()}`}>
            {getStatusText()}
          </h3>
          
          {state.fileName && (
            <p className="text-sm text-gray-600">
              {state.fileName}
            </p>
          )}
          
          {state.error && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
              {state.error}
            </p>
          )}
        </div>
      </div>

      {(state.status === 'uploading' || state.status === 'converting') && (
        <div className="w-full">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{state.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${state.progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex gap-3 justify-center">
        {state.status === 'success' && (
          <button
            onClick={onDownload}
            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </button>
        )}
        
        <button
          onClick={onReset}
          className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Convert Another
        </button>
      </div>
    </div>
  )
}

export default ConversionStatus