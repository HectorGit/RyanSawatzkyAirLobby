import * as React from 'react';
import Card from '@mui/material/Card';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';

/*
to adjust card, see : 
https://mui.com/material-ui/react-card/
*/

export default function TaskCard(props) {

  const [taskData, setTaskData] = useState({})

  const handleFetchTaskData = () => {
    fetch(`https://api.vrscheduler.com/api/v1/tasks/${props.TaskID}`, {
        headers : {
          "Authorization" : "VRS" + " " + props.authToken //compounded string.
        }
      }
    )
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log("Reponse for Task Data : \n", data.data) //see example of one of the data returned
      setTaskData(data.data) // the data actually contains each task
    })
  }

  return (
    <Card sx={{ width : "150px"}}>
      {/* <Typography>
        {props.PropertyName}
      </Typography> */}
      <Typography>
        {props.PropertyAbbreviation}
      </Typography>
      <Typography>
        Completed : { props.Completed == "1" ? "✅" : "❌"}
      </Typography>
      <Button onClick={handleFetchTaskData}>
        Fetch Details!
      </Button>
    </Card>
  );
}

/**
[
    {
        "TaskID": 10919146,
        "TaskRuleID": 8228,
        "PropertyBookingID": null,
        "PropertyID": 29138,
        "TaskName": "Union Fisgard #215 ",
        "TaskDescription": null,
        "Approved": false,
        "ApprovedDate": null,
        "Completed": "0",
        "Billable": true,
        "LaborAmount": 97.2,
        "MaterialsAmount": 0,
        "TaskDate": "20230619",
        "CompleteConfirmedDate": null,
        "CreateDate": "20220616",
        "MinTimeToComplete": 1.75,
        "MaxTimeToComplete": 1.75,
        "TaskStartDate": "2023-06-16",
        "TaskStartTime": "11:00",
        "TaskCompleteByTime": null,
        "TaskCompleteByDate": "2023-06-16",
        "TaskTime": "10:00:00",
        "InternalNotes": null,
        "PackLinen": false,
        "RetrieveLinen": false,
        "TaskActive": true,
        "Flag1": false,
        "Flag2": false,
        "LinenCounts": null,
        "Property": {
            "PropertyID": 29138,
            "Active": true,
            "PropertyName": "UNION FISGARD #215",
            "PropertyAbbreviation": "Union F #215",
            "PropertyNotes": null,
            "InternalNotes": "Non Managed Unit",
            "Address": "517 Fisgard Street Unit #215 Victoria BC V8W 1R3",
            "Lat": 48.4291563,
            "Lon": -123.3688225,
            "DoorCode": "3571",
            "DefaultCheckInTime": 16,
            "DefaultCheckInTimeMinutes": 0,
            "DefaultCheckOutTime": 10,
            "DefaultCheckOutTimeMinutes": 0,
            "OwnerID": "13086",
            "RegionID": "2380",
            "CreateDate": "2020-07-30"
        },
        "Staff": []
    }
]
 */
