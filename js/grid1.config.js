var grid1 = {
		
		ajaxContoller: 'dataGrid/dataGrid.controller.php',
    	gridName: 'city',
    	gridContainer: 'grid1',
    	prefix: 'g1-',
		defaultPg: 1,
		itemsPerPg: 10,
		midRange: 7,
		pagingContainer: 'grid1-paging',
		ippSelectEnabled: true,
		ippSelectContainer: 'grid1-ipp',
		pgSelectEnabled: true,
		pgSelectContainer: 'grid1-page',
	    searchEnabled: true,
        searchContainer: "grid1-search",
		checkboxEnabled: true,
		formEnabled: true,
		formContainer: 'grid1-form',
        
		gridKey: {
        	id: 'ID'
    	},

    gridCols: [{
        id: 'ID',
        header: 'ID'
    }, {
        id: 'Name',
        header: 'Name'
    }, {
        id: 'CountryCode',
        header: 'Country Code'
    }, {
        id: 'District',
        header: 'District'
    }, {
        id: 'Population',
        header: 'Population'
    }]

};