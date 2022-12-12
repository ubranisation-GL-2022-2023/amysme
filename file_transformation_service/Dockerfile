FROM python:3.10.9

WORKDIR /file_transformation_service

COPY requirements.txt /requirements.txt

RUN pip install -r /requirements.txt 

COPY . .

CMD [ "python3","transform_files_apis.py" ]


