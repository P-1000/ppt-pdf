#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import libre from 'libreoffice-convert';
import os from 'os';

// Function to convert a PPT file to PDF
function convertPptToPdf(inputFile, outputDirectory) {
  const baseName = path.basename(inputFile, path.extname(inputFile));
  const outputPdfFile = path.join(outputDirectory, baseName + '.pdf');

  const pptxBuffer = fs.readFileSync(inputFile);

  libre.convert(pptxBuffer, '.pdf', undefined, (err, pdfBuffer) => {
    if (err) {
      console.error(`Error converting file ${inputFile}: ${err}`);
    } else {
      fs.writeFileSync(outputPdfFile, pdfBuffer);
      console.log(`File converted successfully: ${inputFile} -> ${outputPdfFile}`);
    }
  });
}

// Function to recursively process directories and files
function processDirectory(inputDir, outputDir) {
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    const inputFile = path.join(inputDir, file);
    const outputFile = path.join(outputDir, file);

    if (fs.statSync(inputFile).isDirectory()) {
      // If it's a directory, create a corresponding directory in the output
      if (!fs.existsSync(outputFile)) {
        fs.mkdirSync(outputFile);
      }

      // Recursively process subdirectories
      processDirectory(inputFile, outputFile);
    } else {
      // Check if it's a PowerPoint file and convert to PDF, or move other files
      const fileExtension = path.extname(file).toLowerCase();

      if (['.ppt', '.pptx'].includes(fileExtension) && fileExtension !== '.pdf') {
        convertPptToPdf(inputFile, outputDir);
      } else {
        // If it's not a PowerPoint file or already a PDF, move it to the output directory
        fs.copyFileSync(inputFile, outputFile);
      }
    }
  }
}

// Process command-line arguments
if (process.argv.length !== 4) {
  console.error('Usage: node convert.js input-directory output-directory');
  process.exit(1);
}

const inputDirectory = process.argv[2];
const outputDirectory = process.argv[3];

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

// Start processing the input directory
processDirectory(inputDirectory, outputDirectory);
