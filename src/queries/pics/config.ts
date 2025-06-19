import { QueryFunctionContext } from "@tanstack/react-query";
import { getPics } from "./get-pics";

export function getPicsQueryConfigs(page: number) {
    return {
        queryKey: ["pics", page],
        queryFn: () => getPics(page),
        refetchInterval: false as false,
        refetchOnWindowFocus: false,
    };
}

export const picsInfiniteQueryConfigs = {
    queryKey: ["pics", "infinite"],
    queryFn: ({ pageParam = 1 }: QueryFunctionContext) => getPics(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
        const url = new URL(lastPage.next_page);
        return Number(url.searchParams.get("page")) || 1;
    },
}