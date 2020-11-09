import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, waitFor, screen} from '@testing-library/react'

import App from './App'
import { fetchShow as mockFetchShow} from './api/fetchShow'

jest.mock('./api/fetchShow.js')

const results = {
    data: {
      image: { original: "" },
      name: "This is the name",
      summary: "<p>This is the Summary</p>",
      _embedded: {
        episodes: [
          {
            id: 1,
            name: "Episode 1",
            number: 1,
            season: 1,
            summary: "<p>Episode 1</p>",
            runtime: 20,
            image: {
              medium:
                "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
              original:
                "http://static.tvmaze.com/uploads/images/original_untouched/67/168918.jpg",
            },
          },
        ],
      },
    }
  }

  test("render App without errors", async () => {
    mockFetchShow.mockResolvedValueOnce(results);

    render(<App />);
  
    const fetchingData = screen.queryAllByText(/fetching data/i)
    expect(fetchingData).toBeInTheDocument
  
    await waitFor(() => {
      expect(fetchingData).not.toBeInTheDocument

      const name = screen.getByText(/the name/i)
      const summary = screen.getByText(/the summary/i)
  
      expect(name).toHaveTextContent("This is the name")
      expect(summary).toHaveTextContent("This is the Summary")
      
    })
  
  
  });
  
  