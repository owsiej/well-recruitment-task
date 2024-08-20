import Paper from "@mui/material/Paper";
import {
  Scheduler,
  Appointments,
  WeekView,
  MonthView,
  DayView,
  Toolbar,
  ViewSwitcher,
  AppointmentTooltip,
  AppointmentForm,
  ConfirmationDialog,
  DateNavigator,
  TodayButton,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useContext, useState } from "react";
import {
  EditingState,
  IntegratedEditing,
  ViewState,
} from "@devexpress/dx-react-scheduler";
import { AppointmentsContext } from "../context/appointmentsContext.jsx";

function App() {
  const [currentView, setCurrentView] = useState("Month");

  const {
    appointmentList,
    addAppointmentToDatabase,
    deleteAppointmentFromDatabase,
    updateAppointmentInDatabase,
  } = useContext(AppointmentsContext);

  const handleCommitChanges = async ({ added, changed, deleted }) => {
    if (added) {
      addAppointmentToDatabase(added);
    }
    if (changed) {
      const appointmentId = Object.keys(changed)[0];
      const appointmentData = changed[appointmentId];
      updateAppointmentInDatabase(appointmentData, appointmentId);
    }
    if (deleted !== undefined) {
      deleteAppointmentFromDatabase(deleted);
    }
  };

  return (
    <Paper>
      <Scheduler data={appointmentList} height={700} locale={"pl-PL"}>
        <ViewState
          currentViewName={currentView}
          onCurrentViewNameChange={(e) => setCurrentView(e)}
        />
        <EditingState onCommitChanges={handleCommitChanges} />
        <IntegratedEditing />

        <DayView startDayHour={8} endDayHour={19} />
        <WeekView startDayHour={8} endDayHour={19} />
        <MonthView />

        <AllDayPanel />
        <Toolbar />
        <DateNavigator />
        <TodayButton />

        <ViewSwitcher />

        <ConfirmationDialog />

        <Appointments />
        <AppointmentTooltip
          showCloseButton={true}
          showOpenButton={true}
          showDeleteButton={true}
        />
        <AppointmentForm
          dateEditorComponent={(props) => (
            <AppointmentForm.DateEditor {...props} locale={"pl-PL"} />
          )}
        />
      </Scheduler>
    </Paper>
  );
}

export default App;
