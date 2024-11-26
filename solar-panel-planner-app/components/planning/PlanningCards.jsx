import React from 'react'

const cards = [
    {
        time: '10.00am',
        card: 'card'
    },
    {
        time: '12.00am',
        card: 'card'
    },
    {
        time: '02.00am',
        card: 'card'
    },
    {
        time: '04.00am',
        card: 'card'
    },
]

const PlanningCards = () => {
  return (
    <div className='flex flex-col gap-5'>
    {cards.map((card, idx) =>{
        return (
            <div key={idx} className='flex items-center'>
                <p>{card.time}</p>
                <div className='h-[50px] w-[200px] bg-slate-300'>{card.card}</div>
            </div>
        )
    })}
    </div>
  )
}

export default PlanningCards