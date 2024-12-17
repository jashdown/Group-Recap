import { getRecentRecaps } from "@/lib/contentful";
import moment from "moment";

export const revalidate = 21600 // invalidate every six hours

// testing change

export default async function Home() {
  const pages = await getRecentRecaps();

  return (
    <div>
      <h1>Recent Discussions</h1>
      <ul>
        {pages?.map((page) => {
          const { fields } = page;
          const { slug, bookOfTheBible, chapter, date } = fields;
          return <li key={slug}><a href={`/${slug}`}>{bookOfTheBible} {chapter}</a> {date && <span>- {moment(date).format('MMMM Do, YYYY')}</span>}</li>
        })}
      </ul>
    </div>
  );
}
