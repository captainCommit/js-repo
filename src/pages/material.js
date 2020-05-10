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
import ModalUpdate from '../components/material-form';
import ModalAdd from '../components/material-add';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'id', numeric: true, disablePadding: true, label: 'Appointment ID' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Patient Name' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'time', numeric: false, disablePadding: false, label: 'Time' },
  { id: 'doctor', numeric: false, disablePadding: false, label: 'Doctor Alloted' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span style={{border: 0,clip: 'rect(0 0 0 0)',height: 1,margin: -1,overflow: 'hidden',padding: 0,position: 'absolute',top: 20,width: 1,}}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

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
                <IconButton aria-label="delete" onClick={props.delete}>
                    <DeleteIcon/>
                </IconButton>
                <IconButton aria-label="delete" onClick={props.update}>
                    <EditIcon/>
                </IconButton>
            </Grid>
        </Grid>
      ) : (<Grid container spacing={1} direction="row" alignItems="flex-end">
            <Grid item xs>
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
          order:'asc',
          orderBy:'name',
          selected:"",
          page:0,
          rowsPerPage:5,
          emptyRows:0,
          open:false,
          openAdd:false,
          selectedObject : null,
          alert : false,
          alertType : null,
          alertMessage : null,
        }  
        this.setOrder = this.setOrder.bind(this)  
        this.snackClose = this.snackClose.bind(this)  
        this.handleDelete = this.handleDelete.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)  
        this.setOrderBy = this.setOrderBy.bind(this)
        this.setSelected = this.setSelected.bind(this)
        this.setPage = this.setPage.bind(this)
        this.setRowsPerPage = this.setRowsPerPage.bind(this)
        this.setEmptyRows = this.setEmptyRows.bind(this)
        this.handleRequestSort = this.handleRequestSort.bind(this)
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
    setOrder = (o)=>{
        this.setState({order:o})
    }
    setOrderBy = (o)=>{
        this.setState({orderBy:o})
    }
    setSelected = (s)=>{
        this.setState({selected : s})
    }
    setPage = (p)=>{
        this.setState({page : p})
    }
    setRowsPerPage = (r)=>{
        this.setState({rowsPerPage : r})
    }
    setEmptyRows = (e)=>{
        this.setState({emptyRows : this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.app.length - (this.state.page * this.state.rowsPerPage))})
    }
    handleRequestSort = (event, property) => {
        const isAsc = this.state.orderBy === property && this.state.order === 'asc';
        this.setOrder(isAsc ? 'desc' : 'asc');
        this.setOrderBy(property);
    };
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
        if(i== -1)
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
        if(i == -1)
        {
          //alert("Record Not Found")
          this.setState({alert:true,alertType:"danger",alertMessage:"Appointment Not Found"})
          this.setState({open:false})
        }
        console.log(newData,i)
        temp[i] = newData
        this.setState({app : temp,open:false})
        //alert('Update Successful')
        this.setState({alert:true,alertType:"success",alertMessage:"Appointment updated successfully"})
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
                        <EnhancedTableHead numSelected={this.state.selected === ""?0:1} order={this.state.order} orderBy={this.state.orderBy} onRequestSort={this.handleRequestSort} rowCount={this.state.app.length} />
                        <TableBody>
                            {stableSort(this.state.app, getComparator(this.state.order, this.state.orderBy)).map((row, index) => {const isItemSelected = this.isSelected(row.name);const labelId = `enhanced-table-checkbox-${index}`;
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
                <Fab color="secondary" aria-label="add" style={{position : "fixed",bottom : 20,right:5}} onClick={this.handleOpenAdd}>
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
        "id": "6303001607",
        "name": "Erin White",
        "date": "03-07-2019",
        "time": "11:30 AM",
        "doctor": "Deborah Clements"
    },
    {
        "id": "3069447210",
        "name": "Naomi Rivas",
        "date": "11-21-2020",
        "time": "07:30 PM",
        "doctor": "Tamara Rivera"
    },
    {
        "id": "2296400716",
        "name": "Reed Mcgowan",
        "date": "10-19-2019",
        "time": "07:30 PM",
        "doctor": "Eugenia Eaton"
    },
    {
        "id": "1935204474",
        "name": "Jescie Potts",
        "date": "03-23-2021",
        "time": "07:30 PM",
        "doctor": "Hadley Morrow"
    },
    {
        "id": "6620700434",
        "name": "Cullen Wilkerson",
        "date": "07-23-2020",
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
        "date": "10-23-2020",
        "time": "11:30 AM",
        "doctor": "Rowan Riggs"
    },
    {
        "id": "4874968261",
        "name": "Illana Dejesus",
        "date": "05-13-2021",
        "time": "07:30 PM",
        "doctor": "Imelda Mooney"
    },
    {
        "id": "9244263715",
        "name": "Beau Knox",
        "date": "09-15-2019",
        "time": "07:30 PM",
        "doctor": "Lacy Morales"
    },
    {
        "id": "2253177407",
        "name": "Devin Ayala",
        "date": "08-20-2019",
        "time": "07:30 PM",
        "doctor": "Abel Strong"
    },
    {
      "id": "7962799797",
      "name": "Aristotle Snyder",
      "date": "29-07-2019",
      "time": "11:30 AM",
      "doctor": "Wade Sandoval"
    },
    {
      "id": "6848505587",
      "name": "Ray Diaz",
      "date": "12-12-2020",
      "time": "07:30 PM",
      "doctor": "Davis Hartman"
    },
    {
      "id": "7253188593",
      "name": "Adara Hinton",
      "date": "12-05-2019",
      "time": "11:30 AM",
      "doctor": "Caleb Kirkland"
    },
    {
      "id": "8676547602",
      "name": "Rafael Vargas",
      "date": "10-12-2020",
      "time": "07:30 PM",
      "doctor": "Hall Russell"
    },
    {
      "id": "4554097288",
      "name": "Addison Shelton",
      "date": "07-02-2021",
      "time": "11:30 AM",
      "doctor": "Paki Mcdowell"
    },
    {
      "id": "5612272406",
      "name": "Allen Pacheco",
      "date": "01-04-2021",
      "time": "07:30 PM",
      "doctor": "Gavin Burns"
    }
]
