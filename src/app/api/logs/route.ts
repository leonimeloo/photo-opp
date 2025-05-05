import { NextResponse } from 'next/server';
import { db } from '@/app/config/firebase';

export async function GET() {
  try {
    const logsSnapshot = await db.collection('logs').get();

    const logs = logsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        event: data.event,
        action: data.action || null,
        timestamp: data.timestamp?.toDate().toISOString() || null,
      };
    });

    const appIniciadoCount = logs.filter((log) => log.event === 'appIniciado').length;
    const fotosSalvasCount = logs.filter(
      (log) => log.event === 'fotoTirada' && log.action === 'salvar'
    ).length;
    const fotosDescartadasCount = logs.filter(
      (log) => log.event === 'fotoTirada' && log.action === 'descartar'
    ).length;

    return NextResponse.json(
      {
        appIniciado: appIniciadoCount,
        fotosSalvas: fotosSalvasCount,
        fotosDescartadas: fotosDescartadasCount,
        logs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao buscar contagens de logs:', error);
    return NextResponse.json({ message: 'Erro ao buscar dados.' }, { status: 500 });
  }
}
