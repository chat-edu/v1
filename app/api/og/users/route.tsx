import { ImageResponse } from '@vercel/og';

import ChatEduFooter from "@/app/api/og/lib/chatEduFooter";

export const runtime = 'edge';

export async function GET() {

    const [sfProBlack, sfPro] = await Promise.all([
        fetch(new URL('../../../../assets/SF-Pro-Black.ttf', import.meta.url))
            .then((res) => res.arrayBuffer()),
        fetch(new URL('../../../../assets/SF-Pro.ttf', import.meta.url))
            .then((res) => res.arrayBuffer()),
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
                    gap: 16,
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
                    Leaderboard
                </h1>
                <ChatEduFooter />
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