import React from 'react'

function Portfolio({ formData, setIsEdit }) {
  return (
    <div>
      <h1>Portfolio</h1>

      <p>
        <strong>Name:</strong> {formData.name}
      </p>

      <p>
        <strong>Email:</strong> {formData.email}
      </p>

      <p>
        <strong>Age:</strong> {formData.age}
      </p>

      <p>
        <strong>State:</strong> {formData.state}
      </p>

      <button onClick={() => setIsEdit(true)}>
        Edit
      </button>
    </div>
  )
}

export default Portfolio