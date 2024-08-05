export interface FeedsTableProps {
    data?: Array<Feed>;
    page?: number;
    rowsPerPage?: number;
    totalCount?: number;
    totalPages?: number;
    onPageChange?: (newPage?: number) => void;
    onRowsPerPageChange?: (newRowsPerPage?: number) => void;
}

export interface CarouselProps {
    city?: string;
    country?: string;
    images?: string[];
    title?: string;
    video?: string;
}

export interface Feed {
    id?: string;
    city?: string;
    title_es?: string;
    description_es?: string;
    image_0?: string;
    image_1?: string;
    image_2?: string;
    image_3?: string;
    image_4?: string;
    country?: string;
    video?: string;
    price_amount?: string;
}

export interface FetchFeedsResponse {
    data?: Feed[],
    meta?: Meta,
}

export interface Meta {
    page?: number,
    limit?: number,
    total?: number,
    totalPages?: number,
}
