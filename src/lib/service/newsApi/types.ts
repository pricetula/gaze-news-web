export interface Article {
    source: { id: string; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface NewSource {
    id: string;
    name: string;
    description: string;
    url: string;
}