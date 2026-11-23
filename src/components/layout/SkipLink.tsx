/** First focusable element on every page: jumps past the navigation. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-pine-evergreen focus:px-5 focus:py-3 focus:text-cloud-mist"
    >
      Skip to main content
    </a>
  );
}
