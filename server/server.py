from flask import Flask, Response, request, jsonify
import mysql.connector
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

config = {
    'user': 'root',
    'password': 'root',
    # 'host': 'db',
    'port': '3306',
    'database': 'warscape_db'
}

@app.route('/api/shelters', methods=['GET'])
def get_shelters():
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    cursor.execute('select * from shelters')
    data = cursor.fetchall()
    payload = []
    for result in data:
        content = {
            'id': result[0],
            'city': result[1],
            'region': result[2],
            'address': result[3],
            'size': result[4],
            'capacity': result[5],
            'resources': result[6],
            'doctors': result[7],
            'risk': result[8]
        }
        payload.append(content)
    connection.commit()
    cursor.close()
    connection.close()
    response = jsonify(payload)
    return response, 200


@app.route('/api/shelters', methods=['POST'])
def add_shelter():
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    data = request.get_json()
    if data:
        try:
            cursor.execute('INSERT INTO shelters VALUES (%s, %s, %s, %s, %s, %s, %s, %s)', (
                data["city"], data["region"], data["address"], data["size"],
                data["capacity"], data["resources"], data["doctors"], data["risk"]
            ))
            connection.commit()
            shelter_id = cursor.lastrowid
            cursor.close()
            connection.close()
            return json.dumps({"id": shelter_id}), 201
        except mysql.connector.IntegrityError:
            return Response(status='409')
    return Response(status='400')


@app.route('/api/borders', methods=['GET'])
def get_borders():
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    cursor.execute('select * from borders')
    data = cursor.fetchall()
    payload = []
    for result in data:
        content = {
            'id': result[0],
            'city': result[1],
            'region': result[2],
            'address': result[3],
            'size': result[4],
            'capacity': result[5],
            'risk': result[6]
        }
        payload.append(content)
    connection.commit()
    cursor.close()
    connection.close()
    response = jsonify(payload)
    return response, 200


@app.route('/api/borders', methods=['POST'])
def add_border():
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    data = request.get_json()
    if data:
        try:
            cursor.execute('INSERT INTO borders VALUES (%s, %s, %s, %s, %s, %s, %s)', (
                data["city"], data["region"], data["address"], data["size"],
                data["capacity"], data["risk"]
            ))
            connection.commit()
            shelter_id = cursor.lastrowid
            cursor.close()
            connection.close()
            return json.dumps({"id": shelter_id}), 201
        except mysql.connector.IntegrityError:
            return Response(status='409')
    return Response(status='400')


def verify_id(elements, id):
    for elem in elements:
        if int(elem[0]) == int(id):
            id_exist = True
    if not id_exist:
        return Response(status='404')


@app.route('/api/shelters/<id>', methods=['PUT'])
def update_shelter(id):
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    data = request.json()

    cursor.execute('SELECT * FROM shelters')
    shelters = cursor.fetchall()
    verify_id(shelters, id)
    cursor.close()

    if data:
        if(int(data["id"] != int(id))):
            return Response(status="400")
        try:
            cursor = connection.cursor()
            cursor.execute('''UPDATE shelters SET city = %s, region = %s, 
                                address = %s, size = %s, capacity = %s,
                                resources = %s, doctors = %s, risk = %s WHERE id = %s''',
                           (data["city"], data["region"], data["address"], data["size"],
                                data["capacity"], data["resources"], data["doctors"], data["risk"], id))
            connection.commit()
            cursor.close()
            connection.close()
            return Response(status='200')
        except mysql.connector.IntegrityError:
            return Response(status='409')
    return Response(status='400')


@app.route('/api/borders/<id>', methods=['PUT'])
def update_border(id):
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    data = request.json()

    cursor.execute('SELECT * FROM borders')
    borders = cursor.fetchall()
    verify_id(borders, id)
    cursor.close()

    if data:
        if(int(data["id"] != int(id))):
            return Response(status="400")
        try:
            cursor = connection.cursor()
            cursor.execute('''UPDATE borders SET city = %s, region = %s, 
                                address = %s, size = %s, capacity = %s,
                                risk = %s WHERE id = %s''',
                           (data["city"], data["region"], data["address"], data["size"],
                                data["capacity"], data["risk"], id))
            connection.commit()
            cursor.close()
            connection.close()
            return Response(status='200')
        except mysql.connector.IntegrityError:
            return Response(status='409')
    return Response(status='400')


if __name__ == "_main_":
    app.run(debug=True, host='0.0.0.0')