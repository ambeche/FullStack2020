import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent } from '@testing-library/react'
import {prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders title and author by default, but not url and likes', () => {
    const blog = {
      title: 'Learing to test react components with Jest and react-testing-library',
      author: 'Tara Che',
      url: 'http://localhost:3000',
      likes: 5,
      user: {
        username: 'Tams',
        name: 'Tara Che',
        id: '5f19b65e43f84f2e201ac8e6',
      },
      id: '5f1a2b2b6ea20b181c7966fa'
    }

    const component = render(
      <Blog blog={blog}/>
    )
    const div = component.container.querySelector('.hideOrShow')
    expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(div).toHaveStyle('display: none')

    console.log(prettyDOM(div));
    
  })
})