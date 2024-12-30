import { useState, useEffect } from 'react'
import { getBase64ByEdoc } from '@/functions/watermelondb/get-base64-by-edoc'

type UsePdfProps = {
  edoc: string
}
export function usePdf({ edoc }: UsePdfProps) {
  const [pdfSource, setPdfSource] = useState({
    uri: ''
  })

  useEffect(() => {
    const fecthDocument = async (eDoc: string) => {
      const { base64 } = await getBase64ByEdoc(eDoc)

      setPdfSource({
        uri: `data:application/pdf;base64,${base64}`
      })
    }
    fecthDocument(edoc.toString())
  }, [edoc])


  return {
    pdfSource
  }
}
