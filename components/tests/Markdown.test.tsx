import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Markdown } from '../Markdown';

describe('Markdown Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<Markdown notes="**Test** _Markdown_" />);
    expect(container).toBeInTheDocument();
  });

  it('should render markdown content correctly', () => {
    const { container } = render(<Markdown notes="**Test** _Markdown_" />);
    expect(container.innerHTML).toContain('<strong>Test</strong>');
    expect(container.innerHTML).toContain('<em>Markdown</em>');
  });

  it('should handle empty notes correctly', () => {
    const { container } = render(<Markdown notes="" />);
    expect(container.innerHTML).toBe('<div class="image fit"></div>');
  });
});
