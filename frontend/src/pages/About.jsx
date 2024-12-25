const AboutPage = () => {
  return (
    <main className="p-8 md:mx-24 lg:mx-36 my-10 space-y-10 backdrop-blur-lg rounded-lg">
      {/* Page Heading */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold">
          About <span className="text-primary">SatTrack</span>
        </h1>
      </div>

      {/* About Body */}
      <div className="space-y-8 text-left md:text-center">
        {/* First Paragraph */}
        <p className="text-base md:text-lg leading-relaxed">
          This Web Application takes the input from the user and database for a
          desired Indian satellite and, based on the inputs specified by the
          user, projects the orbital positions on the Earth’s surface to
          generate the sensor footprint.
        </p>

        {/* Second Paragraph */}
        <p className="text-base md:text-lg leading-relaxed">
          <span className="font-semibold">Following are the inputs provided to the application:</span>
          <br />
          1) Coordinates of the point of interest in terms of Latitude and Longitude on Earth. <br />
          2) Sensor within the payload. <br />
          3) Possible swath that can be imaged with the particular sensor. <br />
          4) Tilt of the satellite within the known agility of the platform. <br />
          5) Orbital parameters like semi-major axis, eccentricity, inclination,
          longitude of ascending node, argument of perigee, and true anomaly
          based on the publicly available information in the form of two-line
          elements (TLE).
        </p>

        {/* Objective Section */}
        <div>
          <h3 className="text-3xl font-bold mb-4">Objective</h3>
          <p className="text-base md:text-lg leading-relaxed">
            The objective is to predict the time of imaging a particular
            object/place (Lat-Long) on Earth by an Earth observing satellite
            with given sensor specifications, orbit, and attitude definitions
            under various orbit perturbations.
          </p>
        </div>

        {/* Background Section */}
        <div>
          <h3 className="text-3xl font-bold mb-4">Background</h3>
          <p className="text-base md:text-lg leading-relaxed">
            Low Earth observation satellites orbit the Earth’s surface at an
            altitude of around 300 to 1000 km in Sun synchronous polar orbit.
            The sensors are placed on the satellite platform to take pictures of
            the Earth’s surface. Users are interested in the opportunities when
            their area of interest is going to be imaged to meet their
            application requirements. This software-based application enables
            users to know the imaging opportunities apriori for planning. Agile
            satellite platforms can image certain areas with tilts defined by
            revisit constraints. This application guides users in imaging their
            area of interest, considering the tilt requirements. The information
            can be shared with satellite pass programming personnel.
          </p>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;