import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { getProducts } from './../services/api';
import ProductCard from './../components/ProductCard';

export default function ProductView() {

    const [products, setProducts] = useState([]);
    const [isLoad, setLoad] = useState(false);

    useEffect(async () => {
        const productList = await getProducts();
        setProducts(productList);
        setLoad(true);
    }, []);

    return (
        <Container className="py-5">
            <Row className="mb-4">
                <Col>
                    <h2>Каталог</h2>
                </Col>
            </Row>
            <Row>
                {isLoad ?
                    products.length ?
                        products.map(product =>
                            <Col md={3} key={product.id}>
                                <ProductCard
                                    image={product.colors[0].images[0]}
                                    id={product.id}
                                    price={product.colors[0].price}
                                    name={product.name}
                                />
                            </Col>
                        )
                        :
                        <h4>Ничего не найдено</h4>
                    :
                    <Col className="text-center">
                        <Spinner animation="border" variant="primary" />
                    </Col>
                }
            </Row>
        </Container>
    )
}