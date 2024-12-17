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
    name,
    bookOfTheBible,
    chapter,
    date,
    notes,
    notesMarkdown
  } = fields;

  return (
    <div id="main">
      <div className="inner">
        <header id="header">{name}</header>
        <section>
          <header className="main">
            <h1>{bookOfTheBible} {chapter}</h1>
            {date && <p>{moment(date).format('MMMM Do, YYYY')}</p>}
          </header>
          {notes && <RichText notes={notes} />}
          {notesMarkdown && <Markdown notes={notesMarkdown} />}
        </section>
      </div>
    </div>
  );
}