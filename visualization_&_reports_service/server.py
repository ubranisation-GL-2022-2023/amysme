import json
from flask import Flask
from flask import jsonify
from hr import hr_statistics
from marketing import marketing_statistics
from finance import finance_statistics

app = Flask(__name__)


@app.route('/hr', methods=['GET'])
def hr_report():
    hr_statistics()
    return jsonify({'message': True})


@app.route('/finance', methods=['GET'])
def finance_report():
    finance_statistics()
    return jsonify({'message': True})


@app.route('/marketing', methods=['GET'])
def marketing_report():
    marketing_statistics() 
    return jsonify({'message': True})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5100, debug=True)
