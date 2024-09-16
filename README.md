# Sep-16-2024

## Backend Setup

The first thing to do is to clone the repository:

```sh
$ git clone https://github.com/naveen199201/Sep-16-2024.git
$ cd backend
```

Create a virtual environment to install dependencies in and activate it:

```sh
$ py -m venv env
$ .\env\Scripts\Activate.ps1
```

Then install the dependencies:
a 
```sh
(env)$ pip install -r requirements.txt 
```
Note the `(env)` in front of the prompt. This indicates that this terminal
session operates in a virtual environment set up by `virtualenv2`.

Once `pip` has finished downloading the dependencies:
```sh
(env)$ uvicorn app.main:app --reload
```

## Frontend Setup
First thing to do is to install the required node modules
```sh
$ cd frontend
$ npm install
```
Start the app by using the following command
```sh
$ npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
