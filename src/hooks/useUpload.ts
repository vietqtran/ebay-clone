import { createClient } from '@/utils/supabase/client'

export const useUpload = () => {
   const supabase = createClient()

   async function uploadMultipleFiles(
      bucketName: string,
      fileUrls: string[],
      folderPath: string
   ) {
      const results = []

      for (const url of fileUrls) {
         try {
            // Fetch file từ URL và chuyển đổi thành Blob
            const response = await fetch(url)
            if (!response.ok) {
               throw new Error(`Failed to fetch file from URL: ${url}`)
            }

            const blob = await response.blob()

            // Chuyển đổi Blob thành File với tên file dựa trên timestamp hoặc UUID
            const fileName = `file_${Date.now()}_${url.split('/').pop()}`
            const file = new File([blob], fileName, { type: blob.type })

            const filePath = `${folderPath}/${file.name}`

            // Upload từng file lên bucket với đường dẫn tương ứng
            const { data, error } = await supabase.storage
               .from(bucketName)
               .upload(filePath, file)

            if (error) {
               console.error(
                  `Upload failed for file ${file.name}:`,
                  error.message
               )
               results.push({
                  success: false,
                  fileName: file.name,
                  message: error.message
               })
            } else {
               console.log(`Upload successful for file ${file.name}:`, data)
               results.push({ success: true, fileName: file.name, data })
            }
         } catch (err) {
            console.error(`Unexpected error for file URL: ${url}`, err)
            results.push({
               success: false,
               fileName: url.split('/').pop() || 'unknown',
               message: `Unexpected error occurred`
            })
         }
      }

      return results
   }

   return { uploadMultipleFiles }
}
