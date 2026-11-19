import { MongoClient } from "mongodb";

const DB_NAME = process.env.MONGODB_DB ?? "linknamu";

declare global {
  // 개발 모드 HMR이나 서버리스 재사용 시 연결이 중복 생성되지 않도록 전역에 보관
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 없습니다. .env.local을 확인하세요.");
  }
  globalThis._mongoClientPromise ??= new MongoClient(uri).connect().catch((error) => {
    // 연결 실패 시 다음 요청에서 다시 시도하도록 캐시를 비움
    globalThis._mongoClientPromise = undefined;
    throw error;
  });
  return globalThis._mongoClientPromise;
}

export async function getDb() {
  const client = await getClientPromise();
  return client.db(DB_NAME);
}
