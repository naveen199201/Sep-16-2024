from fastapi import FastAPI, HTTPException
from app.services import top10_stories

app = FastAPI()

@app.get("/top10")
async def get_top_10_stories():
    try:
        return await top10_stories()
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while fetching stories.")
