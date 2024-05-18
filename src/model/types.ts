

export type GetSaltParams = [string];


export interface IGetSaltResult {
    password: string;
};


export interface IGetSaltQuery {
    params: GetSaltParams;
    result: IGetSaltResult;
};

