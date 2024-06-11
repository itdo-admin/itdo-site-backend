// Пример данных для тестирования
import { updateVacancy } from "../out/model/model.client.js";
import {expect} from "chai";

describe('updateVacancy function creates correct SQL update query', async () => {
    it('should create the correct SQL update query', async () => {
        const body = {
            id: 1,
            title: 'Software Developer',
            description: 'Develop and maintain software solutions.',
            summary: 'Experienced software developer needed.',
            photo: 'photo_url',
            salary: '60000'
        };

        // Ожидаемый результат
        const expectedQuery = "UPDATE jobs SET id = 1, title = 'Software Developer', description = 'Develop and maintain software solutions.', summary = 'Experienced software developer needed.', photo = 'photo_url', salary = '60000'";

        // Вызов функции
        const result = await updateVacancy(body);

        // Проверка результата
        expect(result).to.equal(expectedQuery);
    });
});
