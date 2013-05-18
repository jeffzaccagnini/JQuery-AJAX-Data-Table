var grid3 = {

    ajaxContoller: 'dataGrid/dataGrid.controller.php',
    gridName: 'countrylanguage',
    gridContainer: 'grid3',
    prefix: 'g3-',

    defaultPg: 1,
    itemsPerPg: 25,
    midRange: 7,

    pagingContainer: 'grid3-paging',

    ippSelectEnabled: true,
    ippSelectContainer: 'grid3-ipp',

    pgSelectEnabled: true,
    pgSelectContainer: 'grid3-page',

    searchEnabled: false,
    searchContainer: "grid3-search",

    checkboxEnabled: true,

    formEnabled: true,
    formContainer: 'grid3-form',

    gridKey: {
        id: 'CountryCode'
    },

    gridCols: [{
        id: 'CountryCode',
        header: 'Country Code'
    }, {
        id: 'Language',
        header: 'Language'
    }, {
        id: 'IsOfficial',
        header: 'Is Official'
    }, {
        id: 'Percentage',
        header: 'Percentage'
    }]

};// JavaScript Document