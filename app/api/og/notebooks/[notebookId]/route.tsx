import { ImageResponse } from '@vercel/og';

import ChatEduFooter from "@/app/api/og/lib/chatEduFooter";

import {capitalize} from "@/lib/capitalize";

import {NextRequest} from "next/server";

import {Notebook} from "@/types/Notebook";
import {TagTypes} from "@/types/Tags";
import {TagWithParentTagTypeRow} from "@/cosmosPostgres/types";

export const runtime = 'edge';

export async function GET(req: NextRequest, { params }: { params: { notebookId: string } }) {


    const [sfProBlack, sfPro, notebookData, tags] = await Promise.all([
        fetch(new URL('../../../../../assets/SF-Pro-Black.ttf', import.meta.url))
            .then((res) => res.arrayBuffer()),
        fetch(new URL('../../../../../assets/SF-Pro.ttf', import.meta.url))
            .then((res) => res.arrayBuffer()),
        fetch(`https://www.chatedu.tech/api/notebooks/${params.notebookId}`)
            .then(async res => (await res.json()) as Notebook),
        fetch(`https://www.chatedu.tech/api/tags/notebook/${params.notebookId}`)
            .then(async res => (await res.json()) as TagWithParentTagTypeRow[])
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

const getTagColor = (tag: TagWithParentTagTypeRow, opacity: number): string => {
    switch (tag.parent_tag_type_name) {
        case TagTypes.TOPIC:
            return `rgba(76, 175, 80, ${opacity})`;
        case TagTypes.SCHOOL:
            return `rgba(33, 150, 243, ${opacity})`;
        default:
            return `rgba(76, 175, 80, ${opacity})`;
    }
}