export interface ResponseAuth {
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
