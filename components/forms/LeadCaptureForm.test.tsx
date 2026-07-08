/**
 * Test: LeadCaptureForm Component (Calendly replacement)
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LeadCaptureForm } from './LeadCaptureForm'

describe('LeadCaptureForm', () => {
  it('renders Calendly inline widget container', () => {
    const { container } = render(<LeadCaptureForm />)
    const widgetContainer = container.firstChild as HTMLElement
    expect(widgetContainer).toBeTruthy()
    expect(widgetContainer.style.minWidth).toBe('320px')
    expect(widgetContainer.style.height).toBe('700px')
  })

  it('accepts legacy props without error', () => {
    render(
      <LeadCaptureForm
        formType="property-search"
        source="test-source"
        stage="New Lead"
        defaultTags={['buyer']}
      />
    )
    expect(document.body).toBeTruthy()
  })
})
