import React from 'react'
import RequestCard from '../request/RequestCard'
import dayjs from "dayjs";

const PlanningCards = ({allPlannedRequests}) => {
  return (
    <div className='flex flex-col gap-5'>
    {allPlannedRequests.length === 0 && <h1>No Request!</h1>}
    {allPlannedRequests.map((request, idx) =>{
        return (
            <div key={idx} className='flex items-center gap-10'>
                <p>{dayjs(request.scheduledDate).format('h.mm A')}</p>
                <RequestCard request={request}/>
            </div>
        )
    })}
    </div>
  )
}

export default PlanningCards