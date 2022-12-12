from flask import Flask, request

from csv_reader import readCSV
from excel_reader import readEXCEL, json_to_excel
from pdf_reader import readPDF_contract, readPDF_cv
from yaml_reader import readYAML

app = Flask(__name__)
app.config["DEBUG"] = True
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


@app.get("/pdf/contract/<filename>")
def transform_pdf_contract(filename):
  return readPDF_contract(files_root + filename)


@app.get("/pdf/cv/<filename>")
def transform_pdf_cv(filename):
  return readPDF_cv(files_root + filename)


@app.get("/excel/<filename>")
def transform_excel(filename):
  return readEXCEL(files_root + filename)


@app.get("/yaml/<filename>")
def transform_yaml(filename):
  return readYAML(files_root + filename)


@app.post("/excel")
def reverse_excel():
  data = request.json
  json_to_excel(data)
  return data


if __name__ == '__main__':
  app.run(host='0.0.0.0')
