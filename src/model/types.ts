

export type AuthenticationParams = [string, string];


export interface IAuthenticationResult {
    result: number;
};


export interface IAuthenticationQuery {
    params: AuthenticationParams;
    result: IAuthenticationResult;
};

