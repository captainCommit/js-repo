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
            this.setState({dateError : false,timeError : true,timeErrorMessage : "Time cannot be less than 8 charecters",status:null})
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
                padding: theme.spacing(2),
                textAlign: 'center',
                color: theme.palette.text.secondary,
            },
        }
        return(
            <div className="App">
                <Grid container direction="row" justify="center" alignItems="center" >
                <Grid item>
                    <Paper style={classes.paper} style={{marginTop:100}} elevation={5} >
                        <form  data-testid="submitform" style={classes.root} noValidate autoComplete="off">
                            <Typography variant="h4" gutterBottom style={{marginBottom:30}}>Update Appointments</Typography>
                            <TextField error={this.state.dateError} data-testid="username" required label="Date" variant="outlined" fullWidth style={{marginBottom: 20,marginRight:20}} helperText={this.state.dateErrorMessage} onChange={this.handleDateChange}/>
                            <TextField error={this.state.timeError} data-testid="password" required label="Time" type="password" fullWidth style={{marginBottom: 20}} autoComplete="current-password" helperText={this.state.timeErrorMessage} variant="outlined" onChange={this.handleTimeChange}/>
                            <Button data-testid="submitbutton" variant="contained" size="large" startIcon={<CloudUploadIcon/>} color="primary" onClick={this.handleSubmit}>Login</Button>
                            {this.state.status === null?null:this.state.status === false ? <Alert severity="error" style={{marginTop:10}}>Unsuccessful Update</Alert>: <Alert severity="success" style={{marginTop:10}}>Login Successful</Alert> }
                        </form>
                    </Paper>
                </Grid>
            </Grid>
            </div>
        )
    }
}
