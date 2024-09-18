import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StoryList.css';

const StoryList = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchStories = async () => {
            try {
                const response = await axios.get("http://localhost:8000/top10/");
                console.log(response.data)
                setStories(response.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch stories");
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="story-list">
            {stories.map((story, index) => (
                <div className="story" key={index}>
                    <a href={story.url} target="_blank" rel="noopener noreferrer" className="story-title">
                        {story.title.length > 50 ? `${story.title.slice(0, 30)}...` : story.title}
                    </a>
                    <span className='attributes'>
                        <p className="story-author">Author :<span> {story.author}</span></p>
                        <p className="story-score">Score : <span>{story.score}</span></p>
                        <p className="story-time">Posted on : <span>{story.time} </span></p>
                    </span>
                </div>
            ))}
            </div>  
    );
};

export default StoryList;
