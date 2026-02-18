'use server'

import { revalidatePath } from 'next/cache'
import { mockUser, mockRSVPs, getUserRSVP, getUserMeetups, getMockMeetup } from '@/lib/mock-data'

export async function joinMeetup(meetupId: string) {
    // モックモードではRSVP状態をシミュレート
    const meetup = getMockMeetup(meetupId)

    if (!meetup) {
        return { error: 'Meetupが見つかりません' }
    }

    // 定員チェック（簡易版）
    if (meetup.rsvp_count >= meetup.group_size) {
        return { error: '満席です' }
    }

    // モックでは常に成功
    revalidatePath(`/meetups/${meetupId}`)
    return { success: true, message: '参加しました！' }
}

export async function cancelRSVP(meetupId: string) {
    // モックモードでは常に成功
    revalidatePath(`/meetups/${meetupId}`)
    return { success: true }
}

export async function checkUserRSVP(meetupId: string) {
    // モックユーザーのRSVP状態を返す
    const rsvp = getUserRSVP(meetupId, mockUser.id)
    return rsvp
}

export async function getUsersMeetups() {
    // モックユーザーのMeetupsを返す
    const { hosted, joined } = getUserMeetups(mockUser.id)
    return { hosted: hosted as any, joined: joined as any }
}
