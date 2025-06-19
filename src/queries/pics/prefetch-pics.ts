import { QueryClient } from "@tanstack/react-query";
import { getPicsQueryConfigs, picsInfiniteQueryConfigs } from "./config";

export function prefetchPics(queryClient: QueryClient, page = 1) {
    return queryClient.prefetchQuery(getPicsQueryConfigs(page));
};

export function prefetchInfinitePics(queryClient: QueryClient) {
    return queryClient.prefetchInfiniteQuery(picsInfiniteQueryConfigs);
};