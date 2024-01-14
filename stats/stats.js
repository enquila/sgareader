const accuracySubtextElm=document.getElementById('accuracySubtext')
const practiceSubtextElm=document.getElementById('practiceSubtext')

var data = loadArray('data');
var date = new Date();
const filename=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

if (data){
    if (!(data[data.length-1][0]==filename)){
        data.push([filename,0,0,0]);
    }
    if (data.length-2!=-1){
        diff=(data[data.length-1][1]-data[data.length-2][1]);
        if (diff>0){
            accuracySubtextElm.textContent=`${diff}% higher than yesterday`;
        }else{
            if (diff<0){
                accuracySubtextElm.textContent=`${diff*-1}% lower than yesterday`;
            }else{
                accuracySubtextElm.textContent=`Same accuracy as yesterday`;
            }
        }

        diff=(data[data.length-1][2]-data[data.length-2][2]);
        if (diff>0){
            practiceSubtextElm.textContent=`${diff} more letters practiced than yesterday`;
        }else{
            if (diff<0){
                practiceSubtextElm.textContent=`${diff*-1} less letters practiced yesterday`;
            }else{
                practiceSubtextElm.textContent=`Same letters yesterday`;
            }
        }
    }
}else{
    data=[];
    data.push([filename,0,0,0]);
    accuracySubtextElm.textContent='First day';
    practiceSubtextElm.textContent='First day';
}

const index = data.length-1;

var xVal = [];
var yAcc = [];
var yLet = [];
var yCor = [];

for (i=0; i<data.length; i++){
    xVal.push(data[i][0]);
    yAcc.push(data[i][1]);
    yLet.push(data[i][2]);
    yCor.push(data[i][3]);
}

new Chart("accuracyChart", {
    type: "line",
    data: {
        labels: xVal,
        datasets: [
            {
                label: 'Accuracy (%)',
                backgroundColor: 'rgb(255, 255, 255)',
                borderColor: 'rgb(255, 255, 255)',
                data: yAcc
            }
        ]
    },
    options: {}
});

new Chart("practiceChart", {
    type: "line",
    data: {
        labels: xVal,
        datasets: [
            {
                label: 'Total Letters',
                backgroundColor: 'rgb(250, 250, 250)',
                borderColor: 'rgb(250, 250, 250)',
                data: yLet
            },
            {
                label: 'Correct Letters',
                backgroundColor: 'rgb(87, 221, 49)',
                borderColor: 'rgb(87, 221, 49)',
                data: yCor
            }
        ]
    },
    options: {}
});

Chart.defaults.global.defaultFontColor = 'rgb(215,215,215)';