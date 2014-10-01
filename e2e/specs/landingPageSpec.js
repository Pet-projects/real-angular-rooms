'use strict';

var landingPage = require('../pageObjects/landingPagePage');

describe('As a client', function () {

    describe("when I go to the landing page of ngRooms", function () {

        beforeEach(function () {

            landingPage.navigate();
        });

        it('I should be able to go to the "rooms" feature', function () {
            landingPage.roomsFeature.click()

            expect(browser.getCurrentUrl()).toContain('/rooms');
        });

        it('I should be able to go to the "rates & availability" feature', function () {
            landingPage.rateFeature.click()

            expect(browser.getCurrentUrl()).toContain('/rate');
        });

        it('I should be able to go to the "supplements" feature', function () {
            landingPage.supplementFeature.click()

            expect(browser.getCurrentUrl()).toContain('/supplement');
        });

        it('I should be able to go to the "cancellation policies" feature', function () {
            landingPage.cancellationFeature.click()

            expect(browser.getCurrentUrl()).toContain('/cancellationPolicy');
        });

        it('I should be able to go to the "tutorials" feature', function () {
            landingPage.tutorialsFeature.click()


            expect(browser.getCurrentUrl()).toContain('/tutorial');
        });

        it('I should be able to go to the "analytics" feature', function () {
            landingPage.analyticsFeature.click()

            expect(browser.getCurrentUrl()).toContain('/analytics');
        });


    });

});