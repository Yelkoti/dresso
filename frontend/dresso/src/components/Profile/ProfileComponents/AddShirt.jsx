import React, { useState } from 'react'

const AddShirt = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  }
  return (
    <form
      action="submit"
      className="flex flex-col bg-white border p-2 rounded-md shadow-xl space-y-2 flex-1 mx-4 font-bold text-gray-600"
      onSubmit={(e) => submitHandler(e)}
    >
      <p className="font-bold text-gray-600 justify-center flex sm:justify-start text-2xl">Add Shirt</p>
      <hr />
      <div className="flex flex-col sm:flex-row">
        <p className="mr-2 w-24">Name</p>
        <input
          className={`py-1 px-2 border-2 rounded-md focus:shadow-outline-blue`}
          type="password"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row">
        <p className="mr-2 w-24">Description</p>
        <input
          className={`py-1 px-2 border-2 rounded-md focus:shadow-outline-blue`}
          type="password"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex justify-center sm:justify-start">
        <button className="bg-gray-600 text-white py-1 px-2 rounded-md hover:bg-gray-400">
          Add
        </button>
      </div>
    </form>
  )
}

export default AddShirt