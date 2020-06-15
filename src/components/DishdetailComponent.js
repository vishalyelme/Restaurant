import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody,CardTitle ,BreadcrumbItem, Breadcrumb, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';

import { Link} from 'react-router-dom';
import { LocalForm, Control, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
    function RenderDish({dish}) {
        if (dish != null)
            return(
                <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            );
        else
            return(
                <div></div>
            );
    }


    function RenderComments({dish}){
        
        if (dish != null){
        const comments = dish.map((comment)=>{
            return(
                <ul>
                    <li>{comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                    <p>{comment.comment}</p>
                </ul>
                
            );
        });
            return(
                <div>
                    <h4>comments</h4>
                    <p>{comments}</p>          
                </div>
            );
        }
        else
            return(
                <div></div>
            );
    }

    
    class DishDetail extends Component{
        constructor(props){
            super(props);
            this.state={
                isModalOpen: false
            }
            this.toggleModal = this.toggleModal.bind(this);
            this.handleLogin = this.handleSubmit.bind(this)
        }
        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
        }
        handleSubmit(values){
            this.toggleModal();
            console.log("Current State is: " + JSON.stringify(values));
            alert("Current State is: " + JSON.stringify(values));
        }
    
        render(){
            return(
                <div className='container'>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                    <Col>
                    <Label htmlFor="rating">Rating</Label>
                        
                    <Control.select model=".rating" name="rating" id="rating"
                                        className="form-control">
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col>
                    <Label htmlFor="firstname">Your Name:</Label>
                        <Control.text model=".yourname" id="yourname" name="yourname"
                        placeholder="Your Name"
                        className="form-control"
                        validators={{
                            required, minLength: minLength(3), maxLength: maxLength(15)
                        }}
                    />
                    <Errors
                        className="text-danger"
                            model=".yourname"
                            show="touched"                         messages={{
                            required: 'Required',
                            minLength: 'Must be greater than 2 numbers',
                            maxLength: 'Must be 15 numbers or less',
                            }}
                    />
                    </Col>
                </Row>  
                <Row className="form-group">
                    <Col>
                    <Label htmlFor="comment">Comment</Label>
                    <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control"
                    validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                    />
                     <Errors
                        className="text-danger"
                            model=".comment"
                            show="touched"                         messages={{
                            required: 'Required',
                            minLength: 'Must be greater than 2 numbers',
                            maxLength: 'Must be 15 numbers or less',
                            }}
                    />
                    
                    </Col>
                </Row>
                <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                </LocalForm>
                </ModalBody>
            </Modal>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{this.props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={this.props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                    <RenderComments dish={this.props.comments}/>
                    <Button outline  onClick={this.toggleModal}>
                        <span className="fa fa-pencil">Submit Comment</span>
                    </Button>
                    </div>
                </div>    
                </div>
    
            )
        }
        
    }

export default DishDetail;
