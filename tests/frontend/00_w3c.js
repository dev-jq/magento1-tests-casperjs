casper.test.begin('W3C Validation', function suite(test) {

    var PAGE_URL = mage.getBaseUrl();
    var pageSource, errorsCount = 0, warningsCount = 0;
    
    // Start page
    casper.start(PAGE_URL, function () {
        pageSource = this.getHTML();
    })

    /*casper.thenOpen('https://validator.w3.org/#validate_by_input', function(){
        this.fill('#validate-by-input form', {
            'fragment': pageSource
        }, false);
        this.click('#validate-by-input form .submit');
        this.waitForUrl('https://validator.w3.org/nu/#textarea');
        this.test.assertExist('#results');
    })*/
    casper.thenOpen('https://validator.w3.org/#validate_by_uri', function(){
        this.fill('#validate-by-uri form', {
            'uri': PAGE_URL
        }, false);
        this.click('#validate-by-uri form .submit');
        this.test.assertExist('#results');
    })

    // Take screenshot
    casper.then(function(){
    	casper.capture('captures/wc3-result.png');
    })

    // Validation errors
    casper.then(function(){
        this.test.assertDoesntExist('#results > ol > li.error', 'Without W3C errors');
    })
    casper.on('step.error', function(err) {
		errorsCount = this.evaluate(function() {
			return __utils__.findAll('#results > ol > li.error').length;
		});

		if(errorsCount > 0) {
			this.test.comment('Page has: ' + errorsCount + ' errors in W3C walidation!');
		}
	})

    // Validation warnings
    casper.then(function(){
        //this.test.assertDoesntExist('#results > ol > li.warning', 'Without W3C warnings');
    })
    casper.on('step.error', function(err) {
		warningsCount = this.evaluate(function() {
			 return __utils__.findAll('#results > ol > li.warning').length;
		});

		if(warningsCount > 0) {
			this.test.comment('Page has: ' + warningsCount + ' warnings in W3C walidation.');
		}
	})

    casper.run(function () {
    	if(errorsCount > 0 || warningsCount > 0) {
    		this.test.comment('For specific details run https://validator.w3.org in your browser.');
    	}
        test.done();
    });
});

