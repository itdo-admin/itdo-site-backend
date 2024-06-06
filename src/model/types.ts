

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




export type GetVacancyIdParams = [number];


export interface IGetVacancyIdResult {
    description: string | null;
	id: number;
	photo: string | null;
	salary: string | null;
	summary: string | null;
	title: string | null;
};


export interface IGetVacancyIdQuery {
    params: GetVacancyIdParams;
    result: IGetVacancyIdResult;
};




export type DeleteJobParams = [number];


export interface IDeleteJobResult {
    
};


export interface IDeleteJobQuery {
    params: DeleteJobParams;
    result: IDeleteJobResult;
};




export type InsertJobParams = [string, string, string, string, string];


export interface IInsertJobResult {
    
};


export interface IInsertJobQuery {
    params: InsertJobParams;
    result: IInsertJobResult;
};



export type GetSaltParams = [string];


export interface IGetSaltResult {
    password: string;
};


export interface IGetSaltQuery {
    params: GetSaltParams;
    result: IGetSaltResult;
};

