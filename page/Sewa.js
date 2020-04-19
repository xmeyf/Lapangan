import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Sewa extends Component {
    constructor() {
        super();
        this.state = {
            sewa: [],
            id: [],
            id_lapangan: "",
            id_user: "",
            username: "",
            tgl_book: "",
            wkt_mulai: "",
            wkt_selesai: "",
            durasi: "",
            biaya: "",
            status: "",
            action: "",
            find: "",
            message: ""
        }

        //jika tidak terdapat data token pada local storage
        //if(!localStorage.getItem("Token")){
        //direct ke hlaman login
        //   window.location = "/login";
        // }
    }

    bind = (event) => {
        // fungsi utk membuka form tambah data
        this.setState({ [event.target.name]: event.target.value });
    }

    Add = () => {
        // fungsi utk membuka form edit data
        // membuka modal
        $("#modal_sewa").modal("show");
        // mengosongkan data pada form
        this.setState({
            action: "insert",
            id: "",
            username: "",
            tgl_book: "",
            wkt_mulai: "",
            wkt_selesai: "",
            durasi: "",
            biaya: "",
        });
    }
    Edit = (item) => {
        // membuka modal
        $("#modal_sewa").modal("show");
        // mengisikan data pd form
        this.setState({
            action: "update",
            id: item.id,
            username: item.username,
            tgl_book: item.tgl_book,
            wkt_mulai: item.wkt_mulai,
            wkt_selesai: item.wkt_selesai,
            durasi: item.durasi,
            biaya: item.biaya,
        });
    }
    get_sewa = () => {
        $("#loading").toast("show");
        let url = "http://localhost/lapangan/public/sewa";
        axios.get(url)
            .then(response => {
                console.log(response.data.sewa);
                this.setState({ sewa: response.data.sewa });
                $("#loading").toast("hide");
            })
            .catch(error => {
                console.log(error);
            });
    }
    Drop = (id) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/sewa/drop/" + id;
            axios.delete(url)
                .then(response => {
                    $("#loading").toast("hide");
                    this.setState({ message: response.data.message });
                    $("#message").toast("show");
                    this.get_sewa();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    Accept = (id) => {
        if (window.confirm("Apakah anda yakin ingin menerima pesanan?")) {
            $("#modal_accept").toast("hide");
            let url = "http://localhost/lapangan/public/accept/" + id;
            let form = new FormData();
            axios.post(url)
                .then(response => {
                    this.get_sewa();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    Decline = (id) => {
        if (window.confirm("Apakah anda yakin ingin menolak pesanan?")) {
            $("#modal_decline").toast("hide");
            let url = "http://localhost/lapangan/public/decline/" + id;
            let form = new FormData();
            axios.post(url)
                .then(response => {
                    this.get_sewa();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    componentDidMount = () => {
        this.get_sewa();
    }

    Save = (event) => {
        event.preventDefault();
        // menampilkan proses loading
        $("#loading").toast("show");
        // menutup form modal
        $("#modal_sewa").modal("hide");
        let url = "http://localhost/lapangan/public/sewa/save";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id", this.state.id);
        form.append("username", this.state.username);
        form.append("nama", this.state.nama);
        form.append("tgl_book", this.state.tgl_book);
        form.append("wkt_mulai", this.state.wkt_mulai);
        form.append("wkt_selesai", this.state.wkt_selesai);
        form.append("durasi", this.state.durasi);
        form.append("biaya", this.state.biaya);

        axios.post(url, form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({ message: response.data.message });
                $("#message").toast("show");
                this.get_sewa();
            })
            .catch(error => {
                console.log(error);
            });
    }

    search = (event) => {
        if (event.keyCode === 13) {
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/sewa";
            let form = new FormData();
            form.append("find", this.state.find);
            axios.post(url, form)
                .then(response => {
                    $("#loading").toast("hide");
                    this.setState({ sewa: response.data.sewa });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }



    render() {
      return (
        <div className="container">
            <div className="card mt-2">
                {/* header card */}
                <div className="card-header bg-dark">
                    <div className="row">
                        <div className="col-sm-7">
                              <h4 className="text-warning">Data Order</h4>
                          </div>
                          <div className="col-sm-4">
                              <input type="text" className="form-control" name="find"
                                  onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                                  placeholder="Pencarian..." />
                          </div>
                      </div>

                    </div>
                    {/* content card */}
                    <div className="card-body">
                      <Toast id="message" autohide="true" title="Informasi">
                        {this.state.message}
                      </Toast>
                      <Toast id="loading" autohide="false" title="Informasi">
                        <span className="fa fa-spin fa-spinner"></span> Sedang Memuat
                      </Toast>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Tgl Booking</th>
                                    <th>Mulai</th>
                                    <th>Selesai</th>
                                    <th>Durasi</th>
                                    <th>Status</th>
                                    <th>Biaya</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.sewa.map((item, index) => {
                                    return (
                                        <tr key={item.id} >

                                            <td>{item.id}</td>
                                            <td>{item.username}</td>
                                            <td>{item.tgl_book}</td>
                                            <td>{item.wkt_mulai}</td>
                                            <td>{item.wkt_selesai}</td>
                                            <td>{item.durasi}</td>
                                            <td>{item.status}</td>
                                            <td>{item.biaya}</td>
                                            <td>
                                                <button className="m-1 btn btn-sm btn-warning" onClick={() => this.Accept(item.id_sewa)}>
                                                    <span className="fa fa-check-circle"></span> Accept
                                                </button>
                                                <button className="m-1 btn btn-sm btn-dark" onClick={() => this.Decline(item.id_sewa)}>
                                                    <span className="fa fa-trash"></span> Decline
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* tombol tambah */}
                        <center><button className="btn btn-warning my-2" onClick={this.Add}>
                          <span className="fa fa-plus"></span> Tambah Data
                        </button></center>

                        {/* form modal lapangan*/}
                        <Modal id="modal_sewa" title="Form Sewa" bg_header="black" text_header="warning">
                            <form onSubmit={this.Save}>
                                Username
                                <input type="text" className="form-control" name="username" value={this.state.username}
                                    onChange={this.bind} required />
                                Tgl Booking
                                <input type="date" className="form-control" name="tgl_book" value={this.state.tgl_book}
                                    onChange={this.bind} required />
                                Mulai
                                <input type="time" className="form-control" name="wkt_mulai" value={this.state.wkt_mulai}
                                    onChange={this.bind} required />
                                Selesai
                                <input type="time" className="form-control" name="wkt_selesai" value={this.state.wkt_selesai}
                                    onChange={this.bind} required />
                                Durasi
                                <input type="time" className="form-control" name="durasi" value={this.state.durasi}
                                    onChange={this.bind} required />
                                Biaya
                                <input type="number" className="form-control" name="biaya" value={this.state.harga}
                                    onChange={this.bind} required />

                                <button type="submit" className="btn btn-info pull-right m-2">
                                    <span className="fa fa-check"></span> Simpan
                                </button>
                            </form>

                        </Modal>

                        <Modal id="modal_accept" title="Accept" bg-header="warning" text_header="white">
                            <form onSubmit={this.Accept}>
                                <input type="text" className="form-control" name="status" value={this.state.status}
                                    onChange={this.bind} placeholder="Status" required />
                                <button type="submit" className="btn btn-dark m-2">
                                    <span className="fa fa-check-circle"></span> Save
                                    </button>
                            </form>
                        </Modal>

                        <Modal id="modal_decline" title="Decline" bg-header="warning" text_header="white">
                            <form onSubmit={this.Decline}>
                                <input type="text" className="form-control" name="status" value={this.state.status}
                                    onChange={this.bind} placeholder="Status" required />
                                <button type="submit" className="btn btn-dark m-2">
                                    <span className="fa fa-check-circle"></span> Save
                                    </button>
                            </form>
                        </Modal>

                    </div>
                </div>
            </div>
        );
    }

}
export default Sewa;
