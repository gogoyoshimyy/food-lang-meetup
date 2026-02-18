'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

type MeetupCardProps = {
    meetup: {
        id: string
        type?: '1on1' | 'meetup'
        starts_at: string
        area: string
        budget_yen: number
        participation_fee?: number
        language_ratio: { ja: number; en: number } | { japanese: number; english?: number; korean?: number }
        payment_type: string
        beginner_friendly: boolean
        group_size: number
        rsvp_count?: number
        profiles?: { display_name: string }
    }
}

export function MeetupCard({ meetup }: MeetupCardProps) {
    const remainingSeats = meetup.group_size - (meetup.rsvp_count || 0)

    // 言語比率の型安全な取得
    const jaRatio = 'ja' in meetup.language_ratio ? meetup.language_ratio.ja : meetup.language_ratio.japanese
    const enRatio = 'en' in meetup.language_ratio ? meetup.language_ratio.en : meetup.language_ratio.english

    const is1on1 = meetup.type === '1on1'
    const fee = meetup.participation_fee || 0

    return (
        <Link href={`/meetups/${meetup.id}`}>
            <Card className={`hover:shadow-lg transition-all cursor-pointer border-l-4 ${is1on1 ? 'border-l-blue-500' : 'border-l-orange-500'
                }`}>
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Badge
                                    variant="secondary"
                                    className={is1on1
                                        ? 'bg-blue-100 text-blue-800 text-xs'
                                        : 'bg-orange-100 text-orange-800 text-xs'
                                    }
                                >
                                    {is1on1 ? '🍙 もぐトーク' : '👥 グループ'}
                                </Badge>
                                {meetup.beginner_friendly && (
                                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                        初心者歓迎
                                    </Badge>
                                )}
                            </div>
                            <p className="text-sm text-gray-500">
                                {format(new Date(meetup.starts_at), 'M月d日(E) HH:mm', { locale: ja })}
                            </p>
                            <h3 className="font-semibold mt-1 text-lg">{meetup.area}</h3>
                            {meetup.profiles && (
                                <p className="text-xs text-gray-400 mt-0.5">by {meetup.profiles.display_name}</p>
                            )}
                        </div>
                        {fee > 0 ? (
                            <div className="text-right">
                                <span className="text-xs text-gray-500 block">アテンド料</span>
                                <span className="font-bold text-orange-600">¥{fee.toLocaleString()}</span>
                            </div>
                        ) : (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                                参加費無料
                            </Badge>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">予算:</span>
                        <span className="font-medium">¥{meetup.budget_yen.toLocaleString()}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">{meetup.payment_type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">言語比:</span>
                        <span className="font-medium">
                            🇯🇵 {jaRatio}% / 🇬🇧 {enRatio}%
                        </span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <div className="text-sm">
                            <span className="text-gray-600">{is1on1 ? 'ホストと1対1' : `定員: ${meetup.group_size}名`}</span>
                        </div>
                        {is1on1 ? (
                            <Badge variant={remainingSeats > 0 ? 'default' : 'destructive'} className="bg-blue-600">
                                {remainingSeats > 0 ? '募集中' : '成立済み'}
                            </Badge>
                        ) : (
                            <Badge variant={remainingSeats > 0 ? 'default' : 'destructive'}>
                                {remainingSeats > 0 ? `残り${remainingSeats}席` : '満席'}
                            </Badge>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
