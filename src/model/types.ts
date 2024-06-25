

export type GetVacancyAllParams = [];


export interface IGetVacancyAllResult {
    description: string;
	id: number;
	salary: string;
	summary: string;
	title: string;
};


export interface IGetVacancyAllQuery {
    params: GetVacancyAllParams;
    result: IGetVacancyAllResult;
};




export type GetVacancyIdParams = [number];


export interface IGetVacancyIdResult {
    description: string;
	id: number;
	salary: string;
	summary: string;
	title: string;
};


export interface IGetVacancyIdQuery {
    params: GetVacancyIdParams;
    result: IGetVacancyIdResult;
};




export type GetProjectAllShortParams = [];


export interface IGetProjectAllShortResult {
    color: string;
	description: string;
	id: number;
	photo: any;
	summary: string;
	title: string;
};


export interface IGetProjectAllShortQuery {
    params: GetProjectAllShortParams;
    result: IGetProjectAllShortResult;
};




export type GetAllProjectFullParams = [];


export interface IGetAllProjectFullResult {
    description: string;
	id: number;
	photo: any;
	summary: string;
	title: string;
};


export interface IGetAllProjectFullQuery {
    params: GetAllProjectFullParams;
    result: IGetAllProjectFullResult;
};



export type DeleteJobParams = [number];


export interface IDeleteJobResult {
    
};


export interface IDeleteJobQuery {
    params: DeleteJobParams;
    result: IDeleteJobResult;
};




export type InsertJobParams = [string, string, string, string];


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

