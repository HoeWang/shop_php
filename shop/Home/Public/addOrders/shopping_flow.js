var selectedShipping=null;var selectedShipping_id=0;var selectedPayment=null;var selectedPack=null;var selectedCard=null;var selectedSurplus="";var selectedBonus=0;var selectedIntegral=0;var selectedOOS=null;var alertedSurplus=false;var groupBuyShipping=null;var groupBuyPayment=null;function selectShipping(d,b){if(selectedShipping==d){return}else{selectedShipping=d;selectedShipping_id=d.value}var c=d.attributes.supportCod.value+0;var e=d.form;for(i=0;i<e.elements.length;i++){if(e.elements[i].name=="payment"&&e.elements[i].attributes.isCod.value=="1"){if(c==0){e.elements[i].checked=false;e.elements[i].disabled=true}else{e.elements[i].disabled=false}}}var a=new Date();Ajax.call("flow.php?step=select_shipping","shipping="+d.value+"&sup_id="+b,orderShippingSelectedResponse,"GET","JSON")}function checkCodChecked(form){if(form.shipping.checked){var supportCod=form.shipping.attributes.supportCod.value+0}for(i=0;i<form.elements.length;i++){if(form.elements[i].name=="payment"&&form.elements[i].attributes.isCod.value=="1"){if(supportCod==0||eval(form.elements[i].attributes.paymentname.value)==1){form.elements[i].checked=false;form.elements[i].disabled=true}else{form.elements[i].disabled=false}}}}function orderShippingSelectedResponse(a){if(a.need_insure){try{document.getElementById("ECS_NEEDINSURE").checked=true}catch(b){alert(b.message)}}try{if(document.getElementById("ECS_CODFEE")!=undefined){document.getElementById("ECS_CODFEE").innerHTML=a.cod_fee}}catch(b){alert(b.message)}orderSelectedResponse(a)}function selectPayment(b,a){if(selectedPayment==b){return}else{selectedPayment=b}Ajax.call("flow.php?step=select_payment","payment="+b.value+"&shipping="+selectedShipping_id+"&sup_id="+a,orderSelectedResponse,"GET","JSON")}function handleGroupBuyShipping(b){if(groupBuyShipping==b){return}else{groupBuyShipping=b}var a=b.attributes.supportCod.value+0;var c=b.form;for(i=0;i<c.elements.length;i++){if(c.elements[i].name=="payment"&&c.elements[i].attributes.isCod.value=="1"){if(a==0){c.elements[i].checked=false;c.elements[i].disabled=true}else{c.elements[i].disabled=false}}}if(b.attributes.insure.value+0==0){document.getElementById("ECS_NEEDINSURE").checked=false;document.getElementById("ECS_NEEDINSURE").disabled=true}else{document.getElementById("ECS_NEEDINSURE").checked=false;document.getElementById("ECS_NEEDINSURE").disabled=false}Ajax.call("group_buy.php?act=select_shipping","shipping="+b.value,orderSelectedResponse,"GET")}function handleGroupBuyPayment(a){if(groupBuyPayment==a){return}else{groupBuyPayment=a}Ajax.call("group_buy.php?act=select_payment","payment="+a.value,orderSelectedResponse,"GET")}function selectPack(a){if(selectedPack==a){return}else{selectedPack=a}Ajax.call("flow.php?step=select_pack","pack="+a.value,orderSelectedResponse,"GET","JSON")}function selectCard(a){if(selectedCard==a){return}else{selectedCard=a}Ajax.call("flow.php?step=select_card","card="+a.value,orderSelectedResponse,"GET","JSON")}function selectInsure(a){a=a?1:0;Ajax.call("flow.php?step=select_insure","insure="+a,orderSelectedResponse,"GET","JSON")}function handleGroupBuyInsure(a){a=a?1:0;Ajax.call("group_buy.php?act=select_insure","insure="+a,orderSelectedResponse,"GET","JSON")}function orderSelectedResponse(a){if(a.error){alert(a.error);location.href="./"}try{var d=document.getElementById("ECS_ORDERTOTAL");d.innerHTML=(typeof a=="object")?a.content:a;if(document.getElementById("ECS_INVOICE")!=undefined){var e=document.getElementById("ECS_INVOICE");e.innerHTML=(typeof a=="object")?a.invoice:a}if(document.getElementById("ECS_INVOICE_2")!=undefined){var f=document.getElementById("ECS_INVOICE_2");f.innerHTML=(typeof a=="object")?a.invoice:a}if(a.payment!=undefined){var c=document.forms.theForm.elements.surplus;if(c!=undefined){c.disabled=a.pay_code=="balance"}}}catch(b){}}function changeSurplus(b,a){if(selectedSurplus==b){return}else{selectedSurplus=b}Ajax.call("flow.php?step=change_surplus","surplus="+b+"&sup_id="+a,changeSurplusResponse,"GET","JSON")}function changeSurplusResponse(b){if(b.error){try{document.getElementById("ECS_SURPLUS_NOTICE").innerHTML=b.error;document.getElementById("ECS_SURPLUS").value="0";document.getElementById("ECS_SURPLUS").focus()}catch(a){}}else{try{document.getElementById("ECS_SURPLUS_NOTICE").innerHTML=""}catch(a){}orderSelectedResponse(b)}}function changeIntegral(a){if(selectedIntegral==a){return}else{selectedIntegral=a}Ajax.call("flow.php?step=change_integral","points="+a,changeIntegralResponse,"GET","JSON")}function changeIntegralResponse(b){if(b.error){try{document.getElementById("ECS_INTEGRAL_NOTICE").innerHTML=b.error;document.getElementById("ECS_INTEGRAL").value="0";document.getElementById("ECS_INTEGRAL").focus()}catch(a){}}else{try{document.getElementById("ECS_INTEGRAL_NOTICE").innerHTML=""}catch(a){}orderSelectedResponse(b.content)}}function changeBonus(b,a){if(b>0){document.forms.theForm.elements.bonus_sn.value=""}Ajax.call("flow.php?step=change_bonus","bonus="+b+"&sup_id="+a,changeBonusResponse,"GET","JSON")}function changeBonusResponse(b){if(b.error){alert(b.error);try{document.getElementById("ECS_BONUS").value="0"}catch(a){}}else{orderSelectedResponse(b)}}function validateBonus(b,c,a){Ajax.call("flow.php?step=validate_bonus","bonus_sn="+b+"&bonus_id="+c+"&sup_id="+a,validateBonusResponse,"GET","JSON")}function validateBonusResponse(b){if(b.error){alert(b.error)}else{try{alert("优惠券验证成功");document.getElementById("ECS_BONUS").value="0"}catch(a){}orderSelectedResponse(b)}}function changeNeedInv(){var f=document.getElementById("ECS_NEEDINV");var a=document.getElementById("ECS_INVTYPE");var e=document.getElementById("ECS_INVPAYEE");var b=document.getElementById("ECS_INVCONTENT");var g=document.getElementById("ECS_INVAMOUNT");var c=f.checked?1:0;var d=f.checked?(a!=undefined?a.value:""):"";var h=f.checked?e.value:"";var j=f.checked?b.value:"";e.disabled=b.disabled=!f.checked;if(a!=null&&a!=undefined){a.disabled=!f.checked}if(f.checked){g.style.display=""}else{g.style.display="none"}}function groupBuyChangeNeedInv(){var e=document.getElementById("ECS_NEEDINV");var b=document.getElementById("ECS_INVPAYEE");var f=document.getElementById("ECS_INVCONTENT");var d=e.checked?1:0;var c=e.checked?b.value:"";var a=e.checked?f.value:"";b.disabled=f.disabled=!e.checked;Ajax.call("group_buy.php?act=change_needinv","need_idv="+d+"&amp;payee="+c+"&amp;content="+a,null,"GET")}function changeOOS(a){if(selectedOOS==a){return}else{selectedOOS=a}Ajax.call("flow.php?step=change_oos","oos="+a.value,null,"GET")}function checkLen(){var b=document.getElementById("postscript");var a=255;if(b.value.length>a){return false}return true}function checkOrderForm(h){var d=false;var j=false;var a=true;var f=false;var g=new Array();for(i=0;i<h.elements.length;i++){if(h.elements[i].name=="shipping"&&h.elements[i].checked){j=true}if(h.elements[i].name=="payment"&&h.elements[i].checked){d=true}if(h.elements[i].name=="consignee_info"&&h.elements[i].checked&&h.elements[i].value=="new"){a=false}}if(!checkLen()){alert("订单附言输入字数超出限制！");return false}if(!a){alert(flow_no_consignee);return false}if(!d){alert(flow_no_payment);return false}if(document.getElementById("ECS_NEEDINV")&&document.getElementById("ECS_NEEDINV").checked&&document.getElementById("ECS_INVPAYEE").value==""){f=true;g.push("提交订单前必须填写发票抬头！")}if(document.getElementById("consigneeModify")&&document.getElementById("consigneeModify").style.display!="none"){f=true;g.push("提交订单前必须确认收货人信息！")}if(document.getElementById("shippingModify")&&document.getElementById("shippingModify").style.display!="none"){f=true;g.push("提交订单前必须确认配送方式！")}if(document.getElementById("paymentModify")&&document.getElementById("paymentModify").style.display!="none"){f=true;g.push("提交订单前必须确认支付方式！")}if(document.getElementById("invoiceInforModify")&&document.getElementById("invoiceInforModify").style.display!="none"){f=true;g.push("提交订单前必须确认发票信息！")}if(f){message=g.join("\n");alert(message);return false}if(document.getElementById("ECS_SURPLUS")){var b=document.getElementById("ECS_SURPLUS").value;var f=Utils.trim(Ajax.call("flow.php?step=check_surplus","surplus="+b,null,"GET","TEXT",false));if(f){try{document.getElementById("ECS_SURPLUS_NOTICE").innerHTML=f}catch(e){}return false}}if(document.getElementById("ECS_INTEGRAL")){var c=document.getElementById("ECS_INTEGRAL").value;var f=Utils.trim(Ajax.call("flow.php?step=check_integral","integral="+c,null,"GET","TEXT",false));if(f){return false;try{document.getElementById("ECS_INTEGRAL_NOTICE").innerHTML=f}catch(e){}}}document.getElementById("shopping_checkout_submit").disabled=true;return true}function checkCheckoutConsignee(){var b=new Array();var a=false;if(!document.getElementById("selCountries")||(document.getElementById("selCountries")&&document.getElementById("selCountries").value==0)){b.push(country_not_null);a=true}if(!document.getElementById("selProvinces")||(document.getElementById("selProvinces")&&document.getElementById("selProvinces").value==0)){a=true;b.push(province_not_null)}if(!document.getElementById("selCities")||(document.getElementById("selCities")&&document.getElementById("selCities").value==0)){a=true;b.push(city_not_null)}if(!document.getElementById("selDistricts")||(document.getElementById("selDistricts")&&document.getElementById("selDistricts").value==0)){a=true;b.push(district_not_null)}if(Utils.isEmpty(document.getElementById("consignee_name").value)){a=true;b.push(consignee_not_null)}else{if(document.getElementById("consignee_name").value.length>20){a=true;b.push(consignee_too_long)}}if(!Utils.isEmail(document.getElementById("consignee_email").value)){a=true;b.push(invalid_email)}if(document.getElementById("consignee_address")&&Utils.isEmpty(document.getElementById("consignee_address").value)){a=true;b.push(address_not_null)}else{if(document.getElementById("consignee_address").value.length>50){a=true;b.push(address_too_long)}}if(Utils.isEmpty(document.getElementById("consignee_mobile").value)){a=true;b.push(mobile_not_null)}if(!Utils.isEmpty(document.getElementById("consignee_mobile").value)&&((document.getElementById("consignee_mobile")&&document.getElementById("consignee_mobile").value.length>0&&(!Utils.isTel(document.getElementById("consignee_mobile").value)))||(document.getElementById("consignee_mobile").value.match(/^1\d{10}$/)==null))){a=true;b.push(mobile_invaild)}if(!Utils.isEmpty(document.getElementById("consignee_phone").value)&&!Utils.isTel(document.getElementById("consignee_phone").value)){a=true;b.push(tele_invaild)}if(a){message=b.join("\n");alert(message)}return !a}function checkConsignee(b){var c=new Array();var a=false;if(b.elements.country&&b.elements.country.value==0){c.push(country_not_null);a=true}if(b.elements.province&&b.elements.province.value==0&&b.elements.province.length>1){a=true;c.push(province_not_null)}if(b.elements.city&&b.elements.city.value==0&&b.elements.city.length>1){a=true;c.push(city_not_null)}if(b.elements.district&&b.elements.district.length>1){if(b.elements.district.value==0){a=true;c.push(district_not_null)}}if(Utils.isEmpty(b.elements.consignee.value)){a=true;c.push(consignee_not_null)}if(!Utils.isEmail(b.elements.email.value)){a=true;c.push(invalid_email)}if(b.elements.address&&Utils.isEmpty(b.elements.address.value)){a=true;c.push(address_not_null)}if(b.elements.zipcode&&b.elements.zipcode.value.length>0&&(!Utils.isNumber(b.elements.zipcode.value))){a=true;c.push(zip_not_num)}if(Utils.isEmpty(b.elements.mobile.value)){a=true;c.push(mobile_not_null)}if(!Utils.isEmpty(b.elements.mobile.value)&&((b.elements.mobile&&b.elements.mobile.value.length>0&&(!Utils.isTel(b.elements.mobile.value)))||(b.elements.mobile.value.match(/^1\d{10}$/)==null))){a=true;c.push(mobile_invaild)}if(!Utils.isEmpty(b.elements.tel.value)&&!Utils.isTel(b.elements.tel.value)){a=true;c.push(tele_invaild)}if(a){message=c.join("\n");alert(message)}return !a}function goToNext(){window.location.href="flow.php?step=mid_checkout"}function goToCheckout(){var a=document.getElementsByName("suppliers_id");for(var c=0;c<a.length;c++){if(a[c].checked){var b=a[c].value;submitCart(b);return}}alert("请选择要结算的订单！")}function submitCart(a){if(isNaN(a)){alert("您的输入有误，请重新选择!");return}window.location.href="flow.php?step=checkout&sup_id="+a};