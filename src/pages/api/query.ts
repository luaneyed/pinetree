import { PineconeClient } from "@pinecone-database/pinecone";
import { NextApiRequest, NextApiResponse } from "next";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  const { apiKey, openAiKey, environment, indexName, parameters } = req.body;
  const pinecone = new PineconeClient();
  await pinecone.init({
    apiKey,
    environment,
  });
  const index = pinecone.Index(indexName);
  const queryRequest = JSON.parse(parameters || "{}");
  const { emptyVector, query } = queryRequest;
  if (emptyVector) {
    queryRequest.vector = new Array(emptyVector).fill(0);
    delete queryRequest.emptyVector;
  }
  if (query) {
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: openAiKey,
    });

    queryRequest.vector = await embeddings.embedQuery(query);
    delete queryRequest.query;
  }
  res.status(200).json(await index.query({ queryRequest }));
}
