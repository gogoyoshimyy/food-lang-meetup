// モックモード用ダミーミドルウェア - 何もしない
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    // モックモードでは何もせずにそのまま通す
    return NextResponse.next()
}
