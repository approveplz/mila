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

export async function getProducts() {
    const results = (await dbClient.send(
        new ScanCommand({
            TableName: process.env.DYNAMODB_PRODUCT_TABLE_NAME
        })
    ));

    const items = results.Items || [];

    return items.map(item => JSON.parse(item.data)) as Array<Product>
}