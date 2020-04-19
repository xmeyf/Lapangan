import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            id: [],
            username: "",
            email: "",
            password: "",
            repassword: "",
            role: "member",
            action: "insert",
            find: "",
            message: ""
        }
    }

    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    Save = (event) => {
        if (this.state.password === this.state.repassword) {
            event.preventDefault();
            // menampilkan proses loading
            // $("#loading").toast("show");
            // menutup form modal
            $("#modal_user").modal("hide");
            let url = "http://localhost/lapangan/public/register";
            let form = new FormData();
            form.append("action", this.state.action);
            form.append("id", this.state.id);
            form.append("username", this.state.username);
            form.append("email", this.state.email);
            form.append("password", this.state.password);
            form.append("role", this.state.role);

            axios.post(url, form)
            .then(response => {
              this.setState ({message: response.data.message})
              this.get_users()

                })
                .catch(error => {
                    console.log(error);
                });
        
        alert(this.state.message)
        alert("Register Berhasil")
        window.location="/login";
      }
      else{
        alert("Register Gagal")
        window.location="/register";

      }
    }




    render(){
      return(
        <div className="container" style={{ width: "60%" }}><br/><br/><br/>
                <div className="card my-2 shadow">
                <div className="card-header bg-dark">
                    <center><h5 className="text-warning">Register</h5></center>
            </div>
            <div className="card-body">
            <form onSubmit={this.Save}>
            <div className="form-group">

                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" name="username" placeholder="Enter Username"
                    value={this.state.nama_user}
                    onChange={this.bind} required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" name="email" placeholder="Enter Email"
                    value={this.state.email}
                    onChange={this.bind} required
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" placeholder="Enter Password"
                    value={this.state.password}
                    onChange={this.bind} required
                />
            </div>

            <div className="form-group">
                <label htmlFor="repassword">Repeat Password</label>
                <input type="password" className="form-control" name="repassword" placeholder="Repeat Password"
                    onChange={this.bind} required
                />
            </div>
            <center><button className="mt-2 btn btn-warning my-2" type="submit">
              <span className="fa fa-plus text-white"></span> Register
              </button></center>
                  <center><a href="/login">Already have an account?</a></center>
                </form>
            </div>
          </div>
        </div>
      );
    }



}
export default Register;
