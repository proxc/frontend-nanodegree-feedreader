/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('contain a valid url', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('contain a valid name', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
        
    });


    /* Write a new test suite named "The menu" */

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

    describe('The menu', function(){
        let bodyElement = document.querySelector('body');
        let slider = document.querySelector('.slide-menu');
        let button = document.querySelector('.menu-icon-link');

        it('element is hidden by default', function(){
            expect(bodyElement.classList).toContain('menu-hidden');
            let sliderStyles = window.getComputedStyle(slider, null);
            expect(sliderStyles.getPropertyValue("transform")).toBe('matrix(1, 0, 0, 1, -192, 0)');
        });

        it('changes visibility when clicked', function(){
            button.click();
            expect(bodyElement.classList).not.toContain('menu-hidden');

            button.click();
            expect(bodyElement.classList).toContain('menu-hidden');
        });
    });

    /* Write a new test suite named "Initial Entries" */

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        
    describe('Initial Entries', function() {
        beforeEach(function(done){
            loadFeed(0, done);
        });
        it('are not empty', function(){
            // gets the first .entry element from the .feed if not it return null
            expect(document.querySelector('.feed .entry')).not.toBe(null);
        });
    });

    /* Write a new test suite named "New Feed Selection" */

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    describe('New Feed Selection', function(){
        beforeEach(function(done){
            loadFeed(0, done);
        });
        it('are not the same', function(done){
            let oldFeed = document.querySelector('.feed').innerHTML;
            loadFeed(1, function(){
                let newFeed = document.querySelector('.feed').innerHTML;
                expect(oldFeed).not.toEqual(newFeed);
                done();
            });
        });
    });
}());
