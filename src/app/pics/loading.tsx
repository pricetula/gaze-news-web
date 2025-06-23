/***
 * Loading component for the Pics page. This component wraps the pics page component in a suspense boundary.
 * What is a suspense boundary?
 * A suspense boundary is a component that wraps a component that is being loaded asynchronously.
 * It allows us to show a loading state while the component is being loaded.
 * It is a great way to handle loading states for components that are being loaded asynchronously.
 * It is also a great way to handle errors for components that are being loaded asynchronously.
 * This improves:-
 * 1. TTI (Time to interactive) - The time it takes for the page to be interactive.
 * 2. TTFB (Time to first byte) - The time it takes for the server to respond with the first byte of the response.
 * 3. TTFP (Time to first paint) - The time it takes for the browser to render the first pixel of the page.
 * 4. FCP (First contentful paint) - The time it takes for the browser to render the first bit of content from the DOM.
 */
export default function Loading() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[var(--font-roboto-sans)]">
            loading pics...from loading component
        </div>
    );
}