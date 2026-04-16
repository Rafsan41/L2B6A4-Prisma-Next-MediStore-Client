import React from 'react'
import { SectionCards } from '../section-cards'
import { ChartAreaInteractive } from '../chart-area-interactive'

export default function Overview() {

    return (
        <main className='@container/main flex flex-1 flex-col gap-2'>
            <section className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
            </section>
            <section className="px-4 lg:px-6">
                <ChartAreaInteractive />
            </section>
        </main>
    )
}