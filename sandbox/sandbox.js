var imageContrast = require('../index');

window.onload = function () {

    //Usage 1:
    imageContrast({
        from: '#original',
        to: '#target-1',
        contrast: 30
    });

    imageContrast({
        from: '#original',
        to: '#target-2',
        contrast: 70
    });

    //Usage 2:
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var img = new Image;
    img.onload = function(){
        context.drawImage(img,0,0);

        var imageData = context.getImageData(0, 0, img.width, img.height);

        var result3 = imageContrast({
            imageData: imageData,
            to: '#target-3',
            contrast: 30
        });
        console.log('result3: ', result3);

        var result4 = imageContrast({
            imageData: imageData,
            to: '#target-4',
            contrast: 70
        });
        console.log(result4);
    };
    img.src = "http://lorempixel.com/400/200";

    //Usage 3:
    imageContrast({
        url: "http://lorempixel.com/400/200",
        to: '#target-5',
        contrast: 30
    });

    imageContrast({
        url: "http://lorempixel.com/400/200",
        to: '#target-6',
        contrast: 70
    });
}
