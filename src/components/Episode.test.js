import React from 'react'
import { screen, render } from '@testing-library/react'
import Episodes from './Episodes'

test('Check for errors while rendering', () => {
    render(<Episodes episodes={[]}/>)
})

const episodeList = [
    {id:1,
    name:'Episode 1',
    number: 1,
    season: 1,
    summary:'<p>Episode 1</p>',
    runtime: 20,
    image: {
        medium:'http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg',
        original:'http://static.tvmaze.com/uploads/images/original_untouched/67/168918.jpg'
    }}
]

test('Check for data re-rendering', () => {
    const { rerender } = render(<Episodes episodes={[]}/>)
    let episodeObject = screen.queryAllByTestId('episode')
    expect(episodeObject).toStrictEqual([])

    rerender(<Episodes episodes={episodeList}/>)
    episodeObject = screen.queryAllByTestId('episode')
    expect(episodeObject).toHaveLength(1)
})