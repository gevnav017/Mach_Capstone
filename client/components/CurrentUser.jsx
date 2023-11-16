import React, { useState, useEffect } from "react";
import Axios from "axios";

const useCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    const getUser = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3000/api/user/auth/me",
          {
            headers: {
              authorization: token,
            },
          }
        );
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);

  return user;
};

export default useCurrentUser;
