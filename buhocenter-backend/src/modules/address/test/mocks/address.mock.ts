import { Address } from '../../entities/address.entity';
import { User } from '../../../users/entities/user.entity';
import { Status } from '../../../status/entities/status.entity';
import { Payment } from '../../../payments/entities/payment.entity';

function createAddress(
    id: number,
    firstStreet: string,
    secondStreet: string,
    city: string,
    state: string,
    zipcode: number,
    setDefault: boolean,
    user: User | {},
    status: Status | {},
    payments: Payment[] | [],
): Address {
    return {
        id,
        firstStreet,
        secondStreet,
        city,
        state,
        zipcode,
        setDefault,
        user,
        status,
        payments,
        createdAt: new Date(),
        updatedAt: new Date(),
    } as Address;
}

function createStatus(
    id: number,
    name: string,
    description: string,
): Status {
    return {
        id,
        name,
        description,
    } as Status;
}

function createUser(
    id: number,
    name: string,
    lastName: string,
    birthdate: Date,
    email: string,
    is_federate: boolean,
    uid: string,
    token: string,
    language: string,
): User {
    return {
        id,
        name,
        language,
        lastName,
        birthdate,
        email,
        is_federate,
        uid,
        token,
    } as User;
}
  

export const addressMockDB: Address[] = [
    createAddress(
        1, 
        'Street A', 
        'AV. A', 
        'City A', 
        'State A', 
        1, 
        true, 
        createUser(
            1,
            'A',
            'AA',
            new Date(),
            'a@a.com',
            true,
            '1',
            'aaa',
            'ES'
        ),
        createStatus(
            1,
            "active",
            "it means that the product or service is currently available and ready for use"
        ), 
        []
    ),

    createAddress(
        2,
        'Street B',
        'AV. B',
        'City B',
        'State B',
        2,
        false,
        createUser(
            1,
            'B',
            'BB',
            new Date(),
            'B@B.com',
            true,
            '2',
            'bbb',
            'ES'
        ),
        createStatus(
            1,
            "active",
            "it means that the product or service is currently available and ready for use"
        ),
        []
    )
];

export const addressMockDelete: Address[] = [
    createAddress(
        2,
        'Street B',
        'AV. B',
        'City B',
        'State B',
        2,
        false,
        createUser(
            1,
            'B',
            'BB',
            new Date(),
            'B@B.com',
            true,
            '2',
            'bbb',
            'ES'
        ),
        createStatus(
            1,
            "active",
            "it means that the product or service is currently available and ready for use"
        ),
        []
    )
]
