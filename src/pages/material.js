import React,{Component} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Fab from '@material-ui/core/Fab';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import ModalUpdate from '../components/material-update';
import ModalAdd from '../components/material-add';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const headCells = [
  { id: 'id', numeric: true, disablePadding: true, label: 'Appointment ID' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Patient Name' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'time', numeric: false, disablePadding: false, label: 'Time' },
  { id: 'doctor', numeric: false, disablePadding: false, label: 'Doctor Alloted' },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="left" padding={headCell.disablePadding ? 'none' : 'default'}>
              {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const numSelected  = props.numSelected;
  return (
    <Toolbar className={clsx(classes.root)}>
      {numSelected > 0 ? (
        <Grid container spacing={0}>
            <Grid item xs ={11}>
                <Typography className={classes.title} variant="h3" id="tableTitle" component="div" >
                    Appointments
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <IconButton title="Delete Record" aria-label="Delete" onClick={props.delete}>
                    <DeleteIcon/>
                </IconButton>
                <IconButton title="Update Record" aria-label="Update" onClick={props.update}>
                    <EditIcon/>
                </IconButton>
            </Grid>
        </Grid>
      ) : (<Grid container spacing={1} direction="row" alignItems="flex-end">
            <Grid item xs={11}>
                <Typography className={classes.title} variant="h3" id="tableTitle" component="div">
                    Appointments
                </Typography>
            </Grid>
            </Grid>
            )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


export default class EnhancedTable extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
          app : Appointments,
          selected:"",
          open:false,
          openAdd:false,
          selectedObject : null,
          alert : false,
          alertType : null,
          alertMessage : null,
        }   
        this.snackClose = this.snackClose.bind(this)  
        this.handleDelete = this.handleDelete.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)  
        this.setSelected = this.setSelected.bind(this)
        this.isSelected = this.isSelected.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleOpenAdd = this.handleOpenAdd.bind(this)
        this.handleCloseAdd = this.handleCloseAdd.bind(this)
    }
    snackClose= ()=>{
      this.setState({alert : false})
    }
    handleOpenAdd = ()=>{
      this.setState({openAdd : true})
    }
    handleCloseAdd = ()=>{
      this.setState({openAdd : false})
    }
    handleOpen = ()=>{
        this.setState({open : true})
    }
    handleClose = ()=>{
        this.setState({open : false})
    }
    setSelected = (s)=>{
        this.setState({selected : s})
    }
    handleClick = (evt,name)=>{
        if(name === this.state.selected)
            this.setState({selected : "",selectedObject:null})
        else{
            const temp = [...this.state.app]
            const obj = temp[temp.findIndex(e=>e.name === name)]
            this.setState({selected:name,selectedObject : obj})
        }
    }
    handleAdd = (newData)=>{
      const temp = [...this.state.app]
      temp.push(newData)
      this.setState({app : temp,openAdd:false})
      //alert('Insertion Successful')
      this.setState({alert:true,alertType:"success",alertMessage:"Appointment added successfully"})
    }
    handleDelete = (event)=>{
        const temp = [...this.state.app]
        const i = temp.findIndex(e=>e.name === this.state.selected)
        if(i === -1)
        {
          this.setState({alert:true,alertType:"danger",alertMessage:"Appointment Not Found"})
          return
        }
        temp.splice(i,1)
        this.setState({app : temp,selected:"",open:false})
        //alert('Delete Successful')
        this.setState({alert:true,alertType:"success",alertMessage:"Appointment removed successfully"})
    }
    handleUpdate = (newData)=>{
        const temp = [...this.state.app]
        const i = temp.findIndex(e=>e.name === this.state.selected)
        if(i === -1)
        {
          //alert("Record Not Found")
          this.setState({alert:true,alertType:"danger",alertMessage:"Appointment Not Found"})
          this.setState({open:false})
        }
        console.log(newData,i)
        temp[i] = newData
        this.setState({app : temp,open:false})
        //alert('Update Successful')
        this.setState({alert:true,alertType:"success",alertMessage:"Appointment updated successfully",selected:""})
    }
    isSelected = (name)=>{
        return name === this.state.selected
    }
    render()
    {
        return(
            <div className="App">
            <Paper>
                <EnhancedTableToolbar numSelected={this.state.selected === "" ? 0:1} delete={this.handleDelete} update={this.handleOpen}/>
                <TableContainer>
                    <Table style={{minWidth : 750}} aria-labelledby="tableTitle" size={'medium'} aria-label="enhanced table">
                        <EnhancedTableHead/>
                        <TableBody>
                            {this.state.app.map((row, index) => {const isItemSelected = this.isSelected(row.name);const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow hover onClick={(event) => this.handleClick(event, row.name)} role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.name} selected={isItemSelected} >
                                        <TableCell padding="checkbox"><Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} /></TableCell>
                                        <TableCell component="th" id={labelId} scope="row" padding="none">{row.id}</TableCell>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="left">{row.date}</TableCell>
                                        <TableCell align="left">{row.time}</TableCell>
                                        <TableCell align="left">{row.doctor}</TableCell>
                                    </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Fab color="secondary" aria-label="add" title="Add Record" style={{position : "fixed",bottom : 20,right:5}} onClick={this.handleOpenAdd}>
                  <AddIcon />
                </Fab>
            </Paper>
            <Modal style={{display: 'flex',alignItems: 'center',justifyContent: 'center',}}aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={this.state.openAdd} onClose={this.handleCloseAdd} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, }}>
                <Fade in={this.state.openAdd}>
                    <ModalAdd submit={this.handleAdd}/>
                </Fade>
            </Modal>
            <Modal style={{display: 'flex',alignItems: 'center',justifyContent: 'center',}}aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={this.state.open} onClose={this.handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, }}>
                <Fade in={this.state.open}>
                    <ModalUpdate name={this.state.selected} id={this.state.selectedObject ? this.state.selectedObject.id : null} doctor={this.state.selectedObject ? this.state.selectedObject.doctor : null} time={this.state.selectedObject ? this.state.selectedObject.time : null} date={this.state.selectedObject ? this.state.selectedObject.date : null} submit={this.handleUpdate}/>
                </Fade>
            </Modal>
            <Snackbar open={this.state.alert} autoHideDuration={1000} onClose={this.snackClose}>
            <Alert severity={this.state.alertType} onClose={this.snackClose}>
                {this.state.alertMessage}
            </Alert>
          </Snackbar>
        </div>
        )
    }
}


