import { getRequestById } from '@/app/actions/requestActions';
import RequestForm from '@/components/request/RequestForm';
import React from 'react'
  
const EditRequest = async ({params}) => {
    const requestId = params.id;
    const requestInfo = await getRequestById(requestId);

  return (
    <div className="w-[90%] max-w-[40vw] mx-auto mt-10 mb-10">
      <h1 className="section-heading">Update your Request</h1>
      <p className="page-subheading">
        Please fill your details below and provide a preferred time slot for
        visit.
      </p>
      <RequestForm initialFormData={requestInfo?.data}/>
    </div>
  )
}

export default EditRequest