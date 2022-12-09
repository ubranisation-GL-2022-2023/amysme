import csv
import json


def readCSV():
    with open('files/addresses.csv', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        row_count = 0
        columns = []
        out = {
            'data': []
        }
        for row in reader:
            if row_count == 0:
                row_count += 1
                columns = row
            else:
                data = {}
                i = 0
                for col in columns:
                    data[col] = row[i]
                    i += 1
                out['data'].append(data)

        json_object = json.dumps(out)

        with open("out/csv_out.json", "w") as outfile:
            outfile.write(json_object)
