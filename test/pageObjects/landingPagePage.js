landingPagePage = function () { 
 	var me = this;

 	this.navigate = function() {
        browser.get('/');
    };

    this.roomsFeature = $('#roomsFeature');
    this.rateFeature = $('#rateFeature');
    this.supplementFeature = $('#supplementFeature');
    this.cancellationFeature = $('#cancellationFeature');
    this.tutorialsFeature = $('#tutorialsFeature');
    this.analyticsFeature = $('#analyticsFeature');
};

module.exports = new landingPagePage();