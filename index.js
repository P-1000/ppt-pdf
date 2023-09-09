#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import libre from 'libreoffice-convert';
import figlet from 'figlet';
import chalk from 'chalk';


function ensureDirectoryExists(directory) { // to ensure o/p dir exists
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}


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


if (process.argv.length !== 4) {
  console.error(chalk.red('Usage: node convert.js input-folder output-subdirectory'));
  process.exit(1);
}

const inputFolder = process.argv[2];
const outputSubdirectory = process.argv[3];


const outputDirectory = path.join('output', outputSubdirectory);


figlet('PPT-PDF', (err, data) => {
  if (err) {
    console.error(chalk.red('Error creating banner:', err));
  } else {
    console.log(chalk.blue(data));
  }


  fs.readdir(inputFolder, (err, files) => {
    if (err) {
      console.error(chalk.red(`Error reading input folder: ${err}`));
      process.exit(1);
    }

    files.forEach((file) => {
      const inputFile = path.join(inputFolder, file);
      const fileExtension = path.extname(file).toLowerCase();


      if (['.doc', '.docx', '.ppt', '.pptx'].includes(fileExtension) && fileExtension !== '.pdf') {
        convertOfficeToPdf(inputFile, outputDirectory);
      }
    });
  });
});
