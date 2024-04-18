function form() {

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        bottomForm = document.getElementById('form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

//      делаем форму через промисы

    function sendForm(elem) {
        elem.addEventListener('submit', function(e) {
            e.preventDefault();
            elem.appendChild(statusMessage);
            let formData = new FormData(elem);

            function postData(data) {

                return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');   //для отправки формы в обычном формате php
                    
                    // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                    // let obj = {};                                                 // объект для преобразования JSON формата
                    // formData.forEach(function(value, key) {
                    //     obj[key] = value;
                    // });
                    // let json = JSON.stringify(obj);
            
                    // request.send(json);
            
                    request.onreadystatechange = function() {
                        if (request.readyState < 4) {
                            resolve()
                        } else if (request.readyState === 4) {
                            if (request.status == 200 && request.status < 300) {
                                resolve()
                            }  else {
                                reject()
                                }
                        }
                    }
                    request.send(data);
                })
            } //end postData

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }
            
            postData(formData)
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => {
                    thanksModal.style.display = 'block';
                    mainModal.style.display = 'none';
                    statusMessage.innerHTML = '';
                })
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(clearInput)
        });

    }
    sendForm(form);
    sendForm(bottomForm);


//      Отправка формы через JSON формат

/** 
    function sendForm(elem) {
        elem.addEventListener('submit', function(e) {
            e.preventDefault();
            elem.appendChild(statusMessage);
    
            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            
            // request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');   //для отправки формы в обычном формате php
    
            let formData = new FormData(elem);
    
            let obj = {};           // объект для преобразования JSON формата
            formData.forEach(function(value, key) {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);
    
            request.send(json);
    
            request.onreadystatechange = function() {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4) {
                    if (request.status == 200 && request.status < 300) {
                        thanksModal.style.display = 'block';
                        mainModal.style.display = 'none';
                        statusMessage.innerHTML = '';
                    }  else {
                        statusMessage.innerHTML = message.failure;
                        }
                }
            }
    
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        });

    }
    sendForm(form);
    sendForm(bottomForm);
*/
}
module.exports = form;