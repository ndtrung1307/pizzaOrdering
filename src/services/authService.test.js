const authService = require('../auth.service');
var jwtDecode = require('jwt-decode');
var jwt = require('jsonwebtoken');

jest.mock('jwt-decode');

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jwtDecode.mockClear();
});

describe('Auth Service', () => {
    let userData = {
        _id: "idadsaa",
        email: "email@gmail.com",
        firstname: "abc",
        lastname: "xyz"
    };
    test('should return a token', async () => {
        jwt.sign = jest.fn().mockReturnValue('token');

        let token = await authService.createToken(userData)

        expect(token).toEqual('token');
    });

    test('should decode token then return custId', async () => {
        jwtDecode.mockReturnValue({
            customer_id: 1
        });
        const custId = await authService.decodeToken('token');
        expect(custId).toEqual({
            customer_id: 1
        });
    });

});