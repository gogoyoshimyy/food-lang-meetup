import { getMeetup } from '@/app/actions/meetups'
import { checkUserRSVP } from '@/app/actions/rsvps'
import { mockUser } from '@/lib/mock-data'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import RSVPButton from './RSVPButton'

export default async function MeetupDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const meetup = await getMeetup(id)

    if (!meetup) {
        notFound()
    }

    const user = mockUser

    let userRSVP = null
    if (user) {
        userRSVP = await checkUserRSVP(id)
    }

    const languageRatio = meetup.language_ratio as { ja: number; en: number }
    const rules = meetup.rules as { photoOk?: boolean; topicsAvoid?: string[]; photos_ok?: boolean; topics_to_avoid?: string[] }
    const remainingSeats = meetup.group_size - (meetup.rsvp_count || 0)
    const isOwn = user?.id === meetup.host_id
    const is1on1 = meetup.type === '1on1'

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-8">
            <div className="container mx-auto px-4 max-w-3xl">
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge
                                        variant="secondary"
                                        className={is1on1
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-orange-100 text-orange-800'
                                        }
                                    >
                                        {is1on1 ? '🍙 もぐトーク' : '👥 グループ MeetUp'}
                                    </Badge>
                                    {meetup.beginner_friendly && (
                                        <Badge className="bg-green-100 text-green-800">初心者歓迎</Badge>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500">
                                    {format(new Date(meetup.starts_at), 'M月d日(E) HH:mm', { locale: ja })}
                                </p>
                                <CardTitle className="text-2xl mt-2">{meetup.area}</CardTitle>
                                <p className="text-sm text-gray-600 mt-1">
                                    ホスト: {meetup.profiles?.display_name}
                                </p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">予算</p>
                                <p className="font-semibold">¥{meetup.budget_yen.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">支払い方法</p>
                                <p className="font-semibold">{meetup.payment_type}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">所要時間</p>
                                <p className="font-semibold">{meetup.duration_min}分</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{is1on1 ? 'タイプ' : '定員'}</p>
                                <p className="font-semibold">{is1on1 ? 'ホストと1対1' : `${meetup.group_size}名`}</p>
                            </div>
                        </div>

                        {/* Expectation Sheet */}
                        <div className={`p-4 rounded-lg border ${is1on1 ? 'bg-blue-50 border-blue-200' : 'bg-yellow-50 border-yellow-200'}`}>
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                📋 参加前に必ず確認
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <p className="text-gray-600">言語比率</p>
                                    <p className="font-medium">
                                        🇯🇵 日本語 {languageRatio.ja || (languageRatio as any).japanese}% / 🇬🇧 英語 {languageRatio.en || (languageRatio as any).english}%
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-600">所要時間</p>
                                    <p className="font-medium">{meetup.duration_min}分</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">支払い</p>
                                    <p className="font-medium">{meetup.payment_type}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">公共の場のみ</p>
                                    <p className="font-medium">{meetup.public_place_only ? 'はい' : 'いいえ'}</p>
                                </div>
                                {(rules.photoOk !== undefined || rules.photos_ok !== undefined) && (
                                    <div>
                                        <p className="text-gray-600">写真撮影</p>
                                        <p className="font-medium">{(rules.photoOk ?? rules.photos_ok) ? '許可' : '禁止'}</p>
                                    </div>
                                )}
                                {((rules.topicsAvoid && rules.topicsAvoid.length > 0) || (rules.topics_to_avoid && rules.topics_to_avoid.length > 0)) && (
                                    <div>
                                        <p className="text-gray-600">避けるべき話題</p>
                                        <p className="font-medium">{(rules.topicsAvoid || rules.topics_to_avoid)?.join(', ')}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Seats Info */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-600">{is1on1 ? '参加状況' : '参加状況'}</p>
                                <p className="font-semibold">
                                    {meetup.rsvp_count || 0} / {meetup.group_size}名
                                </p>
                            </div>
                            {is1on1 ? (
                                <Badge variant={remainingSeats > 0 ? 'default' : 'destructive'} className={remainingSeats > 0 ? 'bg-blue-600' : ''}>
                                    {remainingSeats > 0 ? '募集中' : '成立済み'}
                                </Badge>
                            ) : (
                                <Badge variant={remainingSeats > 0 ? 'default' : 'destructive'}>
                                    {remainingSeats > 0 ? `残り${remainingSeats}席` : '満席'}
                                </Badge>
                            )}
                        </div>

                        {/* RSVP Button */}
                        {!isOwn && user && (
                            <RSVPButton
                                meetupId={id}
                                userRSVP={userRSVP}
                                remainingSeats={remainingSeats}
                            />
                        )}

                        {!user && (
                            <a href={`/login?redirect=/meetups/${id}`}>
                                <button className="w-full py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700">
                                    ログインして参加する
                                </button>
                            </a>
                        )}

                        {isOwn && (
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <p className="font-medium text-blue-900">あなたがホストの{is1on1 ? 'もぐトーク' : 'MeetUp'}です</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
