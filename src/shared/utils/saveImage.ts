import { BadRequestError } from '#shared/errors/index.js';
import { to } from '#shared/utils/to.js';
import fs from 'node:fs/promises';
import path from 'node:path';

const regExp = /^data:image\/\w+;base64,/;

export async function saveImage(
  name: string,
  file: {
    name: string;
    thumbUrl: string;
  }
) {
  if (!file.thumbUrl)
    return [new BadRequestError('Image data is missing'), undefined] as const;

  const base64Data: string = file.thumbUrl.replace(regExp, '');

  const extension = path.extname(file.name);
  const fileName = `${name}${extension}`;
  const filePath: string = path.join(process.cwd(), 'uploads', fileName);

  const buffer: Buffer = Buffer.from(base64Data, 'base64');
  const [error] = await to(() => fs.writeFile(filePath, buffer));

  if (error) return [error, undefined] as const;
  return [undefined, fileName] as const;
}
