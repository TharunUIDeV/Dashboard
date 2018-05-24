var SDK=function(){"use strict";var r,n="",a=function(e){var o=this;function n(e,n){return null!==e&&null!==n&&-1!==e.indexOf(n,e.length-n.length)}this.log=function(e){console.log("ScriptLoader: "+e)},this.withNoCache=function(e){return-1===e.indexOf("?")?e+="?no_cache="+(new Date).getTime():e+="&no_cache="+(new Date).getTime(),e},this.loadStyle=function(e){var n=document.createElement("link");n.rel="stylesheet",n.type="text/css",n.href=o.withNoCache(e),o.log("Loading style "+e),n.onload=function(){o.log('Loaded style "'+e+'".')},n.onerror=function(){o.log('Error loading style "'+e+'".')},o.m_head.appendChild(n)},this.loadScript=function(e,n){var t=document.createElement("script");t.type="text/javascript",t.src=o.withNoCache(o.m_js_files[e]);var c=function(){e+1<o.m_js_files.length&&o.loadScript(e+1)};t.onload=function(){o.log('Loaded script "'+o.m_js_files[e]+'".'),c(),n()},t.onerror=function(){throw o.log('Error loading script "'+o.m_js_files[e]+'".'),'Error loading script "'+o.m_js_files[e]+'".'},o.log('Loading script "'+o.m_js_files[e]+'".'),o.m_head.appendChild(t)},this.loadFiles=function(e){for(var n=0;n<o.m_css_files.length;++n)o.loadStyle(o.m_css_files[n]);o.loadScript(0,e)},this.m_js_files=[],this.m_css_files=[],this.m_head=document.getElementsByTagName("head")[0];for(var t=0;t<e.length;++t)n(e[t],".css")?this.m_css_files.push(e[t]):n(e[t],".js")?this.m_js_files.push(e[t]):this.log('Error unknown filetype "'+e[t]+'".')};function l(){return n.toLowerCase()}function e(){return new Promise(function(t,n){if(void 0===r)try{if("browser"===l()||"native"===l()){for(var e,c=document.getElementsByTagName("script"),o=0;o<c.length;o++)-1!=c[o].src.indexOf("caremarkSdk/wrapper-sdk")&&-1!=c[o].src.indexOf("wrapper.js")&&(e=c[o].src.replace("wrapper.js",""));if(-1===(e=e.replace("caremarkSdk/wrapper-sdk","caremarkSdk/core-sdk")).indexOf(".caremark.com")&&-1===e.indexOf(".cvshealth.com")){var i=e.replace("http://","");i=i.substr(i.indexOf(":"),5),e=e.replace(i,":8089")}new a([e+"coreSdk.js"]).loadFiles(function(){setTimeout(function(){r=new CoreSdk.Index(l()),t(r)},2e3)})}else if("node"===l()){require("jsdom/lib/old-api").env("",["node_modules/caremarkSdk-core/coreSdk.js"],function(e,n){r=new n.CoreSdk.Index(l()),t(r)})}}catch(e){n(e)}else t(r)})}return{Drug:Object.freeze({getRefills:function(n,t){e().then(function(e){e.Drug.getRefills(n,t)}).catch(function(e){console.log(e)})},prescriptionStatusUpdate:function(n,t){e().then(function(e){e.Drug.prescriptionStatusUpdate(n,t)}).catch(function(e){console.log(e)})},prescriptionCancel:function(n,t){e().then(function(e){e.Drug.prescriptionCancel(n,t)}).catch(function(e){console.log(e)})},therapeuticAlternatives:function(n,t){e().then(function(e){e.Drug.therapeuticAlternatives(n,t)}).catch(function(e){console.log(e)})}}),Pricing:Object.freeze({getDrugsByName:function(n,t){e().then(function(e){e.Pricing.getDrugsByName(n,t)}).catch(function(e){console.log(e)})},getDrugPrice:function(n,t){e().then(function(e){e.Pricing.getDrugPrice(n,t)}).catch(function(e){console.log(e)})}}),Member:Object.freeze({getDetails:function(n,t){e().then(function(e){e.Member.getDetails(n,t)}).catch(function(e){console.log(e)})},authenticate:function(n,t){e().then(function(e){e.Member.authenticate(n,t)}).catch(function(e){console.log(e)})},getShippingAndPayment:function(n,t){e().then(function(e){e.Member.getShippingAndPayment(n,t)}).catch(function(e){console.log(e)})},validateAddress:function(n,t){e().then(function(e){e.Member.validateAddress(n,t)}).catch(function(e){console.log(e)})},getMedicalProfile:function(n,t){e().then(function(e){e.Member.getMedicalProfile(n,t)}).catch(function(e){console.log(e)})},updateMedicalProfile:function(n,t){e().then(function(e){e.Member.updateMedicalProfile(n,t)}).catch(function(e){console.log(e)})},addCreditCard:function(n,t){e().then(function(e){e.Member.addCreditCard(n,t)}).catch(function(e){console.log(e)})}}),Order:Object.freeze({getOrderStatus:function(n,t){e().then(function(e){e.Order.getOrderStatus(n,t)}).catch(function(e){console.log(e)})},placeOrder:function(n,t){e().then(function(e){e.Order.placeOrder(n,t)}).catch(function(e){console.log(e)})},getDeliveryDateRange:function(n,t){e().then(function(e){e.Order.getDeliveryDateRange(n,t)}).catch(function(e){console.log(e)})},shipConsent:function(n,t){e().then(function(e){e.Order.shipConsent(n,t)}).catch(function(e){console.log(e)})},findPhysician:function(n,t){e().then(function(e){e.Order.findPhysician(n,t)}).catch(function(e){console.log(e)})}}),Pharmacy:Object.freeze({getDefaultPharmacy:function(n,t){e().then(function(e){e.Pharmacy.getDefaultPharmacy(n,t)}).catch(function(e){console.log(e)})},findPharmacy:function(n,t){e().then(function(e){e.Pharmacy.findPharmacy(n,t)}).catch(function(e){console.log(e)})},setPrimaryPharmacy:function(n,t){e().then(function(e){e.Pharmacy.setPrimaryPharmacy(n,t)}).catch(function(e){console.log(e)})}}),Claim:Object.freeze({getClaimsHistory:function(n,t){e().then(function(e){e.Claim.getClaimsHistory(n,t)}).catch(function(e){console.log(e)})}}),setIdentity:function(e){console.log("SDK Identity set to :"+e),n=e}}}();