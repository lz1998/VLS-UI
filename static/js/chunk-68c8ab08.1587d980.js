(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-68c8ab08"],{ac6a:function(e,s,t){for(var r=t("cadf"),i=t("0d58"),n=t("2aba"),a=t("7726"),o=t("32e9"),l=t("84f2"),c=t("2b4c"),u=c("iterator"),d=c("toStringTag"),m=l.Array,v={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},f=i(v),h=0;h<f.length;h++){var p,g=f[h],w=v[g],b=a[g],L=b&&b.prototype;if(L&&(L[u]||o(L,u,m),L[d]||o(L,d,g),l[g]=m,w))for(p in r)L[p]||n(L,p,r[p],!0)}},ee55:function(e,s,t){"use strict";t.r(s);var r=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"user-manage "},[t("v-subheader",[e._v("userManage")]),t("v-container",{staticClass:"my-5"},[t("v-row",{attrs:{justify:"center",align:"center"}},[t("v-form",[t("v-row",{attrs:{align:"center",justify:"center"}},[t("v-col",{attrs:{cols:"10",md:"6"}},[t("el-input",{attrs:{placeholder:"查询用户名"},model:{value:e.username,callback:function(s){e.username=s},expression:"username"}})],1),t("v-col",{attrs:{cols:"4",md:"6"}},[t("v-btn",{attrs:{depressed:"",color:"primary"},on:{click:e.showAddUserDialog}},[e._v("新建用户")])],1)],1)],1)],1),t("v-row",e._l(e.searchUser,(function(s){return t("v-col",{key:s.name,attrs:{cols:"12",sm:"6",md:"3"}},[t("v-card",{staticClass:"pa-4 ",attrs:{flat:""}},[t("v-card-text",{staticClass:"text-center"},[t("v-responsive",{staticClass:"my-4"},[t("v-avatar",{attrs:{size:"100"}},[t("img",{attrs:{src:"http://www.sucaijishi.com/uploadfile/2016/0203/20160203022636507.png"}})])],1),t("div",{staticClass:"subheader"},[e._v("用户名:"+e._s(s.username))]),t("v-chip",{attrs:{color:"admin"==s.role?"#3cd1c2":"orange lighten-3"}},[t("v-icon",{attrs:{left:""}},[e._v("mdi-account")]),t("div",{staticClass:"grey--text"},[e._v("角色:"+e._s(s.role))])],1)],1),t("v-card-actions",[t("v-btn",{attrs:{text:""},on:{click:function(t){return e.showEditDialog(s)}}},[t("v-icon",{attrs:{small:"",left:""}},[e._v("\n                                    edit\n                                ")]),t("span",[e._v("编辑")])],1),t("v-spacer"),t("v-btn",{attrs:{text:""},on:{click:function(t){return e.delUser(s.username)}}},[t("v-icon",{attrs:{small:"",left:""}},[e._v("\n                                    delete\n                                ")]),t("span",[e._v("删除")])],1)],1)],1)],1)})),1),t("v-dialog",{attrs:{width:"500"},model:{value:e.showDialog,callback:function(s){e.showDialog=s},expression:"showDialog"}},[t("v-card",[t("v-card-title",{staticClass:"mb-2"},[t("div",[e._v(e._s(e.isEditing?"编辑用户":"新建用户"))]),t("v-spacer"),t("v-btn",{attrs:{fab:"",text:"",small:""},on:{click:function(s){e.showDialog=!1}}},[t("v-icon",[e._v("clear")])],1)],1),t("v-card-text",[t("v-form",{ref:"userForm",staticClass:"px-4"},[t("v-text-field",{attrs:{outlined:"","prepend-inner-icon":"account_box",dense:"",label:"用户名",color:"primary lighten-1",disabled:e.isEditing,rules:e.usernameRules},model:{value:e.user.username,callback:function(s){e.$set(e.user,"username",s)},expression:"user.username"}}),t("v-text-field",{attrs:{outlined:"","prepend-inner-icon":"lock",dense:"",label:"密码",color:"primary lighten-1",rules:e.passwordRules},model:{value:e.user.password,callback:function(s){e.$set(e.user,"password",s)},expression:"user.password"}}),t("v-combobox",{attrs:{items:e.items,chips:"",label:"角色",clearable:"",rules:e.roleRules},scopedSlots:e._u([{key:"selection",fn:function(s){return[t("v-chip",e._b({key:JSON.stringify(s.item),attrs:{"input-value":s.selected,disabled:s.disabled},on:{click:function(e){e.stopPropagation(),s.parent.selectedIndex=s.index},"click:close":function(e){return s.parent.selectItem(s.item)}}},"v-chip",s.attrs,!1),[t("v-avatar",{staticClass:"accent white--text",attrs:{left:""}},[e._v("\n                                            "+e._s(s.item.slice(0,1).toUpperCase())+"\n                                        ")]),e._v("\n                                        "+e._s(s.item)+"\n                                    ")],1)]}}]),model:{value:e.user.role,callback:function(s){e.$set(e.user,"role",s)},expression:"user.role"}}),t("v-row",{attrs:{justify:"end"}},[t("v-btn",{attrs:{depressed:"",color:"primary"},on:{click:e.addOrEditUser}},[t("v-icon",{attrs:{left:"",small:""}},[e._v("done")]),e._v("\n                                    确认\n                                ")],1)],1)],1)],1)],1)],1)],1)],1)},i=[],n=(t("ac6a"),t("c24f")),a={data:function(){var e=this;return{username:"",showPassword:!1,items:["su","admin"],isEditing:!1,user:{username:"",password:"",role:""},showDialog:!1,users:[],usernameRules:[function(e){return!!e||"请输入用户名"},function(s){return e.allUserName.indexOf(s)<0||e.isEditing||"不允许用户名重复"}],passwordRules:[function(e){return!!e||"请输入密码"}],roleRules:[function(e){return!!e||"请输入角色"},function(s){return e.items.indexOf(s)>=0||"请选择对应的角色"}]}},methods:{delUser:function(e){var s=this,t={username:e};Object(n["a"])(t).then((function(e){s.$message({type:"success",message:"删除成功"}),s.loadUserList(),console.log(e)})),console.log(e)},queryUser:function(){console.log(this.id)},showAddUserDialog:function(){this.user={},this.isEditing=!1,this.showDialog=!0},showEditDialog:function(e){console.log(e.username),this.loadUserData(e),this.isEditing=!0,this.showDialog=!0},loadUserData:function(e){this.user.id=e.id,this.user.username=e.username,this.user.password=e.password,this.user.role=e.role},addOrEditUser:function(){var e=this;this.$refs.userForm.validate()&&(1==this.isEditing?Object(n["e"])(this.user).then((function(s){console.log(s),e.$message({type:"success",message:"编辑成功"}),e.loadUserList(),e.showDialog=!1})):Object(n["e"])(this.user).then((function(){e.$message({type:"success",message:"增加成功"}),e.showDialog=!1,e.loadUserList()})))},loadUserList:function(){var e=this;Object(n["b"])().then((function(s){e.users=s.userList}))},test:function(){var e=[];this.users.forEach((function(s){e.push(s.username)})),e.push(sessionStorage.getItem("username")),console.log(e.indexOf(this.user.username)<0)}},computed:{searchUser:function(){var e=this,s=this.users;return s.filter((function(s){return s.username.indexOf(e.username)>=0}))},allUserName:function(){var e=[];return this.users.forEach((function(s){e.push(s.username)})),e.push(sessionStorage.getItem("username")),e}},mounted:function(){this.loadUserList()}},o=a,l=t("2877"),c=Object(l["a"])(o,r,i,!1,null,null,null);s["default"]=c.exports}}]);