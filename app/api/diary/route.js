import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    // n8n 웹훅으로 데이터 전달 (실제 Production Webhook URL 입력)
    const n8nWebhookUrl = "http://localhost:5678/webhook/51aee078-9305-405f-88e4-b2d7ad5a2296"; 

    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (!n8nResponse.ok) {
      throw new Error('n8n 전송 실패');
    }

    return NextResponse.json({ success: true, message: "저장 완료" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}