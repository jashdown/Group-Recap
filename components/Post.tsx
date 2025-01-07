'use client';

import { RecapPage } from "@/types/contentful";
import { useContentfulInspectorMode, useContentfulLiveUpdates } from "@contentful/live-preview/react";
import moment from "moment";
import { Markdown } from "./Markdown";
import { RichText } from "./RichText";

export const Post = ({ page }: { page: RecapPage }) => {
  const updatedPage = useContentfulLiveUpdates(page);
  const inspectorProps = useContentfulInspectorMode({ entryId: page.sys.id });
  
  const {
    name,
    bookOfTheBible,
    chapter,
    date,
    notes,
    notesMarkdown,
    richTextFirst,
  } = updatedPage.fields;
  
  return (
    <div id="main">
      <div className="inner">
        <header id="header" {...inspectorProps({ fieldId: 'name' })}>
          <h1>{name}</h1>
        </header>
        <section>
          <header className="main">
            {date && <p {...inspectorProps({ fieldId: 'date' })}>{moment(date).format('MMMM Do, YYYY')}</p>}
          </header>
          {richTextFirst && notes && <RichText notes={notes} {...inspectorProps({
              fieldId: 'notes',
            })}/>}
          {notesMarkdown && <Markdown notes={notesMarkdown} {...inspectorProps({
              fieldId: 'notesMarkdown',
            })}/>}
          {!richTextFirst && notes && <RichText notes={notes} {...inspectorProps({
              fieldId: 'notes',
            })}/>}
        </section>
      </div>
    </div>
  );
}
