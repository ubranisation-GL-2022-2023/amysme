import re

import PyPDF2


def readPDF_contract(file_path):
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
      print(reference)
      if contract["contractId"] == "":
        contract["contractId"] = reference
      elif contract["userId"] == "":
        contract["userId"] = reference
      elif contract["demandId"] == "":
        contract["demandId"] = reference
      elif contract["orderId"] == "":
        contract["orderId"] = reference
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
  return contract


def readPDF_cv(file_path):
  candidature = {
    "userName": "",
    "languages": [],
    "softSkills": [],
    "technicalSkills": [],
    "education": [],
    "workExperiene": [],
  }

  regexes = {
    "multi_lines": "^[1-9]+\. "
  }

  pdfFileObj = open(file_path, 'rb')
  pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
  pageObj = pdfReader.getPage(0)

  text = pageObj.extractText()

  lines = text.split('\n')
  for i in range(len(lines)):
    if i == 2:
      candidature["userName"] = lines[i].split(":")[1].strip()
    elif i == 8:
      languages = lines[i].split(":")[1].strip().split(",")
      candidature["languages"] = languages
    elif i == 9:
      softskills = lines[i].split(":")[1].strip().split(',')
      candidature["softSkills"] = softskills
    elif i == 10:
      tech_skills = lines[i].split(":")[1].strip().split(",")
      candidature["technicalSkills"] = tech_skills
    elif i == 11:  # ==> education
      education = True
      while (education):
        if re.search(regexes["multi_lines"], lines[i + 1]):
          education_line_list = lines[i + 1].split(".")[1:]
          education_line = ""
          for ele in education_line_list:
            education_line += ele
          candidature["education"].append(education_line)
          i += 1
        else:
          education = False

    elif "WORK" in lines[i].split(":")[0].strip().split(" "):
      work_xp = True
      while (work_xp):
        if re.search(regexes["multi_lines"], lines[i + 1]):
          xp_line_list = lines[i + 1].split(".")[1:]
          print(xp_line_list)
          xp_line = ""
          for ele in xp_line_list:
            xp_line += ele
          candidature["workExperiene"].append(xp_line)
          i += 1
        else:
          work_xp = False
  return candidature
