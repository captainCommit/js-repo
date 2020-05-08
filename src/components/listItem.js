import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import {FaTrash} from 'react-icons/fa';
import Button from 'react-bootstrap/Button'
const style = {
    element:{
        minWidth : "95%",
        marginTop:20,
        marginBottom:20,
        borderRadius : 5,
        border:"1px solid black",
        padding:5
    },
    colText:{
        display:"flex",
        paddingTop:10
    },
    colButton:{
        display:"flex",
    }
}
export default function ListItem(props){
    const change = ()=>{
        props.onclick(props.index)
    }
    return(
        <div className="listitem">
            <Container fluid className="element" style={style.element}>
                <Row>
                    <Col md={2} className="d-flex justify-content-center" style={style.colText} padding={0}>ID : {props.id}</Col>
                    <Col md={2} className="d-flex justify-content-center" style={style.colText} padding={0}>Name : {props.name}</Col>
                    <Col md={2} className="d-flex justify-content-center" style={style.colText} padding={0}>Date : {props.date}</Col>
                    <Col md={2} className="d-flex justify-content-center" style={style.colText} padding={0}>Time : {props.time}</Col>
                    <Col md={3} className="d-flex justify-content-center" style={style.colText} padding={0}>Doctor : {props.doc}</Col>
                    <Col md={1} className="d-flex justify-content-center" style={style.colButton} padding={0}><Button variant="outline-danger" onClick={change}><FaTrash/></Button>{' '}</Col>
                </Row>
            </Container>
        </div>
    )
}