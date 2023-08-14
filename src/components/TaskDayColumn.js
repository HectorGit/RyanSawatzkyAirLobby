
// import ActiveCustomerTagComponent from '../components/activeCustomerTagComponent';
// import AddValetCustomer from '../components/addValetCustomerForm';
// import { useSelector} from 'react-redux'
import { Button, Typography } from '@mui/material';

import { useEffect } from 'react';

import { useState } from 'react';

import TaskCard from '../components/TaskCard';

/**
 * IMPORTANT INFO : (remove or move to ENV file later)
 * APIKey: 19335979-2F9F-4328-9B2923FBE8060CDB
 * Value: F673A9D4-5FBB-450F-873250D00C29D5AE
 */

function TaskDayColumn(props) {
  //perform the fetch of the task data, and pass it as props to the children of this component.
  //sort and filter the data as required. Then display it

  console.log("task day column, authtoken: ", props.authToken)
  
  const [tasksToday, setTasksToday] = useState([]) //start w/ empty list

  useEffect(()=>{
    handleFetchData() //do the fetch if authToken present
  }, [props.authToken])

  function sortByAbbreviation(task_list){
    return task_list.sort((a,b) => {
        if (a.Property.PropertyAbbreviation < b.Property.PropertyAbbreviation) {
            return -1;
        }
        if (a.Property.PropertyAbbreviation > b.Property.PropertyAbbreviation) {
            return 1;
        }
        return 0;
    })
  }

  const handleFetchData = () => {

    //without params... this just fetches all the tasks... 
    //but in reality... it should be filtered by today's or appropriate date/time
    fetch(`https://api.vrscheduler.com/api/v1/tasks?TaskStartDate=${props.TaskStartDate}&TaskEndDate=${props.TaskEndDate}`, { //TaskStartDate=2023-06-16 //?ApprovedStartDate=20230615
        headers : {
          "Authorization" : "VRS" + " " + props.authToken //compounded string.
        }
      }
    )
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log("Reponse for Tasks Query : \n", data) //see example of one of the data returned
      let sortedByAbbreviation = sortByAbbreviation(data.data)
      setTasksToday(sortedByAbbreviation) // the data actually contains each task
    })
    // .then(
    //  console.log("tasksToday:", tasksToday)
    // ) //set the state w/ returned data

  }

  return (
    <>

      {props.authToken && tasksToday.length > 0 && 
        tasksToday.map( (task) => {
          return(
            <p key={task.TaskID}>
              {/* <em>
                {JSON.stringify(task)}
              </em> */}
              <TaskCard PropertyName = {task.Property.PropertyName} PropertyAbbreviation = {task.Property.PropertyAbbreviation} Completed = {task.Completed} TaskID = {task.TaskID} authToken={props.authToken}/>
            </p>
          )
        })
      }

    </>
  );
}

export default TaskDayColumn;

/*

EXAMPLE OBJECT FETCHED : 

{
    "TaskID": 3744712,
    "TaskRuleID": 7303,
    "PropertyBookingID": 1656891,
    "PropertyID": 29300,
    "TaskName": "Turnover ",
    "TaskDescription": "",
    "Approved": false,
    "ApprovedDate": null,
    "Completed": "1",
    "Billable": true,
    "LaborAmount": 0,
    "MaterialsAmount": 0,
    "TaskDate": "20200810",
    "CompleteConfirmedDate": "2020-08-10",
    "CreateDate": "20200810",
    "MinTimeToComplete": 0.25,
    "MaxTimeToComplete": 2.5,
    "TaskStartDate": "2020-08-09",
    "TaskStartTime": "11:00",
    "TaskCompleteByTime": "15:15",
    "TaskCompleteByDate": "2020-08-10",
    "TaskTime": "08:00:00",
    "InternalNotes": "",
    "PackLinen": false,
    "RetrieveLinen": false,
    "TaskActive": true,
    "Flag1": false,
    "Flag2": false,
    "LinenCounts": "",
    "Property": {
        "PropertyID": 29300,
        "Active": true,
        "PropertyName": "Monaco Unit #202",
        "PropertyAbbreviation": "Mona 202",
        "PropertyNotes": null,
        "InternalNotes": "#202 at the Monaco, in the heart of the city",
        "Address": "610 Johnson Street Unit # 202 Victoria BC V8W 1M4",
        "Lat": 48.4275736,
        "Lon": -123.3666922,
        "DoorCode": "4545",
        "DefaultCheckInTime": 16,
        "DefaultCheckInTimeMinutes": 0,
        "DefaultCheckOutTime": 10,
        "DefaultCheckOutTimeMinutes": 0,
        "OwnerID": "13086",
        "RegionID": "2355",
        "CreateDate": "2020-08-10"
    },
    "Staff": [
        {
            "StaffID": 6786,
            "Name": "Kristina Dziedzic",
            "Abbreviation": "KD",
            "Email": "dziedzickristina@gmail.com",
            "Phone": "8476977795",
            "CountryID": 225,
            "Active": false,
            "CreateDate": "2020-08-10"
        },
        {
            "StaffID": 6787,
            "Name": "Angela Mason",
            "Abbreviation": "AM",
            "Email": "angela@amalamybnb.com",
            "Phone": "2508589436",
            "CountryID": 225,
            "Active": true,
            "CreateDate": "2020-08-10"
        }
    ]
}

*/
