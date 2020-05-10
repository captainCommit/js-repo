import React,{Component} from 'react'
import TextField from '@material-ui/core/TextField';
import {createMuiTheme} from '@material-ui/core/styles'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'
import {MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
const theme = createMuiTheme({
    spacing: 4,
});
function makeid(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
export default class ModalAdd extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
                submit : props.submit,
                name : '',
                nameError : false,
                nameErrorMessage : '',
                doctor : '',
                doctorError : false,
                doctorErrorMessage : false,
                date:moment(new Date()),
                dateError: false,
                dateErrorMessage:'',
                time: moment(new Date()),
                timeError:false,
                timeErrorMessage:'',
                status:null,
            };
            this.handleNameChange = this.handleNameChange.bind(this);
            this.handleDoctorChange = this.handleDoctorChange.bind(this);
            this.handleDateChange = this.handleDateChange.bind(this);
            this.handleTimeChange = this.handleTimeChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleNameChange(e){
        this.setState({name : e.target.value})
    }
    handleDoctorChange(d){
        this.setState({doctor : d.target.value})
    }
    handleDateChange(date) {
        this.setState({date : date});
    }
    handleTimeChange(time) {
        this.setState({time : time});
    }
    handleSubmit(event){
        event.preventDefault();
        if(this.state.name === '')
        {
            this.setState({nameError : true,nameErrorMessage : "Name of patient cannot be empty"})
        }
        else if(this.state.doctor === '')
        {
            this.setState({nameError : false,nameErrorMessage : "",doctorError:true,doctorErrorMessage:"Name of doctor cannot be empty"})
        }
        else if(this.state.date === '')
        {
            this.setState({nameError : false,nameErrorMessage : "",doctorError:false,doctorErrorMessage:"",dateError : true,dateErrorMessage : "Date cannot be empty"})
        }
        else if(this.state.time === '')
        {
            this.setState({nameError : false,nameErrorMessage : "",doctorError:false,doctorErrorMessage:"",dateError : false,dateErrorMessage:"",timeError : true,timeErrorMessage : "Time cannot be empty"})
        }
        else
        {
            const newData = {id : makeid(10),name:this.state.name,doctor:this.state.doctor,date : this.state.date.format('DD-MM-YYYY'),time : this.state.time.format('hh:mm a')}
            console.log(newData)
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
                            <Typography variant="h4" gutterBottom style={{marginBottom:30}}>Add Appointment</Typography>
                            <Grid container spacing = {2}>
                                <Grid items xs = {6}>
                                    <TextField error={this.state.nameError} label="Name of Patient" variant="outlined" fullWidth style={{marginRight:20,marginTop:10}} value={this.state.name} onChange={this.handleNameChange} helperText={this.state.nameErrorMessage}/>
                                </Grid>
                                <Grid item xs = {6}>
                                    <TextField error={this.state.doctorError} label="Name of Doctor" variant="outlined" fullWidth style={{marginBottom: 20,marginRight:20}} value={this.state.doctor} onChange={this.handleDoctorChange} helperText={this.state.doctorErrorMessage}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <KeyboardDatePicker disableToolbar format="DD-MM-yyyy" variant="outlined" margin="none" id="date-picker" label="Date Of Appointment" value={this.state.date} onChange={this.handleDateChange} KeyboardButtonProps={{'aria-label': 'change date', }} minDate={new Date()}/>
                                    </MuiPickersUtilsProvider>
                                    {/*<TextField error={this.state.dateError} data-testid="=date" required label="Date" variant="outlined" fullWidth style={{marginBottom: 20,marginRight:20}} value={this.state.date} helperText={this.state.dateErrorMessage} onChange={this.handleDateChange}/ > */}
                                </Grid>
                                <Grid item xs={6}>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <KeyboardTimePicker margin="none" id="time-picker" variant="outlined" label="Time Of Appointment" value={this.state.time} onChange={this.handleTimeChange} KeyboardButtonProps={{   'aria-label': 'change time', }} />
                                    </MuiPickersUtilsProvider>
                                    {/*<TextField error={this.state.timeError} data-testid="time" required label="Time"  fullWidth style={{marginBottom: 20}} autoComplete="current-date" value={this.state.time} helperText={this.state.timeErrorMessage} variant="outlined" onChange={this.handleTimeChange}/>*/}
                                </Grid>
                                <Grid item xs={12}>
                                    <Button data-testid="submitbutton" variant="contained" size="large" startIcon={<PersonAddIcon/>} color="primary" onClick={this.handleSubmit}>Add Appointment</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
        )
    }
}
