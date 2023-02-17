import type { Request, Response } from 'express';

export type Route = (req: Request, res: Response) => Promise<Response>;