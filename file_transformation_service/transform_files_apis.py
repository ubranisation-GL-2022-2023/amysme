import os

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
  if check_file(files_root + filename):
    return readCSV(files_root + filename)
  else:
    return 'file not found'

@app.get("/pdf/contract/<filename>")
def transform_pdf_contract(filename):
  if check_file(files_root + filename):
    return readPDF_contract(files_root + filename)
  else:
    return 'file not found'


@app.get("/pdf/cv/<filename>")
def transform_pdf_cv(filename):
  if check_file(files_root + filename):
    return readPDF_cv(files_root + filename)
  else:
    return 'file not found'


@app.get("/excel/<filename>")
def transform_excel(filename):
  if check_file(files_root + filename):
    return readEXCEL(files_root + filename)
  else:
    return 'file not found'


@app.get("/yaml/<filename>")
def transform_yaml(filename):
  if check_file(files_root + filename):
    return readYAML(files_root + filename)
  else:
    return 'file not found'

@app.post("/excel")
def reverse_excel():
  data = request.json
  json_to_excel(data)
  return data

def check_file(path):
  return os.path.exists(path)

if __name__ == '__main__':
  app.run(host='0.0.0.0')
