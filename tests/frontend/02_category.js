casper.test.begin('Kategoria: Kaski', function suite(test) {

    var PAGE_URL = mage.getBaseUrl() + "kaski-motocyklowe-c.html";

    var PAGE_TITLE = "Kaski motocyklowe | Maxibike";
    var PAGE_DESCRIPTION = "Zobacz kaski motocyklowe na MaxiBike.pl. Kaski integralne, otwarte, szczękowe w atrakcyjnych cenach. Bezpłatny zwrot do 30 dni. 100% bezpieczeństwa transakcji. Zamawiaj online na MaxiBike.pl Kup Teraz!";
    var PAGE_KEYWORDS = "Kaski motocyklowe, Kaski motocyklowe";
    var PAGE_H1 = "Kaski motocyklowe";
    
    // Start page
    casper.start(PAGE_URL, function () {
        test.assertHttpStatus(200, "Strona dziala");
        this.test.info('Aktualny adres to: ' + this.getCurrentUrl());
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

    // Test H1 tag
    casper.then(function(){
        test.assertExists('h1', 'Wystepuje tag H1');
        test.assertNotEquals('h1', "", "Tag H1 nie jest pusty");
        test.assertElementCount('h1', 1, 'Tag H1 wystepuje tylko raz na stronie');
        test.assertSelectorHasText('h1', PAGE_H1, 'H1 jest prawidlowy');
    })

    // Test canonical
    casper.then(function(){
        test.assertExists('link[rel="canonical"]', 'Wystepuje canonical');
        test.assertElementCount('link[rel="canonical"]', 1, 'Canonical wystepuje tylko raz na stronie');
        var canonicalUrl = this.getElementAttribute('link[rel="canonical"]', 'href');
        test.assertEquals(canonicalUrl, PAGE_URL, 'Canonical ma prawidlowy URL');
    })

    // Test hreflang
    casper.then(function(){
        test.assertExists('link[hreflang]', 'Wystepuje hreflang');
    })

    // Next page: 4
    casper.thenClick('.toolbar-bottom .pager li:nth-child(4) > a', function(){
        this.waitForUrl(PAGE_URL + '?p=4');
        this.test.comment('Otwieram 4 strone z paginacji:');
        this.test.info('Aktualny adres to ' + this.getCurrentUrl());
        this.test.assertHttpStatus(200, "Strona 4 z paginacji dziala");
        test.assertTitleMatch(/Strona 4/, 'Tytul strony zawiera fraze "Strona 4"');
        test.assertMatch(this.getElementAttribute('meta[name="description"]', 'content'), /Strona 4/, 'Opis strony zawiera fraze "Strona 4"');
    });

    casper.run(function () {
        test.done();
    });
});

