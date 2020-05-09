import React,{Component} from 'react'
import TextField from '@material-ui/core/TextField';
import {createMuiTheme} from '@material-ui/core/styles'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
const theme = createMuiTheme({
    spacing: 4,
});
export default class ModalUpdate extends Component{
    constructor(props)
    {
        super();
        this.state = {
                date: '',
                dateError: false,
                dateErrorMessage:'',
                time:'',
                timeError:false,
                timeErrorMessage:'',
                status:null,
            };
            this.handleDateChange = this.handleDateChange.bind(this);
            this.handleTimeChange = this.handleTimeChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleDateChange(event) {
        event.preventDefault();
        this.setState({date : event.target.value});
    }
    handleTimeChange(event) {
        event.preventDefault();
        this.setState({time : event.target.value});
    }
    async handleSubmit(event){
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
            const obj = {date : this.state.date,time : this.state.time}
            console.log(obj)
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
                                    <TextField InputProps={{readOnly: true,}} label="ID" variant="outlined" fullWidth style={{marginBottom: 20,marginRight:20}} defaultValue="Appointment ID"/>
                                </Grid>
                                <Grid items xs = {4}>
                                    <TextField InputProps={{readOnly: true,}} label="Name" variant="outlined" fullWidth style={{marginRight:20,marginTop:10}} defaultValue="Patient Name"/>
                                </Grid>
                                <Grid item xs = {4}>
                                    <TextField InputProps={{readOnly: true,}} label="Doctor" variant="outlined" fullWidth style={{marginBottom: 20,marginRight:20}} defaultValue="Doctors Name"/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField error={this.state.dateError} data-testid="username" required label="Date" variant="outlined" fullWidth style={{marginBottom: 20,marginRight:20}} helperText={this.state.dateErrorMessage} onChange={this.handleDateChange}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField error={this.state.timeError} data-testid="password" required label="Time" type="password" fullWidth style={{marginBottom: 20}} autoComplete="current-password" helperText={this.state.timeErrorMessage} variant="outlined" onChange={this.handleTimeChange}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button data-testid="submitbutton" variant="contained" size="large" startIcon={<CloudUploadIcon/>} color="primary" onClick={this.handleSubmit}>Login</Button>
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
