// モックデータ - データベースなしでアプリをテストするため

export type MeetupType = '1on1' | 'meetup'

export type Meetup = {
    id: string
    type: MeetupType
    host_id: string
    city: string
    starts_at: string
    area: string
    duration_min: number
    group_size: number
    budget_yen: number
    participation_fee: number // アテンド料（参加費）
    language_ratio: { japanese: number; english?: number; korean?: number }
    payment_type: string
    beginner_friendly: boolean
    public_place_only: boolean
    rules: {
        photos_ok: boolean
        topics_to_avoid: string[]
    }
    status: 'open' | 'closed'
    created_at: string
    profiles: {
        display_name: string
    }
}

export const mockUser = {
    id: 'mock-user-1',
    email: 'test@example.com',
}

export const mockProfiles = [
    {
        id: 'mock-user-1',
        display_name: '田中太郎',
        bio: '福岡在住のエンジニアです。英語と日本語の言語交換を楽しみたいと思っています！',
        city: '福岡',
        languages: ['日本語（ネイティブ）', '英語（中級）'],
        created_at: '2024-01-01T00:00:00Z',
    },
    {
        id: 'mock-user-2',
        display_name: 'Sarah Johnson',
        bio: 'English teacher living in Fukuoka. Looking to practice Japanese!',
        city: '福岡',
        languages: ['English (Native)', 'Japanese (Beginner)'],
        created_at: '2024-01-01T00:00:00Z',
    },
    {
        id: 'mock-user-3',
        display_name: '鈴木花子',
        bio: '鹿児島で働いています。韓国語を勉強中です！',
        city: '鹿児島',
        languages: ['日本語（ネイティブ）', '韓国語（初級）'],
        created_at: '2024-01-01T00:00:00Z',
    },
    {
        id: 'mock-user-4',
        display_name: 'Tom Lee',
        bio: 'Software developer from the US, living in Kagoshima. Want to improve my Japanese!',
        city: '鹿児島',
        languages: ['English (Native)', 'Japanese (Intermediate)'],
        created_at: '2024-01-01T00:00:00Z',
    },
]

export const mockMeetups: Meetup[] = [
    // === MeetUp (グループ) ===
    {
        id: 'meetup-1',
        type: 'meetup',
        host_id: 'mock-user-2',
        city: '福岡',
        starts_at: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
        area: '天神',
        duration_min: 90,
        group_size: 4,
        budget_yen: 2000,
        participation_fee: 500,
        language_ratio: { japanese: 50, english: 50 },
        payment_type: '割り勘',
        beginner_friendly: true,
        public_place_only: true,
        rules: {
            photos_ok: false,
            topics_to_avoid: ['政治', '宗教'],
        },
        status: 'open',
        created_at: '2024-01-15T00:00:00Z',
        profiles: { display_name: 'Sarah Johnson' },
    },
    {
        id: 'meetup-2',
        type: 'meetup',
        host_id: 'mock-user-1',
        city: '福岡',
        starts_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        area: '博多',
        duration_min: 120,
        group_size: 6,
        budget_yen: 3000,
        participation_fee: 0,
        language_ratio: { japanese: 60, english: 40 },
        payment_type: '各自払い',
        beginner_friendly: true,
        public_place_only: true,
        rules: {
            photos_ok: true,
            topics_to_avoid: [],
        },
        status: 'open',
        created_at: '2024-01-14T00:00:00Z',
        profiles: { display_name: '田中太郎' },
    },
    {
        id: 'meetup-3',
        type: 'meetup',
        host_id: 'mock-user-3',
        city: '鹿児島',
        starts_at: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
        area: '天文館',
        duration_min: 90,
        group_size: 4,
        budget_yen: 2500,
        participation_fee: 500,
        language_ratio: { japanese: 70, korean: 30 },
        payment_type: '割り勘',
        beginner_friendly: true,
        public_place_only: true,
        rules: {
            photos_ok: false,
            topics_to_avoid: ['仕事'],
        },
        status: 'open',
        created_at: '2024-01-13T00:00:00Z',
        profiles: { display_name: '鈴木花子' },
    },
    {
        id: 'meetup-4',
        type: 'meetup',
        host_id: 'mock-user-2',
        city: '福岡',
        starts_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        area: '薬院',
        duration_min: 60,
        group_size: 3,
        budget_yen: 1500,
        participation_fee: 1000,
        language_ratio: { japanese: 50, english: 50 },
        payment_type: '各自払い',
        beginner_friendly: false,
        public_place_only: true,
        rules: {
            photos_ok: true,
            topics_to_avoid: [],
        },
        status: 'open',
        created_at: '2024-01-12T00:00:00Z',
        profiles: { display_name: 'Sarah Johnson' },
    },
    {
        id: 'meetup-5',
        type: 'meetup',
        host_id: 'mock-user-3',
        city: '鹿児島',
        starts_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        area: '中央駅',
        duration_min: 120,
        group_size: 5,
        budget_yen: 3500,
        participation_fee: 0,
        language_ratio: { japanese: 80, korean: 20 },
        payment_type: '割り勘',
        beginner_friendly: true,
        public_place_only: false,
        rules: {
            photos_ok: false,
            topics_to_avoid: ['政治'],
        },
        status: 'open',
        created_at: '2024-01-11T00:00:00Z',
        profiles: { display_name: '鈴木花子' },
    },

    // === もぐトーク (1対1) ===
    {
        id: '1on1-1',
        type: '1on1',
        host_id: 'mock-user-2',
        city: '福岡',
        starts_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        area: '天神 スターバックス',
        duration_min: 60,
        group_size: 2,
        budget_yen: 800,
        participation_fee: 2000,
        language_ratio: { japanese: 50, english: 50 },
        payment_type: '各自払い',
        beginner_friendly: true,
        public_place_only: true,
        rules: {
            photos_ok: false,
            topics_to_avoid: [],
        },
        status: 'open',
        created_at: '2024-01-16T00:00:00Z',
        profiles: { display_name: 'Sarah Johnson' },
    },
    {
        id: '1on1-2',
        type: '1on1',
        host_id: 'mock-user-1',
        city: '福岡',
        starts_at: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(),
        area: '博多 タリーズ',
        duration_min: 45,
        group_size: 2,
        budget_yen: 600,
        participation_fee: 1500,
        language_ratio: { japanese: 40, english: 60 },
        payment_type: '各自払い',
        beginner_friendly: false,
        public_place_only: true,
        rules: {
            photos_ok: false,
            topics_to_avoid: ['政治'],
        },
        status: 'open',
        created_at: '2024-01-15T00:00:00Z',
        profiles: { display_name: '田中太郎' },
    },
    {
        id: '1on1-3',
        type: '1on1',
        host_id: 'mock-user-4',
        city: '鹿児島',
        starts_at: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
        area: '天文館 ドトール',
        duration_min: 60,
        group_size: 2,
        budget_yen: 500,
        participation_fee: 2500,
        language_ratio: { japanese: 60, english: 40 },
        payment_type: '各自払い',
        beginner_friendly: true,
        public_place_only: true,
        rules: {
            photos_ok: true,
            topics_to_avoid: [],
        },
        status: 'open',
        created_at: '2024-01-14T00:00:00Z',
        profiles: { display_name: 'Tom Lee' },
    },
]

