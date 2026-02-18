'use client'

import { useState, useEffect } from 'react'
import { CitySwitch } from '@/components/CitySwitch'
import { MeetupCard } from '@/components/MeetupCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { getMeetups } from './actions/meetups'

export default function HomePage() {
  const [city, setCity] = useState('福岡')
  const [meetupType, setMeetupType] = useState<'1on1' | 'meetup'>('1on1')
  const [timeRange, setTimeRange] = useState<'today' | 'week'>('week')
  const [meetups, setMeetups] = useState<any[]>([])
  const [filters, setFilters] = useState({
    area: '',
    language: '',
    beginnerFriendly: false,
    groupOnly: false,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMeetups()
  }, [city, meetupType, timeRange, filters])

  async function loadMeetups() {
    setLoading(true)
    const data = await getMeetups(city, {
      type: meetupType,
      timeRange,
      area: filters.area,
      language: filters.language,
      beginnerFriendly: filters.beginnerFriendly,
      groupOnly: filters.groupOnly,
    })
    setMeetups(data)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* City Switch */}
        <div className="max-w-3xl mx-auto mb-6">
          <CitySwitch selectedCity={city} onCityChange={setCity} />
        </div>

        {/* Type Switch: 1対1 / MeetUp */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMeetupType('1on1')}
              className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all font-semibold ${meetupType === '1on1'
                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                }`}
            >
              <span className="text-2xl">🍙</span>
              <div className="text-left">
                <div className="text-base">もぐトーク</div>
                <div className="text-xs font-normal opacity-70">ホストと1対1で</div>
              </div>
            </button>
            <button
              onClick={() => setMeetupType('meetup')}
              className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all font-semibold ${meetupType === 'meetup'
                ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md'
                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                }`}
            >
              <span className="text-2xl">👥</span>
              <div className="text-left">
                <div className="text-base">MeetUp</div>
                <div className="text-xs font-normal opacity-70">グループで楽しく</div>
              </div>
            </button>
          </div>
        </div>

        {/* Tabs for time range */}
        <Tabs
          value={timeRange}
          onValueChange={(value) => setTimeRange(value as 'today' | 'week')}
          className="max-w-3xl mx-auto mb-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="today">今日</TabsTrigger>
            <TabsTrigger value="week">今週</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filters */}
        <div className="max-w-3xl mx-auto mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">フィルター</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="area" className="text-sm">エリア</Label>
              <Input
                id="area"
                placeholder="例: 天神"
                value={filters.area}
                onChange={(e) => setFilters({ ...filters, area: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="language" className="text-sm">言語</Label>
              <Input
                id="language"
                placeholder="例: ja, en"
                value={filters.language}
                onChange={(e) => setFilters({ ...filters, language: e.target.value })}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge
              variant={filters.beginnerFriendly ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setFilters({ ...filters, beginnerFriendly: !filters.beginnerFriendly })}
            >
              初心者歓迎
            </Badge>
            {meetupType === 'meetup' && (
              <Badge
                variant={filters.groupOnly ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setFilters({ ...filters, groupOnly: !filters.groupOnly })}
              >
                グループのみ (3人以上)
              </Badge>
            )}
          </div>
        </div>

        {/* Meetup List */}
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">読み込み中...</p>
            </div>
          ) : meetups.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-xl mb-2">{meetupType === '1on1' ? '🍙' : '👥'}</p>
              <p className="text-gray-500">
                {meetupType === '1on1' ? 'もぐトーク' : 'MeetUp'}が見つかりませんでした
              </p>
              <p className="text-sm text-gray-400 mt-2">フィルターを変更するか、新しく作成してみてください</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {meetups.map((meetup) => (
                <MeetupCard key={meetup.id} meetup={meetup} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
