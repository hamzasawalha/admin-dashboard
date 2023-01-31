
export class Pagination {
    content: EditorialsViewDTO[];
    size: number;
    totalElements: number;
    totalPages: number;
}


export class EditorialsViewDTO {
    id: string;
    lessons: any[];
    titles: any[];
    updatedDate: string;
}


export class Editorials {
    id: number | undefined;
    arabicTitle: string;
    turkishTitle: string;
    lessons: string[];
}

export class EditorialsDTO {
    id: number | undefined;
    lessons: string[];
    titles: Localization[];
}

export class Localization {
    language: string = '';
    value: string = '';

    constructor(language?: string, value?: string) {
        this.language = language || '';
        this.value = value || '';
    }
}
