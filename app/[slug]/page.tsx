import { ContentfulPreviewProvider } from '@/components/contentful-preview-provider';
import { Post } from "@/components/Post";
import { getRecapByRoute } from "@/lib/contentful";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

const getPageData = async (slug: string) => {
  const { isEnabled: isDraftMode }  = await draftMode();
  const page = await getRecapByRoute(slug, isDraftMode);

  return page;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const page = await getPageData(slug);
  
  return {
    title: page?.fields?.name,
  }
}


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
  }) {
  const { isEnabled: isDraftMode }  = await draftMode();
  const slug = (await params).slug
  const page = await getPageData(slug);

  if (page == null) {
    return notFound();
  }

  return (
    <ContentfulPreviewProvider
            locale="en-US"
            enableInspectorMode={isDraftMode}
            enableLiveUpdates={isDraftMode}
          >
      <Post page={page} />
    </ContentfulPreviewProvider>
  );
}