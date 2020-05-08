import React,{Component} from 'react';
import {Container,Row,Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {FaPlus} from 'react-icons/fa';
import ListItem from '../components/listItem'
import AppointmentForm from '../components/form'
import '../App.css';
const style={
    listcontainer : {
      position:"fixed",
      left:"2vw",
      maxHeight:"80%",
      marginTop:"10px",
      marginBottom:"10px",
      minWidth : "96vw",
      border : "1.5px solid black",
      overflow:"scroll",
      borderRadius:5,
    }
  }
  export default class Bootstrap extends Component {
    constructor(props)
    {
        super(props)
        this.state = {app : Appointments,show:false}
        this.deleteFunc = this.deleteFunc.bind(this)
        this.onAdd = this.onAdd.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
    onAdd = (obj)=>{
        var appointments = [...this.state.app]
        appointments.push(obj)
        alert('Appointment Added Successfully')
        this.setState({app:appointments,show:false})
    }
    handleClose = ()=>{
      this.setState({show:false})
    }
    handleOpen = ()=>{
      this.setState({show:true})
    }
    deleteFunc = (index)=>{
      var items = [...this.state.app]
      if(index !== -1)
      {
          items.splice(index, 1);
          this.setState({app : items})
      }
      console.log("Done")
    }
    render()
    {
      return(
        <div className="App" style={{marginTop : 10,overflow:"hidden"}}>
            <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton style={{background:"#fbfbf8"}}>
              <Modal.Title>Add Appointments</Modal.Title>
            </Modal.Header>
            <AppointmentForm onAdd={this.onAdd}/>
          </Modal>
          <Row className="d-flex justify-content-center"><h1>Appointments</h1></Row>
          <Row className="d-flex flex-row-reverse bd-highlight"><Col md={1}><Button variant="outline-primary" onClick={this.handleOpen} style={{marginBottom:5,marginRight:10}}><FaPlus/></Button>{' '}</Col></Row>
          <Container className="align-self-center listcontainer overflow-auto" style={style.listcontainer}>
          {this.state.app.length >0?this.state.app.map((app,index)=>(
              < ListItem key={index} index={index} id={app.id} name={app.name} date={app.date} time={app.time} doc={app.doctor} onclick={this.deleteFunc} />
          )):<h1>No Data To Display</h1>}
          </Container>
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
      }]
