(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{420:function(e,a,t){"use strict";var l=t(28),n=t.n(l),r=t(46),c=t(17),s=t(9),i=t(19),o=t(18),u=t(20),m=t(0),b=t.n(m),d=t(141),h=(t(484),t(6150)),p=t(35),g=t.n(p),f=t(534),v=t(203),N=t.n(v);a.a=function(){return function(e){return Object(d.a)(Object(f.a)(function(e){return function(a){function t(){var e,a;Object(c.a)(this,t);for(var l=arguments.length,s=new Array(l),u=0;u<l;u++)s[u]=arguments[u];return(a=Object(i.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(s)))).state={isError:!1},a.makeAuthenticatedAPICall=function(){var e=Object(r.a)(n.a.mark(function e(t,l,r){var c,s;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.prev=1,e.next=4,g()({method:t,url:l,headers:{"x-access-token":localStorage.getItem("accessToken")},data:r});case 4:if(200!==(c=e.sent).status){e.next=9;break}return e.abrupt("return",c);case 9:a.setState({isError:!0});case 10:e.next=26;break;case 12:if(e.prev=12,e.t0=e.catch(1),!(e.t0.response.status=401)){e.next=25;break}return e.next=17,a.props.currentUser.refreshTokens();case 17:return e.next=19,g()({method:t,url:l,headers:{"x-access-token":localStorage.getItem("accessToken")},data:r});case 19:if(200!==(s=e.sent).status){e.next=24;break}return e.abrupt("return",s);case 24:a.setState({isError:!0});case 25:throw e.t0;case 26:e.next=31;break;case 28:e.prev=28,e.t1=e.catch(0),a.setState({isError:!0});case 31:case"end":return e.stop()}},e,null,[[0,28],[1,12]])}));return function(a,t,l){return e.apply(this,arguments)}}(),a.getRedirectQueryString=function(e){var a={redirectTo:e};return"?".concat(N.a.stringify(a))},a}return Object(u.a)(t,a),Object(s.a)(t,[{key:"render",value:function(){var a=this.props.currentUser;return this.state.isError?b.a.createElement(h.a,{to:"/guest/login".concat(this.getRedirectQueryString(this.props.location.pathname))}):b.a.createElement(e,Object.assign({loggedInUserObj:a,authenticatedApiCall:this.makeAuthenticatedAPICall},this.props))}}]),t}(b.a.Component)}(e)))}}},6138:function(e,a,t){"use strict";t.r(a);var l=t(28),n=t.n(l),r=t(46),c=t(17),s=t(9),i=t(19),o=t(18),u=t(20),m=t(24),b=t(0),d=t.n(b),h=t(420),p=t(584),g=t(551),f=t(553),v=t(7),N=t(583),E=t(546),x=t(557),C=t(558),y=t(559),S=t(6040),k=t.n(S),O=t(47),j=[{value:1,label:"6th"},{value:2,label:"7th"},{value:3,label:"8th"},{value:4,label:"9th"},{value:5,label:"10th"},{value:6,label:"11th"},{value:7,label:"12th"}],w=[{value:1,label:"A"},{value:2,label:"B"},{value:3,label:"C"},{value:4,label:"D"},{value:5,label:"E"}],A=[{value:1,label:"Hindu"},{value:2,label:"Muslim"},{value:3,label:"Shikh"},{value:4,label:"Jain"}],R=[{value:1,label:"Genral"},{value:2,label:"OBC"},{value:3,label:"ST/SC"}],D=[{value:1,label:"Urban"},{value:2,label:"Rural"}],I=[{value:1,label:"Female"},{value:2,label:"Male"}],T=function(e){function a(){var e,t;Object(c.a)(this,a);for(var l=arguments.length,n=new Array(l),r=0;r<l;r++)n[r]=arguments[r];return(t=Object(i.a)(this,(e=Object(o.a)(a)).call.apply(e,[this].concat(n)))).state={schoolName:"",schoolNumber:"",schoolAddress:"",studentName:"",adharNumber:"",motherName:"",fatherName:"",className:"",cellNumber:"",dob:"",gender:"",category:"",religion:"",locality:""},t.setStudentClass=function(e){var a="";return j.map(function(t){e===t.value&&(a=t.label)}),a},t.setStudentSection=function(e){var a="";return w.map(function(t){e===t.value&&(a=t.label)}),a},t.setGender=function(e){var a="";return I.map(function(t){e===t.value&&(a=t.label)}),a},t.setReligion=function(e){var a="";return A.map(function(t){e===t.value&&(a=t.label)}),a},t.setCategory=function(e){var a="";return R.map(function(t){e===t.value&&(a=t.label)}),a},t.setLocality=function(e){var a="";return D.map(function(t){e===t.value&&(a=t.label)}),a},t}return Object(u.a)(a,e),Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=Object(r.a)(n.a.mark(function e(){var a,t,l;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=this.props.match.params.studentId,e.next=3,this.props.authenticatedApiCall("get","/api/teacherservice/getstudentregistrationdetails/"+a,null);case 3:1===(t=e.sent).data.status&&(l=t.data.statusDescription,this.setState({schoolName:l.schoolName,schoolNumber:l.schoolNumber,schoolAddress:l.schoolAddress,studentName:l.studentName,aadharNumber:l.aadharNumber,motherName:l.motherName,fatherName:l.fatherName,className:this.setStudentClass(l.classId)+" "+this.setStudentSection(l.sectionId),cellNumber:l.cellNumber,dob:l.dob,gender:this.setGender(parseInt(l.gender)),religion:this.setReligion(l.religion),category:this.setCategory(l.category),locality:this.setLocality(l.locality)}));case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"todayDate",value:function(){var e=new Date;return d.a.createElement(k.a,{format:"MMMM D, YYYY",withTitle:!0},d.a.createElement("b",null,e))}},{key:"render",value:function(){var e=this.state,a=this.props.classes;return d.a.createElement("div",{className:a.root},d.a.createElement(O.Helmet,null,d.a.createElement("title",null,"Student Registration Details")),d.a.createElement(N.a,{container:!0,id:"section-to-print",className:"graphTable"},d.a.createElement(N.a,{item:!0,lg:4,md:4},d.a.createElement(p.a,{variant:"h6"},"Registration No. ",e.schoolNumber)),d.a.createElement(N.a,{item:!0,lg:5,md:5,style:{marginLeft:"20px"}},d.a.createElement(p.a,{variant:"h4"},e.schoolName)),d.a.createElement(N.a,{item:!0,lg:12,md:12,sm:12,xs:12},d.a.createElement(g.a,null,d.a.createElement(f.a,null,d.a.createElement(E.a,null,d.a.createElement(x.a,null,d.a.createElement(y.a,null,d.a.createElement(C.a,{colSpan:"2",className:a.tableHeading}," ",d.a.createElement("h3",null,"Student Registration Detail")," ")),d.a.createElement(y.a,null,d.a.createElement(C.a,{className:a.tableCell}," Student Name  "),d.a.createElement(C.a,{className:a.tableCell}," ",e.studentName," ")),d.a.createElement(y.a,null,d.a.createElement(C.a,{className:a.tableCell}," Mother Name  "),d.a.createElement(C.a,{className:a.tableCell}," ",e.motherName," ")),d.a.createElement(y.a,null,d.a.createElement(C.a,{className:a.tableCell}," Father Name  "),d.a.createElement(C.a,{className:a.tableCell}," ",e.fatherName," ")),d.a.createElement(y.a,null,d.a.createElement(C.a,{className:a.tableCell}," AAdhar Number  "),d.a.createElement(C.a,{className:a.tableCell}," ",e.adharNumber," ")),d.a.createElement(y.a,null,d.a.createElement(C.a,{className:a.tableCell}," Cell Number  "),d.a.createElement(C.a,{className:a.tableCell}," ",e.cellNumber," ")),d.a.createElement(y.a,null,d.a.createElement(C.a,{className:a.tableCell}," Date of Birth"),d.a.createElement(C.a,{className:a.tableCell}," ",e.dob," ")),d.a.createElement(y.a,null,d.a.createElement(C.a,{className:a.tableCell}," Class "),d.a.createElement(C.a,{className:a.tableCell}," ",e.className," ")),d.a.createElement(y.a,null,d.a.createElement(C.a,{className:a.tableCell}," Gender"),d.a.createElement(C.a,{className:a.tableCell}," ",e.gender," ")),d.a.createElement(y.a,null,d.a.createElement(C.a,{className:a.tableCell}," Religion"),d.a.createElement(C.a,{className:a.tableCell}," ",e.religion," ")),d.a.createElement(y.a,null,d.a.createElement(C.a,{className:a.tableCell}," Category "),d.a.createElement(C.a,{className:a.tableCell}," ",e.category," ")),d.a.createElement(y.a,null,d.a.createElement(C.a,{className:a.tableCell}," Locality"),d.a.createElement(C.a,{className:a.tableCell}," ",e.locality," ")))))))))}}]),a}(d.a.Component);a.default=Object(v.a)(function(e){return{root:Object(m.a)({marginTop:e.spacing(12),maxWidth:"900px",margin:"0 auto"},e.breakpoints.down("md"),{margin:0,paddingLeft:0,paddingRight:0,paddingTop:0}),tableHeading:{border:"1px solid #000",height:"30px",textAlign:"center"},tableCell:{border:"1px solid #000",height:"30px",textAlign:"left"},table:{maxWidth:860},tableBorder:{paddingLeft:0,maxWidth:150,minWidth:400},tableBorder1:{},tableBorder2:{maxWidth:150,paddingLeft:4},alternateRow:{"&:nth-of-type(odd)":{backgroundColor:"#fff"}},header:{padding:"0 0 0 55px",background:"rgb(224, 225, 226)",maxWidth:"750px",margin:"0 auto"},prescriptionbody:{padding:"15px 0 0 35px",maxWidth:"700px",margin:"0 auto"},underline:{textDecoration:"underline",fontSize:"20px",marginRight:"5px"},texts:{fontSize:"20px"},qrCode:{position:"absolute",left:0,top:-35},text2:{fontSize:"12px !important",paddingRight:35},text3:{fontSize:"16px !important"},text4:{fontSize:"10px !important",marginLeft:20},text5:{fontSize:"12px !important"},text6:{fontSize:"9px !important"}}})(Object(h.a)()(T))}}]);
//# sourceMappingURL=21.048cba1d.chunk.js.map