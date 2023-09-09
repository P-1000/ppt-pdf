```markdown
# Office File to PDF Converter PPT-PDF

<!-- ![npm version](https://img.shields.io/npm/v/your-package-name.svg)
![npm downloads](https://img.shields.io/npm/dt/your-package-name.svg)
[![License](https://img.shields.io/npm/l/your-package-name.svg)](LICENSE) -->

Convert Office files (e.g., doc, docx, ppt, pptx) to PDF format with customizable output subdirectories.

## Installation

Before using this package, make sure you have Node.js and npm installed on your system. If not, you can download and install them from [nodejs.org](https://nodejs.org/).

```bash
npm install -g ppt-pdf
```

## Usage

To convert Office files to PDF, use the following command:

```bash
ppt-pdf input-folder output-subdirectory
```

- `input-folder`: The path to the folder containing the Office files you want to convert.
- `output-subdirectory`: The name of the subdirectory within the "output" directory where the converted PDFs will be saved.

For example, to convert Office files in the "my_office_docs" folder and save the PDFs in a subdirectory called "pdf_output," you would run:

```bash
ppt-pdf my_office_docs pdf_output
```

## Supported File Formats

This package supports the following Office file formats for conversion:

- .doc (Microsoft Word)
- .docx (Microsoft Word)
- .ppt (Microsoft PowerPoint)
- .pptx (Microsoft PowerPoint)

PDF files are excluded from the conversion process.

## Output Directory Structure

The converted PDFs are saved in a subdirectory within the "output" directory. The structure will look like this:

```
- output
  - output-subdirectory (specified by user)
    - Converted_PDF_1.pdf
    - Converted_PDF_2.pdf
    - ...
```

## License

This package is provided under the [MIT License](LICENSE).

## Author

- Pavan
- Email: contact@pavankumar.social

## Contributions

Contributions are welcome! If you have suggestions or improvements, please feel free to open an issue or submit a pull request.

```
# ppt-pdf
# ppt-pdf
# ppt-pdf
# ppt-pdf
