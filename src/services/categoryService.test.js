const categoryService = require('../category.service');
const categoryModel = require('../../models/category.model');
const Boom = require('@hapi/boom');


jest.mock('../../models/category.model');

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    categoryModel.mockClear();
});

describe('Category Services', () => {

    let categories = [{
        "_id": "abaanajsbcak313bda",
        "name": "Pizzass"
    }, {
        "_id": "abaanajsbc313bda",
        "name": "Pizza"
    }];

    let inputValue = {
        "name": "Pizzass"
    };
    let returnValue = {
        "_id": "abaanajsbcak313bda",
        "name": "Pizzass"
    };

    let updateData = {
        "name": "Pizzaa"
    };

    describe('Create Service', () => {
        
        test('should throw a error message if Category is exist', async () => {
            categoryModel.findOne.mockReturnValue(returnValue);
            
            expect(categoryService.create(inputValue)).rejects
            .toThrowError(/Category already exists!/);
        });

        // test('should throw a error message if Category is exist', async () => {
        //     categoryModel.findOne = jest.fn().mockReturnValue(null);
        //     categoryModel.save    = jest.fn((inputValue) => Promise.resolve(inputValue))
        //     console.log(cate);
        //     // const cate = await categoryService.
        //     expect(categoryService.create(inputValue)).resolves.toEqual(returnValue);
        // });
    });

    describe('Get Service', () => {

        test('It should return all', () =>{
            categoryModel.find = jest.fn().mockResolvedValue(categories);

            expect(categoryService.getAll()).resolves.toEqual(categories);
        });

        test('It should return exactly category', () => {
            categoryModel.findById = jest.fn().mockResolvedValue({
                "_id": "abaanajsbcak313bda",
                "name": "Pizzass"
            });

            expect(categoryService.getOneCategory("abaanajsbcak313bda")).resolves.toEqual({
                "_id": "abaanajsbcak313bda",
                "name": "Pizzass"
            });
        });

        test('It should return exactly category by name', () => {
            categoryModel.findById = jest.fn().mockResolvedValue({
                "_id": "abaanajsbcak313bda",
                "name": "Pizzass"
            });

            expect(categoryService.getOneCategory("Pizzass")).resolves.toEqual({
                "_id": "abaanajsbcak313bda",
                "name": "Pizzass"
            });
        });
    });

    describe('update service', () => {
        test('It should return exactly category after update', () => {
            categoryModel.findByIdAndUpdate = jest.fn().mockResolvedValue({
                "_id": "abaanajsbcak313bda",
                "name": "Pizzaa"
            });

            expect(categoryService.update("abaanajsbcak313bda", updateData)).resolves.toEqual({
                "_id": "abaanajsbcak313bda",
                "name": "Pizzaa"
            });
        });
    });

    describe('delete service', () => {
         test('It should return category data after delete successfully', () => {
             categoryModel.findByIdAndDelete = jest.fn().mockResolvedValue({
                 "_id": "abaanajsbcak313bda",
                 "name": "Pizzaa"
             });

             expect(categoryService.deleteOneCategoryAsAdmin("abaanajsbcak313bda")).resolves.toEqual({
                 "_id": "abaanajsbcak313bda",
                 "name": "Pizzaa"
             });
         });
    });

});