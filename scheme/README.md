## Data Schema

Data schema can be found in [/resilience-app/src/app/model/schema.ts](../src/app/model/schema.ts)

## How to generate test data

### 1. Install Python and pip

Install Python: https://www.python.org

Install `pip` package installer for Python: https://pypi.org/project/pip/


### 2. Install Faker

Use `pip` to install [Faker](https://pypi.org/project/Faker/).
```
pip install faker
```

### 3. Generate test data

Short-cut from root `package.json` scripts:
```
npm run generate-testdata
```


Or, directly with Python:
```
python data.py
```
