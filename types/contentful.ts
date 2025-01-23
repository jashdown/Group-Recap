import type { Document } from "@contentful/rich-text-types";

type RecapPageFields = {
  name: string;
  slug: string;
  bookOfTheBible: string;
  chapter: number;
  date: string,
  notes?: Document,
  notesMarkdown?: string,
  richTextFirst: boolean,
}

export type RecapPage = {
  sys: {
      contentType: {
          sys: {
              id: "recapPage";
          };
    };
    id: string;
  };
  fields: RecapPageFields;
}
