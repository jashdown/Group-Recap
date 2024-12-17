import { parse } from "marked";

export const Markdown = ({
  notes,
}: {
  notes: string
}) => {
  return (
    <div className="image fit"
      dangerouslySetInnerHTML={{
        __html: parse(notes, { breaks: true })
      }} />
  );
};
