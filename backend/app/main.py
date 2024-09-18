from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.services import top10_stories

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  
    allow_methods=["*"],  
    allow_headers=["*"],  
)


@app.get("/top10")
async def get_top_10_stories():
    try:
        return await top10_stories()
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while fetching stories.")
