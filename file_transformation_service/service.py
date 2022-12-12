import os
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename

from flask import send_from_directory

from csv_reader import readCSV
from excel_reader import readEXCEL, json_to_excel
from pdf_reader import readPDF
from yaml_reader import readYAML

UPLOAD_FOLDER = './files'
ALLOWED_EXTENSIONS = {
  "pdf",
  "csv",
  "yaml",
  "xlsx"
}


app = Flask(__name__)
app.config["DEBUG"] = True
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return ('No file part')
            
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            return ('No selected file')
            
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            extension = filename.split('.')[1]
            path =os.path.join(app.config['UPLOAD_FOLDER'], filename)
            if extension == 'pdf':
                data = readPDF(path)
            elif extension == 'yaml':
                data = readYAML(path)
            elif extension == 'xlsx':
                data = readEXCEL(path)
            elif extension == 'csv':
                data = readCSV(path)
            else:
                data = {message :"ERROR" }
            return data
            return 'recieved'
        else:
            return ("Not allowed extension")
        
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''




if __name__ == '__main__':
  app.run(host='0.0.0.0')
