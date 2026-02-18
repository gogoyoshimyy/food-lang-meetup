'use client'

import { useState } from 'react'
import { joinMeetup, cancelRSVP } from '@/app/actions/rsvps'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

type RSVPButtonProps = {
    meetupId: string
    userRSVP: any
    remainingSeats: number
}

export default function RSVPButton({ meetupId, userRSVP, remainingSeats }: RSVPButtonProps) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    async function handleJoin() {
        setLoading(true)
        setError(null)

        const result = await joinMeetup(meetupId)

        if (!result || ('error' in result && result.error) || (!('success' in result) || !result.success)) {
            setError(('message' in result && result.message) || ('error' in result && result.error) || 'エラーが発生しました')
            setLoading(false)
        } else {
            router.refresh()
        }
    }

    async function handleCancel() {
        setLoading(true)
        setError(null)

        const result = await cancelRSVP(meetupId)

        if (result.error) {
            setError(result.error)
            setLoading(false)
        } else {
            router.refresh()
        }
    }

    if (userRSVP) {
        return (
            <div className="space-y-2">
                <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? 'キャンセル中...' : '参加をキャンセル'}
                </Button>
                <p className="text-sm text-center text-gray-600">参加予定です</p>
            </div>
        )
    }

    return (
        <div className="space-y-2">
            <Button
                onClick={handleJoin}
                className="w-full"
                disabled={loading || remainingSeats <= 0}
            >
                {loading ? '参加中...' : '参加する'}
            </Button>
            {error && (
                <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                    {error}
                </p>
            )}
        </div>
    )
}
