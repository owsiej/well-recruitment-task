import { createContext, useEffect, useState } from "react";

import { db } from "../../firebase.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const AppointmentsContext = createContext();

const AppointmentProvider = ({ children }) => {
  const [appointmentList, setAppointmentList] = useState([]);
  const [actionSignal, setActionSignal] = useState(false);

  const collectionName = "appointments";

  useEffect(() => {
    async function getData() {
      const data = await getDocs(collection(db, collectionName));
      const mappedData = data.docs.map((doc) => {
        const { startDate, endDate, ...data } = doc.data();
        return {
          startDate: startDate.toDate(),
          endDate: endDate.toDate(),
          ...data,
          id: doc.id,
        };
      });
      setAppointmentList(mappedData);
    }
    getData();
  }, [actionSignal]);

  const addAppointmentToDatabase = async (appointmentData) => {
    await addDoc(collection(db, collectionName), appointmentData);
    setActionSignal(!actionSignal);
  };

  const deleteAppointmentFromDatabase = async (appointmentId) => {
    await deleteDoc(doc(db, collectionName, appointmentId));
    setActionSignal(!actionSignal);
  };

  const updateAppointmentInDatabase = async (
    appointmentData,
    appointmentId
  ) => {
    const appointmentRef = doc(db, collectionName, appointmentId);
    await updateDoc(appointmentRef, {
      ...appointmentData,
    });
    setActionSignal(!actionSignal);
  };

  return (
    <AppointmentsContext.Provider
      value={{
        appointmentList,
        addAppointmentToDatabase,
        deleteAppointmentFromDatabase,
        updateAppointmentInDatabase,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

export { AppointmentsContext, AppointmentProvider };
