'use strict'

const username = {
  "type": "string",
  "minLength": 1,
  "maxLength": 10
};
const email = {
  "type": "string",
  "format": "email"
};
const password = {
  "type": "string",
  "minLength": 4,
  "maxLength": 8
};
const naturalNumber = {
  "type" : "integer",
  "minimum": 1,
}

exports.registSchema = {
  "id": "/Regist",
  "type": "object",
  "properties": {
    "username": username,
    "email": email,
    "password": password,
  },
  "required":["username", "email", "password"]
};

exports.loginSchema = {
  "id": "/Login",
  "type": "object",
  "properties": {
    "email": email,
    "password": password,
  },
  "required":["email", "password"]
};

exports.postSchema = {
  "id": "/Post",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "minLength": 5,
      "maxLength": 300
    }
  },
  "required": ["text"]
};

exports.naturalNumberSchema = naturalNumber;
