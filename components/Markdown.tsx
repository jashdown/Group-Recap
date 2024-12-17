import { parse } from "marked";

export const Markdown = ({
  notes,
}: {
  notes: string
}) => {
  return (
    <div className="m-10 text-left"
      dangerouslySetInnerHTML={{
        __html: parse(notes, { breaks: true })
      }} />
  );
};
