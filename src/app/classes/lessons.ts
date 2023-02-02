
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
    arabicSubDescription: string;
    turkishSubDescription: string;
    arabicImages: any;
    turkishImages: any;
    arabicPosters: any;
    turkishPosters: any;
    startAt: number;
    endAt: number;
    videoUrl: string;
    language: string;
    level: string;
    category: string;
    subtitles: Subtitle[];

    constructor() {
        this.subtitles = new Array<Subtitle>();
    }
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
    subDescriptions: Localization[];
    subtitles: Subtitle[];
    category: string;
    startAt: number;
    endAt: number;

    constructor() {
        this.images = new Array<Image>();
        this.titles = new Array<Localization>();
        this.posterImages = new Array<Image>();
        this.descriptions = new Array<Localization>();
        this.subDescriptions = new Array<Localization>();
        this.subtitles = new Array<Subtitle>();
    }
}

export class Image {
    language: string;
    value: string;
}

export class Localization {
    language: string = '';
    value: string = '';

    constructor(language?: string, value?: string) {
        this.language = language || '';
        this.value = value || '';
    }
}


export class Subtitle {
    hour: number = 0;

    min: number = 0;

    sec: number = 0;

    translations: Localization[] = new Array<Localization>();
}
