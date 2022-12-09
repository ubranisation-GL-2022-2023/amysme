from csv_reader import readCSV
from excel_reader import readEXCEL
from pdf_reader import readPDF
from yaml_reader import readYAML


def main():
  print("choose input file type:")
  print("1 - csv")
  print("2 - excel")
  option = int(input("Option : "))
  if option == 1:
    readCSV()

  elif option == 2:
    readEXCEL()

  elif option == 3:
    readYAML()
  elif option == 4:
    readPDF()


if __name__ == '__main__':
  main()
