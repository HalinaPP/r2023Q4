import { expect, describe,test } from 'vitest';
import { cleanInputData, createFilledArrayBySize, getIdFromUrl, numberOfGettingApiPages, startApiPageNumber } from './helpers';

describe("Helpers functions", () => {
    test("should cleanInputData", () => {
        const searchTerm = " aldebaran    ";
        const expectedCleanedSearchTerm = "aldebaran";
        const receivedCleanedSearchTerm = cleanInputData(searchTerm);

        expect(receivedCleanedSearchTerm).toBe(expectedCleanedSearchTerm);
    });

    test("should getIdFromUrl", () => {
        const url = "http://some.com/id/2/";
        const expectedId = "2";
        const receivedId = getIdFromUrl(url);

        expect(receivedId).toBe(expectedId);
    })

    test("should startApiPageNumber", () => {
        const currPage=3;
        const itemsPerPage=20;
        const expectedStartApiPageNumber = 5;

        const receivedPageNumber = startApiPageNumber(currPage, itemsPerPage)

        expect(receivedPageNumber).toBe(expectedStartApiPageNumber);
    });

    test("should numberOfGettingApiPages", () => {
        const itemsPerPage = 20;
        const expectedPages = 2; 

        const receivedPages = numberOfGettingApiPages(itemsPerPage);
       
        expect(receivedPages).toBe(expectedPages);
    });

    test("should createFilledArrayBySize", () => {
        const arrSize = 5;
        const expectedPagesArr = [1,2,3,4,5];
        const receivedPagesArr = createFilledArrayBySize(arrSize);

        expect(receivedPagesArr).toEqual(expectedPagesArr);
    });
    
    
    
});