import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ProductCard(props) {
    return (
        <Card>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>{props.price}₽</Card.Text>
                <Link to={`product/${props.id}`}>
                    <Button variant="primary">Подробнее</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default ProductCard