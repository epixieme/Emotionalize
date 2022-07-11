let addEmotionsBtn = document.querySelector('#addEmotionsBtn');
let emotionList = document.querySelector('.emotionList')
let emotionSection = document.querySelectorAll('.emotionSection')[0]// grab first object


addEmotionsBtn .addEventListener('click',function(){
    let newEmotions = emotionSection.cloneNode(true); // clone the section with input inside
    let input = newEmotions.getElementsByTagName('input')[0] // take the first input
    input.value = ''
    emotionList.appendChild(newEmotions);//  add new feeling input box on click
  
})