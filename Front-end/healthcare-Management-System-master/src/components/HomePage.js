import React from 'react'
import { Component } from 'react';
import {Carousel } from 'react-bootstrap';
import home1 from './home1.png';
import home2 from './home2.png';
import home3 from './home3.png';

export default class HomePage extends Component {
    render() {

        return (
            
            <div className="Container">
                <Carousel>

                    <Carousel.Item>
                        <img style={{ padding: '20px' }}

                            className="d-block w-100"
                            src={home1}
                            alt="First slide"
                        />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={home2}
                            alt="Second slide"
                        />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={home3}
                            alt="Third slide"
                        />
                    </Carousel.Item>

                </Carousel>
            </div>
        )
    }
}