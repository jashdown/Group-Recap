import { Markdown } from "@/components/Markdown";
import { RichText } from "@/components/RIchText";
import { getRecapByRoute } from "@/lib/contentful";
import moment from "moment";
import { notFound } from "next/navigation";


const getPageData = async (slug: string) => {
  const page = await getRecapByRoute(slug);

  return page?.fields;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const fields = await getPageData(slug);
  
  return {
    title: fields?.name,
  }
}


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const page = await getRecapByRoute(slug);

  if (page == null) {
    return notFound();
  }

  const { fields } = page;
  const {
    bookOfTheBible,
    chapter,
    date,
    notes,
    notesMarkdown
  } = fields;

  return (
    <div className="px-4 mx-auto max-w-screen-2xl overflow-hidden w-full">
      <div className="text-center max-w-[640px] mx-auto">
        <h1 className="mt-10 font-bold text-5xl">{bookOfTheBible} {chapter}</h1>
        {date && <h3>{moment(date).format('MMMM Do, YYYY')}</h3>}
        {notes && <RichText notes={notes} />}
        {notesMarkdown && <Markdown notes={notesMarkdown} />}
      </div>
    </div>
  );
}