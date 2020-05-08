import React,{Component} from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import MaterialTable from 'material-table'


export default class Material extends Component{
    constructor(props)
    {
        super(props)
        this.state = {app : Appointments}
    }
    onRowAdd = (newData)=>{
        var temp = [...this.state.app]
        temp.push(newData)
    }
    render()
    {
        return(
            <Paper className="App" elevation={3}>
                <Typography variant="h3" gutterBottom>Appointments</Typography>
            </Paper>
        )
    }
}

const Appointments = [
    {
        "id": "6303001607",
        "name": "Erin White",
        "date": "03-07-2019",
        "time": "11:30 AM",
        "doctor": "Deborah Clements"
    },
    {
        "id": "3069447210",
        "name": "Naomi Rivas",
        "date": "16-11-2020",
        "time": "07:30 PM",
        "doctor": "Tamara Rivera"
    },
    {
        "id": "2296400716",
        "name": "Reed Mcgowan",
        "date": "17-11-2019",
        "time": "07:30 PM",
        "doctor": "Eugenia Eaton"
    },
    {
        "id": "1935204474",
        "name": "Jescie Potts",
        "date": "23-03-2021",
        "time": "07:30 PM",
        "doctor": "Hadley Morrow"
    },
    {
        "id": "6620700434",
        "name": "Cullen Wilkerson",
        "date": "27-03-2020",
        "time": "07:30 PM",
        "doctor": "Jaquelyn Santos"
    },
    {
        "id": "1693202676",
        "name": "Hoyt Beck",
        "date": "20-09-2020",
        "time": "11:30 AM",
        "doctor": "Rosalyn Francis"
    },
    {
        "id": "7992690895",
        "name": "Kristen William",
        "date": "30-03-2020",
        "time": "11:30 AM",
        "doctor": "Rowan Riggs"
    },
    {
        "id": "4874968261",
        "name": "Illana Dejesus",
        "date": "05-03-2021",
        "time": "07:30 PM",
        "doctor": "Imelda Mooney"
    },
    {
        "id": "9244263715",
        "name": "Beau Knox",
        "date": "09-05-2019",
        "time": "07:30 PM",
        "doctor": "Lacy Morales"
    },
    {
        "id": "2253177407",
        "name": "Devin Ayala",
        "date": "28-12-2019",
        "time": "07:30 PM",
        "doctor": "Abel Strong"
    }
]
