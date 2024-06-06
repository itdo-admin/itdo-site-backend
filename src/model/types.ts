

export type GetVacancyAllParams = [];


export interface IGetVacancyAllResult {
    description: string | null;
	id: number;
	photo: string | null;
	salary: string | null;
	summary: string | null;
	title: string | null;
};


export interface IGetVacancyAllQuery {
    params: GetVacancyAllParams;
    result: IGetVacancyAllResult;
};



export type GetSaltParams = [string];


export interface IGetSaltResult {
    password: string;
};


export interface IGetSaltQuery {
    params: GetSaltParams;
    result: IGetSaltResult;
};

