import yaml
import json

def readYAML():
	with open('files/example.yaml', 'r') as file:
	    configuration = yaml.safe_load(file)

	with open('out/example_yaml.json', 'w') as json_file:
	    json.dump(configuration, json_file)
	    
	output = json.dumps(json.load(open('out/example_yaml.json')), indent=2)
	print(output)