import { ImageResponse } from '@vercel/og';

import ChatEduFooter from "@/app/api/og/lib/chatEduFooter";

import {NextRequest} from "next/server";

import {Notebook} from "@/types/Notebook";

export const runtime = 'edge';

export async function GET(req: NextRequest, { params }: { params: { notebookId: string } }) {


    const [sfProBlack, sfPro, notebookData] = await Promise.all([
        fetch(new URL('../../../../../assets/SF-Pro-Black.ttf', import.meta.url))
            .then((res) => res.arrayBuffer()),
        fetch(new URL('../../../../../assets/SF-Pro.ttf', import.meta.url))
            .then((res) => res.arrayBuffer()),
        fetch(`https://www.chatedu.tech/api/notebooks/${params.notebookId}`)
            .then(async res => (await res.json()) as Notebook),
    ]);

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    background: 'white',
                    padding: 32,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 32,
                    lineHeight: 1,
                }}
            >
                <h1
                    style={{
                        fontSize: 120,
                        margin: 0,
                        fontFamily: 'SF Pro Black',
                    }}
                >
                    {notebookData.name}
                </h1>
                <h2
                    style={{
                        margin: 0,
                        fontFamily: 'SF Pro',
                        fontSize: 60,
                    }}
                >
                    By @{notebookData.username}
                </h2>
                <h3
                    style={{
                        margin: 0,
                        fontFamily: 'SF Pro',
                        fontSize: 48,
                        opacity: 0.5,
                    }}
                >
                    {notebookData.numNotes} modules
                </h3>
                <ChatEduFooter/>
            </div>
        ), {
            fonts: [
                {
                    name: 'SF Pro Black',
                    data: sfProBlack,
                    style: 'normal',
                },
                {
                    name: 'SF Pro',
                    data: sfPro,
                    style: 'normal',
                }
            ],
        }
    );
}