import { PineconeClient } from "@pinecone-database/pinecone";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  const { apiKey, environment, indexName, parameters } = req.body;
  const pinecone = new PineconeClient();
  await pinecone.init({
    apiKey,
    environment,
  });
  const index = pinecone.Index(indexName);
  const queryRequest = JSON.parse(parameters || '{}');
  const { emptyVector } = queryRequest;
  if (emptyVector) {
    queryRequest.vector = new Array(emptyVector).fill(0);
    delete queryRequest.emptyVector;
  }
  console.log("queryRequest", queryRequest);
  res.status(200).json(await index.query({ queryRequest }));
}
