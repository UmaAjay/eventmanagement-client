import React, { useState, useEffect } from "react";
import './Fake.css'
function Fake() {
  const [events, setEvents] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

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

  const filteredEvents = events.filter(
    (event) =>
      event.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
      event.category.toLowerCase().includes(searchCategory.toLowerCase())
  );

  const uniqueLocations = [...new Set(events.map((event) => event.location))];
  const uniqueCategories = [...new Set(events.map((event) => event.category))];

  return (
    <div>
      <h1>Events</h1>
      <div>
        <label htmlFor="location">Filter by location:</label>
        <select id="location" value={searchLocation} onChange={handleLocationChange}>
          <option value="">All locations</option>
          {uniqueLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <label htmlFor="category">Filter by category:</label>
        <select id="category" value={searchCategory} onChange={handleCategoryChange}>
          <option value="">All categories</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <table>
  <thead>
    <tr>
      <th>Image</th>
      <th>Name</th>
      <th>Description</th>
      <th>Date</th>
      <th>End Date</th>
      <th>Location</th>
      <th>Category</th>
    </tr>
  </thead>
  <tbody>
    {filteredEvents.map((event) => (
      <tr key={event.id}>
        <td>
          <img src={event.imageURL} alt={event.name} />
        </td>
        <td>{event.name}</td>
        <td>{event.description}</td>
        <td>{event.date}</td>
        <td>{event.enddate}</td>
        <td>{event.location}</td>
        <td>{event.category}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}

export default Fake;
