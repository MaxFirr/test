import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner, Button, Carousel } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { getProduct, getSizes } from '../services/api';

export default function ProductItemView() {

    const [product, setProduct] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [isLoad, setLoad] = useState(false);
    const [currentColor, setColor] = useState(0);
    const [currentImage, setImage] = useState(0);

    const params = useParams();
    const productId = params.id;

    useEffect(async () => {
        try {
            const productItem = await getProduct(productId);
            const sizesList = await getSizes();
            setProduct(productItem);
            setSizes(sizesList);
        } catch (error) {
            setProduct(null);
        } finally {
            setLoad(true);
        }
    }, []);

    const onImage = (newImage) => {
        setImage(newImage);
    }

    const onColor = (newColor) => {
        setColor(newColor);
        setImage(0);
    }

    return (
        <Container className="py-5">
            {
                isLoad ?
                    product ?
                        <Row className="mb-4">
                            <Col md={5}>
                                <Row>
                                    <Col md={2}>
                                        {
                                            product.colors.map((color, index) =>
                                                <img
                                                    key={color.id}
                                                    onClick={() => onColor(index)}
                                                    className="border rounded mb-3 img-fluid"
                                                    src={color.images[0]}
                                                />
                                            )
                                        }
                                    </Col>
                                    <Col md={10}>
                                        <Carousel interval={null} activeIndex={currentImage} onSelect={onImage}>
                                            {
                                                product.colors[currentColor].images.map(image =>
                                                    <Carousel.Item key={image}>
                                                        <img
                                                            className="border rounded d-block w-100"
                                                            src={image}
                                                        />
                                                    </Carousel.Item>
                                                )
                                            }
                                        </Carousel>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={7} className="py-3">
                                <h2 className="mb-3">{product.name}</h2>
                                <p className="mb-4">{product.colors[currentColor].description}</p>
                                <h3 className="mb-4">{product.colors[currentColor].price}₽</h3>
                                <Row>
                                    <Col className="d-flex">
                                        {
                                            sizes.map(size =>
                                                <Button
                                                    key={size.id}
                                                    variant="light"
                                                    className={`border px-2 py-1 me-2 ${!product.colors[currentColor].sizes.includes(size.id) && 'disabled'}`}>
                                                    {`${size.label}/${size.number}`}
                                                </Button>
                                            )
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        :
                        <Row>
                            <Col>
                                <h4>Ничего не найдено</h4>
                            </Col>
                        </Row>
                    :
                    <Row>
                        <Col className="text-center">
                            <Spinner animation="border" variant="primary" />
                        </Col>
                    </Row>
            }
        </Container>
    )
}