export const mockRSVPs = [
    {
        id: 'rsvp-1',
        meetup_id: 'meetup-2',
        user_id: 'mock-user-1',
        status: 'going',
        created_at: '2024-01-14T00:00:00Z',
    },
    {
        id: 'rsvp-2',
        meetup_id: 'meetup-1',
        user_id: 'mock-user-1',
        status: 'going',
        created_at: '2024-01-15T00:00:00Z',
    },
]

// ヘルパー関数
export function getMockProfile(userId: string) {
    return mockProfiles.find((p) => p.id === userId) || null
}

export function getMockMeetup(id: string) {
    const meetup = mockMeetups.find((m) => m.id === id)
    if (!meetup) return null

    const rsvpCount = mockRSVPs.filter(
        (r) => r.meetup_id === id && r.status === 'going'
    ).length

    return {
        ...meetup,
        rsvp_count: rsvpCount,
    }
}

export function getMockMeetups(city: string, filters?: any) {
    let filtered = mockMeetups.filter((m) => m.city === city && m.status === 'open')

    // タイプフィルタ
    if (filters?.type) {
        filtered = filtered.filter((m) => m.type === filters.type)
    }

    if (filters?.area) {
        filtered = filtered.filter((m) =>
            m.area.toLowerCase().includes(filters.area.toLowerCase())
        )
    }

    if (filters?.beginnerFriendly) {
        filtered = filtered.filter((m) => m.beginner_friendly)
    }

    if (filters?.groupOnly) {
        filtered = filtered.filter((m) => m.group_size >= 3)
    }

    // 時間範囲フィルタ
    const now = new Date()
    if (filters?.timeRange === 'today') {
        const endOfDay = new Date(now)
        endOfDay.setHours(23, 59, 59, 999)
        filtered = filtered.filter((m) => {
            const startsAt = new Date(m.starts_at)
            return startsAt >= now && startsAt <= endOfDay
        })
    } else if (filters?.timeRange === 'week') {
        const endOfWeek = new Date(now)
        endOfWeek.setDate(endOfWeek.getDate() + 7)
        filtered = filtered.filter((m) => {
            const startsAt = new Date(m.starts_at)
            return startsAt >= now && startsAt <= endOfWeek
        })
    }

    return filtered
}

export function getUserRSVP(meetupId: string, userId: string) {
    return mockRSVPs.find(
        (r) => r.meetup_id === meetupId && r.user_id === userId && r.status === 'going'
    ) || null
}

export function getUserMeetups(userId: string) {
    const hosted = mockMeetups.filter((m) => m.host_id === userId)
    const rsvpMeetupIds = mockRSVPs
        .filter((r) => r.user_id === userId && r.status === 'going')
        .map((r) => r.meetup_id)
    const joined = mockMeetups.filter((m) => rsvpMeetupIds.includes(m.id))

    return { hosted, joined }
}
