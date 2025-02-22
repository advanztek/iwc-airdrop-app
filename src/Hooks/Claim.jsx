import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/path";
import { toast } from "react-toastify";
import { useUserContext } from "../contexts";
import { useBalance } from "../contexts/BalanceContext";

export const useClaimTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { config } = useUserContext();
  const { updateBalance, fetchBalance } = useBalance();

  const claimTask = async () => {
    setLoading(true);
    setError(null);

    try {
      // API request to claim task
      const response = await axios.get(
        `${BASE_URL}/airdrop/hourlytasks/claim`,
        config
      );

      console.log("bddd:", response);

      if (response.status === 200) {
        await fetchBalance()
        return { success: true, data: response.data };
      } else {
        return {
          success: false,
          error: response.data?.message || "Claim failed."
        };
      }
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message;
      setError(errMsg);
      toast.error(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  return { claimTask, loading, error };
};

export const useClaimbyID = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { config } = useUserContext();

  const claimTask = async (id) => {
    setLoading(true);
    setError(null);

    console.log("taskID:", id);

    try {
      const response = await axios.get(
        `${BASE_URL}/airdrop/tasks/claim/${id}`,
        config
      );

      console.log("Hres:", response);

      if (response.status === 200) {
        return { success: true, data: response.data };
      } else {
        const errorMessage = response?.data?.message || "Task claim failed.";
        throw new Error(errorMessage);
      }
    } catch (err) {
      const errMsg =
        err?.response?.data?.message ||
        err.message ||
        "Network or server error";

      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  return { claimTask, loading, error };
};

export const useGetReferrals = () => {
  const [refData, setRefData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { config } = useUserContext();

  const fetchReferrals = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/referrals`, config);

      const data = response.data;

      if (data?.error === 0) {
        setRefData(data?.result);
      }
      if (data?.error) {
        toast.error(data?.message);
        return false;
      }
    } catch (error) {
      console.log("Error:", error);
      // toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);
  return { refData, loading, fetchReferrals };
};

export const useGetLastClaim = () => {
  const [lastClaimed, setLastClaimed] = useState([]);
  const [loading, setLoading] = useState(true);
  const { config } = useUserContext();

  const getLastClaimed = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/airdrop/get/last-claim`,
        config
      );
      const data = response.data;
      
      if (data?.error === 0) {
        setLastClaimed(data?.lastclaimedtime);
      }
      if (data?.error) {
        toast.error(data?.message);
        return false;
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLastClaimed();
  }, []);
  return { lastClaimed, loading, getLastClaimed };
};
