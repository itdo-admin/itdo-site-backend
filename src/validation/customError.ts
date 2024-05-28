import { z } from 'zod';

const customErrorMap: z.ZodErrorMap = (error, ctx) => {
	/*
	This is where you override the various error codes
	*/
	switch (error.code) {
		case z.ZodIssueCode.invalid_type:
			const fields = error.path || [];
			console.log('error');
			if (error.expected === "string") {
				return { message: `${fields[0]} is required`};
			}
			break;
		case z.ZodIssueCode.custom:
			// produce a custom message using error.params
			// error.params won't be set unless you passed
			// a `params` arguments into a custom validator
			const params = error.params || {};
			console.log('fefpwl')
			if (params.myField) {
				return { message: `Bad input: ${params.myField}` };
			}
			break;
	}

	console.log('erew')
	return { message: ctx.defaultError };
};

// Установка глобальной карты ошибок
z.setErrorMap(customErrorMap);
