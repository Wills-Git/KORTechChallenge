import { Request, Response, NextFunction } from 'express';

const validateNewUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Request must include a body.' });
  }
  const { name, username } = req.body;
  const maxLength = 10;
  if (!name || !username) {
    return res.status(400).json({
      message: `Name and Username must not be empty.`,
    });
  } else if (name > maxLength || username > maxLength) {
    return res.status(400).json({
      message: `Name must not  e less than ${maxLength} characters long.`,
    });
  }
  next();
};

export default validateNewUser;
