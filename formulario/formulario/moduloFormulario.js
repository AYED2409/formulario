export { Formulario };
class Formulario{
   datos = [];
   getDatos() {
      var formulario =document.createElement('form');
      formulario.addEventListener("submit", ()=>{
         window.alert("formulario enviado")
         //console.log("formulario enviado")
      })
      var contenedor = document.querySelector('#contenedor');
      contenedor.appendChild(formulario);
      fetch('./formulario.json')
      .then(respuesta => respuesta.json())
      .then (datos =>{
            datos.forEach(elemento => {
               this.datos[elemento.id]= {...elemento}
               //this.datos.push(elemento);
               if(elemento.type == "submit") {
                  let btn = document.createElement('button');
                  formulario.appendChild(btn);
                  this.pintarbtn(elemento,btn);
               }
               if(elemento.type == "checkbox") {
                  let label= document.createElement('label');
                  let input=document.createElement('input');
                  let div= document.createElement('div');
                  div.setAttribute('class',elemento.id);
                  if(elemento.value == false){
                     div.style.backgroundImage= "url('./img/checkboxfalse.jpg')";
                  }else{
                     input.setAttribute('checked',true);
                     div.style.backgroundImage= "url('./img/checkboxtrue.jpg')";
                  }
                  label.innerHTML=elemento.text;
                  formulario.appendChild(label);
                  label.appendChild(input);
                  label.appendChild(div);
                  this.pintarCheckbox(elemento,input);
               }
               if(elemento.type == "range") {
                  let input = document.createElement('input')
                  formulario.appendChild(input)
                  this.pintarRange(elemento,input)
               }
            });
      })
      .catch( error => console.log('se produjo el error '+ error))
   }
   pintarbtn(elemento,btn) {
      btn.setAttribute('id',elemento.id);
      btn.setAttribute('name',elemento.name);
      btn.setAttribute('type',elemento.type)
      btn.innerHTML=elemento.name
      btn.onclick=()=>{
         console.log("me hiciste clic")
      }
   }
   pintarCheckbox(elemento,checkbox) {
      checkbox.setAttribute('type',elemento.type);
      checkbox.setAttribute('id',elemento.id);
      checkbox.setAttribute('name',elemento.name);
      checkbox.onclick=(()=>{
         var e= document.querySelector("."+elemento.id)
         if(checkbox.checked){
            console.log("marcar")
            e.style.backgroundImage = "url('./img/checkboxtrue.jpg')";
            //var obj=obtenerObjeto(elemento.id)
            //obj.value=true
         }else{
            console.log("desmarcar")
            //var obj=obtenerObjeto(elemento.id)
            //obj.value=false
            e.style.backgroundImage = "url('./img/checkboxfalse.jpg')";
         }
      })
   }
   pintarRange(elemento,range){
      range.type=elemento.type;
      range.setAttribute('id',elemento.id);
      range.setAttribute('name',elemento.name);
      range.setAttribute('value',elemento.value);
      range.setAttribute('max',elemento.max)
      range.setAttribute('min',elemento.min)
      range.addEventListener("input", ()=>{
         //onsole.log("rango cambiado")
          //var obj=obtenerObjeto(elemento.id)
         //obj.value=range.value
            console.log(range.value);
      })
   }
   obtenerObjeto(id){
      //let obj = this.datos.find((elem) => elem.id === "casilla1");
      //console.log("este es el obj "+obj)
      console.log(this.datos)
      console.log(this.datos["boton"])
      //var pos = this.datos.findIndex(element => element.id == "casilla1");
      //console.log(this.datos[1])
      //console.log(pos)
   }
}