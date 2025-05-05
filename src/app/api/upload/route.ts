import { NextRequest, NextResponse } from 'next/server';
import { bucket, db } from '@/app/config/firebase';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json({ message: 'Imagem inválida ou ausente.' }, { status: 400 });
    }

    const base64Img = image.match(/^data:image\/png;base64,(.+)$/);
    if (!base64Img) {
      return NextResponse.json({ message: 'Formato de imagem inválido. Use PNG base64.' }, { status: 400 });
    }
;
    const buffer = Buffer.from(base64Img[1], 'base64');

    const fileName = `imagens/${uuidv4()}.png`;
    const file = bucket.file(fileName);

    await file.save(buffer, {
      metadata: { contentType: 'image/png' },
    });

    await file.makePublic();

    const storageUrl = file.publicUrl();

    return NextResponse.json({ image: storageUrl }, { status: 200 });
  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json({ message: 'Erro interno ao fazer upload.' }, { status: 500 });
  }
}
