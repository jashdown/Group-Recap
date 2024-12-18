import { getRecentRecaps } from "@/lib/contentful";
import moment from "moment";
import Link from "next/link";

export const revalidate = 21600 // invalidate every six hours

export default async function Home() {
  const pages = await getRecentRecaps();

  return (
    <div id="main">
      <div className="inner">
        <header id="header"><h1>Recent Discussions</h1></header>
        <section>
          <ul>
            {pages?.map((page) => {
              const { fields } = page;
              const { slug, bookOfTheBible, chapter, date } = fields;
              return <li key={slug}><Link href={`/${slug}`}>{bookOfTheBible} {chapter}</Link> {date && <span>- {moment(date).format('MMMM Do, YYYY')}</span>}</li>
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
