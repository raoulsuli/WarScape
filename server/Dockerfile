FROM python:3.8.5-alpine

EXPOSE 5000

COPY . /server
WORKDIR /server

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

CMD python server_main.py