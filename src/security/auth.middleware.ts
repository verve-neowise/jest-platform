import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { JwtData } from "./jwt.data";
import { isOpen, isPermitted } from "./permission";


declare module "express-session" {
    interface SessionData {
        token: string,
        error: string
    }
}

export default function(req: Request, res: Response, next: NextFunction) {
    if (isOpen(req.url)) {
        return next()
    }


    const token = req.session.token || req.header('Authorization')
    const isApi = req.session.token ? false : true

    // log token
    console.log('from header:', token)

    // Not authorized
    if (!token) {
        return isApi ? res.sendStatus(401) : res.redirect('/auth')
    }

    console.log('has token:', token)
    
    let payload = verify(token)
    
    console.log('verify:', payload)
    

    // No has token
    if (!payload) {
        return isApi ? res.sendStatus(401) : res.redirect('/auth')
    }

    console.log('success verify:', payload);
    

    if (isPermitted(req.url, payload.role)) {
        console.log('permitted:', req.url);
        req.payload = payload
        return next()
    }
    // Not authorized
    else {
        return isApi ? res.sendStatus(401) : res.redirect('/auth')
    }
}

export function verify(token: string): JwtData | undefined  {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!) as JwtData
    }
    catch(e) {
        return undefined
    }
}