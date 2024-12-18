import { RecapPage } from "@/types/contentful";
import { createClient, CreateClientParams } from "contentful";
import { draftMode } from "next/headers";

const {
  CONTENTFUL_API_KEY: API_KEY,
  CONTENTFUL_PREVIEW_API_KEY: PREVIEW_API_KEY,
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

const client = async () => {
  const baseOptions: Partial<CreateClientParams> = { space: SPACE_ID, accessToken: API_KEY, environment: ENVIRONMENT };
  const { isEnabled: isPreview }  = await draftMode();
  if (isPreview) {
    return createContentfulClient({ ...baseOptions, accessToken: PREVIEW_API_KEY, host: 'preview.contentful.com' })
  }
  return createContentfulClient(baseOptions)
};

export const getRecapByRoute = async (
  route: string,
): Promise<RecapPage | null> => {
  const {
    items: [page],
  } = await (await client()).getEntries({
    content_type: 'recapPage',
    'fields.slug': route,
  });

  if (!page) {
    return null;
  }

  return page as unknown as RecapPage;
};

export const getRecentRecaps = async (limit: number = 12): Promise<RecapPage[] | null> => {
  const {
    items: pages,
  } = await (await client()).getEntries({
    content_type: 'recapPage',
    // @ts-expect-error type error, but it really is works
    order: '-fields.date',
    limit,
  });

  if (!pages || pages.length === 0) {
    return null;
  }

  return pages as unknown as RecapPage[];
};