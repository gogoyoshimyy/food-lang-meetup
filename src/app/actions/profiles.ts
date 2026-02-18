'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { mockUser, mockProfiles, getMockProfile } from '@/lib/mock-data'

export async function createProfile(formData: FormData) {
    // モックモードでは何もせず、ホームにリダイレクト
    revalidatePath('/profile')
    redirect('/')
}

export async function updateProfile(formData: FormData) {
    // モックモードでは成功を返す
    revalidatePath('/profile')
    return { success: true }
}

export async function getProfile() {
    // モックユーザーのプロフィールを返す
    const profile = getMockProfile(mockUser.id)
    return profile
}
