const app = document.querySelector(".app")

class Usuario{
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName (){
        return `${this.nombre} ` + `${this.apellido}`
    }

    addMascota (mascota){
        this.mascotas.push(mascota)
    }

    countMascotas (){
        return this.mascotas.length
    }

    addBook (nombre,autor){
        this.libros.push({nombre:nombre,autor:autor})
    }

    getBookNames (){
        return this.libros.map(item => item.nombre)
       
    }
}

const marcos = new Usuario("marcos","ramos",[{nombre:"Patrias andinas, patrias citadinas",autor:"Carmen Mc Evoy"}],["jachi"])
pintarString(marcos)
pintarString(marcos.getFullName())
marcos.addMascota("kira")
pintarString(marcos)
pintarString(marcos.countMascotas());
marcos.addBook("Monstruos","Romina Paredes")
pintarString(marcos)
pintarString(marcos.getBookNames());



function pintarString(string){
    const pre = document.createElement("pre")
    pre.innerHTML = JSON.stringify(string)
    app.appendChild(pre)
}

