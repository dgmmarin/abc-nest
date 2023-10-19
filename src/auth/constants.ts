import { SetMetadata } from '@nestjs/common';

const { API_SECRET } = process.env;

export const jwtConstants = {
  secret: API_SECRET,
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
