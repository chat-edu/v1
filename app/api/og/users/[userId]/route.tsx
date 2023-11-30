import { ImageResponse } from '@vercel/og';

import {NextRequest} from "next/server";

import ChatEduFooter from "@/app/api/og/lib/chatEduFooter";

import {User} from "@/types/User";

export const runtime = 'edge';

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {


    const [sfProBlack, sfPro, user] = await Promise.all([
        fetch(new URL('../../../../../assets/SF-Pro-Black.ttf', import.meta.url))
            .then((res) => res.arrayBuffer()),
        fetch(new URL('../../../../../assets/SF-Pro.ttf', import.meta.url))
            .then((res) => res.arrayBuffer()),
        fetch(`https://preview.chatedu.io/api/users/${params.userId}`)
            .then(async res => (await res.json()) as User),
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
                <img
                    src={user.profilePictureUrl}
                    alt={'Profile Picture'}
                    style={{
                        height: 200,
                        width: 200,
                        borderRadius: 100,
                    }}
                />
                <h1
                    style={{
                        fontSize: 120,
                        margin: 0,
                        fontFamily: 'SF Pro Black',
                    }}
                >
                    {user.name}
                </h1>
                <h2
                    style={{
                        margin: 0,
                        fontFamily: 'SF Pro',
                        fontSize: 60,
                    }}
                >
                    @{user.username}
                </h2>
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