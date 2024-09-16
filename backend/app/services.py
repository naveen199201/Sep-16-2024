import httpx
from datetime import datetime,timezone
from fastapi import HTTPException
import asyncio

def format_time(timestamp):
    return datetime.fromtimestamp(timestamp, tz=timezone.utc).strftime('%b %d, %Y')

TOP_STORIES = "https://hacker-news.firebaseio.com/v0/topstories.json"
ITEM_URL = "https://hacker-news.firebaseio.com/v0/item/{}.json"

async def fetch_story(story_id):
    async with httpx.AsyncClient() as client:
        response = await client.get(ITEM_URL.format(story_id))
        response.raise_for_status()
        return response.json()

async def top10_stories():
    try:
        # Fetch the top stories IDs
        async with httpx.AsyncClient() as client:
            response = await client.get(TOP_STORIES)
            response.raise_for_status()
            story_ids = response.json()[:10]
        stories = await asyncio.gather(*(fetch_story(story_id) for story_id in story_ids))
        result = []
        for story in stories:
            story_data = {
                "title": story.get("title"),
                "author": story.get("by"),
                "url": story.get("url"),
                "score": story.get("score"),
                "time": format_time(story.get("time"))
            }
            result.append(story_data)

        return result

    except httpx.RequestError:
        raise HTTPException(status_code=503, detail="HackerNews API is unreachable.")  
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred.")
