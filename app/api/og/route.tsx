import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {

    const fontData = await fetch(
        new URL('../../../assets/SF-Pro-Black.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src={'https://www.chatedu.tech/logo.png'}
                        alt={'ChatEDU Logo'}
                        style={{
                            width: 200,
                            height: 200,
                        }}
                    />
                    <h1
                        style={{
                            fontSize: 48,
                            // fontWeight: 900,
                            color: '#000000',
                            margin: 0,
                            fontFamily: 'SF Pro Black',
                        }}
                    >
                        Welcome to Chat<span style={{color: '#4caf50'}}>EDU</span>
                    </h1>
                </div>
            </div>
        ), {
            fonts: [
                {
                    name: 'SF Pro Black',
                    data: fontData,
                    style: 'normal',
                },
            ],
        }
    );
}