import React, { useState } from 'react';
import axiosInstance from '../../../../utils/axiosInstance';

const AddEvent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState(Array(6).fill(null));
  const [message, setMessage] = useState('');

  const handleImageChange = (index, e) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('location', location);
    images.forEach((image, index) => {
      if (image) {
        formData.append(`image${index + 1}`, image);
      }
    });

    axiosInstance
      .post('/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setMessage(response.data.message);
        setName('');
        setDescription('');
        setDate('');
        setTime('');
        setLocation('');
        setImages(Array(6).fill(null));
        setTimeout(() => {
          setMessage('');
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold mb-4 text-center">Add Event</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-96 md:w-3/4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="text-lg font-semibold mb-2">
              Event Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full p-2 border rounded focus:outline-[#4ca4c8]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="text-lg font-semibold mb-2">
              Event Description
            </label>
            <textarea
              id="description"
              required
              className="w-full p-2 border rounded focus:outline-[#4ca4c8]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              // Enable line breaks in the textarea
              rows={4}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="text-lg font-semibold mb-2">
              Event Date
            </label>
            <input
              type="date"
              id="date"
              required
              className="w-full p-2 border rounded focus:outline-[#4ca4c8]"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="text-lg font-semibold mb-2">
              Event Time
            </label>
            <input
              type="time"
              id="time"
              required
              className="w-full p-2 border rounded focus:outline-[#4ca4c8]"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="text-lg font-semibold mb-2">
              Event Location
            </label>
            <input
              type="text"
              id="location"
              required
              className="w-full p-2 border rounded focus:outline-[#4ca4c8]"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="md:grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div className="mb-4" key={`image${index}`}>
                <label htmlFor={`eventImage${index}`} className="text-lg font-semibold mb-2">
                  Event Image {index + 1}
                </label>
                <input
                  type="file"
                  id={`eventImage${index}`}
                  className="w-full p-2 border rounded focus:outline-[#4ca4c8]"
                  onChange={(e) => handleImageChange(index, e)}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#4ca4c8] hover:bg-[#0ca4c8] text-white font-semibold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
        {message && (
          <p className="text-green-500 text-lg mt-4">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AddEvent;
