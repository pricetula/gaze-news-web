import { QueryClient } from "@tanstack/react-query";
import { getPicsQueryConfigs } from "./config";

export function prefetchPics(queryClient: QueryClient, page = 1) {
    return queryClient.prefetchQuery(getPicsQueryConfigs(page));
};
