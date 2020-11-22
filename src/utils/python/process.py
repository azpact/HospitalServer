import sys 
import json

result = {
    'Name': sys.argv[2],
    'From': sys.argv[1]
  }

json = json.dumps(result)

print(str(json))
sys.stdout.flush()