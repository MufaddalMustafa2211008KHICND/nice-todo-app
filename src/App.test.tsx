import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('app component test cases', () => {
  it('app successfully renders', async () => {
    render(<App />)
    expect(await screen.findByRole('button')).toHaveTextContent('count is 0')
  })

  it('count increases by 1 when the button is clicked', async () => {
    render(<App />)
    const button = screen.getByRole('button')
    await userEvent.click(button)

    expect(button).toHaveTextContent('count is 1')
  })
})
