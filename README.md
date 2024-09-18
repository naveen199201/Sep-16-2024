# Sep-16-2024

## Project Setup(React + FastAPI App with Docker Compose)

### Clone the Repository

The first thing to do is to clone the repository:

```sh
$ git clone https://github.com/naveen199201/Sep-16-2024.git

```
### Build and Run the Application

Use docker-compose to build the images and run the containers:

```sh
$ docker-compose up --build
```
This command will:
    Build the Docker images for both the frontend (React) and backend (FastAPI).

### Access the Application

**Frontend:** 
Open your browser and navigate to [http://localhost] to view the React application.

**Backend:** 
The FastAPI API is available at [http://localhost:8000].

### Interacting with the API

    The backend provides a /top10 endpoint that fetches the top 10 stories from HackerNews.
    You can directly access it by visiting: [http://localhost:8000/top10] in your browser.


