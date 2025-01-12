import axios from 'axios';
import { NextResponse, } from 'next/server';
import { API_KEY, } from '@modules/general/libraries/constants';
import { getLawDetailUrl, } from '@/modules/law/store/api/law-api';
import { Law, LawDetailEntity, } from '@/modules/law/libraries/law-types';

export async function GET(req: Request, { params, }: { params: { slug: string[] } } ) {
  const { slug, } = params;
  try {
    if (slug) {
      let lawId = parseInt(`${slug[0]}`);
      const lawUrl = getLawDetailUrl(lawId, 'fa');
      const lawResponse = await axios.get<LawDetailEntity>(lawUrl, {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (
        lawResponse &&
        lawResponse.data &&
        lawResponse.data.data) {
        const law: Law = lawResponse.data.data;

        if (law && law.attachment_list && law.attachment_list.length > 0 ) {
          const attachment = law.attachment_list[+slug[1]];
          if (attachment && attachment.file_list && attachment.file_list.length > 0 ) {
            const fileUrl = attachment.file_list[+slug[2]].path;
            try {
              const response = await axios.get(fileUrl, {
                responseType: 'arraybuffer',
                headers: { 'x-api-key': API_KEY, },
              });
              const buffer = Buffer.from(response.data, 'utf-8');
              return new NextResponse(buffer, { status: 200, });
            } catch (error: any) {
              return NextResponse.json({ message: 'Load file Error!', }, { status: 500, });
            }
          }

        } else {
          return NextResponse.json({ message: 'Error! File does not exist!', }, { status: 500, });
        }
      }
    }
  } catch (err: any) {
    return NextResponse.json({ message: 'Error!', }, { status: 500, });
  }
}