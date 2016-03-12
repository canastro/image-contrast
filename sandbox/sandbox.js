var imageContrast = require('../src/index');

function applyResults(selector, src) {
    var target;
    var image;

    target = document.querySelectorAll(selector)[0];

    image = document.createElement('img');
    image.setAttribute('src', src);
    target.appendChild(image);
}

window.onload = function () {

    var img = new Image;
    img.crossOrigin = "Anonymous";
    img.onload = function(){
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var context = canvas.getContext('2d');
        context.drawImage(img,0,0);

        var data = context.getImageData(0, 0, img.width, img.height);

        var results1 = imageContrast({
            data: data,
            contrast: 50,
            asDataURL: true
        });
        applyResults('#target-1', results1);

        var results2 = imageContrast({
            data: data,
            contrast: 100,
            asDataURL: true
        });
        applyResults('#target-2', results2);
    };
    img.src = "dummy.jpg";
}
