import { draftMode } from "next/headers";

export async function PreviewBanner() {
  const { isEnabled: isDraftMode } = await draftMode();
  
  if (!isDraftMode) {
    return null;
  }

  return (
    <aside>
      <div className="fixed bg-gray-600 text-white w-full z-50 lg:[.cart-pane-on_&]:pr-[160px] 2xl:[.cart-pane-on_&]:pr-[160px] 2xl:[.cart-pane-on.cart-pane-open_&]:pr-[375px]">
        <div className="mx-auto px-5 text-sm">
          <div className="block text-center sm:flex sm:text-left justify-between items-center py-2">
            <p className="text-center">You are viewing this page in preview mode.</p>
            <p className="flex-shrink-0 sm:pl-5 pt-1 sm:pt-0">
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