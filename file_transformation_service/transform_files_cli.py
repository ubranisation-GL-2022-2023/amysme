import sys

from csv_reader import readCSV
from excel_reader import readEXCEL
from pdf_reader import readPDF
from yaml_reader import readYAML

ALLOWED_EXTENSIONS = [
  "pdf",
  "csv",
  "yaml",
  "xlsx"
]


def main(argv):
  extension = argv[1].split(".")[-1]

  print(extension)

  if extension == ALLOWED_EXTENSIONS[0]:
    readPDF(argv[1])
  elif extension == ALLOWED_EXTENSIONS[1]:
    readCSV(argv[1])
  elif extension == ALLOWED_EXTENSIONS[2]:
    readYAML(argv[1])
  elif extension == ALLOWED_EXTENSIONS[3]:
    readEXCEL(argv[1])
  else:
    sys.exit()


if __name__ == '__main__':
  main(sys.argv)
