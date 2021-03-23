import { NextFunction, Request, Response } from "express";

import jwt from 'jsonwebtoken';

const { JSON_TOKEN } = require("../../../config.json");


interface TokenPayload {
    id: string;
    iat: number;
    exp: number
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction){
    const { authorization } = req.headers;

    if(!authorization){
        return res.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();

    try {

        const data = jwt.verify(token, JSON_TOKEN)
        
        const { id } = data as TokenPayload;

        req.userID = id;

        return next();
        
    } catch {
        return res.sendStatus(401);
    }
}

