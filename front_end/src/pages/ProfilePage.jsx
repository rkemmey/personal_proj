import React, { useState, useEffect } from "react";
import { getProfile } from "../utilities";

// add in option to set display name or reset password

const ProfilePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      setData(data)
      console.log(data);
    };
  
    fetchProfile();
  }, []);

    return ( 
      <>
        <h1>Profile</h1>
        <p>Hello, {data ? data.display_name : "Loading..."}</p>
      </>
    );
  };
  
  export default ProfilePage;