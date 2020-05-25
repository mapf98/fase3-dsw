export interface ResponseAuth {
    apiAccessToken: string;
    token: string;
    data: {
        id: number;
        name: string;
        lastName: string;
        uid: string;
        status: any;
        rol: any;
        email: string;
        is_federate: boolean;
        birthDate: Date;
        language: any;
    };
}
