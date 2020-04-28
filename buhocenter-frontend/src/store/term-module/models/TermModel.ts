export default interface TermModel {
    term: string;
    context: string;
    plural: string;
    created: string;
    updated: string;
    translation: {content: string, fuzzy: number, updated: string};
    reference: string;
    tags: any;
    comment: string;
}