export interface Places {
    purchasing: Array<any>
    car_id: Array<any>;
    port: Array<any>;
}

export interface Gallery {
    id?: string;
    car_id: object;
    // places: Array<Places>;
    places: object
}