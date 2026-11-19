import { getDb } from "@/lib/mongodb";

type ClickDoc = { _id: string; count: number; updatedAt: Date };

async function clicksCollection() {
  const db = await getDb();
  return db.collection<ClickDoc>("clicks");
}

export async function incrementClick(linkId: string) {
  const clicks = await clicksCollection();
  await clicks.updateOne(
    { _id: linkId },
    { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
    { upsert: true },
  );
}

export async function getClickCounts(): Promise<Record<string, number>> {
  const clicks = await clicksCollection();
  const docs = await clicks.find().toArray();
  return Object.fromEntries(docs.map((doc) => [doc._id, doc.count]));
}
