import React, { useState, useEffect } from "react";

function Fake2() {
  const [events, setEvents] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:4000/event");
      const data = await response.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  const handleLocationChange = (e) => {
    setSearchLocation(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const filteredEvents = events.filter(
    (event) =>
      event.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
      event.category.toLowerCase().includes(searchCategory.toLowerCase()) &&
      (startDate === "" || new Date(event.date) >= new Date(startDate)) &&
      (endDate === "" || new Date(event.date) <= new Date(endDate))
  );

  const locationOptions = Array.from(new Set(events.map(event => event.location)))
    .map((location, index) => <option key={index} value={location}>{location}</option>);

  const categoryOptions = Array.from(new Set(events.map(event => event.category)))
    .map((category, index) => <option key={index} value={category}>{category}</option>);

  return (
    <div>
      <h1>Kariya Saman Events</h1>
      <div>
        <label>Location: </label>
        <select value={searchLocation} onChange={handleLocationChange}>
          <option value="">All locations</option>
          {locationOptions}
        </select>
        <label>Category: </label>
        <select value={searchCategory} onChange={handleCategoryChange}>
          <option value="">All categories</option>
          {categoryOptions}
        </select>
        <label>Start Date: </label>
        <input type="date" value={startDate} onChange={handleStartDateChange} />
        <label>End Date: </label>
        <input type="date" value={endDate} onChange={handleEndDateChange} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>EndDate</th>
            <th>Location</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event.id}>
              <td><img src={event.imageURL} alt={event.name} /></td>
              <td>{event.name}</td>
              <td>{event.description}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{new Date(event.enddate).toLocaleDateString()}</td>
              <td>{event.location}</td>
              <td>{event.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Fake2;
