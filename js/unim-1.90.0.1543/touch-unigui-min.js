/*!
 * uniGUI Library extension for Sencha Touch (Ext JS Modern Toolkit)
 * by Farshad Mohajeri for uniGUI Library    
 * Copyright(c) 2009-2020 FMSoft Inc.
 * info@fmsoft.net
 * http://www.unigui.com
 * http://www.fmsoft.net 
!*/
function uniGetValues(form){if(!form||form.destroyed){return""}var values=form.getValues(),res="",val="",encoder=encodeURIComponent;for(var propertyName in values){var ffield=null;try{ffield=eval(propertyName)}catch(err){ffield=null;if(Ext.isObject(values[propertyName])){var o=values[propertyName];if(o.field){ffield=o.field;propertyName=ffield.nm}}}if(ffield&&ffield.isDirty&&ffield.isDirty()&&ffield.getValue&&!ffield.fieldEditBusy){if(ffield.submitState==undefined){ffield.submitState=0}else{ffield.submitState++}ffield.submitState%=65535;var stVal="";if(ffield.isXType("timefield")){val=_ts_(ffield.getValue())}else{if(ffield.isXType("datefield")){val=_ds_(ffield.getValue())}else{val=ffield.submittedValue=ffield.getValue()}}if(val===null){val=""}ffield.fieldEdited=false;if(ffield.stateValue!=undefined){stVal=ffield.stateValue}var stSub=ffield.submitState.toString(16);res+="&"+encoder(propertyName)+"="+encoder("\2"+stSub+"\2"+stVal+"\2"+val)}}return(res)}function _sfv_(d,c,a){d.fieldEdited=false;d.suspendEvents();try{if(d.submitState==c||d.submitState==undefined){if(a!==undefined){d.setValue(a)}var b=d.getValue(),e=false;if(Ext.isArray(b)){e=true;b=b.slice(0)}if(b!==null&&!e&&d.resetOriginalValue){d.resetOriginalValue()}else{d.originalValue=b}d.lastValue=(d.getRawValue?d.getRawValue():d.getValue());d.submittedValue=undefined}else{if(a!==undefined){d.setValue(a)}}}finally{d.resumeEvents(true)}}function _rsov_(c,b){var a;if(c.submitState!=undefined&&c.submitState<=b&&c.submittedValue!==undefined){var a=c.submittedValue;if(Ext.isArray(a)){a=a.slice(0)}c.originalValue=a}}Ext.override(Ext.field.Checkbox,{getValue:function(){var a=this.getChecked();if(a!==true){return(false)}return(a)},setValue:function(a){this.callParent(arguments);if(Ext.isBoolean(a)){this.setChecked(a)}},isDirty:function(){return(this.getValue()!==this.originalValue)}});function AjaxError(a,b){if(_ajxerr){return}_ajxerr=true;Ext.Msg.show({title:"Ajax Error",message:a,buttons:Ext.MessageBox.OK,fn:function(){_ajxerr=false}})}function uniResizeFrm(){var b=uniVars._mFrm_,a=Ext.Viewport.getSize();if(b){ajaxRequest(b,"vpsize",{width:a.width,height:a.height})}}Ext.override(Ext.field.Slider,{isDirty:function(){if(this.getDisabled()){return false}return String(this.getValue())!==String(this.originalValue)}});Ext.override(Ext.field.Radio,{getSubmitValue:function(){return{field:this,val:this.getValue()}},initialize:function(){this.callParent();this.on("uncheck",function(a){a.originalValue="\0"},this)},getValue:function(){var a=this.getChecked();if(!a){this.originalValue="\0";return""}return"on"},setValue:function(a){this.callParent(arguments);if(a){this.check()}else{this.uncheck()}return this}});Ext.override(Ext.field.Select,{reset:function(){this.setValue(this.originalValue);return this},isDirty:function(){if(this.getValue()===null&&this.originalValue===null){return false}return this.callParent(arguments)}});Ext.override(Ext.field.Spinner,{isDirty:function(){if(this.getDisabled()){return false}var a=this;if(a){return String(a.getValue())!==String(a.originalValue)}else{return false}}});Ext.override(Ext.field.Text,{onKeyUp:function(c){var b=this;b.callParent(arguments);if(!(b instanceof Ext.form.TextArea)){var a=b.uform;if(a&&a.hideKeyboardOnEnter!==false){if(c.getKey&&c.getKey()==13){hideVirtualKeyboard()}}}},onBlur:function(b){var a=this;a.callParent(arguments);if(a.uniBlurChanged&&(a.trackBlurChange||a.config.trackBlurChange)){a.uniBlurChanged=false;ajaxRequest(a,"blurchange")}}}),Ext.override(Ext.field.Field,{trackKeyup:function(a,b){if(this.isDirty()){return this.trackChange(this,this.getValue())}return true},trackChange:function(c,d,a,b){_hed_(this);return true},initialize:function(){var a=this;a.callParent();a.on("change",a.trackChange,a);a.on("keyup",a.trackKeyup,a)}});Ext.override(Ext.field.Spinner,{reset:function(){this.setValue(this.getValue())}});Ext.override(Ext.Container,{setZIndex:function(h){var f=this,d=f.getParent();if(d&&d.isXType("viewport")){var a=d.items.getCount();if(a>1){if(f.getZIndex()==null){var c=a,g=null,b=null,e=d.items.items;while(c--){g=e[c];if(g&&g.isXType&&g.isXType("container")){b=e[c-1];break}}if(g===f&&b&&b.getZIndex){var j=b.getZIndex();if(Ext.isNumber(j)){if(h<=j){h=j+2}}}}}}return this.callParent([h])},update:function(b,a){if(this.rendered){this.updateDom(b,a);if(this.config.resizeAfterUpdate&&this.rendered){var c=this.getSize();this.setSize(c.width-1,c.height-1);c=this.getSize();this.setSize(c.width+1,c.height+1)}this.fireEvent("afterupdatehtml",this)}},updateDom:function(html,loadScripts){var me=this,id,dom,interval,DOC=document,scriptTagRe=/(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig,replaceScriptTagRe=/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,srcRe=/\ssrc=([\'\"])(.*?)\1/i,typeRe=/\stype=([\'\"])(.*?)\1/i;dom=me.element.dom;if(!dom){return me}html=html||"";if(loadScripts!==true){return this.setHtml(html)}id=Ext.id();html+='<span id="'+id+'" role="presentation"></span>';interval=setInterval(function(){var hd,match,attrs,srcMatch,typeMatch,el,s;if(!(el=DOC.getElementById(id))){return false}clearInterval(interval);Ext.removeNode(el);hd=Ext.getHead().dom;while((match=scriptTagRe.exec(html))){attrs=match[1];srcMatch=attrs?attrs.match(srcRe):false;if(srcMatch&&srcMatch[2]){s=DOC.createElement("script");s.src=srcMatch[2];typeMatch=attrs.match(typeRe);if(typeMatch&&typeMatch[2]){s.type=typeMatch[2]}hd.appendChild(s)}else{if(match[2]&&match[2].length>0){if(window.execScript){window.execScript(match[2])}else{window.eval(match[2])}}}}},20);return this.setHtml(html.replace(replaceScriptTagRe,""))}});Ext.define("Ext.iFrame",{extend:"Ext.Container",mixins:["uniIFrame"],xpainted:function(){if(this.element){var b=this.element.down(".x-innerhtml");if(b){b.setStyle("height","100%")}}var a=new Ext.util.DelayedTask(function(){var c=a;if(!c.cnt){c.cnt=0}if(c.cnt++>600){c.cancel()}else{c.delay(25);try{if(this.iframe){var f=this.getDoc();if(f.body||f.readyState=="complete"){c.cnt=1000;Ext.defer(this.initEditor,10,this)}}}catch(d){_log(d);c.cnt=1000}}},this);a.delay(25)}});function createMask(a){var c=null;if(a.target){c=a.target;if(c.element){c=c.element}}var b={message:(a.useMsg?a.msg:""),renderTo:c};return new Ext.LoadMask(b)}function _ifrm_(d){function c(j){var g="";j=j.dom;if(j){try{var i=j.contentWindow.document||j.contentDocument||window.frames[j.id].document;if(i){if(Ext.isOpera&&i.location=="about:blank"){return}if(i.body){if((contentNode=i.body.firstChild)&&/pre/i.test(contentNode.tagName)){g=contentNode.textContent}else{if((contentNode=i.getElementsByTagName("textarea")[0])){g=contentNode.value}else{g=i.body.textContent||i.body.innerText}}}}if(g&&g!=""){AjaxSuccess({responseText:g})}}catch(h){var f="";if(g&&g!=""){f=g}AjaxError(h.message,f)}}}var b=document.createElement("iframe");var a=b.style;a.setProperty("visibility","hidden","important");a.setProperty("width","0px","important");a.setProperty("height","0px","important");a.setProperty("position","absolute","important");a.setProperty("border","0px","important");a.setProperty("zIndex","-1000","important");Ext.fly(b).set({id:d,name:d,cls:Ext.baseCSSPrefix+"hide-display",src:Ext.SSL_SECURE_URL});document.body.appendChild(b);Ext.fly(b).on("load",Ext.Function.bind(c,this,[b]))}function _rndcll_(value,record,dataIndex,cell,column){if(!record||!record.store){return value}var col=record.store.grid.getColumns()[dataIndex],colType=col.config.ct,colFmt=col.config.cf,DefColDf="d/m/Y",DefColTf="H:i:s",colAttr=col.attr,cellAttr=null;if(!colAttr||colAttr==""){colAttr="{}"}if(record.data._x==1){cellAttr=record.data["_"+dataIndex]}if(Ext.isObject(cellAttr)){cellAttr=cellAttr.a}var el=cell.element,styleset=false;if(!cellAttr||cellAttr==""){cellAttr="{}"}if(cellAttr!="{}"||colAttr!="{}"){try{eval("var cea="+cellAttr+";")}catch(err){}try{eval("var coa="+colAttr+";")}catch(err){}if(!Ext.isObject(cea)){var cea={}}if(!Ext.isObject(coa)){var coa={}}if(!cea.b){cea.b=coa.b}if(!cea.fc){cea.fc=coa.fc}if(!cea.ft){cea.ft=coa.ft}if(!cea.fts){cea.fts=coa.fts}var sty=fobj2styleobj(cea);if(sty){if(el&&el.setStyle){if(!cell.uniSavedStyle){cell.uniSavedStyle={};copyObjExclude(el.dom.style,cell.uniSavedStyle,{width:true,cssText:true})}else{copyObj(cell.uniSavedStyle,el.dom.style)}styleset=true;el.setStyle(sty)}}}if(!styleset&&el&&el.dom){if(cell.uniSavedStyle){copyObj(cell.uniSavedStyle,el.dom.style);cell.uniSavedStyle=null;delete cell.uniSavedStyle}}switch(colType){case"":return(value);case"number":case"float":if(colFmt){var nn=Ext.util.Format.number,isStr=(typeof value=="string");if(isStr){value=value.replace(Ext.util.Format.decimalSeparator,".")}if(colFmt[0]=="$"){colFmt=colFmt.substring(1);if(value<0){value=-value;value="-"+nn(value,colFmt);break}}var nRes=nn(value,colFmt);if(isStr&&nRes==""){break}value=nRes;return(value)}return(value);case"boolean":if(!colFmt){colFmt={"false":"false","true":"true"}}if(Ext.isObject(colFmt)){if(Ext.isBoolean(value)){return(colFmt[value])}if(Ext.isNumber(value)){var bl=(value!==0);return(colFmt[bl])}}return(value);case"datetime":if(value&&value.getDate){var defFmt=false;if(!colFmt){defFmt=true;colFmt=DefColDf}if(colFmt.substr(0,2)=="**"){defFmt=true;colFmt=colFmt.slice(2)}if(defFmt){var hm=Ext.Date.format(value,"His");if(hm=="000000"){return(Ext.Date.format(value,colFmt))}else{return(Ext.Date.format(value,colFmt+" H:i:s"))}}else{return(Ext.Date.format(value,colFmt))}}if(value==null){value=""}return(value);case"time":if(value&&value.getDate){if(!colFmt){colFmt=DefColTf}return(Ext.Date.format(value,colFmt))}if(value==null){value=""}return(value);case"date":if(value&&value.getDate){if(!colFmt){colFmt=DefColDf}return(Ext.Date.format(value,colFmt))}if(value==null){value=""}return(value);default:return(value)}return value}if(Ext.grid){Ext.override(Ext.grid.plugin.Editable,{isEditor:true,onCancelTap:function(){this.callParent(arguments);ajaxRequest(this.getGrid(),"canceledit",{})},getEnableDeleteButton:function(){return this.config.enableDeleteButton},getRecordByTriggerEvent:function(a){if(a.isModel){return(a)}else{return this.callParent(arguments)}}});function _sge_(d,h,b,f){var c=uniVars._actCnt,a=d.nm+"_eplgn",e=d.getPlugin(a);if(e&&d.config.showEditorOnEdit===true){e.onTrigger(d,new Ext.grid.Location(d,{record:d.store.getAt(h,true),column:b}))}}Ext.define("Ext.form.noSubmitPanel",{extend:"Ext.form.Panel",xtype:"form_nosubmit_panel",getElementConfig:function(){var b=this.callParent();var a=b.children;Ext.Array.each(a,function(c){if(c.tag=="input"&&c.type=="submit"){c.type="hidden"}});return b}})}else{Ext.define("Ext.grid.column.Column",{extend:"Ext.Container"})}function _cgms_(a){}function _grrow_(a,b){if(Ext.isObject(a)){return(a.data[b])}else{return(a)}}function _src_(b,a){b.setValue(a);_sfc_(b.listControl)}Ext.override(Ext.picker.Picker,{initialize:function(){var a=this;a.callParent(arguments);a.on({scope:a,beforeshow:function(){var b=this.ownerCmp;if(b&&b.getReadOnly&&b.getReadOnly()){return false}return true}})}});Ext.override(Ext.field.DatePicker,{setValue:function(b){if(Ext.isString(b)){var a=Ext.Date.parse(b,this.config.dateFormat);this.callParent([a])}else{this.callParent(arguments)}}});function resetScroll(b,a){if(b){if(b.uscrolled||a){b.uscrolled=false;b.uscrolledEvent=false;try{b.bodyElement.setScrollTop(0);b.uform.bodyElement.setScrollTop(0)}finally{b.uscrolledEvent=true}}}}function handleWinScroll(a){a.on("painted",function(){var d=this,b=d.bodyElement,c=d.uform.bodyElement;if(b){d.uscrolledEvent=true;b.on("scroll",function(){this.uscrolled=this.uscrolledEvent},d);d.on("focusleave",function(){resetScroll(this)},d);if(c){c.on("scroll",function(){this.uscrolled=this.uscrolledEvent},d);c.on("singletap",function(){resetScroll(this)},d)}}},a)}function _rndsum_(a){return a}function _getsum_(b,e){if(b&&b.length){var c=false;var f=b[b.length-1].data;var a="_s"+e;res=f[a];return res}return null}function _stn_(a,c){var b=a.store.getNodeById(c);if(b){if(b.isLeaf()){a.goToLeaf(b)}else{a.goToNode(b)}}}function _dform_(a){if(a&&a.getShowAnimation&&a.getShowAnimation()){try{if(a.element){a.element.destroy()}}catch(b){_log("_dform_: "+b.message)}}a.destroy()}Ext.override(Ext.data.Store,{constructor:function(a){var b=this;if(a){if(a.buffered){return new Ext.data.virtual.Store(a)}}b.callParent([a])},removeAtSilent:function(a,b){this.removeAt.apply(this,arguments)},uniApplyId:function(b,c){var a=this;a.suspendEvents();try{a.callParent(arguments)}finally{a.resumeEvents(true)}}});Ext.theme.getDocCls=function(){if(uniVars.fModernToolkitBig==true){return"x-big"}else{return""}};function hideVirtualKeyboard(c,a){var b=document.activeElement;b.setAttribute("readonly","readonly");b.setAttribute("disabled","true");Ext.defer(function(){b.blur();b.removeAttribute("readonly");b.removeAttribute("disabled");if(c){c.call(a)}},100)}Ext.override(Ext.field.Picker,{onPickerHide:function(){var a=this;a.callParent(arguments);if(Ext.isiOS&&a.pickerType==="edge"){a.el.dom.scrollIntoView(false)}}});Ext.define("Override.grid.plugin.Editable",{override:"Ext.grid.plugin.Editable",getEditorFields:function(d){var f=[],k=d.length,a={},e,c,h,b,g,j;for(e=0;e<k;e++){c=d[e];b=c.getEditable();h=b!==false&&c.getEditor();if(!h&&b){g=c.getDefaultEditor();h=Ext.create(g);c.setEditor(h)}else{if(h&&b&&h.initialConfig){j=h.initialConfig;h.destroy();c.editor=null;h=Ext.create(j);c.setEditor(h)}}if(h){if(a[c.getDataIndex()]){Ext.raise('An editable column with the same dataIndex "'+c.getDataIndex()+'" already exists.')}a[c.getDataIndex()]=true;if(h.isEditor){h=h.getField()}h.setLabel(c.getText());h.setName(c.getDataIndex());f.push(h)}}return f}});Ext.override(Ext.Component,{initUniEvents:function(){var a=this;if(a.element){a.element.on({tap:function(b){if(this.element.getXY){var c=this.element.getXY();this.fireEvent("mousedown",this,b.getX()-c[0],b.getY()-c[1])}},scope:a})}}});if(Ext.calendar){Ext.override(Ext.calendar.panel.Panel,{initComponent:function(){var a=this,b=a.getTimezoneOffset();if(Ext.isNumber(b)){a.applyTimezoneOffset(b)}a.callParent(arguments)},doDestroy:function(){var b=this,a=b.getStore();b.callParent();if(a&&!a.destroyed){a.destroy()}},privates:{doSetView:function(a,c){var b=this;b.callParent(arguments);b.fireEvent("viewchange",b,a)}}});Ext.override(Ext.calendar.view.Base,{constructor:function(a){var b=this,c=b.getTimezoneOffset();b.callParent([a]);if(a.eventToolTips){b.eventTip=Ext.create("Ext.tip.ToolTip",{target:b.getEl(),delegate:".x-calendar-event",listeners:{beforeshow:function(f){var e=b.getStore().getEventSource(),d=Ext.get(f.currentTarget).getAttribute("data-eventid"),g=e.getById(Ext.Number.from(d,0));if(g){f.setHtml(g.get("title"))}}}})}if(Ext.isNumber(c)){b.applyTimezoneOffset(c)}},doDestroy:function(){var a=this;if(a.eventTip){a.eventTip.destroy()}a.callParent()},getUniOwner:function(){var a=this;while(a&&!Ext.isString(a.uname)){a=a.getParent()}return a},viewRange:function(){var a=this.getVisibleRange();if(a){return{start:a.start,end:a.end}}return{start:0,end:0}},showAddForm:function(g,d){var f=this,h=g,i=f.getUniOwner(),b=-1,a=-1;if(d&&d.onCancel){d.onCancel.call(d.scope||f,f,g)}if(h&&h.data){b=h.data.startDate;a=h.data.endDate}i.fireEvent("rangeselect",i,{StartDate:b,EndDate:a},f.xtype);return f}})}function selectTreeMenuNode(a,b){a.suspendEvent("selectionchange");try{a.setSelection(b)}finally{a.resumeEvent("selectionchange")}};