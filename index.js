#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import libre from 'libreoffice-convert';
import figlet from 'figlet';
import chalk from 'chalk';
import os from 'os';

// Function to convert an Office file (e.g., doc, docx, ppt, pptx) to PDF
function convertOfficeToPdf(inputFile, outputDirectory) {
  const baseName = path.basename(inputFile, path.extname(inputFile));
  const outputPdfFile = path.join(outputDirectory, `${baseName}.pdf`);
  const tmpDir = os.tmpdir(); // Get the system's temporary directory

  let officeFileBuffer = fs.readFileSync(inputFile);

  libre.convert(officeFileBuffer, '.pdf', undefined, (err, pdfBuffer) => {
    if (err) {
      console.log(`Error converting file ${inputFile}: ${err}`);
    } else {
      fs.writeFileSync(outputPdfFile, pdfBuffer);
      console.log(`File converted successfully: ${inputFile} -> ${outputPdfFile}`);
    }
  });
}

// Process command-line arguments
if (process.argv.length !== 4) {
  console.error('Usage: node index.js input-folder output-subdirectory');
  process.exit(1);
}

const inputFolder = process.argv[2];
const outputSubdirectory = process.argv[3];

// Define the full output directory path
const outputDirectory = path.join('output', outputSubdirectory);

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

// Read all files in the input directory and convert Office files to PDF
fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error(`Error reading input folder: ${err}`);
    process.exit(1);
  }

  files.forEach((file) => {
    const inputFile = path.join(inputFolder, file);
    const fileExtension = path.extname(file).toLowerCase();

    // Check for supported Office file extensions and exclude PDFs
    if (['.doc', '.docx', '.ppt', '.pptx'].includes(fileExtension) && fileExtension !== '.pdf') {
      convertOfficeToPdf(inputFile, outputDirectory);
    }
  });
});
