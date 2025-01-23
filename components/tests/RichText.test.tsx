import { BLOCKS, Document } from '@contentful/rich-text-types';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RichText } from '../RichText';

const mockDocument: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [
        {
          nodeType: 'text',
          value: 'Test paragraph',
          marks: [],
          data: {},
        },
      ],
      data: {},
    },
    {
      nodeType: BLOCKS.EMBEDDED_ASSET,
      data: {
        target: {
          fields: {
            file: {
              url: '/test-image.jpg',
              details: {
                image: {
                  height: 600,
                  width: 800,
                },
              },
            },
            description: 'Test image',
          },
        },
      },
      content: [],
    },
  ],
};

describe('RichText Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<RichText notes={mockDocument} />);
    expect(container).toBeInTheDocument();
  });

  it('should display the correct text content', () => {
    const { getByText } = render(<RichText notes={mockDocument} />);
    expect(getByText('Test paragraph')).toBeInTheDocument();
  });

  it('should display the embedded image correctly', () => {
    const { getByAltText } = render(<RichText notes={mockDocument} />);
    const img = getByAltText('Test image') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('test-image.jpg');
    expect(img.height).toBe(600);
    expect(img.width).toBe(800);
  });
});
