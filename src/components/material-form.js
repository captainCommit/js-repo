import React,{Component} from 'react'
import TextField from '@material-ui/core/TextField';
import {createMuiTheme} from '@material-ui/core/styles'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'
import {MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const theme = createMuiTheme({
    spacing: 4,
});
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
export default class ModalUpdate extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
                id : props.id,
                submit : props.submit,
                name : props.name,
                doctor : props.doctor,
                submit : props.submit,
                date: props.date,
                dateError: false,
                dateErrorMessage:'',
                time: moment(new Date(props.date+" "+props.time)),
                aTime : props.time,
                timeError:false,
                timeErrorMessage:'',
                status:null,
            };
            console.log(this.state.submit)
            this.handleDateChange = this.handleDateChange.bind(this);
            this.handleTimeChange = this.handleTimeChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleDateChange(date) {
        this.setState({date : date});
    }
    handleTimeChange(time) {
        this.setState({time : time});
    }
    handleSubmit(event){
        event.preventDefault();
        if(this.state.date === '')
        {
            this.setState({dateError : true,dateErrorMessage : "Date cannot be empty",status:null})
        }
        else if(this.state.time === '')
        {
            this.setState({dateError : false,timeError : true,timeErrorMessage : "Time cannot be empty",status:null})
        }
        else
        {
            const newData = {id : this.state.id,name:this.state.name,doctor:this.state.doctor,date : this.state.date,time : this.state.time.format('hh:mm a')}
            this.state.submit(newData)
        }
    }
    render()
    {
        const classes = {
            root: {
                padding:10
              },
              paper: {
                maxWidth:700,
                padding: theme.spacing(2),
                textAlign: 'center',
                color: theme.palette.text.secondary,
            },
        }
        return(
                    <Paper style={classes.paper} elevation={5} >
                        <form  data-testid="submitform" style={classes.root} noValidate autoComplete="off">
                            <Typography variant="h4" gutterBottom style={{marginBottom:30}}>Update Appointments</Typography>
                            <Grid container spacing = {2}>
                                <Grid item xs = {4}>
                                    <TextField InputProps={{readOnly: true,}} label="ID" variant="outlined" fullWidth style={{marginBottom: 20,marginRight:20}} defaultValue={this.state.id}/>
                                </Grid>
                                <Grid items xs = {4}>
                                    <TextField InputProps={{readOnly: true,}} label="Name" variant="outlined" fullWidth style={{marginRight:20,marginTop:10}} defaultValue={this.state.name}/>
                                </Grid>
                                <Grid item xs = {4}>
                                    <TextField InputProps={{readOnly: true,}} label="Doctor" variant="outlined" fullWidth style={{marginBottom: 20,marginRight:20}} defaultValue={this.state.doctor}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <KeyboardDatePicker disableToolbar format="DD-MM-yyyy" margin="none" id="date-picker" label="Date picker" value={this.state.date} onChange={this.handleDateChange} KeyboardButtonProps={{     'aria-label': 'change date', }} />
                                    </MuiPickersUtilsProvider>
                                    {/*<TextField error={this.state.dateError} data-testid="=date" required label="Date" variant="outlined" fullWidth style={{marginBottom: 20,marginRight:20}} value={this.state.date} helperText={this.state.dateErrorMessage} onChange={this.handleDateChange}/ > */}
                                </Grid>
                                <Grid item xs={6}>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <KeyboardTimePicker margin="none" id="time-picker" label="Time" value={this.state.time} onChange={this.handleTimeChange} KeyboardButtonProps={{   'aria-label': 'change time', }}/>
                                    </MuiPickersUtilsProvider>
                                    {/*<TextField error={this.state.timeError} data-testid="time" required label="Time"  fullWidth style={{marginBottom: 20}} autoComplete="current-date" value={this.state.time} helperText={this.state.timeErrorMessage} variant="outlined" onChange={this.handleTimeChange}/>*/}
                                </Grid>
                                <Grid item xs={12}>
                                    <Button data-testid="submitbutton" variant="contained" size="large" startIcon={<CloudUploadIcon/>} color="primary" onClick={this.handleSubmit}>Update Appointment</Button>
                                </Grid>
                                <Grid item xs>
                                    {this.state.status === null?null:this.state.status === false ? <Alert severity="error" style={{marginTop:10}}>Unsuccessful Update</Alert>: <Alert severity="success" style={{marginTop:10}}>Update Successful</Alert> }
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
        )
    }
}
