import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

type ParsedRequestUrl = {
  origin: string;
  path: string;
  contentfulPreviewSecret: string;
};

const parseRequestUrl = (
  requestUrl: string | undefined,
): ParsedRequestUrl => {
  if (!requestUrl) throw new Error('missing `url` value in request')
  const { searchParams, origin } = new URL(requestUrl);

  const rawPath = searchParams.get('path') || '';
  const contentfulPreviewSecret = searchParams.get('secret') || '';

  // to allow query parameters to be passed through to the redirected URL, the original `path` should already be
  // URI encoded, and thus must be decoded here
  const path = decodeURIComponent(rawPath);

  return { origin, path, contentfulPreviewSecret };
};

const buildRedirectUrl = ({
  path,
  base,
}: {
  path: string;
  base: string;
  }): string => {
  const redirectUrl = new URL(path, base);

  return redirectUrl.toString();
};

export async function GET(
  request: NextRequest,
): Promise<Response | void> {
  const {
    origin: base,
    path,
    contentfulPreviewSecret: contentfulPreviewSecretFromQuery,
  } = parseRequestUrl(request.url);

  if (contentfulPreviewSecretFromQuery !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response(
      'The bypass token you are authorized with does not match the bypass secret for this deployment. You might need to redeploy or go back and try the link again.',
      { status: 403 },
    );
  }

  if (!path) {
    return new Response('Missing required value for query parameter `path`', {
      status: 400,
    });
  }

  (await draftMode()).enable();


  const redirectUrl = buildRedirectUrl({ path, base });
  redirect(redirectUrl);
}
