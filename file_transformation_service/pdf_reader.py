import PyPDF2

contract = {}


def readPDF(file_path):
  pdfFileObj = open(file_path, 'rb')
  print( file_path)
  pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
  pageObj = pdfReader.getPage(0)

  print(pageObj.extractText())
  text = pageObj.extractText()

  # return { "data": []}

  lines = text.split('\n')
  # for i in lines:
  # 	print ('-->',i)

  # Agreement Date
  date = lines[2].split()[-1]
  contract['contractEstablishmentDate'] = date

  # USer ID
  user_ref = lines[5][:-3].split('(')[-1]
  user_id = user_ref.split('reference')[-1]
  contract['userId'] = user_id.replace(' ', '')

  # DEMAND ID

  # index of the line phrase 'SERVICES TO PERFORM'
  f = lines.index('SERVICES TO PERFORM  ')
  for l in lines[7:f]:
    if ('demand' in l):
      # index of the word 'demand'
      i = l.index('demand')

      demand_id = l[i + len('demand (reference') + 1:].split(')')[0]
      demand_id = demand_id.replace(' ', '')

      contract['demandId'] = int(demand_id)

  # Order Id
  index = lines.index('ORDER REVIEW  ')
  order_id = lines[index + 1].split()[-1]
  contract['orderId'] = int(order_id)

  # ENGINEERS
  contract['engineers'] = []
  index_start = lines.index('RESPONSIBLE ENGINEER’S REFERENCES  ') + 1
  index_end = lines.index('ORDER REVIEW  ')
  for line in lines[index_start:index_end]:
    line = line.split('(')
    ref = line[-1].strip()[:-1]
    eng_id = ref.split('reference')
    print(eng_id[-1])
    contract['engineers'].append(eng_id[-1].replace(' ', ''))

  print(contract)

  # closing the pdf file object
  pdfFileObj.close()
