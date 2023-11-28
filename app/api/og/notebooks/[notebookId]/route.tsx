import { ImageResponse } from '@vercel/og';
import {NextRequest} from "next/server";
import {Notebook} from "@/types/Notebook";
import {NotebookTag, TagTypes} from "@/types/Tags";
import {capitalize} from "@/lib/capitalize";

export const runtime = 'edge';

export async function GET(req: NextRequest, { params }: { params: { notebookId: string } }) {


    const [sfProBlack, sfPro, notebookData, tags] = await Promise.all([
        fetch(new URL('../../../../../assets/SF-Pro-Black.ttf', import.meta.url))
            .then((res) => res.arrayBuffer()),
        fetch(new URL('../../../../../assets/SF-Pro.ttf', import.meta.url))
            .then((res) => res.arrayBuffer()),
        fetch(`https://preview.chatedu.io/api/notebooks/${params.notebookId}`)
            .then(async res => (await res.json()) as Notebook),
        fetch(`https://preview.chatedu.io/api/notebooks/${params.notebookId}/tags`)
            .then(async res => (await res.json()) as NotebookTag[])
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
                    gap: 16
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                    }}
                >
                    {
                        tags.map((tag) => (
                            <div
                                key={tag.tag}
                                style={{
                                    background: getTagColor(tag, 0.25),
                                    borderRadius: 8,
                                    padding: '4px 8px',
                                    display: 'flex',
                                }}
                            >
                                <h3
                                    style={{
                                        margin: 0,
                                        fontFamily: 'SF Black',
                                        fontSize: 32,
                                        color: getTagColor(tag, 1),
                                        fontWeight: 900,
                                    }}
                                >
                                    {capitalize(tag.tag)}
                                </h3>
                            </div>
                        ))
                    }
                </div>
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
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        gap: 16,
                        marginTop: 'auto',
                    }}
                >
                    <h1
                        style={{
                            fontSize: 60,
                            color: '#000000',
                            margin: 0,
                            fontFamily: 'SF Pro Black',
                        }}
                    >
                        Chat<span style={{color: '#4caf50'}}>EDU</span>
                    </h1>
                    <img
                        src={'https://www.chatedu.tech/logo.png'}
                        alt={'ChatEDU Logo'}
                        style={{
                            width: 150,
                            height: 150,
                        }}
                    />
                </div>
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

const getTagColor = (tag: NotebookTag, opacity: number): string => {
    switch (tag.tagType.parentTagTypeName) {
        case TagTypes.TOPIC:
            return `rgba(76, 175, 80, ${opacity})`;
        case TagTypes.SCHOOL:
            return `rgba(33, 150, 243, ${opacity})`;
        default:
            return `rgba(76, 175, 80, ${opacity})`;
    }
}