var grid2 = {

    ajaxContoller: 'dataGrid/dataGrid.controller.php',
    gridName: 'country',
    gridContainer: 'grid2',
    prefix: 'g2-',

    defaultPg: 1,
    itemsPerPg: 10,
    midRange: 7,

    pagingContainer: 'grid2-paging',

    ippSelectEnabled: true,
    ippSelectContainer: 'grid2-ipp',

    pgSelectEnabled: true,
    pgSelectContainer: 'grid2-page',

    searchEnabled: false,
    searchContainer: "grid2-search",

    checkboxEnabled: true,

    formEnabled: true,
    formContainer: 'grid2-form',

    gridKey: {
        id: 'Code'
    },

    gridCols: [{
        id: 'Code',
        header: 'Code'
    }, {
        id: 'Name',
        header: 'Name'
    }, {
        id: 'Continent',
        header: 'Continent'
    }, {
        id: 'Region',
        header: 'Region'
    }, {
        id: 'Population',
        header: 'Population'
    }]

};// JavaScript Document