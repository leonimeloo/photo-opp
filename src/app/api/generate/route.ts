import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
    let { image } = await request.json();

    if (!image) {
        return NextResponse.json({ message: 'Nenhuma imagem enviada' }, { status: 400 });
    }

    if(image.startsWith('data:image/png;base64,')) {
        image = image.replace('data:image/png;base64,', '');
    }

    try {
        const frameImg = await fs.readFileSync(path.join(process.cwd(), 'public', 'moldura.png'));
        const img = Buffer.from(image, 'base64');

        const spaceHeight = 1488 - 213; // px inicial e pixel final do espaço da moldura
        const targetHeight = Math.round(888 * (16 / 9)); // altura padrão 9:16

        let imgResized = await sharp(img).resize(888, targetHeight, { fit: 'fill' }).toBuffer();

        if (targetHeight > spaceHeight) {
            imgResized = await sharp(imgResized).extract({ left: 0, top: 0, width: 888, height: spaceHeight }).toBuffer();
        }

        const finalImg = (await sharp(frameImg).composite([{ input: imgResized, top: 213, left: 0 },]).png().toBuffer()).toString('base64');
        
        return NextResponse.json({ image: `data:image/png;base64,${finalImg}` }, { status: 200 });

    } catch (error) {
        console.error('Erro ao processar a imagem:', error);
        return NextResponse.json({ message: `Erro interno ao processar imagem: ${error}` }, { status: 500 });
    }
}