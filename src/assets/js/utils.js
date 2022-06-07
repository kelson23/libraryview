const feriados = [
                  '24/12/2021',
                  '25/12/2021',                
                  '31/12/2021',
                  '01/01/2022',
                  '15/02/2022',
                  '16/02/2022',
                  '17/02/2022',
                  '02/04/2022',
                  '21/04/2022',
                  '01/05/2022',
                  '03/06/2022',
                  '07/09/2022',
                  '02/11/2022',
                  '15/11/2022',
                  '25/12/2022',                  
                ];
export function diasTrabalho(data, dias, direcao, considerarDiaAtual){

    if (dias == 0) {
        return data;
    }        

    var diaUtil = true;

    //Se considerarDiaAtual == true, iniciar contagem do dia atual se ele for útil.
    if(!considerarDiaAtual)
        // adiciona/subtrai um dia         
      data.setDate(data.getDate() + direcao);
    
    if((data.getDay() == 0 || data.getDay() == 6)  || feriados.find(x=>x == data.toLocaleDateString()) != undefined)
        diaUtil = false;            

    //Se for util remove um dia 
    if (diaUtil) { dias--; }

    return diasTrabalho(data, dias, direcao);

}

export function contaDiasTrabalho(data1, data2, dias){
  
  if(dias == undefined)
    dias = 0;
  
  
  var diaUtil = true;
  
  //Verifica fds e feriádos
  if((data1.getDay() == 0 || data1.getDay() == 6)  || feriados.find(x=>x == data1.toLocaleDateString()) != undefined)
      diaUtil = false;  
         

  //Se for util conta um dia 
  if (diaUtil) {         
    if(data1 > data2)
      dias--;
    else
      dias++;
       
  }        
  
  //Retorna considerando o dia2 como parte da contagem.
  if (data1.toLocaleDateString() === data2.toLocaleDateString()) {
    return dias;
  }

  if(data1 > data2){
    data1.setDate(data1.getDate() - 1);
  }
  else{
    data1.setDate(data1.getDate() + 1);
  }

  return contaDiasTrabalho(data1, data2, dias);
}

export function maskTelefone(v){
    if(v == null) return;
    v = v.toString();
    var r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
        r = r.replace(/^(\d*)/, "($1");
    }
  return r;
}

export function maskCpf(v){

  if(v == null) return;

  let num = v.replace(/[^\d]/g, '');
  let len = num.length; 

  if(len <= 6){
    v = num.replace(/(\d{3})(\d{1,3})/g, '$1.$2');  
  }else if(len <= 9){
    v = num.replace(/(\d{3})(\d{3})(\d{1,3})/g, '$1.$2.$3');
  }else{
    v = num.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/g, "$1.$2.$3-$4");
  }
  return v;
}

export function removeMask(v){
    if(v == null) return;
    return v.toString().replace(/[^\d]/g, '');
}

export function copyToClip(element) {
  var doc = document
        , text = doc.getElementById(element)
        , range, selection;
    
    if (doc.body.createTextRange)
    {
        range = doc.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } 
    
    else if (window.getSelection)
    {
        selection = window.getSelection();        
        range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
};

export function getUser(){
  let usuario = null;
  if (sessionStorage.getItem('agUser')) {
     usuario = JSON.parse(sessionStorage.getItem('agUser'));    
  }
  return usuario;
}

export function moeda(valor){
  return Number(valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

export function real(valor){
  return Number(valor).toLocaleString('pt-br', {minimumFractionDigits: 2}).replace(".", ",");
}

export const descMes = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];