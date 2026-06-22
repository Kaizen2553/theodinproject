import React from 'react'

function Form({formData,setFormData,setIsEdit}) {
 
   const handleChange = (e) => {
      const {name,value} = e.target;

      setFormData((prev)=>(
          {
            ...prev,
            [name]:value,
          }
      ));
   }

   const handleSave = () => {
      setIsEdit(prev=>!prev)
   }

  return (
    <>
       <div>
         <input type="text"
         name='name'
         placeholder='enter your name'
         value={formData.name}
         onChange={handleChange} />

         <input type="text"
         name='email'
         placeholder='enter your email'
         value={formData.email}
         onChange={handleChange} />

         <input type="text"
         name='age'
         placeholder='enter your age'
         value={formData.age}
         onChange={handleChange} />

         <input type="text"
         name='state'
         placeholder='enter your state'
         value={formData.state}
         onChange={handleChange} />
   
       </div>
       <button onClick={handleSave}>save</button>
    </>
  )
}

export default Form