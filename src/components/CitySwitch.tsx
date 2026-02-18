'use client'

import { Button } from '@/components/ui/button'

type CitySwitchProps = {
    selectedCity: string
    onCityChange: (city: string) => void
}

export function CitySwitch({ selectedCity, onCityChange }: CitySwitchProps) {
    return (
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <Button
                variant={selectedCity === '福岡' ? 'default' : 'ghost'}
                onClick={() => onCityChange('福岡')}
                className="flex-1"
                size="sm"
            >
                福岡
            </Button>
            <Button
                variant={selectedCity === '鹿児島' ? 'default' : 'ghost'}
                onClick={() => onCityChange('鹿児島')}
                className="flex-1"
                size="sm"
            >
                鹿児島
            </Button>
        </div>
    )
}