const Appointments = [
	{
		"id": "3962397456",
		"name": "Kirsten Swanson",
		"date": "03-21-2021",
		"time" : "4:53 pm",
		"doctor": "Britanni Christensen"
	},
	{
		"id": "3530044350",
		"name": "Stephen Mccray",
		"date": "10-27-2020",
		"time" : "11:25 am",
		"doctor": "Emmanuel Foreman"
	},
	{
		"id": "0399573804",
		"name": "Sacha Underwood",
		"date": "05-15-2020",
		"time" : "11:25 am",
		"doctor": "Silas Griffin"
	},
	{
		"id": "1048009943",
		"name": "Bryar Kelley",
		"date": "01-15-2021",
		"time" : "4:53 pm",
		"doctor": "Scott Sweet"
	},
	{
		"id": "4906640289",
		"name": "Skyler Sims",
		"date": "02-27-2021",
		"time" : "11:25 am",
		"doctor": "Oprah Santos"
	},
	{
		"id": "7547387658",
		"name": "Norman Vincent",
		"date": "12-27-2020",
		"time" : "11:25 am",
		"doctor": "Andrew Castillo"
	},
	{
		"id": "7754883021",
		"name": "Aristotle Byers",
		"date": "04-18-2021",
		"time" : "4:53 pm",
		"doctor": "Kameko Keith"
	},
	{
		"id": "9731164554",
		"name": "Jana Salinas",
		"date": "01-28-2021",
		"time" : "4:53 pm",
		"doctor": "Murphy Greene"
	},
	{
		"id": "6266975152",
		"name": "Emily Moss",
		"date": "07-14-2020",
		"time" : "11:25 am",
		"doctor": "Charissa Sykes"
	},
	{
		"id": "4127300361",
		"name": "Austin Savage",
		"date": "09-06-2020",
		"time" : "11:25 am",
		"doctor": "Colorado Gamble"
  }
]