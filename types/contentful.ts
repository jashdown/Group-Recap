import { Entry, EntrySkeletonType } from "contentful";

type RecapPageFields = {
  name: string;
  slug: string;
  bookOfTheBible: string;
  chapter: number;
  date?: string,
  notes: Document,
}

export type RecapPage = Entry<EntrySkeletonType<RecapPageFields, 'recapPage'>, undefined> 