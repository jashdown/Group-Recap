import { RecapPage } from "@/types/contentful";
import { createClient, CreateClientParams } from "contentful";

const {
  CONTENTFUL_API_KEY: API_KEY,
  CONTENTFUL_SPACE_ID: SPACE_ID,
  CONENTFUL_ENVIRONMENT: ENVIRONMENT,
} = process.env;

const createContentfulClient = ({ space, accessToken, ...otherClientParams }: Partial<CreateClientParams>) => {
  if (!space || !accessToken) {
    throw Error('No sapce id or accessToken for Contentful');
  }
  return createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken,
    // every other client parameter
    ...otherClientParams,
  })
}

const client = createContentfulClient({ space: SPACE_ID, accessToken: API_KEY, environment: ENVIRONMENT });

export const getRecapByRoute = async (
  route: string,
): Promise<RecapPage | null> => {
  const {
    items: [page],
  } = await client.getEntries({
    content_type: 'recapPage',
    'fields.slug': route,
  });

  if (!page) {
    return null;
  }

  return page as unknown as RecapPage;
};

export const getRecentRecaps = async (): Promise<RecapPage[] | null> => {
  const {
    items: pages,
  } = await client.getEntries({
    content_type: 'recapPage',
    // @ts-expect-error type error, but it really is works
    order: '-fields.date',
  });

  if (!pages || pages.length === 0) {
    return null;
  }

  return pages as unknown as RecapPage[];
};