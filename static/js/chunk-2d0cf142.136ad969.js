(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cf142"],{"61d5":function(s,e,a){"use strict";a.r(e);var r=function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("v-container",{attrs:{"fill-height":""}},[a("v-row",{attrs:{justify:"center",align:"center"}},[a("v-col",{attrs:{cols:"12",sm:"6"}},[a("el-form",{ref:"form",attrs:{model:s.updatePasswordForm,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"原密码"}},[a("el-input",{attrs:{type:"password"},model:{value:s.updatePasswordForm.oldPassword,callback:function(e){s.$set(s.updatePasswordForm,"oldPassword",e)},expression:"updatePasswordForm.oldPassword"}})],1),a("el-form-item",{attrs:{label:"新密码"}},[a("el-input",{attrs:{type:"password"},model:{value:s.updatePasswordForm.newPassword,callback:function(e){s.$set(s.updatePasswordForm,"newPassword",e)},expression:"updatePasswordForm.newPassword"}})],1),a("el-form-item",{attrs:{label:"再次输入"}},[a("el-input",{attrs:{type:"password"},model:{value:s.updatePasswordForm.repeatPassword,callback:function(e){s.$set(s.updatePasswordForm,"repeatPassword",e)},expression:"updatePasswordForm.repeatPassword"}})],1),a("el-form-item",[a("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:s.handleUpdatePassword}},[s._v("修改密码")])],1)],1)],1)],1)],1)},t=[],o=a("c24f"),d={name:"index",data:function(){return{updatePasswordForm:{oldPassword:"",newPassword:"",repeatPassword:""}}},methods:{handleUpdatePassword:function(){var s=this;if(this.updatePasswordForm.newPassword==this.updatePasswordForm.repeatPassword){var e=new URLSearchParams;e.append("oldPassword",this.updatePasswordForm.oldPassword),e.append("newPassword",this.updatePasswordForm.newPassword),Object(o["f"])(e).then((function(e){e.status&&s.$message({type:"success",message:"修改成功"})}))}else this.$message({message:"两次密码不一致",type:"error"})}}},l=d,n=a("2877"),w=Object(n["a"])(l,r,t,!1,null,null,null);e["default"]=w.exports}}]);