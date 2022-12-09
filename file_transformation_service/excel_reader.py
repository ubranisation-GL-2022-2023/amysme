import pandas as pd


def readEXCEL():
    df = pd.read_excel('files/users.xlsx')

    json = df.to_json(orient='records')
    print(json)
