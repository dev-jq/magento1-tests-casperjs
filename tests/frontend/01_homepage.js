casper.test.begin('Strona glowna', function suite(test) {

    var PAGE_TITLE = "MaxiBike.pl - Sklep motocyklowy online: Części, Akcesoria, Odzież, Kaski";
    var PAGE_DESCRIPTION = "Zapraszamy do internetowego sklepu MaxiBike. Jest to sklep dla motocyklistów stworzony przez motocyklistów. Jesteśmy prawdziwymi praktykami. Kochamy motory i podróże jednośladami. ";
    var PAGE_KEYWORDS = "sklep motocyklowy, sklep motocyklowy online, motocyklowy sklep online, internetowy sklep motocyklowy";

    
    // Start page
    casper.start(mage.getBaseUrl(), function () {
        test.assertHttpStatus(200, "Strona dziala");
    })

    // Test meta title
    casper.then(function(){
        test.assertTitle(PAGE_TITLE, "Tytul strony jest prawidlowy");
    })

    // Test meta  description
    casper.then(function(){
    	var metaDescription = this.getElementAttribute('meta[name="description"]', 'content');
    	test.assertEquals(metaDescription, PAGE_DESCRIPTION, 'Meta descritpion jest prawidlowy');
    })

    // Test meta keywords
    casper.then(function(){
    	var metaKeywords = this.getElementAttribute('meta[name="keywords"]', 'content');
    	test.assertEquals(metaKeywords, PAGE_KEYWORDS, 'Meta keywords sa prawidlowe');
    })

    // Test favicon
    casper.then(function(){
    	test.assertExists('link[rel="icon"]', 'Wystepuje favicona');
    	var faviconUrl = this.getElementAttribute('link[rel="icon"]', 'href');
    	
    })

    // Test H1 tag
    casper.then(function(){
        test.assertExists('h1', 'Wystepuje tag H1');
        test.assertNotEquals('h1', "", "Tag H1 nie jest pusty");
        test.assertElementCount('h1', 1, 'Tag H1 wystepuje tylko raz na stronie');
    })

    // Test canonical
    casper.then(function(){
        test.assertExists('link[rel="canonical"]', 'Wystepuje canonical');
        test.assertElementCount('link[rel="canonical"]', 1, 'Canonical wystepuje tylko raz na stronie');
        var canonicalUrl = this.getElementAttribute('link[rel="canonical"]', 'href');
        test.assertEquals(canonicalUrl, mage.getBaseUrl(), 'Canonical ma prawidlowy URL');
    })

    // Test hreflang
    casper.then(function(){
        test.assertExists('link[hreflang]', 'Wystepuje hreflang');
    })

    // Take screenshot
    casper.then(function(){
    	casper.capture('captures/homepage.png');
    	test.info('Screen strony glownej zostal zapisany w folderze: captures/homepage.png');
    })

    // Check for load resources
    /*casper.on("resource.error", function(resourceError) {
	    this.echo("Resource error: " +resourceError.errorString+" url: "+resourceError.url+" id: "+resourceError.id, "ERROR");
	})*/

    .run(function () {
        test.done();
    });
});

