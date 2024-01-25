from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')

db = SQLAlchemy(app)

print("Database URI:", app.config['SQLALCHEMY_DATABASE_URI'])

@app.route('/', methods=['GET'])
def get_data():
    return jsonify({'message': 'Hello from Flask backend!'})

# TEST ROUTE TO SEE IF DATABASE CONNECTED
@app.route('/test_db', methods=['GET'])
def test_db():
    try:
        result = db.session.execute(text("SELECT 1"))
        return jsonify({'message': f'Successfully connected to the database. Result: {result.scalar()}'}), 200
    except Exception as e:
        return jsonify({'message': f'Error connecting to the database: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
