//send-packet-RO Response-Object
export interface SendPacketRO {
    ordersheet_id: string;
    creation_date: string;
    origin: string;
    destination: string;
    order_type: string;
    ignore_holidays: boolean;
    discount: number;
    facturation_amount: number;
    subtotal: number;
    additional_taxes: number;

    shipper: {
        fullname: string;
        document: number;
        email: string;
        phone_number: string;
    };

    receiver: {
        fullname: string;
        document: null;
        email: string;
        phone_number: string;
    };

    packages: [
        {
            description: string;
            weight: number;
            height: number;
            length: number;
            width: number;
            characteristics: [
                {
                    name: string;
                },
            ];
            cost: number;
        },
    ];
}
