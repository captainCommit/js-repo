import React from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {FaPaperPlane} from 'react-icons/fa';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
function makeid(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
function tConvert (time) {
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) { 
      time = time.slice (1);  
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
      time[0] = +time[0] % 12 || 12; 
    }
    return time.join (''); 
}
function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
}
function getToday(){
    var d = new Date()
    function pad(s) { return (s < 10) ? '0' + s : s; }
    return[d.getFullYear(),pad(d.getMonth()+1),pad(d.getDate())].join('-')
}
function currTime()
{
    var d = new Date()
    var currTime = d.getHours() + ":" + d.getMinutes()
    return currTime
}
export default function AppointmentForm(props){
    var state = {
        name : React.createRef(),
        doc : React.createRef(),
        date : React.createRef(),
        time : React.createRef()
    }
    const [validated, setValidated] = React.useState(false);

    const handleSubmit = (event) => {
        console.log(currTime())
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            event.preventDefault();
            const name = state.name.current.value
            const doc = state.doc.current.value
            const date = convertDate(state.date.current.value)
            const time = tConvert(state.time.current.value)
            const obj = {id:makeid(10),name : name,doctor : doc,date : date,time : time}
            console.log(obj)
            props.onAdd(obj)
        }
        setValidated(true);
    };
    const submit =()=>{
        console.log(state.name.value)
        console.log(state.doc.value)
        console.log(state.date.value)
        console.log(state.time.value)
    }
    return(
    <div className="App">
        <Container fluid style={{background:"#fbfbf8",padding:10,borderRadius:5,maxWidth:"100%"}}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>Your name</Form.Label>
                        <Form.Control required type="text" placeholder="Name" ref={state.name}/>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label>Doctors name</Form.Label>
                        <Form.Control required type="text" placeholder="Doctors Name" ref={state.doc}/>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Date of Appointment</Form.Label>
                        <Form.Control type="date" placeholder="Date of Appointment" required ref={state.date} min={getToday()}/>
                        <Form.Control.Feedback type="invalid">Please provide a valid date</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom04">
                        <Form.Label>Time Of Appointment</Form.Label>
                        <Form.Control type="time" placeholder="Time" required ref={state.time} min={currTime()}/>
                        <Form.Control.Feedback type="invalid">Please provide a valid time.</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Button variant="outline-primary" type="submit">Submit form <FaPaperPlane/> </Button>
            </Form>
        </Container>
    </div>)
}