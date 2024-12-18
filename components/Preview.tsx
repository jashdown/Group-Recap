import { draftMode } from "next/headers";

export async function PreviewBanner() {
  const { isEnabled: isDraftMode } = await draftMode();
  
  if (!isDraftMode) {
    return null;
  }

  return (
    <aside>
      <div className="fixed bg-gray-600 text-white w-full z-50">
        <div className="mx-auto px-5 text-sm">
          <div className="text-center flex sm:text-left justify-center items-center py-2 content-center">
            <p className="ml-auto">You are viewing this page in preview mode.</p>
            <p className="flex-shrink-0 sm:pl-5 pt-1 sm:pt-0 ml-auto">
              <a
                className="inline-block underline hover:text-blue-200 duration-200 transition-colors"
                href={`/api/disable-draft`}
              >
                Exit preview mode
              </a>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}