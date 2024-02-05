export type movieTypes = {
    id: number,
    title: string,
    poster_path: string,
    vote_average: number,
    release_date: string,
    runtime: string,
    videos: {
        results: [
            {
                iso_639_1: string
                key: string,
                site: string,
                type: string,
                official: boolean
            }
        ]
    };
};

export type tmdbType = {
    results: movieTypes[]
}