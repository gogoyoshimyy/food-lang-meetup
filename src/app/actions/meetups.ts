'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getMockMeetups, getMockMeetup } from '@/lib/mock-data'

export async function createMeetup(formData: FormData) {
    // モックモードでは新規作成をシミュレート
    revalidatePath('/')
    redirect('/')
}

export async function getMeetups(city: string, filters?: {
    type?: '1on1' | 'meetup'
    area?: string
    language?: string
    beginnerFriendly?: boolean
    groupOnly?: boolean
    timeRange?: 'today' | 'week'
}) {
    return getMockMeetups(city, filters) as any
}

export async function getMeetup(id: string) {
    return getMockMeetup(id) as any
}
