var best_str=new Object();var new_str=new Object();var hot_str=new Object();function init_rec_data(){best_str[0]=document.getElementById("show_best_area")==null?"":document.getElementById("show_best_area").innerHTML;new_str[0]=document.getElementById("show_new_area")==null?"":document.getElementById("show_new_area").innerHTML;hot_str[0]=document.getElementById("show_hot_area")==null?"":document.getElementById("show_hot_area").innerHTML}function get_cat_recommend(a,b){if(a==1){if(typeof(best_str[b])=="string"){document.getElementById("show_best_area").innerHTML=best_str[b];return}}else{if(a==2){if(typeof(new_str[b])=="string"){document.getElementById("show_new_area").innerHTML=new_str[b];return}}else{if(typeof(hot_str[b])=="string"){document.getElementById("show_hot_area").innerHTML=hot_str[b];return}}}Ajax.call("index.php?act=cat_rec","rec_type="+a+"&cid="+b,cat_rec_response,"POST","TEXT")}function cat_rec_response(a){var b=$.evalJSON(a);if(b.type==1){var c=document.getElementById("show_best_area");best_str[b.cat_id]=b.content}else{if(b.type==2){var c=document.getElementById("show_new_area");new_str[b.cat_id]=b.content}else{var c=document.getElementById("show_hot_area");hot_str[b.cat_id]=b.content}}c.innerHTML=b.content}if(document.all){window.attachEvent("onload",init_rec_data)}else{window.addEventListener("load",init_rec_data,false)}function change_tab_style(g,f,h){f=f.toUpperCase();var d=document.getElementById(g);var c=d.getElementsByTagName(f);var b=h.parentNode;while(b.nodeName!=f){b=b.parentNode}for(var e=0,a=c.length;e<a;e++){c[e].className="h2bg"}b.className=""};