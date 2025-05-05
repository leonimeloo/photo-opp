import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/config/firebase';
import { Timestamp } from 'firebase-admin/firestore';

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();

    if (!action || !['salvar', 'descartar'].includes(action)) {
      return NextResponse.json({ message: 'Ação inválida.' }, { status: 400 });
    }

    await db.collection('logs').add({
      event: 'fotoTirada',
      action,
      timestamp: Timestamp.now(),
    });

    return NextResponse.json({ message: 'Log de foto registrado com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao registrar log de foto:', error);
    return NextResponse.json({ message: 'Erro ao registrar log de foto.' }, { status: 500 });
  }
}
