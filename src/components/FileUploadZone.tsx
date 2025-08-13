import React, { useState, useCallback } from 'react'
import { Upload, FileText } from 'lucide-react'

interface FileUploadZoneProps {
  onFileUpload: (file: File) => void
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({ onFileUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      onFileUpload(files[0])
    }
  }, [onFileUpload])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileUpload(files[0])
    }
  }, [onFileUpload])

  return (
    <div
      className={`
        border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200
        ${isDragOver 
          ? 'border-primary-400 bg-primary-50' 
          : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className={`
          w-16 h-16 rounded-full flex items-center justify-center transition-colors
          ${isDragOver ? 'bg-primary-200' : 'bg-gray-100'}
        `}>
          <Upload className={`w-8 h-8 ${isDragOver ? 'text-primary-600' : 'text-gray-400'}`} />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            Drop your Word document here
          </h3>
          <p className="text-gray-600">
            or click to browse files
          </p>
        </div>

        <label className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg cursor-pointer transition-colors duration-200">
          <FileText className="w-5 h-5 mr-2" />
          Choose File
          <input
            type="file"
            className="hidden"
            accept=".doc,.docx"
            onChange={handleFileSelect}
          />
        </label>
      </div>
    </div>
  )
}

export default FileUploadZone