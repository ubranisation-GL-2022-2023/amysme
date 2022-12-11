import pandas as pd


def readEXCEL(file_path):
  df = pd.read_excel(file_path)
  data = df.to_json(orient='records')
  json = {
    "data": data
  }
  return json

def json_to_excel(data):
  pd.DataFrame(data).to_excel("out/generated_data_frame.xlsx")
