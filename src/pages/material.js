import React,{Component} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import EditIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';

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
                <span className={classes.visuallyHidden}>
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
  classes: PropTypes.object.isRequired,
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
            <Grid item xs ={10}>
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Appointments
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <IconButton aria-label="delete" onClick={props.delete}>
                    <DeleteIcon/>
                </IconButton>
            </Grid>
            <Grid item xs={1}>
                <IconButton aria-label="delete" onClick={props.update}>
                    <EditIcon/>
                </IconButton>
            </Grid>
        </Grid>
      ) : (<Grid container spacing={1} direction="row" alignItems="flex-end">
            <Grid item xs>
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default class EnhancedTable extends Component{

    constructor(props)
    {
        super(props)
        this.state = {
            app : Appointments,
            order : 'asc',
            classes : useStyles(),
            orderBy : 'name',
            selected:'',page:0,
            rowsPerPage : 5
        }
        this.setOrder = this.setOrder.bind(this)
        this.setOrderBy = this.setOrderBy.bind(this)
    }
  const classes = useStyles();
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  setOrder = (ord)=>{
    this.setState({order : ord})
  }
  setOrderBy = (ob)=>{
      this.setState({orderBy : ob})
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
const handleClick = (event, name) => {
    if(selected === name)
        setSelected("")
    else
        setSelected(name)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, Appointments.length - page * rowsPerPage);
  const handleDelete = (event)=>{
      event.preventDefault()
      const i = Appointments.findIndex(e => e.name === selected)
      Appointments.splice(i,1)
      console.log(Appointments)
  }
  const handleUpdate = (event)=>{
      event.preventDefault()
      const i = Appointments.findIndex(e => e.name === selected)

      //console.log("Update : "+selected)
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected === "" ? 0:1} delete={handleDelete} update={handleUpdate}/>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={Appointments.length}
            />
            <TableBody>
              {stableSort(Appointments, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.Appointmentid}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.time}</TableCell>
                      <TableCell align="left">{row.doctor}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5,10,25]}
          component="div"
          count={Appointments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}


const Appointments = [
    {
        "Appointmentid": "6303001607",
        "name": "Erin White",
        "date": "03-07-2019",
        "time": "11:30 AM",
        "doctor": "Deborah Clements"
    },
    {
        "Appointmentid": "3069447210",
        "name": "Naomi Rivas",
        "date": "16-11-2020",
        "time": "07:30 PM",
        "doctor": "Tamara Rivera"
    },
    {
        "Appointmentid": "2296400716",
        "name": "Reed Mcgowan",
        "date": "17-11-2019",
        "time": "07:30 PM",
        "doctor": "Eugenia Eaton"
    },
    {
        "Appointmentid": "1935204474",
        "name": "Jescie Potts",
        "date": "23-03-2021",
        "time": "07:30 PM",
        "doctor": "Hadley Morrow"
    },
    {
        "Appointmentid": "6620700434",
        "name": "Cullen Wilkerson",
        "date": "27-03-2020",
        "time": "07:30 PM",
        "doctor": "Jaquelyn Santos"
    },
    {
        "Appointmentid": "1693202676",
        "name": "Hoyt Beck",
        "date": "20-09-2020",
        "time": "11:30 AM",
        "doctor": "Rosalyn Francis"
    },
    {
        "Appointmentid": "7992690895",
        "name": "Kristen William",
        "date": "30-03-2020",
        "time": "11:30 AM",
        "doctor": "Rowan Riggs"
    },
    {
        "Appointmentid": "4874968261",
        "name": "Illana Dejesus",
        "date": "05-03-2021",
        "time": "07:30 PM",
        "doctor": "Imelda Mooney"
    },
    {
        "Appointmentid": "9244263715",
        "name": "Beau Knox",
        "date": "09-05-2019",
        "time": "07:30 PM",
        "doctor": "Lacy Morales"
    },
    {
        "Appointmentid": "2253177407",
        "name": "Devin Ayala",
        "date": "28-12-2019",
        "time": "07:30 PM",
        "doctor": "Abel Strong"
    }
]
