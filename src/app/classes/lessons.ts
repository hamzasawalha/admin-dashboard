
export class Pagination {
    content: LessonsViewDTO[];
    size: number;
    totalElements: number;
    totalPages: number;
}


export class LessonsViewDTO {
    level: string;
    id: string;
    titles: any[];
    updatedDate: string;
}


export class Lessons {
    id: number | undefined;
    arabicTitle: string;
    turkishTitle: string;
    arabicDescription: string;
    turkishDescription: string;
    arabicImages: any;
    turkishImages: any;
    arabicPosters: any;
    turkishPosters: any;
    videoUrl: string;
    language: string;
    level: string;
}

export class LessonsDTO {
    id: number | undefined;
    videoUrl: string;
    language: string;
    level: string;
    images: Image[] | undefined;
    posterImages: Image[] | undefined;
    titles: Localization[];
    descriptions: Localization[];
    subtitles: Subtitle[];

    constructor() {
        this.images = new Array<Image>();
        this.titles = new Array<Localization>();
        this.posterImages = new Array<Image>();
        this.descriptions = new Array<Localization>();
        this.subtitles = new Array<Subtitle>();
    }
}

export class Image {
    language: string;
    value: string;
}

export class Localization {
    language: string;
    value: string;
}

export class Subtitle {
    hour: number;

    min: number;

    sec: number;

    translations: Localization[];
}
