# City Searcher

A simple web application that **counts** how many cities start with a given letter.

# Requirements
- **Node.js (v24.16.0 or higher)**

# How to run (dev)

- clone git project using ```git clone```
- go to the project folder ```cd city_searcher_test```

## Backend (Express): 
1. Go to back folder.
```cd back```
2. Install dependencies.
```npm install```
3. Run backend server.
```npm run dev``` 

## Frontend (React): 
**In a new terminal window**
1. Go to front folder.
```cd front```
2. Install dependencies.
```npm install```
3. Run frontend app.
```npm run dev``` 

Now you can access the application using [http://localhost:5173/](http://localhost:5173/)

# API
```markdown
GET /api/cities/count?letter={letter}
```
Returns the number of city names starting with the specified (a-z) letter.

Response example:
```markdown
  {
    "letter": "a",
    "count": 2
  }
```

# Notes
The results may vary because the API returns a different set of records. Using a fixed dataset would make the results consistent.