(function ($) {

    var $, defaultData, dataRequest,

    $ = jQuery;

    $.dataGrid = {};

    $.dataGrid.fn = {};

    $.fn.dataGrid = function (gridConfig) {

        defaultData = $.extend({
            defaultPg: 1,
            itemsPerPg: 25,
            midRange: 7,
            ippSelectEnabled: true,
            pgSelectEnabled: true,
            searchEnabled: true,
            checkboxEnabled: true,
            formEnabled: true,
        }, gridConfig);

        /* build the ajax request data object for controller */
        var request = {
            'action': 'init',
            'table': defaultData.gridName,
            'ipp': defaultData.itemsPerPg,
            'page': defaultData.defaultPg
        };

        grid.sendReq(request, defaultData);


        grid.events.pagingClick(defaultData);

    };

    var grid = {

        sendReq: function (request, defaultData) {

            //show loader function goes here
            $.get(defaultData.ajaxContoller, request, function (data) {

                var count = parseInt(data.count);
                var ipp = parseInt(request.ipp);
                var page = parseInt(request.page);
                var mid = parseInt(defaultData.midRange);
                var numPgs = grid.fns.getNumPgs(count, ipp);
                var range = grid.fns.getRange(page, mid, numPgs);

                var gridContainer = $('#' + defaultData.gridContainer);
                var pagingContainer = $('.' + defaultData.pagingContainer);

                var gridObj = {
                    'name': defaultData.gridName,
                    'count': count,
                    'page': page,
                    'ipp': ipp,
                    'numPgs': numPgs,
                    'midRange': mid,
                    'range': range,
                    'prefix': defaultData.prefix,
                    'gridContainer': gridContainer,
                    'pagingContainer': pagingContainer,
                    'public': {
                        'name': defaultData.gridName,
                        'count': count,
                        'page': page,
                        'ipp': ipp,
                        'numPgs': numPgs,
                        'midRange': mid,
                        'range': range,
                    },
                    'private': {
                        'id': defaultData.gridKey,
                        'cols': defaultData.gridCols,
                        'rows': data.rows
                    },

                };

                var gridState = {
                    'name': defaultData.gridName,
                    'count': count,
                    'page': page,
                    'ipp': ipp,
                }

                //store grid object HTML5 localStorage function goes here
                localStorage.setItem(defaultData.prefix - 'gridState', JSON.stringify(gridState));

                /* build table */
                var table, thead, tbody, tfoot;

                table = grid.build.htmlTable(gridObj);

                /* fill table */
                grid.fill.htmlTable(gridObj);

                /* build paging links nav */
                grid.build.pagingLinks(gridObj);



            }, 'json');

        },
        /* end sendReq  */

        build: {

            htmlTable: function (gridObj) {

                table = document.createElement("table");
                tbody = document.createElement("tbody");
                thead = document.createElement("thead"), tfoot = document.createElement("tfoot");

                table.setAttribute("id", gridObj.public.name)
                table.setAttribute("class", "tablesorter");
                table.appendChild(thead);
                table.appendChild(tbody);
                table.appendChild(tfoot);


                tr = document.createElement("tr");
                thead.appendChild(tr);

                for (var i = 0; i < gridObj.private.cols.length; i++) {
                    th = document.createElement("th");
                    th.setAttribute("id", gridObj.private.cols[i].id);
                    th.innerHTML = gridObj.private.cols[i].header;
                    tr.appendChild(th);
                }

                return table;
            },
            /* end htmlTable  */
            pagingLinks: function (gridObj) {

                var a = '',
                    prevShow = '<li><a class="paginate" value="prev">prev</a></li>',
                    prevHide = '<li class="inactive"><a class="paging-link" value="prev">prev</a></li>';

                a += (gridObj.page != 1 ? prevShow : prevHide);

                for (var i = 1; i <= gridObj.numPgs; i++) {
                    var inArray = grid.fns.inArray(i, gridObj.range);
                    if (i == 1 || i == gridObj.numPgs || inArray) {
                        var activePg = '<li class="current"><a value="' + i + '">' + i + '</a></li> ',
                            inactivePg = '<li><a class="paginate" value="' + i + '" >' + i + '</a></li>';
                        a += (i == gridObj.page ? activePg : inactivePg);
                    }
                }

                var nextShow = '<li><a class="paginate" value="next" >next</a></li>',
                    nextHide = '';

                a += (gridObj.page != gridObj.numPgs && gridObj.page != "load" ? nextShow : nextHide);

                gridObj.pagingContainer.html('<ul class="' + gridObj.prefix + ' paging">' + a + '</ul>');

            }
        },

        fill: {

            htmlTable: function (gridObj) {

                for (var r = 0; r < gridObj.private.rows.length; r++) {

                    var row = document.createElement("tr");
                    row.setAttribute("id", gridObj.private.rows[r][gridObj.private.id]);

                    for (var k = 0; k < gridObj.private.cols.length; k++) {

                        var cell = document.createElement("td");
                        var cellText = document.createTextNode(gridObj.private.rows[r][gridObj.private.cols[k].id]);
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                    }

                    tbody.appendChild(row);
                }
                table.appendChild(tbody);
                gridObj.gridContainer.html(table);

            },
            /* end htmlTable  */
        },
        /* end fill  */
        events: {

            pagingClick: function (defaultData) {

                $('ul.' + defaultData.prefix + ' a.paginate').live('click', function () {

                    var gridStateStr = localStorage.getItem(defaultData.prefix - 'gridState'),
                        gridState = JSON.parse(gridStateStr),
                        page,
                        currentPg = parseInt(gridState.page),
                        pagingReq = $(this).attr('value');

                    switch (pagingReq) {
                        case 'prev':
                            page = currentPg - 1;
                            break;
                        case 'next':
                            page = currentPg + 1;
                            break;
                        default:
                            page = parseInt($(this).attr("value"));
                    }

                    var request = {
                        'action': 'init',
                        'table': defaultData.gridName,
                        'ipp': defaultData.itemsPerPg,
                        'page': page
                    };

                    grid.sendReq(request, defaultData);
                });
            }

        },

        fns: {

            getNumPgs: function (count, ipp) {
                return Math.ceil(count / ipp);
            },

            inArray: function (n, h) {

                var length = h.length;

                for (var i = 0; i < length; i++) {
                    if (h[i] == n) {
                        return true;
                    }
                }

                return false;
            },

            getRange: function (page, midRange, count) {

                var range = [],
                    start, end;

                start = page - (Math.floor(midRange / 2));
                end = page + (Math.floor(midRange / 2));

                if (start <= 0) {
                    end += Math.abs(start) + 1;
                    start = 1;
                }

                if (end > count) {
                    start -= end - count;
                    end = count;
                }

                for (var i = start; i <= end; i++) {
                    range.push(i);
                }

                return range;
            },
        }
    };
    /* end grid  */

})(jQuery);