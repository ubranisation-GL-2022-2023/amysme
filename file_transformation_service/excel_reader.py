import json

import pandas as pd


def readEXCEL(file_path):
  df = pd.read_excel(file_path)
  data = df.to_json(orient='records')
  return data

def json_to_excel(data):
  # if data["data"] != None:
  #   pd.DataFrame(data["data"]).to_excel("out/generated_data_frame.xlsx")
  # else:
  pd.DataFrame(data).to_excel("out/generated_data_frame.xlsx")
