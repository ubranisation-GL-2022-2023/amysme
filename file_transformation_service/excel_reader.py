import pandas as pd


def readEXCEL(file_path):
    df = pd.read_excel(file_path)

    json = df.to_json(orient='records')
    print(json)
