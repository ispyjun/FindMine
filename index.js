
var dataset=[];
document.querySelector('#exec').addEventListener('click', function () {
    var tbody = document.querySelector('#table tbody');
    tbody.innerHTML='';

    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);
    console.log(hor, ver, mine);

    //지뢰 위치 뽑기
    var candidate = Array(hor * ver)
        .fill()
        .map(function (element, index) {
            return index;
        });
    var shuf = [];

    while (candidate.length > 80) {
        var moving = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuf.push(moving);
    }
    console.log(shuf);

    //지뢰 테이블 만들기
    var dataset = [];
    var tbody = document.querySelector('#table tbody');
    for (var i = 0; i < ver; i += 1) {
        var arr = [];
        var tr = document.createElement('tr');
        dataset.push(arr);
        for (var j = 0; j < hor; j += 1) {
            arr.push(1);
            var td = document.createElement('td');
            td.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                var partr = e.currentTarget.parentNode;
                var partbody = e.currentTarget.parentNode.parentNode;
                var kan = Array.prototype.indexOf.call(partr.children, e.currentTarget);
                var jul = Array.prototype.indexOf.call(partbody.children, partr);
                console.log(partr, partbody, e.currentTarget, kan, jul);
                if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
                    e.currentTarget.textContent = '🚩';
                } else if (e.currentTarget.textContent === '🚩') {
                    e.currentTarget.textContent = '?';
                } else if (e.currentTarget.textContent === '?') {
                    if (dataset[jul][kan] === 1) {
                        e.currentTarget.textContent = '';
                    } else if (dataset[jul][kan] === 'X') {
                        e.currentTarget.textContent = 'X';
                    }
                }
            });
            td.addEventListener('click',function(e){
                var partr = e.currentTarget.parentNode;
                var partbody = e.currentTarget.parentNode.parentNode;
                var kan = Array.prototype.indexOf.call(partr.children, e.currentTarget);
                var jul = Array.prototype.indexOf.call(partbody.children, partr);
                if(dataset[jul][kan]==='X'){
                    e.currentTarget.textContent='펑';
                }else{
                    var near= [
                        dataset[jul][kan-1],dataset[jul][kan+1]
                    ];
                    if (dataset[jul-1]){
                        near=near.concat([dataset[jul-1][kan-1],dataset[jul-1][kan],dataset[jul-1][kan+1]]);
                    }
                    if(dataset[jul+1]){
                        near=near.concat([dataset[jul+1][kan-1],dataset[jul+1][kan],dataset[jul+1][kan+1]]);
                    }
                    e.currentTarget.textContent=near.filter(function(v){
                        return v==='X';
                    }).length;
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    console.log(dataset);
    console.log(shuf.length);

    //지뢰 심기
    for (var k = 0; k < shuf.length; k++) {
        vert = Math.floor(shuf[k] / 10);
        hori = shuf[k] % 10;
        console.log(vert, hori);
        tbody.children[vert].children[hori].textContent = 'X';
        dataset[vert][hori] = 'X';
    }
});