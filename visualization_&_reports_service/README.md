# Service Overview

## General idea on the service
This microservice is responsible for generating reports on Marketing, Hr as well as Finance departments containing different charts and diagrams. The generated reports are PDF files that will be created inside the reports folder. Before running the server.py which is the Flask backend server for the project, it is necessary to install seaborn package that will be used for generating charts:
```
pip install seaborn
```
## Requests

| Action  | Role | URL|Method
| ------------- |:-------------:| :-------------:| ------------- |
| hr_statistics | generates HR report  | http://localhost:5000/hr | GET
| marketing_statistics | generates Marketing report |http://localhost:5000/marketing |GET
| finance_statistics |  generates Finance report |http://localhost:5000/finance | GET

