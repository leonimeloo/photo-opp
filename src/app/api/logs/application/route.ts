import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/config/firebase';
import { Timestamp } from 'firebase-admin/firestore';

export async function POST(request: NextRequest) {
  try {
    await db.collection('logs').add({
      event: 'appIniciado',
      timestamp: Timestamp.now(),
    });

    return NextResponse.json({ message: 'Log registrado com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao registrar log:', error);
    return NextResponse.json({ message: 'Erro ao registrar log.' }, { status: 500 });
  }
}