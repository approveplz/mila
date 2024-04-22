"use server";

import { Client } from "@notionhq/client";
import { z } from "zod";

const schema = z.object({
    email: z.string().email(),
})

const notion = new Client({ auth: process.env.NOTION_KEY });
const database_id = process.env.NOTION_DB_ID!

export async function addUserToNotion(formState: any, formData: FormData) {
    try {
        const email = formData.get('email') as string;
        const validatedFields = schema.safeParse({ email });

        if (!validatedFields.success) {
            return {
                message: 'Enter a valid email.',
            }
        }

        const users = await notion.databases.query({
            database_id,
            filter: {
                property: 'Email',
                title: {
                    equals: email
                }
            }
        });

        if (users.results.length > 0) {
            return {
                message: 'Email already exists.',
            }
        }

        const user = await notion.pages.create({
            parent: {
                type: 'database_id',
                database_id
            },
            properties: {
                Email: {
                    title: [
                        {
                            text: {
                                content: email,
                            }
                        }
                    ]
                },
                "Date added": {
                    date: {
                        start: new Date().toISOString()
                    }
                },
                Live: {
                    checkbox: process.env.ENVIRONMENT_TYPE! === 'live' ? true : false
                }
            }
        });

        return {
            id: user.id
        }
    } catch (error) {
        throw new Error('Failed to create user');
    }
}
