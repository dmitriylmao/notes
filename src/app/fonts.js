import { Raleway } from '@next/font/google';

export const raleway = Raleway({
  subsets: ['latin', 'cyrillic'], 
  display: 'swap', 
  variable: '--font-raleway', 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});