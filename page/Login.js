import React,{Component} from "react";
// melakukan request http
import axios from "axios";
// memberi informasi dalam bentuk text
import Toast from "../component/Toast";
import $ from "jquery";
import {Link} from 'react-router-dom';

class Login extends Component {
  constructor() { // fungsi yang pertama kali di jalankan
    super();
    this.state = { // inisiasi state ( menyiapkan tempat data yang dibutuhkan )
      username: "",
      password: "",
      role: "",
      message: ""
    }
  }

  bind = (event) => { // menghubungkan state dan elemen
    this.setState({[event.target.name]: event.target.value});
  }

  Login = (event) => {
    event.preventDefault();

    let url = "http://localhost/lapangan/public/login";

    // memanggil file
    let form = new FormData();
    // membungkus data yang akan dikirim melalui API
    form.append("username", this.state.username); // append : memasukkan item ke form data
    form.append("password", this.state.password);
    axios.post(url, form) // mengirim data
    .then(response => { // mendapat response
      let logged = response.data.status; // mengecek status berhasil atau tidak
      if (logged) {
        // jika login berhasil
        this.setState({message: "Login Berhasil"});
        //menyimpan data token pada local storage
        localStorage.setItem("Token", response.data.token);
        //menyimpan data login user ke local storage
        localStorage.setItem("users", JSON.stringify(response.data.users));
        //direct ke halaman data siswa
        window.location = "/home";
      } else {
        // jika login gagal
        this.setState({message: "Login Gagal"});
      }
      $("#message").toast("show"); // menampilkan pesan
    })
    .catch(error => {
      console.log(error); // menampilkan pesan error
    })
  }

  
  render(){ // menampilkan elemen pada halaman web
    return(
    <div className="container" style={{ width: "40%" }}><br/><br/><br/><br/><br/><br/><br/><br/>
      <div className="card my-2 shadow">
        <div className="card-header bg-dark">
            <center><h5 className="text-warning">Login User</h5></center>
          </div>

          <div className="card-body">
            <Toast id="message" autohide="false" title="informasi">
            {this.state.message}
            </Toast>

            <form onSubmit={this.Login}>
              <input type="text" className="form-control m-1" name="username"
                value={this.state.username} onChange={this.bind}
                required placeholder="Masukkan Username" />
              <input type="password" className="form-control m-1" name="password"
                value={this.state.password} onChange={this.bind}
                required placeholder="Masukkan Password" />
              <center><button className="mt-2 btn btn-warning my-2" type="submit">
                <span className="fa fa-plus text-white"></span> Login
                </button></center>
                <center><a href="/register">Dont have an account?</a></center>
              </form>
            </div>
          </div>
        </div>
    );
  }
}
export default Login;
