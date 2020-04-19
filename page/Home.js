import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import Slide1 from "../image/lipstik.jpg";
import Slide2 from "../image/sepatu.jpg";

class Home extends Component {
  render(){
      return(
        <div className="container">
                <div className="col-sm-auto">
                <div id="slideshow" className="carousel slide my-4" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#slideshow" data-slide-to="0" className="active"></li>
                        <li data-target="#slideshow" data-slide-to="1"></li>
                    </ol>
                    <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active">
                            <img className="d-block img-fluid" src={Slide1} alt="First slide"
                             width="1240px" height="350px"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block img-fluid" src={Slide2} alt="Second slide"
                             width="1240px" height="350px"/>
                        </div>
                    </div>
                                </div>
                        </div>

                <div className="card-body bg-dark text-warning shadow-lg p-3 mb-3">
                    <h5>𝐀𝐩𝐚 𝐢𝐭𝐮 𝐆𝐫𝐞𝐧𝐭?</h5>
                    <p className="card-text"></p>
                    <span className="card-text">
                        <h7>Grent adalah layanan penyewaan lapangan olahraga yang memiliki banyak keuntungan dan kemudahan </h7>
                    </span>
            </div>
            <div className ="card-columns">
            <div class="card bg-dark text-warning text-left p-2">
              <blockquote class="blockquote mb-0">
                <p> 𝐀𝐝𝐚 𝐥𝐚𝐩𝐚𝐧𝐠𝐚𝐧 𝐚𝐩𝐚 𝐬𝐚𝐣𝐚?<br/>
                Lapangan Basket<br/>
                  Lapangan Futsal<br/>
                  Lapangan Voli
                </p>
              </blockquote>
                </div>

                <div class="card bg-dark text-warning text-left p-3">
                  <blockquote class="blockquote mb-0">
                    <p> 𝐁𝐚𝐠𝐚𝐢𝐦𝐚𝐧𝐚 𝐜𝐚𝐫𝐚 𝐦𝐞𝐧𝐲𝐞𝐰𝐚𝐧𝐲𝐚?<br/>
                    Hubungi kontak di samping untuk format reservasinya<br/>

                    </p>
                  </blockquote>
                    </div>

                    <div class="card bg-dark text-warning text-left p-3">
                      <blockquote class="blockquote mb-0">
                        <p> 𝐀𝐩𝐚 𝐬𝐚𝐣𝐚 𝐤𝐨𝐧𝐭𝐚𝐤 𝐲𝐚𝐧𝐠 𝐛𝐢𝐬𝐚 𝐝𝐢𝐡𝐮𝐛𝐮𝐧𝐠𝐢? <br/>
                        Alamat : Jln. <br/>
                        No Telepom : 085325881136 <br/>
                        Email : grent@gmail.com <br/>
                        Instagram : grent.id
                        </p>
                      </blockquote>
                        </div>
            </div>

                </div>

      );
  }
}
export default Home;
