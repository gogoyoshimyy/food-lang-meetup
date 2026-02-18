import { mockUser } from '@/lib/mock-data'
import { getUsersMeetups } from '@/app/actions/rsvps'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { MeetupCard } from '@/components/MeetupCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function HostDashboardPage() {
    // モックモード: 常にログイン済み
    const user = mockUser

    if (!user) {
        redirect('/login')
    }

    const { hosted } = await getUsersMeetups()

    // 売上計算 (モック)
    // 実際には確定したRSVPなどを元に計算するが、ここでは簡易的に「参加人数 × アテンド料」とする
    const totalEarnings = hosted.reduce((sum: number, meetup: any) => {
        const fee = meetup.participation_fee || 0
        const rsvpCount = meetup.rsvp_count || 0
        return sum + (fee * rsvpCount)
    }, 0)

    const upcomingCount = hosted.length

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">ホストメニュー</h1>
                        <p className="text-gray-500 mt-2">イベントの作成と売上管理</p>
                    </div>
                    <Link href="/create">
                        <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg">
                            ✨ 新しく募集する
                        </Button>
                    </Link>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="border-l-4 border-l-orange-500 shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">想定売上 (累計)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">¥{totalEarnings.toLocaleString()}</div>
                            <p className="text-xs text-gray-500 mt-1">
                                手数料差し引き前の金額です
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-blue-500 shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">開催予定</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">{upcomingCount}</div>
                            <p className="text-xs text-gray-500 mt-1">
                                件のイベントを公開中
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-green-500 shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">参加申込</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">
                                {hosted.reduce((sum: number, m: any) => sum + (m.rsvp_count || 0), 0)}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                名のゲストが参加予定
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Hosted Meetups */}
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>📅</span> あなたの募集イベント
                </h2>
                <div className="space-y-6">
                    {hosted.length === 0 ? (
                        <Card className="bg-white/50 border-dashed">
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <span className="text-4xl mb-4">📝</span>
                                <h3 className="text-lg font-medium text-gray-900">まだ募集イベントがありません</h3>
                                <p className="text-gray-500 mt-2 mb-6">あなたの得意なエリアや言語で、食事の機会を作りましょう</p>
                                <Link href="/create">
                                    <Button variant="outline">最初のイベントを作成</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {hosted.map((meetup: any) => (
                                <MeetupCard key={meetup.id} meetup={meetup} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
