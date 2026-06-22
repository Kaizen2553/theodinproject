import React from 'react'
import { useState } from 'react';
import Form from './components/form';
import Portfolio from './components/Portfolio';

const App = () => {
  
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    age:"",
    state:"",
  });
  const [isEdit,setIsEdit] = useState(false);
  return (
    <>
      { 
        isEdit?(<Form formData={formData} setFormData={setFormData}
          setIsEdit={setIsEdit} />):(<Portfolio formData={formData} 
          setIsEdit={setIsEdit} />)
      }

    </>
  )
}

export default App
//how to structure the application??
//when the page opens the form opens with it the form may only contain the fields such as name,email,age and state
//when the submit button is clicked the form dissapears and we can then see the portfolio
//the page will have edit button on the portfolio when we press edit button
//the form will be visible again with old values displaying on the form

