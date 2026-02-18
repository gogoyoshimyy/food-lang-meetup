import { mockUser } from '@/lib/mock-data'
import { getUsersMeetups } from '@/app/actions/rsvps'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MeetupCard } from '@/components/MeetupCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function ParticipantDashboardPage() {
    // モックモード: 常にログイン済み
    const user = mockUser

    if (!user) {
        redirect('/login')
    }

    const { joined } = await getUsersMeetups()

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">参加予定のイベント</h1>
                    <Link href="/">
                        <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm">
                            🔍 イベントを探す
                        </Button>
                    </Link>
                </div>

                {joined.length === 0 ? (
                    <Card className="bg-white/80 border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <span className="text-4xl mb-4">🎫</span>
                            <h3 className="text-lg font-medium text-gray-900">参加予定のイベントはありません</h3>
                            <p className="text-gray-500 mt-2 mb-6 text-center">
                                気になるイベントを見つけて、参加してみましょう！<br />
                                新しい言語と美味しい食事が待っています。
                            </p>
                            <Link href="/">
                                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                                    イベント一覧を見る
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {joined.map((meetup: any) => (
                            <MeetupCard key={meetup.id} meetup={meetup} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
