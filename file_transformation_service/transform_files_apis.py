from flask import Flask

from csv_reader import readCSV
from excel_reader import readEXCEL
from pdf_reader import readPDF
from yaml_reader import readYAML

app = Flask(__name__)

ALLOWED_EXTENSIONS = [
  "pdf",
  "csv",
  "yaml",
  "xlsx"
]

files_root = "files/"


@app.get("/csv/<filename>")
def transform_csv(filename):
  return readCSV(files_root + filename)


@app.get("/pdf/<filename>")
def transform_pdf(filename):
  return readPDF(files_root + filename)


@app.get("/excel/<filename>")
def transform_excel(filename):
  return readEXCEL(files_root + filename)


@app.get("/yaml/<filename>")
def transform_yaml(filename):
  return readYAML(files_root + filename)


if __name__ == '__main__':
  app.run(host='0.0.0.0')
