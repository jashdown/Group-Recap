'use client';

import { RecapPage } from "@/types/contentful";
import { useContentfulInspectorMode, useContentfulLiveUpdates } from "@contentful/live-preview/react";
import moment from "moment";
import { Markdown } from "./Markdown";
import { RichText } from "./RIchText";

export const Post = ({ page }: { page: RecapPage }) => {
  const updatedPage = useContentfulLiveUpdates(page);
  const inspectorProps = useContentfulInspectorMode({ entryId: page.sys.id });
  
  const {
      name,
      bookOfTheBible,
      chapter,
      date,
      notes,
      notesMarkdown
    } = updatedPage.fields;
  
    return (
      <div id="main">
        <div className="inner">
          <header id="header" {...inspectorProps({ fieldId: 'name' })}>{name}</header>
          <section>
            <header className="main">
              <h1>
                <span {...inspectorProps({ fieldId: 'bookOfTheBible' })}>{bookOfTheBible}</span>
                <span {...inspectorProps({ fieldId: 'chapter' })}>{chapter}</span>
              </h1>
              {date && <p {...inspectorProps({ fieldId: 'date' })}>{moment(date).format('MMMM Do, YYYY')}</p>}
            </header>
            {notes && <RichText notes={notes} {...inspectorProps({
                fieldId: 'notes',
              })}/>}
            {notesMarkdown && <Markdown notes={notesMarkdown} {...inspectorProps({
                fieldId: 'notesMarkdown',
              })}/>}
          </section>
        </div>
      </div>
    );
}