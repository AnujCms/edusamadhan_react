
import React from 'react';
import MUIDataTable from "mui-datatables";
import withWidth from '@material-ui/core/withWidth';
class MuiThemeDataTable extends React.PureComponent {

            options = {
                MUIDataTableToolbar: {
                    root: {
                      backgroundColor: "55ACEE",
                      color: "55ACEE"
                    },
                    TitleText:{
                      color:"55ACEE"
                    }
                  },
            filterType: 'checkbox',
            selectableRows: false,
            rowHover: false,
            rowsPerPageOptions: [20, 40, 60],
            responsive: "scroll",
            print: false,
            customSort : this.props.customSort,
            textLabels: {
                TitleText:{
                    color:"55ACEE"
                  },
                body: {
                    noMatch : "Sorry, no records to show"
                }
            }
    }
    
    render() {
        let columns = [];
        if((this.props.width === "sm" || this.props.width === "xs") && this.props.tableContent === "studentsList" ){
            columns.push(this.props.columns[1]);
            columns.push(this.props.columns[5]);
            columns.push(this.props.columns[11]);
            // columns.push(this.props.columns[6]);
            this.options.onRowClick = (rowData, rowMeta) => {
                this.props.rowDetailsRedirectFunction(rowData, rowMeta)
            }
        }else if((this.props.width === "sm" || this.props.width === "xs") && this.props.tableContent === "entranceStudentList" ){
            columns.push(this.props.columns[2]);
            columns.push(this.props.columns[3]);
            this.options.onRowClick = (rowData, rowMeta) => {
                this.props.rowDetailsRedirectFunctionExamHead(rowData, rowMeta)
            }
        }
        else if((this.props.width === "sm" || this.props.width === "xs") && this.props.tableContent === "entranceQuestionList" ){
            columns.push(this.props.columns[1]);
            columns.push(this.props.columns[6]);
            this.options.onRowClick = (rowData, rowMeta) => {
                this.props.rowDetailsRedirectFunctionQuestion(rowData, rowMeta)
            }
        }
        else if((this.props.width === "sm" || this.props.width === "xs") && this.props.tableContent === "teachersList" ){
            columns.push(this.props.columns[1]);
            columns.push(this.props.columns[6]);
            columns.push(this.props.columns[8]);
            this.options.onRowClick = (rowData, rowMeta) => {
                this.props.rowDetailsRedirectFunctionTeacher(rowData, rowMeta)
            }
        }else if((this.props.width === "sm" || this.props.width === "xs") && this.props.tableContent === "studentsfeedetails" ){
            columns.push(this.props.columns[0]);
            columns.push(this.props.columns[1]);
            columns.push(this.props.columns[2]);
            columns.push(this.props.columns[3]);
            columns.push(this.props.columns[4]);
            this.options.onRowClick = (rowData, rowMeta) => {
                this.props.rowFeeDetailsRedirectFunction(rowData, rowMeta)
            }
        }else if((this.props.width === "sm" || this.props.width === "xs") && this.props.tableContent === "classfeedetails" ){
            columns.push(this.props.columns[0]);
            columns.push(this.props.columns[1]);
            this.options.onRowClick = (rowData, rowMeta) => {
                this.props.rowDetailsRedirectFunctionStudentFee(rowData, rowMeta)
            }
        }else if((this.props.width === "sm" || this.props.width === "xs") && this.props.tableContent === "notificationsList" ){
            columns.push(this.props.columns[0]);
            columns.push(this.props.columns[1]);
            columns.push(this.props.columns[2]);
            this.options.onRowClick = (rowData, rowMeta) => {
                this.props.rowNotificationDetailsRedirectFunction(rowData, rowMeta)
            }
        }
        else if((this.props.width === "sm" || this.props.width === "xs") && this.props.tableContent === "eventsList" ){
            columns.push(this.props.columns[0]);
            columns.push(this.props.columns[1]);
            columns.push(this.props.columns[2]);
            this.options.onRowClick = (rowData, rowMeta) => {
                this.props.rowEventDetailsRedirectFunction(rowData, rowMeta)
            }
        } else if((this.props.width === "sm" || this.props.width === "xs") && this.props.tableContent === "attendanceList" ){
            this.options.expandableRows = false;
            columns = this.props.columns
            this.options.onRowClick = (rowData, rowMeta) => {
            }
        }else if((this.props.width === "sm" || this.props.width === "xs") && this.props.tableContent === "viewFullFeeDetails" ){
            this.options.expandableRows = false;
            columns = this.props.columns
            this.options.onRowClick = (rowData, rowMeta) => {
            }
        }else if((this.props.width === "sm" || this.props.width === "xs") && this.props.tableContent === "studentsFeeList" ){
            this.options.expandableRows = false;
            columns = this.props.columns
            this.options.onRowClick = (rowData, rowMeta) => {
            }
        }
        else if(this.props.width === "sm" || this.props.width === "xs"){
            this.props.smallScreenTableColumnDisplayIndex.forEach(element => {
                columns.push(this.props.columns[element])
            });
            this.options.onRowClick = (rowData, rowMeta) => {
            }
        }
        else {
            this.options.expandableRows = false;
            columns = this.props.columns
            this.options.onRowClick = (rowData, rowMeta) => {
            }
        }
    return (
        <MUIDataTable
            key={columns.length} 
            title={this.props.title}
            data={this.props.rows}
            columns={columns}
            options= {this.options}
        />)
}
}
export default withWidth()(MuiThemeDataTable);






