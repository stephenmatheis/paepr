/** RHC-C SharePoint Team */

/** Actions */
import Action_Component from '../Actions/Action_Component.js'


/** {@link https://datatables.net/plug-ins/api/row().show()} */
/**
 *  This plugin permits to show the right page of DataTable to show the selected row
 *
 *  @version 1.0
 *  @name row().show()
 *  @summary See the row in datable by display the right pagination page
 *  @author [Edouard Labre](http://www.edouardlabre.com)
 *
 *  @param {void} a row must be selected
 *  @returns {DataTables.Api.Rows} DataTables Rows API instance
 *
 *  @example
 *    // Add an element to a huge table and go to the right pagination page
 *    var table = $('#example').DataTable();
 *    var new_row = {
 *      DT_RowId: 'row_example',
 *      name: 'example',
 *      value: 'an example row'
 *    };
 *
 *    table.row.add( new_row ).draw().show().draw(false);
 */
$.fn.dataTable.Api.register('row().show()', function() {
	var page_info = this.table().page.info();
	// Get row index
	var new_row_index = this.index();
	// Row position
	var row_position = this.table()
		.rows({ search: 'applied' })[0]
		.indexOf(new_row_index);
	// Already on right page ?
	if ((row_position >= page_info.start && row_position < page_info.end) || row_position < 0) {
		// Return row object
		return this;
	}
	// Find page number
	var page_to_display = Math.floor(row_position / this.table().page.len());
	// Go to that page
	this.table().page(page_to_display);
	// Return row object
	return this;
});

