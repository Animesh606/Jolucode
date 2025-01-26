# API Documentation

## Base URL
```
https://api.jolucode.com/v1
```

## Authentication Endpoints

### POST /auth/register
Register a new user
```json
Request:
{
    "email": "student@college.edu",
    "password": "securePassword",
    "name": "John Doe",
    "college": "Engineering College"
}
Response: {
    "token": "jwt_token",
    "user": {
        "id": "user_id",
        "email": "student@college.edu",
        "name": "John Doe",
        "role": "student"
    }
}
```

### POST /auth/login
Login existing user
```json
Request:
{
    "email": "student@college.edu",
    "password": "securePassword"
}
Response: {
    "token": "jwt_token",
    "user": {
        "id": "user_id",
        "email": "student@college.edu",
        "name": "John Doe"
    }
}
```

## Profile Endpoints

### GET /profile
Get user's coding profile
```json
Response: {
    "profile": {
        "totalSolved": 150,
        "ranking": 25,
        "platforms": [
            {
                "platform": "leetcode",
                "username": "johncode",
                "problemsSolved": 50,
                "ranking": 10000
            },
            {
                "platform": "codeforces",
                "username": "john_doe",
                "problemsSolved": 100,
                "rating": 1500
            }
        ]
    }
}
```

### POST /profile/platform
Add/Update platform profile
```json
Request:
{
    "platform": "leetcode",
    "username": "johncode"
}
Response: {
    "status": "success",
    "message": "Platform profile added/updated"
}
```

## Problem Endpoints

### GET /problems
Get list of problems
```json
Response: {
    "problems": [
        {
            "id": "problem_id",
            "title": "Two Sum",
            "difficulty": "Easy",
            "tags": ["Arrays", "Hash Table"]
        }
    ]
}
```

### POST /problems/:id/submit
Submit solution for a problem
```json
Request:
{
    "language": "python",
    "code": "def solution():\n    pass"
}
Response: {
    "submission": {
        "id": "submission_id",
        "status": "ACCEPTED",
        "runtime": "50ms",
        "memory": "16.5MB"
    }
}
```

## Assignment Endpoints

### GET /assignments
Get list of assignments
```json
Response: {
    "assignments": [
        {
            "id": "assignment_id",
            "title": "Week 1 - Arrays",
            "dueDate": "2024-01-15T00:00:00Z",
            "status": "active"
        }
    ]
}
```

### POST /assignments (Admin only)
Create new assignment
```json
Request:
{
    "title": "Week 1 - Arrays",
    "description": "Practice array problems",
    "problems": ["problem_id1", "problem_id2"],
    "dueDate": "2024-01-15T00:00:00Z",
    "assignedTo": ["class_id1"]
}
Response: {
    "assignment": {
        "id": "assignment_id",
        "title": "Week 1 - Arrays",
        "status": "created"
    }
}
```

## Admin Endpoints

### GET /admin/stats
Get platform statistics
```json
Response: {
    "stats": {
        "totalUsers": 500,
        "activeAssignments": 5,
        "totalSubmissions": 1500,
        "averageCompletion": 85
    }
}
```
