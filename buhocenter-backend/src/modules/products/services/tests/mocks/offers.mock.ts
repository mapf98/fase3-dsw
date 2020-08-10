export const offerMockDB = [
    {
        id: 1,
        createdAt: new Date('2020-08-09T03:19:53.372Z'),
        updatedAt: new Date('2020-08-09T03:19:53.372Z'),
        name: 'Semester offer',
        description: 'Oferta para los estudiantes como parte del incio del semestre',
        percentage: 10,
    },
    {
        id: 2,
        createdAt: new Date('2020-08-09T03:19:53.372Z'),
        updatedAt: new Date('2020-08-09T03:19:53.372Z'),
        name: 'Birth offer',
        description: 'Oferta para los estudiantes como parte del fin del semestre',
        percentage: 20,
    },
];

export const createOffer = {
    name: 'Nueva oferta',
    description: 'descripcion',
    percentage: 10,
};

export const responseCreate = {
    name: 'Nueva oferta',
    description: 'descripcion',
    percentage: 10,
    status: {
        id: 1,
        createdAt: new Date('2020-08-09T03:19:53.372Z'),
        updatedAt: new Date('2020-08-09T03:19:53.372Z'),
        name: 'Active',
        description: 'Indicates that the resource is available to the system',
    },
    createdAt: new Date('2020-08-09T18:36:56.598Z'),
    updatedAt: new Date('2020-08-09T18:36:56.598Z'),
    id: 4,
};
