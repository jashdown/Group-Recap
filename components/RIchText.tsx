import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";

export const RichText = ({
  notes,
}: {
  notes: Document
  }) => {
  const options: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        // render the EMBEDDED_ASSET as you need
        return (
          <Image
            src={`https:${node.data.target.fields.file.url}`}
            height={node.data.target.fields.file.details.image.height}
            width={node.data.target.fields.file.details.image.width}
            alt={node.data.target.fields.description}
            className="max-h-full max-w-full object-contain"
          />
        );
      },
    },
  }

  return (
    <>
      {documentToReactComponents(notes, options)}
    </>
  );
};
