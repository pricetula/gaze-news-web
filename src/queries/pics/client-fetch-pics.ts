import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { picsInfiniteQueryConfigs, getPicsQueryConfigs } from "./config";
import type { PexelsResponse } from "@/types/pexels";

export function useClientFetchPics(page = 1) {
    return useQuery<PexelsResponse>(getPicsQueryConfigs(page));
};

export function useInfiniteFetchPics() {
    return useInfiniteQuery<PexelsResponse>(picsInfiniteQueryConfigs);
};
