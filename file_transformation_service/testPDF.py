import re

import PyPDF2

file_path = "files/contract.pdf"

contract = {
  "contractId": "",
  "demandId": "",
  "orderId": "",
  "userId": "",
  "contractEstablishmentDate": "",
  "installationDate": "",
  "status": "",
  "engineers": [],
  "orderPriority": "",
}

regexes = {
  "reference": ".*reference.*",
  "date": "[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}",
  "priority": "priority: "
}

pdfFileObj = open(file_path, 'rb')
print(file_path)
pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
pageObj = pdfReader.getPage(0)

text = pageObj.extractText()

lines = text.split('\n')
for line in lines:
  if re.search(regexes["date"], line):
    slashes = line.split("/")
    date = slashes[0][-2:] + "/" + slashes[1] + "/" + slashes[2][0:4]
    if contract["contractEstablishmentDate"] == "":
      contract["contractEstablishmentDate"] = date
    else:
      contract["installationDate"] = date
  if re.search(regexes["reference"], line):
    splits = line.split("reference")
    if splits[1].strip()[0] == ":":
      res = splits[1].strip()[1:].strip()
    else:
      res = splits[1].strip()
    reference = ""
    for c in res:
      if c.isdigit():
        reference += c
      else:
        break
    if contract["contractId"] == "":
      contract["contractId"] = reference
    elif contract["demandId"] == "":
      contract["demandId"] = reference
    elif contract["orderId"] == "":
      contract["orderId"] = reference
    elif contract["userId"] == "":
      contract["userId"] = reference
    else:
      contract["engineers"].append(reference)

  if re.search(regexes["priority"], line):
    splits = line.split("priority")
    priority = ""
    for c in splits[1]:
      if c not in [")", " ", ":", "."]:
        priority += c
    contract["orderPriority"] = priority
  contract["status"] = "inProcess"

print(contract)
