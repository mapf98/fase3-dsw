export interface ResponseAuth {
    token: string;
    data: {
        id: number;
        name: string;
        lastName: string;
        uid: string;
        status: any;
        rol: any;
        birthDate: Date;
    };
}
