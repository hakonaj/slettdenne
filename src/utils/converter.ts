import mammoth from 'mammoth'
import jsPDF from 'jspdf'

export async function convertWordToPdf(file: File): Promise<Blob> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    
    const result = await mammoth.convertToHtml({
      arrayBuffer: arrayBuffer
    })
    
    if (result.messages.length > 0) {
      console.warn('Mammoth conversion warnings:', result.messages)
    }
    
    const html = result.value
    
    const pdf = await htmlToPdf(html)
    
    return pdf
  } catch (error) {
    console.error('Error converting Word to PDF:', error)
    throw new Error('Failed to convert document. Please ensure it\'s a valid Word file.')
  }
}

async function htmlToPdf(html: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = html
      tempDiv.style.position = 'absolute'
      tempDiv.style.left = '-9999px'
      tempDiv.style.width = '210mm'
      tempDiv.style.fontFamily = 'Arial, sans-serif'
      tempDiv.style.fontSize = '12pt'
      tempDiv.style.lineHeight = '1.4'
      tempDiv.style.color = '#000000'
      tempDiv.style.backgroundColor = '#ffffff'
      tempDiv.style.padding = '20px'
      
      document.body.appendChild(tempDiv)
      
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 20
      const maxWidth = pageWidth - (margin * 2)
      
      const paragraphs = tempDiv.getElementsByTagName('p')
      let currentY = margin
      
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(12)
      
      for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i]
        const text = paragraph.textContent || ''
        
        if (text.trim()) {
          const lines = pdf.splitTextToSize(text, maxWidth)
          
          if (currentY + (lines.length * 7) > pageHeight - margin) {
            pdf.addPage()
            currentY = margin
          }
          
          for (let j = 0; j < lines.length; j++) {
            pdf.text(lines[j], margin, currentY)
            currentY += 7
          }
          
          currentY += 3
        }
      }
      
      document.body.removeChild(tempDiv)
      
      const pdfBlob = pdf.output('blob')
      resolve(pdfBlob)
    } catch (error) {
      reject(error)
    }
  })
}