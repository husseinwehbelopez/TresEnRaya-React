
     var React = require('react');
     var ReactDOM = require('react-dom');
     import { Button } from 'react-bootstrap';
const Cabecera = require('./Cabecera.jsx');
const Tablero = require('./Tablero.jsx');
const ButtonReset = require('./ButtonReset.jsx');
const JUGADORX = "jugador 1 - las X";
const JUGADOR0 = "jugador 2 - los 0";
var moves = 0;
var App = React.createClass({ getInitialState: function () {
        return {
            turno: JUGADORX,
valores: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']] };
},

appClick: function (numeroFila, numberoColumna) {
	moves++;
let valores = this.state.valores;
let nuevoValor = this.state.turno === JUGADORX ? 'X' : '0'; valores[numeroFila][numberoColumna] = nuevoValor; this.setState({
turno: this.state.turno === JUGADORX ? JUGADOR0 : JUGADORX,
             valores: this.state.valores
         });
if(this.hayGanador(valores, nuevoValor)){
	    	alert("Ha ganado: " + this.state.turno + ". La partida se ha resuelto en " + moves + " movimientos");
	    	this.setState(this.getInitialState());
	    	moves = 0;
	    }else{
        if(this.hayEmpate(valores)){
  	    	alert("Ha habido un empate. La partida se ha resuelto en " + moves + " movimientos");
  	    	this.setState(this.getInitialState());
  	    	moves = 0;
  	    }
      }
},

resetClick: function(){
    var reinicio = confirm("¿Seguro que quieres reiniciar?");
    if (reinicio == true) {
        this.setState(this.getInitialState());
        moves = 0;
    }
},

hayGanador: function(valores, nuevoValor){
      var nFila, nCol;
      nFila = 0;
      nCol = 0;
      var num = 0;
      while(nFila<3){
        while(nCol<3){
          if(valores[nFila][nCol] === nuevoValor){
            num++;
          }else{
            num = 0;
          }
          nCol++;
        }
        if(num === 3) return true;
        nFila++;
        num = 0;
        nCol = 0;
      }

      nFila = 0;
      nCol = 0;
      var num = 0;
      while(nCol<3){
        while(nFila<3){
          if(valores[nFila][nCol] === nuevoValor){
            num++;
          }else{
            num = 0;
          }
          nFila++;
        }
        if(num === 3) return true;
        nCol++;
        num = 0;
        nFila = 0;
      }
      nFila = 0;
      num = 0;

      while(nFila<3){
        if(valores[nFila][nFila] === nuevoValor){
          num++;
        }else{
          num = 0;
        }
        nFila++;
      }
      if(num === 3) return true;

      nCol = 2;
      nFila = 0;
      num = 0;
      while(nCol>= 0 && nFila<3){
        if(valores[nFila][nCol] === nuevoValor){
          num++;
        }else{
          num = 0;
        }
        nFila++;
        nCol--;
      }
      if(num === 3) return true;

			return false;
},

    hayEmpate: function(valores){
      var empate = 0;
      var nFila, nCol;
      for (nFila = 0; nFila < 3; nFila++) {
          for (nCol = 0; nCol < 3; nCol++) {
            if (valores[nFila][nCol] !== '-') {
                empate++;
            }
        }
      }
      let cuadros = 9;
      if(empate === cuadros) return true;
 },

render: function () {
	var texto = "Turno del " + this.state.turno;
return (<div>
<Cabecera texto={texto}/>
<Tablero valores={this.state.valores}
        manejadorTableroClick={this.appClick}/>
        <ButtonReset manejadorButtonClick={this.resetClick}/>
</div>)
} });
module.exports = App;
