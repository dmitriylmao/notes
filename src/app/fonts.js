// app/fonts.js
import { Raleway } from '@next/font/google';

export const raleway = Raleway({
  subsets: ['latin', 'cyrillic'], // Важно: добавь 'cyrillic', если нужен русский
  display: 'swap', // Рекомендуется для лучшей производительности
  variable: '--font-raleway', // Опционально, но полезно для CSS-переменных
});