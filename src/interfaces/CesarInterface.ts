import { Request, Response, NextFunction } from 'express';

export interface ICesarController {
  encrypt(request: Request, response: Response, next: NextFunction): void;
    decrypt(request: Request, response: Response, next: NextFunction): void;

}