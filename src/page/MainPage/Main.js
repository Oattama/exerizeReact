import React from "react";
import {Carousel, Card} from "react-bootstrap";
import Data from "./Data/News";
import DataItem from "./Information";
import "./Main.css"

function Content(){
    const dataElements = Data.map((Data, index) => {
     return <DataItem key={index} Data = {Data}/>
    })
 
     return(
         <div className="content">
             {/*----------Banner Carousel------------*/}
             
                 <div className="carousel">
                             <Carousel fade>
                                 <Carousel.Item>
                                     <img
                                         className="banner"
                                         src="/images/main1.png"
                                         alt="First slide"
                                     />
                                 </Carousel.Item>
                                 <Carousel.Item>
                                     <img
                                         className="banner"
                                         src="/images/main2.png"
                                         alt="Second slide"
                                     />
                                 </Carousel.Item>
                                 <Carousel.Item>
                                     <img
                                         className="banner"
                                         src="/images/main3.png"
                                         alt="Thrid slide"
                                     />
                                 </Carousel.Item>
                             </Carousel>
                         </div>
                 {/*----------Banner Carousel------------*/}
 
                 {/*----------News------------*/} 
                 <div className="container">
                         <div className="infomation">
                             <Card>
                                 <Card.Header className="C-Header">ข่าวประชาสัมพันธ์</Card.Header>
                                 <Card.Body className="C-Body">
                                     {dataElements} 
                                 </Card.Body>
                             </Card>   
                         </div>
                 {/*----------News------------*/}  
 
                 {/*----------Developer------------*/} 
                     <div className="developer">
                         <h1>ผู้จัดทำ</h1><br></br>
                         <div className="member-card">
                             <Card className="member">
                                 <Card.Img src="/images/1.jpg"/>
                                 <Card.Body>
                                     <Card.Title className="text">บาส</Card.Title>
                                 </Card.Body>
                             </Card>
                             <Card className="member">
                                 <Card.Img src="/images/2.jpg"/>
                                 <Card.Body>
                                     <Card.Title className="text">ฮาท</Card.Title>
                                 </Card.Body>
                             </Card>
                             <Card className="member">
                                 <Card.Img src="/images/3.jpg"/>
                                 <Card.Body>
                                     <Card.Title className="text">โอต</Card.Title>
                                 </Card.Body>
                             </Card>
                         </div>
                     </div> 
                 {/*----------Developer------------*/}       
                     </div>
                 </div>
     )
}
     
export default Content;