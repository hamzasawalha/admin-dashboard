export class CategoriesViewDTO {
    code: string;
    createdDate: string;
    id: string;
    images: any[];
    names: any[];
    parent: any;
    updatedDate: string;
}

export class Categories {
    id: number | undefined;
    arabicName: string;
    turkishName: string;
    code: string;
    arabicImages: any;
    turkishImages: any;
}

export class CategoriesDTO {
    id: number | undefined;
    code: string;
    images: Image[] | undefined;
    names: Names[];

    constructor() {
        this.images = new Array<Image>();
        this.names = new Array<Names>();
    }
}

export class Image {
    language: string;
    value: string;
}

export class Names {
    language: string;
    value: string;
}