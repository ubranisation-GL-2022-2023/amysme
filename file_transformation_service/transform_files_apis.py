from flask import Flask, request, jsonify
import json

from csv_reader import readCSV
from excel_reader import readEXCEL, json_to_excel
from pdf_reader import readPDF
from yaml_reader import readYAML

from rabbitmq.Publisher import Publisher
import threading, webbrowser

publisher = None

# publisher
config = {"url": "amqps://ssloczgx:Ga1orj494MmGG5R5FYTr5orsvVQY6rh5@stingray.rmq.cloudamqp.com/ssloczgx",
          "exchange": "Documents_Exchange"}

app = Flask(__name__)
app.config["DEBUG"] = True
ALLOWED_EXTENSIONS = [
  "pdf",
  "csv",
  "yaml",
  "xlsx"
]

files_root = "files/"

@app.route('/', methods=['GET'])
def init():
    global publisher
    if (request.method == 'GET'):
        publisher = Publisher(config)
        publisher.setup()
        data = {"data": "File transformation server initialized"}
        return jsonify(data)

@app.get("/csv/<filename>")
def transform_csv(filename):
  csv = readCSV(files_root + filename)
  publisher.publish_message("generated_data",json.dumps({'type':"csv",'content':csv}))
  return csv


@app.get("/pdf/<filename>")
def transform_pdf(filename):
  contract =  readPDF(files_root + filename)
  publisher.publish_message("generated_data",json.dumps({'type':"pdf",'content':contract}))
  return contract 


@app.get("/excel/<filename>")
def transform_excel(filename):
  excel = readEXCEL(files_root + filename)
  publisher.publish_message("generated_data",json.dumps({'type':"excel",'content':excel}))
  return excel


@app.get("/yaml/<filename>")
def transform_yaml(filename):
  yaml = readYAML(files_root + filename)
  publisher.publish_message("generated_data",json.dumps({'type':"yaml",'content':yaml}))
  return yaml


@app.post("/excel")
def reverse_excel():
  data = request.json
  json_to_excel(data)
  return data


if __name__ == '__main__':
  app.run(host='0.0.0.0')
