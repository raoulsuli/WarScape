from flask import Flask, Response, request, jsonify
import mysql.connector
import json


app = Flask(__name__)


config = {
    'user': 'root',
    'password': 'root',
    'host': 'db',
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
            'lat': result[2],
            'lon': result[3],
            'is_full': result[4]
        }
        payload.append(content)
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify(payload), 200


@app.route('/api/shelters', methods=['POST'])
def add_shelter():
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    data = request.get_json()
    if data and 'city' in data and 'lat' in data and 'lon' in data and 'is_full' in data:
        city = data['city']
        lat = data['lat']
        lon = data['lon']
        is_full = data['is_full']
        try:
            cursor.execute('INSERT INTO shelters(city, lat, lon, is_full) VALUES (%s, %s, %s, %s)',
                           (city, lat, lon, is_full))
            connection.commit()
            shelter_id = cursor.lastrowid
            cursor.close()
            connection.close()
            return json.dumps({"id": shelter_id}), 201
        except mysql.connector.IntegrityError:
            return Response(status='409')
    return Response(status='400')


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')