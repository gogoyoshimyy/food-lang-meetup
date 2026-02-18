'use server'

import { redirect } from 'next/navigation'
import { mockUser } from '@/lib/mock-data'

// モックモード: 常にログイン済みとして扱う
export async function login(formData: FormData) {
    // モックでは即座にリダイレクト
    redirect('/')
}

export async function signup(formData: FormData) {
    // モックではプロフィールページにリダイレクト
    redirect('/profile')
}

export async function logout() {
    // モックでは何もしない
    redirect('/login')
}

export async function getCurrentUser() {
    // モックユーザーを返す
    return { data: { user: mockUser }, error: null }
}
