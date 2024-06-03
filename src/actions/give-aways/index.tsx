"use server"

import { Product } from '@/entities';
import {
    DynamoDBClient
} from '@aws-sdk/client-dynamodb';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

const dbClient = new DynamoDBClient({
    credentials: {
        accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY!,
    },
    region: process.env.APP_AWS_REGION
});

export async function getGiveaways(type: string, module: string = '') {
    const results = (await dbClient.send(
        new ScanCommand({
            TableName: process.env.DYNAMODB_GIVEAWAYS_TABLE_NAME,
        })
    ));
    
    let items = results.Items || [];
    items = items.filter(item => item.ttl >= Math.round(Date.now() / 1000));
    console.log(items);
    items = items.map(item => JSON.parse(item.data)).filter(item => item.type === type);
    console.log(items);
    items.sort((a, b) => new Date(a.draw_time).getTime() - new Date(b.draw_time).getTime());
    if (module === 'upcoming') {
        return items.length > 0 ? items[0] : null;
    } else if (module === 'major') {
        return items.slice(0, 4);
    } else if (module === 'minor') {
        return items.slice(0, 10);
    }
}