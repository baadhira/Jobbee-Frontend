import { useState, useEffect, createContext } from "react";

import axios from "axios";

const JobContext = createContext();

import { useRouter } from "next/router";

export const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [applied, setApplied] = useState(false);

  const router = useRouter();

  const applyToJob = async (id, access_token) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.API_URL}/api/jobs/${id}/apply/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (res.data.applied === true) {
        setLoading(false);
        setApplied(true);
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  const checkJobApplied = async (id, access_token) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.API_URL}/api/jobs/${id}/check/`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      setLoading(false);
      setApplied(res.data);
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  //clear errors

  const clearErrors = () => {
    setError(null);
  };

  return (
    <JobContext.Provider
      value={{
        loading,
        updated,
        applied,
        applyToJob,
        clearErrors,
        error,
        checkJobApplied,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
export default JobContext;
