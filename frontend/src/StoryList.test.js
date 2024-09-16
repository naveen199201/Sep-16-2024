import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoryList from './StoryList';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

const axios = require('axios');

describe('StoryList Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    axios.get.mockImplementationOnce(() => new Promise(() => {})); 

    render(<StoryList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state when API call fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch stories'));

    render(<StoryList />);
    
    await waitFor(() => expect(screen.getByText('Failed to fetch stories')).toBeInTheDocument());
  });

  test('renders story list when API call succeeds', async () => {
    const mockStories = [
      {
        title: 'First Story',
        url: 'https://example.com/story1',
        author: 'Author1',
        score: 100,
        time: '2024-09-15',
      },
      {
        title: 'Second Story',
        url: 'https://example.com/story2',
        author: 'Author2',
        score: 200,
        time: '2024-09-16',
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockStories });

    render(<StoryList />);

    await waitFor(() => {
        // Assert that stories are rendered
        expect(screen.getByText('First Story')).toBeInTheDocument();
    });
    expect(screen.getByText('Second Story')).toBeInTheDocument();

    const firstStoryLink = screen.getByText('First Story');
    expect(firstStoryLink).toHaveAttribute('href', 'https://example.com/story1');
  });

  test('handles empty story list gracefully', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<StoryList />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    expect(screen.queryByText(/Story/i)).not.toBeInTheDocument();
  });
});
