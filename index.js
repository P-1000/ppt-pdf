#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import libre from 'libreoffice-convert';
import figlet from 'figlet';
import chalk from 'chalk';

// Function to ensure that a directory exists
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Function to convert an Office file (e.g., doc, docx, ppt, pptx) to PDF
function convertOfficeToPdf(inputFile, outputDirectory) {
  const baseName = path.basename(inputFile, path.extname(inputFile));
  const outputPdfFile = path.join(outputDirectory, `${baseName}.pdf`);

  let officeFileBuffer = fs.readFileSync(inputFile);

  libre.convert(officeFileBuffer, '.pdf', undefined, (err, pdfBuffer) => {
    if (err) {
      console.error(chalk.red(`Error converting file ${inputFile}: ${err}`));
    } else {
      ensureDirectoryExists(outputDirectory); // Ensure output directory exists
      fs.writeFileSync(outputPdfFile, pdfBuffer);
      console.log(chalk.green.bold(`File converted successfully: ${inputFile} -> ${outputPdfFile}`));
    }
  });
}

// Process command-line arguments
if (process.argv.length !== 4) {
  console.error(chalk.red('Usage: node convert.js input-folder output-subdirectory'));
  process.exit(1);
}

const inputFolder = process.argv[2];
const outputSubdirectory = process.argv[3];

// Define the full output directory path
const outputDirectory = path.join('output', outputSubdirectory);

// Create a cool banner
figlet('PPT-PDF', (err, data) => {
  if (err) {
    console.error(chalk.red('Error creating banner:', err));
  } else {
    console.log(chalk.blue(data));
  }

  // Read all files in the input directory and convert Office files to PDF
  fs.readdir(inputFolder, (err, files) => {
    if (err) {
      console.error(chalk.red(`Error reading input folder: ${err}`));
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
});
