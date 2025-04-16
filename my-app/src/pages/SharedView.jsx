/*import React, { useEffect } from "react";
import { model } from "../model";

/**
 * Reads favs from URL hash query string and populates model.favourites

function SharedView() {
  useEffect(() => {
    const processFavouritesFromURL = () => {
      const hash = window.location.hash;
      const queryString = hash.includes("?") ? hash.split("?")[1] : "";
      const params = new URLSearchParams(queryString);
      const favCodes = (params.get("favs") || "").split(",").filter(Boolean);

      console.log("Parsed fav codes:", favCodes);

      if (!model.courses || model.courses.length === 0) {
        console.warn("Courses not yet loaded, waiting...");
        return;
      }

      console.log("Courses loaded. Processing shared favourites.");

      const favCourses = favCodes
        .map(code => model.getCourse(code))
        .filter(course => course !== undefined);

      model.favourites = favCourses;

      console.log("Updated model.favourites:", favCourses);
    };

    const interval = setInterval(() => {
      if (model.courses && model.courses.length > 0) {
        processFavouritesFromURL();
        clearInterval(interval);  // Stop polling once done
      }
    }, 200);  // Poll every 200ms until courses are ready

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-xl p-6 text-white">
      <p>This is a shared view of someone's favourite courses.</p>
      <p>Click the <b>Favourites</b> button to see the list!</p>
    </div>
  );
}

export default SharedView;
*/
/*
import React, { useEffect } from "react";
import MainAppLayout from "./App.jsx";

function SharedView({ model }) {
  useEffect(() => {
    const processURLData = () => {
      const hash = window.location.hash;
      const queryString = hash.includes("?") ? hash.split("?")[1] : "";
      const params = new URLSearchParams(queryString);

      // ✅ Parse favourites
      const favCodes = (params.get("favs") || "").split(",").filter(Boolean);
      const favCourses = favCodes
        .map(code => model.getCourse(code))
        .filter(Boolean);
      model.favourites = favCourses;

      // ✅ Parse filters (everything that's not "favs")
      const filters = {};
      for (const [key, value] of params.entries()) {
        if (key !== "favs") {
          filters[key] = value;
        }
      }

      model.setFiltersFromObject(filters);
    };

    const interval = setInterval(() => {
      if (model.courses && model.courses.length > 0) {
        processURLData();
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [model]);

  return <MainAppLayout model={model} />;
}

export default SharedView;
*/
import React, { useEffect } from "react";
import MainAppLayout from "./App.jsx";

function SharedView({ model }) {
  useEffect(() => {
    const processURL = () => {
      const hash = window.location.hash;
      const queryString = hash.includes("?") ? hash.split("?")[1] : "";
      const params = new URLSearchParams(queryString);

      // ✅ Handle favourites
      const favCodes = (params.get("favs") || "").split(",").filter(Boolean);
      const favCourses = favCodes
        .map(code => model.getCourse(code))
        .filter(Boolean);
      model.favourites = favCourses;

      // ✅ Handle filters
      const knownKeys = ["language", "level", "location", "credits", "transcript"];
      const filters = {};
      for (const key of knownKeys) {
        if (params.has(key)) filters[key] = params.get(key);
      }
      model.setFiltersFromObject(filters);
      model.applyFilters();

    };

    const interval = setInterval(() => {
      if (model.courses && model.courses.length > 0) {
        processURL();
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [model]);

  return <MainAppLayout model={model} />;
}

export default SharedView;
