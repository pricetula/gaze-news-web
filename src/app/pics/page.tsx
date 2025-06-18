import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchPics } from "@/queries/pics/prefetch-pics";
import { Pics } from "@/features/pics/Pics";
import { getQueryClient } from "@/lib/react-query";

export default async function Page() {
    const queryClient = getQueryClient();
    await prefetchPics(queryClient, 1);
    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <Pics />
        </HydrationBoundary>
    );
}
