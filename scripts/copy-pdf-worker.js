import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sourceFile = path.join(__dirname, '../node_modules/pdfjs-dist/build/pdf.worker.mjs')
const targetDir = path.join(__dirname, '../public')
const targetFile = path.join(targetDir, 'pdf.worker.mjs')

// Ensure the public directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true })
}

// Copy the worker file
fs.copyFileSync(sourceFile, targetFile)
console.log('PDF.js worker copied successfully!') 