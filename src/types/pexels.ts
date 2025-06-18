export interface PexelsPhotoSrc {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
}

export interface PexelsPhoto {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: PexelsPhotoSrc;
    liked: boolean;
    alt: string;
}

export interface PexelsResponse {
    page: number;
    per_page: number;
    photos: PexelsPhoto[];
    next_page: string;
}