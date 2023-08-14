import * as React from 'react';
import TaskBoard from "./pages/taskBoard"
// import { Provider } from 'react-redux';
// import { store as CustomerStore } from '../src/redux/customerStore'



/**
 * 
 * TINKERING WITH DAYJS STUFF THAT WOULD AUTO-CALCULATE THE DATE FOR TODAY 
 * 
 * 
 */
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; //used for Material UI DateField


function App() {

  return (
    // <Provider store={CustomerStore}>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TaskBoard/>
    </LocalizationProvider>

    // </Provider>
  );
}

export default App;