import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody,CardTitle ,BreadcrumbItem, Breadcrumb, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';

import { Link} from 'react-router-dom';
import { LocalForm, Control, Errors } from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

    function RenderDish({dish}) {
        if (dish != null)
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
                     </Card>
                </div>    
            );
    }


    function RenderComments({comments, addComment, dishId}){
        
        if (comments != null){
        
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>comments</h4>
                    <ul className="list-unstyled">
                    {
                    comments.map((comment)=>{
                        return(
                        
                            <li key="comment.id">
                                <p>{comment.comment}</p>
                                <p>--By {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                </p>    
                            </li>
                            
                        
                         );
                        })
                    }
                    </ul>
                    <CommentForm dishId={dishId} addComment={addComment}/>
                           
                </div>
            );
        }
        else
            return(
                <div></div>
            );
    }

    
    class CommentForm extends Component{
        constructor(props){
            super(props);
            
            this.toggleModal = this.toggleModal.bind(this);
            this.handleLogin = this.handleSubmit.bind(this)

            this.state={
                isNavOpen : false,
                isModalOpen: false
            }
        }
        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
        }
        handleSubmit(values){
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
            
        }
    
        render(){
            return(
                <div>
                <Button outline onClick={this.toggleModal}><span><i class="fa fa-pencil" aria-hidden="true"></i>Comment</span></Button>
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
                        <Control.text model=".author" id="author" name="author"
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
                  
                </div>
    
            )
        }
        
    }
    const DishDetail = (props)=>{
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish != null){
            return(
                <div>
        <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        
                        <RenderDish dish={props.dish}/>
                        
                      
                        <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
                        
                       
                    </div>  
    
                </div>
            );
        }
    }

export default DishDetail;

