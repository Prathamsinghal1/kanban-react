import React, { useState } from "react";
import "../../App.css";


export default function Display() {
  const [set, setCount] = useState(false);

  return (
    <div>
      <div>
        <button className="display" onClick={() => setCount(!set)}>
          Display
        </button>
      </div>

      {set && (
        <div
          class="card"
          style={{ border: "1.5px solid black", display: "inline-block" }}
        >
        <form action="/action_page.php">
        <label for="cars">Grouping: </label>
        <select id="cars" name="">
          <option value="priority">Priority</option>
          <option value="status">Status</option>
          <option value="user">User</option>
        </select>
        <br/>
        <label for="cars">Ordering: </label>
        <select id="cars" name="">
          <option value="priority">Priority</option>
          <option value="status">Status</option>
          <option value="user">User</option>
        </select>
      </form>
      
        </div>
      )}
    </div>
  );
}
