import { useQuery } from "@tanstack/react-query";
import { getPicsQueryConfigs } from "./config";
import type { PexelsResponse } from "@/types/pexels";

export function useClientFetchPics(page = 1) {
    return useQuery<PexelsResponse>(getPicsQueryConfigs(page));
};
