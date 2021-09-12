const UserModel             = require('../models/user.model');
const HttpException         = require('../utils/HttpException.utils');
const { validationResult }  = require('express-validator');
const bcryptjs              = require('bcryptjs');
const jwt                   = require('jsonwebtoken');
const dotenv                = require('dotenv');
dotenv.config();

class UserController{
    getAllUser = async (req, res, next) => {
        const userList = await UserModel.find();
        if(!userList.length){
            throw new HttpException(404, 'Users not found');
        }

        let result = userList.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        res.send(result);
    }

    getUserById = async (req, res, next) => {
        const user = await UserModel.findOne({id: req.params.id});
        if(!user){
            throw new HttpException(404, 'User not found');
        }
        const { password, ...userWithoutPassword } = user;
        res.send(userWithoutPassword);
    }

    getUserByUsername = async (req, res, next) => {
        const user = await UserModel.findOne({username: req.params.username});
        if(!user){
            throw new HtppException(404, 'User not found');
        }
        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    }

    getCurrentUser = async (req, res, next) => {
        const { password, ...userWithoutPassword } = req.currentUser;

        res.send(userWithoutPassword);
    }

    create = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await UserModel.create(req.body);

        if(!result){
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('User was created');
    }

    update = async (req, res, next) =>{
        this.checkValidation(req);

        await this.hashPassword(req);

        const { confirm_password, ...restOfUpdate } = req.body;

        const result = await UserModel.update(restOfUpdate, req.params.id);

        if(!result){
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message =  !affectedRows ? 'User not found' :
            affectedRows && changedRows ? 'User update successfuly' : 'Update faild';

        res.send({message, info});
    }

    delete = async (req, res, next) => {
        const result = await UserModel.delete(req.params.id);
        if(!result){
            throw new HttpException(404, 'User not found');
        }
        
        res.send('User has been deleted');
    }

    login = async (req, res, next) => {
        this.checkValidation(req);
        const { username, password: pass } = req.body;
        const user = await UserModel.findOne({username});

        if(!user){
            throw new HttpException(401, 'Unable to login');
        }

        const isMatch = await bcryptjs.compare(pass, user.password);

        if(!isMatch){
            throw new HttpException(401, 'Incorrect password');
        }

        const secretKey = process.env.SECRET_JWT || '';
        const token     = jwt.sign({user_id: user.id.toString()}, secretKey, {
            expiresIn: '24h'
        });

        const {password, ...userWithoutPassword} = user;

        res.send({...userWithoutPassword, token});
    }

    checkValidation = (req) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    hashPassword = async (req) => {
        if(req.body.password){
            req.body.password = await bcryptjs.hash(req.body.password, 8);
        }
    }
}

module.exports = new UserController;
