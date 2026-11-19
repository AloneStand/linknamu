import { linkIds } from "@/data/profile";
import { getClickCounts, incrementClick } from "@/lib/clicks";

/** 링크별 클릭 수 조회: GET /api/clicks → { "github": 3, ... } */
export async function GET() {
  try {
    return Response.json(await getClickCounts());
  } catch (error) {
    console.error(error);
    return Response.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

/** 링크 클릭 1회 기록: POST /api/clicks  body { "linkId": "github" } */
export async function POST(request: Request) {
  let linkId: unknown;
  try {
    ({ linkId } = await request.json());
  } catch {
    return Response.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
  }

  if (typeof linkId !== "string" || !linkIds.has(linkId)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    await incrementClick(linkId);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "클릭 수를 기록하지 못했습니다." }, { status: 500 });
  }
}
