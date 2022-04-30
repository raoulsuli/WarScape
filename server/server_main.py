from flask import Flask, Response, request
import mysql.connector


app = Flask(__name__)


config = {
    'user': 'root',
    'password': 'root',
    'host': 'db',
    'port': '3306',
    'database': 'warscape_db'
}


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')