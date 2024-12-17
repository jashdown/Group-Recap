import type { Document } from "@contentful/rich-text-types";
import { Entry, EntrySkeletonType } from "contentful";

type RecapPageFields = {
  name: string;
  slug: string;
  bookOfTheBible: string;
  chapter: number;
  date: string,
  notes?: Document,
  notesMarkdown?: string,
}

export type RecapPage = Entry<EntrySkeletonType<RecapPageFields, 'recapPage'>, undefined> 