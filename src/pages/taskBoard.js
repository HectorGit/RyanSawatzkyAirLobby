
// import ActiveCustomerTagComponent from '../components/activeCustomerTagComponent';
// import AddValetCustomer from '../components/addValetCustomerForm';
// import { useSelector} from 'react-redux'
require('dotenv').config();

import { Button, Typography, Stack } from '@mui/material';

import { useState } from 'react';

import TaskDayColumn from '../components/TaskDayColumn'
import { HorizontalRule } from '@mui/icons-material';

// import * as React from 'react';
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

/*
  TINKERING WITH DAYJS STUFF TO AUTO-SET THE COLUMN START AND END DATES
*/
//import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
//  dayjs.extend(customParseFormat)
//  const [startDate, setStartDate] = useState(dayjs());//calling dayjs without date returns date w / current date and time
//      "startDate" : startDate.format("YYYY-MM-DD"),
// I guess in this particular case, want "YYYYMMDD" (nothing extra...)
// Not sure how to get the days before or after... 
//https://day.js.org/docs/en/display/format


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function TaskBoard() {
  //perform the fetch of the task data, and pass it as props to the children of this component.
  //sort and filter the data as required. Then display it

  console.log("remove after testing:", process.env)
  
  dayjs.extend(customParseFormat) // to be able to format the date

  const [authToken, setAuthToken] = useState("") //start w/ empty list
  const [refreshToken, setRefreshToken] = useState("") //start w/ empty list
  const [anchorDate, seAnchortDate] = useState(dayjs());//calling dayjs without date returns date w / current date and time
  let formattedAnchorDate = anchorDate.format("YYYYMMDD")
  console.log("instantiating board with anchor date : ", formattedAnchorDate )

  /* MOVE KEY AND VALUE TO .ENV IF CONTINUING ONWARD !!! (SECURITY PURPOSES) */

  const handleLogin = () => {

    //without params... this just fetches all the tasks... 
    //but in reality... it should be filtered by today's or appropriate date/time
    fetch("https://api.vrscheduler.com/api/v1/oauth/login", {
      method: "POST",
      body:JSON.stringify({
        "API_Key":process.env.API_Key,
        "API_Value":process.env.API_Value
      })
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log("Login Response : \n",data)
      // console.log("data.Access : \n",data)
      setAuthToken(data.Access_Token.token)
      setRefreshToken(data.Refresh_Token.token)
    }) //set the state w/ returned data

  }

  return (
    <>

      <Button onClick={handleLogin}>
        Login by clicking here !
      </Button>

      <Typography variant="h1"> Tasks Board </Typography>

      {/* ossible improvement : make day populate automatically */}

      { authToken != "" && 
        <>
          <Stack direction={"row"}>
            <Item>
              <TaskDayColumn authToken={authToken} TaskStartDate={"20230614"} TaskEndDate={"20230614"} />
            </Item>
            <Item>
              <TaskDayColumn authToken={authToken} TaskStartDate={"20230615"} TaskEndDate={"20230615"}  />
            </Item>
            <Item>
              <TaskDayColumn authToken={authToken} TaskStartDate={"20230616"} TaskEndDate={"20230616"} /> 
            </Item>
            <Item>
              <TaskDayColumn authToken={authToken} TaskStartDate={"20230617"} TaskEndDate={"20230617"} /> 
            </Item>
            <Item>
              <TaskDayColumn authToken={authToken} TaskStartDate={"20230618"} TaskEndDate={"20230618"} /> 
            </Item>
            <Item>
              <TaskDayColumn authToken={authToken} TaskStartDate={"20230619"} TaskEndDate={"20230619"}  /> 
            </Item>
          </Stack>
        </>
      }

    </>
  );
}

export default TaskBoard;