export default function Component_DataTable(param) {
    const {
        headers,
        columns,
        buttons,
        checkboxes,
        striped,
        border,
        paging,
        search,
        info,
        order,
        rowId,
        addCSS,
        data,
        onRowClick,
        onSearch,
        onDraw,
        onSelect,
        onDeselect,
        rowCallback,
        width,
        parent,
        position
    } = param;

    const component = Action_Component({
        html: /*html*/ `
            <!-- <table class='table table-sm w-100 animated fadeIn'> -->
            <table class=
                'table table-sm 
                w-100 
                ${striped !== false ? 'table-striped' : 'table-not-striped'} 
                ${border !== false ? 'table-bordered' : 'table-not-bordered'} 
                animated 
                fadeIn'
            >
                <thead>
                    ${buildHeader()}
                </thead>    
            </table>
        `,
        style: /*css*/ `
            /** Table */
            #id_wrapper {
                width: ${width || 'initial'};
            }

            #id tr {
                cursor: pointer;
            }

            /** Toolbar */
            #id_wrapper .datatable-toolbar {
                padding: 0px 15px;
                margin: 0px 0px 15px 0px;
                width: 100%;
                display: flex;
                justify-content: space-between;
            }

            #id_wrapper .datatable-toolbar .dataTables_length label,
            #id_wrapper .datatable-toolbar .dataTables_filter label {
                margin: 0px;
            }

            /** Buttons */
            #id_wrapper .btn-group {
                margin: 0px 10px 0px 0px;
            }

            #id_wrapper .datatable-toolbar .btn-secondary {
                background: ${App.primaryColor};
                border-color: ${App.primaryColor};
                margin-right: 10px;
                border-radius: .25rem;
            }

            #id_wrapper .datatable-toolbar .btn-secondary:focus {
                box-shadow: none;
            }

            #id_wrapper .datatable-toolbar .btn-secondary span {
                color: white;
            }

            #id_wrapper .datatable-toolbar .btn:first-child {
                margin-right: 60px;
            }

            /** Add Item Button */
            #id_wrapper .datatable-toolbar .add-item {
                background: white;
                border: solid 1px darkgreen
            }

            #id_wrapper .datatable-toolbar .add-item span {
                display: flex;
                justify-content: center;
                align-items: center;
                color: darkgreen;
            }

            #id_wrapper .datatable-toolbar .add-item .icon {
                margin-right: 5px;
                stroke: darkgreen;
                fill: darkgreen;
            }

            /** HTML5 Buttons */
            #id_wrapper .buttons-html5.ml-50 {
                margin-left: 50px;
            }

            #id_wrapper .buttons-html5 {
                background: white !important;
                border: 1px solid rgb(102, 51, 153, .30);
            }

            #id_wrapper .buttons-html5 span{
                color: ${App.primaryColor} !important;
            }

            /** Select and Search */
            #id_wrapper .custom-select {
                border: 1px solid rgb(${App.primaryColorRGB}, .30);
            }

            #id_wrapper .form-control {
                border: 1px solid rgb(${App.primaryColorRGB}, .30);
            }

            /** Footer */
            #id_wrapper .datatable-footer {
                padding: 0px 15px;
                margin: 15px 0px 0px 0px;
                width: 100%;
                display: flex;
                justify-content: space-between;
            }

            /** Toolbar Cell */
            #id_wrapper .datatable-toolbar .cell {
                display: flex;
                align-items: center;
            }

            /** Info */
            #id_wrapper .dataTables_info {
                padding: 0px;
            }

            /** Pagination */
            #id_wrapper .page-item .page-link {
                color: unset;
                border: solid 1px rgb(${App.primaryColorRGB}, .30);
            }

            #id_wrapper .page-item .page-link:focus {
                box-shadow: none;
            }

            #id_wrapper .page-item.active .page-link {
                color: white;
                background: ${App.primaryColor};;
                border: solid 1px ${App.primaryColor};
            }

            #id_wrapper .page-link:hover {
                background: rgb(${App.primaryColorRGB}, .15);
            }

            /** Form control */
            #id_wrapper .form-control:focus {
                box-shadow: none;
                outline: none;
                border-color: ${App.primaryColor};
            }

            /** Table */
            #id_wrapper .dataTable {
                border-collapse: collapse !important;
            }
            
            /** Bordered */
            #id_wrapper .table-bordered {
                border: 1px solid rgb(${App.primaryColorRGB}, .3);
            }
            
            #id_wrapper .table-bordered.dataTable {
                border-right-width: 1px;
            }

            /** Not Bordered*/
            #id_wrapper .table-not-bordered {
                border: none;
            }
            
            #id_wrapper .table-not-bordered thead td,
            #id_wrapper .table-not-bordered thead th {
                border-top: none;
            }

            /** Striped */
            #id_wrapper .table-striped tbody tr:hover {
                background: rgb(${App.primaryColorRGB}, .15);
            }

            #id_wrapper .table-striped tbody tr:nth-of-type(odd):hover {
                background: rgb(${App.primaryColorRGB}, .15);
            }

            #id_wrapper .table-striped tbody tr:nth-of-type(odd) {
                background-color: white;
            }

            #id_wrapper .table-striped tbody tr:not(:last-child) {
                border-bottom: solid 1px rgb(${App.primaryColorRGB}, .3);
            }

            /** Not striped */
            /*
            #id_wrapper .table-bordered {
                border: 1px solid rgb(${App.primaryColorRGB}, .3);
            }
            
            #id_wrapper .table-bordered.dataTable {
                border-right-width: 1px;
            }

            #id_wrapper .table-striped tbody tr:hover {
                background: rgb(${App.primaryColorRGB}, .15);
            }

            #id_wrapper .table-striped tbody tr:nth-of-type(odd):hover {
                background: rgb(${App.primaryColorRGB}, .15);
            }

            #id_wrapper .table-striped tbody tr:nth-of-type(odd) {
                background-color: white;
            }
            */

            #id_wrapper .table-striped tbody tr:not(:last-child) {
                border-bottom: solid 1px rgb(${App.primaryColorRGB}, .3);
            }

            /** TD */
            #id_wrapper td:focus {
                outline: none;
            }

            /** Headers */
            #id_wrapper .table-border thead th {
                border-bottom: solid 1px rgb(${App.primaryColorRGB}, .3);
                background: rgb(${App.primaryColorRGB}, .2);
                color: ${App.primaryColor};
            }

            /** Cells */
            #id_wrapper .table-bordered td, .table-bordered th {
                /* border: 1px solid rgb(${App.primaryColorRGB}); */
                border: none;
            }

            /** Sorting */
            #id_wrapper .sorting_asc::before,
            #id_wrapper .sorting_asc::after,
            #id_wrapper .sorting_desc::before,
            #id_wrapper .sorting_desc::after {
                color: ${App.primaryColor}
            }

            /** Select Checkbox */
            #id_wrapper tbody td.select-checkbox {
                vertical-align: middle;
            }

            #id_wrapper tbody td.select-checkbox:before, 
            #id_wrapper tbody th.select-checkbox:before {
                content: ' ';
                margin: 0 auto;
                border: solid 2px lightgray;
                border-radius: 4px;

                position: initial;
                display: block;
                width: 16px;
                height: 16px;
                box-sizing: border-box;
            }

            #id_wrapper tbody td.select-checkbox:after, 
            #id_wrapper tbody th.select-checkbox:after {
                margin-top: -19px;
                color: ${App.primaryColor};
                font-weight: bolder;
                text-shadow: none;
            }

            /** Selected Row */
            #id_wrapper tbody > tr.selected, 
            #id_wrapper tbody > tr > .selected {
                background-color: rgb(${App.primaryColorRGB}, .1);
            }

            ${addCSS || ''}
        `,
        parent,
        position,
        events: [
            {
                selector: `#id`,
                event: 'click',
                listener(event) {
                    
                }
            }
        ],
        onAdd() {
            setData({
                columns,
                data,
                onRowClick,
            });
        }
    });

    function buildHeader() {
        let html = /*html*/ `
            <tr>
        `;

        headers.forEach(item => {
            html += /*html*/ `
                <th>${item}</th>
            `;
        });

        html += /*html*/ `
            </tr>
        `
        return html;
    }

    function setData(param) {
        const {
            columns,
            data,
            onRowClick,
        } = param;

        if (!component.get()) {
            return;
        }
        
        const tableId = `#${component.get().id}`;

        const options = {
            dom: `
                <'row'
                    <'datatable-toolbar'
                        <'cell left'
                            Bl
                        >
                        <'cell right'
                            ${search !== false ? 'f' : ''}
                        >
                    >
                >
                <'row'
                    <'col-md-12'
                        t
                    >
                >
                <'row'
                    <'datatable-footer'
                        <'cell left'
                            ${info !== false ? 'i' : ''}
                        >
                        <'cell right'
                            p
                        >
                    >
                >
            `,
            rowId,
            processing: true,
            responsive: true,
            /**
             * Testing
             * 
             * https://datatables.net/reference/option/deferRender
             */
            deferRender: true,
            order: order || [[1, 'asc']],
            columns,
            buttons: buttons || []
        };

        if (paging === false) {
            options.paging = false;
        } else {
            options.pageLength = 25;
        }

        if (checkboxes) {
            options.columnDefs = [
                {
                    targets: 0,
                    defaultContent: '',
                    orderable: false,
                    className: 'select-checkbox'
                }
            ];

            options.select = {
                style: 'multi',
                selector: 'td:first-child'
            };
        }

        if (rowCallback) {
            options.rowCallback = rowCallback;
        }

        /** Create table. */
        const table = $(tableId).DataTable(options)
        .on('click', 'tr', function(rowData) {
            /** DO NOT Change this to an arrow function! this reference required */
            if (rowData.target.classList.contains('select-checkbox')) {
                return;
            }
            rowData = $(tableId).DataTable().row(this).data();

            if (rowData && onRowClick) {
                onRowClick({
                    row: this,
                    item: rowData
                });
            }
        });

        /** Search event callback */
        if (onSearch) {
            table.on('search.dt', function(e, settings) {
                // console.log('Column search', table.columns().search().toArray());
                // console.log('Global search', table.search());

                onSearch({
                    jqevent: e,
                    table: table
                });
            });
        }

        /** Draw event callback */
        if (onDraw) {
            table.on('draw', function(e, settings) {
                // console.log('Column search', table.columns().search().toArray());
                // console.log('Global search', table.search());

                onDraw({
                    jQEvent: e,
                    table: table
                });
            });
        }

        /** Select callback */
        if (onSelect) {
            table.on('select', function(e, dt, type, indexes) {
                onSelect({
                    e,
                    dt,
                    type,
                    indexes
                });
            });
        }

        /** Deselect callback */
        if (onSelect) {
            table.on('deselect', function(e, dt, type, indexes) {
                onSelect({
                    e,
                    dt,
                    type,
                    indexes
                });
            });
        }

        /** Load and draw data. */
        table.rows.add(data).draw();

        /** Adjust columns */
        table.columns.adjust().draw();
    }

    component.DataTable = () => {
        return $(`#${component.get().id}`).DataTable();
    }

    component.search = (term, column) => {
        $(`#${component.get().id}`).DataTable().columns(column).search(term).draw();
    }

    component.findRowById = (id) => {
        return $(`#${component.get().id}`).DataTable().row(`#${id}`);
    }
    
    component.updateRow = (param) => {
        const {
            row,
            data
        } = param;

        $(`#${component.get().id}`).DataTable().row(row).data(data).draw();
    }

    component.selected = () => {
        return $(`#${component.get().id}`).DataTable().rows({selected: true}).data().toArray();
    }

    component.addRow = (param) => {
        const {
            data
        } = param;

        $(`#${component.get().id}`).DataTable().row.add(data).draw();
    }

    component.removeRow = (row) => {
        $(`#${component.get().id}`).DataTable().row(row).remove().draw();
    }

    return component;
}