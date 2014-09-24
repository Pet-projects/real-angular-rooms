'use strict';

describe('As a client', function () {

    describe("when I go to the landing page of LateRooms", function () {

        beforeEach(function () {

            browser.get('/');
        });

        it('I should be able to go to the "rooms" feature', function () {
            $('#roomsFeature').click()

            expect(browser.getCurrentUrl()).toContain('/rooms');
        });

        it('I should be able to go to the "rates & availability" feature', function () {
            $('#rateFeature').click()

            expect(browser.getCurrentUrl()).toContain('/rate');
        });

        it('I should be able to go to the "supplements" feature', function () {
            $('#supplementFeature').click()

            expect(browser.getCurrentUrl()).toContain('/supplement');
        });

        it('I should be able to go to the "cancellation policies" feature', function () {
            $('#cancellationFeature').click()

            expect(browser.getCurrentUrl()).toContain('/cancellationPolicy');
        });

        it('I should be able to go to the "tutorials" feature', function () {
            $('#tutorialsFeature').click()

            expect(browser.getCurrentUrl()).toContain('/tutorial');
        });

        it('I should be able to go to the "analytics" feature', function () {
            $('#analyticsFeature').click();

            expect(browser.getCurrentUrl()).toContain('/analytics');
        });


    });

});