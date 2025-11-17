const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector("#result");
const endPoint = 12;
const select = [0,0,0,0,0,0,0,0,0,0,0,0];
let qIdx = 0;

function calResult() {
  console.log(select);
  var resultIndex = select.indexOf(Math.max(...select));
  return resultIndex; 
}

function setResult() {
  let point = calResult();
  const resultName = document.querySelector('.resultname');
  resultName.innerHTML = infoList[point].name;

  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/image-' + point + '.png';
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult() {
  qna.style.WebkitAnimation = "fadeOut";
  qna.style.animation = "fadeOut 1s";

  setTimeout(() => {
    qna.style.display = "none";
    result.style.display = "block";
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
  }, 450);

  console.log(select);
  calResult();
}

function addAnswer(answerText, qIdx, idx) {
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button');
  answer.classList.add('answerList', 'my-3', 'py-3', 'mx-auto', 'fadeIn');

  a.appendChild(answer);
  answer.innerHTML = answerText;
  
  answer.addEventListener("click", function() {
    var children = document.querySelectorAll('.answerList');
    
    for (let i = 0; i < children.length; i++) {
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut";
      children[i].style.animation = "fadeOut 1s";
    }

    setTimeout(() => {
      var target = qnaList[qIdx].a[idx].type;

      // 🔥 여기 오류 수정됨 (핵심)
      for (let i = 0; i < target.length; i++) {
        select[target[i]] += 1;
      }

      for (let i = 0; i < children.length; i++) {
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
    }, 450);
  });
}

function goNext(qIdx) {
  if (qIdx === endPoint) { 
    goResult();
    return;
  }

  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;

  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }

  var status = document.querySelector('.statusBar');
  status.style.width = (100 / endPoint) * (qIdx + 1) + '%';
}

function begin() {
  main.style.WebkitAnimation = "fadeOut";
  main.style.animation = "fadeOut 1s";

  setTimeout(() => {
    main.style.display = "none";
    qna.style.display = "block";
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    goNext(qIdx);
  }, 450);
}
