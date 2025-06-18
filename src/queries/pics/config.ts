import { getPics } from "./get-pics";

export function getPicsQueryConfigs(page: number) {
    return {
        queryKey: ["pics", page],
        queryFn: () => getPics(page),
        refetchInterval: false as false,
        refetchOnWindowFocus: false,
    };
}
