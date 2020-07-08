export interface SendPacketDimensionsDescriptions {
    commercial_ally_api_key: string;
    Warehouse_id: number;
    rec_first_name: string;
    rec_last_name: string;
    rec_email: string;
    rec_phone_number: string;
    destination_address: string;
    items: [
        {
            description: string;
            item_weight: number;
            item_length: number;
            item_width: number;
            item_height: number;
            characteristics: [];
        },
    ];
}
