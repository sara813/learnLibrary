$(document).ready(function(){
    $window = $(window);
    $('[data-type]').each(function(){
        $(this).data('offsetY', parseInt($(this).attr('data-offsety')));
        $(this).data('Xpositon', $(this).attr('data-xposition'));
        $(this).data('speed', $(this).attr('data-speed'));
    });

    $('section[data-type="background"]').each(function(){
        var $self = $(this), offsetCoords = $self.offset(), topOffset = offsetCoords.top;
    
        $(window).scroll(function(){
            if(($window.scrollTop() + $window.height()) > (topOffset) && (topOffset + $self.height()) > $window.scrollTop()){
                var yPos = -($window.scrollTop()/$self.data('speed'));
                console.log($window.scrollTop(), 111, $self.data('speed'), 2222, yPos, 333, $self.data('offsetY'));
                if($self.data('offsetY')){
                    yPos += $self.data('offsetY');
                }
            }
        });
    });
});