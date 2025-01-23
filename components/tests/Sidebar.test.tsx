import { RecapPage } from '@/types/contentful';
import { BLOCKS } from '@contentful/rich-text-types';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Sidebar } from '../Sidebar';

const mockRecapPages: RecapPage[] = [
  {
    sys: {
      contentType: {
        sys: {
          id: 'recapPage',
        },
      },
      id: '3',
    },
    fields: {
      slug: 'recap-3',
      name: 'Recap 3',
      date: '2024-10-01T12:00:00Z',
      bookOfTheBible: 'Genesis',
      chapter: 3,
      notes: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
            {
                nodeType: BLOCKS.PARAGRAPH,
                data: {},
                content: [
                    {
                        "nodeType": "text",
                        "value": "Notes for Recap 3.",
                        "marks": [],
                        "data": {}
                    }
                ]
            }
        ]
      },
      notesMarkdown: 'Markdown notes for Recap 3',
      richTextFirst: true,
    },
  },
  {
    sys: { 
      contentType: {
        sys: {
          id: 'recapPage',
        },
      },
      id: '2'
    },
    fields: {
      slug: 'recap-2',
      name: 'Recap 2',
      date: '2024-09-01T12:00:00Z',
      bookOfTheBible: 'Genesis',
      chapter: 2,
      notes: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
            {
                nodeType: BLOCKS.PARAGRAPH,
                data: {},
                content: [
                    {
                        "nodeType": "text",
                        "value": "Notes for Recap 2.",
                        "marks": [],
                        "data": {}
                    }
                ]
            }
        ]
      },
      notesMarkdown: 'Markdown notes for Recap 2',
      richTextFirst: false,
    },
  },
  {
    sys: { 
      contentType: {
        sys: {
          id: 'recapPage',
        },
      },
      id: '1'
    },
    fields: {
      slug: 'recap-1',
      name: 'Recap 1',
      date: '2024-08-01T12:00:00Z',
      bookOfTheBible: 'Genesis',
      chapter: 1,
      notes: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
            {
                nodeType: BLOCKS.PARAGRAPH,
                data: {},
                content: [
                    {
                        "nodeType": "text",
                        "value": "Notes for Recap 1.",
                        "marks": [],
                        "data": {}
                    }
                ]
            }
        ]
      },
      notesMarkdown: 'Markdown notes for Recap 1',
      richTextFirst: true,
    },
  },
];

describe('Sidebar Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<Sidebar pages={mockRecapPages} />);
    expect(container).toBeInTheDocument();
  });

  it('should render the Get in touch section', () => {
    const { getByText } = render(<Sidebar pages={mockRecapPages} />);
    expect(getByText('Get in touch')).toBeInTheDocument();
  });

  it('should render the Recent Discussions', () => {
    render(<Sidebar pages={mockRecapPages} />);
    expect(screen.getByTestId('recentLink-3')).toHaveTextContent('Genesis 3 - October 1st, 2024');
    expect(screen.getByTestId('recentLink-2')).toHaveTextContent('Genesis 2 - September 1st, 2024');
    expect(screen.getByTestId('recentLink-1')).toHaveTextContent('Genesis 1 - August 1st, 2024');
  });
});