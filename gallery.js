import React, {Component} from "react";
import Card from "./card"  ;
import $ from 'jquery';

import 'bootstrap/dist/js/bootstrap.bundle.min';


class gallery extends Component {  
  constructor(){ 
    super()
   
    this.state = {
       
        buku: [
            {
                isbn:"12345", judul:"Bulan", penulis:"Tere Liye",
                penerbit:"CV Harapan Kita", harga: 90000,
                cover:"https://drive.google.com/uc?id=1ui-jyKgu3DqFyo7VKJu-FFXkaNQN3aSg"
            },
            {
                isbn:"12346", judul:"Anak Badai", penulis:"Tere Liye",
                penerbit:"CV Nusa Bangsa", harga: 80000,
                cover:"https://drive.google.com/uc?id=1rJDcCOmsd14NL6DG3Wps_kewZomGcLU-"
            },
            {
                isbn:"54321", judul:"Bumi", penulis:"Tere Liye",
                penerbit:"CV Nusa Bangsa", harga: 70000,
                cover:"https://drive.google.com/uc?id=1e-thvq7lkG1_gw0FqHzRoiAhfhdgpOUj"
            },
        ],

        action: "",
        isbn: "",
        judul: "",
        penulis: "",
        penerbit: "",
        harga: 0,
        cover: "",
        selectedItem: null,
    }
    this.state.filterBuku = this.state.buku

}


  render(){
  
    return ( 
        <div>
        
        <div className="container">
        <div className="row">
        <h2 className="text-info" align="left">Allo, Viamora Zahra !</h2>
        <h6 class="card-tittle" align="left">Mari Budayakan Literasi Bersama Kami.</h6>
              <input type="text" className="form-control my-2" placeholder="Pencarian"
        value={this.state.keyword}
        onChange={ev => this.setState({keyword: ev.target.value})}
        onKeyUp={ev => this.searching(ev)}
      
     />  
        { this.state.filterBuku.map( (item, index) => (
                        <Card
                        isbn={item.isbn}
                        judul={item.judul}
                        penulis={item.penulis}
                        penerbit={item.penerbit}
                        harga={item.harga}
                        cover={item.cover}
                        onEdit={ () => this.Edit(item)}
                        onDrop={ () => this.Drop(item)}
                         />
                    )) }
        </div>

        <button className="btn btn-success" onClick={() => this.Add()}> 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-plus" viewBox="0 0 16 16">
  <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"/>
  <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z"/>
</svg> |
         Tambah Data
        </button>

        {/* component modal sbg control manipulasi data */}
        <div className="modal" id="modal_buku">
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* modal header */}
                    <div className="modal-header">
                        Form Buku
                        <button type="button" className="btn-close" data-bs-dismiss="modal_buku" 
                        aria-label="Close" onClick={() => this.close()}></button>
                    </div>

                    {/* modal body */}
                    <div className="modal-body">
                        <form onSubmit={ev => this.Save(ev)}>
                            ISBN
                            <input type="text" className="form-control mb-2" disabled
                            value={this.state.isbn}
                            onChange={ ev => this.setState({isbn: ev.target.value}) }
                            required />
                           
                            Judul Buku
                            <input type="text" className="form-control mb-2"
                            value={this.state.judul}
                            onChange={ ev => this.setState({judul: ev.target.value}) }
                            required />
                            
                            Penulis Buku
                            <input type="text" className="form-control mb-2"
                            value={this.state.penulis}
                            onChange={ ev => this.setState({penulis: ev.target.value}) }
                            required />
                            
                            Penerbit Buku
                            <input type="text" className="form-control mb-2"
                            value={this.state.penerbit}
                            onChange={ ev => this.setState({penerbit: ev.target.value}) }
                            required />
                            
                            Harga Buku
                            <input type="number" className="form-control mb-2"
                            value={this.state.harga}
                            onChange={ ev => this.setState({harga: ev.target.value}) }
                            required />
                            
                            Cover Buku
                            <input type="url" className="form-control mb-2"
                            value={this.state.cover}
                            onChange={ ev => this.setState({cover: ev.target.value}) }
                            required />

                            <button className="btn btn-info btn-block" type="submit">
                                Simpan  </button>
                            
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div> 
)

}

Add = () => {
    // menampilkan komponen modal
    $("#modal_buku").show()
    this.setState({
        isbn: Math.random(1,10000000),
        judul: "",
        penulis: "",
        penerbit: "",
        cover: "",
        harga: 0,
        action: "insert"
    })
}

//function untuk edit
Edit = (item) => {
    // menampilkan komponen modal
    $("#modal_buku").show()
    this.setState({
        isbn: item.isbn,
        judul: item.judul,
        penulis: item.penulis,
        penerbit: item.penerbit,
        cover: item.cover,
        harga: item.harga,
        action: "update",
        selectedItem: item
    })
}

//function untuk menyimpan data
Save = (event) => {
    event.preventDefault();
    // menampung data state buku
    let tempBuku = this.state.buku

    if (this.state.action === "insert") {
        // menambah data baru
        tempBuku.push({
            isbn: this.state.isbn,
            judul: this.state.judul,
            penulis: this.state.penulis,
            penerbit: this.state.penerbit,
            cover: this.state.cover,
            harga: this.state.harga,
        })
    }else if(this.state.action === "update"){
        // menyimpan perubahan data
        let index = tempBuku.indexOf(this.state.selectedItem)
        tempBuku[index].isbn = this.state.isbn
        tempBuku[index].judul = this.state.judul
        tempBuku[index].penulis = this.state.penulis
        tempBuku[index].penerbit = this.state.penerbit
        tempBuku[index].cover = this.state.cover
        tempBuku[index].harga = this.state.harga
    }

    this.setState({buku : tempBuku})
    
    // menutup komponen modal_buku
    $("#modal_buku").hide()
}

//function untuk menghapus data
Drop = (item) => {
    // beri konfirmasi untuk menghapus data
    if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
        // menghapus data
        let tempBuku = this.state.buku
        // posisi index data yg akan dihapus
        let index = tempBuku.indexOf(item)

        // hapus data
        tempBuku.splice(index, 1)

        this.setState({buku: tempBuku})
    }
}
    close=()=>{
        $("#modal_buku").hide()
    }

    searching = event => {
        if(event.keyCode === 13){
            // 13 adalah kode untuk tombol enter
 
            let keyword = this.state.keyword.toLowerCase()
            let tempBuku = this.state.buku
            let result = tempBuku.filter(item => {
                return item.judul.toLowerCase().includes(keyword) ||
                item.penulis.toLowerCase().includes(keyword) || 
                item.penerbit.toLowerCase().includes(keyword)
            })
 
            this.setState({filterBuku: result})
        }
    }

}



export default gallery; 