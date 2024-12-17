import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import { BLOCKS } from "@contentful/rich-text-types";

export const RichText = ({
  notes,
}: {
  notes: Document
  }) => {
  console.log('notes: ', JSON.stringify(notes, null, 2));

  const options: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        // render the EMBEDDED_ASSET as you need
        return (
          <img
            src={`https://${node.data.target.fields.file.url}`}
            height={node.data.target.fields.file.details.image.height}
            width={node.data.target.fields.file.details.image.width}
            alt={node.data.target.fields.description}
          />
        );
      },
    },
  }

  return (
    <div className="m-10 text-left">
      {documentToReactComponents(notes, options)}
    </div>
  );
};
